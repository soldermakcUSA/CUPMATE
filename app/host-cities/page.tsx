import type { Metadata } from "next";
import { getSiteUrl, hostCityGuides, primarySeoPages } from "@/lib/seo";
import { SeoLandingPage } from "@/components/SeoLandingPage";

const page = primarySeoPages.find((item) => item.path === "/host-cities")!;

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: page.path }
};

export default function HostCitiesSeoPage() {
  const siteUrl = getSiteUrl();

  return (
    <SeoLandingPage
      eyebrow="World Cup 2026 host cities"
      title="World Cup 2026 host cities travel and fan guide"
      description="Plan the tournament city by city with stadium locations, fan-zone context, local movement, hotel geography and match-day timing."
      primaryHref="/?section=travel"
      primaryLabel="Open travel planner"
      sections={[
        {
          title: "16 cities, different decisions",
          body: "The 2026 tournament stretches across three countries. CupMate breaks the host cities into practical fan decisions instead of treating them as a static list.",
          items: hostCityGuides.slice(0, 8).map((city) => `${city.city}: ${city.focus}`)
        },
        {
          title: "Travel-first content",
          body: "Host-city pages should rank for searches around where to stay, how to get to the stadium, where fans meet and how early to leave.",
          items: ["Stadium access", "Fan-zone planning", "Transport tradeoffs", "Ticket demand by city"]
        }
      ]}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "World Cup 2026 host cities",
        url: `${siteUrl}/host-cities`,
        itemListElement: hostCityGuides.map((city, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}/host-cities/${city.slug}`,
          name: city.city
        }))
      }}
    />
  );
}
