// Internal link audit over dist/: inbound links per page, click depth from the
// homepage, orphan pages, contextual (in-<main>) links, cross-language leaks.
// Usage: node scripts/qa/link-graph.mjs dist
import fs from 'node:fs';
import path from 'node:path';

const dist = process.argv[2];
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('index.html') && files.push(p); } })(dist);

const pages = new Map();
for (const f of files) {
  const route = '/' + path.relative(dist, f).replace(/index\.html$/, '');
  const html = fs.readFileSync(f, 'utf8');
  if (/name="robots" content="noindex/.test(html)) continue;
  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1] ?? '';
  const links = (s) => [...s.matchAll(/<a [^>]*href="(\/[^"#?]*)[^"]*"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ to: m[1], text: m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() }));
  pages.set(route, { all: links(html), body: links(main) });
}

const routes = [...pages.keys()];
const inbound = Object.fromEntries(routes.map((r) => [r, { all: 0, body: 0, anchors: new Set() }]));
const leaks = [];
for (const [from, { all, body }] of pages) {
  const fromFr = from.startsWith('/fr/');
  for (const l of new Set(all.map((x) => x.to))) if (inbound[l] && l !== from) inbound[l].all++;
  for (const l of body) {
    if (!inbound[l.to] || l.to === from) continue;
    inbound[l.to].body++;
    inbound[l.to].anchors.add(l.text.toLowerCase());
    if (fromFr !== l.to.startsWith('/fr/') && l.to !== '/' && l.to !== '/fr/') leaks.push(`${from} -> ${l.to} ("${l.text}")`);
  }
}

// Click depth from each homepage (any link counts, as a crawler would follow it).
const depth = {};
for (const start of ['/', '/fr/']) {
  const q = [[start, 0]];
  const seen = new Set([start]);
  while (q.length) {
    const [r, d] = q.shift();
    depth[r] = Math.min(depth[r] ?? 99, d);
    for (const l of pages.get(r)?.all ?? []) if (pages.has(l.to) && !seen.has(l.to)) { seen.add(l.to); q.push([l.to, d + 1]); }
  }
}

const rows = routes.sort().map((r) => ({
  page: r,
  depth: depth[r] ?? '∞',
  inboundAll: inbound[r].all,
  inboundBody: inbound[r].body,
  anchorVariants: inbound[r].anchors.size,
  outBody: new Set(pages.get(r).body.map((l) => l.to).filter((t) => pages.has(t) && t !== r)).size,
}));
console.table(rows);
const orphans = rows.filter((r) => r.inboundAll === 0);
const weak = rows.filter((r) => r.inboundBody < 3 && r.page !== '/' && r.page !== '/fr/');
const deep = rows.filter((r) => typeof r.depth !== 'number' || r.depth > 3);
const thinOut = rows.filter((r) => r.outBody < 3);
console.log(`\n${rows.length} indexable pages`);
console.log(`Orphans (no inbound links): ${orphans.length ? orphans.map((r) => r.page).join(', ') : 'none'}`);
console.log(`Click depth > 3: ${deep.length ? deep.map((r) => `${r.page} (${r.depth})`).join(', ') : 'none'}`);
console.log(`Fewer than 3 contextual inbound links: ${weak.length ? weak.map((r) => `${r.page} (${r.inboundBody})`).join(', ') : 'none'}`);
console.log(`Fewer than 3 contextual outbound links: ${thinOut.length ? thinOut.map((r) => `${r.page} (${r.outBody})`).join(', ') : 'none'}`);
console.log(`Cross-language body links: ${leaks.length ? '\n  ' + leaks.join('\n  ') : 'none'}`);
