# 部署说明

这是静态站点，不需要后端服务。入口文件是 `index.html`，数据文件在 `data/market-news.json`。

## 通用构建

```bash
npm run build
```

构建会执行：

- 内容结构校验
- JavaScript 语法检查
- 生成 `sitemap.xml`
- 生成 `rss.xml`

## 环境变量

```bash
SITE_URL=https://你的域名
```

`SITE_URL` 会写入站点地图和 RSS。没有配置时使用 `https://example.com` 占位。

## Netlify

仓库根目录已包含 `netlify.toml`。

- Build command: `npm run build`
- Publish directory: `.`
- Environment variable: `SITE_URL`

## Vercel

仓库根目录已包含 `vercel.json`。

- Framework Preset: Other
- Build Command: `npm run build`
- Output Directory: `.`
- Environment variable: `SITE_URL`

## Cloudflare Pages

- Framework preset: None
- Build command: `npm run build`
- Build output directory: `.`
- Environment variable: `SITE_URL`

## 缓存策略

`data/market-news.json`、`rss.xml`、`sitemap.xml` 不做长期缓存，保证每日更新快速生效。CSS、JS、SVG 图标可缓存更久。
