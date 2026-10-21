/**
 * Human labels for lead values, used by the enquiry form and by the
 * confirmation / alert messages. French: to be reviewed by a native speaker.
 */
import type { BookingFor, ContactPref, LeadLocale, Village } from './lead.ts';
import { services } from '../data/services.ts';

export const villageLabels: Record<LeadLocale, Record<Village, string>> = {
  en: {
    '1850': 'Courchevel 1850',
    '1650': 'Courchevel 1650 Moriond',
    '1550': 'Courchevel 1550 Village',
    'le-praz': 'Courchevel 1300 Le Praz',
    'la-tania': 'La Tania',
    'not-sure': 'Not sure yet',
  },
  fr: {
    '1850': 'Courchevel 1850',
    '1650': 'Courchevel 1650 Moriond',
    '1550': 'Courchevel 1550 Village',
    'le-praz': 'Courchevel 1300 Le Praz',
    'la-tania': 'La Tania',
    'not-sure': 'Je ne sais pas encore',
  },
};

export const bookingForLabels: Record<LeadLocale, Record<BookingFor, string>> = {
  en: { myself: 'Myself and my group', client: 'A client (assistant, family office, agent)', company: 'A company' },
  fr: { myself: 'Moi et mon groupe', client: 'Un client (assistant, family office, agence)', company: 'Une entreprise' },
};

export const contactLabels: Record<LeadLocale, Record<ContactPref, string>> = {
  en: { whatsapp: 'WhatsApp', phone: 'Phone call', email: 'Email' },
  fr: { whatsapp: 'WhatsApp', phone: 'Appel téléphonique', email: 'E-mail' },
};

export const serviceLabel = (slug: string, locale: LeadLocale) =>
  services.find((s) => s.slug === slug)?.name[locale] ?? slug;

export const formatDate = (iso: string, locale: LeadLocale) =>
  new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'fr-FR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
