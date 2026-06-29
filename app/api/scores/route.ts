import type { LiveMatchEvent, LiveMatchScore, LiveScoresResponse, LiveScoreStatus, LiveTeamStat } from "@/lib/live-scores";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const API_FOOTBALL_BASE_URL = "https://v3.football.api-sports.io";
const ESPN_SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=200";
const ESPN_SUMMARY_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary";
const SCORE_CACHE_MS = 15_000;

let cachedScores: { expiresAt: number; payload: LiveScoresResponse } | null = null;
const cachedScoreDetails = new Map<string, { expiresAt: number; payload: LiveScoresResponse }>();

export async function GET(request: Request) {
  const eventId = new URL(request.url).searchParams.get("eventId");
  if (eventId) {
    const cached = cachedScoreDetails.get(eventId);
    if (cached && Date.now() < cached.expiresAt) {
      return json(cached.payload);
    }

    const updatedAt = new Date().toISOString();
    try {
      const score = await fetchEspnScoreDetails(eventId, updatedAt);
      const payload: LiveScoresResponse = { updatedAt, source: "espn", scores: score ? [score] : [] };
      cachedScoreDetails.set(eventId, { expiresAt: Date.now() + SCORE_CACHE_MS, payload });
      return json(payload, score ? 200 : 404);
    } catch (error) {
      console.warn("Unable to load ESPN score details.", error);
      return json({ updatedAt, source: "espn", scores: [] }, 502);
    }
  }

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
      winnerCode: fixture.teams.home.winner ? fixture.teams.home.code ?? codeFromName(fixture.teams.home.name) : fixture.teams.away.winner ? fixture.teams.away.code ?? codeFromName(fixture.teams.away.name) : undefined,
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
      winnerCode: home.winner ? home.team.abbreviation : away.winner ? away.team.abbreviation : undefined,
      source: "espn",
      updatedAt,
      statistics: buildEspnStatistics(home, away),
      events: mapEspnEvents(competition.details ?? [], teamCodeById([home, away]))
    } satisfies LiveMatchScore];
  });
}

