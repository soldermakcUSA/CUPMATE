"use client";

import Link from "next/link";
import {
  Award,
  CalendarDays,
  Home,
  MapPin,
  Navigation,
  Shield,
  Sparkles,
  Ticket,
  Trophy,
  Users,
  Utensils,
  WalletCards
} from "lucide-react";
import type { translations } from "@/lib/i18n";

export type SidebarSection = "dashboard" | "matches" | "fanZones" | "stadiums" | "travel" | "watch" | "community" | "tickets" | "news" | "assistant";

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

type AppSidebarProps = {
  t: typeof translations.en;
  activeSection?: SidebarSection;
  setActiveSection?: (section: SidebarSection) => void;
};

export function AppSidebar({ t, activeSection = "dashboard", setActiveSection }: AppSidebarProps) {
  function itemClass(section: SidebarSection) {
    return `nav-item ${activeSection === section ? "active" : ""}`;
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <img className="brand-cup" src="/assets/cupmate-trophy-white.png" alt="" />
        <div>
          <h1 className="brand-title">CUPMATE</h1>
          <p className="brand-subtitle">{t.brandSubtitle}</p>
        </div>
      </div>
      <nav className="nav-list" aria-label={t.mainNavigation}>
        {navItems.map(([key, Icon, section]) => (
          setActiveSection ? (
            <button className={itemClass(section)} key={key} onClick={() => setActiveSection(section)} aria-current={activeSection === section ? "page" : undefined}>
              <Icon size={20} />
              <span>{t[key]}</span>
            </button>
          ) : (
            <Link className={itemClass(section)} key={key} href={`/?section=${section}`} aria-current={activeSection === section ? "page" : undefined}>
              <Icon size={20} />
              <span>{t[key]}</span>
            </Link>
          )
        ))}
      </nav>

      <div className="sidebar-event-card" aria-label={t.worldCup2026}>
        <SidebarEventContent t={t} />
      </div>

      <div className="sidebar-stats-card" aria-label={t.worldCupSummary}>
        <div className="sidebar-stat-row">
          <CalendarDays size={24} />
          <strong>{t.matchesCount}</strong>
        </div>
        <div className="sidebar-stat-row">
          <Award size={24} />
          <strong>{t.hostCitiesCount}</strong>
        </div>
        <div className="sidebar-stat-row">
          <Shield size={24} />
          <strong>{t.hostCountriesCount}</strong>
        </div>
        <div className="sidebar-stat-row">
          <Trophy size={24} />
          <strong>{t.championCount}</strong>
        </div>
      </div>

      <div className="sidebar-flags" aria-label={t.hostCountries}>
        <span>🇺🇸</span>
        <span>🇨🇦</span>
        <span>🇲🇽</span>
      </div>
    </aside>
  );
}

function SidebarEventContent({ t }: { t: typeof translations.en }) {
  return (
    <>
      <div className="sidebar-event-copy">
        <h3>{t.worldCup2026}</h3>
        <strong>{t.tournamentDates}</strong>
        <p>{t.tournamentSummary}</p>
      </div>
      <img src="/assets/world-cup-gold.png" alt="" />
    </>
  );
}
