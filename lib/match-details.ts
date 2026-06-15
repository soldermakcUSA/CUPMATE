import type { Locale } from "@/lib/i18n";

export type MatchOutcomeOdds = {
  label: "home" | "draw" | "away";
  american: number;
};

export type PreviousGame = {
  date: string;
  opponent: string;
  result: string;
};

export type TeamDetail = {
  code: string;
  name: string;
  flag: string;
  note: string;
  previousGames: PreviousGame[];
};

export type MatchDetail = {
  slug: string;
  group: string;
  kickoff: string;
  kickoffAt?: string;
  venue: string;
  city: string;
  home: TeamDetail;
  away: TeamDetail;
  groupTeams: string[];
  odds: MatchOutcomeOdds[];
  totalGoalsLine: string;
  headToHead: string[];
  story: string;
  sources: Array<{ label: string; href: string }>;
};

const codePairToSlug: Record<string, string> = {
  "MEX-RSA": "mexico-vs-south-africa",
  "KOR-CZE": "south-korea-vs-czechia",
  "CAN-BIH": "canada-vs-bosnia-and-herzegovina",
  "USA-PAR": "united-states-vs-paraguay",
  "QAT-SUI": "qatar-vs-switzerland",
  "BRA-MAR": "brazil-vs-morocco",
  "HAI-SCO": "haiti-vs-scotland",
  "AUS-TUR": "australia-vs-turkiye",
  "GER-CUW": "germany-vs-curacao",
  "NED-JPN": "netherlands-vs-japan",
  "BEL-EGY": "belgium-vs-egypt",
  "ESP-CPV": "spain-vs-cape-verde"
};

