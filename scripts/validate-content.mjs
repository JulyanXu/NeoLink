#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const marketFile = resolve(root, "data/market-news.json");
const taxonomyFile = resolve(root, "data/taxonomy.json");

const market = JSON.parse(await readFile(marketFile, "utf8"));
const taxonomy = JSON.parse(await readFile(taxonomyFile, "utf8"));

const categories = new Set(taxonomy.categories.map((item) => item.key));
const priorities = new Set(["high", "medium", "low"]);
const impacts = new Set(["bullish", "bearish", "neutral", "mixed", "watch"]);
const errors = [];
const ids = new Set();

if (!Date.parse(market.generatedAt)) {
  errors.push("generatedAt 不是有效时间");
}

if (!Array.isArray(market.signals) || market.signals.length < 4) {
  errors.push("signals 至少需要 4 个关键指标");
}

for (const [index, signal] of (market.signals || []).entries()) {
  requireFields(signal, ["label", "value", "change", "direction", "note", "series"], `signals[${index}]`);
  if (!Array.isArray(signal.series) || signal.series.length < 2) {
    errors.push(`signals[${index}].series 至少需要 2 个数值`);
  }
}

for (const [index, window] of (market.sourceWindows || []).entries()) {
  const path = `sourceWindows[${index}]`;
  requireFields(window, ["type", "title", "summary", "cadence", "access", "entries"], path);
  if (!Array.isArray(window.entries) || window.entries.length === 0) {
    errors.push(`${path}.entries 至少需要 1 个来源入口`);
    continue;
  }

  for (const [entryIndex, entry] of window.entries.entries()) {
    const entryPath = `${path}.entries[${entryIndex}]`;
    requireFields(entry, ["name", "window", "url"], entryPath);
    if ((entry.url || "") && !isUrl(entry.url)) errors.push(`${entryPath}.url 不是有效 URL`);
  }
}

for (const [index, tracker] of (market.companyTrackers || []).entries()) {
  const path = `companyTrackers[${index}]`;
  requireFields(tracker, ["type", "title", "basis", "companies"], path);
  if (!Array.isArray(tracker.companies) || tracker.companies.length === 0) {
    errors.push(`${path}.companies 至少需要 1 家企业`);
    continue;
  }

  for (const [companyIndex, company] of tracker.companies.entries()) {
    const companyPath = `${path}.companies[${companyIndex}]`;
    requireFields(company, ["rank", "name", "focus", "source", "url"], companyPath);
    if ((company.url || "") && !isUrl(company.url)) errors.push(`${companyPath}.url 不是有效 URL`);
    if (company.logoUrl) {
      if (isExternalUrl(company.logoUrl)) {
        continue;
      }
      const logoPath = resolve(root, company.logoUrl);
      try {
        await access(logoPath);
      } catch {
        errors.push(`${companyPath}.logoUrl 本地文件不存在：${company.logoUrl}`);
      }
    }
  }
}

for (const [index, item] of (market.news || []).entries()) {
  const path = `news[${index}]`;
  requireFields(
    item,
    ["id", "date", "category", "priority", "region", "title", "summary", "source", "status", "tags"],
    path,
  );

  if (ids.has(item.id)) errors.push(`${path}.id 重复：${item.id}`);
  ids.add(item.id);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date || "")) errors.push(`${path}.date 必须是 YYYY-MM-DD`);
  if (!categories.has(item.category)) errors.push(`${path}.category 未在 taxonomy.json 中定义：${item.category}`);
  if (!priorities.has(item.priority)) errors.push(`${path}.priority 只能是 high/medium/low`);
  if (item.impact && !impacts.has(item.impact)) errors.push(`${path}.impact 不合法：${item.impact}`);
  if (!Array.isArray(item.tags)) errors.push(`${path}.tags 必须是数组`);
  if ((item.sourceUrl || "") && !isUrl(item.sourceUrl)) errors.push(`${path}.sourceUrl 不是有效 URL`);
  if ((item.status || "").includes("示例") && process.env.STRICT_CONTENT === "1") {
    errors.push(`${path} 仍是示例内容，正式发布前请替换或取消 STRICT_CONTENT=1`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`内容校验通过：${market.news.length} 条情报，${market.signals.length} 个指标`);

function requireFields(object, fields, path) {
  for (const field of fields) {
    const value = object[field];
    if (value === undefined || value === null || value === "") {
      errors.push(`${path}.${field} 缺失`);
    }
  }
}

function isUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isExternalUrl(value) {
  return /^https?:\/\//i.test(value);
}
