import { MatchDetailClient } from "./MatchDetailClient";

export default async function MatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <MatchDetailClient slug={slug} />;
}