const details: MatchDetail[] = [
  {
    slug: "mexico-vs-south-africa",
    group: "Group A",
    kickoff: "Jun 11, 2026 · 3:00 PM ET",
    venue: "Estadio Azteca",
    city: "Mexico City",
    home: {
      code: "MEX",
      name: "Mexico",
      flag: "🇲🇽",
      note: "Co-host and opening-match team with home-field pressure at Azteca.",
      previousGames: [
        { date: "Mar 31", opponent: "Belgium", result: "D 1-1" },
        { date: "Mar 28", opponent: "Portugal", result: "D 0-0" },
        { date: "Feb 25", opponent: "Iceland", result: "W 4-0" },
        { date: "Jan 25", opponent: "Bolivia", result: "W 1-0" },
        { date: "Jan 22", opponent: "Panama", result: "W 1-0" }
      ]
    },
    away: {
      code: "RSA",
      name: "South Africa",
      flag: "🇿🇦",
      note: "CAF qualifier with an organized block and transition threat.",
      previousGames: [
        { date: "Mar 31", opponent: "Panama", result: "L 2-1" },
        { date: "Mar 27", opponent: "Panama", result: "D 1-1" },
        { date: "Jan 4", opponent: "Cameroon", result: "L 2-1" },
        { date: "Dec 29", opponent: "Zimbabwe", result: "W 3-2" },
        { date: "Dec 26", opponent: "Egypt", result: "L 1-0" }
      ]
    },
    groupTeams: ["Mexico", "South Africa", "South Korea", "Czechia"],
    odds: [
      { label: "home", american: -195 },
      { label: "draw", american: 308 },
      { label: "away", american: 544 }
    ],
    totalGoalsLine: "2.5 goals",
    headToHead: ["2010 World Cup opening match: South Africa 1-1 Mexico.", "Mexico enter as market favorite; South Africa's draw price keeps the match from being treated as a one-way opener."],
    story: "The opening game pairs Mexico's home setting with South Africa's tournament return. Venue familiarity and market pricing lean toward Mexico, but opening matches often reward disciplined defensive starts.",
    sources: [
      { label: "FOX Sports matchup", href: "https://www.foxsports.com/soccer/fifa-world-cup-men-mexico-vs-south-africa-jun-11-2026-game-boxscore-647616" },
      { label: "FOX Sports odds", href: "https://www.foxsports.com/betting/soccer/games" },
      { label: "FOX One watch info", href: "https://www.fox.com/soccer/fifa-world-cup/mexico-vs-south-africa-jun-11-2026-group-a" }
    ]
  },
  {
    slug: "south-korea-vs-czechia",
    group: "Group A",
    kickoff: "Jun 11, 2026 · 10:00 PM ET",
    venue: "Estadio Akron",
    city: "Zapopan, Jalisco",
    home: team("KOR", "South Korea", "🇰🇷", "High-tempo AFC side with wide pressing and quick restarts."),
    away: team("CZE", "Czechia", "🇨🇿", "Compact UEFA opponent built around structure and set pieces."),
    groupTeams: ["Mexico", "South Africa", "South Korea", "Czechia"],
    odds: odds(170, 220, 175),
    totalGoalsLine: "2.5 goals",
    headToHead: ["Balanced market: South Korea and Czechia are priced almost level.", "Group A's second match may set the chase behind Mexico."],
    story: "This is the tightest Group A opener by market price. South Korea's pace meets Czechia's organization, and a draw would keep the group compressed after matchday one.",
    sources: [{ label: "Oddschecker World Cup odds", href: "https://www.oddschecker.com/us/soccer/world-cup" }]
  },
  {
    slug: "canada-vs-bosnia-and-herzegovina",
    group: "Group B",
    kickoff: "Jun 12, 2026 · 3:00 PM ET",
    venue: "BMO Field",
    city: "Toronto, Ontario",
    home: team("CAN", "Canada", "🇨🇦", "Co-host with crowd advantage and vertical attacking speed."),
    away: team("BIH", "Bosnia and Herzegovina", "🇧🇦", "Experienced European qualifier with central midfield quality."),
    groupTeams: ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
    odds: odds(-120, 275, 340),
    totalGoalsLine: "2.5 goals",
    headToHead: ["Canada's home venue creates a meaningful edge in the market.", "Bosnia and Herzegovina carry the higher underdog price but have tournament-level experience."],
    story: "Canada's tournament starts in Toronto, where home support should raise the tempo. Bosnia and Herzegovina's path is likely about controlling rhythm and limiting transitions.",
    sources: [{ label: "Oddschecker World Cup odds", href: "https://www.oddschecker.com/us/soccer/world-cup" }]
  },
  {
    slug: "united-states-vs-paraguay",
    group: "Group D",
    kickoff: "Jun 12, 2026 · 9:00 PM ET",
    venue: "SoFi Stadium",
    city: "Inglewood, California",
    home: team("USA", "United States", "🇺🇸", "Co-host with athletic wide play and strong home support."),
    away: team("PAR", "Paraguay", "🇵🇾", "CONMEBOL opponent known for duels, discipline, and low-margin games."),
    groupTeams: ["United States", "Paraguay", "Australia", "Türkiye"],
    odds: odds(105, 255, 270),
    totalGoalsLine: "2.5 goals",
    headToHead: ["Market makes the United States a narrow favorite, not a heavy one.", "Paraguay's price suggests a live underdog if the match stays low scoring."],
    story: "The USA open their group in Los Angeles with a modest market edge. Paraguay's defensive profile makes first goal timing especially important.",
    sources: [{ label: "Oddschecker World Cup odds", href: "https://www.oddschecker.com/us/soccer/world-cup" }]
  },
  {
    slug: "qatar-vs-switzerland",
    group: "Group B",
    kickoff: "Jun 13, 2026 · 3:00 PM ET",
    venue: "Levi's Stadium",
    city: "Santa Clara, California",
    home: team("QAT", "Qatar", "🇶🇦", "AFC side likely to defend deep and look for controlled spells."),
    away: team("SUI", "Switzerland", "🇨🇭", "Experienced European team with tournament consistency."),
    groupTeams: ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
    odds: odds(1000, 470, -360),
    totalGoalsLine: "2.5 goals",
    headToHead: ["Switzerland are one of the clearest group-stage favorites in the early market.", "Qatar's best path is keeping the match level deep into the second half."],
    story: "Switzerland's price reflects the gap in tournament pedigree. Qatar need a compact start and set-piece value to make the favorite uncomfortable.",
    sources: [{ label: "Oddschecker World Cup odds", href: "https://www.oddschecker.com/us/soccer/world-cup" }]
  },
  {
    slug: "brazil-vs-morocco",
    group: "Group C",
    kickoff: "Jun 13, 2026 · 6:00 PM ET",
    venue: "Gillette Stadium",
    city: "Foxborough, Massachusetts",
    home: team("BRA", "Brazil", "🇧🇷", "Elite contender with individual quality in every attacking phase."),
    away: team("MAR", "Morocco", "🇲🇦", "Organized, physical side with proven knockout-tournament resilience."),
    groupTeams: ["Brazil", "Morocco", "Haiti", "Scotland"],
    odds: odds(-160, 310, 500),
    totalGoalsLine: "2.5 goals",
    headToHead: ["Brazil are favored, but Morocco's recent tournament reputation makes this a high-interest group opener.", "The tactical key is whether Morocco can deny central combinations and force Brazil wide."],
    story: "Brazil's opener carries star power and tactical tension. Morocco are priced as the underdog, but their structure gives this match upset potential.",
    sources: [{ label: "Oddschecker World Cup odds", href: "https://www.oddschecker.com/us/soccer/world-cup" }]
  },
  {
    slug: "haiti-vs-scotland",
    group: "Group C",
    kickoff: "Jun 13, 2026 · 9:00 PM ET",
    venue: "MetLife Stadium",
    city: "East Rutherford, New Jersey",
    home: team("HAI", "Haiti", "🇭🇹", "Underdog with direct attacking moments and emotional tournament stakes."),
    away: team("SCO", "Scotland", "🏴", "Physical UEFA side with aerial strength and set-piece value."),
    groupTeams: ["Brazil", "Morocco", "Haiti", "Scotland"],
    odds: odds(650, 390, -230),
    totalGoalsLine: "2.5 goals",
    headToHead: ["Scotland are priced as clear favorites.", "Haiti's upset path likely depends on transition efficiency and goalkeeper performance."],
    story: "Scotland open with a strong market edge, but MetLife can produce a charged atmosphere for a Caribbean underdog story.",
    sources: [{ label: "Oddschecker World Cup odds", href: "https://www.oddschecker.com/us/soccer/world-cup" }]
  },
  {
    slug: "australia-vs-turkiye",
    group: "Group D",
    kickoff: "Jun 14, 2026 · 12:00 AM ET",
    venue: "BC Place",
    city: "Vancouver, British Columbia",
    home: team("AUS", "Australia", "🇦🇺", "Direct, physical AFC side comfortable in tournament grind."),
    away: team("TUR", "Türkiye", "🇹🇷", "Technically sharp UEFA side with attacking midfield depth."),
    groupTeams: ["United States", "Paraguay", "Australia", "Türkiye"],
    odds: odds(360, 265, -120),
    totalGoalsLine: "2.5 goals",
    headToHead: ["Türkiye are favored, but Australia are priced within upset range.", "The midfield duel should decide whether the match becomes open or attritional."],
    story: "A late-night Vancouver match with contrasting styles: Australia's directness against Türkiye's technical control.",
    sources: [{ label: "Oddschecker World Cup odds", href: "https://www.oddschecker.com/us/soccer/world-cup" }]
  },
  {
    slug: "germany-vs-curacao",
    group: "Group E",
    kickoff: "Jun 14, 2026 · 1:00 PM ET",
    venue: "NRG Stadium",
    city: "Houston, Texas",
    home: team("GER", "Germany", "🇩🇪", "Major tournament power with a heavy market edge."),
    away: team("CUW", "Curacao", "🇨🇼", "Historic qualifier facing one of the tournament's deepest squads."),
    groupTeams: ["Germany", "Curacao", "Ivory Coast", "Ecuador"],
    odds: odds(-3300, 1800, 6000),
    totalGoalsLine: "3.5 goals",
    headToHead: ["Germany are one of the largest favorites on the early board.", "Curacao's first objective is game-state survival and limiting early chances."],
    story: "This matchup is about expectation management: Germany will be judged by control and goal difference, while Curacao chase a landmark result.",
    sources: [{ label: "Oddschecker World Cup odds", href: "https://www.oddschecker.com/us/soccer/world-cup" }]
  },
  {
    slug: "netherlands-vs-japan",
    group: "Group F",
    kickoff: "Jun 14, 2026 · 4:00 PM ET",
    venue: "AT&T Stadium",
    city: "Dallas, Texas",
    home: team("NED", "Netherlands", "🇳🇱", "European contender with strong possession structure."),
    away: team("JPN", "Japan", "🇯🇵", "High-tempo side with pressing, technique, and upset history."),
    groupTeams: ["Netherlands", "Japan", "Sweden", "Tunisia"],
    odds: odds(-115, 265, 330),
    totalGoalsLine: "2.5 goals",
    headToHead: ["Netherlands are a modest projected favorite.", "Japan's pressing can make this one of the more tactical early fixtures."],
    story: "A premium style clash: Dutch structure against Japan's speed and coordinated pressure.",
    sources: [{ label: "CupMate projection", href: "https://www.oddschecker.com/us/soccer/world-cup" }]
  },
  {
    slug: "belgium-vs-egypt",
    group: "Group G",
    kickoff: "Jun 14, 2026 · 7:00 PM ET",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta, Georgia",
    home: team("BEL", "Belgium", "🇧🇪", "European side with top-end attacking talent."),
    away: team("EGY", "Egypt", "🇪🇬", "CAF power built around direct attacks and compact defending."),
    groupTeams: ["Belgium", "Egypt", "Iran", "New Zealand"],
    odds: odds(-145, 300, 440),
    totalGoalsLine: "2.5 goals",
    headToHead: ["Belgium are projected as favorites.", "Egypt's counterattacking threat keeps the match from being purely possession-driven."],
    story: "Belgium need control; Egypt need space. The first transition chances could define the match.",
    sources: [{ label: "CupMate projection", href: "https://www.oddschecker.com/us/soccer/world-cup" }]
  },
  {
    slug: "spain-vs-cape-verde",
    group: "Group H",
    kickoff: "Jun 14, 2026 · 10:00 PM ET",
    venue: "Lumen Field",
    city: "Seattle, Washington",
    home: team("ESP", "Spain", "🇪🇸", "Elite possession team and one of the tournament favorites."),
    away: team("CPV", "Cape Verde", "🇨🇻", "Historic qualifier with pace and compact defensive ambition."),
    groupTeams: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
    odds: odds(-700, 700, 1600),
    totalGoalsLine: "2.5 goals",
    headToHead: ["Spain are projected as heavy favorites.", "Cape Verde's path is a disciplined low block and efficient counters."],
    story: "Spain's opening task is to turn possession into early chances. Cape Verde will try to make the night uncomfortable by keeping the scoreline close.",
    sources: [{ label: "CupMate projection", href: "https://www.oddschecker.com/us/soccer/world-cup" }]
  }
];

