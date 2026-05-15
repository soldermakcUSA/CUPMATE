import type { Metadata } from "next";
import { getSiteUrl, primarySeoPages, stadiumGuides } from "@/lib/seo";
import { SeoLandingPage } from "@/components/SeoLandingPage";

const page = primarySeoPages.find((item) => item.path === "/stadiums")!;

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: page.path }
};

export default function StadiumsSeoPage() {
  const siteUrl = getSiteUrl();

  return (
    <SeoLandingPage
      eyebrow="World Cup 2026 stadiums"
      title="World Cup 2026 stadium guide for match-day planning"
      description="Compare the most important World Cup 2026 venues by capacity, match count, host city, transit path and practical arrival strategy."
      primaryHref="/?section=stadiums"
      primaryLabel="Open stadium guide"
      sections={[
        {
          title: "Venue details that matter",
          body: "Search traffic around stadiums is not only informational. Fans need transport, gates, ticket demand, nearby viewing areas and a realistic arrival plan.",
          items: stadiumGuides.map((stadium) => `${stadium.name}: ${stadium.matches} matches, ${stadium.capacity} capacity`)
        },
        {
          title: "Stronger than generic stadium pages",
          body: "CupMate connects each venue to its tournament role, nearby city decisions and match-day movement, which creates more unique value than copied venue summaries.",
          items: ["Capacity and match count", "Transit and parking notes", "Host city context", "Fan tips and ticket planning"]
        }
      ]}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "World Cup 2026 stadiums",
        url: `${siteUrl}/stadiums`,
        itemListElement: stadiumGuides.map((stadium, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}/stadiums/${stadium.slug}`,
          name: stadium.name
        }))
      }}
    />
  );
}
