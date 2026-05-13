import { CalendarDays, MapPin, ShieldCheck, Ticket } from "lucide-react";
import { localizedFallbackItinerary } from "@/lib/localized-static-data";
import { translations, type Locale } from "@/lib/i18n";
import type { MatchCardData } from "@/lib/world-cup-data";

type TicketsPanelProps = {
  locale?: Locale;
  t?: typeof translations.en;
  matches: MatchCardData[];
};

function panelText(locale: Locale = "en", t?: typeof translations.en) {
  return t ?? translations[locale] ?? translations.en;
}

export function TicketsPanel({ locale = "en", t, matches }: TicketsPanelProps) {
  const copy = panelText(locale, t);
  const featuredMatch = matches[1] ?? matches[0];
  const localizedItinerary = localizedFallbackItinerary(locale);

  if (!featuredMatch) {
    return null;
  }

  return (
    <section className="section-card menu-panel tickets-panel" aria-labelledby="tickets-panel-title">
      <div className="section-head">
        <div>
          <p className="small muted menu-panel-kicker" style={{ margin: "0 0 4px" }}>{copy.itinerary}</p>
          <h2 id="tickets-panel-title">{copy.tickets}</h2>
        </div>
        <button className="link-button">{copy.viewAll}</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, 0.8fr) minmax(0, 1.2fr)",
          gap: 16,
          alignItems: "stretch"
        }}
      >
        <article
          className="tickets-panel-feature"
          style={{
            minHeight: 228,
            padding: 18,
            color: "white",
            borderRadius: 12,
            background:
              "linear-gradient(145deg, rgba(6, 20, 47, 0.96), rgba(36, 91, 255, 0.78)), url('https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=900&q=80') center/cover"
          }}
        >
          <div className="logo-mark" style={{ marginBottom: 18 }}>
            <Ticket size={24} />
          </div>
          <p className="small" style={{ margin: "0 0 8px", opacity: 0.76 }}>{featuredMatch.group}</p>
          <h3 style={{ margin: 0, fontSize: 24, lineHeight: 1.12 }}>
            {featuredMatch.home} {copy.versus} {featuredMatch.away}
          </h3>
          <p style={{ margin: "14px 0 4px", fontWeight: 800 }}>{featuredMatch.date} · {featuredMatch.time}</p>
          <p className="small" style={{ margin: 0, opacity: 0.78 }}>{featuredMatch.venue}</p>
          <button className="primary-button" style={{ marginTop: 20, background: "white", color: "#172554", boxShadow: "none" }}>
            {copy.viewTicket}
          </button>
        </article>

        <div className="tickets-panel-list" style={{ display: "grid", gap: 12 }}>
          {localizedItinerary.map((item) => (
            <article className="itinerary-row tickets-panel-row" key={item.match} style={{ border: "1px solid var(--line)", borderRadius: 10, padding: 14 }}>
              <div className="date-tile">{item.day}</div>
              <strong>{item.time}</strong>
              <div>
                <strong>{item.match}</strong>
                <p className="small muted" style={{ display: "flex", gap: 6, alignItems: "center", margin: "4px 0 0" }}>
                  <MapPin size={13} /> {item.venue}
                </p>
              </div>
              <button className="link-button">{copy.viewTicket}</button>
            </article>
          ))}
        </div>
      </div>

      <div className="chip-row tickets-panel-reminders" aria-label={copy.tickets}>
        <span className="chip active"><ShieldCheck size={14} /> {copy.qrReady}</span>
        <span className="chip"><CalendarDays size={14} /> {copy.gatesBeforeKickoff}</span>
        <span className="chip"><Ticket size={14} /> {copy.savedTickets}</span>
      </div>
    </section>
  );
}
