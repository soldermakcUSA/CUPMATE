import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/guides", label: "Guides" },
  { href: "/sitemap.xml", label: "Sitemap" }
];

export function SeoFooter() {
  return (
    <footer className="seo-footer" aria-label="CupMate trust and source information">
      <nav className="seo-footer-links" aria-label="SEO footer links">
        {footerLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="seo-footer-copy">
        <p>CupMate is an independent fan planning project and is not affiliated with FIFA, host cities, teams, venues, broadcasters or ticket marketplaces.</p>
        <p>Source note: guide pages summarize official tournament, venue and local information where available; details should be rechecked with primary sources before travel or ticket purchases.</p>
      </div>
    </footer>
  );
}