function team(code: string, name: string, flag: string, note: string): TeamDetail {
  return {
    code,
    name,
    flag,
    note,
    previousGames: [
      { date: "Recent", opponent: "Qualifier", result: "Form to update" },
      { date: "Recent", opponent: "Friendly", result: "Lineups pending" },
      { date: "Recent", opponent: "Regional match", result: "Scouting update" }
    ]
  };
}

function odds(home: number, draw: number, away: number): MatchOutcomeOdds[] {
  return [
    { label: "home", american: home },
    { label: "draw", american: draw },
    { label: "away", american: away }
  ];
}

export function allMatchDetails() {
  return details;
}

export function findMatchDetail(slug: string) {
  return details.find((match) => match.slug === slug);
}

export function matchSlugFromCodes(homeCode: string | null | undefined, awayCode: string | null | undefined) {
  if (!homeCode || !awayCode) return null;
  return codePairToSlug[`${homeCode}-${awayCode}`] ?? `${homeCode.toLowerCase()}-vs-${awayCode.toLowerCase()}`;
}

export function matchSlugFromCard(home: string, away: string) {
  const homeCode = extractCode(home);
  const awayCode = extractCode(away);
  return matchSlugFromCodes(homeCode, awayCode) ?? `${slugify(home)}-vs-${slugify(away)}`;
}

