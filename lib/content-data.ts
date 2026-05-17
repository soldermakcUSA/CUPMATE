import { pickLocalizedTranslation, localizedDateFormatterLocale } from "@/lib/content-localization";
import type { Locale } from "@/lib/i18n";
import { staticText } from "@/lib/localized-static-data";
import { newsSeoArticles } from "@/lib/news-seo-data";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export const NEWS_IMAGE_FALLBACK = "/assets/news/los-angeles-world-cup-surface-final-prep.webp";

const newsImagesBySlug: Record<string, string> = {
  "belgium-world-cup-squad-lukaku-core": "/assets/news/belgium-world-cup-squad-lukaku-core.png",
  "tunisia-world-cup-squad-khedira-rebuild": "/assets/news/tunisia-world-cup-squad-khedira-rebuild.png",
  "philadelphia-fan-festival-parking-permits": "/assets/news/philadelphia-fan-festival-parking-permits.png",
  "los-angeles-fan-fest-neighborhood-zones": "/assets/news/los-angeles-fan-fest-neighborhood-zones.png",
  "vancouver-fan-festival-express-bus-plan": "/assets/news/vancouver-fan-festival-express-bus-plan.png",
  "dallas-world-cup-transport-mobility-maps": "/assets/news/dallas-world-cup-transport-mobility-maps.png",
  "brazil-ancelotti-extends-2030-world-cup": "/assets/news/brazil-ancelotti-extends-2030-world-cup.png",
  "boston-stadium-ticket-access-rules": "/assets/news/boston-stadium-ticket-access-rules.png",
  "california-fifa-ticketing-practices-letter": "/assets/news/california-fifa-ticketing-practices-letter-photo.png",
  "dai-dai-world-cup-song-shakira-burna-boy": "/assets/news/dai-dai-world-cup-song-shakira-burna-boy.png",
  "dutch-fans-kansas-city-march-warning": "/assets/news/dutch-fans-kansas-city-march-warning.png",
  "fanatics-fest-nyc-fifa-final-weekend": "/assets/news/fanatics-fest-nyc-fifa-final-weekend.webp",
  "fifa-disciplinary-rules-world-cup-2026": "/assets/news/fifa-disciplinary-rules-world-cup-2026.webp",
  "france-names-world-cup-squad-risser": "/assets/news/france-names-world-cup-squad-risser.png",
  "iran-seeks-world-cup-visa-guarantees": "/assets/news/iran-seeks-world-cup-visa-guarantees.webp",
  "lays-world-cup-inspired-flavors-canada": "/assets/news/lays-world-cup-inspired-flavors-canada.webp",
  "los-angeles-world-cup-surface-final-prep": "/assets/news/los-angeles-world-cup-surface-final-prep.webp",
  "metlife-final-natural-grass-installation": "/assets/news/metlife-final-natural-grass-installation.png",
  "metlife-world-cup-train-fare-drops": "/assets/news/metlife-world-cup-train-fare-drops.webp",
  "mexico-city-azteca-world-cup-guide": "/assets/news/mexico-city-azteca-world-cup-guide.png",
  "nora-fatehi-world-cup-opening-ceremony-toronto": "/assets/news/nora-fatehi-world-cup-opening-ceremony-toronto.webp",
  "pif-world-cup-tournament-supporter": "/assets/news/pif-world-cup-tournament-supporter.png",
  "plan-los-angeles-world-cup-experience": "/assets/news/plan-los-angeles-world-cup-experience.webp",
  "record-fifa-payouts-world-cup-2026": "/assets/news/record-fifa-payouts-world-cup-2026.webp",
  "seattle-world-cup-transit-plan": "/assets/news/seattle-world-cup-transit-plan.png",
  "shakira-burna-boy-world-cup-song-teaser": "/assets/news/shakira-burna-boy-world-cup-song-teaser.webp",
  "us-hotels-world-cup-demand-check": "/assets/news/us-hotels-world-cup-demand-check.webp",
  "visa-hdfc-world-cup-fan-access-promotion": "/assets/news/visa-hdfc-world-cup-fan-access-promotion.webp",
  "world-cup-final-halftime-show-lineup": "/assets/news/world-cup-final-halftime-show-lineup.png",
  "world-cup-scam-warning-ticket-travel-apps": "/assets/news/world-cup-scam-warning-ticket-travel-apps.png",
  "world-cup-visa-bond-waiver-ticket-holders": "/assets/news/world-cup-visa-bond-waiver-ticket-holders-photo.png",
  "world-cup-2026-referees-appointed": "/assets/news/world-cup-2026-referees-appointed.webp",
  "world-cup-2026-squad-size-26": "/assets/news/world-cup-2026-squad-size-26.webp"
};

