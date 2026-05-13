import { pickLocalizedTranslation, localizedDateFormatterLocale } from "@/lib/content-localization";
import type { Locale } from "@/lib/i18n";
import { staticText } from "@/lib/localized-static-data";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export const NEWS_IMAGE_FALLBACK = "/assets/news/los-angeles-world-cup-surface-final-prep.webp";

const newsImagesBySlug: Record<string, string> = {
  "fanatics-fest-nyc-fifa-final-weekend": "/assets/news/fanatics-fest-nyc-fifa-final-weekend.webp",
  "fifa-disciplinary-rules-world-cup-2026": "/assets/news/fifa-disciplinary-rules-world-cup-2026.webp",
  "iran-seeks-world-cup-visa-guarantees": "/assets/news/iran-seeks-world-cup-visa-guarantees.webp",
  "lays-world-cup-inspired-flavors-canada": "/assets/news/lays-world-cup-inspired-flavors-canada.webp",
  "los-angeles-world-cup-surface-final-prep": "/assets/news/los-angeles-world-cup-surface-final-prep.webp",
  "metlife-world-cup-train-fare-drops": "/assets/news/metlife-world-cup-train-fare-drops.webp",
  "nora-fatehi-world-cup-opening-ceremony-toronto": "/assets/news/nora-fatehi-world-cup-opening-ceremony-toronto.webp",
  "plan-los-angeles-world-cup-experience": "/assets/news/plan-los-angeles-world-cup-experience.webp",
  "record-fifa-payouts-world-cup-2026": "/assets/news/record-fifa-payouts-world-cup-2026.webp",
  "shakira-burna-boy-world-cup-song-teaser": "/assets/news/shakira-burna-boy-world-cup-song-teaser.webp",
  "us-hotels-world-cup-demand-check": "/assets/news/us-hotels-world-cup-demand-check.webp",
  "visa-hdfc-world-cup-fan-access-promotion": "/assets/news/visa-hdfc-world-cup-fan-access-promotion.webp",
  "world-cup-2026-referees-appointed": "/assets/news/world-cup-2026-referees-appointed.webp",
  "world-cup-2026-squad-size-26": "/assets/news/world-cup-2026-squad-size-26.webp"
};

const newsImageFallbacks = Object.values(newsImagesBySlug);

export type NewsItemData = {
  id?: string;
  slug?: string;
  title: string;
  text: string;
  body?: string;
  meta: string;
  image: string;
  sourceUrl?: string | null;
};

export type PlaceCardData = {
  name: string;
  type: string;
  city: string;
  distance: string;
  note: string;
  image: string;
  tags: string[];
  latitude: number | null;
  longitude: number | null;
};

type SupabaseLike = ReturnType<typeof createBrowserSupabaseClient> & {
  from: (relation: string) => any;
};

export async function fetchNewsItems(limit = 8, locale: Locale = "en"): Promise<NewsItemData[]> {
  const supabase = createBrowserSupabaseClient() as SupabaseLike;
  const { data, error } = await supabase
    .from("articles")
    .select("id,category,image_url,source_url,published_at,article_translations(language_code,slug,title,excerpt,body)")
    .eq("status", "published")
    .eq("type", "news")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return (data ?? []).map((item: any, index: number) => {
    const translations = item.article_translations ?? [];
    const translation = pickLocalizedTranslation<any>(translations, locale);
    const isRequestedLanguage = translation?.language_code === locale || locale === "en";
    const fallbackCopy = isRequestedLanguage ? null : localizedArticleFallback(locale, item.category);
    const slug = translation?.slug;
    const localImage = translations
      .map((entry: any) => entry?.slug)
      .find((entrySlug: string | undefined) => entrySlug && newsImagesBySlug[entrySlug]);

    return {
      id: item.id,
      slug,
      title: fallbackCopy?.title ?? translation?.title ?? staticText(locale).genericArticleTitle,
      text: fallbackCopy?.excerpt ?? translation?.excerpt ?? staticText(locale).genericArticleExcerpt,
      body: fallbackCopy?.body ?? translation?.body ?? translation?.excerpt ?? staticText(locale).genericArticleBody,
      meta: formatArticleMeta(item.category, item.published_at, locale),
      image: (localImage && newsImagesBySlug[localImage]) || newsImageFallbacks[index % newsImageFallbacks.length] || item.image_url || NEWS_IMAGE_FALLBACK,
      sourceUrl: item.source_url
    };
  });
}

