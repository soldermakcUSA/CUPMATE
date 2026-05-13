import { Bus, Car, Footprints, MapPin, Navigation, Train } from "lucide-react";
import { localizedFallbackItinerary } from "@/lib/localized-static-data";
import { translations, type Locale } from "../../lib/i18n";
import type { MatchCardData } from "@/lib/world-cup-data";

type TravelPanelProps = {
  t?: typeof translations.en;
  locale?: Locale;
  matches: MatchCardData[];
};

const routeModes = [
  { key: "publicTransport", Icon: Train },
  { key: "driving", Icon: Car },
  { key: "walking", Icon: Footprints },
  { key: "taxi", Icon: Bus }
] as const;

export function TravelPanel({ t = translations.en, locale = "en", matches }: TravelPanelProps) {
  const featuredMatch = matches[2] ?? matches[0];
  const localizedItinerary = localizedFallbackItinerary(locale);
  const routeSteps = [t.walkToSecaucus, t.trainToMeadowlands, t.followSignsGateC];

  if (!featuredMatch) {
    return null;
  }

  return (
    <section className="section-card" aria-labelledby="travel-panel-title">
      <div className="section-head">
        <div>
          <h2 id="travel-panel-title">{t.travel}</h2>
          <p className="small muted" style={{ margin: "6px 0 0" }}>
            {featuredMatch.venue}
          </p>
        </div>
        <button className="link-button">{t.startNavigation}</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 1.2fr) minmax(260px, 0.8fr)", gap: 16 }}>
        <div>
          <div className="us-map" style={{ height: 250 }} aria-label={t.recommendedRoute}>
            <div className="route-line" style={{ inset: "72px 62px 72px 58px" }} />
            <span className="marker green" style={{ left: "16%", top: "24%" }} />
            <span className="map-label" style={{ left: "calc(16% + 24px)", top: "24%" }}>
              {t.newYorkPenn}
            </span>
            <span className="marker" style={{ left: "48%", top: "56%" }} />
            <span className="map-label" style={{ left: "calc(48% + 24px)", top: "56%" }}>
              {t.secaucus}
            </span>
            <span className="marker red" style={{ right: "14%", bottom: "18%" }} />
            <span className="map-label" style={{ right: "calc(14% + 24px)", bottom: "18%" }}>
              {t.metlife}
            </span>
          </div>

          <div className="chip-row">
            {routeModes.map(({ key, Icon }, index) => (
              <button className={`chip ${index === 0 ? "active" : ""}`} key={key}>
                <Icon size={15} /> {t[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="match-card" style={{ minHeight: "auto" }}>
          <p className="small muted" style={{ marginTop: 0 }}>{t.recommendedRoute}</p>
          <h3 style={{ margin: "0 0 6px" }}>
            <Navigation size={18} style={{ verticalAlign: "text-bottom" }} /> {t.routeDurationTrain}
          </h3>
          <p className="small muted" style={{ margin: "0 0 18px" }}>
            {featuredMatch.home} {t.versus} {featuredMatch.away} · {featuredMatch.time}
          </p>

          <div className="mobile-list" style={{ marginTop: 0 }}>
            {routeSteps.map((step, index) => (
              <div className="route-step" key={step} style={{ gridTemplateColumns: "34px 1fr", alignItems: "center" }}>
                <div className="date-tile" style={{ width: 34, height: 34 }}>
                  {index + 1}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="match-row" style={{ marginTop: 16 }}>
        {localizedItinerary.map((item) => (
          <article className="match-card" key={item.match} style={{ minHeight: 150 }}>
            <p className="small muted" style={{ marginTop: 0 }}>{item.day}</p>
            <strong>{item.match}</strong>
            <p className="small muted">{item.time}</p>
            <p className="small muted">
              <MapPin size={14} style={{ verticalAlign: "text-bottom" }} /> {item.venue}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
