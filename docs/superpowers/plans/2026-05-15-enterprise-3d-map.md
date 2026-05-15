# Enterprise 3D Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current 2D battery ranking graph with a static, source-backed 3D storage industry chain map covering Chinese core nodes plus global complements.

**Architecture:** Keep the static site architecture. `data/enterprise-map-db.js` becomes a versioned graph database (`nodes`, `edges`, `sources`); `enterprise-map.js` becomes a module that loads Three.js dynamically, renders the graph, and falls back to an HTML relationship list when WebGL or the CDN fails. `enterprise-map.html` and `styles.css` provide the dashboard shell, filter controls, 3D canvas, label layer, and detail panel.

**Tech Stack:** Plain HTML, CSS, browser JavaScript modules, Three.js loaded from CDN, static JS data files, Node syntax/data validation.

---

## File Structure

- Modify `data/enterprise-map-db.js`: replace the ranking-only `companies`/`relationships` data with a graph data model: `meta`, `sources`, `roles`, `nodes`, `edges`.
- Modify `enterprise-map.html`: update the enterprise map page markup to a 3D dashboard and load `enterprise-map.js` as a module.
- Replace `enterprise-map.js`: implement data normalization, filtering, deterministic 3D layout, Three.js rendering, selection, search, labels, detail panel, and fallback rendering.
- Modify `styles.css`: update only the enterprise graph section with 3D dashboard, canvas, labels, filters, detail panel, and fallback styles.
- Create `tools/validate-enterprise-map.mjs`: validate graph shape, source references, node count, edge count, core role coverage, and required fields.
- Optional docs update after implementation: `README.md` or `docs/hermes-content-ops.md` only if the final code changes maintenance instructions.

## Task 1: Validation Harness

**Files:**
- Create: `tools/validate-enterprise-map.mjs`
- Test: run directly with Node

- [ ] **Step 1: Add a validator script**

Create `tools/validate-enterprise-map.mjs` with this behavior:

```js
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

const requiredRoles = ["material", "cell", "bms", "pcs", "integrator", "owner", "grid", "market", "project", "segment"];
for (const role of requiredRoles) {
  if (!nodes.some((node) => node.role === role)) fail(`missing role ${role}`);
}

for (const node of nodes) {
  if (!node.id || !node.type || !node.name || !node.role) fail(`node ${node.id || "(missing id)"} has incomplete identity`);
  if (!Array.isArray(node.sourceIds) || node.sourceIds.length === 0) fail(`node ${node.id} has no sourceIds`);
  for (const sourceId of node.sourceIds || []) {
    if (!sourceIds.has(sourceId)) fail(`node ${node.id} references missing source ${sourceId}`);
  }
}

for (const edge of edges) {
  if (!edge.id || !edge.from || !edge.to || !edge.type || !edge.label) fail(`edge ${edge.id || "(missing id)"} has incomplete fields`);
  if (!nodeIds.has(edge.from)) fail(`edge ${edge.id} has missing from node ${edge.from}`);
  if (!nodeIds.has(edge.to)) fail(`edge ${edge.id} has missing to node ${edge.to}`);
  if (!Array.isArray(edge.sourceIds) || edge.sourceIds.length === 0) fail(`edge ${edge.id} has no sourceIds`);
  for (const sourceId of edge.sourceIds || []) {
    if (!sourceIds.has(sourceId)) fail(`edge ${edge.id} references missing source ${sourceId}`);
  }
  if (typeof edge.strength !== "number" || edge.strength <= 0 || edge.strength > 1) {
    fail(`edge ${edge.id} has invalid strength ${edge.strength}`);
  }
}

const coreIds = ["catl", "byd", "eve", "hithium", "sungrow", "huawei-digital-power", "state-grid", "china-huadian"];
for (const id of coreIds) {
  if (!nodeIds.has(id)) fail(`missing core node ${id}`);
  if (!edges.some((edge) => edge.from === id || edge.to === id)) fail(`core node ${id} is isolated`);
}

if (!process.exitCode) {
  console.log(`PASS enterprise map graph: ${nodes.length} nodes, ${edges.length} edges, ${sources.length} sources`);
}
```

- [ ] **Step 2: Run validator against the current data and verify it fails**

Run: `node tools/validate-enterprise-map.mjs`

Expected: FAIL because the current file still uses `companies`/`relationships` and has no `nodes`/`edges`.

## Task 2: Graph Data Expansion

**Files:**
- Modify: `data/enterprise-map-db.js`
- Test: `node tools/validate-enterprise-map.mjs`

- [ ] **Step 1: Replace data shape**

Update `data/enterprise-map-db.js` so it exports:

```js
window.NeoLinkEnterpriseDB = {
  meta: {
    version: "2026-05-15",
    generated_at: "2026-05-15T18:00:00+08:00",
    title: "NeoLink Storage Industry Chain 3D Graph",
    scope: "中国为主、全球补充的储能产业链 3D 企业图谱",
    methodology: "节点和强关系来自官方公告、交易所/招标平台、企业公开资料、专业数据源和可追溯行业媒体；低置信关系只作为线索，不表达未证实控制关系。",
  },
  roles: {
    material: { label: "材料", color: "#f59e0b", lane: 0 },
    cell: { label: "电芯", color: "#2b7fff", lane: 1 },
    bms: { label: "BMS", color: "#22c55e", lane: 2 },
    pcs: { label: "PCS/逆变器", color: "#14b8a6", lane: 3 },
    integrator: { label: "系统集成", color: "#8b5cf6", lane: 4 },
    owner: { label: "业主/开发商", color: "#ef4444", lane: 5 },
    grid: { label: "电网/电力设备", color: "#06b6d4", lane: 6 },
    market: { label: "海外市场", color: "#a855f7", lane: 7 },
    project: { label: "项目/框采", color: "#f97316", lane: 8 },
    segment: { label: "产业链环节", color: "#64748b", lane: 9 },
  },
  sources: [],
  nodes: [],
  edges: [],
};
```

- [ ] **Step 2: Populate sources**

Add specific source objects. Every object must have `id`, `name`, `publisher`, `url`, and `usedFor`. Include at least these source groups:

```js
{
  id: "infolink-ess-ranking-2024",
  name: "2024 Global Energy Storage Cell Shipment Ranking",
  publisher: "InfoLink Consulting",
  url: "https://www.infolink-group.com/energy-article/energy-storage-topic-2024-global-shipments-energy-storage-cell-company-rankings",
  usedFor: "储能电芯榜单和储能电芯企业节点",
}
```

Also add sources for EVTank/Sina storage ranking, SNE/Sina power ranking, EVTank/Sina 3C ranking, SMM material prices, InfoLink 2026-05-13 ESS price,国家能源局储能质监大纲, 四川绿电直连细则, 华电 12GWh 框采, 中国能建 7GWh 电芯框采, Energy-Storage.news global BESS/project sources, PR Newswire CATL/HyperStrong, and official/annual-report entry sources for listed Chinese companies.

- [ ] **Step 3: Populate nodes**

Add 80-120 nodes. Include segment nodes first, then company, market, and project nodes. Each node should follow this shape:

```js
{
  id: "sungrow",
  type: "company",
  name: "阳光电源",
  shortName: "Sungrow",
  role: "integrator",
  country: "中国",
  region: "安徽合肥",
  listing: "A股上市",
  segments: ["storage", "pcs", "integrator"],
  importance: 92,
  summary: "光伏逆变器和储能系统集成商，参与国内外储能系统供应和集成竞争。",
  metrics: [
    { label: "角色", value: "PCS/系统集成", sourceIds: ["company-disclosure-entry"] }
  ],
  projects: [],
  news: [],
  risks: [],
  sourceIds: ["company-disclosure-entry"]
}
```

Required node pools:

- Segment nodes: materials, cell, bms, pcs, integrator, owners-grid, overseas-market, projects, policy-risk.
- Materials: 天齐锂业、赣锋锂业、永兴材料、中矿资源、华友钴业、中伟股份、容百科技、德方纳米、湖南裕能、厦钨新能、贝特瑞、璞泰来、杉杉股份、恩捷股份、星源材质、新宙邦、天赐材料、多氟多。
- Cells: 宁德时代、比亚迪、亿纬锂能、海辰储能、中创新航、瑞浦兰钧、远景动力、国轩高科、楚能新能源、鹏辉能源、欣旺达、LG新能源、三星SDI、SK On、松下、ATL、珠海冠宇、赣锋锂电。
- BMS/PCS/integrator: 阳光电源、华为数字能源、科华数能、上能电气、盛弘股份、南瑞继保、许继电气、海博思创、远景能源、天合储能、派能科技、特变电工、新风光、林洋能源、Tesla Energy、Fluence、Powin、Energy Vault。
- Owners/grid: 国家电网、南方电网、国家能源集团、中国华电、中国华能、国家电投、中国大唐、三峡能源、中广核新能源、中国电建、中国能建、内蒙古能源集团、广东能源集团、华润电力、中国核电。
- Markets: 美国、欧洲、中东、澳洲、东南亚、印度、拉美、南非。
- Projects: 华电 12GWh 框采、中国能建 7GWh 电芯框采、锡林郭勒 1.7GW/6.8GWh 独立储能、宁德时代 × 海博思创 60GWh 钠电合作、NextEra North Dakota 100MW/400MWh、Meralco/CATL Philippines BESS、BayWa r.e. Germany BESS O&M、Spearmint Texas 400MWh BESS。

