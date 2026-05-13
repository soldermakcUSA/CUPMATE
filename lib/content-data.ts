import { pickLocalizedTranslation, localizedDateFormatterLocale } from "@/lib/content-localization";
import type { Locale } from "@/lib/i18n";
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
    const slug = translation?.slug;
    const localImage = translations
      .map((entry: any) => entry?.slug)
      .find((entrySlug: string | undefined) => entrySlug && newsImagesBySlug[entrySlug]);

    return {
      id: item.id,
      slug,
      title: translation?.title ?? "World Cup update",
      text: translation?.excerpt ?? "",
      body: translation?.body ?? translation?.excerpt ?? "",
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
      tags,
      latitude: place.latitude ?? null,
      longitude: place.longitude ?? null
    };
  });
}

function formatArticleMeta(category: string | null, publishedAt: string | null, locale: Locale) {
  const date = publishedAt
    ? new Intl.DateTimeFormat(localizedDateFormatterLocale(locale), { month: "short", day: "numeric" }).format(new Date(publishedAt))
    : latestFallback(locale);
  return [date, category ?? newsFallback(locale)].join(" · ");
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
  return locale === "ru" ? "Новое" : "Latest";
}

function newsFallback(locale: Locale) {
  return locale === "ru" ? "Новости" : "News";
}

function hostCityFallback(locale: Locale) {
  return locale === "ru" ? "Город-организатор" : "Host city";
}

function officialDestinationFallback(locale: Locale) {
  return locale === "ru" ? "Официальное место для болельщиков Чемпионата мира." : "Official World Cup fan destination.";
}
