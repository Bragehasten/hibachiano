-- Hibachiano — initial schema
-- Run this in the Supabase SQL Editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10, 2) not null,
  category text not null,
  image_url text,
  is_popular boolean not null default false,
  doordash_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.menu_items enable row level security;
alter table public.subscribers enable row level security;
alter table public.contact_messages enable row level security;

-- menu_items: anyone can read the public menu; only the service role
-- (which Supabase already grants BYPASSRLS, so these are belt-and-suspenders)
-- may mutate it — the anon/authenticated roles get no write policy at all.
create policy "menu_items_public_read"
  on public.menu_items
  for select
  to anon, authenticated
  using (true);

create policy "menu_items_service_role_write"
  on public.menu_items
  for all
  to service_role
  using (true)
  with check (true);

-- subscribers: anyone can insert (newsletter signup), nobody can read back
-- rows via the public API — no select policy is defined, so RLS denies it
-- by default for anon/authenticated.
create policy "subscribers_public_insert"
  on public.subscribers
  for insert
  to anon, authenticated
  with check (true);

-- contact_messages: anyone can insert (contact form), nobody can read back
-- rows via the public API, same reasoning as subscribers above.
create policy "contact_messages_public_insert"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
