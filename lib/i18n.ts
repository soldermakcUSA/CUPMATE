export const languages = [
  { code: "en", name: "English", short: "EN", dir: "ltr" },
  { code: "es", name: "Español", short: "ES", dir: "ltr" },
  { code: "fr", name: "Français", short: "FR", dir: "ltr" },
  { code: "de", name: "Deutsch", short: "DE", dir: "ltr" },
  { code: "pt", name: "Português", short: "PT", dir: "ltr" },
  { code: "it", name: "Italiano", short: "IT", dir: "ltr" },
  { code: "ar", name: "العربية", short: "AR", dir: "rtl" },
  { code: "zh", name: "中文", short: "ZH", dir: "ltr" },
  { code: "ja", name: "日本語", short: "JA", dir: "ltr" },
  { code: "ko", name: "한국어", short: "KO", dir: "ltr" },
  { code: "ru", name: "Русский", short: "RU", dir: "ltr" }
] as const;

export type Locale = (typeof languages)[number]["code"];

const en = {
  brandSubtitle: "Your World Cup Companion",
  search: "Search for matches, teams, places...",
  dashboard: "Dashboard",
  matches: "Matches",
  fanZones: "Fan Zones",
  stadiums: "Stadiums",
  travel: "Travel & Routes",
  watch: "Where to Watch",
  community: "Community",
  tickets: "Tickets",
  news: "News",
  assistant: "AI Assistant",
  heroTitle: "The World Cup Starts June 11, 2026!",
  heroSub: "104 matches. 16 host cities. 1 champion.",
  exploreMatches: "Explore Matches",
  nextMatches: "Next Matches",
  viewFullSchedule: "View full schedule",
  seeDetails: "See details",
  newsUpdates: "News & Updates",
  viewAllNews: "View all news",
  popularFanZones: "Popular Fan Zones",
  viewAll: "View all",
  interactiveMap: "Interactive Map",
  viewFullMap: "View full map",
  parking: "Parking",
  itinerary: "My Itinerary",
  viewTicket: "View Ticket",
  addItinerary: "Add to itinerary",
  askAnything: "Ask anything about the World Cup",
  questionPlaceholder: "Ask your question...",
  goodMorning: "Good morning, Alex!",
  mobileHero: "The World Cup Starts Here",
  nextMatch: "Next Match",
  matchesToday: "Matches Today",
  home: "Home",
  map: "Map",
  profile: "Profile",
  all: "All",
  myTime: "My Time",
  byTeam: "By Team",
  byVenue: "By Venue",
  stadiumGuide: "Stadium Guide",
  helpfulInfo: "Helpful Info",
  gatesOpen: "Gates Open",
  capacity: "Capacity",
  cashlessVenue: "Cashless Venue",
  prohibitedItems: "Prohibited Items",
  viewStadiumMap: "View Stadium Map",
  routeToStadium: "Route to Stadium",
  publicTransport: "Public Transport",
  driving: "Driving",
  walking: "Walking",
  taxi: "Taxi",
  recommendedRoute: "Recommended Route",
  startNavigation: "Start Navigation",
  sportsBars: "Sports Bars",
  restaurants: "Restaurants",
  nearbyFans: "Nearby Fans",
  groups: "Groups",
  feed: "Feed",
  findFans: "Find fans of your team",
  connectFans: "Connect with fans near you",
  findNow: "Find Now",
  chat: "Chat",
  aiGreeting: "Hi Alex! How can I help you today?",
  lang: "Language",
  liveScreen: "Live Screen",
  reservations: "Reservations",
  closeArticle: "Close article",
  originalReport: "CupMate original report",
  versus: "vs"
};

