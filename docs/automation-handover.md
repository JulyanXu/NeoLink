# NeoLink 自动化移交说明（Homepage two-hour refresh）

本文用于把 NeoLink 的“主页两小时刷新”自动化维护工作移交给其他 agent。目标是：**可重复**、**可核验**、**不伪造 freshness**。

## 1. 自动化对象与入口

- Automation name: `NeoLink homepage two-hour refresh`
- Automation ID: `neolink-homepage-two-hour-refresh`
- Automation memory: `$CODEX_HOME/automations/neolink-homepage-two-hour-refresh/memory.md`
- 站点入口（线上）：
  - `http://www.neolink.asia/`（优先用于可达性/状态码/基础回读）
  - `https://www.neolink.asia/`（用于 HTTPS/TLS 状态与最终呈现回读）

## 2. 必查本地文件（本仓库）

每次运行都应先读/核对以下文件的当前状态，再决定是否更新：

- 主页与详情模板：
  - `/Users/julyan/NeoLink/index.html`
  - `/Users/julyan/NeoLink/news-more.html`
  - `/Users/julyan/NeoLink/article.html`
- 数据源（主页渲染的唯一事实来源）：
  - `/Users/julyan/NeoLink/data/feed.js`
- 运行记录与证据（用于 freshness 审计）：
  - `/Users/julyan/NeoLink/var/hermes/maintenance-log.md`
  - `/Users/julyan/NeoLink/docs/maintenance-log.md`
  - `/Users/julyan/NeoLink/var/hermes/state/crawl_runs.json`
  - `/Users/julyan/NeoLink/var/hermes/search-notes-*.json`（每次运行生成/更新）

> 💡 `feed.js?v=YYYYMMDDHHMM` 是缓存破坏参数（cache-busting）；只有底层 `data/feed.js` 的内容真实变化时才更新它，否则会制造“看似更新”的假象。

## 3. Freshness 规则（必须严格遵守）

### 3.1 什么时候允许“内容更新”

只有在 **底层新闻/指标/来源数据真实变化** 且能被公开来源核验时，才允许：

- 更新 `/Users/julyan/NeoLink/data/feed.js` 的 `generated_at` / `checked_at`（如存在）
- 更新主页可见“更新”时间（通常位于 `index.html` hero 区）
- 更新 HTML 中的 `./data/feed.js?v=...` 版本参数
- 在维护日志里记录为 `updated`

### 3.2 什么时候必须“no-change check”

当没有发现 **可信新增**（或新增无法核验）时：

- **不得**仅为了“定时任务看起来在跑”而改 `generated_at` 或页面可见时间戳
- 保持现有 `data/feed.js` 与 `v=` 参数不变
- 记录为 `no-change`，并写入：
  - `var/hermes/search-notes-<timestamp>.json`
  - `var/hermes/state/crawl_runs.json`（prepend 一条 run 记录）
  - `var/hermes/maintenance-log.md` 与 `docs/maintenance-log.md`

### 3.3 允许的例外：一致性修复（consistency fix）

如果发现：

- `data/feed.js` 的 `generated_at`（如 `2026-05-19T14:00:00+08:00`）与
- 首页可见“更新”时间（如 `index.html` 显示 `13:00`）

不一致，则允许只修正 **展示层** 时间以匹配现有 feed，且仍应记录为 `no-change (consistency fix)`（因为底层内容没变）。

## 4. 运行步骤（推荐顺序）

### 4.1 读取记忆与本地基线

1. 读取 automation memory：`$CODEX_HOME/automations/neolink-homepage-two-hour-refresh/memory.md`
2. 读取并确认本地：
   - `data/feed.js` 的 `generated_at`
   - `index.html` 的可见“更新”时间
   - `index.html/news-more.html/article.html` 的 `feed.js?v=...` 是否一致

### 4.2 线上回读（如果网络/DNS正常）

最少应回读：

- `curl -I https://www.neolink.asia/`（记录 HTTPS/TLS 结果）
- `curl -s https://www.neolink.asia/ | shasum -a 256`（或等价 hash）
- `curl -s https://www.neolink.asia/data/feed.js`（确认线上版本/字段；不要复制整段到日志）

若 DNS/网络不可用，必须在日志明确写出错误（例如 `curl: (6) Could not resolve host`），并将本次 run 标记为无法完成 live readback。

### 4.3 搜索与核验公开来源（只接受可复核证据）

要求：

- 只写结构化摘要，避免复制整篇版权内容
- 为关键新增项保留字段：`source`、`as_of`、`methodology`、`url`（如项目已有该字段）

常见来源（以 `data/feed.js` 既有模式为准，新增来源需谨慎）：

- 行业媒体/门户（国内/海外）
- 官方公告/招标平台
- 行情平台（例如锂盐等）

### 4.4 决策：更新 vs no-change

- 若找到 **可核验** 新增：更新 `data/feed.js`（并更新页面 `v=` 与可见时间戳）
- 若无可信新增：不更新 feed；只记录 no-change run
- 若仅不一致：做 consistency fix，不 bump feed/version

## 5. `data/feed.js` 约束（编辑注意）

- 不要把 `data/feed.js` 改成 Node 模块；它是前端直接加载，形态通常是 `window.NEOLINK_FEED = {...}`
- 保留结构化字段：`source`、`as_of`、`methodology`、`url`（以及项目里已有的 `source_type/account_name/...`）
- 避免长段落原文粘贴；使用要点化 `summary/key_points/body`（以现有 schema 为准）

## 6. 校验清单（每次运行必须做）

- 语法校验（至少）：
  - `node --check /Users/julyan/NeoLink/data/feed.js`
  - `node --check /Users/julyan/NeoLink/script.js`
  - `node --check /Users/julyan/NeoLink/news-more.js`
  - `node --check /Users/julyan/NeoLink/article.js`
- JSON 记录可解析：
  - `var/hermes/state/crawl_runs.json`
  - 本次新增的 `var/hermes/search-notes-*.json`

## 7. 部署/同步到 /var/www/neolink（如果该目标存在）

一些运行环境里会将站点镜像同步到 `/var/www/neolink` 并回读验证。若目标目录存在且权限允许：

1. 同步（方式以环境既有脚本/惯例为准；不要自创大规模部署系统）
2. 回读验证：
   - 首页可见时间戳是否匹配
   - `data/feed.js` 版本与关键内容是否匹配
   - 记录 HTTPS/TLS 异常（若存在）

若 `/var/www/neolink` 不存在或不可写：在日志中明确标注“无法部署/回读”原因。

## 8. 本项目对 agent 的行为要求（摘要）

- 直说、必要时反对错误做法（例如“只改时间戳”）
- 不确定就说不确定，别强行编造来源/新鲜度
- 失败先查根因再重试
- diff 只做任务相关，不做无关重构/格式化

