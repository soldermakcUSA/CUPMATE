import { matchSitemapEntries, sitemapXmlResponse } from "@/lib/seo";

export function GET() {
  return sitemapXmlResponse(matchSitemapEntries());
}
