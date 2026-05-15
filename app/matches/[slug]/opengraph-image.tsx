import { getMatchOgData, ogContentType, ogSize, renderCupMateOgImage } from "@/lib/og-data";

export const size = ogSize;
export const contentType = ogContentType;

type OpenGraphImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const data = getMatchOgData(slug);

  return renderCupMateOgImage(
    data ?? {
      title: "World Cup 2026 Match Preview",
      category: "Match",
      eyebrow: "CupMate",
      detail: "Date, stadium, tickets, odds, squads and fan planning notes.",
      accent: "red"
    }
  );
}
