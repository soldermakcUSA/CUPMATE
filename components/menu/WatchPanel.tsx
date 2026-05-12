import { MapPin, Star, Utensils } from "lucide-react";
import { translations } from "../../lib/i18n";
import type { PlaceCardData } from "@/lib/content-data";

type WatchPanelProps = {
  t?: typeof translations.en;
  places: PlaceCardData[];
};

export function WatchPanel({ t = translations.en, places }: WatchPanelProps) {
  const featuredPlace = places[0];

  return (
    <section className="section-card" aria-labelledby="watch-panel-title">
      <div className="section-head">
        <div>
          <h2 id="watch-panel-title">{t.watch}</h2>
          <p className="small muted" style={{ margin: "6px 0 0" }}>
            <MapPin size={14} style={{ verticalAlign: "text-bottom" }} /> Miami, USA
          </p>
        </div>
        <button className="link-button">{t.viewAll}</button>
      </div>

      <div className="chip-row" style={{ marginTop: 0, marginBottom: 16 }}>
        {[t.all, t.sportsBars, t.restaurants, t.fanZones].map((chip, index) => (
          <button className={`chip ${index === 0 ? "active" : ""}`} key={chip}>{chip}</button>
        ))}
      </div>

      <article className="featured-card" style={{ marginTop: 0, display: "grid", gridTemplateColumns: "minmax(280px, 0.95fr) 1fr" }}>
        <img src={featuredPlace.image} alt={featuredPlace.name} style={{ height: "100%", minHeight: 230 }} />
        <div className="featured-body">
          <p className="small muted" style={{ marginTop: 0 }}>
            <Utensils size={14} style={{ verticalAlign: "text-bottom" }} /> {featuredPlace.type}
          </p>
          <h3 style={{ margin: "0 0 8px", fontSize: 24 }}>{featuredPlace.name}</h3>
          <p className="small muted">{featuredPlace.note}</p>
          <div className="tags">
            <span className="tag">Live Screen</span>
            <span className="tag">Reservations</span>
            <span className="tag">{featuredPlace.distance}</span>
          </div>
          <button className="primary-button" style={{ marginTop: 18 }}>{t.seeDetails}</button>
        </div>
      </article>

      <div className="mobile-list">
        {places.slice(1).map((place, index) => (
          <article className="place-row" key={place.name}>
            <img src={place.image} alt={place.name} />
            <div>
              <strong>{place.name}</strong>
              <p className="small muted" style={{ margin: "4px 0" }}>{place.type}</p>
              <p className="small muted" style={{ margin: 0 }}>{place.note}</p>
            </div>
            <div style={{ display: "grid", justifyItems: "end", gap: 8 }}>
              <span className="small muted">{place.distance}</span>
              <span className="tag">
                <Star size={11} style={{ verticalAlign: "text-bottom" }} /> 4.{8 - index}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
