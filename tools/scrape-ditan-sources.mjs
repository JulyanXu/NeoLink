import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(rootDir, "data", "sources");
const baseUrl = "https://www.ditan.com";
const seedPages = [
  "/news/",
  "/news/hot/",
  "/news/bidding/",
  "/news/interview/",
  "/news/themes/",
];

const maxListPagesPerChannel = Number(process.env.DITAN_MAX_LIST_PAGES || 999);
const maxArticles = Number(process.env.DITAN_MAX_ARTICLES || 5000);
const requestDelayMs = Number(process.env.DITAN_DELAY_MS || 120);
const requestTimeoutMs = Number(process.env.DITAN_TIMEOUT_MS || 12000);
const articleConcurrency = Number(process.env.DITAN_CONCURRENCY || 8);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const stripTags = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/<[^>]+>/g, "")
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, "\"")
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/\s+/g, " ")
  .trim();

const absoluteUrl = (href) => {
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return "";
  }
};

const fetchText = async (url) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), requestTimeoutMs);
  const response = await fetch(url, {
    signal: controller.signal,
    headers: {
      "user-agent": "Mozilla/5.0 NeoLink source audit crawler",
      "accept": "text/html,application/xhtml+xml",
    },
  }).finally(() => clearTimeout(timer));
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.text();
};

const extractLinks = (html, pattern) => {
  const links = new Set();
  for (const match of html.matchAll(/href=["']([^"']+)["']/g)) {
    const href = match[1];
    if (pattern.test(href)) {
      links.add(absoluteUrl(href));
    }
  }
  return links;
};

const getChannel = (url) => {
  const match = url.match(/\/news\/([^/_\d]+)(?:_|\/)/);
  return match?.[1] || "news";
};

const extractTitle = (html) => {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return stripTags(h1[1]);
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return title ? stripTags(title[1]).replace(/\s*-\s*.*$/, "") : "";
};

const extractDate = (html) => {
  const text = stripTags(html);
  return text.match(/\b20\d{2}\s+\d{2}\/\d{2}\b/)?.[0]
    || text.match(/\b20\d{2}-\d{2}-\d{2}\b/)?.[0]
    || "";
};

const extractAuthor = (html) => {
  const text = stripTags(html);
  const sourceIndex = text.indexOf("来源");
  const beforeSource = sourceIndex >= 0 ? text.slice(0, sourceIndex) : text.slice(0, 180);
  const dateMatch = beforeSource.match(/20\d{2}\s+\d{2}\/\d{2}\s+([^\s来源]{2,12})/);
  return dateMatch?.[1] || "";
};

