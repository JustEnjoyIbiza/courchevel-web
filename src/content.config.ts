/**
 * Content collections. One Markdown file per page per language:
 *   src/content/<collection>/<en|fr>/<slug>.md
 * The same slug in both folders makes an EN/FR pair (hreflang).
 * Page rules (CLAUDE.md): answer first, facts, FAQ, 3 related links,
 * last-updated date, no prices.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { photoKeys } from './data/photos';

const pageFields = {
  /** The H1. */
  title: z.string(),
  /** <title>, under 60 characters. */
  metaTitle: z.string().max(59),
  /** Meta description, under 155 characters. */
  description: z.string().max(154),
  /** Direct 2-3 sentence answer to the page's main question. Shown first. */
  answer: z.string(),
  /** "Last updated" date shown on the page. */
  updated: z.coerce.date(),
  image: z.enum(photoKeys).optional(),
  imageAlt: z.string().optional(),
  /** Key facts as label/value pairs (times, distances, how far ahead to book). */
  facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  /** "What's included" list. */
  includes: z.array(z.string()).default([]),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  /** Exactly 3 unlocalized internal paths, e.g. '/services/transfers/'. */
  related: z.array(z.string().regex(/^\/[a-z0-9\-/]*\/$/)).length(3),
  /** Shorter name for breadcrumbs and link lists. */
  shortTitle: z.string().optional(),
  /** Numbered selection shown right after the answer (e.g. ten tables to know). */
  highlights: z
    .object({
      eyebrow: z.string(),
      title: z.string(),
      intro: z.string().optional(),
      items: z
        .array(
          z.object({
            name: z.string(),
            /** Where it is, e.g. "Cheval Blanc, Courchevel 1850". */
            place: z.string(),
            /** Short label, e.g. "Three Michelin stars". */
            kind: z.string(),
            text: z.string(),
            photo: z.enum(photoKeys).optional(),
            alt: z.string().optional(),
            /** Shown under the photo, e.g. "Photo: Le Chabichou" (venue photos; sources in docs/photo-credits.md). */
            credit: z.string().optional(),
          }),
        )
        .min(3)
        .max(12),
    })
    .optional(),
};

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object(pageFields),
});

const villages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/villages' }),
  schema: z.object(pageFields),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object(pageFields),
});

/** Single pages such as About. */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({ ...pageFields, related: pageFields.related.optional() }),
});

export const collections = { services, villages, guides, pages };
