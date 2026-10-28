const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Only the shell and button/event APIs used by app.js; rendering stays in the app.
function element(attributes = {}, tag = 'div') {
  const listeners = new Map();
  const classes = new Set((attributes.class || '').split(/\s+/).filter(Boolean));
  let textContent = '';
  const node = {
    attributes, dataset: {}, value: '', buttons: [],
    get textContent() { return textContent; },
    set textContent(value) { textContent = String(value); },
    classList: {
      add: name => classes.add(name), remove: name => classes.delete(name),
      contains: name => classes.has(name),
      toggle(name, force = !classes.has(name)) { force ? classes.add(name) : classes.delete(name); return force; }
    },
    setAttribute(name, value) { attributes[name] = String(value); },
    removeAttribute(name) { delete attributes[name]; },
    hasAttribute(name) { return Object.hasOwn(attributes, name); },
    matches(selector) { return selector[0] === '.' ? classes.has(selector.slice(1)) : selector === tag; },
    closest(selector) { return selector.split(',').some(s => this.matches(s)) ? this : null; },
    focus() {}, select() {},
    addEventListener(type, handler) { listeners.set(type, [...(listeners.get(type) || []), handler]); },
    dispatchEvent(event) { event.target ||= this; for (const handler of listeners.get(event.type) || []) handler(event); },
    querySelectorAll(selector) {
      const match = selector.match(/^\[([\w-]+)(?:="([^"]*)")?\]$/);
      return match ? this.buttons.filter(button => button.hasAttribute(match[1]) && (match[2] === undefined || button.attributes[match[1]] === match[2])) : [];
    },
    querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  };
  for (const [name, value] of Object.entries(attributes)) {
    if (name.startsWith('data-')) node.dataset[name.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = value;
  }
  let html = '';
  Object.defineProperty(node, 'innerHTML', {
    get: () => html,
    set(value) {
      html = String(value);
      node.buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)].map(([, attrs, content]) => {
        const button = element(Object.fromEntries([...attrs.matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map(([, name, value]) => [name, value || ''])), 'button');
        button.textContent = content.replace(/<[^>]*>/g, '');
        return button;
      });
    }
  });
  return node;
}

function openPage(relativeUrl = 'index.html', storage = new Map()) {
  let url = new URL(relativeUrl, 'https://www.neolink.asia/');
  const main = element();
  const shell = new Map(['#detail-dialog', '#global-search', '#breadcrumb-title', '#nav-total', '#saved-total', '#toast', '.theme-toggle', '.global-search', '.menu-button'].map(selector => [selector, element({ class: selector.startsWith('.') ? selector.slice(1) : '' })]));
  shell.set('#content', main);
  const document = element();
  document.body = element();
  document.documentElement = element();
  document.querySelector = selector => shell.get(selector) || main.querySelector(selector);
  document.querySelectorAll = selector => selector === '[data-nav]' ? [] : main.querySelectorAll(selector);
  const window = element();
  let elapsed = 0;
  let timerId = 0;
  const timers = new Map();
  const context = vm.createContext({
    window, document, URL, URLSearchParams, console,
    location: { get search() { return url.search; }, get pathname() { return url.pathname; } },
    history: Object.fromEntries(['pushState', 'replaceState'].map(method => [method, (_, __, next) => { url = new URL(next, url); }])),
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, String(value)) },
    CSS: { escape: value => value },
    setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, due: elapsed + delay }); return id; },
    clearTimeout: id => timers.delete(id)
  });
  for (const file of ['data-model.js', 'data/feed.js', 'app.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  }
  return {
    main, storage, get url() { return url; }, get search() { return shell.get('#global-search'); },
    shell: selector => shell.get(selector),
    input(value) { this.search.value = value; this.search.dispatchEvent({ type: 'input' }); },
    click(selector) {
      const button = main.querySelector(selector);
      assert.ok(button, `Rendered button exists: ${selector}`);
      document.dispatchEvent({ type: 'click', target: button });
    },
    tick(milliseconds) {
      const until = elapsed + milliseconds;
      for (;;) {
        const next = [...timers].filter(([, timer]) => timer.due <= until).sort((a, b) => a[1].due - b[1].due)[0];
        if (!next) break;
        elapsed = next[1].due;
        timers.delete(next[0]);
        next[1].callback();
      }
      elapsed = until;
    }
  };
}

test('category click preserves an input query before the 160 ms debounce fires', () => {
  const page = openPage();
  page.input('四川');
  page.tick(80);
  assert.equal(page.url.search, '', 'input is still pending');
  page.click('[data-category="项目招标"]');
  assert.equal(page.url.pathname, '/news-more.html');
  assert.equal(page.url.searchParams.get('q'), '四川');
  assert.equal(page.url.searchParams.get('category'), '项目招标');
  assert.equal(page.search.value, '四川');
  assert.match(page.main.innerHTML, /70MW\/280MWh！四川4h用户侧储能EPC招标/);
  assert.doesNotMatch(page.main.innerHTML, /山西2026年第三批向民间资本推介项目/);
  const afterClick = page.url.href;
  page.tick(500);
  assert.equal(page.url.href, afterClick, 'a stale search timer cannot undo the category');
});

for (const view of ['__proto__', 'constructor']) {
  test(`unsupported prototype view ${view} renders the overview`, () => {
    const page = openPage(`index.html?view=${encodeURIComponent(view)}`);
    assert.equal(page.shell('#breadcrumb-title').textContent, '情报总览');
    assert.match(page.main.innerHTML, /读懂变化，/);
    page.click('[data-category="项目招标"]');
    assert.equal(page.url.searchParams.has('view'), false, 'subsequent navigation uses normalized overview state');
  });
}

test('saving through the rendered button survives a fresh page and can be removed', () => {
  const page = openPage('news-more.html?q=四川');
  page.click('[data-save="1511583"]');
  assert.deepEqual(JSON.parse(page.storage.get('neolink-saved-v3')), ['1511583']);
  assert.equal(page.shell('#saved-total').textContent, '1');
  const restored = openPage('index.html?view=saved', page.storage);
  assert.equal(restored.shell('#saved-total').textContent, '1');
  assert.match(restored.main.innerHTML, /70MW\/280MWh！四川4h用户侧储能EPC招标/);
  assert.equal(restored.main.querySelector('[data-save="1511583"]').attributes['aria-pressed'], 'true');
  restored.click('[data-save="1511583"]');
  const removed = openPage('index.html?view=saved', page.storage);
  assert.equal(removed.shell('#saved-total').textContent, '0');
  assert.equal(removed.main.querySelector('[data-save="1511583"]'), null);
});
