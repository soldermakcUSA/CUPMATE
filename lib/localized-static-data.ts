import { fanZones, fans, itinerary, matches, news, places } from "@/lib/mock-data";
import type { NewsItemData, PlaceCardData } from "@/lib/content-data";
import type { Locale } from "@/lib/i18n";
import { localizedDateFormatterLocale } from "@/lib/content-localization";
import type { MatchCardData } from "@/lib/world-cup-data";

type StaticText = {
  food: string;
  music: string;
  beach: string;
  games: string;
  family: string;
  sportsBar: string;
  restaurant: string;
  fanZone: string;
  manyScreens: string;
  latinAtmosphere: string;
  localBeer: string;
  bigScreen: string;
  greatVibes: string;
  liveDj: string;
  outdoorScreen: string;
  foodTrucks: string;
  latest: string;
  news: string;
  hostCity: string;
  officialDestination: string;
  genericArticleTitle: string;
  genericArticleExcerpt: string;
  genericArticleBody: string;
};

const text: Record<Locale, StaticText> = {
  en: {
    food: "Food", music: "Music", beach: "Beach", games: "Games", family: "Family", sportsBar: "Sports Bar", restaurant: "Restaurant", fanZone: "Fan Zone",
    manyScreens: "Many Screens", latinAtmosphere: "Latin Atmosphere", localBeer: "Local Beer", bigScreen: "Big Screen", greatVibes: "Great Vibes", liveDj: "Live DJ", outdoorScreen: "Outdoor Screen", foodTrucks: "Food Trucks",
    latest: "Latest", news: "News", hostCity: "Host city", officialDestination: "Official World Cup fan destination.",
    genericArticleTitle: "World Cup update", genericArticleExcerpt: "A new tournament update is available for fans planning the 2026 World Cup.", genericArticleBody: "CupMate is tracking this update for fans who are planning matches, routes, tickets and host-city experiences around the 2026 World Cup."
  },
  es: {
    food: "Comida", music: "Música", beach: "Playa", games: "Juegos", family: "Familiar", sportsBar: "Bar deportivo", restaurant: "Restaurante", fanZone: "Fan zone",
    manyScreens: "Muchas pantallas", latinAtmosphere: "Ambiente latino", localBeer: "Cerveza local", bigScreen: "Pantalla gigante", greatVibes: "Gran ambiente", liveDj: "DJ en vivo", outdoorScreen: "Pantalla exterior", foodTrucks: "Food trucks",
    latest: "Reciente", news: "Noticias", hostCity: "Ciudad sede", officialDestination: "Destino oficial para fans del Mundial.",
    genericArticleTitle: "Actualización del Mundial", genericArticleExcerpt: "Hay una nueva actualización para fans que planifican el Mundial 2026.", genericArticleBody: "CupMate sigue esta actualización para fans que organizan partidos, rutas, entradas y experiencias en ciudades sede del Mundial 2026."
  },
  fr: {
    food: "Restauration", music: "Musique", beach: "Plage", games: "Jeux", family: "Famille", sportsBar: "Bar sportif", restaurant: "Restaurant", fanZone: "Fan zone",
    manyScreens: "Nombreux écrans", latinAtmosphere: "Ambiance latine", localBeer: "Bière locale", bigScreen: "Grand écran", greatVibes: "Belle ambiance", liveDj: "DJ live", outdoorScreen: "Écran extérieur", foodTrucks: "Food trucks",
    latest: "Récent", news: "Actualités", hostCity: "Ville hôte", officialDestination: "Destination officielle pour les fans de la Coupe du monde.",
    genericArticleTitle: "Mise à jour Coupe du monde", genericArticleExcerpt: "Une nouvelle mise à jour est disponible pour les fans qui préparent la Coupe du monde 2026.", genericArticleBody: "CupMate suit cette mise à jour pour les fans qui planifient matchs, itinéraires, billets et expériences dans les villes hôtes de la Coupe du monde 2026."
  },
  de: {
    food: "Essen", music: "Musik", beach: "Strand", games: "Spiele", family: "Familie", sportsBar: "Sportsbar", restaurant: "Restaurant", fanZone: "Fan-Zone",
    manyScreens: "Viele Bildschirme", latinAtmosphere: "Lateinamerikanische Atmosphäre", localBeer: "Lokales Bier", bigScreen: "Großbildschirm", greatVibes: "Gute Stimmung", liveDj: "Live-DJ", outdoorScreen: "Außenbildschirm", foodTrucks: "Foodtrucks",
    latest: "Aktuell", news: "News", hostCity: "Gastgeberstadt", officialDestination: "Offizieller Fan-Ort zur Weltmeisterschaft.",
    genericArticleTitle: "WM-Update", genericArticleExcerpt: "Ein neues Turnierupdate ist für Fans verfügbar, die die WM 2026 planen.", genericArticleBody: "CupMate verfolgt dieses Update für Fans, die Spiele, Routen, Tickets und Erlebnisse in Gastgeberstädten der WM 2026 planen."
  },
  pt: {
    food: "Comida", music: "Música", beach: "Praia", games: "Jogos", family: "Família", sportsBar: "Bar esportivo", restaurant: "Restaurante", fanZone: "Fan zone",
    manyScreens: "Muitas telas", latinAtmosphere: "Ambiente latino", localBeer: "Cerveja local", bigScreen: "Telão", greatVibes: "Ótimo clima", liveDj: "DJ ao vivo", outdoorScreen: "Tela externa", foodTrucks: "Food trucks",
    latest: "Recente", news: "Notícias", hostCity: "Cidade-sede", officialDestination: "Destino oficial para torcedores da Copa.",
    genericArticleTitle: "Atualização da Copa", genericArticleExcerpt: "Há uma nova atualização para torcedores que planejam a Copa do Mundo 2026.", genericArticleBody: "O CupMate acompanha esta atualização para torcedores que organizam jogos, rotas, ingressos e experiências nas cidades-sede da Copa do Mundo 2026."
  },
  it: {
    food: "Cibo", music: "Musica", beach: "Spiaggia", games: "Giochi", family: "Famiglie", sportsBar: "Sports bar", restaurant: "Ristorante", fanZone: "Fan zone",
    manyScreens: "Molti schermi", latinAtmosphere: "Atmosfera latina", localBeer: "Birra locale", bigScreen: "Maxischermo", greatVibes: "Ottimo ambiente", liveDj: "DJ live", outdoorScreen: "Schermo esterno", foodTrucks: "Food truck",
    latest: "Recente", news: "Notizie", hostCity: "Città ospitante", officialDestination: "Destinazione ufficiale per i tifosi della Coppa del Mondo.",
    genericArticleTitle: "Aggiornamento Coppa del Mondo", genericArticleExcerpt: "È disponibile un nuovo aggiornamento per i tifosi che pianificano la Coppa del Mondo 2026.", genericArticleBody: "CupMate segue questo aggiornamento per i tifosi che pianificano partite, percorsi, biglietti ed esperienze nelle città ospitanti della Coppa del Mondo 2026."
  },
  ar: {
    food: "طعام", music: "موسيقى", beach: "شاطئ", games: "ألعاب", family: "عائلي", sportsBar: "بار رياضي", restaurant: "مطعم", fanZone: "منطقة مشجعين",
    manyScreens: "شاشات عديدة", latinAtmosphere: "أجواء لاتينية", localBeer: "مشروبات محلية", bigScreen: "شاشة كبيرة", greatVibes: "أجواء رائعة", liveDj: "دي جي مباشر", outdoorScreen: "شاشة خارجية", foodTrucks: "عربات طعام",
    latest: "الأحدث", news: "الأخبار", hostCity: "مدينة مضيفة", officialDestination: "وجهة رسمية لمشجعي كأس العالم.",
    genericArticleTitle: "تحديث كأس العالم", genericArticleExcerpt: "يتوفر تحديث جديد للمشجعين الذين يخططون لكأس العالم 2026.", genericArticleBody: "يتابع CupMate هذا التحديث للمشجعين الذين يخططون للمباريات والمسارات والتذاكر وتجارب المدن المضيفة في كأس العالم 2026."
  },
  zh: {
    food: "美食", music: "音乐", beach: "海滩", games: "游戏", family: "家庭", sportsBar: "体育酒吧", restaurant: "餐厅", fanZone: "球迷区",
    manyScreens: "多块屏幕", latinAtmosphere: "拉丁氛围", localBeer: "本地啤酒", bigScreen: "大屏幕", greatVibes: "氛围出色", liveDj: "现场 DJ", outdoorScreen: "户外屏幕", foodTrucks: "餐车",
    latest: "最新", news: "新闻", hostCity: "主办城市", officialDestination: "世界杯官方球迷目的地。",
    genericArticleTitle: "世界杯动态", genericArticleExcerpt: "面向计划 2026 世界杯的球迷，有一条新的赛事动态。", genericArticleBody: "CupMate 正在跟踪这条动态，帮助球迷规划 2026 世界杯的比赛、路线、门票和主办城市体验。"
  },
  ja: {
    food: "フード", music: "音楽", beach: "ビーチ", games: "ゲーム", family: "家族向け", sportsBar: "スポーツバー", restaurant: "レストラン", fanZone: "ファンゾーン",
    manyScreens: "多数のスクリーン", latinAtmosphere: "ラテンの雰囲気", localBeer: "地元ビール", bigScreen: "大型スクリーン", greatVibes: "良い雰囲気", liveDj: "ライブDJ", outdoorScreen: "屋外スクリーン", foodTrucks: "フードトラック",
    latest: "最新", news: "ニュース", hostCity: "開催都市", officialDestination: "ワールドカップ公式ファン向けスポット。",
    genericArticleTitle: "ワールドカップ最新情報", genericArticleExcerpt: "2026年ワールドカップを計画するファン向けの新しい更新があります。", genericArticleBody: "CupMateは、2026年ワールドカップの試合、ルート、チケット、開催都市体験を計画するファンのためにこの更新を追跡しています。"
  },
  ko: {
    food: "음식", music: "음악", beach: "해변", games: "게임", family: "가족", sportsBar: "스포츠 바", restaurant: "레스토랑", fanZone: "팬존",
    manyScreens: "많은 스크린", latinAtmosphere: "라틴 분위기", localBeer: "현지 맥주", bigScreen: "대형 스크린", greatVibes: "좋은 분위기", liveDj: "라이브 DJ", outdoorScreen: "야외 스크린", foodTrucks: "푸드트럭",
    latest: "최신", news: "뉴스", hostCity: "개최 도시", officialDestination: "월드컵 공식 팬 목적지.",
    genericArticleTitle: "월드컵 업데이트", genericArticleExcerpt: "2026 월드컵을 계획하는 팬을 위한 새로운 대회 업데이트입니다.", genericArticleBody: "CupMate는 2026 월드컵의 경기, 경로, 티켓, 개최 도시 경험을 준비하는 팬들을 위해 이 업데이트를 추적합니다."
  },
  ru: {
    food: "Еда", music: "Музыка", beach: "Пляж", games: "Игры", family: "Для семьи", sportsBar: "Спорт-бар", restaurant: "Ресторан", fanZone: "Фан-зона",
    manyScreens: "Много экранов", latinAtmosphere: "Латиноамериканская атмосфера", localBeer: "Местное пиво", bigScreen: "Большой экран", greatVibes: "Отличная атмосфера", liveDj: "Живой DJ", outdoorScreen: "Экран на улице", foodTrucks: "Фудтраки",
    latest: "Новое", news: "Новости", hostCity: "Город-организатор", officialDestination: "Официальное место для болельщиков Чемпионата мира.",
    genericArticleTitle: "Обновление Чемпионата мира", genericArticleExcerpt: "Доступно новое обновление для болельщиков, планирующих Чемпионат мира 2026.", genericArticleBody: "CupMate отслеживает это обновление для болельщиков, которые планируют матчи, маршруты, билеты и впечатления в городах-организаторах Чемпионата мира 2026."
  }
};

