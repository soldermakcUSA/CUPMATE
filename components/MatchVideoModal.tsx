"use client";

import { useEffect, useId } from "react";
import { X } from "lucide-react";

type MatchVideoModalProps = {
  title: string;
  source: string;
  embedUrl: string;
  closeLabel: string;
  onClose: () => void;
};

export function MatchVideoModal({ title, source, embedUrl, closeLabel, onClose }: MatchVideoModalProps) {
  const titleId = useId();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="match-video-modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="match-video-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="match-video-modal-head">
          <div>
            <span>{source}</span>
            <h3 id={titleId}>{title}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label={closeLabel}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <iframe
          className="match-video-modal-frame"
          src={`${embedUrl}&autoplay=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </section>
    </div>
  );
}
