const navItems = document.querySelectorAll(".nav-item");
const panels = document.querySelectorAll(".panel, .metric-card, .map-card");
const searchInput = document.querySelector(".search input");
const themeToggle = document.querySelector(".theme-toggle");

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("neolink-theme", theme);

  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "切换浅色模式" : "切换深色模式");
    const label = themeToggle.querySelector("span");
    if (label) {
      label.textContent = isDark ? "深色" : "浅色";
    }
  }
};

setTheme(document.documentElement.dataset.theme || "light");

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");

    const section = item.dataset.section;
    panels.forEach((panel) => {
      panel.animate(
        [
          { transform: "translateY(8px)", opacity: 0.82 },
          { transform: "translateY(0)", opacity: 1 },
        ],
        { duration: 280, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
    });

    document.body.dataset.section = section;
  });
});

searchInput?.addEventListener("input", (event) => {
  const keyword = event.target.value.trim().toLowerCase();
  const rows = document.querySelectorAll("li");

  rows.forEach((row) => {
    const hit = row.textContent.toLowerCase().includes(keyword);
    row.style.opacity = !keyword || hit ? "1" : "0.28";
  });
});

document.querySelectorAll(".panel-title button, .map-card button").forEach((button) => {
  button.addEventListener("click", () => {
    button.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.94)" },
        { transform: "scale(1)" },
      ],
      { duration: 180, easing: "ease-out" },
    );
  });
});

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
}[char]));

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
};

const displayDate = (value) => {
  if (!value) return "";
  return /^\d{2}-\d{2}$/.test(value) ? value : formatDate(value);
};

const feedYear = Number((window.NEOLINK_FEED?.generated_at || "").slice(0, 4)) || new Date().getFullYear();
const feedMonthDay = (window.NEOLINK_FEED?.generated_at || "").slice(5, 10);

const formatGeneratedMeta = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const day = date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
  const time = date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
  return `${day}　更新 ${time} (GMT+8)`;
};

const renderPageTimestamps = () => {
  const generatedAt = window.NEOLINK_FEED?.generated_at;
  const heroMeta = document.querySelector(".hero-title p");
  if (!generatedAt || !heroMeta) return;
  heroMeta.innerHTML = `<span></span>${escapeHtml(formatGeneratedMeta(generatedAt))}`;
};

const dateValue = (item = {}) => {
  const value = item.date || item.as_of || item.publish_time || item.updated_at || "";
  if (!value) return 0;
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return new Date(value).getTime() || 0;
  if (/^\d{2}-\d{2}$/.test(value)) {
    const year = feedMonthDay && value > feedMonthDay ? feedYear - 1 : feedYear;
    return new Date(`${year}-${value}T00:00:00+08:00`).getTime() || 0;
  }
  return new Date(value).getTime() || 0;
};

const sortByDateDesc = (items = []) => [...items].sort((a, b) => dateValue(b) - dateValue(a));

const itemTitle = (item) => item.title || item.name || item.company || "";

const articleId = (item) => encodeURIComponent([
  item.source || "",
  item.date || item.as_of || "",
  itemTitle(item),
].join("|").toLowerCase());

const articleHref = (item) => `./article.html?id=${articleId(item)}`;

const linkMarkup = (item, text = itemTitle(item), className = "") => `<a class="${escapeHtml(className)}" href="${escapeHtml(articleHref(item))}" title="${escapeHtml(item.summary || itemTitle(item))}">${escapeHtml(text)}</a>`;

const getCredibility = (item) => {
  const source = `${item.source || ""} ${item.title || ""}`;
  if (/国家|中国政府|证监|知识产权|交易所|海关|能源局|发改委|工信部|法定信披/.test(source)) {
    return { grade: "S", label: "官方" };
  }
  if (/SMM|Mysteel|百川|InfoLink|CNESA|GGII|BNEF|SNE|研报|证券|TrendForce|集邦|iFind/.test(source)) {
    return { grade: "A", label: "专业" };
  }
  return { grade: "B", label: "媒体" };
};

const signalMeta = (item, typeLabel) => {
  const credibility = getCredibility(item);
  const detail = typeLabel || item.type || item.severity || item.location || item.board || item.source;
  return `
    <div class="signal-meta">
      <em class="grade-${credibility.grade.toLowerCase()}">${credibility.label}</em>
      <span>${escapeHtml(item.source || "来源未标注")}</span>
      ${detail ? `<small>${escapeHtml(detail)}</small>` : ""}
      <time>${escapeHtml(displayDate(item.date))}</time>
    </div>
  `;
};