- [ ] **Step 4: Populate edges**

Add at least 120 edges. Use segment edges to avoid false company-to-company claims. Use these examples:

```js
{
  id: "catl-to-cell-segment",
  from: "catl",
  to: "segment-cell",
  type: "same_rank",
  label: "储能/动力电芯",
  strength: 0.72,
  confidence: "high",
  sourceIds: ["infolink-ess-ranking-2024", "sne-power-ranking-2025"]
}
```

Use strong edges for confirmed public relationships such as Huadian 12GWh framework procurement, China Energy Engineering 7GWh cell procurement, CATL/HyperStrong sodium-ion cooperation, and overseas project media reports. Use weaker `technology`, `market`, or `same_rank` edges for role/segment placement.

- [ ] **Step 5: Run data validation**

Run: `node tools/validate-enterprise-map.mjs`

Expected: PASS with 80-120 nodes and at least 120 edges.

## Task 3: HTML Dashboard Shell

**Files:**
- Modify: `enterprise-map.html`
- Test: browser load and static grep

- [ ] **Step 1: Replace graph stage markup**

Keep the sidebar and footer, but replace the old `.graph-toolbar` and `.graph-stage` internals with:

```html
<section class="graph-toolbar" aria-label="图谱筛选">
  <div class="filter-group" data-filter-group="role"></div>
  <div class="filter-group" data-filter-group="edge"></div>
  <div class="filter-group" data-filter-group="region"></div>
  <button class="graph-control active" type="button" data-toggle="neighbors">邻居高亮</button>
  <button class="graph-control" type="button" data-action="reset">重置视角</button>
</section>

<section class="graph-stage graph-stage-3d">
  <article class="graph-canvas panel" aria-label="储能产业链 3D 企业图谱">
    <div class="graph-status" aria-live="polite">
      <strong class="graph-count">0 节点 / 0 关系</strong>
      <span class="graph-scope">中国为主 · 全球补充</span>
    </div>
    <div class="graph-viewport" id="enterprise-graph-viewport">
      <canvas class="graph-webgl" id="enterprise-graph-canvas"></canvas>
      <div class="graph-label-layer" aria-hidden="true"></div>
      <div class="graph-fallback" hidden></div>
    </div>
    <div class="graph-legend" data-legend></div>
    <div class="camera-controls" aria-label="视角控制">
      <button type="button" data-camera="zoom-in" aria-label="放大">+</button>
      <button type="button" data-camera="zoom-out" aria-label="缩小">-</button>
      <button type="button" data-camera="reset" aria-label="重置">⤢</button>
    </div>
  </article>
  <aside class="company-panel panel" aria-live="polite"></aside>
</section>
```

- [ ] **Step 2: Update script tag**

Load the graph data first and then the enterprise map module:

```html
<script src="./data/enterprise-map-db.js?v=202605153d"></script>
<script type="module" src="./enterprise-map.js?v=202605153d"></script>
```

## Task 4: 3D Graph Implementation

**Files:**
- Replace: `enterprise-map.js`
- Test: `node --check enterprise-map.js`

- [ ] **Step 1: Add module constants and state**

Define CDN URL, role filters, edge filters, selected node, camera state, and graph state:

```js
const THREE_URL = "https://unpkg.com/three@0.164.1/build/three.module.js";
const db = window.NeoLinkEnterpriseDB;
const canvas = document.querySelector("#enterprise-graph-canvas");
const viewport = document.querySelector("#enterprise-graph-viewport");
const labelLayer = document.querySelector(".graph-label-layer");
const fallback = document.querySelector(".graph-fallback");
const panel = document.querySelector(".company-panel");
const searchInput = document.querySelector(".graph-search-input");

const state = {
  selectedId: "catl",
  activeRoles: new Set(["all"]),
  activeEdges: new Set(["all"]),
  activeRegion: "all",
  neighborMode: true,
  yaw: -0.42,
  pitch: 0.32,
  distance: 1180,
  graph: null,
  three: null,
};
```

- [ ] **Step 2: Add normalization and layout helpers**

Implement `normalizeGraph(db)`, `hashNumber(value)`, `roleAnchor(role)`, `computeLayout(graph)`, and `visibleGraph(graph)`.

Important behavior:

- `normalizeGraph` returns maps for nodes, edges, neighbors, and sources.
- `computeLayout` assigns deterministic `position: {x, y, z}` based on role lane, importance, region, and deterministic jitter.
- Run 100-140 deterministic force ticks: role anchor attraction, edge attraction by `strength`, and short-range repulsion.
- Clamp x/y/z to stable bounds so the graph fits the camera.

- [ ] **Step 3: Add Three.js initialization**

Implement `initThree(THREE)`:

- Create `Scene`, `PerspectiveCamera`, `WebGLRenderer`.
- Use `AmbientLight` and `DirectionalLight`.
- Create groups for nodes and edges.
- Register pointer, wheel, resize, and keyboard handlers.

- [ ] **Step 4: Add node and edge rendering**

Implement `createNodeMesh(node)`, `createEdgeLine(edge)`, `renderGraph()`, and `applySelection()`.

Required behavior:

- Company nodes are spheres.
- Segment nodes are torus/ring-like markers.
- Project nodes are boxes.
- Market nodes are octahedrons or small glowing spheres.
- Role color comes from `db.roles[role].color`.
- Selected node and its neighbors are bright; unrelated nodes fade.

- [ ] **Step 5: Add labels and detail panel**

Implement `updateLabels()` and `renderPanel(node)`.

Panel sections:

- heading with shortName/name/role
- identity stats
- summary
- metrics
- projects
- news
- risks
- sources list

- [ ] **Step 6: Add filters and search**

Implement `renderFilterControls()`, `handleRoleFilter(role)`, `handleEdgeFilter(type)`, `handleRegionFilter(region)`, and `selectNode(id)`.

Search behavior:

- Match `name`, `shortName`, `role`, `country`, `region`, `segments`, project titles, and news titles.
- On match, select the first node and render panel.

- [ ] **Step 7: Add fallback**

Implement `renderFallback(reason)` to show a grouped HTML list:

```js
fallback.hidden = false;
fallback.innerHTML = `
  <div class="fallback-note">${escapeHtml(reason)}</div>
  ${roles.map((role) => `<section>...</section>`).join("")}
`;
```

Fallback must support node click via event delegation and update the right panel.

- [ ] **Step 8: Boot safely**

At the bottom:

```js
async function boot() {
  state.graph = normalizeGraph(db);
  renderFilterControls();
  try {
    const THREE = await import(THREE_URL);
    state.three = initThree(THREE);
    renderGraph();
    animate();
  } catch (error) {
    console.warn("3D enterprise graph fallback:", error);
    renderFallback("3D 渲染库暂不可用，已切换到关系列表模式。");
  }
  selectNode(state.selectedId);
}

boot();
```

- [ ] **Step 9: Syntax check**

Run: `node --check enterprise-map.js`

Expected: no output and exit 0.

## Task 5: Enterprise Graph Styles

**Files:**
- Modify: `styles.css`
- Test: browser visual check

- [ ] **Step 1: Replace enterprise graph CSS only**

Update the section beginning at `/* Enterprise graph page */`.

Required classes:

- `.graph-stage-3d`
- `.graph-viewport`
- `.graph-webgl`
- `.graph-label-layer`
- `.graph-node-label`
- `.graph-fallback`
- `.filter-group`
- `.graph-control`
- `.camera-controls`
- `.company-panel`
- `.node-source-list`

- [ ] **Step 2: Ensure responsive behavior**

At desktop widths:

```css
.graph-stage-3d {
  grid-template-columns: minmax(720px, 1fr) minmax(340px, 390px);
}
```

At mobile widths:

```css
@media (max-width: 900px) {
  .graph-stage-3d {
    grid-template-columns: 1fr;
  }
  .graph-canvas {
    min-height: 520px;
    height: 58vh;
  }
  .company-panel {
    min-height: 0;
    max-height: none;
  }
}
```

- [ ] **Step 3: Check text containment**

Confirm labels use max-width, text-overflow, and pointer-events none; controls wrap without overflowing on mobile.

## Task 6: Verification and Deploy Prep

**Files:**
- All modified files

- [ ] **Step 1: Run syntax and data checks**

Run:

```bash
node tools/validate-enterprise-map.mjs
node --check data/enterprise-map-db.js
node --check enterprise-map.js
node --check script.js
node --check news-more.js
node --check article.js
```

Expected:

- Validator prints PASS with 80-120 nodes.
- All `node --check` commands exit 0.

- [ ] **Step 2: Start local server**

Run: `python3 -m http.server 8080`

Expected: server starts and serves `/enterprise-map.html`.

- [ ] **Step 3: Browser QA**

Open:

- `http://127.0.0.1:8080/enterprise-map.html`

Check:

- 3D canvas is nonblank.
- Nodes and edges render.
- Drag rotates the graph.
- Wheel zooms.
- Clicking CATL/阳光电源/国家电网 changes the panel.
- Searching “华电” selects a matching node.
- Role and edge filters change visible graph.
- Mobile viewport has no horizontal overflow.

- [ ] **Step 4: Git review**

Run:

```bash
git diff --stat
git diff -- enterprise-map.html enterprise-map.js data/enterprise-map-db.js styles.css tools/validate-enterprise-map.mjs | sed -n '1,260p'
```

Expected: only scoped enterprise graph files changed, plus validator.