export async function fetchPlaces(limit = 10, locale: Locale = "en"): Promise<PlaceCardData[]> {
  const supabase = createBrowserSupabaseClient() as SupabaseLike;
  const { data, error } = await supabase
    .from("places")
    .select(`
      type,
      latitude,
      longitude,
      image_url,
      place_translations(language_code,name, address, atmosphere, opening_hours_note),
      host_cities(host_city_translations(language_code,name, state_region)),
      place_tags(tags(tag_translations(language_code,label)))
    `)
    .eq("is_published", true)
    .order("is_sponsored", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return (data ?? []).map((place: any) => {
    const translation = pickLocalizedTranslation<any>(place.place_translations, locale);
    const city = pickLocalizedTranslation<any>(place.host_cities?.host_city_translations, locale);
    const tags = (place.place_tags ?? [])
      .map((row: any) => pickLocalizedTranslation<any>(row.tags?.tag_translations, locale)?.label)
      .filter(Boolean)
      .slice(0, 4);

    return {
      name: translation?.name ?? "World Cup place",
      type: humanizePlaceType(place.type, locale),
      city: [city?.name, city?.state_region].filter(Boolean).join(", "),
      distance: city?.name ?? hostCityFallback(locale),
      note: translation?.atmosphere ?? translation?.opening_hours_note ?? officialDestinationFallback(locale),
      image: place.image_url || NEWS_IMAGE_FALLBACK,
      tags: tags.map((tag: string) => localizeKnownTag(tag, locale)),
      latitude: place.latitude ?? null,
      longitude: place.longitude ?? null
    };
  });
}

function formatArticleMeta(category: string | null, publishedAt: string | null, locale: Locale) {
  const date = publishedAt
    ? new Intl.DateTimeFormat(localizedDateFormatterLocale(locale), { month: "short", day: "numeric" }).format(new Date(publishedAt))
    : latestFallback(locale);
  return [date, localizeCategory(category, locale) ?? newsFallback(locale)].join(" · ");
}

const placeTypeLabels: Partial<Record<Locale, Record<string, string>>> = {
  ru: { sports_bar: "Спорт-бар", restaurant: "Ресторан", fan_zone: "Фан-зона" },
  es: { sports_bar: "Bar deportivo", restaurant: "Restaurante", fan_zone: "Fan zone" },
  fr: { sports_bar: "Bar sportif", restaurant: "Restaurant", fan_zone: "Fan zone" },
  de: { sports_bar: "Sportsbar", restaurant: "Restaurant", fan_zone: "Fan-Zone" },
  pt: { sports_bar: "Bar esportivo", restaurant: "Restaurante", fan_zone: "Fan zone" },
  it: { sports_bar: "Sports bar", restaurant: "Ristorante", fan_zone: "Fan zone" },
  ar: { sports_bar: "بار رياضي", restaurant: "مطعم", fan_zone: "منطقة مشجعين" },
  zh: { sports_bar: "体育酒吧", restaurant: "餐厅", fan_zone: "球迷区" },
  ja: { sports_bar: "スポーツバー", restaurant: "レストラン", fan_zone: "ファンゾーン" },
  ko: { sports_bar: "스포츠 바", restaurant: "레스토랑", fan_zone: "팬존" }
};

function humanizePlaceType(type: string, locale: Locale) {
  return placeTypeLabels[locale]?.[type] ?? type
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function latestFallback(locale: Locale) {
  return staticText(locale).latest;
}

function newsFallback(locale: Locale) {
  return staticText(locale).news;
}

function hostCityFallback(locale: Locale) {
  return staticText(locale).hostCity;
}

function officialDestinationFallback(locale: Locale) {
  return staticText(locale).officialDestination;
}

function localizedArticleFallback(locale: Locale, category: string | null) {
  const copy = staticText(locale);
  const categoryLabel = localizeCategory(category, locale);
  return {
    title: categoryLabel ? `${copy.genericArticleTitle}: ${categoryLabel}` : copy.genericArticleTitle,
    excerpt: copy.genericArticleExcerpt,
    body: copy.genericArticleBody
  };
}

function localizeCategory(category: string | null, locale: Locale) {
  if (!category) return null;
  const labels: Partial<Record<Locale, Record<string, string>>> = {
    es: { Teams: "Equipos", Culture: "Cultura", Streaming: "Streaming", Travel: "Viajes", Commerce: "Comercio", "Fan Experience": "Experiencia de fans", Transport: "Transporte", Regulation: "Reglamento", Infrastructure: "Infraestructura", Music: "Música", Hospitality: "Hospitalidad", Tickets: "Entradas", Analysis: "Análisis", News: "Noticias" },
    fr: { Teams: "Équipes", Culture: "Culture", Streaming: "Streaming", Travel: "Voyage", Commerce: "Commerce", "Fan Experience": "Expérience fans", Transport: "Transport", Regulation: "Règlement", Infrastructure: "Infrastructure", Music: "Musique", Hospitality: "Hospitalité", Tickets: "Billets", Analysis: "Analyse", News: "Actualités" },
    de: { Teams: "Teams", Culture: "Kultur", Streaming: "Streaming", Travel: "Reisen", Commerce: "Handel", "Fan Experience": "Fan-Erlebnis", Transport: "Transport", Regulation: "Regeln", Infrastructure: "Infrastruktur", Music: "Musik", Hospitality: "Hospitality", Tickets: "Tickets", Analysis: "Analyse", News: "News" },
    pt: { Teams: "Equipes", Culture: "Cultura", Streaming: "Streaming", Travel: "Viagens", Commerce: "Comércio", "Fan Experience": "Experiência de fãs", Transport: "Transporte", Regulation: "Regulamento", Infrastructure: "Infraestrutura", Music: "Música", Hospitality: "Hospitalidade", Tickets: "Ingressos", Analysis: "Análise", News: "Notícias" },
    it: { Teams: "Squadre", Culture: "Cultura", Streaming: "Streaming", Travel: "Viaggi", Commerce: "Commercio", "Fan Experience": "Esperienza tifosi", Transport: "Trasporti", Regulation: "Regolamento", Infrastructure: "Infrastruttura", Music: "Musica", Hospitality: "Ospitalità", Tickets: "Biglietti", Analysis: "Analisi", News: "Notizie" },
    ar: { Teams: "الفرق", Culture: "الثقافة", Streaming: "البث", Travel: "السفر", Commerce: "التجارة", "Fan Experience": "تجربة المشجعين", Transport: "النقل", Regulation: "اللوائح", Infrastructure: "البنية التحتية", Music: "الموسيقى", Hospitality: "الضيافة", Tickets: "التذاكر", Analysis: "تحليل", News: "الأخبار" },
    zh: { Teams: "球队", Culture: "文化", Streaming: "流媒体", Travel: "旅行", Commerce: "商业", "Fan Experience": "球迷体验", Transport: "交通", Regulation: "规则", Infrastructure: "基础设施", Music: "音乐", Hospitality: "接待", Tickets: "门票", Analysis: "分析", News: "新闻" },
    ja: { Teams: "チーム", Culture: "文化", Streaming: "配信", Travel: "旅行", Commerce: "商業", "Fan Experience": "ファン体験", Transport: "交通", Regulation: "規則", Infrastructure: "インフラ", Music: "音楽", Hospitality: "ホスピタリティ", Tickets: "チケット", Analysis: "分析", News: "ニュース" },
    ko: { Teams: "팀", Culture: "문화", Streaming: "스트리밍", Travel: "여행", Commerce: "상업", "Fan Experience": "팬 경험", Transport: "교통", Regulation: "규정", Infrastructure: "인프라", Music: "음악", Hospitality: "환대", Tickets: "티켓", Analysis: "분석", News: "뉴스" },
    ru: { Teams: "Команды", Culture: "Культура", Streaming: "Стриминг", Travel: "Путешествия", Commerce: "Коммерция", "Fan Experience": "Фанатский опыт", Transport: "Транспорт", Regulation: "Регламент", Infrastructure: "Инфраструктура", Music: "Музыка", Hospitality: "Гостеприимство", Tickets: "Билеты", Analysis: "Аналитика", News: "Новости" }
  };
  return labels[locale]?.[category] ?? category;
}

function localizeKnownTag(tag: string, locale: Locale) {
  const copy = staticText(locale);
  const tags: Record<string, string> = {
    "Live Screen": copy.bigScreen,
    Food: copy.food,
    Music: copy.music,
    Beach: copy.beach,
    Games: copy.games,
    Family: copy.family,
    Reservations: locale === "ru" ? "Бронирование" : tag
  };
  return tags[tag] ?? tag;
}
