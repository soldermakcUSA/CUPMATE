"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BarChart3, CalendarDays, ExternalLink, History, MapPin, Radio, Shield, Ticket, Trophy, Users, WalletCards } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { getSeatGeekTicketForMatchSlug } from "@/components/menu/StadiumsPanel";
import { TeamFlag, TeamLabel } from "@/components/TeamFlag";
import { fetchLiveScoreDetails, fetchLiveScores, findScoreByCodes, type LiveMatchEvent, type LiveMatchScore, type LiveTeamStat } from "@/lib/live-scores";
import { findMatchDetail, formatAmericanOdds, impliedProbability, localizeMatchDetail, type MatchDetail, type PreviousGame } from "@/lib/match-details";
import { getLanguage, type Locale, translations } from "@/lib/i18n";
import { getTeamSquad, type SquadPlayer, type TeamSquad } from "@/lib/squad-data";
import { fetchWorldCupMatchBySlug, type MatchCardData } from "@/lib/world-cup-data";

const copy: Record<Locale, {
  back: string;
  notFound: string;
  overview: string;
  teams: string;
  venue: string;
  odds: string;
  winProbability: string;
  recentForm: string;
  history: string;
  groupTeams: string;
  sources: string;
  homeWin: string;
  draw: string;
  awayWin: string;
  total: string;
  watch: string;
  note: string;
  position: string;
  points: string;
  tableNote: string;
}> = {
  en: { back: "Back to CupMate", notFound: "Match not found", overview: "Match overview", teams: "Teams", venue: "Where they play", odds: "Odds", winProbability: "Win probability", recentForm: "Recent form", history: "Match history", groupTeams: "Group teams", sources: "Sources", homeWin: "Home win", draw: "Draw", awayWin: "Away win", total: "Total", watch: "Where to watch", note: "Odds are a market snapshot and may change before kickoff.", position: "Pos", points: "Pts", tableNote: "Current group table before kickoff." },
  es: { back: "Volver a CupMate", notFound: "Partido no encontrado", overview: "Resumen del partido", teams: "Equipos", venue: "Dónde juegan", odds: "Cuotas", winProbability: "Probabilidad de victoria", recentForm: "Forma reciente", history: "Historial", groupTeams: "Equipos del grupo", sources: "Fuentes", homeWin: "Gana local", draw: "Empate", awayWin: "Gana visitante", total: "Total", watch: "Dónde ver", note: "Las cuotas son una captura del mercado y pueden cambiar antes del inicio.", position: "Pos", points: "Pts", tableNote: "Tabla actual del grupo antes del inicio." },
  fr: { back: "Retour à CupMate", notFound: "Match introuvable", overview: "Aperçu du match", teams: "Équipes", venue: "Lieu du match", odds: "Cotes", winProbability: "Probabilité de victoire", recentForm: "Forme récente", history: "Historique", groupTeams: "Équipes du groupe", sources: "Sources", homeWin: "Victoire domicile", draw: "Nul", awayWin: "Victoire extérieur", total: "Total", watch: "Où regarder", note: "Les cotes sont un instantané du marché et peuvent changer avant le coup d'envoi.", position: "Pos", points: "Pts", tableNote: "Classement actuel du groupe avant le coup d'envoi." },
  de: { back: "Zurück zu CupMate", notFound: "Spiel nicht gefunden", overview: "Spielübersicht", teams: "Teams", venue: "Spielort", odds: "Quoten", winProbability: "Siegwahrscheinlichkeit", recentForm: "Aktuelle Form", history: "Historie", groupTeams: "Gruppenteams", sources: "Quellen", homeWin: "Heimsieg", draw: "Remis", awayWin: "Auswärtssieg", total: "Total", watch: "Wo schauen", note: "Quoten sind eine Momentaufnahme und können sich vor Anpfiff ändern.", position: "Pos", points: "Pkt", tableNote: "Aktuelle Gruppentabelle vor Anpfiff." },
  pt: { back: "Voltar ao CupMate", notFound: "Jogo não encontrado", overview: "Resumo do jogo", teams: "Equipes", venue: "Onde jogam", odds: "Odds", winProbability: "Probabilidade de vitória", recentForm: "Forma recente", history: "Histórico", groupTeams: "Equipes do grupo", sources: "Fontes", homeWin: "Vitória mandante", draw: "Empate", awayWin: "Vitória visitante", total: "Total", watch: "Onde assistir", note: "As odds são um retrato do mercado e podem mudar antes do jogo.", position: "Pos", points: "Pts", tableNote: "Tabela atual do grupo antes do início." },
  it: { back: "Torna a CupMate", notFound: "Partita non trovata", overview: "Panoramica partita", teams: "Squadre", venue: "Dove giocano", odds: "Quote", winProbability: "Probabilità di vittoria", recentForm: "Forma recente", history: "Storico", groupTeams: "Squadre del gruppo", sources: "Fonti", homeWin: "Vittoria casa", draw: "Pareggio", awayWin: "Vittoria trasferta", total: "Totale", watch: "Dove guardare", note: "Le quote sono una fotografia del mercato e possono cambiare prima del calcio d'inizio.", position: "Pos", points: "Pt", tableNote: "Classifica attuale del gruppo prima del calcio d'inizio." },
  ar: { back: "العودة إلى CupMate", notFound: "المباراة غير موجودة", overview: "نظرة على المباراة", teams: "الفرق", venue: "مكان اللعب", odds: "الاحتمالات", winProbability: "احتمال الفوز", recentForm: "النتائج الأخيرة", history: "تاريخ المواجهات", groupTeams: "فرق المجموعة", sources: "المصادر", homeWin: "فوز صاحب الأرض", draw: "تعادل", awayWin: "فوز الضيف", total: "المجموع", watch: "أين تشاهد", note: "الاحتمالات لقطة من السوق وقد تتغير قبل انطلاق المباراة.", position: "المركز", points: "نقاط", tableNote: "ترتيب المجموعة الحالي قبل البداية." },
  zh: { back: "返回 CupMate", notFound: "未找到比赛", overview: "比赛概览", teams: "球队", venue: "比赛地点", odds: "赔率", winProbability: "获胜概率", recentForm: "近期状态", history: "交锋历史", groupTeams: "小组球队", sources: "来源", homeWin: "主队胜", draw: "平局", awayWin: "客队胜", total: "总进球", watch: "观看方式", note: "赔率为市场快照，开赛前可能变化。", position: "排名", points: "分", tableNote: "开赛前的小组当前积分榜。" },
  ja: { back: "CupMateに戻る", notFound: "試合が見つかりません", overview: "試合概要", teams: "チーム", venue: "試合会場", odds: "オッズ", winProbability: "勝利確率", recentForm: "直近の成績", history: "対戦履歴", groupTeams: "グループのチーム", sources: "出典", homeWin: "ホーム勝利", draw: "引き分け", awayWin: "アウェイ勝利", total: "合計", watch: "視聴方法", note: "オッズは市場のスナップショットで、キックオフ前に変動する可能性があります。", position: "順位", points: "勝点", tableNote: "キックオフ前の現在のグループ表。" },
  ko: { back: "CupMate로 돌아가기", notFound: "경기를 찾을 수 없습니다", overview: "경기 개요", teams: "팀", venue: "경기 장소", odds: "배당", winProbability: "승리 확률", recentForm: "최근 흐름", history: "맞대결 기록", groupTeams: "조 팀", sources: "출처", homeWin: "홈 승", draw: "무승부", awayWin: "원정 승", total: "합계", watch: "시청 방법", note: "배당은 시장 스냅샷이며 킥오프 전 변동될 수 있습니다.", position: "순위", points: "승점", tableNote: "킥오프 전 현재 조 순위입니다." },
  ru: { back: "Назад в CupMate", notFound: "Матч не найден", overview: "Обзор матча", teams: "Команды", venue: "Где играют", odds: "Коэффициенты", winProbability: "Вероятность победы", recentForm: "Последние матчи", history: "История встреч", groupTeams: "Команды группы", sources: "Источники", homeWin: "Победа хозяев", draw: "Ничья", awayWin: "Победа гостей", total: "Тотал", watch: "Где смотреть", note: "Коэффициенты являются рыночным срезом и могут измениться до начала матча.", position: "Место", points: "Очки", tableNote: "Текущая таблица группы до стартового свистка." }
};

