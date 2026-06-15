import Link from "next/link";
import { CalendarDays, Clock, MapPin, Plus, Trophy } from "lucide-react";
import { MatchScoreBadge } from "@/components/MatchScoreBadge";
import { TeamLabel } from "@/components/TeamFlag";
import { translations, type Locale } from "@/lib/i18n";
import { findMatchDetail } from "@/lib/match-details";
import { getMatchTimeline, getMatchTimelineGroups, matchTimelineCopy, selectFeaturedMatch } from "@/lib/match-timeline";
import type { MatchCardData } from "@/lib/world-cup-data";

type Translation = typeof translations.en;

type MatchesPanelProps = {
  t: Translation;
  matches: MatchCardData[];
  locale?: Locale;
};

export function MatchesPanel({ t, matches, locale = "en" }: MatchesPanelProps) {
  const now = new Date();
  const copy = matchTimelineCopy(locale);
  const featuredMatch = selectFeaturedMatch(matches, now);
  const groups = getMatchTimelineGroups(matches, locale, now);

  if (!featuredMatch) return null;

  return (
    <section className="section-card menu-panel matches-panel" aria-labelledby="matches-panel-title">
      <div className="section-head">
        <div>
          <p className="small muted menu-panel-kicker">{copy.title}</p>
          <h2 id="matches-panel-title">{t.matches}</h2>
        </div>
        <Link className="link-button" href="/world-cup-2026-schedule">{t.viewFullSchedule}</Link>
      </div>

      <div className="matches-panel-hero">
        <div>
          <span className="tag">{featuredMatch.group}</span>
          <h3>{featuredMatch.home} {t.versus} {featuredMatch.away}</h3>
          <MatchScoreBadge match={featuredMatch} variant="hero" locale={locale} />
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

      <div className="match-timeline-summary" aria-label={copy.title}>
        {groups.map((group) => (
          <span className={`match-timeline-stat is-${group.bucket}`} key={group.bucket}>
            <strong>{group.matches.length}</strong>
            {group.label}
          </span>
        ))}
      </div>

      <div className="match-timeline-groups">
        {groups.map((group) => (
          <section className="match-timeline-section" key={group.bucket} aria-labelledby={`matches-${group.bucket}`}>
            <div className="match-timeline-head">
              <h3 id={`matches-${group.bucket}`}>{group.label}</h3>
              <span>{group.matches.length}</span>
            </div>
            {group.matches.length > 0 ? (
              <div className="match-row" aria-label={group.label}>
                {group.matches.map((match) => {
                  const timeline = getMatchTimeline(match, locale, now);
                  const hasDetail = Boolean(findMatchDetail(match.slug));
                  return (
                    <article className={`match-card matches-panel-card is-${timeline.bucket}`} key={`${match.kickoffAt}-${match.home}-${match.away}`}>
                      <div className="matches-panel-meta">
                        <span className="tag">{match.group}</span>
                        <Trophy size={16} aria-hidden="true" />
                      </div>
                      <div className="match-flags">
                        <span><TeamLabel value={match.home} /></span>
                        <span className="small">{t.versus}</span>
                        <span><TeamLabel value={match.away} /></span>
                      </div>
                      <MatchScoreBadge match={match} locale={locale} />
                      <p className="small muted">{match.date} · {match.time}</p>
                      <p className="small muted">{match.venue}</p>
                      <Link className="link-button matches-panel-action" href={hasDetail ? `/matches/${match.slug}` : "/world-cup-2026-schedule"}>
                        <Plus size={15} aria-hidden="true" /> {hasDetail ? t.seeDetails : t.viewFullSchedule}
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="small muted match-timeline-empty">{group.emptyLabel}</p>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}
