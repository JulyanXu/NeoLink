# Hermes 交接包

NeoLink 是一个静态新能源市场情报站。Hermes 接手后，核心职责是每日维护 `data/market-news.json`，确保内容可追溯、可核验、可发布。

## 接手范围

Hermes 默认维护：

- `data/market-news.json`：首页全部动态内容。
- `data/source-watchlist.json`：来源清单和合规边界。
- `data/taxonomy.json`：分类、优先级、影响方向。
- `assets/logos/`：排行榜企业 logo。
- `rss.xml`、`sitemap.xml`：由 `npm run build` 自动生成，不手工编辑。

Hermes 只有在用户明确要求调整 UI 时，才修改：

- `index.html`
- `styles.css`
- `app.js`
- `assets/hero-energy-day.jpg`
- `assets/hero-energy-cg.jpg`

## 每日更新操作

1. 读取 `data/source-watchlist.json`，按来源分层采集信息。
2. 优先抓一手来源：政府、监管、交易所、企业公告、招投标、法院/处罚、正式授权数据。
3. 媒体、协会、第三方咨询和搜索结果只作为线索；能回溯原文就回溯原文。
4. 新情报写入 `data/market-news.json.news`，字段必须完整。
5. 更新 `generatedAt`，推荐使用本地北京时间。
6. 运行 `npm run build` 和 `STRICT_CONTENT=1 npm run build`。
7. 如有新增 logo，确认 `assets/logos/` 文件存在且页面能加载。

## 数据结构重点

`market-news.json` 当前包含：

- `generatedAt`：数据更新时间。
- `signals`：首页 4 个关键指标。
- `watchlist`：侧栏长期监控项。
- `sourceWindows`：信息源窗口。
- `companyTrackers`：储能电池、动力电池、3C 电池排行榜企业跟踪。
- `news`：每日简报。

详细字段见 `docs/content-model.md`。

## 新闻写入标准

每条 `news` 至少包含：

- `id`：稳定 ID，例如 `20260422-policy-example`
- `date`：事件日期，`YYYY-MM-DD`
- `category`：见 `data/taxonomy.json`
- `priority`：`high`、`medium`、`low`
- `impact`：`bullish`、`bearish`、`neutral`、`mixed`、`watch`
- `region`
- `title`
- `summary`
- `source`
- `sourceUrl`
- `status`：`已核验`、`跟踪中`、`待核验`
- `tags`

页面展示会按 `date` 倒序排序。

## 来源和授权

可公开抓取：

- 政府/监管官网公开页面。
- 交易所公告、年报、临时公告。
- 企业官网、ESG、新闻稿、投资者关系记录。
- 协会/研究机构公开新闻、目录、摘要。
- 媒体公开网页。

不可直接入库：

- 付费报告全文。
- 商业数据库导出表。
- 未授权企业排名明细。
- 账号、Cookie、API key。
- 群聊、社交媒体截图、未证实爆料。

第三方咨询机构如 GGII、CINNO、中电联、赛迪、艾瑞：公开摘要可以作为线索，年度/季度报告、企业排名、细分市场数据和价格库必须确认授权后才能展示。

## 排行榜维护

排行榜在 `companyTrackers` 中维护。当前已有：

- 储能电池
- 动力电池
- 3C 电池

维护规则：

- `title` 写明年份和榜单口径。
- `basis` 写明来源、统计范围、是否为公开转引、是否需授权。
- 新增企业必须填写 `url`、`focus`、`source`。
- 有 logo 时填写 `logoUrl`，优先使用本地 `assets/logos/xxx.png` 或 `assets/logos/xxx.svg`。
- 搜索引擎图片只能用于定位，不建议直接热链。

## Logo 更新流程

1. 用企业官网、Bing 图片搜索或公告页定位 logo。
2. 优先下载企业官网可公开访问资源到 `assets/logos/`。
3. 文件名使用小写英文和连字符，例如 `svolt.png`。
4. 在对应企业写入 `logoUrl`。
5. 运行构建校验。
6. 浏览器检查 `.company-logo img` 是否加载。

## 前端调整入口

UI 调整前先读 `docs/frontend-adjustment.md`。

常见改法：

- 改板块顺序：`index.html`
- 改配色、玻璃、logo 尺寸：`styles.css`
- 改筛选、排序、渲染逻辑：`app.js`
- 改背景图：替换 `assets/hero-energy-day.jpg` 或 `assets/hero-energy-cg.jpg`

## 发布前命令

```bash
npm run build
STRICT_CONTENT=1 npm run build
```

本地预览：

```bash
npm run dev
```

打开：

```text
http://localhost:5173/
```

## Hermes 每日执行提示词

可直接使用：

```text
你是 NeoLink 的 Hermes 内容维护 agent。请按 docs/hermes-handoff.md 和 docs/hermes-maintenance.md 更新 data/market-news.json。

任务：
1. 按 data/source-watchlist.json 采集新能源、储能、锂电、政策、招标、IPO、价格、项目和事故/法律信息。
2. 优先引用一手来源；媒体和第三方咨询只能作为线索，summary 必须写清楚来源口径和授权状态。
3. 更新 generatedAt，新增情报写入 news，必要时更新 signals、watchlist、sourceWindows、companyTrackers。
4. 新增企业或排行榜时，补充 assets/logos/ 并填写 logoUrl。
5. 运行 npm run build 和 STRICT_CONTENT=1 npm run build。
6. 输出本次新增条目、来源链接、风险和未核验事项。
```
