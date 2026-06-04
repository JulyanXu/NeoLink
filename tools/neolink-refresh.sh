#!/usr/bin/env bash
# NeoLink homepage hourly refresh runner.
# Invoked by launchd (com.neolink.homepage-refresh) every hour at :07.
# Also safe to run manually: `bash tools/neolink-refresh.sh`
#
# Exit code is always 0 — launchd should not enter a death loop on a single
# failed run. The actual run outcome is recorded in var/hermes/runs/*.log
# and in the maintenance logs.

set -uo pipefail

ROOT="/Users/julyan/Desktop/NeoLink"
PROMPT="$ROOT/tools/neolink-refresh-prompt.md"
TS="$(date +%Y%m%d%H%M)"
LOG_DIR="$ROOT/var/hermes/runs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/refresh-${TS}.log"

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
SYSTEM_PROMPT="You are the NeoLink homepage hourly refresh automation. Project root: $ROOT. Strictly follow docs/automation-handover.md §3 (freshness rules) and docs/hermes-content-ops.md (content schema and rsync conventions). On no-change: do NOT bump generated_at, feed.js?v=, or any visible timestamps. On update: commit to local main, push to BOTH origin (github.com/JulyanXu/NeoLink) and gitee (gitee.com/JulyanXu/NeoLink), then rsync to neolink:/var/www/neolink/. If any push or rsync fails, report the exact failure cause in the maintenance log — do NOT claim success. Always append (prepend) an entry to BOTH docs/maintenance-log.md AND var/hermes/maintenance-log.md, and prepend a record to var/hermes/state/crawl_runs.json. Stay within /Users/julyan/Desktop/NeoLink. Do not edit nginx, /var/www/neolink, or anything outside the project. Exit cleanly."

# Strict tool allowlist: only the project-maintenance surface.
# This way, even if the prompt drifts, the agent can't escape the project.
ALLOWED='Bash(git:*),Bash(rsync:*),Bash(ssh:*),Bash(node:*),Bash(curl:*),Bash(sha256sum:*),Bash(stat:*),Bash(head:*),Bash(tail:*),Bash(grep:*),Bash(date:*),Bash(echo:*),Bash(mkdir:*),Bash(touch:*),Bash(cp:*),Bash(mv:*),Bash(sed:*),Bash(cat:*),Bash(awk:*),Bash(wc:*),Read,Edit,Write,Glob,Grep,WebFetch,WebSearch'

{
  echo "=== neolink refresh started at $(date -Iseconds) ==="
  echo "host=$(hostname) user=$(whoami) pwd=$(pwd)"
  echo "--- claude -p output below ---"

  # shellcheck disable=SC2086
  claude -p "$PROMPT_TEXT" \
    --add-dir "$ROOT" \
    --allowedTools "$ALLOWED" \
    --append-system-prompt "$SYSTEM_PROMPT" \
    2>&1
  RC=$?

  echo "--- claude -p exited with $RC ---"
  echo "=== neolink refresh finished at $(date -Iseconds) ==="
} >> "$LOG_FILE" 2>&1

# Always exit 0 so launchd doesn't disable us after a single bad run.
exit 0
