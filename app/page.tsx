"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppSidebar, type SidebarSection } from "@/components/AppSidebar";
import { LiveStreamCard } from "@/components/LiveStreamCard";
import { MatchHighlightLink } from "@/components/MatchHighlightLink";
import { MatchLiveStreamLink } from "@/components/MatchLiveStreamLink";
import { MatchScoreBadge } from "@/components/MatchScoreBadge";
import { TeamFlag, TeamLabel } from "@/components/TeamFlag";
import { AssistantMenuPanel } from "@/components/menu/AssistantPanel";
import { CommunityPanel } from "@/components/menu/CommunityPanel";
import { FanZonesPanel } from "@/components/menu/FanZonesPanel";
import { MatchesPanel } from "@/components/menu/MatchesPanel";
import { ArticleReader, NewsPanel } from "@/components/menu/NewsPanel";
import { getSeatGeekTicketInfo, StadiumsPanel, worldCupStadiums } from "@/components/menu/StadiumsPanel";
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
  Menu,
  MessageCircle,
  Newspaper,
  Plane,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Ticket,
  Trophy,
  Users,
  Utensils,
  WalletCards
} from "lucide-react";
import { fetchNewsItems, fetchPlaces, NEWS_IMAGE_FALLBACK, NewsItemData, PlaceCardData } from "@/lib/content-data";
import { getLanguage, languages, Locale, translations } from "@/lib/i18n";
import { fetchLiveScores, mergeLiveScores } from "@/lib/live-scores";
import type { LiveMatchScore } from "@/lib/live-scores";
import {
  getCurrentDayMatches,
  getMatchTimeline,
  getMatchTimelineGroups,
  getNextMatchDayMatches,
  matchTimelineCopy,
  selectFeaturedMatch
} from "@/lib/match-timeline";
import {
  localizedFallbackFans,
  localizedFallbackItinerary,
  localizedFallbackMatches,
  localizedFallbackNews,
  localizedFallbackPlaces,
  localizeTeamName
} from "@/lib/localized-static-data";
import { fetchWorldCupMatches, MatchCardData } from "@/lib/world-cup-data";

type Screen = "home" | "matches" | "map" | "route" | "stadium" | "watch" | "community" | "assistant" | "tickets" | "news" | "menu";
type DesktopSection = SidebarSection;
const desktopSections: DesktopSection[] = ["dashboard", "matches", "fanZones", "stadiums", "travel", "watch", "community", "tickets", "news", "assistant"];

