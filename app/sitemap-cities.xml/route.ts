import { citySitemapEntries, sitemapXmlResponse } from "@/lib/seo";

export function GET() {
  return sitemapXmlResponse(citySitemapEntries());
}
