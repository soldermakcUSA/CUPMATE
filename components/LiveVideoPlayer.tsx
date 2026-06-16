"use client";

import { LiveHlsPlayer } from "@/components/LiveHlsPlayer";
import type { LiveStreamConfig } from "@/lib/live-stream";
import { translations } from "@/lib/i18n";

type LiveVideoPlayerProps = {
  config: LiveStreamConfig;
  t?: typeof translations.en;
};

export function LiveVideoPlayer({ config, t = translations.en }: LiveVideoPlayerProps) {
  if (config.sourceType === "youtube" && config.youtubeVideoId) {
    const embedUrl = `https://www.youtube-nocookie.com/embed/${config.youtubeVideoId}?rel=0&modestbranding=1&playsinline=1`;

    return (
      <div className="live-player live-youtube-player">
        <iframe
          src={embedUrl}
          title={config.title || t.liveStream}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <LiveHlsPlayer
      sourceUrl={config.sourceUrl}
      poster={config.poster}
      title={config.title || t.liveStream}
      unavailableText={t.liveStreamUnavailable}
      loadingText={t.liveStreamLoading}
      errorText={t.liveStreamLoadError}
      retryText={t.retry}
    />
  );
}
