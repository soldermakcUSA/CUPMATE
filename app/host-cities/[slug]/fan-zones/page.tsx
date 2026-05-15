import type { Metadata } from "next";
import { buildLocalSeoMetadata, generateLocalSeoStaticParams, HostCityLocalSeoPage } from "../local-seo";

type LocalSeoPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return generateLocalSeoStaticParams();
}

export async function generateMetadata({ params }: LocalSeoPageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildLocalSeoMetadata("fan-zones", slug);
}

export default async function HostCityFanZonesPage({ params }: LocalSeoPageProps) {
  const { slug } = await params;
  return <HostCityLocalSeoPage kind="fan-zones" slug={slug} />;
}
