const themeToggle = document.querySelector(".theme-toggle");

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

const displayDate = (value) => {
  if (!value) return "";
  if (/^\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });
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

const itemTitle = (item) => item.title || item.name || item.company || "";

const rawArticleId = (item) => [
  item.source || "",
  item.date || item.as_of || "",
  itemTitle(item),
].join("|").toLowerCase();

const articleId = (item) => encodeURIComponent(rawArticleId(item));

const getCredibility = (item) => {
  const source = `${item.source || ""} ${itemTitle(item)}`;
  if (/国家|中国政府|证监|知识产权|交易所|海关|能源局|发改委|工信部|法定信披/.test(source)) {
    return { grade: "S", label: "官方" };
  }
  if (/SMM|Mysteel|百川|InfoLink|CNESA|GGII|BNEF|SNE|研报|证券|TrendForce|集邦|iFind|鑫椤|GGII/.test(source)) {
    return { grade: "A", label: "专业" };
  }
  return { grade: "B", label: "媒体" };
};

const withCategory = (items = [], category) => items.map((item) => ({ ...item, category: item.category || category }));

const collectItems = () => {
  const sections = window.NEOLINK_FEED?.sections || {};
  const sectionMap = {
    headlines: "头条",
    latest: "最新新闻",
    enterprise: "企业",
    safety: "安全",
    legal: "法律",
    project: "项目",
    ipo: "IPO",
    policy: "政策",
    materials: "价格",
    metrics: "数据",
  };

  const all = Object.entries(sectionMap).flatMap(([key, label]) => withCategory(sections[key], label));
  const seen = new Map();
  all.forEach((item) => {
    if (!itemTitle(item)) return;
    const id = articleId(item);
    if (!seen.has(id)) {
      seen.set(id, { ...item, id, raw_id: rawArticleId(item) });
    }
  });
  return sortByDateDesc([...seen.values()]);
};

const factRows = (item) => [
  ["分类", item.category || item.type || item.severity || item.location || item.board || "信息索引"],
  ["公众号", item.account_name || ""],
  ["来源", item.source || "来源未标注"],
  ["日期", displayDate(item.date || item.as_of)],
  ["数值", item.value && item.unit ? `${item.value} ${item.unit}` : ""],
  ["变化", item.delta || item.change || ""],
  ["口径", item.methodology || item.spec || item.status || ""],
  ["原文", item.original_url ? "已记录微信原文链接" : ""],
].filter(([, value]) => value);

const sourceUrl = (item) => item.original_url || item.url || "";

const categoryGuidance = (item) => {
  const category = item.category || item.type || item.severity || "";
  if (/政策|安全|监管|标准/.test(category)) {
    return {
      meaning: "这类信息主要影响储能项目准入、并网运行、安全合规和后续监管口径。",
      tracking: "配套细则、地方落地文件、企业整改要求和监管问责案例会影响实际执行。",
    };
  }
  if (/数据|价格|材料|出口/.test(category)) {
    return {
      meaning: "这类信息用于观察供需变化、价格拐点和产业景气度。",
      tracking: "连续时间序列、统计口径、样本范围和专业数据源差异会影响结论。",
    };
  }
  if (/招投标|项目/.test(category)) {
    return {
      meaning: "这类信息反映储能项目需求释放、应用场景变化和区域建设节奏。",
      tracking: "招标公告、中标候选人、业主单位、容量规模、技术路线和投运进度是项目判断的关键字段。",
    };
  }
  if (/企业|IPO/.test(category)) {
    return {
      meaning: "这类信息反映企业产能、订单、资本动作和竞争格局变化。",
      tracking: "公告原文、财报、招股书、产能兑现、客户结构和海外合规风险会影响企业判断。",
    };
  }
  if (/法律|纠纷|诉讼|专利/.test(category)) {
    return {
      meaning: "这类信息反映锂电与储能企业在专利、技术秘密、合同履约等方面的风险暴露。",
      tracking: "法院公告、裁判文书、交易所问询和企业公告通常比媒体线索更适合作为判断依据。",
    };
  }
  return {
    meaning: "这条信息是新能源产业日报中的可追溯信息节点。",
    tracking: "来源、时间序列和结构化字段越完整，越便于读者判断事件价值。",
  };
};

