import { MessageCircle, Radio, Users } from "lucide-react";
import { fanZones, fans } from "../../lib/mock-data";
import { translations } from "../../lib/i18n";

type CommunityPanelProps = {
  t?: typeof translations.en;
};

const feedItems = [
  "Argentina fans meeting near Times Square Fan Fest",
  "Brazil supporters organizing a pre-match walk",
  "Japan fans sharing transit tips for MetLife Stadium"
];

export function CommunityPanel({ t = translations.en }: CommunityPanelProps) {
  return (
    <section className="section-card" aria-labelledby="community-panel-title">
      <div className="section-head">
        <div>
          <h2 id="community-panel-title">{t.community}</h2>
          <p className="small muted" style={{ margin: "6px 0 0" }}>{t.connectFans}</p>
        </div>
        <button className="link-button">{t.findNow}</button>
      </div>

      <div className="chip-row" style={{ marginTop: 0, marginBottom: 16 }}>
        {[t.feed, t.nearbyFans, t.groups].map((chip, index) => (
          <button className={`chip ${index === 1 ? "active" : ""}`} key={chip}>{chip}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 1fr) minmax(260px, 0.8fr)", gap: 16 }}>
        <div>
          <div className="community-card" style={{ borderRadius: 10 }}>
            <p className="small" style={{ marginTop: 0 }}>
              <Users size={15} style={{ verticalAlign: "text-bottom" }} /> {t.findFans}
            </p>
            <h3 style={{ margin: "0 0 10px" }}>12,840 fans nearby</h3>
            <p style={{ marginBottom: 16 }}>{t.connectFans}</p>
            <button className="prompt-button" style={{ width: "auto" }}>{t.findNow}</button>
          </div>

          <div className="mobile-list">
            {fans.map((fan) => (
              <article className="fan-row" key={fan.name}>
                <div className="avatar">{fan.avatar}</div>
                <div>
                  <strong>{fan.name}</strong>
                  <p className="small muted" style={{ margin: "4px 0" }}>{fan.country}</p>
                  <p className="small muted" style={{ margin: 0 }}>{fan.status}</p>
                </div>
                <button className="chip">
                  <MessageCircle size={14} style={{ verticalAlign: "text-bottom" }} /> {t.chat}
                </button>
              </article>
            ))}
          </div>
        </div>

        <aside className="match-card" style={{ minHeight: "auto" }}>
          <p className="small muted" style={{ marginTop: 0 }}>
            <Radio size={14} style={{ verticalAlign: "text-bottom" }} /> {t.feed}
          </p>
          <div className="mobile-list" style={{ marginTop: 0 }}>
            {feedItems.map((item) => (
              <div className="route-step" key={item}>{item}</div>
            ))}
          </div>

          <h3 style={{ margin: "18px 0 10px" }}>{t.groups}</h3>
          <div className="tags">
            {fanZones.slice(0, 3).map((zone) => (
              <span className="tag" key={zone.name}>{zone.city}</span>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
