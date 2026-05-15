import { getHostCityOgData, ogContentType, ogSize, renderCupMateOgImage } from "@/lib/og-data";

export const size = ogSize;
export const contentType = ogContentType;

type OpenGraphImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const data = getHostCityOgData(slug);

  return renderCupMateOgImage(
    data ?? {
      title: "World Cup 2026 Host City Guide",
      category: "Host City",
      eyebrow: "CupMate",
      detail: "Travel, fan zones, tickets, stadium access and where-to-watch planning.",
      accent: "gold"
    }
  );
}
