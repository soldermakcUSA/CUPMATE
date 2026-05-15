import { getSiteUrl, siteName } from "@/lib/seo";

export type NewsSeoArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  sourceUrl: string;
  sourceLabel: string;
  summary: string;
  impact: string[];
  sections: Array<{
    title: string;
    body: string;
    bullets?: string[];
  }>;
};

export const newsSeoArticles: NewsSeoArticle[] = [
  {
    slug: "france-names-world-cup-squad-risser",
    title: "France World Cup squad news: Risser call-up adds a new planning note",
    description: "France's World Cup 2026 squad update, rewritten for fans tracking team alerts, likely lineups and group-stage planning.",
    category: "Teams",
    publishedAt: "2026-05-14",
    updatedAt: "2026-05-14",
    image: "/assets/news/france-names-world-cup-squad-risser.png",
    sourceUrl: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/france-world-cup-squad-named",
    sourceLabel: "FIFA",
    summary:
      "France's tournament list keeps the familiar attacking core in focus while adding a fresh goalkeeper storyline through Robin Risser. For supporters, the practical value is not only who made the squad, but how selection news changes lineup expectations, team-following alerts and match choices inside a long group-stage itinerary.",
    impact: ["Save France fixtures early", "Watch lineup alerts near kickoff", "Expect high demand around marquee France matches"],
    sections: [
      {
        title: "What changed",
        body: "The squad announcement gives France fans a clearer picture of the group that will carry the 2026 campaign. Risser's inclusion adds a newer name to an otherwise elite, familiar player pool."
      },
      {
        title: "Why fans should care",
        body: "Squad details shape the way supporters prioritize matches. A deep France roster can affect ticket demand, pre-match expectations and the teams neutral fans choose to follow during the group stage.",
        bullets: ["Track goalkeeper and rotation decisions", "Compare France match dates before booking travel", "Use squad news to refine saved-team notifications"]
      }
    ]
  },
  {
    slug: "brazil-ancelotti-extends-2030-world-cup",
    title: "Brazil extends Carlo Ancelotti: what it means before World Cup 2026",
    description: "Brazil's long-term Ancelotti decision gives fans a continuity signal before World Cup 2026 squad and match planning.",
    category: "Teams",
    publishedAt: "2026-05-14",
    updatedAt: "2026-05-14",
    image: "/assets/news/brazil-ancelotti-extends-2030-world-cup.png",
    sourceUrl: "https://www.fifa.com/en/articles/carlo-ancelotti-brazil-contract-extension",
    sourceLabel: "FIFA",
    summary:
      "Brazil's decision to keep Carlo Ancelotti through the next World Cup cycle reframes the 2026 tournament as more than a one-month assignment. The extension signals continuity, which matters for fans reading squad choices, tactical decisions and Brazil's path through the bracket.",
    impact: ["Brazil match interest stays high", "Squad choices can be read as part of a longer plan", "Neutral fans get a clearer team storyline"],
    sections: [
      {
        title: "Continuity before kickoff",
        body: "A long-term coaching decision can calm speculation around Brazil before the tournament begins. It also makes selection choices easier to interpret because the coach is building beyond a single summer."
      },
      {
        title: "CupMate planning angle",
        body: "Brazil fixtures are likely to be among the most watched and most expensive fan targets. Supporters should save Brazil matches, compare host-city routes and keep resale checks separate from unofficial hype."
      }
    ]
  },
  {
    slug: "metlife-final-natural-grass-installation",
    title: "MetLife Stadium World Cup final pitch milestone: natural grass installed",
    description: "FIFA says the natural grass pitch is in place at the New York New Jersey venue for the World Cup 2026 final.",
    category: "Stadiums",
    publishedAt: "2026-05-08",
    updatedAt: "2026-05-08",
    image: "/assets/news/metlife-final-natural-grass-installation.png",
    sourceUrl: "https://inside.fifa.com/news/pitch-installation-world-cup-2026-final-new-york-new-jersey",
    sourceLabel: "FIFA Inside",
    summary:
      "The New York New Jersey final venue has reached a visible infrastructure milestone with natural grass installation. For fans, pitch work is a sign that stadium conversion is moving from planning documents to match-ready operations at the tournament's biggest venue.",
    impact: ["Final venue preparation is advancing", "MetLife travel planning remains a high-priority topic", "Pitch quality will be watched closely by teams and fans"],
    sections: [
      {
        title: "Why the pitch matters",
        body: "World Cup venues with regular artificial or hybrid event demands need careful tournament conversion. A completed natural grass surface is relevant for player safety, ball speed and confidence in the final venue."
      },
      {
        title: "Fan planning note",
        body: "This update does not change ticket access by itself, but it reinforces the need to plan MetLife arrival and departure early. Final-day crowds will combine match demand, media operations and neutral fan activity across New York and New Jersey."
      }
    ]
  },
  {
    slug: "seattle-world-cup-transit-plan",
    title: "Seattle World Cup transit plan: Lumen Field fans should expect pressure",
    description: "Seattle's World Cup 2026 transit warnings point to road closures, light rail demand and packed ferry corridors around Lumen Field.",
    category: "Transport",
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-13",
    image: "/assets/news/seattle-world-cup-transit-plan.png",
    sourceUrl: "https://www.axios.com/local/seattle/2026/05/13/seattle-world-cup-2026-traffic-light-rail-ferry-lumen-field-road-closures",
    sourceLabel: "Axios Seattle",
    summary:
      "Seattle's planning message is becoming practical: fans should prepare for a transit-first match day around Lumen Field. Road controls, crowded trains and ferry pressure all point to the same recommendation: build more time into every arrival and exit plan.",
    impact: ["Use light rail where possible", "Avoid tight post-match connections", "Check ferry and downtown road updates before leaving"],
    sections: [
      {
        title: "What fans can expect",
        body: "Lumen Field sits close to downtown, rail, ferry and waterfront routes. That is convenient, but it also concentrates match-day demand into the same corridors that commuters and local event traffic already use."
      },
      {
        title: "Best planning response",
        body: "Treat Seattle matches as transit events, not driving events. Save a primary route, a fallback route and a meeting point outside the stadium perimeter before match day."
      }
    ]
  },
  {
    slug: "mexico-city-azteca-world-cup-guide",
    title: "Mexico City World Cup opener planning: culture, food and Azteca crowds",
    description: "Mexico City's World Cup 2026 opener will combine Estadio Azteca demand with food, culture and complex crowd movement.",
    category: "Travel",
    publishedAt: "2026-05-14",
    updatedAt: "2026-05-14",
    image: "/assets/news/mexico-city-azteca-world-cup-guide.png",
    sourceUrl: "https://apnews.com/article/d317e214b976c7247b82d88d395e058c",
    sourceLabel: "Associated Press",
    summary:
      "Mexico City is preparing to turn the opening match into a full-city welcome, not only a stadium event. Fans should expect a powerful mix of food, history and atmosphere, balanced by the practical need to manage traffic, rail timing and crowds around Estadio Azteca.",
    impact: ["Plan Azteca arrival earlier than usual", "Use culture and food stops around transit, not against it", "Keep opening-match plans flexible"],
    sections: [
      {
        title: "A host-city showcase",
        body: "The opener gives Mexico City a chance to present its scale and identity to traveling fans. That makes the city experience central to the match, from neighborhoods and food to historic landmarks."
      },
      {
        title: "The logistics side",
        body: "Opening-match demand can make normal city movement harder. Fans should connect sightseeing plans to realistic transport windows and avoid assuming every route near Estadio Azteca will operate like a normal day."
      }
    ]
  },
  {
    slug: "world-cup-final-halftime-show-lineup",
    title: "World Cup final halftime show adds a new layer to New York New Jersey planning",
    description: "The first World Cup final halftime show turns the 2026 final into a larger entertainment and crowd-management event.",
    category: "Music",
    publishedAt: "2026-05-14",
    updatedAt: "2026-05-14",
    image: "/assets/news/world-cup-final-halftime-show-lineup.png",
    sourceUrl: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/madonna-shakira-bts-co-headline-historic-final-halftime-show",
    sourceLabel: "FIFA",
    summary:
      "The 2026 final is being framed as a match plus a global entertainment moment. A halftime show increases attention on the New York New Jersey final and may affect arrival behavior, security timing and how long fans stay inside and around the venue.",
    impact: ["Arrive earlier for final-day security", "Expect heavier non-match media attention", "Avoid tight plans immediately after the final"],
    sections: [
      {
        title: "More than a match window",
        body: "A halftime show changes the event rhythm. Fans may spend longer in seats, arrive earlier to catch the full production and treat the final as a full-day entertainment schedule."
      },
      {
        title: "What to plan around",
        body: "The practical answer is simple: do not compress final-day timing. Build buffers for rail queues, gate checks, halftime activity and the post-match trophy ceremony."
      }
    ]
  },
  {
    slug: "nora-fatehi-world-cup-opening-ceremony-toronto",
    title: "Nora Fatehi reports add culture buzz around Toronto's World Cup opening plans",
    description: "Entertainment reports around Nora Fatehi give Toronto fans another reason to track World Cup 2026 ceremony and fan-event updates.",
    category: "Culture",
    publishedAt: "2026-05-09",
    updatedAt: "2026-05-09",
    image: "/assets/news/nora-fatehi-world-cup-opening-ceremony-toronto.webp",
    sourceUrl: "https://www.bollywoodhungama.com/news/bollywood/nora-fatehi-to-perform-and-sing-at-fifa-world-cup-2026-opening-ceremony-in-toronto/",
    sourceLabel: "Bollywood Hungama",
    summary:
      "Reports connecting Nora Fatehi to World Cup opening activity add a cultural storyline for Toronto. For fans, entertainment news like this can influence which city events to watch, how early to arrive and whether to pair a match ticket with fan-festival plans.",
    impact: ["Track Toronto ceremony updates", "Expect more demand around fan events", "Keep pre-match plans open until official schedules settle"],
    sections: [
      {
        title: "Toronto's culture layer",
        body: "World Cup host cities are not only staging matches. They are building ceremonies, fan areas and sponsor activations that can become part of the travel decision for international supporters."
      },
      {
        title: "Planning caution",
        body: "Entertainment reports can shift before official schedules are locked. Fans should treat them as useful signals, then confirm timing through official city or tournament channels before booking around a performance."
      }
    ]
  },
  {
    slug: "visa-hdfc-world-cup-fan-access-promotion",
    title: "Visa and HDFC World Cup promotion: travel perks enter fan planning",
    description: "An India-focused Visa and HDFC Bank promotion shows how payment partners are becoming part of World Cup 2026 trip planning.",
    category: "Travel",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    image: "/assets/news/visa-hdfc-world-cup-fan-access-promotion.webp",
    sourceUrl: "https://www.deccanchronicle.com/business/in-other-news/visa-and-hdfc-bank-bring-indian-fans-closer-to-the-fifa-world-cup-2026-1950225",
    sourceLabel: "Deccan Chronicle",
    summary:
      "Visa and HDFC Bank's World Cup-linked promotion shows that fan access is expanding beyond ticket portals. Payment offers, travel incentives and partner experiences can all become part of the budget and timing decisions for supporters traveling across continents.",
    impact: ["Compare perks with actual travel costs", "Check eligibility before planning around promotions", "Keep official ticket purchase paths separate"],
    sections: [
      {
        title: "Why this belongs in planning",
        body: "For long-haul fans, the cost of the World Cup includes flights, hotels, local transport and payment fees. Promotions can help, but only when they match a real itinerary."
      },
      {
        title: "What to verify",
        body: "Fans should read promotion terms, card eligibility and redemption windows before assuming access. A partner offer is useful context, not a replacement for confirmed tickets or travel documents."
      }
    ]
  },
  {
    slug: "lays-world-cup-inspired-flavors-canada",
    title: "Lay's World Cup flavors in Canada show tournament marketing ramping up",
    description: "Lay's Canada World Cup 2026 flavors are a retail signal that host-market fan engagement is accelerating.",
    category: "Commerce",
    publishedAt: "2026-05-12",
    updatedAt: "2026-05-12",
    image: "/assets/news/lays-world-cup-inspired-flavors-canada.webp",
    sourceUrl: "https://www.businesswire.com/news/home/20260512823018/en/Lays-Introduces-Four-New-FIFA-World-Cup-2026-Inspired-Potato-Chip-Flavours-in-Canada",
    sourceLabel: "Business Wire",
    summary:
      "Lay's tournament-themed flavors are not operational news, but they do show Canadian World Cup marketing moving into everyday retail. These signals matter because sponsor activity often grows alongside fan zones, city events and local promotions.",
    impact: ["Canadian host markets are warming up", "Expect more sponsor activations near kickoff", "Use retail signals as context, not itinerary anchors"],
    sections: [
      {
        title: "A small signal with a broader meaning",
        body: "Retail launches can make the tournament visible before official fan areas open. In Canada, that visibility helps build local awareness around Toronto and Vancouver as host cities."
      },
      {
        title: "CupMate angle",
        body: "Fans do not need to plan a trip around a snack launch, but sponsor activity can point to markets where fan engagement is already building. That is useful when tracking host-city atmosphere."
      }
    ]
  },
  {
    slug: "world-cup-2026-squad-size-26",
    title: "World Cup 2026 squad size: 26-player lists keep rotation in focus",
    description: "The expected 26-player World Cup 2026 squad format gives fans more team-news and rotation angles to follow.",
    category: "Teams",
    publishedAt: "2026-05-10",
    updatedAt: "2026-05-10",
    image: "/assets/news/world-cup-2026-squad-size-26.webp",
    sourceUrl: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026",
    sourceLabel: "FIFA",
    summary:
      "A 26-player squad framework keeps depth and rotation central to World Cup 2026. For supporters, bigger lists mean more lineup possibilities, more injury cover and more reasons to follow team updates between matchdays.",
    impact: ["Monitor final squad deadlines", "Expect more rotation in congested stretches", "Save team alerts for lineup and injury changes"],
    sections: [
      {
        title: "Why squad size matters",
        body: "The expanded tournament creates more travel, more recovery questions and more tactical variation. A larger squad gives coaches options, but it also makes predicting lineups more complex."
      },
      {
        title: "Fan planning angle",
        body: "Supporters following a specific player should track official squad lists and matchday teams. A player making the 26 does not guarantee minutes in every host city."
      }
    ]
  }
];

export function findNewsSeoArticle(slug: string) {
  return newsSeoArticles.find((article) => article.slug === slug);
}

export function newsArticleJsonLd(article: NewsSeoArticle) {
  const siteUrl = getSiteUrl();
  const articleUrl = `${siteUrl}/news/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl
    },
    headline: article.title,
    description: article.description,
    image: [`${siteUrl}${article.image}`],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl
    },
    citation: {
      "@type": "CreativeWork",
      name: article.sourceLabel,
      url: article.sourceUrl
    },
    isBasedOn: article.sourceUrl,
    articleSection: article.category
  };
}
