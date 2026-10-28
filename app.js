(() => {
  'use strict';
  const D = window.NeoLinkData;
  const main = document.querySelector('#content');
  if (!D) { main.innerHTML = '<div class="empty-state"><h1>情报暂未载入</h1><p>请刷新页面，或稍后再试。</p></div>'; return; }
  const feed = D.buildFeed(window.NEOLINK_FEED);
  const C = window.NeoLinkCompanies;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const articleUrl = item => './article.html?id=' + encodeURIComponent(item.id);
  const shortDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') ? value.slice(5).replace('-', '.') : '未标注';
  const timestamp = value => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '未标注' : date.toLocaleString('sv-SE', {timeZone:'Asia/Shanghai',hour12:false}).slice(0,16);
  };
  const names = {overview:'情报总览',news:'全部动态',projects:'项目进程',companies:'产业链企业',numbers:'数字观察',saved:'我的收藏',sources:'来源与口径',article:'报道详情'};
  const storeKey = 'neolink-saved-v3';
  let saved;
  try { const value = JSON.parse(localStorage.getItem(storeKey) || '[]'); saved = new Set(Array.isArray(value) ? value.filter(x => typeof x === 'string') : []); } catch { saved = new Set(); }
  let state;
  let toastTimer;
  let searchTimer;
  const dialog = document.querySelector('#detail-dialog');
  const search = document.querySelector('#global-search');
  function readState() {
    const p = new URLSearchParams(location.search);
    const file = location.pathname.split('/').pop();
    const view = file === 'article.html' ? 'article' : file === 'enterprise-map.html' ? 'companies' : file === 'news-more.html' ? 'news' : p.get('view') || 'overview';
    return {view:Object.hasOwn(names,view) ? view : 'overview', query:p.get('q') || '', category:D.categories.includes(p.get('category')) ? p.get('category') : 'all', topic:D.topics.includes(p.get('topic')) ? p.get('topic') : 'all', period:['7d','30d'].includes(p.get('period')) ? p.get('period') : 'all', sort:p.get('sort') === 'oldest' ? 'oldest' : 'newest', role:p.get('role') || 'all', kind:['容量','价格','金额'].includes(p.get('kind')) ? p.get('kind') : 'all', id:p.get('id') || '', section:p.get('section') === 'headlines' ? 'headlines' : ''};
  }
  function urlFor(next) {
    const p = new URLSearchParams();
    let file = 'index.html';
    if (next.view === 'news') file = 'news-more.html';
    else if (next.view === 'companies') file = 'enterprise-map.html';
    else if (next.view === 'article') { file = 'article.html'; p.set('id',next.id); }
    else if (next.view !== 'overview') p.set('view',next.view);
    for (const [key,param] of Object.entries({query:'q',category:'category',topic:'topic',period:'period',sort:'sort',role:'role',kind:'kind',section:'section'})) {
      if (next[key] && next[key] !== 'all' && next[key] !== 'newest') p.set(param,next[key]);
    }
    return './'+file+(p.size ? '?'+p.toString() : '');
  }
  function update(patch, replace = false) {
    const pending = searchTimer ? {query:search.value,...(['overview','sources','article'].includes(state.view)?{view:'news'}:{})} : {};
    clearTimeout(searchTimer); searchTimer = null;
    state = {...state,...pending,...patch};
    history[replace ? 'replaceState' : 'pushState']({},'',urlFor(state));
    render();
  }
  const hasFilters = () => state.query || state.category !== 'all' || state.topic !== 'all' || state.period !== 'all' || state.section;
  const visibleItems = (items = feed.items) => D.filterItems(items,{...state,savedIds:saved,onlySaved:state.view === 'saved'});
  const linkTo = (view, patch = {}) => urlFor({...readState(),query:'',category:'all',topic:'all',period:'all',role:'all',kind:'all',section:'',sort:'newest',view,...patch});
  const banner = (title,text) => `<div class="info-banner"><strong>${esc(title)}</strong><span>${esc(text)}</span></div>`;
  function intro(kicker,title,description) {
    return `<div class="page-intro"><div><div class="eyebrow"><span class="rule"></span><span class="kicker">${esc(kicker)}</span></div><h1>${title}</h1><p>${esc(description)}</p></div><div class="date-stamp"><strong>${esc(shortDate(feed.latestDate))}</strong>最近报道日期 / ${esc(feed.latestDate.slice(0,4))}</div></div>`;
  }
  function saveButton(item, full = false) {
    const active = saved.has(item.id);
    return `<button class="save-button ${active ? 'saved' : ''}" type="button" data-save="${esc(item.id)}" aria-pressed="${active}" aria-label="${active?'取消收藏':'收藏'}：${esc(item.title)}">${full?(active?'已收藏':'收藏报道'):(active?'✓':'＋')}</button>`;
  }
  function tags(item, facts = true) {
    return `<div class="row-tags">${/论坛|议程/.test(item.title)?'<span class="tag">活动议程</span>':''}${item.topics.slice(0,2).map(t=>`<button type="button" class="tag topic-tag" data-topic="${esc(t)}">${esc(t)}</button>`).join('')}${facts ? item.facts.slice(0,2).map(f=>`<span class="tag fact-tag" title="标题中的${esc(f.kind)}，不代表已实现">${esc(f.value)}</span>`).join('') : ''}${!item.topics.length && !item.facts.length ? '<span class="tag">公开报道</span>' : ''}</div>`;
  }
  function meta(item) { return `<div class="meta"><span class="category">${esc(item.category)}</span><span class="meta-divider"></span><span>${esc(item.source || '来源未标注')}</span></div>`; }
  function newsRow(item) {
    return `<article class="news-row"><time class="row-date" datetime="${esc(item.date)}">${esc(item.date.slice(5,7))} 月<strong>${esc(item.date.slice(8,10)||'—')}</strong></time><div>${meta(item)}<h3><a href="${esc(articleUrl(item))}">${esc(item.title)}</a></h3>${item.displaySummary?`<p class="row-summary">${esc(item.displaySummary)}</p>`:''}${tags(item)}</div>${saveButton(item)}</article>`;
  }
  function empty(title = '没有匹配的报道', text = '试试其他关键词，或清除筛选条件。') {
    return `<div class="empty-state"><p class="kicker">SPACE FOR YOUR NEXT DISCOVERY</p><h2>${esc(title)}</h2><p>${esc(text)}</p><button type="button" class="primary-button" data-reset>清除筛选</button></div>`;
  }
  function tabs() {
    return `<div class="filter-tabs" role="group" aria-label="按主分类筛选">${['all',...D.categories].map(c=>`<button type="button" data-category="${esc(c)}" aria-pressed="${state.category===c}" class="${state.category===c?'active':''}">${c==='all'?'全部':esc(c)}</button>`).join('')}</div>`;
  }
  function filters() {
    const active = [['query',state.query ? '搜索：'+state.query : ''],['topic',state.topic !== 'all' ? state.topic : ''],['section',state.section ? '首页重点' : '']].filter(([,v])=>v);
    return active.length ? `<div class="active-filters">${active.map(([k,v])=>`<button class="active-filter" data-clear="${k}" type="button">${esc(v)} ×</button>`).join('')}<button class="text-link" type="button" data-reset>清除全部</button></div>`:'';
  }
  function toolbar(count, noun = '条报道') {
    return `<div class="toolbar"><span class="result-count" role="status">${count} ${noun}${state.query?' · 搜索“'+esc(state.query)+'”':''}</span><label for="period">发布日期</label><select id="period" data-select="period"><option value="all" ${state.period==='all'?'selected':''}>全部时间</option><option value="7d" ${state.period==='7d'?'selected':''}>近 7 天</option><option value="30d" ${state.period==='30d'?'selected':''}>近 30 天</option></select><label for="sort" class="sr-only">排序</label><select id="sort" data-select="sort"><option value="newest" ${state.sort==='newest'?'selected':''}>由新到旧</option><option value="oldest" ${state.sort==='oldest'?'selected':''}>由旧到新</option></select></div>`;
  }
  function rail() {
    const maxTopic = Math.max(1,...feed.topicCounts.map(t=>t.count));
    return `<aside class="right-rail" aria-label="主题与覆盖"><section class="rail-block"><div class="rail-head"><h2>主题雷达</h2><span>TOPICS / ${feed.topicCounts.length}</span></div>${feed.topicCounts.map((t,i)=>`<button type="button" class="topic-row" data-topic="${esc(t.name)}"><span class="topic-rank">0${i+1}</span><strong>${esc(t.name)}</strong><span class="topic-bar" aria-hidden="true"><i style="width:${t.count/maxTopic*100}%"></i></span><span class="topic-count">${t.count}</span></button>`).join('')}<p class="caption">按标题关键词聚合 · 数字为收录报道数<br>同一报道可属于多个主题。</p></section><section class="rail-block"><div class="rail-head"><h2>看见信息的边界</h2><a href="${linkTo('sources')}" class="text-link">口径 ↗</a></div><div class="coverage-head"><span>新闻来源</span><strong>${feed.counts.sourceCount}<small> 个</small></strong></div><p class="caption">${feed.sources.map(s=>esc(s.name)).join('、') || '暂无来源'}</p><div class="coverage-bar" aria-hidden="true">${feed.categories.map((c,i)=>`<i style="flex:${c.count};opacity:${1-i*.12}"></i>`).join('')}</div><div class="coverage-list">${feed.categories.map(c=>`<span>${esc(c.name)}<b>${c.count}</b></span>`).join('')}</div><div class="insight-note"><h3>样本分布 ≠ 行业全貌</h3><p>这里展示当前收录内容的覆盖情况；单一媒体和有限样本，不能代表市场规模或行业热度。</p></div></section><section class="rail-block"><div class="rail-head"><h2>从企业开始，延伸阅读</h2></div><p class="section-note">沿材料、电芯、系统集成与项目关系，展开产业链。</p><a class="text-link" href="${linkTo('companies')}">探索 ${C?.count || 0} 家归档企业 ↗</a></section></aside>`;
  }
  function overview() {
    const selected = visibleItems();
    const lead = feed.headlines[0] || feed.items[0];
    const side = feed.headlines.slice(1,3);
    return `${intro('ENERGY INTELLIGENCE / VOL. 03','<span class="overview-heading">读懂变化，<em>连接产业。</em></span>','从一条报道，到一个产业视角。把政策、项目与企业的变化放在一起看。')}<div class="stats-strip" aria-label="当前收录统计"><div class="stat"><strong class="stat-number">${feed.counts.total}</strong><span class="stat-label">去重报道<small>当前收录快照</small></span></div><div class="stat"><strong class="stat-number">${feed.counts.latestDay}</strong><span class="stat-label">最近一日<small>${esc(feed.latestDate || '暂无报道')}</small></span></div><div class="stat"><strong class="stat-number">${feed.counts.projectCount}</strong><span class="stat-label">项目报道<small>不同阶段分别阅读</small></span></div><div class="stat"><strong class="stat-number">${feed.counts.sourceCount}</strong><span class="stat-label">新闻来源<small>追溯原始出处</small></span></div></div>${lead ? `<section class="lead-grid" aria-label="重点阅读"><article class="lead-story"><div class="eyebrow"><span class="kicker">IN FOCUS / 重点阅读</span><span class="tag">${esc(lead.topics[0] || lead.category)}</span></div><h2><a href="${esc(articleUrl(lead))}">${esc(lead.title)}</a></h2><div class="story-bottom"><span>${esc(lead.source)} · ${esc(lead.date)}</span><a class="story-cta" href="${esc(articleUrl(lead))}">阅读与溯源 ↗</a></div></article><div class="focus-side">${side.map((item,i)=>`<article class="focus-row"><span class="focus-number">0${i+2}</span><div><div class="meta"><span class="category">${esc(item.category)}</span><span>· ${esc(shortDate(item.date))}</span></div><h3><a href="${esc(articleUrl(item))}">${esc(item.title)}</a></h3></div></article>`).join('')}</div></section>`:''}<div class="content-grid"><section><div class="section-head"><div><span class="kicker">THE SIGNAL STREAM</span><h2>产业动态</h2></div><a class="text-link" href="${linkTo('news')}">全部 ${feed.counts.total} 条 ↗</a></div>${tabs()}${selected.slice(0,7).map(newsRow).join('') || empty()}<a class="read-all" href="${linkTo('news',{category:state.category})}">继续浏览${state.category==='all'?'全部动态':esc(state.category)} →</a><p class="caption">内容整理时间 ${esc(timestamp(feed.generatedAt))}（北京时间）；报道日期与整理时间分别展示。</p></section>${rail()}</div>`;
  }
  function news() {
    const collection = state.section === 'headlines' ? feed.headlines : feed.items;
    const items = visibleItems(collection);
    const isSaved = state.view === 'saved';
    const missing = [...saved].filter(id=>!feed.items.some(i=>i.id===id)).length;
    return `${intro(isSaved?'YOUR RESEARCH SHELF':'THE SIGNAL STREAM',isSaved?'把值得追踪的，留下来。':'每一条动态，都有上下文。',isSaved?'收藏保存在当前浏览器，方便下次继续阅读。':'按分类、主题与日期交叉筛选，在报道之间发现关联。')}${isSaved&&missing?banner('历史收藏',`${missing} 条收藏已不在当前内容快照中；保留收藏标记，原条目重新收录后可继续阅读。`):''}<div class="content-grid"><section>${toolbar(items.length)}${tabs()}${filters()}${items.length?items.map(newsRow).join(''):isSaved&&!hasFilters()?`<div class="empty-state"><p class="kicker">YOUR NEXT INSIGHT STARTS HERE</p><h2>为有价值的线索，留一个位置。</h2><p>点击报道旁的“＋”收藏，相关资料会出现在这里。收藏仅保存在本机浏览器。</p><a class="primary-button" href="${linkTo('news')}">去发现产业动态 ↗</a></div>`:empty()}</section>${rail()}</div>`;
  }
  function projects() {
    const items = visibleItems(feed.items.filter(i=>i.category==='项目招标'));
    const stages = ['规划/推介','招标/采购','中标/公示','建设/并网','未明确'];
    return `${intro('PROJECT WATCH / 过程视角','看项目，也看它走到了哪一步。','按报道中明确出现的阶段整理。规划、采购与投运，代表不同的产业信号。')}${banner('报道阶段 ≠ 项目台账','阶段按标题关键词识别，尚未逐个项目人工核验；规划栏包含竞配与备案。周报、区域装机与企业储备单列为观察；不同阶段和单位不加总。')}${toolbar(items.length)}${filters()}<div class="project-board">${stages.map(stage=>{const group=items.filter(i=>i.stage===stage);return `<section class="project-column"><h2>${stage==='未明确'?'项目观察 / 阶段待核':esc(stage)}<span>${group.length}</span></h2>${group.map(item=>`<article class="project-card"><div class="meta"><span class="category">${esc(item.province||'地区待确认')}</span><time>${esc(item.date)}</time></div><h3><a href="${esc(articleUrl(item))}">${esc(item.title)}</a></h3>${tags(item)}<div class="project-foot"><a href="${esc(articleUrl(item))}" class="text-link">核对来源 ↗</a>${saveButton(item)}</div></article>`).join('')||'<p class="project-empty">当前筛选下暂无此阶段报道。</p>'}</section>`}).join('')}</div>`;
  }
  function numbers() {
    const items = visibleItems();
    const rows = items.flatMap(item=>item.facts.filter(f=>state.kind==='all'||f.kind===state.kind).map(f=>({item,f})));
    return `${intro('NUMBERS WITH CONTEXT','数字，回到它的语境里。','把散落在标题里的规模、报价与金额集中阅读，每一项都能回到对应报道。')}${banner('标题事实摘录','以下数值从报道标题提取。规划、储备、投资意向与已落地数据保留原文语义；不自动求和，不作为实时行情或完整财务指标。')}<div class="filter-tabs" role="group" aria-label="数字类型">${['all','容量','价格','金额'].map(k=>`<button data-kind="${esc(k)}" aria-pressed="${state.kind===k}" class="${state.kind===k?'active':''}" type="button">${k==='all'?'全部数字':esc(k)}</button>`).join('')}</div><div style="margin-top:20px">${toolbar(rows.length,'项标题数字')}</div>${filters()}${rows.length?`<p class="table-hint">左右滑动表格，查看完整报道语境与日期。</p><div class="data-table-wrap"><table class="data-table"><thead><tr><th scope="col">标题原始数值</th><th scope="col">类型</th><th scope="col">语境 / 对应报道</th><th scope="col">发布日期</th></tr></thead><tbody>${rows.map(({item,f})=>`<tr><td>${esc(f.value)}</td><td>${esc(f.kind)}</td><td><a href="${esc(articleUrl(item))}">${esc(item.title)}</a><small>${esc(item.source)} · ${esc(item.stage==='未明确'?'未识别具体项目阶段':item.stage)}</small></td><td>${esc(item.date)}</td></tr>`).join('')}</tbody></table></div>`:empty('当前筛选没有可摘录的数字','来源未提供明确的对应数字时，这里保持为空；可尝试其他数字类型。')}<p class="caption">展示范围：标题明确写出的 MW / MWh / GW / GWh、元/Wh 等报价及亿元金额。币种、统计对象、财务口径以原文为准。</p>`;
  }
  function sources() {
    const archived = window.NeoLinkEnterpriseDB?.meta?.version || '未标注';
    return `${intro('SOURCE TRANSPARENCY','先知道依据，再形成判断。','把采集时间、内容来源与自动整理规则放在明处。')}<div class="source-grid"><section class="source-panel"><span class="kicker">NEWS / 内容快照</span><h2>${feed.counts.total} 条报道，${feed.counts.sourceCount} 个新闻来源</h2><p>当前内容按原始来源 URL 去重，首页推荐与多个栏目重复收录只计一次。</p><dl><div><dt>来源</dt><dd>${feed.sources.map(s=>esc(s.name)).join('、')||'未标注'}</dd></div><div><dt>内容整理时间</dt><dd>${esc(timestamp(feed.generatedAt))} +08:00</dd></div><div><dt>报道日期范围</dt><dd>${esc(feed.earliestDate)} — ${esc(feed.latestDate)}</dd></div><div><dt>最近发布日期的报道</dt><dd>${feed.counts.latestDay} 条</dd></div></dl></section><section class="source-panel"><span class="kicker">ATLAS / 企业资料</span><h2>${C?.count||0} 家企业的历史资料</h2><p>企业目录与新闻使用不同的数据集与更新周期，不能把企业资料日期当作新闻更新时间。</p><dl><div><dt>企业资料快照</dt><dd>${esc(archived)}</dd></div><div><dt>关系依据</dt><dd>沿用原库来源与置信标记</dd></div><div><dt>浏览器收藏</dt><dd>仅存本机，可随时取消</dd></div></dl><a class="text-link" href="${linkTo('companies')}">查看历史企业资料 ↗</a></section></div><section class="source-methodology"><h2>如何整理这些信息</h2>${[['01','主题与分类','明确的政策发布、企业财报与海外市场综述按标题规则整理分类，详情保留原始分类；IPO 归入企业技术。主题按标题关键词识别，可跨栏目交叉，一个标题可匹配多个主题。它们是阅读线索，不是行业热度排名。'],['02','阶段与数值','项目阶段与数字均来自标题明确词语。周报、区域存量与企业储备不视作单个项目进度；数字保留上下文，不同单位、时间及阶段不合计。'],['03','来源与核验','新闻源数据记录的核验方式主要为公开列表的标题、日期及 URL 核对，不等同官方原始文件或多个独立信源的交叉核验。每篇详情显示原始方法与原文链接。'],['04','更新与缺口','页面版本升级不改变内容更新时间。数据缺失时显示空状态；单一来源覆盖有限，不用无依据的折线、涨跌或“实时”标签填补。']].map(([n,t,p])=>`<div class="method-row"><span>${n}</span><strong>${t}</strong><p>${p}</p></div>`).join('')}</section>`;
  }
  function article() {
    // Legacy metric links resolve to the underlying news, with its actual scope.
    const id = state.id.replace(/^metric-/,'');
    const item = feed.items.find(i=>i.id.toLowerCase()===id.toLowerCase());
    if (!item) return `<div class="article-page"><a class="text-link back-link" href="${linkTo('news')}">← 返回全部动态</a>${empty('这条报道不在当前快照中','新闻列表会随采集更新。请返回动态列表搜索标题或企业，查找当前可用资料。')}</div>`;
    const related = feed.items.filter(i=>i.id!==item.id && i.topics.some(t=>item.topics.includes(t))).slice(0,4);
    document.title = `${item.title} · NeoLink`;
    return `<article class="article-page"><a class="text-link back-link" href="${linkTo('news')}">← 返回全部动态</a><div class="eyebrow"><span class="kicker">SOURCE NOTE / 报道索引</span></div>${meta(item)}<h1>${esc(item.title)}</h1><div class="meta"><time>${esc(item.date)}</time><span>·</span><span>发布日期</span>${item.province?`<span>· 标题提及 ${esc(item.province)}</span>`:''}</div><div class="article-actions">${item.url?`<a class="primary-button" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">阅读原文 ↗</a>`:''}${saveButton(item,true)}</div>${tags(item,false)}${item.facts.length?`<div class="article-facts">${item.facts.map(f=>`<div class="article-fact"><strong>${esc(f.value)}</strong><span>${esc(f.kind)} · 标题摘录</span></div>`).join('')}</div>`:''}<section class="article-section"><h2>阅读这条信息时</h2>${item.displaySummary?`<p>${esc(item.displaySummary)}</p>`:'<p>当前来源提供标题级索引，尚无可独立核验的详细摘要。请通过原文了解适用范围、项目条件与完整口径。</p>'}${item.stage!=='未明确'?`<p>标题识别阶段：<strong>${esc(item.stage)}</strong>。此标签用于整理报道，具体进度以原始公告为准。</p>`:''}${item.facts.length?'<p>以上数字来自标题；规划值、投资意向与实际完成值需结合原文区分。</p>':''}</section><section class="article-section"><h2>来源与整理依据</h2><dl><div><dt>报道来源</dt><dd>${esc(item.source||'未标注')}</dd></div><div><dt>原文日期</dt><dd>${esc(item.date||'未标注')}</dd></div><div><dt>分类依据</dt><dd>${esc(item.categoryMethod||'沿用来源分类 / IPO归入企业技术')}${item.originalCategory && item.originalCategory!==item.category?' · 原始分类：'+esc(item.originalCategory):''}</dd></div><div><dt>原记录方法</dt><dd>${esc(item.methodology||'源数据未提供核验方法')}</dd></div><div><dt>原始链接</dt><dd>${item.url?`<a class="text-link" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${esc(item.url)} ↗</a>`:'源数据未提供可用链接'}</dd></div></dl></section>${related.length?`<section class="article-section"><h2>沿同一主题，继续阅读</h2><p class="section-note">根据标题主题匹配，不表示报道之间存在业务关系。</p><div class="related-grid">${related.map(r=>`<a class="related-card" href="${esc(articleUrl(r))}"><small>${esc(r.category)} · ${esc(r.date)}</small>${esc(r.title)}</a>`).join('')}</div></section>`:''}</article>`;
  }
  function render() {
    document.querySelector('#breadcrumb-title').textContent = names[state.view];
    document.title = `${names[state.view]} · NeoLink 新能源产业情报`;
    search.value = state.query;
    search.placeholder = state.view==='companies'?'搜索企业、地区、产业链角色…':'搜索报道、企业、项目…';
    document.querySelectorAll('[data-nav]').forEach(a=>{const active=a.dataset.nav===state.view; a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.querySelector('#nav-total').textContent = feed.counts.total;
    document.querySelector('#saved-total').textContent = saved.size;
    const views = {overview,news,projects,numbers,saved:news,sources,article,companies:()=>C?C.render({query:state.query,role:state.role}):empty('企业资料暂未载入','请稍后刷新页面。')};
    main.innerHTML = views[state.view]();
  }
  function toast(message) {const element=document.querySelector('#toast');element.textContent=message;element.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>element.classList.remove('visible'),2300);}
  function syncTheme() {
    const dark = document.documentElement.dataset.theme==='dark';
    const button=document.querySelector('.theme-toggle');button.textContent=dark?'浅色':'深色';button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'切换浅色模式':'切换深色模式');
  }
  document.addEventListener('click', event=>{
    const button = event.target.closest('button');
    if (!button) return;
    if (button.matches('.theme-toggle')) { const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('neolink-theme',theme)}catch{}syncTheme();return; }
    if (button.matches('.menu-button')) {const open=document.body.classList.toggle('menu-open');button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'收起导航':'展开导航');return;}
    if (button.hasAttribute('data-close-dialog')) {dialog.close();return;}
    if (button.dataset.company) {document.querySelector('#dialog-content').innerHTML=C.detail(button.dataset.company);dialog.setAttribute('aria-labelledby','company-detail-title');if(!dialog.open)dialog.showModal();dialog.scrollTop=0;const heading=dialog.querySelector('#company-detail-title');heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});return;}
    if (button.dataset.save) {
      const id=button.dataset.save;if(saved.has(id))saved.delete(id);else saved.add(id);
      let persisted=true;try{localStorage.setItem(storeKey,JSON.stringify([...saved]))}catch{persisted=false}
      document.querySelectorAll('[data-save]').forEach(b=>{if(b.dataset.save!==id)return;const active=saved.has(id);b.classList.toggle('saved',active);b.setAttribute('aria-pressed',String(active));const item=feed.items.find(i=>i.id===id);b.setAttribute('aria-label',`${active?'取消收藏':'收藏'}：${item?.title||''}`);b.textContent=state.view==='article'?(active?'已收藏':'收藏报道'):(active?'✓':'＋');});
      document.querySelector('#saved-total').textContent=saved.size;if(state.view==='saved')render();toast(persisted?(saved.has(id)?'已收藏，可在“我的收藏”继续阅读':'已取消收藏'):'已记录于当前页面；浏览器未允许持久保存');return;
    }
    if (button.dataset.category) {update({category:button.dataset.category});main.querySelector(`[data-category="${CSS.escape(state.category)}"]`)?.focus({preventScroll:true});return;}
    if (button.dataset.topic) {update({view:'news',topic:button.dataset.topic,category:'all',section:''});main.focus({preventScroll:true});return;}
    if (button.dataset.companyRole) {update({role:button.dataset.companyRole});main.querySelector(`[data-company-role="${CSS.escape(state.role)}"]`)?.focus({preventScroll:true});return;}
    if (button.dataset.kind) {update({kind:button.dataset.kind});main.querySelector(`[data-kind="${CSS.escape(state.kind)}"]`)?.focus({preventScroll:true});return;}
    if (button.dataset.clear) {const k=button.dataset.clear;update({[k]:['query','section'].includes(k)?'':'all'});main.focus({preventScroll:true});return;}
    if (button.hasAttribute('data-reset')) {update({query:'',category:'all',topic:'all',period:'all',kind:'all',role:'all',section:'',...(state.view==='article'?{view:'news'}:{})});main.focus({preventScroll:true});}
  });
  main.addEventListener('change',event=>{if(event.target.dataset.select){const key=event.target.dataset.select;update({[key]:event.target.value});document.querySelector(`[data-select="${key}"]`)?.focus({preventScroll:true});}});
  function performSearch() {clearTimeout(searchTimer);searchTimer=null;update({query:search.value,view:['overview','sources','article'].includes(state.view)?'news':state.view},true);}
  search.addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(performSearch,160);});
  document.querySelector('.global-search').addEventListener('submit',event=>{event.preventDefault();performSearch();});
  document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();search.focus();search.select();}if(event.key==='Escape'){document.body.classList.remove('menu-open');document.querySelector('.menu-button').setAttribute('aria-expanded','false');}});
  document.addEventListener('click',event=>{if(document.body.classList.contains('menu-open')&&!event.target.closest('.sidebar,.menu-button')){document.body.classList.remove('menu-open');document.querySelector('.menu-button').setAttribute('aria-expanded','false');}});
  window.addEventListener('popstate',()=>{state=readState();render();});
  window.addEventListener('storage',event=>{if(event.key===storeKey){try{const value=JSON.parse(event.newValue||'[]');saved=new Set(Array.isArray(value)?value.filter(x=>typeof x==='string'):[]);render();}catch{}}});
  state=readState();syncTheme();render();
})();