export function impliedProbability(american: number) {
  if (american < 0) {
    return Math.abs(american) / (Math.abs(american) + 100);
  }
  return 100 / (american + 100);
}

export function formatAmericanOdds(american: number) {
  return american > 0 ? `+${american}` : `${american}`;
}

export function localizeMatchDetail(detail: MatchDetail, locale: Locale): MatchDetail {
  if (locale !== "ru") return detail;
  return {
    ...detail,
    group: detail.group.replace("Group", "Группа"),
    kickoff: translateKickoffRu(detail.kickoff),
    city: cityRu[detail.city] ?? detail.city,
    home: localizeTeam(detail.home),
    away: localizeTeam(detail.away),
    groupTeams: detail.groupTeams.map((name) => teamRu[name] ?? name),
    totalGoalsLine: detail.totalGoalsLine.replace("goals", "гола"),
    headToHead: detail.headToHead.map((item) => translateHistory(item)),
    story: storyRu[detail.slug] ?? detail.story
  };
}

function extractCode(label: string) {
  const withoutFlag = label.replace(/\p{Extended_Pictographic}|\p{Regional_Indicator}/gu, "").trim();
  const parts = withoutFlag.split(/\s+/);
  return parts[parts.length - 1]?.replace(/[^A-Z]/g, "") || null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function localizeTeam(teamDetail: TeamDetail): TeamDetail {
  return {
    ...teamDetail,
    name: teamRu[teamDetail.name] ?? teamDetail.name,
    note: teamNoteRu[teamDetail.code] ?? teamDetail.note,
    previousGames: teamDetail.previousGames.map((game) => ({
      ...game,
      date: translateDateRu(game.date),
      opponent: teamRu[game.opponent] ?? game.opponent,
      result: resultRu(game.result)
    }))
  };
}

function translateDateRu(date: string) {
  return date
    .replace("Recent", "Недавно")
    .replace("Jan", "Янв")
    .replace("Feb", "Фев")
    .replace("Mar", "Мар")
    .replace("Apr", "Апр")
    .replace("May", "Май")
    .replace("Jun", "Июн")
    .replace("Jul", "Июл")
    .replace("Aug", "Авг")
    .replace("Sep", "Сен")
    .replace("Oct", "Окт")
    .replace("Nov", "Ноя")
    .replace("Dec", "Дек");
}

function resultRu(result: string) {
  return result
    .replace(/^W /, "П ")
    .replace(/^D /, "Н ")
    .replace(/^L /, "Пор ")
    .replace("Form to update", "Форма обновляется")
    .replace("Lineups pending", "Составы ожидаются")
    .replace("Scouting update", "Скаутинг обновляется");
}

function translateKickoffRu(kickoff: string) {
  return kickoff
    .replace("Jun", "Июн")
    .replace("ET", "по вост. времени");
}

function translateHistory(item: string) {
  return item
    .replace("2010 World Cup opening match: South Africa 1-1 Mexico.", "Матч открытия ЧМ-2010: ЮАР 1-1 Мексика.")
    .replace("Mexico enter as market favorite; South Africa's draw price keeps the match from being treated as a one-way opener.", "Мексика идет фаворитом рынка, но цена ничьей не делает матч односторонним.")
    .replace("Market makes", "Рынок делает")
    .replace("are priced", "оцениваются")
    .replace("favorites", "фаворитами");
}

const teamRu: Record<string, string> = {
  Mexico: "Мексика",
  "South Africa": "ЮАР",
  "South Korea": "Южная Корея",
  Czechia: "Чехия",
  Canada: "Канада",
  "Bosnia and Herzegovina": "Босния и Герцеговина",
  Qatar: "Катар",
  Switzerland: "Швейцария",
  Brazil: "Бразилия",
  Morocco: "Марокко",
  Haiti: "Гаити",
  Scotland: "Шотландия",
  "United States": "США",
  Paraguay: "Парагвай",
  Australia: "Австралия",
  Türkiye: "Турция",
  Germany: "Германия",
  Curacao: "Кюрасао",
  Netherlands: "Нидерланды",
  Japan: "Япония",
  Belgium: "Бельгия",
  Portugal: "Португалия",
  Iceland: "Исландия",
  Bolivia: "Боливия",
  Panama: "Панама",
  Cameroon: "Камерун",
  Zimbabwe: "Зимбабве",
  Egypt: "Египет",
  Spain: "Испания",
  "Cape Verde": "Кабо-Верде",
  "Ivory Coast": "Кот-д'Ивуар",
  Ecuador: "Эквадор",
  Sweden: "Швеция",
  Tunisia: "Тунис",
  Iran: "Иран",
  "New Zealand": "Новая Зеландия",
  "Saudi Arabia": "Саудовская Аравия",
  Uruguay: "Уругвай"
};

const cityRu: Record<string, string> = {
  "Mexico City": "Мехико",
  "Zapopan, Jalisco": "Сапопан, Халиско",
  "Toronto, Ontario": "Торонто, Онтарио",
  "Inglewood, California": "Инглвуд, Калифорния",
  "Santa Clara, California": "Санта-Клара, Калифорния",
  "Foxborough, Massachusetts": "Фоксборо, Массачусетс",
  "East Rutherford, New Jersey": "Ист-Ратерфорд, Нью-Джерси",
  "Vancouver, British Columbia": "Ванкувер, Британская Колумбия",
  "Houston, Texas": "Хьюстон, Техас",
  "Dallas, Texas": "Даллас, Техас",
  "Atlanta, Georgia": "Атланта, Джорджия",
  "Seattle, Washington": "Сиэтл, Вашингтон"
};

const teamNoteRu: Record<string, string> = {
  MEX: "Сохозяин турнира и команда матча открытия с преимуществом домашнего стадиона.",
  RSA: "Представитель CAF с организованной обороной и угрозой в переходных атаках.",
  KOR: "Темповая команда AFC с прессингом и быстрыми рестартами.",
  CZE: "Структурный европейский соперник с сильными стандартами.",
  CAN: "Сохозяин с поддержкой трибун и вертикальной атакой.",
  BIH: "Опытная европейская команда с качественной центральной линией.",
  QAT: "Команда AFC, которой важно держать компактный блок.",
  SUI: "Опытная европейская сборная со стабильностью на турнирах."
};

const storyRu: Record<string, string> = {
  "mexico-vs-south-africa": "Матч открытия соединяет домашний контекст Мексики и возвращение ЮАР на большую сцену. Знакомый стадион и рынок на стороне Мексики, но стартовые игры часто вознаграждают дисциплинированную оборону.",
  "south-korea-vs-czechia": "Самый ровный матч старта группы A по рыночной оценке: скорость Южной Кореи против организованности Чехии.",
  "canada-vs-bosnia-and-herzegovina": "Канада начинает турнир дома в Торонто. Боснии и Герцеговине важно сбить темп и закрыть пространство за спинами.",
  "united-states-vs-paraguay": "США открывают группу в Лос-Анджелесе с небольшим преимуществом. Парагвай способен сделать матч низовым и вязким."
};
