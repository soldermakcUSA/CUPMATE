import type { Metadata } from "next";
import Link from "next/link";
import { articleJsonLd, editorialArticles, faqJsonLd, findEditorialArticle } from "@/lib/editorial-content";

type GuidePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return editorialArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findEditorialArticle(slug);

  if (!article) return { title: "World Cup 2026 Guide Not Found", robots: { index: false, follow: true } };

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/guides/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      images: ["/assets/hero-world-cup-banner.png"]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: ["/assets/hero-world-cup-banner.png"]
    }
  };
}

export default async function GuideArticlePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const article = findEditorialArticle(slug);

  if (!article) {
    return (
      <main className="seo-page">
        <section className="seo-hero"><h1>Guide not found</h1></section>
      </main>
    );
  }

  return (
    <main className="seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(article)) }} />
      <article className="seo-article">
        <Link className="link-button" href="/guides">All guides</Link>
        <p className="seo-meta">{article.category} · Updated {article.updatedAt} · {article.readingTime}</p>
        <h1>{article.title}</h1>
        <p className="seo-lede">{article.intro}</p>

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
          <h2>FAQ</h2>
          {article.faqs.map((faq) => (
            <div className="seo-faq" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Sources</h2>
          <ul>
            {article.sources.map((source) => (
              <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