const liveStandings = [
  {
    group: "Group A",
    teams: [
      { rank: 1, code: "MEX", flag: "🇲🇽", name: "Mexico" },
      { rank: 2, code: "RSA", flag: "🇿🇦", name: "South Africa" },
      { rank: 3, code: "KOR", flag: "🇰🇷", name: "South Korea" },
      { rank: 4, code: "CZE", flag: "🇨🇿", name: "Czechia" }
    ]
  },
  {
    group: "Group B",
    teams: [
      { rank: 1, code: "CAN", flag: "🇨🇦", name: "Canada" },
      { rank: 2, code: "BIH", flag: "🇧🇦", name: "Bosnia and Herzegovina" },
      { rank: 3, code: "QAT", flag: "🇶🇦", name: "Qatar" },
      { rank: 4, code: "SUI", flag: "🇨🇭", name: "Switzerland" }
    ]
  },
  {
    group: "Group C",
    teams: [
      { rank: 1, code: "BRA", flag: "🇧🇷", name: "Brazil" },
      { rank: 2, code: "MAR", flag: "🇲🇦", name: "Morocco" },
      { rank: 3, code: "HAI", flag: "🇭🇹", name: "Haiti" },
      { rank: 4, code: "SCO", flag: "🏴", name: "Scotland" }
    ]
  },
  {
    group: "Group D",
    teams: [
      { rank: 1, code: "USA", flag: "🇺🇸", name: "United States" },
      { rank: 2, code: "PAR", flag: "🇵🇾", name: "Paraguay" },
      { rank: 3, code: "AUS", flag: "🇦🇺", name: "Australia" },
      { rank: 4, code: "TUR", flag: "🇹🇷", name: "Türkiye" }
    ]
  },
  {
    group: "Group E",
    teams: [
      { rank: 1, code: "GER", flag: "🇩🇪", name: "Germany" },
      { rank: 2, code: "CUW", flag: "🇨🇼", name: "Curacao" },
      { rank: 3, code: "CIV", flag: "🇨🇮", name: "Ivory Coast" },
      { rank: 4, code: "ECU", flag: "🇪🇨", name: "Ecuador" }
    ]
  },
  {
    group: "Group F",
    teams: [
      { rank: 1, code: "NED", flag: "🇳🇱", name: "Netherlands" },
      { rank: 2, code: "JPN", flag: "🇯🇵", name: "Japan" },
      { rank: 3, code: "SWE", flag: "🇸🇪", name: "Sweden" },
      { rank: 4, code: "TUN", flag: "🇹🇳", name: "Tunisia" }
    ]
  },
  {
    group: "Group G",
    teams: [
      { rank: 1, code: "BEL", flag: "🇧🇪", name: "Belgium" },
      { rank: 2, code: "EGY", flag: "🇪🇬", name: "Egypt" },
      { rank: 3, code: "IRN", flag: "🇮🇷", name: "Iran" },
      { rank: 4, code: "NZL", flag: "🇳🇿", name: "New Zealand" }
    ]
  },
  {
    group: "Group H",
    teams: [
      { rank: 1, code: "ESP", flag: "🇪🇸", name: "Spain" },
      { rank: 2, code: "CPV", flag: "🇨🇻", name: "Cape Verde" },
      { rank: 3, code: "KSA", flag: "🇸🇦", name: "Saudi Arabia" },
      { rank: 4, code: "URU", flag: "🇺🇾", name: "Uruguay" }
    ]
  },
  {
    group: "Group I",
    teams: [
      { rank: 1, code: "FRA", flag: "🇫🇷", name: "France" },
      { rank: 2, code: "SEN", flag: "🇸🇳", name: "Senegal" },
      { rank: 3, code: "IRQ", flag: "🇮🇶", name: "Iraq" },
      { rank: 4, code: "NOR", flag: "🇳🇴", name: "Norway" }
    ]
  },
  {
    group: "Group J",
    teams: [
      { rank: 1, code: "ARG", flag: "🇦🇷", name: "Argentina" },
      { rank: 2, code: "ALG", flag: "🇩🇿", name: "Algeria" },
      { rank: 3, code: "AUT", flag: "🇦🇹", name: "Austria" },
      { rank: 4, code: "JOR", flag: "🇯🇴", name: "Jordan" }
    ]
  },
  {
    group: "Group K",
    teams: [
      { rank: 1, code: "POR", flag: "🇵🇹", name: "Portugal" },
      { rank: 2, code: "COD", flag: "🇨🇩", name: "Congo DR" },
      { rank: 3, code: "UZB", flag: "🇺🇿", name: "Uzbekistan" },
      { rank: 4, code: "COL", flag: "🇨🇴", name: "Colombia" }
    ]
  },
  {
    group: "Group L",
    teams: [
      { rank: 1, code: "ENG", flag: "🏴", name: "England" },
      { rank: 2, code: "CRO", flag: "🇭🇷", name: "Croatia" },
      { rank: 3, code: "GHA", flag: "🇬🇭", name: "Ghana" },
      { rank: 4, code: "PAN", flag: "🇵🇦", name: "Panama" }
    ]
  }
];

function handleNewsImageError(event: { currentTarget: HTMLImageElement }) {
  if (event.currentTarget.getAttribute("src") !== NEWS_IMAGE_FALLBACK) {
    event.currentTarget.src = NEWS_IMAGE_FALLBACK;
  }
}

