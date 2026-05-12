import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CupMate",
    short_name: "CupMate",
    description: "Your multilingual World Cup companion for matches, fan zones, routes, and AI help.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#06142f",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
