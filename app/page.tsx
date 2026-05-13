"use client";

import { useEffect, useMemo, useState } from "react";
import { AssistantMenuPanel } from "@/components/menu/AssistantPanel";
import { CommunityPanel } from "@/components/menu/CommunityPanel";
import { FanZonesPanel } from "@/components/menu/FanZonesPanel";
import { MatchesPanel } from "@/components/menu/MatchesPanel";
import { ArticleReader, NewsPanel } from "@/components/menu/NewsPanel";
import { StadiumsPanel } from "@/components/menu/StadiumsPanel";
import { TicketsPanel } from "@/components/menu/TicketsPanel";
import { TravelPanel } from "@/components/menu/TravelPanel";
import { WatchPanel } from "@/components/menu/WatchPanel";
import {
  Bell,
  Bot,
  CalendarDays,
  Car,
  ChevronDown,
  CircleParking,
  Footprints,
  Home,
  Languages,
  Map,
  MapPin,
  MessageCircle,
  Navigation,
  Plane,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Ticket,
  Trophy,
  Users,
  Utensils,
  WalletCards,
  Award,
  Shield
} from "lucide-react";
import { fans, itinerary, matches as mockMatches, news as mockNews, places as mockPlaces } from "@/lib/mock-data";
import { fetchNewsItems, fetchPlaces, NEWS_IMAGE_FALLBACK, NewsItemData, PlaceCardData } from "@/lib/content-data";
import { getLanguage, languages, Locale, translations } from "@/lib/i18n";
import { fetchWorldCupMatches, MatchCardData } from "@/lib/world-cup-data";

type Screen = "home" | "matches" | "map" | "route" | "stadium" | "watch" | "community" | "assistant";
type DesktopSection = "dashboard" | "matches" | "fanZones" | "stadiums" | "travel" | "watch" | "community" | "tickets" | "news" | "assistant";

const navItems = [
  ["dashboard", Home, "dashboard"],
  ["matches", CalendarDays, "matches"],
  ["fanZones", MapPin, "fanZones"],
  ["stadiums", Trophy, "stadiums"],
  ["travel", Navigation, "travel"],
  ["watch", Utensils, "watch"],
  ["community", Users, "community"],
  ["tickets", Ticket, "tickets"],
  ["news", WalletCards, "news"],
  ["assistant", Sparkles, "assistant"]
] as const;

const promptExamples = [
  "Where can I watch Argentina vs Brazil in Miami?",
  "How do I get to MetLife Stadium by public transport?",
  "What are the best fan zones in New York?"
];

const mobilePrompts = [
  "How do I get to MetLife Stadium?",
  "Where are the best fan zones?",
  "What's the weather in New Jersey?",
  "Find a place to watch the match"
];

const liveStandings = [
  {
    group: "Group A",
    teams: [
      { rank: 1, flag: "🇲🇽", name: "Mexico" },
      { rank: 2, flag: "🇿🇦", name: "South Africa" },
      { rank: 3, flag: "🇰🇷", name: "South Korea" },
      { rank: 4, flag: "🇨🇿", name: "Czechia" }
    ]
  },
  {
    group: "Group B",
    teams: [
      { rank: 1, flag: "🇨🇦", name: "Canada" },
      { rank: 2, flag: "🇧🇦", name: "Bosnia and Herzegovina" },
      { rank: 3, flag: "🇶🇦", name: "Qatar" },
      { rank: 4, flag: "🇨🇭", name: "Switzerland" }
    ]
  },
  {
    group: "Group C",
    teams: [
      { rank: 1, flag: "🇧🇷", name: "Brazil" },
      { rank: 2, flag: "🇲🇦", name: "Morocco" },
      { rank: 3, flag: "🇭🇹", name: "Haiti" },
      { rank: 4, flag: "🏴", name: "Scotland" }
    ]
  },
  {
    group: "Group D",
    teams: [
      { rank: 1, flag: "🇺🇸", name: "United States" },
      { rank: 2, flag: "🇵🇾", name: "Paraguay" },
      { rank: 3, flag: "🇦🇺", name: "Australia" },
      { rank: 4, flag: "🇹🇷", name: "Türkiye" }
    ]
  },
  {
    group: "Group E",
    teams: [
      { rank: 1, flag: "🇩🇪", name: "Germany" },
      { rank: 2, flag: "🇨🇼", name: "Curacao" },
      { rank: 3, flag: "🇨🇮", name: "Ivory Coast" },
      { rank: 4, flag: "🇪🇨", name: "Ecuador" }
    ]
  },
  {
    group: "Group F",
    teams: [
      { rank: 1, flag: "🇳🇱", name: "Netherlands" },
      { rank: 2, flag: "🇯🇵", name: "Japan" },
      { rank: 3, flag: "🇸🇪", name: "Sweden" },
      { rank: 4, flag: "🇹🇳", name: "Tunisia" }
    ]
  },
  {
    group: "Group G",
    teams: [
      { rank: 1, flag: "🇧🇪", name: "Belgium" },
      { rank: 2, flag: "🇪🇬", name: "Egypt" },
      { rank: 3, flag: "🇮🇷", name: "Iran" },
      { rank: 4, flag: "🇳🇿", name: "New Zealand" }
    ]
  },
  {
    group: "Group H",
    teams: [
      { rank: 1, flag: "🇪🇸", name: "Spain" },
      { rank: 2, flag: "🇨🇻", name: "Cape Verde" },
      { rank: 3, flag: "🇸🇦", name: "Saudi Arabia" },
      { rank: 4, flag: "🇺🇾", name: "Uruguay" }
    ]
  },
  {
    group: "Group I",
    teams: [
      { rank: 1, flag: "🇫🇷", name: "France" },
      { rank: 2, flag: "🇸🇳", name: "Senegal" },
      { rank: 3, flag: "🇮🇶", name: "Iraq" },
      { rank: 4, flag: "🇳🇴", name: "Norway" }
    ]
  },
  {
    group: "Group J",
    teams: [
      { rank: 1, flag: "🇦🇷", name: "Argentina" },
      { rank: 2, flag: "🇩🇿", name: "Algeria" },
      { rank: 3, flag: "🇦🇹", name: "Austria" },
      { rank: 4, flag: "🇯🇴", name: "Jordan" }
    ]
  },
  {
    group: "Group K",
    teams: [
      { rank: 1, flag: "🇵🇹", name: "Portugal" },
      { rank: 2, flag: "🇨🇩", name: "Congo DR" },
      { rank: 3, flag: "🇺🇿", name: "Uzbekistan" },
      { rank: 4, flag: "🇨🇴", name: "Colombia" }
    ]
  },
  {
    group: "Group L",
    teams: [
      { rank: 1, flag: "🏴", name: "England" },
      { rank: 2, flag: "🇭🇷", name: "Croatia" },
      { rank: 3, flag: "🇬🇭", name: "Ghana" },
      { rank: 4, flag: "🇵🇦", name: "Panama" }
    ]
  }
];

