const THREE_URL = "https://unpkg.com/three@0.164.1/build/three.module.js";
const db = window.NeoLinkEnterpriseDB;

const themeToggle = document.querySelector(".theme-toggle");
const canvas = document.querySelector("#enterprise-graph-canvas");
const viewport = document.querySelector("#enterprise-graph-viewport");
const labelLayer = document.querySelector(".graph-label-layer");
const fallback = document.querySelector(".graph-fallback");
const panel = document.querySelector(".company-panel");
const searchInput = document.querySelector(".graph-search-input");
const countEl = document.querySelector(".graph-count");

const state = {
  selectedId: "catl",
  roleFilter: "all",
  edgeFilter: "all",
  regionFilter: "all",
  neighborMode: true,
  yaw: -0.42,
  pitch: 0.32,
  distance: 1180,
  graph: null,
  three: null,
  pointer: { x: 0, y: 0, downX: 0, downY: 0, dragging: false },
};

const edgeLabels = {
  all: "全部关系",
  supply: "供应链",
  customer: "客户/采购",
  project: "项目/框采",
  investment: "投资合作",
  same_rank: "同榜",
  technology: "技术/角色",
  market: "海外市场",
};

const regionLabels = {
  all: "全部地区",
  china: "中国",
  overseas: "海外",
  global: "全球/跨区",
};

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("neolink-theme", theme);
  if (!themeToggle) return;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "切换浅色模式" : "切换深色模式");
  themeToggle.querySelector("span").textContent = isDark ? "深色" : "浅色";
};

setTheme(document.documentElement.dataset.theme || "light");
themeToggle?.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const hashNumber = (value) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
};

const regionBucket = (node) => {
  if (node.country === "全球" || node.country?.includes("全球") || node.country?.includes("/")) return "global";
  if (node.country === "中国" || node.country?.startsWith("中国")) return "china";
  return "overseas";
};

const roleAnchor = (role, node = {}) => {
  const lane = db.roles?.[role]?.lane ?? 4;
  const baseX = -620 + lane * 145;
  const bucket = regionBucket(node);
  const z = bucket === "china" ? 0 : bucket === "global" ? 160 : 320;
  return {
    x: node.role === "segment" ? baseX : baseX + (hashNumber(`${node.id}:x`) - 0.5) * 90,
    y: ((node.importance || 60) - 68) * 5 + (hashNumber(`${node.id}:y`) - 0.5) * 170,
    z: z + (hashNumber(`${node.id}:z`) - 0.5) * 210,
  };
};

const normalizeGraph = (sourceDb) => {
  const roles = sourceDb?.roles || {};
  const sources = sourceDb?.sources || [];
  const nodes = (sourceDb?.nodes || []).map((node) => ({
    ...node,
    roleLabel: roles[node.role]?.label || node.role,
    color: roles[node.role]?.color || "#64748b",
    regionBucket: regionBucket(node),
    position: roleAnchor(node.role, node),
  }));
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const sourceMap = new Map(sources.map((source) => [source.id, source]));
  const edges = (sourceDb?.edges || []).filter((edge) => nodeMap.has(edge.from) && nodeMap.has(edge.to));
  const neighbors = new Map(nodes.map((node) => [node.id, new Set()]));
  for (const edge of edges) {
    neighbors.get(edge.from)?.add(edge.to);
    neighbors.get(edge.to)?.add(edge.from);
  }
  return computeLayout({ roles, sources, sourceMap, nodes, nodeMap, edges, neighbors });
};

