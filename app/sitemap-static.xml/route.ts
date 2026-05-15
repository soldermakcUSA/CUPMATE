import { sitemapXmlResponse, staticSitemapEntries } from "@/lib/seo";

export function GET() {
  return sitemapXmlResponse(staticSitemapEntries());
}
