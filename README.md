# NeoLink 新能源市场情报网站

这是一个轻量静态站点，用来每天更新新能源市场消息。首版已覆盖：

- 周期性储能出货量
- 储能电芯价格
- 储能电池出口环比
- 重大企业布局
- 安全事故与法律纠纷
- 项目开工与新产品业态
- 行业巨头动作与新能源企业 IPO
- 政府动作及政策
- 招标公示
- 锂电主材价格趋势

## 本地运行

```bash
python3 -m http.server 5173
```

然后打开：

```text
http://localhost:5173
```

## 更新数据

主要内容在 `data/market-news.json`。所有示例条目都标了 `示例/待替换`，正式发布前请替换为已核验内容。

也可以用脚本追加一条情报：

```bash
node scripts/add-news.mjs \
  --category=policy \
  --priority=high \
  --impact=watch \
  --region=政府 \
  --title=政策标题 \
  --summary=政策摘要 \
  --source=来源名称 \
  --sourceUrl=https://example.com/source \
  --tags=政策,补贴,储能
```

可用分类：

```text
shipment, cellPrice, export, company, safety, legal, project, product, giant, ipo, policy, tender, materials
```

## 后续可扩展

- 接入新闻采集、公告抓取或人工审核后台
- 增加来源链接、附件、原文快照和可信度评分
- 增加价格数据库、项目库、企业库和 IPO 时间线
- 部署到 Vercel、Netlify、Cloudflare Pages 或任意静态托管

## 发布与维护

- 部署说明：`docs/deployment.md`
- Hermes 交接包：`docs/hermes-handoff.md`
- 内容模型：`docs/content-model.md`
- Hermes 维护说明：`docs/hermes-maintenance.md`
- 前端可调整地图：`docs/frontend-adjustment.md`
- 来源清单：`data/source-watchlist.json`
- 内容模板：`data/news-entry-template.json`

日常构建：

```bash
npm run build
```

正式上线前严格检查，确保没有示例内容：

```bash
STRICT_CONTENT=1 npm run build
```
