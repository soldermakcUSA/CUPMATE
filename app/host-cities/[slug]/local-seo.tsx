import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { SeoShell } from "@/components/SeoShell";
import { getSiteUrl, hostCityGuides } from "@/lib/seo";

export type LocalSeoKind = "where-to-watch" | "fan-zones" | "tickets";
type HostCityGuide = (typeof hostCityGuides)[number];

const featuredHostCitySlugs = [
  "new-york-new-jersey",
  "los-angeles",
  "dallas",
  "miami",
  "atlanta",
  "toronto",
  "vancouver",
  "mexico-city"
] as const;

const localSeoPages: Record<
  LocalSeoKind,
  {
    path: LocalSeoKind;
    navLabel: string;
    eyebrow: string;
    primaryHref: string;
    primaryLabel: string;
    title: (city: HostCityGuide) => string;
    description: (city: HostCityGuide) => string;
    sections: (city: HostCityGuide) => Array<{ title: string; body: string; items: string[] }>;
  }
> = {
  "where-to-watch": {
    path: "where-to-watch",
    navLabel: "Where to watch",
    eyebrow: "Local World Cup 2026 watch guide",
    primaryHref: "/?section=watch",
    primaryLabel: "Open watch guide",
    title: (city) => `Where to watch World Cup 2026 in ${city.city}`,
    description: (city) =>
      `Find practical World Cup 2026 viewing options in ${city.city}, from sports bars and public screens to backup plans near ${city.stadium}.`,
    sections: (city) => [
      {
        title: `${city.city} watch-location intent`,
        body: `Fans searching for where to watch World Cup 2026 in ${city.city} need local context before kickoff, not a generic list of bars.`,
        items: [
          `Sports bars and restaurants showing matches in ${city.city}`,
          `Public viewing and fan-zone options tied to ${city.stadium}`,
          "Reservation, arrival-time and late-kickoff planning notes",
          "Backup viewing choices when the first venue is full"
        ]
      },
      {
        title: "Match-day viewing decisions",
        body: `CupMate connects viewing plans to travel around ${city.city}, so fans can choose a place that fits the match time, supporter crowd and route home.`,
        items: [
          `Transit-first viewing areas for ${city.city} visitors`,
          "Family-friendly screens versus high-energy supporter bars",
          "Indoor and outdoor options for weather-sensitive match days",
          `Post-match movement between viewing areas and ${city.stadium}`
        ]
      }
    ]
  },
  "fan-zones": {
    path: "fan-zones",
    navLabel: "Fan zones",
    eyebrow: "Local World Cup 2026 fan zones",
    primaryHref: "/?section=fanZones",
    primaryLabel: "Open fan zones",
    title: (city) => `${city.city} World Cup 2026 fan zones and watch parties`,
    description: (city) =>
      `Plan World Cup 2026 fan-zone days in ${city.city} with public viewing, supporter meetups, crowd timing and routes around ${city.stadium}.`,
    sections: (city) => [
      {
        title: `${city.city} fan-zone planning`,
        body: `Fan-zone searches are local and event-driven. This page gives ${city.city} a dedicated URL for supporter gatherings, big screens and match-day meetups.`,
        items: [
          `Official and community viewing areas in ${city.city}`,
          `Supporter meetups before matches at ${city.stadium}`,
          "Food, music, screen visibility and family-friendly planning",
          "Arrival buffers for high-demand knockout and headline matches"
        ]
      },
      {
        title: "Crowd and route context",
        body: `The strongest fan-zone plan explains how the crowd moves before and after matches, especially when visitors are balancing tickets, watch parties and local transport.`,
        items: [
          `Fan-zone timing around ${city.focus}`,
          "Transit and rideshare pressure after full-time",
          "Walkable meetup points and backup gathering areas",
          `How to pair ${city.city} fan zones with ticketed match plans`
        ]
      }
    ]
  },
  tickets: {
    path: "tickets",
    navLabel: "Tickets",
    eyebrow: "Local World Cup 2026 ticket guide",
    primaryHref: "/?section=tickets",
    primaryLabel: "Open ticket tools",
    title: (city) => `${city.city} World Cup 2026 tickets and match-day planning`,
    description: (city) =>
      `Plan World Cup 2026 ticket decisions for ${city.city}: demand around ${city.stadium}, safe purchase reminders, budget context and local match-day logistics.`,
    sections: (city) => [
      {
        title: `${city.city} ticket demand context`,
        body: `Ticket searches need local planning signals. ${city.city} demand is shaped by the stadium, visitor geography, match allocation and the cost of getting to kickoff.`,
        items: [
          `Ticket planning for matches at ${city.stadium}`,
          "Official-channel reminders and resale caution",
          "Budget checks across tickets, hotels, transit and fan events",
          `Local demand signals tied to ${city.focus}`
        ]
      },
      {
        title: "Turn a ticket into a day plan",
        body: `CupMate treats a ticket as the start of the itinerary: arrival windows, stadium approach, fan-zone choices, watch-party backups and post-match exit planning.`,
        items: [
          `Arrival and exit planning for ${city.stadium}`,
          "Seat decision context across budget and atmosphere",
          "Backup viewing plans for unticketed friends",
          `How ${city.city} tickets connect to local fan zones and places to watch`
        ]
      }
    ]
  }
};

