import type { Metadata } from "next";
import Link from "next/link";
import { SeoShell } from "@/components/SeoShell";

export const metadata: Metadata = {
  title: { absolute: "Contact CupMate | World Cup 2026 Fan Planning" },
  description: "Contact CupMate about World Cup 2026 guide corrections, source updates, partnerships, city listings and fan-planning feedback.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <SeoShell activeSection="dashboard">
      <main className="seo-page">
        <section className="seo-hero">
          <p>Contact</p>
          <h1>Send corrections, listings and partnership notes</h1>
          <span>Use this page as the public trust and outreach entry point for CupMate. It supports SEO credibility by making corrections, source updates and commercial inquiries clear.</span>
          <div className="seo-actions">
            <Link className="primary-button" href="/guides/world-cup-2026-official-sources">View source guide</Link>
            <Link className="link-button" href="/about">About CupMate</Link>
          </div>
        </section>
        <section className="seo-grid">
          <article className="seo-card">
            <h2>Corrections and source updates</h2>
            <p>For guide corrections, include the page URL, the claim that needs review and the official or primary source that supports the correction.</p>
            <ul>
              <li>Fixture or venue updates</li>
              <li>Ticket phase or resale rule changes</li>
              <li>Transport and fan-zone changes</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>Listings and partnerships</h2>
            <p>Sports bars, fan zones, hotels, travel providers and local organizers can prepare listing details for future CupMate city pages. Sponsored placement should be disclosed clearly.</p>
            <ul>
              <li>Business name, address and website</li>
              <li>Match viewing details and reservation rules</li>
              <li>Accessibility, family and transit notes</li>
            </ul>
          </article>
        </section>
      </main>
    </SeoShell>
  );
}
