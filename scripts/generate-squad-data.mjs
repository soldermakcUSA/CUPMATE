import fs from "node:fs/promises";

const ESPN_TEAMS_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/teams";
const ESPN_TEAM_URL = "https://www.espn.com/soccer/team/squad/_/id";
const SOURCE_URL = "https://www.fourfourtwo.com/competition/world-cup-2026-squads";
const FIFA_NOTE_URL = "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/squad-lists-number-date";
const EXTRA_SOURCES = [
  { teamName: "Bosnia and Herzegovina", code: "BIH", url: "https://www.fourfourtwo.com/team/bosnia-world-cup-2026-squad" },
  { teamName: "Czech Republic", code: "CZE", url: "https://www.fourfourtwo.com/team/czech-republic-world-cup-2026-squad" },
  { teamName: "Turkiye", code: "TUR", url: "https://www.fourfourtwo.com/team/turkiye-world-cup-2026-squad" },
  { teamName: "Sweden", code: "SWE", url: "https://www.fourfourtwo.com/team/sweden-world-cup-2026-squad" },
  { teamName: "DR Congo", code: "COD", url: "https://www.fourfourtwo.com/team/dr-congo-world-cup-2026-squad" },
  { teamName: "Iraq", code: "IRQ", url: "https://www.fourfourtwo.com/team/iraq-world-cup-2026-squad" }
];

const teamCodes = {
  Algeria: "ALG",
  Argentina: "ARG",
  Australia: "AUS",
  Austria: "AUT",
  Belgium: "BEL",
  Brazil: "BRA",
  Canada: "CAN",
  "Cape Verde": "CPV",
  Colombia: "COL",
  Croatia: "CRO",
  "Czech Republic": "CZE",
  Curucao: "CUW",
  Curacao: "CUW",
  "Curaçao": "CUW",
  "DR Congo": "COD",
  "Congo DR": "COD",
  Ecuador: "ECU",
  Egypt: "EGY",
  England: "ENG",
  France: "FRA",
  Germany: "GER",
  Ghana: "GHA",
  Haiti: "HAI",
  Iran: "IRN",
  "Ivory Coast": "CIV",
  Japan: "JPN",
  Jordan: "JOR",
  Mexico: "MEX",
  Morocco: "MAR",
  Netherlands: "NED",
  "New Zealand": "NZL",
  Norway: "NOR",
  Panama: "PAN",
  Paraguay: "PAR",
  Portugal: "POR",
  Qatar: "QAT",
  "Saudi Arabia": "KSA",
  Scotland: "SCO",
  Senegal: "SEN",
  "South Africa": "RSA",
  "South Korea": "KOR",
  Spain: "ESP",
  Switzerland: "SUI",
  Tunisia: "TUN",
  Turkiye: "TUR",
  "Türkiye": "TUR",
  "United States": "USA",
  Uruguay: "URU",
  Uzbekistan: "UZB"
};

