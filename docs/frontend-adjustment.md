# 前端可调整地图

此文件给 Hermes 或后续前端维护者定位“改哪里”。内容更新优先只改 `data/market-news.json`；只有用户明确要求 UI 改动时才改前端文件。

## 文件分工

- `index.html`：页面结构、板块顺序、导航锚点、静态文案。
- `styles.css`：主题色、布局、毛玻璃、白天/夜间氛围、排行榜 logo 尺寸、响应式样式。
- `app.js`：读取 JSON、渲染指标/简报/信息源/企业榜单、筛选、搜索、白夜切换。
- `assets/hero-energy-day.jpg`：白天模式主视觉背景。
- `assets/hero-energy-cg.jpg`：夜间模式主视觉背景。
- `assets/logos/`：排行榜企业 logo。

## 常见调整

### 修改页面顺序

在 `index.html` 的 `<main>` 中移动这些 section：

- `#pulse`：标题、检索、最近更新和关键指标。
- `#feed`：每日简报。
- `#watchlist`：重点监控和风险事件。
- `#sources`：信息源窗口。
- `#companies`：出货排行企业公开信息。
- `#method`：每日更新机制。

### 修改颜色与玻璃效果

在 `styles.css` 顶部改 CSS 变量：

- `--bg`：页面底色。
- `--surface`、`--surface-strong`、`--surface-soft`：玻璃卡片底色。
- `--ink`、`--muted`：主文字和次级文字。
- `--accent`、`--accent-2`：主强调色。
- `--glass-blur`：毛玻璃强度。

夜间模式在 `:root.dark` 中维护同名变量。

### 修改 logo 尺寸

在 `styles.css` 搜索：

- `.company-link`
- `.company-logo`
- `.company-logo img`

桌面端当前 logo 容器为 `88px x 58px`，图片为 `76px x 42px`。移动端在 `@media (max-width: 760px)` 内单独设置。

### 修改简报排序或筛选

在 `app.js` 的 `renderFeed()` 中维护。当前逻辑：

- 先按搜索词、分类、时间范围过滤。
- 再按 `date` 倒序排序。

### 修改信息源窗口

只改 `data/market-news.json` 的 `sourceWindows`，前端会自动渲染。

### 修改排行榜

只改 `data/market-news.json` 的 `companyTrackers`，新增榜单或企业会自动渲染。

## 改 UI 后必须验证

```bash
npm run build
STRICT_CONTENT=1 npm run build
```

浏览器至少检查：

- 首页是否能加载。
- 白天/夜间切换是否正常。
- 每日简报是否按时间倒序。
- 信息源窗口是否显示。
- 企业排行榜 logo 是否显示。
- 控制台是否无报错。
