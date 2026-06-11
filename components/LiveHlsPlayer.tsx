"use client";

import { useEffect, useRef, useState } from "react";
import { Radio, RotateCcw, WifiOff } from "lucide-react";
import type Hls from "hls.js";

type LiveHlsPlayerProps = {
  sourceUrl: string;
  poster?: string;
  title: string;
  unavailableText: string;
  loadingText: string;
  errorText: string;
  retryText: string;
};

type PlayerState = "idle" | "loading" | "ready" | "error" | "unsupported";

export function LiveHlsPlayer({
  sourceUrl,
  poster,
  title,
  unavailableText,
  loadingText,
  errorText,
  retryText
}: LiveHlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>(sourceUrl ? "loading" : "idle");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !sourceUrl) {
      setPlayerState("idle");
      return;
    }

    let isCancelled = false;
    setPlayerState("loading");

    async function attachStream(videoElement: HTMLVideoElement) {
      hlsRef.current?.destroy();
      hlsRef.current = null;
      videoElement.removeAttribute("src");
      videoElement.load();

      if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = sourceUrl;
        setPlayerState("ready");
        return;
      }

      const { default: Hls } = await import("hls.js");

      if (isCancelled) return;

      if (!Hls.isSupported()) {
        setPlayerState("unsupported");
        return;
      }

      const hls = new Hls({
        backBufferLength: 90,
        enableWorker: true,
        lowLatencyMode: true
      });

      hlsRef.current = hls;
      hls.loadSource(sourceUrl);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!isCancelled) {
          setPlayerState("ready");
        }
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal && !isCancelled) {
          setPlayerState("error");
        }
      });
    }

    attachStream(video).catch(() => {
      if (!isCancelled) {
        setPlayerState("error");
      }
    });

    return () => {
      isCancelled = true;
      hlsRef.current?.destroy();
      hlsRef.current = null;
      video.removeAttribute("src");
      video.load();
    };
  }, [reloadKey, sourceUrl]);

  const message =
    playerState === "idle"
      ? unavailableText
      : playerState === "loading"
        ? loadingText
        : playerState === "unsupported"
          ? errorText
          : playerState === "error"
            ? errorText
            : "";

  return (
    <div className="live-player">
      <video
        ref={videoRef}
        className="live-player-video"
        controls
        playsInline
        poster={poster}
        preload="metadata"
        aria-label={title}
      />
      {message && (
        <div className="live-player-overlay">
          <div className="live-player-message">
            {playerState === "idle" ? <WifiOff size={22} /> : <Radio size={22} />}
            <span>{message}</span>
            {(playerState === "error" || playerState === "unsupported") && (
              <button className="live-retry-button" type="button" onClick={() => setReloadKey((value) => value + 1)}>
                <RotateCcw size={16} />
                <span>{retryText}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
