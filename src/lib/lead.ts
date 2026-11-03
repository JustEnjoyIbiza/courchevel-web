/**
 * The lead model, shared by the enquiry forms (browser) and the Netlify
 * Function (server), so both validate exactly the same way.
 * Two kinds of lead: a full stay (the 3-step Plan my stay form) and a short
 * request for one service (src/lib/requests.ts).
 * No runtime dependencies; imports use explicit .ts extensions so the file
 * also runs under Node's type stripping in tests.
 */
import { services } from '../data/services.ts';
import { REQUEST_SPECS, isRequestType, type RequestType } from './requests.ts';

export const VILLAGES = ['1850', '1650', '1550', 'le-praz', 'la-tania', 'not-sure'] as const;
export const BOOKING_FOR = ['myself', 'client', 'company'] as const;
export const CONTACT_PREFS = ['whatsapp', 'phone', 'email'] as const;
export const SERVICE_SLUGS = services.map((s) => s.slug);
export const LOCALES = ['en', 'fr'] as const;

export type Village = (typeof VILLAGES)[number];
export type BookingFor = (typeof BOOKING_FOR)[number];
export type ContactPref = (typeof CONTACT_PREFS)[number];
export type LeadLocale = (typeof LOCALES)[number];

interface Contact {
  name: string;
  email: string;
  phone: string;
  preferredContact: ContactPref;
  consent: true;
}

