import { guideSitemapEntries, sitemapXmlResponse } from "@/lib/seo";

export function GET() {
  return sitemapXmlResponse(guideSitemapEntries());
}
