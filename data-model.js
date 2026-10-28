(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.NeoLinkData = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  var categories = ['政策市场', '项目招标', '企业技术', '价格材料', '风险合规', '海外'];
  var sectionCategories = {
    policy: '政策市场', project: '项目招标', enterprise: '企业技术',
    materials: '价格材料', safety: '风险合规', legal: '风险合规',
    ipo: '企业技术', overseas: '海外'
  };
  var sectionNames = ['headlines', 'latest', 'policy', 'project', 'enterprise', 'materials', 'safety', 'legal', 'ipo', 'overseas'];
  var topicRules = [
    ['算电协同', /算电|算力|数据中心|高压直流供电|\bAIDC\b/i],
    ['长时储能', /长时储能|液流|压缩空气|熔盐|(?:^|[^\d.])(?:[4-9]|\d{2,})\s*(?:h\b|小时)|(?:四|五|六|七|八|九|十)小时/i],
    ['构网技术', /构网型/],
    ['用户侧', /用户侧|工商业储能|户用储能/],
    ['独立储能', /独立储能|共享储能|独立共享/],
    ['虚拟电厂', /虚拟电厂/],
    ['海外市场', /海外|出口|出海|全球[^，。；！!？?]{0,12}市场|欧洲|美国|英国|德国|澳大利亚|非洲|中东|东南亚|南美|韩系/],
    ['产业资本', /IPO|上市|募资|融资|基金|股权|收购|并购|民间资本/i],
    ['安全合规', /事故|起火|火灾|爆炸|召回|消防|安全|合规|强制性标准|动力电池故障/]
  ];
  var topics = topicRules.map(function (rule) { return rule[0]; });
  var provinces = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾', '香港', '澳门'];
  var templateSummaries = new Set([
    '储能产业公开新闻更新，纳入今日首页摘要。',
    '电池及材料端公开动态更新，纳入材料与价格观察。',
    '政策与市场机制信息更新，纳入政策市场跟踪。',
    '储能项目招标/中标动态更新，作为工程价格与项目节奏观察。',
    '区域新型储能装机或并网数据更新，纳入市场景气度跟踪。',
    '动力电池故障与车企公告进入安全合规观察。',
    '储能企业IPO与募资动态升温，资金投向扩产、研发和AI相关能力。'
  ]);

  function text(value) {
    return typeof value === 'string' || typeof value === 'number' ? String(value).trim() : '';
  }

  function decodeTitle(value) {
    var entities = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' };
    return text(value).replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, function (match, entity) {
      if (entity[0] !== '#') return entities[entity.toLowerCase()];
      var code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : match;
    });
  }

  function safeUrl(value) {
    try {
      var url = new URL(text(value));
      return /^https?:$/.test(url.protocol) && !url.username && !url.password ? url.href : '';
    } catch (_) { return ''; }
  }

  function canonicalUrl(value) {
    if (!value) return '';
    var url = new URL(value);
    url.hash = '';
    Array.from(url.searchParams.keys()).forEach(function (key) {
      if (/^(utm_.+|fbclid|gclid)$/i.test(key)) url.searchParams.delete(key);
    });
    url.searchParams.sort();
    return url.href;
  }

  function shanghaiToday(now) {
    var date = new Date(now);
    return Number.isFinite(date.getTime()) ? new Date(date.getTime() + 8 * 3600000).toISOString().slice(0, 10) : '';
  }

  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    var parsed = new Date(value + 'T00:00:00Z');
    return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }

  function extractFacts(title) {
    title = text(title);
    var number = '(?:\\d{1,3}(?:,\\d{3})+|\\d+)(?:\\.\\d+)?';
    var pattern = new RegExp(number + '(?:\\s*[~～–—至-]\\s*' + number + ')?\\s*(?:万元\\s*/\\s*MW|元\\s*/\\s*kWh|元\\s*/\\s*Wh|万亿元|亿元|GWh|MWh|GW|MW)(?![A-Za-z])', 'gi');
    var facts = [];
    var match;
    while ((match = pattern.exec(title))) {
      if (match.index && /[\d.,A-Za-z万亿]/.test(title[match.index - 1])) continue;
      var qualifier = title.slice(0, match.index).match(/(?:至少|最多|至多|超过|超|突破|不低于|不高于|不超过|不少于|不多于|约为|约|近|逾|大于|小于|高于|低于|低至|最高|最低|≥|≤|>|<)\s*$/);
      var suffix = title.slice(pattern.lastIndex).match(/^(?:左右|以上|以下)/);
      var value = (qualifier ? qualifier[0] : '') + match[0].trim() + (suffix ? suffix[0] : '');
      facts.push({ value: value, kind: match[0].indexOf('/') >= 0 ? '价格' : /亿元$/.test(match[0]) ? '金额' : '容量', context: title });
    }
    return facts;
  }

  function classifyStage(title) {
    title = text(title);
    // Remove planned or negated milestones before checking completed project events.
    var observed = title.replace(/(?:拟|计划|预计|目标|力争|争取|将)[^，。；！!？?]{0,18}(?:开工|并网|投运|投产|建设)/g, '')
      .replace(/(?:尚未|未能|未|不再|暂不)(?:开工|并网|投运|投产)/g, '')
      .replace(/(?:取消|终止)(?:公开)?(?:招标|采购)|(?:招标|采购)(?:终止|取消|失败)|流标|废标/g, '');
    if (/开工|并网|投运|投产|在建|开建|建设中/.test(observed)) return '建设/并网';
    if (/中标|成交(?:结果|公告|公示)|定标|公示/.test(observed)) return '中标/公示';
    if (/招标|采购|征集供应商/.test(observed)) return '招标/采购';
    if (/推介|拟建|规划|竞配|计划(?:建设|投资|引入|投产|并网)|拟投资|拟投建|前期工作|立项|备案|(?:拟|计划|预计|目标|力争|争取|将)[^，。；！!？?]{0,18}(?:开工|并网|投运|投产|建设)/.test(title)) return '规划/推介';
    return '未明确';
  }

  function extractProvince(title) {
    var found = provinces.map(function (name) { return { name: name, at: title.indexOf(name) }; })
      .filter(function (province) { return province.at >= 0; }).sort(function (a, b) { return a.at - b.at; });
    return found.length ? found[0].name : '';
  }

  function getSection(raw, name) {
    var names = name === 'headlines' ? ['headlines', 'headline'] : [name];
    var nested = raw.sections && typeof raw.sections === 'object' ? raw.sections : {};
    for (var i = 0; i < names.length; i++) if (Array.isArray(nested[names[i]])) return nested[names[i]];
    for (var j = 0; j < names.length; j++) if (Array.isArray(raw[names[j]])) return raw[names[j]];
    return [];
  }

  function titleCategory(title, category) {
    if (/^(?:[一二三四五六七八九十\d]+部门[：:]|(?:工信部|国家发展改革委|国家发改委|国家能源局|国务院|财政部|生态环境部)(?:联合)?(?:印发|发布|出台))/.test(title)) return '政策市场';
    if (['企业技术', '价格材料', '海外'].indexOf(category) >= 0 && /半年报|年报|季报|财报|营业收入|营收|净利润/.test(title)) return '企业技术';
    if (category !== '项目招标' && category !== '风险合规' && !/项目|招标|中标|采购|EPC/i.test(title) && /^(?:一文读懂|盘点|解析|综述|展望)[^，。；！!？?]{0,20}(?:全球|海外)[^，。；！!？?]{0,12}市场|(?:全球|海外)[^，。；！!？?]{0,12}市场(?:综述|观察|解析|分析|盘点|展望|报告)/.test(title)) return '海外';
    return category;
  }

  function normalize(item, section) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
    var title = decodeTitle(item.title);
    if (!title) return null;
    var originalCategory = text(item.category);
    var category = originalCategory;
    if (category.toUpperCase() === 'IPO') category = '企业技术';
    if (categories.indexOf(category) < 0) category = sectionCategories[section] || '企业技术';
    var organizedCategory = titleCategory(title, category);
    var categoryMethod = organizedCategory !== category ? '按标题关键词整理' : '';
    var url = safeUrl(item.url);
    var date = text(item.date || item.as_of);
    var source = text(item.source);
    var identity = canonicalUrl(url) || text(item.id) || [title, date, source].join('|');
    return {
      id: text(item.id) || identity,
      originalTitle: text(item.title), title: title,
      summary: text(item.summary), displaySummary: templateSummaries.has(text(item.summary)) ? '' : text(item.summary),
      source: source, url: url, date: date, methodology: text(item.methodology),
      category: organizedCategory, originalCategory: originalCategory, categoryMethod: categoryMethod,
      topics: topicRules.filter(function (rule) { return rule[1].test(title); }).map(function (rule) { return rule[0]; }),
      facts: extractFacts(title), stage: classifyStage(title), province: extractProvince(title),
      _identity: identity
    };
  }

  function countBy(items, values) {
    var counts = new Map();
    items.forEach(function (item) { values(item).forEach(function (value) {
      if (value) counts.set(value, (counts.get(value) || 0) + 1);
    }); });
    return Array.from(counts, function (entry) { return { name: entry[0], count: entry[1] }; })
      .sort(function (a, b) { return b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'); });
  }

  function sortItems(items, sort) {
    return items.slice().sort(function (a, b) {
      var aValid = validDate(a.date), bValid = validDate(b.date);
      if (aValid !== bValid) return aValid ? -1 : 1;
      return aValid ? (sort === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)) : 0;
    });
  }

  function buildFeed(raw, now) {
    raw = raw && typeof raw === 'object' ? raw : {};
    var today = shanghaiToday(now === undefined ? new Date() : now);
    var byIdentity = new Map();
    var headlineKeys = [];
    sectionNames.forEach(function (section) {
      getSection(raw, section).forEach(function (entry) {
        var item = normalize(entry, section);
        if (!item) return;
        var identity = item._identity;
        delete item._identity;
        if (!byIdentity.has(identity)) byIdentity.set(identity, item);
        if (section === 'headlines' && headlineKeys.indexOf(identity) < 0) headlineKeys.push(identity);
      });
    });
    var items = sortItems(Array.from(byIdentity.values()), 'newest');
    var dates = items.map(function (item) { return item.date; }).filter(function (date) { return validDate(date) && date <= today; }).sort();
    var latestDate = dates.length ? dates[dates.length - 1] : '';
    var sources = countBy(items, function (item) { return [item.source]; });
    return {
      items: items, headlines: headlineKeys.map(function (key) { return byIdentity.get(key); }),
      generatedAt: text(raw.generated_at || raw.generatedAt), latestDate: latestDate, earliestDate: dates[0] || '', today: today,
      sources: sources, categories: countBy(items, function (item) { return [item.category]; }),
      topicCounts: countBy(items, function (item) { return item.topics; }),
      counts: {
        total: items.length, latestDay: latestDate ? items.filter(function (item) { return item.date === latestDate; }).length : 0,
        sourceCount: sources.length, projectCount: items.filter(function (item) { return item.category === '项目招标'; }).length
      }
    };
  }

  function filterItems(items, options, now) {
    options = options || {};
    var today = shanghaiToday(now === undefined ? new Date() : now);
    var days = options.period === '7d' ? 7 : options.period === '30d' ? 30 : 0;
    var cutoff = days && today ? new Date(Date.parse(today + 'T00:00:00Z') - (days - 1) * 86400000).toISOString().slice(0, 10) : '';
    var query = text(options.query).toLocaleLowerCase();
    var saved = options.savedIds instanceof Set ? options.savedIds : new Set(Array.isArray(options.savedIds) ? options.savedIds : []);
    return sortItems((Array.isArray(items) ? items : []).filter(function (item) {
      if (options.category && options.category !== 'all' && item.category !== options.category) return false;
      if (options.topic && options.topic !== 'all' && (item.topics || []).indexOf(options.topic) < 0) return false;
      if (options.onlySaved && !saved.has(item.id)) return false;
      if (days && (!validDate(item.date) || !today || item.date < cutoff || item.date > today)) return false;
      return !query || [item.title, item.summary, item.source, item.category, item.province, (item.topics || []).join(' ')].join(' ').toLocaleLowerCase().includes(query);
    }), options.sort);
  }

  return { buildFeed: buildFeed, filterItems: filterItems, safeUrl: safeUrl, extractFacts: extractFacts, classifyStage: classifyStage, topics: topics, categories: categories };
});
