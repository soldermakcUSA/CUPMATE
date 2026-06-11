import { hasVisibleScore } from "@/lib/live-scores";
import type { MatchCardData } from "@/lib/world-cup-data";

type MatchScoreBadgeProps = {
  match: MatchCardData;
  variant?: "default" | "hero" | "mobile";
};

export function MatchScoreBadge({ match, variant = "default" }: MatchScoreBadgeProps) {
  if (!hasVisibleScore(match) || !match.score) return null;

  const isLive = match.score.status === "live" || match.score.status === "halftime";
  const statusLabel = isLive ? match.score.clock ?? match.score.statusText : match.score.statusText;
  const variantClass = variant === "hero" ? "score-hero" : variant;

  return (
    <div className={`match-score-badge ${variantClass} ${isLive ? "is-live" : ""}`} title={`Source: ${match.score.source}`}>
      <span className="match-score-status">{statusLabel}</span>
      <strong>{match.score.home} - {match.score.away}</strong>
    </div>
  );
}
