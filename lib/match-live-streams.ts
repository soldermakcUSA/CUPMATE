export type MatchLiveStream = {
  homeCode: string;
  awayCode: string;
  videoId: string;
  title: string;
  source: string;
  url: string;
  embedUrl: string;
};

const liveStreams: MatchLiveStream[] = [
  {
    homeCode: "IRN",
    awayCode: "NZL",
    videoId: "OJlwIdoFz9A",
    title: "Iran vs New Zealand 2026 FIFA World Cup",
    source: "FOX Sports YouTube",
    url: "https://www.youtube.com/watch?v=OJlwIdoFz9A",
    embedUrl: "https://www.youtube.com/embed/OJlwIdoFz9A?rel=0&modestbranding=1"
  }
];

export function getMatchLiveStreamByCodes(homeCode?: string | null, awayCode?: string | null) {
  const home = homeCode?.toUpperCase();
  const away = awayCode?.toUpperCase();
  if (!home || !away) return null;

  return liveStreams.find((stream) => stream.homeCode === home && stream.awayCode === away) ?? null;
}