const computeLayout = (graph) => {
  const nodes = graph.nodes.map((node) => ({
    ...node,
    position: { ...node.position },
    velocity: { x: 0, y: 0, z: 0 },
  }));
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const edges = graph.edges;

  for (let tick = 0; tick < 120; tick += 1) {
    for (const node of nodes) {
      const anchor = roleAnchor(node.role, node);
      node.velocity.x += (anchor.x - node.position.x) * 0.008;
      node.velocity.y += (anchor.y - node.position.y) * 0.008;
      node.velocity.z += (anchor.z - node.position.z) * 0.008;
    }

    for (const currentEdge of edges) {
      const from = nodeMap.get(currentEdge.from);
      const to = nodeMap.get(currentEdge.to);
      if (!from || !to) continue;
      const dx = to.position.x - from.position.x;
      const dy = to.position.y - from.position.y;
      const dz = to.position.z - from.position.z;
      const distance = Math.max(1, Math.hypot(dx, dy, dz));
      const target = currentEdge.type === "project" || currentEdge.type === "customer" ? 165 : 230;
      const force = (distance - target) * 0.0009 * (currentEdge.strength || 0.3);
      const fx = dx * force;
      const fy = dy * force;
      const fz = dz * force;
      from.velocity.x += fx;
      from.velocity.y += fy;
      from.velocity.z += fz;
      to.velocity.x -= fx;
      to.velocity.y -= fy;
      to.velocity.z -= fz;
    }

    for (let a = 0; a < nodes.length; a += 1) {
      for (let b = a + 1; b < nodes.length; b += 1) {
        const left = nodes[a];
        const right = nodes[b];
        const dx = right.position.x - left.position.x;
        const dy = right.position.y - left.position.y;
        const dz = right.position.z - left.position.z;
        const distance = Math.max(18, Math.hypot(dx, dy, dz));
        if (distance > 230) continue;
        const force = 18 / (distance * distance);
        const fx = dx * force;
        const fy = dy * force;
        const fz = dz * force;
        left.velocity.x -= fx;
        left.velocity.y -= fy;
        left.velocity.z -= fz;
        right.velocity.x += fx;
        right.velocity.y += fy;
        right.velocity.z += fz;
      }
    }

    for (const node of nodes) {
      node.position.x = Math.max(-720, Math.min(760, node.position.x + node.velocity.x));
      node.position.y = Math.max(-360, Math.min(420, node.position.y + node.velocity.y));
      node.position.z = Math.max(-260, Math.min(520, node.position.z + node.velocity.z));
      node.velocity.x *= 0.82;
      node.velocity.y *= 0.82;
      node.velocity.z *= 0.82;
    }
  }

  return { ...graph, nodes, nodeMap: new Map(nodes.map((node) => [node.id, node])) };
};

const roleVisible = (node) => {
  if (state.roleFilter === "all") return true;
  if (node.id === state.selectedId) return true;
  return node.role === state.roleFilter;
};

const regionVisible = (node) => {
  if (state.regionFilter === "all") return true;
  if (node.id === state.selectedId) return true;
  return node.regionBucket === state.regionFilter;
};

const isVisibleNode = (node) => roleVisible(node) && regionVisible(node);

const isVisibleEdge = (edge) => {
  if (state.edgeFilter !== "all" && edge.type !== state.edgeFilter) return false;
  const from = state.graph.nodeMap.get(edge.from);
  const to = state.graph.nodeMap.get(edge.to);
  return Boolean(from && to && isVisibleNode(from) && isVisibleNode(to));
};

const isNeighbor = (nodeId) => {
  if (nodeId === state.selectedId) return true;
  return state.graph.neighbors.get(state.selectedId)?.has(nodeId);
};

const sourceList = (sourceIds = []) => sourceIds
  .map((sourceId) => state.graph.sourceMap.get(sourceId))
  .filter(Boolean);

const sourceLinks = (sourceIds = []) => {
  const sources = sourceList(sourceIds).slice(0, 6);
  if (sources.length === 0) return "";
  return `
    <section>
      <h3>来源</h3>
      <ul class="node-source-list">
        ${sources.map((source) => `
          <li>
            <a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.publisher)}</a>
            <span>${escapeHtml(source.usedFor)}</span>
          </li>
        `).join("")}
      </ul>
    </section>
  `;
};

const renderList = (title, items = [], mapper) => {
  if (!Array.isArray(items) || items.length === 0) return "";
  return `
    <section>
      <h3>${escapeHtml(title)}</h3>
      <ul class="node-detail-list">
        ${items.map(mapper).join("")}
      </ul>
    </section>
  `;
};

const relatedEdges = (nodeId) => state.graph.edges
  .filter((edge) => edge.from === nodeId || edge.to === nodeId)
  .slice(0, 12);

