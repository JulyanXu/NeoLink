# NeoLink 内容块更新维护运维说明

本文档用于移交给 Hermes Agent，负责 NeoLink 首页、内容索引页、企业图谱页的数据更新与日常维护。

## 1. 维护目标

Hermes 维护“可追溯的信息详情页”。NeoLink 站内承载标题、摘要、结构化要点、来源记录和原文备用入口；第三方媒体原文不整篇搬运。

核心目标：

- 保持首页内容块每日更新。
- 保持“今日头条”“最新新闻”二级页内容与首页数据一致。
- 对价格、出货、出口、材料等指标标注来源、口径、日期。
- 对企业图谱数据只使用可追溯公开来源，避免虚构关系。
- 所有标题点击进入站内详情页；详情页再提供原始来源链接用于复核。

## 2. 当前数据文件

### 首页与内容索引

主数据文件：

```text
data/feed.js
```

浏览器读取方式：

```js
window.NEOLINK_FEED = {
  generated_at,
  note,
  sections: {}
}
```

使用页面：

```text
index.html
news-more.html
article.html
```

渲染脚本：

```text
script.js
news-more.js
article.js
```

### 企业图谱

主数据文件：

```text
data/enterprise-map-db.js
```

浏览器读取方式：

```js
window.NeoLinkEnterpriseDB = {
  meta,
  sources,
  rankings,
  companies,
  relationships
}
```

使用页面：

```text
enterprise-map.html
```

渲染脚本：

```text
enterprise-map.js
```

### Hermes 管道状态

当前有一个轻量示例管道：

```text
tools/hermes-pipeline.mjs
data/accounts.json
data/seed-discoveries.json
var/hermes/state/articles.json
var/hermes/state/crawl_runs.json
var/hermes/raw/
var/hermes/clean/
```

注意：`tools/hermes-pipeline.mjs` 目前导出的是：

```text
data/hermes-runtime.js
```

而正式页面目前读取的是：

```text
data/feed.js
```

因此 Hermes 若要直接更新网站内容，应更新 `data/feed.js`，或在后续工程改造中把页面 script 切到 `data/hermes-runtime.js`。

## 3. 首页内容块映射

`data/feed.js` 中 `sections` 的字段对应页面内容如下：

```text
sections.metrics      -> 首页顶部 4 个核心指标卡片
sections.headlines    -> 首页“今日头条” + news-more.html?section=headlines
sections.latest       -> 首页“最新新闻” + news-more.html?section=latest
sections.enterprise   -> 首页企业动态内容块
sections.safety       -> 首页风险/安全内容块
sections.legal        -> 首页法律纠纷内容块
sections.project      -> 首页项目内容块
sections.ipo          -> 首页 IPO 内容块
sections.policy       -> 首页政策招标内容块
sections.materials    -> 首页锂电主材趋势内容块
```

如果 `sections.latest` 存在，最新新闻使用它；如果不存在，脚本会从 `policy/project/enterprise/materials/safety/legal/ipo` 聚合生成。

标题链接规则：

```text
index.html/news-more.html 上的标题 -> article.html?id=hash(source + date/as_of + title/name/company)
article.html 的“打开原文” -> 原始来源 URL
```

因此 Hermes 更新 `data/feed.js` 后，不需要手工创建详情页；只要字段完整，站内详情页会自动渲染。

## 4. 数据字段规范

### 新闻/事件类通用字段

适用于：

```text
headlines
latest
enterprise
safety
legal
project
policy
```

推荐字段：

```js
{
  source: "来源名称",
  category: "政策|招投标|项目|IPO|企业|法律|价格|出口|安全",
  title: "标题",
  summary: "1-2 句摘要，只写事实和口径",
  date: "04-24",
  url: "https://original-source.example/article",
  body: [
    "站内正文第一段，说明事件本身。",
    "站内正文第二段，说明影响、口径或后续关注点。"
  ],
  key_points: [
    "关键要点 1",
    "关键要点 2"
  ]
}
```

`body` 和 `key_points` 为推荐字段。若缺失，`article.js` 会根据 `summary/category/source/date/value/methodology` 自动生成一版站内正文，但人工或 Hermes 提供的正文质量应优先。

### 微信公众号字段

微信公众号文章采集时，网页快照只作为后台抽取渠道，前台不展示“网页快照”入口。前台展示公众号名称、站内正文和原文入口。

推荐字段：

