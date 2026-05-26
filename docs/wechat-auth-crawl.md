# WeChat 公众号（带登录态）抓取接入说明

NeoLink 的公众号正文抓取依赖两步：
1) 发现文章 URL（通常来自 Sogou 微信搜索的 `/link?url=...` 跳转）
2) 抓取文章正文（`mp.weixin.qq.com/s?...`）

由于 Sogou `/link` 经常触发反爬（`/antispider/`），需要使用 **真实浏览器登录态 cookies**。

## 1. 准备 cookies（一次即可，过期再做）

1. 用你常用的 Chrome/Chromium 打开并完成验证（出现验证码就手动过掉）：
   - `https://weixin.sogou.com/`
2. 安装 Cookie 导出插件（例如 Cookie-Editor），导出 **weixin.sogou.com / sogou.com** 的 cookies 为 JSON。
3. 将导出的 JSON 保存到（不要提交 git）：
   - `var/hermes/secrets/sogou-cookies.json`

> 💡 cookies 相当于“浏览器登录态凭证”，脚本用它模拟已通过验证的请求；泄露 cookies 等同于泄露账号会话。

## 2. 发现公众号文章 URL（Sogou type=2）

### 单个关键词
```bash
python3 tools/wechat_sogou_discover.py \
  --cookies-json var/hermes/secrets/sogou-cookies.json \
  --query "高工储能" \
  --max 20 \
  -o /tmp/wechat_urls.json
```

### 按 `data/accounts.json`（启用的 wechat_public_account）
```bash
python3 tools/wechat_sogou_discover.py \
  --cookies-json var/hermes/secrets/sogou-cookies.json \
  --accounts data/accounts.json \
  --max-per-account 10 \
  -o /tmp/wechat_urls.json
```

如果输出里出现 `antispider`，说明 cookies 失效或需要重新在浏览器过验证。

## 3. 抓取正文（mp.weixin.qq.com）

```bash
python3 tools/wechat_scraper.py \
  --urls-json /tmp/wechat_urls.json \
  --cookies-json var/hermes/secrets/sogou-cookies.json \
  --account "微信公众号" \
  -o /tmp/wechat_scraped.json
```

随后可将 `/tmp/wechat_scraped.json` 中的条目按 NeoLink 既有写入逻辑落入 `data/feed.js`（保留 `source/as_of/methodology/url` 等字段）。