const renderPanel = (node) => {
  if (!panel || !node) return;
  const edges = relatedEdges(node.id);
  const connected = edges
    .map((edge) => {
      const otherId = edge.from === node.id ? edge.to : edge.from;
      const other = state.graph.nodeMap.get(otherId);
      return { edge, other };
    })
    .filter((item) => item.other);

  panel.innerHTML = `
    <div class="company-head">
      <div class="company-logo">${escapeHtml(node.shortName || node.name.slice(0, 3))}</div>
      <div>
        <h2 class="company-name">${escapeHtml(node.name)}</h2>
        <p class="company-subtitle">${escapeHtml(node.roleLabel)} · ${escapeHtml(node.listing || "未标注")} · ${escapeHtml(node.region || node.country || "未标注")}</p>
      </div>
    </div>

    <div class="company-stats">
      <div><span>节点类型</span><strong>${escapeHtml(node.type)}</strong></div>
      <div><span>产业角色</span><strong>${escapeHtml(node.roleLabel)}</strong></div>
      <div><span>地区</span><strong>${escapeHtml(node.country || "未标注")}</strong></div>
      <div><span>关联关系</span><strong>${edges.length} 条</strong></div>
    </div>

    <section>
      <h3>摘要</h3>
      <p class="company-business">${escapeHtml(node.summary || "该节点暂无摘要。")}</p>
    </section>

    <section>
      <h3>标签</h3>
      <div class="company-tags">
        ${(node.segments || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
    </section>

    ${renderList("关键指标", node.metrics, (item) => `<li><b>${escapeHtml(item.label)}</b><span>${escapeHtml(item.value)}</span></li>`)}
    ${renderList("关联项目", node.projects, (item) => `<li><b>${escapeHtml(item.title || item.label)}</b><span>${escapeHtml(item.meta || item.value || "")}</span></li>`)}
    ${renderList("信息索引", node.news, (item) => `<li><b>${escapeHtml(item.title || item.label)}</b><span>${escapeHtml(item.date || item.value || "")}</span></li>`)}
    ${renderList("风险索引", node.risks, (item) => `<li><b>${escapeHtml(item.title || item.label)}</b><span>${escapeHtml(item.description || item.value || "")}</span></li>`)}

    <section>
      <h3>关系</h3>
      <ul class="node-relation-list">
        ${connected.map(({ edge, other }) => `
          <li>
            <button type="button" data-node-link="${escapeHtml(other.id)}">
              <b>${escapeHtml(other.name)}</b>
              <span>${escapeHtml(edgeLabels[edge.type] || edge.type)} · ${escapeHtml(edge.label)}</span>
            </button>
          </li>
        `).join("")}
      </ul>
    </section>

    ${sourceLinks(node.sourceIds)}
  `;
};

const updateCount = () => {
  if (!countEl || !state.graph) return;
  const nodes = state.graph.nodes.filter(isVisibleNode);
  const edges = state.graph.edges.filter(isVisibleEdge);
  countEl.textContent = `${nodes.length} 节点 / ${edges.length} 关系`;
};

const renderFilterControls = () => {
  const roleGroup = document.querySelector('[data-filter-group="role"]');
  const edgeGroup = document.querySelector('[data-filter-group="edge"]');
  const regionGroup = document.querySelector('[data-filter-group="region"]');
  if (roleGroup) {
    const roleButtons = [
      ["all", "全部层级"],
      ...Object.entries(db.roles || {})
        .filter(([role]) => role !== "segment")
        .map(([role, config]) => [role, config.label]),
    ];
    roleGroup.innerHTML = roleButtons.map(([role, label]) => `
      <button class="${state.roleFilter === role ? "active" : ""}" type="button" data-role-filter="${role}">${escapeHtml(label)}</button>
    `).join("");
  }
  if (edgeGroup) {
    edgeGroup.innerHTML = Object.entries(edgeLabels).map(([type, label]) => `
      <button class="${state.edgeFilter === type ? "active" : ""}" type="button" data-edge-filter="${type}">${escapeHtml(label)}</button>
    `).join("");
  }
  if (regionGroup) {
    regionGroup.innerHTML = Object.entries(regionLabels).map(([region, label]) => `
      <button class="${state.regionFilter === region ? "active" : ""}" type="button" data-region-filter="${region}">${escapeHtml(label)}</button>
    `).join("");
  }
  document.querySelector('[data-toggle="neighbors"]')?.classList.toggle("active", state.neighborMode);
};

