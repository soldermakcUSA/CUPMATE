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
    slug: "world-cup-visa-bond-waiver-ticket-holders",
    title: "World Cup ticket holders get a visa-bond waiver: what traveling fans should check",
    description: "The U.S. is waiving visa bonds for some World Cup ticket holders from qualified countries, easing one travel barrier before the 2026 tournament.",
    category: "Travel",
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-17",
    image: "/assets/news/world-cup-visa-bond-waiver-ticket-holders-photo.png",
    sourceUrl: "https://apnews.com/article/trump-world-cup-visa-bonds-a3a165fb5c2d215c5cd237d7a2e783ad",
    sourceLabel: "AP News",
    summary:
      "A U.S. visa-bond requirement will no longer apply to certain foreign fans who hold FIFA World Cup tickets and come from qualified countries affected by the bond program. AP reported that the exemption covers ticket buyers from Algeria, Cape Verde, Ivory Coast, Senegal and Tunisia, while team players, coaches and some staff were already covered by separate tournament visa processing measures.",
    impact: ["Affected ticket holders should verify FIFA Pass and visa steps", "Travel rules can still differ by nationality and restriction category", "Fans should keep ticket proof and consular documents together"],
    sections: [
      {
        title: "What changed",
        body: "The State Department is suspending a bond requirement that could have forced some temporary-visa applicants to post thousands of dollars before entering the United States. The change applies to citizens of affected countries that have qualified for the World Cup, provided they have bought FIFA tickets and use the relevant FIFA Pass process for expedited visa appointments."
      },
      {
        title: "Who this helps",
        body: "AP identified Algeria, Cape Verde, Ivory Coast, Senegal and Tunisia as qualified World Cup countries that overlapped with the bond program. For fans from those countries, the waiver removes a major cash-flow obstacle, but it does not replace the normal visa process or guarantee entry. Travelers still need to follow consular instructions, appointment timing and any country-specific restrictions.",
        bullets: ["Check the official visa appointment path before booking nonrefundable travel", "Keep FIFA ticket records accessible for consular and border checks", "Confirm whether the waiver applies to every traveler in the group"]
      },
      {
        title: "Why it matters for host-city planning",
        body: "The tournament starts June 11, so late changes to entry rules can affect hotel demand, flight bookings and whether supporters feel confident enough to travel. Even if the number of directly affected fans is limited, the decision is a signal that World Cup mobility rules are still changing close to kickoff."
      },
      {
        title: "CupMate planning note",
        body: "CupMate should treat visa and entry updates as live planning items, not background policy news. For international supporters, the safest itinerary pairs official ticket proof, visa appointment status, refundable travel where possible and a backup watch-party plan if documents are delayed."
      }
    ]
  },
  {
    slug: "california-fifa-ticketing-practices-letter",
    title: "California asks FIFA for answers on World Cup ticketing practices",
    description: "California Attorney General Rob Bonta has asked FIFA for information after reports of potentially misleading World Cup ticketing practices.",
    category: "Tickets",
    publishedAt: "2026-05-14",
    updatedAt: "2026-05-17",
    image: "/assets/news/california-fifa-ticketing-practices-letter-photo.png",
    sourceUrl: "https://as.com/us/futbol/mundial/california-pide-respuestas-a-fifa-por-irregularidades-en-venta-de-boletos-al-mundial-f202605-n/",
    sourceLabel: "AS USA",
    summary:
      "California Attorney General Rob Bonta has sent FIFA a request for information about World Cup ticketing practices after reports that some buyers may have received seats different from what they believed they were purchasing. The issue lands in a state with 14 tournament matches across Los Angeles and the San Francisco Bay Area, making ticket clarity a practical fan-planning concern.",
    impact: ["Save all FIFA purchase records and seat-category details", "Avoid treating unofficial seat maps as final proof", "California matches may draw extra consumer-protection scrutiny"],
    sections: [
      {
        title: "The request",
        body: "AS USA reported that Bonta asked FIFA for information so California can assess whether ticketing practices may have violated state law. The request follows complaints and reporting about seat-category maps, assigned seats and buyer expectations during the World Cup sales process."
      },
      {
        title: "What fans should document",
        body: "Ticket disputes are easier to evaluate when buyers preserve the full purchase trail. Fans should keep order confirmations, seat-category language, screenshots from the purchase flow, payment receipts and any later assignment emails in one place. That record is useful whether the final answer comes from FIFA support, a payment provider or a consumer-protection office.",
        bullets: ["Store confirmation emails outside the ticketing app", "Do not rely on resale screenshots without official transfer proof", "Compare final seat assignments against the original category language"]
      },
      {
        title: "Why California matters",
        body: "Los Angeles is scheduled to host eight World Cup matches at SoFi Stadium, while the Bay Area hosts six in Santa Clara. That gives California a large consumer base inside the tournament footprint, and any official inquiry there can influence how fans think about pricing, disclosure and post-purchase support."
      },
      {
        title: "CupMate planning note",
        body: "For CupMate users, the practical response is simple: separate ticket certainty from travel excitement. Lock hotels and transport only after confirming official ticket status, keep resale risk visible in planning notes and avoid building a group itinerary around seats that have not been assigned or transferred through official channels."
      }
    ]
  },
  {
    slug: "dai-dai-world-cup-song-shakira-burna-boy",
    title: "Dai Dai becomes the official World Cup 2026 song: what fans should plan around",
    description: "Shakira and Burna Boy released Dai Dai, the official FIFA World Cup 2026 song, adding music, ceremony and fan-event context before kickoff.",
    category: "Music",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-15",
    image: "/assets/news/dai-dai-world-cup-song-shakira-burna-boy.png",
    sourceUrl: "https://www.fifa.com/en/articles/shakira-and-burna-boy-dai-dai-the-official-song",
    sourceLabel: "FIFA",
    summary:
      "FIFA's official World Cup 2026 song is now out, with Shakira and Burna Boy combining Latin pop and Afrobeats on Dai Dai. The release matters for fans because music is becoming part of the tournament schedule itself: the track connects to ceremony programming, city fan events, broadcast moments and the wider Global Citizen education campaign around the final.",
    impact: ["Expect Dai Dai across fan zones and broadcasts", "Track ceremony timing before booking tight match-day plans", "Use music news as a signal for host-city event demand"],
    sections: [
      {
        title: "What changed",
        body: "The official song gives the 2026 World Cup a clearer cultural identity less than a month before kickoff. FIFA and AP both reported the release on May 15, 2026, with Shakira returning to World Cup music and Burna Boy adding a major Afrobeats presence to the tournament soundtrack."
      },
      {
        title: "Why this is more than a playlist update",
        body: "Tournament music shapes how fans experience the event outside the 90 minutes. A recognizable official song tends to appear in stadium build-up, host-city fan festivals, social clips, sponsor content and broadcast packages. For traveling supporters, that can make fan zones and ceremony windows feel more like fixed parts of the itinerary rather than optional extras.",
        bullets: ["Watch for host-city stages using the track in countdown programming", "Expect heavier interest around music-led fan events", "Check official event calendars before locking dinner or transport windows"]
      },
      {
        title: "Connection to the final",
        body: "The song arrives alongside a larger entertainment push around the New York New Jersey final. AP reported that the first World Cup final halftime show will support the FIFA Global Citizen Education Fund, which has a stated fundraising goal for education and soccer access. That makes the final a match, a broadcast event and a fundraising platform at the same time."
      },
      {
        title: "CupMate planning note",
        body: "Fans should treat music announcements as event-planning signals. They do not change tickets by themselves, but they can change crowd behavior: earlier arrivals, busier fan festivals, longer lines at public viewing sites and more people staying after matches for programmed entertainment."
      }
    ]
  },
  {
    slug: "pif-world-cup-tournament-supporter",
    title: "PIF becomes a World Cup 2026 tournament supporter in North America and Asia",
    description: "FIFA named Saudi Arabia's Public Investment Fund as an official tournament supporter for World Cup 2026 in North America and Asia.",
    category: "Commerce",
    publishedAt: "2026-05-14",
    updatedAt: "2026-05-15",
    image: "/assets/news/pif-world-cup-tournament-supporter.png",
    sourceUrl: "https://inside.fifa.com/tournament-organisation/commercial/media-releases/pif-official-tournament-supporter-world-cup-2026",
    sourceLabel: "FIFA Inside",
    summary:
      "FIFA has added Saudi Arabia's Public Investment Fund as an official tournament supporter for World Cup 2026 across North America and Asia. The agreement brings PIF companies, including Savvy Games Group and Qiddiya City, into the tournament's commercial and fan-engagement layer, while also extending Saudi football positioning before the country hosts the 2034 World Cup.",
    impact: ["More partner activations may appear in host-city spaces", "Gaming and entertainment tie-ins could become part of fan engagement", "Commercial news can affect the event layer around matches, not the match schedule"],
    sections: [
      {
        title: "The deal",
        body: "FIFA announced PIF as an official tournament supporter on May 14, 2026. The partnership covers North America and Asia and follows PIF's earlier FIFA Club World Cup 2025 relationship. FIFA's release says the agreement includes Savvy Games Group and Qiddiya City, pointing to fan engagement, entertainment and youth participation rather than a simple logo placement."
      },
      {
        title: "Why fans should pay attention",
        body: "Commercial partnerships often show up in the places supporters actually use: fan zones, digital games, public activations, travel promotions, hospitality areas and social content. This does not alter kickoff times or ticket rights, but it may shape the experiences built around high-demand matches in the United States, Canada and Mexico.",
        bullets: ["Look for partner activations near official fan festivals", "Separate sponsor experiences from official ticket access", "Expect more tournament content aimed at younger and mobile-first fans"]
      },
      {
        title: "The wider football context",
        body: "AP framed the deal as another sign of Saudi Arabia's continued investment in global football. PIF is tied to the country's broader sports strategy, and Saudi Arabia has already secured hosting rights for the 2034 World Cup. That makes the 2026 agreement part of a longer FIFA and Saudi football relationship, not a one-off sponsorship."
      },
      {
        title: "CupMate planning note",
        body: "For supporters, the useful takeaway is practical: commercial announcements can preview where fan experiences will become denser. CupMate should keep tracking which activations are free, which require registration, which sit inside ticketed areas and which are only marketing content with no match-day value."
      }
    ]
  },
  {
    slug: "boston-stadium-ticket-access-rules",
    title: "Boston Stadium access rules: no ticket, no stadium lot on World Cup match days",
    description: "Boston and Foxborough officials are warning fans that World Cup match-day stadium access, parking, trains and buses will be tightly controlled.",
    category: "Transport",
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-15",
    image: "/assets/news/boston-stadium-ticket-access-rules.png",
    sourceUrl: "https://www.axios.com/local/boston/2026/05/13/boston-stadium-gillette-foxborough-world-cup-tickets",
    sourceLabel: "Axios Boston",
    summary:
      "Boston's World Cup logistics are now concrete enough for fans to plan around. Axios Boston reported that officials are telling people without match tickets not to come to the stadium area, while the official Boston fan travel guide says stadium trains, buses and parking require advance planning and proof of a match-day ticket.",
    impact: ["Do not travel to Foxborough without a match ticket", "Book rail, bus or parking before match day", "Use Boston Fan Festival or watch parties if you do not have stadium access"],
    sections: [
      {
        title: "What officials are saying",
        body: "The Foxborough venue is being rebranded as Boston Stadium for the tournament, and local officials are drawing a hard line around access. Axios reported that parking spots and stadium-area fan experiences, including tailgating, will be limited to ticket holders. The clearest message for non-ticketed fans is to use Boston's Fan Festival or community watch parties instead of going to the stadium."
      },
      {
        title: "Transport choices are limited",
        body: "The official Boston fan travel guide says the stadium is normally 60 to 90 minutes from downtown Boston by road and can take longer with match traffic. It lists advance-purchase Boston Stadium trains from South Station to Foxboro Station, an official express bus network, prepaid parking and restricted local road access. The guide also notes that train and bus boarding can require proof of a match-day ticket.",
        bullets: ["Commuter rail and express bus tickets should be booked in advance", "Parking needs a prepaid pass and corresponding match ticket", "Private drop-off around the stadium is restricted"]
      },
      {
        title: "Security and timing",
        body: "Axios reported that fans may be asked to show tickets multiple times before reaching their seats. The stadium lots are expected to open four hours before kickoff, while fan experience areas have their own opening and closing windows. That makes Boston a poor match for last-minute arrivals, tight restaurant reservations or rideshare plans that assume normal stadium traffic."
      },
      {
        title: "CupMate planning note",
        body: "Boston should be treated as a pre-booked travel day. Save the match, confirm the transport mode, keep ticket proof accessible and choose a post-match meeting point away from the heaviest queues. Fans without tickets should plan around City Hall Plaza Fan Festival capacity and registration instead of trying to get close to the stadium."
      }
    ]
  },
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
