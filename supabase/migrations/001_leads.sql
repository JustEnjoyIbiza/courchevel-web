-- Leads table for Courchevel Luxury Concierge.
-- Run once in Supabase: SQL Editor > New query > paste > Run.
-- Create the project in an EU region (e.g. eu-west-3, Paris) so data stays in the EU (GDPR).

create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  -- Pipeline: New -> Contacted -> Proposal sent -> Booked / Lost
  status           text not null default 'new'
                   check (status in ('new', 'contacted', 'proposal_sent', 'booked', 'lost')),
  contacted_at     timestamptz,
  next_follow_up   date,          -- day 2 / day 7 / day 21 follow-ups (plan, lead flow step 7)
  notes            text,

  -- Stay
  arrival          date not null,
  departure        date not null,
  dates_flexible   boolean not null default false,
  village          text not null check (village in ('1850', '1650', '1550', 'le-praz', 'la-tania', 'not-sure')),
  adults           smallint not null check (adults between 1 and 99),
  children         smallint not null default 0 check (children between 0 and 99),
  children_ages    text,
  services         text[] not null,
  experience       text,
  budget           text,
  booking_for      text not null check (booking_for in ('myself', 'client', 'company')),

  -- Contact
  name             text not null,
  email            text not null,
  phone            text,
  preferred_contact text not null check (preferred_contact in ('whatsapp', 'phone', 'email')),
  message          text,
  consent          boolean not null check (consent),
  consent_at       timestamptz not null default now(),

  -- Source
  locale           text not null default 'en',
  page             text,
  referrer         text,
  utm_source       text,
  utm_medium       text,
  utm_campaign     text,

  check (departure > arrival)
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- Keep updated_at current when a lead is edited in the dashboard.
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at before update on public.leads
for each row execute function public.set_updated_at();

-- Row Level Security on, with no policies: the public (anon) key can neither
-- read nor write. Only the Netlify Function, using the service role key, inserts.
alter table public.leads enable row level security;
