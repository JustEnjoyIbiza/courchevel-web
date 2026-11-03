/**
 * The single source of truth for every business fact on the site.
 *
 * The footer, contact links, JSON-LD schema and llms.txt are all generated
 * from this file. Never hard-code a phone number, email or address anywhere
 * else: change it here and it changes everywhere.
 *
 * Values marked TODO are still missing. See docs/missing-facts.md.
 */

export type Locale = 'en' | 'fr';

export const business = {
  name: 'Courchevel Luxury Concierge',
  url: 'https://www.courchevelluxuryconcierge.com',

  /** The one 50-word description used on Google, Bing, Apple, directories and the site. TODO: approve final wording. */
  description: {
    en: 'Courchevel Luxury Concierge is a luxury concierge in Courchevel, French Alps. We arrange chalets and palace hotels, helicopter and chauffeur transfers, private ski instructors, private chefs, household staff and childcare across Courchevel 1850, 1650 Moriond, 1550 Village, Le Praz and La Tania, 24/7 in winter.',
    fr: 'Courchevel Luxury Concierge est une conciergerie de luxe à Courchevel, dans les Alpes françaises. Nous organisons chalets et palaces, transferts en hélicoptère et avec chauffeur, moniteurs de ski privés, chefs à domicile, personnel de maison et garde d’enfants à Courchevel 1850, 1650 Moriond, 1550 Village, Le Praz et La Tania, 24 h/24 en hiver.',
  },

  phone: {
    display: '+33 7 57 51 80 56',
    e164: '+33757518056',
  },

  whatsapp: {
    number: '33757518056',
    prefill: {
      en: "Hello, I'm planning a stay in Courchevel from ",
      fr: 'Bonjour, je prépare un séjour à Courchevel du ',
    },
  },

  /** Will move to a domain address (e.g. hello@courchevelluxuryconcierge.com). Change it here only. */
  email: 'Courchevelluxuryconcierge@gmail.com',

  /**
   * TODO (due 15 November 2026): street address.
   * Until it is set, the site shows `locality, region, country` only and the
   * schema outputs NO streetAddress (service-area business).
   */
  address: {
    streetAddress: null as string | null,
    postalCode: null as string | null,
    locality: 'Courchevel',
    region: 'Savoie',
    countryCode: 'FR',
    countryName: { en: 'France', fr: 'France' },
  },

  /** Approximate centre of Courchevel 1850, used for the schema geo hint only. */
  geo: { latitude: 45.4153, longitude: 6.6346 },

  areaServed: [
    'Courchevel 1850',
    'Courchevel 1650 Moriond',
    'Courchevel 1550 Village',
    'Courchevel 1300 Le Praz',
    'La Tania',
    'Méribel',
    'Val Thorens',
    'Les Trois Vallées',
  ],

  availability: {
    en: '24/7 during the winter season',
    fr: '24h/24 et 7j/7 pendant la saison d’hiver',
  },

  /** Reply promise shown on the site. TODO: confirm hours and who answers. */
  replyPromise: {
    en: 'We reply within 15 minutes, 8:00 to 22:00',
    fr: 'Réponse sous 15 minutes, de 8 h à 22 h',
  },

  /** Winter season 2026/27 (courchevel.com). */
  season: { opens: '2026-12-04', closes: '2027-04-18' },

  /**
   * Official profiles. Keep name, phone and description identical on every one
   * (see docs/platform-profiles-kit.md). Each live profile goes into `sameAs`.
   */
  profiles: {
    google: {
      /** Google Business Profile (found 22 October 2026: 5.0 from 14 reviews). */
      placeId: 'ChIJPRJmAL2Kv4ARuPyRohUWW9M',
      cid: '15229790847061064888',
      mapsUrl: 'https://maps.google.com/?cid=15229790847061064888',
      reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJPRJmAL2Kv4ARuPyRohUWW9M',
      /**
       * Rating shown on the homepage when GOOGLE_PLACES_API_KEY is not set (with the key, live numbers
       * are read at build time). Update all three when you check the profile: the launch check fails
       * once `checked` is more than 45 days old, so no stale number reaches clients.
       */
      rating: { value: 5.0, count: 14, checked: '2026-10-22' },
    },
    instagram: {
      handle: 'courchevelluxuryconcierge',
      url: 'https://www.instagram.com/courchevelluxuryconcierge/',
    },
  },

  /** Official profiles for schema sameAs. TODO as they go live: Bing Places, Apple Business Connect, Tripadvisor, LinkedIn, Facebook, Trustpilot. */
  sameAs: [
    'https://www.instagram.com/courchevelluxuryconcierge/',
    'https://maps.google.com/?cid=15229790847061064888',
  ],

  /**
   * For the legal notice (/mentions-legales/) and privacy policy (src/components/LegalFacts.astro).
   * null = still to come from the owner: the page shows "To be confirmed" and the launch check
   * fails until it is filled. undefined = does not apply, so the line is hidden.
   */
  legal: {
    // Owner, 3 Nov 2026: a self-employed person (autónomo) registered in Spain, so no SIRET, RCS or capital.
    individual: true,
    entityName: 'Ivan Savchak' as string | null,
    legalForm: {
      en: 'Autónomo (self-employed, registered in Spain)',
      fr: 'Autónomo (entrepreneur individuel immatriculé en Espagne)',
    } as { en: string; fr: string } | null,
    capital: undefined as string | null | undefined,
    registeredAddress: null as string | null, // TODO business address (owner, 3 Nov: to be confirmed, Spain and France)
    taxId: '60888451E' as string | null | undefined, // Spanish NIF, also the VAT number (owner, 3 Nov)
    siret: undefined as string | null | undefined,
    rcs: undefined as string | null | undefined,
    // No intra-EU VAT number: ES60888451E not in VIES (checked 3 Nov 2026). Set it here if the ROI registration comes.
    vatNumber: undefined as string | null | undefined,
    publisher: 'Ivan Savchak' as string | null, // directeur de la publication: the entrepreneur in person
    /** Only if they apply (docs/owner-checklist.md): Atout France registration, carte professionnelle, consumer mediator. */
    tourismRegistration: undefined as string | undefined,
    professionalCard: undefined as string | undefined,
    mediator: undefined as string | undefined,
    host: {
      name: 'Netlify, Inc.',
      // From netlify.com/privacy, checked 26 Oct 2026.
      address: '101 2nd Street, San Francisco, CA 94105, United States',
      website: 'https://www.netlify.com',
    },
  },

  founder: {
    name: null as string | null, // TODO
    languages: [] as string[], // TODO
    sinceYear: null as number | null, // TODO year started in Courchevel
  },

  /**
   * Every service is quoted personally. The only prices shown are the two exceptions in CLAUDE.md
   * (weekly chalet prices, "from" transfer prices), each with the note that they vary.
   */
  pricing: 'on-request' as const,
} as const;

export const hasStreetAddress = () => Boolean(business.address.streetAddress && business.address.postalCode);

export const telHref = `tel:${business.phone.e164}`;
export const mailtoHref = `mailto:${business.email}`;
/** WhatsApp chat link; `text` replaces the default stay message (see src/content/requests.ts). */
export const whatsappHref = (locale: Locale = 'en', text?: string) =>
  `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(text ?? business.whatsapp.prefill[locale])}`;
