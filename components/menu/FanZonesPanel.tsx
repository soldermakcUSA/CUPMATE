import { MapPin, Navigation, Sparkles, Users } from "lucide-react";
import { translations } from "@/lib/i18n";
import type { PlaceCardData } from "@/lib/content-data";

type Translation = typeof translations.en;

type FanZonesPanelProps = {
  t: Translation;
  places: PlaceCardData[];
};

export function FanZonesPanel({ t, places }: FanZonesPanelProps) {
  const fanZones = places;

  return (
    <section className="section-card menu-panel fan-zones-panel" aria-labelledby="fan-zones-panel-title">
      <div className="section-head">
        <div>
          <p className="small muted menu-panel-kicker">{t.interactiveMap}</p>
          <h2 id="fan-zones-panel-title">{t.fanZones}</h2>
        </div>
        <button className="link-button">{t.viewAll}</button>
      </div>

      <div className="fan-zones-panel-summary">
        <div className="fan-zones-panel-map" aria-label={t.interactiveMap}>
          {fanZones.map((zone, index) => (
            <span
              className={`marker ${index === 0 ? "red" : index === 2 ? "green" : ""}`}
              key={zone.name}
              style={{ left: `${18 + index * 19}%`, top: `${30 + (index % 2) * 28}%` }}
              title={zone.name}
            />
          ))}
        </div>
        <div className="fan-zones-panel-copy">
          <span className="tag"><Users size={13} aria-hidden="true" /> {t.popularFanZones}</span>
          <h3>{fanZones[0].name}</h3>
          <p className="small muted">
            <MapPin size={14} aria-hidden="true" /> {fanZones[0].city} · {fanZones[0].distance}
          </p>
          <div className="tags">
            {fanZones[0].tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
          </div>
          <button className="primary-button">
            <Navigation size={16} aria-hidden="true" /> {t.routeToStadium}
          </button>
        </div>
      </div>

      <div className="fan-zone-grid" aria-label={t.popularFanZones}>
        {fanZones.map((zone) => (
          <article className="fan-zone" key={zone.name}>
            <div className="fan-zone-image">
              <img src={zone.image} alt={zone.name} />
              <span className="distance">{zone.distance}</span>
            </div>
            <div className="fan-zone-body">
              <p className="small muted">{zone.city}</p>
              <strong>{zone.name}</strong>
              <div className="tags">
                {zone.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <button className="link-button fan-zones-panel-action">
                <Sparkles size={15} aria-hidden="true" /> {t.seeDetails}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
