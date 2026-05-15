#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Buffer } from "node:buffer";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const envPath = path.join(root, ".env.local");
const newsDataPath = path.join(root, "lib", "news-seo-data.ts");
const contentDataPath = path.join(root, "lib", "content-data.ts");
const imageDir = path.join(root, "public", "assets", "news");
const reportPath = path.join(root, "tmp", "auto-news-report.json");

const config = {
  maxArticles: Number(process.env.AUTO_NEWS_MAX_ARTICLES ?? 2),
  maxCandidates: Number(process.env.AUTO_NEWS_MAX_CANDIDATES ?? 12),
  minHoursBetweenRuns: Number(process.env.AUTO_NEWS_MIN_HOURS ?? 0),
  textModel: process.env.OPENAI_TEXT_MODEL ?? "gpt-5.4-mini",
  imageModel: process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1",
  dryRun: process.argv.includes("--dry-run"),
  skipImages: process.argv.includes("--skip-images"),
  skipSupabase: process.argv.includes("--skip-supabase"),
  pushMode: process.argv.includes("--push")
};

const feeds = [
  "FIFA World Cup 2026 latest news",
  "2026 FIFA World Cup host city news",
  "FIFA World Cup 2026 tickets transport stadium news",
  "site:fifa.com/en World Cup 2026 FIFA news",
  "site:inside.fifa.com World Cup 2026 FIFA news"
];

const allowedCategories = [
  "Teams",
  "Culture",
  "Streaming",
  "Travel",
  "Commerce",
  "Fan Experience",
  "Transport",
  "Regulation",
  "Infrastructure",
  "Music",
  "Hospitality",
  "Tickets",
  "Analysis",
  "News",
  "Stadiums"
];

loadDotenv();

async function main() {
  ensureRequiredFiles();
  const existing = collectExistingArticles();
  const candidates = await collectCandidates(existing);
  const selected = [];
  const skipped = [];

  for (const candidate of candidates) {
    if (selected.length >= config.maxArticles) break;
    if (existing.sourceUrls.has(candidate.link)) {
      skipped.push({ url: candidate.link, reason: "source_exists" });
      continue;
    }

    const source = await fetchArticleSource(candidate).catch((error) => {
      skipped.push({ url: candidate.link, reason: `fetch_failed:${error.message}` });
      return null;
    });
    if (!source || source.text.length < 900) {
      skipped.push({ url: candidate.link, reason: "source_too_short" });
      continue;
    }

    const article = await rewriteArticle(candidate, source, existing).catch((error) => {
      skipped.push({ url: candidate.link, reason: `rewrite_failed:${error.message}` });
      return null;
    });
    if (!article || existing.slugs.has(article.slug)) {
      skipped.push({ url: candidate.link, reason: "duplicate_slug" });
      continue;
    }

    article.sourceUrl = candidate.link;
    article.sourceLabel = source.siteName || candidate.sourceLabel || hostLabel(candidate.link);
    article.publishedAt = normalizeDate(candidate.publishedAt) || todayIsoDate();
    article.updatedAt = todayIsoDate();
    article.image = `/assets/news/${article.slug}.png`;
    article.category = allowedCategories.includes(article.category) ? article.category : "News";

    if (!config.skipImages && !config.dryRun) {
      await generateArticleImage(article);
    }

    selected.push(article);
    existing.slugs.add(article.slug);
    existing.sourceUrls.add(article.sourceUrl);
  }

  if (!selected.length) {
    writeReport({ inserted: [], skipped, message: "No new usable news candidates found." });
    console.log("No new usable news candidates found.");
    return;
  }

  if (!config.dryRun) {
    insertNewsSeoArticles(selected);
    insertContentImageMappings(selected);
    if (!config.skipSupabase) {
      await upsertSupabaseArticles(selected);
    }
  }

  writeReport({ inserted: selected.map((article) => article.slug), skipped });
  console.log(JSON.stringify({ inserted: selected.map((article) => article.slug), skipped: skipped.slice(0, 8) }, null, 2));
}

