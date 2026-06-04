#!/usr/bin/env node
// One-time cleanup of data/feed.js's `materials` section.
// Problem: hourly refresh has been appending one material-price entry per run,
// accumulating 1000+ duplicates of the same SMM prices over weeks, and
// `methodology` fields bloated with debug SHA256 dumps. `materials` is 4.2 MB
// (53% of feed.js).
//
// This script keeps the N most recent entries (default 5), drops everything
// else, compresses the remaining entries to the small price-tracking shape,
// and archives the dropped entries to var/hermes/materials-history-<ts>.json.
//
// Usage:
//   node tools/cleanup-materials.js --dry-run     # show what would change
//   node tools/cleanup-materials.js --keep 5      # actually do it (default 5)
//   node tools/cleanup-materials.js --keep 5 --no-archive
//
// Re-run safely: it always reads current feed.js, no in-place mutation of
// history; the archive timestamp prevents overwriting.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FEED = path.join(rootDir, "data", "feed.js");
const VAR_DIR = path.join(rootDir, "var", "hermes");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const noArchive = args.includes("--no-archive");
const keepIdx = args.indexOf("--keep");
const KEEP = keepIdx > -1 ? Number(args[keepIdx + 1]) || 5 : 5;

// Parse args: tolerate `node tools/cleanup-materials.js 5` too.
if (keepIdx === -1 && args[0] && /^\d+$/.test(args[0])) {
  args[0] = `--keep`;
  args.unshift("--keep");
}

// 1. Read feed.js
const src = await readFile(FEED, "utf8");

// 2. Parse feed.js via vm (it's a window.NEOLINK_FEED = { ... } literal).
//    We use vm.Script with a global `window` to capture the assignment.
const vm = await import("node:vm");
const ctx = { window: {} };
vm.createContext(ctx);
try {
  new vm.Script(src, { filename: "feed.js" }).runInContext(ctx);
} catch (err) {
  console.error("FATAL: failed to parse feed.js:", err.message);
  process.exit(1);
}
const feed = ctx.window.NEOLINK_FEED;
if (!feed || !Array.isArray(feed.sections?.materials)) {
  console.error("FATAL: feed.sections.materials not found or not an array");
  process.exit(1);
}

const all = feed.sections.materials;
const totalBytes = src.length;
const beforeCount = all.length;
const beforeMatsBytes = JSON.stringify(all).length;

// 3. Sort by as_of desc (ISO date string sort works for YYYY-MM-DD HH:MM).
const sorted = [...all].sort((a, b) => {
  const aT = String(a.as_of || a.date || "");
  const bT = String(b.as_of || b.date || "");
  return bT.localeCompare(aT);
});

const keepSet = sorted.slice(0, KEEP);

// 4. Compress each kept entry to the small price-tracking shape.
const compress = (e) => {
  const out = {
    id: e.id,
    name: e.name,
    spec: e.spec,
    value: e.value,
    unit: e.unit,
    change: e.change,
    direction: e.direction,
    source: e.source,
    url: e.url,
    as_of: e.as_of,
  };
  // Compress methodology: keep first sentence (~ before first 中文句号+空格 or
  // first period followed by space, or first 200 chars).
  if (e.methodology) {
    let m = String(e.methodology);
    // Drop everything after the first "。" or "首句" marker
    const cut1 = m.indexOf("。");
    if (cut1 > 30 && cut1 < 200) m = m.slice(0, cut1 + 1);
    else if (m.length > 200) m = m.slice(0, 200) + "…";
    out.methodology = m;
  }
  return out;
};

const keepCompressed = keepSet.map(compress);
const dropList = sorted.slice(KEEP);
const afterCount = keepCompressed.length;
const afterMatsBytes = JSON.stringify(keepCompressed).length;

console.log("--- cleanup-materials ---");
console.log(`keep=${KEEP} dryRun=${dryRun} archive=${!noArchive}`);
console.log(`before: ${beforeCount} entries, ${(beforeMatsBytes / 1024).toFixed(1)} KB`);
console.log(`after:  ${afterCount} entries, ${(afterMatsBytes / 1024).toFixed(1)} KB`);
console.log(`drop:   ${dropList.length} entries`);
console.log("kept as_of (newest first):");
for (const e of keepCompressed) {
  console.log(`  - ${e.as_of}  ${String(e.name).slice(0, 40)}  ${e.value}`);
}

if (dryRun) {
  console.log("DRY RUN — no changes written");
  process.exit(0);
}

