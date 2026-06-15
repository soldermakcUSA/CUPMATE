"use client";

import { useState } from "react";
import { Radio, X } from "lucide-react";
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
        <div className="match-video-inline is-live" aria-label={stream.title}>
          <div className="match-video-inline-head">
            <span>{stream.source}</span>
            <button type="button" onClick={() => setIsOpen(false)} aria-label={copy.close}>
              <X size={14} aria-hidden="true" />
            </button>
          </div>
          <iframe
            className="match-video-iframe"
            src={`${stream.embedUrl}&autoplay=1`}
            title={stream.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
    </>
  );
}
