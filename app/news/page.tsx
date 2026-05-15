import type { Metadata } from "next";
import { primarySeoPages } from "@/lib/seo";
import { SeoLandingPage } from "@/components/SeoLandingPage";

const page = primarySeoPages.find((item) => item.path === "/news")!;

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: page.path }
};

export default function NewsSeoPage() {
  return (
    <SeoLandingPage
      eyebrow="World Cup 2026 news"
      title="World Cup 2026 news with fan planning context"
      description="CupMate should turn every ticket, transport, squad, stadium and host-city update into practical planning advice for fans."
      primaryHref="/?section=news"
      primaryLabel="Open news panel"
      activeSection="news"
      sections={[
        {
          title: "Editorial angle",
          body: "The site should avoid short generic news cards. Strong articles explain what changed, why it matters, which fans are affected and what to do next.",
          items: ["Ticket phase updates", "Transit and stadium operations", "Squad and injury context", "Host-city event changes"]
        },
        {
          title: "Uniqueness strategy",
          body: "CupMate can be distinct by pairing sourced news with original fan-planning recommendations, not by repeating the same headline every publisher covers.",
          items: ["Add sources", "Add city impact", "Add match-day checklist", "Add ticket/travel implications"]
        }
      ]}
    />
  );
}