const localNews: Partial<Record<Locale, Array<Pick<NewsItemData, "title" | "text" | "body" | "meta">>>> = {
  es: [
    { title: "EE. UU. listo para recibir al mundo", text: "Las 16 ciudades sede preparan una experiencia histórica para los fans.", body: "Las ciudades sede aceleran planes de transporte, seguridad, fan zones y servicios para visitantes antes del Mundial 2026.", meta: "Reciente · Noticias" },
    { title: "Entradas: empieza una nueva fase de venta", text: "Hay más entradas disponibles para partidos de fase de grupos.", body: "Los fans deben revisar la plataforma oficial con frecuencia, porque la disponibilidad puede cambiar por fases.", meta: "Reciente · Entradas" },
    { title: "Jugadores a seguir en 2026", text: "Jóvenes talentos y estrellas globales llegan al torneo ampliado.", body: "La lista de favoritos se actualizará a medida que las selecciones confirmen plantillas y estado físico.", meta: "Análisis" }
  ],
  fr: [
    { title: "Les États-Unis prêts à accueillir le monde", text: "Les 16 villes hôtes préparent une expérience majeure pour les fans.", body: "Les villes hôtes accélèrent les plans de transport, sécurité, fan zones et services visiteurs avant 2026.", meta: "Récent · Actualités" },
    { title: "Billets : une nouvelle phase de vente commence", text: "Des billets supplémentaires sont disponibles pour la phase de groupes.", body: "Les fans doivent consulter régulièrement la plateforme officielle, car les disponibilités peuvent changer par vagues.", meta: "Récent · Billets" },
    { title: "Joueurs à suivre en 2026", text: "Jeunes talents et stars mondiales arrivent dans le tournoi élargi.", body: "La liste des joueurs clés évoluera avec les sélections et l'état de forme avant le coup d'envoi.", meta: "Analyse" }
  ],
  de: [
    { title: "USA bereit, die Welt zu empfangen", text: "Alle 16 Gastgeberstädte bereiten ein großes Fan-Erlebnis vor.", body: "Die Gastgeberstädte beschleunigen Transport-, Sicherheits-, Fan-Zonen- und Besucherpläne für die WM 2026.", meta: "Aktuell · News" },
    { title: "Tickets: Neue Verkaufsphase startet", text: "Weitere Tickets für Gruppenspiele sind verfügbar.", body: "Fans sollten die offizielle Plattform regelmäßig prüfen, da Kontingente in Wellen erscheinen können.", meta: "Aktuell · Tickets" },
    { title: "Spieler, die man 2026 beobachten sollte", text: "Junge Talente und Weltstars treffen im erweiterten Turnier aufeinander.", body: "Die Liste wichtiger Spieler wird sich mit Kadern und Fitnessmeldungen vor dem Start weiter verändern.", meta: "Analyse" }
  ],
  ru: [
    { title: "США готовы принять мир", text: "Все 16 городов-организаторов готовят сильный опыт для болельщиков.", body: "Города-организаторы ускоряют подготовку транспорта, безопасности, фан-зон и сервисов для гостей перед Чемпионатом мира 2026.", meta: "Новое · Новости" },
    { title: "Билеты: стартует новая фаза продаж", text: "Дополнительные билеты на матчи группового этапа становятся доступны.", body: "Болельщикам стоит регулярно проверять официальную платформу: доступность может появляться волнами.", meta: "Новое · Билеты" },
    { title: "Игроки, за которыми стоит следить в 2026", text: "Молодые таланты и мировые звезды встретятся на расширенном турнире.", body: "Список ключевых игроков будет меняться по мере объявления составов и новостей о форме.", meta: "Аналитика" }
  ]
};

