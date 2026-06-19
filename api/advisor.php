<?php
/**
 * retail.kittykat.tech — Retail Advisor backend (self-contained, streaming).
 *
 * Streams Claude's response via Server-Sent Events so the user sees the
 * answer appearing as it's generated, not in a single 8-second blob.
 *
 * Why this file exists:
 *   The fuel-management /rev3/ codebase is gated by Apache Basic Auth and
 *   SetEnvIf bypass does not work on this hosting (zone.eu shared) — every
 *   test of /api/cron/* and /api/retail/* there returned 401 before PHP ran.
 *
 *   This file lives inside the retail/ folder which has no Basic Auth, so
 *   anonymous public traffic from retail.kittykat.tech can reach it.
 *
 * Output format on the wire (SSE):
 *   data: {"text": "Start with stock visibility..."}
 *   data: {"text": "—"}
 *   ...
 *   data: {"done": true, "fullText": "Start with stock...\n<<<META>>>\n{...}"}
 *
 * The model itself is asked (in 01-base.md) to produce:
 *   <plain answer>
 *   <<<META>>>
 *   {"cited_card_ids": [...], "cited_roadmap_step": "...", "reasoning_summary": "..."}
 *
 * The frontend streams the answer above <<<META>>> char-by-char into the
 * transcript, then on `done` parses the meta block to populate the
 * reasoning panel.
 *
 * Why inline (not autoloader): single static-host folder, no composer.
 */

declare(strict_types=1);

// ─── Config ──────────────────────────────────────────────────────────────────
// Default model is Haiku 4.5 — ~3-4x cheaper per call than Sonnet for a public
// advisor on the owner's billing. Override per-deploy via CLAUDE_MODEL in .env
// (e.g. claude-sonnet-4-5) without touching code.
const RETAIL_ADVISOR_DEFAULT_MODEL      = 'claude-haiku-4-5';
const RETAIL_ADVISOR_MAX_TOKENS         = 800;   // 120-word answer + ~200 tokens of meta JSON ≈ 350 tokens, 800 is generous
const RETAIL_ADVISOR_TIMEOUT_SECONDS    = 60;    // streaming can take longer than non-stream
const RETAIL_ADVISOR_MAX_MESSAGE_LENGTH = 2000;
const RETAIL_ADVISOR_RATE_LIMIT         = 10;
const RETAIL_ADVISOR_RATE_WINDOW        = 60;
const RETAIL_ADVISOR_API_URL            = 'https://api.anthropic.com/v1/messages';

// Cost controls (all .env-overridable so they can be tuned without a redeploy).
//   ADVISOR_DAILY_CAP   — global cap on live Claude calls/day across all IPs.
//                         Above it, the advisor serves a friendly "limit reached"
//                         message and makes NO Claude call. Hard ceiling on the
//                         daily bill regardless of IP rotation. 0 = disabled.
//   ADVISOR_CACHE_TTL   — response-cache lifetime in seconds. Identical
//                         (normalized) question + context → replayed from cache,
//                         ZERO Claude call. 0 = disabled.
const RETAIL_ADVISOR_DAILY_CAP_DEFAULT  = 300;
const RETAIL_ADVISOR_CACHE_TTL_DEFAULT  = 21600; // 6h
const RETAIL_ADVISOR_ALLOWED_HOSTS      = ['retail.kittykat.tech'];

// Hardcoded fallback prompt — used only if knowledge/ directory is empty
// or unreadable. The real prompt is assembled at request time from the
// .md files in retail/knowledge/ — see load_system_prompt(). This makes
// the advisor's behaviour editable WITHOUT touching code: an editor can
// edit knowledge/*.md (or add new files) and the next request picks up
// the change.
const RETAIL_ADVISOR_FALLBACK_PROMPT = <<<'PROMPT'
You are a retail transformation advisor for mid-sized food retailers. Speak in
business language (margin, waste, availability, basket, working capital).
Stay under 120 words.