const renderSignalList = (items = [], typeLabel = "") => sortByDateDesc(items).slice(0, 3).map((item) => `
  <li class="signal-item">
    ${signalMeta(item, typeLabel)}
    ${linkMarkup(item, item.title, "signal-title")}
  </li>
`).join("");

const renderFocusList = (sections) => {
  const focusList = document.querySelector(".focus-list");
  if (!focusList) return;

  const items = [
    ...(sections.policy || []).map((item) => ({ ...item, lane: "政策招标" })),
    ...(sections.project || []).map((item) => ({ ...item, lane: "项目" })),
    ...(sections.enterprise || []).map((item) => ({ ...item, lane: "企业" })),
    ...(sections.safety || []).map((item) => ({ ...item, lane: "风险" })),
  ];

  focusList.innerHTML = sortByDateDesc(items).slice(0, 4).map((item) => `
    <li class="focus-item">
      ${signalMeta(item, item.lane)}
      ${linkMarkup(item, item.title, "focus-title")}
    </li>
  `).join("");
};

const withCategory = (items = [], category) => items.map((item) => ({ ...item, category }));

const latestItems = (sections) => sortByDateDesc((sections.latest || [
  ...withCategory(sections.policy, "政策"),
  ...withCategory(sections.project, "项目"),
  ...withCategory(sections.enterprise, "企业"),
  ...withCategory(sections.materials, "价格"),
  ...withCategory(sections.safety, "安全"),
  ...withCategory(sections.legal, "法律"),
  ...withCategory(sections.ipo, "IPO"),
]).filter((item) => item.title || item.name || item.company));

const renderHeadline = (sections) => {
  const main = document.querySelector(".headline-main");
  const list = document.querySelector(".headline-list");
  if (!main || !list) return;

  const headlines = sortByDateDesc(sections.headlines || latestItems(sections).slice(0, 4));
  const lead = headlines[0];
  if (!lead) return;

  main.innerHTML = `
    ${signalMeta(lead, lead.category || "头条")}
    ${linkMarkup(lead, itemTitle(lead), "headline-link")}
    <p>${escapeHtml(lead.summary || "")}</p>
  `;

  list.innerHTML = headlines.slice(1, 4).map((item) => `
    <li>
      ${signalMeta(item, item.category || "要闻")}
      ${linkMarkup(item, itemTitle(item), "headline-side-link")}
    </li>
  `).join("");
};

const renderLatestNews = (sections, category = "全部") => {
  const list = document.querySelector(".latest-news-list");
  if (!list) return;

  const items = latestItems(sections).filter((item) => category === "全部" || item.category === category);

  list.innerHTML = items.slice(0, 10).map((item) => `
    <li>
      <div class="news-row-main">
        ${signalMeta(item, item.category || item.type || item.status || item.location)}
        ${linkMarkup(item, itemTitle(item), "news-title")}
        <p>${escapeHtml(item.summary || "")}</p>
      </div>
    </li>
  `).join("");
};

const setupNewsFilters = (sections) => {
  const tabs = document.querySelectorAll(".news-tabs button");
  if (!tabs.length) return;

  tabs.forEach((button) => {
    button.addEventListener("click", () => {
      tabs.forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      renderLatestNews(sections, button.textContent.trim());
    });
  });
};

const renderQuickMetrics = (sections) => {
  const list = document.querySelector(".quick-metrics");
  if (!list || !sections.metrics) return;

  list.innerHTML = sortByDateDesc(sections.metrics).slice(0, 4).map((item) => `
    <li>
      <span>${linkMarkup(item, item.title)}</span>
      <strong>${escapeHtml(item.value)} <small>${escapeHtml(item.unit)}</small></strong>
      <em class="${item.direction === "up" ? "up" : "down"}">${escapeHtml(item.delta)}</em>
      <small>${escapeHtml(item.source || "")}${item.as_of ? ` · ${escapeHtml(item.as_of)}` : ""}</small>
    </li>
  `).join("");
};