const extractSource = (html) => {
  const sourceBlock = html.match(/<div[^>]*class=["'][^"']*news_source[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
  if (sourceBlock?.[1]) {
    const source = stripTags(sourceBlock[1]).replace(/^来源[:：]\s*/, "").trim();
    if (source) return source;
  }

  const text = stripTags(html);
  const sourceMatch = text.match(/来源[:：]\s*([^#字体标签分享到摘要]{1,80}?)(?=\s*(#|字体|标签|分享到|摘要|小\s*中\s*大|$))/);
  if (sourceMatch?.[1]) return sourceMatch[1].trim();

  const htmlMatch = html.match(/来源[:：]\s*(?:<[^>]+>)*\s*([^<\n\r]{1,80})/i);
  if (htmlMatch?.[1]) return stripTags(htmlMatch[1]);

  return "";
};

const extractArticle = async (url) => {
  const html = await fetchText(url);
  return {
    url,
    channel: getChannel(url),
    title: extractTitle(html),
    publish_date: extractDate(html),
    author: extractAuthor(html),
    source: extractSource(html),
  };
};

const main = async () => {
  await mkdir(outputDir, { recursive: true });

  const listPages = new Set(seedPages.map(absoluteUrl));
  const articleLinks = new Set();
  const visitedLists = new Set();

  let listIndex = 0;
  while (listIndex < Array.from(listPages).length) {
    const pageUrl = Array.from(listPages)[listIndex];
    listIndex += 1;
    if (visitedLists.has(pageUrl)) continue;
    visitedLists.add(pageUrl);
    if (visitedLists.size % 10 === 0 || visitedLists.size <= 5) {
      console.error(`[list] ${visitedLists.size}/${listPages.size} ${pageUrl}`);
    }
    await sleep(requestDelayMs);

    let html = "";
    try {
      html = await fetchText(pageUrl);
    } catch (error) {
      console.error(`list failed ${pageUrl}: ${error.message}`);
      continue;
    }

    for (const link of extractLinks(html, /^\/news\/(?:hot|bidding|interview|themes)\/\d+\.html$/)) {
      articleLinks.add(link);
    }

    for (const link of extractLinks(html, /^\/news\/(?:hot|bidding|interview|themes)_\d+\/$/)) {
      const channel = getChannel(link);
      const channelPages = [...listPages].filter((item) => getChannel(item) === channel).length;
      if (channelPages < maxListPagesPerChannel) {
        listPages.add(link);
      }
    }

    if (visitedLists.size < listPages.size) {
      for (const next of Array.from(listPages)) {
        if (!visitedLists.has(next)) {
          listPages.add(next);
        }
      }
    }
  }

  const articles = [];
  const failures = [];
  const articleUrls = Array.from(articleLinks).slice(0, maxArticles);
  console.error(`[discover] list_pages=${visitedLists.size} articles=${articleLinks.size} capped=${articleUrls.length}`);

  let nextArticleIndex = 0;
  let completedArticles = 0;

  const articleWorker = async () => {
    while (nextArticleIndex < articleUrls.length) {
      const index = nextArticleIndex;
      nextArticleIndex += 1;
      const url = articleUrls[index];
      await sleep(requestDelayMs);
      try {
        const article = await extractArticle(url);
        articles.push(article);
      } catch (error) {
        failures.push({ url, error: error.message });
      }
      completedArticles += 1;
      if (completedArticles % 100 === 0 || completedArticles === articleUrls.length) {
        console.error(`[article] ${completedArticles}/${articleUrls.length} fetched=${articles.length} failed=${failures.length}`);
        await writeFile(path.join(outputDir, "ditan-article-sources.partial.json"), JSON.stringify({ articles, failures }, null, 2), "utf8");
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(articleConcurrency, articleUrls.length) }, () => articleWorker()));

  const sourceStats = new Map();
  for (const article of articles) {
    const source = article.source || "未提取到来源";
    sourceStats.set(source, (sourceStats.get(source) || 0) + 1);
  }

  const summary = {
    generated_at: new Date().toISOString(),
    base_url: baseUrl,
    visited_list_pages: visitedLists.size,
    discovered_articles: articleLinks.size,
    fetched_articles: articles.length,
    source_extracted: articles.filter((item) => item.source).length,
    source_missing: articles.filter((item) => !item.source).length,
    failed_articles: failures.length,
    source_stats: Array.from(sourceStats.entries())
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count || a.source.localeCompare(b.source, "zh-CN")),
  };

  const csvRows = [
    ["channel", "publish_date", "source", "author", "title", "url"],
    ...articles.map((item) => [
      item.channel,
      item.publish_date,
      item.source,
      item.author,
      item.title,
      item.url,
    ]),
  ];
  const csv = csvRows.map((row) => row.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(",")).join("\n");

  await writeFile(path.join(outputDir, "ditan-article-sources.json"), JSON.stringify({ summary, articles, failures }, null, 2), "utf8");
  await writeFile(path.join(outputDir, "ditan-article-sources.csv"), `${csv}\n`, "utf8");
  await writeFile(path.join(outputDir, "ditan-source-stats.json"), JSON.stringify(summary, null, 2), "utf8");

  console.log(JSON.stringify(summary, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