const newsImageFallbacks = Object.values(newsImagesBySlug);

export function getNewsImageForSlugs(slugs: Array<string | undefined | null>, fallbackIndex = 0, remoteImage?: string | null): string {
  const localSlug = slugs.find((slug): slug is string => Boolean(slug && newsImagesBySlug[slug]));
  const localImage = localSlug ? newsImagesBySlug[localSlug] : undefined;
  const fallbackImage = newsImageFallbacks[fallbackIndex % newsImageFallbacks.length];
  return localImage ?? remoteImage ?? fallbackImage ?? NEWS_IMAGE_FALLBACK;
}

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
    return getLocalNewsItems(limit, locale);
  }

  const supabaseItems = (data ?? []).map((item: any, index: number) => {
    const translations = item.article_translations ?? [];
    const translation = pickLocalizedTranslation<any>(translations, locale);
    const isRequestedLanguage = translation?.language_code === locale || locale === "en";
    const slug = translation?.slug;
    const fallbackCopy = isRequestedLanguage ? null : localizedArticleFallback(locale, item.category, slug);
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
      image: getNewsImageForSlugs([localImage], index, item.image_url),
      sourceUrl: item.source_url
    };
  });

  return mergeNewsItems(supabaseItems, getLocalNewsItems(limit, locale)).slice(0, limit);
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

function getLocalNewsItems(limit: number, locale: Locale): NewsItemData[] {
  return newsSeoArticles.slice(0, limit).map((article) => {
    const body = [
      article.summary,
      ...article.sections.map((section) =>
        [section.body, ...(section.bullets ?? []).map((bullet) => `- ${bullet}`)].join("\n")
      )
    ].join("\n\n");

    return {
      id: `local-${article.slug}`,
      slug: article.slug,
      title: article.title,
      text: article.description,
      body: locale === "en" ? body : fullArticleBody(locale, localizeCategory(article.category, locale)),
      meta: formatArticleMeta(article.category, `${article.publishedAt}T12:00:00+00:00`, locale),
      image: article.image,
      sourceUrl: article.sourceUrl
    };
  });
}

