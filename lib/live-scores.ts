import type { MatchCardData } from "@/lib/world-cup-data";

export type LiveScoreStatus = "scheduled" | "live" | "halftime" | "finished" | "postponed" | "unknown";

export type LiveMatchScore = {
  id: string;
  homeCode: string;
  awayCode: string;
  homeName: string;
  awayName: string;
  homeScore: number | null;
  awayScore: number | null;
  status: LiveScoreStatus;
  statusText: string;
  clock?: string;
  kickoffAt?: string;
  source: "api-football" | "espn";
  updatedAt: string;
  statistics?: {
    home: LiveTeamStat[];
    away: LiveTeamStat[];
  };
  events?: LiveMatchEvent[];
  commentary?: LiveMatchEvent[];
};

export type LiveTeamStat = {
  name: string;
  label: string;
  abbreviation?: string;
  displayValue: string;
  value?: number | null;
};

export type LiveMatchEvent = {
  id: string;
  minute: string;
  type: string;
  kind: "goal" | "yellow-card" | "red-card" | "substitution" | "period" | "delay" | "commentary" | "other";
  text: string;
  teamCode?: string;
  teamName?: string;
  athletes: string[];
};

export type VisibleLiveMatchScore = LiveMatchScore & {
  homeScore: number;
  awayScore: number;
  status: Exclude<LiveScoreStatus, "scheduled">;
};

export type LiveScoresResponse = {
  updatedAt: string;
  source: "api-football" | "espn";
  scores: LiveMatchScore[];
};

export async function fetchLiveScores(): Promise<LiveMatchScore[]> {
  const response = await fetch("/api/scores", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load live scores: ${response.status}`);
  }

  const payload = (await response.json()) as LiveScoresResponse;
  return payload.scores;
}

export async function fetchLiveScoreDetails(eventId: string): Promise<LiveMatchScore | null> {
  const response = await fetch(`/api/scores?eventId=${encodeURIComponent(eventId)}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load live score details: ${response.status}`);
  }

  const payload = (await response.json()) as LiveScoresResponse;
  return payload.scores[0] ?? null;
}

export function mergeLiveScores(matches: MatchCardData[], scores: LiveMatchScore[]): MatchCardData[] {
  if (scores.length === 0) return matches;

  return matches.map((match) => {
    const homeCode = match.homeCode ?? extractTeamCode(match.home);
    const awayCode = match.awayCode ?? extractTeamCode(match.away);
    if (!homeCode || !awayCode) return match;

    const score = findLiveScoreByCodes(scores, homeCode, awayCode);
    if (!score) {
      return { ...match, score: undefined };
    }

    return {
      ...match,
      score: {
        home: score.homeScore,
        away: score.awayScore,
        status: score.status,
        statusText: score.statusText,
        clock: score.clock,
        source: score.source,
        updatedAt: score.updatedAt
      }
    };
  });
}

export function findLiveScoreByCodes(scores: LiveMatchScore[], homeCode: string, awayCode: string): VisibleLiveMatchScore | null {
  const score = scores.find((item) => scoreKey(item.homeCode, item.awayCode) === scoreKey(homeCode, awayCode));
  if (!score || !isVisibleLiveScore(score)) {
    return null;
  }

  return score;
}

function isVisibleLiveScore(score: LiveMatchScore): score is VisibleLiveMatchScore {
  return score.homeScore !== null && score.awayScore !== null && score.status !== "scheduled";
}

export function hasVisibleScore(match: MatchCardData) {
  return typeof match.score?.home === "number" && typeof match.score.away === "number";
}

function extractTeamCode(value: string) {
  const parts = value.match(/[A-Z]{2,4}/g);
  return parts?.at(-1) ?? null;
}

function scoreKey(homeCode: string, awayCode: string) {
  return `${homeCode.toUpperCase()}-${awayCode.toUpperCase()}`;
}
