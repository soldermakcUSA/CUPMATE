import { getNewsSeoArticles } from "@/lib/news-seo-supabase";
import { getSiteUrl, sitemapXmlResponse } from "@/lib/seo";

export async function GET() {
  const siteUrl = getSiteUrl();
  const articles = await getNewsSeoArticles(120);

  return sitemapXmlResponse(
    articles.map((article) => ({
      url: `${siteUrl}/news/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "daily" as const,
      priority: 0.74
    }))
  );
}
