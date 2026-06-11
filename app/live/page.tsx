import type { Metadata } from "next";
import Link from "next/link";
import { LiveStreamCard } from "@/components/LiveStreamCard";
import { SeoBreadcrumbs } from "@/components/SeoBreadcrumbs";
import { SeoShell } from "@/components/SeoShell";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Live Stream | CupMate",
  description: "Watch the authorized CupMate live HLS stream when live coverage is available.",
  alternates: { canonical: "/live" },
  robots: {
    index: true,
    follow: true
  }
};

export default function LivePage() {
  return (
    <SeoShell activeSection="watch">
      <main className="seo-page live-page">
        <SeoBreadcrumbs items={[{ name: "CupMate", href: "/" }, { name: "Live", href: "/live" }]} />
        <section className="seo-hero live-hero">
          <p>{translations.en.liveNow}</p>
          <h1>{translations.en.liveStream}</h1>
          <span>{translations.en.liveStreamSubtitle}</span>
          <div className="seo-actions">
            <Link className="primary-button" href="/?section=watch">Open watch guide</Link>
            <Link className="link-button" href="/where-to-watch">Where to watch</Link>
          </div>
        </section>

        <LiveStreamCard t={translations.en} showLiveLink={false} />
      </main>
    </SeoShell>
  );
}
