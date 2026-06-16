"use client";

import { useEffect, useState } from "react";
import { ExternalLink, PlayCircle, RotateCcw } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type YouTubeHighlight = {
  videoId: string;
  title: string;
  url: string;
  publishedAt: string;
  thumbnail: string | null;
  source: string;
  views: number | null;
};

type HighlightsPayload = {
  highlights?: YouTubeHighlight[];
};

type YouTubeHighlightsRailProps = {
  locale?: Locale;
  limit?: number;
  compact?: boolean;
};

const refreshIntervalMs = 5 * 60 * 1000;
const playlistUrl = "https://www.youtube.com/playlist?list=PLSoN6Th-EepMUaxmTobuR_SBwVkdkxdfO";

function copyFor(locale: Locale) {
  if (locale === "ru") {
    return {
      title: "Свежие хайлайты",
      subtitle: "Новые ролики из YouTube-плейлиста FOX Sports появляются здесь автоматически.",
      playlist: "Плейлист",
      open: "Смотреть",
      loading: "Загружаем хайлайты...",
      empty: "Хайлайты пока не найдены.",
      error: "Не удалось загрузить хайлайты.",
      retry: "Повторить",
      views: "просмотров"
    };
  }

  return {
    title: "Latest highlights",
    subtitle: "New videos from the FOX Sports YouTube playlist appear here automatically.",
    playlist: "Playlist",
    open: "Watch",
    loading: "Loading highlights...",
    empty: "No highlights found yet.",
    error: "Unable to load highlights.",
    retry: "Retry",
    views: "views"
  };
}

function formatDate(value: string, locale: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function formatViews(value: number | null, locale: Locale) {
  if (value === null) return "";

  return new Intl.NumberFormat(locale === "ru" ? "ru-RU" : "en-US", {
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1
  }).format(value);
}

export function YouTubeHighlightsRail({ locale = "en", limit = 4, compact = false }: YouTubeHighlightsRailProps) {
  const [highlights, setHighlights] = useState<YouTubeHighlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const copy = copyFor(locale);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loadHighlights() {
      try {
        setError(false);
        const response = await fetch(`/api/youtube-highlights?limit=${limit}`, {
          cache: "no-store",
          signal: controller.signal
        });

        if (!response.ok) throw new Error("Unable to load YouTube highlights.");

        const payload = await response.json() as HighlightsPayload;
        if (isMounted) {
          setHighlights(payload.highlights ?? []);
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadHighlights();
    const intervalId = window.setInterval(loadHighlights, refreshIntervalMs);

    return () => {
      isMounted = false;
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, [limit, reloadKey]);

  return (
    <section className={`youtube-highlights ${compact ? "compact" : ""}`} aria-labelledby="youtube-highlights-title">
      <div className="youtube-highlights-head">
        <div>
          <h3 id="youtube-highlights-title">{copy.title}</h3>
          <p>{copy.subtitle}</p>
        </div>
        <a className="link-button" href={playlistUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={14} />
          <span>{copy.playlist}</span>
        </a>
      </div>

      {isLoading && highlights.length === 0 && <p className="small muted youtube-highlights-status">{copy.loading}</p>}

      {!isLoading && highlights.length === 0 && (
        <div className="youtube-highlights-empty">
          <p className="small muted">{error ? copy.error : copy.empty}</p>
          {error && (
            <button
              className="link-button"
              type="button"
              onClick={() => {
                setIsLoading(true);
                setReloadKey((value) => value + 1);
              }}
            >
              <RotateCcw size={14} />
              <span>{copy.retry}</span>
            </button>
          )}
        </div>
      )}

      {highlights.length > 0 && (
        <div className="youtube-highlight-list">
          {highlights.map((highlight) => {
            const viewCount = formatViews(highlight.views, locale);
            const publishedAt = formatDate(highlight.publishedAt, locale);
            const meta = [highlight.source, viewCount ? `${viewCount} ${copy.views}` : "", publishedAt].filter(Boolean).join(" · ");

            return (
              <a className="youtube-highlight-item" href={highlight.url} target="_blank" rel="noreferrer" key={highlight.videoId}>
                <span className="youtube-highlight-thumb">
                  {highlight.thumbnail && <img src={highlight.thumbnail} alt="" loading="lazy" />}
                  <span><PlayCircle size={24} /></span>
                </span>
                <span className="youtube-highlight-body">
                  <strong>{highlight.title}</strong>
                  <small>{meta}</small>
                </span>
                <span className="youtube-highlight-open">
                  {copy.open}
                  <ExternalLink size={13} />
                </span>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
