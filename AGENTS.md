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

## Knowledge From Prior CupMate Chats

These notes summarize decisions and implementation context from earlier local Codex chats. Treat them as project memory, but still verify against the current code before editing.

### Product Direction

- Original product direction: CupMate started as a mobile-first PWA / possible Telegram Mini App for World Cup 2026 supporters, with a full desktop dashboard.
- Core user workflows: match schedule, host-city planning, stadium guides, routes, parking/transit, tickets, fan zones, where-to-watch venues, community/fan discovery, news and an AI assistant.
- Default product language is English, with multilingual UI support for `en`, `es`, `fr`, `de`, `pt`, `it`, `ar`, `zh`, `ja`, `ko`, `ru`; Arabic should use RTL.
- Visual direction from reference work: premium sports/travel UI, dark navy and white dashboard surfaces, electric blue/teal/purple accents, glassy panels, strong mobile app feel plus desktop sidebar layout.

### UI Implementation History

- Desktop sidebar menu sections were split into reusable panels under `components/menu/`.
- Existing desktop menu panel ownership from prior work:
  - `MatchesPanel.tsx`, `FanZonesPanel.tsx`, `StadiumsPanel.tsx`.
  - `TravelPanel.tsx`, `WatchPanel.tsx`, `CommunityPanel.tsx`.
  - `TicketsPanel.tsx`, `NewsPanel.tsx`, `AssistantPanel.tsx`.
- Desktop sidebar items are intended to switch active state and render their corresponding content, not just scroll or no-op.
- Captured UI PNG references live in `designs/interface-png`; `scripts/capture-interface-pngs.mjs` can recreate interface screenshots from the current UI.

### SEO And Discovery

- SEO pages were expanded beyond the interactive app shell:
  - static landing-style pages for schedule, stadiums, host cities, tickets, fan zones, where-to-watch, guides and news.
  - dynamic detail pages for matches, stadiums, host cities, guides and news.
- Related internal links are handled through `components/SeoRelatedLinks.tsx` and `lib/related-pages.ts`.
- Breadcrumbs and structured page content are important for SEO pages.
- Dynamic OG image generation exists through `next/og` / `ImageResponse` in `lib/og-data.ts` and route-level `opengraph-image.tsx` files.
- A static social sharing image is used for broad OG/Twitter previews: `public/assets/cupmate-social-preview-v2.png`.
- Telegram caches link previews. Use `@WebpageBot` to refresh `https://cupmate.us/` or page URLs after OG image changes.

### News And Supabase

- News work has two surfaces:
  - static SEO article pages in `lib/news-seo-data.ts` and `/news/[slug]`;
  - live interactive news loaded from Supabase through `fetchNewsItems`.
- If new articles are visible in local static files but not in the portal panel, check Supabase first. The interactive panel prefers published Supabase rows over fallback content.
- Earlier imports were blocked by RLS when only the anon key was available. Automation/import scripts should use `SUPABASE_SERVICE_ROLE_KEY` only in server/automation contexts and never commit it.
- `supabase/seed-news.sql` is the manual SQL backup path when direct insertion fails.
- Generated news covers should be final website-ready assets in `public/assets/news`, normally with the CupMate overlay generated by `scripts/generate-news-covers.mjs`.
- News cover images should match the established CupMate photo-cover style: wide 16:9 photorealistic editorial scenes, not abstract illustrations, vector graphics or infographic/poster layouts. Use realistic fan, stadium, travel, ticket or city contexts, then apply the standard CupMate overlay and small category badge.

### Marketing And Social Assets

- Favicon/PWA icon set is project-owned:
  - `public/icon.svg`
  - `public/favicon-16x16.png`
  - `public/favicon-32x32.png`
  - `public/apple-touch-icon.png`
  - `public/web-app-manifest-192x192.png`
  - `public/web-app-manifest-512x512.png`
- Current broad social preview with text is `public/assets/cupmate-social-preview-v2.png`.
- Bar outreach banner is `public/assets/cupmate-bars-outreach-banner.png` (`1600x800`) with text: “CupMate for Bars”, “World Cup 2026 Watch Parties”, “Get listed where fans plan match days”, “Join CupMate”.
- Commercial outreach positioning for bars: CupMate can offer venue listings, where-to-watch placement, fan-zone/watch-party visibility, match-day planning context and reservation/special-offer hooks.
- Avoid implying official FIFA, host-city, team, venue, broadcaster or ticket-marketplace affiliation in outreach copy or visuals.

### Email Outreach

- A prior chat tested Microsoft 365 SMTP sending successfully through `smtp.office365.com:587`, but do not rely on secrets from chat history and never commit credentials.
- SMTP credentials and sender addresses must live only in local/VPS/GitHub secrets. Use variable names such as `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`.
- `nodemailer` was installed during email exploration, but there is no committed project mailer workflow unless current code adds one. Check `package.json` and git status before assuming email support is finalized.
- For commercial email, include unsubscribe/contact language and send conservatively to protect the `cupmate.us` domain reputation.

### Facebook Community Notes

- Suggested Facebook group name: `World Cup 2026 Fan Travel & Match Planning | CupMate`.
- Position the group as an independent practical fan community for matches, host cities, stadium visits, routes, tickets, fan zones, watch parties, local tips and useful news.
- New-member welcome message should ask fans which team/country they support, which host cities or matches they plan to visit and what help they need.
- Group rules should prohibit scams, fake ticket offers, suspicious resale posts, spam, unrelated links and unsourced rumors.
- Recommended growth approach: invite real interested people, publish a few strong starter posts, then schedule remaining posts gradually instead of bulk-posting or adding unengaged users.

### Live Match / Broadcast Constraints

- CupMate should not embed, restream or redistribute live World Cup match video unless there is an explicit licensed right or official embeddable player permission.
- Safer product path: official “where to watch” links by country, broadcaster/platform references, live match center without video, scores, event timeline, lineups, cards/substitutions, stats and venue/watch-party recommendations.
- In the United States, earlier research identified English rights with FOX/FS1 and Spanish rights with Telemundo/Peacock/NBCUniversal; verify current rights before publishing broadcaster guidance.

### Working Practices

- The repo often has existing local changes. Do not stage unrelated files such as `package.json` / `package-lock.json` unless the task explicitly includes them.
- `npm run build` is the preferred verification command because the lint script is not reliable with the current Next version.
- Pushes to `main` trigger VPS deployment through GitHub Actions.