const selectNode = (id) => {
  if (!state.graph?.nodeMap.has(id)) return;
  state.selectedId = id;
  renderPanel(state.graph.nodeMap.get(id));
  updateGraphStyles();
  updateLabels();
};

const searchText = (node) => [
  node.name,
  node.shortName,
  node.roleLabel,
  node.country,
  node.region,
  node.listing,
  ...(node.segments || []),
  ...(node.projects || []).map((item) => `${item.title || ""} ${item.meta || ""}`),
  ...(node.news || []).map((item) => `${item.title || ""} ${item.date || ""}`),
].join(" ").toLowerCase();

const resetView = () => {
  state.yaw = -0.42;
  state.pitch = 0.32;
  state.distance = 1180;
  updateGraphStyles();
};

const attachControls = () => {
  document.querySelector(".graph-toolbar")?.addEventListener("click", (event) => {
    const roleButton = event.target.closest("[data-role-filter]");
    const edgeButton = event.target.closest("[data-edge-filter]");
    const regionButton = event.target.closest("[data-region-filter]");
    const neighborButton = event.target.closest('[data-toggle="neighbors"]');
    const resetButton = event.target.closest('[data-action="reset"]');

    if (roleButton) state.roleFilter = roleButton.dataset.roleFilter;
    if (edgeButton) state.edgeFilter = edgeButton.dataset.edgeFilter;
    if (regionButton) state.regionFilter = regionButton.dataset.regionFilter;
    if (neighborButton) state.neighborMode = !state.neighborMode;
    if (resetButton) resetView();

    renderFilterControls();
    updateGraphStyles();
    updateLabels();
    updateCount();
  });

  document.querySelector(".camera-controls")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-camera]");
    if (!button) return;
    if (button.dataset.camera === "zoom-in") state.distance = Math.max(560, state.distance - 120);
    if (button.dataset.camera === "zoom-out") state.distance = Math.min(1800, state.distance + 120);
    if (button.dataset.camera === "reset") resetView();
  });

  panel?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-node-link]");
    if (button) selectNode(button.dataset.nodeLink);
  });

  searchInput?.addEventListener("input", (event) => {
    const keyword = event.target.value.trim().toLowerCase();
    if (!keyword) return;
    const match = state.graph.nodes.find((node) => searchText(node).includes(keyword));
    if (match) selectNode(match.id);
  });
};

let scene;
let camera;
let renderer;
let THREE_REF;
let nodeGroup;
let edgeGroup;
let raycaster;
let pointerVector;
let meshById = new Map();
let edgeObjects = [];

const disposeGroup = (group) => {
  while (group.children.length) {
    const child = group.children.pop();
    child.geometry?.dispose();
    child.material?.dispose();
  }
};

const nodeScale = (node) => {
  if (node.type === "segment") return 19 + (node.importance || 60) / 7;
  if (node.type === "project") return 11 + (node.importance || 60) / 10;
  if (node.type === "market") return 13 + (node.importance || 60) / 9;
  return 10 + (node.importance || 60) / 8;
};

const createNodeMesh = (node) => {
  const THREE = THREE_REF;
  const size = nodeScale(node);
  const geometry = node.type === "segment"
    ? new THREE.TorusGeometry(size, 3.2, 12, 28)
    : node.type === "project"
      ? new THREE.BoxGeometry(size * 1.35, size * 1.35, size * 1.35)
      : node.type === "market"
        ? new THREE.OctahedronGeometry(size, 0)
        : new THREE.SphereGeometry(size, 20, 14);
  const material = new THREE.MeshStandardMaterial({
    color: node.color,
    emissive: node.color,
    emissiveIntensity: node.type === "segment" ? 0.18 : 0.08,
    roughness: 0.38,
    metalness: 0.12,
    transparent: true,
    opacity: 0.92,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(node.position.x, node.position.y, node.position.z);
  mesh.userData.nodeId = node.id;
  return mesh;
};

const edgeColor = (type) => ({
  supply: 0xf59e0b,
  customer: 0x38bdf8,
  project: 0xf97316,
  investment: 0xef4444,
  same_rank: 0x94a3b8,
  technology: 0x22c55e,
  market: 0xa855f7,
}[type] || 0x8ba3c7);

const createEdgeLine = (currentEdge) => {
  const THREE = THREE_REF;
  const from = state.graph.nodeMap.get(currentEdge.from);
  const to = state.graph.nodeMap.get(currentEdge.to);
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(from.position.x, from.position.y, from.position.z),
    new THREE.Vector3(to.position.x, to.position.y, to.position.z),
  ]);
  const material = new THREE.LineBasicMaterial({
    color: edgeColor(currentEdge.type),
    transparent: true,
    opacity: 0.34 + (currentEdge.strength || 0.3) * 0.35,
  });
  const line = new THREE.Line(geometry, material);
  line.userData.edgeId = currentEdge.id;
  line.userData.edge = currentEdge;
  return line;
};