function matchPlannerHref(match: MatchCardData) {
  return `/matches/${match.slug}`;
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

function localizeMapMeta(meta: string, t: typeof translations.en) {
  if (meta === "Opening match") return t.nextMatch;
  if (meta === "Final host") return t.worldCup2026;
  const matchCount = meta.match(/^(\d+)\s+matches$/i);
  if (matchCount) return `${matchCount[1]} ${t.matches.toLowerCase()}`;
  return meta;
}

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
  const [assistantReply, setAssistantReply] = useState(t.metlifeTransitTip);
  const [worldCupMatches, setWorldCupMatches] = useState<MatchCardData[]>(() => localizedFallbackMatches("en"));
  const [liveScores, setLiveScores] = useState<LiveMatchScore[]>(() => []);
  const [contentNews, setContentNews] = useState<NewsItemData[]>(() => localizedFallbackNews("en"));
  const [contentPlaces, setContentPlaces] = useState<PlaceCardData[]>(() => localizedFallbackPlaces("en"));
  const matchesWithScores = useMemo(() => mergeLiveScores(worldCupMatches, liveScores), [worldCupMatches, liveScores]);

  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get("section") as DesktopSection | null;
    if (section && desktopSections.includes(section)) {
      setDesktopSection(section);
      const mobileSectionMap: Partial<Record<DesktopSection, Screen>> = {
        dashboard: "home",
        matches: "matches",
        fanZones: "map",
        stadiums: "stadium",
        travel: "route",
        watch: "watch",
        community: "community",
        assistant: "assistant"
      };
      setMobileScreen(mobileSectionMap[section] ?? "home");
    }
  }, []);

  useEffect(() => {
    setActiveChip(translations[locale].stadiums);
    setAssistantReply(translations[locale].metlifeTransitTip);
    setWorldCupMatches(localizedFallbackMatches(locale));
    setContentNews(localizedFallbackNews(locale));
    setContentPlaces(localizedFallbackPlaces(locale));
  }, [locale]);

  useEffect(() => {
    let isMounted = true;

    fetchWorldCupMatches(72, locale)
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

  useEffect(() => {
    let isMounted = true;

    const refreshLiveScores = () => {
      fetchLiveScores()
        .then((scores) => {
          if (isMounted) {
            setLiveScores(scores);
          }
        })
        .catch((error) => {
          console.warn("Unable to load World Cup live scores.", error);
        });
    };

    refreshLiveScores();
    const intervalId = window.setInterval(refreshLiveScores, 20_000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const mobileTitle = useMemo(() => {
    const titles: Record<Screen, string> = {
      home: t.home,
      matches: t.matches,
      map: t.fanZones,
      route: t.routeToStadium,
      stadium: t.stadiumGuide,
      watch: t.watch,
      community: t.community,
      assistant: t.assistant,
      tickets: t.tickets,
      news: t.news || "News",
      menu: t.menu || "Menu"
    };
    return titles[mobileScreen];
  }, [mobileScreen, t]);

  function submitAssistant(value = assistantText) {
    if (!value.trim()) return;
    setAssistantReply(`${t.assistantTipPrefix} ${value.includes("Miami") ? t.assistantReplyWatch : t.assistantReplyTransit}`);
    setAssistantText("");
  }

  return (
    <>
      <div className="desktop-app app-shell">
        <AppSidebar t={t} activeSection={desktopSection} setActiveSection={setDesktopSection} />
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
            matches={matchesWithScores}
            liveScores={liveScores}
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
                <button className="icon-button" onClick={() => setMobileScreen("home")} aria-label={t.back}>
                  ‹
                </button>
                <h2>{mobileTitle}</h2>
                <LanguagePicker locale={locale} setLocale={setLocale} compact />
              </div>
            )}
            {mobileScreen === "home" && <MobileHome t={t} locale={locale} setMobileScreen={setMobileScreen} matches={matchesWithScores} />}
            {mobileScreen === "matches" && <MobileMatches t={t} locale={locale} matches={matchesWithScores} />}
            {mobileScreen === "map" && <MobileMap t={t} setMobileScreen={setMobileScreen} places={contentPlaces} />}
            {mobileScreen === "route" && <MobileRoute t={t} />}
            {mobileScreen === "stadium" && <MobileStadium t={t} />}
            {mobileScreen === "watch" && <MobileWatch t={t} places={contentPlaces} />}
            {mobileScreen === "community" && <MobileCommunity t={t} locale={locale} />}
            {mobileScreen === "assistant" && (
              <MobileAssistant
                t={t}
                assistantText={assistantText}
                setAssistantText={setAssistantText}
                submitAssistant={submitAssistant}
              />
            )}
            {mobileScreen === "tickets" && (
              <div className="mobile-panel-wrap">
                <TicketsPanel locale={locale} t={t} matches={matchesWithScores} />
              </div>
            )}
            {mobileScreen === "news" && (
              <div className="mobile-panel-wrap">
                <NewsPanel locale={locale} t={t} news={contentNews} />
              </div>
            )}
            {mobileScreen === "menu" && (
              <MobileMenu t={t} setActive={setMobileScreen} locale={locale} setLocale={setLocale} />
            )}
          </div>
        </div>
        <MobileNav t={t} active={mobileScreen} setActive={setMobileScreen} />
      </div>
    </>
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
  liveScores,
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
  liveScores: LiveMatchScore[];
  news: NewsItemData[];
  places: PlaceCardData[];
}) {
  if (section === "dashboard") {
    return (
      <div className="content-grid">
        <section className="stack">
          <Hero t={t} setSection={setSection} />
          <NextMatches t={t} locale={locale} matches={matches} />
          <NewsSection t={t} news={news} />
          <FanZonesSection t={t} places={places} />
        </section>
        <aside className="right-rail">
          <MapPanel t={t} activeChip={activeChip} setActiveChip={setActiveChip} places={places} />
          <ItineraryPanel t={t} locale={locale} />
          <LiveStandingsPanel t={t} locale={locale} liveScores={liveScores} />
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
      return <MatchesPanel t={t} locale={locale} matches={matches} />;
    case "fanZones":
      return <FanZonesPanel t={t} places={places} />;
    case "stadiums":
      return <StadiumsPanel t={t} locale={locale} matches={matches} />;
    case "travel":
      return <TravelPanel t={t} locale={locale} matches={matches} />;
    case "watch":
      return <WatchPanel t={t} places={places} />;
    case "community":
      return <CommunityPanel t={t} locale={locale} />;
    case "tickets":
      return <TicketsPanel t={t} locale={locale} matches={matches} />;
    case "news":
      return <NewsPanel locale={locale} t={t} news={news} />;
    case "assistant":
      return <AssistantMenuPanel t={t} locale={locale} places={places} />;
    default:
      return (
        <div className="content-grid">
          <section className="stack">
            <Hero t={t} setSection={() => undefined} />
            <NextMatches t={t} locale={locale} matches={matches} />
          </section>
          <aside className="right-rail">
            <MapPanel t={t} activeChip={activeChip} setActiveChip={setActiveChip} places={places} />
            <ItineraryPanel t={t} locale={locale} />
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
        <button className="icon-button" aria-label={t.notifications}><Bell size={20} /></button>
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
      <select className="language-select" value={locale} onChange={(event) => setLocale(event.target.value as Locale)} aria-label={translations[locale].lang}>
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

function NextMatches({ t, locale, matches }: { t: typeof translations.en; locale: Locale; matches: MatchCardData[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const now = new Date();
  const copy = matchTimelineCopy(locale);
  const todayMatches = getCurrentDayMatches(matches, now);
  const dayMatches = todayMatches.length > 0 ? todayMatches : getNextMatchDayMatches(matches, now);
  const visibleMatches = isExpanded ? dayMatches : dayMatches.slice(0, 4);
  const canExpand = dayMatches.length > 4;
  const sectionTitle = todayMatches.length > 0 ? copy.todayTitle : t.nextMatches;

  return (
    <section className="section-card">
      <SectionHead title={sectionTitle} action={t.viewFullSchedule} actionHref="/world-cup-2026-schedule" />
      <div className="match-row">
        {visibleMatches.map((match) => {
          const timeline = getMatchTimeline(match, locale, now);
          return (
            <article className={`match-card is-${timeline.bucket}`} key={`${match.kickoffAt}-${match.home}-${match.away}`}>
              <p className="small muted" style={{ textAlign: "center" }}>{match.group}</p>
              <div className="match-flags">
                <span><TeamLabel value={match.home} /></span>
                <span className="small">{t.versus}</span>
                <span><TeamLabel value={match.away} /></span>
              </div>
              <MatchScoreBadge match={match} locale={locale} />
              <p className="small muted" style={{ textAlign: "center" }}>{match.date} · {match.time}</p>
              <p className="small muted" style={{ textAlign: "center" }}>{match.venue}</p>
              <Link className="link-button match-details-link" href={matchPlannerHref(match)}>{t.seeDetails}</Link>
              <MatchLiveStreamLink match={match} locale={locale} className="match-details-link" />
              <MatchHighlightLink match={match} locale={locale} className="match-details-link" />
            </article>
          );
        })}
      </div>
      {canExpand && (
        <div className="section-footer-actions">
          <button className="link-button" type="button" onClick={() => setIsExpanded((current) => !current)}>
            {isExpanded ? t.hideMatches : t.showAllMatches}
          </button>
          <Link className="link-button" href="/world-cup-2026-schedule">{t.viewFullSchedule}</Link>
        </div>
      )}
    </section>
  );
}

function NewsSection({ t, news }: { t: typeof translations.en; news: NewsItemData[] }) {
  const [selectedArticle, setSelectedArticle] = useState<NewsItemData | null>(null);

  return (
    <section className="section-card">
      <SectionHead title={t.newsUpdates} action={t.viewAllNews} actionHref="/news" />
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

function SectionHead({ title, action, onAction, actionHref }: { title: string; action: string; onAction?: () => void; actionHref?: string }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {actionHref ? (
        <Link className="link-button" href={actionHref}>{action}</Link>
      ) : (
        <button className="link-button" onClick={onAction}>{action}</button>
      )}
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
        detail: `${point.label} · ${t.parking}`,
        meta: t.recommendedRoute,
        kind: "parking" as const
      })),
    [t]
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
      <div className="us-map interactive-map" aria-label={t.interactiveMap}>
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
          <p className="small muted">{localizeMapMeta(selectedPoint.meta, t)}</p>
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

function ItineraryPanel({ t, locale }: { t: typeof translations.en; locale: Locale }) {
  const localizedItinerary = localizedFallbackItinerary(locale);

  return (
    <section className="map-card">
      <SectionHead title={t.itinerary} action={t.seeFullItinerary} />
      {localizedItinerary.map((item) => (
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

type StandingsTeamSeed = (typeof liveStandings)[number]["teams"][number];

type CalculatedStandingTeam = StandingsTeamSeed & {
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  isLive: boolean;
};

function buildLiveStandings(scores: LiveMatchScore[]) {
  return liveStandings.map((group) => {
    const rows = group.teams.map<CalculatedStandingTeam>((team) => ({
      ...team,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      isLive: false
    }));
    const rowsByCode = new globalThis.Map(rows.map((team) => [team.code, team]));

    for (const score of scores) {
      if (score.homeScore === null || score.awayScore === null || score.status === "scheduled") continue;

      const home = rowsByCode.get(score.homeCode);
      const away = rowsByCode.get(score.awayCode);
      if (!home || !away) continue;

      const isLive = score.status === "live" || score.status === "halftime";
      applyStandingResult(home, score.homeScore, score.awayScore, isLive);
      applyStandingResult(away, score.awayScore, score.homeScore, isLive);
    }

    const rankedRows = rows
      .sort((a, b) =>
        b.points - a.points ||
        b.goalDifference - a.goalDifference ||
        b.goalsFor - a.goalsFor ||
        a.rank - b.rank
      )
      .map((team, index) => ({ ...team, rank: index + 1 }));

    return { ...group, teams: rankedRows };
  });
}

function applyStandingResult(team: CalculatedStandingTeam, goalsFor: number, goalsAgainst: number, isLive: boolean) {
  team.played += 1;
  team.goalsFor += goalsFor;
  team.goalsAgainst += goalsAgainst;
  team.goalDifference = team.goalsFor - team.goalsAgainst;
  team.isLive = team.isLive || isLive;

  if (goalsFor > goalsAgainst) {
    team.wins += 1;
    team.points += 3;
  } else if (goalsFor === goalsAgainst) {
    team.draws += 1;
    team.points += 1;
  } else {
    team.losses += 1;
  }
}

function LiveStandingsPanel({ t, locale, liveScores }: { t: typeof translations.en; locale: Locale; liveScores: LiveMatchScore[] }) {
  const standingsGroups = useMemo(() => buildLiveStandings(liveScores), [liveScores]);

  return (
    <section className="standings-card" aria-labelledby="live-standings-title">
      <div className="standings-intro">
        <h2 id="live-standings-title">{t.liveStandingsTitle}</h2>
        <p>{t.liveStandingsDescription}</p>
        <div className="standings-live-key">
          <span aria-hidden="true" />
          <span>{t.teamCurrentlyPlaying}</span>
        </div>
      </div>

      <div className="standings-groups">
        {standingsGroups.map((group) => (
          <div className="standings-group" key={group.group}>
            <div className="standings-header">
              <strong>{group.group}</strong>
              <span>{t.playedShort}</span>
              <span>{t.recordShort}</span>
              <span>{t.goalsForShort}</span>
              <span>{t.goalsAgainstShort}</span>
              <span>{t.goalDifferenceShort}</span>
              <span>{t.pointsShort}</span>
            </div>
            {group.teams.map((team) => (
              <div className={`standings-row ${team.rank === 3 ? "qualification-line" : ""} ${team.isLive ? "is-live" : ""}`} key={team.name}>
                <span className="standings-rank">{team.rank}</span>
                <span className="standings-team">
                  <span className="standings-flag">
                    <TeamFlag team={team.name} fallback={team.flag} className="standings-flag-media" />
                  </span>
                  <strong>{localizeTeamName(team.name, locale)}</strong>
                </span>
                <span>{team.played}</span>
                <span>{team.wins}-{team.draws}-{team.losses}</span>
                <span>{team.goalsFor}</span>
                <span>{team.goalsAgainst}</span>
                <span>{team.goalDifference}</span>
                <span>{team.points}</span>
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
  const promptExamples = [t.assistantPromptWatchMiami, t.assistantPromptMetlifeTransit, t.assistantPromptFanZonesNewYork];

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

function MobileHome({ t, locale, setMobileScreen, matches }: { t: typeof translations.en; locale: Locale; setMobileScreen: (screen: Screen) => void; matches: MatchCardData[] }) {
  const now = new Date();
  const featuredMatch = selectFeaturedMatch(matches, now);
  const todayMatches = getCurrentDayMatches(matches, now);
  const mobileMatches = todayMatches.length > 0 ? todayMatches : matches.slice(0, 3);

  if (!featuredMatch) return null;

  return (
    <>
      <div className="mobile-hero">
        <p>{t.goodMorning} 👋</p>
        <h1>{t.mobileHero}</h1>
        <div className="mobile-search"><Search size={17} /> {t.search}</div>
      </div>
      <div className="gradient-card">
        <p>{t.nextMatch}</p>
        <h3>{featuredMatch.home} {t.versus} {featuredMatch.away}</h3>
        <MatchScoreBadge match={featuredMatch} variant="hero" locale={locale} />
        <p className="small">{featuredMatch.venue}</p>
      </div>
      <SectionHead title={t.matchesToday} action={t.viewAll} />
      <div className="mobile-list">
        {mobileMatches.slice(0, 3).map((match) => {
          const timeline = getMatchTimeline(match, locale, now);
          return (
            <button className={`mobile-match is-${timeline.bucket}`} key={`${match.kickoffAt}-${match.home}-${match.away}`} onClick={() => setMobileScreen("matches")}>
              <span>{match.home}</span>
              <span>{timeline.hasScore ? `${timeline.label} ${timeline.detail}` : match.time}</span>
              <span className="small muted">{match.group}</span>
              <span>{match.away}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function MobileMatches({ t, locale, matches }: { t: typeof translations.en; locale: Locale; matches: MatchCardData[] }) {
  const now = new Date();
  const groups = getMatchTimelineGroups(matches, locale, now);

  return (
    <>
      <div className="chip-row">
        {[t.all, t.myTime, t.byTeam, t.byVenue].map((chip, index) => <button className={`chip ${index === 0 ? "active" : ""}`} key={chip}>{chip}</button>)}
      </div>
      <div className="date-strip">{[12, 13, 14, 15, 16, 17].map((date) => <span className={`date-pill ${date === now.getDate() ? "active" : ""}`} key={date}>{date}</span>)}</div>
      {groups.map((group) => (
        <section className="mobile-match-group" key={group.bucket}>
          <h3>{group.label}</h3>
          <div className="mobile-list">
            {group.matches.length > 0 ? group.matches.map((match) => {
              const timeline = getMatchTimeline(match, locale, now);
              return (
                <Link className={`mobile-match mobile-match-link is-${timeline.bucket}`} key={`${match.kickoffAt}-${match.home}-${match.away}`} href={matchPlannerHref(match)}>
                  <strong>{match.home}</strong>
                  <span>{timeline.hasScore ? `${timeline.label} ${timeline.detail}` : match.time}</span>
                  <strong>{match.away}</strong>
                  <span className="small muted">{match.group}</span>
                  <p className="small muted" style={{ gridColumn: "1 / -1" }}>{match.venue}</p>
                </Link>
              );
            }) : (
              <p className="small muted">{group.emptyLabel}</p>
            )}
          </div>
        </section>
      ))}
    </>
  );
}

function MobileMap({ t, setMobileScreen, places }: { t: typeof translations.en; setMobileScreen: (screen: Screen) => void; places: PlaceCardData[] }) {
  const featuredPlace = places[0];
  const mobilePoints = hostCityPoints.slice(0, 10);

  return (
    <>
      <p className="small"><MapPin size={14} /> {t.newYorkUsa} <ChevronDown size={14} /></p>
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
      <p className="small muted">{t.eastRutherfordNj}</p>
      <div className="mobile-list">
        {[`${t.walkToSecaucus} · 5 min`, `${t.trainToMeadowlands} · 25 min`, `${t.walkToStadium} · 15 min`].map((step) => <div className="route-step" key={step}>{step}</div>)}
      </div>
      <button className="primary-button" style={{ width: "100%", marginTop: 18 }}>{t.startNavigation}</button>
    </>
  );
}

function MobileStadium({ t }: { t: typeof translations.en }) {
  const [selectedId, setSelectedId] = useState(worldCupStadiums[5].id);
  const selected = worldCupStadiums.find((stadium) => stadium.id === selectedId) ?? worldCupStadiums[0];
  const ticketInfo = getSeatGeekTicketInfo(selected.id);
  const mobileSchedule = ticketInfo?.matches ?? selected.schedule;

  return (
    <>
      <div className="stadium-hero">
        <div>
          <h2>{selected.name}</h2>
          <p>{selected.city}</p>
        </div>
      </div>
      <div className="mobile-stadium-strip" aria-label={t.stadiums}>
        {worldCupStadiums.map((stadium) => (
          <button className={stadium.id === selected.id ? "active" : ""} key={stadium.id} onClick={() => setSelectedId(stadium.id)}>
            <img src={stadium.images[0]} alt="" />
            <span>{stadium.name}</span>
          </button>
        ))}
      </div>
      <div className="info-icons">
        {[ShieldCheck, WalletCards, Utensils, Ticket, CircleParking].map((Icon, index) => <button key={index} aria-label={t.helpfulInfo}><Icon size={19} /></button>)}
      </div>
      <h3>{t.helpfulInfo}</h3>
      <div className="mobile-list">
        {[[t.gatesOpen, selected.gatesOpen], [t.capacity, selected.capacity], [t.parking, selected.parkingCost], [t.publicTransport, selected.transitCost], ["SeatGeek", ticketInfo?.startingAt ?? t.viewAll]].map(([label, value]) => (
          <div className="mobile-match" key={label}><span>{label}</span><strong>{value}</strong></div>
        ))}
      </div>
      <div className="mobile-list">
        {mobileSchedule.slice(0, 4).map((match) => (
          <div className="mobile-match" key={`${selected.id}-${match.date}-${match.label}`}>
            <span>{match.date} · {match.stage}</span>
            <strong>{match.label}{match.price ? ` · ${match.price}` : ""}</strong>
          </div>
        ))}
      </div>
      <a className="primary-button" style={{ width: "100%", marginTop: 18, textDecoration: "none" }} href={selected.navigationUrl} target="_blank" rel="noreferrer">{t.routeToStadium}</a>
    </>
  );
}

function MobileWatch({ t, places }: { t: typeof translations.en; places: PlaceCardData[] }) {
  return (
    <>
      <p className="small"><MapPin size={14} /> {t.miamiUsa}</p>
      <div className="chip-row">{[t.all, t.sportsBars, t.restaurants, t.fanZones].map((chip, index) => <button className={`chip ${index === 0 ? "active" : ""}`} key={chip}>{chip}</button>)}</div>
      <LiveStreamCard t={t} compact />
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

function MobileCommunity({ t, locale }: { t: typeof translations.en; locale: Locale }) {
  const localizedFans = localizedFallbackFans(locale);

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
        {localizedFans.map((fan) => (
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
  const mobilePrompts = [t.assistantPromptMetlife, t.assistantPromptFanZones, t.assistantPromptWeather, t.assistantPromptWatchPlace];

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

function MobileMenu({
  t,
  setActive,
  locale,
  setLocale
}: {
  t: typeof translations.en;
  setActive: (screen: Screen) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}) {
  const menuItems: Array<{ screen: Screen; label: string; icon: any; color: string }> = [
    { screen: "home", label: t.home, icon: Home, color: "var(--blue)" },
    { screen: "matches", label: t.matches, icon: CalendarDays, color: "var(--purple)" },
    { screen: "map", label: t.fanZones, icon: Map, color: "var(--green)" },
    { screen: "stadium", label: t.stadiumGuide, icon: Trophy, color: "#f5a51c" },
    { screen: "route", label: t.routeToStadium || "Travel", icon: Car, color: "#32d583" },
    { screen: "watch", label: t.watch, icon: Utensils, color: "#ff4d4f" },
    { screen: "community", label: t.community, icon: Users, color: "var(--purple-2)" },
    { screen: "tickets", label: t.tickets, icon: Ticket, color: "#245bff" },
    { screen: "news", label: t.news || "News", icon: Newspaper, color: "#667085" },
    { screen: "assistant", label: t.assistant, icon: MessageCircle, color: "var(--blue)" }
  ];

  return (
    <div className="mobile-menu-page">
      <div className="mobile-menu-grid">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.screen}
              className="mobile-menu-tile"
              onClick={() => setActive(item.screen)}
              style={{ "--tile-accent": item.color } as React.CSSProperties}
            >
              <div className="tile-icon-wrap" style={{ color: item.color }}>
                <Icon size={24} />
              </div>
              <strong>{item.label}</strong>
            </button>
          );
        })}
      </div>
      <div className="mobile-menu-settings">
        <div className="mobile-menu-settings-row">
          <span>{t.lang || "Language"}</span>
          <LanguagePicker locale={locale} setLocale={setLocale} />
        </div>
      </div>
    </div>
  );
}

function MobileNav({ t, active, setActive }: { t: typeof translations.en; active: Screen; setActive: (screen: Screen) => void }) {
  const tabs: Array<[Screen, string, any]> = [
    ["home", t.home, Home],
    ["matches", t.matches, CalendarDays],
    ["map", t.map, Map],
    ["assistant", t.assistant, MessageCircle],
    ["menu", t.menu || "Menu", Menu]
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