function handleNewsImageError(event: { currentTarget: HTMLImageElement }) {
  if (event.currentTarget.getAttribute("src") !== NEWS_IMAGE_FALLBACK) {
    event.currentTarget.src = NEWS_IMAGE_FALLBACK;
  }
}

type MapPoint = {
  id: string;
  label: string;
  detail: string;
  meta: string;
  latitude: number;
  longitude: number;
  kind: "stadium" | "fan_zone" | "watch" | "parking";
  accent?: "red" | "green";
};

const hostCityPoints: MapPoint[] = [
  { id: "vancouver", label: "Vancouver", detail: "BC Place", meta: "7 matches", latitude: 49.2827, longitude: -123.1207, kind: "stadium", accent: "green" },
  { id: "toronto", label: "Toronto", detail: "BMO Field", meta: "6 matches", latitude: 43.6532, longitude: -79.3832, kind: "stadium" },
  { id: "mexico-city", label: "Mexico City", detail: "Estadio Azteca", meta: "Opening match", latitude: 19.4326, longitude: -99.1332, kind: "stadium", accent: "red" },
  { id: "monterrey", label: "Monterrey", detail: "Estadio BBVA", meta: "4 matches", latitude: 25.6768, longitude: -100.2565, kind: "stadium" },
  { id: "guadalajara", label: "Guadalajara", detail: "Estadio Akron", meta: "4 matches", latitude: 20.7214, longitude: -103.3918, kind: "stadium" },
  { id: "ny-nj", label: "New York New Jersey", detail: "MetLife Stadium", meta: "Final host", latitude: 40.8339, longitude: -74.0971, kind: "stadium", accent: "red" },
  { id: "dallas", label: "Dallas", detail: "AT&T Stadium", meta: "9 matches", latitude: 32.7357, longitude: -97.1081, kind: "stadium" },
  { id: "kansas-city", label: "Kansas City", detail: "Arrowhead Stadium", meta: "6 matches", latitude: 39.0997, longitude: -94.5786, kind: "stadium" },
  { id: "houston", label: "Houston", detail: "NRG Stadium", meta: "7 matches", latitude: 29.7604, longitude: -95.3698, kind: "stadium" },
  { id: "atlanta", label: "Atlanta", detail: "Mercedes-Benz Stadium", meta: "8 matches", latitude: 33.749, longitude: -84.388, kind: "stadium" },
  { id: "los-angeles", label: "Los Angeles", detail: "SoFi Stadium", meta: "8 matches", latitude: 33.9617, longitude: -118.3531, kind: "stadium" },
  { id: "philadelphia", label: "Philadelphia", detail: "Lincoln Financial Field", meta: "6 matches", latitude: 39.9526, longitude: -75.1652, kind: "stadium" },
  { id: "seattle", label: "Seattle", detail: "Lumen Field", meta: "6 matches", latitude: 47.6062, longitude: -122.3321, kind: "stadium" },
  { id: "san-francisco", label: "San Francisco Bay Area", detail: "Levi's Stadium", meta: "6 matches", latitude: 37.3541, longitude: -121.9552, kind: "stadium" },
  { id: "boston", label: "Boston", detail: "Gillette Stadium", meta: "7 matches", latitude: 42.0654, longitude: -71.2478, kind: "stadium" },
  { id: "miami", label: "Miami", detail: "Hard Rock Stadium", meta: "7 matches", latitude: 25.942, longitude: -80.2456, kind: "stadium", accent: "green" }
];

