"use client";

import { useEffect, useMemo, useState } from "react";
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
  WalletCards
} from "lucide-react";
import { fanZones, fans, itinerary, matches, mobileMatches, news, places } from "@/lib/mock-data";
import { getLanguage, languages, Locale, translations } from "@/lib/i18n";

type Screen = "home" | "matches" | "map" | "route" | "stadium" | "watch" | "community" | "assistant";

const navItems = [
  ["dashboard", Home],
  ["matches", CalendarDays],
  ["fanZones", MapPin],
  ["stadiums", Trophy],
  ["travel", Navigation],
  ["watch", Utensils],
  ["community", Users],
  ["tickets", Ticket],
  ["news", WalletCards],
  ["assistant", Sparkles]
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
  const [mobileScreen, setMobileScreen] = useState<Screen>("home");
  const [activeChip, setActiveChip] = useState(t.stadiums);
  const [assistantText, setAssistantText] = useState("");
  const [assistantReply, setAssistantReply] = useState("MetLife Stadium is easiest by train via Secaucus Junction. Plan 45 minutes and keep your ticket QR ready.");

  useEffect(() => {
    setActiveChip(translations[locale].stadiums);
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
        <Sidebar t={t} />
        <main className="main">
          <Topbar t={t} locale={locale} setLocale={setLocale} />
          <div className="content-grid">
            <section className="stack">
              <Hero t={t} />
              <NextMatches t={t} />
              <NewsSection t={t} />
              <FanZonesSection t={t} />
            </section>
            <aside className="right-rail">
              <MapPanel t={t} activeChip={activeChip} setActiveChip={setActiveChip} />
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
            {mobileScreen === "home" && <MobileHome t={t} setMobileScreen={setMobileScreen} />}
            {mobileScreen === "matches" && <MobileMatches t={t} />}
            {mobileScreen === "map" && <MobileMap t={t} setMobileScreen={setMobileScreen} />}
            {mobileScreen === "route" && <MobileRoute t={t} />}
            {mobileScreen === "stadium" && <MobileStadium t={t} />}
            {mobileScreen === "watch" && <MobileWatch t={t} />}
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

function Sidebar({ t }: { t: typeof translations.en }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo-mark"><Trophy size={26} /></div>
        <div>
          <h1 className="brand-title">CUPMATE</h1>
          <p className="brand-subtitle">{t.brandSubtitle}</p>
        </div>
      </div>
      <nav className="nav-list" aria-label="Main navigation">
        {navItems.map(([key, Icon], index) => (
          <button className={`nav-item ${index === 0 ? "active" : ""}`} key={key}>
            <Icon size={20} />
            <span>{t[key]}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-card">
        <h3>World Cup 2026</h3>
        <p>JUNE 11 - JULY 19</p>
        <p>Stay updated with the latest news, matches and events.</p>
        <button className="primary-button">{t.exploreMatches}</button>
      </div>
      <div className="profile-card">
        <div className="avatar">A</div>
        <div style={{ minWidth: 0 }}>
          <strong>Alex Johnson</strong>
          <p className="brand-subtitle" style={{ margin: "4px 0 0" }}>New York, USA</p>
        </div>
        <Settings size={18} style={{ marginLeft: "auto" }} />
      </div>
    </aside>
  );
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

function Hero({ t }: { t: typeof translations.en }) {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>{t.heroTitle}</h1>
        <p>{t.heroSub}</p>
        <button className="primary-button">{t.exploreMatches}</button>
      </div>
    </div>
  );
}

function NextMatches({ t }: { t: typeof translations.en }) {
  return (
    <section className="section-card">
      <SectionHead title={t.nextMatches} action={t.viewFullSchedule} />
      <div className="match-row">
        {matches.map((match) => (
          <article className="match-card" key={`${match.home}-${match.away}`}>
            <p className="small muted" style={{ textAlign: "center" }}>{match.group}</p>
            <div className="match-flags">
              <span>{match.home}</span>
              <span className="small">vs</span>
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

function NewsSection({ t }: { t: typeof translations.en }) {
  return (
    <section className="section-card">
      <SectionHead title={t.newsUpdates} action={t.viewAllNews} />
      <div className="news-grid">
        {news.map((item) => (
          <article className="news-card" key={item.title}>
            <img src={item.image} alt="" />
            <div>
              <strong>{item.title}</strong>
              <p className="small muted">{item.text}</p>
              <p className="small muted">{item.meta}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FanZonesSection({ t }: { t: typeof translations.en }) {
  return (
    <section className="section-card">
      <SectionHead title={t.popularFanZones} action={t.viewAll} />
      <div className="fan-zone-grid">
        {fanZones.map((zone) => <FanZoneCard zone={zone} key={zone.name} />)}
      </div>
    </section>
  );
}

function FanZoneCard({ zone }: { zone: (typeof fanZones)[number] }) {
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

function SectionHead({ title, action }: { title: string; action: string }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      <button className="link-button">{action}</button>
    </div>
  );
}

function MapPanel({ t, activeChip, setActiveChip }: { t: typeof translations.en; activeChip: string; setActiveChip: (chip: string) => void }) {
  const chips = [t.stadiums, t.fanZones, t.watch, t.parking];
  return (
    <section className="map-card">
      <SectionHead title={t.interactiveMap} action={t.viewFullMap} />
      <div className="us-map" aria-label="Host city map">
        {[
          ["Seattle", "10%", "12%"], ["San Francisco", "10%", "50%"], ["Los Angeles", "16%", "68%"],
          ["Kansas City", "44%", "48%"], ["Dallas", "46%", "74%"], ["Chicago", "66%", "34%"],
          ["Atlanta", "68%", "60%"], ["New York", "82%", "42%"], ["Miami", "78%", "84%"]
        ].map(([label, left, top], index) => (
          <span key={label}>
            <span className={`marker ${label === "New York" ? "red" : index % 4 === 0 ? "green" : ""}`} style={{ left, top }} />
            <span className="map-label" style={{ left: `calc(${left} + 24px)`, top }}>{label}</span>
          </span>
        ))}
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

function MobileHome({ t, setMobileScreen }: { t: typeof translations.en; setMobileScreen: (screen: Screen) => void }) {
  return (
    <>
      <div className="mobile-hero">
        <p>{t.goodMorning} 👋</p>
        <h1>{t.mobileHero}</h1>
        <div className="mobile-search"><Search size={17} /> {t.search}</div>
      </div>
      <div className="gradient-card">
        <p>{t.nextMatch}</p>
        <h3>🇦🇷 Argentina vs 🇫🇷 France</h3>
        <p className="small">MetLife Stadium, New Jersey</p>
      </div>
      <SectionHead title={t.matchesToday} action={t.viewAll} />
      <div className="mobile-list">
        {mobileMatches.slice(0, 3).map((match) => (
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

function MobileMatches({ t }: { t: typeof translations.en }) {
  return (
    <>
      <div className="chip-row">
        {[t.all, t.myTime, t.byTeam, t.byVenue].map((chip, index) => <button className={`chip ${index === 0 ? "active" : ""}`} key={chip}>{chip}</button>)}
      </div>
      <div className="date-strip">{[12, 13, 14, 15, 16, 17].map((date, index) => <span className={`date-pill ${index === 0 ? "active" : ""}`} key={date}>{date}</span>)}</div>
      <h3>Thursday, June 12</h3>
      <div className="mobile-list">
        {mobileMatches.map((match) => (
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

function MobileMap({ t, setMobileScreen }: { t: typeof translations.en; setMobileScreen: (screen: Screen) => void }) {
  return (
    <>
      <p className="small"><MapPin size={14} /> New York, USA <ChevronDown size={14} /></p>
      <div className="mobile-map">
        <span className="marker" style={{ left: "18%", top: "28%" }} />
        <span className="marker red" style={{ left: "70%", top: "46%" }} />
        <span className="marker green" style={{ left: "42%", top: "72%" }} />
        <span className="marker" style={{ left: "58%", top: "24%" }} />
      </div>
      <div className="featured-card">
        <img src={fanZones[0].image} alt={fanZones[0].name} />
        <div className="featured-body">
          <strong>FIFA Fan Festival - NYC</strong>
          <p className="small muted">Times Square · 1.2 km</p>
          <div className="tags">{fanZones[0].tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
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

function MobileWatch({ t }: { t: typeof translations.en }) {
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
