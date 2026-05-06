<?php
/**
 * retail.kittykat.tech — Retail Advisor backend (self-contained).
 *
 * Why this file exists:
 *   The fuel-management codebase already has a Claude-backed advisor service
 *   pattern (OptimusService) and we initially wired retail to a new endpoint
 *   inside that codebase. But the /rev3/ directory on the production host is
 *   gated by Apache Basic Auth and SetEnvIf+Satisfy bypass does not actually
 *   work on this hosting (zone.eu shared) — every test of /api/cron/* and
 *   /api/retail/* returns 401 before PHP even runs.
 *
 *   This file lives inside the retail/ folder which has no Basic Auth, so
 *   anonymous public traffic from retail.kittykat.tech can reach it. Same
 *   semantics as the fuel-management RetailAdvisorService:
 *     - JSON contract: { message, context } -> { answer, cited_card_ids,
 *       cited_roadmap_step, reasoning_summary }
 *     - Claude Sonnet 4.5
 *     - retry/backoff on 429 / 5xx / network
 *     - prompt caching on the system prompt
 *     - retry-once on malformed JSON output, fall back to raw text
 *     - per-IP rate limit (10 req/min sliding window, file-based)
 *     - ZDR header sent
 *     - no user content in logs
 *
 * Why inline (not requires/autoloader):
 *   Single static-host folder. No composer, no PSR-4, no shared deps.
 *   Everything self-contained makes deploy a trivial git-pull.
 */

declare(strict_types=1);

// ─── Config ──────────────────────────────────────────────────────────────────
// Model is overridable via CLAUDE_MODEL in retail/.env so a wrong default
// doesn't require a code push to fix. Default points at a Sonnet alias which
// Anthropic typically keeps mapped to the latest stable release.
const RETAIL_ADVISOR_DEFAULT_MODEL      = 'claude-sonnet-4-5';
const RETAIL_ADVISOR_MAX_TOKENS         = 1500;
const RETAIL_ADVISOR_TIMEOUT_SECONDS    = 25;
const RETAIL_ADVISOR_MAX_MESSAGE_LENGTH = 2000;
const RETAIL_ADVISOR_RATE_LIMIT         = 10;   // requests per window
const RETAIL_ADVISOR_RATE_WINDOW        = 60;   // window length in seconds
const RETAIL_ADVISOR_API_URL            = 'https://api.anthropic.com/v1/messages';

// Hardcoded fallback prompt — used only if knowledge/ directory is empty
// or unreadable. The real prompt is assembled at request time from the
// .md files in retail/knowledge/ — see load_system_prompt(). This makes
// the advisor's behaviour editable WITHOUT touching code: an editor can
// edit knowledge/*.md (or add new files) and the next request picks up
// the change.
const RETAIL_ADVISOR_FALLBACK_PROMPT = <<<'PROMPT'
You are a retail transformation advisor embedded in the Retail AI Canvas — a strategic tool for senior leaders at mid-sized food retailers.

Stage model:
- Stage 1 (Strengthen Core Operations): Data Foundation, Stock & Availability, Store Execution, Margin & Cash, Supplier Performance, Reporting & Decisions, Loss Prevention, Workforce & AI Assistants
- Stage 2 (Optimize and Grow): Customers & Loyalty, Promotions & Pricing
- Stage 3 (Expand and Monetize): optional strategic expansion — retail media, supplier activation, paid loyalty, partner ecosystems, new revenue pools — only relevant when the core is mature

Tone rules:
- Speak in retail business language: margin, waste, availability, basket, promotions, stock cover, working capital
- Stay under 120 words unless asked for more depth
- Lead with the business problem, not the technology
- Explain trade-offs clearly and honestly — including sequencing and complexity
- Admit when a diagnostic is needed before recommending a path
- Avoid: "digital transformation", "hyper-personalization", "game-changing", "state-of-the-art"
- Do not promise fixed financial results
- Do not push platform-first programs by default — recommend pragmatic entry points
- Stage 3 is optional and strategic. Do not recommend it as a default starting point.

When asked where to start: ask one clarifying question about their biggest pressure, then recommend 2–3 relevant areas with brief rationale.
When asked about a specific domain or play: explain the business problem first, the improvement second, what would need to be true third.

RESPONSE FORMAT — STRUCTURED OUTPUT