const squadCopy: Record<Locale, {
  title: string;
  pendingTitle: string;
  pendingText: string;
  players: string;
  source: string;
  finalNote: string;
  age: string;
  positions: Record<SquadPlayer["position"], string>;
}> = {
  en: { title: "Squads", pendingTitle: "Squad pending", pendingText: "No reliable published list is available yet.", players: "players", source: "Source", finalNote: "Squad data comes from ESPN's 2026 FIFA World Cup roster feed and may change after provider or federation updates.", age: "Age", positions: { GK: "GK", DF: "DF", MF: "MF", FW: "FW" } },
  es: { title: "Plantillas", pendingTitle: "Plantilla pendiente", pendingText: "Aún no hay una lista publicada fiable.", players: "jugadores", source: "Fuente", finalNote: "Los datos de plantillas vienen del feed de ESPN para el Mundial 2026 y pueden cambiar con actualizaciones del proveedor o las federaciones.", age: "Edad", positions: { GK: "POR", DF: "DEF", MF: "MED", FW: "DEL" } },
  fr: { title: "Effectifs", pendingTitle: "Effectif en attente", pendingText: "Aucune liste fiable publiée pour l'instant.", players: "joueurs", source: "Source", finalNote: "Les données d'effectif proviennent du flux ESPN Coupe du Monde 2026 et peuvent changer après les mises à jour du fournisseur ou des fédérations.", age: "Âge", positions: { GK: "GB", DF: "DEF", MF: "MIL", FW: "ATT" } },
  de: { title: "Kader", pendingTitle: "Kader ausstehend", pendingText: "Noch keine verlässliche veröffentlichte Liste verfügbar.", players: "Spieler", source: "Quelle", finalNote: "Die Kaderdaten stammen aus dem ESPN-Feed zur WM 2026 und können sich nach Anbieter- oder Verbandsupdates ändern.", age: "Alter", positions: { GK: "TW", DF: "ABW", MF: "MF", FW: "ST" } },
  pt: { title: "Elencos", pendingTitle: "Elenco pendente", pendingText: "Ainda não há lista publicada confiável.", players: "jogadores", source: "Fonte", finalNote: "Os dados dos elencos vêm do feed da ESPN para a Copa de 2026 e podem mudar após atualizações do provedor ou das federações.", age: "Idade", positions: { GK: "GOL", DF: "DEF", MF: "MEI", FW: "ATA" } },
  it: { title: "Rose", pendingTitle: "Rosa in attesa", pendingText: "Non c'è ancora una lista pubblicata affidabile.", players: "giocatori", source: "Fonte", finalNote: "I dati delle rose arrivano dal feed ESPN per il Mondiale 2026 e possono cambiare dopo aggiornamenti del provider o delle federazioni.", age: "Età", positions: { GK: "POR", DF: "DIF", MF: "CEN", FW: "ATT" } },
  ar: { title: "القوائم", pendingTitle: "القائمة قيد الانتظار", pendingText: "لا توجد قائمة موثوقة منشورة بعد.", players: "لاعبا", source: "المصدر", finalNote: "تأتي بيانات القوائم من موجز ESPN لكأس العالم 2026 وقد تتغير بعد تحديثات المزود أو الاتحادات.", age: "العمر", positions: { GK: "حارس", DF: "دفاع", MF: "وسط", FW: "هجوم" } },
  zh: { title: "阵容", pendingTitle: "阵容待定", pendingText: "目前还没有可靠的公开名单。", players: "名球员", source: "来源", finalNote: "阵容数据来自 ESPN 的 2026 世界杯名单源，并可能随数据方或协会更新而变化。", age: "年龄", positions: { GK: "门将", DF: "后卫", MF: "中场", FW: "前锋" } },
  ja: { title: "メンバー", pendingTitle: "メンバー未定", pendingText: "信頼できる公開リストはまだありません。", players: "選手", source: "出典", finalNote: "メンバー情報はESPNの2026ワールドカップ登録フィードに基づき、提供元や協会の更新で変わる可能性があります。", age: "年齢", positions: { GK: "GK", DF: "DF", MF: "MF", FW: "FW" } },
  ko: { title: "선수 명단", pendingTitle: "명단 대기 중", pendingText: "아직 신뢰할 수 있는 공개 명단이 없습니다.", players: "명", source: "출처", finalNote: "선수 명단 데이터는 ESPN 2026 월드컵 로스터 피드에서 가져오며 제공사 또는 협회 업데이트에 따라 바뀔 수 있습니다.", age: "나이", positions: { GK: "GK", DF: "DF", MF: "MF", FW: "FW" } },
  ru: { title: "Составы", pendingTitle: "Состав ожидается", pendingText: "Пока нет надежно опубликованного списка.", players: "игроков", source: "Источник", finalNote: "Данные составов берутся из roster-ленты ESPN по ЧМ-2026 и могут измениться после обновлений провайдера или федераций.", age: "Возраст", positions: { GK: "ВРТ", DF: "ЗАЩ", MF: "ПЗ", FW: "НАП" } }
};

