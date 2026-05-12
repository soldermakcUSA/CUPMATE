# Prompt for Creating CupMate

You are a senior product designer and full-stack developer. Create a production-quality multilingual web/PWA application called **CupMate** for fans traveling to the **2026 FIFA World Cup**.

The app must look and feel like the provided visual references:

- `PC.png` — desktop dashboard reference.
- `app.png` — mobile app reference.

The final result must include a polished desktop version, a tablet-responsive version, and a mobile version that feels like a native app.

## 1. Product Concept

CupMate is a World Cup companion app for fans who travel between host cities, visit stadiums, look for fan zones, watch parties, bars, routes, parking, tickets, and other fans nearby.

The product should feel like:

- Google Maps for World Cup fans.
- ESPN-style match center.
- Travel assistant for stadium routes.
- Fan community platform.
- AI concierge for football, travel, safety, and local recommendations.

The app is not just a match schedule. It is a full fan travel ecosystem.

## 2. Main Goal

Build a modern PWA/web application that helps World Cup visitors:

- Find matches, stadiums, and host cities.
- Explore fan zones and bars nearby.
- Plan routes to stadiums.
- Save itinerary and tickets.
- Find fans of the same national team nearby.
- Ask an AI assistant for help.
- Use the app in multiple languages.
- Install the mobile version to the home screen like a native app.

## 3. Language and Localization Requirements

The default and primary language must be **English**.

The app must be multilingual from the beginning. Add a language switcher in the top navigation on desktop and in profile/settings or header on mobile.

Supported languages:

- English — default.
- Spanish.
- French.
- German.
- Portuguese.
- Italian.
- Arabic.
- Chinese.
- Japanese.
- Korean.
- Russian.

Localization requirements:

- All visible UI text must come from translation dictionaries, not hardcoded strings.
- Use language codes such as `en`, `es`, `fr`, `de`, `pt`, `it`, `ar`, `zh`, `ja`, `ko`, `ru`.
- Store translations in a clean structure, for example `locales/en.json`, `locales/es.json`, etc.
- The app must persist the selected language in local storage.
- Detect browser language on first visit, but fall back to English.
- Support RTL layout for Arabic.
- Dates, time, distance, and currency must adapt to locale where possible.
- Use English sample data by default, but prepare the architecture so all labels can be translated.

Important: even when another language is selected, team names, stadium names, city names, and official venue names can stay in their official English/local form.

## 4. Required Tech Stack

Use this stack unless the project environment requires otherwise:

- Next.js with App Router.
- React.
- TypeScript.
- Tailwind CSS.
- Shadcn UI.
- Lucide React icons.
- Framer Motion for subtle transitions.
- Mapbox or a realistic map placeholder if Mapbox token is not available.
- Supabase-ready architecture for future auth/database.
- PWA support with manifest, mobile icons, theme color, and installable behavior.

The code must be clean, modular, and ready for future backend integration.

## 5. Visual Direction

Follow the visual style from `PC.png` and `app.png`.

Overall style:

- Premium sports travel dashboard.
- Clean white content surfaces.
- Deep navy sidebar and hero sections.
- Purple and electric blue accents.
- Occasional neon green accent for active/success states.
- Soft shadows.
- Rounded cards, but not overly pill-shaped.
- Mobile UI should feel like a native iOS/Android app.
- Desktop UI should feel like a modern SaaS dashboard.

Color palette:

- Deep navy: `#06142F`, `#071A3D`, `#0B1026`.
- Primary purple: `#5B35F5`, `#6D4AFF`.
- Electric blue: `#245BFF`, `#3A7BFF`.
- Neon green accent: `#32D583`.
- Background: `#F7F8FC`, `#FFFFFF`.
- Text: `#07122F`, `#18213D`, `#667085`.
- Borders: `#E6E8F0`.

Typography:

- Use a clean modern sans-serif font.
- Strong hierarchy.
- Clear labels and readable card text.
- Avoid oversized marketing typography inside the dashboard.

Icons:

- Use Lucide icons for navigation and actions.
- Use flag emojis or small flag assets for teams.
- Use clear iconography for matches, map, travel, community, tickets, profile, assistant, alerts, language, and settings.

## 6. Desktop Layout

The desktop version must closely follow `PC.png`.

Desktop structure:

- Fixed left sidebar.
- Top search bar.
- Language selector.
- Notification icon.
- User avatar.
- Main content grid.
- Right column with map, itinerary, and AI assistant.

Sidebar:

- CupMate logo at the top.
- Subtitle: "Your World Cup Companion".
- Navigation items:
  - Dashboard.
  - Matches.
  - Fan Zones.
  - Stadiums.
  - Travel & Routes.
  - Where to Watch.
  - Community.
  - Tickets.
  - News.
  - AI Assistant.
- Active navigation item must use a purple gradient/background.
- Include a World Cup 2026 promo card near the bottom.
- Include user profile block at the bottom.