Always respond as valid JSON matching this shape, and nothing else:

{
  "answer": string,                  // your spoken response, plain text, max ~120 words
  "cited_card_ids": string[],        // 0–3 card ids you drew on (e.g. "df-1", "cust-2", "promo-3")
  "cited_roadmap_step": string|null, // one of: "see", "control", "optimize", "scale", "expand"; or null
  "reasoning_summary": string        // 1–2 sentences explaining why these cards/step, max 40 words
}

Rules for structured output:
- Output JSON only. No prose before or after. No code fences.
- Use card ids exactly as they appear in the canvas (df-1, df-2, cust-1, promo-1, stock-2, etc.).
- If your answer doesn't naturally cite specific cards (e.g. an abstract methodological question), return cited_card_ids: [] and a roadmap_step that fits.
- "reasoning_summary" is read by a senior buyer and should be substantive, not "I picked these because they are relevant."
PROMPT;

const RETAIL_ADVISOR_ALLOWED_ROADMAP_STEPS = ['see', 'control', 'optimize', 'scale', 'expand'];


// ─── Entry ───────────────────────────────────────────────────────────────────
header('Content-Type: application/json');

// CORS — same-origin in production (retail.kittykat.tech calls retail.kittykat.tech)
// so technically not needed, but echoing allows local dev from another origin
// without breaking things.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === 'https://retail.kittykat.tech' || preg_match('#^http://(localhost|127\.0\.0\.1)(:\d+)?$#', $origin)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 600');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond_error(405, 'method_not_allowed', 'Only POST is allowed.');
}

// ─── Rate limit (per-IP, sliding window, file-based) ─────────────────────────
rate_limit_check();

// ─── Parse + validate request body ───────────────────────────────────────────
$rawBody = file_get_contents('php://input');
$body    = json_decode((string)$rawBody, true);
if (!is_array($body)) {
    respond_error(400, 'invalid_json', 'Request body must be valid JSON.');
}

$message = isset($body['message']) && is_string($body['message']) ? trim($body['message']) : '';
if ($message === '') {
    respond_error(400, 'empty_message', 'Message is required.');
}
if (mb_strlen($message) > RETAIL_ADVISOR_MAX_MESSAGE_LENGTH) {
    respond_error(400, 'message_too_long',
        'Message must be ' . RETAIL_ADVISOR_MAX_MESSAGE_LENGTH . ' characters or fewer.');
}

$rawCtx = is_array($body['context'] ?? null) ? $body['context'] : [];
$context = [
    'pressures' => is_array($rawCtx['pressures'] ?? null)
        ? array_values(array_filter($rawCtx['pressures'], 'is_string'))
        : [],
    'domain'    => is_string($rawCtx['domain'] ?? null) ? $rawCtx['domain'] : null,
    'play'      => is_string($rawCtx['play']   ?? null) ? $rawCtx['play']   : null,
];

// ─── Generate the answer ─────────────────────────────────────────────────────
$apiKey = load_api_key();
if (!$apiKey) {
    respond_fallback('AI advisor is temporarily unavailable. Please try again later.');
}

try {
    $userMsg      = build_user_message($message, $context);
    $systemPrompt = load_system_prompt();

    // First attempt — normal pass.
    $raw    = call_claude($apiKey, $systemPrompt, $userMsg);
    $parsed = parse_structured_response($raw);
    if ($parsed !== null) {
        respond_json(200, $parsed);
    }

    // Malformed JSON — single retry with a stricter reminder.
    error_log('retail-advisor: first response malformed, retrying');
    $strictMsg = $userMsg . "\n\nReminder: respond with ONLY valid JSON. No prose before or after. No code fences.";
    $raw2      = call_claude($apiKey, $systemPrompt, $strictMsg);
    $parsed2   = parse_structured_response($raw2);
    if ($parsed2 !== null) {
        respond_json(200, $parsed2);
    }

    // Both attempts unparseable — return raw text in answer field so the
    // frontend at least shows something useful.
    error_log('retail-advisor: retry also malformed, falling back to raw text');
    respond_json(200, [
        'answer'             => trim((string)$raw2) ?: trim((string)$raw),
        'cited_card_ids'     => [],
        'cited_roadmap_step' => null,
        'reasoning_summary'  => '',
    ]);

} catch (\Throwable $e) {
    // Never bubble vendor internals (credit balance, API key, etc) to the user.
    error_log('retail-advisor error: ' . $e->getMessage());
    respond_fallback(friendly_error($e->getMessage()));
}


