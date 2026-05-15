import Link from "next/link";
import { getRelatedPages } from "@/lib/related-pages";

type SeoRelatedLinksProps = {
  currentPath: string;
  category?: string;
  title?: string;
};

export function SeoRelatedLinks({ currentPath, category, title = "Related World Cup 2026 planning" }: SeoRelatedLinksProps) {
  const links = getRelatedPages({ currentPath, category });

  if (!links.length) return null;

  return (
    <section className="seo-grid seo-grid-three" aria-label={title}>
      {links.map((link) => (
        <article className="seo-card" key={link.href}>
          <h2><Link href={link.href}>{link.label}</Link></h2>
          <p>{link.description}</p>
        </article>
      ))}
    </section>
  );
}