Main dashboard content:

- Hero banner with stadium background and World Cup trophy.
- Headline: "The World Cup Starts June 11, 2026!"
- Subtext: "104 matches. 16 host cities. 1 champion."
- CTA button: "Explore Matches".
- Next Matches section with horizontal match cards.
- News & Updates cards.
- Popular Fan Zones cards.

Right column:

- Interactive Map card with host city markers.
- Filter chips below the map:
  - Stadiums.
  - Fan Zones.
  - Where to Watch.
  - Parking.
- My Itinerary card with match rows and ticket buttons.
- AI Assistant card with suggested questions and input.

Desktop must be responsive from large screens down to tablet widths.

## 7. Mobile Layout

The mobile version must closely follow `app.png`.

It must feel like a real mobile app, not a squeezed desktop layout.

Mobile requirements:

- Full-screen app-like layout.
- Status-bar-safe spacing.
- Bottom tab navigation.
- Large touch targets.
- Smooth card transitions.
- Mobile-specific screens.
- PWA install-ready behavior.

Bottom navigation tabs:

- Home.
- Matches.
- Map.
- Community.
- Profile.

Mobile screens to implement:

### 7.1 Home

Home screen should include:

- Dark navy hero card.
- Greeting: "Good morning, Alex!"
- Headline: "The World Cup Starts Here".
- Search field.
- Next Match card with team flags.
- Matches Today list.
- Bottom navigation.

### 7.2 Matches

Matches screen should include:

- Header: "Matches".
- Filter chips:
  - All.
  - My Time.
  - By Team.
  - By Venue.
- Date selector.
- Match list grouped by day.
- Each match card:
  - Teams.
  - Flags.
  - Time.
  - Group.
  - Stadium.
  - Reminder icon.

### 7.3 Map / Fan Zones

Map screen should include:

- Header: "Fan Zones".
- City selector.
- Map area with markers.
- Featured fan zone card overlay/below map.
- CTA button: "Directions".
- Tags such as Live Screen, Food, Music, Games.

### 7.4 Route to Stadium

Route screen should include:

- Header: "Route to Stadium".
- Transportation mode selector:
  - Public Transport.
  - Driving.
  - Walking.
  - Taxi.
- Map route preview.
- Stadium destination card.
- Recommended route breakdown.
- CTA button: "Start Navigation".

### 7.5 Stadium Guide

Stadium screen should include:

- Dark stadium hero image.
- Stadium name.
- Location.
- Info tab icons:
  - Info.
  - Bag Policy.
  - Food & Drink.
  - Tickets.
  - Parking.
- Helpful information rows:
  - Gates Open.
  - Capacity.
  - Parking.
  - Cashless Venue.
  - Prohibited Items.
- CTA button: "View Stadium Map".

### 7.6 Where to Watch

Where to Watch screen should include:

- Header.
- City selector.
- Search icon.
- Filter chips:
  - All.
  - Sports Bars.
  - Restaurants.
  - Fan Zones.
- List of bars/places with images, type, distance, and short tags.

### 7.7 Community

Community screen should include:

- Header: "Community".
- Tabs:
  - Feed.
  - Nearby Fans.
  - Groups.
- Feature card: "Find fans of your team".
- Nearby fans list with avatars, country, short status, and Chat button.

### 7.8 AI Assistant

AI Assistant screen should include:

- Purple/navy gradient header.
- Friendly assistant robot/avatar.
- Greeting: "Hi Alex! How can I help you today?"
- Suggested prompts:
  - "How do I get to MetLife Stadium?"
  - "Where are the best fan zones?"
  - "What's the weather in New Jersey?"
  - "Find a place to watch the match."
- Chat input at the bottom.
- Send button.

## 8. Tablet Behavior

For tablet screens:

- Use a hybrid layout.
- Keep mobile-style navigation if width is closer to phone.
- Use two-column layouts where possible.
- Cards must not become too wide.
- Touch targets must remain large.
- Map and assistant panels can appear side by side on landscape tablets.

## 9. Functional MVP Requirements

Implement realistic frontend behavior with mock data.

Required MVP sections:

- Dashboard.
- Matches.
- Interactive map / fan zones.
- Stadium guide.
- Travel routes.
- Where to Watch.
- Community.
- AI Assistant.
- Profile/settings with language switcher.

Mock data should include:

- Host cities.
- Stadiums.
- Matches.
- Teams.
- Fan zones.
- Bars/restaurants.
- Nearby fans.
- Itinerary.
- News cards.
- AI suggested prompts.

Use realistic 2026 World Cup examples:

- MetLife Stadium, New Jersey.
- SoFi Stadium, Los Angeles.
- Hard Rock Stadium, Miami.
- AT&T Stadium, Dallas.
- Estadio Azteca, Mexico City.
- BMO Field, Toronto.
- Times Square Fan Fest.
- Miami Beach Fan Zone.
- LA Live Fan Festival.
- Grant Park Fan Zone.