const overrides: Record<Exclude<Locale, "en">, Partial<typeof en>> = {
  es: { dashboard: "Panel", matches: "Partidos", fanZones: "Fan Zones", stadiums: "Estadios", travel: "Viajes y rutas", watch: "Dónde ver", community: "Comunidad", tickets: "Entradas", news: "Noticias", assistant: "Asistente IA", search: "Buscar partidos, equipos, lugares...", exploreMatches: "Ver partidos", nextMatches: "Próximos partidos", interactiveMap: "Mapa interactivo", itinerary: "Mi itinerario", home: "Inicio", map: "Mapa", profile: "Perfil", lang: "Idioma" },
  fr: { dashboard: "Tableau", matches: "Matchs", fanZones: "Fan zones", stadiums: "Stades", travel: "Voyage et routes", watch: "Où regarder", community: "Communauté", tickets: "Billets", news: "Actualités", assistant: "Assistant IA", search: "Rechercher matchs, équipes, lieux...", exploreMatches: "Explorer les matchs", nextMatches: "Prochains matchs", interactiveMap: "Carte interactive", itinerary: "Mon itinéraire", home: "Accueil", map: "Carte", profile: "Profil", lang: "Langue" },
  de: { dashboard: "Dashboard", matches: "Spiele", fanZones: "Fan-Zonen", stadiums: "Stadien", travel: "Reisen & Routen", watch: "Wo schauen", community: "Community", tickets: "Tickets", news: "News", assistant: "KI-Assistent", search: "Spiele, Teams, Orte suchen...", exploreMatches: "Spiele ansehen", nextMatches: "Nächste Spiele", interactiveMap: "Interaktive Karte", itinerary: "Meine Reise", home: "Home", map: "Karte", profile: "Profil", lang: "Sprache" },
  pt: { dashboard: "Painel", matches: "Jogos", fanZones: "Fan Zones", stadiums: "Estádios", travel: "Viagens e rotas", watch: "Onde assistir", community: "Comunidade", tickets: "Ingressos", news: "Notícias", assistant: "Assistente IA", search: "Buscar jogos, times, lugares...", exploreMatches: "Explorar jogos", nextMatches: "Próximos jogos", interactiveMap: "Mapa interativo", itinerary: "Meu roteiro", home: "Início", map: "Mapa", profile: "Perfil", lang: "Idioma" },
  it: { dashboard: "Dashboard", matches: "Partite", fanZones: "Fan zone", stadiums: "Stadi", travel: "Viaggi e percorsi", watch: "Dove guardare", community: "Community", tickets: "Biglietti", news: "Notizie", assistant: "Assistente IA", search: "Cerca partite, squadre, luoghi...", exploreMatches: "Esplora partite", nextMatches: "Prossime partite", interactiveMap: "Mappa interattiva", itinerary: "Il mio itinerario", home: "Home", map: "Mappa", profile: "Profilo", lang: "Lingua" },
  ar: { dashboard: "لوحة التحكم", matches: "المباريات", fanZones: "مناطق المشجعين", stadiums: "الملاعب", travel: "السفر والمسارات", watch: "أماكن المشاهدة", community: "المجتمع", tickets: "التذاكر", news: "الأخبار", assistant: "مساعد ذكي", search: "ابحث عن المباريات والفرق والأماكن...", exploreMatches: "استكشف المباريات", nextMatches: "المباريات القادمة", interactiveMap: "خريطة تفاعلية", itinerary: "رحلتي", home: "الرئيسية", map: "الخريطة", profile: "الملف", lang: "اللغة" },
  zh: { dashboard: "仪表盘", matches: "比赛", fanZones: "球迷区", stadiums: "体育场", travel: "旅行路线", watch: "观赛地点", community: "社区", tickets: "门票", news: "新闻", assistant: "AI 助手", search: "搜索比赛、球队、地点...", exploreMatches: "浏览比赛", nextMatches: "下一场比赛", interactiveMap: "互动地图", itinerary: "我的行程", home: "首页", map: "地图", profile: "个人", lang: "语言" },
  ja: { dashboard: "ダッシュボード", matches: "試合", fanZones: "ファンゾーン", stadiums: "スタジアム", travel: "移動ルート", watch: "観戦場所", community: "コミュニティ", tickets: "チケット", news: "ニュース", assistant: "AIアシスタント", search: "試合、チーム、場所を検索...", exploreMatches: "試合を見る", nextMatches: "次の試合", interactiveMap: "インタラクティブマップ", itinerary: "旅程", home: "ホーム", map: "地図", profile: "プロフィール", lang: "言語" },
  ko: { dashboard: "대시보드", matches: "경기", fanZones: "팬존", stadiums: "경기장", travel: "여행 경로", watch: "시청 장소", community: "커뮤니티", tickets: "티켓", news: "뉴스", assistant: "AI 어시스턴트", search: "경기, 팀, 장소 검색...", exploreMatches: "경기 보기", nextMatches: "다음 경기", interactiveMap: "인터랙티브 지도", itinerary: "내 일정", home: "홈", map: "지도", profile: "프로필", lang: "언어" },
  ru: { dashboard: "Дашборд", matches: "Матчи", fanZones: "Фан-зоны", stadiums: "Стадионы", travel: "Маршруты", watch: "Где смотреть", community: "Сообщество", tickets: "Билеты", news: "Новости", assistant: "AI-ассистент", search: "Поиск матчей, команд, мест...", exploreMatches: "Смотреть матчи", nextMatches: "Ближайшие матчи", interactiveMap: "Интерактивная карта", itinerary: "Мой маршрут", home: "Главная", map: "Карта", profile: "Профиль", lang: "Язык", liveScreen: "Большой экран", reservations: "Бронирование", closeArticle: "Закрыть статью", originalReport: "Оригинальный материал CupMate", versus: "против" }
};

export const translations: Record<Locale, typeof en> = Object.fromEntries(
  languages.map((language) => [
    language.code,
    {
      ...en,
      ...(language.code === "en" ? {} : overrides[language.code as Exclude<Locale, "en">])
    }
  ])
) as Record<Locale, typeof en>;

export type TranslationKey = keyof typeof en;

export function getLanguage(code: string | null | undefined) {
  return languages.find((language) => language.code === code) ?? languages[0];
}