```js
{
  source: "高工储能",
  source_type: "微信公众号网页快照",
  account_name: "高工储能",
  title: "文章标题",
  summary: "基于快照正文抽取的摘要",
  body: ["基于快照正文抽取/转写的站内正文段落"],
  key_points: ["关键要点"],
  snapshot_url: "网页快照地址，仅后台留存",
  original_url: "https://mp.weixin.qq.com/s/...",
  url: "https://mp.weixin.qq.com/s/..."
}
```

处理要求：

- 先搜索公众号文章可访问快照，例如搜索标题、公众号名、`mp.weixin.qq.com`、美篇/搜狗/聚合页等缓存入口。
- 使用快照里的 HTML/JSON 抽取文字、图片 URL、原始微信链接和发布时间。
- `snapshot_url` 只作为后台留档和复抓入口，不在前台按钮中展示。
- 前台按钮统一叫“打开原文”，优先使用 `original_url`。
- 图片内容如果有信息量，应提取图片 URL 和 OCR 文本，后续可扩展字段 `images`、`image_ocr`。

可选字段：

```js
{
  severity: "监管|安全|标准",
  type: "技术秘密|专利纠纷|诉讼风险",
  location: "全国|江苏|四川",
  board: "上交所|深交所|港交所",
  status: "递表|问询|注册|上市"
}
```

### IPO 字段

```js
{
  source: "来源",
  company: "企业名",
  board: "港交所",
  status: "递表",
  title: "完整标题",
  summary: "摘要",
  date: "04-24",
  url: "原文链接"
}
```

### 指标字段

适用于 `sections.metrics`：

```js
{
  title: "储能电芯均价",
  caption: "280Ah 方形磷酸铁锂",
  value: "0.34",
  unit: "元/Wh",
  delta: "环比 -2.1%",
  direction: "down",
  source: "SMM/InfoLink/海关总署等",
  as_of: "2026-04-17",
  methodology: "数据口径说明",
  url: "来源链接",
  history: [
    { date: "2026-04-01", value: 0.35 },
    { date: "2026-04-17", value: 0.34 }
  ]
}
```

要求：

- `direction` 只能是 `up` 或 `down`。
- `history` 若不足 2 个点，页面会显示“暂无连续历史序列”。
- 指标必须写 `source/as_of/methodology`，避免误导。
- 所有信息必须填写 `date` 或 `as_of`，优先使用 `YYYY-MM-DD`。前端会按时间倒序自动排序。

### 材料字段

适用于 `sections.materials`：

```js
{
  name: "电池级碳酸锂",
  value: "169500",
  unit: "元/吨",
  change: "+6.9%",
  direction: "up",
  spec: "电池级",
  source: "SMM/研报",
  url: "来源链接"
}
```

## 5. 企业图谱维护规范

企业图谱文件：

```text
data/enterprise-map-db.js
```

### companies

每个企业节点建议字段：

```js
{
  id: "catl",
  name: "宁德时代",
  brand: "CATL",
  country: "中国",
  region: "福建宁德",
  listing: "深交所上市",
  segments: ["storage", "power"],
  business: "主营范围",
  tags: ["储能第1", "动力第1"],
  ranks: { storage: 1, power: 1 },
  x: 500,
  y: 330,
  size: 142,
  projects: [["项目/指标标题", "来源或口径"]],
  news: [["新闻标题", "04-24"]],
  risks: [["risk-amber", "风险标题", "风险说明"]]
}
```

### relationships

关系格式：

```js
["from_id", "to_id", "storage|power|consumer|overlap", "关系标签"]
```

当前图谱不表达未经核实的股权控制关系。关系线只表达：

```text
storage  -> 储能同榜
power    -> 动力同榜
consumer -> 3C 同榜
overlap  -> 赛道交集
```

### 坐标规则

图谱画布逻辑坐标为：

```text
x: 0-1000
y: 0-650
```

企业节点不要过密。新增企业时优先遵守：

- 储能/动力交集企业靠中部。
- 3C 企业靠左上/左侧。
- 日韩企业靠右侧。
- 多赛道企业节点可更大。

## 6. 来源优先级

Hermes 更新内容时按以下优先级采信：

### S 级：官方/监管/交易所

用于政策、IPO、监管、安全、进出口口径：

```text
国家发改委
国家能源局
工信部
商务部
海关总署
应急管理部/消防救援局/地方通报
上交所/深交所/北交所/港交所
证监会
巨潮资讯
国家知识产权局
法院公告/裁判文书
```

### A 级：专业数据/研究机构

用于价格、出货、装机、榜单：

```text
SMM 上海有色
Mysteel
百川盈孚
鑫椤资讯
InfoLink
CNESA
GGII
EVTank
SNE Research
BNEF
上市公司公告/财报
券商研报，但必须注明券商整理口径
```