const teamNames: Partial<Record<Locale, Record<string, string>>> = {
  ru: { Mexico: "Мексика", "South Africa": "Южная Африка", "South Korea": "Южная Корея", Czechia: "Чехия", Canada: "Канада", "Bosnia and Herzegovina": "Босния и Герцеговина", Qatar: "Катар", Switzerland: "Швейцария", Brazil: "Бразилия", Morocco: "Марокко", Haiti: "Гаити", Scotland: "Шотландия", "United States": "США", Paraguay: "Парагвай", Australia: "Австралия", "Türkiye": "Турция", Germany: "Германия", Curacao: "Кюрасао", "Ivory Coast": "Кот-д'Ивуар", Ecuador: "Эквадор", Netherlands: "Нидерланды", Japan: "Япония", Sweden: "Швеция", Tunisia: "Тунис", Belgium: "Бельгия", Egypt: "Египет", Iran: "Иран", "New Zealand": "Новая Зеландия", Spain: "Испания", "Cape Verde": "Кабо-Верде", "Saudi Arabia": "Саудовская Аравия", Uruguay: "Уругвай", France: "Франция", Senegal: "Сенегал", Iraq: "Ирак", Norway: "Норвегия", Argentina: "Аргентина", Algeria: "Алжир", Austria: "Австрия", Jordan: "Иордания", Portugal: "Португалия", "Congo DR": "ДР Конго", Uzbekistan: "Узбекистан", Colombia: "Колумбия", England: "Англия", Croatia: "Хорватия", Ghana: "Гана", Panama: "Панама" }
};