export function generateLocalSeoStaticParams() {
  return featuredHostCitySlugs.map((slug) => ({ slug }));
}

export function getLocalSeoCity(slug: string) {
  if (!featuredHostCitySlugs.includes(slug as (typeof featuredHostCitySlugs)[number])) return null;
  return hostCityGuides.find((city) => city.slug === slug) ?? null;
}

export function getLocalSeoLinks(slug: string) {
  if (!getLocalSeoCity(slug)) return [];

  return Object.values(localSeoPages).map((page) => ({
    href: `/host-cities/${slug}/${page.path}`,
    label: page.navLabel
  }));
}

export function buildLocalSeoMetadata(kind: LocalSeoKind, slug: string): Metadata {
  const city = getLocalSeoCity(slug);
  const page = localSeoPages[kind];

  if (!city) {
    return {
      title: "World Cup 2026 Local Guide Not Found",
      robots: { index: false, follow: true }
    };
  }

  const title = page.title(city);
  const description = page.description(city);

  return {
    title,
    description,
    alternates: { canonical: `/host-cities/${city.slug}/${page.path}` },
    openGraph: {
      title,
      description,
      images: ["/assets/hero-world-cup-banner.png"]
    }
  };
}

export function HostCityLocalSeoPage({ kind, slug }: { kind: LocalSeoKind; slug: string }) {
  const city = getLocalSeoCity(slug);
  const page = localSeoPages[kind];

  if (!city) {
    return (
      <SeoShell activeSection="travel">
        <main className="seo-page">
          <section className="seo-hero">
            <p>World Cup 2026 local guide</p>
            <h1>Host city guide not found</h1>
            <span>This local SEO page is available for selected CupMate host-city guides.</span>
          </section>
        </main>
      </SeoShell>
    );
  }

  const siteUrl = getSiteUrl();
  const canonicalPath = `/host-cities/${city.slug}/${page.path}`;
  const title = page.title(city);
  const description = page.description(city);

  return (
    <SeoLandingPage
      eyebrow={page.eyebrow}
      title={title}
      description={description}
      primaryHref={page.primaryHref}
      primaryLabel={page.primaryLabel}
      activeSection={kind === "tickets" ? "tickets" : kind === "fan-zones" ? "fanZones" : "watch"}
      currentPath={canonicalPath}
      relatedCategory={page.navLabel}
      breadcrumbs={[
        { name: "CupMate", href: "/" },
        { name: "Host cities", href: "/host-cities" },
        { name: city.city, href: `/host-cities/${city.slug}` },
        { name: page.navLabel, href: canonicalPath }
      ]}
      sections={[
        ...page.sections(city),
        {
          title: "Related local planning pages",
          body: `${city.city} has dedicated CupMate pages for the local searches fans make before choosing tickets, fan zones and places to watch.`,
          items: getLocalSeoLinks(city.slug).map((link) => `${link.label}: ${link.href}`)
        }
      ]}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description,
        url: `${siteUrl}${canonicalPath}`,
        about: {
          "@type": "City",
          name: city.city,
          containedInPlace: city.country
        },
        mainEntity: {
          "@type": "StadiumOrArena",
          name: city.stadium
        },
        isPartOf: {
          "@type": "WebSite",
          name: "CupMate",
          url: siteUrl
        }
      }}
    />
  );
}
