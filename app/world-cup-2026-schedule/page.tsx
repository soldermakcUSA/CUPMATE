import type { Metadata } from "next";
import { allMatchDetails } from "@/lib/match-details";
import { getSiteUrl, primarySeoPages } from "@/lib/seo";
import { SeoLandingPage } from "@/components/SeoLandingPage";

const page = primarySeoPages.find((item) => item.path === "/world-cup-2026-schedule")!;

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: page.path }
};

export default function WorldCupSchedulePage() {
  const siteUrl = getSiteUrl();
  const matches = allMatchDetails();

  return (
    <SeoLandingPage
      eyebrow="World Cup 2026 schedule"
      title="World Cup 2026 schedule, matches and venue planning"
      description="A search-friendly schedule hub for fans who need more than dates: match context, venues, tickets, odds, squads, host-city logistics and next steps."
      primaryHref="/?section=matches"
      primaryLabel="Open match planner"
      activeSection="matches"
      sections={[
        {
          title: "Match pages built for intent",
          body: "Each indexed match page answers the queries fans search before booking travel or tickets: who plays, when it starts, where it happens, what the market expects and how to plan the day.",
          items: matches.slice(0, 5).map((match) => `${match.home.name} vs ${match.away.name} at ${match.venue}`)
        },
        {
          title: "What fans can compare",
          body: "CupMate pairs the calendar with stadium, ticket and transport details so fans can compare matches by city, group, kickoff window and travel complexity.",
          items: ["Kickoff date and venue", "Team notes and group context", "Ticket and source links", "Odds snapshot and match preview"]
        }
      ]}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "World Cup 2026 match schedule",
        url: `${siteUrl}/world-cup-2026-schedule`,
        itemListElement: matches.map((match, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}/matches/${match.slug}`,
          name: `${match.home.name} vs ${match.away.name}`
        }))
      }}
    />
  );
}
