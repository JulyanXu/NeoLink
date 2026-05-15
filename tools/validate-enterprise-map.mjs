import fs from "node:fs";
import vm from "node:vm";

const path = "data/enterprise-map-db.js";
const code = fs.readFileSync(path, "utf8");
const ctx = { window: {} };
vm.runInNewContext(code, ctx);

const db = ctx.window.NeoLinkEnterpriseDB;
const fail = (message) => {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
};

if (!db || typeof db !== "object") fail("NeoLinkEnterpriseDB is missing");

const sources = Array.isArray(db?.sources) ? db.sources : [];
const nodes = Array.isArray(db?.nodes) ? db.nodes : [];
const edges = Array.isArray(db?.edges) ? db.edges : [];
const sourceIds = new Set(sources.map((source) => source.id));
const nodeIds = new Set(nodes.map((node) => node.id));

if (nodes.length < 80 || nodes.length > 120) fail(`expected 80-120 nodes, got ${nodes.length}`);
if (edges.length < 120) fail(`expected at least 120 edges, got ${edges.length}`);

for (const source of sources) {
  if (!source.id || !source.name || !source.publisher || !source.url || !source.usedFor) {
    fail(`source ${source.id || "(missing id)"} has incomplete fields`);
  }
}

const requiredRoles = [
  "material",
  "cell",
  "bms",
  "pcs",
  "integrator",
  "owner",
  "grid",
  "market",
  "project",
  "segment",
];

for (const role of requiredRoles) {
  if (!nodes.some((node) => node.role === role)) fail(`missing role ${role}`);
}

for (const node of nodes) {
  if (!node.id || !node.type || !node.name || !node.role) {
    fail(`node ${node.id || "(missing id)"} has incomplete identity`);
  }
  if (!Array.isArray(node.sourceIds) || node.sourceIds.length === 0) {
    fail(`node ${node.id} has no sourceIds`);
  }
  for (const sourceId of node.sourceIds || []) {
    if (!sourceIds.has(sourceId)) fail(`node ${node.id} references missing source ${sourceId}`);
  }
}

for (const edge of edges) {
  if (!edge.id || !edge.from || !edge.to || !edge.type || !edge.label) {
    fail(`edge ${edge.id || "(missing id)"} has incomplete fields`);
  }
  if (!nodeIds.has(edge.from)) fail(`edge ${edge.id} has missing from node ${edge.from}`);
  if (!nodeIds.has(edge.to)) fail(`edge ${edge.id} has missing to node ${edge.to}`);
  if (!Array.isArray(edge.sourceIds) || edge.sourceIds.length === 0) {
    fail(`edge ${edge.id} has no sourceIds`);
  }
  for (const sourceId of edge.sourceIds || []) {
    if (!sourceIds.has(sourceId)) fail(`edge ${edge.id} references missing source ${sourceId}`);
  }
  if (typeof edge.strength !== "number" || edge.strength <= 0 || edge.strength > 1) {
    fail(`edge ${edge.id} has invalid strength ${edge.strength}`);
  }
}

const coreIds = [
  "catl",
  "byd",
  "eve",
  "hithium",
  "sungrow",
  "huawei-digital-power",
  "state-grid",
  "china-huadian",
];

for (const id of coreIds) {
  if (!nodeIds.has(id)) fail(`missing core node ${id}`);
  if (!edges.some((edge) => edge.from === id || edge.to === id)) {
    fail(`core node ${id} is isolated`);
  }
}

if (!process.exitCode) {
  console.log(`PASS enterprise map graph: ${nodes.length} nodes, ${edges.length} edges, ${sources.length} sources`);
}