async function fetchEspnScoreDetails(eventId: string, updatedAt: string): Promise<LiveMatchScore | null> {
  const response = await fetch(`${ESPN_SUMMARY_URL}?event=${encodeURIComponent(eventId)}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`ESPN summary request failed: ${response.status}`);
  }

  const payload = (await response.json()) as EspnSummaryResponse;
  const competition = payload.header?.competitions?.[0];
  if (!competition) return null;

  const home = competition.competitors.find((competitor) => competitor.homeAway === "home");
  const away = competition.competitors.find((competitor) => competitor.homeAway === "away");
  if (!home || !away) return null;

  const status = mapEspnStatus(competition.status.type.state, competition.status.type.name, competition.status.type.shortDetail);
  const isScheduled = status === "scheduled";
  const codeById = teamCodeById([home, away]);
  const boxscoreStats = buildEspnBoxscoreStatistics(payload.boxscore?.teams ?? [], home.team.abbreviation, away.team.abbreviation);

  return {
    id: competition.id,
    homeCode: home.team.abbreviation,
    awayCode: away.team.abbreviation,
    homeName: home.team.displayName,
    awayName: away.team.displayName,
    homeScore: isScheduled ? null : numberOrNull(home.score),
    awayScore: isScheduled ? null : numberOrNull(away.score),
    status,
    statusText: competition.status.type.shortDetail || competition.status.type.detail || competition.status.type.description,
    clock: status === "live" || status === "halftime" ? competition.status.displayClock : undefined,
    kickoffAt: competition.date,
    winnerCode: home.winner ? home.team.abbreviation : away.winner ? away.team.abbreviation : undefined,
    source: "espn",
    updatedAt,
    statistics: boxscoreStats ?? buildEspnStatistics(home, away),
    events: mapEspnEvents(payload.keyEvents ?? competition.details ?? [], codeById),
    commentary: mapEspnCommentary(payload.commentary ?? [], codeById).slice(-24).reverse()
  };
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

function teamCodeById(competitors: Array<{ team: { id?: string; abbreviation: string; displayName?: string } }>) {
  return new Map(competitors.map((competitor) => [competitor.team.id ?? competitor.team.displayName ?? competitor.team.abbreviation, competitor.team.abbreviation]));
}

function buildEspnStatistics(
  home: { statistics?: EspnStatistic[] },
  away: { statistics?: EspnStatistic[] }
): { home: LiveTeamStat[]; away: LiveTeamStat[] } {
  return {
    home: mapEspnStats(home.statistics ?? []),
    away: mapEspnStats(away.statistics ?? [])
  };
}

function buildEspnBoxscoreStatistics(
  teams: NonNullable<EspnSummaryResponse["boxscore"]>["teams"],
  homeCode: string,
  awayCode: string
) {
  if (!teams || teams.length === 0) return null;
  const home = teams.find((team) => team.team.abbreviation === homeCode);
  const away = teams.find((team) => team.team.abbreviation === awayCode);
  if (!home || !away) return null;

  return {
    home: mapEspnStats(home.statistics ?? []),
    away: mapEspnStats(away.statistics ?? [])
  };
}

function mapEspnStats(stats: EspnStatistic[]): LiveTeamStat[] {
  return stats.map((stat) => ({
    name: stat.name,
    label: stat.label ?? stat.displayName ?? stat.abbreviation ?? stat.name,
    abbreviation: stat.abbreviation,
    displayValue: stat.displayValue,
    value: numberOrNull(stat.value ?? stat.displayValue)
  }));
}

function mapEspnEvents(events: EspnEventDetail[], codeById: Map<string, string>): LiveMatchEvent[] {
  return events
    .filter((event) => event.type)
    .map((event, index) => {
      const teamId = event.team?.id ?? event.team?.displayName ?? "";
      const kind = eventKind(event.type?.type ?? event.type?.text, Boolean(event.scoringPlay), Boolean(event.yellowCard), Boolean(event.redCard));
      const athletes = (event.participants ?? event.athletesInvolved ?? [])
        .map((item) => athleteName(item))
        .filter((name): name is string => Boolean(name));

      return {
        id: event.id ?? `${event.type?.id ?? "event"}-${event.clock?.value ?? index}`,
        minute: event.clock?.displayValue ?? "",
        type: event.type?.text ?? "Event",
        kind,
        text: event.text ?? event.type?.text ?? "Match event",
        teamCode: codeById.get(teamId),
        teamName: event.team?.displayName,
        athletes
      };
    });
}

function athleteName(item: { athlete?: { displayName?: string } } | { displayName?: string; shortName?: string }) {
  const participant = item as { athlete?: { displayName?: string }; displayName?: string; shortName?: string };
  return participant.athlete?.displayName ?? participant.displayName ?? participant.shortName;
}

function mapEspnCommentary(commentary: EspnCommentary[], codeById: Map<string, string>): LiveMatchEvent[] {
  return commentary.map((item, index) => {
    const teamId = item.team?.id ?? item.team?.displayName ?? "";
    return {
      id: item.id ?? `commentary-${item.time?.value ?? index}`,
      minute: item.time?.displayValue ?? "",
      type: item.type?.text ?? "Commentary",
      kind: "commentary",
      text: item.text,
      teamCode: codeById.get(teamId),
      teamName: item.team?.displayName,
      athletes: []
    };
  });
}

function eventKind(typeText: string | undefined, scoringPlay: boolean, yellowCard: boolean, redCard: boolean): LiveMatchEvent["kind"] {
  const value = (typeText ?? "").toLowerCase();
  if (scoringPlay || value.includes("goal")) return "goal";
  if (yellowCard || value.includes("yellow")) return "yellow-card";
  if (redCard || value.includes("red")) return "red-card";
  if (value.includes("substitution")) return "substitution";
  if (value.includes("kickoff") || value.includes("half") || value.includes("full time")) return "period";
  if (value.includes("delay")) return "delay";
  return "other";
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
      home: { name: string; code: string | null; winner?: boolean | null };
      away: { name: string; code: string | null; winner?: boolean | null };
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
      status: EspnStatus;
      details?: EspnEventDetail[];
      competitors: Array<{
        homeAway: "home" | "away";
        score: string;
        winner?: boolean;
        statistics?: EspnStatistic[];
        team: {
          id?: string;
          abbreviation: string;
          displayName: string;
        };
      }>;
    }>;
  }>;
};

type EspnStatus = {
  displayClock?: string;
  type: {
    state: string;
    name: string;
    description: string;
    detail: string;
    shortDetail: string;
  };
};

type EspnSummaryResponse = {
  header?: {
    competitions?: Array<{
      id: string;
      date: string;
      status: EspnStatus;
      details?: EspnEventDetail[];
      competitors: Array<{
        homeAway: "home" | "away";
        score: string;
        winner?: boolean;
        statistics?: EspnStatistic[];
        team: {
          id?: string;
          abbreviation: string;
          displayName: string;
        };
      }>;
    }>;
  };
  boxscore?: {
    teams?: Array<{
      team: {
        abbreviation: string;
        displayName?: string;
      };
      statistics?: EspnStatistic[];
    }>;
  };
  keyEvents?: EspnEventDetail[];
  commentary?: EspnCommentary[];
};

type EspnStatistic = {
  name: string;
  label?: string;
  displayName?: string;
  abbreviation?: string;
  displayValue: string;
  value?: number | string | null;
};

type EspnEventDetail = {
  id?: string;
  type?: {
    id?: string;
    text?: string;
    type?: string;
  };
  text?: string;
  clock?: {
    value?: number;
    displayValue?: string;
  };
  team?: {
    id?: string;
    displayName?: string;
  };
  scoreValue?: number;
  scoringPlay?: boolean;
  redCard?: boolean;
  yellowCard?: boolean;
  penaltyKick?: boolean;
  ownGoal?: boolean;
  athletesInvolved?: Array<{
    displayName?: string;
    shortName?: string;
  }>;
  participants?: Array<{
    athlete?: {
      displayName?: string;
    };
  }>;
};

type EspnCommentary = {
  id?: string;
  text: string;
  time?: {
    value?: number;
    displayValue?: string;
  };
  type?: {
    text?: string;
  };
  team?: {
    id?: string;
    displayName?: string;
  };
};