// ═══════════════════════════════════════════════════════════════════════════
// Helpers below
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Read ANTHROPIC_API_KEY from the .env file in the retail folder root.
 * The .env is one level up from this file (retail/api/advisor.php → retail/.env).
 * Operator pastes the key during deploy setup — same file that already holds
 * DEPLOY_KEY for the update.html / deploy.php pair.
 */
function load_api_key(): string
{
    return load_env('ANTHROPIC_API_KEY');
}

/**
 * Assemble the system prompt from the retail/knowledge/ directory. Reads
 * every .md file in alphabetical order and concatenates them. This is the
 * file-based grounding mechanism: editors can drop in 04-case-studies.md,
 * 05-benchmarks.md, etc., without touching code, and the next request
 * picks them up.
 *
 * The order matters — naming convention is NN-name.md so files sort
 * deterministically. 01-base.md is the tone/format spec, 02-cards.md is
 * the canvas catalog, 03-roadmap.md is the staged sequence. Anything
 * after that extends the model's grounding (case studies, additional
 * frameworks, FAQ, etc).
 *
 * Falls back to the hardcoded RETAIL_ADVISOR_FALLBACK_PROMPT if the
 * knowledge directory is empty or missing — keeps the advisor working
 * even on a stripped-down deploy.
 */
function load_system_prompt(): string
{
    $dir = __DIR__ . '/../knowledge';
    if (!is_dir($dir)) {
        return RETAIL_ADVISOR_FALLBACK_PROMPT;
    }
    $files = glob($dir . '/*.md') ?: [];
    sort($files); // alphabetical — controls ordering
    $parts = [];
    foreach ($files as $f) {
        $content = @file_get_contents($f);
        if ($content !== false && trim($content) !== '') {
            $parts[] = trim($content);
        }
    }
    if (!$parts) {
        return RETAIL_ADVISOR_FALLBACK_PROMPT;
    }
    return implode("\n\n---\n\n", $parts);
}

/**
 * Read CLAUDE_MODEL override from .env. Falls back to the default if not set.
 * Lets ops swap the model id (e.g. when Anthropic releases a new Sonnet)
 * without a code push.
 */
function load_model(): string
{
    $override = load_env('CLAUDE_MODEL');
    return $override !== '' ? $override : RETAIL_ADVISOR_DEFAULT_MODEL;
}

/**
 * Generic .env reader. Single-line `KEY=value` format, no quotes processing,
 * no expansion. Comment lines (starting with #) skipped.
 */
function load_env(string $key): string
{
    $envPath = __DIR__ . '/../.env';
    if (!is_readable($envPath)) {
        return '';
    }
    $needle = $key . '=';
    $lines = @file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
    foreach ($lines as $line) {
        if (str_starts_with(trim($line), '#')) continue;
        if (str_starts_with($line, $needle)) {
            return trim(substr($line, strlen($needle)));
        }
    }
    return '';
}

/**
 * Embed canvas context in the user message so the model can ground its picks.
 * Compact — system prompt is the heavy part and is cached.
 */
function build_user_message(string $message, array $context): string
{
    $lines = [];
    if (!empty($context['pressures'])) {
        $lines[] = 'Selected pressures: ' . implode(', ', $context['pressures']);
    }
    if (!empty($context['domain'])) {
        $lines[] = "Currently viewing domain: {$context['domain']}";
    }
    if (!empty($context['play'])) {
        $lines[] = "Currently viewing service: {$context['play']}";
    }
    $contextBlock = $lines ? "Canvas context:\n- " . implode("\n- ", $lines) . "\n\n" : '';
    return $contextBlock . 'Question: ' . trim($message);
}

/**
 * Call Claude with retry/backoff. 4xx (auth, bad request) is not retried —
 * won't recover on its own. 429/5xx/network errors are retried up to 3 times
 * with growing backoff. Anthropic prompt caching is enabled on the system
 * prompt — first call writes the cache, subsequent calls within 5 min read
 * at ~10% of input cost.
 */
