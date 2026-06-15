"use client";

import { useEffect, useMemo, useState } from "react";
import { PlayCircle, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getMatchTimeline } from "@/lib/match-timeline";
import type { MatchCardData } from "@/lib/world-cup-data";

type MatchHighlight = {
  videoId: string;
  title: string;
  url: string;
  embedUrl: string;
  publishedAt: string;
  thumbnail: string | null;
  source: string;
};

type MatchHighlightLinkProps = {
  match: MatchCardData;
  locale?: Locale;
  className?: string;
};

function highlightCopy(locale: Locale) {
  if (locale === "ru") {
    return {
      label: "Смотреть хайлайты",
      close: "Закрыть видео"
    };
  }

  return {
    label: "Watch highlights",
    close: "Close video"
  };
}

export function MatchHighlightLink({ match, locale = "en", className = "" }: MatchHighlightLinkProps) {
  const [highlight, setHighlight] = useState<MatchHighlight | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const timeline = getMatchTimeline(match, locale);
  const copy = highlightCopy(locale);
  const params = useMemo(() => {
    if (timeline.bucket !== "past" || !match.homeCode || !match.awayCode) return null;

    return new URLSearchParams({
      homeCode: match.homeCode,
      awayCode: match.awayCode,
      homeName: match.homeName ?? match.home,
      awayName: match.awayName ?? match.away
    }).toString();
  }, [locale, match.away, match.awayCode, match.awayName, match.home, match.homeCode, match.homeName, timeline.bucket]);

  useEffect(() => {
    if (!params) {
      setHighlight(null);
      return;
    }

    const controller = new AbortController();
    fetch(`/api/youtube-highlights?${params}`, {
      cache: "no-store",
      signal: controller.signal
    })
      .then((response) => response.ok ? response.json() : { highlight: null })
      .then((payload: { highlight: MatchHighlight | null }) => {
        setHighlight(payload.highlight);
        setIsOpen(false);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setHighlight(null);
      });

    return () => {
      controller.abort();
    };
  }, [params]);

  if (!highlight) return null;

  return (
    <>
      <button
        className={`match-highlight-link ${isOpen ? "is-open" : ""} ${className}`.trim()}
        type="button"
        title={`${highlight.source}: ${highlight.title}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <PlayCircle size={15} aria-hidden="true" />
        {copy.label}
      </button>
      {isOpen && (
        <div className="match-highlight-inline" aria-label={highlight.title}>
          <div className="match-highlight-inline-head">
            <span>{highlight.source}</span>
            <button type="button" onClick={() => setIsOpen(false)} aria-label={copy.close}>
              <X size={14} aria-hidden="true" />
            </button>
          </div>
          <iframe
            className="match-highlight-iframe"
            src={`${highlight.embedUrl}&autoplay=1`}
            title={highlight.title}
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