const manualPhotos = {
  "Guillermo Ochoa": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Mex-Kor_%281%29_%28cropped%29.jpg/330px-Mex-Kor_%281%29_%28cropped%29.jpg",
  "Raul Rangel": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ra%C3%BAl_Rangel.png/330px-Ra%C3%BAl_Rangel.png",
  "Carlos Acevedo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Carlos_Acevedo.png/330px-Carlos_Acevedo.png",
  "Jose Antonio Rodriguez": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Jose_Antonio_Rodr%C3%ADguez_Lopez.jpeg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
  "Alex Padilla": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alex_Padilla_official.jpg/330px-Alex_Padilla_official.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
  "Jorge Sanchez": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Jorge_S%C3%A1nchez.png/330px-Jorge_S%C3%A1nchez.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
  "Johan Vasquez": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Johan_V%C3%A1squez.jpg/330px-Johan_V%C3%A1squez.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
  "Israel Reyes": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Israelreyes.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
  "Julian Araujo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Julian_Araujo.jpg/330px-Julian_Araujo.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
  "Edson Alvarez": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Edson_%C3%81lvarez.png/330px-Edson_%C3%81lvarez.png",
  "Raul Jimenez": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Ra%C3%BAl_Jim%C3%A9nez_04032026_%281%29.jpg/330px-Ra%C3%BAl_Jim%C3%A9nez_04032026_%281%29.jpg",
  "Santiago Gimenez": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Santiago_Gim%C3%A9nez.png/330px-Santiago_Gim%C3%A9nez.png",
  "Cesar Montes": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/C%C3%A9sar_Montes.png/330px-C%C3%A9sar_Montes.png",
  "Orbelin Pineda": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Orbel%C3%ADn_Pineda.png/330px-Orbel%C3%ADn_Pineda.png",
  "Roberto Alvarado": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Roberto_Alvarado.png/330px-Roberto_Alvarado.png",
  "Erik Lira": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Erik_Lira_2.png/330px-Erik_Lira_2.png",
  "Cesar Huerta": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/C%C3%A9sar_Huerta.png/330px-C%C3%A9sar_Huerta.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
  "Julian Quinones": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Juli%C3%A1n_Qui%C3%B1ones.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "Diego Lainez": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Diego_Lainez.png/330px-Diego_Lainez.png",
  "Olwethu Makhanya": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Olwethu_Makhanya_Philadelphia_Union_New_York_City_FC_Nov_23_2025-027_%28cropped%29.jpg/330px-Olwethu_Makhanya_Philadelphia_Union_New_York_City_FC_Nov_23_2025-027_%28cropped%29.jpg",
  "Lyle Foster": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Lyle_Foster_29112025_%286%29.jpg/330px-Lyle_Foster_29112025_%286%29.jpg",
  "Bongokuhle Hlongwane": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bongokuhle_%27Bongi%27_Hlongwane_-_MNUFC_-_Allianz_Field_-_MLS_-_%2852125526845%29.jpg/330px-Bongokuhle_%27Bongi%27_Hlongwane_-_MNUFC_-_Allianz_Field_-_MLS_-_%2852125526845%29.jpg",
  "Siyabonga Ngezana": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Siyabonga_Ngezana_-_3_July_2023_%28cropped%29.jpg/330px-Siyabonga_Ngezana_-_3_July_2023_%28cropped%29.jpg",
  "Aubrey Modiba": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Aubrey_Modiba_%28cropped%29.jpg/330px-Aubrey_Modiba_%28cropped%29.jpg"
};

const fallbackSquads = {};

parsePage(await fetchLines(SOURCE_URL), SOURCE_URL, fallbackSquads);
for (const source of EXTRA_SOURCES) {
  parseFixedSource(await fetchLines(source.url), source, fallbackSquads);
}

const squads = await fetchEspnSquads(fallbackSquads);
await enrichWithWikipediaPhotos(squads);

const generated = `export type SquadPlayer = {
  id?: string;
  name: string;
  position: "GK" | "DF" | "MF" | "FW";
  club?: string;
  jersey?: string;
  age?: number;
  dateOfBirth?: string;
  height?: string;
  weight?: string;
  profileUrl?: string;
  photo?: string;
};

export type TeamSquad = {
  teamCode: string;
  teamName: string;
  status: string;
  note: string;
  sourceLabel: string;
  sourceUrl: string;
  players: SquadPlayer[];
};

export const squadCoverage = {
  generatedAt: ${JSON.stringify(new Date().toISOString())},
  sourceUrl: ${JSON.stringify(ESPN_TEAMS_URL)},
  fallbackSourceUrl: ${JSON.stringify(SOURCE_URL)},
  fifaNoteUrl: ${JSON.stringify(FIFA_NOTE_URL)},
  teamCount: ${Object.keys(squads).length},
  playerCount: ${Object.values(squads).reduce((sum, squad) => sum + squad.players.length, 0)}
};

const squads: Record<string, TeamSquad> = ${JSON.stringify(squads, null, 2)};

export function getTeamSquad(teamCode: string) {
  return squads[teamCode] ?? null;
}

export function allTeamSquads() {
  return squads;
}
`;

await fs.writeFile("lib/squad-data.ts", generated);
console.log(`Generated ${Object.keys(squads).length} squads and ${squadCoverageCount(squads)} players.`);

async function fetchEspnSquads(fallbacks) {
  const payload = await fetchJson(ESPN_TEAMS_URL);
  const teams = payload.sports?.[0]?.leagues?.[0]?.teams?.map((entry) => entry.team) ?? [];
  const squadsByCode = {};
  const defaultTeamCache = new Map();

  for (const team of teams) {
    const code = team.abbreviation;
    const fallback = fallbacks[code];
    const fallbackByName = new Map((fallback?.players ?? []).map((player) => [nameKey(player.name), player]));
    const roster = await fetchJson(`${ESPN_TEAMS_URL}/${team.id}/roster`);
    const seen = new Set();
    const players = [];

    for (const athlete of roster.athletes ?? []) {
      const player = await mapEspnAthlete(athlete, {
        fallback: fallbackByName.get(nameKey(athlete.displayName ?? athlete.fullName)),
        nationalCode: code,
        nationalName: team.displayName,
        defaultTeamCache
      });
      const key = player.id ?? nameKey(player.name);
      if (seen.has(key)) continue;
      seen.add(key);
      players.push(player);
    }

    squadsByCode[code] = {
      teamCode: code,
      teamName: normalizeTeamName(team.displayName),
      status: players.length === 26 ? "Tournament roster" : "ESPN roster",
      note: "Roster data comes from ESPN's 2026 FIFA World Cup team feed and may change if the provider or federation updates registrations.",
      sourceLabel: "ESPN 2026 FIFA World Cup roster",
      sourceUrl: `${ESPN_TEAM_URL}/${team.id}/${slugify(team.displayName)}`,
      players: players.sort(comparePlayers)
    };
  }

  return squadsByCode;
}