const buildArticleParagraphs = (item, summary) => {
  if (Array.isArray(item.body) && item.body.length) return item.body;
  const guide = categoryGuidance(item);
  const date = displayDate(item.date || item.as_of);
  const category = item.category || item.type || item.severity || item.location || "产业动态";
  const valueText = item.value && item.unit
    ? `当前站内记录的核心数值为 ${item.value}${item.unit}${item.delta || item.change ? `，变化为 ${item.delta || item.change}` : ""}。`
    : "";
  const sourceText = `${item.source || "来源未标注"}${date ? `在 ${date}` : ""}发布或披露了这条${category}信息。`;

  return [
    `${sourceText}站内已保留标题、摘要、来源、日期、正文整理和来源链接，读者可优先阅读本页内容。`,
    summary,
    valueText || guide.meaning,
    valueText ? guide.meaning : guide.tracking,
    valueText ? guide.tracking : "来源链接作为出处保留；若来源失效，仍应优先参考官方公告、交易所披露、企业公告或可信镜像来源。",
  ].filter(Boolean);
};

const buildKeyPoints = (item, summary) => {
  if (Array.isArray(item.key_points) && item.key_points.length) return item.key_points;
  const points = [
    `信息类别：${item.category || item.type || item.severity || item.location || "产业信息"}`,
    `核心摘要：${summary}`,
  ];
  if (item.value && item.unit) {
    points.push(`核心数值：${item.value}${item.unit}${item.delta || item.change ? `，${item.delta || item.change}` : ""}`);
  }
  if (item.methodology || item.spec || item.status) {
    points.push(`统计/事件口径：${item.methodology || item.spec || item.status}`);
  }
  points.push(`来源复核：${item.source || "来源未标注"}${item.url ? "，原始链接已保留" : ""}`);
  return points;
};

const htmlBody = (item) => item.clean_html || item.body_html || item.content_html || item.article_html || "";

const isSafeUrl = (value, allowDataImage = false) => {
  if (!value) return false;
  const trimmed = String(value).trim();
  if (allowDataImage && /^data:image\/(?:png|jpe?g|gif|webp);base64,/i.test(trimmed)) return true;
  return /^(https?:)?\/\//i.test(trimmed) || /^\.{0,2}\//.test(trimmed);
};

const sanitizeArticleHtml = (html) => {
  const template = document.createElement("template");
  template.innerHTML = String(html || "");
  const allowedTags = new Set([
    "P", "BR", "STRONG", "B", "EM", "I", "U", "S", "A", "IMG",
    "H2", "H3", "H4", "UL", "OL", "LI", "BLOCKQUOTE", "FIGURE", "FIGCAPTION",
    "SECTION", "DIV", "SPAN", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD", "HR",
  ]);
  const dropTags = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "FORM", "INPUT", "BUTTON", "TEXTAREA", "SELECT", "LINK", "META"]);
  const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_ELEMENT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((originalNode) => {
    let node = originalNode;
    if (dropTags.has(node.tagName)) {
      node.remove();
      return;
    }
    if (!allowedTags.has(node.tagName)) {
      while (node.firstChild) node.parentNode.insertBefore(node.firstChild, node);
      node.remove();
      return;
    }

    if (node.tagName === "IMG") {
      const lazySrc = node.getAttribute("src") || node.getAttribute("data-src") || node.getAttribute("data-original");
      if (lazySrc) node.setAttribute("src", lazySrc);
    }

    [...node.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value;
      const keep = (
        (node.tagName === "A" && name === "href" && isSafeUrl(value))
        || (node.tagName === "IMG" && ["src", "alt", "title"].includes(name))
        || (["TH", "TD"].includes(node.tagName) && ["colspan", "rowspan"].includes(name))
      );
      if (!keep) node.removeAttribute(attr.name);
    });

    if (node.tagName === "A") {
      node.target = "_blank";
      node.rel = "noreferrer";
    }
    if (node.tagName === "IMG") {
      const src = node.getAttribute("src");
      if (!isSafeUrl(src, true)) {
        node.remove();
        return;
      }
      node.setAttribute("src", src);
      node.loading = "lazy";
      node.referrerPolicy = "no-referrer";
      if (!node.alt) node.alt = "正文图片";
    }
  });

  return template.innerHTML;
};

