-- Short requests: one service (a table, a transfer, an instructor...) with no
-- stay dates or village. Added 24 October 2026.
-- Run once after 001_leads.sql: SQL Editor > New query > paste > Run.
-- Until it runs, stays are still saved; short requests reach the concierge by
-- email, Basin and Telegram but fail to save in Supabase.

alter table public.leads
  add column if not exists request_type text not null default 'stay'
    check (request_type in ('stay', 'table', 'vip', 'transfer', 'instructor', 'chef', 'experience', 'nanny', 'treatment', 'event', 'general')),
  -- The request's own fields: item, from, to, date, date_to, time, flight, guests, details, staying.
  add column if not exists request jsonb;

-- Stay fields become optional; a stay still needs all of them (constraint below).
alter table public.leads
  alter column arrival drop not null,
  alter column departure drop not null,
  alter column village drop not null,
  alter column adults drop not null,
  alter column booking_for drop not null;

-- Replace the original "departure > arrival" check (auto-named leads_check).
alter table public.leads drop constraint if exists leads_check;
alter table public.leads drop constraint if exists leads_stay_check;
alter table public.leads add constraint leads_stay_check check (
  request_type <> 'stay'
  or (arrival is not null and departure is not null and village is not null and adults is not null and booking_for is not null and departure > arrival)
);
alter table public.leads drop constraint if exists leads_request_dates_check;
alter table public.leads add constraint leads_request_dates_check check (
  request_type = 'stay' or departure is null or arrival is null or departure >= arrival
);

create index if not exists leads_request_type_idx on public.leads (request_type);
