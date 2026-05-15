import { ImageResponse } from "next/og";
import React from "react";
import { findEditorialArticle } from "@/lib/editorial-content";
import { findMatchDetail } from "@/lib/match-details";
import { hostCityGuides, siteName, stadiumGuides } from "@/lib/seo";

export const ogSize = {
  width: 1200,
  height: 630
};

export const ogContentType = "image/png";

export type CupMateOgInput = {
  title: string;
  category: string;
  eyebrow?: string;
  detail?: string;
  accent?: "teal" | "blue" | "gold" | "red";
};

const accentColors = {
  teal: "#2dd4bf",
  blue: "#60a5fa",
  gold: "#facc15",
  red: "#fb7185"
} as const;

function clean(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, 120) : fallback;
}

function h(type: React.ElementType, props: Record<string, unknown> | null, ...children: React.ReactNode[]) {
  return React.createElement(type, props, ...children);
}

export function renderCupMateOgImage(input: CupMateOgInput) {
  const accent = accentColors[input.accent ?? "teal"];
  const category = clean(input.category, "World Cup 2026");
  const title = clean(input.title, "CupMate World Cup 2026 Planner");
  const eyebrow = clean(input.eyebrow, "Fan planning");
  const detail = clean(input.detail, "Matches, stadiums, tickets, host cities and fan logistics.");

  return new ImageResponse(
    h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#08111f",
          color: "#f8fafc",
          fontFamily: "Arial, Helvetica, sans-serif"
        }
      },
      h("div", {
        style: {
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(45,212,191,0.24) 0%, rgba(8,17,31,0.88) 38%, rgba(15,23,42,1) 100%)"
        }
      }),
      h("div", {
        style: {
          position: "absolute",
          right: -120,
          top: -90,
          width: 520,
          height: 520,
          border: "58px solid rgba(248,250,252,0.08)",
          borderRadius: 999
        }
      }),
      h("div", {
        style: {
          position: "absolute",
          right: 88,
          bottom: 78,
          width: 220,
          height: 220,
          border: `28px solid ${accent}`,
          borderRadius: 999,
          opacity: 0.78
        }
      }),
      h(
        "div",
        {
          style: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "62px 76px"
          }
        },
        h(
          "div",
          { style: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" } },
          h(
            "div",
            { style: { display: "flex", alignItems: "center", gap: 18 } },
            h(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: accent,
                  color: "#08111f",
                  fontSize: 36,
                  fontWeight: 900
                }
              },
              "C"
            ),
            h(
              "div",
              { style: { display: "flex", flexDirection: "column", gap: 2 } },
              h("div", { style: { fontSize: 36, fontWeight: 900, letterSpacing: 0 } }, siteName),
              h("div", { style: { color: "#cbd5e1", fontSize: 18, fontWeight: 700 } }, "World Cup 2026")
            )
          ),
          h(
            "div",
            {
              style: {
                display: "flex",
                border: "1px solid rgba(248,250,252,0.26)",
                borderRadius: 999,
                padding: "12px 18px",
                color: "#e2e8f0",
                fontSize: 20,
                fontWeight: 800
              }
            },
            category
          )
        ),
        h(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: 24, maxWidth: 875 } },
          h(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 14,
                color: accent,
                fontSize: 24,
                fontWeight: 900,
                textTransform: "uppercase"
              }
            },
            h("span", { style: { width: 48, height: 5, background: accent, borderRadius: 999 } }),
            eyebrow
          ),
          h(
            "div",
            {
              style: {
                display: "flex",
                fontSize: title.length > 78 ? 54 : 62,
                lineHeight: 1.03,
                fontWeight: 900,
                letterSpacing: 0
              }
            },
            title
          ),
          h(
            "div",
            {
              style: {
                display: "flex",
                maxWidth: 760,
                color: "#cbd5e1",
                fontSize: 26,
                lineHeight: 1.28,
                fontWeight: 700
              }
            },
            detail
          )
        ),
        h(
          "div",
          { style: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" } },
          h("div", { style: { color: "#94a3b8", fontSize: 22, fontWeight: 800 } }, "cupmate.us"),
          h(
            "div",
            { style: { display: "flex", gap: 10 } },
            ["Matches", "Cities", "Stadiums"].map((label) =>
              h(
                "div",
                {
                  key: label,
                  style: {
                    display: "flex",
                    padding: "10px 14px",
                    borderRadius: 999,
                    background: "rgba(248,250,252,0.09)",
                    color: "#e2e8f0",
                    fontSize: 17,
                    fontWeight: 800
                  }
                },
                label
              )
            )
          )
        )
      )
    ),
    ogSize
  );
}

export function getGuideOgData(slug: string): CupMateOgInput | null {
  const article = findEditorialArticle(slug);
  if (!article) return null;

  return {
    title: article.title,
    category: article.category,
    eyebrow: "Guide",
    detail: article.description,
    accent: "teal"
  };
}

export function getStadiumOgData(slug: string): CupMateOgInput | null {
  const stadium = stadiumGuides.find((item) => item.slug === slug);
  if (!stadium) return null;

  return {
    title: `${stadium.name} World Cup 2026 Stadium Guide`,
    category: "Stadium",
    eyebrow: stadium.city,
    detail: `${stadium.matches} matches planned, ${stadium.capacity} capacity, transit and match-day fan notes.`,
    accent: "blue"
  };
}

export function getHostCityOgData(slug: string): CupMateOgInput | null {
  const city = hostCityGuides.find((item) => item.slug === slug);
  if (!city) return null;

  return {
    title: `${city.city} World Cup 2026 Travel Guide`,
    category: "Host City",
    eyebrow: city.country,
    detail: `${city.stadium}: tickets, fan zones, transit, watch plans and match-day timing.`,
    accent: "gold"
  };
}

export function getMatchOgData(slug: string): CupMateOgInput | null {
  const match = findMatchDetail(slug);
  if (!match) return null;

  return {
    title: `${match.home.name} vs ${match.away.name}`,
    category: match.group,
    eyebrow: match.kickoff,
    detail: `${match.venue}, ${match.city}. Tickets, odds, squads and fan planning notes.`,
    accent: "red"
  };
}
