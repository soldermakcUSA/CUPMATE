"use client";

import Link from "next/link";
import { useId } from "react";
import { ExternalLink, PlayCircle, Radio } from "lucide-react";
import { LiveVideoPlayer } from "@/components/LiveVideoPlayer";
import { liveStreamConfig } from "@/lib/live-stream";
import { translations } from "@/lib/i18n";

type LiveStreamCardProps = {
  t?: typeof translations.en;
  compact?: boolean;
  showLiveLink?: boolean;
};

export function LiveStreamCard({ t = translations.en, compact = false, showLiveLink = true }: LiveStreamCardProps) {
  const headingId = useId();

  return (
    <section className={`live-stream-block ${compact ? "compact" : ""}`} aria-labelledby={headingId}>
      <div className="live-stream-copy">
        <div>
          <span className="live-stream-badge">
            <Radio size={14} />
            {liveStreamConfig.badgeLabel || t.liveNow}
          </span>
          <h3 id={headingId}>{liveStreamConfig.title || t.liveStream}</h3>
          <p>{liveStreamConfig.description || t.liveStreamSubtitle}</p>
        </div>
        <div className="live-stream-actions">
          {liveStreamConfig.sourceType === "youtube" && liveStreamConfig.sourceUrl && (
            <a className="link-button live-stream-link" href={liveStreamConfig.sourceUrl} target="_blank" rel="noreferrer">
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

      <LiveVideoPlayer config={liveStreamConfig} t={t} />

      <p className="live-stream-rights">{liveStreamConfig.rightsNote || t.liveStreamRightsNote}</p>
    </section>
  );
}
