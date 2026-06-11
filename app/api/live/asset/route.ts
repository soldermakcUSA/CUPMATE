import {
  getLiveUpstreamUrl,
  isAllowedLiveAssetUrl,
  isHlsPlaylistResponse,
  rewriteLivePlaylist
} from "@/lib/live-hls-proxy";

export const dynamic = "force-dynamic";

function responseHeaders(contentType: string | null, isPlaylist = false) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": isPlaylist ? "no-store" : "public, max-age=30",
    "Content-Type": contentType || (isPlaylist ? "application/vnd.apple.mpegurl; charset=utf-8" : "video/mp2t")
  };
}

export async function GET(request: Request) {
  const upstreamUrl = getLiveUpstreamUrl();
  const requestUrl = new URL(request.url);
  const assetUrlValue = requestUrl.searchParams.get("url");

  if (!upstreamUrl || !assetUrlValue) {
    return new Response("Live HLS asset is not configured.", {
      status: 404,
      headers: responseHeaders("text/plain; charset=utf-8")
    });
  }

  let assetUrl: URL;

  try {
    assetUrl = new URL(assetUrlValue);
  } catch {
    return new Response("Invalid live HLS asset URL.", {
      status: 400,
      headers: responseHeaders("text/plain; charset=utf-8")
    });
  }

  if (!isAllowedLiveAssetUrl(assetUrl, upstreamUrl)) {
    return new Response("Live HLS asset host is not allowed.", {
      status: 403,
      headers: responseHeaders("text/plain; charset=utf-8")
    });
  }

  const rangeHeader = request.headers.get("range");
  const upstreamResponse = await fetch(assetUrl, {
    cache: "no-store",
    headers: {
      ...(rangeHeader ? { Range: rangeHeader } : {})
    }
  });
  const contentType = upstreamResponse.headers.get("content-type");
  const isPlaylist = isHlsPlaylistResponse(assetUrl, contentType);

  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return new Response("Live HLS asset is unavailable.", {
      status: upstreamResponse.status,
      headers: responseHeaders("text/plain; charset=utf-8")
    });
  }

  if (isPlaylist) {
    const playlist = await upstreamResponse.text();

    return new Response(rewriteLivePlaylist(playlist, assetUrl), {
      status: 200,
      headers: responseHeaders("application/vnd.apple.mpegurl; charset=utf-8", true)
    });
  }

  const headers = responseHeaders(contentType, false);
  const contentLength = upstreamResponse.headers.get("content-length");
  const contentRange = upstreamResponse.headers.get("content-range");

  if (contentLength) {
    headers["Content-Length" as keyof typeof headers] = contentLength;
  }

  if (contentRange) {
    headers["Content-Range" as keyof typeof headers] = contentRange;
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers
  });
}
