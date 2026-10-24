/**
 * Short requests: one service, one date, no stay details (a table, a
 * transfer, an instructor...). Each type lists the fields its form shows and
 * which of them are required; the form, the validation (lead.ts) and the
 * messages all read from here. A full stay still uses the 3-step form.
 * No runtime dependencies; explicit .ts imports for Node's type stripping.
 */

export const REQUEST_TYPES = ['table', 'vip', 'transfer', 'instructor', 'chef', 'experience', 'nanny', 'treatment', 'event', 'general'] as const;
export type RequestType = (typeof REQUEST_TYPES)[number];

export const REQUEST_FIELDS = ['item', 'from', 'to', 'date', 'dateTo', 'time', 'flight', 'guests', 'details', 'staying'] as const;
export type RequestField = (typeof REQUEST_FIELDS)[number];

export interface RequestSpec {
  /** Service slugs this request can be filed under; the first is the default. */
  services: readonly string[];
  /** Fields in the order the form shows them. */
  fields: readonly RequestField[];
  required: readonly RequestField[];
  guestsMin: number;
  guestsDefault: number;
}

const spec = (services: string[], fields: RequestField[], required: RequestField[], guests = { min: 1, value: 2 }): RequestSpec => ({
  services,
  fields,
  required,
  guestsMin: guests.min,
  guestsDefault: guests.value,
});

export const REQUEST_SPECS: Record<RequestType, RequestSpec> = {
  table: spec(['nightlife'], ['item', 'date', 'time', 'guests', 'details', 'staying'], ['date', 'guests']),
  vip: spec(['nightlife'], ['item', 'date', 'guests', 'details', 'staying'], ['date', 'guests'], { min: 1, value: 4 }),
  transfer: spec(['transfers'], ['from', 'to', 'date', 'time', 'flight', 'guests', 'details', 'staying'], ['from', 'to', 'date', 'guests']),
  instructor: spec(['ski'], ['date', 'dateTo', 'guests', 'details', 'staying'], ['date', 'guests']),
  chef: spec(['private-chef'], ['date', 'dateTo', 'guests', 'details', 'staying'], ['date', 'guests'], { min: 1, value: 6 }),
  experience: spec(['experiences'], ['item', 'date', 'guests', 'details', 'staying'], ['date', 'guests']),
  nanny: spec(['childcare'], ['date', 'dateTo', 'guests', 'details', 'staying'], ['date', 'guests'], { min: 1, value: 1 }),
  treatment: spec(['wellness'], ['item', 'date', 'guests', 'details', 'staying'], ['date', 'guests'], { min: 1, value: 1 }),
  event: spec(['events'], ['item', 'date', 'guests', 'details', 'staying'], ['date', 'guests'], { min: 1, value: 10 }),
  general: spec(['lifestyle', 'staff', 'owners'], ['date', 'details', 'staying'], ['details']),
};

export const isRequestType = (v: unknown): v is RequestType => typeof v === 'string' && (REQUEST_TYPES as readonly string[]).includes(v);