Output your answer as plain text, then on a new line the literal token
<<<META>>>, then a JSON object:

{"cited_card_ids": [], "cited_roadmap_step": null, "reasoning_summary": ""}
PROMPT;

const RETAIL_ADVISOR_ALLOWED_ROADMAP_STEPS = ['see', 'control', 'optimize', 'scale', 'expand'];


// ─── Entry: handle CORS, OPTIONS, method check ───────────────────────────────
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$originAllowed = ($origin === 'https://retail.kittykat.tech')
    || (preg_match('#^http://(localhost|127\.0\.0\.1)(:\d+)?$#', $origin) === 1);

if ($originAllowed) {
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
    header('Content-Type: application/json');
    respond_error_json(405, 'method_not_allowed', 'Only POST is allowed.');
}

// ─── Anti-abuse gate: request must originate from the canvas ─────────────────
// CORS only constrains browsers; a direct curl/bot POST ignores it and would
// otherwise reach Claude on the owner's key. Reject requests whose Origin/
// Referer isn't our site BEFORE any Claude call. Still in the pre-echo zone.
origin_referer_gate();

// ─── Rate limit (per-IP, sliding window, file-based) ─────────────────────────
// Sets headers + emits a JSON 429 response and exits if the bucket is full.
// SSE streaming doesn't start yet — we're still in the "before any echo" zone.
rate_limit_check();

// ─── Parse + validate request body ───────────────────────────────────────────
$rawBody = file_get_contents('php://input');
$body    = json_decode((string)$rawBody, true);
if (!is_array($body)) {
    header('Content-Type: application/json');
    respond_error_json(400, 'invalid_json', 'Request body must be valid JSON.');
}

