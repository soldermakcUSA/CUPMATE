import {
  getLiveUpstreamUrl,
  rewriteLivePlaylist
} from "@/lib/live-hls-proxy";

export const dynamic = "force-dynamic";

const playlistHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-store",
  "Content-Type": "application/vnd.apple.mpegurl; charset=utf-8"
};

export async function GET() {
  const upstreamUrl = getLiveUpstreamUrl();

  if (!upstreamUrl) {
    return new Response("Live HLS upstream is not configured.", {
      status: 404,
      headers: playlistHeaders
    });
  }

  const upstreamResponse = await fetch(upstreamUrl, {
    cache: "no-store",
    headers: {
      Accept: "application/vnd.apple.mpegurl, application/x-mpegURL, */*"
    }
  });

  if (!upstreamResponse.ok) {
    return new Response("Live HLS upstream is unavailable.", {
      status: upstreamResponse.status,
      headers: playlistHeaders
    });
  }

  const playlist = await upstreamResponse.text();

  return new Response(rewriteLivePlaylist(playlist, upstreamUrl), {
    status: 200,
    headers: playlistHeaders
  });
}
