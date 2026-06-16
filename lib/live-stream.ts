export type LiveStreamConfig = {
  sourceType: "hls" | "youtube";
  sourceUrl: string;
  youtubeVideoId: string;
  title: string;
  description: string;
  poster: string;
  badgeLabel: string;
  rightsNote: string;
};

const defaultYouTubeUrl = "https://www.youtube.com/watch?v=OJlwIdoFz9A";
const configuredHlsUrl = process.env.NEXT_PUBLIC_LIVE_HLS_URL?.trim() ?? "";
const configuredYouTubeUrl = process.env.NEXT_PUBLIC_LIVE_YOUTUBE_URL?.trim() || defaultYouTubeUrl;
const configuredSourceType = process.env.NEXT_PUBLIC_LIVE_SOURCE_TYPE?.trim().toLowerCase();
const sourceType: LiveStreamConfig["sourceType"] =
  configuredSourceType === "hls" ? "hls" : configuredSourceType === "youtube" ? "youtube" : configuredHlsUrl ? "hls" : "youtube";

function youtubeVideoIdFromUrl(value: string) {
  const trimmed = value.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);

    if (url.hostname === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0] ?? "";
      return /^[a-zA-Z0-9_-]{11}$/.test(videoId) ? videoId : "";
    }

    if (url.hostname === "youtube.com" || url.hostname.endsWith(".youtube.com")) {
      const videoId = url.searchParams.get("v") ?? url.pathname.split("/").filter(Boolean).at(-1) ?? "";
      return /^[a-zA-Z0-9_-]{11}$/.test(videoId) ? videoId : "";
    }
  } catch {
    return "";
  }

  return "";
}

export const liveStreamConfig: LiveStreamConfig = {
  sourceType,
  sourceUrl: sourceType === "hls" ? configuredHlsUrl : configuredYouTubeUrl,
  youtubeVideoId: sourceType === "youtube" ? youtubeVideoIdFromUrl(configuredYouTubeUrl) : "",
  title: process.env.NEXT_PUBLIC_LIVE_TITLE?.trim() || (sourceType === "youtube" ? "Always On | 2026 FIFA World Cup" : "CupMate Live"),
  description:
    process.env.NEXT_PUBLIC_LIVE_DESCRIPTION?.trim() ||
    (sourceType === "youtube"
      ? "Watch the embedded World Cup 2026 YouTube video while planning match days with CupMate."
      : "Licensed live coverage appears here when available."),
  poster: process.env.NEXT_PUBLIC_LIVE_POSTER?.trim() || "/assets/cupmate-social-preview-v2.png",
  badgeLabel: process.env.NEXT_PUBLIC_LIVE_BADGE?.trim() || (sourceType === "youtube" ? "YouTube" : "Live now"),
  rightsNote:
    process.env.NEXT_PUBLIC_LIVE_RIGHTS_NOTE?.trim() ||
    (sourceType === "youtube"
      ? "Embedded from YouTube. CupMate does not host, restream or claim rights to this video."
      : "CupMate is independent. Only authorized live streams should be shown here.")
};

export const featuredYouTubeVideoConfig: LiveStreamConfig = {
  sourceType: "youtube",
  sourceUrl: configuredYouTubeUrl,
  youtubeVideoId: youtubeVideoIdFromUrl(configuredYouTubeUrl),
  title: process.env.NEXT_PUBLIC_FEATURED_YOUTUBE_TITLE?.trim() || "Always On | 2026 FIFA World Cup",
  description:
    process.env.NEXT_PUBLIC_FEATURED_YOUTUBE_DESCRIPTION?.trim() ||
    "Official YouTube video for World Cup 2026 viewing and fan planning.",
  poster: process.env.NEXT_PUBLIC_LIVE_POSTER?.trim() || "/assets/cupmate-social-preview-v2.png",
  badgeLabel: "YouTube",
  rightsNote: "Embedded from YouTube. CupMate does not host, restream or claim rights to this video."
};
