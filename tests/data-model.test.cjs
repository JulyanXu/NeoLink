const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const model = require('../data-model.js');
const now = new Date('2026-09-08T04:00:00Z');
const article = (overrides = {}) => ({ id: '1', title: '四川100MW/200MWh独立储能项目EPC招标', source: '公开来源', date: '2026-09-07', url: 'https://example.com/news/1', ...overrides });

test('nested arrays win section by section, headline aliases deduplicate, and IPO maps to enterprise', () => {
  const result = model.buildFeed({
    headlines: [article()],
    latest: [article({ title: 'This flat latest must not be merged' })],
    project: [article({ id: '2', url: 'https://example.com/news/2' })],
    ipo: [article({ id: '3', category: 'IPO', title: '企业IPO募资', url: 'https://example.com/news/3' })],
    sections: { headline: [article({ title: '嵌套标题' })], latest: [] }
  }, now);
  assert.equal(result.items.length, 3);
  assert.equal(result.headlines.length, 1);
  assert.equal(result.headlines[0].title, '嵌套标题');
  assert.equal(result.items.find(item => item.id === '3').category, '企业技术');
  assert.equal(result.items.find(item => item.id === '3').originalCategory, 'IPO');
  assert.equal(result.counts.projectCount, 1);
});

test('canonical URLs remove trackers/fragments without collapsing meaningful query parameters', () => {
  const result = model.buildFeed({ latest: [
    article({ url: 'https://EXAMPLE.com:443/news/1?b=2&a=1&utm_source=feed#details' }),
    article({ id: 'different', url: 'https://example.com/news/1?a=1&b=2' }),
    article({ id: 'third', url: 'https://example.com/news/1?a=2&b=2' }),
    article({ id: 'fallback', url: 'javascript:alert(1)', title: '只有编号' }),
    article({ id: 'fallback', url: '', title: '同一编号' }),
    article({ id: '', url: '', title: '没有编号' }),
    article({ id: '', url: '', title: '没有编号' })
  ] }, now);
  assert.equal(result.items.length, 4);
  assert.equal(result.items.find(item => item.id === 'fallback').url, '');
  assert.equal(model.safeUrl('data:text/html,hello'), '');
  assert.equal(model.safeUrl('/relative'), '');
  assert.equal(model.safeUrl('https://user:secret@example.com/'), '');
});

test('malformed feeds and arrays are ignored and missing fields do not produce fake articles', () => {
  for (const raw of [null, undefined, 'wrong', [], { latest: {}, sections: { latest: null } }]) {
    const result = model.buildFeed(raw, now);
    assert.deepEqual(result.items, []);
    assert.deepEqual(result.counts, { total: 0, latestDay: 0, sourceCount: 0, projectCount: 0 });
    assert.equal(result.latestDate, '');
  }
  const result = model.buildFeed({ latest: [null, [], {}, 42, { title: '只有标题' }] }, now);
  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].date, '');
  assert.equal(result.items[0].source, '');
  assert.equal(result.counts.sourceCount, 0);
});

test('title decoding keeps raw wording and template summaries are hidden, not destroyed', () => {
  const summary = '储能产业公开新闻更新，纳入今日首页摘要。';
  const result = model.buildFeed({ latest: [article({ title: '储能&quot;规则&quot; &amp; 技术', summary })] }, now);
  assert.equal(result.items[0].originalTitle, '储能&quot;规则&quot; &amp; 技术');
  assert.equal(result.items[0].title, '储能"规则" & 技术');
  assert.equal(result.items[0].summary, summary);
  assert.equal(result.items[0].displaySummary, '');
  assert.equal(model.buildFeed({ latest: [article({ summary: '项目采购期限为20年。' })] }, now).items[0].displaySummary, '项目采购期限为20年。');
});

