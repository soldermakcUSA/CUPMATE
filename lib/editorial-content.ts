import { getSiteUrl } from "@/lib/seo";

export type EditorialArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  updatedAt: string;
  readingTime: string;
  keywords: string[];
  intro: string;
  sections: Array<{
    title: string;
    body: string;
    bullets?: string[];
  }>;
  faqs: Array<{ question: string; answer: string }>;
  sources: Array<{ label: string; url: string }>;
};

export const editorialArticles: EditorialArticle[] = [
  {
    slug: "world-cup-2026-tickets-guide",
    title: "World Cup 2026 Tickets Guide: Official Sales, Resale and Safer Planning",
    description: "A practical World Cup 2026 ticket guide for fans comparing official FIFA sales phases, resale risk, match demand and budget timing.",
    category: "Tickets",
    updatedAt: "2026-05-15",
    readingTime: "7 min read",
    keywords: ["World Cup 2026 tickets", "FIFA tickets", "World Cup resale", "World Cup 2026 ticket guide"],
    intro:
      "World Cup 2026 ticket searches are high-intent, but they are also full of confusion. CupMate’s ticket guidance focuses on what a fan can verify: official sales windows, match demand, resale caution, stadium logistics and the total cost of attending a match.",
    sections: [
      {
        title: "Start with official channels",
        body:
          "FIFA’s ticket FAQ says sales phases are handled through FIFA.com/tickets and that phases can differ by process, payment method, product type and availability. Treat that as the baseline before comparing any other marketplace or travel package.",
        bullets: ["Use FIFA.com/tickets as the primary verification path.", "Check whether a phase is draw-based or first-come, first-served.", "Confirm category, currency, delivery method and transfer rules before planning travel."]
      },
      {
        title: "Plan around availability, not wish lists",
        body:
          "The Last-Minute Sales Phase is designed around real-time transactions and availability. For fans, that means a match can be possible one day and unrealistic the next. Build a shortlist by city and match tier instead of relying on a single dream fixture.",
        bullets: ["Track multiple matches in the same city.", "Keep backup dates close to your preferred travel window.", "Compare ticket demand with hotel and transport pressure."]
      },
      {
        title: "Resale requires extra caution",
        body:
          "Unofficial listings may appear before or outside official FIFA flows. CupMate should frame resale as a verification problem: who is the seller, how is the ticket delivered, what is the refund path and whether the ticket is transferable under current rules.",
        bullets: ["Avoid screenshots as proof of ticket ownership.", "Check marketplace guarantees and delivery timing.", "Prefer official resale paths when available."]
      }
    ],
    faqs: [
      { question: "Where should fans check official World Cup 2026 ticket availability?", answer: "Start with FIFA.com/tickets and the official FIFA ticket support pages, then compare any resale option against those rules." },
      { question: "Should fans buy only one target match?", answer: "No. Demand can shift quickly, so it is safer to track several matches by city, date and budget." }
    ],
    sources: [
      { label: "FIFA ticket sales FAQ", url: "https://gpcustomersupportfwc2026.tickets.fifa.com/hc/en-gb/articles/30519468735133-1-How-will-I-have-the-chance-to-purchase-ticket-s-for-the-FIFA-World-Cup-2026" },
      { label: "FIFA tickets", url: "https://www.fifa.com/tickets" }
    ]
  },
  {
    slug: "world-cup-2026-schedule-by-city",
    title: "World Cup 2026 Schedule by City: How Fans Should Choose Matches",
    description: "Use the World Cup 2026 schedule by city to compare match volume, travel friction, ticket demand and fan-zone planning.",
    category: "Schedule",
    updatedAt: "2026-05-15",
    readingTime: "6 min read",
    keywords: ["World Cup 2026 schedule by city", "World Cup host cities", "World Cup fixtures"],
    intro:
      "The 2026 tournament is spread across Canada, Mexico and the United States, so the schedule is also a travel-planning problem. A city-first view helps fans compare where a trip is realistic.",
    sections: [
      {
        title: "City-first planning is easier than match-first planning",
        body:
          "A single match can look attractive until hotel prices, airport distance, local transport and ticket availability are included. CupMate’s schedule pages should help fans anchor a trip around one city, then add nearby matches and viewing options.",
        bullets: ["Pick a host city first.", "Compare stadium access and match count.", "Add fan zones and watch places as backup plans."]
      },
      {
        title: "Use official schedule data as the source of truth",
        body:
          "FIFA’s schedule page is the source fans should use for fixtures, dates and venues. CupMate can add value by translating that data into routes, ticket reminders, watch plans and city-specific decisions.",
        bullets: ["Fixture and venue from FIFA.", "Practical planning from CupMate.", "Sources visible on guide pages."]
      }
    ],
    faqs: [
      { question: "Why plan World Cup 2026 by city?", answer: "Because hotels, stadium access, ticket demand and fan zones are local decisions." },
      { question: "Does CupMate replace the official FIFA schedule?", answer: "No. CupMate adds planning context and links back to official sources where appropriate." }
    ],
    sources: [
      { label: "FIFA World Cup 2026 schedule", url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/match-schedule-fixtures-results-teams-stadiums" }
    ]
  },
  {
    slug: "metlife-stadium-world-cup-2026-guide",
    title: "MetLife Stadium World Cup 2026 Guide: Final, Transit, Tickets and Fan Timing",
    description: "Plan World Cup 2026 matches at MetLife Stadium with final-host context, rail access, ticket demand and fan timing.",
    category: "Stadiums",
    updatedAt: "2026-05-15",
    readingTime: "6 min read",
    keywords: ["MetLife Stadium World Cup 2026", "New York New Jersey Stadium", "World Cup final 2026"],
    intro:
      "MetLife Stadium is one of the highest-demand venues of the tournament because New York New Jersey Stadium is set to host the 2026 final. Fans should plan this venue earlier than most.",
    sections: [
      {
        title: "Final-host status changes everything",
        body:
          "FIFA has confirmed New York New Jersey Stadium as the final venue for Sunday, 19 July 2026. That makes local lodging, ticket demand and transport planning especially competitive around the closing week.",
        bullets: ["Expect strong demand for final-week hotels.", "Use rail planning before rideshare planning.", "Keep ticket and ID workflows ready before leaving for the stadium."]
      },
      {
        title: "Transit is the default plan",
        body:
          "For many fans, the simplest route is rail through Secaucus Junction toward the Meadowlands area. Driving can work, but match-day closures and post-match exits make a backup plan important.",
        bullets: ["Save train route details offline.", "Arrive with a time buffer.", "Pick a post-match meeting point away from the gate."]
      }
    ],
    faqs: [
      { question: "Will MetLife Stadium host the World Cup 2026 final?", answer: "Yes. FIFA has confirmed New York New Jersey Stadium as the final venue on Sunday, 19 July 2026." },
      { question: "What is the best way to reach MetLife Stadium?", answer: "For many visitors, rail via Secaucus Junction is the cleanest starting point, though final event guidance should be checked closer to match day." }
    ],
    sources: [
      { label: "FIFA final venue announcement", url: "https://www.fifa.com/en/articles/new-york-new-jersey-stadium-host-world-cup-2026-final" }
    ]
  },
  {
    slug: "world-cup-2026-fan-zones-guide",
    title: "World Cup 2026 Fan Zones Guide: How to Pick the Right Watch Area",
    description: "Choose World Cup 2026 fan zones by city, crowd size, screens, food, transit and backup plans.",
    category: "Fan Zones",
    updatedAt: "2026-05-15",
    readingTime: "5 min read",
    keywords: ["World Cup 2026 fan zones", "World Cup watch party", "World Cup host city fan guide"],
    intro:
      "Fan zones are not just places with screens. During World Cup 2026 they will shape how supporters meet, move through cities and experience matches when they do not have a stadium ticket.",
    sections: [
      {
        title: "Match the fan zone to the match",
        body:
          "A low-pressure group match and a knockout match need different plans. For high-demand matches, arrive earlier, choose a backup viewing place and keep post-match transit in mind.",
        bullets: ["Check screen size and entry rules.", "Know whether food and family areas are available.", "Plan the exit before kickoff."]
      },
      {
        title: "City context matters",
        body:
          "A beach viewing area in Miami, a downtown plaza in Seattle and a high-density New York gathering will feel completely different. CupMate can rank by matching atmosphere to fan need.",
        bullets: ["Family-friendly", "Supporter-heavy", "Nightlife-focused", "Transit-first"]
      }
    ],
    faqs: [
      { question: "Are fan zones useful if I already have a ticket?", answer: "Yes. They can be pre-match meeting points, backup plans and post-match gathering areas." },
      { question: "What should CupMate show for fan zones?", answer: "Entry rules, match relevance, crowd timing, transport, food, screens, safety notes and nearby backup places." }
    ],
    sources: [
      { label: "FIFA World Cup 2026 tournament hub", url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026" }
    ]
  },
  {
    slug: "where-to-watch-world-cup-2026",
    title: "Where to Watch World Cup 2026: Sports Bars, Restaurants and Local Viewing",
    description: "Find where to watch World Cup 2026 matches with sports bars, restaurants, fan zones, reservations and match-day logistics.",
    category: "Where to Watch",
    updatedAt: "2026-05-15",
    readingTime: "5 min read",
    keywords: ["where to watch World Cup 2026", "World Cup sports bars", "World Cup watch parties"],
    intro:
      "Many fans will experience World Cup 2026 outside the stadium. A strong watch guide should answer the local question: which place fits this match, this group and this city?",
    sections: [
      {
        title: "Search intent is local",
        body:
          "People will search for where to watch a specific team in a specific city. CupMate should build pages that connect match schedule, team interest, city neighborhoods and reservation timing.",
        bullets: ["Team-specific pages", "City-specific watch guides", "Reservation and arrival notes", "Late kickoff considerations"]
      },
      {
        title: "Good recommendations need filters",
        body:
          "A good sports bar for a solo fan may not fit a family group. CupMate should separate high-energy supporter places, food-first restaurants, outdoor screens and transit-friendly options.",
        bullets: ["Screens and sound", "Food and reservations", "Family fit", "Distance from stadium or hotel zones"]
      }
    ],
    faqs: [
      { question: "Should watch pages be city-specific?", answer: "Yes. City pages are better for local SEO and more useful for fans." },
      { question: "What makes a watch listing trustworthy?", answer: "Recent details, address, reservation notes, match relevance, source links and clear disclosure for sponsored listings." }
    ],
    sources: [
      { label: "FIFA World Cup 2026 schedule", url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/match-schedule-fixtures-results-teams-stadiums" }
    ]
  },
  {
    slug: "world-cup-2026-travel-checklist",
    title: "World Cup 2026 Travel Checklist: Tickets, Stadium Routes, Hotels and Backup Plans",
    description: "A practical World Cup 2026 travel checklist for fans visiting the United States, Canada and Mexico during the tournament.",
    category: "Travel",
    updatedAt: "2026-05-15",
    readingTime: "6 min read",
    keywords: ["World Cup 2026 travel", "World Cup travel checklist", "World Cup host city travel"],
    intro:
      "The 2026 tournament is bigger than a normal city break. Fans need ticket access, border-aware travel plans, stadium routes, hotel geography and backup viewing options.",
    sections: [
      {
        title: "Before booking",
        body:
          "Choose cities by match count, realistic travel time and the availability of backup entertainment. A cheap flight can become expensive if the stadium sits far from the hotel zone.",
        bullets: ["Check match dates against hotel prices.", "Compare stadium transit before booking accommodation.", "Keep a backup city or match."]
      },
      {
        title: "Before match day",
        body:
          "Save tickets, route maps, ID requirements, entry rules and meetup points. The best plan is the one that still works if mobile data is slow or the first route is crowded.",
        bullets: ["Offline route screenshots", "Ticket app readiness", "Post-match meeting point", "Fan-zone backup"]
      }
    ],
    faqs: [
      { question: "Should I book hotels near the stadium?", answer: "Not always. Some host cities are better planned around transit, downtown areas or airport access." },
      { question: "What is the most important backup plan?", answer: "A second way to reach the stadium and a second place to watch the match if plans change." }
    ],
    sources: [
      { label: "FIFA World Cup 2026 host cities overview", url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/fifa-world-cup-2026-hosts-cities-dates-usa-mexico-canada" }
    ]
  },
  {
    slug: "world-cup-2026-official-sources",
    title: "World Cup 2026 Official Sources: What Fans Should Verify Before They Buy or Travel",
    description: "A source checklist for World Cup 2026 fans: official schedule, tickets, final venue, stadium pages and local travel updates.",
    category: "Sources",
    updatedAt: "2026-05-15",
    readingTime: "4 min read",
    keywords: ["World Cup 2026 official sources", "FIFA World Cup sources", "World Cup ticket verification"],
    intro:
      "CupMate can be useful only if it keeps official facts separate from fan-planning advice. This guide explains which details should be verified before money or travel time is committed.",
    sections: [
      {
        title: "Verify the official facts",
        body:
          "Use FIFA for fixtures, ticket windows, stadium assignments and major tournament announcements. Use CupMate to organize those facts into a match-day plan.",
        bullets: ["Fixture and venue", "Ticket phase", "Final venue", "Terms that affect transfer or resale"]
      },
      {
        title: "Then add local context",
        body:
          "Local transport, fan zones and viewing places can change closer to the event. CupMate should show update dates and keep links to source material visible.",
        bullets: ["Last updated date", "Source links", "City-specific disclaimers", "Sponsored listing labels"]
      }
    ],
    faqs: [
      { question: "Is CupMate affiliated with FIFA?", answer: "No. CupMate should be presented as an independent fan-planning project and should link to official sources for official facts." },
      { question: "Why show sources on SEO pages?", answer: "Sources improve trust, help users verify facts and reduce the risk of outdated guidance." }
    ],
    sources: [
      { label: "FIFA World Cup 2026", url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026" },
      { label: "FIFA ticket support", url: "https://gpcustomersupportfwc2026.tickets.fifa.com/hc/en-gb" }
    ]
  }
];

export function findEditorialArticle(slug: string) {
  return editorialArticles.find((article) => article.slug === slug);
}

export function articleJsonLd(article: EditorialArticle) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    dateModified: article.updatedAt,
    datePublished: article.updatedAt,
    author: {
      "@type": "Organization",
      name: "CupMate"
    },
    publisher: {
      "@type": "Organization",
      name: "CupMate"
    },
    mainEntityOfPage: `${siteUrl}/guides/${article.slug}`,
    keywords: article.keywords.join(", "),
    citation: article.sources.map((source) => source.url)
  };
}

export function faqJsonLd(article: EditorialArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}
