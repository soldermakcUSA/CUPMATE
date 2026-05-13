import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const fallbackImage = "/assets/news/los-angeles-world-cup-surface-final-prep.png";

const newsImagesBySlug: Record<string, string> = {
  "fanatics-fest-nyc-fifa-final-weekend": "/assets/news/fanatics-fest-nyc-fifa-final-weekend.png",
  "fifa-disciplinary-rules-world-cup-2026": "/assets/news/fifa-disciplinary-rules-world-cup-2026.png",
  "iran-seeks-world-cup-visa-guarantees": "/assets/news/iran-seeks-world-cup-visa-guarantees.png",
  "lays-world-cup-inspired-flavors-canada": "/assets/news/lays-world-cup-inspired-flavors-canada.png",
  "los-angeles-world-cup-surface-final-prep": "/assets/news/los-angeles-world-cup-surface-final-prep.png",
  "metlife-world-cup-train-fare-drops": "/assets/news/metlife-world-cup-train-fare-drops.png",
  "nora-fatehi-world-cup-opening-ceremony-toronto": "/assets/news/nora-fatehi-world-cup-opening-ceremony-toronto.png",
  "plan-los-angeles-world-cup-experience": "/assets/news/plan-los-angeles-world-cup-experience.png",
  "record-fifa-payouts-world-cup-2026": "/assets/news/record-fifa-payouts-world-cup-2026.png",
  "shakira-burna-boy-world-cup-song-teaser": "/assets/news/shakira-burna-boy-world-cup-song-teaser.png",
  "us-hotels-world-cup-demand-check": "/assets/news/us-hotels-world-cup-demand-check.png",
  "visa-hdfc-world-cup-fan-access-promotion": "/assets/news/visa-hdfc-world-cup-fan-access-promotion.png",
  "world-cup-2026-referees-appointed": "/assets/news/world-cup-2026-referees-appointed.png",
  "world-cup-2026-squad-size-26": "/assets/news/world-cup-2026-squad-size-26.png"
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

export async function fetchNewsItems(limit = 8): Promise<NewsItemData[]> {
  const supabase = createBrowserSupabaseClient() as SupabaseLike;
  const { data, error } = await supabase
    .from("articles")
    .select("id,category,image_url,source_url,published_at,article_translations(slug,title,excerpt,body)")
    .eq("status", "published")
    .eq("type", "news")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return (data ?? []).map((item: any, index: number) => {
    const translations = item.article_translations ?? [];
    const translation = translations[0];
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
      meta: formatArticleMeta(item.category, item.published_at),
      image: (localImage && newsImagesBySlug[localImage]) || newsImageFallbacks[index % newsImageFallbacks.length] || item.image_url || fallbackImage,
      sourceUrl: item.source_url
    };
  });
}

export async function fetchPlaces(limit = 10): Promise<PlaceCardData[]> {
  const supabase = createBrowserSupabaseClient() as SupabaseLike;
  const { data, error } = await supabase
    .from("places")
    .select(`
      type,
      latitude,
      longitude,
      image_url,
      place_translations(name, address, atmosphere, opening_hours_note),
      host_cities(host_city_translations(name, state_region)),
      place_tags(tags(tag_translations(label)))
    `)
    .eq("is_published", true)
    .order("is_sponsored", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return (data ?? []).map((place: any) => {
    const translation = place.place_translations?.[0];
    const city = place.host_cities?.host_city_translations?.[0];
    const tags = (place.place_tags ?? [])
      .map((row: any) => row.tags?.tag_translations?.[0]?.label)
      .filter(Boolean)
      .slice(0, 4);

    return {
      name: translation?.name ?? "World Cup place",
      type: humanizePlaceType(place.type),
      city: [city?.name, city?.state_region].filter(Boolean).join(", "),
      distance: city?.name ?? "Host city",
      note: translation?.atmosphere ?? translation?.opening_hours_note ?? "Official World Cup fan destination.",
      image: place.image_url || fallbackImage,
      tags,
      latitude: place.latitude ?? null,
      longitude: place.longitude ?? null
    };
  });
}

function formatArticleMeta(category: string | null, publishedAt: string | null) {
  const date = publishedAt
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(publishedAt))
    : "Latest";
  return [date, category ?? "News"].join(" · ");
}

function humanizePlaceType(type: string) {
  return type
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
