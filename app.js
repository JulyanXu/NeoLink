const state = {
  data: null,
  query: "",
  category: "all",
  range: "all",
};

const categoryLabel = {
  shipment: "储能出货",
  cellPrice: "电芯价格",
  export: "出口环比",
  company: "企业布局",
  safety: "安全事故",
  legal: "法律纠纷",
  project: "项目开工",
  product: "新产品业态",
  giant: "巨头动作",
  ipo: "IPO",
  policy: "政策",
  tender: "招标公示",
  materials: "主材价格",
};

const impactLabel = {
  bullish: "利多",
  bearish: "利空",
  neutral: "中性",
  mixed: "分化",
  watch: "观察",
};

const el = {
  generatedAt: document.querySelector("#generatedAt"),
  articleCount: document.querySelector("#articleCount"),
  signalGrid: document.querySelector("#signalGrid"),
  categorySelect: document.querySelector("#categorySelect"),
  searchInput: document.querySelector("#searchInput"),
  feedList: document.querySelector("#feedList"),
  emptyState: document.querySelector("#emptyState"),
  watchList: document.querySelector("#watchList"),
  riskList: document.querySelector("#riskList"),
  sourceWindows: document.querySelector("#sourceWindows"),
  companyTrackers: document.querySelector("#companyTrackers"),
  themeToggle: document.querySelector("#themeToggle"),
  tabs: document.querySelectorAll("[data-range]"),
};

syncThemeButton();
init();

async function init() {
  bindEvents();

  try {
    const response = await fetch("./data/market-news.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.data = await response.json();
  } catch (error) {
    state.data = fallbackData(error);
  }

  hydrateMeta();
  renderCategoryOptions();
  renderSignals();
  renderWatchlists();
  renderSourceWindows();
  renderCompanyTrackers();
  renderFeed();
}

function bindEvents() {
  el.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderFeed();
  });

  el.categorySelect.addEventListener("change", (event) => {
    state.category = event.target.value;
    renderFeed();
  });

  el.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      el.tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      state.range = tab.dataset.range;
      renderFeed();
    });
  });

  el.themeToggle.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("neolink-theme", isDark ? "dark" : "light");
  } catch {}
  syncThemeButton();
}

function syncThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");
  el.themeToggle.textContent = isDark ? "☀" : "◐";
  el.themeToggle.setAttribute("aria-label", isDark ? "切换到白天模式" : "切换到夜间模式");
  el.themeToggle.title = isDark ? "切换到白天模式" : "切换到夜间模式";
}

function hydrateMeta() {
  const loadedAt = new Date();
  const generated = new Date(state.data.generatedAt);
  el.generatedAt.textContent = formatDateTime(loadedAt);
  el.articleCount.textContent = `${state.data.news.length} 条情报 · 数据 ${formatDateTime(generated)}`;
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function renderCategoryOptions() {
  const used = [...new Set(state.data.news.map((item) => item.category))];
  used.forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = categoryLabel[key] || key;
    el.categorySelect.append(option);
  });
}

