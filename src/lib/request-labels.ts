/**
 * Labels for short requests, shared by the request forms and by the emails
 * and Telegram alert. French: to be reviewed by a native speaker.
 */
import type { LeadLocale, RequestLead } from './lead.ts';
import type { RequestField, RequestType } from './requests.ts';
import { formatDate } from './lead-labels.ts';

export const requestNames: Record<LeadLocale, Record<RequestType, string>> = {
  en: { table: 'Table', vip: 'VIP table', transfer: 'Transfer', instructor: 'Ski instructor', chef: 'Private chef', experience: 'Experience', nanny: 'Nanny', treatment: 'Treatment', general: 'Request' },
  fr: { table: 'Table', vip: 'Table VIP', transfer: 'Transfert', instructor: 'Moniteur de ski', chef: 'Chef privé', experience: 'Activité', nanny: 'Nounou', treatment: 'Soin', general: 'Demande' },
};

type Labels = Record<RequestField, string>;
const base: Record<LeadLocale, Labels> = {
  en: { item: 'Name', from: 'From', to: 'To', date: 'Date', dateTo: 'Last day', time: 'Time', flight: 'Flight or train number', guests: 'Guests', details: 'Details', staying: 'Staying at' },
  fr: { item: 'Nom', from: 'Départ', to: 'Arrivée', date: 'Date', dateTo: 'Dernier jour', time: 'Heure', flight: 'Numéro de vol ou de train', guests: 'Personnes', details: 'Précisions', staying: 'Hébergement' },
};

/** Per-type wording where the generic label would read oddly. */
const overrides: Record<LeadLocale, Partial<Record<RequestType, Partial<Labels>>>> = {
  en: {
    table: { item: 'Restaurant' },
    vip: { item: 'Venue or evening' },
    transfer: { guests: 'Passengers' },
    instructor: { item: 'Lessons or guide', date: 'First day', guests: 'Skiers', details: 'Levels and ages' },
    chef: { item: 'Format', date: 'First evening', dateTo: 'Last evening' },
    experience: { item: 'Experience' },
    nanny: { date: 'First day', guests: 'Children', details: 'Ages and times' },
    treatment: { item: 'Treatment', guests: 'People' },
    general: { date: 'Date, if any', details: 'Your request' },
  },
  fr: {
    table: { item: 'Restaurant' },
    vip: { item: 'Établissement ou soirée' },
    transfer: { guests: 'Passagers' },
    instructor: { item: 'Cours ou guide', date: 'Premier jour', guests: 'Skieurs', details: 'Niveaux et âges' },
    chef: { item: 'Formule', date: 'Premier soir', dateTo: 'Dernier soir', guests: 'Convives' },
    experience: { item: 'Activité' },
    nanny: { date: 'Premier jour', guests: 'Enfants', details: 'Âges et horaires' },
    treatment: { item: 'Soin' },
    general: { date: 'Date, le cas échéant', details: 'Votre demande' },
  },
};

export const fieldLabel = (type: RequestType, field: RequestField, locale: LeadLocale) =>
  overrides[locale][type]?.[field] ?? base[locale][field];

/** The request's fields as label/value rows, in form order, empty ones left out. */
export function requestRows(lead: RequestLead, locale: LeadLocale): [string, string][] {
  const value: Record<RequestField, string> = {
    item: lead.item,
    from: lead.from,
    to: lead.to,
    date: lead.date ? formatDate(lead.date, locale) : '',
    dateTo: lead.dateTo ? formatDate(lead.dateTo, locale) : '',
    time: lead.time,
    flight: lead.flight,
    guests: lead.guests === null ? '' : String(lead.guests),
    details: lead.details,
    staying: lead.staying,
  };
  const order: RequestField[] = ['item', 'from', 'to', 'date', 'dateTo', 'time', 'flight', 'guests', 'details', 'staying'];
  return order.filter((f) => value[f]).map((f) => [fieldLabel(lead.requestType, f, locale), value[f]]);
}

/** One line: "Table · Bagatelle · Sat, 28 December 2026, 13:00 · Guests: 6". */
export function requestSummary(lead: RequestLead, locale: LeadLocale): string {
  const when = lead.date
    ? `${formatDate(lead.date, locale)}${lead.dateTo ? ` – ${formatDate(lead.dateTo, locale)}` : ''}${lead.time ? `, ${lead.time}` : ''}`
    : '';
  return [
    requestNames[locale][lead.requestType],
    lead.item,
    lead.from && lead.to ? `${lead.from} → ${lead.to}` : '',
    when,
    lead.guests === null ? '' : `${fieldLabel(lead.requestType, 'guests', locale)}: ${lead.guests}`,
  ]
    .filter(Boolean)
    .join(' · ');
}
