-- Enable UUID generation (if using pgcrypto)
create extension if not exists "pgcrypto";

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  vehicle text,
  date timestamptz,
  notes text,
  created_at timestamptz default now()
);
