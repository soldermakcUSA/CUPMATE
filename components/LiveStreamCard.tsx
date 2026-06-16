"use client";

import Link from "next/link";
import { useId } from "react";
import { ExternalLink, PlayCircle, Radio } from "lucide-react";
import { LiveVideoPlayer } from "@/components/LiveVideoPlayer";
import { liveStreamConfig, type LiveStreamConfig } from "@/lib/live-stream";
import { translations } from "@/lib/i18n";

type LiveStreamCardProps = {
  t?: typeof translations.en;
  config?: LiveStreamConfig;
  compact?: boolean;
  showLiveLink?: boolean;
};

export function LiveStreamCard({ t = translations.en, config = liveStreamConfig, compact = false, showLiveLink = true }: LiveStreamCardProps) {
  const headingId = useId();

  return (
    <section className={`live-stream-block ${compact ? "compact" : ""}`} aria-labelledby={headingId}>
      <div className="live-stream-copy">
        <div>
          <span className="live-stream-badge">
            <Radio size={14} />
            {config.badgeLabel || t.liveNow}
          </span>
          <h3 id={headingId}>{config.title || t.liveStream}</h3>
          <p>{config.description || t.liveStreamSubtitle}</p>
        </div>
        <div className="live-stream-actions">
          {config.sourceType === "youtube" && config.sourceUrl && (
            <a className="link-button live-stream-link" href={config.sourceUrl} target="_blank" rel="noreferrer">
              <PlayCircle size={15} />
              <span>YouTube</span>
            </a>
          )}
          {showLiveLink && (
            <Link className="link-button live-stream-link" href="/live">
              <ExternalLink size={15} />
              <span>{t.openLivePage}</span>
            </Link>
          )}
        </div>
      </div>

      <LiveVideoPlayer config={config} t={t} />

      <p className="live-stream-rights">{config.rightsNote || t.liveStreamRightsNote}</p>
    </section>
  );
}