const renderBody = (item, summary) => {
  const inlineHtml = sanitizeArticleHtml(htmlBody(item));
  const keyPoints = buildKeyPoints(item, summary);
  if (inlineHtml.trim()) {
    document.querySelector(".article-body").innerHTML = `<div class="article-prose article-html">${inlineHtml}</div>`;
  } else {
    const paragraphs = buildArticleParagraphs(item, summary);
    document.querySelector(".article-body").innerHTML = `
      <div class="article-prose">
        ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
    `;
  }
  document.querySelector(".article-keypoints").innerHTML = keyPoints.map((point) => `
    <span>${escapeHtml(point)}</span>
  `).join("");
};

const renderRelated = (currentItem, allItems) => {
  const currentCategory = currentItem.category || currentItem.type || currentItem.severity || "";
  const related = allItems
    .filter((entry) => entry.id !== currentItem.id)
    .filter((entry) => (entry.category || entry.type || entry.severity || "") === currentCategory)
    .sort((a, b) => dateValue(b) - dateValue(a))
    .slice(0, 4);
  const list = document.querySelector(".related-list");
  if (!list) return;

  if (!related.length) {
    list.innerHTML = `<p class="empty-related">暂未找到同类信息，后续采集后会自动补齐。</p>`;
    return;
  }

  list.innerHTML = related.map((entry) => `
    <a class="related-item" href="./article.html?id=${escapeHtml(entry.id)}">
      <span>${escapeHtml(entry.source || "来源未标注")} · ${escapeHtml(displayDate(entry.date || entry.as_of))}</span>
      <strong>${escapeHtml(itemTitle(entry))}</strong>
    </a>
  `).join("");
};

const renderArticle = (item) => {
  const credibility = getCredibility(item);
  const title = itemTitle(item);
  const summary = item.summary || item.methodology || item.spec || "该条信息目前只保留基础索引字段，站内正文会根据来源、分类和结构化字段生成。";

  document.title = `NeoLink | ${title}`;
  document.querySelector(".article-meta").innerHTML = `
    <em class="grade-${credibility.grade.toLowerCase()}">${credibility.label}</em>
    <span>${escapeHtml(item.source || "来源未标注")}</span>
    <small>${escapeHtml(item.category || item.type || item.severity || item.location || "信息")}</small>
    <time>${escapeHtml(displayDate(item.date || item.as_of))}</time>
  `;
  document.querySelector(".article-title").textContent = title;
  document.querySelector(".article-summary").textContent = summary;
  document.querySelector(".article-actions").innerHTML = `
    <a class="primary-action" href="./news-more.html?section=latest">返回列表</a>
    ${sourceUrl(item) ? `<a class="secondary-action" href="${escapeHtml(sourceUrl(item))}" target="_blank" rel="noreferrer">来源链接</a>` : ""}
  `;

  document.querySelector(".article-facts").innerHTML = factRows(item).map(([label, value]) => `
    <li><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></li>
  `).join("");

  renderBody(item, summary);
  renderRelated(item, items);

  document.querySelector(".article-source").innerHTML = `
    <dt>站内正文</dt>
    <dd>正文优先采用站内重写和结构化整理，覆盖事件背景、核心事实、数据口径、产业影响和关键风险，降低读者跳转原文的必要性。</dd>
    <dt>版权边界</dt>
    <dd>第三方媒体和公众号内容不整篇照搬；页面保留事实性改写、必要短摘、图片信息和来源链接。官方公开文件可保留更完整摘录。</dd>
    <dt>来源链接</dt>
    <dd>${sourceUrl(item) ? `<a href="${escapeHtml(sourceUrl(item))}" target="_blank" rel="noreferrer">${escapeHtml(sourceUrl(item))}</a>` : "暂无公开来源链接。"}</dd>
  `;
};

const renderMissing = () => {
  document.querySelector(".article-card").innerHTML = `
    <h2 class="article-title">没有找到这条信息</h2>
    <p class="article-summary">可能是 feed 数据已更新或链接参数过期。请返回内容索引重新打开。</p>
    <div class="article-actions"><a class="primary-action" href="./news-more.html?section=latest">返回内容索引</a></div>
  `;
  document.querySelector(".article-detail-layout").hidden = true;
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const encodedId = id ? encodeURIComponent(id) : "";
const items = collectItems();
const item = items.find((entry) => entry.id === id || entry.id === encodedId || entry.raw_id === id) || (!id ? items[0] : null);

if (item) {
  renderArticle(item);
} else {
  renderMissing();
}
