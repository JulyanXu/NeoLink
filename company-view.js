window.NeoLinkCompanies = (() => {
  const db = window.NeoLinkEnterpriseDB || { nodes: [], edges: [], sources: [], roles: {}, meta: {} };
  const nodes = new Map(db.nodes.map((node) => [node.id, node]));
  const sources = new Map(db.sources.map((source) => [source.id, source]));
  const companies = db.nodes.filter((node) => node.type === 'company');
  const snapshot = db.meta.version || db.meta.generated_at?.slice(0, 10) || '日期未标注';
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
  const safeUrl = (value) => {
    try {
      const url = new URL(value);
      return /^https?:$/.test(url.protocol) ? url.href : '';
    } catch {
      return '';
    }
  };
  const sourceFor = (ids = []) => [...new Set(ids)].map((id) => sources.get(id)).filter(Boolean);
  const linkedSources = (ids = []) => sourceFor(ids).filter((source) => safeUrl(source.url));
  const relationsFor = (id) => db.edges.filter((edge) =>
    (edge.from === id || edge.to === id) && nodes.has(edge.from) && nodes.has(edge.to)
    && edge.confidence !== 'invalid' && linkedSources(edge.sourceIds).length);
  const roleLabel = (node) => db.roles[node.role]?.label || node.role || '角色未标注';
  const typeLabel = (node) => ({ company: '企业', project: '项目', market: '市场', segment: '产业链环节' })[node.type] || '资料节点';
  const confidenceLabel = (value) => ({ high: '高', medium: '中', low: '低' })[value] || '未标注';
  const relationLabel = (value) => ({
    technology: '技术 / 分类', supply: '材料环节', same_rank: '榜单关联',
    project: '项目 / 政策', customer: '电芯生态线索', market: '市场连接',
  })[value] || '原库关系';
  const sourceAnchor = (source) => {
    const url = safeUrl(source.url);
    return url ? `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(source.name)} ↗</a>` : escape(source.name);
  };

  function render({ query = '', role = 'all' } = {}) {
    const availableRoles = Object.keys(db.roles).filter((key) => companies.some((node) => node.role === key));
    const selectedRole = availableRoles.includes(role) ? role : 'all';
    const search = String(query).trim().toLocaleLowerCase();
    const visible = companies.filter((node) => (selectedRole === 'all' || node.role === selectedRole)
      && [node.name, node.shortName, node.country, node.region, node.summary, roleLabel(node)]
        .join(' ').toLocaleLowerCase().includes(search))
      .sort((a, b) => b.importance - a.importance);
    const roleFilters = [{ id: 'all', label: '全部企业', count: companies.length },
      ...availableRoles.map((id) => ({ id, label: db.roles[id].label, count: companies.filter((node) => node.role === id).length }))];

    return `<section class="company-directory" aria-label="企业索引">
      <header class="company-intro section-heading">
        <div><p class="kicker">COMPANY ATLAS / 企业索引</p><h1>产业链，沿关系展开。</h1>
        <p class="muted">从企业角色进入，追溯材料、技术、项目与市场之间的历史线索。</p></div>
        <div class="company-snapshot"><strong>${companies.length}</strong><span>家归档企业</span>
        <small>资料快照 · ${escape(snapshot)}</small></div>
      </header>
      <div class="company-filters" role="group" aria-label="按产业链角色筛选">
        ${roleFilters.map((filter) => `<button type="button" class="filter-chip${selectedRole === filter.id ? ' active' : ''}"
          data-company-role="${escape(filter.id)}" aria-pressed="${selectedRole === filter.id}">${escape(filter.label)} <span>${filter.count}</span></button>`).join('')}
      </div>
      <div class="company-results-meta"><p class="muted" role="status">${search ? `“${escape(String(query).trim())}” · ` : ''}显示 ${visible.length} / ${companies.length} 家企业</p>
        <p class="muted">按原库关注度排序 · 关联数指有来源的关系线索</p></div>
      ${visible.length ? `<div class="company-grid">${visible.map((node) => {
        const relations = relationsFor(node.id);
        return `<article class="company-card">
          <div class="company-card-top"><span class="tag">${escape(roleLabel(node))}</span><span class="company-short muted">${escape(node.shortName)}</span></div>
          <h2><button class="company-name" type="button" data-company="${escape(node.id)}">${escape(node.name)}</button></h2>
          <p class="company-region muted">${escape(node.country)} · ${escape(node.region)}</p>
          <p class="company-summary">${escape(node.summary)}</p>
          <div class="company-meta"><span><strong>${relations.length}</strong> 条有来源的关系线索</span>
            <button type="button" class="text-button" data-company="${escape(node.id)}" aria-label="查看${escape(node.name)}的归档资料">查看档案 <span aria-hidden="true">↗</span></button></div>
        </article>`;
      }).join('')}</div>` : `<div class="empty-state"><h2>暂未找到匹配企业</h2><p class="muted">试试企业简称、地区或其他产业链角色。</p><button type="button" class="text-button" data-company-role="all">查看全部角色</button></div>`}
      <p class="company-footnote muted">归档口径：${escape(snapshot)}。企业身份、简介与关系均沿用该快照；分类与同榜关系不代表商业合作。</p>
    </section>`;
  }

  function detail(id) {
    const node = nodes.get(id);
    if (!node) return '<div class="empty-state"><h2 id="company-detail-title">未找到该资料</h2><p class="muted">请返回企业索引重新选择。</p></div>';
    const relations = relationsFor(id);
    const allSources = sourceFor([
      ...(node.sourceIds || []), ...(node.metrics || []).flatMap((metric) => metric.sourceIds || []),
      ...relations.flatMap((edge) => edge.sourceIds || []),
    ]);
    const metrics = (node.metrics || []).filter((metric) => metric.value !== undefined && metric.value !== '');
    return `<div class="company-detail">
      <header class="company-detail-header"><p class="kicker">${escape(typeLabel(node))}档案 / ${escape(node.shortName)}</p>
        <h2 id="company-detail-title">${escape(node.name)}</h2>
        <div class="company-detail-tags"><span class="tag">${escape(roleLabel(node))}</span><span class="muted">${escape(node.country)} · ${escape(node.region)}</span></div>
        <p class="company-detail-summary">${escape(node.summary)}</p>
        <p class="muted">历史资料快照 · ${escape(snapshot)} · 企业身份与资料可能已变化</p>
      </header>
      <section class="company-detail-section" aria-label="归档信息"><h3>归档信息</h3>
        <dl class="company-facts"><div><dt>原库身份</dt><dd>${escape(node.listing || '未标注')}</dd></div>
          ${metrics.map((metric) => `<div><dt>${escape(metric.label)}</dt><dd>${escape(metric.value)}</dd></div>`).join('')}
          <div><dt>有来源的关系线索</dt><dd>${relations.length} 条</dd></div>
          <div><dt>相关来源条目</dt><dd>${allSources.length} 个</dd></div></dl>
        <p class="muted">统计基于 ${escape(snapshot)} 归档节点与关联记录；原库未提供营收、产能等经营指标。</p>
      </section>
      <section class="company-detail-section" aria-label="历史关系线索"><div class="section-heading"><h3>沿关系继续探索</h3><span class="muted">${relations.length} 条线索</span></div>
        <p class="muted">保留原库关系标签与置信标注。分类、同榜及市场连接不能单独证明供货、投资或控制关系。</p>
        ${relations.length ? `<div class="company-relations">${relations.map((edge) => {
          const counterpart = nodes.get(edge.from === id ? edge.to : edge.from);
          return `<article class="company-relation"><div class="company-relation-top"><span class="tag">${escape(relationLabel(edge.type))}</span>
              <span class="muted">历史关系线索 · ${escape(confidenceLabel(edge.confidence))}置信（原库）</span></div>
            <p><button type="button" class="text-button" data-company="${escape(counterpart.id)}">${escape(counterpart.name)} ↗</button> <span class="muted">${escape(typeLabel(counterpart))}</span></p>
            <p>${escape(edge.label)}</p><p class="company-relation-sources muted">来源：${linkedSources(edge.sourceIds).map(sourceAnchor).join(' · ')}</p></article>`;
        }).join('')}</div>` : '<p class="muted">该快照暂未收录有来源的关系线索。</p>'}
      </section>
      <section class="company-detail-section" aria-label="资料来源"><h3>回到来源核验</h3>
        <p class="muted">部分来源为机构或披露入口页，具体事实仍需定位对应公告或报道。</p>
        <ol class="company-sources">${allSources.map((source) => `<li><strong>${sourceAnchor(source)}</strong>
          <p class="muted">${escape(source.publisher)}</p><p>${escape(source.usedFor)}</p></li>`).join('')}</ol>
      </section>
      ${node.type === 'company' ? `<a class="text-button" href="./news-more.html?q=${escape(encodeURIComponent(node.name))}">查找 ${escape(node.name)} 相关动态 ↗</a>` : ''}
    </div>`;
  }

  return { render, detail, count: companies.length };
})();
