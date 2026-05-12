# CupMate: Tech Stack and Project Launch Requirements

## 1. Recommended Tech Stack

### Frontend

Use:

- **Next.js** — main framework.
- **React** — UI library.
- **TypeScript** — typed development.
- **Tailwind CSS** — styling.
- **Shadcn UI** — reusable UI components.
- **Lucide React** — icons.
- **Framer Motion** — smooth UI animations.

Why this stack:

- Works well for dashboards and PWA apps.
- Easy to deploy on Vercel.
- Good mobile and desktop responsiveness.
- Fast development speed.
- Clean component architecture.

### PWA

Use:

- `next-pwa` or a custom service worker.
- `manifest.json`.
- Mobile app icons.
- Apple mobile web app meta tags.

Needed features:

- Install to home screen.
- Mobile app-like experience.
- Offline fallback.
- Push-notification-ready architecture.

### Styling and UI

Use:

- Tailwind CSS.
- Shadcn UI.
- CSS variables for themes.
- Responsive layouts.
- Dark navy + white dashboard design.
- Purple/electric blue accent colors.

### Maps

Recommended:

- **Mapbox**

Why:

- Better custom visual styling than many alternatives.
- Good for travel, venue, route, and marker-heavy maps.
- Works well in modern web apps.

Alternative for MVP:

- Use a static/custom map placeholder first.
- Add Mapbox later when API keys are ready.

### Backend

Recommended:

- **Supabase**

Use Supabase for:

- Authentication.
- PostgreSQL database.
- Realtime features.
- User profiles.
- Saved itinerary.
- Community chats.
- Storage for images/files.
- Edge Functions for backend logic.

### AI

Use:

- **OpenAI API**

AI assistant features:

- Travel recommendations.
- Route explanations.
- Stadium help.
- Translation.
- Safety tips.
- Bar/fan-zone recommendations.
- Smart alerts.

### Football Data

Possible APIs:

- **API-Football**
- **Sportmonks**
- **Football-Data.org**

For MVP:

- Start with mock data.
- Add real API integration later.

### Weather

Use:

- **OpenWeather API**

Features:

- Weather near stadiums.
- Match-day conditions.
- Travel alerts.

### Hosting

Recommended:

- **Vercel** for frontend.
- **Supabase** for backend.
- **Cloudflare** for DNS/CDN if needed.

## 2. Required Local Tools

To run the project locally, install:

- **Node.js 20+**
- **npm**, **pnpm**, or **yarn**
- **Git**
- Code editor, for example VS Code or Cursor

Recommended package manager:

```bash
pnpm
```

If `pnpm` is not installed:

```bash
npm install -g pnpm
```

Check versions:

```bash
node -v
pnpm -v
git --version
```

## 3. Project Creation

Create the app:

```bash
pnpm create next-app@latest cupmate
```

Recommended setup answers:

```txt
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
src/ directory: Optional
App Router: Yes
Turbopack: Yes
Import alias: Yes
```

Go into the project:

```bash
cd cupmate
```

Install core dependencies:

```bash
pnpm add lucide-react framer-motion clsx tailwind-merge
```

Install Shadcn UI:

```bash
pnpm dlx shadcn@latest init
```

Add useful Shadcn components:

```bash
pnpm dlx shadcn@latest add button card input badge avatar tabs sheet dropdown-menu dialog scroll-area
```

Optional Mapbox:

```bash
pnpm add mapbox-gl react-map-gl
```

Optional Supabase:

```bash
pnpm add @supabase/supabase-js
```

Optional OpenAI:

```bash
pnpm add openai
```

Optional PWA:

```bash
pnpm add next-pwa
```

## 4. Environment Variables

Create `.env.local`:

```bash
touch .env.local
```

Recommended variables:

```env
NEXT_PUBLIC_APP_NAME=CupMate
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_MAPBOX_TOKEN=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

OPENAI_API_KEY=

FOOTBALL_API_KEY=
OPENWEATHER_API_KEY=
```

For the first frontend-only MVP, these keys can stay empty if the app uses mock data.

## 5. Suggested Project Structure

```txt
cupmate/
  app/
    layout.tsx
    page.tsx
    globals.css
    manifest.ts
  components/
    layout/
      Sidebar.tsx
      Topbar.tsx
      MobileNav.tsx
    dashboard/
      HeroBanner.tsx
      NextMatches.tsx
      NewsCards.tsx
      PopularFanZones.tsx
    matches/
      MatchFilters.tsx
      MatchList.tsx
    map/
      InteractiveMap.tsx
      FanZoneCard.tsx
    travel/
      RoutePlanner.tsx
      TransportSelector.tsx
    stadiums/
      StadiumGuide.tsx
    community/
      CommunityPanel.tsx
      FanList.tsx
    assistant/
      AIAssistant.tsx
    i18n/
      LanguageSwitcher.tsx
  lib/
    mock-data.ts
    i18n.ts
    utils.ts
  locales/
    en.json
    es.json
    fr.json
    de.json
    pt.json
    it.json
    ar.json
    zh.json
    ja.json
    ko.json
    ru.json
  public/
    icons/
    images/
    manifest.json
```

## 6. What Is Needed for the First MVP

The first version can be frontend-only.

Required for MVP:

- Next.js app.
- Responsive desktop dashboard.
- Mobile app-style layout.
- Mock data for matches, stadiums, fan zones, bars, fans, itinerary, and news.
- Language dictionaries.
- Language switcher.
- PWA manifest.
- Map placeholder or Mapbox integration.
- AI Assistant mock responses.

Not required for first MVP:

- Real login.
- Real payments.
- Real-time chat.
- Real ticket storage.
- Real football API.
- Real Mapbox routing.
- Real OpenAI API calls.

These can be added after the UI and product flow are complete.

## 7. Run Locally

Install dependencies:

```bash
pnpm install
```

Start development server:

```bash
pnpm dev
```

Open:

```txt
http://localhost:3000
```

Build production version:

```bash
pnpm build
```

Run production build locally:

```bash
pnpm start
```

## 8. Development Order

Recommended order:

1. Create Next.js project.
2. Install Tailwind, Shadcn UI, Lucide, Framer Motion.
3. Create global theme and colors.
4. Build desktop dashboard layout.
5. Build mobile app layout.
6. Add mock data.
7. Add navigation between sections.
8. Add language system.
9. Add PWA manifest.
10. Add map placeholder or Mapbox.
11. Add AI Assistant mock behavior.
12. Test desktop, tablet, and mobile views.
13. Deploy to Vercel.

## 9. Deployment

Recommended deployment:

- Push project to GitHub.
- Connect GitHub repo to Vercel.
- Add environment variables in Vercel.
- Deploy.

Vercel build command:

```bash
pnpm build
```

Vercel output:

```txt
.next
```

## 10. Future Production Services

When moving from MVP to real product, add:

- Supabase Auth.
- Supabase database tables.
- Real football schedule API.
- Mapbox geocoding and routing.
- OpenAI Assistant API route.
- OpenWeather API.
- Push notifications.
- Telegram Mini App integration.
- Payment/subscription system.
- Admin panel.

## 11. Minimum Launch Checklist

Before launch, confirm:

- Desktop version works.
- Mobile version works like an app.
- Tablet layout is usable.
- Language switcher works.
- English is default.
- Arabic RTL works.
- PWA manifest exists.
- Main screens are navigable.
- Mock data looks realistic.
- No broken images.
- No hardcoded important UI text.
- App builds successfully with `pnpm build`.