test('facts are explicit title units, retain scope, and do not interpret unrelated numbers', () => {
  const title = '山西储能625MW/1.4GWh，拟引入9.3亿元，报价0.49元/Wh、600元/kWh和49万元/MW；市场规模1.2万亿元';
  const facts = model.extractFacts(title);
  assert.deepEqual(facts.map(fact => [fact.value, fact.kind]), [
    ['625MW', '容量'], ['1.4GWh', '容量'], ['9.3亿元', '金额'],
    ['0.49元/Wh', '价格'], ['600元/kWh', '价格'], ['49万元/MW', '价格'], ['1.2万亿元', '金额']
  ]);
  assert.ok(facts.every(fact => fact.context === title));
  assert.deepEqual(model.extractFacts('2026年8家企业半年挣560亿，800V直流，4h储能，增长30%'), []);
  assert.deepEqual(model.extractFacts('报价0.54–0.62元/Wh，规模1,000MWh').map(fact => fact.value), ['0.54–0.62元/Wh', '1,000MWh']);
  assert.deepEqual(model.extractFacts('10万元/MWh，200MWhz，不完整ABC20MW'), []);
  assert.deepEqual(model.extractFacts('近3.5GWh、突破5GW、不低于200MWh、约为1.2亿元、0.5元/Wh以下').map(fact => fact.value), ['近3.5GWh', '突破5GW', '不低于200MWh', '约为1.2亿元', '0.5元/Wh以下']);
});

test('stage is conservative about planned, cancelled, generic and overlapping milestones', () => {
  const cases = [
    ['山西向民间资本推介储能项目', '规划/推介'],
    ['四川储能EPC招标', '招标/采购'],
    ['EPC招标中标候选人公示', '中标/公示'],
    ['储能项目正式并网投运', '建设/并网'],
    ['项目预计2027年并网', '规划/推介'],
    ['项目计划年底并网，今日已开工', '建设/并网'],
    ['项目尚未并网，启动采购', '招标/采购'],
    ['项目取消招标', '未明确'],
    ['储能建设成本分析', '未明确'],
    ['储能产业发展观察', '未明确']
  ];
  cases.forEach(([title, expected]) => assert.equal(model.classifyStage(title), expected, title));
});

test('topics and province use title text, without inferring from sources or summaries', () => {
  const [item] = model.buildFeed({ latest: [article({ title: '四川4h用户侧储能EPC招标', summary: '美国海外市场机会', source: '北京媒体' })] }, now).items;
  assert.deepEqual(item.topics, ['长时储能', '用户侧']);
  assert.equal(item.province, '四川');
  assert.equal(model.buildFeed({ latest: [article({ title: '成都储能项目', source: '四川媒体' })] }, now).items[0].province, '');
  assert.ok(model.buildFeed({ latest: [article({ title: '4小时储能项目' })] }, now).items[0].topics.includes('长时储能'));
  assert.deepEqual(model.buildFeed({ latest: [article({ title: '构网型储能项目' })] }, now).items[0].topics, ['构网技术']);
  assert.ok(!model.buildFeed({ latest: [article({ title: '3.4小时储能项目' })] }, now).items[0].topics.includes('长时储能'));
});

test('all counts derive from deduplicated articles, excluding metrics and source index payloads', () => {
  const result = model.buildFeed({
    generated_at: '2026-09-08T08:00:00+08:00',
    headlines: [article({ category: '项目招标' })], latest: [article({ category: '项目招标' })],
    metrics: [{ title: '假指标', value: 9999 }], source_index: [{ name: '不算新闻来源', count: 1000 }],
    sections: { metrics: [article({ id: 'fake', url: 'https://example.com/fake' })] }
  }, now);
  assert.deepEqual(result.counts, { total: 1, latestDay: 1, sourceCount: 1, projectCount: 1 });
  assert.equal(result.generatedAt, '2026-09-08T08:00:00+08:00');
  assert.equal(result.latestDate, '2026-09-07');
  assert.deepEqual(result.sources, [{ name: '公开来源', count: 1 }]);
});

test('search, category, topic and saved-only filters compose without mutating the source', () => {
  const result = model.buildFeed({ latest: [
    article({ id: '1', category: '项目招标' }),
    article({ id: '2', url: 'https://example.com/2', title: '四川独立储能政策', category: '政策市场' }),
    article({ id: '3', url: 'https://example.com/3', title: '山东工商业储能招标', category: '项目招标' })
  ] }, now);
  const options = { query: '四川', category: '项目招标', topic: '独立储能', onlySaved: true, savedIds: ['1', '3'] };
  assert.deepEqual(model.filterItems(result.items, options, now).map(item => item.id), ['1']);
  assert.equal(result.items.length, 3);
  assert.deepEqual(model.filterItems(result.items, { ...options, savedIds: new Set(['3']) }, now), []);
});

