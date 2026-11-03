// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';
import { buildLastmod } from './scripts/lastmod.mjs';

const SITE = 'https://www.courchevelluxuryconcierge.com';
const lastmodFor = buildLastmod(fileURLToPath(new URL('.', import.meta.url)), SITE);

// https://astro.build/config
export default defineConfig({
  // Canonical host. The old site served the bare domain; launch flips it to www (see audit/redirects.md).
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },

  // Content Security Policy as a <meta> tag with hashes for every script and
  // style Astro emits. Third parties allowed: Cloudflare Turnstile (spam check)
  // and Google Analytics (only loaded after consent).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
        "font-src 'self'",
        "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
        "frame-src https://challenges.cloudflare.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: {
        resources: ["'self'", 'https://challenges.cloudflare.com', 'https://www.googletagmanager.com'],
      },
      styleDirective: {
        // Inline style attributes (e.g. safe-area padding on the mobile bar).
        resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },

  // No code blocks on this site; Shiki's inline styles would clash with the CSP.
  markdown: { syntaxHighlight: false },

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    // English lives at /, French at /fr/
    routing: { prefixDefaultLocale: false },
  },

  vite: {
    plugins: [tailwindcss()],
    // Never inline fonts as data: URIs (the CSP only allows fonts from 'self').
    build: { assetsInlineLimit: (file) => (/\.(woff2?|ttf|otf)$/.test(file) ? false : undefined) },
  },

  integrations: [
    mdx(),
    sitemap({
      // Thank-you and short request pages (/enquire/<type>/) are noindex and stay out of the sitemap.
      filter: (page) => !/\/enquire\/[a-z-]+\/$/.test(page),
      i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } },
      serialize(item) {
        const lastmod = lastmodFor(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ]
});