const initThree = (THREE) => {
  THREE_REF = THREE;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, 1, 1, 4000);
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  nodeGroup = new THREE.Group();
  edgeGroup = new THREE.Group();
  scene.add(edgeGroup);
  scene.add(nodeGroup);
  scene.add(new THREE.AmbientLight(0xffffff, 0.74));

  const light = new THREE.DirectionalLight(0xffffff, 1.1);
  light.position.set(220, 360, 620);
  scene.add(light);

  raycaster = new THREE.Raycaster();
  pointerVector = new THREE.Vector2();

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("resize", resizeRenderer);
  resizeRenderer();
};

const renderGraph = () => {
  disposeGroup(nodeGroup);
  disposeGroup(edgeGroup);
  meshById = new Map();
  edgeObjects = [];

  for (const currentEdge of state.graph.edges) {
    const line = createEdgeLine(currentEdge);
    edgeGroup.add(line);
    edgeObjects.push(line);
  }

  for (const node of state.graph.nodes) {
    const mesh = createNodeMesh(node);
    nodeGroup.add(mesh);
    meshById.set(node.id, mesh);
  }

  updateGraphStyles();
  updateLegend();
  updateCount();
};

const updateGraphStyles = () => {
  if (!state.graph || !meshById.size) return;
  for (const node of state.graph.nodes) {
    const mesh = meshById.get(node.id);
    const visible = isVisibleNode(node);
    const connected = isNeighbor(node.id);
    const highlighted = !state.neighborMode || connected;
    mesh.visible = visible;
    mesh.material.opacity = visible ? (highlighted ? 0.94 : 0.18) : 0;
    mesh.material.emissiveIntensity = node.id === state.selectedId ? 0.58 : connected ? 0.2 : 0.04;
    const selectedScale = node.id === state.selectedId ? 1.38 : connected ? 1.12 : 1;
    mesh.scale.setScalar(selectedScale);
  }

  for (const line of edgeObjects) {
    const currentEdge = line.userData.edge;
    const visible = isVisibleEdge(currentEdge);
    const selected = currentEdge.from === state.selectedId || currentEdge.to === state.selectedId;
    line.visible = visible;
    line.material.opacity = visible ? (selected ? 0.92 : state.neighborMode ? 0.18 : 0.38) : 0;
  }

  updateCount();
};

const updateLegend = () => {
  const legend = document.querySelector("[data-legend]");
  if (!legend) return;
  const roleItems = Object.entries(db.roles || {})
    .filter(([role]) => role !== "segment")
    .map(([role, config]) => `
      <span><i style="--legend-color:${escapeHtml(config.color)}"></i>${escapeHtml(config.label)}</span>
    `).join("");
  legend.innerHTML = roleItems;
};

const resizeRenderer = () => {
  if (!viewport || !renderer || !camera) return;
  const rect = viewport.getBoundingClientRect();
  const width = Math.max(320, rect.width);
  const height = Math.max(320, rect.height);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

const updateCamera = () => {
  if (!camera || !THREE_REF) return;
  const radius = state.distance;
  const x = Math.sin(state.yaw) * Math.cos(state.pitch) * radius;
  const y = Math.sin(state.pitch) * radius;
  const z = Math.cos(state.yaw) * Math.cos(state.pitch) * radius;
  camera.position.set(x, y, z);
  camera.lookAt(0, 20, 90);
};

const updateLabels = () => {
  if (!labelLayer || !camera || !renderer || !THREE_REF) return;
  const rect = viewport.getBoundingClientRect();
  const labels = state.graph.nodes
    .filter((node) => isVisibleNode(node) && (node.id === state.selectedId || isNeighbor(node.id) || node.importance >= 84 || node.type === "segment"))
    .map((node) => {
      const vector = new THREE_REF.Vector3(node.position.x, node.position.y, node.position.z);
      vector.project(camera);
      const x = (vector.x * 0.5 + 0.5) * rect.width;
      const y = (-vector.y * 0.5 + 0.5) * rect.height;
      const hidden = vector.z < -1 || vector.z > 1;
      return `
        <button class="graph-node-label ${node.id === state.selectedId ? "selected" : ""}" type="button" data-label-node="${escapeHtml(node.id)}" style="left:${x}px;top:${y}px;${hidden ? "display:none" : ""}">
          <strong>${escapeHtml(node.shortName || node.name)}</strong>
          <span>${escapeHtml(node.roleLabel)}</span>
        </button>
      `;
    }).join("");
  labelLayer.innerHTML = labels;
};

const animate = () => {
  updateCamera();
  renderer.render(scene, camera);
  updateLabels();
  requestAnimationFrame(animate);
};

const pointerPosition = (event) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
    y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
  };
};

