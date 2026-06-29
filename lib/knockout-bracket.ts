import type { Locale } from "@/lib/i18n";
import { localizedDateFormatterLocale } from "@/lib/content-localization";
import { localizeTeamName, localizeVenue } from "@/lib/localized-static-data";
import type { LiveMatchScore, LiveScoreStatus } from "@/lib/live-scores";
import type { MatchCardData } from "@/lib/world-cup-data";

export type KnockoutRound = "round-of-32" | "round-of-16" | "quarterfinals" | "semifinals" | "third-place" | "final";

export type KnockoutTeam = {
  code: string;
  name: string;
  flag: string;
};

export type KnockoutSlot = {
  teamCode?: string;
  winnerOf?: number;
  loserOf?: number;
};

export type KnockoutMatch = {
  number: number;
  eventId: string;
  round: KnockoutRound;
  slug: string;
  kickoffAt: string;
  venue: string;
  city: string;
  homeSlot: KnockoutSlot;
  awaySlot: KnockoutSlot;
  homeTeam?: KnockoutTeam;
  awayTeam?: KnockoutTeam;
  homeLabel: string;
  awayLabel: string;
  score?: {
    home: number;
    away: number;
    status: Exclude<LiveScoreStatus, "scheduled">;
    statusText: string;
    clock?: string;
    updatedAt: string;
  };
  winnerCode?: string;
  loserCode?: string;
  isLive: boolean;
  isFinished: boolean;
};

export type KnockoutStage = {
  round: KnockoutRound;
  label: string;
  shortLabel: string;
  matches: KnockoutMatch[];
};

