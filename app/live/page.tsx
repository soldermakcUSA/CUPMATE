import type { Metadata } from "next";
import Link from "next/link";
import { LiveStreamCard } from "@/components/LiveStreamCard";
import { SeoBreadcrumbs } from "@/components/SeoBreadcrumbs";
import { SeoShell } from "@/components/SeoShell";
import { YouTubeHighlightsRail } from "@/components/YouTubeHighlightsRail";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Live Stream | CupMate",
  description: "Watch embedded World Cup 2026 video and authorized CupMate live coverage when available.",
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
          <p>Video hub</p>
          <h1>{translations.en.liveStream}</h1>
          <span>Embedded World Cup 2026 video and authorized live coverage when available.</span>
          <div className="seo-actions">
            <Link className="primary-button" href="/?section=watch">Open watch guide</Link>
            <Link className="link-button" href="/where-to-watch">Where to watch</Link>
          </div>
        </section>

        <LiveStreamCard t={translations.en} showLiveLink={false} />
        <YouTubeHighlightsRail />
      </main>
    </SeoShell>
  );
}
