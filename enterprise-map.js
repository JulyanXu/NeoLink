const themeToggle = document.querySelector(".theme-toggle");
const db = window.NeoLinkEnterpriseDB;

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

const segmentLabels = {
  storage: "储能",
  power: "动力",
  consumer: "3C",
};

const typeLabels = {
  storage: "储能电池制造商",
  power: "动力电池制造商",
  consumer: "3C电池制造商",
  multi: "多赛道电池制造商",
  global: "日韩电池制造商",
};

const nodeLayer = document.querySelector(".node-layer");
const edgeLayer = document.querySelector(".edge-layer");
const graphContent = document.querySelector(".graph-content");
const minimap = document.querySelector(".minimap");
const companyPanel = document.querySelector(".company-panel");
const searchInput = document.querySelector(".graph-search-input");
let activeType = "all";
let activeRelation = "all";
let selectedId = "catl";
let zoomLevel = 1;

const rankText = (company) => Object.entries(company.ranks || {})
  .map(([segment, rank]) => `${segmentLabels[segment]}第${rank}`)
  .join(" / ");

const companyType = (company) => {
  if (company.country === "韩国" || company.country === "日本") return "global";
  if (company.segments.length > 1) return "multi";
  return company.segments[0];
};

const companies = (db?.companies || []).map((company) => ({
  ...company,
  type: companyType(company),
  typeLabel: typeLabels[companyType(company)],
  rankLabel: rankText(company),
  links: (db?.relationships || []).filter(([from, to]) => from === company.id || to === company.id).length,
}));

const relationships = db?.relationships || [];
const byId = (id) => companies.find((company) => company.id === id);
const byIndex = (id) => byId(id) || byId("catl");

const visibleNode = (node) => {
  if (activeType === "all") return true;
  if (node.id === selectedId) return true;
  if (activeType === "multi") return node.segments.length > 1;
  if (activeType === "global") return node.country === "韩国" || node.country === "日本";
  return node.segments.includes(activeType);
};

const visibleEdge = (edge) => {
  const [from, to, relation] = edge;
  const fromNode = byId(from);
  const toNode = byId(to);
  if (!fromNode || !toNode) return false;
  return (activeRelation === "all" || relation === activeRelation) && visibleNode(fromNode) && visibleNode(toNode);
};

const renderEdges = () => {
  edgeLayer.innerHTML = relationships.map(([fromId, toId, relation, label]) => {
    if (!visibleEdge([fromId, toId, relation])) return "";
    const from = byId(fromId);
    const to = byId(toId);
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2;
    const isSelected = fromId === selectedId || toId === selectedId;
    return `
      <g class="edge-group ${relation} ${isSelected ? "selected" : ""}">
        <line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"></line>
        <text x="${mx}" y="${my - 8}">${label}</text>
      </g>
    `;
  }).join("");
};

const renderNodes = () => {
  nodeLayer.innerHTML = companies.map((node) => `
    <button class="graph-node ${node.type} ${node.id === selectedId ? "selected" : ""} ${visibleNode(node) ? "" : "dimmed"}"
      type="button"
      data-node="${node.id}"
      style="left:${node.x / 10}%; top:${node.y / 6.5}%; width:${node.size}px; height:${node.size}px"
      aria-label="${node.name}">
      <strong>${node.name}</strong>
      <span>${node.brand}</span>
    </button>
  `).join("");
};

const renderMinimap = () => {
  if (!minimap) return;
  const viewport = minimap.querySelector(".minimap-viewport")?.outerHTML || '<div class="minimap-viewport"></div>';
  const dots = companies.map((node) => {
    const left = 14 + node.x * 0.14;
    const top = 14 + node.y * 0.154;
    const active = node.id === selectedId ? "is-active" : "";
    const hidden = visibleNode(node) ? "" : "opacity:.22;";
    return `<span class="${node.type} ${active}" style="left:${left}px; top:${top}px; ${hidden}"></span>`;
  }).join("");
  minimap.innerHTML = `${viewport}${dots}`;
};

const applyZoom = () => {
  if (!graphContent || !minimap) return;
  graphContent.style.transform = `scale(${zoomLevel})`;
  const viewport = minimap.querySelector(".minimap-viewport");
  if (!viewport) return;
  const width = 140 / zoomLevel;
  const height = 100 / zoomLevel;
  viewport.style.width = `${Math.max(72, width)}px`;
  viewport.style.height = `${Math.max(52, height)}px`;
  viewport.style.left = `${14 + (140 - Math.max(72, width)) / 2}px`;
  viewport.style.top = `${14 + (100 - Math.max(52, height)) / 2}px`;
};