function pack(locale: Locale) {
  return text[locale] ?? text.en;
}

function localizeGroup(group: string, locale: Locale) {
  const suffix = group.replace(/^Group\s+/i, "");
  const labels: Partial<Record<Locale, string>> = { es: "Grupo", fr: "Groupe", de: "Gruppe", pt: "Grupo", it: "Gruppo", ar: "المجموعة", zh: "小组", ja: "グループ", ko: "조", ru: "Группа" };
  return `${labels[locale] ?? "Group"} ${suffix}`;
}

function formatDate(monthDay: string, locale: Locale) {
  const date = new Date(`${monthDay}, 2026 12:00:00`);
  if (Number.isNaN(date.getTime())) return monthDay;
  return new Intl.DateTimeFormat(localizedDateFormatterLocale(locale), { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function formatTime(time: string, locale: Locale) {
  const date = new Date(`June 11, 2026 ${time}`);
  if (Number.isNaN(date.getTime())) return time;
  return new Intl.DateTimeFormat(localizedDateFormatterLocale(locale), { hour: "numeric", minute: "2-digit" }).format(date);
}

export function localizeVenue(venue: string, locale: Locale) {
  const replacements: Partial<Record<Locale, Record<string, string>>> = {
    es: { "Mexico City": "Ciudad de México", "New Jersey": "Nueva Jersey" },
    fr: { "Mexico City": "Mexico", "New Jersey": "New Jersey" },
    de: { "Mexico City": "Mexiko-Stadt", "New Jersey": "New Jersey" },
    pt: { "Mexico City": "Cidade do México", "New Jersey": "Nova Jersey" },
    it: { "Mexico City": "Città del Messico", "New Jersey": "New Jersey" },
    ar: { "Mexico City": "مكسيكو سيتي", "New Jersey": "نيوجيرسي" },
    zh: { "Mexico City": "墨西哥城", "New Jersey": "新泽西" },
    ja: { "Mexico City": "メキシコシティ", "New Jersey": "ニュージャージー" },
    ko: { "Mexico City": "멕시코시티", "New Jersey": "뉴저지" },
    ru: { "Mexico City": "Мехико", "New Jersey": "Нью-Джерси" }
  };
  return Object.entries(replacements[locale] ?? {}).reduce((value, [from, to]) => value.replace(from, to), venue);
}

export function localizedFallbackMatches(locale: Locale): MatchCardData[] {
  return matches.map((match) => ({
    ...match,
    group: localizeGroup(match.group, locale),
    date: formatDate(match.date.replace(", 2026", ""), locale),
    time: formatTime(match.time, locale),
    venue: localizeVenue(match.venue, locale)
  }));
}

export function localizedFallbackNews(locale: Locale): NewsItemData[] {
  const items = localNews[locale] ?? [];
  const copy = pack(locale);
  return news.map((item, index) => ({
    ...item,
    title: items[index]?.title ?? `${copy.genericArticleTitle} ${index + 1}`,
    text: items[index]?.text ?? copy.genericArticleExcerpt,
    body: items[index]?.body ?? copy.genericArticleBody,
    meta: items[index]?.meta ?? `${copy.latest} · ${copy.news}`
  }));
}

export function localizedFallbackPlaces(locale: Locale): PlaceCardData[] {
  const p = pack(locale);
  const notes = [
    `${p.manyScreens} · ${p.greatVibes}`,
    `${p.latinAtmosphere} · ${p.liveDj}`,
    `${p.localBeer} · ${p.outdoorScreen}`,
    `${p.bigScreen} · ${p.foodTrucks}`
  ];
  const types = [p.sportsBar, p.restaurant, p.sportsBar, p.fanZone];
  return places.map((place, index) => ({
    ...place,
    type: types[index] ?? p.fanZone,
    city: locale === "ru" ? "Майами, США" : locale === "zh" ? "迈阿密，美国" : locale === "ja" ? "マイアミ、米国" : locale === "ko" ? "마이애미, 미국" : "Miami, USA",
    note: notes[index] ?? p.officialDestination,
    tags: [p.bigScreen, p.food],
    latitude: 25.7752 + index * 0.01,
    longitude: -80.186 - index * 0.01
  }));
}

export function localizedFallbackFanZones(locale: Locale) {
  const p = pack(locale);
  return fanZones.map((zone) => ({
    ...zone,
    city: localizeVenue(zone.city, locale).replace("USA", locale === "ru" ? "США" : locale === "es" ? "EE. UU." : locale === "fr" ? "États-Unis" : "USA"),
    tags: zone.tags.map((tag) => tag === "Live Screen" ? p.bigScreen : tag === "Food" ? p.food : tag === "Music" ? p.music : tag === "Beach" ? p.beach : tag === "Games" ? p.games : p.family)
  }));
}

export function localizedFallbackItinerary(locale: Locale) {
  return itinerary.map((item) => ({
    ...item,
    day: item.day.replace("JUN", locale === "ru" ? "ИЮН" : locale === "es" ? "JUN" : locale === "fr" ? "JUIN" : locale === "de" ? "JUN" : item.day.slice(0, 3)),
    time: formatTime(item.time, locale),
    match: item.match.replace(" vs ", locale === "ru" ? " против " : locale === "zh" ? " 对 " : locale === "ja" ? " 対 " : locale === "ko" ? " 대 " : " vs "),
    venue: localizeVenue(item.venue, locale)
  }));
}

export function localizedFallbackFans(locale: Locale) {
  const countries: Partial<Record<Locale, string[]>> = {
    es: ["Argentina", "Brasil", "Inglaterra", "Japón"],
    fr: ["Argentine", "Brésil", "Angleterre", "Japon"],
    de: ["Argentinien", "Brasilien", "England", "Japan"],
    ru: ["Аргентина", "Бразилия", "Англия", "Япония"],
    zh: ["阿根廷", "巴西", "英格兰", "日本"],
    ja: ["アルゼンチン", "ブラジル", "イングランド", "日本"],
    ko: ["아르헨티나", "브라질", "잉글랜드", "일본"]
  };
  const statuses: Partial<Record<Locale, string[]>> = {
    es: ["¡Vamos Argentina! 🇦🇷", "¡Vamos Brasil! 💚", "¡Three Lions! 🏴", "日本がんばれ！🔥"],
    fr: ["Allez l'Argentine ! 🇦🇷", "Allez le Brésil ! 💚", "Three Lions ! 🏴", "日本がんばれ！🔥"],
    de: ["Auf geht's Argentinien! 🇦🇷", "Vai Brasil! 💚", "Three Lions! 🏴", "日本がんばれ！🔥"],
    ru: ["Вперед, Аргентина! 🇦🇷", "Вперед, Бразилия! 💚", "Три льва! 🏴", "日本がんばれ！🔥"],
    zh: ["阿根廷加油！🇦🇷", "巴西加油！💚", "三狮军团！🏴", "日本加油！🔥"],
    ja: ["アルゼンチン頑張れ！🇦🇷", "ブラジル頑張れ！💚", "スリーライオンズ！🏴", "頑張れ日本！🔥"],
    ko: ["아르헨티나 파이팅! 🇦🇷", "브라질 파이팅! 💚", "스리 라이언스! 🏴", "일본 파이팅! 🔥"]
  };
  return fans.map((fan, index) => ({
    ...fan,
    country: countries[locale]?.[index] ?? fan.country,
    status: statuses[locale]?.[index] ?? fan.status
  }));
}

export function localizeTeamName(name: string, locale: Locale) {
  return teamNames[locale]?.[name] ?? name;
}

export function staticText(locale: Locale) {
  return pack(locale);
}
