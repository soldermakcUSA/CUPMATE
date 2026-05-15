import { allMatchDetails } from "@/lib/match-details";
import { editorialArticles } from "@/lib/editorial-content";
import { newsSeoArticles } from "@/lib/news-seo-data";
import { hostCityGuides, stadiumGuides } from "@/lib/seo";

export type RelatedPageLink = {
  href: string;
  label: string;
  description: string;
};

type RelatedPageContext = {
  currentPath: string;
  category?: string;
  limit?: number;
};

const localCityKinds = [
  { path: "tickets", label: "Tickets" },
  { path: "fan-zones", label: "Fan zones" },
  { path: "where-to-watch", label: "Where to watch" }
] as const;

const featuredLocalCitySlugs = new Set([
  "new-york-new-jersey",
  "los-angeles",
  "dallas",
  "miami",
  "atlanta",
  "toronto",
  "vancouver",
  "mexico-city"
]);

export function getRelatedPages({ currentPath, category, limit = 6 }: RelatedPageContext): RelatedPageLink[] {
  const normalizedPath = normalizePath(currentPath);

  if (normalizedPath === "/world-cup-2026-schedule") {
    return uniqueLinks([
      ...allMatchDetails().slice(0, 3).map((match) => ({
        href: `/matches/${match.slug}`,
        label: `${match.home.name} vs ${match.away.name}`,
        description: `${match.venue}, ${match.city}`
      })),
      ...stadiumGuides.slice(0, 2).map((stadium) => stadiumLink(stadium)),
      hostCityLink(hostCityGuides[0])
    ]).slice(0, limit);
  }

  const guideSlug = normalizedPath.match(/^\/guides\/([^/]+)$/)?.[1];
  if (guideSlug) return relatedForGuide(guideSlug, category).slice(0, limit);

  const newsSlug = normalizedPath.match(/^\/news\/([^/]+)$/)?.[1];
  if (newsSlug) return relatedForNews(newsSlug, category).slice(0, limit);

  const citySlug = normalizedPath.match(/^\/host-cities\/([^/]+)(?:\/[^/]+)?$/)?.[1];
  if (citySlug) return relatedForCity(citySlug, normalizedPath).slice(0, limit);

  const stadiumSlug = normalizedPath.match(/^\/stadiums\/([^/]+)$/)?.[1];
  if (stadiumSlug) return relatedForStadium(stadiumSlug).slice(0, limit);

  return [];
}

function relatedForGuide(slug: string, category?: string) {
  const article = editorialArticles.find((item) => item.slug === slug);
  const topic = (category ?? article?.category ?? "").toLowerCase();
  const topicText = `${topic} ${article?.title ?? ""} ${article?.keywords.join(" ") ?? ""}`.toLowerCase();
  const links: RelatedPageLink[] = [];

  links.push(...editorialArticles
    .filter((item) => item.slug !== slug)
    .sort((a, b) => relevanceScore(b, topicText) - relevanceScore(a, topicText))
    .slice(0, 2)
    .map((item) => ({
      href: `/guides/${item.slug}`,
      label: item.title,
      description: item.description
    })));

  if (topicText.includes("ticket")) {
    links.push(staticLink("/tickets", "World Cup 2026 tickets", "Official sales, resale caution and match-day budget planning."));
  }

  if (topicText.includes("fan zone") || topicText.includes("watch")) {
    links.push(staticLink("/fan-zones", "World Cup 2026 fan zones", "Public viewing, supporter meetups and local watch plans."));
    links.push(staticLink("/where-to-watch", "Where to watch World Cup 2026", "Sports bars, restaurants and viewing options by host city."));
  }

  if (topicText.includes("schedule")) {
    links.push(staticLink("/world-cup-2026-schedule", "World Cup 2026 schedule", "Matches, venues, host cities and fixture planning."));
  }

  const metLife = stadiumGuides.find((stadium) => stadium.slug === "metlife-stadium") ?? stadiumGuides[0];
  links.push(stadiumLink(metLife));
  links.push(hostCityLink(hostCityGuides[0]));

  return uniqueLinks(links);
}

