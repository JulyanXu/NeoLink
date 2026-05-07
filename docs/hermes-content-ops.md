# NeoLink 内容运维移交文档

本文档移交给 Hermes Agent，用于维护 NeoLink 新能源产业情报站的内容更新、来源采集、正文处理、数据写入、部署验证与质量控制。

当前项目路径：

```text
/Users/julyan/Desktop/NeoLink
```

线上站点：

```text
https://neolink.asia/
```

GitHub：

```text
https://github.com/JulyanXu/NeoLink
```

## 1. Hermes 维护目标

Hermes 负责让 NeoLink 每天保持可读、可追溯、可复核：

- 每日更新首页时间、今日头条、最新新闻、核心指标和材料趋势。
- 站内详情页优先承载可读正文，降低用户跳转原文的必要性。
- 每条信息必须保留来源、日期、摘要、正文、关键要点和来源链接。
- 指标类内容必须保留数据口径、`as_of` 和来源。
- 公众号和媒体内容可以做事实性整理、摘要、结构化改写和净化 HTML 展示，但不得未授权整篇原样搬运第三方原文。
- 官方公开文件、公告、招标文件等可按需要保留更完整摘录。

前台内容不应出现：

```text
待核
已核
网页快照按钮
Hermes
入库
运维
后续应
待补齐
项目库
```

## 2. 当前页面与数据文件

### 主站内容

```text
data/feed.js
```

页面读取：

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

```text
data/enterprise-map-db.js
enterprise-map.html
enterprise-map.js
```

企业图谱独立维护，不要为了首页日报随意改图谱。只有出现榜单、重大产能、重大合作、重大诉讼、重要客户或技术路线变化时才更新。

### 快照采集工具

```text
tools/fetch-wechat-snapshot.mjs
```

作用：

```text
网页快照 URL -> clean_text + clean_html + original_url + image_refs
```

输出目录：

```text
var/hermes/wechat-snapshots/
```

`var/` 是运行时目录，不提交 Git。

## 3. 首页内容块映射

`data/feed.js` 的 `sections` 与页面对应关系：

```text
sections.headlines  -> 首页“今日头条” + news-more.html?section=headlines
sections.latest     -> 首页“最新新闻” + news-more.html?section=latest
sections.metrics    -> 首页核心指标卡片
sections.materials  -> 首页锂电主材趋势
sections.enterprise -> 企业动态备用数据
sections.safety     -> 安全/监管备用数据
sections.legal      -> 法律纠纷备用数据
sections.project    -> 项目备用数据
sections.ipo        -> IPO 备用数据
sections.policy     -> 政策招标备用数据
```

当前首页最重要的是：

```text
headlines
latest
metrics
materials
```

其他 section 可以作为结构化储备，不要为了“填满页面”硬塞低质量内容。

## 4. 每日更新 SOP

### 4.1 更新时间

每天更新 `data/feed.js`：

```js
generated_at: "YYYY-MM-DDTHH:mm:00+08:00"
```

同时更新 `index.html` 首屏静态兜底文案：

```html
2026年5月7日　更新 08:41 (GMT+8)
```

### 4.2 更新 feed 缓存版本

每次改 `data/feed.js` 后，必须同步更新以下 3 个 HTML 中的版本号：

```text
index.html
news-more.html
article.html
```

示例：

```html
<script src="./data/feed.js?v=202605070841"></script>
```

否则浏览器可能继续读取旧数据。

### 4.3 更新首页兜底移动端列表

`index.html` 内有部分静态兜底列表，实际 JS 加载后会由 `data/feed.js` 覆盖，但为了弱网和首屏一致，更新当天内容时也应同步改：

```text
移动端 Hot Topics 兜底列表
移动端 Latest Updates 兜底列表
```

### 4.4 今日头条选择规则

`sections.headlines` 保持 4 条左右。

优先级：

```text
1. 官方/监管/交易所重大政策或披露
2. 专业数据源的价格、出货、出口、装机、榜单
3. 大规模储能项目招标/中标/开工/并网
4. 头部企业重大订单、融资、产能、海外布局
5. 重大安全事故、法律纠纷、贸易调查
```

不要为了“今天”硬凑低价值信息。若当天公开可核验信息不足，可以使用最近 48 小时内的高价值信息，并在 `date` 中保留真实发布日期。

