#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";

const file = resolve(process.cwd(), "data/market-news.json");
const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...value] = arg.replace(/^--/, "").split("=");
    return [key, value.join("=")];
  }),
);

const required = ["title", "summary", "category"];
const missing = required.filter((key) => !args[key]);

if (missing.length) {
  console.error(
    `缺少参数：${missing.join(", ")}\n` +
      "示例：node scripts/add-news.mjs --category=policy --priority=high --region=政府 --title=标题 --summary=摘要 --source=来源",
  );
  process.exit(1);
}

const data = JSON.parse(await readFile(file, "utf8"));
const now = new Date();

data.generatedAt = now.toISOString();
data.news.unshift({
  id: args.id || randomUUID(),
  date: args.date || now.toISOString().slice(0, 10),
  category: args.category,
  priority: args.priority || "medium",
  region: args.region || "未标注",
  title: args.title,
  summary: args.summary,
  source: args.source || "未标注",
  sourceUrl: args.sourceUrl || "",
  impact: args.impact || "watch",
  status: args.status || "待核验",
  tags: args.tags ? args.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [],
});

await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`已添加：${args.title}`);
