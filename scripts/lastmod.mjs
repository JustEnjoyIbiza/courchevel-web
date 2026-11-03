/**
 * Map of page URL -> last updated date, read from content frontmatter
 * (`updated:`), for <lastmod> in the sitemap. Pages without their own date
 * (home, hubs, FAQ, enquire) use the hub date from src/content/hubs.ts.
 */
import fs from 'node:fs';
import path from 'node:path';

export function buildLastmod(root, site) {
  const map = new Map();
  const hubs = fs.readFileSync(path.join(root, 'src/content/hubs.ts'), 'utf8');
  const fallback = hubs.match(/hubsUpdated = new Date\('(\d{4}-\d{2}-\d{2})'\)/)?.[1];

  const routeFor = { services: (s) => `/services/${s}/`, guides: (s) => `/guides/${s}/`, villages: (s) => `/${s}/`, pages: (s) => `/${s}/` };
  for (const [collection, toPath] of Object.entries(routeFor)) {
    for (const locale of ['en', 'fr']) {
      const dir = path.join(root, 'src/content', collection, locale);
      if (!fs.existsSync(dir)) continue;
      for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
        const updated = fs.readFileSync(path.join(dir, file), 'utf8').match(/^updated:\s*['"]?(\d{4}-\d{2}-\d{2})/m)?.[1];
        const p = toPath(file.replace(/\.md$/, ''));
        if (updated) map.set(new URL((locale === 'fr' ? '/fr' : '') + p, site).href, updated);
      }
    }
  }
  return (url) => map.get(url) ?? fallback;
}
