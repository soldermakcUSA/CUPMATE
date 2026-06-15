"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, PlayCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getMatchTimeline } from "@/lib/match-timeline";
import type { MatchCardData } from "@/lib/world-cup-data";

type MatchHighlight = {
  videoId: string;
  title: string;
  url: string;
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
      label: "Видеообзор",
      source: "FIFA YouTube"
    };
  }

  return {
    label: "Highlights",
    source: "FIFA YouTube"
  };
}

export function MatchHighlightLink({ match, locale = "en", className = "" }: MatchHighlightLinkProps) {
  const [highlight, setHighlight] = useState<MatchHighlight | null>(null);
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
    <a
      className={`match-highlight-link ${className}`.trim()}
      href={highlight.url}
      target="_blank"
      rel="noreferrer"
      title={`${copy.source}: ${highlight.title}`}
    >
      <PlayCircle size={15} aria-hidden="true" />
      {copy.label}
      <ExternalLink size={13} aria-hidden="true" />
    </a>
  );
}
