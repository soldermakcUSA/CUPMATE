import type { MetadataRoute } from "next";
import { allMatchDetails } from "@/lib/match-details";
import { editorialArticles } from "@/lib/editorial-content";

export const siteName = "CupMate";
export const defaultSiteUrl = "https://cupmate.us";

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
    path: "/live",
    title: "Live Stream | CupMate",
    description:
      "Watch authorized CupMate live HLS coverage when an independent live stream is available."
  },
  {
    path: "/news",
    title: "World Cup 2026 News and Fan Planning Updates | CupMate",
    description:
      "Follow World Cup 2026 news through a fan-planning lens: tickets, stadium operations, transport, squads, host cities and event updates."
  },
  {
    path: "/guides",
    title: "World Cup 2026 Guides | CupMate",
    description:
      "Read practical World Cup 2026 guides for tickets, city schedules, MetLife Stadium, fan zones, viewing options, travel and official sources."
  },
  {
    path: "/about",
    title: "About CupMate | Independent World Cup 2026 Fan Planner",
    description:
      "Learn what CupMate is, how it uses official sources and why it is an independent fan-planning project for World Cup 2026."
  },
  {
    path: "/contact",
    title: "Contact CupMate | World Cup 2026 Fan Planning",
    description:
      "Contact CupMate about World Cup 2026 guide corrections, partnerships, source updates, city listings and fan-planning feedback."
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
  { slug: "bc-place", name: "BC Place", city: "Vancouver, Canada", capacity: "54,400", matches: 7, transit: "SkyTrain to Stadium-Chinatown or Yaletown-Roundhouse" },
  { slug: "estadio-bbva", name: "Estadio BBVA", city: "Guadalupe, Nuevo Leon, Mexico", capacity: "53,500", matches: 4, transit: "Metrorrey and event-day road approaches toward Guadalupe" },
  { slug: "estadio-akron", name: "Estadio Akron", city: "Zapopan, Jalisco, Mexico", capacity: "49,850", matches: 4, transit: "Mi Macro Periferico connections, shuttles, taxi or rideshare" },
  { slug: "arrowhead-stadium", name: "Arrowhead Stadium", city: "Kansas City, Missouri", capacity: "76,416", matches: 6, transit: "Event shuttles, rideshare and managed stadium-district parking" },
  { slug: "nrg-stadium", name: "NRG Stadium", city: "Houston, Texas", capacity: "72,220", matches: 7, transit: "METRORail Red Line to Stadium Park/Astrodome area" },
  { slug: "mercedes-benz-stadium", name: "Mercedes-Benz Stadium", city: "Atlanta, Georgia", capacity: "71,000+", matches: 8, transit: "MARTA rail to GWCC/CNN Center or Vine City" },
  { slug: "lincoln-financial-field", name: "Lincoln Financial Field", city: "Philadelphia, Pennsylvania", capacity: "67,594", matches: 6, transit: "SEPTA Broad Street Line to NRG Station" },
  { slug: "lumen-field", name: "Lumen Field", city: "Seattle, Washington", capacity: "68,740", matches: 6, transit: "Link light rail and downtown walking routes" },
  { slug: "levis-stadium", name: "Levi's Stadium", city: "Santa Clara, California", capacity: "68,500", matches: 6, transit: "VTA light rail and South Bay transit connections" },
  { slug: "gillette-stadium", name: "Gillette Stadium", city: "Foxborough, Massachusetts", capacity: "65,878", matches: 7, transit: "Special-event commuter rail, shuttles and stadium parking" },
  { slug: "hard-rock-stadium", name: "Hard Rock Stadium", city: "Miami Gardens, Florida", capacity: "65,326", matches: 7, transit: "Rideshare, shuttles and regional transit links toward Miami Gardens" }
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

type SitemapEntry = MetadataRoute.Sitemap[number];

export const splitSitemaps = [
  { path: "/sitemap-static.xml" },
  { path: "/sitemap-matches.xml" },
  { path: "/sitemap-cities.xml" },
  { path: "/sitemap-stadiums.xml" },
  { path: "/sitemap-guides.xml" },
  { path: "/sitemap-news.xml" }
] as const;

function weeklyEntry(url: string, lastModified: Date, priority: number): SitemapEntry {
  return {
    url,
    lastModified,
    changeFrequency: "weekly",
    priority
  };
}

export function sitemapIndexEntries(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return splitSitemaps.map((sitemap) => ({
    url: `${siteUrl}${sitemap.path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.5
  }));
}

export function staticSitemapEntries(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return primarySeoPages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page.path === "/" ? 1 : 0.85
  }));
}

export function matchSitemapEntries(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return allMatchDetails().map((match) => ({
    url: `${siteUrl}/matches/${match.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8
  }));
}

export function citySitemapEntries(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return [
    ...hostCityGuides.map((city) => weeklyEntry(`${siteUrl}/host-cities/${city.slug}`, now, 0.75)),
    ...localHostCitySitemapEntries()
  ];
}

export function stadiumSitemapEntries(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return stadiumGuides.map((stadium) => weeklyEntry(`${siteUrl}/stadiums/${stadium.slug}`, now, 0.75));
}

export function sitemapEntries(): MetadataRoute.Sitemap {
  return [
    ...staticSitemapEntries(),
    ...matchSitemapEntries(),
    ...citySitemapEntries(),
    ...stadiumSitemapEntries(),
    ...guideSitemapEntries()
  ];
}

export function guideSitemapEntries(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return editorialArticles.map((article) => ({
    url: `${siteUrl}/guides/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.72
  }));
}

export function localHostCitySitemapEntries(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();
  return ["new-york-new-jersey", "los-angeles", "dallas", "miami", "atlanta", "toronto", "vancouver", "mexico-city"].flatMap((slug) =>
    ["where-to-watch", "fan-zones", "tickets"].map((kind) => ({
      url: `${siteUrl}/host-cities/${slug}/${kind}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  );
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function serializeLastModified(value: SitemapEntry["lastModified"]) {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
}

export function sitemapXml(entries: MetadataRoute.Sitemap) {
  const urls = entries
    .map((entry) => {
      const lastModified = serializeLastModified(entry.lastModified);

      return [
        "  <url>",
        `    <loc>${escapeXml(entry.url)}</loc>`,
        lastModified ? `    <lastmod>${escapeXml(lastModified)}</lastmod>` : undefined,
        entry.changeFrequency ? `    <changefreq>${entry.changeFrequency}</changefreq>` : undefined,
        typeof entry.priority === "number" ? `    <priority>${entry.priority.toFixed(2)}</priority>` : undefined,
        "  </url>"
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function sitemapXmlResponse(entries: MetadataRoute.Sitemap) {
  return new Response(sitemapXml(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
