import type { Metadata } from "next";
import Link from "next/link";
import { SeoShell } from "@/components/SeoShell";
import { SeoUpdated } from "@/components/SeoUpdated";
import { getNewsSeoArticles } from "@/lib/news-seo-supabase";
import { primarySeoPages } from "@/lib/seo";

const page = primarySeoPages.find((item) => item.path === "/news")!;

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: page.path }
};

export default async function NewsSeoPage() {
  const articles = await getNewsSeoArticles();

  return (
    <SeoShell activeSection="news">
      <main className="seo-page">
        <section className="seo-hero">
          <p>World Cup 2026 news</p>
          <h1>World Cup 2026 news with fan planning context</h1>
          <span>CupMate turns ticket, transport, squad, stadium and host-city updates into practical planning notes for fans.</span>
          <div className="seo-actions">
            <Link className="primary-button" href="/?section=news">Open news panel</Link>
            <Link className="link-button" href="/world-cup-2026-schedule">View schedule</Link>
          </div>
        </section>
        <SeoUpdated />

        <section className="seo-grid" aria-label="World Cup 2026 news articles">
          {articles.map((article) => (
            <article className="seo-card seo-news-card" key={article.slug}>
              <Link href={`/news/${article.slug}`} aria-label={article.title}>
                <img src={article.image} alt="" decoding="async" loading="lazy" />
              </Link>
              <SeoUpdated date={article.updatedAt} prefix={article.category} />
              <h2><Link href={`/news/${article.slug}`}>{article.title}</Link></h2>
              <p>{article.description}</p>
              <ul>
                {article.impact.slice(0, 2).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </section>
      </main>
    </SeoShell>
  );
}
