# Sameh Abobakr — Portfolio

React + Vite + Tailwind (v3). Arabic (RTL) default, English (LTR). Dark/light theme.

## Run
```bash
npm install
cp .env.example .env   # optional for now
npm run dev
```

## Architecture
- `src/styles/tokens.css` — design tokens (single source); `tailwind.config.js` only maps them.
- `src/config/routes.js` — page registry. Build a page, add its route in `app/router`, set `enabled: true`.
- `src/i18n/` — `ar.js` / `en.js` dictionaries; use `t('path.to.key')` from `useLanguage()`.
- `src/app/providers/` — theme and language state; `layouts/` — shared shell; `pages/<Name>/` — one folder per page.
- Use logical utilities (`ms-`, `me-`, `ps-`, `pe-`, `text-start`) so layouts flip with direction.

## Status
Done: foundation, routing, header, language + theme, Hero, Supabase prep.
Pending: About, Skills, Projects, Learning, Certificates, Contact (shown as "Soon"), Supabase data layer, R2 media.

## Phase 2 status (see bottom of this file for what is NOT done)
Public pages read from Supabase via `src/services/api.js`. Apply migrations in `supabase/migrations/` in order (SQL Editor or `supabase db push`), then run `seed.sql`.
Create your Auth user, then: `insert into public.admin_users (user_id) values ('<your-uuid>');`
Deploy (Cloudflare Pages): build `npm run build`, output `dist`, env `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. `public/_redirects` handles SPA routing.

### Not implemented yet
Admin dashboard UI, R2 upload Worker, Home page sections (only Hero), contact rate limiting (Edge Function/Turnstile), tests.

## UI notes (certificates, learning filters, home links, Arabic typography)
- Fonts: Arabic uses **Cairo** (Google Fonts link in `index.html`, weights 400/500/600/700); English uses **Inter** (`@fontsource/inter`). `tokens.css` picks the stack from `html[lang]` and also sets Arabic-safe line-heights and zero letter-spacing. Tailwind `fontSize`/`letterSpacing` read those tokens. To self-host Cairo instead: `npm i @fontsource/cairo` and import its 400/500/600/700 css in `main.jsx`.
- `@fontsource/ibm-plex-sans-arabic` is no longer imported; remove it with `npm uninstall @fontsource/ibm-plex-sans-arabic` when convenient.
- Certificates: `pages/Certificates/` (card + native `<dialog>` lightbox). Images keep their aspect ratio; PDFs preview via `<object>` and open full in the viewer.
- Home: `pages/Home/SocialLinks.jsx` reads `listSocials`; links are validated by `utils/links.js` (`safeUrl`).