function projectMapPoint(latitude: number, longitude: number) {
  const minLon = -125.5;
  const maxLon = -70;
  const minLat = 18;
  const maxLat = 50.8;
  const left = 7 + ((longitude - minLon) / (maxLon - minLon)) * 86;
  const top = 9 + ((maxLat - latitude) / (maxLat - minLat)) * 79;

  return {
    left: `${Math.max(4, Math.min(94, left))}%`,
    top: `${Math.max(5, Math.min(91, top))}%`
  };
}

function useLocale() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("cupmate-locale") as Locale | null;
    const browser = navigator.language.split("-")[0] as Locale;
    const nextLocale = getLanguage(saved ?? browser).code;
    setLocale(nextLocale);
  }, []);

  useEffect(() => {
    const language = getLanguage(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = language.dir;
    window.localStorage.setItem("cupmate-locale", locale);
  }, [locale]);

  return { locale, setLocale, t: translations[locale], language: getLanguage(locale) };
}

export default function CupMatePage() {
  const { locale, setLocale, t } = useLocale();
  const [desktopSection, setDesktopSection] = useState<DesktopSection>("dashboard");
  const [mobileScreen, setMobileScreen] = useState<Screen>("home");
  const [activeChip, setActiveChip] = useState(t.stadiums);
  const [assistantText, setAssistantText] = useState("");
  const [assistantReply, setAssistantReply] = useState("MetLife Stadium is easiest by train via Secaucus Junction. Plan 45 minutes and keep your ticket QR ready.");
  const [worldCupMatches, setWorldCupMatches] = useState<MatchCardData[]>(mockMatches);
  const [contentNews, setContentNews] = useState<NewsItemData[]>(mockNews);
  const [contentPlaces, setContentPlaces] = useState<PlaceCardData[]>(
    mockPlaces.map((place) => ({ ...place, city: "Miami, USA", tags: ["Live Screen", "Food"], latitude: 25.7752, longitude: -80.186 }))
  );

  useEffect(() => {
    setActiveChip(translations[locale].stadiums);
  }, [locale]);

  useEffect(() => {
    let isMounted = true;

    fetchWorldCupMatches(12, locale)
      .then((items) => {
        if (isMounted && items.length > 0) {
          setWorldCupMatches(items);
        }
      })
      .catch((error) => {
        console.warn("Unable to load World Cup matches from Supabase.", error);
      });

    fetchNewsItems(14, locale)
      .then((items) => {
        if (isMounted && items.length > 0) {
          setContentNews(items);
        }
      })
      .catch((error) => {
        console.warn("Unable to load World Cup news from Supabase.", error);
      });

    fetchPlaces(10, locale)
      .then((items) => {
        if (isMounted && items.length > 0) {
          setContentPlaces(items);
        }
      })
      .catch((error) => {
        console.warn("Unable to load World Cup places from Supabase.", error);
      });

    return () => {
      isMounted = false;
    };
  }, [locale]);

  const mobileTitle = useMemo(() => {
    const titles: Record<Screen, string> = {
      home: t.home,
      matches: t.matches,
      map: t.fanZones,
      route: t.routeToStadium,
      stadium: t.stadiumGuide,
      watch: t.watch,
      community: t.community,
      assistant: t.assistant
    };
    return titles[mobileScreen];
  }, [mobileScreen, t]);

  function submitAssistant(value = assistantText) {
    if (!value.trim()) return;
    setAssistantReply(`CupMate tip: ${value.includes("Miami") ? "try Blackbird Ordinary or Mango's Tropical Cafe. Both are close to fan activity and easy to reach by rideshare." : "use public transit first, avoid peak exits, and save the route to your itinerary."}`);
    setAssistantText("");
  }

  return (
    <>
      <div className="desktop-app app-shell">
        <Sidebar t={t} activeSection={desktopSection} setActiveSection={setDesktopSection} />
        <main className="main">
          <Topbar t={t} locale={locale} setLocale={setLocale} />
          <DesktopContent
            section={desktopSection}
            t={t}
            setSection={setDesktopSection}
            activeChip={activeChip}
            setActiveChip={setActiveChip}
            assistantText={assistantText}
            setAssistantText={setAssistantText}
            submitAssistant={submitAssistant}
            assistantReply={assistantReply}
            locale={locale}
            matches={worldCupMatches}
            news={contentNews}
            places={contentPlaces}
          />
        </main>
      </div>

      <div className="mobile-showcase">
        <div className="mobile-phone">
          <div className="mobile-status">
            <span>9:41</span>
            <span>●●●  Wi-Fi  ▰</span>
          </div>
          <div className="mobile-screen">
            {mobileScreen !== "home" && (
              <div className="mobile-header">
                <button className="icon-button" onClick={() => setMobileScreen("home")} aria-label="Back">
                  ‹
                </button>
                <h2>{mobileTitle}</h2>
                <LanguagePicker locale={locale} setLocale={setLocale} compact />
              </div>
            )}
            {mobileScreen === "home" && <MobileHome t={t} setMobileScreen={setMobileScreen} matches={worldCupMatches} />}
            {mobileScreen === "matches" && <MobileMatches t={t} matches={worldCupMatches} />}
            {mobileScreen === "map" && <MobileMap t={t} setMobileScreen={setMobileScreen} places={contentPlaces} />}
            {mobileScreen === "route" && <MobileRoute t={t} />}
            {mobileScreen === "stadium" && <MobileStadium t={t} />}
            {mobileScreen === "watch" && <MobileWatch t={t} places={contentPlaces} />}
            {mobileScreen === "community" && <MobileCommunity t={t} />}
            {mobileScreen === "assistant" && (
              <MobileAssistant
                t={t}
                assistantText={assistantText}
                setAssistantText={setAssistantText}
                submitAssistant={submitAssistant}
              />
            )}
          </div>
        </div>
        <MobileNav t={t} active={mobileScreen} setActive={setMobileScreen} />
      </div>
    </>
  );
}

