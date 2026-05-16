import type { Metadata } from "next";
import Link from "next/link";
import { SeoRelatedLinks } from "@/components/SeoRelatedLinks";
import { SeoShell } from "@/components/SeoShell";
import { SeoBreadcrumbs } from "@/components/SeoBreadcrumbs";
import { SeoUpdated } from "@/components/SeoUpdated";
import { getSiteUrl, hostCityGuides } from "@/lib/seo";
import { getLocalSeoLinks } from "./local-seo";

type HostCityPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return hostCityGuides.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: HostCityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = hostCityGuides.find((item) => item.slug === slug);

  if (!city) return { title: "World Cup 2026 Host City Not Found", robots: { index: false, follow: true } };

  return {
    title: `${city.city} World Cup 2026 Travel Guide`,
    description: `Plan World Cup 2026 in ${city.city}: ${city.stadium}, ${city.focus}, tickets, fan zones, transit and match-day timing.`,
    alternates: { canonical: `/host-cities/${city.slug}` },
    openGraph: {
      title: `${city.city} World Cup 2026 Travel Guide`,
      description: `Practical World Cup 2026 planning for ${city.city}: stadium access, fan zones, tickets and transport.`,
      images: ["/assets/cupmate-social-preview.png"]
    }
  };
}

export default async function HostCityDetailPage({ params }: HostCityPageProps) {
  const { slug } = await params;
  const city = hostCityGuides.find((item) => item.slug === slug);
  const siteUrl = getSiteUrl();

  if (!city) {
    return (
      <SeoShell activeSection="travel">
        <main className="seo-page">
          <section className="seo-hero"><h1>Host city not found</h1></section>
        </main>
      </SeoShell>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "City",
    name: city.city,
    url: `${siteUrl}/host-cities/${city.slug}`,
    containedInPlace: city.country,
    subjectOf: {
      "@type": "WebPage",
      name: `${city.city} World Cup 2026 travel guide`
    }
  };
  const localSeoLinks = getLocalSeoLinks(city.slug);

  return (
    <SeoShell activeSection="travel">
      <main className="seo-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SeoBreadcrumbs
          items={[
            { name: "CupMate", href: "/" },
            { name: "Host cities", href: "/host-cities" },
            { name: city.city, href: `/host-cities/${city.slug}` }
          ]}
        />
        <section className="seo-hero">
          <p>World Cup 2026 host city</p>
          <h1>{city.city} World Cup 2026 travel guide</h1>
          <span>{city.stadium} is the tournament anchor for this city. CupMate focuses on {city.focus}.</span>
          <div className="seo-actions">
            <Link className="primary-button" href="/?section=travel">Open travel planner</Link>
            <Link className="link-button" href="/host-cities">All host cities</Link>
          </div>
        </section>
        <SeoUpdated />
        <section className="seo-grid">
          <article className="seo-card">
            <h2>Match-day priorities</h2>
            <p>Fans should plan arrival time, ticket access, stadium approach, post-match exit and a backup viewing plan before they arrive in {city.city}.</p>
            <ul>
              <li>Primary stadium: {city.stadium}</li>
              <li>Country: {city.country}</li>
              <li>Planning focus: {city.focus}</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>SEO intent covered</h2>
            <p>This page targets local World Cup searches around travel, fan zones, tickets, transit and places to watch. It gives search engines a dedicated URL for {city.city} instead of hiding the city inside an app panel.</p>
            <ul>
              <li>{city.city} World Cup 2026</li>
              <li>{city.stadium} World Cup 2026</li>
              <li>{city.city} fan zones and match-day travel</li>
            </ul>
          </article>
          {localSeoLinks.length ? (
            <article className="seo-card">
              <h2>Local planning pages</h2>
              <p>Selected host-city searches now have dedicated CupMate URLs for high-intent planning around places to watch, fan zones and tickets.</p>
              <ul>
                {localSeoLinks.map((link) => (
                  <li key={link.href}><Link href={link.href}>{city.city} {link.label}</Link></li>
                ))}
              </ul>
            </article>
          ) : null}
        </section>
        <SeoRelatedLinks currentPath={`/host-cities/${city.slug}`} category="Host city" />
      </main>
    </SeoShell>
  );
}
