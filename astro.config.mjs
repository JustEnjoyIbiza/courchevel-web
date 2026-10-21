// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical host. The old site served the bare domain; launch flips it to www (see audit/redirects.md).
  site: 'https://www.courchevelluxuryconcierge.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    // English lives at /, French at /fr/
    routing: { prefixDefaultLocale: false },
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } },
    }),
  ]
});
