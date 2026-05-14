"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BarChart3, CalendarDays, ExternalLink, History, MapPin, Radio, Shield, Trophy, Users } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { TeamFlag, TeamLabel } from "@/components/TeamFlag";
import { findMatchDetail, formatAmericanOdds, impliedProbability, localizeMatchDetail, type MatchDetail } from "@/lib/match-details";
import { getLanguage, type Locale, translations } from "@/lib/i18n";
import { getTeamSquad, type SquadPlayer, type TeamSquad } from "@/lib/squad-data";

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
  positions: Record<SquadPlayer["position"], string>;
}> = {
  en: { title: "Squads", pendingTitle: "Squad pending", pendingText: "No reliable published list is available yet.", players: "players", source: "Source", finalNote: "Final World Cup squads are expected after FIFA confirmation on June 2, 2026.", positions: { GK: "GK", DF: "DF", MF: "MF", FW: "FW" } },
  es: { title: "Plantillas", pendingTitle: "Plantilla pendiente", pendingText: "Aún no hay una lista publicada fiable.", players: "jugadores", source: "Fuente", finalNote: "Las listas finales se esperan tras la confirmación de FIFA el 2 de junio de 2026.", positions: { GK: "POR", DF: "DEF", MF: "MED", FW: "DEL" } },
  fr: { title: "Effectifs", pendingTitle: "Effectif en attente", pendingText: "Aucune liste fiable publiée pour l'instant.", players: "joueurs", source: "Source", finalNote: "Les listes finales sont attendues après la confirmation FIFA du 2 juin 2026.", positions: { GK: "GB", DF: "DEF", MF: "MIL", FW: "ATT" } },
  de: { title: "Kader", pendingTitle: "Kader ausstehend", pendingText: "Noch keine verlässliche veröffentlichte Liste verfügbar.", players: "Spieler", source: "Quelle", finalNote: "Finale WM-Kader werden nach der FIFA-Bestätigung am 2. Juni 2026 erwartet.", positions: { GK: "TW", DF: "ABW", MF: "MF", FW: "ST" } },
  pt: { title: "Elencos", pendingTitle: "Elenco pendente", pendingText: "Ainda não há lista publicada confiável.", players: "jogadores", source: "Fonte", finalNote: "As listas finais são esperadas após confirmação da FIFA em 2 de junho de 2026.", positions: { GK: "GOL", DF: "DEF", MF: "MEI", FW: "ATA" } },
  it: { title: "Rose", pendingTitle: "Rosa in attesa", pendingText: "Non c'è ancora una lista pubblicata affidabile.", players: "giocatori", source: "Fonte", finalNote: "Le rose finali sono attese dopo la conferma FIFA del 2 giugno 2026.", positions: { GK: "POR", DF: "DIF", MF: "CEN", FW: "ATT" } },
  ar: { title: "القوائم", pendingTitle: "القائمة قيد الانتظار", pendingText: "لا توجد قائمة موثوقة منشورة بعد.", players: "لاعبا", source: "المصدر", finalNote: "القوائم النهائية متوقعة بعد تأكيد FIFA في 2 يونيو 2026.", positions: { GK: "حارس", DF: "دفاع", MF: "وسط", FW: "هجوم" } },
  zh: { title: "阵容", pendingTitle: "阵容待定", pendingText: "目前还没有可靠的公开名单。", players: "名球员", source: "来源", finalNote: "最终世界杯名单预计将在 FIFA 于 2026 年 6 月 2 日确认后公布。", positions: { GK: "门将", DF: "后卫", MF: "中场", FW: "前锋" } },
  ja: { title: "メンバー", pendingTitle: "メンバー未定", pendingText: "信頼できる公開リストはまだありません。", players: "選手", source: "出典", finalNote: "最終メンバーは2026年6月2日のFIFA確認後に公表予定です。", positions: { GK: "GK", DF: "DF", MF: "MF", FW: "FW" } },
  ko: { title: "선수 명단", pendingTitle: "명단 대기 중", pendingText: "아직 신뢰할 수 있는 공개 명단이 없습니다.", players: "명", source: "출처", finalNote: "최종 월드컵 명단은 2026년 6월 2일 FIFA 확인 후 예상됩니다.", positions: { GK: "GK", DF: "DF", MF: "MF", FW: "FW" } },
  ru: { title: "Составы", pendingTitle: "Состав ожидается", pendingText: "Пока нет надежно опубликованного списка.", players: "игроков", source: "Источник", finalNote: "Финальные составы ожидаются после подтверждения FIFA 2 июня 2026.", positions: { GK: "ВРТ", DF: "ЗАЩ", MF: "ПЗ", FW: "НАП" } }
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

export function MatchDetailClient({ slug }: { slug: string }) {
  const locale = useLocale();
  const t = translations[locale];
  const c = copy[locale] ?? copy.en;
  const squadsText = squadCopy[locale] ?? squadCopy.en;
  const detail = useMemo(() => {
    const found = findMatchDetail(slug);
    return found ? localizeMatchDetail(found, locale) : null;
  }, [locale, slug]);

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
          <div className="match-hero-odds" aria-label={c.odds}>
            {outcomes.map((outcome) => (
              <div key={outcome.label}>
                <span>{outcome.label}</span>
                <strong>{outcome.odds}</strong>
                <small>{outcome.probability}%</small>
              </div>
            ))}
          </div>
        </section>

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
        {squad.players.map((player) => (
          <div className="squad-player-card" key={`${squad.teamCode}-${player.name}`}>
            <PlayerPhoto player={player} />
            <div>
              <strong>{player.name}</strong>
              <span>{copy.positions[player.position]} · {player.club}</span>
            </div>
          </div>
        ))}
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