function relatedForNews(slug: string, category?: string) {
  const article = newsSeoArticles.find((item) => item.slug === slug);
  const topicText = `${category ?? article?.category ?? ""} ${article?.title ?? ""} ${article?.description ?? ""}`.toLowerCase();
  const guideLinks = editorialArticles
    .sort((a, b) => relevanceScore(b, topicText) - relevanceScore(a, topicText))
    .slice(0, 2)
    .map((item) => ({
      href: `/guides/${item.slug}`,
      label: item.title,
      description: item.description
    }));

  return uniqueLinks([
    ...newsSeoArticles
      .filter((item) => item.slug !== slug)
      .slice(0, 3)
      .map((item) => ({
        href: `/news/${item.slug}`,
        label: item.title,
        description: item.description
      })),
    ...guideLinks,
    staticLink("/world-cup-2026-schedule", "World Cup 2026 schedule", "Match dates, venues and planning notes across host cities.")
  ]);
}

function relatedForCity(slug: string, currentPath: string) {
  const city = hostCityGuides.find((item) => item.slug === slug);
  if (!city) return [];

  const stadium = stadiumGuides.find((item) => item.name === city.stadium);
  const localLinks = cityPlanningLinks(city, featuredLocalCitySlugs.has(city.slug))
    .filter((link) => normalizePath(link.href) !== currentPath);

  return uniqueLinks([
    ...localLinks,
    stadium ? stadiumLink(stadium) : null,
    staticLink("/world-cup-2026-schedule", "World Cup 2026 schedule", "Match dates, venues and planning notes across host cities.")
  ]);
}

function cityPlanningLinks(city: (typeof hostCityGuides)[number], hasLocalPages: boolean): RelatedPageLink[] {
  if (hasLocalPages) {
    return localCityKinds.map((kind) => ({
      href: `/host-cities/${city.slug}/${kind.path}`,
      label: `${city.city} ${kind.label}`,
      description: `Local ${kind.label.toLowerCase()} planning for World Cup 2026 in ${city.city}.`
    }));
  }

  return [
    staticLink("/tickets", "World Cup 2026 tickets", `Ticket planning for matches around ${city.stadium}.`),
    staticLink("/fan-zones", "World Cup 2026 fan zones", `Fan-zone and supporter meetup planning for host cities including ${city.city}.`),
    staticLink("/where-to-watch", "Where to watch World Cup 2026", `Viewing options, sports bars and backup watch plans for host-city trips.`)
  ];
}

function relatedForStadium(slug: string) {
  const stadium = stadiumGuides.find((item) => item.slug === slug);
  if (!stadium) return [];

  const city = hostCityGuides.find((item) => item.stadium === stadium.name);

  return uniqueLinks([
    city ? hostCityLink(city) : null,
    staticLink("/world-cup-2026-schedule", "World Cup 2026 schedule", "Find matches, host cities and venues across the tournament."),
    staticLink("/tickets", "World Cup 2026 tickets", "Ticket demand, official-channel reminders and safer resale checks."),
    ...allMatchDetails()
      .filter((match) => match.venue === stadium.name)
      .slice(0, 2)
      .map((match) => ({
        href: `/matches/${match.slug}`,
        label: `${match.home.name} vs ${match.away.name}`,
        description: `${match.kickoff} at ${match.venue}`
      }))
  ]);
}

function relevanceScore(article: (typeof editorialArticles)[number], topicText: string) {
  const haystack = `${article.category} ${article.title} ${article.keywords.join(" ")}`.toLowerCase();
  return topicText.split(/\W+/).reduce((score, token) => (token && haystack.includes(token) ? score + 1 : score), 0);
}

function hostCityLink(city: (typeof hostCityGuides)[number]): RelatedPageLink {
  return {
    href: `/host-cities/${city.slug}`,
    label: `${city.city} World Cup 2026`,
    description: `${city.stadium}, local travel, fan zones and match-day timing.`
  };
}

function stadiumLink(stadium: (typeof stadiumGuides)[number]): RelatedPageLink {
  return {
    href: `/stadiums/${stadium.slug}`,
    label: `${stadium.name} stadium guide`,
    description: `${stadium.city}, ${stadium.capacity} capacity and ${stadium.matches} World Cup matches.`
  };
}

function staticLink(href: string, label: string, description: string): RelatedPageLink {
  return { href, label, description };
}

function uniqueLinks(links: Array<RelatedPageLink | null>) {
  const seen = new Set<string>();
  return links.filter((link): link is RelatedPageLink => {
    if (!link || seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

function normalizePath(path: string) {
  const cleanPath = path.split(/[?#]/)[0] || "/";
  return cleanPath.length > 1 ? cleanPath.replace(/\/+$/, "") : cleanPath;
}
