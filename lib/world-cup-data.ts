import { pickLocalizedTranslation, localizedDateFormatterLocale } from "@/lib/content-localization";
import type { Locale } from "@/lib/i18n";
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
  team_translations: { language_code: string; name: string; short_name: string | null }[];
} | null;

type StadiumRelation = {
  stadium_translations: { language_code: string; name: string }[];
  host_cities: {
    host_city_translations: { language_code: string; name: string; state_region: string | null }[];
  } | null;
} | null;

type MatchRow = {
  stage: string;
  group_name: string | null;
  kickoff_at: string;
  match_translations: { language_code: string; title: string | null }[];
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

export async function fetchWorldCupMatches(limit = 8, locale: Locale = "en"): Promise<MatchCardData[]> {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase
    .from("matches")
    .select(`
      stage,
      group_name,
      kickoff_at,
      match_translations(language_code,title),
      home_team:teams!matches_home_team_id_fkey(
        fifa_code,
        flag_emoji,
        team_translations(language_code,name, short_name)
      ),
      away_team:teams!matches_away_team_id_fkey(
        fifa_code,
        flag_emoji,
        team_translations(language_code,name, short_name)
      ),
      stadiums(
        stadium_translations(language_code,name),
        host_cities(host_city_translations(language_code,name, state_region))
      )
    `)
    .eq("stage", "group_stage")
    .order("kickoff_at", { ascending: true })
    .limit(limit);

  if (error) {
    throw error;
  }

  return ((data ?? []) as unknown as MatchRow[]).map((match) => toMatchCardData(match, locale));
}

function toMatchCardData(match: MatchRow, locale: Locale): MatchCardData {
  const kickoff = new Date(match.kickoff_at);
  const title = pickLocalizedTranslation(match.match_translations, locale)?.title ?? worldCupMatchFallback(locale);
  const dateFormatter = new Intl.DateTimeFormat(localizedDateFormatterLocale(locale), {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const timeFormatter = new Intl.DateTimeFormat(localizedDateFormatterLocale(locale), {
    hour: "numeric",
    minute: "2-digit"
  });

  return {
    group: localizeGroup(match.group_name, locale) ?? formatStage(match.stage, locale),
    home: formatTeam(match.home_team, title, "home", locale),
    away: formatTeam(match.away_team, title, "away", locale),
    date: dateFormatter.format(kickoff),
    time: timeFormatter.format(kickoff),
    venue: formatVenue(match.stadiums, locale)
  };
}

function formatTeam(team: TeamRelation, title: string, side: "home" | "away", locale: Locale) {
  if (team) {
    const translation = pickLocalizedTranslation(team.team_translations, locale);
    const label = translation?.short_name ?? team.fifa_code ?? translation?.name ?? "TBD";
    return [team.flag_emoji, label].filter(Boolean).join(" ");
  }

  const parts = title.split(" vs ");
  return side === "home" ? parts[0] ?? "TBD" : parts[1] ?? "TBD";
}

function formatVenue(stadium: StadiumRelation, locale: Locale) {
  const stadiumName = pickLocalizedTranslation(stadium?.stadium_translations, locale)?.name ?? venueFallback(locale);
  const city = pickLocalizedTranslation(stadium?.host_cities?.host_city_translations, locale);
  const cityLabel = [city?.name, city?.state_region].filter(Boolean).join(", ");
  return cityLabel ? `${stadiumName}, ${cityLabel}` : stadiumName;
}

function formatStage(stage: string, locale: Locale) {
  const stageLabels: Partial<Record<Locale, Record<string, string>>> = {
    ru: { group_stage: "Групповой этап" },
    es: { group_stage: "Fase de grupos" },
    fr: { group_stage: "Phase de groupes" },
    de: { group_stage: "Gruppenphase" },
    pt: { group_stage: "Fase de grupos" },
    it: { group_stage: "Fase a gironi" },
    ar: { group_stage: "دور المجموعات" },
    zh: { group_stage: "小组赛" },
    ja: { group_stage: "グループステージ" },
    ko: { group_stage: "조별리그" }
  };

  return stageLabels[locale]?.[stage] ?? stage
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function localizeGroup(groupName: string | null, locale: Locale) {
  if (!groupName) return null;
  const match = groupName.match(/^Group\s+(.+)$/i);
  if (!match) return groupName;

  const suffix = match[1];
  const labels: Partial<Record<Locale, string>> = {
    ru: "Группа",
    es: "Grupo",
    fr: "Groupe",
    de: "Gruppe",
    pt: "Grupo",
    it: "Gruppo",
    ar: "المجموعة",
    zh: "小组",
    ja: "グループ",
    ko: "조"
  };

  return `${labels[locale] ?? "Group"} ${suffix}`;
}

function worldCupMatchFallback(locale: Locale) {
  return locale === "ru" ? "Матч Чемпионата мира" : "World Cup match";
}

function venueFallback(locale: Locale) {
  return locale === "ru" ? "Стадион уточняется" : "Venue TBD";
}
