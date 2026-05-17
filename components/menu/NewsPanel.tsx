import { Newspaper, Ticket, Trophy, X } from "lucide-react";
import { useEffect, useState } from "react";
import { translations, type Locale } from "@/lib/i18n";
import { NEWS_IMAGE_FALLBACK, type NewsItemData } from "@/lib/content-data";

type NewsPanelProps = {
  locale?: Locale;
  t?: typeof translations.en;
  news: NewsItemData[];
};

function panelText(locale: Locale = "en", t?: typeof translations.en) {
  return t ?? translations[locale] ?? translations.en;
}

const storyIcons = [Trophy, Ticket, Newspaper] as const;

function handleNewsImageError(event: { currentTarget: HTMLImageElement }) {
  if (event.currentTarget.getAttribute("src") !== NEWS_IMAGE_FALLBACK) {
    event.currentTarget.src = NEWS_IMAGE_FALLBACK;
  }
}

export function NewsPanel({ locale = "en", t, news }: NewsPanelProps) {
  const copy = panelText(locale, t);
  const [selectedArticle, setSelectedArticle] = useState<NewsItemData | null>(null);
  const lead = news[0];

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

      <div className="news-grid news-panel-grid">
        {news.map((item, index) => {
          const Icon = storyIcons[index] ?? Newspaper;
          return (
            <button className="news-card news-card-button" key={item.id ?? item.title} type="button" onClick={() => setSelectedArticle(item)}>
              <img
                src={item.image}
                alt=""
                decoding="async"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
                onError={handleNewsImageError}
              />
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
      <ArticleReader article={selectedArticle} onClose={() => setSelectedArticle(null)} t={copy} />
    </section>
  );
}

export function ArticleReader({ article, onClose, t = translations.en }: { article: NewsItemData | null; onClose: () => void; t?: typeof translations.en }) {
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
        <button className="article-reader-close" type="button" onClick={onClose} aria-label={t.closeArticle}>
          <X size={20} />
        </button>
        <img className="article-reader-image" src={article.image} alt="" decoding="async" loading="eager" onError={handleNewsImageError} />
        <div className="article-reader-body">
          <span className="tag">{article.meta}</span>
          <h2>{article.title}</h2>
          <p className="article-reader-dek">{article.text}</p>
          <div className="article-reader-copy">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="article-reader-source">{t.originalReport}</p>
        </div>
      </article>
    </div>
  );
}
