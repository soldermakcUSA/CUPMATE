import Link from "next/link";
import type { CSSProperties } from "react";
import { getSiteUrl } from "@/lib/seo";

export type SeoBreadcrumbItem = {
  name: string;
  href: string;
};

type SeoBreadcrumbsProps = {
  items: SeoBreadcrumbItem[];
};

const navStyle: CSSProperties = {
  maxWidth: "1060px",
  margin: "0 auto 16px",
  color: "#52617c",
  fontSize: "13px",
  fontWeight: 700
};

const listStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  alignItems: "center",
  margin: 0,
  padding: 0,
  listStyle: "none"
};

const linkStyle: CSSProperties = {
  color: "#1d4ed8",
  textDecoration: "none"
};

const currentStyle: CSSProperties = {
  color: "#10203f"
};

function absoluteUrl(siteUrl: string, href: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  return `${siteUrl}${href === "/" ? "" : href}`;
}

export function SeoBreadcrumbs({ items }: SeoBreadcrumbsProps) {
  const siteUrl = getSiteUrl();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(siteUrl, item.href)
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav aria-label="Breadcrumb" style={navStyle}>
        <ol style={listStyle}>
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1;

            return (
              <li key={`${item.href}-${item.name}`} aria-current={isCurrent ? "page" : undefined}>
                {isCurrent ? (
                  <span style={currentStyle}>{item.name}</span>
                ) : (
                  <>
                    <Link href={item.href} style={linkStyle}>{item.name}</Link>
                    <span aria-hidden="true" style={{ marginLeft: "8px" }}>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
