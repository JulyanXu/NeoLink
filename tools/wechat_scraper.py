#!/usr/bin/env python3
"""
WeChat Public Account Article Scraper
原理：mp.weixin.qq.com/s/[hash] 无需登录，直接 HTTP 即可抓取正文
依赖：pip install httpx
用法：
  # 从 URL 列表文件抓（JSON 格式，web_search 输出格式）
  python3 wechat_scraper.py --urls-json /tmp/urls.json

  # 从 feed.js 已有条目中增量抓（自动跳过已有正文的条目）
  python3 wechat_scraper.py --dedup-feed /var/www/neolink/data/feed.js

  # 单个 URL 直接抓
  python3 wechat_scraper.py --url "https://mp.weixin.qq.com/s/..."

  工作流：web_search 发现 URL → 传入本脚本抓正文 → 写入 feed.js
"""

import re, json, sys, time, argparse, fileinput
from datetime import datetime, timezone, timedelta
from pathlib import Path

import httpx

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Referer": "https://mp.weixin.qq.com/",
}

COOKIE_JAR = None


def load_cookie_export(path: str) -> dict:
    """
    Supports:
    - Cookie-Editor export JSON: list[{name,value,domain,...}]
    - Simple dict export: { "name": "value", ... }
    """
    p = Path(path)
    raw = json.loads(p.read_text(encoding="utf-8"))
    if isinstance(raw, dict):
        return {str(k): str(v) for k, v in raw.items()}
    if isinstance(raw, list):
        out = {}
        for item in raw:
            if not isinstance(item, dict):
                continue
            name = item.get("name")
            value = item.get("value")
            if name and value:
                out[str(name)] = str(value)
        return out
    raise ValueError("Unsupported cookies JSON format")


def extract_article(url: str, timeout: int = 20) -> dict:
    """抓取单篇文章正文，无需登录。"""
    try:
        resp = httpx.get(
            url,
            headers=HEADERS,
            cookies=COOKIE_JAR,
            timeout=timeout,
            follow_redirects=True,
        )
        html = resp.text
    except Exception as e:
        return {"url": url, "error": str(e)}

    if len(html) < 5000:
        return {"url": url, "error": f"short_response ({len(html)} bytes)"}

    # 标题
    m = re.search(r'<h1[^>]+id="activity-name"[^>]*>(.*?)</h1>', html, re.DOTALL)
    title = re.sub(r'<[^>]+>', '', m.group(1)).strip() if m else ""

    # 日期（优先中文格式，其次 YYYY-MM-DD）
    date = ""
    for pat in [r'(\d{4}年\d{1,2}月\d{1,2}日)', r'(\d{4}-\d{2}-\d{2})']:
        dm = re.search(pat, html)
        if dm:
            date = dm.group(1)
            break

    # 正文容器
    m = re.search(r'id="js_content"[^>]*>(.*)', html, re.DOTALL)
    if not m:
        return {"url": url, "title": title, "date": date, "error": "no js_content"}

    chtml = m.group(1)
    chtml = re.sub(r'<script[^>]*>.*?</script>', '', chtml, flags=re.DOTALL)
    chtml = re.sub(r'<style[^>]*>.*?</style>', '', chtml, flags=re.DOTALL)
    chtml = re.sub(r'\sdata-src=', ' src=', chtml)
    chtml = re.sub(r'\sdata-original=', ' src=', chtml)

    # 转纯文本
    text = re.sub(r'<[^>]+>', '', chtml)
    for old, new in [
        ("&nbsp;", " "), ("&amp;", "&"), ("&lt;", "<"),
        ("&gt;", ">"), ("&quot;", '"'), ("&#39;", "'"),
        ("&apos;", "'"),
    ]:
        text = text.replace(old, new)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text).strip()

    return {
        "url": url,
        "title": title,
        "date": date,
        "text": text,
        "html": chtml,
        "size_bytes": len(html),
    }


def find_wechat_urls_in_text(text: str) -> list[str]:
    """从任意文本/HTML 中提取 mp.weixin.qq.com URL（去重截断追踪参数）。"""
    urls = re.findall(r'https?://mp\.weixin\.qq\.com/s[a-zA-Z0-9?&=_/-]+', text)
    seen = set()
    result = []
    for u in urls:
        u = re.split(r'[&?#]', u)[0]
        if u not in seen:
            seen.add(u)
            result.append(u)
    return result


