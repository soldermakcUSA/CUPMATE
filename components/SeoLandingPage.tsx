import Link from "next/link";
import { allMatchDetails, formatAmericanOdds } from "@/lib/match-details";
import { contentClusters, getSiteUrl, hostCityGuides, stadiumGuides } from "@/lib/seo";
import { SeoShell } from "@/components/SeoShell";
import { SeoRelatedLinks } from "@/components/SeoRelatedLinks";
import { SeoUpdated } from "@/components/SeoUpdated";
import type { SidebarSection } from "@/components/AppSidebar";
import { SeoBreadcrumbs, type SeoBreadcrumbItem } from "@/components/SeoBreadcrumbs";

type SeoLandingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  sections: Array<{
    title: string;
    body: string;
    items?: string[];
  }>;
  jsonLd?: object;
  activeSection?: SidebarSection;
  breadcrumbs?: SeoBreadcrumbItem[];
  currentPath?: string;
  relatedCategory?: string;
};

export function SeoLandingPage({
  eyebrow,
  title,
  description,
  primaryHref = "/?section=matches",
  primaryLabel = "Open CupMate planner",
  sections,
  jsonLd,
  activeSection = "dashboard",
  breadcrumbs,
  currentPath,
  relatedCategory
}: SeoLandingPageProps) {
  const matches = allMatchDetails().slice(0, 8);
  const siteUrl = getSiteUrl();

  return (
    <SeoShell activeSection={activeSection}>
      <main className="seo-page">
        {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> : null}
        {breadcrumbs ? <SeoBreadcrumbs items={breadcrumbs} /> : null}
        <section className="seo-hero">
          <p>{eyebrow}</p>
          <h1>{title}</h1>
          <span>{description}</span>
          <div className="seo-actions">
            <Link className="primary-button" href={primaryHref}>{primaryLabel}</Link>
            <Link className="link-button" href="/world-cup-2026-schedule">View schedule</Link>
          </div>
        </section>
        <SeoUpdated />

        <section className="seo-grid" aria-label="World Cup 2026 planning topics">
          {sections.map((section) => (
            <article className="seo-card" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.items ? (
                <ul>
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
            </article>
          ))}
        </section>

        {currentPath ? <SeoRelatedLinks currentPath={currentPath} category={relatedCategory} /> : null}

      <section className="seo-band">
        <div>
          <h2>Key World Cup 2026 matches</h2>
          <p>Each match page has its own URL, preview, venue context, ticket links, odds snapshot, team notes, sources and structured data for search engines.</p>
        </div>
        <div className="seo-list">
          {matches.map((match) => (
            <Link href={`/matches/${match.slug}`} key={match.slug}>
              <strong>{match.home.name} vs {match.away.name}</strong>
              <span>{match.kickoff} · {match.venue}, {match.city}</span>
              <small>{match.odds.map((outcome) => `${outcome.label}: ${formatAmericanOdds(outcome.american)}`).join(" · ")}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="seo-grid seo-grid-three" aria-label="Host cities and stadiums">
        <article className="seo-card">
          <h2>Host city coverage</h2>
          <p>CupMate connects matches to the city decisions fans actually need: where to stay, how to reach the stadium, where to meet other supporters and when to leave.</p>
          <ul>
            {hostCityGuides.slice(0, 6).map((city) => (
              <li key={city.slug}><Link href={`/host-cities/${city.slug}`}>{city.city}</Link> · {city.stadium}</li>
            ))}
          </ul>
        </article>
        <article className="seo-card">
          <h2>Stadium guides</h2>
          <p>Venue pages are built around capacity, match count, transit, parking, gates, tickets and practical fan movement rather than generic stadium descriptions.</p>
          <ul>
            {stadiumGuides.map((stadium) => (
              <li key={stadium.slug}><Link href={`/stadiums/${stadium.slug}`}>{stadium.name}</Link> · {stadium.city}</li>
            ))}
          </ul>
        </article>
        <article className="seo-card">
          <h2>Search clusters</h2>
          <p>The site now targets a clearer topic map instead of relying on one broad homepage phrase.</p>
          <ul>
            {contentClusters.map((cluster) => <li key={cluster}>{cluster}</li>)}
          </ul>
        </article>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "CupMate",
            url: siteUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteUrl}/?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      </main>
    </SeoShell>
  );
}
