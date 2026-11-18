# Supabase

Status: **only `admin_users` + `is_admin()` exist** (migration `20260101000000`). Nothing else is implemented.

Apply with the Supabase CLI: `supabase link --project-ref <ref>` then `supabase db push`.

Rules: all tables get RLS from day one; admin permissions go through `is_admin()`; the service-role key never goes into the frontend or `.env`.

Planned (NOT built): `projects`, `courses`, `certificates`, `site_settings`; public read for published rows, admin-only writes. Files will live in Cloudflare R2 (`VITE_MEDIA_BASE_URL`).
