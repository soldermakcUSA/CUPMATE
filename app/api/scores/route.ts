import type { LiveMatchScore, LiveScoresResponse, LiveScoreStatus } from "@/lib/live-scores";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const API_FOOTBALL_BASE_URL = "https://v3.football.api-sports.io";
const ESPN_SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=200";
const SCORE_CACHE_MS = 15_000;

let cachedScores: { expiresAt: number; payload: LiveScoresResponse } | null = null;

export async function GET() {
  if (cachedScores && Date.now() < cachedScores.expiresAt) {
    return json(cachedScores.payload);
  }

  const updatedAt = new Date().toISOString();
  const apiSportsKey = process.env.FOOTBALL_API_KEY ?? process.env.APISPORTS_API_KEY ?? process.env.API_FOOTBALL_KEY;

  try {
    const scores = apiSportsKey ? await fetchApiFootballScores(apiSportsKey, updatedAt) : await fetchEspnScores(updatedAt);
    const payload: LiveScoresResponse = {
      updatedAt,
      source: apiSportsKey ? "api-football" : "espn",
      scores
    };
    cachedScores = { expiresAt: Date.now() + SCORE_CACHE_MS, payload };
    return json(payload);
  } catch (error) {
    if (apiSportsKey) {
      try {
        const scores = await fetchEspnScores(updatedAt);
        const payload: LiveScoresResponse = { updatedAt, source: "espn", scores };
        cachedScores = { expiresAt: Date.now() + SCORE_CACHE_MS, payload };
        return json(payload);
      } catch {
        console.warn("Unable to load ESPN fallback scores after API-Football failed.", error);
      }
    } else {
      console.warn("Unable to load ESPN live scores.", error);
    }

    return json({ updatedAt, source: apiSportsKey ? "api-football" : "espn", scores: [] }, 502);
  }
}

function json(payload: LiveScoresResponse, status = 200) {
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0"
    }
  });
}

async function fetchApiFootballScores(apiKey: string, updatedAt: string): Promise<LiveMatchScore[]> {
  const response = await fetch(`${API_FOOTBALL_BASE_URL}/fixtures?league=1&season=2026`, {
    headers: {
      "x-apisports-key": apiKey
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`API-Football score request failed: ${response.status}`);
  }

  const payload = (await response.json()) as ApiFootballFixturesResponse;
  return (payload.response ?? []).map((fixture) => {
    const status = mapApiFootballStatus(fixture.fixture.status.short);
    const isScheduled = status === "scheduled";

    return {
      id: String(fixture.fixture.id),
      homeCode: fixture.teams.home.code ?? codeFromName(fixture.teams.home.name),
      awayCode: fixture.teams.away.code ?? codeFromName(fixture.teams.away.name),
      homeName: fixture.teams.home.name,
      awayName: fixture.teams.away.name,
      homeScore: isScheduled ? null : numberOrNull(fixture.goals.home),
      awayScore: isScheduled ? null : numberOrNull(fixture.goals.away),
      status,
      statusText: fixture.fixture.status.short || fixture.fixture.status.long || "Scheduled",
      clock: formatElapsed(fixture.fixture.status.elapsed, fixture.fixture.status.extra),
      kickoffAt: fixture.fixture.date,
      source: "api-football",
      updatedAt
    };
  });
}

async function fetchEspnScores(updatedAt: string): Promise<LiveMatchScore[]> {
  const response = await fetch(ESPN_SCOREBOARD_URL, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`ESPN score request failed: ${response.status}`);
  }

  const payload = (await response.json()) as EspnScoreboardResponse;
  return (payload.events ?? []).flatMap((event) => {
    const competition = event.competitions?.[0];
    if (!competition) return [];

    const home = competition.competitors.find((competitor) => competitor.homeAway === "home");
    const away = competition.competitors.find((competitor) => competitor.homeAway === "away");
    if (!home || !away) return [];

    const status = mapEspnStatus(competition.status.type.state, competition.status.type.name, competition.status.type.shortDetail);
    const isScheduled = status === "scheduled";

    return [{
      id: event.id,
      homeCode: home.team.abbreviation,
      awayCode: away.team.abbreviation,
      homeName: home.team.displayName,
      awayName: away.team.displayName,
      homeScore: isScheduled ? null : numberOrNull(home.score),
      awayScore: isScheduled ? null : numberOrNull(away.score),
      status,
      statusText: competition.status.type.shortDetail || competition.status.type.detail || competition.status.type.description,
      clock: status === "live" || status === "halftime" ? competition.status.displayClock : undefined,
      kickoffAt: event.date,
      source: "espn",
      updatedAt
    } satisfies LiveMatchScore];
  });
}

function mapApiFootballStatus(status: string): LiveScoreStatus {
  if (["TBD", "NS"].includes(status)) return "scheduled";
  if (status === "HT") return "halftime";
  if (["1H", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"].includes(status)) return "live";
  if (["FT", "AET", "PEN"].includes(status)) return "finished";
  if (["PST", "CANC", "ABD", "AWD", "WO"].includes(status)) return "postponed";
  return "unknown";
}

function mapEspnStatus(state: string, name: string, shortDetail: string): LiveScoreStatus {
  if (state === "pre") return "scheduled";
  if (state === "post") return "finished";
  if (shortDetail === "HT" || name === "STATUS_HALFTIME") return "halftime";
  if (state === "in") return "live";
  return "unknown";
}

function codeFromName(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function numberOrNull(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatElapsed(elapsed: number | null, extra: number | null) {
  if (elapsed === null) return undefined;
  return extra ? `${elapsed}+${extra}'` : `${elapsed}'`;
}

type ApiFootballFixturesResponse = {
  response?: Array<{
    fixture: {
      id: number;
      date: string;
      status: {
        long: string;
        short: string;
        elapsed: number | null;
        extra: number | null;
      };
    };
    teams: {
      home: { name: string; code: string | null };
      away: { name: string; code: string | null };
    };
    goals: {
      home: number | null;
      away: number | null;
    };
  }>;
};

type EspnScoreboardResponse = {
  events?: Array<{
    id: string;
    date: string;
    competitions?: Array<{
      status: {
        displayClock?: string;
        type: {
          state: string;
          name: string;
          description: string;
          detail: string;
          shortDetail: string;
        };
      };
      competitors: Array<{
        homeAway: "home" | "away";
        score: string;
        team: {
          abbreviation: string;
          displayName: string;
        };
      }>;
    }>;
  }>;
};
