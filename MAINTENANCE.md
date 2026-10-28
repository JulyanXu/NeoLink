# NeoLink Maintenance Notes

## Daily Update Window

- Target time: 08:00 Asia/Shanghai (verified existing LaunchAgent on 2026-09-08).
- Update visible timestamps only when at least one underlying public news item, metric, source URL, or source data point has changed.
- If sources are reachable but no trusted new data is found, keep `data/feed.js`, its visible timestamp and all four cache parameters byte-identical; record the check only in the daily run log.

## Homepage Categories

The homepage is intentionally compressed to six scalable channels:

- `政策市场`: policy, market mechanism, capacity planning, electricity price and market-model items.
- `项目招标`: tenders, awards, project lists, EPC, commissioning and grid-connection items.
- `企业技术`: company strategy, products, technology routes and supply-chain capability.
- `价格材料`: high-signal material or system-price observations only. Avoid listing many thin material SKUs.
- `风险合规`: safety, standards, legal, regulatory enforcement and compliance.
- `海外`: non-mainland projects, tenders, orders and market updates.

## Feed Shape

`data/feed.js` should expose `window.NEOLINK_FEED` with:

- `generated_at`: ISO timestamp with `+08:00`.
- `note`: concise audit note for this run.
- top-level arrays for compatibility: `headlines`, `latest`, `policy`, `project`, `enterprise`, `materials`, `safety`, `legal`, `ipo`, `overseas`, `metrics`, `source_index`.
- `sections`: assign the same arrays so the current frontend renderer can read wrapped data.

Each content item should keep:

- `source`
- `as_of`
- `methodology`
- `url`

Use structured summaries. Do not copy full article bodies.

## Minimal Verification

Run these before deployment:

```sh
node --check data/feed.js
node --check app.js
node --check data-model.js
node --check company-view.js
node --test tests/*.test.cjs
python3 -m html.parser index.html >/dev/null
git diff --check
```

After deployment, read back:

```sh
curl -fL -sS https://neolink.asia/ | rg "v3.css|app.js|feed.js"
curl -fL -sS https://www.neolink.asia/ | rg "v3.css|app.js|feed.js"
curl -fL -sS https://www.neolink.asia/data/feed.js | rg "generated_at"
```

## V3 runtime and updates

- Source repository: `https://github.com/JulyanXu/NeoLink`, branch `codex/current-v3`. Clone or check out this branch when making changes. The existing 08:00 LaunchAgent still depends on `/Users/julyan/Desktop/NeoLink` and does not push to GitHub; deleting that directory stops this local job. GitHub storage alone does not run or deploy updates.
- Render all four HTML entrypoints using `v3.css`, `app.js`, `data-model.js`, and `company-view.js`. Do not restore the legacy hero or metrics markup.
- News display is derived from deduplicated article arrays; `metrics` are legacy compatibility data, never statistical KPIs.
- Content timestamp and article dates are separate. Enterprise data retains its historical snapshot date.
- Change only the four feed cache query parameters when trusted feed data changes. Keep the page structure and V3 asset versions intact.
- Deploy an explicit file allowlist; never upload the entire project or use `rsync --delete`. Back up live pages first.
- After uploading, explicitly set `/var/www/neolink` and `/var/www/neolink/data` to mode `755` and only the deployed public file allowlist to mode `644`. File-only transfers do not repair destination directory permissions; do not rely on the local rsync implementation's `--chmod` behavior. Never copy the local project directory's private `700` mode to the public document root.
- Verify both public HTTPS homepages after every run, including no-change runs. Matching SSH content hashes alone does not prove Nginx can serve the files.
- Read `docs/V3-UPGRADE.md` for scope, validation and runtime boundaries.
