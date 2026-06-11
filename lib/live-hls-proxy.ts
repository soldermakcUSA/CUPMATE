const LIVE_ASSET_PATH = "/api/live/asset";

export function getLiveUpstreamUrl() {
  const sourceUrl = process.env.LIVE_HLS_SOURCE_URL?.trim();

  if (!sourceUrl) return null;

  try {
    return new URL(sourceUrl);
  } catch {
    return null;
  }
}

export function getAllowedLiveHosts(upstreamUrl: URL) {
  const extraHosts = process.env.LIVE_HLS_ALLOWED_HOSTS?.split(",") ?? [];

  return new Set([
    upstreamUrl.hostname,
    ...extraHosts.map((host) => host.trim()).filter(Boolean)
  ]);
}

export function isAllowedLiveAssetUrl(targetUrl: URL, upstreamUrl: URL) {
  return getAllowedLiveHosts(upstreamUrl).has(targetUrl.hostname);
}

export function proxiedLiveAssetUrl(targetUrl: URL) {
  return `${LIVE_ASSET_PATH}?url=${encodeURIComponent(targetUrl.toString())}`;
}

export function resolveLivePlaylistUrl(value: string, baseUrl: URL) {
  return new URL(value, baseUrl);
}

export function rewriteLivePlaylist(playlist: string, baseUrl: URL) {
  return playlist
    .split(/\r?\n/)
    .map((line) => {
      const trimmed = line.trim();

      if (!trimmed) return line;

      if (trimmed.startsWith("#")) {
        return line.replace(/URI="([^"]+)"/g, (_match, uri: string) => {
          const resolvedUrl = resolveLivePlaylistUrl(uri, baseUrl);
          return `URI="${proxiedLiveAssetUrl(resolvedUrl)}"`;
        });
      }

      return proxiedLiveAssetUrl(resolveLivePlaylistUrl(trimmed, baseUrl));
    })
    .join("\n");
}

export function isHlsPlaylistResponse(targetUrl: URL, contentType: string | null) {
  const normalizedType = contentType?.toLowerCase() ?? "";

  return (
    normalizedType.includes("mpegurl") ||
    normalizedType.includes("application/vnd.apple.mpegurl") ||
    targetUrl.pathname.toLowerCase().endsWith(".m3u8")
  );
}
