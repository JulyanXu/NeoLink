#!/usr/bin/env bash
# NeoLink homepage two-hour refresh runner.
# Invoked by launchd (com.neolink.homepage-refresh) every 2 hours at :07.
# Also safe to run manually: `bash tools/neolink-refresh.sh`
#
# Exit code is always 0 — launchd should not enter a death loop on a single
# failed run. The actual run outcome is recorded in var/hermes/runs/*.log
# and in the maintenance logs.
#
# Trap guarantees the log footer is written on EXIT/INT/TERM (and the
# .current sentinel is removed) so a SIGKILLed run still leaves a trace
# that the watchdog can detect.

set -uo pipefail

ROOT="/Users/julyan/Desktop/NeoLink"
[ -d "/Users/julyan/NeoLink" ] && ROOT="/Users/julyan/NeoLink"

PROMPT="$ROOT/tools/neolink-refresh-prompt.md"
TS="$(date +%Y%m%d%H%M)"
LOG_DIR="$ROOT/var/hermes/runs"
SENTINEL="$LOG_DIR/.current"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/refresh-${TS}.log"

# Write sentinel: marks an in-progress run. Watchdog reads this to detect
# abandoned runs (sentinel older than 30 min).
echo "$(date -Iseconds) start claude_bin=/opt/homebrew/bin/claude root=$ROOT" > "$SENTINEL"

# Trap to ALWAYS write log footer + remove sentinel on exit.
# Note: SIGKILL (-9) cannot be trapped; for that case, the .current
# sentinel stays on disk and the watchdog detects a stale run.
cleanup() {
  local rc=$?
  {
    echo "--- claude -p exited with $rc ---"
    echo "=== neolink refresh finished at $(date -Iseconds) (exit=$rc) ==="
  } >> "$LOG_FILE" 2>&1
  rm -f "$SENTINEL"
}
trap cleanup EXIT
trap 'cleanup; exit 130' INT
trap 'cleanup; exit 143' TERM

# Use the real npm-installed claude binary by absolute path. The cmux-bundled
# `claude` in /Applications/cmux.app/.../bin shadows the real one in
# interactive shells and is unsafe to invoke from launchd (it depends on
# cmux session env vars we don't have).
CLAUDE_BIN="/opt/homebrew/bin/claude"
if [ ! -x "$CLAUDE_BIN" ]; then
  CLAUDE_BIN="/opt/homebrew/lib/node_modules/@anthropic-ai/claude-code/bin/claude.exe"
fi
if [ ! -x "$CLAUDE_BIN" ]; then
  echo "FATAL: claude binary not found at expected locations" >> "$LOG_FILE"
  exit 0
fi

cd "$ROOT" || {
  echo "FATAL: cannot cd $ROOT" >> "$LOG_FILE"
  exit 0
}

if [ ! -f "$PROMPT" ]; then
  echo "FATAL: prompt file not found: $PROMPT" >> "$LOG_FILE"
  exit 0
fi

# Read prompt as the inline instruction for claude -p.
PROMPT_TEXT="$(cat "$PROMPT")"

# System-level reinforcement of the hard rules.
SYSTEM_PROMPT="You are the NeoLink homepage two-hour refresh automation. Project root: $ROOT. Strictly follow docs/automation-handover.md §3 (freshness rules) and docs/hermes-content-ops.md (content schema and rsync conventions). **Always bump metadata timestamps (generated_at / feed.js?v= / hero) on every run, including no-change runs** — but never fabricate content array entries. On update: commit to local main, push to BOTH origin (github.com/JulyanXu/NeoLink) and gitee (gitee.com/JulyanXu/NeoLink), then rsync to neolink:/var/www/neolink/. If any push or rsync fails, report the exact failure cause in the maintenance log — do NOT claim success. Always append (prepend) an entry to BOTH docs/maintenance-log.md AND var/hermes/maintenance-log.md, and prepend a record to var/hermes/state/crawl_runs.json. Stay within /Users/julyan/NeoLink. Do not edit nginx, /var/www/neolink, or anything outside the project. Exit cleanly.

HARD RULES — NON-NEGOTIABLE:
- generated_at MUST be set to the current run's actual time (use shell 'date -Iseconds' or the new Date().toISOString()), NEVER a future scheduled time and NEVER an old value. **Bump this on every run, including no-change.**
- The log file MUST end with a '=== neolink refresh finished at ... ===' footer. If you cannot write the footer for any reason, explicitly log 'ABORT: cannot write footer' to the log.
- **On no-change**: do NOT modify the content arrays (headlines, latest, metrics, materials, etc.) — they stay as-is. But DO bump generated_at, feed.js?v=, and hero timestamp. This makes the page look 'alive' without fabricating entries.
- If any external rsync or push fails, log the exact error verbatim — do NOT claim '已同步' or success.
- If you find server has different content than local, log 'P0 server drift re-detected' and proceed with rsync to overwrite."

