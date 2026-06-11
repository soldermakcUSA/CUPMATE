import Link from "next/link";
import { CalendarDays, Clock, MapPin, Plus, Trophy } from "lucide-react";
import { MatchScoreBadge } from "@/components/MatchScoreBadge";
import { TeamLabel } from "@/components/TeamFlag";
import { translations } from "@/lib/i18n";
import type { MatchCardData } from "@/lib/world-cup-data";

type Translation = typeof translations.en;

type MatchesPanelProps = {
  t: Translation;
  matches: MatchCardData[];
};

export function MatchesPanel({ t, matches }: MatchesPanelProps) {
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
          <h3>{featuredMatch.home} {t.versus} {featuredMatch.away}</h3>
          <MatchScoreBadge match={featuredMatch} variant="hero" />
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
              <span><TeamLabel value={match.home} /></span>
              <span className="small">{t.versus}</span>
              <span><TeamLabel value={match.away} /></span>
            </div>
            <MatchScoreBadge match={match} />
            <p className="small muted">{match.date} · {match.time}</p>
            <p className="small muted">{match.venue}</p>
            <Link className="link-button matches-panel-action" href={`/matches/${match.slug}`}>
              <Plus size={15} aria-hidden="true" /> {t.seeDetails}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
