import { getNewsImageForSlugs } from "@/lib/content-data";
import { newsSeoArticles, type NewsSeoArticle } from "@/lib/news-seo-data";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type SupabaseNewsRow = {
  id: string;
  category: string | null;
  image_url: string | null;
  source_url: string | null;
  published_at: string | null;
  updated_at?: string | null;
  article_translations?: Array<{
    language_code: string;
    slug: string;
    title: string;
    excerpt: string | null;
    body: string | null;
    seo_title: string | null;
    seo_description: string | null;
  }>;
};

type SupabaseTranslationRow = {
  article_id: string;
  language_code: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  seo_title: string | null;
  seo_description: string | null;
  articles: {
    id: string;
    category: string | null;
    image_url: string | null;
    source_url: string | null;
    published_at: string | null;
    updated_at?: string | null;
  } | null;
};

type SupabaseLike = ReturnType<typeof createBrowserSupabaseClient> & {
  from: (relation: string) => any;
};

const staticArticlesBySlug = new Map(newsSeoArticles.map((article) => [article.slug, article]));
const staticArticlesBySource = new Map(newsSeoArticles.map((article) => [article.sourceUrl, article]));

export async function getNewsSeoArticles(limit = 50): Promise<NewsSeoArticle[]> {
  try {
    const rows = await fetchSupabaseNewsRows(limit);
    const articles = rows.map((row, index) => mapSupabaseNewsArticle(row, undefined, index)).filter(Boolean) as NewsSeoArticle[];
    return articles.length ? articles : newsSeoArticles;
  } catch (error) {
    console.warn("Unable to load SEO news from Supabase. Falling back to static news.", error);
    return newsSeoArticles;
  }
}

export async function getNewsSeoArticleBySlug(slug: string): Promise<NewsSeoArticle | null> {
  try {
    const direct = await fetchSupabaseNewsTranslationBySlug(slug);
    if (direct) {
      return mapSupabaseTranslationArticle(direct);
    }

    const rows = await fetchSupabaseNewsRows(120);
    for (let index = 0; index < rows.length; index += 1) {
      const article = mapSupabaseNewsArticle(rows[index], slug, index);
      if (article) return article;
    }
  } catch (error) {
    console.warn("Unable to load SEO news article from Supabase. Falling back to static news.", error);
  }

  return staticArticlesBySlug.get(slug) ?? null;
}

export async function getNewsSeoStaticParams() {
  const params = new Map<string, { slug: string }>();

  try {
    const rows = await fetchSupabaseNewsRows(120);
    rows
      .flatMap((row) => row.article_translations ?? [])
      .forEach((translation) => {
        if (translation.slug) params.set(translation.slug, { slug: translation.slug });
      });
  } catch (error) {
    console.warn("Unable to load Supabase news slugs. Using static news slugs.", error);
  }

  newsSeoArticles.forEach((article) => params.set(article.slug, { slug: article.slug }));
  return [...params.values()];
}

async function fetchSupabaseNewsRows(limit: number): Promise<SupabaseNewsRow[]> {
  const supabase = createBrowserSupabaseClient() as SupabaseLike;
  const { data, error } = await supabase
    .from("articles")
    .select("id,category,image_url,source_url,published_at,updated_at,article_translations(language_code,slug,title,excerpt,body,seo_title,seo_description)")
    .eq("status", "published")
    .eq("type", "news")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as unknown as SupabaseNewsRow[];
}

async function fetchSupabaseNewsTranslationBySlug(slug: string): Promise<SupabaseTranslationRow | null> {
  const supabase = createBrowserSupabaseClient() as SupabaseLike;
  const { data, error } = await supabase
    .from("article_translations")
    .select("article_id,language_code,slug,title,excerpt,body,seo_title,seo_description,articles!inner(id,category,image_url,source_url,published_at,updated_at,status,type)")
    .eq("slug", slug)
    .eq("articles.status", "published")
    .eq("articles.type", "news")
    .maybeSingle();

  if (error) throw error;
  return (data ?? null) as unknown as SupabaseTranslationRow | null;
}