$message = isset($body['message']) && is_string($body['message']) ? trim($body['message']) : '';
if ($message === '') {
    header('Content-Type: application/json');
    respond_error_json(400, 'empty_message', 'Message is required.');
}
if (mb_strlen($message) > RETAIL_ADVISOR_MAX_MESSAGE_LENGTH) {
    header('Content-Type: application/json');
    respond_error_json(400, 'message_too_long',
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

// ─── Switch into SSE streaming mode ──────────────────────────────────────────
// From this point on, everything is `data: {...}\n\n` frames. Errors are
// emitted as text events too (so the frontend can display them in the
// transcript) — no more http_response_code() changes possible after the
// first echo.
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('X-Accel-Buffering: no'); // hint to nginx not to buffer; harmless on Apache
@ini_set('output_buffering',     'off');
@ini_set('zlib.output_compression', 'off');
@ini_set('implicit_flush',       '1');
while (ob_get_level() > 0) @ob_end_flush();
ob_implicit_flush(true);
@set_time_limit(0);
@ignore_user_abort(false);

// Tell the frontend the stream has started — useful for showing a "thinking"
// state immediately even before the first text token lands.
sse_emit('start', ['model' => load_model()]);

$apiKey = load_api_key();
if (!$apiKey) {
    sse_emit('text', ['text' => 'AI advisor is temporarily unavailable. Please try again later.']);
    sse_emit('done', ['fullText' => '']);
    exit;
}

try {
    $systemPrompt = load_system_prompt();
    $userMsg      = build_user_message($message, $context);
    $model        = load_model();

    // ── Response cache ───────────────────────────────────────────────────────
    // Identical (normalized) question + canvas context + same knowledge base
    // → replay the stored answer, ZERO Claude call. Keyed by a hash of the
    // system prompt so editing knowledge/*.md auto-invalidates the cache.
    $cacheKey = response_cache_key($message, $context, $systemPrompt, $model);
    $cached   = response_cache_get($cacheKey);
    if ($cached !== null) {
        replay_cached_sse($cached);
        usage_log('cache_hit', $model, []);
        exit;
    }

    // ── Daily spend cap ──────────────────────────────────────────────────────
    // Hard ceiling on live Claude calls/day across all IPs — the backstop
    // against an IP-rotating bot draining the balance. Counts only real calls
    // (cache misses). Above the cap: friendly message, no Claude call.
    if (!daily_budget_reserve()) {
        sse_emit('text', ['text' => 'The AI advisor has reached today’s usage limit. Please try again tomorrow, or email hello@kittykat.tech.']);
        sse_emit('done', ['fullText' => '']);
        usage_log('capped', $model, []);
        exit;
    }

    $accumulated = '';
    $usage       = [];
    stream_claude($apiKey, $systemPrompt, $userMsg, function(string $delta) use (&$accumulated) {
        $accumulated .= $delta;

        // Don't stream the META block to the user — they don't need to see
        // raw JSON appearing. Only stream the part before <<<META>>>.
        $metaPos = strpos($accumulated, '<<<META>>>');
        if ($metaPos === false) {
            // Still in the answer portion — emit the new delta.
            sse_emit('text', ['text' => $delta]);
        } else {
            // META marker reached. Emit only the portion of this delta that
            // came before the marker (if any), then suppress further deltas
            // for the answer transcript.
            $deltaLen   = strlen($delta);
            $beforeMeta = strlen($accumulated) - $metaPos;
            if ($beforeMeta < $deltaLen) {
                $tail = substr($delta, 0, $deltaLen - $beforeMeta);
                if ($tail !== '') sse_emit('text', ['text' => $tail]);
            }
            // Subsequent deltas land entirely after the marker → silent.
        }
    }, $usage);

    sse_emit('done', ['fullText' => $accumulated]);

    // Store the complete answer for future identical questions, and log token
    // usage so $/day and cache-hit rate are measurable even on a shared key.
    if (trim($accumulated) !== '') {
        response_cache_put($cacheKey, $accumulated);
    }
    usage_log('miss', $model, $usage);

} catch (\Throwable $e) {
    error_log('retail-advisor stream error: ' . $e->getMessage());
    sse_emit('text', ['text' => "\n\n" . friendly_error($e->getMessage())]);
    sse_emit('done', ['fullText' => '']);
}


// ═══════════════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Emit one Server-Sent Event frame and flush. Per the SSE spec, each event
 * is `data: <json>\n\n`. We don't use the `event:` field since the payload
 * itself carries the type marker (text / start / done / error).
 */
function sse_emit(string $type, array $payload): void
{
    $payload['type'] = $type;
    echo 'data: ' . json_encode($payload, JSON_UNESCAPED_UNICODE) . "\n\n";
    @flush();
}

/**
 * Stream Claude's response via curl + WRITEFUNCTION. The callback is
 * invoked once for each text delta the model produces. Anthropic's SSE
 * format wraps each delta in a `content_block_delta` event — we parse
 * those events out of the chunked response and pass just the text to
 * the callback.
 *
 * Throws on network / API errors. Caller handles user-facing fallback.
 */
function stream_claude(string $apiKey, string $system, string $user, callable $onText, array &$usageOut = []): void
{
    $payload = json_encode([
        'model'      => load_model(),
        'max_tokens' => RETAIL_ADVISOR_MAX_TOKENS,
        'stream'     => true,
        'system'     => [
            ['type' => 'text', 'text' => $system, 'cache_control' => ['type' => 'ephemeral']],
        ],
        'messages'   => [
            ['role' => 'user', 'content' => $user],
        ],
    ], JSON_UNESCAPED_UNICODE);

    $sseBuffer = '';
    $apiError  = null;
    $apiHttp   = 0;

    $ch = curl_init(RETAIL_ADVISOR_API_URL);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_RETURNTRANSFER => false, // streaming via WRITEFUNCTION
        CURLOPT_TIMEOUT        => RETAIL_ADVISOR_TIMEOUT_SECONDS,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'x-api-key: ' . $apiKey,
            'anthropic-version: 2023-06-01',
            'anthropic-zdr: true',
            'Accept: text/event-stream',
        ],
        CURLOPT_WRITEFUNCTION  => function($ch, string $chunk) use (&$sseBuffer, &$apiError, &$apiHttp, &$usageOut, $onText) {
            // Capture first-chunk HTTP status. If it's an error response
            // (4xx/5xx), the body is JSON not SSE — accumulate and report.
            if ($apiHttp === 0) {
                $apiHttp = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
            }
            if ($apiHttp >= 400) {
                $apiError = ($apiError ?? '') . $chunk;
                return strlen($chunk);
            }

            $sseBuffer .= $chunk;
            // Parse out complete SSE events (terminated by \n\n).
            while (($pos = strpos($sseBuffer, "\n\n")) !== false) {
                $event = substr($sseBuffer, 0, $pos);
                $sseBuffer = substr($sseBuffer, $pos + 2);

                // Each event is one or more lines like `event: name` and
                // `data: payload`. We only care about the `data:` line.
                $dataLine = null;
                foreach (preg_split('/\r?\n/', $event) as $line) {
                    if (strncmp($line, 'data:', 5) === 0) {
                        $dataLine = ltrim(substr($line, 5));
                        break;
                    }
                }
                if ($dataLine === null) continue;

                $parsed = json_decode($dataLine, true);
                if (!is_array($parsed)) continue;

                // text_delta is what the model is producing word-by-word.
                if (($parsed['type'] ?? '') === 'content_block_delta'
                    && (($parsed['delta']['type'] ?? '') === 'text_delta')
                    && isset($parsed['delta']['text']) && is_string($parsed['delta']['text'])) {
                    $onText($parsed['delta']['text']);
                }
                // Capture token usage for cost measurement. message_start carries
                // input + prompt-cache read/write counts; message_delta carries the
                // running output_tokens. We keep the latest of each.
                elseif (($parsed['type'] ?? '') === 'message_start' && isset($parsed['message']['usage'])) {
                    $u = $parsed['message']['usage'];
                    $usageOut['input']       = (int)($u['input_tokens'] ?? 0);
                    $usageOut['cache_write']  = (int)($u['cache_creation_input_tokens'] ?? 0);
                    $usageOut['cache_read']   = (int)($u['cache_read_input_tokens'] ?? 0);
                    $usageOut['output']      = (int)($u['output_tokens'] ?? 0);
                }
                elseif (($parsed['type'] ?? '') === 'message_delta' && isset($parsed['usage']['output_tokens'])) {
                    $usageOut['output'] = (int)$parsed['usage']['output_tokens'];
                }
                // content_block_start, ping, message_stop carry no text/usage we need.
            }

            return strlen($chunk);
        },
    ]);

    $ok      = curl_exec($ch);
    $curlErr = curl_error($ch);
    curl_close($ch);

    if ($apiError !== null) {
        $msg = "HTTP {$apiHttp}: " . substr(trim($apiError), 0, 500);
        throw new \RuntimeException("Claude API {$msg}");
    }
    if ($ok === false || $curlErr !== '') {
        throw new \RuntimeException('Claude API curl error: ' . $curlErr);
    }
}

