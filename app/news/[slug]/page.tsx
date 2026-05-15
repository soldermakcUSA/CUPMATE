import type { Metadata } from "next";
import Link from "next/link";
import { SeoBreadcrumbs } from "@/components/SeoBreadcrumbs";
import { SeoRelatedLinks } from "@/components/SeoRelatedLinks";
import { SeoShell } from "@/components/SeoShell";
import { SeoUpdated } from "@/components/SeoUpdated";
import { findNewsSeoArticle, newsArticleJsonLd, newsSeoArticles } from "@/lib/news-seo-data";

type NewsArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsSeoArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findNewsSeoArticle(slug);

  if (!article) {
    return { title: "World Cup 2026 News Not Found", robots: { index: false, follow: true } };
  }

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      section: article.category,
      images: [{ url: article.image, alt: article.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image]
    }
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = findNewsSeoArticle(slug);

  if (!article) {
    return (
      <SeoShell activeSection="news">
        <main className="seo-page">
          <section className="seo-hero"><h1>News article not found</h1></section>
        </main>
      </SeoShell>
    );
  }

  return (
      <SeoShell activeSection="news">
        <main className="seo-page">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd(article)) }} />
          <SeoBreadcrumbs items={[{ name: "CupMate", href: "/" }, { name: "News", href: "/news" }, { name: article.title, href: `/news/${article.slug}` }]} />
          <article className="seo-article">
            <Link className="link-button" href="/news">All news</Link>
          <SeoUpdated date={article.updatedAt} prefix={article.category} />
          <h1>{article.title}</h1>
          <img
            src={article.image}
            alt=""
            decoding="async"
            loading="eager"
            style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", borderRadius: 8, margin: "10px 0 22px" }}
          />
          <p className="seo-lede">{article.summary}</p>

          <section>
            <h2>Fan impact</h2>
            <ul>
              {article.impact.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          {article.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : null}
            </section>
          ))}

          <section>
            <h2>Source</h2>
            <p>
              This CupMate summary is rewritten for fan planning context from{" "}
              <a href={article.sourceUrl} target="_blank" rel="noreferrer">{article.sourceLabel}</a>.
            </p>
          </section>
        </article>
        <SeoRelatedLinks currentPath={`/news/${article.slug}`} category={article.category} />
      </main>
    </SeoShell>
  );
}
