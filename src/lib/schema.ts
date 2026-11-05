/**
 * JSON-LD builders. Everything comes from src/data/business.ts so the schema
 * can never drift from what the page says.
 *
 * Rules (see CLAUDE.md): no price or offers, no streetAddress until the real
 * address is set, Review only for real reviews supplied by the owner.
 */
import { business, hasStreetAddress, type Locale } from '../data/business';
import { services } from '../data/services';

const orgId = `${business.url}/#organization`;

/** Compact reference to the business, with name and URL so it stands alone on any page. */
const orgRef = () => ({ '@type': 'LocalBusiness', '@id': orgId, name: business.name, url: business.url, telephone: business.phone.e164 });

/** YYYY-MM-DD, the form used for every date in the schema. */
const day = (d: Date) => d.toISOString().slice(0, 10);

function postalAddress() {
  const a = business.address;
  return {
    '@type': 'PostalAddress',
    ...(hasStreetAddress() ? { streetAddress: a.streetAddress, postalCode: a.postalCode } : {}),
    addressLocality: a.locality,
    addressRegion: a.region,
    addressCountry: a.countryCode,
  };
}

export function localBusinessSchema(locale: Locale = 'en', opts: { image?: string } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': orgId,
    name: business.name,
    url: business.url,
    description: business.description[locale],
    telephone: business.phone.e164,
    email: business.email,
    address: postalAddress(),
    geo: { '@type': 'GeoCoordinates', ...business.geo },
    areaServed: business.areaServed.map((name) => ({ '@type': 'Place', name })),
    sameAs: [...business.sameAs],
    hasMap: business.profiles.google.mapsUrl,
    logo: `${business.url}/icon-512.png`,
    image: opts.image ? new URL(opts.image, business.url).href : `${business.url}/icon-512.png`,
    knowsAbout: services.map((s) => s.name[locale]),
    knowsLanguage: business.founder.languages.length ? [...business.founder.languages] : ['en', 'fr'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.phone.e164,
      email: business.email,
      contactType: 'reservations',
      availableLanguage: ['English', 'French'],
      areaServed: 'FR',
    },
    ...(business.founder.name ? { founder: { '@type': 'Person', name: business.founder.name } } : {}),
  };
}

/** WebSite entity for the homepage: names the site and its languages. */
export function websiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${business.url}/#website`,
    name: business.name,
    url: business.url,
    inLanguage: ['en', 'fr'],
    publisher: orgRef(),
    description: business.description[locale],
  };
}

/** Service page. Never add price, priceRange or offers. (Service has no inLanguage in schema.org.) */
export function serviceSchema(opts: { name: string; description: string; url: string; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: new URL(opts.url, business.url).href,
    ...(opts.image ? { image: new URL(opts.image, business.url).href } : {}),
    provider: orgRef(),
    areaServed: business.areaServed.map((name) => ({ '@type': 'Place', name })),
  };
}

export function articleSchema(opts: { headline: string; description: string; url: string; updated: Date; published?: Date; locale: Locale; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: new URL(opts.url, business.url).href,
    inLanguage: opts.locale,
    datePublished: day(opts.published ?? opts.updated),
    dateModified: day(opts.updated),
    ...(opts.image ? { image: new URL(opts.image, business.url).href } : {}),
    author: orgRef(),
    publisher: orgRef(),
  };
}

/**
 * A page about someone else's place (a hotel, a chalet): a WebPage of this site whose `about` is that
 * place, so engines never read it as the place's own site. Facts only from the page's data; no price,
 * offers or rating (hard rule 1).
 */
function placePageSchema(opts: { url: string; title: string; locale: Locale; updated: Date; about: Record<string, unknown> }) {
  const url = new URL(opts.url, business.url).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.title,
    inLanguage: opts.locale,
    dateModified: day(opts.updated),
    isPartOf: { '@type': 'WebSite', '@id': `${business.url}/#website`, name: business.name, url: business.url },
    publisher: orgRef(),
    about: opts.about,
  };
}

/** Hotel page: the hotel's name, place and own website, from its sourced facts. */
export function hotelPageSchema(opts: {
  url: string; title: string; locale: Locale; checked: Date;
  name: string; description: string; place: string; website?: string; image?: string;
}) {
  return placePageSchema({
    url: opts.url, title: opts.title, locale: opts.locale, updated: opts.checked,
    about: {
      '@type': 'Hotel',
      name: opts.name,
      description: opts.description,
      address: opts.place,
      ...(opts.website ? { url: opts.website } : {}),
      ...(opts.image ? { image: new URL(opts.image, business.url).href } : {}),
    },
  });
}

/** Chalet or apartment page: size, bedrooms, guests and village from src/content/chalets.ts. */
export function accommodationPageSchema(opts: {
  url: string; title: string; locale: Locale; checked: Date;
  name: string; description: string; locality: string; apartment: boolean;
  bedrooms: number; guests: string; size?: number | [number, number]; skiInOut?: boolean; image?: string;
}) {
  // "10–14" -> min 10, max 14; "12" -> max 12.
  const [lo, hi] = opts.guests.split(/[–-]/).map((n) => Number(n.trim()));
  const area = Array.isArray(opts.size) ? { minValue: opts.size[0], maxValue: opts.size[1] } : { value: opts.size };
  return placePageSchema({
    url: opts.url, title: opts.title, locale: opts.locale, updated: opts.checked,
    about: {
      '@type': opts.apartment ? 'Apartment' : 'House',
      name: opts.name,
      description: opts.description,
      address: { '@type': 'PostalAddress', addressLocality: opts.locality, addressRegion: business.address.region, addressCountry: business.address.countryCode },
      numberOfBedrooms: opts.bedrooms,
      occupancy: { '@type': 'QuantitativeValue', ...(hi ? { minValue: lo, maxValue: hi } : { maxValue: lo }) },
      ...(opts.size === undefined ? {} : { floorSize: { '@type': 'QuantitativeValue', ...area, unitCode: 'MTK' } }),
      ...(opts.skiInOut ? { amenityFeature: { '@type': 'LocationFeatureSpecification', name: 'Ski-in, ski-out', value: true } } : {}),
      ...(opts.image ? { image: new URL(opts.image, business.url).href } : {}),
    },
  });
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.url, business.url).href,
    })),
  };
}
