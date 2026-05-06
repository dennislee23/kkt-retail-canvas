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
const RETAIL_ADVISOR_DEFAULT_MODEL      = 'claude-sonnet-4-5';
const RETAIL_ADVISOR_MAX_TOKENS         = 800;   // 120-word answer + ~200 tokens of meta JSON ≈ 350 tokens, 800 is generous
const RETAIL_ADVISOR_TIMEOUT_SECONDS    = 60;    // streaming can take longer than non-stream
const RETAIL_ADVISOR_MAX_MESSAGE_LENGTH = 2000;
const RETAIL_ADVISOR_RATE_LIMIT         = 10;
const RETAIL_ADVISOR_RATE_WINDOW        = 60;
const RETAIL_ADVISOR_API_URL            = 'https://api.anthropic.com/v1/messages';

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

    $accumulated = '';
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
    });

    sse_emit('done', ['fullText' => $accumulated]);

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
function stream_claude(string $apiKey, string $system, string $user, callable $onText): void
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
        CURLOPT_WRITEFUNCTION  => function($ch, string $chunk) use (&$sseBuffer, &$apiError, &$apiHttp, $onText) {
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
                // We deliberately ignore message_start, content_block_start,
                // ping, message_delta, message_stop — they don't carry text
                // and the "done" marker on our side comes from curl finishing.
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
