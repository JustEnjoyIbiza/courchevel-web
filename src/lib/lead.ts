/**
 * The lead model, shared by the enquiry form (browser) and the Netlify
 * Function (server), so both validate exactly the same way.
 * No runtime dependencies; imports use explicit .ts extensions so the file
 * also runs under Node's type stripping in tests.
 */
import { services } from '../data/services.ts';

export const VILLAGES = ['1850', '1650', '1550', 'le-praz', 'la-tania', 'not-sure'] as const;
export const BOOKING_FOR = ['myself', 'client', 'company'] as const;
export const CONTACT_PREFS = ['whatsapp', 'phone', 'email'] as const;
export const SERVICE_SLUGS = services.map((s) => s.slug);
export const LOCALES = ['en', 'fr'] as const;

export type Village = (typeof VILLAGES)[number];
export type BookingFor = (typeof BOOKING_FOR)[number];
export type ContactPref = (typeof CONTACT_PREFS)[number];
export type LeadLocale = (typeof LOCALES)[number];

export interface Lead {
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
  name: string;
  email: string;
  phone: string;
  preferredContact: ContactPref;
  message: string;
  consent: true;
  locale: LeadLocale;
  page: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

export interface ValidationResult {
  ok: boolean;
  lead?: Lead;
  /** Field name -> error code ('required', 'invalid', 'range', 'order'). */
  errors: Record<string, string>;
}

type Input = Record<string, string | string[] | undefined>;

const str = (v: unknown, max = 200): string => (typeof v === 'string' ? v : Array.isArray(v) ? String(v[0] ?? '') : '').trim().slice(0, max);
const list = (v: unknown): string[] => (Array.isArray(v) ? v : typeof v === 'string' && v ? v.split(',') : []).map((x) => String(x).trim()).filter(Boolean);
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{6,24}$/;

/**
 * Validate raw form input (from FormData or JSON). `today` is injectable for tests.
 * Rules: dates required and departure after arrival; at least one adult; at least
 * one service; name, email and consent required; phone required when the
 * preferred contact is WhatsApp or phone.
 */
export function validateLead(input: Input, today = new Date()): ValidationResult {
  const errors: Record<string, string> = {};

  const arrival = str(input.arrival, 10);
  const departure = str(input.departure, 10);
  if (!isDate(arrival)) errors.arrival = arrival ? 'invalid' : 'required';
  if (!isDate(departure)) errors.departure = departure ? 'invalid' : 'required';
  if (!errors.arrival && !errors.departure) {
    const startOfToday = new Date(today.toISOString().slice(0, 10));
    if (new Date(arrival) < startOfToday) errors.arrival = 'range';
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

  const name = str(input.name, 120);
  if (name.length < 2) errors.name = 'required';

  const email = str(input.email, 200).toLowerCase();
  if (!EMAIL.test(email)) errors.email = email ? 'invalid' : 'required';

  const preferredContact = (str(input.preferredContact, 10) || 'whatsapp') as ContactPref;
  if (!CONTACT_PREFS.includes(preferredContact)) errors.preferredContact = 'invalid';

  const phone = str(input.phone, 30);
  if (phone && !PHONE.test(phone)) errors.phone = 'invalid';
  if (!phone && (preferredContact === 'whatsapp' || preferredContact === 'phone')) errors.phone = 'required';

  const consent = ['on', 'true', 'yes', '1'].includes(str(input.consent, 5).toLowerCase());
  if (!consent) errors.consent = 'required';

  const locale = (LOCALES as readonly string[]).includes(str(input.locale, 2)) ? (str(input.locale, 2) as LeadLocale) : 'en';

  if (Object.keys(errors).length) return { ok: false, errors };

  return {
    ok: true,
    errors,
    lead: {
      arrival,
      departure,
      datesFlexible: ['on', 'true', 'yes', '1'].includes(str(input.datesFlexible, 5).toLowerCase()),
      village,
      adults,
      children,
      childrenAges: str(input.childrenAges, 100),
      services: chosen,
      experience: str(input.experience, 40),
      budget: str(input.budget, 120),
      bookingFor,
      name,
      email,
      phone,
      preferredContact,
      message: str(input.message, 3000),
      consent: true,
      locale,
      page: str(input.page, 300),
      referrer: str(input.referrer, 300),
      utmSource: str(input.utm_source, 100),
      utmMedium: str(input.utm_medium, 100),
      utmCampaign: str(input.utm_campaign, 100),
    },
  };
}

/** Number of nights between arrival and departure. */
export const nights = (lead: Pick<Lead, 'arrival' | 'departure'>) =>
  Math.round((Date.parse(lead.departure) - Date.parse(lead.arrival)) / 86_400_000);
