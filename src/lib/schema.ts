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

/** Service page. Never add price, priceRange or offers. */
export function serviceSchema(opts: { name: string; description: string; url: string; locale: Locale; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: new URL(opts.url, business.url).href,
    inLanguage: opts.locale,
    ...(opts.image ? { image: new URL(opts.image, business.url).href } : {}),
    provider: orgRef(),
    areaServed: business.areaServed.map((name) => ({ '@type': 'Place', name })),
  };
}

export function articleSchema(opts: { headline: string; description: string; url: string; updated: Date; locale: Locale; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: new URL(opts.url, business.url).href,
    inLanguage: opts.locale,
    dateModified: opts.updated.toISOString().slice(0, 10),
    ...(opts.image ? { image: new URL(opts.image, business.url).href } : {}),
    author: orgRef(),
    publisher: orgRef(),
  };
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
