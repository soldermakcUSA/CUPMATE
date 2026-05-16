import type { Metadata } from "next";
import Link from "next/link";
import { SeoRelatedLinks } from "@/components/SeoRelatedLinks";
import { SeoShell } from "@/components/SeoShell";
import { SeoBreadcrumbs } from "@/components/SeoBreadcrumbs";
import { SeoUpdated } from "@/components/SeoUpdated";
import { getSiteUrl, stadiumGuides } from "@/lib/seo";

type StadiumPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stadiumGuides.map((stadium) => ({ slug: stadium.slug }));
}

export async function generateMetadata({ params }: StadiumPageProps): Promise<Metadata> {
  const { slug } = await params;
  const stadium = stadiumGuides.find((item) => item.slug === slug);

  if (!stadium) return { title: "World Cup 2026 Stadium Not Found", robots: { index: false, follow: true } };

  return {
    title: `${stadium.name} World Cup 2026 Stadium Guide`,
    description: `${stadium.name} World Cup 2026 guide: ${stadium.city}, ${stadium.capacity} capacity, ${stadium.matches} matches, transit, tickets and fan planning notes.`,
    alternates: { canonical: `/stadiums/${stadium.slug}` },
    openGraph: {
      title: `${stadium.name} World Cup 2026 Stadium Guide`,
      description: `Plan matches at ${stadium.name}: capacity, transit, tickets and match-day fan logistics.`,
      images: ["/assets/cupmate-social-preview.png"]
    }
  };
}

export default async function StadiumDetailPage({ params }: StadiumPageProps) {
  const { slug } = await params;
  const stadium = stadiumGuides.find((item) => item.slug === slug);
  const siteUrl = getSiteUrl();

  if (!stadium) {
    return (
      <SeoShell activeSection="stadiums">
        <main className="seo-page">
          <section className="seo-hero"><h1>Stadium not found</h1></section>
        </main>
      </SeoShell>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "StadiumOrArena",
    name: stadium.name,
    url: `${siteUrl}/stadiums/${stadium.slug}`,
    address: stadium.city,
    maximumAttendeeCapacity: stadium.capacity,
    subjectOf: {
      "@type": "WebPage",
      name: `${stadium.name} World Cup 2026 stadium guide`
    }
  };

  return (
    <SeoShell activeSection="stadiums">
      <main className="seo-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SeoBreadcrumbs
          items={[
            { name: "CupMate", href: "/" },
            { name: "Stadiums", href: "/stadiums" },
            { name: stadium.name, href: `/stadiums/${stadium.slug}` }
          ]}
        />
        <section className="seo-hero">
          <p>World Cup 2026 stadium</p>
          <h1>{stadium.name} World Cup 2026 stadium guide</h1>
          <span>{stadium.name} in {stadium.city} is expected to host {stadium.matches} World Cup 2026 matches with a listed capacity of {stadium.capacity}.</span>
          <div className="seo-actions">
            <Link className="primary-button" href="/?section=stadiums">Open stadium guide</Link>
            <Link className="link-button" href="/stadiums">All stadiums</Link>
          </div>
        </section>
        <SeoUpdated />
        <section className="seo-grid">
          <article className="seo-card">
            <h2>Fan planning facts</h2>
            <p>This venue page is built for practical search intent around tickets, arrival, transit and match-day movement.</p>
            <ul>
              <li>City: {stadium.city}</li>
              <li>Capacity: {stadium.capacity}</li>
              <li>World Cup 2026 matches: {stadium.matches}</li>
              <li>Transit: {stadium.transit}</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>Why this page can rank</h2>
            <p>Dedicated stadium URLs help CupMate compete for searches like "{stadium.name} World Cup 2026", "{stadium.name} tickets" and "{stadium.name} transport" while linking users back to the full app.</p>
            <ul>
              <li>Venue-specific title and description</li>
              <li>StadiumOrArena schema</li>
              <li>Internal links from sitemap and hub pages</li>
            </ul>
          </article>
        </section>
        <SeoRelatedLinks currentPath={`/stadiums/${stadium.slug}`} category="Stadium" />
      </main>
    </SeoShell>
  );
}