### 4.5 最新新闻选择规则

`sections.latest` 建议保留 20-40 条，按时间倒序自动展示。

每条必须有：

```text
source
category
title
summary
date
url 或 original_url
body
key_points
```

分类建议：

```text
政策
招投标
项目
企业
价格
数据
出口
安全
法律
IPO
技术
市场
```

## 5. 数据字段规范

### 5.1 新闻/事件字段

```js
{
  source: "碳索储能网",
  source_type: "行业门户/周报",
  account_name: "碳索储能网",
  category: "招投标",
  title: "储能周报：49 条招标、32 条中标信息汇总",
  summary: "1-2 句事实摘要，包含来源、日期、核心事实和口径。",
  body: [
    "站内正文第一段，说明事件本身。",
    "站内正文第二段，说明关键数据、项目参数或来源口径。",
    "站内正文第三段，说明产业含义、风险或复核口径。"
  ],
  key_points: [
    "关键事实 1。",
    "关键事实 2。",
    "口径或风险提示。"
  ],
  date: "05-07",
  url: "https://source.example/article"
}
```

写作要求：

- `summary` 不写后台操作、维护建议和主观感受。
- `body` 是给读者看的正文，不写“后续应跟踪”“进入项目库”等内部语言。
- `key_points` 写事实和口径，不写模型推理过程。

### 5.2 指标字段

用于 `sections.metrics`：

```js
{
  title: "314Ah 储能电芯",
  value: "0.365",
  unit: "元/Wh",
  caption: "InfoLink 可见均价",
  delta: "+0.7%",
  direction: "up",
  source: "InfoLink Consulting",
  as_of: "2026-05-07",
  methodology: "方形磷酸铁锂储能电芯 314Ah 现货均价",
  url: "https://..."
}
```

要求：

- `direction` 只用 `up`、`down`、`flat`。
- 必须写 `source`、`as_of`、`methodology`。
- 不同来源价格不可直接混算。
- 若为周报、研报或页面可见价，要在 `caption/methodology` 写清楚。

### 5.3 材料趋势字段

用于 `sections.materials`：

```js
{
  name: "碳酸锂",
  spec: "电池级，SMM 新能源 05-07 可见价",
  value: "18.75",
  unit: "万元/吨",
  change: "+5.93%",
  direction: "up",
  source: "SMM 上海有色",
  url: "https://newenergy.smm.cn/"
}
```

### 5.4 公众号/网页快照字段

公众号正文提取可以使用网页快照，但前台不展示“网页快照按钮”。

推荐字段：

```js
{
  source: "高工储能",
  source_type: "微信公众号网页快照",
  account_name: "高工储能",
  category: "企业",
  title: "文章标题",
  summary: "基于正文提取的摘要。",
  body: ["站内事实改写正文。"],
  key_points: ["关键要点。"],
  clean_html: "<p>净化后的正文 HTML，可含图片。</p>",
  snapshot_url: "https://snapshot.example/...",
  original_url: "https://mp.weixin.qq.com/s/...",
  url: "https://mp.weixin.qq.com/s/..."
}
```

`article.js` 渲染优先级：

```text
clean_html
body_html
content_html
article_html
body 自动段落
```

如果有 `clean_html`，详情页正文区域会直接渲染净化 HTML，图片会在正文中内联显示。

版权边界：

- 不要未授权整篇原样复制第三方媒体或公众号文章。
- 可以保留事实性改写、结构化摘要、关键要点、必要短摘和图片信息。
- 官方公开文件、公告、政策、招标文件可保留更完整摘录。
- 若客户确认某来源内容已授权，可在 `source_type` 或内部记录中标注授权状态。

## 6. 来源采集渠道

### S 级：官方/监管/交易所

用于政策、IPO、安全、法律、出口管制和高风险事实：

```text
国家能源局
国家发改委
工信部
商务部
海关总署
应急管理部/消防救援局
上交所/深交所/北交所/港交所
证监会
巨潮资讯
国家知识产权局
法院公告/裁判文书
地方政府和公共资源交易平台
国家电网/南网/央企电子采购平台
```

### A 级：专业数据源

用于价格、出货、装机、榜单、材料趋势：

```text
SMM 上海有色
InfoLink Consulting
Mysteel
百川盈孚
鑫椤资讯
CNESA
GGII
EVTank
SNE Research
BNEF
上市公司公告/财报
券商研报，但必须注明“券商整理口径”
```

