import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(rootDir, "data");
const stateDir = path.join(rootDir, "var", "hermes", "state");
const rawDir = path.join(rootDir, "var", "hermes", "raw");
const cleanDir = path.join(rootDir, "var", "hermes", "clean");

const config = {
  lookbackWindowHours: 48,
  maxArticlesPerAccountPerRun: 20,
  maxRetries: 3,
};

const readJson = async (filePath, fallback) => {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
};

const writeJson = async (filePath, value) => {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const hash = (value) => createHash("sha256").update(String(value)).digest("hex");

const normalizeUrl = (url) => {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    ["from", "scene", "clicktime", "enterid", "ascene", "devicetype", "version"].forEach((key) => {
      parsed.searchParams.delete(key);
    });
    return parsed.toString();
  } catch {
    return url.trim();
  }
};

const getWechatArticleId = (url) => {
  try {
    const parsed = new URL(url);
    const biz = parsed.searchParams.get("__biz") || parsed.searchParams.get("biz");
    const mid = parsed.searchParams.get("mid");
    const idx = parsed.searchParams.get("idx");
    const sn = parsed.searchParams.get("sn");
    return biz && mid && idx && sn ? `${biz}:${mid}:${idx}:${sn}` : null;
  } catch {
    return null;
  }
};

const getUniqueArticleId = (item) => {
  const wechatId = getWechatArticleId(item.url);
  if (wechatId) return `wechat:${wechatId}`;
  const normalized = normalizeUrl(item.url);
  if (normalized) return `url:${hash(normalized).slice(0, 24)}`;
  const date = new Date(item.publish_time).toISOString().slice(0, 10);
  return `fallback:${hash(`${item.account_name}|${item.title}|${date}`).slice(0, 24)}`;
};

const toCleanText = (article) => [
  article.title,
  article.digest,
  `来源：${article.account_name}`,
  `主题：${(article.topics || []).join("、")}`,
].filter(Boolean).join("\n\n");

const summarize = (cleanText) => {
  const compact = cleanText.replace(/\s+/g, " ").trim();
  return compact.length > 118 ? `${compact.slice(0, 118)}...` : compact;
};

const discover = ({ account, candidates, existingById, run, now }) => {
  const cutoff = now.getTime() - config.lookbackWindowHours * 60 * 60 * 1000;
  const selected = candidates
    .filter((item) => item.account_id === account.id)
    .filter((item) => new Date(item.publish_time).getTime() >= cutoff)
    .slice(0, config.maxArticlesPerAccountPerRun);
  const seenInRun = new Set();

  return selected.flatMap((item) => {
    const uniqueId = getUniqueArticleId(item);
    if (seenInRun.has(uniqueId)) {
      run.discovered_count += 1;
      run.skipped_count += 1;
      return [];
    }
    seenInRun.add(uniqueId);

    const existing = existingById.get(uniqueId);

    run.discovered_count += 1;
    if (existing) {
      existing.last_seen_at = now.toISOString();
      existing.digest = existing.digest || item.digest;
      run.skipped_count += 1;
      return existing;
    }

    run.new_count += 1;
    return {
      id: randomUUID(),
      account_id: account.id,
      account_name: account.name,
      unique_article_id: uniqueId,
      title: item.title,
      url: item.url,
      canonical_url: normalizeUrl(item.url),
      publish_time: item.publish_time,
      first_seen_at: now.toISOString(),
      last_seen_at: now.toISOString(),
      status: "discovered",
      digest: item.digest || "",
      cover_url: item.cover_url || "",
      author: item.author || "",
      location: item.location || "",
      category: item.category || "market",
      tags: item.topics || [],
      source: item.source || account.source_type,
      retry_count: 0,
      error_message: ""
    };
  });
};

const fetchArticle = async (article, now) => {
  if (article.status !== "discovered") return article;

  article.status = "fetching";
  const cleanText = toCleanText(article);
  const contentHash = hash(cleanText);

  if (article.content_hash && article.content_hash === contentHash) {
    article.status = "fetched";
    return article;
  }

  const rawPath = path.join(rawDir, `${article.unique_article_id.replace(/[^a-z0-9_-]/gi, "_")}.html`);
  const cleanPath = path.join(cleanDir, `${article.unique_article_id.replace(/[^a-z0-9_-]/gi, "_")}.txt`);
  const rawHtml = `<article><h1>${article.title}</h1><p>${article.digest}</p><p>Original: ${article.url}</p></article>`;

  await mkdir(rawDir, { recursive: true });
  await mkdir(cleanDir, { recursive: true });
  await writeFile(rawPath, rawHtml, "utf8");
  await writeFile(cleanPath, cleanText, "utf8");

  article.content_hash = contentHash;
  article.raw_html_path = path.relative(rootDir, rawPath);
  article.clean_text_path = path.relative(rootDir, cleanPath);
  article.fetched_at = now.toISOString();
  article.status = "fetched";
  return article;
};