def load_urls_from_file(path: str) -> list[str]:
    """从文本文件加载 URL（支持 URL 直列表 或 JSON 格式）。"""
    p = Path(path)
    if p.suffix == ".json":
        with open(p) as f:
            data = json.load(f)
        # 处理 NeoLink wechat_sogou_discover 输出格式：{"articles":[{"url":...},...]}
        if isinstance(data, dict) and "articles" in data and isinstance(data["articles"], list):
            return [item["url"] for item in data["articles"] if isinstance(item, dict) and item.get("url")]
        # 处理 web_search 输出格式：{"data": {"web": [{"url": ...}, ...]}}
        if isinstance(data, dict) and "data" in data:
            data = data["data"]
        if isinstance(data, dict) and "web" in data:
            return [item["url"] for item in data["web"] if "url" in item]
        if isinstance(data, list):
            return [item["url"] if isinstance(item, dict) else item for item in data]
    # 纯文本，每行一个 URL
    urls = []
    with open(p) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#"):
                urls.append(line)
    return urls


def load_existing_feed_urls(feed_path: str) -> set[str]:
    """从 feed.js 提取已有文章的 URL（用于去重）。"""
    urls = set()
    try:
        text = Path(feed_path).read_text()
        m = re.search(r'window\.NEOLINK_FEED\s*=\s*(\{.*\})', text, re.DOTALL)
        if m:
            d = json.loads(m.group(1))
            for sec in d.get("sections", {}).values():
                if isinstance(sec, list):
                    for item in sec:
                        if isinstance(item, dict) and item.get("url"):
                            urls.add(normalize_url(item["url"]))
    except Exception:
        pass
    return urls


def normalize_url(url: str) -> str:
    """URL 协议规范化为 https。"""
    url = url.strip()
    if url.startswith("http://"):
        url = "https://" + url[7:]
    return re.split(r'[&?#]', url)[0]


def scrape_urls(urls: list[str], delay: float = 1.0, existing_urls: set = None) -> list[dict]:
    """抓取多个 URL，返回成功结果列表。"""
    existing_urls = existing_urls or set()
    results = []
    for i, url in enumerate(urls, 1):
        url = normalize_url(url)
        if url in existing_urls:
            print(f"[{i}/{len(urls)}] ⏭️  skip (already in feed): {url[:70]}")
            continue
        print(f"[{i}/{len(urls)}] 📄 {url[:70]}")
        r = extract_article(url)
        if "error" in r:
            print(f"   ❌ {r['error']}")
        else:
            print(f"   ✅ [{r['date']}] {r['title'][:50]}")
            results.append(r)
        time.sleep(delay)
    return results


def infer_category(title: str, text: str = "") -> str:
    """根据标题和正文关键词推断分类（优先级：法律>项目>企业）。"""
    combined = (title + " " + text).lower()
    if any(k in combined for k in ["招标", "中标", "采购", "投标", "开标"]):
        return "招投标"
    if any(k in combined for k in ["政策", "规划", "通知", "意见", "标准", "规定", "办法"]):
        return "政策"
    if any(k in combined for k in ["项目", "开工", "并网", "投产", "建成", "签约", "落地", "扩建", "扩产"]):
        return "项目"
    if any(k in combined for k in ["诉讼", "纠纷", "侵权", "仲裁", "法院", "判决", "处罚", "罚款", "起诉"]):
        return "法律"
    if any(k in combined for k in ["企业", "公司", "订单", "财报", "营收", "产能", "出货", "交付", "战略"]):
        return "企业"
    if any(k in combined for k in ["价格", "涨", "跌", "均价", "报价", "/吨"]):
        return "价格"
    if any(k in combined for k in ["事故", "火灾", "爆炸", "燃烧", "召回", "安全", "热失控", "thermal runaway"]):
        return "安全"
    if any(k in combined for k in ["上市", "IPO", "融资", "投资", "募资", "定增"]):
        return "IPO"
    return "企业"


