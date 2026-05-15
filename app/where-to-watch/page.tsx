import type { Metadata } from "next";
import { primarySeoPages } from "@/lib/seo";
import { SeoLandingPage } from "@/components/SeoLandingPage";

const page = primarySeoPages.find((item) => item.path === "/where-to-watch")!;

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: page.path }
};

export default function WhereToWatchSeoPage() {
  return (
    <SeoLandingPage
      eyebrow="Where to watch World Cup 2026"
      title="Where to watch World Cup 2026 matches in host cities"
      description="Find sports bars, restaurants, fan zones and local viewing options with enough context to choose the right place before kickoff."
      primaryHref="/?section=watch"
      primaryLabel="Open watch guide"
      activeSection="watch"
      sections={[
        {
          title: "Local discovery opportunity",
          body: "Watch-location searches are local and urgent. CupMate can rank by combining match schedules with city-specific bars, restaurants and public fan events.",
          items: ["Sports bars by city", "Restaurants with screens", "Outdoor fan areas", "Reservation and arrival notes"]
        },
        {
          title: "Better than a generic list",
          body: "A useful watch guide explains which places fit which fans: family groups, late kickoffs, supporters of a specific team, transit-first visitors or nightlife plans.",
          items: ["Match-specific recommendations", "Distance and transit context", "Atmosphere notes", "Backup options"]
        }
      ]}
    />
  );
}
