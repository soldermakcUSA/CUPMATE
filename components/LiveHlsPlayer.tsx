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
type QualityLevel = {
  index: number;
  label: string;
  height: number;
  bitrate: number;
};

type HlsLevelLike = {
  height?: number;
  width?: number;
  bitrate?: number;
  maxBitrate?: number;
  name?: string;
};

function qualityLabel(level: HlsLevelLike, fallbackIndex: number) {
  if (level.name) return level.name;
  if (level.height) return level.height >= 720 ? `${level.height}p HD` : `${level.height}p`;
  if (level.bitrate || level.maxBitrate) return `${Math.round((level.bitrate || level.maxBitrate || 0) / 1000)} kbps`;
  return fallbackIndex === 0 ? "Source" : `Level ${fallbackIndex + 1}`;
}

function toQualityLevels(levels: HlsLevelLike[]) {
  return levels.map((level, index) => ({
    index,
    label: qualityLabel(level, index),
    height: level.height || 0,
    bitrate: level.bitrate || level.maxBitrate || 0
  }));
}

function highestQualityIndex(levels: QualityLevel[]) {
  return levels.reduce((bestIndex, level, index) => {
    const best = levels[bestIndex];
    const levelScore = level.bitrate || level.height || 0;
    const bestScore = best.bitrate || best.height || 0;

    return levelScore > bestScore ? index : bestIndex;
  }, 0);
}

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
  const [qualityLevels, setQualityLevels] = useState<QualityLevel[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | "auto">("auto");
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  function changeQuality(value: string) {
    const hls = hlsRef.current;
    const nextLevel = value === "auto" ? "auto" : Number(value);

    setSelectedLevel(nextLevel);

    if (!hls) return;

    if (nextLevel === "auto") {
      hls.currentLevel = -1;
      return;
    }

    hls.currentLevel = nextLevel;
    hls.nextLevel = nextLevel;
  }

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !sourceUrl) {
      setPlayerState("idle");
      setQualityLevels([]);
      setSelectedLevel("auto");
      setActiveLevel(null);
      return;
    }

    let isCancelled = false;
    setPlayerState("loading");
    setQualityLevels([]);
    setSelectedLevel("auto");
    setActiveLevel(null);

    async function attachStream(videoElement: HTMLVideoElement) {
      hlsRef.current?.destroy();
      hlsRef.current = null;
      videoElement.removeAttribute("src");
      videoElement.load();

      const { default: Hls } = await import("hls.js");

      if (isCancelled) return;

      if (!Hls.isSupported()) {
        if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          videoElement.src = sourceUrl;
          setQualityLevels([{ index: 0, label: "Source", height: 0, bitrate: 0 }]);
          setSelectedLevel(0);
          setActiveLevel(0);
          setPlayerState("ready");
          return;
        }

        setPlayerState("unsupported");
        return;
      }

      const hls = new Hls({
        backBufferLength: 90,
        enableWorker: true,
        lowLatencyMode: true,
        startLevel: -1
      });

      hlsRef.current = hls;
      hls.loadSource(sourceUrl);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!isCancelled) {
          const levels = toQualityLevels(hls.levels as HlsLevelLike[]);
          const nextLevels = levels.length > 0 ? levels : [{ index: 0, label: "Source", height: 0, bitrate: 0 }];
          const highestIndex = highestQualityIndex(nextLevels);
          const forcedLevel = nextLevels[highestIndex]?.index ?? 0;

          hls.currentLevel = forcedLevel;
          hls.nextLevel = forcedLevel;
          setQualityLevels(nextLevels);
          setSelectedLevel(forcedLevel);
          setActiveLevel(forcedLevel);
          setPlayerState("ready");
        }
      });
      hls.on(Hls.Events.LEVEL_SWITCHED, (_event, data) => {
        if (!isCancelled) {
          setActiveLevel(data.level);
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
      setQualityLevels([]);
      setSelectedLevel("auto");
      setActiveLevel(null);
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
      {playerState === "ready" && qualityLevels.length > 0 && (
        <label className="live-quality-control">
          <span>Quality</span>
          <select value={selectedLevel} onChange={(event) => changeQuality(event.target.value)} aria-label="Live stream quality">
            {qualityLevels.length > 1 && <option value="auto">Auto</option>}
            {qualityLevels.map((level) => (
              <option value={level.index} key={level.index}>
                {level.label}{activeLevel === level.index ? " active" : ""}
              </option>
            ))}
          </select>
        </label>
      )}
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
