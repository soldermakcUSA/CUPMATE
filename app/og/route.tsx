import { ogContentType, ogSize, renderCupMateOgImage } from "@/lib/og-data";

export const size = ogSize;
export const contentType = ogContentType;

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  return renderCupMateOgImage({
    title: searchParams.get("title") ?? "CupMate World Cup 2026 Match Planner",
    category: searchParams.get("category") ?? "World Cup 2026",
    eyebrow: searchParams.get("eyebrow") ?? "Fan planning",
    detail: searchParams.get("detail") ?? "Matches, stadiums, tickets, host cities and match-day logistics.",
    accent: "teal"
  });
}