function renderSignals() {
  el.signalGrid.innerHTML = state.data.signals
    .map((signal) => {
      const points = normalizeSparkline(signal.series);
      return `
        <article class="signal">
          <div class="signal-body">
            <span class="signal-label">${escapeHtml(signal.label)}</span>
            <strong class="signal-value">${escapeHtml(signal.value)}</strong>
            <svg class="sparkline" viewBox="0 0 180 46" role="img" aria-label="${escapeHtml(signal.label)}趋势">
              <polyline points="${points}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>
            </svg>
            <div class="signal-meta">
              <span>${escapeHtml(signal.note)}</span>
              <strong class="trend ${signal.direction}">${escapeHtml(signal.change)}</strong>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderWatchlists() {
  el.watchList.innerHTML = state.data.watchlist
    .map(
      (item) => `
        <article class="watch-item">
          <strong>${escapeHtml(item.name)}</strong>
          <span>${escapeHtml(item.reason)}</span>
        </article>
      `,
    )
    .join("");

  const riskItems = state.data.news.filter((item) =>
    ["safety", "legal"].includes(item.category),
  );
  el.riskList.innerHTML = riskItems
    .map(
      (item) => `
        <article class="risk-item">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.summary)}</span>
        </article>
      `,
    )
    .join("");
}

function renderSourceWindows() {
  const windows = state.data.sourceWindows || [];
  if (!el.sourceWindows || !windows.length) return;

  el.sourceWindows.innerHTML = windows
    .map(
      (window) => `
        <article class="source-window">
          <div class="source-window-head">
            <span>${escapeHtml(window.type)}</span>
            <strong>${escapeHtml(window.title)}</strong>
          </div>
          <p>${escapeHtml(window.summary)}</p>
          <div class="source-window-meta">
            <span>${escapeHtml(window.cadence)}</span>
            <span>${escapeHtml(window.access)}</span>
          </div>
          <div class="source-window-links">
            ${(window.entries || [])
              .map(
                (entry) => `
                  <a class="source-window-link" href="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer">
                    <span>${escapeHtml(entry.name)}</span>
                    <small>${escapeHtml(entry.window)}</small>
                  </a>
                `,
              )
              .join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderCompanyTrackers() {
  const trackers = state.data.companyTrackers || [];
  if (!el.companyTrackers || !trackers.length) return;

  el.companyTrackers.innerHTML = trackers
    .map(
      (group) => `
        <article class="company-tracker">
          <div class="company-tracker-head">
            <span>${escapeHtml(group.type)}</span>
            <h3>${escapeHtml(group.title)}</h3>
            <p>${escapeHtml(group.basis)}</p>
          </div>
          <div class="company-list">
            ${(group.companies || [])
              .map(
                (company) => `
                  <a class="company-link" href="${escapeHtml(company.url)}" target="_blank" rel="noopener noreferrer">
                    <span class="company-logo" aria-hidden="true">
                      <img src="${escapeHtml(getCompanyLogoUrl(company))}" alt="" loading="lazy" />
                    </span>
                    <span class="company-rank">${escapeHtml(company.rank)}</span>
                    <span class="company-main">
                      <strong>${escapeHtml(company.name)}</strong>
                      <small>${escapeHtml(company.focus)}</small>
                    </span>
                    <span class="company-source">${escapeHtml(company.source)}</span>
                  </a>
                `,
              )
              .join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function getCompanyLogoUrl(company) {
  if (company.logoUrl) return company.logoUrl;
  try {
    const { hostname } = new URL(company.url);
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`;
  } catch {
    return "";
  }
}

function makeLogoText(name) {
  const compact = String(name || "").replace(/[^\p{L}\p{N}]/gu, "");
  return compact.slice(0, 3).toUpperCase() || "NE";
}

function renderFeed() {
  const filtered = state.data.news
    .filter((item) => {
      const searchable = [
        item.title,
        item.summary,
        item.region,
        item.source,
        item.tags.join(" "),
        categoryLabel[item.category],
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !state.query || searchable.includes(state.query);
      const matchesCategory = state.category === "all" || item.category === state.category;
      const matchesRange = isInRange(item.date, state.range);

      return matchesQuery && matchesCategory && matchesRange;
    })
    .toSorted((a, b) => new Date(`${b.date}T00:00:00`) - new Date(`${a.date}T00:00:00`));

  el.emptyState.hidden = filtered.length > 0;
  el.feedList.innerHTML = filtered
    .map(
      (item) => `
        <article class="news-item">
          <time class="news-date" datetime="${escapeHtml(item.date)}">${formatDate(item.date)}</time>
          <div class="news-main">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary)}</p>
            <div class="source-line">
              <span>来源：${renderSource(item)}</span>
              <span>影响：${escapeHtml(impactLabel[item.impact] || item.impact || "待判断")}</span>
            </div>
            <div class="tags">
              <span class="tag">${escapeHtml(categoryLabel[item.category] || item.category)}</span>
              <span class="tag">${escapeHtml(item.region)}</span>
              ${item.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function isInRange(dateString, range) {
  if (range === "all") return true;

  const itemDate = new Date(`${dateString}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (range === "today") {
    return itemDate.getTime() === today.getTime();
  }

  const diffDays = (today - itemDate) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 7;
}

function normalizeSparkline(series) {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const step = 180 / (series.length - 1 || 1);

  return series
    .map((value, index) => {
      const x = index * step;
      const y = 40 - ((value - min) / span) * 34 + 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).format(new Date(`${dateString}T00:00:00`));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderSource(item) {
  const source = escapeHtml(item.source || "未标注");
  if (!item.sourceUrl) return source;
  return `<a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">${source}</a>`;
}

function fallbackData(error) {
  return {
    generatedAt: new Date().toISOString(),
    signals: [
      {
        label: "数据读取状态",
        value: "失败",
        change: "检查本地服务",
        direction: "down",
        note: error.message,
        series: [1, 1, 1, 1, 1, 1],
      },
    ],
    watchlist: [],
    news: [],
  };
}