### B 级：行业门户/媒体/公众号

用于线索发现和补充说明：

```text
碳索储能网
低碳网
北极星储能网
高工储能
电池网
中国储能网
储能与电力市场
中关村储能
储能领跑者联盟
国家新型储能创新中心
企业公众号
```

高风险内容要求：

```text
安全事故：至少官方/消防/应急通报或双源确认。
法律纠纷：优先法院、公告、交易所、企业公告。
IPO 状态：优先交易所、证监会、港交所、公司招股书。
重大项目金额：优先招标公告、公共资源平台、企业公告。
价格数据：优先 SMM、InfoLink、Mysteel、百川、鑫椤等专业源。
```

## 7. 推荐搜索任务

每日扫描关键词：

```text
新型储能 招标 中标
储能 EPC 招标 MWh GWh
储能 项目 开工 投运 并网
储能 电芯 价格 314Ah 280Ah
碳酸锂 磷酸铁锂 电解液 隔膜 价格
锂电池 出口 海关
储能 IPO 递表 问询 上市
储能 火灾 事故 通报
锂电 专利 技术秘密 诉讼
源网荷储 零碳园区 算力 AIDC 储能
构网型 储能 EPC
```

当前重点站点：

```text
https://chuneng.bjx.com.cn/
https://cn.solarbe.com/
https://mcn.solarbe.com/
https://www.ditan.com/news/
https://newenergy.smm.cn/
https://www.infolink-group.com/spot-price-energy-storage/cn/
https://research.cnesa.org/
https://www.cnesa.org/
```

## 8. 去重规则

文章唯一键优先级：

```text
1. 微信文章参数：biz + mid + idx + sn
2. canonical_url
3. normalized_url
4. hash(source + title + date)
```

同一事件多源报道：

- `headlines` 只保留最高可信或信息最完整的一条。
- `latest` 只保留主线索，避免刷屏。
- 如果不同来源有互补信息，可以在 `summary/body` 中标注不同口径。

## 9. 质量检查规则

写入前检查：

```text
标题是否准确
日期是否真实
来源是否可打开或可说明
摘要是否只写事实
body 是否没有后台运维语气
指标是否有 source/as_of/methodology
安全/法律/IPO 是否有高可信来源
是否重复 URL 或重复事件
```

禁止写法：

```text
据说
疑似
重磅但无来源
后续应继续核对
适合进入项目库
Hermes 已抓取
待核/已核
网页快照作为按钮
```

允许写法：

```text
以公告为准
以招标文件为准
该数据为专业价格页可见口径
该周报适合作为项目线索，单项目以原公告为准
媒体报道只能作为线索
```

## 10. 更新与验证命令

### 10.1 语法检查

每次写入后运行：

```bash
node --check data/feed.js
node --check data/enterprise-map-db.js
node --check script.js
node --check news-more.js
node --check article.js
node --check enterprise-map.js
```

### 10.2 本地预览

```bash
python3 -m http.server 8080
```

打开：

```text
http://127.0.0.1:8080/
http://127.0.0.1:8080/news-more.html?section=headlines
http://127.0.0.1:8080/news-more.html?section=latest
http://127.0.0.1:8080/article.html
http://127.0.0.1:8080/enterprise-map.html
```

验收点：

- 首页日期为当天更新时间。
- 今日头条和最新新闻不是空白。
- 标题点击进入 `article.html`。
- 详情页有站内正文、关键要点、结构化字段、来源记录。
- `来源链接`存在且指向原始来源或主来源。
- `news-more.html` 分类筛选可用。
- 移动端无横向溢出。
- 前台不出现后台运维词。

### 10.3 线上部署

当前服务器 Nginx root：

```text
/var/www/neolink
```

同步命令：

```bash
rsync -az --delete --delete-excluded \
  --exclude='.git/' \
  --exclude='.DS_Store' \
  --exclude='output/' \
  --exclude='var/' \
  --exclude='tools/' \
  --exclude='data/sources/' \
  --exclude='data/accounts.json' \
  --exclude='data/seed-discoveries.json' \
  --exclude='页面.png' \
  ./ neolink:/var/www/neolink/
```

权限修复：