async function mapEspnAthlete(athlete, { fallback, nationalCode, nationalName, defaultTeamCache }) {
  const name = normalizePlayerName(athlete.displayName ?? athlete.fullName);
  const club = fallback?.club ?? await resolveClubName(athlete.defaultTeam?.$ref, {
    nationalCode,
    nationalName,
    cache: defaultTeamCache
  });
  const profileUrl = athlete.links?.find((link) => link.rel?.includes("playercard") && link.rel?.includes("desktop"))?.href;
  const photo = athlete.headshot?.href ?? fallback?.photo ?? manualPhotos[name];

  return {
    ...(athlete.id ? { id: String(athlete.id) } : {}),
    name,
    position: mapEspnPosition(athlete.position),
    ...(club ? { club } : {}),
    ...(athlete.jersey ? { jersey: String(athlete.jersey) } : {}),
    ...(Number.isFinite(athlete.age) ? { age: athlete.age } : {}),
    ...(athlete.dateOfBirth ? { dateOfBirth: athlete.dateOfBirth } : {}),
    ...(athlete.displayHeight ? { height: athlete.displayHeight } : {}),
    ...(athlete.displayWeight ? { weight: athlete.displayWeight } : {}),
    ...(profileUrl ? { profileUrl } : {}),
    ...(photo ? { photo } : {})
  };
}

async function resolveClubName(ref, { nationalCode, nationalName, cache }) {
  if (!ref) return null;
  const url = ref.replace("http://sports.core.api.espn.pvt", "https://sports.core.api.espn.com");
  if (!cache.has(url)) {
    cache.set(url, fetchJson(url).catch(() => null));
  }

  const team = await cache.get(url);
  if (!team?.displayName) return null;
  if (team.abbreviation === nationalCode) return null;
  if (nameKey(team.displayName) === nameKey(nationalName)) return null;
  return team.displayName;
}

function mapEspnPosition(position) {
  const value = `${position?.abbreviation ?? ""} ${position?.displayName ?? ""} ${position?.name ?? ""}`.toLowerCase();
  if (value.includes("goalkeeper") || /\bg\b/.test(value)) return "GK";
  if (value.includes("defender") || /\bd\b/.test(value)) return "DF";
  if (value.includes("forward") || /\bf\b/.test(value)) return "FW";
  return "MF";
}

