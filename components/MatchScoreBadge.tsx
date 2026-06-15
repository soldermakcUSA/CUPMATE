import { hasVisibleScore } from "@/lib/live-scores";
import type { Locale } from "@/lib/i18n";
import { getMatchTimeline } from "@/lib/match-timeline";
import type { MatchCardData } from "@/lib/world-cup-data";

type MatchScoreBadgeProps = {
  match: MatchCardData;
  variant?: "default" | "hero" | "mobile";
  locale?: Locale;
};

export function MatchScoreBadge({ match, variant = "default", locale = "en" }: MatchScoreBadgeProps) {
  const timeline = getMatchTimeline(match, locale);
  const hasScore = hasVisibleScore(match) && match.score;
  const variantClass = variant === "hero" ? "score-hero" : variant;
  const title = hasScore ? `Source: ${hasScore.source}` : timeline.label;

  return (
    <div className={`match-score-badge ${variantClass} is-${timeline.bucket} ${hasScore ? "" : "match-score-placeholder"}`} title={title}>
      <span className="match-score-status">{timeline.label}</span>
      <strong>{timeline.detail}</strong>
    </div>
  );
}
