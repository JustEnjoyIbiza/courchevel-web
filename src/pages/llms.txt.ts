/**
 * /llms.txt (llmstxt.org): a plain summary of the business with links to the
 * key pages, generated from the same data as the site so it never drifts.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { business, hasStreetAddress } from '../data/business';
import { services } from '../data/services';
import { villages } from '../data/villages';
import { experiencesPage } from '../content/experiences-page';
import { allFaqs } from '../content/faq';
import { splitId } from '../lib/routes';
import { skiArea } from '../content/ski-area';

export const GET: APIRoute = async ({ site }) => {
  const url = (p: string) => new URL(p, site).href;
  const guides = (await getCollection('guides')).filter((g) => splitId(g.id).locale === 'en');
  const pages = (await getCollection('pages')).filter((g) => splitId(g.id).locale === 'en' && splitId(g.id).slug !== 'about');
  const a = business.address;
  const address = hasStreetAddress()
    ? `${a.streetAddress}, ${a.postalCode} ${a.locality}, ${a.countryName.en}`
    : `${a.locality}, ${a.region}, ${a.countryName.en} (service-area business)`;

  const lines = [
    `# ${business.name}`,
    '',
    `> ${business.description.en}`,
    '',
    '## Key facts',
    '',
    `- Website: ${business.url}`,
    `- Phone and WhatsApp: ${business.phone.display} (https://wa.me/${business.whatsapp.number})`,
    `- Email: ${business.email}`,
    `- Location: ${address}`,
    `- Area served: ${business.areaServed.join(', ')}`,
    `- Availability: ${business.availability.en}`,
    `- Reply time: ${business.replyPromise.en}; a tailored proposal within 24 hours`,
    `- Winter season 2026/27: ${business.season.opens} to ${business.season.closes}`,
    '- Pricing: no published prices; every service is quoted personally for the dates, group and village',
    '- Languages of the site: English and French (French pages under /fr/)',
    '- How to enquire: the Plan my stay form, WhatsApp, phone or email; assistants, family offices and travel agents may book for clients',
    '- Heli-skiing: arranged only as day trips to Italy or Switzerland, because heli-drops are banned in France',
    '',
    '## Services',
    '',
    ...services.map((s) => `- [${s.name.en}](${url(`/services/${s.slug}/`)}): ${s.summary.en}`),
    '',
    '## Experiences (arranged on request, subject to weather and availability)',
    '',
    ...experiencesPage.en.experiences.map((x) => `- [${x.title}](${url('/experiences/')}): ${x.short}`),
    '',
    '## Villages',
    '',
    ...villages.map((v) => `- [${v.name}](${url(`/${v.slug}/`)}) (${v.altitude} m): ${v.summary.en}`),
    '',
    '## Planning pages',
    '',
    ...pages.map((g) => `- [${g.data.title}](${url(`/${splitId(g.id).slug}/`)}): ${g.data.description}`),
    `- [${skiArea.en.title}](${url('/courchevel-ski-area/')}): ${skiArea.en.description}`,
    '',
    '## Guides',
    '',
    ...guides.map((g) => `- [${g.data.title}](${url(`/guides/${splitId(g.id).slug}/`)}): ${g.data.description}`),
    '',
    '## Frequently asked',
    '',
    ...allFaqs('en').filter((f) => f.home).map((f) => `- ${f.q} ${f.a}`),
    `- More answers: ${url('/faq/')}`,
    '',
    '## Optional',
    '',
    `- [About](${url('/about/')})`,
    `- [Plan my stay](${url('/enquire/')})`,
    `- [French version](${url('/fr/')})`,
    `- [Sitemap](${url('/sitemap-index.xml')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