const chartPath = (history = [], width = 260, height = 58) => {
  if (history.length < 2) return "";
  const values = history.map((point) => Number(point.value)).filter(Number.isFinite);
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return history.map((point, index) => {
    const x = (index / (history.length - 1)) * width;
    const y = height - ((Number(point.value) - min) / range) * (height - 8) - 4;
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
};

const renderMetricTrend = (card, item) => {
  const chart = card.querySelector(".bar-chart, .sparkline");
  if (!chart) return;

  if (!Array.isArray(item.history) || item.history.length < 2) {
    card.classList.add("no-history");
    chart.setAttribute("aria-label", "暂无可追溯历史序列");
    return;
  }

  card.classList.remove("no-history");
  const path = chartPath(item.history);
  if (chart.matches("svg")) {
    chart.innerHTML = `<path d="${path}"/>`;
  }
};

const ensureMetricMeta = (card) => {
  let meta = card.querySelector(".metric-source");
  if (!meta) {
    meta = document.createElement("p");
    meta.className = "metric-source";
    card.append(meta);
  }
  return meta;
};

const renderSectionContent = () => {
  const sections = window.NEOLINK_FEED?.sections;
  if (!sections) return;

  renderPageTimestamps();
  renderFocusList(sections);
  renderHeadline(sections);
  renderLatestNews(sections);
  setupNewsFilters(sections);
  renderQuickMetrics(sections);

  document.querySelectorAll(".metric-card").forEach((card, index) => {
    const item = sortByDateDesc(sections.metrics)?.[index];
    if (!item) return;
    const title = card.querySelector(".card-head h2");
    const caption = card.querySelector(".card-head p");
    const value = card.querySelector(":scope > strong");
    const delta = card.querySelector(".delta");
    if (title) title.innerHTML = linkMarkup(item);
    if (caption) caption.textContent = item.caption;
    if (value) value.innerHTML = `${escapeHtml(item.value)} <span>${escapeHtml(item.unit)}</span>`;
    if (delta) {
      delta.textContent = item.delta;
      delta.classList.toggle("up", item.direction === "up");
      delta.classList.toggle("down", item.direction !== "up");
    }
    const meta = ensureMetricMeta(card);
    meta.textContent = `${item.source || "来源未标注"}${item.as_of ? ` · ${item.as_of}` : ""}${item.methodology ? ` · ${item.methodology}` : ""}`;
    renderMetricTrend(card, item);
  });

  const enterpriseList = document.querySelector(".industry-panel .company-list");
  if (enterpriseList && sections.enterprise) {
    enterpriseList.innerHTML = renderSignalList(sections.enterprise, "布局");
  }

  const safetyList = document.querySelector(".risk-panel .event-list");
  if (safetyList && sections.safety) {
    safetyList.innerHTML = renderSignalList(sections.safety);
  }

  const legalList = document.querySelector(".risk-panel .doc-list");
  if (legalList && sections.legal) {
    legalList.innerHTML = renderSignalList(sections.legal);
  }

  const projectList = document.querySelector(".industry-panel .project-list");
  if (projectList && sections.project) {
    projectList.innerHTML = renderSignalList(sections.project);
  }

  const ipoList = document.querySelector(".risk-panel .ipo-list");
  if (ipoList && sections.ipo) {
    ipoList.innerHTML = sortByDateDesc(sections.ipo).slice(0, 3).map((item) => `
      <li class="signal-item">
        ${signalMeta(item, item.status)}
        ${linkMarkup(item, item.company, "signal-title")}
      </li>
    `).join("");
  }

  const policyList = document.querySelector(".industry-panel .policy-list");
  if (policyList && sections.policy) {
    policyList.innerHTML = renderSignalList(sections.policy, "政策/招标");
  }

  const materialsGrid = document.querySelector(".materials-grid");
  if (materialsGrid && sections.materials) {
    materialsGrid.innerHTML = sortByDateDesc(sections.materials).map((item) => `
      <div>
        <h3>${linkMarkup(item, item.name)}</h3>
        <p>${escapeHtml(item.value)} <span>${escapeHtml(item.unit)}</span></p>
        <small class="${item.direction === "up" ? "up" : "down"}">${escapeHtml(item.change)}</small>
        <em>${escapeHtml(item.spec)} · ${escapeHtml(item.source)}</em>
        <svg viewBox="0 0 120 40"><path d="${item.direction === "up" ? "M2 29 14 24 26 27 38 18 50 20 62 13 74 16 86 9 98 14 118 8" : "M2 12 14 16 26 13 38 22 50 18 62 24 74 20 86 27 98 23 118 30"}"/></svg>
      </div>
    `).join("");
  }

  const mobileHot = document.querySelector(".mobile-hot .company-list");
  if (mobileHot) {
    const mobileHotItems = sortByDateDesc(sections.headlines || latestItems(sections)).slice(0, 4);
    mobileHot.innerHTML = mobileHotItems.map((item) => `
      <li><b>${escapeHtml(getCredibility(item).label)}</b><span>${linkMarkup(item)}</span><time>${escapeHtml(displayDate(item.date))}</time></li>
    `).join("");
  }

  const mobileLatest = document.querySelector(".mobile-latest .latest-list");
  if (mobileLatest) {
    const latest = latestItems(sections).slice(0, 6);
    mobileLatest.innerHTML = latest.map((item) => `
      <li><span class="doc"></span><b>${linkMarkup(item)}</b><time>${escapeHtml(displayDate(item.date))}</time></li>
    `).join("");
  }
};

renderSectionContent();