function call_claude(string $apiKey, string $system, string $user): string
{
    $payload = json_encode([
        'model'      => load_model(),
        'max_tokens' => RETAIL_ADVISOR_MAX_TOKENS,
        'system'     => [
            ['type' => 'text', 'text' => $system, 'cache_control' => ['type' => 'ephemeral']],
        ],
        'messages'   => [
            ['role' => 'user', 'content' => $user],
        ],
    ], JSON_UNESCAPED_UNICODE);

    $maxAttempts = 3;
    $lastError   = 'unknown';
    $start       = microtime(true);

    for ($attempt = 1; $attempt <= $maxAttempts; $attempt++) {
        $ch = curl_init(RETAIL_ADVISOR_API_URL);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => RETAIL_ADVISOR_TIMEOUT_SECONDS,
            CURLOPT_HTTPHEADER     => [
                'Content-Type: application/json',
                'x-api-key: ' . $apiKey,
                'anthropic-version: 2023-06-01',
                'anthropic-zdr: true',
            ],
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlErr  = curl_error($ch);
        curl_close($ch);

        if ($curlErr === '' && $httpCode === 200) {
            $data = json_decode((string)$response, true);
            if ($data && isset($data['content'][0]['text'])) {
                $latencyMs = (int)((microtime(true) - $start) * 1000);
                error_log("retail-advisor ok attempt={$attempt} latency_ms={$latencyMs}");
                return $data['content'][0]['text'];
            }
            throw new \RuntimeException('Claude API unexpected response shape');
        }

        $lastError = $curlErr !== ''
            ? "curl error: {$curlErr}"
            : "HTTP {$httpCode}: " . mb_substr((string)$response, 0, 500);

        $retryable = ($curlErr !== '') || $httpCode === 429 || $httpCode >= 500;
        if (!$retryable || $attempt === $maxAttempts) {
            if (!$retryable) {
                throw new \RuntimeException("Claude API {$lastError}");
            }
            break;
        }
        // 500ms then 1500ms backoff between attempts
        usleep($attempt * 500000 + ($attempt - 1) * 1000000);
        error_log("retail-advisor retry {$attempt}/{$maxAttempts} after {$lastError}");
    }

    throw new \RuntimeException("Claude API failed after {$maxAttempts} attempts: {$lastError}");
}

/**
 * Parse + validate the structured JSON the model is supposed to return.
 * Returns null on any validation failure (caller decides whether to retry
 * or fall back). Strips accidental markdown fences. Tolerates whitespace.
 */
function parse_structured_response(string $raw): ?array
{
    $clean = trim($raw);
    if (preg_match('/^```(?:json)?\s*([\s\S]*?)\s*```$/m', $clean, $m)) {
        $clean = trim($m[1]);
    }
    $data = json_decode($clean, true);
    if (!is_array($data) && preg_match('/\{[\s\S]*\}/', $clean, $m)) {
        $data = json_decode($m[0], true);
    }
    if (!is_array($data)) {
        return null;
    }

    $answer = isset($data['answer']) && is_string($data['answer']) ? trim($data['answer']) : '';
    if ($answer === '') {
        return null;
    }

    $cardIds = [];
    if (isset($data['cited_card_ids']) && is_array($data['cited_card_ids'])) {
        foreach ($data['cited_card_ids'] as $id) {
            if (is_string($id) && $id !== '') {
                $cardIds[] = $id;
                if (count($cardIds) >= 3) break;
            }
        }
    }

    $step = $data['cited_roadmap_step'] ?? null;
    if (!is_string($step) || !in_array($step, RETAIL_ADVISOR_ALLOWED_ROADMAP_STEPS, true)) {
        $step = null;
    }

    $summary = isset($data['reasoning_summary']) && is_string($data['reasoning_summary'])
        ? trim($data['reasoning_summary'])
        : '';

    return [
        'answer'             => $answer,
        'cited_card_ids'     => $cardIds,
        'cited_roadmap_step' => $step,
        'reasoning_summary'  => $summary,
    ];
}

/**
 * Per-IP sliding window. Same approach as PublicRateLimiter.php in fuel-management:
 * single JSON file in tmp, hashed IPs as keys, prune old timestamps each call.
 * Fail-open: if filesystem hiccups, allow the request (logged).
 */
