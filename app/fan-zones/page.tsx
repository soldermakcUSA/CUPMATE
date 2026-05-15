import type { Metadata } from "next";
import { hostCityGuides, primarySeoPages } from "@/lib/seo";
import { SeoLandingPage } from "@/components/SeoLandingPage";

const page = primarySeoPages.find((item) => item.path === "/fan-zones")!;

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: page.path }
};

export default function FanZonesSeoPage() {
  return (
    <SeoLandingPage
      eyebrow="World Cup 2026 fan zones"
      title="World Cup 2026 fan zones, watch parties and supporter meetups"
      description="Plan where to gather before and during matches with host-city fan-zone ideas, big-screen viewing notes and supporter-friendly timing."
      primaryHref="/?section=fanZones"
      primaryLabel="Open fan zones"
      activeSection="fanZones"
      breadcrumbs={[{ name: "CupMate", href: "/" }, { name: "Fan zones", href: "/fan-zones" }]}
      sections={[
        {
          title: "Fan-zone pages can capture local search",
          body: "People search by city and match: New York fan zones, Miami watch parties, Mexico City viewing areas. CupMate now has a structure to target those searches.",
          items: hostCityGuides.slice(0, 6).map((city) => `${city.city}: fan meetups near ${city.stadium}`)
        },
        {
          title: "Useful planning signals",
          body: "The best fan-zone content combines atmosphere, transport, crowd timing, food options, weather and backup viewing places.",
          items: ["Big screens", "Food and music", "Family-friendly areas", "Transit after the match"]
        }
      ]}
    />
  );
}
