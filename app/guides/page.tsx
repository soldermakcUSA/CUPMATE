import type { Metadata } from "next";
import Link from "next/link";
import { editorialArticles } from "@/lib/editorial-content";
import { getSiteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "World Cup 2026 Fan Guides | CupMate" },
  description: "Practical World Cup 2026 guides for tickets, schedule planning, stadiums, fan zones, travel, official sources and places to watch.",
  alternates: { canonical: "/guides" }
};

export default function GuidesIndexPage() {
  const siteUrl = getSiteUrl();

  return (
    <main className="seo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "World Cup 2026 fan guides",
            url: `${siteUrl}/guides`,
            itemListElement: editorialArticles.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${siteUrl}/guides/${article.slug}`,
              name: article.title
            }))
          })
        }}
      />
      <section className="seo-hero">
        <p>World Cup 2026 guides</p>
        <h1>Fan-first guides for tickets, travel, stadiums and watch plans</h1>
        <span>Original CupMate guides turn official tournament facts into practical decisions for fans planning matches across the United States, Canada and Mexico.</span>
        <div className="seo-actions">
          <Link className="primary-button" href="/world-cup-2026-schedule">Open schedule hub</Link>
          <Link className="link-button" href="/?section=assistant">Ask CupMate</Link>
        </div>
      </section>
      <section className="seo-grid">
        {editorialArticles.map((article) => (
          <article className="seo-card" key={article.slug}>
            <p className="seo-meta">{article.category} · Updated {article.updatedAt} · {article.readingTime}</p>
            <h2><Link href={`/guides/${article.slug}`}>{article.title}</Link></h2>
            <p>{article.description}</p>
            <ul>
              {article.keywords.slice(0, 3).map((keyword) => <li key={keyword}>{keyword}</li>)}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
