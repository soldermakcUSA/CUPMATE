"use client";

import Link from "next/link";
import { CheckCircle2, Clock3, Radio, Trophy } from "lucide-react";
import { TeamFlag } from "@/components/TeamFlag";
import { buildKnockoutBracket, type KnockoutMatch } from "@/lib/knockout-bracket";
import type { Locale } from "@/lib/i18n";
import type { LiveMatchScore } from "@/lib/live-scores";

type KnockoutBracketProps = {
  liveScores: LiveMatchScore[];
  locale?: Locale;
  compact?: boolean;
};

const copy = {
  en: {
    title: "Knockout bracket",
    subtitle: "Round of 32 through the MetLife final",
    source: "Live source",
    updated: "updated",
    next: "Next",
    live: "Live",
    finished: "Finished",
    scheduled: "Scheduled",
    winner: "Winner",
    champion: "Champion path",
    noChampion: "Champion pending",
    match: "M",
    details: "Details"
  },
  ru: {
    title: "Турнирная сетка",
    subtitle: "От 1/16 финала до финала на MetLife",
    source: "Live-источник",
    updated: "обновлено",
    next: "Дальше",
    live: "Live",
    finished: "Завершен",
    scheduled: "По расписанию",
    winner: "Победитель",
    champion: "Путь чемпиона",
    noChampion: "Чемпион ожидается",
    match: "M",
    details: "Детали"
  }
};

export function KnockoutBracket({ liveScores, locale = "en", compact = false }: KnockoutBracketProps) {
  const stages = buildKnockoutBracket(liveScores, locale);
  const matches = stages.flatMap((stage) => stage.matches);
  const finalMatch = matches.find((match) => match.number === 104);
  const champion = finalMatch?.winnerCode
    ? finalMatch.homeTeam?.code === finalMatch.winnerCode
      ? finalMatch.homeTeam
      : finalMatch.awayTeam?.code === finalMatch.winnerCode
        ? finalMatch.awayTeam
        : undefined
    : undefined;
  const activeMatch = matches.find((match) => match.isLive) ?? matches.find((match) => !match.isFinished);
  const lastUpdated = latestScoreUpdate(liveScores);
  const t = locale === "ru" ? copy.ru : copy.en;

  return (
    <section className={`section-card knockout-card ${compact ? "is-compact" : ""}`} aria-labelledby="knockout-bracket-title">
      <div className="knockout-head">
        <div>
          <p className="small muted menu-panel-kicker">{t.champion}</p>
          <h2 id="knockout-bracket-title">{t.title}</h2>
          <p className="small muted knockout-subtitle">{t.subtitle}</p>
        </div>
        <div className="knockout-live-chip">
          {hasLiveMatch(matches) ? <Radio size={15} aria-hidden="true" /> : <Clock3 size={15} aria-hidden="true" />}
          <span>{t.source}: ESPN</span>
          {lastUpdated && <small>{t.updated} {lastUpdated}</small>}
        </div>
      </div>

      <div className="knockout-summary">
        <div className="knockout-champion">
          <Trophy size={22} aria-hidden="true" />
          <div>
            <span>{champion ? t.winner : t.noChampion}</span>
            <strong>{champion ? `${champion.flag} ${champion.name}` : activeMatch ? `${t.next}: M${activeMatch.number}` : t.scheduled}</strong>
          </div>
        </div>
        {activeMatch && (
          <div className="knockout-next">
            <span>{activeMatch.isLive ? t.live : t.next}</span>
            <strong>{activeMatch.homeLabel} vs {activeMatch.awayLabel}</strong>
            <small>{formatDateTime(activeMatch.kickoffAt, locale)} · {activeMatch.venue}</small>
          </div>
        )}
      </div>

      <div className="knockout-scroll" role="group" aria-label={t.title}>
        <div className="knockout-grid">
          {stages.map((stage) => (
            <div className={`knockout-stage is-${stage.round}`} key={stage.round}>
              <div className="knockout-stage-head">
                <strong>{stage.label}</strong>
                <span>{stage.shortLabel}</span>
              </div>
              <div className="knockout-stage-matches">
                {stage.matches.map((match) => (
                  <KnockoutMatchCard key={match.number} match={match} locale={locale} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KnockoutMatchCard({ match, locale }: { match: KnockoutMatch; locale: Locale }) {
  const t = locale === "ru" ? copy.ru : copy.en;
  const status = match.isLive
    ? match.score?.clock ?? match.score?.statusText ?? t.live
    : match.isFinished
      ? match.score?.statusText ?? t.finished
      : t.scheduled;

  return (
    <article className={`knockout-match ${match.isLive ? "is-live" : ""} ${match.isFinished ? "is-finished" : ""}`}>
      <div className="knockout-match-top">
        <span>{t.match}{match.number}</span>
        <strong>{status}</strong>
      </div>
      <TeamRow match={match} side="home" />
      <TeamRow match={match} side="away" />
      <div className="knockout-match-meta">
        <span>{formatDateTime(match.kickoffAt, locale)}</span>
        <span>{match.venue}</span>
      </div>
      <Link className="knockout-details-link" href={`/matches/${match.slug}`}>
        {t.details}
      </Link>
    </article>
  );
}

function TeamRow({ match, side }: { match: KnockoutMatch; side: "home" | "away" }) {
  const team = side === "home" ? match.homeTeam : match.awayTeam;
  const label = side === "home" ? match.homeLabel : match.awayLabel;
  const score = side === "home" ? match.score?.home : match.score?.away;
  const isWinner = team?.code && match.winnerCode === team.code;
  const teamName = team ? team.name : label;

  return (
    <div className={`knockout-team ${isWinner ? "is-winner" : ""}`}>
      <span className="knockout-team-flag">
        {team ? <TeamFlag team={team.name} fallback={team.flag} className="knockout-flag-media" /> : <span aria-hidden="true">•</span>}
      </span>
      <span className="knockout-team-name">
        <strong>{team ? team.code : label}</strong>
        {team && <small>{teamName}</small>}
      </span>
      <span className="knockout-score">
        {typeof score === "number" ? score : isWinner ? <CheckCircle2 size={16} aria-hidden="true" /> : ""}
      </span>
    </div>
  );
}

function hasLiveMatch(matches: KnockoutMatch[]) {
  return matches.some((match) => match.isLive);
}

function latestScoreUpdate(scores: LiveMatchScore[]) {
  const latest = scores
    .map((score) => new Date(score.updatedAt).getTime())
    .filter(Number.isFinite)
    .sort((a, b) => b - a)[0];

  if (!latest) return null;
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(latest);
}

function formatDateTime(value: string, locale: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
