import { ArrowRight, Newspaper, Ticket, Trophy } from "lucide-react";
import { news } from "@/lib/mock-data";
import { translations, type Locale } from "@/lib/i18n";

type NewsPanelProps = {
  locale?: Locale;
  t?: typeof translations.en;
};

function panelText(locale: Locale = "en", t?: typeof translations.en) {
  return t ?? translations[locale] ?? translations.en;
}

const storyIcons = [Trophy, Ticket, Newspaper] as const;

export function NewsPanel({ locale = "en", t }: NewsPanelProps) {
  const copy = panelText(locale, t);
  const lead = news[0];
  const secondaryStories = news.slice(1);

  return (
    <section className="section-card menu-panel news-panel" aria-labelledby="news-panel-title">
      <div className="section-head">
        <div>
          <p className="small muted menu-panel-kicker" style={{ margin: "0 0 4px" }}>{copy.news}</p>
          <h2 id="news-panel-title">{copy.newsUpdates}</h2>
        </div>
        <button className="link-button">{copy.viewAllNews}</button>
      </div>

      <article
        className="news-panel-lead"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, 0.95fr) minmax(0, 1fr)",
          gap: 18,
          alignItems: "stretch",
          marginBottom: 16
        }}
      >
        <img
          src={lead.image}
          alt=""
          style={{ width: "100%", height: 230, objectFit: "cover", borderRadius: 10 }}
        />
        <div style={{ display: "grid", alignContent: "center", gap: 10 }}>
          <span className="tag" style={{ width: "fit-content" }}>{lead.meta}</span>
          <h3 style={{ margin: 0, fontSize: 28, lineHeight: 1.1 }}>{lead.title}</h3>
          <p className="muted" style={{ margin: 0, lineHeight: 1.55 }}>{lead.text}</p>
          <button className="link-button" style={{ display: "inline-flex", gap: 6, alignItems: "center", width: "fit-content", padding: 0 }}>
            {copy.seeDetails} <ArrowRight size={15} />
          </button>
        </div>
      </article>

      <div className="news-grid news-panel-grid">
        {secondaryStories.map((item, index) => {
          const Icon = storyIcons[index + 1] ?? Newspaper;
          return (
            <article className="news-card" key={item.title}>
              <img src={item.image} alt="" />
              <div>
                <p className="small muted" style={{ display: "flex", gap: 6, alignItems: "center", margin: "0 0 6px" }}>
                  <Icon size={14} /> {item.meta}
                </p>
                <strong>{item.title}</strong>
                <p className="small muted">{item.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
