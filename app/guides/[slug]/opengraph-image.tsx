import { getGuideOgData, ogContentType, ogSize, renderCupMateOgImage } from "@/lib/og-data";

export const size = ogSize;
export const contentType = ogContentType;

type OpenGraphImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const data = getGuideOgData(slug);

  return renderCupMateOgImage(
    data ?? {
      title: "World Cup 2026 Guide",
      category: "Guide",
      eyebrow: "CupMate",
      detail: "Fan planning, official sources, travel notes and match-day decisions.",
      accent: "teal"
    }
  );
}
