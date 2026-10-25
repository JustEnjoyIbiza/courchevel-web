// Editorial lint for src/content: prices, banned words, claims, pairs, related paths.
import fs from 'node:fs';
import path from 'node:path';

// Usage: node scripts/qa/content-lint.mjs <repo root>
const root = process.argv[2];
const contentDir = path.join(root, 'src/content');
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : /\.(md|ts)$/.test(p) && files.push(p); } })(contentDir);

const valid = new Set(['/services/', '/villages/', '/guides/', '/experiences/', '/faq/', '/about/', '/enquire/', '/mentions-legales/', '/privacy/', '/cookies/',
  ...['chalets','transfers','ski','experiences','private-chef','nightlife','staff','childcare','wellness','events','lifestyle'].map(s => `/services/${s}/`),
  ...['courchevel-1850','courchevel-1650-moriond','courchevel-1550-village','courchevel-1300-le-praz','la-tania','meribel','val-thorens','christmas-new-year-courchevel','corporate-retreats-courchevel','assistants-and-family-offices','courchevel-ski-area','palace-hotels-courchevel'].map(s => `/${s}/`),
  ...['getting-to-courchevel','courchevel-with-kids','season-dates-and-events','where-to-eat','how-to-choose-a-concierge-in-courchevel','private-concierge-vs-hotel-concierge','heli-skiing-from-courchevel','a-week-in-courchevel-1850'].map(s => `/guides/${s}/`)]);

const rules = [
  ['price', /(€|\bEUR\b|\beuros?\b|\bCHF\s?\d|£\s?\d|\$\s?\d|\bstarting at\b|\bcheap|\baffordable|\bbudget-friendly|\bbon marché|\bpas cher)/i],
  ['cliché', /\b(unforgettable|breathtaking|seamless(ly)?|world-class|nestled|hidden gem|inoubliable|à couper le souffle)\b/i],
  ['overclaim', /\b(guarantee[sd]?|garanti(e|es|s)?|exclusive access|accès exclusif|secret|the best(?!-known)|le meilleur|la meilleure)\b/i],
  ['exclamation', /!\s/],
  ['heli-drop in France', /(heli-?ski\w*|héliski\w*)(?![^.]*\b(Ital|Switz|Suisse|Itali|banned|interdit|not allowed|autorisé))[^.]*\b(Courchevel|France)\b/i],
  ['visible TODO', /\b(TODO|TBD|\[NAME\]|lorem)\b/],
];

const issues = [];
const pairs = {};
for (const f of files) {
  const rel = path.relative(root, f);
  let txt = fs.readFileSync(f, 'utf8');
  const scan = txt.replace(/<!--[\s\S]*?-->/g, '').replace(/^\s*(\/\/|\*|\/\*).*$/gm, '');
  scan.split('\n').forEach((line, i) => {
    for (const [name, re] of rules) {
      if (name === 'exclamation' && f.endsWith('.ts')) continue;
      // Questions are allowed to ask about heli-skiing; their answers are checked on their own line.
      if (name === 'heli-drop in France' && /^\s*(-\s*)?q:/.test(line)) continue;
      const m = line.match(re);
      if (m) issues.push(`${rel}:${i + 1} [${name}] …${line.slice(Math.max(0, m.index - 40), m.index + 60).trim()}…`);
    }
  });
  if (f.endsWith('.md')) {
    const m = rel.match(/src\/content\/(\w+)\/(en|fr)\/(.+)\.md$/);
    if (m) (pairs[`${m[1]}/${m[3]}`] ??= []).push(m[2]);
    const fm = txt.split('---')[1] ?? '';
    for (const r of [...fm.matchAll(/^\s*-\s*(\/[^\s]*)\s*$/gm)].map(x => x[1])) if (!valid.has(r)) issues.push(`${rel} [related path unknown] ${r}`);
    for (const l of [...txt.matchAll(/\]\((\/[^)\s#?]*)/g)].map(x => x[1])) {
      const u = l.replace(/^\/fr\//, '/');
      if (!valid.has(u)) issues.push(`${rel} [body link unknown] ${l}`);
      if (m && m[2] === 'fr' && !l.startsWith('/fr/')) issues.push(`${rel} [FR page links to EN] ${l}`);
      if (m && m[2] === 'en' && l.startsWith('/fr/')) issues.push(`${rel} [EN page links to FR] ${l}`);
    }
    // Highlights lists (their intro and entry texts) are page content too.
    const listWords = [...fm.matchAll(/^\s+(?:intro|text):\s*(.+)$/gm)].map(x => x[1]).join(' ').split(/\s+/).filter(Boolean).length;
    // A page showing the chalets (chalets: true) also carries their descriptions (src/content/chalets.ts).
    const chaletWords = m && /^chalets: true$/m.test(fm)
      ? [...fs.readFileSync(path.join(root, 'src/content/chalets.ts'), 'utf8').matchAll(new RegExp(`^\\s+${m[2]}: '(.+)',$`, 'gm'))].map(x => x[1]).join(' ').split(/\s+/).filter(Boolean).length
      : 0;
    // A page showing the hotels (hotels: true) also carries their card texts (src/content/hotels/).
    const hotelDir = m && path.join(root, 'src/content/hotels', m[2]);
    const hotelWords = m && /^hotels: true$/m.test(fm) && fs.existsSync(hotelDir)
      ? fs.readdirSync(hotelDir).map(h => (fs.readFileSync(path.join(hotelDir, h), 'utf8').match(/^card: "?(.+?)"?$/m) ?? [, ''])[1]).join(' ').split(/\s+/).filter(Boolean).length
      : 0;
    // A page showing the transfer routes (transfers: true) or the chef offer (dining: in) also carries
    // the texts of its data file shown on the page (src/content/transfers.ts, src/content/dining.ts;
    // strings of 25+ characters, so labels and keys are left out; dining.ts's tile copy is on the guide, not here).
    const dataFile = !m ? null : /^transfers: true$/m.test(fm) ? 'transfers.ts' : /^dining: in$/m.test(fm) ? 'dining.ts' : null;
    const dataWords = dataFile
      ? [...fs.readFileSync(path.join(root, 'src/content', dataFile), 'utf8').split(/^  fr: \{$/m)[m[2] === 'fr' ? 1 : 0].split(/^    split: \{$/m)[0].matchAll(/'([^']{25,})'/g)].map(x => x[1]).join(' ').split(/\s+/).filter(Boolean).length
      : 0;
    const wc = (txt.split('---').slice(2).join('---')).split(/\s+/).filter(Boolean).length + listWords + chaletWords + hotelWords + dataWords;
    // Hotel pages are fact sheets (facts, restaurants, photos in frontmatter), not articles.
    if (wc < 350 && m?.[1] !== 'hotels') issues.push(`${rel} [short body] ${wc} words`);
  }
}
for (const [k, v] of Object.entries(pairs)) if (v.length !== 2) issues.push(`${k} [missing translation] has only ${v}`);
console.log(`${files.length} files, ${Object.keys(pairs).length} page pairs, ${issues.length} issues`);
for (const i of issues) console.log(' -', i);