interface Source {
  locale: LeadLocale;
  page: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

export interface Lead extends Contact, Source {
  kind: 'stay';
  arrival: string;
  departure: string;
  datesFlexible: boolean;
  village: Village;
  adults: number;
  children: number;
  childrenAges: string;
  services: string[];
  experience: string;
  budget: string;
  bookingFor: BookingFor;
  message: string;
}

/** A short request for one service. Empty strings for fields the type does not use. */
export interface RequestLead extends Contact, Source {
  kind: 'request';
  requestType: RequestType;
  service: string;
  item: string;
  from: string;
  to: string;
  date: string;
  dateTo: string;
  time: string;
  flight: string;
  guests: number | null;
  details: string;
  staying: string;
}

export type AnyLead = Lead | RequestLead;

export interface ValidationResult<T = Lead> {
  ok: boolean;
  lead?: T;
  /** Field name -> error code ('required', 'invalid', 'range', 'order', 'end'). */
  errors: Record<string, string>;
}

type Input = Record<string, string | string[] | undefined>;

const str = (v: unknown, max = 200): string => (typeof v === 'string' ? v : Array.isArray(v) ? String(v[0] ?? '') : '').trim().slice(0, max);
const list = (v: unknown): string[] => (Array.isArray(v) ? v : typeof v === 'string' && v ? v.split(',') : []).map((x) => String(x).trim()).filter(Boolean);
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
const isTrue = (v: unknown) => ['on', 'true', 'yes', '1'].includes(str(v, 5).toLowerCase());
const startOf = (today: Date) => new Date(today.toISOString().slice(0, 10));
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{6,24}$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Name, email, phone and consent: the same rules for every form. */
function readContact(input: Input, errors: Record<string, string>): Omit<Contact, 'consent'> {
  const name = str(input.name, 120);
  if (name.length < 2) errors.name = 'required';

  const email = str(input.email, 200).toLowerCase();
  if (!EMAIL.test(email)) errors.email = email ? 'invalid' : 'required';

  const preferredContact = (str(input.preferredContact, 10) || 'whatsapp') as ContactPref;
  if (!CONTACT_PREFS.includes(preferredContact)) errors.preferredContact = 'invalid';

  const phone = str(input.phone, 30);
  if (phone && !PHONE.test(phone)) errors.phone = 'invalid';
  if (!phone && (preferredContact === 'whatsapp' || preferredContact === 'phone')) errors.phone = 'required';

  if (!isTrue(input.consent)) errors.consent = 'required';
  return { name, email, phone, preferredContact };
}

function readSource(input: Input): Source {
  const locale = (LOCALES as readonly string[]).includes(str(input.locale, 2)) ? (str(input.locale, 2) as LeadLocale) : 'en';
  return {
    locale,
    page: str(input.page, 300),
    referrer: str(input.referrer, 300),
    utmSource: str(input.utm_source, 100),
    utmMedium: str(input.utm_medium, 100),
    utmCampaign: str(input.utm_campaign, 100),
  };
}

/**
 * Validate the Plan my stay form (from FormData or JSON). `today` is injectable for tests.
 * Rules: dates required and departure after arrival; at least one adult; at least
 * one service; name, email and consent required; phone required when the
 * preferred contact is WhatsApp or phone.
 */
export function validateLead(input: Input, today = new Date()): ValidationResult<Lead> {
  const errors: Record<string, string> = {};

  const arrival = str(input.arrival, 10);
  const departure = str(input.departure, 10);
  if (!isDate(arrival)) errors.arrival = arrival ? 'invalid' : 'required';
  if (!isDate(departure)) errors.departure = departure ? 'invalid' : 'required';
  if (!errors.arrival && !errors.departure) {
    if (new Date(arrival) < startOf(today)) errors.arrival = 'range';
    if (new Date(departure) <= new Date(arrival)) errors.departure = 'order';
  }

  const village = str(input.village, 20) as Village;
  if (!VILLAGES.includes(village)) errors.village = village ? 'invalid' : 'required';

  const adults = Number.parseInt(str(input.adults, 3) || '0', 10);
  const children = Number.parseInt(str(input.children, 3) || '0', 10);
  if (!(adults >= 1 && adults <= 99)) errors.adults = 'range';
  if (!(children >= 0 && children <= 99)) errors.children = 'range';

  const chosen = list(input.services).filter((s) => SERVICE_SLUGS.includes(s));
  if (chosen.length === 0) errors.services = 'required';

  const bookingFor = (str(input.bookingFor, 10) || 'myself') as BookingFor;
  if (!BOOKING_FOR.includes(bookingFor)) errors.bookingFor = 'invalid';

  const contact = readContact(input, errors);
  const source = readSource(input);

  if (Object.keys(errors).length) return { ok: false, errors };

  return {
    ok: true,
    errors,
    lead: {
      kind: 'stay',
      arrival,
      departure,
      datesFlexible: isTrue(input.datesFlexible),
      village,
      adults,
      children,
      childrenAges: str(input.childrenAges, 100),
      services: chosen,
      experience: str(input.experience, 40),
      budget: str(input.budget, 120),
      bookingFor,
      ...contact,
      message: str(input.message, 3000),
      consent: true,
      ...source,
    },
  };
}

/**
 * Validate a short request (input.requestType is one of REQUEST_TYPES).
 * Only the fields the type uses are read; its required fields must be filled,
 * dates from today, the last day on or after the first, guests within range.
 */
export function validateRequest(input: Input, today = new Date()): ValidationResult<RequestLead> {
  const errors: Record<string, string> = {};
  const type = str(input.requestType, 20);
  if (!isRequestType(type)) return { ok: false, errors: { requestType: 'invalid' } };
  const spec = REQUEST_SPECS[type];
  const uses = (f: string) => (spec.fields as readonly string[]).includes(f);
  const needs = (f: string) => (spec.required as readonly string[]).includes(f);
  const text = (f: string, max: number) => (uses(f) ? str(input[f], max) : '');

  const item = text('item', 120);
  const from = text('from', 120);
  const to = text('to', 120);
  const flight = text('flight', 40);
  const details = text('details', 2000);
  const staying = text('staying', 120);
  for (const [f, v] of Object.entries({ item, from, to, details })) if (needs(f) && v.length < 2) errors[f] = 'required';

  const date = text('date', 10);
  if (date && !isDate(date)) errors.date = 'invalid';
  else if (date && new Date(date) < startOf(today)) errors.date = 'range';
  else if (!date && needs('date')) errors.date = 'required';

  const dateTo = text('dateTo', 10);
  if (dateTo && !isDate(dateTo)) errors.dateTo = 'invalid';
  else if (dateTo && date && !errors.date && new Date(dateTo) < new Date(date)) errors.dateTo = 'end';

  const time = text('time', 5);
  if (time && !TIME.test(time)) errors.time = 'invalid';

  let guests: number | null = null;
  if (uses('guests')) {
    const raw = str(input.guests, 3);
    if (raw) {
      guests = Number.parseInt(raw, 10);
      if (!(guests >= spec.guestsMin && guests <= 99)) errors.guests = 'invalid';
    } else if (needs('guests')) errors.guests = 'required';
  }

  const wanted = str(input.service, 30);
  const service = spec.services.includes(wanted) ? wanted : spec.services[0];

  const contact = readContact(input, errors);
  const source = readSource(input);

  if (Object.keys(errors).length) return { ok: false, errors };

  return {
    ok: true,
    errors,
    lead: { kind: 'request', requestType: type, service, item, from, to, date, dateTo, time, flight, guests, details, staying, ...contact, consent: true, ...source },
  };
}

/** Number of nights between arrival and departure. */
export const nights = (lead: Pick<Lead, 'arrival' | 'departure'>) =>
  Math.round((Date.parse(lead.departure) - Date.parse(lead.arrival)) / 86_400_000);
