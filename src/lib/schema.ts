/**
 * JSON-LD builders. Everything comes from src/data/business.ts so the schema
 * can never drift from what the page says.
 *
 * Rules (see CLAUDE.md): no price or offers, no streetAddress until the real
 * address is set, Review only for real reviews supplied by the owner.
 */
import { business, hasStreetAddress, type Locale } from '../data/business';

const orgId = `${business.url}/#organization`;

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

export function localBusinessSchema(locale: Locale = 'en') {
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
    ...(business.founder.name ? { founder: { '@type': 'Person', name: business.founder.name } } : {}),
    ...(business.founder.languages.length ? { knowsLanguage: [...business.founder.languages] } : {}),
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
