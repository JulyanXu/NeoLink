const themeToggle = document.querySelector(".theme-toggle");
const params = new URLSearchParams(window.location.search);
const currentSection = params.get("section") === "headlines" ? "headlines" : "latest";
let currentCategory = "全部";

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

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
}[char]));

const formatDate = (value) => {
  if (!value) return "";
  if (/^\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
};

const feedYear = Number((window.NEOLINK_FEED?.generated_at || "").slice(0, 4)) || new Date().getFullYear();
const feedMonthDay = (window.NEOLINK_FEED?.generated_at || "").slice(5, 10);

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

const withCategory = (items = [], category) => items.map((item) => ({ ...item, category }));
const itemTitle = (item) => item.title || item.name || item.company || "";
const sections = window.NEOLINK_FEED?.sections || {};

const articleId = (item) => encodeURIComponent([
  item.source || "",
  item.date || item.as_of || "",
  itemTitle(item),
].join("|").toLowerCase());

const articleHref = (item) => `./article.html?id=${articleId(item)}`;

const latestItems = () => sortByDateDesc((sections.latest || [
  ...withCategory(sections.policy, "政策"),
  ...withCategory(sections.project, "项目"),
  ...withCategory(sections.enterprise, "企业"),
  ...withCategory(sections.materials, "价格"),
  ...withCategory(sections.safety, "安全"),
  ...withCategory(sections.legal, "法律"),
  ...withCategory(sections.ipo, "IPO"),
]).filter((item) => item.title || item.name || item.company));

const sectionItems = () => {
  const sourceItems = currentSection === "headlines" ? sortByDateDesc(sections.headlines || latestItems().slice(0, 4)) : latestItems();
  if (currentSection !== "latest" || currentCategory === "全部") return sourceItems;
  return sortByDateDesc(sourceItems.filter((item) => item.category === currentCategory));
};

const renderHeader = () => {
  document.querySelectorAll("[data-section-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.sectionLink === currentSection);
  });

  const title = currentSection === "headlines" ? "今日头条" : "最新新闻";
  const subtitle = currentSection === "headlines"
    ? "聚合首页头条与关键要闻，点击标题进入 NeoLink 站内详情页。"
    : "按首页新闻分类展开更多动态，站内详情页保留摘要、来源和原文备用入口。";

  document.querySelector(".more-title").textContent = title;
  document.querySelector(".more-subtitle").textContent = subtitle;
  document.title = `NeoLink ${title}`;
};

const renderFilters = () => {
  const filters = document.querySelector(".more-filters");
  if (!filters) return;
  if (currentSection !== "latest") {
    filters.hidden = true;
    filters.innerHTML = "";
    return;
  }

  const categories = ["全部", ...new Set(latestItems().map((item) => item.category).filter(Boolean))];
  filters.hidden = false;
  filters.innerHTML = categories.map((category) => `
    <button class="${category === currentCategory ? "active" : ""}" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>
  `).join("");

  filters.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      currentCategory = button.dataset.category;
      renderFilters();
      renderList();
    });
  });
};

const renderMeta = (item) => {
  const credibility = getCredibility(item);
  const detail = item.category || item.type || item.severity || item.location || item.board || "索引";
  return `
    <div class="signal-meta">
      <em class="grade-${credibility.grade.toLowerCase()}">${credibility.label}</em>
      <span>${escapeHtml(item.source || "来源未标注")}</span>
      <small>${escapeHtml(detail)}</small>
      <time>${escapeHtml(formatDate(item.date))}</time>
    </div>
  `;
};

const renderList = () => {
  const list = document.querySelector(".more-list");
  if (!list) return;
  const items = sectionItems();

  list.innerHTML = items.map((item, index) => `
    <article class="more-card panel ${currentSection === "headlines" && index === 0 ? "lead" : ""}">
      ${renderMeta(item)}
      <a class="more-card-title" href="${escapeHtml(articleHref(item))}">${escapeHtml(itemTitle(item))}</a>
      <p>${escapeHtml(item.summary || "")}</p>
      <div class="more-card-foot">
        <a href="${escapeHtml(articleHref(item))}">${escapeHtml(currentSection === "headlines" ? "头条详情" : "站内详情")}</a>
        <a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">查看原文</a>
      </div>
    </article>
  `).join("");
};

renderHeader();
renderFilters();
renderList();