def format_feed_entry(article: dict, account: str, source_type: str = "微信公众号网页快照") -> dict:
    """将抓取结果格式化为 feed.js 条目。"""
    text = article.get("text", "")
    paragraphs = [p.strip() for p in text.split("\n") if p.strip()]
    summary = paragraphs[0][:200] if paragraphs else ""
    body = [p.strip() for p in text.split("\n") if p.strip() and len(p) > 20]
    body = body[:5]
    points = [p[:100] for p in paragraphs[:3] if len(p) > 30]
    date_str = article.get("date", "")
    date_norm = date_str
    if "年" in date_str:
        try:
            date_norm = datetime.strptime(date_str, "%Y年%m月%d日").strftime("%m-%d")
        except Exception:
            pass
    elif re.match(r'\d{4}-\d{2}-\d{2}', date_str):
        date_norm = date_str[5:]
    return {
        "source": account,
        "source_type": source_type,
        "account_name": account,
        "category": infer_category(article.get("title", ""), text),
        "title": article.get("title", ""),
        "summary": summary,
        "body": body,
        "key_points": points[:3],
        "date": date_norm,
        "url": article["url"],
        "text": text,
        "html": article.get("html", ""),
    }


def main():
    parser = argparse.ArgumentParser(
        description="WeChat Article Scraper — URL → Full Text (No Login Required)"
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--urls-file", help="文件路径：URL 直列表（每行一个）或 JSON 文件")
    group.add_argument("--urls-json", help="JSON 文件路径（web_search 输出格式）")
    group.add_argument("--dedup-feed", help="从 feed.js 增量抓取：传入 feed.js 路径")
    group.add_argument("--url", help="单个 URL（直接指定）")

    parser.add_argument("--account", default="微信公众号", help="公众号名称（用于 feed 条目标识）")
    parser.add_argument("--cookies-json", help="可选：导入登录态 cookies（Cookie-Editor JSON 或简单 KV JSON）")
    parser.add_argument("--max", type=int, default=999, help="最多抓取篇数")
    parser.add_argument("-o", "--output", default="/tmp/wechat_scraped.json", help="输出 JSON 文件")
    parser.add_argument("--delay", type=float, default=1.0, help="请求间隔秒数 (default: 1.0)")
    parser.add_argument("--dry-run", action="store_true", help="只发现 URL，不抓取正文")
    args = parser.parse_args()

    global COOKIE_JAR
    if args.cookies_json:
        try:
            COOKIE_JAR = load_cookie_export(args.cookies_json)
            print(f"🍪 已加载 cookies: {args.cookies_json} ({len(COOKIE_JAR)} keys)")
        except Exception as e:
            print(f"⚠️  cookies 加载失败，将继续无登录态抓取: {e}")
            COOKIE_JAR = None

    # 加载 URL 列表
    if args.url:
        urls = [args.url]
    elif args.urls_file:
        urls = load_urls_from_file(args.urls_file)
    elif args.urls_json:
        urls = load_urls_from_file(args.urls_json)
    else:  # dedup-feed 模式
        feed_urls = load_existing_feed_urls(args.dedup_feed)
        print(f"📋 feed.js 已有 {len(feed_urls)} 个 URL，将跳过已存在条目")
        feed_dir = Path(args.dedup_feed).parent
        accounts_file = feed_dir / "accounts.json"
        if accounts_file.exists():
            with open(accounts_file) as f:
                accounts_data = json.load(f)
            urls = []
            for acc in accounts_data:
                acc_urls = find_wechat_urls_in_text(json.dumps(acc))
                urls.extend(acc_urls)
            print(f"📋 从 accounts.json 加载 {len(urls)} 个待抓 URL")
        else:
            print("⚠️  --dedup-feed 模式需要 data/accounts.json 提供待抓 URL")
            urls = []

    urls = urls[:args.max]
    print(f"\n🔗 共 {len(urls)} 个 URL 待处理\n")

    if args.dry_run:
        for u in urls:
            print(f"  → {u}")
        return

    # 抓取
    articles = scrape_urls(urls, delay=args.delay)

    # 格式化
    entries = [format_feed_entry(a, args.account) for a in articles]

    ts = datetime.now(timezone(timedelta(hours=8))).isoformat()
    output = {
        "account": args.account,
        "scraped_at": ts,
        "method": "httpx direct (no login required)",
        "total_urls": len(urls),
        "total_scraped": len(articles),
        "articles": entries,
    }

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 成功 {len(articles)}/{len(urls)} 篇")
    print(f"💾 结果已保存: {args.output}")
    if articles:
        print(f"\n📌 示例标题:")
        for a in articles[:3]:
            print(f"   [{a['date']}] {a['title'][:60]}")


if __name__ == "__main__":
    main()
