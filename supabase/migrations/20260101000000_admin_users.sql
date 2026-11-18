-- Foundation for admin/user separation. Only what the future admin area needs.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admin_users where user_id = auth.uid()); $$;

-- A signed-in user may only see their own row; writes are done via the dashboard / service role.
create policy "admins can read own row" on public.admin_users
  for select to authenticated using (user_id = auth.uid());
