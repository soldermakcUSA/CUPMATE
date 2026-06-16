"use client";

import Link from "next/link";
import { useId } from "react";
import { ExternalLink, Radio } from "lucide-react";
import { LiveHlsPlayer } from "@/components/LiveHlsPlayer";
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
            {t.liveNow}
          </span>
          <h3 id={headingId}>{liveStreamConfig.title || t.liveStream}</h3>
          <p>{liveStreamConfig.description || t.liveStreamSubtitle}</p>
        </div>
        {showLiveLink && (
          <Link className="link-button live-stream-link" href="/live">
            <ExternalLink size={15} />
            <span>{t.openLivePage}</span>
          </Link>
        )}
      </div>

      <LiveHlsPlayer
        sourceUrl={liveStreamConfig.sourceUrl}
        poster={liveStreamConfig.poster}
        title={liveStreamConfig.title || t.liveStream}
        unavailableText={t.liveStreamUnavailable}
        loadingText={t.liveStreamLoading}
        errorText={t.liveStreamLoadError}
        retryText={t.retry}
      />

      <p className="live-stream-rights">{liveStreamConfig.rightsNote || t.liveStreamRightsNote}</p>
    </section>
  );
}