function mapSupabaseTranslationArticle(row: SupabaseTranslationRow): NewsSeoArticle | null {
  if (!row.articles) return null;
  return mapSupabaseNewsArticle(
    {
      id: row.article_id,
      category: row.articles.category,
      image_url: row.articles.image_url,
      source_url: row.articles.source_url,
      published_at: row.articles.published_at,
      updated_at: row.articles.updated_at,
      article_translations: [row]
    },
    row.slug
  );
}

function mapSupabaseNewsArticle(row: SupabaseNewsRow, requestedSlug?: string, index = 0): NewsSeoArticle | null {
  const translations = row.article_translations ?? [];
  const translation = requestedSlug
    ? translations.find((item) => item.slug === requestedSlug)
    : translations.find((item) => item.language_code === "en") ?? translations[0];

  if (!translation?.slug || !translation.title) return null;

  const staticArticle = staticArticlesBySlug.get(translation.slug) || (row.source_url ? staticArticlesBySource.get(row.source_url) : undefined);
  const publishedAt = dateOnly(row.published_at) || staticArticle?.publishedAt || dateOnly(row.updated_at) || "2026-01-01";
  const updatedAt = dateOnly(row.updated_at) || staticArticle?.updatedAt || publishedAt;
  const body = translation.body || translation.excerpt || staticArticle?.summary || "";
  const sections = staticArticle?.sections?.length ? staticArticle.sections : sectionsFromBody(body);

  return {
    slug: translation.slug,
    title: translation.seo_title || translation.title,
    description: translation.seo_description || translation.excerpt || staticArticle?.description || body.slice(0, 160),
    category: row.category || staticArticle?.category || "News",
    publishedAt,
    updatedAt,
    image: getNewsImageForSlugs(translations.map((item) => item.slug), index, row.image_url || staticArticle?.image),
    sourceUrl: row.source_url || staticArticle?.sourceUrl || "",
    sourceLabel: staticArticle?.sourceLabel || sourceLabelFromUrl(row.source_url),
    summary: firstParagraph(body) || staticArticle?.summary || translation.excerpt || translation.title,
    impact: staticArticle?.impact?.length ? staticArticle.impact : defaultImpact(row.category),
    sections
  };
}

function sectionsFromBody(body: string): NewsSeoArticle["sections"] {
  const paragraphs = body
    .split(/\n{2,}|\r\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length <= 1) {
    return [
      {
        title: "What fans should know",
        body: paragraphs[0] || "CupMate is tracking this World Cup update for supporters planning matches, routes, tickets and host-city experiences."
      }
    ];
  }

  return paragraphs.slice(1, 5).map((paragraph, index) => ({
    title: ["What changed", "Why it matters", "Planning note", "What to watch next"][index] ?? "Fan planning note",
    body: paragraph
  }));
}

function firstParagraph(body: string) {
  return body.split(/\n{2,}|\r\n{2,}/).map((paragraph) => paragraph.trim()).find(Boolean) ?? "";
}

function defaultImpact(category: string | null): string[] {
  const label = category || "news";
  return [
    `Track ${label.toLowerCase()} updates before match day`,
    "Check official sources before booking around the news",
    "Save relevant matches, venues or host-city plans in CupMate"
  ];
}

function dateOnly(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function sourceLabelFromUrl(value: string | null | undefined) {
  if (!value) return "Source";
  try {
    const host = new URL(value).hostname.replace(/^www\./, "");
    if (host.includes("fifa.com")) return host.startsWith("inside.") ? "FIFA Inside" : "FIFA";
    if (host.includes("apnews.com")) return "Associated Press";
    if (host.includes("axios.com")) return "Axios";
    return host.split(".").slice(0, -1).join(" ") || host;
  } catch {
    return "Source";
  }
}
