"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, CalendarDays, ExternalLink, MapPin, Minus, Plus, Search, ShieldCheck, Ticket, Users, WalletCards } from "lucide-react";
import { getAllSeatGeekTicketMatches, type TicketMarketMatch } from "@/components/menu/StadiumsPanel";
import { translations, type Locale } from "@/lib/i18n";
import type { MatchCardData } from "@/lib/world-cup-data";

type TicketsPanelProps = {
  locale?: Locale;
  t?: typeof translations.en;
  matches: MatchCardData[];
};

type SortMode = "price" | "date";
type BudgetMode = "all" | "value" | "mid" | "premium";

function panelText(locale: Locale = "en", t?: typeof translations.en) {
  return t ?? translations[locale] ?? translations.en;
}

function localTicketCopy(locale: Locale) {
  if (locale === "ru") {
    return {
      kicker: "Билетный маркет",
      subtitle: "Цены SeatGeek по матчам, быстрый фильтр по городу и прямой переход к покупке.",
      lowestFrom: "Минимальная цена",
      buy: "Купить",
      openSeatGeek: "Открыть SeatGeek",
      search: "Матч, город или стадион",
      allCities: "Все города",
      sortPrice: "Сначала дешевле",
      sortDate: "По дате",
      featured: "Рекомендуемый билет",
      selected: "Выбранный матч",
      quantity: "Билеты",
      estimatedTotal: "Ориентир за",
      beforeFees: "до комиссий",
      budgetAll: "Все цены",
      budgetValue: "до $300",
      budgetMid: "до $750",
      budgetPremium: "$750+",
      results: "вариантов",
      tapHint: "Выберите матч справа, чтобы пересчитать сумму.",
      marketNote: "Цены указаны как SeatGeek From и могут меняться в зависимости от спроса, сектора и комиссии.",
      protected: "Покупка через SeatGeek",
      mobile: "QR-ready",
      refund: "Проверьте условия продавца",
      noResults: "Билеты не найдены"
    };
  }

  return {
    kicker: "Ticket marketplace",
    subtitle: "SeatGeek match prices, city filtering, and direct purchase links.",
    lowestFrom: "Lowest from",
    buy: "Buy",
    openSeatGeek: "Open SeatGeek",
    search: "Match, city, or stadium",
    allCities: "All cities",
    sortPrice: "Lowest price first",
    sortDate: "Date order",
    featured: "Featured ticket",
    selected: "Selected match",
    quantity: "Tickets",
    estimatedTotal: "Estimate for",
    beforeFees: "before fees",
    budgetAll: "All prices",
    budgetValue: "under $300",
    budgetMid: "under $750",
    budgetPremium: "$750+",
    results: "options",
    tapHint: "Select a match on the right to update this estimate.",
    marketNote: "Prices are SeatGeek From listings and can change with demand, seat location, and fees.",
    protected: "Checkout on SeatGeek",
    mobile: "QR-ready",
    refund: "Check seller terms",
    noResults: "No tickets found"
  };
}

function matchPrice(match: TicketMarketMatch) {
  return match.price ?? "See SeatGeek";
}

function ticketKey(ticket: TicketMarketMatch) {
  return `${ticket.stadiumId}-${ticket.date}-${ticket.label}`;
}

function isWithinBudget(ticket: TicketMarketMatch, budget: BudgetMode) {
  const price = ticket.lowestPrice ?? Number.MAX_SAFE_INTEGER;
  if (budget === "value") return price <= 300;
  if (budget === "mid") return price <= 750;
  if (budget === "premium") return price >= 750;
  return true;
}

function formatMoney(value: number | null) {
  if (value === null) return "SeatGeek";
  return `$${value.toLocaleString("en-US")}`;
}

