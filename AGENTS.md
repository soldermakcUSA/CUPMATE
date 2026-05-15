# CupMate Project Context

Use this file as the first stop when opening a new Codex chat for this repo. It captures the current project shape, not just early planning notes.

## Product

CupMate is an independent World Cup 2026 fan-planning portal and PWA. It helps supporters plan matches, host cities, stadium visits, routes, tickets, fan zones, places to watch and news with practical match-day context.

The project is not affiliated with FIFA, host cities, teams, venues, broadcasters or ticket marketplaces.

## Current Stack

- Framework: Next.js App Router, React, TypeScript.
- Styling: global CSS in `app/globals.css`; no Tailwind config is currently active despite older planning docs mentioning Tailwind/shadcn.
- UI icons/animation: `lucide-react`, `framer-motion`.
- Data/backend: Supabase Postgres through `@supabase/supabase-js`.
- Deployment: Docker/standalone Next output, deployed to VPS through GitHub Actions and `scripts/deploy-vps.sh`.
- Automation: GitHub Actions for deploy and scheduled news publishing.

## Important Directories

- `app/` - Next.js routes, SEO pages, app shell and dynamic article/stadium/match pages.
- `components/` - reusable UI and menu panels.
- `lib/` - static content, Supabase client/types, SEO data, localization, match and World Cup data.
- `public/assets/` - project images, flags and generated news covers.
- `scripts/` - import/generation/deploy/automation scripts.
- `supabase/` - SQL seed content for news.
- `docs/` - operational docs such as news automation and VPS deployment.

## Key Content Files

- `lib/news-seo-data.ts` - static SEO article list for `/news` and `/news/[slug]`.
- `lib/content-data.ts` - runtime Supabase fetches for news/places and local news image slug map.
- `lib/mock-data.ts` - client fallback demo content.
- `lib/localized-static-data.ts` - localized fallback content, especially Russian fallback news.
- `supabase/seed-news.sql` - manual SQL seed backup for Supabase article rows.

Important behavior: the main interactive portal news panel loads from Supabase via `fetchNewsItems`. If Supabase has published news, it overrides local fallback content. Updating only static files can make `/news` show articles while the main portal still shows old Supabase records.

## News Automation

Automated news publishing is implemented in:

- `scripts/auto-news.mjs`
- `.github/workflows/auto-news.yml`
- `docs/NEWS_AUTOMATION.md`

The workflow runs at 06:15, 14:15 and 22:15 UTC, plus manual `workflow_dispatch`. It searches World Cup 2026 news via RSS feeds, skips existing `sourceUrl`/slug, rewrites source material into full CupMate articles, generates a cover image, inserts EN/RU rows into Supabase, updates static SEO files, builds, commits and pushes to `main`.

Local dry run:

```bash
npm run auto-news -- --dry-run --skip-images --skip-supabase
```

Manual publish run:

```bash
npm run auto-news
```

## Environment Variables And Secrets

Never commit real secret values. `.env.local` is ignored and may exist locally.

Runtime/public:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key for browser/runtime reads.
- `NEXT_PUBLIC_SITE_URL` - canonical site URL, defaults to `https://cupmate.us`.
- `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_URL` - legacy/example app metadata.
- `NEXT_PUBLIC_MAPBOX_TOKEN` - reserved for future maps.

Server/automation secrets:

- `SUPABASE_SERVICE_ROLE_KEY` - required by automation to insert articles/translations.
- `OPENAI_API_KEY` - required by automation for article rewrite and image generation.
- `OPENAI_TEXT_MODEL` - optional GitHub variable, defaults to `gpt-5.4-mini`.
- `OPENAI_IMAGE_MODEL` - optional GitHub variable, defaults to `gpt-image-1`.

Deployment secrets in GitHub Actions:

- `SERVER_IP`
- `SSH_PRIVATE_KEY`

Reserved/older optional keys:

- `FOOTBALL_API_KEY`
- `OPENWEATHER_API_KEY`

## Common Commands

```bash
npm run dev
npm run build
npm run start
npm run auto-news -- --dry-run --skip-images --skip-supabase
```

There is no working lint script with modern Next 16 unless the project config is updated; prefer `npm run build` for verification.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which SSHes into the VPS and runs:

```bash
bash /opt/cupmate/scripts/deploy-vps.sh
```

`next.config.ts` uses `output: "standalone"`.

## Current Source Of Truth Notes

- Static SEO pages are generated from local TS data.
- Live interactive news comes from Supabase first.
- Generated news images live in `public/assets/news`.
- When adding a news article manually, update all relevant places: `lib/news-seo-data.ts`, `lib/content-data.ts` image map, Supabase rows, and fallback content if needed.