### B 级：行业媒体/门户

用于线索和补充，不单独作为高风险事实依据：

```text
碳索储能网
低碳网
电池网
北极星储能网
高工储能
中国储能网
企业公众号
```

安全事故、法律纠纷、重大项目金额、IPO 状态至少需要 S/A 级来源或双源确认。

## 7. 更新频率

建议调度：

```text
headlines: 每日 1-2 次，人工/模型挑选 4-6 条
latest: 每 2-6 小时更新，可保留 10-30 条
metrics: 每日或每周更新，必须标注 as_of
materials: 每日或每周更新，依赖价格源可用性
enterprise/project/policy/legal/ipo: 每日更新
enterprise-map-db: 每周或重大榜单发布时更新
```

## 8. 更新流程

### 发现

1. 扫描官方源、专业源、行业门户、公众号候选文章。
2. 对 URL 做去重。
3. 只保留新能源、储能、锂电、材料、政策、招标、IPO、法律、安全相关内容。

### 抽取

每条内容至少抽取：

```text
title
url
source
date
category
summary
```

### 分配内容块

分配规则：

```text
重大政策/监管/行业关键变量 -> headlines
日常产业新闻 -> latest
企业签约/产能/海外工厂 -> enterprise
储能招标/中标/开工/投运 -> project
IPO 递表/问询/上市 -> ipo
法律诉讼/专利/技术秘密 -> legal
价格/主材趋势 -> materials 或 metrics
安全事故/标准/监管 -> safety
```

### 写入

直接编辑：

```text
data/feed.js
data/enterprise-map-db.js
```

保持 JS 全局变量格式，不要改成纯 JSON，除非同时改页面引用。

### 验证

每次更新后运行：

```bash
node --check data/feed.js
node --check data/enterprise-map-db.js
node --check script.js
node --check news-more.js
node --check enterprise-map.js
```

建议再启动本地静态服务检查：

```bash
python3 -m http.server 5299
```

打开：

```text
http://127.0.0.1:5299/index.html
http://127.0.0.1:5299/news-more.html?section=headlines
http://127.0.0.1:5299/news-more.html?section=latest
http://127.0.0.1:5299/article.html
http://127.0.0.1:5299/enterprise-map.html
```

验收点：

- 首页无空内容块。
- 今日头条“更多”能显示 `headlines`。
- 最新新闻“更多”能显示 `latest`，分类筛选可用。
- 首页和内容索引的标题进入站内详情页。
- 详情页包含摘要、结构化要点、来源维护说明和“打开原文”按钮。
- 来源、日期、摘要不为空。
- 企业图谱节点数量、关系线正常。
- 页面无横向溢出。

## 9. 质量规则

Hermes 必须遵守：

- 不编造数据。
- 不把媒体线索写成官方结论。
- 不在摘要中写“据悉”“或将”等模糊表述，除非原文就是预测或传闻，并且标注为线索。
- 不写未标注来源的价格、出货、装机、出口数据。
- 不把公众号全文复制进页面，只写 1-2 句摘要并链接原文。
- 不重复展示同一 URL。
- 不使用“待核/已核”这类前台状态字眼。
- 对事故和诉讼类内容，优先官方/公告源；媒体只能作为线索。

## 10. 推荐去重键

文章去重优先级：

```text
1. 微信文章参数：biz + mid + idx + sn
2. canonical_url
3. normalized_url
4. hash(source + title + date)
```

同一事件多源报道时：

- `headlines` 只保留最高可信来源。
- `latest` 可保留一条主源，不做重复刷屏。
- 如果多个来源提供互补事实，在 summary 里写清“官方口径/媒体线索/研报整理”。

## 11. 建议 Hermes 输出摘要格式

对每篇新内容处理后输出：

```json
{
  "target_section": "latest",
  "source": "国家发改委",
  "category": "政策",
  "title": "标题",
  "summary": "一句事实摘要。一句影响或口径说明。",
  "date": "04-24",
  "url": "https://...",
  "credibility": "S",
  "reason": "官方政策原文"
}
```

再由维护脚本或人工审核写入 `data/feed.js`。

## 12. 当前人工维护入口

如果没有自动爬虫，Hermes 可以先以半自动方式维护：

```text
1. 搜索/扫描来源
2. 形成候选条目 JSON
3. 去重
4. 归类到 sections
5. 更新 data/feed.js
6. 运行 node --check
7. 本地浏览器验收
```

后续如接入正式爬虫，应优先让爬虫写 `var/hermes/state/articles.json`，再由导出层生成 `data/feed.js`，避免直接覆盖人工精选内容。