function Sidebar({
  t,
  activeSection,
  setActiveSection
}: {
  t: typeof translations.en;
  activeSection: DesktopSection;
  setActiveSection: (section: DesktopSection) => void;
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <img className="brand-cup" src="/assets/cupmate-trophy-white.png" alt="" />
        <div>
          <h1 className="brand-title">CUPMATE</h1>
          <p className="brand-subtitle">{t.brandSubtitle}</p>
        </div>
      </div>
      <nav className="nav-list" aria-label="Main navigation">
        {navItems.map(([key, Icon, section]) => (
          <button className={`nav-item ${activeSection === section ? "active" : ""}`} key={key} onClick={() => setActiveSection(section)} aria-current={activeSection === section ? "page" : undefined}>
            <Icon size={20} />
            <span>{t[key]}</span>
          </button>
        ))}
      </nav>

      <button className="sidebar-event-card" onClick={() => setActiveSection("matches")} aria-label="Open World Cup matches">
        <div className="sidebar-event-copy">
          <h3>World Cup 2026</h3>
          <strong>JUNE 11 - JULY 19, 2026</strong>
          <p>104 matches, 16 host cities, 1 champion.</p>
          <span>{t.exploreMatches}</span>
        </div>
        <img src="/assets/world-cup-gold.png" alt="" />
      </button>

      <div className="sidebar-stats-card" aria-label="World Cup summary">
        <div className="sidebar-stat-row">
          <CalendarDays size={24} />
          <strong>104 Matches</strong>
        </div>
        <div className="sidebar-stat-row">
          <Award size={24} />
          <strong>16 Host Cities</strong>
        </div>
        <div className="sidebar-stat-row">
          <Shield size={24} />
          <strong>3 Countries</strong>
        </div>
        <div className="sidebar-stat-row">
          <Trophy size={24} />
          <strong>1 One Champion</strong>
        </div>
      </div>

      <div className="sidebar-flags" aria-label="Host countries">
        <span>🇺🇸</span>
        <span>🇨🇦</span>
        <span>🇲🇽</span>
      </div>
    </aside>
  );
}

function DesktopContent({
  section,
  t,
  setSection,
  activeChip,
  setActiveChip,
  assistantText,
  setAssistantText,
  submitAssistant,
  assistantReply,
  locale,
  matches,
  news,
  places
}: {
  section: DesktopSection;
  t: typeof translations.en;
  setSection: (section: DesktopSection) => void;
  activeChip: string;
  setActiveChip: (chip: string) => void;
  assistantText: string;
  setAssistantText: (value: string) => void;
  submitAssistant: (value?: string) => void;
  assistantReply: string;
  locale: Locale;
  matches: MatchCardData[];
  news: NewsItemData[];
  places: PlaceCardData[];
}) {
  if (section === "dashboard") {
    return (
      <div className="content-grid">
        <section className="stack">
          <Hero t={t} setSection={setSection} />
          <NextMatches t={t} setSection={setSection} matches={matches} />
          <NewsSection t={t} news={news} />
          <FanZonesSection t={t} places={places} />
        </section>
        <aside className="right-rail">
          <MapPanel t={t} activeChip={activeChip} setActiveChip={setActiveChip} places={places} />
          <ItineraryPanel t={t} />
          <LiveStandingsPanel />
        </aside>
      </div>
    );
  }

  return (
    <div className="desktop-section-shell">
      <MenuSection
        section={section}
        t={t}
        activeChip={activeChip}
        setActiveChip={setActiveChip}
        assistantText={assistantText}
        setAssistantText={setAssistantText}
        submitAssistant={submitAssistant}
        assistantReply={assistantReply}
        locale={locale}
        matches={matches}
        news={news}
        places={places}
      />
    </div>
  );
}

