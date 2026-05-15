import type { Metadata } from "next";
import { primarySeoPages } from "@/lib/seo";
import { SeoLandingPage } from "@/components/SeoLandingPage";

const page = primarySeoPages.find((item) => item.path === "/tickets")!;

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: page.path }
};

export default function TicketsSeoPage() {
  return (
    <SeoLandingPage
      eyebrow="World Cup 2026 tickets"
      title="World Cup 2026 ticket planning without guesswork"
      description="A fan-focused ticket guide for understanding demand, official channels, resale caution, budget reminders and match-by-match decisions."
      primaryHref="/?section=tickets"
      primaryLabel="Open ticket tools"
      sections={[
        {
          title: "Ticket intent is high value",
          body: "Fans searching for tickets are close to purchase. CupMate should help them compare match demand, avoid unsafe paths and connect ticket choices to travel plans.",
          items: ["Official ticket reminders", "Resale risk checks", "Budget planning", "Match and city demand context"]
        },
        {
          title: "How CupMate differentiates",
          body: "Ticket pages become stronger when they explain the complete match-day cost: stadium location, transit, hotel geography, fan zones and timing.",
          items: ["Ticket links on match pages", "Seat and venue context", "Arrival and exit planning", "Price-change reminders"]
        }
      ]}
    />
  );
}
