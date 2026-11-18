-- Content tables. Public can read published/visible rows; only admins (is_admin()) can write.
create or replace function public.set_updated_at() returns trigger language plpgsql as
$$ begin new.updated_at = now(); return new; end; $$;

create table public.profile (
  id smallint primary key default 1 check (id = 1),           -- single-row table
  full_name_ar text, full_name_en text, headline_ar text, headline_en text,
  bio_ar text, bio_en text, education_ar text, education_en text,
  goals_ar text, goals_en text, direction_ar text, direction_en text,
  email text, avatar_url text, updated_at timestamptz not null default now()
);
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name_ar text, name_en text not null,
  category text not null check (category in ('cybersecurity','web','agri','tools')),
  description_ar text, description_en text,
  level text check (level in ('beginner','learning','intermediate','practiced')),
  related_url text, sort_order int not null default 0, is_visible boolean not null default true,
  created_at timestamptz not null default now()
);
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title_ar text, title_en text not null, description_ar text, description_en text,
  objective_ar text, objective_en text, category text,
  status text not null default 'in_progress' check (status in ('planned','in_progress','completed')),
  technologies text[] not null default '{}', cover_url text,
  github_url text, demo_url text, docs_url text,
  is_featured boolean not null default false, is_published boolean not null default false,
  sort_order int not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  url text not null, alt_ar text, alt_en text, sort_order int not null default 0
);
create table public.learning_resources (
  id uuid primary key default gen_random_uuid(),
  title_ar text, title_en text not null, description_ar text, description_en text,
  category text not null check (category in ('course','book','podcast','article','lab','other')),
  status text not null default 'planned' check (status in ('completed','in_progress','planned')),
  provider text, url text, thumbnail_url text, started_on date, completed_on date,
  notes_ar text, notes_en text, related_skills text[] not null default '{}',
  is_published boolean not null default true, created_at timestamptz not null default now()
);
create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  name_ar text, name_en text not null, issuer text not null, issued_on date,
  credential_id text, verify_url text, file_url text, related_skills text[] not null default '{}',
  is_visible boolean not null default true, is_featured boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null, url text not null, sort_order int not null default 0, is_visible boolean not null default true
);
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 200),
  message text not null check (char_length(message) between 10 and 4000),
  is_read boolean not null default false, created_at timestamptz not null default now()
);

create index on public.skills (category, sort_order);
create index on public.projects (is_published, sort_order);
create index on public.project_images (project_id, sort_order);
create index on public.learning_resources (status, category);
create index on public.contact_messages (created_at desc);
create trigger t_profile_upd before update on public.profile for each row execute function public.set_updated_at();
create trigger t_projects_upd before update on public.projects for each row execute function public.set_updated_at();

-- RLS
do $$ declare t text; begin
  foreach t in array array['profile','skills','projects','project_images','learning_resources','certificates','social_links','contact_messages']
  loop execute format('alter table public.%I enable row level security', t);
       execute format('create policy "admin all" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop; end $$;

create policy "public read" on public.profile for select to anon, authenticated using (true);
create policy "public read" on public.skills for select to anon, authenticated using (is_visible);
create policy "public read" on public.projects for select to anon, authenticated using (is_published);
create policy "public read" on public.project_images for select to anon, authenticated
  using (exists (select 1 from public.projects p where p.id = project_id and p.is_published));
create policy "public read" on public.learning_resources for select to anon, authenticated using (is_published);
create policy "public read" on public.certificates for select to anon, authenticated using (is_visible);
create policy "public read" on public.social_links for select to anon, authenticated using (is_visible);
-- Visitors may only INSERT messages (never read them).
create policy "public insert" on public.contact_messages for insert to anon, authenticated
  with check (is_read = false);
