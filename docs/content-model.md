# 内容模型

## market-news.json

```json
{
  "generatedAt": "2026-04-21T16:54:00+08:00",
  "signals": [],
  "watchlist": [],
  "sourceWindows": [],
  "companyTrackers": [],
  "news": []
}
```

## signals

用于首页关键指标。建议只放 4 到 8 个最高频指标。

- `label`：指标名
- `value`：展示值，可以是数字、区间或 `待接入`
- `change`：变化说明
- `direction`：`up`、`down`、`flat`
- `note`：口径说明
- `series`：用于趋势线的数值数组

## news

正式发布的核心内容。分类、优先级和影响字段必须使用 `data/taxonomy.json` 中的定义。

示例：

```json
{
  "id": "20260421-policy-example",
  "date": "2026-04-21",
  "category": "policy",
  "priority": "high",
  "impact": "watch",
  "region": "政府",
  "title": "政策标题",
  "summary": "政策摘要、影响和后续观察点。",
  "source": "来源名称",
  "sourceUrl": "https://example.com/source",
  "status": "已核验",
  "tags": ["政策", "储能"]
}
```

## watchlist

用于侧栏长期监控主题，不需要每日新增太多。

- `name`：监控主题
- `reason`：为什么值得跟踪

## sourceWindows

用于页面上的信息源窗口，给 Hermes 和人工维护者定位抓取入口。

- `type`：来源类型，例如 `政府及监管机构`、`第三方咨询`
- `title`：窗口标题
- `summary`：采集用途、授权边界和核验要求
- `cadence`：建议采集频率
- `access`：公开页、报告页、授权 API、付费报告等访问方式
- `entries`：来源入口数组

`entries` 字段：

- `name`：来源名称
- `window`：该来源要抓取的信息窗口
- `url`：公开入口链接

## companyTrackers

用于“出货排行企业公开信息”板块。榜单可以是储能电池、动力电池、3C 电池等。

- `type`：榜单类型
- `title`：榜单标题，必须写明年份和口径
- `basis`：榜单来源、统计口径、授权限制
- `companies`：企业数组

`companies` 字段：

- `rank`：展示排名，建议两位数文本，例如 `01`
- `name`：企业名称
- `logoUrl`：企业 logo 图片。优先使用 `assets/logos/` 本地文件；没有本地文件时可使用公开 favicon 服务临时兜底
- `logoText`：历史兜底字段。当前 UI 不显示文字 logo，但保留可读性
- `focus`：Hermes 每日抓取重点
- `source`：主要公开披露来源类型
- `url`：企业公开入口

## source-watchlist.json

Hermes 的来源配置，按六类渠道维护：

- 政府及监管机构
- 行业协会与第三方研究机构
- 企业公开信息
- 专业数据库与媒体平台
- 合规一手信息
- 法律红线

每个来源需要记录 `categories`、`examples` 和 `requiredFields`。付费数据库、授权API、调研资料和用户投稿必须额外记录授权范围或审核状态，不能把账号、Cookie、API key、原始付费数据表写入仓库。
