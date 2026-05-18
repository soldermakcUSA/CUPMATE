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
    slug: "qatar-preliminary-world-cup-squad-group-b",
    title: "Qatar's preliminary World Cup squad gives Group B fans early planning clues",
    description: "Julen Lopetegui has named a 34-player preliminary Qatar squad, with Akram Afif, Almoez Ali and veteran Sebastian Soria among the names to watch.",
    category: "Teams",
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-18",
    image: "/assets/news/qatar-preliminary-world-cup-squad-group-b.png",
    sourceUrl: "https://www.fifa.com/en/articles/qatar-announce-preliminary-squad",
    sourceLabel: "FIFA",
    summary:
      "Qatar's World Cup preparation has moved from qualification story to roster planning. FIFA reported that Julen Lopetegui named a 34-player preliminary squad, with Akram Afif, Almoez Ali and Sebastian Soria included before Qatar's Group B matches in the Bay Area, Vancouver and Seattle.",
    impact: ["Qatar fans can start mapping a three-city West Coast route around likely squad leaders","The Canada match in Vancouver becomes the strongest travel-demand point for neutral and regional fans","Soria's potential record chase adds a storyline that may lift interest beyond Qatar supporters"],
    sections: [
      {
        title: "The squad signal",
        body: "The preliminary list keeps Qatar built around familiar tournament names while leaving room for a final cut before FIFA receives the 26-player squads on June 2. For supporters, the key is not treating the 34 names as final, but it is enough to begin setting player alerts and match expectations."
      },
      {
        title: "Why Soria changes the story",
        body: "Sebastian Soria's inclusion gives Qatar a rare age-record angle. If he appears in North America, he would move past Roger Milla as the oldest outfield player in men's World Cup history. That kind of storyline can turn a group match into a broader neutral-fan draw.",
        bullets: ["Qatar open against Switzerland at San Francisco Bay Area Stadium on June 13","They face co-host Canada at BC Place Vancouver on June 18","Their group stage closes against Bosnia and Herzegovina at Seattle Stadium on June 24"]
      },
      {
        title: "The travel route",
        body: "Qatar supporters are looking at a compact but border-crossing West Coast campaign: Bay Area, Vancouver, then Seattle. The distances are manageable compared with some groups, but the Canada leg still means passport checks, hotel timing and flight or rail buffers matter."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users following Qatar should save all three Group B cities now, then update the squad card after the June 2 final list. The practical plan is to keep Vancouver flexible because a co-host match can bring extra ticket, hotel and fan-zone demand."
      }
    ]
  },
  {
    slug: "iran-world-cup-squad-group-g-travel",
    title: "Iran's World Cup squad update sharpens travel plans for Group G supporters",
    description: "Amir Ghalenoei has named a 30-player preliminary Iran squad, with Mehdi Taremi included and Sardar Azmoun absent before two Los Angeles matches.",
    category: "Teams",
    publishedAt: "2026-05-16",
    updatedAt: "2026-05-18",
    image: "/assets/news/iran-world-cup-squad-group-g-travel.png",
    sourceUrl: "https://www.fifa.com/en/tournaments/mens/worldcup/articles/ir-iran-squad-named",
    sourceLabel: "FIFA",
    summary:
      "IR Iran's Group G picture is more concrete after FIFA reported that Amir Ghalenoei named a 30-player preliminary squad. Mehdi Taremi is included, while Sardar Azmoun is a notable omission, and the team is set for two Los Angeles matches before a Seattle finale.",
    impact: ["Iran supporters can treat Los Angeles as the main base for the first two group matches","The Azmoun omission changes attacking expectations and watch-party storylines","The Seattle closing match against Egypt now needs a separate travel block after Los Angeles"],
    sections: [
      {
        title: "The roster headline",
        body: "The preliminary squad leans on experience but leaves out one of Iran's best-known forwards. FIFA reported that Taremi is in the extended group while Azmoun, Allahyar Sayyadmanesh and Mohammad Javad Hosseinnejad were not included."
      },
      {
        title: "Why Los Angeles matters",
        body: "Iran begin Group G with two matches at Los Angeles Stadium: New Zealand on June 15 and Belgium on June 21. That gives traveling supporters a chance to use one hotel base for the first week, but it also concentrates demand around the same stadium, transport routes and fan gathering areas.",
        bullets: ["June 15: IR Iran v New Zealand at Los Angeles Stadium","June 21: Belgium v IR Iran at Los Angeles Stadium","June 26: Egypt v IR Iran at Seattle Stadium"]
      },
      {
        title: "The Seattle leg",
        body: "The group closer against Egypt moves the campaign north. Fans trying to attend all three Iran matches should separate the Los Angeles hotel block from the Seattle leg rather than treating it as a single city stay."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users should save Los Angeles Stadium twice, add a Seattle transfer reminder and keep the final squad deadline visible. Player omissions can change demand for specific fan events, especially when a team has a large diaspora following in U.S. host cities."
      }
    ]
  },
  {
    slug: "korea-republic-world-cup-squad-group-c-route",
    title: "Korea Republic squad news sets up a practical Group C route for fans",
    description: "Hong Myungbo has named Korea Republic's 26-player World Cup squad, led by Son Heungmin, Kim Minjae and other experienced names.",
    category: "Teams",
    publishedAt: "2026-05-16",
    updatedAt: "2026-05-18",
    image: "/assets/news/korea-republic-world-cup-squad-group-c-route.png",
    sourceUrl: "https://www.fifa.com/en/articles/korea-republic-world-cup-squad-hong-myungbo",
    sourceLabel: "FIFA",
    summary:
      "Korea Republic's World Cup squad is now public. FIFA reported that Hong Myungbo selected a 26-player group led by Son Heungmin, Kim Minjae, Hwang Heechan, Lee Kangin and other familiar names before two matches in Guadalajara and a group closer in Monterrey.",
    impact: ["Korea Republic fans can build the first two match days around one Guadalajara base","Son and Kim Minjae make Group C a strong neutral-fan draw in Mexico","The Monterrey finale against South Africa needs its own travel and hotel plan"],
    sections: [
      {
        title: "The squad signal",
        body: "Hong has chosen a group with a strong senior spine. Son remains the headline, but the practical value for fans is that the team identity is clearer before travel plans and watch-party schedules harden."
      },
      {
        title: "The Mexico route",
        body: "Korea Republic open against Czechia at Estadio Guadalajara on June 11 and return to the same stadium to face Mexico on June 18. The final group match sends supporters to Estadio Monterrey for South Africa on June 24.",
        bullets: ["Two Guadalajara matches can simplify the first hotel block","Mexico v Korea Republic is likely to be the highest-pressure local-demand match","Monterrey should be treated as a separate trip segment"]
      },
      {
        title: "Why the Mexico match stands out",
        body: "A match against the co-host in Guadalajara will shape ticket demand, transport pressure and fan-zone atmosphere. Supporters should expect a bigger local crowd than a neutral-site match and plan arrival times accordingly."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users following Korea Republic should save Guadalajara as the base for the opening week, add a Monterrey transfer reminder and keep official squad updates pinned until final registration is confirmed."
      }
    ]
  },
  {
    slug: "japan-world-cup-squad-mitoma-fitness-watch",
    title: "Japan squad watch puts Mitoma's absence at the center of fan expectations",
    description: "Hajime Moriyasu has named Japan's 26-player World Cup squad, with Kaoru Mitoma missing out and several recently injured players included.",
    category: "Teams",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-18",
    image: "/assets/news/japan-world-cup-squad-mitoma-fitness-watch.png",
    sourceUrl: "https://www.fifa.com/en/articles/japan-squad-announcement",
    sourceLabel: "FIFA",
    summary:
      "Japan's World Cup squad brings both clarity and a major talking point. FIFA reported that Hajime Moriyasu named his 26-player group, leaving out injured Kaoru Mitoma while including Wataru Endo, Ko Itakura and Takehiro Tomiyasu before Group F matches in Dallas and Monterrey.",
    impact: ["Japan fans should reset lineup expectations without Mitoma in the squad","Dallas becomes the key base with Japan opening and closing the group there","Injury monitoring remains important because several included players are returning from issues"],
    sections: [
      {
        title: "The headline omission",
        body: "Mitoma missing out changes how many fans will imagine Japan attacking the tournament. The squad still carries serious experience, but one of the most recognizable wide threats will not be part of the group."
      },
      {
        title: "Dallas anchors the route",
        body: "Japan start against the Netherlands at Dallas Stadium on June 14, travel to Monterrey to face Tunisia on June 20, then return to Dallas to play Sweden on June 25. That makes Dallas the natural anchor city for many supporters.",
        bullets: ["June 14: Netherlands v Japan at Dallas Stadium","June 20: Tunisia v Japan at Monterrey Stadium","June 25: Japan v Sweden at Dallas Stadium"]
      },
      {
        title: "Why injury context matters",
        body: "Moriyasu included several players who have recently dealt with injuries or returns to fitness. Supporters should expect final training updates and match-one selection talk to affect watch-party energy and neutral interest."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users should pair Japan match alerts with city alerts. The best fan plan is Dallas base, Monterrey transfer, Dallas return, with flexible hotel and transport decisions around the middle match."
      }
    ]
  },
  {
    slug: "haiti-world-cup-squad-boston-return",
    title: "Haiti's World Cup squad turns a 52-year return into a Boston fan-planning moment",
    description: "Haiti have named their 26-player World Cup squad for a first finals appearance since 1974, with Johny Placide and Duckens Nazon among the leaders.",
    category: "Teams",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-18",
    image: "/assets/news/haiti-world-cup-squad-boston-return.png",
    sourceUrl: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/haiti-squad-announcement-sebastien-migne",
    sourceLabel: "FIFA",
    summary:
      "Haiti's first World Cup in 52 years now has a named squad. FIFA reported that Sebastien Migne selected a 26-player group led by Johny Placide, Ricardo Ade, Carlens Arcus, Leverton Pierre, Danley Jean Jacques and Duckens Nazon for Group C matches against Scotland, Brazil and Morocco.",
    impact: ["Haiti supporters should expect emotional demand around the opening match in Boston","The Brazil match in Los Angeles is likely to draw major neutral and diaspora interest","A three-city route means fans need separate travel blocks for Boston, Los Angeles and Atlanta"],
    sections: [
      {
        title: "A return with weight",
        body: "Haiti have not played at a World Cup since 1974, so this squad announcement is more than a roster note. It gives supporters, diaspora groups and neutral fans a concrete team list for one of the tournament's strongest comeback stories."
      },
      {
        title: "The route is demanding",
        body: "Haiti open against Scotland at Boston Stadium on June 13, then fly across the country to face Brazil at Los Angeles Stadium on June 19, before closing against Morocco at Atlanta Stadium on June 24.",
        bullets: ["Boston is the emotional opener and should be planned early","Los Angeles against Brazil can bring high ticket and hotel pressure","Atlanta closes the group and needs its own travel buffer"]
      },
      {
        title: "What fans should watch",
        body: "The squad includes established leaders and attackers who shaped qualification, but the bigger planning issue is momentum. If Haiti take anything from the opener, the Los Angeles and Atlanta legs could see a late surge in fan interest."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users should save Haiti as a full multi-city itinerary, not just a single emotional opener. Add refundable travel where possible, watch official ticket channels only and keep group-meetup plans near transit rather than stadium road traffic."
      }
    ]
  },
  {
    slug: "cote-divoire-world-cup-squad-bay-area-philadelphia",
    title: "Côte d'Ivoire squad news gives Philadelphia and Toronto fans a clearer route",
    description: "Emerse Fae has named Côte d'Ivoire's 26-player World Cup squad, with Ousmane Diomande, Franck Kessie and attacking depth leading the Elephants' return.",
    category: "Teams",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-18",
    image: "/assets/news/cote-divoire-world-cup-squad-bay-area-philadelphia.png",
    sourceUrl: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/cote-divoire-squad-announcement-emerse-fae",
    sourceLabel: "FIFA",
    summary:
      "Côte d'Ivoire's return to the World Cup has a confirmed squad. FIFA reported that Emerse Fae named a 26-player group featuring Ousmane Diomande, Franck Kessie, Simon Adingra, Amad Diallo, Nicolas Pepe and other pieces before two Philadelphia matches around a Toronto test against Germany.",
    impact: ["Côte d’Ivoire fans can treat Philadelphia as the main base for the opening and closing group matches","The Germany match in Toronto adds border and travel complexity to the middle of the route","The squad has enough attacking names to draw neutral interest in Group E"],
    sections: [
      {
        title: "The squad signal",
        body: "Fae has selected a team that arrives with the confidence of continental success and the pressure of a 12-year World Cup absence. The list includes defensive strength, midfield control and multiple attacking options for a group with Ecuador, Germany and Curaçao."
      },
      {
        title: "Philadelphia as the base",
        body: "Côte d'Ivoire open against Ecuador at Philadelphia Stadium on June 14 and return there to face Curaçao on June 25. In between, they travel to Toronto Stadium for Germany on June 20.",
        bullets: ["Two Philadelphia matches make the city the logical fan base","Toronto adds an international travel leg","The Germany match is likely to carry the highest neutral demand"]
      },
      {
        title: "What fans should watch",
        body: "The squad announcement lets supporters move from general excitement to practical planning. Watch for final registration updates, but the route itself is now clear enough for hotel windows, train or flight decisions and watch-party organization."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users should save Philadelphia for both bookend matches and create a separate Toronto checklist with passport, lodging and return-trip reminders. The group route rewards early planning because one missed border or transport detail can affect two match days."
      }
    ]
  },

  {
    slug: "belgium-world-cup-squad-lukaku-core",
    title: "Belgium names experienced World Cup squad with Lukaku in the core",
    description: "Rudi Garcia has named Belgium's 26-player World Cup squad, leaning on Lukaku, De Bruyne, Courtois and other senior names for Group G.",
    category: "Teams",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-17",
    image: "/assets/news/belgium-world-cup-squad-lukaku-core.png",
    sourceUrl: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/belgium-squad-garcia-lukaku-named",
    sourceLabel: "FIFA",
    summary:
      "Belgium's World Cup picture is clearer after Rudi Garcia named a 26-player squad built around the country's senior core. FIFA reported that Romelu Lukaku, Kevin De Bruyne, Thibaut Courtois, Thomas Meunier and Axel Witsel are included, with Belgium preparing for Group G matches against Egypt, IR Iran and New Zealand.",
    impact: ["Belgium fans can now anchor travel plans around a largely familiar squad","Seattle, Los Angeles and Vancouver matches gain clearer player storylines","Lukaku's fitness and form will shape expectations before Group G begins"],
    sections: [
      {
        title: "The squad signal",
        body: "Garcia has chosen continuity rather than a sharp reset. The headline is not just that Belgium has named stars; it is that several long-serving players remain central to the plan even as the team tries to manage age, recent injuries and a changing competitive identity."
      },
      {
        title: "Why Lukaku still matters",
        body: "Lukaku's inclusion gives Belgium a clear focal point in attack. For traveling supporters, that affects more than prediction debates: it shapes which matches feel like must-see fixtures, how fan groups build pre-match energy and what neutral fans may expect from Belgium's group-stage style.",
        bullets: ["Belgium open against Egypt at Seattle Stadium on June 15","They face IR Iran at Los Angeles Stadium on June 21","Their group stage closes against New Zealand at BC Place Vancouver on June 26"]
      },
      {
        title: "Planning around Group G",
        body: "The three-city route gives Belgian supporters a demanding West Coast itinerary. Fans following the team need to think beyond match tickets: Seattle-to-Los Angeles and Los Angeles-to-Vancouver movement, hotel buffers, border timing for Canada and recovery days all become part of the football plan."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users tracking Belgium should save the Group G route now and add flexible travel reminders around the Vancouver finale. A squad built around high-profile veterans can draw extra neutral demand, especially when Belgium play in host cities with strong international visitor traffic."
      }
    ]
  },
  {
    slug: "tunisia-world-cup-squad-khedira-rebuild",
    title: "Tunisia's World Cup squad points to a Lamouchi rebuild before Group F",
    description: "Sabri Lamouchi has named a much-changed Tunisia squad for the World Cup, with Rani Khedira among the notable new pieces before Group F.",
    category: "Teams",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-17",
    image: "/assets/news/tunisia-world-cup-squad-khedira-rebuild.png",
    sourceUrl: "https://www.fifa.com/en/articles/tunisia-squad-named-sabri-lamouchi",
    sourceLabel: "FIFA",
    summary:
      "Tunisia's World Cup squad carries a clear reset message. FIFA reported that Sabri Lamouchi has selected a 26-player group that differs sharply from the 2025 Africa Cup of Nations roster, with Rani Khedira set for his first official competitive Tunisia appearance and Group F matches waiting against Sweden, Japan and the Netherlands.",
    impact: ["Tunisia supporters should recheck player alerts and expected lineups","Monterrey becomes a two-match hub for Tunisia fans","The Kansas City match against the Netherlands could carry major travel demand"],
    sections: [
      {
        title: "A changed squad",
        body: "Lamouchi has not simply rolled forward the last tournament group. The inclusion of new profiles, including Khedira, shows Tunisia trying to refresh parts of the team before entering a group that requires different types of match plans."
      },
      {
        title: "The Group F route",
        body: "Tunisia's first two matches are both in Monterrey, against Sweden on June 14 and Japan on June 20. The third match sends fans to Kansas City for Tunisia against the Netherlands on June 25, a move that turns this campaign into both a football and travel-planning challenge.",
        bullets: ["Back-to-back Monterrey matches can simplify hotel planning","Kansas City requires a separate transport and accommodation block","Fans should watch official team updates before locking watch-party plans"]
      },
      {
        title: "What fans should watch",
        body: "The practical question is how quickly Tunisia's newer pieces settle. Squad changes can alter formation, set-piece roles and captaincy dynamics, which affects how supporters interpret warm-up news and whether a group-stage lineup is stable or still being tested."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users following Tunisia should treat Monterrey as a base and Kansas City as a separate trip segment. Save both stadium routes, monitor official squad confirmation on June 2 and avoid assuming Africa Cup of Nations lineups still describe this team."
      }
    ]
  },
  {
    slug: "philadelphia-fan-festival-parking-permits",
    title: "Philadelphia adds parking permits around its World Cup Fan Festival",
    description: "Axios reports that Philadelphia will require special permits near Lemon Hill as the city's World Cup Fan Festival prepares for daily crowds.",
    category: "Transport",
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-17",
    image: "/assets/news/philadelphia-fan-festival-parking-permits.png",
    sourceUrl: "https://www.axios.com/local/philadelphia/2026/05/13/world-cup-parking-restrictions-lemon-hill-fan-festival",
    sourceLabel: "Axios Philadelphia",
    summary:
      "Philadelphia is moving from general Fan Festival planning to neighborhood-level traffic control. Axios Philadelphia reported that non-resident vehicles parking near Lemon Hill will need a special permit from June 11 through July 19, with the festival expected to draw roughly 15,000 to 20,000 people per day in Fairmount Park.",
    impact: ["Fans should avoid driving directly to Lemon Hill unless they have a confirmed plan","Residents and local businesses need permit steps before June 11","Transit, rideshare and walking routes will matter for all 39 tournament days"],
    sections: [
      {
        title: "The new restriction",
        body: "The permit zone is designed to keep tournament traffic from overwhelming residential streets around Fairmount Park. Axios reported that the zone will cover parts of Fairmount and Brewerytown, with increased patrols and possible towing for violations."
      },
      {
        title: "Why this matters for fans",
        body: "Philadelphia's Fan Festival is one of the biggest no-ticket World Cup experiences in the United States because it runs for the full tournament. That makes parking pressure a daily issue, not a one-off match-day problem around Lincoln Financial Field.",
        bullets: ["Plan around SEPTA, PHLASH, rideshare or walking connections","Do not assume side-street parking will be available near Lemon Hill","Leave extra time for security screening and festival entry"]
      },
      {
        title: "Resident impact",
        body: "The system also affects locals. Residents with regular parking permits still need special approval, and businesses can request visitor day passes. That means fans staying with friends or short-term rentals near the festival should confirm parking rules before arrival."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users should save the Fan Festival as a transit-first destination. If the plan includes a match at the South Philadelphia stadium and a Lemon Hill visit on the same day, treat them as separate mobility zones and avoid relying on a single parking strategy."
      }
    ]
  },
  {
    slug: "los-angeles-fan-fest-neighborhood-zones",
    title: "Los Angeles World Cup fan zones spread beyond the Coliseum",
    description: "El Pais reports that Los Angeles will pair a paid Coliseum Fan Festival with neighborhood fan zones across the region during the World Cup.",
    category: "Fan Experience",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-17",
    image: "/assets/news/los-angeles-fan-fest-neighborhood-zones.png",
    sourceUrl: "https://elpais.com/us/2026-05-15/los-angeles-enciende-la-fiebre-mundialista-con-zonas-fan-fest-ubicadas-en-la-playa-y-recintos-iconicos-de-la-ciudad.html",
    sourceLabel: "El Pais US",
    summary:
      "Los Angeles is taking a hybrid approach to World Cup watching. El Pais US reported that the official FIFA Fan Festival at the Los Angeles Memorial Coliseum will run June 11-14 with paid entry, while a wider network of neighborhood fan zones will bring match broadcasts and cultural programming to sites such as Original Farmers Market, Union Station, Hansen Dam, Magic Johnson Park, Venice Beach and Fairplex.",
    impact: ["Fans should choose between the paid Coliseum opener and free neighborhood events","Neighborhood dates differ, so not every zone works for every match","Beach, transit hub and park locations require different transport plans"],
    sections: [
      {
        title: "The hybrid model",
        body: "Los Angeles is not relying on one central public-viewing site for the full tournament. The opening stretch is built around the Coliseum, while later dates spread across the region. That gives fans more options but also makes planning more fragmented."
      },
      {
        title: "What is confirmed",
        body: "El Pais listed neighborhood sites including Original Farmers Market from June 18-21, Union Station from June 25-28, Hansen Dam Lake from July 2-5, Magic Johnson Park from July 4-5, Whittier Narrows from July 9-11, Venice Beach on July 11 and Fairplex across selected dates in mid-July.",
        bullets: ["The Coliseum Fan Festival covers the opening window","Community zones extend the experience after the official opener","Fans should match each zone to its active dates before traveling"]
      },
      {
        title: "Why it matters for visitors",
        body: "Los Angeles distances can turn a casual watch-party choice into a major logistics decision. A beach event, a Union Station event and a Fairplex event are not interchangeable, especially for fans also planning SoFi Stadium match days in Inglewood."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users should save Los Angeles watch sites by date, not just by name. The best plan is to pair each fan zone with a transit route, a realistic rideshare pickup area and a backup venue in case capacity or security lines change the day."
      }
    ]
  },
  {
    slug: "vancouver-fan-festival-express-bus-plan",
    title: "Vancouver points fans to an express bus for the Hastings Park Fan Festival",
    description: "Vancouver 2026 says the Fan Festival Express bus will link SkyTrain stations with Hastings Park during peak World Cup viewing periods.",
    category: "Transport",
    publishedAt: "2026-05-17",
    updatedAt: "2026-05-17",
    image: "/assets/news/vancouver-fan-festival-express-bus-plan.png",
    sourceUrl: "https://www.vancouverfwc26.ca/know-before-you-go/getting-to-fifa-fan-festival",
    sourceLabel: "Vancouver 2026",
    summary:
      "Vancouver's official Fan Festival guidance is now detailed enough for practical route planning. The host committee says the free-to-enter Hastings Park festival will be served by the 11 Fan Festival Express bus from 29th Avenue SkyTrain Station and Renfrew Station, running every five minutes during peak hours, with limited parking and early arrival recommended.",
    impact: ["Fans should enter PNE, not a nonexistent Hastings Park SkyTrain stop, as the destination","The express bus makes SkyTrain-to-festival transfers central to the plan","Bag limits and arrival buffers matter for high-demand matches and concerts"],
    sections: [
      {
        title: "The transit route",
        body: "The key instruction is simple: use SkyTrain, then transfer to the dedicated express bus. Vancouver 2026 says service will run from 29th Avenue on the Expo Line and Renfrew on the Millennium Line to the PNE grounds at Hastings Park."
      },
      {
        title: "Why early arrival matters",
        body: "The guidance recommends arriving at least one hour before match broadcasts and live performances for free viewing areas. Fans with amphitheatre tickets are advised to arrive 30 to 60 minutes before kickoff. Those windows matter because security screening, capacity and transfer queues can all stack up.",
        bullets: ["Use transit, walking, biking, taxi, ride-hailing or carpooling where possible","Expect limited parking at the festival site","Check bag dimensions and prohibited items before leaving"]
      },
      {
        title: "Festival versus stadium days",
        body: "Vancouver's match stadium and Fan Festival are not the same trip. BC Place sits near downtown SkyTrain access, while the PNE site requires a separate Hastings Park plan. Fans trying to do both in one day should treat the transfer as a real itinerary leg."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users should save the PNE as the Fan Festival destination, add the preferred SkyTrain station, and keep a backup arrival route for Canada matches or major concerts. The practical win is avoiding a last-minute search for parking near Hastings Park."
      }
    ]
  },
  {
    slug: "dallas-world-cup-transport-mobility-maps",
    title: "Dallas publishes World Cup mobility maps for stadium, Fan Festival and IBC trips",
    description: "Dallas 2026 is pointing fans to GoPass, transit links, road closures and pedestrian-priority corridors across North Texas.",
    category: "Transport",
    publishedAt: "2026-05-17",
    updatedAt: "2026-05-17",
    image: "/assets/news/dallas-world-cup-transport-mobility-maps.png",
    sourceUrl: "https://www.dallasfwc26.com/dallas-2026/transportation-mobility/",
    sourceLabel: "Dallas 2026",
    summary:
      "Dallas 2026 has turned its regional mobility plan into a fan-facing planning page. The host committee highlights GoPass for transit ticketing and trip planning, maps connecting Dallas Stadium, Fair Park's FIFA Fan Festival, the International Broadcast Center, rail lines and walking routes, and notes downtown Dallas road closures tied to tournament operations.",
    impact: ["Fans should separate Arlington stadium trips from Dallas Fan Festival trips","GoPass becomes the main digital planning tool for regional transit","Downtown road closures can affect hotels, media areas and rideshare timing"],
    sections: [
      {
        title: "What Dallas is telling fans",
        body: "The Dallas page frames mobility as a regional system rather than a single stadium route. Matches are in Arlington, the Fan Festival is at Fair Park in Dallas, the International Broadcast Center is downtown and team base camps sit in other North Texas locations."
      },
      {
        title: "The GoPass role",
        body: "GoPass is presented as the digital tool for tickets, route planning, live vehicle tracking and service alerts across agencies such as DART, Trinity Metro and DCTA. For visitors, that matters because a match-day plan may cross multiple transit systems.",
        bullets: ["Install and test GoPass before the first match day","Check stadium, fan festival and hotel routes separately","Watch for downtown closures from late May through late July"]
      },
      {
        title: "Road closures and priority corridors",
        body: "Dallas 2026 says the maps show planned road closures, special transit services and pedestrian-priority corridors. One downtown note says FIFA plans to fully close Griffin Street between Canton Street and Ceremonial Drive from May 26 until July 23."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users should avoid saving one generic Dallas route for everything. The practical setup is three saved places: Dallas Stadium, Fair Park Fan Festival and the downtown IBC area, each with its own transit option, rideshare backup and walking segment."
      }
    ]
  },

  {
    slug: "world-cup-scam-warning-ticket-travel-apps",
    title: "World Cup scam warnings now include tickets, hotels and transport apps",
    description: "Kaspersky warnings reported by TechRadar show scammers targeting World Cup fans with fake tickets, accommodation offers, transport apps and business emails.",
    category: "Safety",
    publishedAt: "2026-05-16",
    updatedAt: "2026-05-17",
    image: "/assets/news/world-cup-scam-warning-ticket-travel-apps.png",
    sourceUrl: "https://www.techradar.com/pro/security/one-month-out-from-the-world-cup-and-scammers-are-already-targeting-fans-heres-what-to-look-out-for",
    sourceLabel: "TechRadar",
    summary:
      "A new TechRadar report says Kaspersky is seeing World Cup 2026 scam activity aimed at fans heading to Mexico, the United States and Canada. The warning covers fake ticket offers, accommodation traps, bogus transport apps, dark-web travel deals and business partnership emails that use tournament urgency to extract money or credentials.",
    impact: ["Use official ticket and resale channels before trusting discounts", "Verify hotel, transport and app links before entering payment data", "Treat unsolicited World Cup partnership emails as high-risk"],
    sections: [
      {
        title: "What scammers are targeting",
        body: "The latest warning is not limited to fake match tickets. TechRadar reported that Kaspersky has seen scams tied to accommodation searches, stadium transport and discounted travel packages, including offers that look cheaper than normal flights, hotels or match access. That mix matters because World Cup planning pushes fans to make several expensive decisions at once."
      },
      {
        title: "Why fans are vulnerable close to kickoff",
        body: "The tournament starts on June 11, 2026, so many supporters are now filling gaps in their itinerary under time pressure. Scammers use that urgency: a fake app can promise prizes, a fake listing can copy hotel language and a fake seller can claim that a cheaper ticket will disappear within minutes.",
        bullets: ["Do not enter credentials after clicking a prize or discount prompt", "Check booking domains directly instead of through forwarded links", "Keep payment proof and official ticket records separate from screenshots"]
      },
      {
        title: "Business scams are part of the same risk",
        body: "Kaspersky also warned that criminals are approaching companies with fake World Cup partnership or supplier opportunities. That creates a second layer of risk for bars, hotels, vendors and local businesses that want to participate in the tournament economy but may not recognize a fabricated contractor or airline pitch."
      },
      {
        title: "CupMate planning note",
        body: "CupMate users should treat safety checks as part of match-day planning, not as an afterthought. The safest workflow is to start from official ticketing, confirm every travel vendor independently, avoid social-media sellers and save a clean paper trail before adding a booking to the itinerary."
      }
    ]
  },
  {
    slug: "dutch-fans-kansas-city-march-warning",
    title: "Kansas City police warn Dutch fans not to march nine miles to Arrowhead",
    description: "KCPD says Dutch supporters should not walk from the Kansas City Fan Fest to Arrowhead Stadium for the Netherlands-Tunisia World Cup match.",
    category: "Transport",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-17",
    image: "/assets/news/dutch-fans-kansas-city-march-warning.png",
    sourceUrl: "https://www.axios.com/local/kansas-city/2026/05/15/dutch-fans-march-arrowhead-kcpd-world-cup",
    sourceLabel: "Axios Kansas City",
    summary:
      "Axios Kansas City reported that local police are warning Dutch supporters not to try a traditional Oranje fan march from downtown Kansas City to Arrowhead Stadium. The Netherlands play Tunisia there on June 25, but the Fan Fest-to-stadium route is about nine miles and would likely push fans toward I-70 instead of a normal one-hour city walk.",
    impact: ["Dutch fans should plan shuttle or organized transport, not a full walk", "Kansas City Stadium match days need realistic time buffers", "Fan traditions may be adapted to local road and safety conditions"],
    sections: [
      {
        title: "The warning",
        body: "Dutch supporters are famous for orange fan walks, but Kansas City's geography makes this one different. Axios reported that KCPD Chief Stacey Graves said the department is ready for large crowds but called a downtown-to-Arrowhead walk a bad idea for safety reasons."
      },
      {
        title: "Why the route is different",
        body: "A typical Dutch march can move from a city center to a stadium in roughly an hour. In Kansas City, Axios reported that the Fan Fest-to-stadium distance is about nine miles, with the easiest route running along I-70. Graves estimated that walking could take roughly three and a half hours.",
        bullets: ["Do not assume European fan-walk timing applies in Kansas City", "Check official shuttle and stadium access guidance before match day", "Choose a downtown meeting point that still connects to transport"]
      },
      {
        title: "The match-day context",
        body: "The Netherlands play their first two group matches in Arlington and Houston before facing Tunisia in Kansas City on June 25. Axios also noted that Dutch fan culture could bring thousands of orange-clad supporters, which makes the transport plan a crowd-management issue as much as a convenience issue."
      },
      {
        title: "CupMate planning note",
        body: "Fans can still preserve the pre-match atmosphere without turning the route into a safety problem. The practical plan is to use Fan Fest for the gathering, follow official transport for the stadium leg and leave enough time for security, queues and post-match dispersal."
      }
    ]
  },
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
