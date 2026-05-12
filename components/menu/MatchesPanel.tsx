import { CalendarDays, Clock, MapPin, Plus, Trophy } from "lucide-react";
import { matches } from "@/lib/mock-data";
import { translations } from "@/lib/i18n";

type Translation = typeof translations.en;

type MatchesPanelProps = {
  t: Translation;
};

export function MatchesPanel({ t }: MatchesPanelProps) {
  const featuredMatch = matches[0];

  return (
    <section className="section-card menu-panel matches-panel" aria-labelledby="matches-panel-title">
      <div className="section-head">
        <div>
          <p className="small muted menu-panel-kicker">{t.nextMatches}</p>
          <h2 id="matches-panel-title">{t.matches}</h2>
        </div>
        <button className="link-button">{t.viewFullSchedule}</button>
      </div>

      <div className="matches-panel-hero">
        <div>
          <span className="tag">{featuredMatch.group}</span>
          <h3>{featuredMatch.home} vs {featuredMatch.away}</h3>
          <p className="small muted">
            <CalendarDays size={14} aria-hidden="true" /> {featuredMatch.date}
            <span aria-hidden="true"> · </span>
            <Clock size={14} aria-hidden="true" /> {featuredMatch.time}
          </p>
          <p className="small muted">
            <MapPin size={14} aria-hidden="true" /> {featuredMatch.venue}
          </p>
        </div>
        <button className="primary-button">{t.addItinerary}</button>
      </div>

      <div className="match-row" aria-label={t.nextMatches}>
        {matches.map((match) => (
          <article className="match-card matches-panel-card" key={`${match.home}-${match.away}`}>
            <div className="matches-panel-meta">
              <span className="tag">{match.group}</span>
              <Trophy size={16} aria-hidden="true" />
            </div>
            <div className="match-flags">
              <span>{match.home}</span>
              <span className="small">vs</span>
              <span>{match.away}</span>
            </div>
            <p className="small muted">{match.date} · {match.time}</p>
            <p className="small muted">{match.venue}</p>
            <button className="link-button matches-panel-action">
              <Plus size={15} aria-hidden="true" /> {t.addItinerary}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