test('date periods use the Shanghai calendar, include seven calendar days, and reject future/invalid dates', () => {
  const dates = ['2026-09-09', '2026-09-08', '2026-09-02', '2026-09-01', '2026-08-10', '2026-08-09', '2026-02-30', ''];
  const shanghaiMidnight = new Date('2026-09-07T16:01:00Z');
  const result = model.buildFeed({ latest: dates.map((date, index) => article({ id: String(index), date, url: 'https://example.com/' + index })) }, shanghaiMidnight);
  assert.equal(result.today, '2026-09-08');
  assert.equal(result.latestDate, '2026-09-08');
  assert.equal(result.earliestDate, '2026-08-09');
  assert.deepEqual(model.filterItems(result.items, { period: '7d' }, shanghaiMidnight).map(item => item.date), ['2026-09-08', '2026-09-02']);
  assert.deepEqual(model.filterItems(result.items, { period: '30d', sort: 'oldest' }, shanghaiMidnight).map(item => item.date), ['2026-08-10', '2026-09-01', '2026-09-02', '2026-09-08']);
  assert.equal(model.filterItems(result.items, { period: 'all' }, shanghaiMidnight).length, dates.length);
});

test('UMD exposes the browser API and the current live feed contains only canonical categories', () => {
  const context = { window: {}, URL, Set, Map };
  vm.runInNewContext(fs.readFileSync(require.resolve('../data-model.js'), 'utf8'), context);
  assert.equal(typeof context.window.NeoLinkData.buildFeed, 'function');
  vm.runInNewContext(fs.readFileSync(require.resolve('../data/feed.js'), 'utf8'), context);
  const result = model.buildFeed(context.window.NEOLINK_FEED, now);
  assert.ok(result.items.length > 0);
  assert.ok(result.items.every(item => model.categories.includes(item.category)));
  assert.equal(new Set(result.items.map(item => item.url || item.id)).size, result.items.length);
});

test('audited live article IDs retain explicit topics, project selection stage, and numeric qualifiers', () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(require.resolve('../data/feed.js'), 'utf8'), context);
  const result = model.buildFeed(context.window.NEOLINK_FEED, now);
  const byId = new Map(result.items.map(item => [item.id, item]));
  const expected = [
    ['1511486', '海外市场'], ['1511266', '海外市场'], ['1511345', '海外市场'],
    ['1511481', '算电协同'], ['1511326', '独立储能'], ['1511326', '构网技术'],
    ['1504821', '安全合规']
  ];
  expected.forEach(([id, topic]) => assert.ok(byId.get(id)?.topics.includes(topic), id + ' should include ' + topic));
  assert.equal(byId.get('1511478').stage, '规划/推介');
  assert.equal(byId.get('1510840').facts[0].value, '突破5GW');
  assert.equal(byId.get('1504252').facts[0].value, '近3.5GWh');
});

test('clear policy, financial-report and global-market titles repair categories while preserving provenance', () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(require.resolve('../data/feed.js'), 'utf8'), context);
  const result = model.buildFeed(context.window.NEOLINK_FEED, now);
  const byId = new Map(result.items.map(item => [item.id, item]));
  const expected = [
    ['1511559', '企业技术', '政策市场'],
    ['1511551', '价格材料', '企业技术'],
    ['1511486', '政策市场', '海外']
  ];
  expected.forEach(([id, original, organized]) => {
    assert.equal(byId.get(id).originalCategory, original);
    assert.equal(byId.get(id).category, organized);
    assert.equal(byId.get(id).categoryMethod, '按标题关键词整理');
  });
  assert.equal(byId.get('1511766').category, '政策市场');
  assert.equal(byId.get('1511766').categoryMethod, '');
  assert.equal(result.counts.projectCount, 10);
  const [project] = model.buildFeed({ project: [article({ title: '海外储能项目EPC招标', category: '项目招标' })] }, now).items;
  assert.equal(project.category, '项目招标');
  assert.ok(project.topics.includes('海外市场'));
  assert.equal(project.categoryMethod, '');
  const [policy] = model.buildFeed({ latest: [article({ title: '工信部印发产业发展规划', category: '企业技术' })] }, now).items;
  assert.equal(policy.category, '政策市场');
});