function MenuSection({
  section,
  t,
  activeChip,
  setActiveChip,
  assistantText,
  setAssistantText,
  submitAssistant,
  assistantReply,
  locale,
  matches,
  news,
  places
}: {
  section: Exclude<DesktopSection, "dashboard">;
  t: typeof translations.en;
  activeChip: string;
  setActiveChip: (chip: string) => void;
  assistantText: string;
  setAssistantText: (value: string) => void;
  submitAssistant: (value?: string) => void;
  assistantReply: string;
  locale: Locale;
  matches: MatchCardData[];
  news: NewsItemData[];
  places: PlaceCardData[];
}) {
  switch (section) {
    case "matches":
      return <MatchesPanel t={t} matches={matches} />;
    case "fanZones":
      return <FanZonesPanel t={t} places={places} />;
    case "stadiums":
      return <StadiumsPanel t={t} />;
    case "travel":
      return <TravelPanel t={t} />;
    case "watch":
      return <WatchPanel t={t} places={places} />;
    case "community":
      return <CommunityPanel t={t} />;
    case "tickets":
      return <TicketsPanel t={t} />;
    case "news":
      return <NewsPanel locale={locale} t={t} news={news} />;
    case "assistant":
      return <AssistantMenuPanel t={t} />;
    default:
      return (
        <div className="content-grid">
          <section className="stack">
            <Hero t={t} setSection={() => undefined} />
            <NextMatches t={t} setSection={() => undefined} matches={matches} />
          </section>
          <aside className="right-rail">
            <MapPanel t={t} activeChip={activeChip} setActiveChip={setActiveChip} places={places} />
            <ItineraryPanel t={t} />
            <AssistantPanel
              t={t}
              assistantText={assistantText}
              setAssistantText={setAssistantText}
              submitAssistant={submitAssistant}
              assistantReply={assistantReply}
            />
          </aside>
        </div>
      );
  }
}

function Topbar({ t, locale, setLocale }: { t: typeof translations.en; locale: Locale; setLocale: (locale: Locale) => void }) {
  return (
    <header className="topbar">
      <label className="search">
        <Search size={18} />
        <input placeholder={t.search} aria-label={t.search} />
      </label>
      <div className="top-actions">
        <button className="icon-button" aria-label="Notifications"><Bell size={20} /></button>
        <LanguagePicker locale={locale} setLocale={setLocale} />
        <div className="avatar">A</div>
      </div>
    </header>
  );
}

function LanguagePicker({ locale, setLocale, compact = false }: { locale: Locale; setLocale: (locale: Locale) => void; compact?: boolean }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {!compact && <Languages size={18} className="muted" />}
      <select className="language-select" value={locale} onChange={(event) => setLocale(event.target.value as Locale)} aria-label="Language">
        {languages.map((language) => (
          <option key={language.code} value={language.code}>{compact ? language.short : `${language.short} · ${language.name}`}</option>
        ))}
      </select>
    </label>
  );
}

function Hero({ t, setSection }: { t: typeof translations.en; setSection: (section: DesktopSection) => void }) {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>{t.heroTitle}</h1>
        <p>{t.heroSub}</p>
        <button className="primary-button" onClick={() => setSection("matches")}>{t.exploreMatches}</button>
      </div>
    </div>
  );
}