// 5. Build archive JSON
const archiveTs = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const archive = {
  archived_at: new Date().toISOString(),
  reason: "Materials section had accumulated 1000+ entries from hourly appends. Cleanup: keep N most recent, archive the rest.",
  feed_generated_at_before: feed.generated_at,
  feed_generated_at_after: feed.generated_at, // unchanged — this is a structure-only cleanup
  total_entries_before: beforeCount,
  total_entries_kept: afterCount,
  total_entries_dropped: dropList.length,
  kept: keepSet,
  dropped: dropList,
};

if (!noArchive) {
  await mkdir(VAR_DIR, { recursive: true });
  const archivePath = path.join(VAR_DIR, `materials-history-${archiveTs}.json`);
  await writeFile(archivePath, JSON.stringify(archive, null, 2), "utf8");
  console.log(`archive: ${archivePath} (${(JSON.stringify(archive).length / 1024).toFixed(1)} KB)`);
}

// 6. Splice the new materials array back into feed.js text.
//    The original materials array is a JSON-like block starting at "materials":
//    and ending at the matching `]`. We rewrite ONLY this block.
//
//    Strategy: find "    \"materials\": [" with a literal indexOf, then walk
//    brackets to find the matching `]`. Replace the contents between the
//    brackets with the new compact array.

const matsKey = '    "materials": [';
const startKey = src.indexOf(matsKey);
if (startKey === -1) {
  console.error("FATAL: cannot find materials key in feed.js");
  process.exit(1);
}
const arrOpen = startKey + matsKey.length - 1; // index of `[`
// Walk forward to find matching `]` (top-level only — entries contain nested
// objects with their own `[` and `]`, so count depth).
let depth = 0;
let arrClose = -1;
let inString = false;
let stringQuote = "";
let prevCh = "";
for (let i = arrOpen; i < src.length; i++) {
  const ch = src[i];
  if (inString) {
    if (ch === stringQuote && prevCh !== "\\") inString = false;
  } else {
    if (ch === '"' || ch === "'") {
      inString = true;
      stringQuote = ch;
    } else if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) {
        arrClose = i;
        break;
      }
    }
  }
  prevCh = ch;
}
if (arrClose === -1) {
  console.error("FATAL: cannot find matching `]` for materials array");
  process.exit(1);
}

// Build the new array text. Use 8-space indent to match existing file style
// (the array entries are indented 8 spaces: "        { ... }").
const newArrJson = JSON.stringify(keepCompressed, null, 2);
// Re-indent: JSON.stringify uses 2-space; replace leading 2-space with 8-space
// for entries (so they align with the rest of the file).
const newArrText = newArrJson
  .split("\n")
  .map((line, i) => (i === 0 ? line : "        " + line))
  .join("\n");

// Splice the new array between arrOpen (the `[`) and arrClose (the `]`).
// We include the original `[` from src and append newArrText MINUS its own
// leading `[` (since we already have one), then add the original `]`.
// Equivalently: drop arrOpen+1 (which is right after the `[`) and stitch.
const newSrc =
  src.slice(0, arrOpen + 1) +
  "\n" +
  newArrText.slice(1) + // drop the leading `[` from JSON.stringify
  "\n    " +
  src.slice(arrClose);

// Sanity check the splice produced exactly one `[` and one `]` at this section.
const sectionText = newSrc.slice(arrOpen, arrClose + 1);
const openCount = (sectionText.match(/\[/g) || []).length;
const closeCount = (sectionText.match(/\]/g) || []).length;
if (openCount !== 1 || closeCount !== 1) {
  console.error(`FATAL: splice produced unbalanced brackets in materials section: ${openCount} [ vs ${closeCount} ]`);
  process.exit(1);
}

await writeFile(FEED, newSrc, "utf8");
const afterBytes = newSrc.length;
console.log(`wrote: ${FEED}`);
console.log(`feed.js: ${(totalBytes / 1024).toFixed(1)} KB -> ${(afterBytes / 1024).toFixed(1)} KB (Δ ${((afterBytes - totalBytes) / 1024).toFixed(1)} KB)`);

// 7. Print what user should do next.
console.log("\n--- next steps ---");
console.log("1. node --check data/feed.js");
console.log("2. bump feed.js?v= in index.html, news-more.html, article.html");
console.log("3. git add data/feed.js (and HTML files), git commit");
console.log("4. git push origin main && git push gitee main");
console.log("5. rsync to neolink:/var/www/neolink/");
console.log("6. append a maintenance log entry");