const processArticle = (article, now) => {
  if (article.status !== "fetched") return article;

  const cleanText = toCleanText(article);
  article.status = "processing";
  article.summary = summarize(cleanText);
  article.key_points = [
    article.digest,
    `关联栏目：${article.category}`,
    `来源账号：${article.account_name}`
  ].filter(Boolean);
  article.entities = {
    accounts: [article.account_name],
    topics: article.tags || []
  };
  article.importance_score = article.category === "policy" || article.category === "project" ? 82 : 76;
  article.source_type = "wechat_public_account";
  article.processed_at = now.toISOString();
  article.status = "processed";
  return article;
};

const exportFeed = async ({ accounts, articles, runs, now }) => {
  const visibleArticles = articles
    .filter((article) => article.status === "processed")
    .sort((a, b) => new Date(b.publish_time) - new Date(a.publish_time))
    .map((article) => ({
      id: article.id,
      unique_article_id: article.unique_article_id,
      title: article.title,
      url: article.canonical_url || article.url,
      account_name: article.account_name,
      publish_time: article.publish_time,
      category: article.category,
      digest: article.digest,
      summary: article.summary,
      tags: article.tags || [],
      status: article.status,
      importance_score: article.importance_score,
      source: article.source
    }));

  const feed = {
    generated_at: now.toISOString(),
    lookback_window_hours: config.lookbackWindowHours,
    accounts: accounts.map(({ id, name, keyword, priority, enabled, crawl_interval_minutes, source_url }) => ({
      id,
      name,
      keyword,
      priority,
      enabled,
      crawl_interval_minutes,
      source_url
    })),
    articles: visibleArticles,
    runs: runs.slice(-20)
  };

  await writeFile(
    path.join(dataDir, "hermes-runtime.js"),
    `window.NEOLINK_FEED = ${JSON.stringify(feed, null, 2)};\n`,
    "utf8",
  );
};

const main = async () => {
  const now = new Date();
  const accounts = await readJson(path.join(dataDir, "accounts.json"), []);
  const candidates = await readJson(path.join(dataDir, "seed-discoveries.json"), []);
  const articles = await readJson(path.join(stateDir, "articles.json"), []);
  const runs = await readJson(path.join(stateDir, "crawl_runs.json"), []);
  const existingById = new Map(articles.map((article) => [article.unique_article_id, article]));
  const nextArticlesById = new Map(existingById);

  for (const account of accounts.filter((item) => item.enabled)) {
    const run = {
      id: randomUUID(),
      account_id: account.id,
      account_name: account.name,
      started_at: now.toISOString(),
      finished_at: null,
      status: "running",
      discovered_count: 0,
      new_count: 0,
      skipped_count: 0,
      failed_count: 0
    };

    try {
      const discovered = discover({ account, candidates, existingById: nextArticlesById, run, now });
      for (const article of discovered) {
        const fetched = await fetchArticle(article, now);
        const processed = processArticle(fetched, now);
        nextArticlesById.set(processed.unique_article_id, processed);
      }
      run.status = "success";
    } catch (error) {
      run.status = "failed";
      run.failed_count += 1;
      run.error_message = error.message;
    } finally {
      run.finished_at = new Date().toISOString();
      runs.push(run);
    }
  }

  const nextArticles = Array.from(nextArticlesById.values())
    .sort((a, b) => new Date(b.publish_time) - new Date(a.publish_time));

  await writeJson(path.join(stateDir, "articles.json"), nextArticles);
  await writeJson(path.join(stateDir, "crawl_runs.json"), runs);
  await exportFeed({ accounts, articles: nextArticles, runs, now });

  const latestRuns = runs.slice(-accounts.length);
  const totals = latestRuns.reduce((sum, run) => ({
    discovered: sum.discovered + run.discovered_count,
    new: sum.new + run.new_count,
    skipped: sum.skipped + run.skipped_count,
    failed: sum.failed + run.failed_count,
  }), { discovered: 0, new: 0, skipped: 0, failed: 0 });

  console.log(JSON.stringify({
    generated_at: now.toISOString(),
    accounts: accounts.length,
    stored_articles: nextArticles.length,
    ...totals
  }, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