function loadDotenv() {
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
    const [key, ...parts] = line.split("=");
    process.env[key.trim()] ??= parts.join("=").trim().replace(/^['"]|['"]$/g, "");
  }
}

function ensureRequiredFiles() {
  for (const file of [newsDataPath, contentDataPath]) {
    if (!existsSync(file)) throw new Error(`Missing required file: ${file}`);
  }
  mkdirSync(imageDir, { recursive: true });
  mkdirSync(path.dirname(reportPath), { recursive: true });
}

function collectExistingArticles() {
  const newsData = readFileSync(newsDataPath, "utf8");
  const slugs = new Set([...newsData.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]));
  const sourceUrls = new Set([...newsData.matchAll(/sourceUrl:\s*"([^"]+)"/g)].map((match) => normalizeUrl(match[1])));
  return { slugs, sourceUrls };
}

async function collectCandidates(existing) {
  const seen = new Set();
  const candidates = [];

  for (const query of feeds) {
    const url = `https://www.bing.com/news/search?q=${encodeURIComponent(query)}&format=RSS`;
    const xml = await fetchText(url, { timeoutMs: 20000 });
    for (const item of parseRssItems(xml)) {
      const link = normalizeUrl(item.link);
      if (!link || seen.has(link) || existing.sourceUrls.has(link)) continue;
      if (!isRelevantUrl(link)) continue;
      seen.add(link);
      candidates.push({
        ...item,
        link,
        sourceLabel: item.sourceLabel || hostLabel(link),
        score: scoreCandidate(item, link)
      });
    }
  }

  return candidates
    .sort((a, b) => b.score - a.score || Date.parse(b.publishedAt || 0) - Date.parse(a.publishedAt || 0))
    .slice(0, config.maxCandidates);
}

function parseRssItems(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => {
    const raw = match[1];
    return {
      title: decodeXml(tag(raw, "title")),
      link: decodeXml(tag(raw, "link")),
      description: stripHtml(decodeXml(tag(raw, "description"))),
      publishedAt: decodeXml(tag(raw, "pubDate")),
      sourceLabel: stripHtml(decodeXml(tag(raw, "source")))
    };
  }).filter((item) => item.title && item.link);
}

function tag(raw, name) {
  const match = raw.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"));
  return match?.[1]?.trim() ?? "";
}

async function fetchArticleSource(candidate) {
  const html = await fetchText(candidate.link, {
    timeoutMs: 25000,
    headers: { "User-Agent": "CupMateBot/1.0 (+https://cupmate.us)" }
  });
  const title = stripHtml(matchMeta(html, "og:title") || matchTitle(html) || candidate.title);
  const description = stripHtml(matchMeta(html, "og:description") || candidate.description || "");
  const siteName = stripHtml(matchMeta(html, "og:site_name") || candidate.sourceLabel || hostLabel(candidate.link));
  const text = extractReadableText(html);
  return { title, description, siteName, text };
}

async function rewriteArticle(candidate, source, existing) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is required");

  const schema = {
    type: "object",
    additionalProperties: false,
    required: ["slug", "title", "description", "category", "summary", "impact", "sections", "ru"],
    properties: {
      slug: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
      title: { type: "string" },
      description: { type: "string" },
      category: { type: "string", enum: allowedCategories },
      summary: { type: "string" },
      impact: { type: "array", minItems: 3, maxItems: 3, items: { type: "string" } },
      sections: {
        type: "array",
        minItems: 4,
        maxItems: 4,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["title", "body", "bullets"],
          properties: {
            title: { type: "string" },
            body: { type: "string" },
            bullets: { type: "array", minItems: 0, maxItems: 3, items: { type: "string" } }
          }
        }
      },
      ru: {
        type: "object",
        additionalProperties: false,
        required: ["slug", "title", "excerpt", "body"],
        properties: {
          slug: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
          title: { type: "string" },
          excerpt: { type: "string" },
          body: { type: "string" }
        }
      }
    }
  };

  const response = await openaiFetch("/v1/responses", {
    model: config.textModel,
    instructions:
      "You are CupMate's World Cup 2026 news editor. Rewrite source material into original fan-planning journalism. Do not copy sentences from the source. Keep claims grounded in the supplied source text. Avoid unsupported rumors. Write complete portal-ready news, not a short summary.",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: [
              `Existing slugs: ${[...existing.slugs].slice(0, 80).join(", ")}`,
              `RSS title: ${candidate.title}`,
              `RSS description: ${candidate.description}`,
              `Source URL: ${candidate.link}`,
              `Source label: ${source.siteName}`,
              `Source title: ${source.title}`,
              `Source description: ${source.description}`,
              "Source text:",
              source.text.slice(0, 12000),
              "",
              "Return original CupMate article data. English sections should be full paragraphs with practical fan-planning context. Russian body should be 3-4 paragraphs."
            ].join("\n")
          }
        ]
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "cupmate_news_article",
        strict: true,
        schema
      }
    }
  });

  const parsed = JSON.parse(extractOutputText(response));
  parsed.slug = slugify(parsed.slug || parsed.title);
  parsed.ru.slug = slugify(parsed.ru.slug || parsed.ru.title);
  parsed.description = oneLine(parsed.description).slice(0, 210);
  parsed.summary = parsed.summary.trim();
  parsed.sections = parsed.sections.map((section) => ({
    title: oneLine(section.title),
    body: section.body.trim(),
    bullets: section.bullets.filter(Boolean)
  }));
  return parsed;
}

