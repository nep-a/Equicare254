-- SUPABASE SETUP SCRIPT FOR EQUICARE
-- Execute this script in the Supabase SQL Editor after running Alembic migrations.

-- 1. Enable Realtime for specific tables
-- This allows the frontend to listen to changes on Work Orders for live dashboard updates
alter publication supabase_realtime add table public.work_orders;

-- 2. Row Level Security (RLS) Baseline
-- RLS is highly recommended in Supabase. Since our FastAPI backend handles authentication
-- using its own JWTs, we will primarily connect using the Service Role Key or via a custom claim.
-- If the frontend needs direct read access, we can configure RLS based on JWT organization claims.

-- Enable RLS on all core tables
alter table public.organizations enable row level security;
alter table public.users enable row level security;
alter table public.assets enable row level security;
alter table public.work_orders enable row level security;

-- Create a policy that allows the backend (Service Role) to do anything
create policy "Service Role can do everything" on public.organizations for all using (true) with check (true);
create policy "Service Role can do everything" on public.users for all using (true) with check (true);
create policy "Service Role can do everything" on public.assets for all using (true) with check (true);
create policy "Service Role can do everything" on public.work_orders for all using (true) with check (true);

-- 3. Storage Buckets Setup
-- Create the secure bucket for Equicare Documents (Manuals, Calibration Certs)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'equicare-documents', 
  'equicare-documents', 
  true, -- Set to false if you want private signed-url access only
  52428800, -- 50MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png']
);

-- Allow authenticated uploads via Supabase (or leave it to Service Role only)
create policy "Service Role has full access to equicare-documents"
on storage.objects for all using ( bucket_id = 'equicare-documents' );