function NextMatches({ t, setSection, matches }: { t: typeof translations.en; setSection: (section: DesktopSection) => void; matches: MatchCardData[] }) {
  return (
    <section className="section-card">
      <SectionHead title={t.nextMatches} action={t.viewFullSchedule} onAction={() => setSection("matches")} />
      <div className="match-row">
        {matches.map((match) => (
          <article className="match-card" key={`${match.home}-${match.away}`}>
            <p className="small muted" style={{ textAlign: "center" }}>{match.group}</p>
            <div className="match-flags">
              <span>{match.home}</span>
              <span className="small">{t.versus}</span>
              <span>{match.away}</span>
            </div>
            <p className="small muted" style={{ textAlign: "center" }}>{match.date} · {match.time}</p>
            <p className="small muted" style={{ textAlign: "center" }}>{match.venue}</p>
            <button className="link-button" style={{ width: "100%", marginTop: 12 }}>{t.seeDetails}</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function NewsSection({ t, news }: { t: typeof translations.en; news: NewsItemData[] }) {
  const [selectedArticle, setSelectedArticle] = useState<NewsItemData | null>(null);

  return (
    <section className="section-card">
      <SectionHead title={t.newsUpdates} action={t.viewAllNews} />
      <div className="news-grid">
        {news.slice(0, 3).map((item) => (
          <button className="news-card news-card-button" key={item.id ?? item.title} type="button" onClick={() => setSelectedArticle(item)}>
            <img src={item.image} alt="" decoding="async" loading="lazy" onError={handleNewsImageError} />
            <div>
              <strong>{item.title}</strong>
              <p className="small muted">{item.text}</p>
              <p className="small muted">{item.meta}</p>
            </div>
          </button>
        ))}
      </div>
      <ArticleReader article={selectedArticle} onClose={() => setSelectedArticle(null)} t={t} />
    </section>
  );
}

function FanZonesSection({ t, places }: { t: typeof translations.en; places: PlaceCardData[] }) {
  return (
    <section className="section-card">
      <SectionHead title={t.popularFanZones} action={t.viewAll} />
      <div className="fan-zone-grid">
        {places.slice(0, 4).map((zone) => <FanZoneCard zone={zone} key={zone.name} />)}
      </div>
    </section>
  );
}

function FanZoneCard({ zone }: { zone: PlaceCardData }) {
  return (
    <article className="fan-zone">
      <div className="fan-zone-image">
        <img src={zone.image} alt={zone.name} />
        <span className="distance">{zone.distance}</span>
      </div>
      <div className="fan-zone-body">
        <p className="small muted">{zone.city}</p>
        <strong>{zone.name}</strong>
        <div className="tags">{zone.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  );
}

function SectionHead({ title, action, onAction }: { title: string; action: string; onAction?: () => void }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      <button className="link-button" onClick={onAction}>{action}</button>
    </div>
  );
}

function MapPanel({
  t,
  activeChip,
  setActiveChip,
  places
}: {
  t: typeof translations.en;
  activeChip: string;
  setActiveChip: (chip: string) => void;
  places: PlaceCardData[];
}) {
  const chips = [t.stadiums, t.fanZones, t.watch, t.parking];
  const fanFestivalPoints = useMemo<MapPoint[]>(
    () =>
      places
        .filter((place) => place.latitude && place.longitude)
        .map((place) => ({
          id: place.name,
          label: place.name.replace(" FIFA Fan Festival", ""),
          detail: place.note,
          meta: place.city,
          latitude: place.latitude as number,
          longitude: place.longitude as number,
          kind: "fan_zone" as const,
          accent: place.tags.includes("Free Entry") ? "green" : undefined
        })),
    [places]
  );
  const parkingPoints = useMemo<MapPoint[]>(
    () =>
      hostCityPoints.slice(0, 8).map((point) => ({
        ...point,
        id: `${point.id}-parking`,
        detail: `${point.label} matchday parking and transit hub`,
        meta: "Parking guidance",
        kind: "parking" as const
      })),
    []
  );
  const mapPoints =
    activeChip === t.fanZones ? fanFestivalPoints
      : activeChip === t.watch ? fanFestivalPoints
      : activeChip === t.parking ? parkingPoints
      : hostCityPoints;
  const [selectedPointId, setSelectedPointId] = useState(hostCityPoints[0].id);
  const selectedPoint = mapPoints.find((point) => point.id === selectedPointId) ?? mapPoints[0] ?? hostCityPoints[0];

  useEffect(() => {
    setSelectedPointId((current) => (mapPoints.some((point) => point.id === current) ? current : mapPoints[0]?.id ?? hostCityPoints[0].id));
  }, [mapPoints]);

  return (
    <section className="map-card">
      <SectionHead title={t.interactiveMap} action={t.viewFullMap} />
      <div className="us-map interactive-map" aria-label="Interactive FIFA World Cup 2026 map">
        <div className="map-grid" aria-hidden="true" />
        <div className="map-landmass" aria-hidden="true" />
        {mapPoints.map((point) => {
          const position = projectMapPoint(point.latitude, point.longitude);
          const isActive = selectedPoint.id === point.id;
          return (
            <button
              className={`marker map-marker ${point.accent ?? ""} ${isActive ? "active" : ""}`}
              key={point.id}
              style={position}
              onClick={() => setSelectedPointId(point.id)}
              aria-label={`${point.label}: ${point.detail}`}
            />
          );
        })}
        <div className="map-info-card">
          <span className="tag">{activeChip}</span>
          <strong>{selectedPoint.label}</strong>
          <p className="small muted">{selectedPoint.detail}</p>
          <p className="small muted">{selectedPoint.meta}</p>
        </div>
      </div>
      <div className="chip-row">
        {chips.map((chip) => (
          <button key={chip} className={`chip ${activeChip === chip ? "active" : ""}`} onClick={() => setActiveChip(chip)}>{chip}</button>
        ))}
      </div>
    </section>
  );
}

function ItineraryPanel({ t }: { t: typeof translations.en }) {
  return (
    <section className="map-card">
      <SectionHead title={t.itinerary} action="See full itinerary" />
      {itinerary.map((item) => (
        <div className="itinerary-row" key={item.match}>
          <div className="date-tile">{item.day}</div>
          <strong>{item.time}</strong>
          <div>
            <strong>{item.match}</strong>
            <p className="small muted" style={{ margin: "4px 0 0" }}>{item.venue}</p>
          </div>
          <button className="link-button">{t.viewTicket}</button>
        </div>
      ))}
      <button className="prompt-button" style={{ textAlign: "center", marginTop: 12 }}>+ {t.addItinerary}</button>
    </section>
  );
}

function LiveStandingsPanel() {
  return (
    <section className="standings-card" aria-labelledby="live-standings-title">
      <div className="standings-intro">
        <h2 id="live-standings-title">2026 Live Standings</h2>
        <p>When games are live, standings update in real-time.</p>
        <div className="standings-live-key">
          <span aria-hidden="true" />
          <span>Team is currently playing</span>
        </div>
      </div>

      <div className="standings-groups">
        {liveStandings.map((group) => (
          <div className="standings-group" key={group.group}>
            <div className="standings-header">
              <strong>{group.group}</strong>
              <span>MP</span>
              <span>W-D-L</span>
              <span>GF</span>
              <span>GA</span>
              <span>GD</span>
              <span>PTS</span>
            </div>
            {group.teams.map((team) => (
              <div className={`standings-row ${team.rank === 3 ? "qualification-line" : ""}`} key={team.name}>
                <span className="standings-rank">{team.rank}</span>
                <span className="standings-team">
                  <span className="standings-flag" aria-hidden="true">{team.flag}</span>
                  <strong>{team.name}</strong>
                </span>
                <span>0</span>
                <span>0-0-0</span>
                <span>0</span>
                <span>0</span>
                <span>0</span>
                <span>0</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function AssistantPanel({
  t,
  assistantText,
  setAssistantText,
  submitAssistant,
  assistantReply
}: {
  t: typeof translations.en;
  assistantText: string;
  setAssistantText: (value: string) => void;
  submitAssistant: (value?: string) => void;
  assistantReply: string;
}) {
  return (
    <section className="assistant-card">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div className="logo-mark"><Bot size={24} /></div>
        <div>
          <h2 style={{ margin: 0 }}>{t.assistant}</h2>
          <p className="small muted" style={{ margin: "4px 0 0" }}>{t.askAnything}</p>
        </div>
      </div>
      <div className="assistant-prompts">
        {promptExamples.map((prompt) => (
          <button className="prompt-button" key={prompt} onClick={() => submitAssistant(prompt)}>{prompt}</button>
        ))}
      </div>
      <p className="small muted">{assistantReply}</p>
      <div className="assistant-input">
        <input value={assistantText} onChange={(event) => setAssistantText(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submitAssistant()} placeholder={t.questionPlaceholder} />
        <button className="send" onClick={() => submitAssistant()} aria-label="Send"><Send size={18} /></button>
      </div>
    </section>
  );
}

function MobileHome({ t, setMobileScreen, matches }: { t: typeof translations.en; setMobileScreen: (screen: Screen) => void; matches: MatchCardData[] }) {
  const featuredMatch = matches[0];

  return (
    <>
      <div className="mobile-hero">
        <p>{t.goodMorning} 👋</p>
        <h1>{t.mobileHero}</h1>
        <div className="mobile-search"><Search size={17} /> {t.search}</div>
      </div>
      <div className="gradient-card">
        <p>{t.nextMatch}</p>
        <h3>{featuredMatch.home} vs {featuredMatch.away}</h3>
        <p className="small">{featuredMatch.venue}</p>
      </div>
      <SectionHead title={t.matchesToday} action={t.viewAll} />
      <div className="mobile-list">
        {matches.slice(0, 3).map((match) => (
          <button className="mobile-match" key={`${match.home}-${match.away}`} onClick={() => setMobileScreen("matches")}>
            <span>{match.home}</span>
            <span>{match.time}</span>
            <span className="small muted">{match.group}</span>
            <span>{match.away}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function MobileMatches({ t, matches }: { t: typeof translations.en; matches: MatchCardData[] }) {
  return (
    <>
      <div className="chip-row">
        {[t.all, t.myTime, t.byTeam, t.byVenue].map((chip, index) => <button className={`chip ${index === 0 ? "active" : ""}`} key={chip}>{chip}</button>)}
      </div>
      <div className="date-strip">{[12, 13, 14, 15, 16, 17].map((date, index) => <span className={`date-pill ${index === 0 ? "active" : ""}`} key={date}>{date}</span>)}</div>
      <h3>Thursday, June 12</h3>
      <div className="mobile-list">
        {matches.map((match) => (
          <article className="mobile-match" key={`${match.home}-${match.away}`}>
            <strong>{match.home}</strong>
            <span>{match.time}</span>
            <strong>{match.away}</strong>
            <span className="small muted">{match.group}</span>
            <p className="small muted" style={{ gridColumn: "1 / -1" }}>{match.venue}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function MobileMap({ t, setMobileScreen, places }: { t: typeof translations.en; setMobileScreen: (screen: Screen) => void; places: PlaceCardData[] }) {
  const featuredPlace = places[0];
  const mobilePoints = hostCityPoints.slice(0, 10);

  return (
    <>
      <p className="small"><MapPin size={14} /> New York, USA <ChevronDown size={14} /></p>
      <div className="mobile-map interactive-map" aria-label="Mobile host city map">
        <div className="map-grid" aria-hidden="true" />
        <div className="map-landmass" aria-hidden="true" />
        {mobilePoints.map((point) => (
          <span
            className={`marker map-marker ${point.accent ?? ""}`}
            key={point.id}
            style={projectMapPoint(point.latitude, point.longitude)}
            title={point.label}
          />
        ))}
      </div>
      <div className="featured-card">
        <img src={featuredPlace.image} alt={featuredPlace.name} />
        <div className="featured-body">
          <strong>{featuredPlace.name}</strong>
          <p className="small muted">{featuredPlace.city} · {featuredPlace.distance}</p>
          <div className="tags">{featuredPlace.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
          <button className="primary-button" style={{ width: "100%", marginTop: 14 }} onClick={() => setMobileScreen("route")}>{t.travel}</button>
        </div>
      </div>
    </>
  );
}

function MobileRoute({ t }: { t: typeof translations.en }) {
  return (
    <>
      <div className="chip-row">
        {[[t.publicTransport, CalendarDays], [t.driving, Car], [t.walking, Footprints], [t.taxi, Car]].map(([label, Icon], index) => (
          <button className={`chip ${index === 0 ? "active" : ""}`} key={label as string}><Icon size={15} /> {label as string}</button>
        ))}
      </div>
      <div className="mobile-map"><div className="route-line" /><span className="marker green" style={{ left: "15%", top: "26%" }} /><span className="marker red" style={{ right: "12%", bottom: "18%" }} /></div>
      <h3>MetLife Stadium</h3>
      <p className="small muted">East Rutherford, NJ</p>
      <div className="mobile-list">
        {["Walk to Secaucus Junction · 5 min", "Train to Meadowlands · 25 min", "Walk to Stadium · 15 min"].map((step) => <div className="route-step" key={step}>{step}</div>)}
      </div>
      <button className="primary-button" style={{ width: "100%", marginTop: 18 }}>{t.startNavigation}</button>
    </>
  );
}

function MobileStadium({ t }: { t: typeof translations.en }) {
  return (
    <>
      <div className="stadium-hero">
        <div>
          <h2>MetLife Stadium</h2>
          <p>East Rutherford, NJ</p>
        </div>
      </div>
      <div className="info-icons">
        {[ShieldCheck, WalletCards, Utensils, Ticket, CircleParking].map((Icon, index) => <button key={index} aria-label="Info"><Icon size={19} /></button>)}
      </div>
      <h3>{t.helpfulInfo}</h3>
      <div className="mobile-list">
        {[[t.gatesOpen, "2:00 PM"], [t.capacity, "82,500"], [t.parking, "Lots open 6:00 AM"], [t.cashlessVenue, "Yes"], [t.prohibitedItems, t.viewAll]].map(([label, value]) => (
          <div className="mobile-match" key={label}><span>{label}</span><strong>{value}</strong></div>
        ))}
      </div>
      <button className="primary-button" style={{ width: "100%", marginTop: 18 }}>{t.viewStadiumMap}</button>
    </>
  );
}

function MobileWatch({ t, places }: { t: typeof translations.en; places: PlaceCardData[] }) {
  return (
    <>
      <p className="small"><MapPin size={14} /> Miami, USA</p>
      <div className="chip-row">{[t.all, t.sportsBars, t.restaurants, t.fanZones].map((chip, index) => <button className={`chip ${index === 0 ? "active" : ""}`} key={chip}>{chip}</button>)}</div>
      <div className="mobile-list">
        {places.map((place) => (
          <article className="place-row" key={place.name}>
            <img src={place.image} alt={place.name} />
            <div><strong>{place.name}</strong><p className="small muted">{place.type}</p><p className="small muted">{place.note}</p></div>
            <span className="small muted">{place.distance}</span>
          </article>
        ))}
      </div>
    </>
  );
}

function MobileCommunity({ t }: { t: typeof translations.en }) {
  return (
    <>
      <div className="chip-row">{[t.feed, t.nearbyFans, t.groups].map((chip, index) => <button className={`chip ${index === 1 ? "active" : ""}`} key={chip}>{chip}</button>)}</div>
      <div className="community-card">
        <h3>{t.findFans}</h3>
        <p>{t.connectFans}</p>
        <button className="prompt-button" style={{ width: "auto" }}>{t.findNow}</button>
      </div>
      <h3>{t.nearbyFans}</h3>
      <div className="mobile-list">
        {fans.map((fan) => (
          <article className="fan-row" key={fan.name}>
            <div className="avatar">{fan.avatar}</div>
            <div><strong>{fan.name}</strong><p className="small muted">{fan.country}</p><p className="small muted">{fan.status}</p></div>
            <button className="chip">{t.chat}</button>
          </article>
        ))}
      </div>
    </>
  );
}

function MobileAssistant({ t, assistantText, setAssistantText, submitAssistant }: { t: typeof translations.en; assistantText: string; setAssistantText: (value: string) => void; submitAssistant: (value?: string) => void }) {
  return (
    <div className="ai-mobile">
      <div className="ai-robot">🤖</div>
      <h1>{t.aiGreeting}</h1>
      <div className="ai-suggestions">
        {mobilePrompts.map((prompt) => <button key={prompt} onClick={() => submitAssistant(prompt)}>{prompt}</button>)}
      </div>
      <div className="assistant-input" style={{ marginTop: 26, background: "white" }}>
        <input value={assistantText} onChange={(event) => setAssistantText(event.target.value)} placeholder={t.questionPlaceholder} />
        <button className="send" onClick={() => submitAssistant()} aria-label="Send"><Send size={18} /></button>
      </div>
    </div>
  );
}

function MobileNav({ t, active, setActive }: { t: typeof translations.en; active: Screen; setActive: (screen: Screen) => void }) {
  const tabs: Array<[Screen, string, typeof Home]> = [
    ["home", t.home, Home],
    ["matches", t.matches, CalendarDays],
    ["map", t.map, Map],
    ["community", t.community, Users],
    ["assistant", t.assistant, MessageCircle]
  ];

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {tabs.map(([screen, label, Icon]) => (
        <button key={screen} className={active === screen ? "active" : ""} onClick={() => setActive(screen)}>
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
