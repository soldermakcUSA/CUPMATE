import type { Metadata } from "next";
import Link from "next/link";
import { SeoShell } from "@/components/SeoShell";

export const metadata: Metadata = {
  title: { absolute: "About CupMate | Independent World Cup 2026 Fan Planner" },
  description: "CupMate is an independent World Cup 2026 fan-planning project built around official sources, match-day logistics and practical city guidance.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <SeoShell activeSection="dashboard">
      <main className="seo-page">
        <section className="seo-hero">
          <p>About CupMate</p>
          <h1>Independent planning help for World Cup 2026 fans</h1>
          <span>CupMate turns official tournament facts into practical fan decisions: which match to target, how to reach the stadium, where to watch, when to leave and what to verify before buying.</span>
          <div className="seo-actions">
            <Link className="primary-button" href="/guides">Read fan guides</Link>
            <Link className="link-button" href="/world-cup-2026-schedule">Open schedule</Link>
          </div>
        </section>
        <section className="seo-grid">
          <article className="seo-card">
            <h2>How CupMate uses sources</h2>
            <p>Official facts such as fixtures, ticket phases, venue assignments and major tournament announcements should be verified with FIFA and relevant local authorities. CupMate adds planning context and source links so fans can check the underlying information.</p>
            <ul>
              <li>Official schedule and ticket facts belong to FIFA.</li>
              <li>Local transport and event operations can change close to match day.</li>
              <li>Guide pages include update dates and source references where relevant.</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>Independence disclaimer</h2>
            <p>CupMate is an independent fan-planning project. It is not affiliated with FIFA, the FIFA World Cup, host cities, venues, teams, broadcasters or ticket marketplaces unless a specific partnership is clearly disclosed.</p>
            <ul>
              <li>No official ticket guarantee is implied.</li>
              <li>Sponsored listings should be labeled before monetization.</li>
              <li>Users should verify ticket rules before purchase or transfer.</li>
            </ul>
          </article>
        </section>
      </main>
    </SeoShell>
  );
}