export function TicketsPanel({ locale = "en", t }: TicketsPanelProps) {
  const copy = panelText(locale, t);
  const ticketCopy = localTicketCopy(locale);
  const tickets = useMemo(() => getAllSeatGeekTicketMatches().filter((match) => match.lowestPrice !== null), []);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("price");
  const [budget, setBudget] = useState<BudgetMode>("all");
  const [quantity, setQuantity] = useState(1);
  const [selectedTicketKey, setSelectedTicketKey] = useState<string | null>(null);

  const cities = useMemo(() => Array.from(new Set(tickets.map((ticket) => ticket.city))).sort(), [tickets]);
  const featuredCities = useMemo(() => cities.slice(0, 5), [cities]);
  const filteredTickets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return tickets
      .filter((ticket) => city === "all" || ticket.city === city)
      .filter((ticket) => isWithinBudget(ticket, budget))
      .filter((ticket) => {
        if (!normalizedQuery) return true;
        return [ticket.label, ticket.stage, ticket.stadiumName, ticket.city].some((value) => value.toLowerCase().includes(normalizedQuery));
      })
      .sort((a, b) => {
        if (sortMode === "date") {
          return `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);
        }
        return (a.lowestPrice ?? Number.MAX_SAFE_INTEGER) - (b.lowestPrice ?? Number.MAX_SAFE_INTEGER);
      });
  }, [budget, city, query, sortMode, tickets]);

  const selectedTicket = tickets.find((ticket) => ticketKey(ticket) === selectedTicketKey);
  const featuredTicket = selectedTicket && filteredTickets.some((ticket) => ticketKey(ticket) === ticketKey(selectedTicket))
    ? selectedTicket
    : filteredTickets[0] ?? tickets[0];
  const totalEstimate = featuredTicket.lowestPrice === null ? null : featuredTicket.lowestPrice * quantity;
  const cheapestVisible = filteredTickets[0]?.lowestPrice ?? null;
  const budgetOptions: Array<[BudgetMode, string]> = [
    ["all", ticketCopy.budgetAll],
    ["value", ticketCopy.budgetValue],
    ["mid", ticketCopy.budgetMid],
    ["premium", ticketCopy.budgetPremium]
  ];

  return (
    <section className="section-card menu-panel tickets-panel ticket-market" aria-labelledby="tickets-panel-title">
      <div className="section-head ticket-market-head">
        <div>
          <p className="small muted menu-panel-kicker">{ticketCopy.kicker}</p>
          <h2 id="tickets-panel-title">{copy.tickets}</h2>
          <p className="small muted ticket-market-subtitle">{ticketCopy.subtitle}</p>
        </div>
        <a className="link-button" href="https://seatgeek.com/fifa-world-cup-tickets" target="_blank" rel="noreferrer">
          {ticketCopy.openSeatGeek} <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>

      <div className="ticket-market-quickbar">
        <button className={`ticket-pill ${city === "all" ? "active" : ""}`} onClick={() => setCity("all")}>{ticketCopy.allCities}</button>
        {featuredCities.map((cityName) => (
          <button className={`ticket-pill ${city === cityName ? "active" : ""}`} key={cityName} onClick={() => setCity(cityName)}>
            {cityName.split(",")[0]}
          </button>
        ))}
      </div>

      <div className="ticket-market-layout">
        <article className="ticket-market-feature">
          <span className="ticket-market-label"><Ticket size={15} /> {selectedTicket ? ticketCopy.selected : ticketCopy.featured}</span>
          <h3>{featuredTicket.label}</h3>
          <p><CalendarDays size={15} /> {featuredTicket.date} · {featuredTicket.time}</p>
          <p><MapPin size={15} /> {featuredTicket.stadiumName}, {featuredTicket.city}</p>
          <p><Users size={15} /> {ticketCopy.tapHint}</p>
          <div className="ticket-market-price">
            <span>{ticketCopy.lowestFrom}</span>
            <strong>{matchPrice(featuredTicket).replace(/^From\s+/i, "")}</strong>
          </div>
          <div className="ticket-quantity-panel">
            <div>
              <span>{ticketCopy.quantity}</span>
              <strong>{quantity}</strong>
            </div>
            <div className="ticket-stepper">
              <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease tickets"><Minus size={15} /></button>
              <button onClick={() => setQuantity((value) => Math.min(8, value + 1))} aria-label="Increase tickets"><Plus size={15} /></button>
            </div>
          </div>
          <div className="ticket-total-box">
            <span>{ticketCopy.estimatedTotal} {quantity}</span>
            <strong>{formatMoney(totalEstimate)}</strong>
            <small>{ticketCopy.beforeFees}</small>
          </div>
          <a className="primary-button ticket-buy-button" href={featuredTicket.ticketUrl ?? featuredTicket.cityUrl} target="_blank" rel="noreferrer">
            <WalletCards size={16} /> {ticketCopy.buy}
          </a>
        </article>

        <div className="ticket-market-board">
          <div className="ticket-market-controls">
            <label className="ticket-search">
              <Search size={16} aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ticketCopy.search} />
            </label>
            <select value={city} onChange={(event) => setCity(event.target.value)} aria-label={copy.viewAll}>
              <option value="all">{ticketCopy.allCities}</option>
              {cities.map((cityName) => <option value={cityName} key={cityName}>{cityName}</option>)}
            </select>
            <button className="chip" onClick={() => setSortMode(sortMode === "price" ? "date" : "price")}>
              <ArrowUpDown size={14} /> {sortMode === "price" ? ticketCopy.sortPrice : ticketCopy.sortDate}
            </button>
          </div>
          <div className="ticket-budget-row">
            {budgetOptions.map(([value, label]) => (
              <button className={`ticket-budget-chip ${budget === value ? "active" : ""}`} key={value} onClick={() => setBudget(value)}>
                {label}
              </button>
            ))}
            <span>{filteredTickets.length} {ticketCopy.results} · {ticketCopy.lowestFrom} {formatMoney(cheapestVisible)}</span>
          </div>

          <div className="ticket-match-list">
            {filteredTickets.slice(0, 12).map((ticket) => (
              <article className={`ticket-match-card ${ticketKey(ticket) === ticketKey(featuredTicket) ? "active" : ""}`} key={ticketKey(ticket)}>
                <div>
                  <button className="ticket-match-select" onClick={() => setSelectedTicketKey(ticketKey(ticket))}>{ticket.label}</button>
                  <p className="small muted">{ticket.stage} · {ticket.date} · {ticket.time}</p>
                  <p className="small muted"><MapPin size={13} /> {ticket.stadiumName}</p>
                </div>
                <div className="ticket-match-action">
                  <strong>{matchPrice(ticket)}</strong>
                  <a className="link-button" href={ticket.ticketUrl ?? ticket.cityUrl} target="_blank" rel="noreferrer">
                    {ticketCopy.buy} <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
            {filteredTickets.length === 0 && <p className="small muted ticket-empty">{ticketCopy.noResults}</p>}
          </div>
        </div>
      </div>

      <div className="chip-row tickets-panel-reminders" aria-label={copy.tickets}>
        <span className="chip active"><ShieldCheck size={14} /> {ticketCopy.protected}</span>
        <span className="chip"><Ticket size={14} /> {ticketCopy.mobile}</span>
        <span className="chip"><CalendarDays size={14} /> {ticketCopy.refund}</span>
      </div>
      <p className="small muted ticket-market-note">{ticketCopy.marketNote}</p>
    </section>
  );
}
