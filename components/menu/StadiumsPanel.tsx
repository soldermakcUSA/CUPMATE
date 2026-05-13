import { CircleParking, MapPin, Navigation, ShieldCheck, Ticket, Utensils, WalletCards } from "lucide-react";
import { translations, type Locale } from "@/lib/i18n";
import type { MatchCardData } from "@/lib/world-cup-data";

type Translation = typeof translations.en;

type StadiumsPanelProps = {
  t: Translation;
  locale: Locale;
  matches: MatchCardData[];
};

const stadiums = [
  {
    name: "MetLife Stadium",
    city: "East Rutherford, NJ",
    capacity: "82,500",
    gatesOpen: "2:00 PM",
    matchIndex: 2,
    image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Estadio Azteca",
    city: "Mexico City, Mexico",
    capacity: "87,523",
    gatesOpen: "12:00 PM",
    matchIndex: 0,
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "AT&T Stadium",
    city: "Dallas, TX",
    capacity: "80,000",
    gatesOpen: "3:00 PM",
    matchIndex: 3,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80"
  }
];

export function StadiumsPanel({ t, matches }: StadiumsPanelProps) {
  const stadiumList = stadiums.map((stadium) => ({ ...stadium, match: matches[stadium.matchIndex] ?? matches[0] })).filter((stadium) => stadium.match);
  const featuredStadium = stadiumList[0];

  if (!featuredStadium) {
    return null;
  }

  return (
    <section className="section-card menu-panel stadiums-panel" aria-labelledby="stadiums-panel-title">
      <div className="section-head">
        <div>
          <p className="small muted menu-panel-kicker">{t.stadiumGuide}</p>
          <h2 id="stadiums-panel-title">{t.stadiums}</h2>
        </div>
        <button className="link-button">{t.viewStadiumMap}</button>
      </div>

      <div className="stadiums-panel-feature">
        <img src={featuredStadium.image} alt={featuredStadium.name} />
        <div className="stadiums-panel-feature-body">
          <span className="tag">{featuredStadium.match.group}</span>
          <h3>{featuredStadium.name}</h3>
          <p className="small muted">
            <MapPin size={14} aria-hidden="true" /> {featuredStadium.city}
          </p>
          <div className="stadiums-panel-stats">
            <span><strong>{featuredStadium.capacity}</strong><small>{t.capacity}</small></span>
            <span><strong>{featuredStadium.gatesOpen}</strong><small>{t.gatesOpen}</small></span>
            <span><strong>{t.cashlessVenue}</strong><small>{t.helpfulInfo}</small></span>
          </div>
          <div className="info-icons stadiums-panel-icons">
            {[ShieldCheck, WalletCards, Utensils, Ticket, CircleParking].map((Icon, index) => (
              <button key={index} aria-label={t.helpfulInfo}><Icon size={19} /></button>
            ))}
          </div>
          <button className="primary-button">
            <Navigation size={16} aria-hidden="true" /> {t.routeToStadium}
          </button>
        </div>
      </div>

      <div className="stadiums-panel-list" aria-label={t.stadiumGuide}>
            {stadiumList.map((stadium) => (
          <article className="itinerary-row stadiums-panel-row" key={stadium.name}>
            <div className="date-tile">{stadium.match.date.split(",")[0].toUpperCase()}</div>
            <div>
              <strong>{stadium.name}</strong>
              <p className="small muted">{stadium.city}</p>
            </div>
            <div>
              <strong>{stadium.match.home} {t.versus} {stadium.match.away}</strong>
              <p className="small muted">{stadium.match.time} · {stadium.capacity}</p>
            </div>
            <button className="link-button">{t.seeDetails}</button>
          </article>
        ))}
      </div>
    </section>
  );
}
