import { allMatchDetails } from "@/lib/match-details";

export const siteName = "CupMate";
export const defaultSiteUrl = "https://cupmate.app";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl).replace(/\/+$/, "");
}

export const primarySeoPages = [
  {
    path: "/",
    title: "CupMate | World Cup 2026 Match Planner for Fans",
    description:
      "Plan the 2026 FIFA World Cup with match schedules, stadium guides, tickets, fan zones, travel routes, places to watch and multilingual match-day help."
  },
  {
    path: "/world-cup-2026-schedule",
    title: "World Cup 2026 Schedule, Matches and Venues | CupMate",
    description:
      "Browse key World Cup 2026 group-stage matches with kickoff dates, stadiums, host cities, odds context and match-day planning notes."
  },
  {
    path: "/stadiums",
    title: "World Cup 2026 Stadium Guide | CupMate",
    description:
      "Compare World Cup 2026 stadiums across the United States, Canada and Mexico with capacity, match counts, transit, parking and fan tips."
  },
  {
    path: "/host-cities",
    title: "World Cup 2026 Host Cities Travel Guide | CupMate",
    description:
      "Plan World Cup 2026 travel across 16 host cities with stadium locations, transit context, fan zones, viewing areas and practical trip notes."
  },
  {
    path: "/tickets",
    title: "World Cup 2026 Tickets Guide | CupMate",
    description:
      "Understand World Cup 2026 ticket planning, resale checks, match demand, budget reminders and safe purchase paths for fans."
  },
  {
    path: "/fan-zones",
    title: "World Cup 2026 Fan Zones and Watch Parties | CupMate",
    description:
      "Find World Cup 2026 fan-zone planning ideas, big-screen viewing areas, match-day meetup notes and host-city supporter experiences."
  },
  {
    path: "/where-to-watch",
    title: "Where to Watch World Cup 2026 Matches | CupMate",
    description:
      "Discover sports bars, restaurants, fan zones and local viewing options for World Cup 2026 matches in North America host cities."
  },
  {
    path: "/news",
    title: "World Cup 2026 News and Fan Planning Updates | CupMate",
    description:
      "Follow World Cup 2026 news through a fan-planning lens: tickets, stadium operations, transport, squads, host cities and event updates."
  }
] as const;

export const hostCityGuides = [
  { slug: "new-york-new-jersey", city: "New York / New Jersey", stadium: "MetLife Stadium", country: "USA", focus: "final host, rail access via Secaucus Junction, premium ticket demand and large fan gatherings" },
  { slug: "los-angeles", city: "Los Angeles", stadium: "SoFi Stadium", country: "USA", focus: "West Coast match travel, rideshare planning, entertainment districts and hotel demand" },
  { slug: "dallas", city: "Dallas", stadium: "AT&T Stadium", country: "USA", focus: "largest match allocation, driving logistics, stadium parking and group-stage volume" },
  { slug: "miami", city: "Miami", stadium: "Hard Rock Stadium", country: "USA", focus: "Latin American fan travel, outdoor viewing, nightlife and warm-weather match days" },
  { slug: "atlanta", city: "Atlanta", stadium: "Mercedes-Benz Stadium", country: "USA", focus: "downtown transit, indoor stadium comfort, supporter meetups and airport access" },
  { slug: "boston", city: "Boston", stadium: "Gillette Stadium", country: "USA", focus: "suburban stadium access, commuter rail planning and early departure windows" },
  { slug: "houston", city: "Houston", stadium: "NRG Stadium", country: "USA", focus: "heat planning, rideshare exits, stadium-area hotels and fan-zone timing" },
  { slug: "kansas-city", city: "Kansas City", stadium: "Arrowhead Stadium", country: "USA", focus: "stadium district traffic, tailgate culture and match-day arrival buffers" },
  { slug: "philadelphia", city: "Philadelphia", stadium: "Lincoln Financial Field", country: "USA", focus: "sports complex navigation, transit access and East Coast supporter travel" },
  { slug: "san-francisco-bay-area", city: "San Francisco Bay Area", stadium: "Levi's Stadium", country: "USA", focus: "South Bay stadium access, Caltrain/VTA planning and hotel geography" },
  { slug: "seattle", city: "Seattle", stadium: "Lumen Field", country: "USA", focus: "walkable downtown access, light rail and waterfront fan activity" },
  { slug: "vancouver", city: "Vancouver", stadium: "BC Place", country: "Canada", focus: "SkyTrain access, downtown stays, waterfront routes and cross-border fan travel" },
  { slug: "toronto", city: "Toronto", stadium: "BMO Field", country: "Canada", focus: "Exhibition Place access, GO/TTC planning and waterfront fan movement" },
  { slug: "mexico-city", city: "Mexico City", stadium: "Estadio Azteca", country: "Mexico", focus: "opening match, high-altitude match days, rail access and historic stadium demand" },
  { slug: "monterrey", city: "Monterrey", stadium: "Estadio BBVA", country: "Mexico", focus: "mountain-side venue logistics, private lots, heat planning and local transit" },
  { slug: "guadalajara", city: "Guadalajara", stadium: "Estadio Akron", country: "Mexico", focus: "Zapopan access, stadium shuttles, ring-road traffic and match-day arrival timing" }
] as const;

export const stadiumGuides = [
  { slug: "metlife-stadium", name: "MetLife Stadium", city: "East Rutherford, New Jersey", capacity: "82,500", matches: 8, transit: "Train via Secaucus Junction to Meadowlands Station" },
  { slug: "sofi-stadium", name: "SoFi Stadium", city: "Inglewood, California", capacity: "70,240+", matches: 8, transit: "Rideshare, shuttles and regional rail/bus connections" },
  { slug: "att-stadium", name: "AT&T Stadium", city: "Arlington, Texas", capacity: "80,000+", matches: 9, transit: "Driving, shuttles and managed event transportation" },
  { slug: "estadio-azteca", name: "Estadio Azteca", city: "Mexico City, Mexico", capacity: "87,523", matches: 5, transit: "Tren Ligero to Estadio Azteca station" },
  { slug: "bmo-field", name: "BMO Field", city: "Toronto, Canada", capacity: "45,736", matches: 6, transit: "GO Transit or TTC to Exhibition Station" },
  { slug: "bc-place", name: "BC Place", city: "Vancouver, Canada", capacity: "54,400", matches: 7, transit: "SkyTrain to Stadium-Chinatown or Yaletown-Roundhouse" }
] as const;

export const contentClusters = [
  "World Cup 2026 schedule",
  "World Cup 2026 tickets",
  "World Cup 2026 stadiums",
  "World Cup 2026 host cities",
  "World Cup 2026 fan zones",
  "where to watch World Cup 2026",
  "World Cup 2026 travel planner",
  "World Cup 2026 match odds"
];

export function sitemapEntries() {
  const siteUrl = getSiteUrl();
  const now = new Date();
  return [
    ...primarySeoPages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: page.path === "/" ? 1 : 0.85
    })),
    ...allMatchDetails().map((match) => ({
      url: `${siteUrl}/matches/${match.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8
    })),
    ...hostCityGuides.map((city) => ({
      url: `${siteUrl}/host-cities/${city.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75
    })),
    ...stadiumGuides.map((stadium) => ({
      url: `${siteUrl}/stadiums/${stadium.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75
    }))
  ];
}
