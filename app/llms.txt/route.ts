import { contentClusters, getSiteUrl, primarySeoPages, siteName, splitSitemaps } from "@/lib/seo";

export const dynamic = "force-static";

function absoluteUrl(path: string) {
  return `${getSiteUrl()}${path}`;
}

function pageLines() {
  return primarySeoPages
    .map((page) => `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`)
    .join("\n");
}

function sitemapLines() {
  return ["/sitemap.xml", ...splitSitemaps.map((sitemap) => sitemap.path)]
    .map((path) => `- ${absoluteUrl(path)}`)
    .join("\n");
}

function guideLines() {
  return contentClusters.map((cluster) => `- ${cluster}`).join("\n");
}

export function GET() {
  const siteUrl = getSiteUrl();
  const body = `# ${siteName}

> CupMate is an independent World Cup 2026 fan-planning project for match schedules, stadium guides, host-city travel, tickets, fan zones, places to watch and multilingual match-day help.

Canonical site: ${siteUrl}
Primary language: English
Audience: football fans planning World Cup 2026 trips across the United States, Canada and Mexico.

## Key URLs
${pageLines()}

## Key Guide Topics
${guideLines()}

## Sitemaps
${sitemapLines()}

## Source Policy
Official tournament facts such as fixtures, ticket phases, venue assignments and major announcements should be verified with FIFA and relevant local authorities. CupMate adds planning context, route notes, city guidance and source references where practical.

## Independence
CupMate is independent and is not affiliated with FIFA, the FIFA World Cup, host cities, venues, teams, broadcasters or ticket marketplaces unless a specific partnership is clearly disclosed. No official ticket guarantee is implied.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
