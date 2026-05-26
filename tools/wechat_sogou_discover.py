#!/usr/bin/env python3
"""
Discover WeChat Official Account article URLs via Sogou Weixin Search (type=2).

Why this exists:
- Sogou `type=2` result pages contain `/link?url=...` entries for individual articles.
- Resolving `/link` often triggers Sogou anti-spider unless you have a real logged-in /
  captcha-cleared cookie session.
- This tool accepts exported cookies (Cookie-Editor JSON or a simple cookie KV JSON)
  and uses them to resolve `/link` -> `mp.weixin.qq.com/s?...` URLs, then outputs a JSON
  that can be fed into `tools/wechat_scraper.py --urls-json ...`.

Usage:
  python3 tools/wechat_sogou_discover.py \
    --cookies-json var/hermes/secrets/sogou-cookies.json \
    --query "高工储能" \
    --max 20 \
    -o /tmp/wechat_urls.json

  # Discover for all enabled wechat_public_account entries in data/accounts.json:
  python3 tools/wechat_sogou_discover.py \
    --cookies-json var/hermes/secrets/sogou-cookies.json \
    --accounts data/accounts.json \
    --max-per-account 10 \
    -o /tmp/wechat_urls.json
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
from dataclasses import dataclass
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Any
from urllib.parse import urljoin, urlparse

import httpx

SOGOU_BASE = "https://weixin.sogou.com"

DEFAULT_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Referer": SOGOU_BASE + "/",
}

TZ_CST = timezone(timedelta(hours=8))


def now_cst_iso() -> str:
    return datetime.now(TZ_CST).isoformat(timespec="seconds")


def epoch_to_cst_iso(epoch: int) -> str:
    try:
        return datetime.fromtimestamp(int(epoch), TZ_CST).isoformat(timespec="seconds")
    except Exception:
        return ""


def load_cookie_export(path: Path) -> dict[str, str]:
    """
    Supports:
    - Cookie-Editor export JSON: list[{name,value,domain,...}]
    - Simple dict export: { "name": "value", ... }
    """
    raw = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(raw, dict):
        return {str(k): str(v) for k, v in raw.items()}
    if isinstance(raw, list):
        out: dict[str, str] = {}
        for item in raw:
            if not isinstance(item, dict):
                continue
            name = item.get("name")
            value = item.get("value")
            if name and value:
                out[str(name)] = str(value)
        return out
    raise ValueError("Unsupported cookies JSON format")


def is_antispider_url(url: str) -> bool:
    try:
        parsed = urlparse(url)
        return parsed.netloc.endswith("weixin.sogou.com") and parsed.path.startswith("/antispider/")
    except Exception:
        return False


def normalize_url(url: str) -> str:
    try:
        parsed = urlparse(url)
        return parsed._replace(fragment="").geturl()
    except Exception:
        return url


@dataclass
class Discovered:
    query: str
    sogou_link_url: str
    mp_url: str
    title: str
    published_at: str


def parse_type2_results(html: str, query: str) -> list[dict[str, Any]]:
    """
    Returns raw items containing:
    - link_path: /link?url=...
    - title: extracted from result anchor text (best-effort)
    - time_text: extracted (best-effort)
    """
    # Each result typically has anchor IDs like sogou_vr_11002601_title_{i} and href="/link?url=..."
    items: list[dict[str, Any]] = []
    for match in re.finditer(r'href="(?P<href>/link\?url=[^"]+)"[^>]*id="[^"]*title_(?P<idx>\d+)"[^>]*>(?P<title>.*?)</a>', html, re.DOTALL):
        href = match.group("href")
        title_html = match.group("title") or ""
        title = re.sub(r"<[^>]+>", "", title_html)
        title = title.replace("<!--red_beg-->", "").replace("<!--red_end-->", "")
        title = re.sub(r"\s+", " ", title).strip()
        idx = match.group("idx")

        # Try to find a nearby publish time. Sogou often shows it via:
        #   document.write(timeConvert('1652705809'))
        # Heuristic: search a short window after the title anchor.
        tail = html[match.end() : match.end() + 1200]
        time_text = ""
        published_epoch = None
        tm = re.search(r"timeConvert\\('(?P<epoch>\\d{10})'\\)", tail)
        if tm:
            published_epoch = int(tm.group("epoch"))
            time_text = epoch_to_cst_iso(published_epoch)
        else:
            tm = re.search(r"(\d{4}-\d{1,2}-\d{1,2})", tail)
            if tm:
                time_text = tm.group(1)
            else:
                tm = re.search(r"(\d{1,2}-\d{1,2})", tail)
                if tm:
                    time_text = tm.group(1)

        items.append(
            {
                "query": query,
                "idx": int(idx) if idx.isdigit() else None,
                "link_path": href,
                "title": title,
                "published_at": time_text,
                "published_epoch": published_epoch,
            }
        )
    return items


def resolve_link(client: httpx.Client, link_path: str) -> tuple[str | None, list[str], str | None]:
    """
    Resolve a Sogou /link?url=... into a final mp.weixin.qq.com URL.
    Returns: (mp_url, chain, error)
    """
    start_url = urljoin(SOGOU_BASE, link_path)
    chain: list[str] = [start_url]
    try:
        # We want to control redirects to detect antispider.
        resp = client.get(start_url, follow_redirects=False)
        chain.append(str(resp.headers.get("location", "")))
        # Manually follow limited redirects
        for _ in range(8):
            if resp.is_redirect:
                loc = resp.headers.get("location", "")
                if not loc:
                    return None, chain, "redirect_without_location"
                next_url = urljoin(start_url, loc)
                chain.append(next_url)
                if is_antispider_url(next_url):
                    return None, chain, "antispider"
                if "mp.weixin.qq.com" in urlparse(next_url).netloc:
                    return normalize_url(next_url), chain, None
                resp = client.get(next_url, follow_redirects=False)
            else:
                break
        return None, chain, "no_mp_redirect"
    except Exception as e:
        return None, chain, f"exception:{e}"


def load_accounts(path: Path) -> list[dict[str, Any]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("accounts.json must be a list")
    return [a for a in data if isinstance(a, dict)]


def main() -> int:
    parser = argparse.ArgumentParser(description="Discover mp.weixin.qq.com article URLs via Sogou (type=2) using logged-in cookies.")
    parser.add_argument("--cookies-json", required=True, help="Cookie export JSON (Cookie-Editor export or simple dict).")

    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--query", help="Search keyword (e.g. 公众号名或主题)")
    group.add_argument("--accounts", help="Path to data/accounts.json; discover per enabled wechat_public_account entry")

    parser.add_argument("--max", type=int, default=20, help="Max results for single --query (default: 20)")
    parser.add_argument("--max-per-account", type=int, default=10, help="Max results per account when using --accounts (default: 10)")
    parser.add_argument("--lookback-days", type=int, default=30, help="Only keep results within N days if publish time is available (default: 30)")
    parser.add_argument("--max-pages", type=int, default=5, help="Max search pages to scan per query (default: 5)")
    parser.add_argument("--delay", type=float, default=0.4, help="Delay between link resolves in seconds (default: 0.4)")
    parser.add_argument("-o", "--output", default="/tmp/wechat_urls.json", help="Output JSON path")
    args = parser.parse_args()

    cookie_path = Path(args.cookies_json)
    if not cookie_path.exists():
        print(f"ERROR: cookies file not found: {cookie_path}", file=sys.stderr)
        return 2
    cookies = load_cookie_export(cookie_path)

    queries: list[tuple[str, str]] = []
    if args.query:
        queries.append((args.query, args.query))
        max_per_query = args.max
    else:
        accounts = load_accounts(Path(args.accounts))
        for acc in accounts:
            if not acc.get("enabled", True):
                continue
            if acc.get("source_type") != "wechat_public_account":
                continue
            keyword = str(acc.get("keyword") or acc.get("name") or "").strip()
            if not keyword:
                continue
            queries.append((str(acc.get("name") or keyword), keyword))
        max_per_query = args.max_per_account

    discovered: list[Discovered] = []
    errors: list[dict[str, Any]] = []

    cutoff_epoch = int((datetime.now(TZ_CST) - timedelta(days=max(args.lookback_days, 0))).timestamp())

    with httpx.Client(
        headers=DEFAULT_HEADERS,
        cookies=cookies,
        timeout=20,
        follow_redirects=True,  # for search page itself
    ) as client:
        for (account_name, keyword) in queries:
            search_url = f"{SOGOU_BASE}/weixin"
            scanned = 0
            candidates: list[dict[str, Any]] = []

            for page in range(1, max(args.max_pages, 1) + 1):
                try:
                    resp = client.get(
                        search_url,
                        params={
                            "type": "2",
                            "query": keyword,
                            "page": str(page),
                            "tsn": "1",  # prefer time ordering when supported
                        },
                    )
                    html = resp.text
                except Exception as e:
                    errors.append({"query": keyword, "stage": "search", "error": str(e), "page": page})
                    break

                page_items = parse_type2_results(html, keyword)
                scanned += len(page_items)
                if not page_items:
                    if page == 1:
                        errors.append({"query": keyword, "stage": "parse", "error": "no_results_parsed", "status": getattr(resp, "status_code", None)})
                    break

                candidates.extend(page_items)
                # If we already collected enough candidates, stop fetching more pages.
                if len(candidates) >= max_per_query * 3:
                    break

            # Prefer items with epoch and filter by lookback when epoch exists.
            with_epoch = [it for it in candidates if isinstance(it.get("published_epoch"), int)]
            without_epoch = [it for it in candidates if not isinstance(it.get("published_epoch"), int)]

            recent = [it for it in with_epoch if int(it["published_epoch"]) >= cutoff_epoch]
            # Sort newest first.
            recent.sort(key=lambda it: int(it["published_epoch"]), reverse=True)
            # Backfill with undated items (rare) if we still need.
            selected = (recent + without_epoch)[:max_per_query]

            if not selected:
                errors.append({"query": keyword, "stage": "select", "error": "no_recent_items", "scanned": scanned})
                continue

            for item in selected:
                link_path = item["link_path"]
                mp_url, chain, err = resolve_link(client, link_path)
                if err:
                    errors.append({"query": keyword, "stage": "resolve", "error": err, "link_path": link_path, "chain": chain[:6]})
                    if err == "antispider":
                        # If cookie session is invalid, it's pointless to continue spamming.
                        break
                    continue
                discovered.append(
                    Discovered(
                        query=keyword,
                        sogou_link_url=urljoin(SOGOU_BASE, link_path),
                        mp_url=mp_url or "",
                        title=item.get("title", ""),
                        published_at=item.get("published_at", ""),
                    )
                )
                time.sleep(max(args.delay, 0))

    output = {
        "generated_at": now_cst_iso(),
        "methodology": "Sogou weixin search (type=2, tsn=1) + /link resolve using logged-in cookies; extracts publish epoch from timeConvert() and keeps items within lookback window when available; output mp.weixin.qq.com URLs only.",
        "cookies_file": str(cookie_path),
        "total_discovered": len(discovered),
        "lookback_days": args.lookback_days,
        "articles": [
            {
                "query": d.query,
                "url": d.mp_url,
                "source_url": d.sogou_link_url,
                "title_hint": d.title,
                "published_at_hint": d.published_at,
            }
            for d in discovered
        ],
        "errors": errors,
    }

    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"✅ discovered={len(discovered)} errors={len(errors)} -> {out_path}")
    if any(e.get("error") == "antispider" for e in errors):
        print("⚠️  antispider detected: your Sogou cookie session likely needs re-login / captcha in a real browser.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
