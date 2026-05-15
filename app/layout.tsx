import type { Metadata, Viewport } from "next";
import { defaultSiteUrl, siteName } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl),
  applicationName: siteName,
  title: {
    default: "CupMate | World Cup 2026 Match Planner for Fans",
    template: "%s | CupMate"
  },
  description: "Plan the 2026 FIFA World Cup with match schedules, stadium guides, tickets, fan zones, travel routes, places to watch and multilingual match-day help.",
  keywords: [
    "World Cup 2026",
    "FIFA World Cup 2026 schedule",
    "World Cup 2026 tickets",
    "World Cup 2026 stadiums",
    "World Cup 2026 host cities",
    "World Cup 2026 fan zones",
    "World Cup match planner"
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ru: "/?lang=ru",
      es: "/?lang=es",
      fr: "/?lang=fr",
      de: "/?lang=de",
      pt: "/?lang=pt",
      it: "/?lang=it",
      ar: "/?lang=ar",
      zh: "/?lang=zh",
      ja: "/?lang=ja",
      ko: "/?lang=ko"
    }
  },
  openGraph: {
    type: "website",
    siteName,
    title: "CupMate | World Cup 2026 Match Planner for Fans",
    description: "Matches, stadiums, tickets, fan zones, travel routes and match-day planning for the 2026 FIFA World Cup.",
    images: [{ url: "/assets/hero-world-cup-banner.png", width: 1200, height: 630, alt: "CupMate World Cup 2026 planner" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "CupMate | World Cup 2026 Match Planner for Fans",
    description: "Plan World Cup 2026 matches, stadiums, tickets, travel and fan zones.",
    images: ["/assets/hero-world-cup-banner.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  appleWebApp: {
    capable: true,
    title: "CupMate",
    statusBarStyle: "black-translucent"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#06142f"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
