#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const baseUrl = process.env.SITE_URL || "https://example.com";
const data = JSON.parse(await readFile(resolve(root, "data/market-news.json"), "utf8"));

const latestDate = data.news[0]?.date || data.generatedAt.slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${latestDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const rssItems = data.news
  .slice(0, 30)
  .map((item) => {
    const pubDate = new Date(`${item.date}T08:00:00+08:00`).toUTCString();
    return `    <item>
      <title>${xml(item.title)}</title>
      <description>${xml(item.summary)}</description>
      <pubDate>${pubDate}</pubDate>
      <guid>${xml(item.id)}</guid>
      ${item.sourceUrl ? `<link>${xml(item.sourceUrl)}</link>` : ""}
    </item>`;
  })
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>NeoLink 每日新能源市场简报</title>
    <link>${baseUrl}/</link>
    <description>储能、锂电、政策、招标、IPO 与新能源企业动态。</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date(data.generatedAt).toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`;

await writeFile(resolve(root, "sitemap.xml"), sitemap);
await writeFile(resolve(root, "rss.xml"), rss);
await writeFile(
  resolve(root, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`,
);
console.log(`已生成 sitemap.xml 和 rss.xml，站点地址：${baseUrl}`);

function xml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
