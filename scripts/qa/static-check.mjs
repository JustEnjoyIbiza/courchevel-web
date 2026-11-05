// Static quality checks over a built Astro dist/ folder.
import fs from 'node:fs';
import path from 'node:path';

const dist = process.argv[2];
const SITE = 'https://www.courchevelluxuryconcierge.com';
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && !/^google[0-9a-f]+\.html$/.test(f) && files.push(p); } })(dist);

const routeOf = (f) => '/' + path.relative(dist, f).replace(/index\.html$/, '');
const pages = files.map((f) => ({ route: routeOf(f), html: fs.readFileSync(f, 'utf8') }));
const routes = new Set(pages.map((p) => p.route));
const assetExists = (u) => fs.existsSync(path.join(dist, decodeURIComponent(u.split('#')[0].split('?')[0])));

const one = (html, re) => (html.match(re) || [])[1];
const all = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
const results = [];
const seen = { title: new Map(), desc: new Map(), canonical: new Map() };
let fail = 0;
const check = (route, name, ok, detail = '') => { results.push({ route, name, ok, detail }); if (!ok) fail++; };

for (const { route, html } of pages) {
  const decode = (t) => t?.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  const title = decode(one(html, /<title>([^<]*)<\/title>/));
  const desc = decode(one(html, /<meta name="description" content="([^"]*)"/));
  const canonical = one(html, /<link rel="canonical" href="([^"]*)"/);
  const h1s = all(html, /<h1[^>]*>([\s\S]*?)<\/h1>/g);
  const lang = one(html, /<html lang="([^"]+)"/);
  const alts = all(html, /<link rel="alternate" hreflang="([^"]+)"/g);

  const noindex = /name="robots" content="noindex/.test(html);
  check(route, 'title < 60', title && title.length < 60, `${title?.length}: ${title}`);
  check(route, 'description < 155', desc && desc.length < 155, `${desc?.length}`);
  check(route, 'one H1', h1s.length === 1, `${h1s.length}`);
  if (!noindex) check(route, 'canonical = own URL', canonical === SITE + route, canonical);
  if (!noindex) check(route, 'hreflang en + fr + x-default', ['en', 'fr', 'x-default'].every((l) => alts.includes(l)), alts.join(','));
  for (const [k, v] of [['title', title], ['desc', desc], ['canonical', canonical]]) {
    if (seen[k].has(v)) check(route, `unique ${k}`, false, `same as ${seen[k].get(v)}`); else seen[k].set(v, route);
  }

  // hreflang targets exist and point back
  for (const href of all(html, /<link rel="alternate" hreflang="[^"]+" href="([^"]+)"/g)) {
    const r = href.replace(SITE, '');
    check(route, `hreflang target exists ${r}`, routes.has(r));
  }

  // JSON-LD parses, no prices
  for (const block of all(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let ok = true; try { JSON.parse(block); } catch { ok = false; }
    check(route, 'JSON-LD parses', ok);
    check(route, 'JSON-LD has no price/offers/streetAddress', !/"(price|priceRange|offers|streetAddress)"/.test(block));
  }

  // Visible text: no prices. Two exceptions (owner, 25 Oct 2026): the weekly chalet prices on
  // the chalets page and each chalet's page, and the "from" transfer prices on the transfers
  // page, each in a <p data-price>, and only with the note that they vary.
  let visible = html;
  if (/^\/(fr\/)?services\/(chalets\/([a-z0-9-]+\/)?|transfers\/)$/.test(route)) {
    check(route, 'prices come with the note that they vary', !/\sdata-price[\s>]/.test(html) || /\sdata-price-note[\s>]/.test(html));
    visible = visible.replace(/<p[^>]*\sdata-price[\s>][\s\S]*?<\/p>/g, '');
  }
  const text = visible.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  const money = text.match(/(€\s?\d|\d[\d\s.,]*\s?(€|euros?\b|EUR\b)|EUR\s?\d|\$\s?\d|\bCHF\s?\d|£\s?\d)/i);
  check(route, 'no prices in text', !money, money?.[0] ?? '');

  // Images: alt + width/height
  for (const img of all(html, /(<img [^>]*>)/g)) {
    check(route, 'img has alt', /\salt="[^"]+"/.test(img), img.slice(0, 80));
    check(route, 'img has width+height', /\swidth="\d+"/.test(img) && /\sheight="\d+"/.test(img), img.slice(0, 80));
  }

  // Internal links resolve
  for (const href of all(html, /<a [^>]*href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:)/.test(href) || href.startsWith('#')) continue;
    const base = href.split('#')[0].split('?')[0];
    check(route, `link ${href}`, routes.has(base) || assetExists(base));
  }
}

const bad = results.filter((r) => !r.ok);
console.log(`${pages.length} pages, ${results.length} checks, ${bad.length} failed`);
for (const r of bad) console.log(`FAIL ${r.route} | ${r.name} | ${r.detail}`);
const byRoute = {};
for (const r of results) (byRoute[r.route] ??= { pass: 0, fail: 0 })[r.ok ? 'pass' : 'fail']++;
console.table(byRoute);
process.exit(fail ? 1 : 0);
