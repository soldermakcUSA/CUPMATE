import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export type MatchCardData = {
  group: string;
  home: string;
  away: string;
  date: string;
  time: string;
  venue: string;
};

type TeamRelation = {
  fifa_code: string | null;
  flag_emoji: string | null;
  team_translations: { name: string; short_name: string | null }[];
} | null;

type StadiumRelation = {
  stadium_translations: { name: string }[];
  host_cities: {
    host_city_translations: { name: string; state_region: string | null }[];
  } | null;
} | null;

type MatchRow = {
  stage: string;
  group_name: string | null;
  kickoff_at: string;
  match_translations: { title: string | null }[];
  home_team: TeamRelation;
  away_team: TeamRelation;
  stadiums: StadiumRelation;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit"
});

export async function fetchWorldCupMatches(limit = 8): Promise<MatchCardData[]> {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase
    .from("matches")
    .select(`
      stage,
      group_name,
      kickoff_at,
      match_translations(title),
      home_team:teams!matches_home_team_id_fkey(
        fifa_code,
        flag_emoji,
        team_translations(name, short_name)
      ),
      away_team:teams!matches_away_team_id_fkey(
        fifa_code,
        flag_emoji,
        team_translations(name, short_name)
      ),
      stadiums(
        stadium_translations(name),
        host_cities(host_city_translations(name, state_region))
      )
    `)
    .eq("stage", "group_stage")
    .order("kickoff_at", { ascending: true })
    .limit(limit);

  if (error) {
    throw error;
  }

  return ((data ?? []) as unknown as MatchRow[]).map(toMatchCardData);
}

function toMatchCardData(match: MatchRow): MatchCardData {
  const kickoff = new Date(match.kickoff_at);
  const title = match.match_translations[0]?.title ?? "World Cup match";

  return {
    group: match.group_name ?? formatStage(match.stage),
    home: formatTeam(match.home_team, title, "home"),
    away: formatTeam(match.away_team, title, "away"),
    date: dateFormatter.format(kickoff),
    time: timeFormatter.format(kickoff),
    venue: formatVenue(match.stadiums)
  };
}

function formatTeam(team: TeamRelation, title: string, side: "home" | "away") {
  if (team) {
    const translation = team.team_translations[0];
    const label = translation?.short_name ?? team.fifa_code ?? translation?.name ?? "TBD";
    return [team.flag_emoji, label].filter(Boolean).join(" ");
  }

  const parts = title.split(" vs ");
  return side === "home" ? parts[0] ?? "TBD" : parts[1] ?? "TBD";
}

function formatVenue(stadium: StadiumRelation) {
  const stadiumName = stadium?.stadium_translations[0]?.name ?? "Venue TBD";
  const city = stadium?.host_cities?.host_city_translations[0];
  const cityLabel = [city?.name, city?.state_region].filter(Boolean).join(", ");
  return cityLabel ? `${stadiumName}, ${cityLabel}` : stadiumName;
}

function formatStage(stage: string) {
  return stage
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