const teams: Record<string, KnockoutTeam> = {
  RSA: { code: "RSA", name: "South Africa", flag: "🇿🇦" },
  CAN: { code: "CAN", name: "Canada", flag: "🇨🇦" },
  BRA: { code: "BRA", name: "Brazil", flag: "🇧🇷" },
  JPN: { code: "JPN", name: "Japan", flag: "🇯🇵" },
  GER: { code: "GER", name: "Germany", flag: "🇩🇪" },
  PAR: { code: "PAR", name: "Paraguay", flag: "🇵🇾" },
  NED: { code: "NED", name: "Netherlands", flag: "🇳🇱" },
  MAR: { code: "MAR", name: "Morocco", flag: "🇲🇦" },
  CIV: { code: "CIV", name: "Ivory Coast", flag: "🇨🇮" },
  NOR: { code: "NOR", name: "Norway", flag: "🇳🇴" },
  FRA: { code: "FRA", name: "France", flag: "🇫🇷" },
  SWE: { code: "SWE", name: "Sweden", flag: "🇸🇪" },
  MEX: { code: "MEX", name: "Mexico", flag: "🇲🇽" },
  ECU: { code: "ECU", name: "Ecuador", flag: "🇪🇨" },
  ENG: { code: "ENG", name: "England", flag: "🏴" },
  COD: { code: "COD", name: "Congo DR", flag: "🇨🇩" },
  BEL: { code: "BEL", name: "Belgium", flag: "🇧🇪" },
  SEN: { code: "SEN", name: "Senegal", flag: "🇸🇳" },
  USA: { code: "USA", name: "United States", flag: "🇺🇸" },
  BIH: { code: "BIH", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  ESP: { code: "ESP", name: "Spain", flag: "🇪🇸" },
  AUT: { code: "AUT", name: "Austria", flag: "🇦🇹" },
  POR: { code: "POR", name: "Portugal", flag: "🇵🇹" },
  CRO: { code: "CRO", name: "Croatia", flag: "🇭🇷" },
  SUI: { code: "SUI", name: "Switzerland", flag: "🇨🇭" },
  ALG: { code: "ALG", name: "Algeria", flag: "🇩🇿" },
  AUS: { code: "AUS", name: "Australia", flag: "🇦🇺" },
  EGY: { code: "EGY", name: "Egypt", flag: "🇪🇬" },
  ARG: { code: "ARG", name: "Argentina", flag: "🇦🇷" },
  CPV: { code: "CPV", name: "Cape Verde", flag: "🇨🇻" },
  COL: { code: "COL", name: "Colombia", flag: "🇨🇴" },
  GHA: { code: "GHA", name: "Ghana", flag: "🇬🇭" }
};

const roundOrder: KnockoutRound[] = ["round-of-32", "round-of-16", "quarterfinals", "semifinals", "third-place", "final"];

const roundCopy: Record<"en" | "ru", Record<KnockoutRound, { label: string; short: string }>> = {
  en: {
    "round-of-32": { label: "Round of 32", short: "R32" },
    "round-of-16": { label: "Round of 16", short: "R16" },
    quarterfinals: { label: "Quarterfinals", short: "QF" },
    semifinals: { label: "Semifinals", short: "SF" },
    "third-place": { label: "Third-place match", short: "3rd" },
    final: { label: "Final", short: "Final" }
  },
  ru: {
    "round-of-32": { label: "1/16 финала", short: "1/16" },
    "round-of-16": { label: "1/8 финала", short: "1/8" },
    quarterfinals: { label: "Четвертьфиналы", short: "1/4" },
    semifinals: { label: "Полуфиналы", short: "1/2" },
    "third-place": { label: "Матч за 3-е место", short: "3-е" },
    final: { label: "Финал", short: "Финал" }
  }
};

const matchSeeds: Array<Omit<KnockoutMatch, "homeTeam" | "awayTeam" | "homeLabel" | "awayLabel" | "score" | "winnerCode" | "loserCode" | "isLive" | "isFinished">> = [
  knockoutMatch(73, "760486", "round-of-32", "2026-06-28T19:00:00.000Z", "SoFi Stadium", "Inglewood, California", teamSlot("RSA"), teamSlot("CAN")),
  knockoutMatch(74, "760489", "round-of-32", "2026-06-29T20:30:00.000Z", "Gillette Stadium", "Foxborough, Massachusetts", teamSlot("GER"), teamSlot("PAR")),
  knockoutMatch(75, "760488", "round-of-32", "2026-06-30T01:00:00.000Z", "Estadio BBVA", "Guadalupe", teamSlot("NED"), teamSlot("MAR")),
  knockoutMatch(76, "760487", "round-of-32", "2026-06-29T17:00:00.000Z", "NRG Stadium", "Houston, Texas", teamSlot("BRA"), teamSlot("JPN")),
  knockoutMatch(77, "760492", "round-of-32", "2026-06-30T21:00:00.000Z", "MetLife Stadium", "East Rutherford, New Jersey", teamSlot("FRA"), teamSlot("SWE")),
  knockoutMatch(78, "760490", "round-of-32", "2026-06-30T17:00:00.000Z", "AT&T Stadium", "Arlington, Texas", teamSlot("CIV"), teamSlot("NOR")),
  knockoutMatch(79, "760491", "round-of-32", "2026-07-01T01:00:00.000Z", "Estadio Banorte", "Mexico City", teamSlot("MEX"), teamSlot("ECU")),
  knockoutMatch(80, "760495", "round-of-32", "2026-07-01T16:00:00.000Z", "Mercedes-Benz Stadium", "Atlanta, Georgia", teamSlot("ENG"), teamSlot("COD")),
  knockoutMatch(81, "760494", "round-of-32", "2026-07-02T00:00:00.000Z", "Levi's Stadium", "Santa Clara, California", teamSlot("USA"), teamSlot("BIH")),
  knockoutMatch(82, "760493", "round-of-32", "2026-07-01T20:00:00.000Z", "Lumen Field", "Seattle, Washington", teamSlot("BEL"), teamSlot("SEN")),
  knockoutMatch(83, "760496", "round-of-32", "2026-07-02T23:00:00.000Z", "BMO Field", "Toronto", teamSlot("POR"), teamSlot("CRO")),
  knockoutMatch(84, "760497", "round-of-32", "2026-07-02T19:00:00.000Z", "SoFi Stadium", "Inglewood, California", teamSlot("ESP"), teamSlot("AUT")),
  knockoutMatch(85, "760498", "round-of-32", "2026-07-03T03:00:00.000Z", "BC Place", "Vancouver", teamSlot("SUI"), teamSlot("ALG")),
  knockoutMatch(86, "760500", "round-of-32", "2026-07-03T22:00:00.000Z", "Hard Rock Stadium", "Miami Gardens, Florida", teamSlot("ARG"), teamSlot("CPV")),
  knockoutMatch(87, "760501", "round-of-32", "2026-07-04T01:30:00.000Z", "GEHA Field at Arrowhead Stadium", "Kansas City, Missouri", teamSlot("COL"), teamSlot("GHA")),
  knockoutMatch(88, "760499", "round-of-32", "2026-07-03T18:00:00.000Z", "AT&T Stadium", "Arlington, Texas", teamSlot("AUS"), teamSlot("EGY")),
  knockoutMatch(89, "760502", "round-of-16", "2026-07-04T17:00:00.000Z", "NRG Stadium", "Houston, Texas", winnerSlot(73), winnerSlot(75)),
  knockoutMatch(90, "760503", "round-of-16", "2026-07-04T21:00:00.000Z", "Lincoln Financial Field", "Philadelphia, Pennsylvania", winnerSlot(74), winnerSlot(77)),
  knockoutMatch(91, "760504", "round-of-16", "2026-07-05T20:00:00.000Z", "MetLife Stadium", "East Rutherford, New Jersey", winnerSlot(76), winnerSlot(78)),
  knockoutMatch(92, "760505", "round-of-16", "2026-07-06T00:00:00.000Z", "Estadio Banorte", "Mexico City", winnerSlot(79), winnerSlot(80)),
  knockoutMatch(93, "760506", "round-of-16", "2026-07-06T19:00:00.000Z", "AT&T Stadium", "Arlington, Texas", winnerSlot(83), winnerSlot(84)),
  knockoutMatch(94, "760507", "round-of-16", "2026-07-07T00:00:00.000Z", "Lumen Field", "Seattle, Washington", winnerSlot(81), winnerSlot(82)),
  knockoutMatch(95, "760509", "round-of-16", "2026-07-07T16:00:00.000Z", "Mercedes-Benz Stadium", "Atlanta, Georgia", winnerSlot(86), winnerSlot(88)),
  knockoutMatch(96, "760508", "round-of-16", "2026-07-07T20:00:00.000Z", "BC Place", "Vancouver", winnerSlot(85), winnerSlot(87)),
  knockoutMatch(97, "760510", "quarterfinals", "2026-07-09T20:00:00.000Z", "Gillette Stadium", "Foxborough, Massachusetts", winnerSlot(89), winnerSlot(90)),
  knockoutMatch(98, "760511", "quarterfinals", "2026-07-10T19:00:00.000Z", "SoFi Stadium", "Inglewood, California", winnerSlot(93), winnerSlot(94)),
  knockoutMatch(99, "760512", "quarterfinals", "2026-07-11T21:00:00.000Z", "Hard Rock Stadium", "Miami Gardens, Florida", winnerSlot(91), winnerSlot(92)),
  knockoutMatch(100, "760513", "quarterfinals", "2026-07-12T01:00:00.000Z", "GEHA Field at Arrowhead Stadium", "Kansas City, Missouri", winnerSlot(95), winnerSlot(96)),
  knockoutMatch(101, "760514", "semifinals", "2026-07-14T19:00:00.000Z", "AT&T Stadium", "Arlington, Texas", winnerSlot(97), winnerSlot(98)),
  knockoutMatch(102, "760515", "semifinals", "2026-07-15T19:00:00.000Z", "Mercedes-Benz Stadium", "Atlanta, Georgia", winnerSlot(99), winnerSlot(100)),
  knockoutMatch(103, "760516", "third-place", "2026-07-18T21:00:00.000Z", "Hard Rock Stadium", "Miami Gardens, Florida", loserSlot(101), loserSlot(102)),
  knockoutMatch(104, "760517", "final", "2026-07-19T19:00:00.000Z", "MetLife Stadium", "East Rutherford, New Jersey", winnerSlot(101), winnerSlot(102))
];

export function buildKnockoutBracket(scores: LiveMatchScore[] = [], locale: Locale = "en"): KnockoutStage[] {
  const matchesByNumber = new Map<number, KnockoutMatch>();
  const scoreByEventId = new Map(scores.map((score) => [score.id, score]));
  const scoreByPair = new Map(scores.map((score) => [scorePairKey(score.homeCode, score.awayCode), score]));

  for (const seed of matchSeeds) {
    const homeTeam = resolveSlot(seed.homeSlot, matchesByNumber);
    const awayTeam = resolveSlot(seed.awaySlot, matchesByNumber);
    const liveScore = findScoreForSeed(seed.eventId, homeTeam, awayTeam, scoreByEventId, scoreByPair);
    const score = toKnockoutScore(liveScore);
    const winnerCode = resolveWinnerCode(homeTeam, awayTeam, liveScore, score);
    const loserCode = resolveLoserCode(homeTeam, awayTeam, winnerCode, score);
    const match: KnockoutMatch = {
      ...seed,
      venue: localizeVenue(seed.venue, locale),
      city: localizeVenue(seed.city, locale),
      homeTeam: localizeTeam(homeTeam, locale),
      awayTeam: localizeTeam(awayTeam, locale),
      homeLabel: teamLabel(seed.homeSlot, homeTeam, locale),
      awayLabel: teamLabel(seed.awaySlot, awayTeam, locale),
      score,
      winnerCode,
      loserCode,
      isLive: liveScore?.status === "live" || liveScore?.status === "halftime",
      isFinished: liveScore?.status === "finished"
    };

    matchesByNumber.set(match.number, match);
  }

  return roundOrder.map((round) => ({
    round,
    label: getRoundLabel(round, locale),
    shortLabel: getRoundShortLabel(round, locale),
    matches: [...matchesByNumber.values()].filter((match) => match.round === round)
  }));
}

export function getKnockoutMatchCards(locale: Locale = "en", scores: LiveMatchScore[] = []): MatchCardData[] {
  return buildKnockoutBracket(scores, locale).flatMap((stage) =>
    stage.matches.map((match) => {
      const kickoff = new Date(match.kickoffAt);
      const home = match.homeTeam ? `${match.homeTeam.flag} ${match.homeTeam.code}` : match.homeLabel;
      const away = match.awayTeam ? `${match.awayTeam.flag} ${match.awayTeam.code}` : match.awayLabel;
      return {
        slug: match.slug,
        group: `${stage.label} · M${match.number}`,
        homeCode: match.homeTeam?.code,
        awayCode: match.awayTeam?.code,
        homeName: match.homeTeam?.name,
        awayName: match.awayTeam?.name,
        homeFlag: match.homeTeam?.flag,
        awayFlag: match.awayTeam?.flag,
        home,
        away,
        kickoffAt: match.kickoffAt,
        date: formatDate(kickoff, locale),
        time: formatTime(kickoff, locale),
        venue: [match.venue, match.city].filter(Boolean).join(", "),
        score: match.score
          ? {
              home: match.score.home,
              away: match.score.away,
              status: match.score.status,
              statusText: match.score.statusText,
              clock: match.score.clock,
              source: "espn",
              updatedAt: match.score.updatedAt
            }
          : undefined
      };
    })
  );
}

export function mergeMatchCards(primary: MatchCardData[], fallback: MatchCardData[]) {
  const seen = new Set(primary.map((match) => match.slug));
  return [...primary, ...fallback.filter((match) => !seen.has(match.slug))];
}

export function getRoundLabel(round: KnockoutRound, locale: Locale = "en") {
  return (locale === "ru" ? roundCopy.ru : roundCopy.en)[round].label;
}

export function getRoundShortLabel(round: KnockoutRound, locale: Locale = "en") {
  return (locale === "ru" ? roundCopy.ru : roundCopy.en)[round].short;
}

function knockoutMatch(
  number: number,
  eventId: string,
  round: KnockoutRound,
  kickoffAt: string,
  venue: string,
  city: string,
  homeSlot: KnockoutSlot,
  awaySlot: KnockoutSlot
) {
  return {
    number,
    eventId,
    round,
    slug: `world-cup-2026-match-${number}`,
    kickoffAt,
    venue,
    city,
    homeSlot,
    awaySlot
  };
}

function teamSlot(teamCode: string): KnockoutSlot {
  return { teamCode };
}

function winnerSlot(winnerOf: number): KnockoutSlot {
  return { winnerOf };
}

function loserSlot(loserOf: number): KnockoutSlot {
  return { loserOf };
}

function resolveSlot(slot: KnockoutSlot, matchesByNumber: Map<number, KnockoutMatch>): KnockoutTeam | undefined {
  if (slot.teamCode) return teams[slot.teamCode];

  const source = matchesByNumber.get(slot.winnerOf ?? slot.loserOf ?? -1);
  const code = slot.winnerOf ? source?.winnerCode : source?.loserCode;
  return code ? teams[code] ?? { code, name: code, flag: "" } : undefined;
}

function findScoreForSeed(
  eventId: string,
  homeTeam: KnockoutTeam | undefined,
  awayTeam: KnockoutTeam | undefined,
  scoreByEventId: Map<string, LiveMatchScore>,
  scoreByPair: Map<string, LiveMatchScore>
) {
  const byEventId = scoreByEventId.get(eventId);
  if (byEventId) return byEventId;
  if (!homeTeam || !awayTeam) return undefined;
  return scoreByPair.get(scorePairKey(homeTeam.code, awayTeam.code));
}

function toKnockoutScore(score: LiveMatchScore | undefined): KnockoutMatch["score"] {
  if (!score || score.homeScore === null || score.awayScore === null || score.status === "scheduled") return undefined;
  return {
    home: score.homeScore,
    away: score.awayScore,
    status: score.status,
    statusText: score.statusText,
    clock: score.clock,
    updatedAt: score.updatedAt
  };
}

function resolveWinnerCode(
  homeTeam: KnockoutTeam | undefined,
  awayTeam: KnockoutTeam | undefined,
  liveScore: LiveMatchScore | undefined,
  score: KnockoutMatch["score"]
) {
  const providerWinnerCode = liveScore?.winnerCode && teams[liveScore.winnerCode] ? liveScore.winnerCode : liveScore?.winnerCode;
  if (providerWinnerCode) return providerWinnerCode;
  if (!score || score.status !== "finished" || !homeTeam || !awayTeam || score.home === score.away) return undefined;

  const homeCode = liveScore?.homeCode ?? homeTeam.code;
  const awayCode = liveScore?.awayCode ?? awayTeam.code;
  return score.home > score.away ? homeCode : awayCode;
}

function resolveLoserCode(
  homeTeam: KnockoutTeam | undefined,
  awayTeam: KnockoutTeam | undefined,
  winnerCode: string | undefined,
  score: KnockoutMatch["score"]
) {
  if (!winnerCode || !score || score.status !== "finished") return undefined;
  if (homeTeam?.code === winnerCode) return awayTeam?.code;
  if (awayTeam?.code === winnerCode) return homeTeam?.code;
  return undefined;
}

function teamLabel(slot: KnockoutSlot, team: KnockoutTeam | undefined, locale: Locale) {
  if (team) return `${team.flag ? `${team.flag} ` : ""}${team.code}`;
  if (slot.winnerOf) return locale === "ru" ? `Победитель M${slot.winnerOf}` : `Winner M${slot.winnerOf}`;
  if (slot.loserOf) return locale === "ru" ? `Проигравший M${slot.loserOf}` : `Loser M${slot.loserOf}`;
  return "TBD";
}

function localizeTeam(team: KnockoutTeam | undefined, locale: Locale): KnockoutTeam | undefined {
  if (!team) return undefined;
  return {
    ...team,
    name: localizeTeamName(team.name, locale)
  };
}

function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(localizedDateFormatterLocale(locale), {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function formatTime(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(localizedDateFormatterLocale(locale), {
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function scorePairKey(homeCode: string, awayCode: string) {
  return `${homeCode.toUpperCase()}-${awayCode.toUpperCase()}`;
}