/**
 * Read ANTHROPIC_API_KEY from the .env file in the retail folder root.
 */
function load_api_key(): string
{
    return load_env('ANTHROPIC_API_KEY');
}

/**
 * Read CLAUDE_MODEL override from .env. Falls back to the default if not set.
 */
function load_model(): string
{
    $override = load_env('CLAUDE_MODEL');
    return $override !== '' ? $override : RETAIL_ADVISOR_DEFAULT_MODEL;
}

/**
 * Generic .env reader. Single-line `KEY=value` format, no quotes processing.
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

/** Read an integer .env override, falling back to a default. */
function load_env_int(string $key, int $default): int
{
    $v = load_env($key);
    return ($v !== '' && ctype_digit($v)) ? (int)$v : $default;
}

/**
 * Anti-abuse gate: the request must carry an Origin or Referer from the canvas.
 * Browsers send these on the advisor's same-origin POST; a bare curl/bot POST
 * does not, so this blocks the cheap abuse path before any Claude call. Not a
 * cryptographic control (headers are spoofable) — the daily cap is the hard
 * backstop; this just stops casual balance-draining.
 */
function origin_referer_gate(): void
{
    $candidates = [];
    if (!empty($_SERVER['HTTP_ORIGIN']))  $candidates[] = $_SERVER['HTTP_ORIGIN'];
    if (!empty($_SERVER['HTTP_REFERER'])) $candidates[] = $_SERVER['HTTP_REFERER'];

    foreach ($candidates as $u) {
        $host = parse_url($u, PHP_URL_HOST) ?: '';
        if (in_array($host, RETAIL_ADVISOR_ALLOWED_HOSTS, true)
            || $host === 'localhost' || $host === '127.0.0.1') {
            return;
        }
    }

    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode([
        'error'   => 'forbidden',
        'message' => 'This endpoint is only available from the canvas.',
    ]);
    exit;
}

