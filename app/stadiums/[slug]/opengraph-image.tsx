import { getStadiumOgData, ogContentType, ogSize, renderCupMateOgImage } from "@/lib/og-data";

export const size = ogSize;
export const contentType = ogContentType;

type OpenGraphImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const data = getStadiumOgData(slug);

  return renderCupMateOgImage(
    data ?? {
      title: "World Cup 2026 Stadium Guide",
      category: "Stadium",
      eyebrow: "CupMate",
      detail: "Capacity, transit, tickets, stadium access and match-day fan notes.",
      accent: "blue"
    }
  );
}