function comparePlayers(a, b) {
  const positionOrder = { GK: 0, DF: 1, MF: 2, FW: 3 };
  const byPosition = positionOrder[a.position] - positionOrder[b.position];
  if (byPosition !== 0) return byPosition;

  const aNumber = Number(a.jersey);
  const bNumber = Number(b.jersey);
  if (Number.isFinite(aNumber) && Number.isFinite(bNumber) && aNumber !== bNumber) {
    return aNumber - bNumber;
  }

  return a.name.localeCompare(b.name);
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { "User-Agent": "CupMate/1.0" } });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${url}`);
  }
  return response.json();
}

async function fetchLines(url) {
  const html = await fetch(url, { headers: { "User-Agent": "CupMate/1.0" } }).then((response) => response.text());
  return decode(html)
  .replace(/<script[\s\S]*?<\/script>/gi, "\n")
  .replace(/<style[\s\S]*?<\/style>/gi, "\n")
  .replace(/<[^>]+>/g, "\n")
  .replace(/\r/g, "")
  .replace(/\n{2,}/g, "\n")
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);
}

function parsePage(lines, sourceUrl, target) {
  let currentTeam = null;
  for (const line of lines) {
    const heading = line.match(/^([A-Za-z .'-]+) World Cup 2026 squad\b/);
    if (heading) {
      currentTeam = normalizeTeamName(heading[1]);
      const code = teamCodes[currentTeam];
      if (code && (!target[code] || sourceUrl !== SOURCE_URL)) {
        target[code] = {
          teamCode: code,
          teamName: currentTeam,
          status: line.toLowerCase().includes("final") ? "Final selection" : "Latest published selection",
          note: "Final 26-player World Cup squad is still pending.",
          sourceLabel: sourceUrl === SOURCE_URL ? "FourFourTwo World Cup 2026 squads" : `FourFourTwo ${currentTeam} squad`,
          sourceUrl,
          players: []
        };
      }
      continue;
    }

    const playerMatch = line.match(/^(GK|DF|MF|FW):\s+(.+?)\s+\((.+)\)$/);
    if (currentTeam && playerMatch && teamCodes[currentTeam]) {
      const [, position, rawName, club] = playerMatch;
      const name = normalizePlayerName(rawName);
      target[teamCodes[currentTeam]].players.push({
        name,
        position,
        club,
        ...(manualPhotos[name] ? { photo: manualPhotos[name] } : {})
      });
    }
  }
}

function parseFixedSource(lines, source, target) {
  target[source.code] = {
    teamCode: source.code,
    teamName: source.teamName,
    status: lines.some((line) => line.toLowerCase().includes("final selection")) ? "Final selection" : "Latest published selection",
    note: "Final 26-player World Cup squad is still pending.",
    sourceLabel: `FourFourTwo ${source.teamName} squad`,
    sourceUrl: source.url,
    players: []
  };

  for (const line of lines) {
    const playerMatch = line.match(/^(GK|DF|MF|FW):\s+(.+?)\s+\((.+)\)$/);
    if (!playerMatch) continue;
    const [, position, rawName, club] = playerMatch;
    const name = normalizePlayerName(rawName);
    target[source.code].players.push({
      name,
      position,
      club,
      ...(manualPhotos[name] ? { photo: manualPhotos[name] } : {})
    });
  }
}

async function enrichWithWikipediaPhotos(value) {
  const players = Object.values(value).flatMap((squad) => squad.players).filter((player) => !player.photo);
  const uniqueNames = [...new Set(players.map((player) => player.name))];
  const photoByName = {};

  for (let index = 0; index < uniqueNames.length; index += 50) {
    const batch = uniqueNames.slice(index, index + 50);
    const params = new URLSearchParams({
      action: "query",
      prop: "pageimages|description",
      pithumbsize: "330",
      redirects: "1",
      titles: batch.join("|"),
      format: "json",
      origin: "*"
    });
    const response = await fetch(`https://en.wikipedia.org/w/api.php?${params}`, { headers: { "User-Agent": "CupMate/1.0" } });
    if (!response.ok) continue;
    const json = await response.json();
    for (const page of Object.values(json.query?.pages ?? {})) {
      const description = String(page.description ?? "").toLowerCase();
      if (!page.thumbnail?.source || !/(football|soccer|association)/.test(description)) continue;
      photoByName[page.title] = page.thumbnail.source;
    }
  }

  for (const squad of Object.values(value)) {
    for (const player of squad.players) {
      if (!player.photo && photoByName[player.name]) {
        player.photo = photoByName[player.name];
      }
    }
  }
}


function normalizeTeamName(name) {
  return name
    .replace("Curucao", "Curacao")
    .replace("The Bosnia and Herzegovina", "Bosnia and Herzegovina")
    .replace(/^The\s+/, "")
    .trim();
}

function normalizePlayerName(name) {
  return name
    .replace(/\s+/g, " ")
    .replace(/[’]/g, "'")
    .trim();
}

function nameKey(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugify(value) {
  return nameKey(value).replace(/\s+/g, "-");
}

function decode(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&eacute;/g, "é")
    .replace(/&Eacute;/g, "É")
    .replace(/&aacute;/g, "á")
    .replace(/&Aacute;/g, "Á")
    .replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó")
    .replace(/&uacute;/g, "ú")
    .replace(/&acirc;/g, "â")
    .replace(/&iuml;/g, "ï")
    .replace(/&scaron;/g, "š")
    .replace(/&Scaron;/g, "Š")
    .replace(/&aelig;/g, "æ")
    .replace(/&ouml;/g, "ö")
    .replace(/&Ouml;/g, "Ö")
    .replace(/&oslash;/g, "ø")
    .replace(/&Oslash;/g, "Ø")
    .replace(/&aring;/g, "å")
    .replace(/&egrave;/g, "è")
    .replace(/&euml;/g, "ë")
    .replace(/&ccedil;/g, "ç")
    .replace(/&atilde;/g, "ã")
    .replace(/&ntilde;/g, "ñ")
    .replace(/&Ccedil;/g, "Ç");
}

function squadCoverageCount(value) {
  return Object.values(value).reduce((sum, squad) => sum + squad.players.length, 0);
}