/** Normalize a question so trivial variants share one cache entry. */
function normalize_question(string $s): string
{
    $s = mb_strtolower(trim($s));
    $s = preg_replace('/\s+/u', ' ', $s);          // collapse internal whitespace
    return trim((string)$s, " \t\n\r\0\x0B\"'`.,!?;:—–-");
}

/**
 * Response-cache key. Includes the canvas context (it changes the answer) and a
 * hash of the system prompt, so editing knowledge/*.md auto-invalidates entries.
 */
function response_cache_key(string $message, array $context, string $systemPrompt, string $model): string
{
    ksort($context);
    return hash('sha256', implode('|', [
        normalize_question($message),
        json_encode($context, JSON_UNESCAPED_UNICODE),
        substr(sha1($systemPrompt), 0, 16),
        $model,
    ]));
}

function response_cache_path(string $key): string
{
    return sys_get_temp_dir() . '/kkt_advcache_retail_' . $key . '.json';
}

function response_cache_get(string $key): ?string
{
    if (load_env_int('ADVISOR_CACHE_TTL', RETAIL_ADVISOR_CACHE_TTL_DEFAULT) <= 0) return null;
    $path = response_cache_path($key);
    $raw  = @file_get_contents($path);
    if ($raw === false) return null;
    $row = json_decode($raw, true);
    if (!is_array($row) || (int)($row['exp'] ?? 0) < time()) {
        @unlink($path);
        return null;
    }
    return is_string($row['t'] ?? null) ? $row['t'] : null;
}

function response_cache_put(string $key, string $text): void
{
    $ttl = load_env_int('ADVISOR_CACHE_TTL', RETAIL_ADVISOR_CACHE_TTL_DEFAULT);
    if ($ttl <= 0) return;
    @file_put_contents(
        response_cache_path($key),
        json_encode(['t' => $text, 'exp' => time() + $ttl], JSON_UNESCAPED_UNICODE),
        LOCK_EX
    );
    if (random_int(1, 50) === 1) response_cache_gc(); // opportunistic cleanup
}

function response_cache_gc(): void
{
    $now = time();
    foreach (glob(sys_get_temp_dir() . '/kkt_advcache_retail_*.json') ?: [] as $f) {
        $row = json_decode((string)@file_get_contents($f), true);
        if (!is_array($row) || (int)($row['exp'] ?? 0) < $now) @unlink($f);
    }
}

/** Replay a cached answer over SSE — the answer portion as text, then done. */
function replay_cached_sse(string $fullText): void
{
    $metaPos = strpos($fullText, '<<<META>>>');
    $answer  = $metaPos === false ? $fullText : substr($fullText, 0, $metaPos);
    if ($answer !== '') sse_emit('text', ['text' => $answer]);
    sse_emit('done', ['fullText' => $fullText]);
}

