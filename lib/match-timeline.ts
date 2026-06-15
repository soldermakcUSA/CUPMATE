import type { Locale } from "@/lib/i18n";
import type { MatchCardData } from "@/lib/world-cup-data";

export type MatchTimelineBucket = "current" | "future" | "past";

export type MatchTimelineInfo = {
  bucket: MatchTimelineBucket;
  label: string;
  detail: string;
  sortTime: number;
  hasScore: boolean;
};

type TimelineCopy = {
  title: string;
  todayTitle: string;
  current: string;
  future: string;
  past: string;
  noCurrent: string;
  noFuture: string;
  noPast: string;
  live: string;
  upcoming: string;
  finished: string;
  scheduled: string;
  inProgress: string;
  scorePending: string;
  postponed: string;
  unknown: string;
};

const MATCH_WINDOW_MS = 150 * 60 * 1000;

const copyByLocale: Partial<Record<Locale, TimelineCopy>> = {
  en: {
    title: "Match timeline",
    todayTitle: "Matches Today",
    current: "Current matches",
    future: "Upcoming matches",
    past: "Finished matches",
    noCurrent: "No match is live right now.",
    noFuture: "No upcoming matches are listed.",
    noPast: "No finished matches yet.",
    live: "Live",
    upcoming: "Upcoming",
    finished: "FT",
    scheduled: "Kickoff set",
    inProgress: "In progress",
    scorePending: "Score pending",
    postponed: "Postponed",
    unknown: "Status pending"
  },
  ru: {
    title: "Лента матчей",
    todayTitle: "Матчи сегодня",
    current: "Текущие матчи",
    future: "Будущие матчи",
    past: "Прошедшие матчи",
    noCurrent: "Сейчас нет live-матчей.",
    noFuture: "Будущие матчи не найдены.",
    noPast: "Прошедших матчей пока нет.",
    live: "Live",
    upcoming: "Скоро",
    finished: "FT",
    scheduled: "Начало запланировано",
    inProgress: "Идет матч",
    scorePending: "Счет ожидается",
    postponed: "Перенесен",
    unknown: "Статус ожидается"
  }
};

export function matchTimelineCopy(locale: Locale = "en") {
  return copyByLocale[locale] ?? copyByLocale.en!;
}

export function getMatchTimeline(match: MatchCardData, locale: Locale = "en", now = new Date()): MatchTimelineInfo {
  const copy = matchTimelineCopy(locale);
  const kickoffTime = getMatchTime(match);
  const hasScore = typeof match.score?.home === "number" && typeof match.score.away === "number";
  const sortTime = kickoffTime?.getTime() ?? Number.MAX_SAFE_INTEGER;

  if (match.score?.status === "live" || match.score?.status === "halftime") {
    return {
      bucket: "current",
      label: match.score.clock ?? match.score.statusText ?? copy.live,
      detail: hasScore ? `${match.score.home} - ${match.score.away}` : copy.inProgress,
      sortTime,
      hasScore
    };
  }

  if (match.score?.status === "finished") {
    return {
      bucket: "past",
      label: match.score.statusText || copy.finished,
      detail: hasScore ? `${match.score.home} - ${match.score.away}` : copy.scorePending,
      sortTime,
      hasScore
    };
  }

  if (match.score?.status === "postponed") {
    return {
      bucket: "future",
      label: match.score.statusText || copy.postponed,
      detail: copy.postponed,
      sortTime,
      hasScore
    };
  }

  if (kickoffTime) {
    const elapsed = now.getTime() - kickoffTime.getTime();
    if (elapsed >= 0 && elapsed <= MATCH_WINDOW_MS) {
      return {
        bucket: "current",
        label: copy.live,
        detail: copy.inProgress,
        sortTime,
        hasScore: false
      };
    }

    if (elapsed > MATCH_WINDOW_MS) {
      return {
        bucket: "past",
        label: copy.finished,
        detail: copy.scorePending,
        sortTime,
        hasScore: false
      };
    }
  }

  return {
    bucket: "future",
    label: copy.upcoming,
    detail: copy.scheduled,
    sortTime,
    hasScore: false
  };
}

export function getMatchTimelineGroups(matches: MatchCardData[], locale: Locale = "en", now = new Date()) {
  const copy = matchTimelineCopy(locale);
  const groups = {
    current: [] as MatchCardData[],
    future: [] as MatchCardData[],
    past: [] as MatchCardData[]
  };

  matches.forEach((match) => {
    groups[getMatchTimeline(match, locale, now).bucket].push(match);
  });

  return [
    { bucket: "current" as const, label: copy.current, emptyLabel: copy.noCurrent, matches: sortMatches(groups.current, "asc") },
    { bucket: "future" as const, label: copy.future, emptyLabel: copy.noFuture, matches: sortMatches(groups.future, "asc") },
    { bucket: "past" as const, label: copy.past, emptyLabel: copy.noPast, matches: sortMatches(groups.past, "desc") }
  ];
}

export function getCurrentDayMatches(matches: MatchCardData[], now = new Date()) {
  return sortMatches(matches.filter((match) => isSameLocalDay(getMatchTime(match), now)), "asc");
}

export function getNextMatchDayMatches(matches: MatchCardData[], now = new Date()) {
  const futureOrCurrent = sortMatches(
    matches.filter((match) => getMatchTimeline(match, "en", now).bucket !== "past"),
    "asc"
  );
  const firstMatchTime = getMatchTime(futureOrCurrent[0]);
  if (!firstMatchTime) {
    const latestMatchTime = getMatchTime(sortMatches(matches, "desc")[0]);
    return latestMatchTime ? sortMatches(matches.filter((match) => isSameLocalDay(getMatchTime(match), latestMatchTime)), "asc") : [];
  }

  return sortMatches(matches.filter((match) => isSameLocalDay(getMatchTime(match), firstMatchTime)), "asc");
}

export function selectFeaturedMatch(matches: MatchCardData[], now = new Date()) {
  const groups = getMatchTimelineGroups(matches, "en", now);
  return groups[0].matches[0] ?? groups[1].matches[0] ?? groups[2].matches[0] ?? matches[0];
}

export function getMatchTime(match: MatchCardData) {
  if (!match?.kickoffAt) return null;
  const value = new Date(match.kickoffAt);
  return Number.isNaN(value.getTime()) ? null : value;
}

export function sortMatches(matches: MatchCardData[], direction: "asc" | "desc" = "asc") {
  return [...matches].sort((a, b) => {
    const aTime = getMatchTime(a)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const bTime = getMatchTime(b)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    return direction === "asc" ? aTime - bTime : bTime - aTime;
  });
}

function isSameLocalDay(matchTime: Date | null, day: Date) {
  if (!matchTime) return false;
  return (
    matchTime.getFullYear() === day.getFullYear() &&
    matchTime.getMonth() === day.getMonth() &&
    matchTime.getDate() === day.getDate()
  );
}
