// Launch check: run against the Netlify deploy preview before launch, and against
// production right after it (docs/launch-plan.md).
//
//   node scripts/qa/launch-check.mjs https://deploy-preview-1--courchevel-luxury-concierge.netlify.app
//   node scripts/qa/launch-check.mjs https://www.courchevelluxuryconcierge.com --production
//
// --production adds the domain checks (bare domain and http -> https://www.) and
// fails if pages are marked noindex. Read-only: it only sends GET requests.
const args = process.argv.slice(2);
const base = (args.find((a) => a.startsWith('http')) ?? '').replace(/\/$/, '');
const production = args.includes('--production');
const indexnowKey = args.find((a) => a.startsWith('--indexnow-key='))?.split('=')[1];
if (!base) {
  console.error('Usage: node scripts/qa/launch-check.mjs <base-url> [--production] [--indexnow-key=KEY]');
  process.exit(2);
}

const SITE = 'https://www.courchevelluxuryconcierge.com';
const REVIEW = 'https://search.google.com/local/writereview?placeid=';
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: Boolean(ok), detail });
const get = (url) => fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15000) });

async function redirects(from, to, status = 301) {
  try {
    const res = await get(from);
    const loc = res.headers.get('location') ?? '';
    const target = new URL(loc, from).href;
    const ok = res.status === status && (typeof to === 'string' ? target === to : to.test(target));
    check(`${from} -> ${status}`, ok, ok ? '' : `got ${res.status} ${loc}`);
  } catch (e) {
    check(`${from} -> ${status}`, false, e.message);
  }
}

if (production) {
  await redirects('https://courchevelluxuryconcierge.com/', `${SITE}/`);
  await redirects('https://courchevelluxuryconcierge.com/services/', `${SITE}/services/`);
  await redirects('http://courchevelluxuryconcierge.com/', /^https:\/\/(www\.)?courchevelluxuryconcierge\.com\/$/);
  await redirects('http://www.courchevelluxuryconcierge.com/', `${SITE}/`);
}

// Old URLs from the previous site (audit/redirects.md) and the review short links.
await redirects(`${base}/index.html`, `${base}/`);
await redirects(`${base}/services`, `${base}/services/`);
await redirects(`${base}/assets/logo.png`, `${base}/icon-512.png`);
await redirects(`${base}/assets/photo/1.jpeg`, `${base}/`);
await redirects(`${base}/review`, new RegExp(`^${REVIEW.replace(/[?.]/g, '\\$&')}`), 302);
await redirects(`${base}/avis`, new RegExp(`^${REVIEW.replace(/[?.]/g, '\\$&')}`), 302);

// Homepage: headers, canonical, no noindex in production.
const home = await get(`${base}/`);
const html = await home.text();
check('/ returns 200', home.status === 200, `got ${home.status}`);
for (const h of ['strict-transport-security', 'x-frame-options', 'x-content-type-options', 'referrer-policy', 'permissions-policy']) {
  check(`header ${h}`, home.headers.get(h), 'missing');
}
check('CSP meta tag', /http-equiv="content-security-policy"/i.test(html), 'missing');
check('canonical is the www URL', html.includes(`<link rel="canonical" href="${SITE}/"`), 'wrong or missing');
check('hreflang fr', html.includes(`hreflang="fr" href="${SITE}/fr/"`), 'missing');
// Legal pages: every company detail filled in (LegalFacts shows [data-pending] until then).
// Transfers page: the draft market prices replaced by the owner's (pricesConfirmed in src/content/transfers.ts).
const pending = {
  '/mentions-legales/': 'company details missing in src/data/business.ts (legal)',
  '/privacy/': 'company details missing in src/data/business.ts (legal)',
  '/services/transfers/': 'transfer prices not confirmed in src/content/transfers.ts',
};
for (const [p, why] of Object.entries(pending)) {
  for (const path of [p, `/fr${p}`]) {
    try {
      const page = await (await fetch(base + path)).text();
      check(`${path} has no detail left to confirm`, !page.includes('data-pending'), why);
    } catch (e) {
      check(`${path} has no detail left to confirm`, false, e.message);
    }
  }
}
check('old #services / #contact anchors', /id="services"/.test(html) && /id="contact"/.test(html), 'missing');
if (production) {
  const robotsHeader = home.headers.get('x-robots-tag') ?? '';
  check('no X-Robots-Tag noindex', !/noindex/i.test(robotsHeader), robotsHeader);
  check('no meta noindex on /', !/name="robots" content="[^"]*noindex/i.test(html), 'homepage is noindex');
}

// Files for search engines and AI assistants.
for (const [path, must] of [['/robots.txt', 'Sitemap:'], ['/sitemap-index.xml', '<sitemapindex'], ['/llms.txt', 'Courchevel Luxury Concierge']]) {
  const res = await get(base + path);
  const body = res.status === 200 ? await res.text() : '';
  check(`${path} 200`, res.status === 200 && body.includes(must), `got ${res.status}`);
}
if (indexnowKey) {
  const res = await get(`${base}/${indexnowKey}.txt`);
  check('IndexNow key file', res.status === 200 && (await res.text()).trim() === indexnowKey, `got ${res.status}`);
}
const missing = await get(`${base}/this-page-does-not-exist/`);
check('unknown URL returns 404', missing.status === 404, `got ${missing.status}`);
// The function only accepts POST (a GET is a 404 by design); an empty JSON body is
// answered 422 with field errors, which proves it is deployed without creating a lead.
const lead = await fetch(`${base}/api/lead`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: '{}',
  signal: AbortSignal.timeout(15000),
});
check('lead endpoint deployed (POST /api/lead answers 422)', lead.status === 422, `got ${lead.status}`);

// Every sitemap URL answers 200 on this host.
const index = await (await get(`${base}/sitemap-index.xml`)).text();
const urls = [];
for (const m of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const xml = await (await get(m[1].replace(SITE, base))).text();
  for (const u of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(u[1].replace(SITE, base));
}
const bad = [];
for (let i = 0; i < urls.length; i += 8) {
  const batch = await Promise.all(urls.slice(i, i + 8).map(async (u) => [u, (await get(u)).status]));
  bad.push(...batch.filter(([, s]) => s !== 200));
}
check(`all ${urls.length} sitemap URLs return 200`, urls.length > 0 && bad.length === 0, bad.map(([u, s]) => `${s} ${u}`).join(', '));

for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : `  (${r.detail})`}`);
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length} checks, ${failed} failed.`);
process.exit(failed ? 1 : 0);