function useLocale() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("cupmate-locale") as Locale | null;
    const browser = navigator.language.split("-")[0] as Locale;
    setLocale(getLanguage(saved ?? browser).code);
  }, []);

  useEffect(() => {
    const language = getLanguage(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = language.dir;
  }, [locale]);

  return locale;
}

function matchTicketCopy(locale: Locale) {
  if (locale === "ru") {
    return {
      title: "Билеты на матч",
      lowestFrom: "Минимальная цена",
      buy: "Купить на SeatGeek",
      source: "Источник",
      note: "Цены SeatGeek указаны как From и могут измениться до покупки."
    };
  }

  return {
    title: "Match tickets",
    lowestFrom: "Lowest from",
    buy: "Buy on SeatGeek",
    source: "Source",
    note: "SeatGeek prices are From listings and can change before checkout."
  };
}

function matchLiveCopy(locale: Locale) {
  if (locale === "ru") {
    return {
      title: "Онлайн-центр матча",
      subtitle: "Статистика, карточки и ключевые события обновляются автоматически из live-источника.",
      teamStats: "Статистика команд",
      discipline: "Карточки и дисциплина",
      timeline: "Ключевые события",
      commentary: "Последние события",
      noData: "Подробная live-статистика появится, когда источник начнет отдавать данные матча.",
      yellowCards: "Желтые карточки",
      redCards: "Красные карточки"
    };
  }

  return {
    title: "Live match center",
    subtitle: "Stats, cards and key events update automatically from the live source.",
    teamStats: "Team stats",
    discipline: "Cards and discipline",
    timeline: "Key events",
    commentary: "Latest play-by-play",
    noData: "Detailed live stats will appear when the source starts publishing match data.",
    yellowCards: "Yellow cards",
    redCards: "Red cards"
  };
}