async function generateArticleImage(article) {
  const prompt = [
    "Use case: photorealistic-natural",
    "Asset type: 16:9 website news cover for CupMate World Cup 2026 article",
    `Primary request: Create a premium editorial photo-style cover image for this article: ${article.title}.`,
    `Article context: ${article.description}`,
    "Scene/backdrop: Realistic World Cup 2026 fan, stadium, transport, city, culture or business context that matches the article topic.",
    "Composition: Horizontal news cover, polished sports-media style, strong foreground subject, room in top-left for a site logo overlay.",
    "Constraints: No text, no logos, no readable signage, no celebrity likenesses, no copyrighted marks, no watermark."
  ].join("\n");

  const imagePath = path.join(imageDir, `${article.slug}.png`);
  const payload = {
    model: config.imageModel,
    prompt,
    size: process.env.OPENAI_IMAGE_SIZE ?? "1536x1024",
    n: 1
  };

  let response;
  try {
    response = await openaiFetch("/v1/images/generations", payload);
  } catch (error) {
    if (!String(error.message).includes("size")) throw error;
    response = await openaiFetch("/v1/images/generations", { ...payload, size: "1024x1024" });
  }

  const first = response.data?.[0];
  if (first?.b64_json) {
    writeFileSync(imagePath, Buffer.from(first.b64_json, "base64"));
  } else if (first?.url) {
    const image = await fetchArrayBuffer(first.url);
    writeFileSync(imagePath, Buffer.from(image));
  } else {
    throw new Error("OpenAI image response did not include b64_json or url");
  }
}

function insertNewsSeoArticles(articles) {
  const source = readFileSync(newsDataPath, "utf8");
  const marker = "export const newsSeoArticles: NewsSeoArticle[] = [";
  const index = source.indexOf(marker);
  if (index === -1) throw new Error("Could not find newsSeoArticles array");
  const insertAt = index + marker.length;
  const block = "\n" + articles.map(formatNewsSeoArticle).join("\n") + "\n";
  writeFileSync(newsDataPath, source.slice(0, insertAt) + block + source.slice(insertAt));
}

function insertContentImageMappings(articles) {
  let source = readFileSync(contentDataPath, "utf8");
  const marker = "const newsImagesBySlug: Record<string, string> = {";
  const index = source.indexOf(marker);
  if (index === -1) throw new Error("Could not find newsImagesBySlug map");
  const insertAt = index + marker.length;
  const block = "\n" + articles
    .map((article) => `  ${JSON.stringify(article.slug)}: ${JSON.stringify(article.image)},`)
    .join("\n");
  source = source.slice(0, insertAt) + block + source.slice(insertAt);
  writeFileSync(contentDataPath, source);
}

async function upsertSupabaseArticles(articles) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!base || !key) throw new Error("Supabase env vars are required");

  for (const article of articles) {
    const articleId = articleUuid(article.sourceUrl);
    await supabaseFetch(base, key, "articles", {
      id: articleId,
      type: "news",
      status: "published",
      category: article.category,
      image_url: null,
      source_url: article.sourceUrl,
      published_at: `${article.publishedAt}T12:00:00+00:00`
    });
    await supabaseFetch(base, key, "article_translations", {
      article_id: articleId,
      language_code: "en",
      slug: article.slug,
      title: article.title.replace(/: what fans should plan around$/i, ""),
      excerpt: article.description,
      body: [article.summary, ...article.sections.map((section) => section.body)].join("\n\n"),
      seo_title: article.title,
      seo_description: article.description
    });
    await supabaseFetch(base, key, "article_translations", {
      article_id: articleId,
      language_code: "ru",
      slug: article.ru.slug,
      title: article.ru.title,
      excerpt: article.ru.excerpt,
      body: article.ru.body,
      seo_title: article.ru.title,
      seo_description: article.ru.excerpt
    });
  }
}

async function supabaseFetch(base, key, table, payload) {
  const onConflict = table === "article_translations" ? "?on_conflict=article_id,language_code" : "?on_conflict=id";
  const response = await fetch(`${base}/rest/v1/${table}${onConflict}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Supabase ${table} upsert failed: ${response.status} ${await response.text()}`);
  }
}