# Strict tool allowlist: only the project-maintenance surface.
# This way, even if the prompt drifts, the agent can't escape the project.
ALLOWED='Bash(git:*),Bash(rsync:*),Bash(ssh:*),Bash(node:*),Bash(curl:*),Bash(sha256sum:*),Bash(stat:*),Bash(head:*),Bash(tail:*),Bash(grep:*),Bash(date:*),Bash(echo:*),Bash(mkdir:*),Bash(touch:*),Bash(cp:*),Bash(mv:*),Bash(sed:*),Bash(cat:*),Bash(awk:*),Bash(wc:*),Read,Edit,Write,Glob,Grep,WebFetch,WebSearch'

{
  echo "=== neolink refresh started at $(date -Iseconds) ==="
  echo "host=$(hostname) user=$(whoami) pwd=$(pwd)"
  echo "claude_bin=$CLAUDE_BIN ($("$CLAUDE_BIN" --version 2>&1 | head -1))"
  echo "--- claude -p output below ---"

  # shellcheck disable=SC2086
  "$CLAUDE_BIN" -p "$PROMPT_TEXT" \
    --add-dir "$ROOT" \
    --allowedTools "$ALLOWED" \
    --append-system-prompt "$SYSTEM_PROMPT" \
    2>&1
  RC=$?

  echo "--- claude -p exited with $RC ==="

  # ALWAYS bump metadata timestamps after claude -p, regardless of what the
  # LLM did or didn't do. This is the "page in motion" guarantee from §0.4:
  # even if the LLM was killed (RC != 0) or chose no-change, the user sees
  # fresh timestamps on the page. Content arrays are NOT touched (the LLM
  # would have updated those if it found new data).
  echo "--- post-claude mandatory metadata bump starting ---"
  NOW_ISO="$(date -Iseconds)"
  NOW_V="$(date +%Y%m%d%H%M)"
  NOW_HHMM="$(date +%H:%M)"

  if [ -f "$ROOT/data/feed.js" ]; then
    # Bump generated_at and append a "(no-change check by bash)" marker to note.
    python3 - "$ROOT/data/feed.js" "$NOW_ISO" "$RC" <<'PYEOF' >> "$LOG_FILE" 2>&1
import re, sys
fp, now_iso, claude_rc = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(fp).read()
s_new = re.sub(r'"generated_at":\s*"[^"]+"', f'"generated_at": "{now_iso}"', s, count=1)
marker = f' [no-change check by bash @ {now_iso} claude={claude_rc}]'
m = re.search(r'("note":\s*")([^"]+)(")', s_new)
if m:
    new_note = m.group(2) + marker
    s_new = s_new[:m.start()] + m.group(1) + new_note + m.group(3) + s_new[m.end():]
open(fp, 'w').write(s_new)
print(f"feed.js metadata bumped: generated_at={now_iso}, note appended")
PYEOF
  fi

  # Bump HTML cache-bust on all 3 pages (if they exist).
  for f in index.html news-more.html article.html; do
    if [ -f "$ROOT/$f" ]; then
      sed -i '' "s|feed.js?v=[0-9]*|feed.js?v=${NOW_V}|g" "$ROOT/$f"
    fi
  done

  # Bump index.html hero timestamp.
  if [ -f "$ROOT/index.html" ]; then
    sed -i '' "s|更新 [0-9][0-9]:[0-9][0-9] (GMT+8)|更新 ${NOW_HHMM} (GMT+8)|g" "$ROOT/index.html"
  fi
  echo "--- post-claude metadata bump: generated_at=${NOW_ISO} v=${NOW_V} hero=${NOW_HHMM} ---"

  # Validate (no-change run: content unchanged, so node --check should pass).
  node --check "$ROOT/data/feed.js" 2>&1 && echo "feed.js syntax OK"

  # ALWAYS rsync after claude -p, regardless of what the LLM did or didn't do.
  # This ensures the deploy step survives even if claude -p is SIGKILLed before
  # it can complete step 10 of the prompt. Idempotent: if the LLM already
  # rsynced, this is a no-op. If the LLM didn't rsync, this catches up.
  echo "--- post-claude mandatory rsync starting ---"
  rsync -avz --delete \
    --exclude='sources/' \
    "$ROOT"/index.html \
    "$ROOT"/news-more.html \
    "$ROOT"/article.html \
    "$ROOT"/enterprise-map.html \
    "$ROOT"/styles.css \
    "$ROOT"/script.js \
    "$ROOT"/news-more.js \
    "$ROOT"/article.js \
    "$ROOT"/enterprise-map.js \
    "$ROOT"/bg-light.png \
    "$ROOT"/bg-dark.png \
    "$ROOT"/sidebar.png \
    "$ROOT"/side.png \
    "$ROOT"/Logo.png \
    "$ROOT"/favicon.png \
    "$ROOT"/data \
    neolink:/var/www/neolink/ 2>&1
  RS=$?
  echo "--- post-claude rsync exit: $RS ---"

  echo "=== neolink refresh finished at $(date -Iseconds) (claude=$RC rsync=$RS) ==="
} >> "$LOG_FILE" 2>&1

# Always exit 0 so launchd doesn't disable us after a single bad run.
exit 0