function buildFallbackMatchDetail(match: MatchCardData, locale: Locale): MatchDetail {
  const home = buildFallbackTeam(match, "home", locale);
  const away = buildFallbackTeam(match, "away", locale);
  const { venue, city } = splitVenue(match.venue);
  const totalGoalsLine = locale === "ru" ? "2.5 гола" : "2.5 goals";

  return {
    slug: match.slug,
    group: match.group,
    kickoff: `${match.date} · ${match.time}`,
    venue,
    city,
    home,
    away,
    groupTeams: [home.name, away.name],
    odds: [
      { label: "home", american: 100 },
      { label: "draw", american: 240 },
      { label: "away", american: 100 }
    ],
    totalGoalsLine,
    headToHead: fallbackMatchHistory(home.name, away.name, locale),
    story: fallbackMatchStory(home.name, away.name, match.group, venue, city, locale),
    sources: [
      { label: locale === "ru" ? "Расписание CupMate" : "CupMate schedule", href: "/world-cup-2026-schedule" },
      { label: locale === "ru" ? "Расписание FIFA" : "FIFA schedule", href: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures" }
    ]
  };
}

function buildFallbackTeam(match: MatchCardData, side: "home" | "away", locale: Locale): MatchDetail["home"] {
  const label = side === "home" ? match.home : match.away;
  const code = side === "home" ? match.homeCode : match.awayCode;
  const name = side === "home" ? match.homeName : match.awayName;
  const flag = side === "home" ? match.homeFlag : match.awayFlag;
  const teamCode = code ?? extractTeamCode(label) ?? "TBD";
  const teamName = name ?? stripTeamCode(label, teamCode) ?? teamCode;

  return {
    code: teamCode,
    name: teamName,
    flag: flag ?? extractTeamFlag(label) ?? "🏳️",
    note: fallbackTeamNote(teamName, locale),
    previousGames: fallbackPreviousGames(locale)
  };
}

function splitVenue(value: string) {
  const [venue, ...cityParts] = value.split(", ");
  return {
    venue: venue || value,
    city: cityParts.join(", ") || value
  };
}

function extractTeamCode(label: string) {
  return label.match(/[A-Z]{2,4}/g)?.at(-1) ?? null;
}

function extractTeamFlag(label: string) {
  return label.match(/\p{Regional_Indicator}{2}|🏴/u)?.[0] ?? null;
}

function stripTeamCode(label: string, code: string) {
  const flag = extractTeamFlag(label);
  const stripped = label.replace(flag ?? "", "").replace(code, "").trim();
  return stripped || null;
}

function fallbackTeamNote(teamName: string, locale: Locale) {
  return locale === "ru"
    ? `${teamName}: состав, форма и матчевые заметки будут уточняться по мере публикации данных.`
    : `${teamName} squad, form and match notes will update as reliable data is published.`;
}

function fallbackPreviousGames(locale: Locale): PreviousGame[] {
  if (locale === "ru") {
    return [
      { date: "Скоро", opponent: "Состав", result: "Ожидается" },
      { date: "Скоро", opponent: "Форма", result: "Обновляется" },
      { date: "Скоро", opponent: "Тактика", result: "Скаутинг" }
    ];
  }

  return [
    { date: "Soon", opponent: "Squad", result: "Pending" },
    { date: "Soon", opponent: "Form", result: "Updating" },
    { date: "Soon", opponent: "Tactical notes", result: "Scouting" }
  ];
}

function fallbackMatchHistory(home: string, away: string, locale: Locale) {
  return locale === "ru"
    ? [
        `${home} против ${away}: страница матча создана из актуального расписания CupMate.`,
        "Дополнительная история встреч, составы и рыночные данные будут обновляться ближе к матчу."
      ]
    : [
        `${home} vs ${away}: this match page is generated from the current CupMate schedule.`,
        "Head-to-head notes, squads and market context will update closer to kickoff."
      ];
}

function fallbackMatchStory(home: string, away: string, group: string, venue: string, city: string, locale: Locale) {
  return locale === "ru"
    ? `${home} против ${away} - матч ${group} на ${venue}, ${city}. CupMate держит здесь ключевые детали: время начала, стадион, билеты, составы и live-обновления, когда источник начнет отдавать данные.`
    : `${home} vs ${away} is a ${group} match at ${venue}, ${city}. CupMate keeps this page focused on kickoff timing, venue context, tickets, squads and live updates when source data is available.`;
}

export function MatchDetailClient({ slug }: { slug: string }) {
  const locale = useLocale();
  const t = translations[locale];
  const c = copy[locale] ?? copy.en;
  const squadsText = squadCopy[locale] ?? squadCopy.en;
  const ticketCopy = matchTicketCopy(locale);
  const liveCopy = matchLiveCopy(locale);
  const [liveScore, setLiveScore] = useState<LiveMatchScore | null>(null);
  const [fallbackDetail, setFallbackDetail] = useState<MatchDetail | null>(null);
  const [isFallbackLoading, setIsFallbackLoading] = useState(false);
  const detail = useMemo(() => {
    const found = findMatchDetail(slug);
    return found ? localizeMatchDetail(found, locale) : fallbackDetail;
  }, [fallbackDetail, locale, slug]);
  const ticket = useMemo(() => getSeatGeekTicketForMatchSlug(slug), [slug]);

  useEffect(() => {
    if (findMatchDetail(slug)) {
      setFallbackDetail(null);
      setIsFallbackLoading(false);
      return;
    }

    let isMounted = true;
    setFallbackDetail(null);
    setIsFallbackLoading(true);

    fetchWorldCupMatchBySlug(slug, locale)
      .then((match) => {
        if (isMounted) {
          setFallbackDetail(match ? buildFallbackMatchDetail(match, locale) : null);
        }
      })
      .catch((error) => {
        console.warn("Unable to load fallback match detail.", error);
      })
      .finally(() => {
        if (isMounted) {
          setIsFallbackLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [locale, slug]);

  useEffect(() => {
    if (!detail) {
      setLiveScore(null);
      return;
    }

    let isMounted = true;
    const refreshLiveScore = () => {
      fetchLiveScores()
        .then((scores) => {
          const baseScore = findScoreByCodes(scores, detail.home.code, detail.away.code);
          if (!baseScore) {
            if (isMounted) setLiveScore(null);
            return null;
          }

          return fetchLiveScoreDetails(baseScore.id)
            .then((detailedScore) => detailedScore ?? baseScore)
            .catch(() => baseScore);
        })
        .then((score) => {
          if (isMounted && score) {
            setLiveScore(score);
          }
        })
        .catch((error) => {
          console.warn("Unable to load match live score.", error);
        });
    };

    refreshLiveScore();
    const intervalId = window.setInterval(refreshLiveScore, 20_000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [detail]);

  if (!detail && isFallbackLoading) {
    return (
      <div className="app-shell match-detail-shell">
        <AppSidebar t={t} activeSection="matches" />
        <main className="match-detail-page">
          <Link className="match-back-link" href="/?section=matches"><ArrowLeft size={17} /> {c.back}</Link>
          <section className="section-card match-detail-empty">
            <h1>{t.matches}</h1>
            <p className="small muted">{liveCopy.noData}</p>
          </section>
        </main>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="app-shell match-detail-shell">
        <AppSidebar t={t} activeSection="matches" />
        <main className="match-detail-page">
          <Link className="match-back-link" href="/"><ArrowLeft size={17} /> {c.back}</Link>
          <section className="section-card match-detail-empty">
            <h1>{c.notFound}</h1>
          </section>
        </main>
      </div>
    );
  }

  const outcomes = probabilityRows(detail, c);
  const groupRows = groupTeamRows(detail);

  return (
    <div className="app-shell match-detail-shell">
      <AppSidebar t={t} activeSection="matches" />
      <main className="match-detail-page">
        <Link className="match-back-link" href="/?section=matches"><ArrowLeft size={17} /> {c.back}</Link>
        <section className="match-detail-hero">
          <div>
            <span className="tag">{detail.group}</span>
            <h1>
              <span><TeamLabel value={`${detail.home.flag} ${detail.home.code}`} /></span>
              <small>{t.versus}</small>
              <span><TeamLabel value={`${detail.away.flag} ${detail.away.code}`} /></span>
            </h1>
            <p><CalendarDays size={17} /> {detail.kickoff}</p>
            <p><MapPin size={17} /> {detail.venue}, {detail.city}</p>
          </div>
          <div className="match-hero-side">
            <MatchDetailScoreCard detail={detail} score={liveScore} />
            <div className="match-hero-odds" aria-label={c.odds}>
              {outcomes.map((outcome) => (
                <div key={outcome.label}>
                  <span>{outcome.label}</span>
                  <strong>{outcome.odds}</strong>
                  <small>{outcome.probability}%</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MatchLiveCenter detail={detail} score={liveScore} copy={liveCopy} />

        <div className="match-detail-grid">
          <section className="section-card match-detail-main-card">
            <div className="match-detail-section-head">
              <Trophy size={20} />
              <h2>{c.overview}</h2>
            </div>
            <p>{detail.story}</p>
            <div className="match-fact-grid">
              <span><strong>{c.venue}</strong>{detail.venue}, {detail.city}</span>
              <span><strong>{c.total}</strong>{detail.totalGoalsLine}</span>
              <span><strong>{c.watch}</strong>FOX / FS1, FOX One, FOX Sports App</span>
            </div>
          </section>

          {ticket && (
            <section className="section-card match-detail-main-card match-ticket-card">
              <div className="match-detail-section-head">
                <Ticket size={20} />
                <h2>{ticketCopy.title}</h2>
              </div>
              <div className="match-ticket-summary">
                <div>
                  <span>{ticketCopy.lowestFrom}</span>
                  <strong>{ticket.price?.replace(/^From\s+/i, "") ?? "SeatGeek"}</strong>
                  <p className="small muted">{ticket.stadiumName}, {ticket.city}</p>
                </div>
                <a className="primary-button" href={ticket.ticketUrl ?? ticket.cityUrl} target="_blank" rel="noreferrer">
                  <WalletCards size={16} /> {ticketCopy.buy}
                </a>
              </div>
              <p className="small muted"><strong>{ticketCopy.source}:</strong> {ticket.sourceLabel}. {ticketCopy.note}</p>
            </section>
          )}

          <section className="section-card match-detail-main-card">
            <div className="match-detail-section-head">
              <BarChart3 size={20} />
              <h2>{c.winProbability}</h2>
            </div>
            <div className="probability-list">
              {outcomes.map((outcome) => (
                <div className="probability-row" key={outcome.label}>
                  <div>
                    <span>{outcome.label}</span>
                    <strong>{outcome.odds}</strong>
                  </div>
                  <div className="probability-track"><span style={{ width: `${outcome.probability}%` }} /></div>
                  <small>{outcome.probability}%</small>
                </div>
              ))}
            </div>
            <p className="small muted">{c.note}</p>
          </section>

          <section className="section-card match-detail-main-card">
            <div className="match-detail-section-head">
              <Users size={20} />
              <h2>{c.teams}</h2>
            </div>
            <div className="team-detail-grid">
              {[detail.home, detail.away].map((team) => (
                <article className="team-detail-card" key={team.code}>
                  <div className="team-detail-title">
                    <TeamFlag team={team.name} fallback={team.flag} className="match-detail-team-flag" />
                    <div>
                      <strong>{team.name}</strong>
                      <small>{team.code}</small>
                    </div>
                  </div>
                  <p>{team.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section-card match-detail-main-card match-squads-card">
            <div className="match-detail-section-head">
              <Users size={20} />
              <h2>{squadsText.title}</h2>
            </div>
            <div className="squad-team-grid">
              <SquadColumn team={detail.home} squad={getTeamSquad(detail.home.code)} copy={squadsText} />
              <SquadColumn team={detail.away} squad={getTeamSquad(detail.away.code)} copy={squadsText} />
            </div>
            <p className="small muted">{squadsText.finalNote}</p>
          </section>

          <section className="section-card match-detail-main-card">
            <div className="match-detail-section-head">
              <Shield size={20} />
              <h2>{c.groupTeams}</h2>
            </div>
            <div className="group-standing-table">
              <div className="group-standing-head">
                <span>{c.position}</span>
                <span>{c.teams}</span>
                <span>{c.points}</span>
              </div>
              {groupRows.map((team) => (
                <div className={`group-standing-row ${team.isMatchTeam ? "is-match-team" : ""}`} key={team.name}>
                  <strong>{team.position}</strong>
                  <span className="group-standing-team">
                    <TeamFlag team={team.name} fallback={team.flag} className="group-standing-flag" />
                    <span>
                      <b>{team.name}</b>
                      <small>{team.code}</small>
                    </span>
                  </span>
                  <strong>{team.points}</strong>
                </div>
              ))}
            </div>
            <p className="small muted">{c.tableNote}</p>
          </section>

          <section className="section-card match-detail-main-card">
            <div className="match-detail-section-head">
              <History size={20} />
              <h2>{c.recentForm}</h2>
            </div>
            <div className="recent-form-grid">
              <RecentForm detail={detail.home} />
              <RecentForm detail={detail.away} />
            </div>
          </section>

          <section className="section-card match-detail-main-card">
            <div className="match-detail-section-head">
              <Radio size={20} />
              <h2>{c.history}</h2>
            </div>
            <div className="match-history-list">
              {detail.headToHead.map((item) => <p key={item}>{item}</p>)}
            </div>
          </section>
        </div>

        <section className="section-card match-detail-sources">
          <h2>{c.sources}</h2>
          <div>
            {detail.sources.map((source) => (
              <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>
                {source.label} <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function MatchLiveCenter({
  detail,
  score,
  copy
}: {
  detail: MatchDetail;
  score: LiveMatchScore | null;
  copy: ReturnType<typeof matchLiveCopy>;
}) {
  const statRows = score?.statistics ? buildMatchStatRows(score.statistics.home, score.statistics.away) : [];
  const disciplineEvents = (score?.events ?? []).filter((event) => event.kind === "yellow-card" || event.kind === "red-card");
  const timelineEvents = (score?.events ?? []).filter((event) => event.kind !== "commentary").slice(0, 28);
  const commentary = score?.commentary ?? [];
  const yellowCards = countEventsByKind(disciplineEvents, "yellow-card", detail.home.code, detail.away.code);
  const redCards = countEventsByKind(disciplineEvents, "red-card", detail.home.code, detail.away.code);
  const hasLiveData = statRows.length > 0 || timelineEvents.length > 0 || commentary.length > 0;

  return (
    <section className="section-card match-live-center" aria-labelledby="match-live-center-title">
      <div className="match-detail-section-head">
        <Radio size={20} />
        <div>
          <h2 id="match-live-center-title">{copy.title}</h2>
          <p className="small muted">{copy.subtitle}</p>
        </div>
      </div>

      {!hasLiveData ? (
        <p className="small muted">{copy.noData}</p>
      ) : (
        <div className="match-live-grid">
          <section className="match-live-panel match-stat-panel">
            <h3>{copy.teamStats}</h3>
            <div className="match-stat-teams">
              <strong>{detail.home.code}</strong>
              <span />
              <strong>{detail.away.code}</strong>
            </div>
            <div className="match-stat-list">
              {statRows.map((row) => (
                <div className="match-stat-row" key={row.name}>
                  <strong>{row.home}</strong>
                  <span>{row.label}</span>
                  <strong>{row.away}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="match-live-panel">
            <h3>{copy.discipline}</h3>
            <div className="discipline-summary">
              <DisciplineMetric label={copy.yellowCards} home={yellowCards.home} away={yellowCards.away} color="yellow" />
              <DisciplineMetric label={copy.redCards} home={redCards.home} away={redCards.away} color="red" />
            </div>
            <div className="match-event-list compact">
              {disciplineEvents.map((event) => <MatchEventRow event={event} key={event.id} />)}
            </div>
          </section>

          <section className="match-live-panel">
            <h3>{copy.timeline}</h3>
            <div className="match-event-list">
              {timelineEvents.map((event) => <MatchEventRow event={event} key={event.id} />)}
            </div>
          </section>

          <section className="match-live-panel">
            <h3>{copy.commentary}</h3>
            <div className="match-event-list">
              {commentary.map((event) => <MatchEventRow event={event} key={event.id} />)}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

function DisciplineMetric({ label, home, away, color }: { label: string; home: number; away: number; color: "yellow" | "red" }) {
  return (
    <div className="discipline-metric">
      <span className={`card-swatch ${color}`} aria-hidden="true" />
      <span>{label}</span>
      <strong>{home} - {away}</strong>
    </div>
  );
}

function MatchEventRow({ event }: { event: LiveMatchEvent }) {
  return (
    <article className={`match-event-row ${event.kind}`}>
      <span className="match-event-minute">{event.minute || "·"}</span>
      <span className="match-event-kind" aria-hidden="true" />
      <div>
        <strong>{[event.teamCode, event.type].filter(Boolean).join(" · ")}</strong>
        <p>{event.text}</p>
        {event.athletes.length > 0 && <small>{event.athletes.join(" / ")}</small>}
      </div>
    </article>
  );
}

function buildMatchStatRows(homeStats: LiveTeamStat[], awayStats: LiveTeamStat[]) {
  const statOrder = [
    "possessionPct",
    "totalShots",
    "shotsOnTarget",
    "wonCorners",
    "foulsCommitted",
    "yellowCards",
    "redCards",
    "offsides",
    "saves",
    "accuratePasses",
    "totalPasses",
    "passPct",
    "totalTackles",
    "interceptions",
    "blockedShots",
    "totalClearance"
  ];
  const homeByName = new Map(homeStats.map((stat) => [stat.name, stat]));
  const awayByName = new Map(awayStats.map((stat) => [stat.name, stat]));

  return statOrder
    .map((name) => {
      const home = homeByName.get(name);
      const away = awayByName.get(name);
      if (!home && !away) return null;

      return {
        name,
        label: home?.label ?? away?.label ?? name,
        home: formatStatDisplay(home),
        away: formatStatDisplay(away)
      };
    })
    .filter((row): row is { name: string; label: string; home: string; away: string } => Boolean(row));
}

function formatStatDisplay(stat: LiveTeamStat | undefined) {
  if (!stat) return "-";
  if (["possessionPct", "passPct"].includes(stat.name) && typeof stat.value === "number") {
    return `${Math.round(stat.value * (stat.value <= 1 ? 100 : 1))}%`;
  }
  return stat.displayValue;
}

function countEventsByKind(events: LiveMatchEvent[], kind: "yellow-card" | "red-card", homeCode: string, awayCode: string) {
  return events.reduce(
    (counts, event) => {
      if (event.kind !== kind) return counts;
      if (event.teamCode === homeCode) counts.home += 1;
      else if (event.teamCode === awayCode) counts.away += 1;
      return counts;
    },
    { home: 0, away: 0 }
  );
}

function MatchDetailScoreCard({ detail, score }: { detail: MatchDetail; score: LiveMatchScore | null }) {
  if (!score || score.homeScore === null || score.awayScore === null) return null;

  const isLive = score.status === "live" || score.status === "halftime";
  const statusLabel = isLive ? score.clock ?? score.statusText : score.statusText;
  const sourceLabel = score.source === "api-football" ? "API-Football" : "ESPN";

  return (
    <div className={`match-detail-score-card ${isLive ? "is-live" : ""}`}>
      <div className="match-detail-score-top">
        <span>{statusLabel}</span>
        <small>{sourceLabel}</small>
      </div>
      <div className="match-detail-score-line">
        <span className="match-detail-score-team">
          <TeamFlag team={detail.home.name} fallback={detail.home.flag} className="match-detail-score-flag" />
          <b>{detail.home.code}</b>
        </span>
        <strong>{score.homeScore} - {score.awayScore}</strong>
        <span className="match-detail-score-team">
          <TeamFlag team={detail.away.name} fallback={detail.away.flag} className="match-detail-score-flag" />
          <b>{detail.away.code}</b>
        </span>
      </div>
    </div>
  );
}

function SquadColumn({
  team,
  squad,
  copy
}: {
  team: MatchDetail["home"];
  squad: TeamSquad | null;
  copy: (typeof squadCopy)[Locale];
}) {
  if (!squad) {
    return (
      <article className="squad-column">
        <div className="squad-column-head">
          <span><TeamFlag team={team.name} fallback={team.flag} className="squad-column-flag" /></span>
          <div>
            <h3>{team.name}</h3>
            <p>{copy.pendingTitle}</p>
          </div>
        </div>
        <div className="squad-pending">{copy.pendingText}</div>
      </article>
    );
  }

  return (
    <article className="squad-column">
      <div className="squad-column-head">
        <span><TeamFlag team={team.name} fallback={team.flag} className="squad-column-flag" /></span>
        <div>
          <h3>{team.name}</h3>
          <p>{squad.status} · {squad.players.length} {copy.players}</p>
        </div>
      </div>
      <div className="squad-player-list">
        {squad.players.map((player) => {
          const primaryMeta = [player.jersey ? `#${player.jersey}` : null, copy.positions[player.position], player.club].filter(Boolean).join(" · ");
          const secondaryMeta = [player.age ? `${copy.age} ${player.age}` : null, player.height, player.weight].filter(Boolean).join(" · ");

          return (
            <div className="squad-player-card" key={`${squad.teamCode}-${player.id ?? player.name}`}>
              <PlayerPhoto player={player} />
              <div>
                <strong>{player.name}</strong>
                {primaryMeta && <span>{primaryMeta}</span>}
                {secondaryMeta && <small>{secondaryMeta}</small>}
              </div>
            </div>
          );
        })}
      </div>
      <a className="squad-source-link" href={squad.sourceUrl} target="_blank" rel="noreferrer">
        {copy.source}: {squad.sourceLabel} <ExternalLink size={13} />
      </a>
    </article>
  );
}

function PlayerPhoto({ player }: { player: SquadPlayer }) {
  if (player.photo) {
    return <img src={player.photo} alt="" loading="lazy" />;
  }

  return <span className="squad-player-fallback">{initials(player.name)}</span>;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function RecentForm({ detail }: { detail: MatchDetail["home"] }) {
  return (
    <article>
      <h3><TeamFlag team={detail.name} fallback={detail.flag} className="recent-form-flag" /> {detail.name}</h3>
      {detail.previousGames.map((game) => (
        <div className="recent-form-row" key={`${detail.code}-${game.date}-${game.opponent}`}>
          <span>{game.date}</span>
          <strong>{game.opponent}</strong>
          <em>{game.result}</em>
        </div>
      ))}
    </article>
  );
}

function probabilityRows(detail: MatchDetail, c: (typeof copy)[Locale]) {
  const raw = detail.odds.map((odd) => impliedProbability(odd.american));
  const total = raw.reduce((sum, value) => sum + value, 0);
  const labels = {
    home: `${c.homeWin}: ${detail.home.code}`,
    draw: c.draw,
    away: `${c.awayWin}: ${detail.away.code}`
  };

  return detail.odds.map((odd, index) => ({
    label: labels[odd.label],
    odds: formatAmericanOdds(odd.american),
    probability: Math.round((raw[index] / total) * 100)
  }));
}

function groupTeamRows(detail: MatchDetail) {
  return detail.groupTeams.map((name, index) => {
    const meta = teamMeta[name] ?? { flag: "🏳️", code: name.slice(0, 3).toUpperCase() };
    return {
      name,
      flag: meta.flag,
      code: meta.code,
      points: 0,
      position: index + 1,
      isMatchTeam: meta.code === detail.home.code || meta.code === detail.away.code
    };
  });
}

const teamMeta: Record<string, { flag: string; code: string }> = {
  Mexico: { flag: "🇲🇽", code: "MEX" },
  Мексика: { flag: "🇲🇽", code: "MEX" },
  "South Africa": { flag: "🇿🇦", code: "RSA" },
  ЮАР: { flag: "🇿🇦", code: "RSA" },
  "South Korea": { flag: "🇰🇷", code: "KOR" },
  "Южная Корея": { flag: "🇰🇷", code: "KOR" },
  Czechia: { flag: "🇨🇿", code: "CZE" },
  Чехия: { flag: "🇨🇿", code: "CZE" },
  Canada: { flag: "🇨🇦", code: "CAN" },
  Канада: { flag: "🇨🇦", code: "CAN" },
  "Bosnia and Herzegovina": { flag: "🇧🇦", code: "BIH" },
  "Босния и Герцеговина": { flag: "🇧🇦", code: "BIH" },
  Qatar: { flag: "🇶🇦", code: "QAT" },
  Катар: { flag: "🇶🇦", code: "QAT" },
  Switzerland: { flag: "🇨🇭", code: "SUI" },
  Швейцария: { flag: "🇨🇭", code: "SUI" },
  "United States": { flag: "🇺🇸", code: "USA" },
  США: { flag: "🇺🇸", code: "USA" },
  Paraguay: { flag: "🇵🇾", code: "PAR" },
  Парагвай: { flag: "🇵🇾", code: "PAR" },
  Australia: { flag: "🇦🇺", code: "AUS" },
  Австралия: { flag: "🇦🇺", code: "AUS" },
  Türkiye: { flag: "🇹🇷", code: "TUR" },
  Турция: { flag: "🇹🇷", code: "TUR" },
  Brazil: { flag: "🇧🇷", code: "BRA" },
  Бразилия: { flag: "🇧🇷", code: "BRA" },
  Morocco: { flag: "🇲🇦", code: "MAR" },
  Марокко: { flag: "🇲🇦", code: "MAR" },
  Haiti: { flag: "🇭🇹", code: "HAI" },
  Гаити: { flag: "🇭🇹", code: "HAI" },
  Scotland: { flag: "🏴", code: "SCO" },
  Шотландия: { flag: "🏴", code: "SCO" },
  Germany: { flag: "🇩🇪", code: "GER" },
  Германия: { flag: "🇩🇪", code: "GER" },
  Curacao: { flag: "🇨🇼", code: "CUW" },
  Кюрасао: { flag: "🇨🇼", code: "CUW" },
  "Ivory Coast": { flag: "🇨🇮", code: "CIV" },
  "Кот-д'Ивуар": { flag: "🇨🇮", code: "CIV" },
  Ecuador: { flag: "🇪🇨", code: "ECU" },
  Эквадор: { flag: "🇪🇨", code: "ECU" },
  Netherlands: { flag: "🇳🇱", code: "NED" },
  Нидерланды: { flag: "🇳🇱", code: "NED" },
  Japan: { flag: "🇯🇵", code: "JPN" },
  Япония: { flag: "🇯🇵", code: "JPN" },
  Sweden: { flag: "🇸🇪", code: "SWE" },
  Швеция: { flag: "🇸🇪", code: "SWE" },
  Tunisia: { flag: "🇹🇳", code: "TUN" },
  Тунис: { flag: "🇹🇳", code: "TUN" },
  Belgium: { flag: "🇧🇪", code: "BEL" },
  Бельгия: { flag: "🇧🇪", code: "BEL" },
  Egypt: { flag: "🇪🇬", code: "EGY" },
  Египет: { flag: "🇪🇬", code: "EGY" },
  Iran: { flag: "🇮🇷", code: "IRN" },
  Иран: { flag: "🇮🇷", code: "IRN" },
  "New Zealand": { flag: "🇳🇿", code: "NZL" },
  "Новая Зеландия": { flag: "🇳🇿", code: "NZL" },
  Spain: { flag: "🇪🇸", code: "ESP" },
  Испания: { flag: "🇪🇸", code: "ESP" },
  "Cape Verde": { flag: "🇨🇻", code: "CPV" },
  "Кабо-Верде": { flag: "🇨🇻", code: "CPV" },
  "Saudi Arabia": { flag: "🇸🇦", code: "KSA" },
  "Саудовская Аравия": { flag: "🇸🇦", code: "KSA" },
  Uruguay: { flag: "🇺🇾", code: "URU" },
  Уругвай: { flag: "🇺🇾", code: "URU" }
};
