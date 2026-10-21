/**
 * URL helpers. EN lives at /, FR mirrors the same slugs under /fr/.
 *
 * `isBuilt()` knows which pages exist (from src/pages at build time), so
 * components can link to pages from later phases without producing broken
 * links: until the page exists, the link renders as plain text.
 */
import type { Locale } from '../data/business';

const pageFiles = Object.keys(import.meta.glob('/src/pages/**/*.{astro,md,mdx}'));

const builtRoutes = new Set(
  pageFiles
    .filter((f) => !f.includes('['))
    .map((f) =>
      f
        .replace('/src/pages', '')
        .replace(/\.(astro|mdx?)$/, '')
        .replace(/\/index$/, '/')
        .replace(/([^/])$/, '$1/'),
    ),
);

/** '/services/chalets/' + 'fr' -> '/fr/services/chalets/' */
export function localize(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? clean : `/fr${clean === '/' ? '/' : clean}`;
}

/** '/fr/services/' -> '/services/' */
export function unlocalize(path: string): string {
  return path.replace(/^\/fr(\/|$)/, '/');
}

export function isBuilt(path: string): boolean {
  return builtRoutes.has(path.split('#')[0] || '/');
}