function onPointerDown(event) {
  state.pointer.dragging = true;
  state.pointer.downX = event.clientX;
  state.pointer.downY = event.clientY;
  state.pointer.x = event.clientX;
  state.pointer.y = event.clientY;
  canvas.setPointerCapture?.(event.pointerId);
}

function onPointerMove(event) {
  if (!state.pointer.dragging) return;
  const dx = event.clientX - state.pointer.x;
  const dy = event.clientY - state.pointer.y;
  state.pointer.x = event.clientX;
  state.pointer.y = event.clientY;
  state.yaw -= dx * 0.006;
  state.pitch = Math.max(-0.92, Math.min(0.92, state.pitch - dy * 0.004));
}

function onPointerUp(event) {
  const moved = Math.hypot(event.clientX - state.pointer.downX, event.clientY - state.pointer.downY);
  state.pointer.dragging = false;
  if (moved > 6 || !raycaster) return;
  const point = pointerPosition(event);
  pointerVector.set(point.x, point.y);
  raycaster.setFromCamera(pointerVector, camera);
  const hits = raycaster.intersectObjects([...meshById.values()].filter((mesh) => mesh.visible), false);
  if (hits[0]?.object?.userData?.nodeId) selectNode(hits[0].object.userData.nodeId);
}

function onWheel(event) {
  event.preventDefault();
  state.distance = Math.max(520, Math.min(1900, state.distance + event.deltaY * 0.7));
}

const renderFallback = (reason) => {
  if (!fallback) return;
  canvas.hidden = true;
  labelLayer.hidden = true;
  fallback.hidden = false;
  const graph = state.graph || { nodes: [] };
  const roleGroups = Object.entries(db?.roles || {})
    .filter(([role]) => role !== "segment")
    .map(([role, config]) => {
      const nodes = graph.nodes.filter((node) => node.role === role).slice(0, 24);
      return `
        <section>
          <h3>${escapeHtml(config.label)}</h3>
          <div class="fallback-node-grid">
            ${nodes.map((node) => `<button type="button" data-fallback-node="${escapeHtml(node.id)}">${escapeHtml(node.name)}<span>${escapeHtml(node.region)}</span></button>`).join("")}
          </div>
        </section>
      `;
    }).join("");
  fallback.innerHTML = `<div class="fallback-note">${escapeHtml(reason)}</div>${roleGroups}`;
  fallback.addEventListener("click", (event) => {
    const button = event.target.closest("[data-fallback-node]");
    if (button) selectNode(button.dataset.fallbackNode);
  });
  updateCount();
};

labelLayer?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-label-node]");
  if (button) selectNode(button.dataset.labelNode);
});

const boot = async () => {
  if (!db || !canvas || !viewport || !panel) {
    renderFallback("企业图谱数据或容器缺失，已切换到列表模式。");
    return;
  }
  state.graph = normalizeGraph(db);
  attachControls();
  renderFilterControls();
  renderPanel(state.graph.nodeMap.get(state.selectedId) || state.graph.nodes[0]);

  try {
    const THREE = await import(THREE_URL);
    initThree(THREE);
    renderGraph();
    animate();
  } catch (error) {
    console.warn("3D enterprise graph fallback:", error);
    renderFallback("3D 渲染库暂不可用，已切换到关系列表模式。");
  }
};

boot();