## 10. Interaction Requirements

The UI must include:

- Working navigation between sections.
- Language selector that changes UI labels.
- Search field UI.
- Filter chips with active states.
- Match reminders UI state.
- Map filter active state.
- Transportation mode selector.
- AI assistant input with mock response behavior.
- Community chat button UI state.
- Favorite/save behavior for places or fan zones.
- Responsive bottom navigation on mobile.

If backend is not implemented yet, use local state and mock data.

## 11. AI Assistant Behavior

The AI Assistant can use mock responses for now, but the architecture should be ready for OpenAI API integration.

Assistant should handle prompts such as:

- "Where can I watch Argentina vs Brazil in Miami?"
- "How do I get to MetLife Stadium by public transport?"
- "What are the best fan zones in New York?"
- "Is it safe to walk near the stadium at night?"
- "Translate this restaurant menu."
- "Find fans of Brazil nearby."

Mock response style:

- Short.
- Practical.
- Travel-focused.
- Include venue names, travel time, route hints, and safety tips where relevant.

## 12. PWA Requirements

Implement PWA basics:

- `manifest.json`.
- App name: `CupMate`.
- Short name: `CupMate`.
- Theme color: deep navy or purple.
- Background color: white.
- Mobile icons.
- Apple mobile web app meta tags.
- Responsive viewport.
- Installable mobile experience.

The app should look good when opened from a phone home screen.

## 13. Accessibility Requirements

The app must be accessible:

- Good color contrast.
- Keyboard focus states.
- Semantic buttons and navigation.
- Alt text for meaningful images.
- ARIA labels for icon-only buttons.
- Inputs must have labels or accessible names.
- Language attribute must update based on selected locale.
- RTL support for Arabic.

## 14. Performance Requirements

The app should be optimized:

- Reusable components.
- Lazy-load heavy sections where possible.
- Optimized images.
- Avoid layout shifts.
- Avoid excessive animation.
- Keep mobile performance smooth.

## 15. Component Architecture

Use a clean component structure similar to:

```txt
app/
  layout.tsx
  page.tsx
  globals.css
components/
  layout/
    Sidebar.tsx
    Topbar.tsx
    MobileNav.tsx
  dashboard/
    HeroBanner.tsx
    MatchCards.tsx
    NewsCards.tsx
    FanZoneCards.tsx
  matches/
    MatchList.tsx
    MatchFilters.tsx
  map/
    InteractiveMap.tsx
    FanZoneCard.tsx
  travel/
    RoutePlanner.tsx
    TransportSelector.tsx
  stadiums/
    StadiumGuide.tsx
  community/
    FanList.tsx
    CommunityTabs.tsx
  assistant/
    AIAssistant.tsx
  i18n/
    LanguageSwitcher.tsx
lib/
  mock-data.ts
  i18n.ts
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
```

## 16. Design Details to Match the References

Match these details from the images:

- Desktop has a dark navy left sidebar and light dashboard content.
- Mobile has iPhone-like screens with bottom tab navigation.
- Cards are white with soft shadows and subtle borders.
- Primary CTA buttons use purple gradient.
- The trophy and stadium imagery should feel premium.
- Maps should use clean light map styling.
- Markers should be purple, blue, red, or green depending on type.
- Match cards should show flags prominently.
- Fan zone cards should use rich real-world photos.
- AI assistant screen should use a purple/navy gradient with a friendly assistant visual.
- Navigation should feel consistent across all screens.

Do not create a generic landing page as the main experience. The first screen should be the actual CupMate dashboard/app.

## 17. Content Tone

Use concise English UI copy by default.

Tone:

- Helpful.
- Travel-focused.
- Sporty.
- Premium.
- Clear.

Examples:

- "Find fans of your team"
- "Navigate stadiums easily"
- "Never miss a game"
- "Ask anything about the World Cup"
- "View full schedule"
- "Start Navigation"
- "Add to Itinerary"

## 18. Deliverables

Create a complete working frontend with:

- Desktop dashboard.
- Mobile app layout.
- Tablet responsiveness.
- Multilingual UI.
- PWA setup.
- Mock data.
- Polished styling.
- Clear component structure.
- No broken navigation.
- No placeholder lorem ipsum.

The result must visually resemble the provided `PC.png` and `app.png` references while being implemented as a real responsive application.

## 19. Acceptance Criteria

The implementation is complete only when:

- Desktop view looks like a polished dashboard similar to `PC.png`.
- Mobile view looks like a native app similar to `app.png`.
- Tablet view is usable and well-composed.
- Language switching works.
- English is the default language.
- Arabic switches the layout to RTL.
- Main sections are navigable.
- Cards, maps, filters, bottom tabs, AI assistant, and route screens are present.
- PWA metadata exists.
- UI text is not hardcoded directly inside components when it should be translated.
- The app has realistic World Cup 2026 data.
- The design is visually consistent, responsive, and production-quality.