function formatNewsSeoArticle(article) {
  const lines = [
    "  {",
    `    slug: ${jsString(article.slug)},`,
    `    title: ${jsString(article.title)},`,
    `    description: ${jsString(article.description)},`,
    `    category: ${jsString(article.category)},`,
    `    publishedAt: ${jsString(article.publishedAt)},`,
    `    updatedAt: ${jsString(article.updatedAt)},`,
    `    image: ${jsString(article.image)},`,
    `    sourceUrl: ${jsString(article.sourceUrl)},`,
    `    sourceLabel: ${jsString(article.sourceLabel)},`,
    "    summary:",
    `      ${jsString(article.summary)},`,
    `    impact: ${JSON.stringify(article.impact)},`,
    "    sections: [",
    ...article.sections.map((section) => {
      const bulletLine = section.bullets.length ? `,\n        bullets: ${JSON.stringify(section.bullets)}` : "";
      return [
        "      {",
        `        title: ${jsString(section.title)},`,
        `        body: ${jsString(section.body)}${bulletLine}`,
        "      }"
      ].join("\n");
    }).join(",\n").split("\n"),
    "    ]",
    "  },"
  ];
  return lines.join("\n");
}

async function openaiFetch(endpoint, payload) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is required");
  const response = await fetch(`https://api.openai.com${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`OpenAI ${endpoint} failed: ${response.status} ${text.slice(0, 1000)}`);
  return JSON.parse(text);
}

function extractOutputText(response) {
  if (response.output_text) return response.output_text;
  for (const item of response.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === "output_text" && content.text) return content.text;
    }
  }
  throw new Error("OpenAI response did not contain output_text");
}

async function fetchText(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? 20000);
  try {
    const response = await fetch(url, { headers: options.headers, signal: controller.signal, redirect: "follow" });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchArrayBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Image download failed: ${response.status}`);
  return await response.arrayBuffer();
}

function extractReadableText(html) {
  return stripHtml(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
      .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
      .replace(/<\/(p|div|section|article|h1|h2|h3|li)>/gi, "\n")
  )
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 35)
    .join("\n")
    .slice(0, 18000);
}

function stripHtml(value) {
  return decodeXml(String(value ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function decodeXml(value) {
  return String(value ?? "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function matchMeta(html, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${escaped}["']`, "i"),
    new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']+)["']`, "i")
  ];
  return patterns.map((pattern) => html.match(pattern)?.[1]).find(Boolean) ?? "";
}

function matchTitle(html) {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
}

function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    for (const key of [...parsed.searchParams.keys()]) {
      if (/^(utm_|ocid|fbclid|gclid|cmpid|ref)/i.test(key)) parsed.searchParams.delete(key);
    }
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return "";
  }
}

function normalizeDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function hostLabel(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "").split(".").slice(0, -1).join(" ");
  } catch {
    return "Source";
  }
}

function isRelevantUrl(url) {
  const lower = url.toLowerCase();
  return lower.includes("world-cup") || lower.includes("worldcup") || lower.includes("fifa");
}

function scoreCandidate(item, url) {
  const text = `${item.title} ${item.description} ${url}`.toLowerCase();
  let score = 0;
  if (text.includes("world cup 2026") || text.includes("worldcup 2026")) score += 8;
  if (text.includes("fifa")) score += 4;
  if (/(ticket|transport|stadium|host city|fan|squad|team|music|official|travel)/.test(text)) score += 3;
  if (/fifa\.com|inside\.fifa\.com|apnews\.com|axios\.com|reuters\.com/.test(url)) score += 4;
  const ageHours = (Date.now() - Date.parse(item.publishedAt || 0)) / 36e5;
  if (Number.isFinite(ageHours) && ageHours < 72) score += 3;
  return score;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 78);
}

function oneLine(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function jsString(value) {
  return JSON.stringify(String(value ?? ""));
}

function articleUuid(sourceUrl) {
  const namespace = Buffer.from("6ba7b8119dad11d180b400c04fd430c8", "hex");
  const hash = crypto.createHash("sha1").update(Buffer.concat([namespace, Buffer.from(sourceUrl)])).digest();
  hash[6] = (hash[6] & 0x0f) | 0x50;
  hash[8] = (hash[8] & 0x3f) | 0x80;
  const hex = hash.subarray(0, 16).toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function writeReport(report) {
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
}

main().catch((error) => {
  writeReport({ error: error.message });
  console.error(error);
  process.exit(1);
});
