import { NextResponse } from "next/server";

const FIFA_YOUTUBE_CHANNEL_ID = "UCpcTrCXblq78GZrTUTLWeBw";
const FIFA_YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${FIFA_YOUTUBE_CHANNEL_ID}`;

type HighlightEntry = {
  videoId: string;
  title: string;
  url: string;
  publishedAt: string;
  thumbnail: string | null;
  description: string;
};

const teamAliases: Record<string, string[]> = {
  AUS: ["australia"],
  BEL: ["belgium"],
  BIH: ["bosnia and herzegovina", "bosnia"],
  BRA: ["brazil"],
  CAN: ["canada"],
  CIV: ["ivory coast", "cote d'ivoire", "côte d'ivoire", "cote divoire"],
  CPV: ["cape verde", "cabo verde"],
  CUW: ["curacao", "curaçao"],
  CZE: ["czechia", "czech republic"],
  ECU: ["ecuador"],
  EGY: ["egypt"],
  ESP: ["spain"],
  GER: ["germany"],
  HAI: ["haiti"],
  IRN: ["iran"],
  JPN: ["japan"],
  KOR: ["south korea", "korea republic", "korea"],
  KSA: ["saudi arabia", "saudi"],
  MAR: ["morocco"],
  MEX: ["mexico"],
  NED: ["netherlands"],
  NZL: ["new zealand"],
  PAR: ["paraguay"],
  QAT: ["qatar"],
  RSA: ["south africa"],
  SCO: ["scotland"],
  SUI: ["switzerland"],
  SWE: ["sweden"],
  TUN: ["tunisia"],
  TUR: ["turkiye", "türkiye", "turkey"],
  URU: ["uruguay"],
  USA: ["united states", "usa", "usmnt"]
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const homeCode = searchParams.get("homeCode") ?? "";
  const awayCode = searchParams.get("awayCode") ?? "";
  const homeName = searchParams.get("homeName") ?? "";
  const awayName = searchParams.get("awayName") ?? "";

  if (!homeCode || !awayCode) {
    return NextResponse.json({ highlight: null }, { status: 400 });
  }

  let response: Response;
  try {
    response = await fetch(FIFA_YOUTUBE_FEED_URL, {
      next: { revalidate: 300 },
      headers: { accept: "application/atom+xml, application/xml;q=0.9, text/xml;q=0.8" }
    });
  } catch {
    return NextResponse.json({ highlight: null }, { status: 502 });
  }

  if (!response.ok) {
    return NextResponse.json({ highlight: null }, { status: 502 });
  }

  const xml = await response.text();
  const highlight = findBestHighlight(parseFeed(xml), {
    homeCode,
    awayCode,
    homeName,
    awayName
  });

  return NextResponse.json({ highlight });
}

function parseFeed(xml: string): HighlightEntry[] {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => {
    const entry = match[1];
    const videoId = text(entry, "yt:videoId");
    const title = text(entry, "title");
    const url = attr(entry, "link", "href") ?? (videoId ? `https://www.youtube.com/watch?v=${videoId}` : "");
    const thumbnail = attr(entry, "media:thumbnail", "url");

    return {
      videoId,
      title,
      url,
      publishedAt: text(entry, "published"),
      thumbnail,
      description: text(entry, "media:description")
    };
  }).filter((entry) => entry.videoId && entry.title);
}

function findBestHighlight(entries: HighlightEntry[], match: { homeCode: string; awayCode: string; homeName: string; awayName: string }) {
  const homeAliases = aliasesFor(match.homeCode, match.homeName);
  const awayAliases = aliasesFor(match.awayCode, match.awayName);

  const ranked = entries
    .map((entry) => {
      const haystack = normalize(`${entry.title} ${entry.description}`);
      const hasHome = homeAliases.some((alias) => haystack.includes(alias));
      const hasAway = awayAliases.some((alias) => haystack.includes(alias));
      const isShort = entry.url.includes("/shorts/") || haystack.includes("shorts");
      const mentionsWorldCup = haystack.includes("world cup 2026") || haystack.includes("fifa world cup");
      const hasScoreline = /\b\d+\s*[-–]\s*\d+\b/.test(entry.title);
      const hasHighlights = haystack.includes("highlight");
      const hasClipWord = haystack.includes("save") || haystack.includes("goal");
      const score = (hasHome ? 4 : 0) + (hasAway ? 4 : 0) + (mentionsWorldCup ? 2 : 0) + (hasScoreline ? 2 : 0) + (hasHighlights ? 4 : hasClipWord ? 1 : 0) + (isShort ? -3 : 0);
      return { entry, score, hasHome, hasAway };
    })
    .filter((item) => item.hasHome && item.hasAway && item.score >= 8)
    .sort((a, b) => b.score - a.score || Date.parse(b.entry.publishedAt) - Date.parse(a.entry.publishedAt));

  const best = ranked[0]?.entry;
  if (!best) return null;

  return {
    videoId: best.videoId,
    title: best.title,
    url: best.url,
    publishedAt: best.publishedAt,
    thumbnail: best.thumbnail,
    source: "FIFA YouTube"
  };
}

function aliasesFor(code: string, name: string) {
  return [...new Set([
    ...(teamAliases[code.toUpperCase()] ?? []),
    code.toLowerCase(),
    normalize(name)
  ].filter(Boolean))];
}

function normalize(value: string) {
  return decodeEntities(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function text(entry: string, tag: string) {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const value = entry.match(new RegExp(`<${escapedTag}>([\\s\\S]*?)<\\/${escapedTag}>`))?.[1] ?? "";
  return decodeEntities(value.trim());
}

function attr(entry: string, tag: string, attribute: string) {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedAttribute = attribute.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = entry.match(new RegExp(`<${escapedTag}[^>]*\\s${escapedAttribute}="([^"]+)"[^>]*>`));
  return match?.[1] ? decodeEntities(match[1]) : null;
}

function decodeEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
