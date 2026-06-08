#!/usr/bin/env bash
# NeoLink homepage refresh watchdog.
# Invoked by launchd (com.neolink.homepage-watchdog) every 30 minutes.
# Detects: stale in-progress run, killed run (no log footer), local/server
# feed.js?v= drift, missing recent log. Self-heals by force-triggering
# a fresh refresh and (if needed) running rsync to align server.
#
# Idempotent: if everything is healthy, just logs and exits.

set -uo pipefail

ROOT="/Users/julyan/Desktop/NeoLink"
[ -d "/Users/julyan/NeoLink" ] && ROOT="/Users/julyan/NeoLink"

LOG_DIR="$ROOT/var/hermes/runs"
SENTINEL="$LOG_DIR/.current"
TS="$(date +%Y%m%d%H%M)"
WD_LOG="$LOG_DIR/watchdog-${TS}.log"
mkdir -p "$LOG_DIR"

log() { echo "[$(date -Iseconds)] $*" >> "$WD_LOG"; }
NOW=$(date +%s)

issues=()
heal_action=""

# Check 1: stale in-progress sentinel (>30 min old).
if [ -f "$SENTINEL" ]; then
  s_mtime=$(stat -f %m "$SENTINEL")
  s_age=$(( NOW - s_mtime ))
  if [ "$s_age" -gt 1800 ]; then
    issues+=("stale_sentinel_${s_age}s")
    heal_action="force_refresh"
  fi
  log "sentinel present, age=${s_age}s"
else
  log "no sentinel (no in-progress run)"
fi

# Check 2: latest refresh log has a "finished" footer.
LATEST_LOG=$(ls -t "$LOG_DIR"/refresh-*.log 2>/dev/null | head -1)
if [ -z "$LATEST_LOG" ]; then
  issues+=("no_refresh_logs")
  heal_action="force_refresh"
  log "no refresh logs found"
else
  log "latest refresh log: $LATEST_LOG"
  if ! grep -q "neolink refresh finished at" "$LATEST_LOG"; then
    issues+=("latest_log_no_footer")
    heal_action="force_refresh"
  fi
  log "latest log has footer: $(grep -q "neolink refresh finished at" "$LATEST_LOG" && echo yes || echo NO)"
fi

# Check 3: latest log mtime (should be < 3 hours old for healthy 2h cadence).
if [ -n "$LATEST_LOG" ]; then
  l_mtime=$(stat -f %m "$LATEST_LOG")
  l_age_h=$(( (NOW - l_mtime) / 3600 ))
  log "latest log age: ${l_age_h}h"
  if [ "$l_age_h" -ge 3 ]; then
    issues+=("latest_log_${l_age_h}h_old")
    [ -z "$heal_action" ] && heal_action="force_refresh"
  fi
fi

# Check 4: local vs server feed.js?v= drift.
if [ -f "$ROOT/index.html" ] && ssh -o ConnectTimeout=5 -o BatchMode=yes neolink "test -f /var/www/neolink/index.html" 2>/dev/null; then
  local_v=$(grep -m1 -oE 'feed\.js\?v=[0-9]+' "$ROOT/index.html" 2>/dev/null || echo none)
  server_v=$(ssh -o ConnectTimeout=5 neolink "grep -m1 -oE 'feed\\.js\\?v=[0-9]+' /var/www/neolink/index.html" 2>/dev/null || echo none)
  log "local feed.js?v=$local_v / server feed.js?v=$server_v"
  if [ -n "$local_v" ] && [ -n "$server_v" ] && [ "$local_v" != "$server_v" ]; then
    issues+=("server_drift: local=$local_v server=$server_v")
    [ -z "$heal_action" ] && heal_action="rsync_only"
  fi
else
  log "could not check server drift (ssh or file missing)"
fi

# Check 5: server has a stale external "扁平 headlines" schema (server drift type B).
if [ -n "$local_v" ] && [ -n "$server_v" ] && [ "$local_v" = "$server_v" ]; then
  # Same v= but server might still have wrong schema. Check feed.js head structure.
  server_feed_head=$(ssh -o ConnectTimeout=5 neolink "head -3 /var/www/neolink/data/feed.js 2>/dev/null" 2>/dev/null || echo "")
  if echo "$server_feed_head" | grep -q "headlines" && ! echo "$server_feed_head" | grep -q "sections"; then
    issues+=("server_schema_drift_flat_headlines")
    [ -z "$heal_action" ] && heal_action="rsync_only"
  fi
fi

# Decide and act.
if [ ${#issues[@]} -eq 0 ]; then
  log "OK: all checks passed, no action needed"
  exit 0
fi

log "ISSUES DETECTED: ${issues[*]}"
log "heal_action: $heal_action"

# Remove stale sentinel.
rm -f "$SENTINEL"

if [ "$heal_action" = "rsync_only" ]; then
  log "action: manual rsync to align server"
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
    neolink:/var/www/neolink/ >> "$WD_LOG" 2>&1
  rc=$?
  log "rsync exit: $rc"
  exit 0
fi

# force_refresh: run the main script, then rsync.
log "action: force-triggering refresh + rsync"
"$ROOT/tools/neolink-refresh.sh" >> "$WD_LOG" 2>&1
refresh_rc=$?
log "refresh.sh exit: $refresh_rc"

# Always rsync after refresh to align server (in case agent skipped it on no-change).
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
  neolink:/var/www/neolink/ >> "$WD_LOG" 2>&1
rc=$?
log "post-refresh rsync exit: $rc"
log "watchdog action complete"
exit 0
