# NeoLink Maintenance Notes

## Daily Update Window

- Target time: around 06:00 Asia/Shanghai.
- Update visible timestamps only when at least one underlying public news item, metric, source URL, or source data point has changed.
- If sources are reachable but no trusted new data is found, keep the previous visible timestamp and record the check in `data/feed.js` `note` as a no-change check.

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
python3 -m html.parser index.html >/dev/null
git diff --check
```

After deployment, read back:

```sh
curl -L -s https://www.neolink.asia/ | rg "更新|feed.js"
curl -L -s https://www.neolink.asia/data/feed.js | rg "generated_at|1502668|1502664|1502663"
```
