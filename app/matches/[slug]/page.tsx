import type { Metadata } from "next";
import { allMatchDetails, findMatchDetail, formatAmericanOdds, impliedProbability } from "@/lib/match-details";
import { getSiteUrl, siteName } from "@/lib/seo";
import { MatchDetailClient } from "./MatchDetailClient";

type MatchPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allMatchDetails().map((match) => ({ slug: match.slug }));
}

export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = findMatchDetail(slug);

  if (!detail) {
    return {
      title: "World Cup 2026 Match Not Found",
      robots: { index: false, follow: true }
    };
  }

  const title = `${detail.home.name} vs ${detail.away.name} World Cup 2026: Date, Stadium, Tickets and Odds`;
  const description = `${detail.home.name} vs ${detail.away.name} at ${detail.venue}, ${detail.city}: kickoff ${detail.kickoff}, match preview, tickets, odds, squads, recent form and fan planning notes.`;
  const path = `/matches/${detail.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    keywords: [
      `${detail.home.name} vs ${detail.away.name}`,
      `${detail.home.code} ${detail.away.code}`,
      `${detail.home.name} World Cup 2026`,
      `${detail.away.name} World Cup 2026`,
      `${detail.venue} World Cup 2026`,
      `${detail.city} World Cup 2026`
    ],
    openGraph: {
      type: "article",
      siteName,
      title,
      description,
      url: path,
      images: [{ url: "/assets/cupmate-social-preview.png", width: 1200, height: 630, alt: `${detail.home.name} vs ${detail.away.name} World Cup 2026` }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/cupmate-social-preview.png"]
    }
  };
}

export default async function MatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = findMatchDetail(slug);
  const siteUrl = getSiteUrl();

  const sportsEventJsonLd = detail
    ? {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: `${detail.home.name} vs ${detail.away.name}`,
        sport: "Soccer",
        description: detail.story,
        url: `${siteUrl}/matches/${detail.slug}`,
        startDate: detail.kickoff,
        location: {
          "@type": "Place",
          name: detail.venue,
          address: detail.city
        },
        homeTeam: {
          "@type": "SportsTeam",
          name: detail.home.name
        },
        awayTeam: {
          "@type": "SportsTeam",
          name: detail.away.name
        },
        offers: {
          "@type": "AggregateOffer",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/matches/${detail.slug}`
        },
        subjectOf: detail.sources.map((source) => ({
          "@type": "WebPage",
          name: source.label,
          url: source.href
        }))
      }
    : null;

  const breadcrumbJsonLd = detail
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "CupMate", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "World Cup 2026 schedule", item: `${siteUrl}/world-cup-2026-schedule` },
          { "@type": "ListItem", position: 3, name: `${detail.home.name} vs ${detail.away.name}`, item: `${siteUrl}/matches/${detail.slug}` }
        ]
      }
    : null;

  const oddsJsonLd = detail
    ? {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: `${detail.home.name} vs ${detail.away.name} odds snapshot`,
        description: `Market snapshot for ${detail.home.name} vs ${detail.away.name}: ${detail.odds
          .map((outcome) => `${outcome.label} ${formatAmericanOdds(outcome.american)} (${Math.round(impliedProbability(outcome.american) * 100)}%)`)
          .join(", ")}.`,
        url: `${siteUrl}/matches/${detail.slug}`
      }
    : null;

  return (
    <>
      {[sportsEventJsonLd, breadcrumbJsonLd, oddsJsonLd].filter(Boolean).map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <MatchDetailClient slug={slug} />
    </>
  );
}
