export type LiveStreamConfig = {
  sourceUrl: string;
  title: string;
  description: string;
  poster: string;
  rightsNote: string;
};

export const liveStreamConfig: LiveStreamConfig = {
  sourceUrl: process.env.NEXT_PUBLIC_LIVE_HLS_URL?.trim() ?? "",
  title: process.env.NEXT_PUBLIC_LIVE_TITLE?.trim() || "CupMate Live",
  description:
    process.env.NEXT_PUBLIC_LIVE_DESCRIPTION?.trim() ||
    "Licensed live coverage appears here when available.",
  poster: process.env.NEXT_PUBLIC_LIVE_POSTER?.trim() || "/assets/cupmate-social-preview-v2.png",
  rightsNote:
    process.env.NEXT_PUBLIC_LIVE_RIGHTS_NOTE?.trim() ||
    "CupMate is independent. Only authorized live streams should be shown here."
};
