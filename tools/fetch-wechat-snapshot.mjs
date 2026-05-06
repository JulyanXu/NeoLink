import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(rootDir, "var", "hermes", "wechat-snapshots");

const decodeEntities = (value) => value
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));

const stripHtml = (html) => decodeEntities(html
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/<br\s*\/?>/gi, "\n")
  .replace(/<\/p>/gi, "\n")
  .replace(/<\/h[1-6]>/gi, "\n")
  .replace(/<[^>]+>/g, " "))
  .replace(/\u200d/g, "")
  .replace(/[ \t]+\n/g, "\n")
  .replace(/\n{3,}/g, "\n\n")
  .replace(/[ \t]{2,}/g, " ")
  .trim();

const cleanInlineHtml = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
  .replace(/<object[\s\S]*?<\/object>/gi, "")
  .replace(/<embed[\s\S]*?<\/embed>/gi, "")
  .replace(/<img\b([^>]*?)\sdata-src=["']([^"']+)["']([^>]*)>/gi, '<img$1 src="$2"$3>')
  .replace(/<img\b([^>]*?)\sdata-original=["']([^"']+)["']([^>]*)>/gi, '<img$1 src="$2"$3>')
  .replace(/\s(?:style|class|id|onclick|onload|onerror|onmouseover|data-[\w-]+)=["'][^"']*["']/gi, "")
  .replace(/<a\b([^>]*?)>/gi, '<a$1 target="_blank" rel="noreferrer">')
  .trim();

const matchFirst = (text, patterns) => {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return decodeEntities(match[1]).trim();
  }
  return "";
};

const hash = (value) => createHash("sha256").update(String(value)).digest("hex");

const getSnapshotId = (url) => {
  try {
    return new URL(url).pathname.split("/").filter(Boolean).pop() || hash(url).slice(0, 12);
  } catch {
    return hash(url).slice(0, 12);
  }
};

const extractArticleHtml = (html) => {
  const article = matchFirst(html, [/<article[^>]*>([\s\S]*?)<\/article>/i]);
  if (article) return article;
  return matchFirst(html, [
    /<div[^>]+class=["'][^"']*(?:article|content|main)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<body[^>]*>([\s\S]*?)<\/body>/i,
  ]);
};

const getAttr = (tag, name) => matchFirst(tag, [
  new RegExp(`${name}=["']([^"']+)["']`, "i"),
  new RegExp(`${name}=([^\\s>]+)`, "i"),
]);

const normalizeImageUrl = (value) => {
  if (!value) return "";
  const decoded = decodeEntities(value).trim();
  if (!decoded || decoded.startsWith("data:")) return "";
  if (decoded.startsWith("//")) return `https:${decoded}`;
  return decoded;
};

const extractImageRefs = (articleHtml) => {
  const refs = [];
  const seen = new Set();
  for (const match of articleHtml.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const url = normalizeImageUrl(
      getAttr(tag, "data-src")
      || getAttr(tag, "data-original")
      || getAttr(tag, "src")
    );
    if (!url || seen.has(url)) continue;
    seen.add(url);
    refs.push({
      url,
      alt: decodeEntities(getAttr(tag, "alt") || ""),
      caption: `原文图片 ${refs.length + 1}`,
      source: "网页快照正文图片",
    });
  }
  return refs.slice(0, 12);
};

const inferAccountAndDate = (title) => {
  const info = {
    account_name: "",
    publish_date: "",
  };
  const paren = title.match(/（([^（）]+?)\s*(\d{4}年\d{1,2}月\d{1,2}日)[^（）]*）/);
  if (paren) {
    info.publish_date = paren[2]
      .replace("年", "-")
      .replace("月", "-")
      .replace("日", "")
      .replace(/-(\d)(?=-|$)/g, "-0$1");
    const beforeDate = paren[1].trim();
    const tokens = beforeDate.split(/\s+/).filter(Boolean);
    info.account_name = tokens.at(-1) || beforeDate;
  }
  return info;
};

const extractSnapshot = async (snapshotUrl) => {
  const response = await fetch(snapshotUrl, {
    headers: {
      "user-agent": "Mozilla/5.0 NeoLink Hermes snapshot crawler",
      "accept": "text/html,application/xhtml+xml",
    },
  });
  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status} ${response.statusText}`);
  }

  const rawHtml = await response.text();
  const title = matchFirst(rawHtml, [
    /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i,
    /<title[^>]*>([\s\S]*?)<\/title>/i,
  ]).replace(/\s+/g, " ");
  const originalUrl = matchFirst(rawHtml, [
    /<a[^>]+href=["'](https:\/\/mp\.weixin\.qq\.com\/s\/[^"']+)["'][^>]*>\s*查看原文\s*<\/a>/i,
    /(https:\/\/mp\.weixin\.qq\.com\/s\/[A-Za-z0-9_-]+)/,
  ]).replace(/&amp;/g, "&");

  const articleHtml = extractArticleHtml(rawHtml);
  const cleanText = stripHtml(articleHtml);
  const imageRefs = extractImageRefs(articleHtml);
  const inferred = inferAccountAndDate(title);
  const snapshotId = getSnapshotId(snapshotUrl);

  return {
    id: `snapshot:${snapshotId}`,
    title,
    account_name: inferred.account_name,
    publish_date: inferred.publish_date,
    snapshot_url: snapshotUrl,
    original_url: originalUrl,
    content_hash: hash(cleanText),
    char_count: cleanText.length,
    image_refs: imageRefs,
    clean_html: cleanInlineHtml(articleHtml),
    clean_text: cleanText,
  };
};

const main = async () => {
  const urls = process.argv.slice(2);
  if (!urls.length) {
    console.error("Usage: node tools/fetch-wechat-snapshot.mjs <snapshot-url> [snapshot-url...]");
    process.exitCode = 1;
    return;
  }

  await mkdir(outputDir, { recursive: true });
  const results = [];
  for (const url of urls) {
    const result = await extractSnapshot(url);
    results.push(result);
    const filePath = path.join(outputDir, `${getSnapshotId(url)}.json`);
    await writeFile(filePath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  }

  console.log(JSON.stringify({
    count: results.length,
    output_dir: path.relative(rootDir, outputDir),
    articles: results.map(({ id, title, account_name, publish_date, original_url, char_count, content_hash, image_refs }) => ({
      id,
      title,
      account_name,
      publish_date,
      original_url,
      char_count,
      image_count: image_refs?.length || 0,
      content_hash,
    })),
  }, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
