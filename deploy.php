<?php
/**
 * Self-deploy script for retail.kittykat.tech.
 *
 * Pull-from-GitHub on demand. Mirror of the fuel/alfa REV 3.0 deploy.php
 * pattern, simplified — there's no frontend build step here, the site is
 * a single static HTML page plus two data modules.
 *
 * Modes:
 *   ?key=<DEPLOY_KEY>&mode=soft   — git stash + pull (preserves any local changes)
 *   ?key=<DEPLOY_KEY>&mode=hard   — git fetch + reset --hard + pull (default)
 *   ?key=<DEPLOY_KEY>&mode=status — git status, no changes
 *
 * Setup on a fresh server:
 *   1. Clone https://github.com/dennislee23/kkt-retail-canvas into the retail folder.
 *   2. Create a .env file at the repo root with: DEPLOY_KEY=<long random string>
 *   3. Make sure .env is NOT served by the web server (.htaccess rule is in this repo).
 *   4. Visit https://retail.kittykat.tech/update.html to push updates.
 */

// ── Auth ─────────────────────────────────────────────────────────────────────
$DEPLOY_KEY = getenv('DEPLOY_KEY') ?: (file_exists(__DIR__ . '/.env') ? trim(array_reduce(
    file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES),
    fn($carry, $line) => str_starts_with($line, 'DEPLOY_KEY=') ? substr($line, 11) : $carry,
    ''
)) : '');

if (empty($DEPLOY_KEY)) {
    header('HTTP/1.1 500 Internal Server Error');
    die('DEPLOY_KEY not configured');
}

if (!isset($_GET['key']) || !hash_equals($DEPLOY_KEY, $_GET['key'])) {
    header('HTTP/1.1 403 Forbidden');
    die('Access denied');
}

header('Content-Type: text/plain');

// ── Mode ─────────────────────────────────────────────────────────────────────
$mode = $_GET['mode'] ?? 'hard';
if (!in_array($mode, ['soft', 'hard', 'status'], true)) {
    die("Unknown mode: $mode. Use soft, hard, or status.");
}

$projectDir = __DIR__;
chdir($projectDir);

// Branch-aware deploy. The retail folder is its own git checkout — main is
// the default. If anyone deploys a different branch (e.g. preview/staging),
// the same script works without per-folder edits.
$currentBranch = trim((string)shell_exec('git rev-parse --abbrev-ref HEAD 2>/dev/null'));
if ($currentBranch === '' || $currentBranch === 'HEAD') {
    $currentBranch = 'main';
}

$labels = [
    'soft'   => 'SOFT DEPLOY (stash + pull)',
    'hard'   => 'HARD DEPLOY (reset + pull)',
    'status' => 'STATUS CHECK',
];
echo "=== {$labels[$mode]} ===\n";
echo "Directory: $projectDir\n";
echo "Branch:    $currentBranch\n\n";

// ── Execute ──────────────────────────────────────────────────────────────────
if ($mode === 'status') {
    echo shell_exec('git status 2>&1') . "\n";
    echo shell_exec('git log --oneline -5 2>&1') . "\n";

} elseif ($mode === 'soft') {
    echo "Stashing local changes...\n";
    echo shell_exec('git stash 2>&1') . "\n";

    echo "Pulling latest code from origin/$currentBranch...\n";
    echo shell_exec("git pull origin " . escapeshellarg($currentBranch) . " 2>&1") . "\n";

} elseif ($mode === 'hard') {
    echo "Fetching origin...\n";
    echo shell_exec('git fetch origin 2>&1') . "\n";

    echo "Hard reset to origin/$currentBranch...\n";
    echo shell_exec("git reset --hard origin/" . escapeshellarg($currentBranch) . " 2>&1") . "\n";

    echo "Pulling latest code...\n";
    echo shell_exec("git pull origin " . escapeshellarg($currentBranch) . " 2>&1") . "\n";
}

// ── Post-deploy checks ──────────────────────────────────────────────────────
if ($mode !== 'status') {
    echo "\n--- Post-deploy ---\n";

    // Smoke check the three load-bearing files. If any disappeared, the deploy
    // brought in something broken — the user sees this in the output.
    foreach (['Retail_AI_Canvas_V3.html', 'canvas-data.js', 'roadmap-data.js'] as $f) {
        echo file_exists("{$projectDir}/{$f}") ? "{$f}: OK\n" : "{$f}: MISSING\n";
    }

    // Write version.json so the site can show what's running. The frontend
    // reads this on load and renders a small short-hash badge in the corner.
    // Fields are minimal — full hash for click-through to GitHub, short hash
    // for display, branch, last commit message and timestamp, plus the deploy
    // moment itself (so a stale deploy still shows when it happened).
    $commit     = trim((string)shell_exec('git rev-parse HEAD 2>/dev/null'));
    $short      = trim((string)shell_exec('git rev-parse --short HEAD 2>/dev/null'));
    $message    = trim((string)shell_exec('git log -1 --pretty=%s 2>/dev/null'));
    $authoredAt = trim((string)shell_exec('git log -1 --pretty=%cI 2>/dev/null'));
    $payload = [
        'commit'     => $commit,
        'short'      => $short,
        'branch'     => $currentBranch,
        'message'    => $message,
        'authoredAt' => $authoredAt,
        'deployedAt' => date('c'),
    ];
    if (file_put_contents(
        $projectDir . '/version.json',
        json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)
    ) !== false) {
        echo "version.json: written ({$short})\n";
    } else {
        echo "version.json: WRITE FAILED\n";
    }

    if (function_exists('opcache_reset')) {
        opcache_reset();
        echo "Opcache: cleared\n";
    }
}

echo "\nDone at " . date('Y-m-d H:i:s') . "\n";
