"use client";

import { useState } from "react";
import { Bot, MapPin, Send, Sparkles, Train } from "lucide-react";
import { fanZones, itinerary, places } from "@/lib/mock-data";
import { translations, type Locale } from "@/lib/i18n";

type AssistantMenuPanelProps = {
  locale?: Locale;
  t?: typeof translations.en;
};

const promptExamples = [
  "Where should I watch the match in Miami?",
  "How early should I leave for the stadium?",
  "What is on my itinerary?"
];

function panelText(locale: Locale = "en", t?: typeof translations.en) {
  return t ?? translations[locale] ?? translations.en;
}

function buildReply(question: string) {
  const normalized = question.toLowerCase();

  if (normalized.includes("miami") || normalized.includes("watch")) {
    return `Try ${places[0].name} or ${places[1].name}. Both are close to fan activity, and ${places[0].name} is only ${places[0].distance} away.`;
  }

  if (normalized.includes("itinerary") || normalized.includes("ticket")) {
    return `You have ${itinerary.length} saved match days. Your next ticket is ${itinerary[0].match} at ${itinerary[0].venue}.`;
  }

  return "Leave at least 90 minutes before kickoff, keep your ticket QR ready, and use transit where available around host venues.";
}

export function AssistantMenuPanel({ locale = "en", t }: AssistantMenuPanelProps) {
  const copy = panelText(locale, t);
  const [assistantText, setAssistantText] = useState("");
  const [assistantReply, setAssistantReply] = useState(copy.aiGreeting);

  function submitAssistant(value = assistantText) {
    if (!value.trim()) return;
    setAssistantReply(buildReply(value));
    setAssistantText("");
  }

  return (
    <section className="assistant-card menu-panel assistant-menu-panel" aria-labelledby="assistant-panel-title">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div className="logo-mark">
          <Bot size={24} />
        </div>
        <div>
          <h2 id="assistant-panel-title" style={{ margin: 0 }}>{copy.assistant}</h2>
          <p className="small muted" style={{ margin: "4px 0 0" }}>{copy.askAnything}</p>
        </div>
      </div>

      <div
        className="assistant-menu-panel-cards"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 12,
          margin: "18px 0"
        }}
      >
        <article className="match-card assistant-menu-panel-card" style={{ minHeight: 126 }}>
          <Sparkles size={18} color="#5b35f5" />
          <strong style={{ display: "block", marginTop: 10 }}>Smart plan</strong>
          <p className="small muted">Match day timing, ticket checks, and nearby options.</p>
        </article>
        <article className="match-card assistant-menu-panel-card" style={{ minHeight: 126 }}>
          <Train size={18} color="#245bff" />
          <strong style={{ display: "block", marginTop: 10 }}>{copy.travel}</strong>
          <p className="small muted">Routes and exit guidance for saved matches.</p>
        </article>
        <article className="match-card assistant-menu-panel-card" style={{ minHeight: 126 }}>
          <MapPin size={18} color="#12b76a" />
          <strong style={{ display: "block", marginTop: 10 }}>{copy.fanZones}</strong>
          <p className="small muted">{fanZones[0].name} is {fanZones[0].distance} away.</p>
        </article>
      </div>

      <div className="assistant-prompts assistant-menu-panel-prompts">
        {promptExamples.map((prompt) => (
          <button className="prompt-button" key={prompt} onClick={() => submitAssistant(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <p className="small muted" role="status" style={{ lineHeight: 1.55 }}>{assistantReply}</p>

      <div className="assistant-input">
        <input
          value={assistantText}
          onChange={(event) => setAssistantText(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && submitAssistant()}
          placeholder={copy.questionPlaceholder}
          aria-label={copy.questionPlaceholder}
        />
        <button className="send" onClick={() => submitAssistant()} aria-label="Send">
          <Send size={18} />
        </button>
      </div>
    </section>
  );
}