```bash
ssh neolink 'find /var/www/neolink -type d -exec chmod 755 {} +; find /var/www/neolink -type f -exec chmod 644 {} +'
```

线上回读：

```bash
curl -fsS http://neolink.asia/index.html | rg "2026年|data/feed.js"
curl -fsS 'http://neolink.asia/data/feed.js?v=YYYYMMDDHHMM' | rg "generated_at|今日头条关键词|指标关键词"
curl -fsSI 'http://neolink.asia/data/feed.js?v=YYYYMMDDHHMM'
```

`/data/` 已配置 `no-cache`，但 HTML 中的版本号仍必须更新。

### 10.4 Git 提交

部署验证后提交：

```bash
git add index.html news-more.html article.html data/feed.js
git commit -m "Update daily content for YYYY-MM-DD"
git push origin main
```

若改了 README、docs 或图谱，也一并提交。

## 11. 企业图谱维护规范

企业图谱文件：

```text
data/enterprise-map-db.js
```

企业节点建议字段：

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
  tags: ["储能", "动力"],
  ranks: { storage: 1, power: 1 },
  x: 500,
  y: 330,
  size: 142,
  projects: [["项目/指标标题", "来源或口径"]],
  news: [["新闻标题", "05-07"]],
  risks: [["risk-amber", "风险标题", "风险说明"]]
}
```

关系格式：

```js
["from_id", "to_id", "storage|power|consumer|overlap", "关系标签"]
```

规则：

- 不表达未经核实的股权控制关系。
- 关系线只表达同榜、赛道交集、公开合作或明确供应链关系。
- 新增企业必须有来源证据。
- 坐标范围：`x: 0-1000`，`y: 0-650`。

## 12. Hermes 输出格式

Hermes 每次更新前，先输出候选清单供写入层使用：

```json
{
  "generated_at": "2026-05-07T08:41:00+08:00",
  "headlines": [
    {
      "source": "碳索储能网",
      "category": "招投标",
      "title": "储能周报：49 条招标、32 条中标信息汇总",
      "date": "05-06",
      "url": "https://...",
      "credibility": "B",
      "reason": "行业门户周报，适合作为项目线索"
    }
  ],
  "metrics": [
    {
      "title": "碳酸锂价格",
      "value": "18.75",
      "unit": "万元/吨",
      "source": "SMM 上海有色",
      "as_of": "2026-05-07",
      "methodology": "SMM 新能源频道可见价格"
    }
  ]
}
```

写入 `data/feed.js` 时，必须补齐 `summary/body/key_points`。

## 13. 交接 Prompt

可以直接把以下内容作为 Hermes Agent 的系统任务说明：

```text
你是 NeoLink 内容运维 agent。

目标：
每天维护 NeoLink 新能源产业情报站的首页、最新新闻、今日头条、核心指标、材料趋势和站内详情页数据。

执行规则：
1. 每天更新 data/feed.js 的 generated_at。
2. 更新 index.html、news-more.html、article.html 中 data/feed.js 的版本号。
3. 每天选择 4 条左右 headlines，20-40 条 latest。
4. 信息优先使用官方、交易所、企业公告、专业数据源；行业媒体只作为线索。
5. 每条内容必须包含 source/category/title/summary/date/url/body/key_points。
6. 指标必须包含 source/as_of/methodology。
7. 公众号文章可用网页快照提取 clean_text/clean_html，但前台不展示“网页快照”按钮。
8. 第三方媒体和公众号内容不得未授权整篇原样复制；可做事实改写、结构化摘要、必要短摘、图片信息和来源记录。
9. 前台正文不得出现“待核/已核/Hermes/入库/运维/后续应/项目库”等后台词。
10. 写入后运行 node --check，并本地或线上回读验证。
11. 部署后提交 Git 并推送 origin main。
```

## 14. 最近一次人工更新口径参考

2026-05-07 更新采用：

```text
碳索储能网：储能周报，49 条招标、32 条中标。
SMM 上海有色：电池级碳酸锂 18.75 万元/吨。
InfoLink：314Ah 方形铁锂储能电芯均价 0.365 元/Wh。
北极星储能网：首页项目/政策线索，内蒙古 2GW/8GWh、河北 2h 增容 4h。
```

该口径可作为后续每日更新的模板：先找高频更新源，再用专业价格源补指标，最后用行业门户补项目和企业线索。