function mergeNewsItems(primary: NewsItemData[], fallback: NewsItemData[]) {
  const seen = new Set<string>();
  const merged: NewsItemData[] = [];

  for (const item of [...fallback, ...primary]) {
    const key = item.sourceUrl || item.slug || item.id || item.title;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }

  return merged;
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

function localizedArticleFallback(locale: Locale, category: string | null, slug: string | undefined) {
  const copy = staticText(locale);
  const categoryLabel = localizeCategory(category, locale);
  const topic = localizeArticleTopic(slug, locale);
  return {
    title: topic.title ?? (categoryLabel ? `${copy.genericArticleTitle}: ${categoryLabel}` : copy.genericArticleTitle),
    excerpt: topic.text ?? copy.genericArticleExcerpt,
    body: topic.body ?? fullArticleBody(locale, categoryLabel)
  };
}

function localizeArticleTopic(_slug: string | undefined, _locale: Locale): Partial<Pick<NewsItemData, "title" | "text" | "body">> {
  return {};
}

function fullArticleBody(locale: Locale, categoryLabel: string | null) {
  const category = categoryLabel ?? staticText(locale).news;
  const bodies: Record<Locale, string> = {
    en: `This World Cup update is part of the wider planning picture for fans heading to the 2026 tournament. CupMate is tracking developments in ${category.toLowerCase()} because they can affect match-day timing, ticket decisions, travel routes and the way supporters choose host-city experiences.\n\nFor fans, the practical impact is bigger than the headline. A change in tournament operations can shape when to leave for a stadium, where to meet friends before kickoff, which fan zone to choose and how much flexibility to keep in an itinerary.\n\nThe 2026 World Cup will stretch across the United States, Canada and Mexico, so local details matter. Transport rules, venue policies, entertainment schedules and partner activations can vary by city, and supporters who follow those updates early will have more options during the tournament.\n\nCupMate will keep pairing news with useful planning context: nearby places to watch, saved matches, stadium routes, ticket reminders and host-city notes. The goal is to turn every update into a clearer match-day plan instead of another isolated headline.`,
    es: `Esta actualización del Mundial forma parte del panorama de planificación para los fans que viajarán al torneo de 2026. CupMate sigue las novedades de ${category.toLowerCase()} porque pueden influir en los horarios del día de partido, las decisiones sobre entradas, las rutas y la forma de vivir cada ciudad sede.\n\nPara los aficionados, el impacto práctico va más allá del titular. Un cambio operativo puede afectar la hora de salida hacia el estadio, el punto de encuentro antes del partido, la fan zone elegida y la flexibilidad necesaria dentro del itinerario.\n\nEl Mundial 2026 se jugará en Estados Unidos, Canadá y México, por eso los detalles locales son importantes. Las normas de transporte, las políticas de los estadios, los horarios de entretenimiento y las activaciones de socios pueden variar por ciudad; seguirlas con anticipación da más margen de maniobra.\n\nCupMate seguirá conectando las noticias con contexto útil: lugares cercanos para ver partidos, encuentros guardados, rutas al estadio, recordatorios de entradas y notas de ciudades sede. La idea es convertir cada actualización en un plan de partido más claro, no en un titular aislado.`,
    fr: `Cette mise à jour de la Coupe du monde s'inscrit dans la préparation globale des fans qui se rendront au tournoi 2026. CupMate suit les sujets liés à ${category.toLowerCase()} parce qu'ils peuvent influencer les horaires de jour de match, les choix de billets, les itinéraires et l'expérience dans chaque ville hôte.\n\nPour les supporters, l'impact pratique dépasse largement le titre. Une évolution opérationnelle peut changer l'heure de départ vers le stade, le lieu de rendez-vous avant le coup d'envoi, la fan zone à privilégier et la marge de flexibilité à conserver dans l'itinéraire.\n\nLa Coupe du monde 2026 se déroulera aux États-Unis, au Canada et au Mexique, donc les détails locaux comptent. Les règles de transport, les politiques des stades, les programmes d'animation et les activations partenaires peuvent varier selon les villes; les suivre tôt permet de mieux anticiper.\n\nCupMate continuera de relier les actualités à des informations concrètes: lieux proches pour regarder les matchs, rencontres enregistrées, trajets vers les stades, rappels de billets et notes sur les villes hôtes. L'objectif est de transformer chaque nouvelle en plan de match plus clair.`,
    de: `Dieses WM-Update gehört zum größeren Planungsbild für Fans, die 2026 zum Turnier reisen. CupMate verfolgt Entwicklungen rund um ${category.toLowerCase()}, weil sie den Ablauf am Spieltag, Ticketentscheidungen, Routen und Erlebnisse in Gastgeberstädten beeinflussen können.\n\nFür Fans ist die praktische Wirkung größer als die Überschrift. Eine operative Änderung kann bestimmen, wann man zum Stadion aufbrechen sollte, wo man sich vor dem Anpfiff trifft, welche Fan-Zone sinnvoll ist und wie viel Flexibilität im Reiseplan bleiben sollte.\n\nDie WM 2026 findet in den USA, Kanada und Mexiko statt, deshalb zählen lokale Details. Verkehrsregeln, Stadionrichtlinien, Entertainment-Zeitpläne und Partneraktionen können je nach Stadt unterschiedlich sein. Wer diese Updates früh verfolgt, hat während des Turniers mehr Optionen.\n\nCupMate verbindet News weiterhin mit nützlichem Planungskontext: Orte zum Schauen, gespeicherte Spiele, Stadionrouten, Ticket-Erinnerungen und Hinweise zu Gastgeberstädten. Aus jeder Meldung soll ein klarerer Spieltagsplan werden.`,
    pt: `Esta atualização da Copa do Mundo faz parte do planejamento mais amplo para torcedores que irão ao torneio de 2026. O CupMate acompanha novidades de ${category.toLowerCase()} porque elas podem afetar horários no dia do jogo, decisões sobre ingressos, rotas e experiências nas cidades-sede.\n\nPara os torcedores, o impacto prático é maior do que a manchete. Uma mudança operacional pode alterar o melhor horário para sair ao estádio, o ponto de encontro antes da partida, a fan zone escolhida e a flexibilidade necessária no roteiro.\n\nA Copa de 2026 acontecerá nos Estados Unidos, Canadá e México, então os detalhes locais importam. Regras de transporte, políticas dos estádios, programação de entretenimento e ativações de parceiros podem variar por cidade; acompanhar isso cedo dá mais opções durante o torneio.\n\nO CupMate continuará conectando notícias a contexto útil: lugares próximos para assistir, jogos salvos, rotas para estádios, lembretes de ingressos e notas das cidades-sede. A meta é transformar cada atualização em um plano de jogo mais claro.`,
    it: `Questo aggiornamento sulla Coppa del Mondo fa parte del quadro di pianificazione per i tifosi che seguiranno il torneo 2026. CupMate monitora le novità legate a ${category.toLowerCase()} perché possono incidere sui tempi del giorno partita, sulle decisioni sui biglietti, sui percorsi e sulle esperienze nelle città ospitanti.\n\nPer i tifosi, l'impatto pratico va oltre il titolo. Un cambiamento operativo può modificare l'orario di partenza verso lo stadio, il punto d'incontro prima del calcio d'inizio, la fan zone da scegliere e la flessibilità da mantenere nell'itinerario.\n\nLa Coppa del Mondo 2026 si giocherà tra Stati Uniti, Canada e Messico, quindi i dettagli locali contano. Regole di trasporto, politiche degli stadi, programmi di intrattenimento e attività dei partner possono cambiare da città a città; seguirli in anticipo offre più opzioni.\n\nCupMate continuerà a collegare le notizie al contesto utile: luoghi dove guardare le partite, incontri salvati, percorsi verso gli stadi, promemoria sui biglietti e note sulle città ospitanti. L'obiettivo è trasformare ogni aggiornamento in un piano più chiaro per il giorno partita.`,
    ar: `يمثل هذا التحديث الخاص بكأس العالم جزءاً من صورة التخطيط الأوسع للمشجعين المتجهين إلى بطولة 2026. يتابع CupMate تطورات ${category} لأنها قد تؤثر في توقيت يوم المباراة، وقرارات التذاكر، والمسارات، وطريقة الاستمتاع بكل مدينة مضيفة.\n\nبالنسبة للمشجعين، الأثر العملي أكبر من العنوان. أي تغيير تشغيلي قد يحدد موعد الانطلاق إلى الملعب، ومكان لقاء الأصدقاء قبل البداية، ومنطقة المشجعين الأنسب، ومقدار المرونة المطلوب في الرحلة.\n\nستقام كأس العالم 2026 في الولايات المتحدة وكندا والمكسيك، ولذلك تصبح التفاصيل المحلية مهمة. قواعد النقل، وسياسات الملاعب، وبرامج الترفيه، وأنشطة الشركاء قد تختلف من مدينة إلى أخرى؛ ومتابعتها مبكراً تمنح المشجعين خيارات أفضل.\n\nسيواصل CupMate ربط الأخبار بسياق عملي: أماكن قريبة لمشاهدة المباريات، ومباريات محفوظة، ومسارات إلى الملاعب، وتذكيرات التذاكر، وملاحظات المدن المضيفة. الهدف هو تحويل كل تحديث إلى خطة أوضح ليوم المباراة.`,
    zh: `这条世界杯动态是球迷规划 2026 年赛事行程的一部分。CupMate 会持续跟踪与${category}相关的信息，因为它们可能影响比赛日出发时间、门票决策、交通路线以及在各主办城市的体验安排。\n\n对球迷来说，新闻的实际影响往往不止标题本身。一次运营调整可能会改变前往球场的最佳时间、赛前集合地点、适合选择的球迷区，以及行程中需要保留的灵活度。\n\n2026 年世界杯将在美国、加拿大和墨西哥举行，因此本地细节非常重要。交通规则、球场政策、娱乐活动时间表和合作伙伴活动可能因城市而异。越早掌握这些信息，比赛期间的选择就越多。\n\nCupMate 会继续把新闻和实用规划连接起来：附近观赛地点、已保存比赛、球场路线、门票提醒和主办城市提示。目标是把每一条动态变成更清晰的比赛日计划，而不是孤立的标题。`,
    ja: `このワールドカップ最新情報は、2026年大会へ向かうファンの計画全体に関わるものです。CupMateは${category}に関する動きを追跡しています。試合日の出発時間、チケット判断、移動ルート、開催都市での過ごし方に影響する可能性があるからです。\n\nファンにとって、実用面での影響は見出し以上に大きいものです。運営上の変更ひとつで、スタジアムへ向かう時間、キックオフ前の集合場所、選ぶべきファンゾーン、旅程に残す余裕が変わることがあります。\n\n2026年ワールドカップはアメリカ、カナダ、メキシコで開催されるため、地域ごとの詳細が重要です。交通ルール、スタジアム方針、イベント予定、パートナー施策は都市によって異なる場合があります。早めに把握すれば、大会期間中の選択肢が広がります。\n\nCupMateは今後もニュースを実用的な計画情報と結びつけます。近くの観戦場所、保存した試合、スタジアムへのルート、チケットのリマインダー、開催都市メモを組み合わせ、各ニュースをより明確な試合日プランへ変えていきます。`,
    ko: `이 월드컵 업데이트는 2026년 대회를 준비하는 팬들의 전체 계획과 연결되어 있습니다. CupMate는 ${category} 관련 소식을 추적합니다. 이런 정보가 경기일 출발 시간, 티켓 판단, 이동 경로, 개최 도시 경험에 영향을 줄 수 있기 때문입니다.\n\n팬들에게 실제 영향은 제목보다 큽니다. 운영상의 변화 하나가 경기장으로 떠나는 시간, 킥오프 전 만남 장소, 선택할 팬존, 일정에 남겨야 할 여유를 바꿀 수 있습니다.\n\n2026 월드컵은 미국, 캐나다, 멕시코에서 열리기 때문에 현지 세부 정보가 중요합니다. 교통 규칙, 경기장 정책, 엔터테인먼트 일정, 파트너 활동은 도시마다 다를 수 있습니다. 이런 업데이트를 일찍 확인하면 대회 기간에 더 많은 선택지가 생깁니다.\n\nCupMate는 앞으로도 뉴스를 실용적인 계획 정보와 연결합니다. 가까운 시청 장소, 저장한 경기, 경기장 경로, 티켓 알림, 개최 도시 메모를 함께 제공해 각 업데이트가 더 명확한 경기일 계획이 되도록 합니다.`,
    ru: `Это обновление Чемпионата мира является частью общей картины планирования для болельщиков, которые собираются на турнир 2026 года. CupMate отслеживает новости по теме «${category}», потому что они могут влиять на время выезда в день матча, решения по билетам, маршруты и опыт в городах-организаторах.\n\nДля болельщиков практический эффект часто важнее самого заголовка. Операционное изменение может повлиять на то, когда ехать к стадиону, где встречаться с друзьями до стартового свистка, какую фан-зону выбрать и сколько гибкости оставить в маршруте.\n\nЧемпионат мира 2026 пройдет в США, Канаде и Мексике, поэтому локальные детали имеют значение. Правила транспорта, политика стадионов, расписание развлечений и активности партнеров могут отличаться от города к городу. Чем раньше болельщик видит эти изменения, тем больше вариантов у него остается во время турнира.\n\nCupMate продолжит связывать новости с полезным контекстом: местами для просмотра, сохраненными матчами, маршрутами к стадионам, напоминаниями о билетах и заметками по городам-организаторам. Цель — превращать каждое обновление в понятный план игрового дня, а не оставлять его отдельным заголовком.`
  };
  return bodies[locale] ?? bodies.en;
}

function localizeCategory(category: string | null, locale: Locale) {
  if (!category) return null;
  if (category === "Safety") {
    const safetyLabels: Partial<Record<Locale, string>> = {
      ru: "Безопасность",
      es: "Seguridad",
      fr: "Sécurité",
      de: "Sicherheit",
      pt: "Segurança",
      it: "Sicurezza",
      ar: "السلامة",
      zh: "安全",
      ja: "安全",
      ko: "안전"
    };
    return safetyLabels[locale] ?? category;
  }
  const labels: Partial<Record<Locale, Record<string, string>>> = {
    es: { Teams: "Equipos", Culture: "Cultura", Streaming: "Streaming", Travel: "Viajes", Commerce: "Comercio", "Fan Experience": "Experiencia de fans", Transport: "Transporte", Regulation: "Reglamento", Infrastructure: "Infraestructura", Music: "Música", Hospitality: "Hospitalidad", Tickets: "Entradas", Analysis: "Análisis", News: "Noticias", Stadiums: "Estadios" },
    fr: { Teams: "Équipes", Culture: "Culture", Streaming: "Streaming", Travel: "Voyage", Commerce: "Commerce", "Fan Experience": "Expérience fans", Transport: "Transport", Regulation: "Règlement", Infrastructure: "Infrastructure", Music: "Musique", Hospitality: "Hospitalité", Tickets: "Billets", Analysis: "Analyse", News: "Actualités", Stadiums: "Stades" },
    de: { Teams: "Teams", Culture: "Kultur", Streaming: "Streaming", Travel: "Reisen", Commerce: "Handel", "Fan Experience": "Fan-Erlebnis", Transport: "Transport", Regulation: "Regeln", Infrastructure: "Infrastruktur", Music: "Musik", Hospitality: "Hospitality", Tickets: "Tickets", Analysis: "Analyse", News: "News", Stadiums: "Stadien" },
    pt: { Teams: "Equipes", Culture: "Cultura", Streaming: "Streaming", Travel: "Viagens", Commerce: "Comércio", "Fan Experience": "Experiência de fãs", Transport: "Transporte", Regulation: "Regulamento", Infrastructure: "Infraestrutura", Music: "Música", Hospitality: "Hospitalidade", Tickets: "Ingressos", Analysis: "Análise", News: "Notícias", Stadiums: "Estádios" },
    it: { Teams: "Squadre", Culture: "Cultura", Streaming: "Streaming", Travel: "Viaggi", Commerce: "Commercio", "Fan Experience": "Esperienza tifosi", Transport: "Trasporti", Regulation: "Regolamento", Infrastructure: "Infrastruttura", Music: "Musica", Hospitality: "Ospitalità", Tickets: "Biglietti", Analysis: "Analisi", News: "Notizie", Stadiums: "Stadi" },
    ar: { Teams: "الفرق", Culture: "الثقافة", Streaming: "البث", Travel: "السفر", Commerce: "التجارة", "Fan Experience": "تجربة المشجعين", Transport: "النقل", Regulation: "اللوائح", Infrastructure: "البنية التحتية", Music: "الموسيقى", Hospitality: "الضيافة", Tickets: "التذاكر", Analysis: "تحليل", News: "الأخبار", Stadiums: "الملاعب" },
    zh: { Teams: "球队", Culture: "文化", Streaming: "流媒体", Travel: "旅行", Commerce: "商业", "Fan Experience": "球迷体验", Transport: "交通", Regulation: "规则", Infrastructure: "基础设施", Music: "音乐", Hospitality: "接待", Tickets: "门票", Analysis: "分析", News: "新闻", Stadiums: "体育场" },
    ja: { Teams: "チーム", Culture: "文化", Streaming: "配信", Travel: "旅行", Commerce: "商業", "Fan Experience": "ファン体験", Transport: "交通", Regulation: "規則", Infrastructure: "インフラ", Music: "音楽", Hospitality: "ホスピタリティ", Tickets: "チケット", Analysis: "分析", News: "ニュース", Stadiums: "スタジアム" },
    ko: { Teams: "팀", Culture: "문화", Streaming: "스트리밍", Travel: "여행", Commerce: "상업", "Fan Experience": "팬 경험", Transport: "교통", Regulation: "규정", Infrastructure: "인프라", Music: "음악", Hospitality: "환대", Tickets: "티켓", Analysis: "분석", News: "뉴스", Stadiums: "경기장" },
    ru: { Teams: "Команды", Culture: "Культура", Streaming: "Стриминг", Travel: "Путешествия", Commerce: "Коммерция", "Fan Experience": "Фанатский опыт", Transport: "Транспорт", Regulation: "Регламент", Infrastructure: "Инфраструктура", Music: "Музыка", Hospitality: "Гостеприимство", Tickets: "Билеты", Analysis: "Аналитика", News: "Новости", Stadiums: "Стадионы" }
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
