-- RapidDry Restoration — Supabase schema
-- Run in the Supabase SQL editor (or `supabase db push`).
-- One table holds every website lead: the short emergency form (name, phone,
-- address, what happened) that appears on every page, and the fuller contact form.

create table if not exists public.emergency_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null default 'emergency'
    check (kind in ('emergency', 'contact')),
  name text not null,
  phone text not null,
  email text,
  address text not null,
  what_happened text not null,
  service text,
  insurance_claim boolean,
  source_page text,
  utm jsonb,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'dispatched', 'closed', 'spam')),
  notes text
);

alter table public.emergency_requests enable row level security;

-- Writes come from /api/emergency using the service-role key (bypasses RLS).
-- Only signed-in dashboard users may read or update leads.
create policy "Authenticated users can read leads"
  on public.emergency_requests for select
  to authenticated
  using (true);

create policy "Authenticated users can update leads"
  on public.emergency_requests for update
  to authenticated
  using (true)
  with check (true);

create index if not exists emergency_requests_created_at_idx
  on public.emergency_requests (created_at desc);

create index if not exists emergency_requests_status_idx
  on public.emergency_requests (status);