/**
 * Daily global cap on live Claude calls (cache misses), across all IPs. The hard
 * ceiling on the daily bill regardless of IP rotation. File-based, per UTC day.
 * Returns true if a slot was reserved, false if the cap is already reached.
 * Fails open on infra error — never blocks a legit user over a file glitch.
 */
function daily_budget_reserve(): bool
{
    $cap = load_env_int('ADVISOR_DAILY_CAP', RETAIL_ADVISOR_DAILY_CAP_DEFAULT);
    if ($cap <= 0) return true; // disabled

    $day  = gmdate('Y-m-d');
    $path = sys_get_temp_dir() . '/kkt_advbudget_retail.json';
    $fp = @fopen($path, 'c+');
    if (!$fp) return true;
    try {
        if (!flock($fp, LOCK_EX)) return true;
        $raw   = stream_get_contents($fp);
        $data  = ($raw === '' || $raw === false) ? [] : (json_decode($raw, true) ?: []);
        $count = (($data['day'] ?? '') === $day) ? (int)($data['count'] ?? 0) : 0;
        if ($count >= $cap) return false;
        ftruncate($fp, 0); rewind($fp);
        fwrite($fp, json_encode(['day' => $day, 'count' => $count + 1]));
        fflush($fp);
        return true;
    } finally {
        if (is_resource($fp)) { flock($fp, LOCK_UN); fclose($fp); }
    }
}

/**
 * Append one usage line per request so $/day and cache-hit rate are measurable
 * from the server even while the API key is shared. Best-effort; never throws.
 * Columns: iso_time, mode, model, input, cache_read, cache_write, output.
 */
function usage_log(string $mode, string $model, array $usage): void
{
    $line = implode("\t", [
        gmdate('c'),
        $mode,
        $model,
        (int)($usage['input']       ?? 0),
        (int)($usage['cache_read']  ?? 0),
        (int)($usage['cache_write'] ?? 0),
        (int)($usage['output']      ?? 0),
    ]) . "\n";
    @file_put_contents(
        sys_get_temp_dir() . '/kkt_advisor_usage_retail_' . gmdate('Y-m-d') . '.log',
        $line, FILE_APPEND | LOCK_EX
    );
}

/**
 * Assemble the system prompt from the retail/knowledge/ directory.
 * Globs every .md file in alphabetical order and concatenates with --- separators.
 * Falls back to RETAIL_ADVISOR_FALLBACK_PROMPT if the directory is empty.
 */
function load_system_prompt(): string
{
    $dir = __DIR__ . '/../knowledge';
    if (!is_dir($dir)) {
        return RETAIL_ADVISOR_FALLBACK_PROMPT;
    }
    $files = glob($dir . '/*.md') ?: [];
    sort($files);
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
 * Embed canvas context in the user message so the model can ground its picks.
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
 * Per-IP sliding window. Same approach as PublicRateLimiter.php.
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
        if (!flock($fp, LOCK_EX)) return;

        $raw  = stream_get_contents($fp);
        $data = ($raw === '' || $raw === false) ? [] : (json_decode($raw, true) ?: []);

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
            header('Content-Type: application/json');
            header("Retry-After: {$retryAfter}");
            echo json_encode([
                'error'       => 'rate_limited',
                'message'     => "Too many requests. Limit: " . RETAIL_ADVISOR_RATE_LIMIT
                                 . " per " . RETAIL_ADVISOR_RATE_WINDOW . "s.",
                'retry_after' => $retryAfter,
            ]);
            exit;
        }

        $stamps[]   = $now;
        $data[$key] = $stamps;

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

/**
 * JSON error reply for the pre-streaming validation phase. Once SSE has
 * started we use sse_emit('text', ...) instead.
 */
function respond_error_json(int $statusCode, string $errorCode, string $message): void
{
    http_response_code($statusCode);
    echo json_encode([
        'answer'             => $message,
        'cited_card_ids'     => [],
        'cited_roadmap_step' => null,
        'reasoning_summary'  => '',
        'error'              => $errorCode,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