function rate_limit_check(): void
{
    $ip   = client_ip();
    $now  = time();
    $key  = sha1($ip);
    $path = sys_get_temp_dir() . '/kkt_ratelimit_retail-advisor.json';

    $fp = @fopen($path, 'c+');
    if (!$fp) {
        error_log('retail-advisor: rate limiter cannot open file — failing open');
        return;
    }

    try {
        if (!flock($fp, LOCK_EX)) {
            error_log('retail-advisor: rate limiter cannot lock — failing open');
            return;
        }

        $raw  = stream_get_contents($fp);
        $data = ($raw === '' || $raw === false) ? [] : (json_decode($raw, true) ?: []);

        // Prune across all IPs so the file doesn't grow forever.
        $cutoff = $now - RETAIL_ADVISOR_RATE_WINDOW;
        foreach ($data as $k => $stamps) {
            $kept = array_values(array_filter($stamps, fn($t) => $t >= $cutoff));
            if ($kept) { $data[$k] = $kept; } else { unset($data[$k]); }
        }

        $stamps = $data[$key] ?? [];
        if (count($stamps) >= RETAIL_ADVISOR_RATE_LIMIT) {
            $oldest     = $stamps[0] ?? $now;
            $retryAfter = max(1, ($oldest + RETAIL_ADVISOR_RATE_WINDOW) - $now);

            ftruncate($fp, 0); rewind($fp);
            fwrite($fp, json_encode($data));
            fflush($fp);
            flock($fp, LOCK_UN);
            fclose($fp);

            http_response_code(429);
            header("Retry-After: {$retryAfter}");
            echo json_encode([
                'answer'             => "Too many requests. Limit: " . RETAIL_ADVISOR_RATE_LIMIT
                                       . " per " . RETAIL_ADVISOR_RATE_WINDOW . "s.",
                'cited_card_ids'     => [],
                'cited_roadmap_step' => null,
                'reasoning_summary'  => '',
                'error'              => 'rate_limited',
                'retry_after'        => $retryAfter,
            ]);
            exit;
        }

        $stamps[]     = $now;
        $data[$key]   = $stamps;

        ftruncate($fp, 0); rewind($fp);
        fwrite($fp, json_encode($data));
        fflush($fp);

    } finally {
        if (is_resource($fp)) {
            flock($fp, LOCK_UN);
            fclose($fp);
        }
    }
}

function client_ip(): string
{
    $xff = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if ($xff) {
        $first = trim(explode(',', $xff)[0]);
        if ($first) return $first;
    }
    return $_SERVER['HTTP_X_REAL_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

/**
 * Map upstream API errors to short user-readable messages. Same pattern as
 * OptimusService::friendlyAiError (KKT-99) but in EN — retail audience.
 */
function friendly_error(string $rawMessage): string
{
    $lower = mb_strtolower($rawMessage);
    if (str_contains($lower, 'credit balance') || str_contains($lower, 'insufficient')) {
        return 'AI advisor is temporarily unavailable. Please try again later.';
    }
    if (str_contains($lower, 'http 401') || str_contains($lower, 'unauthorized') || str_contains($lower, 'invalid api key')) {
        return 'AI advisor is temporarily unavailable. Please try again later.';
    }
    if (str_contains($lower, 'http 429') || str_contains($lower, 'rate limit')) {
        return 'Too many requests right now — please wait a moment and try again.';
    }
    if (preg_match('/http 5\d\d/', $lower) || str_contains($lower, 'overloaded')) {
        return 'AI advisor is temporarily overloaded. Please try again shortly.';
    }
    if (str_contains($lower, 'curl error') || str_contains($lower, 'connection') || str_contains($lower, 'timeout')) {
        return 'Connection issue reaching the advisor. Please try again.';
    }
    return 'Something went wrong — please try again.';
}

function respond_json(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function respond_error(int $statusCode, string $errorCode, string $message): void
{
    respond_json($statusCode, [
        'answer'             => $message,
        'cited_card_ids'     => [],
        'cited_roadmap_step' => null,
        'reasoning_summary'  => '',
        'error'              => $errorCode,
    ]);
}

function respond_fallback(string $message): void
{
    respond_json(200, [
        'answer'             => $message,
        'cited_card_ids'     => [],
        'cited_roadmap_step' => null,
        'reasoning_summary'  => '',
    ]);
}
