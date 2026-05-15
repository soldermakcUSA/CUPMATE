import { sitemapXmlResponse, stadiumSitemapEntries } from "@/lib/seo";

export function GET() {
  return sitemapXmlResponse(stadiumSitemapEntries());
}
