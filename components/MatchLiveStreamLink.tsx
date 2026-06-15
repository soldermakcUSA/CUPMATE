"use client";

import { useState } from "react";
import { Radio } from "lucide-react";
import { MatchVideoModal } from "@/components/MatchVideoModal";
import type { Locale } from "@/lib/i18n";
import { getMatchLiveStreamByCodes } from "@/lib/match-live-streams";
import { getMatchTimeline } from "@/lib/match-timeline";
import type { MatchCardData } from "@/lib/world-cup-data";

type MatchLiveStreamLinkProps = {
  match: MatchCardData;
  locale?: Locale;
  className?: string;
};

function liveStreamCopy(locale: Locale) {
  if (locale === "ru") {
    return {
      label: "Смотреть live",
      close: "Закрыть трансляцию"
    };
  }

  return {
    label: "Watch live",
    close: "Close stream"
  };
}

export function MatchLiveStreamLink({ match, locale = "en", className = "" }: MatchLiveStreamLinkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeline = getMatchTimeline(match, locale);
  const stream = getMatchLiveStreamByCodes(match.homeCode, match.awayCode);
  const copy = liveStreamCopy(locale);

  if (!stream || timeline.bucket === "past") return null;

  return (
    <>
      <button
        className={`match-video-link is-live ${isOpen ? "is-open" : ""} ${className}`.trim()}
        type="button"
        title={`${stream.source}: ${stream.title}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <Radio size={15} aria-hidden="true" />
        {copy.label}
      </button>
      {isOpen && (
        <MatchVideoModal
          title={stream.title}
          source={stream.source}
          embedUrl={stream.embedUrl}
          closeLabel={copy.close}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
