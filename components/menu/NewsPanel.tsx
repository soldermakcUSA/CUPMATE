import { ArrowRight, ExternalLink, Newspaper, Ticket, Trophy, X } from "lucide-react";
import { useEffect, useState } from "react";
import { translations, type Locale } from "@/lib/i18n";
import type { NewsItemData } from "@/lib/content-data";

type NewsPanelProps = {
  locale?: Locale;
  t?: typeof translations.en;
  news: NewsItemData[];
};

function panelText(locale: Locale = "en", t?: typeof translations.en) {
  return t ?? translations[locale] ?? translations.en;
}

const storyIcons = [Trophy, Ticket, Newspaper] as const;

export function NewsPanel({ locale = "en", t, news }: NewsPanelProps) {
  const copy = panelText(locale, t);
  const [selectedArticle, setSelectedArticle] = useState<NewsItemData | null>(null);
  const lead = news[0];
  const secondaryStories = news.slice(1);

  if (!lead) {
    return null;
  }

  return (
    <section className="section-card menu-panel news-panel" aria-labelledby="news-panel-title">
      <div className="section-head">
        <div>
          <p className="small muted menu-panel-kicker" style={{ margin: "0 0 4px" }}>{copy.news}</p>
          <h2 id="news-panel-title">{copy.newsUpdates}</h2>
        </div>
        <button className="link-button">{copy.viewAllNews}</button>
      </div>

      <button
        type="button"
        className="news-panel-lead"
        onClick={() => setSelectedArticle(lead)}
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, 0.95fr) minmax(0, 1fr)",
          gap: 18,
          alignItems: "stretch",
          marginBottom: 16,
          textAlign: "left"
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
          <span className="link-button" style={{ display: "inline-flex", gap: 6, alignItems: "center", width: "fit-content", padding: 0 }}>
            {copy.seeDetails} <ArrowRight size={15} />
          </span>
        </div>
      </button>

      <div className="news-grid news-panel-grid">
        {secondaryStories.map((item, index) => {
          const Icon = storyIcons[index + 1] ?? Newspaper;
          return (
            <button className="news-card news-card-button" key={item.id ?? item.title} type="button" onClick={() => setSelectedArticle(item)}>
              <img src={item.image} alt="" />
              <div>
                <p className="small muted" style={{ display: "flex", gap: 6, alignItems: "center", margin: "0 0 6px" }}>
                  <Icon size={14} /> {item.meta}
                </p>
                <strong>{item.title}</strong>
                <p className="small muted">{item.text}</p>
              </div>
            </button>
          );
        })}
      </div>
      <ArticleReader article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </section>
  );
}

export function ArticleReader({ article, onClose }: { article: NewsItemData | null; onClose: () => void }) {
  useEffect(() => {
    if (!article) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) {
    return null;
  }

  const paragraphs = (article.body || article.text)
    .split(/\n{2,}|\r\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="article-reader-backdrop" role="presentation" onMouseDown={onClose}>
      <article className="article-reader" role="dialog" aria-modal="true" aria-label={article.title} onMouseDown={(event) => event.stopPropagation()}>
        <button className="article-reader-close" type="button" onClick={onClose} aria-label="Close article">
          <X size={20} />
        </button>
        <img className="article-reader-image" src={article.image} alt="" />
        <div className="article-reader-body">
          <span className="tag">{article.meta}</span>
          <h2>{article.title}</h2>
          <p className="article-reader-dek">{article.text}</p>
          <div className="article-reader-copy">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {article.sourceUrl && (
            <a className="article-reader-source" href={article.sourceUrl} target="_blank" rel="noreferrer">
              Original source <ExternalLink size={15} />
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