const setZoom = (nextZoom) => {
  zoomLevel = Math.min(1.35, Math.max(0.76, Number(nextZoom.toFixed(2))));
  applyZoom();
};

const renderList = (items, className) => items.map((item) => {
  if (className === "risk-briefs") {
    const [level, title, desc] = item;
    return `<li class="${level}"><b>${title}</b><span>${desc}</span></li>`;
  }
  if (className === "company-news") {
    const [title, date] = item;
    return `<li><span></span><b>${title}</b><time>${date}</time></li>`;
  }
  const [title, meta] = item;
  return `<li><b>${title}</b><span>${meta}</span></li>`;
}).join("");

const setSection = (selector, items, className) => {
  const list = companyPanel.querySelector(selector);
  const section = list?.closest("section");
  if (!list || !section) return;
  const hasItems = Array.isArray(items) && items.length > 0;
  section.hidden = !hasItems;
  if (hasItems) list.innerHTML = renderList(items, className);
};

const updatePanel = (id) => {
  const node = byIndex(id);
  if (!node || !companyPanel) return;
  companyPanel.querySelector(".company-logo").textContent = node.brand;
  companyPanel.querySelector(".company-name").textContent = node.name;
  companyPanel.querySelector(".company-subtitle").textContent = `${node.typeLabel} · ${node.listing} · ${node.region}`;
  companyPanel.querySelector(".stat-type").textContent = node.segments.map((segment) => segmentLabels[segment]).join(" / ");
  companyPanel.querySelector(".stat-listing").textContent = node.listing;
  companyPanel.querySelector(".stat-region").textContent = node.region;
  companyPanel.querySelector(".stat-links").textContent = `${node.links} 条`;
  companyPanel.querySelector(".company-business").textContent = node.business;
  companyPanel.querySelector(".company-tags").innerHTML = [...node.tags, node.rankLabel].filter(Boolean).map((tag) => `<span>${tag}</span>`).join("");
  setSection(".project-briefs", node.projects, "project-briefs");
  setSection(".company-news", node.news, "company-news");
  setSection(".risk-briefs", node.risks, "risk-briefs");
};

const render = () => {
  renderEdges();
  renderNodes();
  renderMinimap();
  updatePanel(selectedId);
  applyZoom();
};

const setRelation = (relation) => {
  activeRelation = relation;
  document.querySelectorAll("[data-relation]").forEach((item) => {
    item.classList.toggle("active", item.dataset.relation === relation);
  });
  document.querySelectorAll("[data-legend]").forEach((item) => {
    item.classList.toggle("active", item.dataset.legend === relation);
  });
  render();
};

nodeLayer?.addEventListener("click", (event) => {
  const button = event.target.closest(".graph-node");
  if (!button) return;
  selectedId = button.dataset.node;
  render();
});

document.querySelectorAll("[data-type]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-type]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeType = button.dataset.type;
    render();
  });
});

document.querySelectorAll("[data-relation]").forEach((button) => {
  button.addEventListener("click", () => {
    setRelation(button.dataset.relation);
  });
});

document.querySelectorAll("[data-legend]").forEach((button) => {
  button.addEventListener("click", () => {
    setRelation(activeRelation === button.dataset.legend ? "all" : button.dataset.legend);
  });
});

document.querySelectorAll("[data-zoom]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.zoom;
    if (action === "in") setZoom(zoomLevel + 0.12);
    if (action === "out") setZoom(zoomLevel - 0.12);
    if (action === "fit") setZoom(1);
  });
});

searchInput?.addEventListener("input", (event) => {
  const keyword = event.target.value.trim().toLowerCase();
  const exactMatch = companies.find((node) => node.name.toLowerCase() === keyword || node.brand.toLowerCase() === keyword);
  const fuzzyMatch = companies.find((node) => {
    const text = `${node.name} ${node.brand} ${node.country} ${node.region} ${node.tags.join(" ")}`.toLowerCase();
    return text.includes(keyword);
  });
  const match = exactMatch || fuzzyMatch;
  if (match) selectedId = match.id;
  render();
});

render();
