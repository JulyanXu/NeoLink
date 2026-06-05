# NeoLink Agent Instructions

This file is the source of truth for project-specific agent behavior in this repository.
If another assistant-specific instruction file is added later, keep it short and point it back to this file.

## Behavior

- Be direct and push back when you disagree; if the user's approach has problems, say so.
- When unsure about something, say you're unsure rather than guessing confidently.
- When something fails, investigate the root cause before retrying.
- Keep diffs scoped to the task: no drive-by reformats or unrelated refactors.

## Update Cadence

- The MarketTrend market/sentiment data and the NeoLink information site should be checked and refreshed once per hour.
- Hourly jobs must attempt to update market quotes, sentiment evidence, latest news, headline candidates, metrics, and source indexes.
- Do not fake freshness: only change visible content timestamps when the underlying content or data actually changes.
- If a two-hourly run finds no credible new data, keep the previous content timestamp and record the run as a no-change check in the maintenance log.
- Price, quote, sentiment, export, project, policy, IPO, legal, and safety data must keep source, timestamp, and methodology fields when available.

## Repository Sync

- Treat `/Users/julyan/Desktop/NeoLink` as the source repository for NeoLink.
- Treat `/var/www/neolink` as the deployment target, not as the source repository.
- After a verified content update, commit the NeoLink source changes and push `main` to both GitHub (`origin`) and Gitee (`gitee`).
- Do not commit generated runtime state, local crawl artifacts, or unrelated nested projects.

## Teaching

The user is often picking up new systems and domains. When a key term surfaces that they likely have not internalized, explain it in 1-2 sentence and then move on.

Use this format:

> 💡 followed by 1-2 sentence explanation

---

## Deployment / RSYNC

This step runs AFTER the GitHub + Gitee push. Only proceed if content actually changed.

### Step 1: Compare timestamps
- Read local `/Users/julyan/Desktop/NeoLink/data/feed.js` and extract `generated_at`
- SSH to `neolink` and read `/var/www/neolink/data/feed.js` `generated_at` (use: `ssh neolink "cat /var/www/neolink/data/feed.js | grep generated_at"`)
- If local `generated_at` > server `generated_at`, proceed to Step 2
- If local is not newer, skip rsync and log as "no-change check"

### Step 2: RSYNC core files to neolink
Note: `data` is passed **without a trailing slash** so rsync copies the directory as a unit (lands at `neolink:/var/www/neolink/data/`), not its contents expanded into the destination root. A trailing slash would land files like `data/feed.js` at `/var/www/neolink/feed.js` and `--delete` would wipe the server's `data/` subdirectory. `data/sources/` is excluded because it is one-time crawl output, not deployable content.

Background images (`bg-light.png`, `bg-dark.png`, `sidebar.png`, `side.png`) and all root-level static assets are referenced by `styles.css` and must be deployed. Omitting any of them leaves the page with a 404'd background and broken layout.
```bash
rsync -avz --delete \
  --exclude='sources/' \
  /Users/julyan/Desktop/NeoLink/index.html \
  /Users/julyan/Desktop/NeoLink/news-more.html \
  /Users/julyan/Desktop/NeoLink/article.html \
  /Users/julyan/Desktop/NeoLink/enterprise-map.html \
  /Users/julyan/Desktop/NeoLink/styles.css \
  /Users/julyan/Desktop/NeoLink/script.js \
  /Users/julyan/Desktop/NeoLink/news-more.js \
  /Users/julyan/Desktop/NeoLink/article.js \
  /Users/julyan/Desktop/NeoLink/enterprise-map.js \
  /Users/julyan/Desktop/NeoLink/bg-light.png \
  /Users/julyan/Desktop/NeoLink/bg-dark.png \
  /Users/julyan/Desktop/NeoLink/sidebar.png \
  /Users/julyan/Desktop/NeoLink/side.png \
  /Users/julyan/Desktop/NeoLink/Logo.png \
  /Users/julyan/Desktop/NeoLink/favicon.png \
  /Users/julyan/Desktop/NeoLink/data \
  neolink:/var/www/neolink/
```

### Step 3: Verify server timestamps
After rsync, confirm server file timestamps updated:
```bash
ssh neolink "stat /var/www/neolink/data/feed.js | grep Modify"
ssh neolink "stat /var/www/neolink/index.html | grep Modify"
```
Log the verified timestamps in maintenance log.
