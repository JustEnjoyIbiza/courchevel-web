// Local JSON-LD validation against schema.org types and Google's rich-result requirements.
import fs from 'node:fs';
import path from 'node:path';

const dist = process.argv[2];
const SITE = 'https://www.courchevelluxuryconcierge.com';
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && !/^google[0-9a-f]+\.html$/.test(f) && files.push(p); } })(dist);

const issues = [];
const counts = {};
const textOf = (html) => html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const norm = (s) => s.replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
const isUrl = (u) => typeof u === 'string' && /^https:\/\//.test(u);

for (const f of files) {
  const route = '/' + path.relative(dist, f).replace(/index\.html$/, '');
  const html = fs.readFileSync(f, 'utf8');
  if (/name="robots" content="noindex/.test(html)) continue;
  const text = norm(textOf(html));
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const err = (msg) => issues.push(`${route}: ${msg}`);
  if (!blocks.some((b) => b['@type'] === 'BreadcrumbList')) err('no BreadcrumbList');

  for (const b of blocks) {
    const t = b['@type'];
    counts[t] = (counts[t] ?? 0) + 1;
    if (b['@context'] !== 'https://schema.org') err(`${t}: @context`);
    const json = JSON.stringify(b);
    if (/"(price|priceRange|offers|priceSpecification)"/.test(json)) err(`${t}: contains price/offers`);

    if (t === 'LocalBusiness') {
      for (const k of ['name', 'url', 'telephone', 'address', 'areaServed', 'description']) if (!b[k]) err(`LocalBusiness missing ${k}`);
      if (b.address && (!b.address.addressLocality || !b.address.addressCountry)) err('LocalBusiness address incomplete');
      if (b.address?.streetAddress === null || b.address?.streetAddress === '') err('streetAddress empty');
      if (!Array.isArray(b.sameAs) || !b.sameAs.every(isUrl)) err('sameAs must be https URLs');
      if (!/^\+\d{8,15}$/.test(b.telephone)) err('telephone not E.164');
    }
    if (t === 'Service') {
      for (const k of ['name', 'description', 'provider', 'areaServed', 'url']) if (!b[k]) err(`Service missing ${k}`);
      if (b.url !== canonical) err(`Service url ${b.url} != canonical`);
      if (!b.provider?.name || !isUrl(b.provider?.url)) err('Service provider needs name and url');
    }
    if (t === 'Article') {
      if (!b.headline || b.headline.length > 110) err(`Article headline length ${b.headline?.length}`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(b.dateModified)) err('Article dateModified');
      if (!b.author?.name) err('Article author name');
      if (b.url !== canonical) err('Article url != canonical');
    }
    if (t === 'FAQPage') {
      if (!b.mainEntity?.length) err('FAQPage empty');
      for (const q of b.mainEntity ?? []) {
        if (q['@type'] !== 'Question' || !q.name || q.acceptedAnswer?.['@type'] !== 'Answer' || !q.acceptedAnswer.text) err(`FAQ item malformed: ${q.name}`);
        if (!text.includes(norm(q.name))) err(`FAQ question not visible on page: ${q.name.slice(0, 60)}`);
        if (!text.includes(norm(q.acceptedAnswer.text).slice(0, 80))) err(`FAQ answer not visible on page: ${q.name.slice(0, 60)}`);
      }
    }
    if (t === 'BreadcrumbList') {
      const items = b.itemListElement ?? [];
      items.forEach((it, i) => {
        if (it.position !== i + 1) err('Breadcrumb positions not sequential');
        if (!it.name || !isUrl(it.item) || !it.item.startsWith(SITE)) err(`Breadcrumb item bad: ${it.name}`);
      });
      if (items.length && items.at(-1).item !== canonical) err(`Breadcrumb last item ${items.at(-1)?.item} != canonical ${canonical}`);
    }
  }
}
console.log(`${files.length} HTML files checked. Types found:`, JSON.stringify(counts));
console.log(issues.length ? `${issues.length} issues:\n - ` + issues.join('\n - ') : 'No schema issues.');
process.exit(issues.length ? 1 : 0);
