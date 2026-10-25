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
import { REQUEST_TYPES } from './lib/requests';
import { SERVICE_SLUGS } from './lib/lead';

/** A numbered selection (e.g. ten tables to know, the five palaces). */
const highlightSection = z.object({
  eyebrow: z.string(),
  title: z.string(),
  intro: z.string().optional(),
  /** Each entry gets a request button for this type, pre-filled with its name ('stay': the Plan my stay form). */
  request: z.enum(['stay', ...REQUEST_TYPES]).optional(),
  /** Service ticked in the form when a stay is requested from this list, e.g. 'chalets'. */
  service: z.enum(SERVICE_SLUGS as [string, ...string[]]).optional(),
  /** Button label for each entry, e.g. "Ask about this hotel". Defaults to the request's own. */
  button: z.string().optional(),
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
        /** A related page, e.g. the hotel's restaurant on Where to eat. Unlocalized path. */
        link: z.object({ href: z.string().regex(/^\/[a-z0-9\-/]*\/(#[a-z0-9-]+)?$/), label: z.string() }).optional(),
      }),
    )
    .min(3)
    .max(12),
});

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
  /** Show the chalets available this winter (src/content/chalets.ts) right after the answer. */
  chalets: z.boolean().optional(),
  /** Show the hotels (src/content/hotels/) as cards right after the answer. */
  hotels: z.boolean().optional(),
  /** Legal pages: the identity block from business.legal (src/components/LegalFacts.astro). */
  legal: z.enum(['notice', 'privacy']).optional(),
  /** Numbered selections shown right after the answer, one after the other. */
  highlights: z.array(highlightSection).max(3).optional(),
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

/**
 * One page per hotel: /palace-hotels-courchevel/<slug>/ (src/pages/palace-hotels-courchevel/).
 * Facts only, each from a source listed in `sources`; photos in src/assets/hotels/<slug>/.
 * No prices (hard rule 1).
 */
const hotels = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hotels' }),
  schema: z.object({
    name: z.string(),
    kind: z.enum(['palace', 'five-star']),
    /** Position within its group on the hotels page. */
    order: z.number(),
    /** Where it is, e.g. "Le Jardin Alpin, Courchevel 1850". */
    place: z.string(),
    /** Short line under the name, e.g. "Palace · Ski-in, ski-out". */
    label: z.string(),
    /** One or two sentences for the card on the hotels page. */
    card: z.string(),
    metaTitle: z.string().max(59),
    description: z.string().max(154),
    /** The opening paragraph of the hotel's page. */
    intro: z.string(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).min(3),
    restaurants: z
      .array(z.object({ name: z.string(), text: z.string(), link: z.string().regex(/^\/[a-z0-9\-/]*\/(#[a-z0-9-]+)?$/).optional() }))
      .default([]),
    /** Facilities worth knowing, one short line each. */
    features: z.array(z.string()).default([]),
    /** "Photos: Cheval Blanc Courchevel" */
    credit: z.string(),
    /** Where each fact comes from (not shown). */
    sources: z.array(z.url()).min(1),
    /** When the facts were last checked; shown on the page. */
    checked: z.coerce.date(),
  }),
});

export const collections = { services, villages, guides, pages, hotels };
