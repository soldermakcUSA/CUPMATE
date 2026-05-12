import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const fallbackImage = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80";

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

  return (data ?? []).map((item: any) => {
    const translation = item.article_translations?.[0];
    return {
      id: item.id,
      slug: translation?.slug,
      title: translation?.title ?? "World Cup update",
      text: translation?.excerpt ?? "",
      body: translation?.body ?? translation?.excerpt ?? "",
      meta: formatArticleMeta(item.category, item.published_at),
      image: item.image_url || fallbackImage,
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
