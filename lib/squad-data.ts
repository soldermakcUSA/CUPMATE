export type SquadPlayer = {
  name: string;
  position: "GK" | "DF" | "MF" | "FW";
  club: string;
  photo?: string;
};

export type TeamSquad = {
  teamCode: string;
  status: string;
  note: string;
  sourceLabel: string;
  sourceUrl: string;
  players: SquadPlayer[];
};

export const squadCoverage = {
  generatedAt: "2026-05-14T20:57:02.040Z",
  sourceUrl: "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
  fifaNoteUrl: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/squad-lists-number-date",
  teamCount: 48,
  playerCount: 1252
};

const squads: Record<string, TeamSquad> = {
  "ALG": {
    "teamCode": "ALG",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Farid Chaâl",
        "position": "GK",
        "club": "CR Belouizdad"
      },
      {
        "name": "Rayane Yesli",
        "position": "GK",
        "club": "HFX Wanderers",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Rayane_Yesli.jpg/330px-Rayane_Yesli.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mohamed Idir Hadid",
        "position": "GK",
        "club": "JS Kabylie"
      },
      {
        "name": "Houari Baouche",
        "position": "DF",
        "club": "CS Constantine"
      },
      {
        "name": "Naoufel Khacef",
        "position": "DF",
        "club": "CR Belouizdad"
      },
      {
        "name": "Youcef Atal",
        "position": "DF",
        "club": "Al-Sadd",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Youcef_Atal.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Abdelkader Bedrane",
        "position": "DF",
        "club": "Damac",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Alg%C3%A9rie-Sierraleone_%285%29_%28cropped%29_-_Abdelkader_Bedrane.jpg/330px-Alg%C3%A9rie-Sierraleone_%285%29_%28cropped%29_-_Abdelkader_Bedrane.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Réda Halaïmia",
        "position": "DF",
        "club": "MC Alger"
      },
      {
        "name": "Mohamed Amine Tougai",
        "position": "DF",
        "club": "Espérance de Tunis",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mohamed_Amine_Tougai.jpg/330px-Mohamed_Amine_Tougai.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Achref Abada",
        "position": "DF",
        "club": "ASO Chlef"
      },
      {
        "name": "Reda Benchaa",
        "position": "DF",
        "club": "JS Kabylie"
      },
      {
        "name": "Sofiane Bendebka",
        "position": "MF",
        "club": "Al-Fateh"
      },
      {
        "name": "Zakaria Draoui",
        "position": "MF",
        "club": "USM Alger"
      },
      {
        "name": "Victor Lekhal",
        "position": "MF",
        "club": "Al-Qadsia",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Lens_B_-_Le_Havre_B_%2813-08-2016%29_40_%28cropped%29.jpg/330px-Lens_B_-_Le_Havre_B_%2813-08-2016%29_40_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Houssem Eddine Mrezigue",
        "position": "MF",
        "club": "Dynamo Makhachkala",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Houssem_Merizegue.jpg/330px-Houssem_Merizegue.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Adil Boulbina",
        "position": "FW",
        "club": "Al-Duhail",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Adel_Boulbina.jpg/330px-Adel_Boulbina.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Yassine Benzia",
        "position": "FW",
        "club": "Al-Fayha",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/U-19_EC-Qualifikation_Austria_vs._France_2013-06-10_%28120%29.jpg/330px-U-19_EC-Qualifikation_Austria_vs._France_2013-06-10_%28120%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Amir Sayoud",
        "position": "FW",
        "club": "Al-Hazem",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Amir_Sayoud.jpg/330px-Amir_Sayoud.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Yacine Brahimi",
        "position": "FW",
        "club": "Al-Gharafa",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Alg%C3%A9rie_-_Arm%C3%A9nie_-_20140531_-_Yacine_Brahimi.jpg/330px-Alg%C3%A9rie_-_Arm%C3%A9nie_-_20140531_-_Yacine_Brahimi.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Islam Slimani",
        "position": "FW",
        "club": "CFR Cluj",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Alg%C3%A9rie_-_Arm%C3%A9nie_-_20140531_-_Islam_Slimani_%28cropped%29.jpg/330px-Alg%C3%A9rie_-_Arm%C3%A9nie_-_20140531_-_Islam_Slimani_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Rafik Guitane",
        "position": "FW",
        "club": "Estoril Praia"
      },
      {
        "name": "Redouane Berkane",
        "position": "FW",
        "club": "Al-Wakrah"
      },
      {
        "name": "Adam Ounas",
        "position": "FW",
        "club": "Al-Sailiya",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Adam_Ounas1.jpg/330px-Adam_Ounas1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  "ARG": {
    "teamCode": "ARG",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Geronimo Rulli",
        "position": "GK",
        "club": "Marseille"
      },
      {
        "name": "Walter Benitez",
        "position": "GK",
        "club": "Crystal Palace"
      },
      {
        "name": "Nicolas Otamendi",
        "position": "DF",
        "club": "Benfica"
      },
      {
        "name": "Nicolas Tagliafico",
        "position": "DF",
        "club": "Lyon"
      },
      {
        "name": "Cristian Romero",
        "position": "DF",
        "club": "Tottenham Hotspur",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Cristian_Romero_WC2022.jpg/330px-Cristian_Romero_WC2022.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Juan Foyth",
        "position": "DF",
        "club": "Villarreal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Juan_Foyth_2017.jpg/330px-Juan_Foyth_2017.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Valentin Barco",
        "position": "DF",
        "club": "Strasbourg"
      },
      {
        "name": "Marcos Senesi",
        "position": "DF",
        "club": "Bournemouth",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Marcos_Senesi_2022.jpg/330px-Marcos_Senesi_2022.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kevin Mac Allister",
        "position": "DF",
        "club": "Union SG",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Go_Ahead_Eagles_-_Royale_Union_Saint-Gillloise_-_53852891619_%28Kevin_Mac_Allister%29.jpg/330px-Go_Ahead_Eagles_-_Royale_Union_Saint-Gillloise_-_53852891619_%28Kevin_Mac_Allister%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Rodrigo De Paul",
        "position": "MF",
        "club": "Inter Miami",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Rodrigo_De_Paul_NYCFC_Miami_24_Sep_2025-018_%28cropped%29.jpg/330px-Rodrigo_De_Paul_NYCFC_Miami_24_Sep_2025-018_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Leandro Paredes",
        "position": "MF",
        "club": "Boca Juniors",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Leandro_Paredes_2018_%28cropped%29.jpg/330px-Leandro_Paredes_2018_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Giovani Lo Celso",
        "position": "MF",
        "club": "Real Betis",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/2020-03-10_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League_Achtelfinale%2C_RB_Leipzig_-_Tottenham_Hotspur_1DX_3705_by_Stepro.jpg/330px-2020-03-10_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League_Achtelfinale%2C_RB_Leipzig_-_Tottenham_Hotspur_1DX_3705_by_Stepro.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alexis Mac Allister",
        "position": "MF",
        "club": "Liverpool",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Alexis_Mac_Allister_04012026_%281%29.jpg/330px-Alexis_Mac_Allister_04012026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Thiago Almada",
        "position": "MF",
        "club": "Atletico Madrid",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Almada_asse_ol_2425.png/330px-Almada_asse_ol_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nico Paz",
        "position": "MF",
        "club": "Como",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Nico_Paz_Como_2025.jpg/330px-Nico_Paz_Como_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Emiliano Buendia",
        "position": "MF",
        "club": "Aston Villa"
      },
      {
        "name": "Maximo Perrone",
        "position": "MF",
        "club": "Como"
      },
      {
        "name": "Lionel Messi",
        "position": "FW",
        "club": "Inter Miami",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg/330px-Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Lautaro Martinez",
        "position": "FW",
        "club": "Internazionale"
      },
      {
        "name": "Nicolas Gonzalez",
        "position": "FW",
        "club": "Atletico Madrid"
      },
      {
        "name": "Jose Manuel Lopez",
        "position": "FW",
        "club": "Palmeiras"
      },
      {
        "name": "Joaquin Panichelli",
        "position": "FW",
        "club": "Strasbourg"
      },
      {
        "name": "Gianluca Prestianni",
        "position": "FW",
        "club": "Benfica"
      }
    ]
  },
  "AUS": {
    "teamCode": "AUS",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Mathew Ryan",
        "position": "GK",
        "club": "Levante",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ryan_rcl_asse_2425.png/330px-Ryan_rcl_asse_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Paul Izzo",
        "position": "GK",
        "club": "Randers",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Paul_Izzo_training_for_Melbourne_Victory_December_2022_%28cropped%29.jpg/330px-Paul_Izzo_training_for_Melbourne_Victory_December_2022_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Patrick Beach",
        "position": "GK",
        "club": "Melbourne City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/2/21/PatrickBeachvWSW_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Milos Degenek",
        "position": "DF",
        "club": "TSC"
      },
      {
        "name": "Lewis Miller",
        "position": "DF",
        "club": "Blackburn Rovers"
      },
      {
        "name": "Callum Elder",
        "position": "DF",
        "club": "Derby County"
      },
      {
        "name": "Kai Trewin",
        "position": "DF",
        "club": "Melbourne City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kai_Trewin_NYCFC_v_Colorado_Mar_14_2026-25_%28cropped%29.jpg/330px-Kai_Trewin_NYCFC_v_Colorado_Mar_14_2026-25_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jason Geria",
        "position": "DF",
        "club": "Albirex Niigata",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Geria_Victory_Training_May_2015_%28cropped%29.jpg/330px-Geria_Victory_Training_May_2015_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Cameron Burgess",
        "position": "DF",
        "club": "Swansea City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Cameron_Burgess_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "James Overy",
        "position": "DF",
        "club": "Manchester United"
      },
      {
        "name": "Jack Iredale",
        "position": "DF",
        "club": "Hibernian"
      },
      {
        "name": "Kye Rowles",
        "position": "DF",
        "club": "D.C. United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Kye_Rowles_NYCFC_vs_DC_United_on_Aug_30_2025-016_%28cropped%29.jpg/330px-Kye_Rowles_NYCFC_vs_DC_United_on_Aug_30_2025-016_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Connor Metcalfe",
        "position": "MF",
        "club": "FC St. Pauli",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/b/b2/4822293_AE7I6590_-_Connor_Metcalfe.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Aiden O'Neill",
        "position": "MF",
        "club": "New York City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Aiden_O%27Neill_CF_Montreal_NYCFC_6.28.25-034_%28cropped%29.jpg/330px-Aiden_O%27Neill_CF_Montreal_NYCFC_6.28.25-034_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Riley McGree",
        "position": "MF",
        "club": "Middlesbrough",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Riley_McGree.jpg/330px-Riley_McGree.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Max Balard",
        "position": "MF",
        "club": "NAC Breda"
      },
      {
        "name": "Cameron Devlin",
        "position": "MF",
        "club": "Heart of Midlothian"
      },
      {
        "name": "Paul Okon-Engstler",
        "position": "MF",
        "club": "Sydney FC"
      },
      {
        "name": "Jackson Irvine",
        "position": "MF",
        "club": "FC St. Pauli",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/6/66/4822293_AE7I6590_%28Jackson_Irvine%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Martin Boyle",
        "position": "FW",
        "club": "Hibernian",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/4822273_AE7I7255_-_Martin_Boyle.jpg/330px-4822273_AE7I7255_-_Martin_Boyle.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nestory Irankunda",
        "position": "FW",
        "club": "Watford",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Nestory_Irankunda_and_Kwadwo_Baah_09082025_%281%29_%28cropped%29.jpg/330px-Nestory_Irankunda_and_Kwadwo_Baah_09082025_%281%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mohamed Toure",
        "position": "FW",
        "club": "Randers"
      },
      {
        "name": "Al Hassan Toure",
        "position": "FW",
        "club": "Sydney FC"
      },
      {
        "name": "Craig Goodwin",
        "position": "FW",
        "club": "Adelaide United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Craig_Goodwin_ADL.jpg/330px-Craig_Goodwin_ADL.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nicholas D'Agostino",
        "position": "FW",
        "club": "Viking"
      }
    ]
  },
  "AUT": {
    "teamCode": "AUT",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Alexander Schlager",
        "position": "GK",
        "club": "Red Bull Salzburg",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/FC_Salzburg_vs._Atletico_Madrid_%282025-01-29_UEFA_Championsleague%29_47.jpg/330px-FC_Salzburg_vs._Atletico_Madrid_%282025-01-29_UEFA_Championsleague%29_47.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nikolas Polster",
        "position": "GK",
        "club": "Wolfsberger AC",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/FC_Red_Bull_Salzburg_gegen_Wolfsberger_AC_%282025-03-16_Bundesliga%29_64.jpg/330px-FC_Red_Bull_Salzburg_gegen_Wolfsberger_AC_%282025-03-16_Bundesliga%29_64.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Patrick Pentz",
        "position": "GK",
        "club": "Brondby",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Pentz_%282024%29.png/330px-Pentz_%282024%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nicolas Kristof",
        "position": "GK",
        "club": "Elversberg"
      },
      {
        "name": "Marco Friedl",
        "position": "DF",
        "club": "Werder Bremen",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Austria_national_under-21_football_team_-_Teamcamp_June_2017_%28053%29.jpg/330px-Austria_national_under-21_football_team_-_Teamcamp_June_2017_%28053%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kevin Danso",
        "position": "DF",
        "club": "Tottenham Hotspur",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Kevin_Danso_ASSE_RCL_2425.jpg/330px-Kevin_Danso_ASSE_RCL_2425.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Stefan Posch",
        "position": "DF",
        "club": "Como",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Austria_national_under-21_football_team_-_Teamcamp_June_2017_%28110%29.jpg/330px-Austria_national_under-21_football_team_-_Teamcamp_June_2017_%28110%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "David Alaba",
        "position": "DF",
        "club": "Real Madrid",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_David_Alaba_850_1632.jpg/330px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_David_Alaba_850_1632.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Leopold Querfeld",
        "position": "DF",
        "club": "Union Berlin",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Red_Bull_Salzburg_vs._SK_Rapid_Wien_%282022-09-18%29_25a_%28cropped%29_%28cropped%29.jpg/330px-FC_Red_Bull_Salzburg_vs._SK_Rapid_Wien_%282022-09-18%29_25a_%28cropped%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Philipp Lienhart",
        "position": "DF",
        "club": "SC Freiburg",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Austria_national_under-21_football_team_-_Teamcamp_June_2017_%28057%29.jpg/330px-Austria_national_under-21_football_team_-_Teamcamp_June_2017_%28057%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Phillipp Mwene",
        "position": "DF",
        "club": "Mainz 05",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Phillipp-mwene.jpg/330px-Phillipp-mwene.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alexander Prass",
        "position": "DF",
        "club": "TSG Hoffenheim",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/FC_Liefering_versus_WSG_Wattens_%2824._Mai_2019%29_06.jpg/330px-FC_Liefering_versus_WSG_Wattens_%2824._Mai_2019%29_06.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Xaver Schlager",
        "position": "MF",
        "club": "RB Leipzig",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Xaver_Schlager_850_1680.jpg/330px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Xaver_Schlager_850_1680.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nicolas Seiwald",
        "position": "MF",
        "club": "RB Leipzig",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Meisterteller%C3%BCbergabe_Saison_2021-22_%282022-05-21%29_49.jpg/330px-Meisterteller%C3%BCbergabe_Saison_2021-22_%282022-05-21%29_49.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Marcel Sabitzer",
        "position": "MF",
        "club": "Borussia Dortmund",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Marcel_Sabitzer_2020_%28cropped%29.jpg/330px-Marcel_Sabitzer_2020_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Florian Grillitsch",
        "position": "MF",
        "club": "Braga",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/20180602_AUTGER_4687_%28cropped%29_Florian_Grillitsch.jpg/330px-20180602_AUTGER_4687_%28cropped%29_Florian_Grillitsch.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Marco Grull",
        "position": "MF",
        "club": "Werder Bremen"
      },
      {
        "name": "Romano Schmid",
        "position": "MF",
        "club": "Werder Bremen",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/UEFA_Euro_2023_Qualifiers_Austria_vs._Finland_%282022-06-03%29_30.jpg/330px-UEFA_Euro_2023_Qualifiers_Austria_vs._Finland_%282022-06-03%29_30.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Christoph Baumgartner",
        "position": "MF",
        "club": "RB Leipzig",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Austria_national_under-21_football_team_-_Teamcamp_October_2019_%2861%29_%28cropped%29.jpg/330px-Austria_national_under-21_football_team_-_Teamcamp_October_2019_%2861%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Konrad Laimer",
        "position": "MF",
        "club": "Bayern Munich",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/2022-07-21_Fu%C3%9Fball%2C_M%C3%A4nner%2CFreundschaftsspiel%2C_RB_Leipzig_-_FC_Liverpool_1DX_2137_by_Stepro_%28cropped%29.jpg/330px-2022-07-21_Fu%C3%9Fball%2C_M%C3%A4nner%2CFreundschaftsspiel%2C_RB_Leipzig_-_FC_Liverpool_1DX_2137_by_Stepro_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Patrick Wimmer",
        "position": "MF",
        "club": "VfL Wolfsburg",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/U19_Austria_vs._Ireland%2819._November_2019_%29_42.jpg/330px-U19_Austria_vs._Ireland%2819._November_2019_%29_42.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alessandro Schopf",
        "position": "MF",
        "club": "Wolfsberger AC"
      },
      {
        "name": "Marko Arnautovic",
        "position": "FW",
        "club": "Red Star Belgrade"
      },
      {
        "name": "Michael Gregoritsch",
        "position": "FW",
        "club": "Brondby",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Michael_Gregoritsch_U21_Austria_vs._Albania_2014-03-05_01.jpg/330px-Michael_Gregoritsch_U21_Austria_vs._Albania_2014-03-05_01.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nikolaus Wurmbrand",
        "position": "FW",
        "club": "Rapid Wien"
      },
      {
        "name": "Raul Florucz",
        "position": "FW",
        "club": "Union Saint-Gilloise"
      }
    ]
  },
  "BEL": {
    "teamCode": "BEL",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Senne Lammens",
        "position": "GK",
        "club": "Manchester United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Senne_Lammens_USMNT_v_Belgium_Mar_28_2026-98_%28cropped%29.jpg/330px-Senne_Lammens_USMNT_v_Belgium_Mar_28_2026-98_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mike Penders",
        "position": "GK",
        "club": "Strasbourg"
      },
      {
        "name": "Matz Sels",
        "position": "GK",
        "club": "Nottingham Forest",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Matz_Sels_USMNT_v_Belgium_Mar_28_2026-12_%28cropped%29.jpg/330px-Matz_Sels_USMNT_v_Belgium_Mar_28_2026-12_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Maarten Vandevoordt",
        "position": "GK",
        "club": "RB Leipzig",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Maarten_Vandevoordt_USMNT_v_Belgium_Mar_28_2026-26_%28cropped%29.jpg/330px-Maarten_Vandevoordt_USMNT_v_Belgium_Mar_28_2026-26_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Joaquin Seys",
        "position": "DF",
        "club": "Club Brugge",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/FC_Salzburg_gegen_Club_Br%C3%BCgge_%282025-08-06_Championsleague_Qualifikation_Dritte_Runde%29_63_%28Joaquin_Seys%29.jpg/330px-FC_Salzburg_gegen_Club_Br%C3%BCgge_%282025-08-06_Championsleague_Qualifikation_Dritte_Runde%29_63_%28Joaquin_Seys%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Arthur Theate",
        "position": "DF",
        "club": "Eintracht Frankfurt",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Arthur_Theate_USMNT_v_Belgium_Mar_28_2026-22_%28cropped%29.jpg/330px-Arthur_Theate_USMNT_v_Belgium_Mar_28_2026-22_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Brandon Mechele",
        "position": "DF",
        "club": "Club Brugge",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Brandon_Mechele_USMNT_v_Belgium_Mar_28_2026-78_%28cropped%29.jpg/330px-Brandon_Mechele_USMNT_v_Belgium_Mar_28_2026-78_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Maxim De Cuyper",
        "position": "DF",
        "club": "Brighton & Hove Albion",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Maxim_De_Cuyper_USMNT_v_Belgium_Mar_28_2026-79_%28cropped%29.jpg/330px-Maxim_De_Cuyper_USMNT_v_Belgium_Mar_28_2026-79_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Thomas Meunier",
        "position": "DF",
        "club": "Lille",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Thomas_Meunier_USMNT_v_Belgium_Mar_28_2026-16_%28cropped%29.jpg/330px-Thomas_Meunier_USMNT_v_Belgium_Mar_28_2026-16_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Koni De Winter",
        "position": "DF",
        "club": "Milan",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Koni_De_Winter_USMNT_v_Belgium_Mar_28_2026-36_%28cropped%29.jpg/330px-Koni_De_Winter_USMNT_v_Belgium_Mar_28_2026-36_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Timothy Castagne",
        "position": "DF",
        "club": "Fulham",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Timothy_Castagne_USMNT_v_Belgium_Mar_28_2026-17_%28cropped%29.jpg/330px-Timothy_Castagne_USMNT_v_Belgium_Mar_28_2026-17_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Axel Witsel",
        "position": "MF",
        "club": "Girona",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Axel_Witsel_USMNT_v_Belgium_Mar_28_2026-34_%28cropped%29.jpg/330px-Axel_Witsel_USMNT_v_Belgium_Mar_28_2026-34_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Diego Moreira",
        "position": "MF",
        "club": "Strasbourg",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Moreira2_asse_rcsa_2425.jpg/330px-Moreira2_asse_rcsa_2425.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Youri Tielemans",
        "position": "MF",
        "club": "Aston Villa",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Youri_Tielemans_USMNT_v_Belgium_Mar_28_2026-20_%28cropped%29.jpg/330px-Youri_Tielemans_USMNT_v_Belgium_Mar_28_2026-20_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Charles Vanhoutte",
        "position": "MF",
        "club": "Nice",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Charles_Vanhoutte_RUSG_2025.jpg/330px-Charles_Vanhoutte_RUSG_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Hans Vanaken",
        "position": "MF",
        "club": "Club Brugge",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Hans_Vanaken_Lommel_United.jpg/330px-Hans_Vanaken_Lommel_United.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nicolas Raskin",
        "position": "MF",
        "club": "Rangers",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Nicolas_Raskin_USMNT_v_Belgium_Mar_28_2026-14_%28cropped%29.jpg/330px-Nicolas_Raskin_USMNT_v_Belgium_Mar_28_2026-14_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Lois Openda",
        "position": "FW",
        "club": "Juventus"
      },
      {
        "name": "Leandro Trossard",
        "position": "FW",
        "club": "Arsenal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/RC_Lens_-_Arsenal_FC_%2803-10-2023%29_26_%28cropped%29.jpg/330px-RC_Lens_-_Arsenal_FC_%2803-10-2023%29_26_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jeremy Doku",
        "position": "FW",
        "club": "Manchester City"
      },
      {
        "name": "Dodi Lukebakio",
        "position": "FW",
        "club": "Benfica"
      },
      {
        "name": "Charles De Ketelaere",
        "position": "FW",
        "club": "Atalanta",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Charles_De_Ketelaere_USMNT_v_Belgium_Mar_28_2026-76_%28cropped%29.jpg/330px-Charles_De_Ketelaere_USMNT_v_Belgium_Mar_28_2026-76_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Romeo Vermant",
        "position": "FW",
        "club": "Club Brugge",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/FC_Salzburg_gegen_Club_Br%C3%BCgge_%282025-08-06_Championsleague_Qualifikation_Dritte_Runde%29_69_%28Romeo_Vermant%29.jpg/330px-FC_Salzburg_gegen_Club_Br%C3%BCgge_%282025-08-06_Championsleague_Qualifikation_Dritte_Runde%29_69_%28Romeo_Vermant%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alexis Saelemaekers",
        "position": "FW",
        "club": "Milan",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Alexis_Saelemaekers_USMNT_v_Belgium_Mar_28_2026-13_%28cropped%29.jpg/330px-Alexis_Saelemaekers_USMNT_v_Belgium_Mar_28_2026-13_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  "BRA": {
    "teamCode": "BRA",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Ederson",
        "position": "GK",
        "club": "Fenerbahce"
      },
      {
        "name": "Bento",
        "position": "GK",
        "club": "Al-Nassr"
      },
      {
        "name": "John Victor",
        "position": "GK",
        "club": "Nottingham Forest"
      },
      {
        "name": "Marquinhos",
        "position": "DF",
        "club": "Paris Saint-Germain",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/FC_Salzburg_gegen_Paris_Saint-Germain_UEFA_Champions_League_49_%28cropped%29.jpg/330px-FC_Salzburg_gegen_Paris_Saint-Germain_UEFA_Champions_League_49_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Danilo",
        "position": "DF",
        "club": "Flamengo"
      },
      {
        "name": "Alex Sandro",
        "position": "DF",
        "club": "Flamengo",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/FC_Zenit_Saint_Petersburg_vs._Juventus%2C_20_October_2021_28_-_Alex_Sandro_%28cropped2%29.jpg/330px-FC_Zenit_Saint_Petersburg_vs._Juventus%2C_20_October_2021_28_-_Alex_Sandro_%28cropped2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Eder Militao",
        "position": "DF",
        "club": "Real Madrid"
      },
      {
        "name": "Gabriel Magalhaes",
        "position": "DF",
        "club": "Arsenal"
      },
      {
        "name": "Fabricio Bruno",
        "position": "DF",
        "club": "Cruzeiro"
      },
      {
        "name": "Caio Henrique",
        "position": "DF",
        "club": "Monaco",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Caio_asse_asm_2425.png/330px-Caio_asse_asm_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Wesley",
        "position": "DF",
        "club": "Roma"
      },
      {
        "name": "Paulo Henrique",
        "position": "DF",
        "club": "Vasco da Gama"
      },
      {
        "name": "Luciano Juba",
        "position": "DF",
        "club": "Bahia"
      },
      {
        "name": "Casemiro",
        "position": "MF",
        "club": "Manchester United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Casemiro_Brazil_Austria_June_2018.jpg/330px-Casemiro_Brazil_Austria_June_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Lucas Paqueta",
        "position": "MF",
        "club": "West Ham United"
      },
      {
        "name": "Bruno Guimaraes",
        "position": "MF",
        "club": "Newcastle United"
      },
      {
        "name": "Fabinho",
        "position": "MF",
        "club": "Al-Ittihad"
      },
      {
        "name": "Andrey Santos",
        "position": "MF",
        "club": "Chelsea",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Santos_asse_rcsa_2425.jpg/330px-Santos_asse_rcsa_2425.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Richarlison",
        "position": "FW",
        "club": "Tottenham Hotspur",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/3/3d/Richarlison_%C3%A9_homenageado_na_ALES_%2810.July.2019%29_01_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Vinicius Junior",
        "position": "FW",
        "club": "Real Madrid"
      },
      {
        "name": "Rodrygo",
        "position": "FW",
        "club": "Real Madrid",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Rodrygo_2023_%28cropped%29.jpg/330px-Rodrygo_2023_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Matheus Cunha",
        "position": "FW",
        "club": "Manchester United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Matheus_Cunha_em_2021.jpg/330px-Matheus_Cunha_em_2021.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Estevao",
        "position": "FW",
        "club": "Chelsea"
      },
      {
        "name": "Luiz Henrique",
        "position": "FW",
        "club": "Zenit Saint Petersburg"
      },
      {
        "name": "Joao Pedro",
        "position": "FW",
        "club": "Chelsea"
      },
      {
        "name": "Vitor Roque",
        "position": "FW",
        "club": "Palmeiras",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Vitor-roque-palmeiras-internacional-sep2025.jpg/330px-Vitor-roque-palmeiras-internacional-sep2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  "CAN": {
    "teamCode": "CAN",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Dayne St. Clair",
        "position": "GK",
        "club": "Minnesota United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dayne_St._Clair_-_MNUFC_-_May_2025.jpg/330px-Dayne_St._Clair_-_MNUFC_-_May_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Maxime Crepeau",
        "position": "GK",
        "club": "Portland Timbers"
      },
      {
        "name": "Owen Goodman",
        "position": "GK",
        "club": "Huddersfield Town",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Owen_Goodman_15022025_%281%29_%28cropped%29.jpg/330px-Owen_Goodman_15022025_%281%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Zorhan Bassong",
        "position": "DF",
        "club": "Sporting Kansas City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/ZB_IMG_8512.jpg/330px-ZB_IMG_8512.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kamal Miller",
        "position": "DF",
        "club": "Portland Timbers",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Kamal_Miller_WC2022.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Joel Waterman",
        "position": "DF",
        "club": "Chicago Fire",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Joel_Waterman_Philadelphia_Chicago_10.26.25-025_%28cropped%29.jpg/330px-Joel_Waterman_Philadelphia_Chicago_10.26.25-025_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Derek Cornelius",
        "position": "DF",
        "club": "Rangers",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Cornelius_asse_om_2425.png/330px-Cornelius_asse_om_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Richie Laryea",
        "position": "DF",
        "club": "Toronto FC",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/CINvOCB_2017-05-13_-_Richie_Laryea_%2834525525311%29_%28cropped%29.jpg/330px-CINvOCB_2017-05-13_-_Richie_Laryea_%2834525525311%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Niko Sigur",
        "position": "DF",
        "club": "Hajduk Split"
      },
      {
        "name": "Alfie Jones",
        "position": "DF",
        "club": "Middlesbrough",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Alfie_Jones_16082025_%281%29.jpg/330px-Alfie_Jones_16082025_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mathieu Choiniere",
        "position": "MF",
        "club": "Los Angeles FC"
      },
      {
        "name": "Stephen Eustaquio",
        "position": "MF",
        "club": "Porto"
      },
      {
        "name": "Ismael Kone",
        "position": "MF",
        "club": "Sassuolo"
      },
      {
        "name": "Tajon Buchanan",
        "position": "MF",
        "club": "Villarreal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Tajon_Buchanan_WC2022.jpg/330px-Tajon_Buchanan_WC2022.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nathan Saliba",
        "position": "MF",
        "club": "Anderlecht",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Nathan-Dylan_Saliba_RSC_Anderlecht_2025.jpg/330px-Nathan-Dylan_Saliba_RSC_Anderlecht_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ali Ahmed",
        "position": "MF",
        "club": "Vancouver Whitecaps"
      },
      {
        "name": "Jonathan Osorio",
        "position": "MF",
        "club": "Toronto FC",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Jonathan_Osorio_2017.jpg/330px-Jonathan_Osorio_2017.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jayden Nelson",
        "position": "MF",
        "club": "Vancouver Whitecaps",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Jayden_Nelson_watching_match.jpeg/330px-Jayden_Nelson_watching_match.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Junior Hoilett",
        "position": "MF",
        "club": "Hibernian",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/David_Hoilett_WC2022.jpg/330px-David_Hoilett_WC2022.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Marcelo Flores TRP",
        "position": "MF",
        "club": "UANL"
      },
      {
        "name": "Cyle Larin",
        "position": "FW",
        "club": "Feyenoord",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Cyle_Larin_%282021-22_S%C3%BCper_Lig%29_-_Resim1_%28cropped%29.png/330px-Cyle_Larin_%282021-22_S%C3%BCper_Lig%29_-_Resim1_%28cropped%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jonathan David",
        "position": "FW",
        "club": "Juventus",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Jonathan_David_asse_losc_2425_%28cropped%29.jpg/330px-Jonathan_David_asse_losc_2425_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Tani Oluwaseyi",
        "position": "FW",
        "club": "Villarreal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Tani_O_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Promise David",
        "position": "FW",
        "club": "Union Saint-Gilloise",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Promise_David_Union_Saint-Gilloise_2025.jpg/330px-Promise_David_Union_Saint-Gilloise_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Theo Bair",
        "position": "FW",
        "club": "Lausanne-Sport"
      }
    ]
  },
  "CPV": {
    "teamCode": "CPV",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Vozinha",
        "position": "GK",
        "club": "Chaves"
      },
      {
        "name": "Marcio Rosa",
        "position": "GK",
        "club": "Montana"
      },
      {
        "name": "Bruno Varela",
        "position": "GK",
        "club": "Al-Hazem",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Varela_CSKA-Benfica_UCL201718.jpg/330px-Varela_CSKA-Benfica_UCL201718.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Stopira",
        "position": "DF",
        "club": "Torreense",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Cap-vert_vs_Ethiopi_%2825%29.jpg/330px-Cap-vert_vs_Ethiopi_%2825%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Diney",
        "position": "DF",
        "club": "Al Bataeh"
      },
      {
        "name": "Ricardo Santos",
        "position": "DF",
        "club": "Swansea City"
      },
      {
        "name": "Kelvin Pires",
        "position": "DF",
        "club": "SJK"
      },
      {
        "name": "Wagner Pina",
        "position": "DF",
        "club": "Trabzonspor"
      },
      {
        "name": "Sidny Lopes Cabral",
        "position": "DF",
        "club": "Estrela da Amadora"
      },
      {
        "name": "Jojo",
        "position": "DF",
        "club": "Vizela"
      },
      {
        "name": "David Moreira",
        "position": "DF",
        "club": "Sporting CP"
      },
      {
        "name": "Kevin Pina",
        "position": "MF",
        "club": "Krasnodar"
      },
      {
        "name": "Joao Paulo",
        "position": "MF",
        "club": "Otelul Galati"
      },
      {
        "name": "Jamiro Monteiro",
        "position": "MF",
        "club": "PEC Zwolle",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Jamiro_Monteiro_Philadelphia_Union_2019.jpg/330px-Jamiro_Monteiro_Philadelphia_Union_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Deroy Duarte",
        "position": "MF",
        "club": "Ludogorets Razgrad",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Deroy_Duarte_2026.jpg/330px-Deroy_Duarte_2026.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Laros Duarte",
        "position": "MF",
        "club": "Puskas Akademia"
      },
      {
        "name": "Telmo Arcanjo",
        "position": "MF",
        "club": "Vitoria de Guimaraes"
      },
      {
        "name": "Ailson Tavares",
        "position": "MF",
        "club": "Beitar Jerusalem"
      },
      {
        "name": "Dailon Livramento",
        "position": "FW",
        "club": "Casa Pia"
      },
      {
        "name": "Garry Rodrigues",
        "position": "FW",
        "club": "Apollon Limassol",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Cap-vert_vs_Ethiopi_%2824%29.jpg/330px-Cap-vert_vs_Ethiopi_%2824%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alessio da Cruz",
        "position": "FW",
        "club": "Athletic"
      },
      {
        "name": "Willy Semedo",
        "position": "FW",
        "club": "Omonia",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/RC_Lens_-_Grenoble_Foot_38_%2810-02-2020%29_70.jpg/330px-RC_Lens_-_Grenoble_Foot_38_%2810-02-2020%29_70.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Helio Varela",
        "position": "FW",
        "club": "Maccabi Tel Aviv"
      },
      {
        "name": "Ryan Mendes",
        "position": "FW",
        "club": "Igdir) (captain",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Ryan_Mendes_%28LOSC_Lille%29.JPG/330px-Ryan_Mendes_%28LOSC_Lille%29.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nuno da Costa",
        "position": "FW",
        "club": "Istanbul Basaksehir",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Valenciennes_-_UNFP_FC_%2802-07-2016%29_40_%28cropped%29.jpg/330px-Valenciennes_-_UNFP_FC_%2802-07-2016%29_40_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Heriberto Tavares",
        "position": "FW",
        "club": "Maccabi Netanya"
      }
    ]
  },
  "COL": {
    "teamCode": "COL",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "David Ospina",
        "position": "GK",
        "club": "Atletico Nacional",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/David_Ospina%2C_2015-05-31.JPG/330px-David_Ospina%2C_2015-05-31.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Camilo Vargas",
        "position": "GK",
        "club": "Atlas",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Camilo_Andres_Vargas.jpg/330px-Camilo_Andres_Vargas.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alvaro Montero",
        "position": "GK",
        "club": "Velez Sarsfield"
      },
      {
        "name": "Davinson Sanchez",
        "position": "DF",
        "club": "Galatasaray"
      },
      {
        "name": "Santiago Arias",
        "position": "DF",
        "club": "Bahia",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/3/3d/ATL-Madrid-Lokomotiv001-Arias.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Yerry Mina",
        "position": "DF",
        "club": "Cagliari",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/FWC_2018_-_Round_of_16_-_COL_v_ENG_-_Photo_103_%28cropped%29.jpg/330px-FWC_2018_-_Round_of_16_-_COL_v_ENG_-_Photo_103_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Daniel Munoz",
        "position": "DF",
        "club": "Crystal Palace"
      },
      {
        "name": "Johan Mojica",
        "position": "DF",
        "club": "Mallorca",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/FWC_2018_-_Round_of_16_-_COL_v_ENG_-_Photo_102_%28cropped%29_2.jpg/330px-FWC_2018_-_Round_of_16_-_COL_v_ENG_-_Photo_102_%28cropped%29_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jhon Lucumi",
        "position": "DF",
        "club": "Bologna"
      },
      {
        "name": "Carlos Cuesta",
        "position": "DF",
        "club": "Vasco da Gama"
      },
      {
        "name": "Alvaro Angulo",
        "position": "DF",
        "club": "UNAM"
      },
      {
        "name": "James Rodriguez",
        "position": "MF",
        "club": "León"
      },
      {
        "name": "Jefferson Lerma",
        "position": "MF",
        "club": "Crystal Palace",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Jefferson_Lerma_2018.png/330px-Jefferson_Lerma_2018.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jhon Arias",
        "position": "MF",
        "club": "Wolverhampton Wanderers"
      },
      {
        "name": "Richard Rios",
        "position": "MF",
        "club": "Benfica"
      },
      {
        "name": "Kevin Castano",
        "position": "MF",
        "club": "River Plate"
      },
      {
        "name": "Jorge Carrascal",
        "position": "MF",
        "club": "Flamengo",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Jorge_Carrascal_2025.jpg/330px-Jorge_Carrascal_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Yaser Asprilla",
        "position": "MF",
        "club": "Girona"
      },
      {
        "name": "Juan Portilla",
        "position": "MF",
        "club": "Talleres"
      },
      {
        "name": "Gustavo Puerta",
        "position": "MF",
        "club": "Racing de Santander",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/9/94/Gustavo_Puerta_2023_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Luis Diaz",
        "position": "FW",
        "club": "Bayern Munich"
      },
      {
        "name": "Rafael Santos Borre",
        "position": "FW",
        "club": "Internacional"
      },
      {
        "name": "Jhon Cordoba",
        "position": "FW",
        "club": "Krasnodar"
      },
      {
        "name": "Luis Suarez",
        "position": "FW",
        "club": "Sporting CP"
      },
      {
        "name": "Andres Gomez",
        "position": "FW",
        "club": "Vasco da Gama"
      },
      {
        "name": "Johan Carbonero",
        "position": "FW",
        "club": "Internacional"
      }
    ]
  },
  "CRO": {
    "teamCode": "CRO",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Dominik Livaković",
        "position": "GK",
        "club": "Girona"
      },
      {
        "name": "Ivica Ivušić",
        "position": "GK",
        "club": "Hajduk Split",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Ivica_Ivu%C5%A1i%C4%87_2022.jpg/330px-Ivica_Ivu%C5%A1i%C4%87_2022.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ivor Pandur",
        "position": "GK",
        "club": "Hull City"
      },
      {
        "name": "Joško Gvardiol",
        "position": "DF",
        "club": "Manchester City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2611_%28Jo%C5%A1ko_Gvardiol%29.jpg/330px-2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2611_%28Jo%C5%A1ko_Gvardiol%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Duje Ćaleta-Car",
        "position": "DF",
        "club": "Real Sociedad",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Caleta_asse_ol_2425.png/330px-Caleta_asse_ol_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Josip Šutalo",
        "position": "DF",
        "club": "Ajax",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/7/79/Qaraba%C4%9F_vs_Ajax_%2824.10.2024%29_%284%29_%28Josip_%C5%A0utalo%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Josip Stanišić",
        "position": "DF",
        "club": "Bayern Munich",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/6/64/Josip_Stani%C5%A1i%C4%87_during_an_Interview_in_2023.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Marin Pongračić",
        "position": "DF",
        "club": "Fiorentina",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Marin_Pongracic_2021.jpg/330px-Marin_Pongracic_2021.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Martin Erlić",
        "position": "DF",
        "club": "Midtjylland",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Martin-Erlic.png/330px-Martin-Erlic.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Luka Vušković",
        "position": "DF",
        "club": "Hamburger SV"
      },
      {
        "name": "Luka Modrić",
        "position": "MF",
        "club": "Milan) (captain",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Ofrenda_de_la_Liga_y_la_Champions-57-L.Mill%C3%A1n_%2852109310843%29_%28Luka_Modri%C4%87%29.jpg/330px-Ofrenda_de_la_Liga_y_la_Champions-57-L.Mill%C3%A1n_%2852109310843%29_%28Luka_Modri%C4%87%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mario Pašalić",
        "position": "MF",
        "club": "Atalanta",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/2/28/Pasalic_6459_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Nikola Vlašić",
        "position": "MF",
        "club": "Torino",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Nikola_Vla%C5%A1i%C4%87_%28CSKA_Moscow%2C_19.08.2019%29.jpg/330px-Nikola_Vla%C5%A1i%C4%87_%28CSKA_Moscow%2C_19.08.2019%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kristijan Jakić",
        "position": "MF",
        "club": "FC Augsburg",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kristijan-Jakic.png/330px-Kristijan-Jakic.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Petar Sučić",
        "position": "MF",
        "club": "Inter Milan",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/4/40/Petar_Su%C4%8Di%C4%87.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Nikola Moro",
        "position": "MF",
        "club": "Bologna",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Nikola_Moro_2020.jpg/330px-Nikola_Moro_2020.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Toni Fruk",
        "position": "MF",
        "club": "Rijeka"
      },
      {
        "name": "Ivan Perišić",
        "position": "FW",
        "club": "PSV Eindhoven) (vice-captain",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/8/85/Ivan_Peri%C5%A1i%C4%87_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Andrej Kramarić",
        "position": "FW",
        "club": "TSG Hoffenheim",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Andrej_Kramari%C4%87_2018.jpg/330px-Andrej_Kramari%C4%87_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mislav Oršić",
        "position": "FW",
        "club": "Pafos",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Mislav-Orsic-2022.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Marco Pašalić",
        "position": "FW",
        "club": "Orlando City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Marco_Pa%C5%A1ali%C4%87_%28cropped%29.jpg/330px-Marco_Pa%C5%A1ali%C4%87_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Franjo Ivanović",
        "position": "FW",
        "club": "Benfica"
      },
      {
        "name": "Petar Musa",
        "position": "FW",
        "club": "Dallas",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Petar_Musa_NY_Red_Bulls_v_FC_Dallas_2_May_2026-53_%28cropped%29.jpg/330px-Petar_Musa_NY_Red_Bulls_v_FC_Dallas_2_May_2026-53_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Igor Matanović",
        "position": "FW",
        "club": "SC Freiburg"
      }
    ]
  },
  "CUW": {
    "teamCode": "CUW",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Eloy Room",
        "position": "GK",
        "club": "Unattached",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Room_Eloy_Columbus_Crew_SC_Meet_the_Team_2019.jpg/330px-Room_Eloy_Columbus_Crew_SC_Meet_the_Team_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Trevor Doornbusch",
        "position": "GK",
        "club": "VVV Venlo",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Austria_U-18_vs._Netherlands_U-18_2017-03-23_%28095%29_%28cropped%29.jpg/330px-Austria_U-18_vs._Netherlands_U-18_2017-03-23_%28095%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Tyrick Bodak",
        "position": "GK",
        "club": "Telstar"
      },
      {
        "name": "Jurien Gaari",
        "position": "DF",
        "club": "Abha"
      },
      {
        "name": "Roshon van Eijma",
        "position": "DF",
        "club": "RKC Waalwijk"
      },
      {
        "name": "Sherel Floranus",
        "position": "DF",
        "club": "PEC Zwolle",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sherel_Floranus_at_Antalyaspor_vs_Fatih_Karag%C3%BCmr%C3%BCk_SK_20220213.jpg/330px-Sherel_Floranus_at_Antalyaspor_vs_Fatih_Karag%C3%BCmr%C3%BCk_SK_20220213.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Joshua Brenet",
        "position": "DF",
        "club": "Livingston",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/PSV_Eindhoven%2C_Teamcamp_Bad_Erlach%2C_July_2014_%28076%29.jpg/330px-PSV_Eindhoven%2C_Teamcamp_Bad_Erlach%2C_July_2014_%28076%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Shurandy Sambo",
        "position": "DF",
        "club": "Sparta Rotterdam"
      },
      {
        "name": "Armando Obispo",
        "position": "DF",
        "club": "PSV Eindhoven",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Austria_U-18_vs._Netherlands_U-18_2017-03-23_%28060%29.jpg/330px-Austria_U-18_vs._Netherlands_U-18_2017-03-23_%28060%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Deveron Fonville",
        "position": "DF",
        "club": "NEC"
      },
      {
        "name": "Leandro Bacuna",
        "position": "MF",
        "club": "Bandırmaspor",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Leandro_Bacuna.jpg/330px-Leandro_Bacuna.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Juninho Bacuna",
        "position": "MF",
        "club": "Gaziantep",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Juninho_bacuna-1531777726.jpeg/330px-Juninho_bacuna-1531777726.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Godfried Roemeratoe",
        "position": "MF",
        "club": "RKC Waalwijk"
      },
      {
        "name": "Kevin Felida",
        "position": "MF",
        "club": "Den Bosch",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kevin_felida-1571753982.jpg/330px-Kevin_felida-1571753982.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Livano Comenencia",
        "position": "MF",
        "club": "Zurich"
      },
      {
        "name": "Ar'jany Martha",
        "position": "MF",
        "club": "Rotherham United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ar%27jany_Martha_18042026_%283%29.jpg/330px-Ar%27jany_Martha_18042026_%283%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Tyrese Noslin",
        "position": "MF",
        "club": "Telstar",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Tyrese_Noslin.jpg/330px-Tyrese_Noslin.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Tahith Chong",
        "position": "MF",
        "club": "Sheffield United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Tahith_Chong_%2838487929362%29.jpg/330px-Tahith_Chong_%2838487929362%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kenji Gorre",
        "position": "FW",
        "club": "Maccabi Haifa"
      },
      {
        "name": "Gervane Kastaneer",
        "position": "FW",
        "club": "Persis Solo",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Gervane-kastaneer.jpg/330px-Gervane-kastaneer.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jeremy Antonisse",
        "position": "FW",
        "club": "Kifisia"
      },
      {
        "name": "Jearl Margaritha",
        "position": "FW",
        "club": "Beveren"
      },
      {
        "name": "Jurgen Locadia",
        "position": "FW",
        "club": "Unattached"
      },
      {
        "name": "Sontje Hansen",
        "position": "FW",
        "club": "Middlesbrough",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Sontje_Hansen_16082025_%281%29.jpg/330px-Sontje_Hansen_16082025_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jordi Paulina",
        "position": "FW",
        "club": "Borussia Dortmund II"
      }
    ]
  },
  "ECU": {
    "teamCode": "ECU",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Hernan Galindez",
        "position": "GK",
        "club": "Huracan"
      },
      {
        "name": "Moises Ramirez",
        "position": "GK",
        "club": "Kifisia"
      },
      {
        "name": "Cristhian Loor",
        "position": "GK",
        "club": "Botafogo"
      },
      {
        "name": "Angelo Preciado",
        "position": "DF",
        "club": "Sparta Prague"
      },
      {
        "name": "Piero Hincapie",
        "position": "DF",
        "club": "Arsenal"
      },
      {
        "name": "Felix Torres",
        "position": "DF",
        "club": "Corinthians"
      },
      {
        "name": "Willian Pacho",
        "position": "DF",
        "club": "Paris Saint-Germain",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Pacho_asse_psg_2425.png/330px-Pacho_asse_psg_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Cristian Ramirez",
        "position": "DF",
        "club": "Lokomotiv Moscow"
      },
      {
        "name": "Joel Ordonez",
        "position": "DF",
        "club": "Club Brugge"
      },
      {
        "name": "Jhoanner Chavez",
        "position": "DF",
        "club": "Lens"
      },
      {
        "name": "Leonardo Realpe",
        "position": "DF",
        "club": "Famalicão"
      },
      {
        "name": "Moises Caicedo",
        "position": "MF",
        "club": "Chelsea"
      },
      {
        "name": "Alan Franco",
        "position": "MF",
        "club": "Atletico Mineiro"
      },
      {
        "name": "Gonzalo Plata",
        "position": "MF",
        "club": "Flamengo",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/9/92/2022_FIFA_World_Cup_Qatar_0%E2%80%932_Ecuador_-_Plata.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Kendry Paez",
        "position": "MF",
        "club": "Strasbourg"
      },
      {
        "name": "John Yeboah",
        "position": "MF",
        "club": "Venezia",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/John_Yeboah_2020.png/330px-John_Yeboah_2020.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alan Minda",
        "position": "MF",
        "club": "Cercle Brugge"
      },
      {
        "name": "Pedro Vite",
        "position": "MF",
        "club": "UNAM",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/3/39/Inter_Miami_CF_3-1_UNAM_%286_August_2025%29_04_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Jordy Alcivar",
        "position": "MF",
        "club": "Independiente del Valle"
      },
      {
        "name": "Denil Castillo",
        "position": "MF",
        "club": "Midtjylland"
      },
      {
        "name": "Yaimar Medina",
        "position": "MF",
        "club": "Genk"
      },
      {
        "name": "Patrik Mercado",
        "position": "MF",
        "club": "Independiente del Valle",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Patrik_mercado.png/330px-Patrik_mercado.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kevin Rodriguez",
        "position": "FW",
        "club": "Union Saint-Gilloise"
      },
      {
        "name": "Leonardo Campana",
        "position": "FW",
        "club": "New England Revolution",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Leonardo_Campana_%28cropped%29.jpg/330px-Leonardo_Campana_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nilson Angulo",
        "position": "FW",
        "club": "Anderlecht",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Nilson_Angulo_RSC_Anderlecht_2025.jpg/330px-Nilson_Angulo_RSC_Anderlecht_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "John Mercado",
        "position": "FW",
        "club": "Sparta Prague"
      },
      {
        "name": "Jeremy Arevalo",
        "position": "FW",
        "club": "Racing de Santander"
      }
    ]
  },
  "EGY": {
    "teamCode": "EGY",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Mohamed Awad",
        "position": "GK",
        "club": "Zamalek"
      },
      {
        "name": "Ali Lotfi",
        "position": "GK",
        "club": "ZED"
      },
      {
        "name": "Mohamed Bassam",
        "position": "GK",
        "club": "Ceramica Cleopatra"
      },
      {
        "name": "El-Wensh",
        "position": "DF",
        "club": "Zamalek"
      },
      {
        "name": "Karim Fouad",
        "position": "DF",
        "club": "Al Ahly",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Karim_Fouad_28.png/330px-Karim_Fouad_28.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Karim El Eraki",
        "position": "DF",
        "club": "Al Masry"
      },
      {
        "name": "Ahmed Hany",
        "position": "DF",
        "club": "Ceramica Cleopatra"
      },
      {
        "name": "Yassin Marei",
        "position": "DF",
        "club": "Al Ahly"
      },
      {
        "name": "Ragab Nabil",
        "position": "DF",
        "club": "Ceramica Cleopatra"
      },
      {
        "name": "Hady Reyad",
        "position": "DF",
        "club": "Petrojet"
      },
      {
        "name": "Yehia Zakaria",
        "position": "DF",
        "club": "Ghazl El Mahalla"
      },
      {
        "name": "Mohamed Elneny",
        "position": "MF",
        "club": "Al Jazira",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Mohamed_Elneny_2018.jpg/330px-Mohamed_Elneny_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Amr El Solia",
        "position": "MF",
        "club": "Ceramica Cleopatra",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Amr_El_Solia.jpg/330px-Amr_El_Solia.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Afsha",
        "position": "MF",
        "club": "Al Ahly"
      },
      {
        "name": "Mostafa Saad",
        "position": "MF",
        "club": "ZED"
      },
      {
        "name": "Akram Tawfik",
        "position": "MF",
        "club": "Al-Shamal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Akram_Tawfik_2024.jpg/330px-Akram_Tawfik_2024.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mido Gaber",
        "position": "MF",
        "club": "Al Masry"
      },
      {
        "name": "Islam Issa",
        "position": "MF",
        "club": "Ceramica Cleopatra"
      },
      {
        "name": "Ghanam Mohamed",
        "position": "MF",
        "club": "Modern Sport"
      },
      {
        "name": "Mohamed Sherif",
        "position": "FW",
        "club": "Al Ahly",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Mohamed_Sherif.png/330px-Mohamed_Sherif.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Hossam Hassan",
        "position": "FW",
        "club": "Modern Sport",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Hossam_Hassan.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Ahmed Atef",
        "position": "FW",
        "club": "ZED"
      },
      {
        "name": "Mostafa Shalaby",
        "position": "FW",
        "club": "National Bank of Egypt"
      }
    ]
  },
  "ENG": {
    "teamCode": "ENG",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Dean Henderson",
        "position": "GK",
        "club": "Crystal Palace",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Dean_Henderson.jpg/330px-Dean_Henderson.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jordan Pickford",
        "position": "GK",
        "club": "Everton",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Jordan_Pickford_2022-07-16_1.jpg/330px-Jordan_Pickford_2022-07-16_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nick Pope",
        "position": "GK",
        "club": "Newcastle United"
      },
      {
        "name": "Dan Burn",
        "position": "DF",
        "club": "Newcastle United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Premier_League_Newcastle-Arsenal_2023-05-07_29_%28cropped_Dan_Burn%29.jpg/330px-Premier_League_Newcastle-Arsenal_2023-05-07_29_%28cropped_Dan_Burn%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Marc Guehi",
        "position": "DF",
        "club": "Crystal Palace"
      },
      {
        "name": "Reece James",
        "position": "DF",
        "club": "Chelsea",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Reece_James_FIFA_Club_World_Cup_final_extraction.jpg/330px-Reece_James_FIFA_Club_World_Cup_final_extraction.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ezri Konsa",
        "position": "DF",
        "club": "Aston Villa",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Ezri_Konsa_April_2026_%28cropped%29.jpg/330px-Ezri_Konsa_April_2026_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nico O'Reilly",
        "position": "DF",
        "club": "Manchester City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/ManCity20240722-020.jpg/330px-ManCity20240722-020.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jarell Quansah",
        "position": "DF",
        "club": "Bayer Leverkusen",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Jarell_Quansah_06042025_%281%29.jpg/330px-Jarell_Quansah_06042025_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Djed Spence",
        "position": "DF",
        "club": "Tottenham Hotspur"
      },
      {
        "name": "John Stones",
        "position": "DF",
        "club": "Manchester City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/John_Stones_2018-06-13_1.jpg/330px-John_Stones_2018-06-13_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Elliot Anderson",
        "position": "MF",
        "club": "Nottingham Forest"
      },
      {
        "name": "Jude Bellingham",
        "position": "MF",
        "club": "Real Madrid",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190551-2_%28cropped%29.jpg/330px-25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190551-2_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jordan Henderson",
        "position": "MF",
        "club": "Brentford",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Jordan_Henderson_29112025_%284%29.jpg/330px-Jordan_Henderson_29112025_%284%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alex Scott",
        "position": "MF",
        "club": "Bournemouth"
      },
      {
        "name": "Declan Rice",
        "position": "MF",
        "club": "Arsenal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/1_declan_rice_arsenal_2025_%28cropped%29.jpg/330px-1_declan_rice_arsenal_2025_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Morgan Rogers",
        "position": "MF",
        "club": "Aston Villa",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Morgan_Rogers_April_2026_%28cropped%29.jpg/330px-Morgan_Rogers_April_2026_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Adam Wharton",
        "position": "MF",
        "club": "Crystal Palace"
      },
      {
        "name": "Jarrod Bowen",
        "position": "FW",
        "club": "West Ham United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/JarrodBowen2023_%28cropped%29.jpeg/330px-JarrodBowen2023_%28cropped%29.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Eberechi Eze",
        "position": "FW",
        "club": "Arsenal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Qpr2018eberechieeze001.jpg/330px-Qpr2018eberechieeze001.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Anthony Gordon",
        "position": "FW",
        "club": "Newcastle United"
      },
      {
        "name": "Harry Kane",
        "position": "FW",
        "club": "Bayern Munich",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Harry_Kane_on_October_10%2C_2023.jpg/330px-Harry_Kane_on_October_10%2C_2023.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Marcus Rashford",
        "position": "FW",
        "club": "Barcelona, loan from Manchester United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Marcus_Rashford_in_2023.jpg/330px-Marcus_Rashford_in_2023.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Bukayo Saka",
        "position": "FW",
        "club": "Arsenal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/1_bukayo_saka_arsenal_2025_%28cropped%29.jpg/330px-1_bukayo_saka_arsenal_2025_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  "FRA": {
    "teamCode": "FRA",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Brice Samba",
        "position": "GK",
        "club": "Rennes",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Brice_Samba_asse_rcl_23_24.jpg/330px-Brice_Samba_asse_rcl_23_24.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mike Maignan",
        "position": "GK",
        "club": "AC Milan",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Maignan_2022_Salzburg_vs_AC_Milan_2022-09-06.jpg/330px-Mike_Maignan_2022_Salzburg_vs_AC_Milan_2022-09-06.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Lucas Chevalier",
        "position": "GK",
        "club": "Paris Saint-Germain",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Chevalier_ASSE_losc_2425_%28cropped%29.jpg/330px-Chevalier_ASSE_losc_2425_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Malo Gusto",
        "position": "DF",
        "club": "Chelsea",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Malo_Gusto_20042025_%281%29.jpg/330px-Malo_Gusto_20042025_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Lucas Digne",
        "position": "DF",
        "club": "Aston Villa",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Lucas_Digne_Everton_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Dayot Upamecano",
        "position": "DF",
        "club": "Bayern Munich",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3244_by_Stepro_%28cropped%29.jpg/330px-2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3244_by_Stepro_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jules Kounde",
        "position": "DF",
        "club": "Barcelona"
      },
      {
        "name": "Ibrahima Konate",
        "position": "DF",
        "club": "Liverpool"
      },
      {
        "name": "William Saliba",
        "position": "DF",
        "club": "Arsenal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/1_william_saliba_arsenal_2025_%28cropped%29.jpg/330px-1_william_saliba_arsenal_2025_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Lucas Hernandez",
        "position": "DF",
        "club": "Paris Saint-Germain",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Hernandez_asse_psg_2425.png/330px-Hernandez_asse_psg_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Theo Hernandez",
        "position": "DF",
        "club": "Al-Hilal"
      },
      {
        "name": "Khephren Thuram",
        "position": "MF",
        "club": "Juventus"
      },
      {
        "name": "Michael Olise",
        "position": "MF",
        "club": "Bayern Munich",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/FC_RB_Salzburg_gegen_FC_Bayern_M%C3%BCnchen_%282026-01-06_Testspiel%29_10.jpg/330px-FC_RB_Salzburg_gegen_FC_Bayern_M%C3%BCnchen_%282026-01-06_Testspiel%29_10.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "N'Golo Kante",
        "position": "MF",
        "club": "Al-Ittihad"
      },
      {
        "name": "Warren Zaire-Emery",
        "position": "MF",
        "club": "Paris Saint-Germain"
      },
      {
        "name": "Christopher Nkunku",
        "position": "FW",
        "club": "AC Milan",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3321_by_Stepro_%28cropped%29.jpg/330px-2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3321_by_Stepro_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Florian Thauvin",
        "position": "FW",
        "club": "Lens",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/FRA-ARG_%286%29.jpg/330px-FRA-ARG_%286%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Hugo Ekitike",
        "position": "FW",
        "club": "Liverpool",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Hugo_Ekitike_%28PSG_2023%29_%28cropped2%29.jpg/330px-Hugo_Ekitike_%28PSG_2023%29_%28cropped2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Maghnes Akliouche",
        "position": "FW",
        "club": "Monaco",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Akliouche2_asse_asm_2425.png/330px-Akliouche2_asse_asm_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Rayan Cherki",
        "position": "FW",
        "club": "Manchester City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cherki_asse_ol_2425.png/330px-Cherki_asse_ol_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jean-Philippe Mateta",
        "position": "FW",
        "club": "Crystal Palace",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Jean-Philippe_Mateta_%28cropped%29.jpg/330px-Jean-Philippe_Mateta_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Bradley Barcola",
        "position": "FW",
        "club": "Paris Saint-Germain",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Barcola_asse_psg_2425.png/330px-Barcola_asse_psg_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  "GER": {
    "teamCode": "GER",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Oliver Baumann",
        "position": "GK",
        "club": "TSG Hoffenheim",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/OliverBaumann_%28cropped%29.jpg/330px-OliverBaumann_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alexander N&uuml;bel",
        "position": "GK",
        "club": "VfB Stuttgart"
      },
      {
        "name": "Noah Atubolu",
        "position": "GK",
        "club": "SC Freiburg",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Noah_Atubolu.jpg/330px-Noah_Atubolu.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Finn Dahmen",
        "position": "GK",
        "club": "FC Augsburg"
      },
      {
        "name": "Jonathan Tah",
        "position": "DF",
        "club": "Bayern Munich",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Jonathan_Tah_2019.jpg/330px-Jonathan_Tah_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "David Raum",
        "position": "DF",
        "club": "RB Leipzig",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2658_%28cropped%29.jpg/330px-2023-10-04_Fu%C3%9Fball%2C_M%C3%A4nner%2C_UEFA_Champions_League%2C_RB_Leipzig_-_Manchester_City_FC_1DX_2658_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nico Schlotterbeck",
        "position": "DF",
        "club": "Borussia Dortmund",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/2023-08-12_TSV_Schott_Mainz_gegen_Borussia_Dortmund_%28DFB-Pokal_2023-24%29_by_Sandro_Halank%E2%80%93069.jpg/330px-2023-08-12_TSV_Schott_Mainz_gegen_Borussia_Dortmund_%28DFB-Pokal_2023-24%29_by_Sandro_Halank%E2%80%93069.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Waldemar Anton",
        "position": "DF",
        "club": "Borussia Dortmund",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Waldemar_Anton_%282025%29.jpg/330px-Waldemar_Anton_%282025%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ridle Baku",
        "position": "DF",
        "club": "RB Leipzig",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Ridle_Baku_2020-09-20_Fu%C3%9Fball%2C_M%C3%A4nner%2C_1._Bundesliga%2C_RB_Leipzig_-_1._FSV_Mainz_05_1DX_1394_by_Stepro_%28cropped%29.jpg/330px-Ridle_Baku_2020-09-20_Fu%C3%9Fball%2C_M%C3%A4nner%2C_1._Bundesliga%2C_RB_Leipzig_-_1._FSV_Mainz_05_1DX_1394_by_Stepro_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Malick Thiaw",
        "position": "DF",
        "club": "Newcastle United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Milan_Lecce_2023_Thiaw.jpg/330px-Milan_Lecce_2023_Thiaw.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nathaniel Brown",
        "position": "DF",
        "club": "Eintracht Frankfurt"
      },
      {
        "name": "Joshua Kimmich",
        "position": "MF",
        "club": "Bayern Munich",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/2019-06-11_Fu%C3%9Fball%2C_M%C3%A4nner%2C_L%C3%A4nderspiel%2C_Deutschland-Estland_StP_2078_LR10_by_Stepro_%28cropped%29.jpg/330px-2019-06-11_Fu%C3%9Fball%2C_M%C3%A4nner%2C_L%C3%A4nderspiel%2C_Deutschland-Estland_StP_2078_LR10_by_Stepro_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Leroy Sane",
        "position": "MF",
        "club": "Galatasaray"
      },
      {
        "name": "Leon Goretzka",
        "position": "MF",
        "club": "Bayern Munich",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/FC_Red_Bull_Salzburg_gegen_Bayern_M%C3%BCnchen_%282025-01-06_Testspiel%29_27.jpg/330px-FC_Red_Bull_Salzburg_gegen_Bayern_M%C3%BCnchen_%282025-01-06_Testspiel%29_27.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Serge Gnabry",
        "position": "MF",
        "club": "Bayern Munich",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Serge_Gnabry_WC2022.jpg/330px-Serge_Gnabry_WC2022.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Florian Wirtz",
        "position": "MF",
        "club": "Liverpool",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Florian_Wirtz%2C_2022-07-31%2C_Saisoner%C3%B6ffnung_Bayer_04%2C_Leverkusen_%281%29_%28cropped%29.jpg/330px-Florian_Wirtz%2C_2022-07-31%2C_Saisoner%C3%B6ffnung_Bayer_04%2C_Leverkusen_%281%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Karim Adeyemi",
        "position": "MF",
        "club": "Borussia Dortmund",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/FC_Salzburg_gegen_FC_Bayern_M%C3%BCnchen_%28Championsleague_Achtelfinale_Hinspiel_16._Februar_2022%29_63.jpg/330px-FC_Salzburg_gegen_FC_Bayern_M%C3%BCnchen_%28Championsleague_Achtelfinale_Hinspiel_16._Februar_2022%29_63.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Aleksandar Pavlovic",
        "position": "MF",
        "club": "Bayern Munich"
      },
      {
        "name": "Felix Nmecha",
        "position": "MF",
        "club": "Borussia Dortmund",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Felix_Nmecha_2021.jpg/330px-Felix_Nmecha_2021.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kevin Schade",
        "position": "MF",
        "club": "Brentford",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Kevin_Schade_02082025_%281%29.jpg/330px-Kevin_Schade_02082025_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jamie Leweling",
        "position": "MF",
        "club": "VfB Stuttgart",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Jamie_leweling.jpg/330px-Jamie_leweling.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Assan Ouedraogo",
        "position": "MF",
        "club": "RB Leipzig"
      },
      {
        "name": "Nick Woltemade",
        "position": "FW",
        "club": "Newcastle United"
      },
      {
        "name": "Jonathan Burkardt",
        "position": "FW",
        "club": "Eintracht Frankfurt"
      },
      {
        "name": "Said El Mala",
        "position": "FW",
        "club": "1. FC Köln"
      }
    ]
  },
  "GHA": {
    "teamCode": "GHA",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Lawrence Ati-Zigi",
        "position": "GK",
        "club": "St. Gallen",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/FC_Red_Bull_Salzburg_gegen_SK_Rapid_Wien_%2813._Mai_2017%29_34.jpg/330px-FC_Red_Bull_Salzburg_gegen_SK_Rapid_Wien_%2813._Mai_2017%29_34.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Joseph Anang",
        "position": "GK",
        "club": "St Patrick's Athletic",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Hertha_BSC_vs._West_Ham_United_20190731_%28199%29.jpg/330px-Hertha_BSC_vs._West_Ham_United_20190731_%28199%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Benjamin Asare",
        "position": "GK",
        "club": "Hearts of Oak"
      },
      {
        "name": "Alidu Seidu",
        "position": "DF",
        "club": "Rennes"
      },
      {
        "name": "Caleb Yirenkyi",
        "position": "DF",
        "club": "Nordsjælland"
      },
      {
        "name": "Jonas Adjetey",
        "position": "DF",
        "club": "Basel"
      },
      {
        "name": "Mohammed Salisu",
        "position": "DF",
        "club": "Monaco",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Salisu_asse_asm_2425.png/330px-Salisu_asse_asm_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Derrick Köhn",
        "position": "DF",
        "club": "Union Berlin",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/FC_Liefering_gegen_FC_Bayern_M%C3%BCnchen_UDreiundzwanzig_37.jpg/330px-FC_Liefering_gegen_FC_Bayern_M%C3%BCnchen_UDreiundzwanzig_37.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kojo Peprah Oppong",
        "position": "DF",
        "club": "Nice"
      },
      {
        "name": "Gideon Mensah",
        "position": "DF",
        "club": "Auxerre"
      },
      {
        "name": "Jerome Opoku",
        "position": "DF",
        "club": "İstanbul Başakşehir",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Jerome_Opoku_3_%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK_UECL_20250813_%281%29.jpg/330px-Jerome_Opoku_3_%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK_UECL_20250813_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ebenezer Annan",
        "position": "DF",
        "club": "Saint-Étienne"
      },
      {
        "name": "Kelvin Nkrumah",
        "position": "MF",
        "club": "Medeama"
      },
      {
        "name": "Kwasi Sibo",
        "position": "MF",
        "club": "Oviedo"
      },
      {
        "name": "Christopher Bonsu Baah",
        "position": "MF",
        "club": "Al-Qadsiah"
      },
      {
        "name": "Abu Francis",
        "position": "MF",
        "club": "Toulouse"
      },
      {
        "name": "Kamaldeen Sulemana",
        "position": "MF",
        "club": "Atalanta",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Kamaldeen_Sulemana_%28cropped%29.jpg/330px-Kamaldeen_Sulemana_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Prince Kwabena Adu",
        "position": "MF",
        "club": "Viktoria Plzeň"
      },
      {
        "name": "Prince Owusu",
        "position": "MF",
        "club": "Medeama"
      },
      {
        "name": "Prince Osei Owusu",
        "position": "FW",
        "club": "Montréal"
      },
      {
        "name": "Brandon Thomas-Asante",
        "position": "FW",
        "club": "Coventry City"
      },
      {
        "name": "Antoine Semenyo",
        "position": "FW",
        "club": "Bournemouth",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Antoine_Semenyo_2026.png/330px-Antoine_Semenyo_2026.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  "HAI": {
    "teamCode": "HAI",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Johny Placide",
        "position": "GK",
        "club": "Bastia",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Johny_Placide_in_Tsarsko_selo.jpg/330px-Johny_Placide_in_Tsarsko_selo.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alexandre Pierre",
        "position": "GK",
        "club": "Sochaux"
      },
      {
        "name": "Josue Duverger",
        "position": "GK",
        "club": "Cosmos Koblenz"
      },
      {
        "name": "Carlens Arcus",
        "position": "DF",
        "club": "Angers",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/RC_Lens_-_AJ_Auxerre_%2809-03-2019%29_96.jpg/330px-RC_Lens_-_AJ_Auxerre_%2809-03-2019%29_96.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Keeto Thermoncy",
        "position": "DF",
        "club": "Young Boys"
      },
      {
        "name": "Ricardo Ade",
        "position": "DF",
        "club": "LDU Quito"
      },
      {
        "name": "Hannes Delcroix",
        "position": "DF",
        "club": "Burnley",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/FC_Red_Bull_Salzburg_gegen_RSC_Anderlecht_%28Testspiel_7._Juli_2017%29_50.jpg/330px-FC_Red_Bull_Salzburg_gegen_RSC_Anderlecht_%28Testspiel_7._Juli_2017%29_50.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Garven Metusala",
        "position": "DF",
        "club": "Colorado Springs Switchbacks",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Garven_Metusala.jpg/330px-Garven_Metusala.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Martin Experience",
        "position": "DF",
        "club": "Nancy"
      },
      {
        "name": "Duke Lacroix",
        "position": "DF",
        "club": "Colorado Springs Switchbacks"
      },
      {
        "name": "Stephane Lambese",
        "position": "DF",
        "club": "Fleury"
      },
      {
        "name": "Jean-Ricner Bellegarde",
        "position": "MF",
        "club": "Wolverhampton Wanderers"
      },
      {
        "name": "Leverton Pierre",
        "position": "MF",
        "club": "Vizela"
      },
      {
        "name": "Carl Fred Sainte",
        "position": "MF",
        "club": "Phoenix Rising"
      },
      {
        "name": "Christopher Attys",
        "position": "MF",
        "club": "Triestina"
      },
      {
        "name": "Danley Jean Jacques",
        "position": "MF",
        "club": "Philadelphia Union",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Danley_Jean_Jacques_Philadelphia_Union_New_York_City_FC_Nov_23_2025-062_%28cropped%29.jpg/330px-Danley_Jean_Jacques_Philadelphia_Union_New_York_City_FC_Nov_23_2025-062_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Derrick Etienne Jr.",
        "position": "FW",
        "club": "Toronto",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Derrick_Etienne_%2828411015376%29_%28cropped2%29.jpg/330px-Derrick_Etienne_%2828411015376%29_%28cropped2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Duckens Nazon",
        "position": "FW",
        "club": "Esteghlal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/2025_Iran_Football_Premier_League_Esteghlal_and_Zob_Ahan_football_match_3_Mehr_%28cropped%29.jpg/330px-2025_Iran_Football_Premier_League_Esteghlal_and_Zob_Ahan_football_match_3_Mehr_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Don Deedson Louicius",
        "position": "FW",
        "club": "Dallas"
      },
      {
        "name": "Ruben Providence",
        "position": "FW",
        "club": "Almere City"
      },
      {
        "name": "Woobens Pacius",
        "position": "FW",
        "club": "Tampa Bay Rowdies",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Woobens_Pacius.jpg/330px-Woobens_Pacius.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Frantzdy Pierrot",
        "position": "FW",
        "club": "AEK Athens"
      },
      {
        "name": "Josue Casimir",
        "position": "FW",
        "club": "Auxerre"
      }
    ]
  },
  "IRN": {
    "teamCode": "IRN",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Alireza Beiranvand",
        "position": "GK",
        "club": "Tractor",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Alireza_Beiranvand_14021113000490638424849868670974_66487.jpg/330px-Alireza_Beiranvand_14021113000490638424849868670974_66487.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Payam Niazmand",
        "position": "GK",
        "club": "Persepolis",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Payam_Niazmand%2C_Esteghlal_vs._Sepahan.jpg/330px-Payam_Niazmand%2C_Esteghlal_vs._Sepahan.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Hossein Hosseini",
        "position": "GK",
        "club": "Sepahan"
      },
      {
        "name": "Mohammad Reza Akhbari",
        "position": "GK",
        "club": "Sepahan",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/6/68/Mohammad_Reza_Akhbari_with_Iran_Olympic_team.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Ali Nemati",
        "position": "DF",
        "club": "Foolad",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Mes_Rafsanjan_F.C._vs_Persepolis_F.C.%2C_19_November_2021_2.jpg/330px-Mes_Rafsanjan_F.C._vs_Persepolis_F.C.%2C_19_November_2021_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Saleh Hardani",
        "position": "DF",
        "club": "Esteghlal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Esteghlal_Celebrate_IPL_Title_Win_at_Azadi_Stadium_-_020.jpg/330px-Esteghlal_Celebrate_IPL_Title_Win_at_Azadi_Stadium_-_020.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Shojae Khalilzadeh",
        "position": "DF",
        "club": "Tractor",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Shoja_Khalilzadeh_at_Fars_News_Agency.jpg/330px-Shoja_Khalilzadeh_at_Fars_News_Agency.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Milad Mohammadi",
        "position": "DF",
        "club": "Persepolis",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Milad_Mohammadi_2017.jpg/330px-Milad_Mohammadi_2017.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Hossein Kanaanizadegan",
        "position": "DF",
        "club": "Persepolis",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Hossein_Kanaani_14000213000920637556755600710662.jpg/330px-Hossein_Kanaani_14000213000920637556755600710662.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Majid Hosseini",
        "position": "DF",
        "club": "Kayserispor",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/5/54/Majid_Hoseini_at_the_2018_FIFA_World_Cup.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Aria Yousefi",
        "position": "DF",
        "club": "Sepahan",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/YousefiCropped.jpg/330px-YousefiCropped.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Danial Esmaeilifar",
        "position": "DF",
        "club": "Tractor",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Danial_Esmaeilifar_1.jpg/330px-Danial_Esmaeilifar_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Saeid Ezatolahi",
        "position": "MF",
        "club": "Shabab Al Ahli",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Saeid_Ezatolahi_at_Iran_training_2018.jpg/330px-Saeid_Ezatolahi_at_Iran_training_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Saman Ghoddos",
        "position": "MF",
        "club": "Ittihad Kalba",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Saman_Ghoddos_-_2018_FIFA_World_Cup.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Mohammad Ghorbani",
        "position": "MF",
        "club": "Al Wahda"
      },
      {
        "name": "Mehdi Hashemnejad",
        "position": "MF",
        "club": "Tractor",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/7/7d/%D9%85%D9%82%D8%AF%D9%85%D8%A7%D8%AA%DB%8C_%D8%AC%D8%A7%D9%85_%D8%AC%D9%87%D8%A7%D9%86%DB%8C_%DB%B2%DB%B0%DB%B2%DB%B6%D8%9B_%D8%AA%DB%8C%D9%85%E2%80%8C%D9%87%D8%A7%DB%8C_%D9%85%D9%84%DB%8C_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86_%D9%88_%DA%A9%D8%B1%D9%87_%D8%B4%D9%85%D8%A7%D9%84%DB%8C_%2815%29_%28cropped%29_Mehdi_Hashemnejad.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Mehdi Tikdari",
        "position": "MF",
        "club": "Gol Gohar",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/%D9%85%D9%87%D8%AF%DB%8C_%D8%AA%DB%8C%DA%A9%D8%AF%D8%B1%DB%8C.jpg/330px-%D9%85%D9%87%D8%AF%DB%8C_%D8%AA%DB%8C%DA%A9%D8%AF%D8%B1%DB%8C.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Omid Noorafkan",
        "position": "MF",
        "club": "Sepahan",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Omid_noorafkan_Sepahan_2023.jpg/330px-Omid_noorafkan_Sepahan_2023.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alireza Koushki",
        "position": "MF",
        "club": "Esteghlal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Iran_Football_Premier_League_Aug_26_2025_Esteghlal_vs_Zob_Ahan_Avash_36.jpg/330px-Iran_Football_Premier_League_Aug_26_2025_Esteghlal_vs_Zob_Ahan_Avash_36.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Hadi Habibinejad",
        "position": "MF",
        "club": "Chadormalou"
      },
      {
        "name": "Mohammad Mehdi Mohebi",
        "position": "MF",
        "club": "Ittihad Kalba",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Iran_v_North_Korea%2C_10_June_2025_18_Tasnim_%28cropped%29_Mohammad_Mehdi_Mohebi.jpg/330px-Iran_v_North_Korea%2C_10_June_2025_18_Tasnim_%28cropped%29_Mohammad_Mehdi_Mohebi.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mehdi Taremi",
        "position": "FW",
        "club": "Olympiacos",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/7/74/Iran_-_Japan%2C_AFC_Asian_Cup_2019_42_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Amirhossein Hosseinzadeh",
        "position": "FW",
        "club": "Tractor",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Esteghlal_FC_in_training%2C_29_September_2021_-_09.jpg/330px-Esteghlal_FC_in_training%2C_29_September_2021_-_09.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ali Alipour",
        "position": "FW",
        "club": "Persepolis",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Persepolis_F.C._v_Shahr_Khodro_F.C.%2C_27_February_2020_%2813%29_%28cropped%29.jpg/330px-Persepolis_F.C._v_Shahr_Khodro_F.C.%2C_27_February_2020_%2813%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mohammad Omri",
        "position": "FW",
        "club": "Persepolis",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Mohammad_Omri_against_Tractor_SC.jpg/330px-Mohammad_Omri_against_Tractor_SC.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mehdi Ghayedi",
        "position": "FW",
        "club": "Al-Nasr",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Esteghlal_FC_vs_Tractor_FC%2C_18_May_2023_-_04.jpg/330px-Esteghlal_FC_vs_Tractor_FC%2C_18_May_2023_-_04.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  "CIV": {
    "teamCode": "CIV",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Yahia Fofana",
        "position": "GK",
        "club": "Çaykur Rizespor",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Fofana_asse_sco_2425.png/330px-Fofana_asse_sco_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mohamed Kone",
        "position": "GK",
        "club": "Charleroi"
      },
      {
        "name": "Alban Lafont",
        "position": "GK",
        "club": "Panathinaikos",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Alban_Lafont_%282018-04-21%29_1.jpg/330px-Alban_Lafont_%282018-04-21%29_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Clément Akpa",
        "position": "DF",
        "club": "Auxerre",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Akpro_aja_asse_2425.png/330px-Akpro_aja_asse_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ghislain Konan",
        "position": "DF",
        "club": "Gil Vicente",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Joueur_ivoirien_02.jpg/330px-Joueur_ivoirien_02.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Armel Zohouri",
        "position": "DF",
        "club": "Iberia 1999"
      },
      {
        "name": "Odilon Kossounou",
        "position": "DF",
        "club": "Atalanta",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Odilon_Kossounou%2C_2022-07-31%2C_Saisoner%C3%B6ffnung_Bayer_04%2C_Leverkusen_%281%29.jpg/330px-Odilon_Kossounou%2C_2022-07-31%2C_Saisoner%C3%B6ffnung_Bayer_04%2C_Leverkusen_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jean-Philippe Gbamin",
        "position": "DF",
        "club": "Metz",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Gbamin_asse_fcn_2425.jpg/330px-Gbamin_asse_fcn_2425.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Guéla Doué",
        "position": "DF",
        "club": "Strasbourg",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Doue_asse_rcsa_2425.jpg/330px-Doue_asse_rcsa_2425.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Emmanuel Agbadou",
        "position": "DF",
        "club": "Wolverhampton Wanderers",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Emmanuel_Agbadou.jpg/330px-Emmanuel_Agbadou.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ousmane Diomande",
        "position": "DF",
        "club": "Sporting CP",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/%C3%89quipe_football_ivoirien_03_%28Ousmane_Diomande%29.jpg/330px-%C3%89quipe_football_ivoirien_03_%28Ousmane_Diomande%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Evan Ndicka",
        "position": "DF",
        "club": "Roma",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/2022128151247_2022-05-08_Fussball_Eintracht_Frankfurt_vs_Borussia_M%C3%B6nchengladbach_-_Sven_-_1D_X_MK_II_-_0370_-_B70I6481_%28Evan_N%E2%80%99Dicka_cropped%29.jpg/330px-2022128151247_2022-05-08_Fussball_Eintracht_Frankfurt_vs_Borussia_M%C3%B6nchengladbach_-_Sven_-_1D_X_MK_II_-_0370_-_B70I6481_%28Evan_N%E2%80%99Dicka_cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mario Dorgeles",
        "position": "MF",
        "club": "Braga",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/FC_Red_Bull_Salzburg_gegen_FC_Nordsjaelland_%28Testspiel_2023-07-08%29_45.jpg/330px-FC_Red_Bull_Salzburg_gegen_FC_Nordsjaelland_%28Testspiel_2023-07-08%29_45.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Seko Fofana",
        "position": "MF",
        "club": "Rennes",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Seko_Fofana.jpg/330px-Seko_Fofana.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Franck Kessié",
        "position": "MF",
        "club": "Al-Ahli",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Franck_Yannick_Kessi%C3%A9.jpg/330px-Franck_Yannick_Kessi%C3%A9.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ibrahim Sangaré",
        "position": "MF",
        "club": "Nottingham Forest"
      },
      {
        "name": "Christ Inao Oulaï",
        "position": "MF",
        "club": "Trabzonspor"
      },
      {
        "name": "Parfait Guiagon",
        "position": "MF",
        "club": "Charleroi",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/%D7%A4%D7%90%D7%A8%D7%A4%D7%94_%D7%92%D7%95%D7%99%D7%90%D7%92%D7%95%D7%9F_-_Parfait_Guiagon.jpg/330px-%D7%A4%D7%90%D7%A8%D7%A4%D7%94_%D7%92%D7%95%D7%99%D7%90%D7%92%D7%95%D7%9F_-_Parfait_Guiagon.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Yan Diomande",
        "position": "FW",
        "club": "RB Leipzig"
      },
      {
        "name": "Evann Guessand",
        "position": "FW",
        "club": "Aston Villa",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Guessand_asse_ogcn_2425.png/330px-Guessand_asse_ogcn_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jean-Philippe Krasso",
        "position": "FW",
        "club": "Paris",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/FC_Zenit_Saint_Petersburg_vs._Red_Star_Belgrade%2C_4_July_2023_%2862%29_%28cropped%29.jpg/330px-FC_Zenit_Saint_Petersburg_vs._Red_Star_Belgrade%2C_4_July_2023_%2862%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Oumar Diakité",
        "position": "FW",
        "club": "Cercle Brugge",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Diakite_asse_sr_2425.png/330px-Diakite_asse_sr_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Amad Diallo",
        "position": "FW",
        "club": "Manchester United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Manchester_United_v_BSC_Young_Boys%2C_8_December_2021_%2817%29_%28cropped%29.jpg/330px-Manchester_United_v_BSC_Young_Boys%2C_8_December_2021_%2817%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Sébastien Haller",
        "position": "FW",
        "club": "Utrecht",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/S%C3%A9bastien_Haller_2.jpg/330px-S%C3%A9bastien_Haller_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Richard Kone",
        "position": "FW",
        "club": "Queens Park Rangers",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Richard_Kone_20092025_%283%29.jpg/330px-Richard_Kone_20092025_%283%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Vakoun Issouf Bayo",
        "position": "FW",
        "club": "Udinese",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vakoun_Bayo_%282020-09-14%29_2_%28cropped%29.jpg/330px-Vakoun_Bayo_%282020-09-14%29_2_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  "JPN": {
    "teamCode": "JPN",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Tomoki Hayakawa",
        "position": "GK",
        "club": "Kashima Antlers"
      },
      {
        "name": "Leo Kokubo",
        "position": "GK",
        "club": "Sint-Truiden",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Leo_Kokubo_2020.jpg/330px-Leo_Kokubo_2020.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Taishi Brandon Nozawa",
        "position": "GK",
        "club": "Antwerp",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Japan-vs-Thailand-Football-International-Friendly-Match--2024-01-01_0022_%28cropped%29.jpg/330px-Japan-vs-Thailand-Football-International-Friendly-Match--2024-01-01_0022_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Yukinari Sugawara",
        "position": "DF",
        "club": "Werder Bremen",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/4822940_AE7I9740_-_Yukinari_Sugawara.jpg/330px-4822940_AE7I9740_-_Yukinari_Sugawara.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Shogo Taniguchi",
        "position": "DF",
        "club": "Sint-Truiden"
      },
      {
        "name": "Ko Itakura",
        "position": "DF",
        "club": "Ajax",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ko_Itakura_%28cropped%29.jpg/330px-Ko_Itakura_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Tsuyoshi Watanabe",
        "position": "DF",
        "club": "Feyenoord"
      },
      {
        "name": "Tomoya Ando",
        "position": "DF",
        "club": "Avispa Fukuoka"
      },
      {
        "name": "Ayumu Seko",
        "position": "DF",
        "club": "Le Havre"
      },
      {
        "name": "Junnosuke Suzuki",
        "position": "DF",
        "club": "Copenhagen"
      },
      {
        "name": "Wataru Endo",
        "position": "MF",
        "club": "Liverpool",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Wataru_Endo_at_Iran-Japan_pre-match_conference.jpg/330px-Wataru_Endo_at_Iran-Japan_pre-match_conference.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Joel Chima Fujita",
        "position": "MF",
        "club": "FC St. Pauli"
      },
      {
        "name": "Takumi Minamino",
        "position": "MF",
        "club": "Monaco",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Minamino_asse_asm_2425.png/330px-Minamino_asse_asm_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ritsu Doan",
        "position": "MF",
        "club": "Eintracht Frankfurt"
      },
      {
        "name": "Keito Nakamura",
        "position": "MF",
        "club": "Reims",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Nakamura_asse_sr_2425.png/330px-Nakamura_asse_sr_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ryunosuke Sato",
        "position": "MF",
        "club": "Fagiano Okayama"
      },
      {
        "name": "Daichi Kamada",
        "position": "MF",
        "club": "Crystal Palace",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2022128173756_2022-05-08_Fussball_Eintracht_Frankfurt_vs_Borussia_M%C3%B6nchengladbach_-_Sven_-_1D_X_MK_II_-_0725_-_AK8I7460_%28Daichi_Kamada_cropped%29.jpg/330px-2022128173756_2022-05-08_Fussball_Eintracht_Frankfurt_vs_Borussia_M%C3%B6nchengladbach_-_Sven_-_1D_X_MK_II_-_0725_-_AK8I7460_%28Daichi_Kamada_cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ao Tanaka",
        "position": "MF",
        "club": "Leeds United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Ao_Tanaka_13092025_%281%29_%28cropped%29.jpg/330px-Ao_Tanaka_13092025_%281%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Takefusa Kubo",
        "position": "MF",
        "club": "Real Sociedad",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Takefusa_Kubo_2019.png/330px-Takefusa_Kubo_2019.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kaishu Sano",
        "position": "MF",
        "club": "Mainz 05",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Kaishu_Sano_2024_%28cropped%29.jpg/330px-Kaishu_Sano_2024_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Sota Kitano",
        "position": "MF",
        "club": "Red Bull Salzburg"
      },
      {
        "name": "Shuto Machino",
        "position": "FW",
        "club": "Borussia Monchengladbach"
      },
      {
        "name": "Daizen Maeda",
        "position": "FW",
        "club": "Celtic",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Celtic-20240722-018_%28cropped%29.jpg/330px-Celtic-20240722-018_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ayase Ueda",
        "position": "FW",
        "club": "Feyenoord",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Go_Ahead_Eagles_-_Feyenoord_-_53679351240_%28Ayase_Ueda%29.jpg/330px-Go_Ahead_Eagles_-_Feyenoord_-_53679351240_%28Ayase_Ueda%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Koki Ogawa",
        "position": "FW",
        "club": "NEC Nijmegen"
      },
      {
        "name": "Keisuke Goto",
        "position": "FW",
        "club": "Sint-Truiden"
      }
    ]
  },
  "JOR": {
    "teamCode": "JOR",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Yazeed Abulaila",
        "position": "GK",
        "club": "Al-Hussein",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Asian_Nations_Cup_-_Jordan_and_South_Korea_%2853%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Malek Shalabiya",
        "position": "GK",
        "club": "Al-Ramtha"
      },
      {
        "name": "Nour Bani Attiah",
        "position": "GK",
        "club": "Al-Faisaly"
      },
      {
        "name": "Mohammad Abu Hashish",
        "position": "DF",
        "club": "Al-Karma",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Mohammad_Abu_Hashish.png/330px-Mohammad_Abu_Hashish.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Abdallah Nasib",
        "position": "DF",
        "club": "Al-Zawraa",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Abdallah_Nasib.png/330px-Abdallah_Nasib.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Husam Abu Dahab",
        "position": "DF",
        "club": "Al-Salmiya"
      },
      {
        "name": "Hadi Al-Hourani",
        "position": "DF",
        "club": "Al-Faisaly"
      },
      {
        "name": "Ali Hajabi",
        "position": "DF",
        "club": "Al-Hussein",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Sepahan_and_Al-Hussein_Jordan_football_teams_meet_21_%282025%29_esfahanzibaonline.ir_%28cropped%29.jpg/330px-Sepahan_and_Al-Hussein_Jordan_football_teams_meet_21_%282025%29_esfahanzibaonline.ir_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Issam Smeeri",
        "position": "DF",
        "club": "Al-Salt"
      },
      {
        "name": "Salim Obaid",
        "position": "DF",
        "club": "Al-Hussein",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Sepahan_and_Al-Hussein_Jordan_football_teams_meet_21_%282025%29_esfahanzibaonline.ir_%28cropped2%29.jpg/330px-Sepahan_and_Al-Hussein_Jordan_football_teams_meet_21_%282025%29_esfahanzibaonline.ir_%28cropped2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Saed Al-Rosan",
        "position": "DF",
        "club": "Al-Hussein",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/AFC_Champions_League_-_Sepahan_of_Iran_and_Al-Hussein_of_Jordan_17_%28Mehr%2C_2025%29_%28cropped%29.jpg/330px-AFC_Champions_League_-_Sepahan_of_Iran_and_Al-Hussein_of_Jordan_17_%28Mehr%2C_2025%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mohannad Abu Taha",
        "position": "DF",
        "club": "Al-Quwa Al-Jawiya"
      },
      {
        "name": "Adham Al-Quraishi",
        "position": "DF",
        "club": "Al-Hussein"
      },
      {
        "name": "Amer Jamous",
        "position": "MF",
        "club": "Al-Wehdat",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/9/9b/AFC_Champions_League_2_-_Esteghlal_and_Al-Wehdat_football_teams_meet_32_%282025%29_Tasnim_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Rajaei Ayed",
        "position": "MF",
        "club": "Al-Hussein",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Sepahan_and_Al-Hussein_Jordan_football_teams_meet_2_%282025%29_esfahanzibaonline.ir_%28cropped2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Ibrahim Sadeh",
        "position": "MF",
        "club": "Al-Karma"
      },
      {
        "name": "Nizar Al-Rashdan",
        "position": "MF",
        "club": "Al-Zawraa",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Asian_Nations_Cup_-_Jordan_and_South_Korea_%2874%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Mohammad Abu Zrayq",
        "position": "FW",
        "club": "Al-Ramtha",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Mohammad_Abu_Zrayq.jpg/330px-Mohammad_Abu_Zrayq.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Odeh Al-Fakhouri",
        "position": "FW",
        "club": "Al-Hussein",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Sepahan_and_Al-Hussein_Jordan_football_teams_meet_10_%282025%29_esfahanzibaonline.ir_%28cropped%29.jpg/330px-Sepahan_and_Al-Hussein_Jordan_football_teams_meet_10_%282025%29_esfahanzibaonline.ir_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ali Olwan",
        "position": "FW",
        "club": "Al-Karma",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Ali_Olwan.png/330px-Ali_Olwan.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ahmad Ersan",
        "position": "FW",
        "club": "Al-Faisaly"
      },
      {
        "name": "Yazan Al-Naimat",
        "position": "FW",
        "club": "Al-Arabi",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Yazan_Al-Naimat_2.jpg/330px-Yazan_Al-Naimat_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mahmoud Al-Mardi",
        "position": "FW",
        "club": "Dibba",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/6/67/Asian_Nations_Cup_-_Jordan_and_South_Korea_%2867%29_%28cropped3%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      }
    ]
  },
  "MEX": {
    "teamCode": "MEX",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Luis Malagon",
        "position": "GK",
        "club": "America"
      },
      {
        "name": "Carlos Acevedo",
        "position": "GK",
        "club": "Santos Laguna",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Carlos_Acevedo.png/330px-Carlos_Acevedo.png"
      },
      {
        "name": "Raul Rangel",
        "position": "GK",
        "club": "Guadalajara",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ra%C3%BAl_Rangel.png/330px-Ra%C3%BAl_Rangel.png"
      },
      {
        "name": "Jesus Gallardo",
        "position": "DF",
        "club": "Toluca"
      },
      {
        "name": "Edson Alvarez",
        "position": "DF",
        "club": "Fenerbahce",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Edson_%C3%81lvarez.png/330px-Edson_%C3%81lvarez.png"
      },
      {
        "name": "Cesar Montes",
        "position": "DF",
        "club": "Lokomotiv Moscow",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/C%C3%A9sar_Montes.png/330px-C%C3%A9sar_Montes.png"
      },
      {
        "name": "Johan Vasquez",
        "position": "DF",
        "club": "Genoa",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Johan_V%C3%A1squez.jpg/330px-Johan_V%C3%A1squez.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
      },
      {
        "name": "Israel Reyes",
        "position": "DF",
        "club": "America",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Israelreyes.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Kevin Alvarez",
        "position": "DF",
        "club": "America"
      },
      {
        "name": "Jesus Orozco",
        "position": "DF",
        "club": "Cruz Azul"
      },
      {
        "name": "Mateo Chavez",
        "position": "DF",
        "club": "AZ"
      },
      {
        "name": "Orbelin Pineda",
        "position": "MF",
        "club": "AEK Athens",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Orbel%C3%ADn_Pineda.png/330px-Orbel%C3%ADn_Pineda.png"
      },
      {
        "name": "Erick Sanchez",
        "position": "MF",
        "club": "America"
      },
      {
        "name": "Erik Lira",
        "position": "MF",
        "club": "Cruz Azul",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Erik_Lira_2.png/330px-Erik_Lira_2.png"
      },
      {
        "name": "Marcel Ruiz",
        "position": "MF",
        "club": "Toluca"
      },
      {
        "name": "Gilberto Mora",
        "position": "MF",
        "club": "Tijuana"
      },
      {
        "name": "Alexis Gutierrez",
        "position": "MF",
        "club": "America"
      },
      {
        "name": "Fidel Ambriz",
        "position": "MF",
        "club": "Monterrey"
      },
      {
        "name": "Obed Vargas",
        "position": "MF",
        "club": "Seattle Sounders"
      },
      {
        "name": "Jorge Ruvalcaba",
        "position": "MF",
        "club": "UNAM",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Jorge_Ruvalcaba_Red_Bulls_Revolution-38_%28cropped%29.jpg/330px-Jorge_Ruvalcaba_Red_Bulls_Revolution-38_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Raul Jimenez",
        "position": "FW",
        "club": "Fulham",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Ra%C3%BAl_Jim%C3%A9nez_04032026_%281%29.jpg/330px-Ra%C3%BAl_Jim%C3%A9nez_04032026_%281%29.jpg"
      },
      {
        "name": "Hirving Lozano",
        "position": "FW",
        "club": "San Diego",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Hirving_Lozano.png/330px-Hirving_Lozano.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Roberto Alvarado",
        "position": "FW",
        "club": "Guadalajara",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Roberto_Alvarado.png/330px-Roberto_Alvarado.png"
      },
      {
        "name": "Diego Lainez",
        "position": "FW",
        "club": "UANL",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Diego_Lainez.png/330px-Diego_Lainez.png"
      },
      {
        "name": "German Berterame",
        "position": "FW",
        "club": "Monterrey"
      },
      {
        "name": "Armando Gonzalez",
        "position": "FW",
        "club": "Guadalajara"
      }
    ]
  },
  "MAR": {
    "teamCode": "MAR",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Salaheddine Chihab",
        "position": "GK",
        "club": "MAS Fès"
      },
      {
        "name": "Mehdi Benabid",
        "position": "GK",
        "club": "Wydad Casablanca",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Benabid.jpg/330px-Benabid.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Rachid Ghanimi",
        "position": "GK",
        "club": "FUS Rabat"
      },
      {
        "name": "Mohamed Moufid",
        "position": "DF",
        "club": "Wydad Casablanca"
      },
      {
        "name": "Anas Bach",
        "position": "DF",
        "club": "AS FAR"
      },
      {
        "name": "Soufiane Bouftini",
        "position": "DF",
        "club": "Al Wasl"
      },
      {
        "name": "Mahmoud Bentayg",
        "position": "DF",
        "club": "Zamalek"
      },
      {
        "name": "Mohamed Boulacsoute",
        "position": "DF",
        "club": "Raja Casablanca"
      },
      {
        "name": "Marouane Louadni",
        "position": "DF",
        "club": "AS FAR"
      },
      {
        "name": "Marwane Saadane",
        "position": "DF",
        "club": "Al-Fateh"
      },
      {
        "name": "Hamza El Moussaoui",
        "position": "DF",
        "club": "RS Berkane"
      },
      {
        "name": "Mohamed Rabie Hrimat",
        "position": "MF",
        "club": "AS FAR",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Mohamed_Hrimat_warming_up_with_Morocco_%28cropped%29.jpg/330px-Mohamed_Hrimat_warming_up_with_Morocco_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Sabir Bougrine",
        "position": "MF",
        "club": "Raja Casablanca",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/RC_Lens_-_Paris_FC_%2828-09-2018%29_79_%28cropped%29.jpg/330px-RC_Lens_-_Paris_FC_%2828-09-2018%29_79_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Amine Zouhzouh",
        "position": "MF",
        "club": "Al-Wakrah"
      },
      {
        "name": "Walid El Karti",
        "position": "MF",
        "club": "Pyramids"
      },
      {
        "name": "Oussama Tannane",
        "position": "MF",
        "club": "Umm-Salal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/6/65/Oussama_Tannane_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Aschraf El Mahdioui",
        "position": "MF",
        "club": "Al-Taawoun",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Aschraf_El_Mahdioui_%282016%29.jpg/330px-Aschraf_El_Mahdioui_%282016%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Abderrazak Hamdallah",
        "position": "FW",
        "club": "Al-Shabab",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Hamdallah.jpg/330px-Hamdallah.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Youssef Mehri",
        "position": "FW",
        "club": "RS Berkane"
      },
      {
        "name": "Achraf Bencharki",
        "position": "FW",
        "club": "Al Ahly",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Bencharki.jpg/330px-Bencharki.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Tarik Tissoudali",
        "position": "FW",
        "club": "Khor Fakkan",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Lens_B_-_Le_Havre_B_%2813-08-2016%29_43_%28cropped%29.jpg/330px-Lens_B_-_Le_Havre_B_%2813-08-2016%29_43_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Karim El Berkaoui",
        "position": "FW",
        "club": "Al Dhafra"
      },
      {
        "name": "Hamza Hannouri",
        "position": "FW",
        "club": "Wydad Casablanca"
      }
    ]
  },
  "NED": {
    "teamCode": "NED",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Bart Verbruggen",
        "position": "GK",
        "club": "Brighton & Hove Albion",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Bart_Verbruggen.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Robin Roefs",
        "position": "GK",
        "club": "Sunderland"
      },
      {
        "name": "Mark Flekken",
        "position": "GK",
        "club": "Bayer Leverkusen",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flekken%2C_Mark_Greuther_F%C3%BCrth_15-16_WP_%28cropped%29.jpg/330px-Flekken%2C_Mark_Greuther_F%C3%BCrth_15-16_WP_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Lutsharel Geertruida",
        "position": "DF",
        "club": "Sunderland",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Go_Ahead_Eagles_-_Feyenoord_-_53679251479_%28Lutsharel_Geertruida%29.jpg/330px-Go_Ahead_Eagles_-_Feyenoord_-_53679251479_%28Lutsharel_Geertruida%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jurriën Timber",
        "position": "DF",
        "club": "Arsenal",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/JURRIEN_TIMBER.jpg/330px-JURRIEN_TIMBER.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Virgil van Dijk",
        "position": "DF",
        "club": "Liverpool",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/20160604_AUT_NED_8876_%28cropped%29.jpg/330px-20160604_AUT_NED_8876_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nathan Ake",
        "position": "DF",
        "club": "Manchester City"
      },
      {
        "name": "Matthijs de Ligt",
        "position": "DF",
        "club": "Manchester United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/c/c9/2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_Matthijs_de_Ligt_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Jan Paul van Hecke",
        "position": "DF",
        "club": "Brighton & Hove Albion",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Jan_Paul_van_Hecke_24012026_%282%29_%28cropped%29.jpg/330px-Jan_Paul_van_Hecke_24012026_%282%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Micky van de Ven",
        "position": "DF",
        "club": "Tottenham Hotspur",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Micky_Van_De_Ven_pre-match_training_%28cropped%29.jpg/330px-Micky_Van_De_Ven_pre-match_training_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Xavi Simons",
        "position": "MF",
        "club": "Tottenham Hotspur",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Xavi_Simons%2C_Nick_Verhagen_in_duel_met_Xavi_Simons.jpg/330px-Xavi_Simons%2C_Nick_Verhagen_in_duel_met_Xavi_Simons.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ryan Gravenberch",
        "position": "MF",
        "club": "Liverpool",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3342_by_Stepro_%28cropped%29.jpg/330px-2022-07-30_Fu%C3%9Fball%2C_M%C3%A4nner%2C_DFL-Supercup%2C_RB_Leipzig_-_FC_Bayern_M%C3%BCnchen_1DX_3342_by_Stepro_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Tijjani Reijnders",
        "position": "MF",
        "club": "Manchester City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Reijnders_arriva_in_albergo_%28cropped%29.jpg/330px-Reijnders_arriva_in_albergo_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jerdy Schouten",
        "position": "MF",
        "club": "PSV",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Jerdy_schouten-1772637173_%28cropped%29.JPG/330px-Jerdy_schouten-1772637173_%28cropped%29.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Quinten Timber",
        "position": "MF",
        "club": "Feyenoord",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Quinten_Timber.jpg/330px-Quinten_Timber.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Frenkie de Jong",
        "position": "MF",
        "club": "Barcelona",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/4/42/%D0%9C%D0%B0%D1%82%D1%87_%C2%AB%D0%94%D0%B8%D0%BD%D0%B0%D0%BC%D0%BE%C2%BB_-_%C2%AB%D0%91%D0%B0%D1%80%D1%81%D0%B5%D0%BB%D0%BE%D0%BD%D0%B0%C2%BB_0-1._2_%D0%BD%D0%BE%D1%8F%D0%B1%D1%80%D1%8F_2021_%D0%B3%D0%BE%D0%B4%D0%B0._II_%E2%80%94_1289671_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Luciano Valente",
        "position": "MF",
        "club": "Feyenoord",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Luciano_valente-1662326033.jpg/330px-Luciano_valente-1662326033.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Emanuel Emegha",
        "position": "FW",
        "club": "Strasbourg"
      },
      {
        "name": "Memphis Depay",
        "position": "FW",
        "club": "Corinthians",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Memphis_Depay_2019.jpg/330px-Memphis_Depay_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Cody Gakpo",
        "position": "FW",
        "club": "Liverpool",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Cody_Gakpo_06042025_%282%29_%28cropped%29.jpg/330px-Cody_Gakpo_06042025_%282%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Noa Lang",
        "position": "FW",
        "club": "Napoli",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Austria_U-18_vs._Netherlands_U-18_2017-03-23_%28094%29.jpg/330px-Austria_U-18_vs._Netherlands_U-18_2017-03-23_%28094%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Donyell Malen",
        "position": "FW",
        "club": "Aston Villa",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/DONYELL_MALEN_%E2%80%93_2023.08.12.jpg/330px-DONYELL_MALEN_%E2%80%93_2023.08.12.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Justin Kluivert",
        "position": "FW",
        "club": "Bournemouth",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Justin_Kluivert_2023.jpg/330px-Justin_Kluivert_2023.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  "NZL": {
    "teamCode": "NZL",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Max Crocombe",
        "position": "GK",
        "club": "Millwall",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Max_Crocombe_290425.jpg/330px-Max_Crocombe_290425.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Nik Tzanev",
        "position": "GK",
        "club": "Newport County",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Nik_Tzanev%2C_Potters_Bar_Town_footballer%2C_February_2019.jpg/330px-Nik_Tzanev%2C_Potters_Bar_Town_footballer%2C_February_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kees Sims",
        "position": "GK",
        "club": "GAIS"
      },
      {
        "name": "Michael Boxall",
        "position": "DF",
        "club": "Minnesota United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Michael_Boxall_-_MNUFC_-_MLS_-_new_zealand_-_%2852125271279%29.jpg/330px-Michael_Boxall_-_MNUFC_-_MLS_-_new_zealand_-_%2852125271279%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Tommy Smith",
        "position": "DF",
        "club": "Braintree Town"
      },
      {
        "name": "Bill Tuiloma",
        "position": "DF",
        "club": "Charlotte FC",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bill_Tuiloma_Heritage_Rose_jersey_2022-05-14_%28cropped%29.jpg/330px-Bill_Tuiloma_Heritage_Rose_jersey_2022-05-14_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Tyler Bindon",
        "position": "DF",
        "club": "Sheffield United"
      },
      {
        "name": "Storm Roux",
        "position": "DF",
        "club": "Central Coast Mariners",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Storm_Roux_2023.jpg/330px-Storm_Roux_2023.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Francis de Vries",
        "position": "DF",
        "club": "Auckland FC",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Francis_de_Vries.jpg/330px-Francis_de_Vries.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Finn Surman",
        "position": "DF",
        "club": "Portland Timbers",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Finn_Surman.jpg/330px-Finn_Surman.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "James McGarry",
        "position": "DF",
        "club": "Brisbane Roar"
      },
      {
        "name": "George Stanger",
        "position": "DF",
        "club": "Kilmarnock",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/7/73/Acciesu19-Basel-24102018-1_%28Stanger%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Elijah Just",
        "position": "MF",
        "club": "Motherwell",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Elijah_Just.jpg/330px-Elijah_Just.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Matthew Garbett",
        "position": "MF",
        "club": "Peterborough United"
      },
      {
        "name": "Marko Stamenic",
        "position": "MF",
        "club": "Swansea City"
      },
      {
        "name": "Joe Bell",
        "position": "MF",
        "club": "Viking"
      },
      {
        "name": "Callum McCowatt",
        "position": "MF",
        "club": "Silkeborg",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Callum_McCowatt_playing_for_New_Zealand%2C_26_March_2023_%282%29_%28cropped%29.jpg/330px-Callum_McCowatt_playing_for_New_Zealand%2C_26_March_2023_%282%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Sarpreet Singh",
        "position": "MF",
        "club": "TSC",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Sarpreet_Singh_Training_2019-07-28_FC_Bayern_Munich.png/330px-Sarpreet_Singh_Training_2019-07-28_FC_Bayern_Munich.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alex Rufer",
        "position": "MF",
        "club": "Wellington Phoenix",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Alex_Rufer.jpg/330px-Alex_Rufer.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ben Old",
        "position": "MF",
        "club": "Saint-Étienne",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Old_asse_psg_2425.png/330px-Old_asse_psg_2425.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Owen Parker-Price",
        "position": "MF",
        "club": "Örgryte"
      },
      {
        "name": "Kosta Barbarouses",
        "position": "FW",
        "club": "Western Sydney Wanderers",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Kosta_Barbarousas_Training.JPG/330px-Kosta_Barbarousas_Training.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Ben Waine",
        "position": "FW",
        "club": "Port Vale",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Ben_Waine.jpg/330px-Ben_Waine.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Andre de Jong",
        "position": "FW",
        "club": "Stellenbosch",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Andre_de_Jong_%282%29.jpg/330px-Andre_de_Jong_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jesse Randall",
        "position": "FW",
        "club": "Auckland FC"
      }
    ]
  },
  "NOR": {
    "teamCode": "NOR",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Ørjan Nyland",
        "position": "GK",
        "club": "Sevilla",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Norway_Italy_-_June_2025_A_10_%28cropped%29.jpg/330px-Norway_Italy_-_June_2025_A_10_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Mathias Dyngeland",
        "position": "GK",
        "club": "Brann",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Keeper_Mathias_Dyngeland%2C_Sogndal-Rosenborg_07-15-2017-2_%28cropped%29.jpg/330px-Keeper_Mathias_Dyngeland%2C_Sogndal-Rosenborg_07-15-2017-2_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Sander Tangvik",
        "position": "GK",
        "club": "Rosenborg"
      },
      {
        "name": "Kristoffer Ajer",
        "position": "DF",
        "club": "Brentford",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Norway_Italy_-_June_2025_E_21_%28cropped%29.jpg/330px-Norway_Italy_-_June_2025_E_21_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Leo Skiri Østigård",
        "position": "DF",
        "club": "Genoa"
      },
      {
        "name": "David Møller Wolfe",
        "position": "DF",
        "club": "Wolverhampton Wanderers",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/David_M%C3%B8ller_Wolfe.jpg/330px-David_M%C3%B8ller_Wolfe.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Julian Ryerson",
        "position": "DF",
        "club": "Borussia Dortmund",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/2023-08-12_TSV_Schott_Mainz_gegen_Borussia_Dortmund_%28DFB-Pokal_2023-24%29_by_Sandro_Halank%E2%80%93102.jpg/330px-2023-08-12_TSV_Schott_Mainz_gegen_Borussia_Dortmund_%28DFB-Pokal_2023-24%29_by_Sandro_Halank%E2%80%93102.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Fredrik André Bjørkan",
        "position": "DF",
        "club": "Bodø/Glimt",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/F_Bj%C3%B8rkan.jpg/330px-F_Bj%C3%B8rkan.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Marcus Holmgren Pedersen",
        "position": "DF",
        "club": "Torino",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Marcus_Holmgren_Pedersen_2022_FC_RB_Salzburg_gegen_Feyenoord_Rotterdam_%28cropped%29.jpg/330px-Marcus_Holmgren_Pedersen_2022_FC_RB_Salzburg_gegen_Feyenoord_Rotterdam_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Torbjørn Heggem",
        "position": "DF",
        "club": "Bologna",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Norway_Italy_-_June_2025_D_05_%28cropped%29.jpg/330px-Norway_Italy_-_June_2025_D_05_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Sondre Langås",
        "position": "DF",
        "club": "Derby County",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sondre_Lang%C3%A5s_25042026_%281%29.jpg/330px-Sondre_Lang%C3%A5s_25042026_%281%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Morten Thorsby",
        "position": "MF",
        "club": "Genoa",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Norway_Italy_-_June_2025_E_24_%28cropped%29.jpg/330px-Norway_Italy_-_June_2025_E_24_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Patrick Berg",
        "position": "MF",
        "club": "Bodø/Glimt",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Norway_Italy_-_June_2025_A_14_%28cropped%29.jpg/330px-Norway_Italy_-_June_2025_A_14_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Sander Berge",
        "position": "MF",
        "club": "Fulham",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Norway_Italy_-_June_2025_E_25_%28cropped%29.jpg/330px-Norway_Italy_-_June_2025_E_25_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Kristian Thorstvedt",
        "position": "MF",
        "club": "Sassuolo"
      },
      {
        "name": "Kristian Arnstad",
        "position": "MF",
        "club": "AGF",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Kristian_Arnstad_-_RSCA_%282021%29_%28cropped%29.jpg/330px-Kristian_Arnstad_-_RSCA_%282021%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Antonio Nusa",
        "position": "MF",
        "club": "RB Leipzig",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Norway_Italy_-_June_2025_C_23.jpg/330px-Norway_Italy_-_June_2025_C_23.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Oscar Bobb",
        "position": "MF",
        "club": "Manchester City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/ManCity20240722-050_%28Oscar_Bobb2%29.jpg/330px-ManCity20240722-050_%28Oscar_Bobb2%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Thelo Aasgaard",
        "position": "MF",
        "club": "Rangers"
      },
      {
        "name": "Aron Dønnum",
        "position": "MF",
        "club": "Toulouse",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/TFC-FC_Metz_%282023-10-01%29_Aron_D%C3%B8nnum_contr%C3%B4le_%28cropped%29.jpg/330px-TFC-FC_Metz_%282023-10-01%29_Aron_D%C3%B8nnum_contr%C3%B4le_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Alexander Sørloth",
        "position": "FW",
        "club": "Atlético Madrid",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Norway_Italy_-_June_2025_E_10.jpg/330px-Norway_Italy_-_June_2025_E_10.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Erling Haaland",
        "position": "FW",
        "club": "Manchester City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Erling_Haaland_June_2025.jpg/330px-Erling_Haaland_June_2025.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Andreas Schjelderup",
        "position": "FW",
        "club": "Benfica"
      },
      {
        "name": "Jørgen Strand Larsen",
        "position": "FW",
        "club": "Wolverhampton Wanderers",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Norway_Italy_-_June_2025_A_15_%28cropped%29.jpg/330px-Norway_Italy_-_June_2025_A_15_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  "PAN": {
    "teamCode": "PAN",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Luis Mejia",
        "position": "GK",
        "club": "Nacional"
      },
      {
        "name": "Cesar Samudio",
        "position": "GK",
        "club": "Marathon"
      },
      {
        "name": "Orlando Mosquera",
        "position": "GK",
        "club": "Al-Fayha",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Partido_Galicia_-_Panam%C3%A1_en_Bala%C3%ADdos_160_%28Orlando_Mosquera%29.jpg/330px-Partido_Galicia_-_Panam%C3%A1_en_Bala%C3%ADdos_160_%28Orlando_Mosquera%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Cesar Blackman",
        "position": "DF",
        "club": "Slovan Bratislava"
      },
      {
        "name": "Ivan Anderson",
        "position": "DF",
        "club": "Marathon"
      },
      {
        "name": "Fidel Escobar",
        "position": "DF",
        "club": "Saprissa",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/e/e8/ENG-PAN_%2813%29_2018-6-29_Fidel_Escobar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Edgardo Farina",
        "position": "DF",
        "club": "Pari Nizhny Novgorod"
      },
      {
        "name": "Carlos Harvey",
        "position": "DF",
        "club": "Minnesota United"
      },
      {
        "name": "Eric Davis",
        "position": "DF",
        "club": "Plaza Amador"
      },
      {
        "name": "Andres Andrade",
        "position": "DF",
        "club": "LASK"
      },
      {
        "name": "Jorge Gutierrez",
        "position": "DF",
        "club": "Deportivo La Guaira"
      },
      {
        "name": "Jiovany Ramos",
        "position": "DF",
        "club": "Puerto Cabello"
      },
      {
        "name": "Cristian Martinez",
        "position": "MF",
        "club": "Ironi Kiryat Shmona"
      },
      {
        "name": "Jose Rodriguez",
        "position": "MF",
        "club": "Juarez"
      },
      {
        "name": "Adalberto Carrasquilla",
        "position": "MF",
        "club": "UNAM",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/d/dc/Inter_Miami_CF_3-1_UNAM_%286_August_2025%29_27_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
      },
      {
        "name": "Ismael Diaz",
        "position": "MF",
        "club": "Leon"
      },
      {
        "name": "Azarias Londono",
        "position": "MF",
        "club": "Universidad Catolica"
      },
      {
        "name": "Edward Cedeno",
        "position": "MF",
        "club": "Las Palmas"
      },
      {
        "name": "Alberto Quintero",
        "position": "MF",
        "club": "Plaza Amador"
      },
      {
        "name": "Anibal Godoy",
        "position": "MF",
        "club": "San Diego"
      },
      {
        "name": "Omar Browne",
        "position": "MF",
        "club": "Estudiantes de Merida",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Omar_Browne%2C_Forge_FC.jpg/330px-Omar_Browne%2C_Forge_FC.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Jovani Welch",
        "position": "MF",
        "club": "Monagas",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Partido_Galicia_-_Panam%C3%A1_en_Bala%C3%ADdos_51_%28Jovani_Welch%29.jpg/330px-Partido_Galicia_-_Panam%C3%A1_en_Bala%C3%ADdos_51_%28Jovani_Welch%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Tomas Rodriguez",
        "position": "FW",
        "club": "Monagas"
      },
      {
        "name": "Jose Fajardo",
        "position": "FW",
        "club": "Universidad Catolica"
      },
      {
        "name": "Cecilio Waterman",
        "position": "FW",
        "club": "Coquimbo Unido",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Cecilio_Waterman_Everton_v_Cobresal_20230828_03.jpg/330px-Cecilio_Waterman_Everton_v_Cobresal_20230828_03.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      }
    ]
  },
  "PAR": {
    "teamCode": "PAR",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Roberto Fernandez",
        "position": "GK",
        "club": "Cerro Porteño"
      },
      {
        "name": "Orlando Gill",
        "position": "GK",
        "club": "San Lorenzo"
      },
      {
        "name": "Aldo Perez",
        "position": "GK",
        "club": "Guarani"
      },
      {
        "name": "Gustavo Gomez",
        "position": "DF",
        "club": "Palmeiras"
      },
      {
        "name": "Junior Alonso",
        "position": "DF",
        "club": "Atletico Mineiro"
      },
      {
        "name": "Juan Caceres",
        "position": "DF",
        "club": "Dynamo Moscow"
      },
      {
        "name": "Blas Riveros",
        "position": "DF",
        "club": "Cerro Porteño",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bl%C3%A1s_Riveros_2019.jpg/330px-Bl%C3%A1s_Riveros_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Gustavo Velazquez",
        "position": "DF",
        "club": "Cerro Porteño"
      },
      {
        "name": "Alan Benitez",
        "position": "DF",
        "club": "Internacional"
      },
      {
        "name": "Agustin Sandez",
        "position": "DF",
        "club": "Rosario Central"
      },
      {
        "name": "Alexis Duarte",
        "position": "DF",
        "club": "Santos",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Alexis_Duarte_%28cropped%29.jpg/330px-Alexis_Duarte_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Miguel Almiron",
        "position": "MF",
        "club": "Atlanta United"
      },
      {
        "name": "Alejandro Romero Gamarra",
        "position": "MF",
        "club": "Al Ain"
      },
      {
        "name": "Ramon Sosa",
        "position": "MF",
        "club": "Palmeiras"
      },
      {
        "name": "Diego Gomez",
        "position": "MF",
        "club": "Brighton & Hove Albion"
      },
      {
        "name": "Damian Bobadilla",
        "position": "MF",
        "club": "São Paulo"
      },
      {
        "name": "Braian Ojeda",
        "position": "MF",
        "club": "Real Salt Lake",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Dynamo_vs_Real_Salt_Lake_%28Mar_2025%29_16_%28cropped%29.jpg/330px-Dynamo_vs_Real_Salt_Lake_%28Mar_2025%29_16_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Matias Galarza",
        "position": "MF",
        "club": "River Plate"
      },
      {
        "name": "Diego Gonzalez",
        "position": "MF",
        "club": "Atlas"
      },
      {
        "name": "Hugo Cuenca",
        "position": "MF",
        "club": "Genoa"
      },
      {
        "name": "Diego Leon",
        "position": "MF",
        "club": "Manchester United"
      },
      {
        "name": "Lucas Romero",
        "position": "MF",
        "club": "Recoleta",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Independiente_-_Central_Norte_-_Copa_Argentina_2022_%2856%29_%28cropped%29.jpg/330px-Independiente_-_Central_Norte_-_Copa_Argentina_2022_%2856%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Antonio Sanabria",
        "position": "FW",
        "club": "Cremonese",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Antonio_Sanabria%2C_2025_%28cropped%29.jpg/330px-Antonio_Sanabria%2C_2025_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
      },
      {
        "name": "Julio Enciso",
        "position": "FW",
        "club": "Strasbourg"
      },
      {
        "name": "Alex Arce",
        "position": "FW",
        "club": "Independiente Rivadavia"
      },
      {
        "name": "Ronaldo Martinez",
        "position": "FW",
        "club": "Platense"
      }
    ]
  },
  "POR": {
    "teamCode": "POR",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Diogo Costa",
        "position": "GK",
        "club": "Porto"
      },
      {
        "name": "José Sá",
        "position": "GK",
        "club": "Wolverhampton Wanderers"
      },
      {
        "name": "Rui Silva",
        "position": "GK",
        "club": "Sporting CP"
      },
      {
        "name": "Nélson Semedo",
        "position": "DF",
        "club": "Fenerbahçe"
      },
      {
        "name": "Rúben Dias",
        "position": "DF",
        "club": "Manchester City"
      },
      {
        "name": "António Silva",
        "position": "DF",
        "club": "Benfica"
      },
      {
        "name": "Diogo Dalot",
        "position": "DF",
        "club": "Manchester United"
      },
      {
        "name": "Renato Veiga",
        "position": "DF",
        "club": "Villarreal"
      },
      {
        "name": "Gonçalo Inácio",
        "position": "DF",
        "club": "Sporting CP"
      },
      {
        "name": "João Cancelo",
        "position": "DF",
        "club": "Al-Hilal"
      },
      {
        "name": "João Palhinha",
        "position": "MF",
        "club": "Tottenham Hotspur"
      },
      {
        "name": "Bruno Fernandes",
        "position": "MF",
        "club": "Manchester United"
      },
      {
        "name": "Bernardo Silva",
        "position": "MF",
        "club": "Manchester City"
      },
      {
        "name": "João Neves",
        "position": "MF",
        "club": "Paris Saint-Germain"
      },
      {
        "name": "Matheus Nunes",
        "position": "MF",
        "club": "Manchester City"
      },
      {
        "name": "Rúben Neves",
        "position": "MF",
        "club": "Al-Hilal"
      },
      {
        "name": "Vitinha",
        "position": "MF",
        "club": "Paris Saint-Germain"
      },
      {
        "name": "Carlos Forbs",
        "position": "FW",
        "club": "Club Brugge"
      },
      {
        "name": "Gonçalo Ramos",
        "position": "FW",
        "club": "Paris Saint-Germain"
      },
      {
        "name": "João Félix",
        "position": "FW",
        "club": "Al-Nassr"
      },
      {
        "name": "Francisco Trincão",
        "position": "FW",
        "club": "Sporting CP"
      },
      {
        "name": "Rafael Leão",
        "position": "FW",
        "club": "Milan"
      },
      {
        "name": "Francisco Conceição",
        "position": "FW",
        "club": "Juventus"
      },
      {
        "name": "Cristiano Ronaldo",
        "position": "FW",
        "club": "Al-Nassr"
      }
    ]
  },
  "QAT": {
    "teamCode": "QAT",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Shehab Ellethy",
        "position": "GK",
        "club": "Al-Shahaniya"
      },
      {
        "name": "Mahmud Abunada",
        "position": "GK",
        "club": "Al-Arabi"
      },
      {
        "name": "Meshaal Barsham",
        "position": "GK",
        "club": "Al-Sadd"
      },
      {
        "name": "Issa Laye",
        "position": "DF",
        "club": "Al-Arabi"
      },
      {
        "name": "Lucas Mendes",
        "position": "DF",
        "club": "Al-Wakrah"
      },
      {
        "name": "Tarek Salman",
        "position": "DF",
        "club": "Al-Sadd"
      },
      {
        "name": "Ayoub Al-Oui",
        "position": "DF",
        "club": "Al-Gharafa"
      },
      {
        "name": "Homam Ahmed",
        "position": "DF",
        "club": "Al-Duhail"
      },
      {
        "name": "Yousef Aymen",
        "position": "DF",
        "club": "Al-Duhail"
      },
      {
        "name": "Al-Hashmi Al-Hussain",
        "position": "DF",
        "club": "Al-Arabi"
      },
      {
        "name": "Sultan Al-Brake",
        "position": "DF",
        "club": "Al-Duhail"
      },
      {
        "name": "Mohammed Waad",
        "position": "MF",
        "club": "Al-Sadd"
      },
      {
        "name": "Abdulaziz Hatem",
        "position": "MF",
        "club": "Al-Rayyan"
      },
      {
        "name": "Jassem Gaber",
        "position": "MF",
        "club": "Al-Rayyan"
      },
      {
        "name": "Khalid Ali Sabah",
        "position": "MF",
        "club": "Al-Sailiya"
      },
      {
        "name": "Mohamed Al-Mannai",
        "position": "MF",
        "club": "Al-Shamal"
      },
      {
        "name": "Ahmed Fathy",
        "position": "MF",
        "club": "Al-Arabi"
      },
      {
        "name": "Assim Madibo",
        "position": "MF",
        "club": "Al-Wakrah"
      },
      {
        "name": "Ahmed Alaaeldin",
        "position": "FW",
        "club": "Al-Rayyan"
      },
      {
        "name": "Mohammed Muntari",
        "position": "FW",
        "club": "Al-Gharafa"
      },
      {
        "name": "Akram Afif",
        "position": "FW",
        "club": "Al-Sadd"
      },
      {
        "name": "Edmilson Junior",
        "position": "FW",
        "club": "Al-Duhail"
      },
      {
        "name": "Mohamed Khaled Gouda",
        "position": "FW",
        "club": "Al-Arabi"
      }
    ]
  },
  "KSA": {
    "teamCode": "KSA",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Nawaf Al-Aqidi",
        "position": "GK",
        "club": "Al-Nassr"
      },
      {
        "name": "Abdulrahman Al-Sanbi",
        "position": "GK",
        "club": "Al-Ahli"
      },
      {
        "name": "Raghed Al-Najjar",
        "position": "GK",
        "club": "Al-Nassr"
      },
      {
        "name": "Ali Majrashi",
        "position": "DF",
        "club": "Al-Ahli"
      },
      {
        "name": "Jehad Thakri",
        "position": "DF",
        "club": "Al-Qadsiah"
      },
      {
        "name": "Abdulelah Al-Amri",
        "position": "DF",
        "club": "Al-Nassr"
      },
      {
        "name": "Hassan Al-Tambakti",
        "position": "DF",
        "club": "Al-Hilal"
      },
      {
        "name": "Mohammed Abu Al-Shamat",
        "position": "DF",
        "club": "Al-Qadsiah"
      },
      {
        "name": "Nawaf Boushal",
        "position": "DF",
        "club": "Al-Nassr"
      },
      {
        "name": "Waleed Al-Ahmed",
        "position": "DF",
        "club": "Al-Taawoun"
      },
      {
        "name": "Mohammed Sulaiman",
        "position": "DF",
        "club": "Al-Ahli"
      },
      {
        "name": "Nasser Al-Dawsari",
        "position": "MF",
        "club": "Al-Hilal"
      },
      {
        "name": "Musab Al-Juwayr",
        "position": "MF",
        "club": "Al-Qadsiah"
      },
      {
        "name": "Ayman Yahya",
        "position": "MF",
        "club": "Al-Nassr"
      },
      {
        "name": "Salem Al-Dawsari",
        "position": "MF",
        "club": "Al-Hilal"
      },
      {
        "name": "Abdullah Al-Khaibari",
        "position": "MF",
        "club": "Al-Nassr"
      },
      {
        "name": "Murad Hawsawi",
        "position": "MF",
        "club": "Al-Khaleej"
      },
      {
        "name": "Saleh Abu Al-Shamat",
        "position": "MF",
        "club": "Al-Ahli"
      },
      {
        "name": "Abdulrahman Al-Aboud",
        "position": "MF",
        "club": "Al-Ittihad"
      },
      {
        "name": "Mohamed Kanno",
        "position": "MF",
        "club": "Al-Hilal"
      },
      {
        "name": "Firas Al-Buraikan",
        "position": "FW",
        "club": "Al-Ahli"
      },
      {
        "name": "Saleh Al-Shehri",
        "position": "FW",
        "club": "Al-Ittihad"
      },
      {
        "name": "Abdullah Al-Hamdan",
        "position": "FW",
        "club": "Al-Hilal"
      }
    ]
  },
  "SCO": {
    "teamCode": "SCO",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Craig Gordon",
        "position": "GK",
        "club": "Heart of Midlothian"
      },
      {
        "name": "Liam Kelly",
        "position": "GK",
        "club": "Rangers"
      },
      {
        "name": "Scott Bain",
        "position": "GK",
        "club": "Falkirk"
      },
      {
        "name": "Aaron Hickey",
        "position": "DF",
        "club": "Brentford"
      },
      {
        "name": "Andy Robertson",
        "position": "DF",
        "club": "Liverpool) (captain"
      },
      {
        "name": "Grant Hanley",
        "position": "DF",
        "club": "Hibernian"
      },
      {
        "name": "Kieran Tierney",
        "position": "DF",
        "club": "Celtic"
      },
      {
        "name": "Jack Hendry",
        "position": "DF",
        "club": "Al-Ettifaq"
      },
      {
        "name": "John Souttar",
        "position": "DF",
        "club": "Rangers"
      },
      {
        "name": "Scott McKenna",
        "position": "DF",
        "club": "Dinamo Zagreb"
      },
      {
        "name": "Anthony Ralston",
        "position": "DF",
        "club": "Celtic"
      },
      {
        "name": "Josh Doig",
        "position": "DF",
        "club": "Sassuolo"
      },
      {
        "name": "Scott McTominay",
        "position": "MF",
        "club": "Napoli"
      },
      {
        "name": "John McGinn",
        "position": "MF",
        "club": "Aston Villa"
      },
      {
        "name": "Andy Irving",
        "position": "MF",
        "club": "West Ham United"
      },
      {
        "name": "Ryan Christie",
        "position": "MF",
        "club": "Bournemouth"
      },
      {
        "name": "Connor Barron",
        "position": "MF",
        "club": "Rangers"
      },
      {
        "name": "Ben Gannon-Doak",
        "position": "MF",
        "club": "Bournemouth"
      },
      {
        "name": "Lewis Ferguson",
        "position": "MF",
        "club": "Bologna"
      },
      {
        "name": "Kenny McLean",
        "position": "MF",
        "club": "Norwich City"
      },
      {
        "name": "Lyndon Dykes",
        "position": "FW",
        "club": "Birmingham City"
      },
      {
        "name": "Che Adams",
        "position": "FW",
        "club": "Torino"
      },
      {
        "name": "George Hirst",
        "position": "FW",
        "club": "Ipswich Town"
      },
      {
        "name": "Lawrence Shankland",
        "position": "FW",
        "club": "Heart of Midlothian"
      }
    ]
  },
  "SEN": {
    "teamCode": "SEN",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Yehvann Diouf",
        "position": "GK",
        "club": "Nice"
      },
      {
        "name": "Edouard Mendy",
        "position": "GK",
        "club": "Al-Ahli"
      },
      {
        "name": "Mory Diaw",
        "position": "GK",
        "club": "Le Havre"
      },
      {
        "name": "Mamadou Sarr",
        "position": "DF",
        "club": "Strasbourg"
      },
      {
        "name": "Kalidou Koulibaly",
        "position": "DF",
        "club": "Al-Hilal"
      },
      {
        "name": "Abdoulaye Seck",
        "position": "DF",
        "club": "Maccabi Haifa"
      },
      {
        "name": "Ismail Jakobs",
        "position": "DF",
        "club": "Galatasaray"
      },
      {
        "name": "Ilay Camara",
        "position": "DF",
        "club": "Anderlecht"
      },
      {
        "name": "Moussa Niakhate",
        "position": "DF",
        "club": "Lyon"
      },
      {
        "name": "Antoine Mendy",
        "position": "DF",
        "club": "Nice"
      },
      {
        "name": "El Hadji Malick Diouf",
        "position": "DF",
        "club": "West Ham United"
      },
      {
        "name": "Idrissa Gueye",
        "position": "MF",
        "club": "Everton"
      },
      {
        "name": "Pathe Ciss",
        "position": "MF",
        "club": "Rayo Vallecano"
      },
      {
        "name": "Lamine Camara",
        "position": "MF",
        "club": "Monaco"
      },
      {
        "name": "Pape Matar Sarr",
        "position": "MF",
        "club": "Tottenham Hotspur"
      },
      {
        "name": "Rassoul Ndiaye",
        "position": "MF",
        "club": "Le Havre"
      },
      {
        "name": "Pape Gueye",
        "position": "MF",
        "club": "Villarreal"
      },
      {
        "name": "Boulaye Dia",
        "position": "FW",
        "club": "Lazio"
      },
      {
        "name": "Sadio Mane",
        "position": "FW",
        "club": "Al-Nassr"
      },
      {
        "name": "Nicolas Jackson",
        "position": "FW",
        "club": "Bayern Munich"
      },
      {
        "name": "Cherif Ndiaye",
        "position": "FW",
        "club": "Samsunspor"
      },
      {
        "name": "Iliman Ndiaye",
        "position": "FW",
        "club": "Everton"
      },
      {
        "name": "Ismaila Sarr",
        "position": "FW",
        "club": "Crystal Palace"
      },
      {
        "name": "Cheikh Sabaly",
        "position": "FW",
        "club": "Metz"
      },
      {
        "name": "Ibrahim Mbaye",
        "position": "FW",
        "club": "Paris Saint-Germain"
      },
      {
        "name": "Habib Diallo",
        "position": "FW",
        "club": "Metz"
      },
      {
        "name": "Assane Diao",
        "position": "FW",
        "club": "Como"
      }
    ]
  },
  "RSA": {
    "teamCode": "RSA",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Ronwen Williams",
        "position": "GK",
        "club": "Mamelodi Sundowns"
      },
      {
        "name": "Ricardo Goss",
        "position": "GK",
        "club": "Siwelele"
      },
      {
        "name": "Sipho Chaine",
        "position": "GK",
        "club": "Orlando Pirates"
      },
      {
        "name": "Renaldo Leaner",
        "position": "GK",
        "club": "Sekhukhune United"
      },
      {
        "name": "Darren Johnson",
        "position": "GK",
        "club": "AmaZulu"
      },
      {
        "name": "Brandon Petersen",
        "position": "GK",
        "club": "Kaizer Chiefs"
      },
      {
        "name": "Aubrey Modiba",
        "position": "DF",
        "club": "Mamelodi Sundowns",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Aubrey_Modiba_%28cropped%29.jpg/330px-Aubrey_Modiba_%28cropped%29.jpg"
      },
      {
        "name": "Thapelo Morena",
        "position": "DF",
        "club": "Mamelodi Sundowns"
      },
      {
        "name": "Khuliso Mudau",
        "position": "DF",
        "club": "Mamelodi Sundowns"
      },
      {
        "name": "Nkosinathi Sibisi",
        "position": "DF",
        "club": "Orlando Pirates"
      },
      {
        "name": "Siyabonga Ngezana",
        "position": "DF",
        "club": "FCSB",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Siyabonga_Ngezana_-_3_July_2023_%28cropped%29.jpg/330px-Siyabonga_Ngezana_-_3_July_2023_%28cropped%29.jpg"
      },
      {
        "name": "Ime Okon",
        "position": "DF",
        "club": "Hannover 96"
      },
      {
        "name": "Mbekezeli Mbokazi",
        "position": "DF",
        "club": "Orlando Pirates"
      },
      {
        "name": "Fawaaz Basadien",
        "position": "DF",
        "club": "Mamelodi Sundowns"
      },
      {
        "name": "Malibongwe Khoza",
        "position": "DF",
        "club": "Mamelodi Sundowns"
      },
      {
        "name": "Khulumani Ndamane",
        "position": "DF",
        "club": "TS Galaxy"
      },
      {
        "name": "Samukele Kabini",
        "position": "DF",
        "club": "Molde"
      },
      {
        "name": "Thabo Moloisane",
        "position": "DF",
        "club": "Stellenbosch"
      },
      {
        "name": "Thabiso Monyane",
        "position": "DF",
        "club": "Kaizer Chiefs"
      },
      {
        "name": "Thabang Matuludi",
        "position": "DF",
        "club": "Polokwane City"
      },
      {
        "name": "Keegan Allan",
        "position": "DF",
        "club": "AmaZulu"
      },
      {
        "name": "Bradley Cross",
        "position": "DF",
        "club": "Kaizer Chiefs"
      },
      {
        "name": "Fezile Gcaba",
        "position": "DF",
        "club": "Durban City"
      },
      {
        "name": "Vuyo Letlapa",
        "position": "DF",
        "club": "Sekhukhune United"
      },
      {
        "name": "Tylon Smith",
        "position": "DF",
        "club": "Queens Park Rangers"
      },
      {
        "name": "Themba Zwane",
        "position": "MF",
        "club": "Mamelodi Sundowns"
      },
      {
        "name": "Teboho Mokoena",
        "position": "MF",
        "club": "Mamelodi Sundowns"
      },
      {
        "name": "Sphephelo Sithole",
        "position": "MF",
        "club": "Tondela"
      },
      {
        "name": "Bathusi Aubaas",
        "position": "MF",
        "club": "Mamelodi Sundowns"
      },
      {
        "name": "Thalente Mbatha",
        "position": "MF",
        "club": "Orlando Pirates"
      },
      {
        "name": "Luke Le Roux",
        "position": "MF",
        "club": "Portsmouth"
      },
      {
        "name": "Patrick Maswanganyi",
        "position": "MF",
        "club": "Orlando Pirates"
      },
      {
        "name": "Sipho Mbule",
        "position": "MF",
        "club": "Orlando Pirates"
      },
      {
        "name": "Ndamulelo Maphangule",
        "position": "MF",
        "club": "Polokwane City"
      },
      {
        "name": "Mduduzi Shabalala",
        "position": "MF",
        "club": "Kaizer Chiefs"
      },
      {
        "name": "Siphesihle Maduna",
        "position": "MF",
        "club": "TS Galaxy"
      },
      {
        "name": "Siphesihle Mkhize",
        "position": "MF",
        "club": "Sekhukhune United"
      },
      {
        "name": "Mthetheleli Mthiyane",
        "position": "MF",
        "club": "Stellenbosch"
      },
      {
        "name": "Masindi Nemtajela",
        "position": "MF",
        "club": "Orlando Pirates"
      },
      {
        "name": "Evidence Makgopa",
        "position": "FW",
        "club": "Orlando Pirates"
      },
      {
        "name": "Lyle Foster",
        "position": "FW",
        "club": "Burnley",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Lyle_Foster_29112025_%286%29.jpg/330px-Lyle_Foster_29112025_%286%29.jpg"
      },
      {
        "name": "Oswin Appollis",
        "position": "FW",
        "club": "Orlando Pirates"
      },
      {
        "name": "Bongokuhle Hlongwane",
        "position": "FW",
        "club": "Minnesota United",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bongokuhle_%27Bongi%27_Hlongwane_-_MNUFC_-_Allianz_Field_-_MLS_-_%2852125526845%29.jpg/330px-Bongokuhle_%27Bongi%27_Hlongwane_-_MNUFC_-_Allianz_Field_-_MLS_-_%2852125526845%29.jpg"
      },
      {
        "name": "Mihlali Mayambela",
        "position": "FW",
        "club": "Aris Limassol"
      },
      {
        "name": "Iqraam Rayners",
        "position": "FW",
        "club": "Mamelodi Sundowns"
      },
      {
        "name": "Elias Mokwana",
        "position": "FW",
        "club": "Al-Hazem"
      },
      {
        "name": "Relebohile Mofokeng",
        "position": "FW",
        "club": "Orlando Pirates"
      },
      {
        "name": "Mohau Nkota",
        "position": "FW",
        "club": "Al-Ettifaq"
      },
      {
        "name": "Tshepang Moremi",
        "position": "FW",
        "club": "Orlando Pirates"
      },
      {
        "name": "Kamogelo Sebelebele",
        "position": "FW",
        "club": "Orlando Pirates"
      },
      {
        "name": "Shandre Campbell",
        "position": "FW",
        "club": "Club Brugge"
      },
      {
        "name": "Ashley Cupido",
        "position": "FW",
        "club": "Stellenbosch"
      },
      {
        "name": "Puso Dithejane",
        "position": "FW",
        "club": "TS Galaxy"
      },
      {
        "name": "Keletso Makgalwa",
        "position": "FW",
        "club": "Sekhukhune United"
      }
    ]
  },
  "KOR": {
    "teamCode": "KOR",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Kim Seung-gyu",
        "position": "GK",
        "club": "FC Tokyo"
      },
      {
        "name": "Song Bum-keun",
        "position": "GK",
        "club": "Jeonbuk Hyundai Motors"
      },
      {
        "name": "Jo Hyeon-woo",
        "position": "GK",
        "club": "Ulsan HD"
      },
      {
        "name": "Lee Myung-jae",
        "position": "DF",
        "club": "Daejeon Hana Citizen"
      },
      {
        "name": "Lee Han-beom",
        "position": "DF",
        "club": "Midtjylland"
      },
      {
        "name": "Kim Min-jae",
        "position": "DF",
        "club": "Bayern Munich"
      },
      {
        "name": "Lee Tae-seok",
        "position": "DF",
        "club": "Austria Wien"
      },
      {
        "name": "Cho Yu-min",
        "position": "DF",
        "club": "Sharjah"
      },
      {
        "name": "Kim Moon-hwan",
        "position": "DF",
        "club": "Daejeon Hana Citizen"
      },
      {
        "name": "Park Jin-seob",
        "position": "DF",
        "club": "Jeonbuk Hyundai Motors"
      },
      {
        "name": "Seol Young-woo",
        "position": "DF",
        "club": "Red Star Belgrade"
      },
      {
        "name": "Kim Tae-hyeon",
        "position": "DF",
        "club": "Kashima Antlers"
      },
      {
        "name": "Won Du-jae",
        "position": "MF",
        "club": "Khor Fakkan"
      },
      {
        "name": "Seo Min-woo",
        "position": "MF",
        "club": "Gangwon FC"
      },
      {
        "name": "Lee Jae-sung",
        "position": "MF",
        "club": "Mainz 05"
      },
      {
        "name": "Hwang Hee-chan",
        "position": "MF",
        "club": "Wolverhampton Wanderers"
      },
      {
        "name": "Eom Ji-sung",
        "position": "MF",
        "club": "Swansea City"
      },
      {
        "name": "Lee Kang-in",
        "position": "MF",
        "club": "Paris Saint-Germain"
      },
      {
        "name": "Bae Jun-ho",
        "position": "MF",
        "club": "Stoke City"
      },
      {
        "name": "Jens Castrop",
        "position": "MF",
        "club": "Borussia Mönchengladbach"
      },
      {
        "name": "Kim Jin-gyu",
        "position": "MF",
        "club": "Jeonbuk Hyundai Motors"
      },
      {
        "name": "Kwon Hyeok-kyu",
        "position": "MF",
        "club": "Nantes"
      },
      {
        "name": "Yang Min-hyeok",
        "position": "MF",
        "club": "Portsmouth"
      },
      {
        "name": "Son Heung-min",
        "position": "FW",
        "club": "Los Angeles FC"
      },
      {
        "name": "Cho Gue-sung",
        "position": "FW",
        "club": "Midtjylland"
      },
      {
        "name": "Oh Hyeon-gyu",
        "position": "FW",
        "club": "Genk"
      }
    ]
  },
  "ESP": {
    "teamCode": "ESP",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "David Raya",
        "position": "GK",
        "club": "Arsenal"
      },
      {
        "name": "Alex Remiro",
        "position": "GK",
        "club": "Real Sociedad"
      },
      {
        "name": "Unai Simon",
        "position": "GK",
        "club": "Athletic Bilbao"
      },
      {
        "name": "Dani Vivian",
        "position": "DF",
        "club": "Athletic Bilbao"
      },
      {
        "name": "Marcos Llorente",
        "position": "DF",
        "club": "Atlético Madrid"
      },
      {
        "name": "Pedro Porro",
        "position": "DF",
        "club": "Tottenham Hotspur"
      },
      {
        "name": "Aymeric Laporte",
        "position": "DF",
        "club": "Athletic Bilbao"
      },
      {
        "name": "Pau Cubarsi",
        "position": "DF",
        "club": "Barcelona"
      },
      {
        "name": "Marc Cucurella",
        "position": "DF",
        "club": "Chelsea"
      },
      {
        "name": "Alex Grimaldo",
        "position": "DF",
        "club": "Bayer Leverkusen"
      },
      {
        "name": "Pablo Barrios",
        "position": "MF",
        "club": "Atlético Madrid"
      },
      {
        "name": "Mikel Merino",
        "position": "MF",
        "club": "Arsenal"
      },
      {
        "name": "Fabian Ruiz",
        "position": "MF",
        "club": "Paris Saint-Germain"
      },
      {
        "name": "Alex Baena",
        "position": "MF",
        "club": "Atlético Madrid"
      },
      {
        "name": "Pablo Fornals",
        "position": "MF",
        "club": "Real Betis"
      },
      {
        "name": "Martin Zubimendi",
        "position": "MF",
        "club": "Arsenal"
      },
      {
        "name": "Aleix Garcia",
        "position": "MF",
        "club": "Bayer Leverkusen"
      },
      {
        "name": "Samu Aghehowa",
        "position": "FW",
        "club": "Porto"
      },
      {
        "name": "Ferran Torres",
        "position": "FW",
        "club": "Barcelona"
      },
      {
        "name": "Borja Iglesias",
        "position": "FW",
        "club": "Celta Vigo"
      },
      {
        "name": "Dani Olmo",
        "position": "FW",
        "club": "Barcelona"
      },
      {
        "name": "Yeremy Pino",
        "position": "FW",
        "club": "Crystal Palace"
      },
      {
        "name": "Fermin Lopez",
        "position": "FW",
        "club": "Barcelona"
      },
      {
        "name": "Mikel Oyarzabal",
        "position": "FW",
        "club": "Real Sociedad"
      },
      {
        "name": "Jorge de Frutos",
        "position": "FW",
        "club": "Rayo Vallecano"
      }
    ]
  },
  "SUI": {
    "teamCode": "SUI",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Gregor Kobel",
        "position": "GK",
        "club": "Borussia Dortmund"
      },
      {
        "name": "Yvon Mvogo",
        "position": "GK",
        "club": "Lorient"
      },
      {
        "name": "Marvin Keller",
        "position": "GK",
        "club": "Young Boys"
      },
      {
        "name": "Miro Muheim",
        "position": "DF",
        "club": "Hamburger SV"
      },
      {
        "name": "Silvan Widmer",
        "position": "DF",
        "club": "Mainz 05"
      },
      {
        "name": "Nico Elvedi",
        "position": "DF",
        "club": "Borussia Monchengladbach"
      },
      {
        "name": "Manuel Akanji",
        "position": "DF",
        "club": "Inter Milan"
      },
      {
        "name": "Becir Omeragic",
        "position": "DF",
        "club": "Montpellier"
      },
      {
        "name": "Ricardo Rodriguez",
        "position": "DF",
        "club": "Real Betis"
      },
      {
        "name": "Aurele Amenda",
        "position": "DF",
        "club": "Eintracht Frankfurt"
      },
      {
        "name": "Isaac Schmidt",
        "position": "DF",
        "club": "Werder Bremen"
      },
      {
        "name": "Adrian Bajrami",
        "position": "DF",
        "club": "Luzern"
      },
      {
        "name": "Luca Jaquez",
        "position": "DF",
        "club": "VfB Stuttgart"
      },
      {
        "name": "Simon Sohm",
        "position": "MF",
        "club": "Fiorentina"
      },
      {
        "name": "Johan Manzambi",
        "position": "MF",
        "club": "SC Freiburg"
      },
      {
        "name": "Granit Xhaka",
        "position": "MF",
        "club": "Sunderland"
      },
      {
        "name": "Djibril Sow",
        "position": "MF",
        "club": "Sevilla"
      },
      {
        "name": "Christian Fassnacht",
        "position": "MF",
        "club": "Young Boys"
      },
      {
        "name": "Michel Aebischer",
        "position": "MF",
        "club": "Pisa"
      },
      {
        "name": "Fabian Rieder",
        "position": "MF",
        "club": "FC Augsburg"
      },
      {
        "name": "Vincent Sierro",
        "position": "MF",
        "club": "Al-Shabab"
      },
      {
        "name": "Breel Embolo",
        "position": "FW",
        "club": "Rennes"
      },
      {
        "name": "Dan Ndoye",
        "position": "FW",
        "club": "Nottingham Forest"
      },
      {
        "name": "Andi Zeqiri",
        "position": "FW",
        "club": "Widzew Lodz"
      },
      {
        "name": "Ruben Vargas",
        "position": "FW",
        "club": "Sevilla"
      },
      {
        "name": "Cedric Itten",
        "position": "FW",
        "club": "Fortuna Dusseldorf"
      }
    ]
  },
  "TUN": {
    "teamCode": "TUN",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Noureddine Farhati",
        "position": "GK",
        "club": "Stade Tunisien"
      },
      {
        "name": "Aymen Dahmen",
        "position": "GK",
        "club": "CS Sfaxien"
      },
      {
        "name": "Bechir Ben Said",
        "position": "GK",
        "club": "Esperance de Tunis"
      },
      {
        "name": "Marouane Sahraoui",
        "position": "DF",
        "club": "Stade Tunisien"
      },
      {
        "name": "Mohamed Amine Ben Hamida",
        "position": "DF",
        "club": "Esperance de Tunis"
      },
      {
        "name": "Yassine Meriah",
        "position": "DF",
        "club": "Esperance de Tunis"
      },
      {
        "name": "Hamza Jelassi",
        "position": "DF",
        "club": "Esperance de Tunis"
      },
      {
        "name": "Ali Maaloul",
        "position": "DF",
        "club": "CS Sfaxien"
      },
      {
        "name": "Mohamed Ben Ali",
        "position": "DF",
        "club": "Esperance de Tunis"
      },
      {
        "name": "Oussama Haddadi",
        "position": "DF",
        "club": "RS Berkane"
      },
      {
        "name": "Moutaz Neffati",
        "position": "DF",
        "club": "IFK Norrkoping"
      },
      {
        "name": "Mohamed Ali Ben Romdhane",
        "position": "MF",
        "club": "Al Ahly"
      },
      {
        "name": "Houssem Tka",
        "position": "MF",
        "club": "Esperance de Tunis"
      },
      {
        "name": "Chiheb Jebali",
        "position": "MF",
        "club": "Esperance de Tunis"
      },
      {
        "name": "Ismael Gharbi",
        "position": "MF",
        "club": "FC Augsburg"
      },
      {
        "name": "Ferjani Sassi",
        "position": "MF",
        "club": "Al Gharafa) (captain"
      },
      {
        "name": "Hadj Mahmoud",
        "position": "MF",
        "club": "Lugano"
      },
      {
        "name": "Nacim Dendani",
        "position": "FW",
        "club": "Monaco"
      },
      {
        "name": "Hazem Mastouri",
        "position": "FW",
        "club": "Dynamo Makhachkala"
      },
      {
        "name": "Amor Layouni",
        "position": "FW",
        "club": "Hacken"
      },
      {
        "name": "Firas Chaouat",
        "position": "FW",
        "club": "Club Africain"
      },
      {
        "name": "Rayane Anane",
        "position": "FW",
        "club": "Etoile du Sahel"
      },
      {
        "name": "Seifeddine Jaziri",
        "position": "FW",
        "club": "Zamalek"
      }
    ]
  },
  "USA": {
    "teamCode": "USA",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Matt Freese",
        "position": "GK",
        "club": "New York City FC"
      },
      {
        "name": "Jonathan Klinsmann",
        "position": "GK",
        "club": "Cesena"
      },
      {
        "name": "Roman Celentano",
        "position": "GK",
        "club": "FC Cincinnati"
      },
      {
        "name": "Patrick Schulte",
        "position": "GK",
        "club": "Columbus Crew"
      },
      {
        "name": "Sergino Dest",
        "position": "DF",
        "club": "PSV Eindhoven"
      },
      {
        "name": "John Tolkin",
        "position": "DF",
        "club": "Holstein Kiel"
      },
      {
        "name": "Joe Scally",
        "position": "DF",
        "club": "Borussia Monchengladbach"
      },
      {
        "name": "Miles Robinson",
        "position": "DF",
        "club": "FC Cincinnati"
      },
      {
        "name": "Tim Ream",
        "position": "DF",
        "club": "Charlotte FC"
      },
      {
        "name": "Auston Trusty",
        "position": "DF",
        "club": "Celtic"
      },
      {
        "name": "Alex Freeman",
        "position": "DF",
        "club": "Orlando City"
      },
      {
        "name": "Maximilian Arfsten",
        "position": "DF",
        "club": "Columbus Crew"
      },
      {
        "name": "Mark McKenzie",
        "position": "DF",
        "club": "Toulouse"
      },
      {
        "name": "Cristian Roldan",
        "position": "MF",
        "club": "Seattle Sounders"
      },
      {
        "name": "Giovanni Reyna",
        "position": "MF",
        "club": "Borussia Monchengladbach"
      },
      {
        "name": "Tanner Tessmann",
        "position": "MF",
        "club": "Lyon"
      },
      {
        "name": "Timothy Tillman",
        "position": "MF",
        "club": "Los Angeles FC"
      },
      {
        "name": "Sebastian Berhalter",
        "position": "MF",
        "club": "Vancouver Whitecaps"
      },
      {
        "name": "Aidan Morris",
        "position": "MF",
        "club": "Middlesbrough"
      },
      {
        "name": "Ricardo Pepi",
        "position": "FW",
        "club": "PSV Eindhoven"
      },
      {
        "name": "Diego Luna",
        "position": "FW",
        "club": "Real Salt Lake"
      },
      {
        "name": "Brenden Aaronson",
        "position": "FW",
        "club": "Leeds United"
      },
      {
        "name": "Haji Wright",
        "position": "FW",
        "club": "Coventry City"
      },
      {
        "name": "Folarin Balogun",
        "position": "FW",
        "club": "Monaco"
      }
    ]
  },
  "URU": {
    "teamCode": "URU",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Santiago Mele",
        "position": "GK",
        "club": "Monterrey"
      },
      {
        "name": "Cristopher Fiermarin",
        "position": "GK",
        "club": "Deportes Tolima"
      },
      {
        "name": "Jose Maria Gimenez",
        "position": "DF",
        "club": "Atletico Madrid"
      },
      {
        "name": "Matias Vina",
        "position": "DF",
        "club": "Flamengo"
      },
      {
        "name": "Mathias Olivera",
        "position": "DF",
        "club": "Napoli"
      },
      {
        "name": "Guillermo Varela",
        "position": "DF",
        "club": "Flamengo"
      },
      {
        "name": "Ronald Araujo",
        "position": "DF",
        "club": "Barcelona"
      },
      {
        "name": "Sebastian Caceres",
        "position": "DF",
        "club": "America"
      },
      {
        "name": "Joaquin Piquerez",
        "position": "DF",
        "club": "Palmeiras"
      },
      {
        "name": "Santiago Bueno",
        "position": "DF",
        "club": "Wolverhampton Wanderers"
      },
      {
        "name": "Jose Luis Rodriguez",
        "position": "DF",
        "club": "Vasco da Gama"
      },
      {
        "name": "Rodrigo Bentancur",
        "position": "MF",
        "club": "Tottenham Hotspur"
      },
      {
        "name": "Nahitan Nandez",
        "position": "MF",
        "club": "Al-Qadsiah"
      },
      {
        "name": "Giorgian de Arrascaeta",
        "position": "MF",
        "club": "Flamengo"
      },
      {
        "name": "Manuel Ugarte",
        "position": "MF",
        "club": "Manchester United"
      },
      {
        "name": "Maximiliano Araujo",
        "position": "MF",
        "club": "Sporting CP"
      },
      {
        "name": "Rodrigo Zalazar",
        "position": "MF",
        "club": "Braga"
      },
      {
        "name": "Emiliano Martinez",
        "position": "MF",
        "club": "Palmeiras"
      },
      {
        "name": "Juan Manuel Sanabria",
        "position": "MF",
        "club": "Atletico San Luis"
      },
      {
        "name": "Santiago Homenchenko",
        "position": "MF",
        "club": "Queretaro"
      },
      {
        "name": "Facundo Pellistri",
        "position": "FW",
        "club": "Panathinaikos"
      },
      {
        "name": "Brian Rodriguez",
        "position": "FW",
        "club": "America"
      },
      {
        "name": "Facundo Torres",
        "position": "FW",
        "club": "Palmeiras"
      },
      {
        "name": "Federico Vinas",
        "position": "FW",
        "club": "Oviedo"
      },
      {
        "name": "Rodrigo Aguirre",
        "position": "FW",
        "club": "America"
      },
      {
        "name": "Luciano Rodriguez",
        "position": "FW",
        "club": "Neom"
      },
      {
        "name": "Ignacio Laquintana",
        "position": "FW",
        "club": "Red Bull Bragantino"
      }
    ]
  },
  "UZB": {
    "teamCode": "UZB",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo World Cup 2026 squads",
    "sourceUrl": "https://www.fourfourtwo.com/competition/world-cup-2026-squads",
    "players": [
      {
        "name": "Vladimir Nazarov",
        "position": "GK",
        "club": "Pakhtakor"
      },
      {
        "name": "Abduvohid Nematov",
        "position": "GK",
        "club": "Nasaf"
      },
      {
        "name": "Botirali Ergashev",
        "position": "GK",
        "club": "Neftchi"
      },
      {
        "name": "Abdukodir Khusanov",
        "position": "DF",
        "club": "Manchester City"
      },
      {
        "name": "Khojiakbar Alijonov",
        "position": "DF",
        "club": "Pakhtakor"
      },
      {
        "name": "Farrukh Sayfiev",
        "position": "DF",
        "club": "Neftchi"
      },
      {
        "name": "Rustam Ashurmatov",
        "position": "DF",
        "club": "Esteghlal"
      },
      {
        "name": "Sherzod Nasrullaev",
        "position": "DF",
        "club": "Nasaf"
      },
      {
        "name": "Umar Eshmurodov",
        "position": "DF",
        "club": "Nasaf"
      },
      {
        "name": "Abdulla Abdullaev",
        "position": "DF",
        "club": "Dibba"
      },
      {
        "name": "Husniddin Aliqulov",
        "position": "DF",
        "club": "Caykur Rizespor"
      },
      {
        "name": "Mukhammadkodir Khamraliev",
        "position": "DF",
        "club": "Pakhtakor"
      },
      {
        "name": "Akmal Mozgovoy",
        "position": "MF",
        "club": "Baniyas"
      },
      {
        "name": "Otabek Shukurov",
        "position": "MF",
        "club": "Baniyas"
      },
      {
        "name": "Jamshid Iskanderov",
        "position": "MF",
        "club": "Neftchi"
      },
      {
        "name": "Odiljon Hamrobekov",
        "position": "MF",
        "club": "Tractor"
      },
      {
        "name": "Azizjon Ganiev",
        "position": "MF",
        "club": "Al Bataeh"
      },
      {
        "name": "Oston Urunov",
        "position": "MF",
        "club": "Persepolis"
      },
      {
        "name": "Dostonbek Khamdamov",
        "position": "MF",
        "club": "Pakhtakor"
      },
      {
        "name": "Azizbek Turgunboev",
        "position": "MF",
        "club": "Pakhtakor"
      },
      {
        "name": "Khojimat Erkinov",
        "position": "MF",
        "club": "Pakhtakor"
      },
      {
        "name": "Ruslanbek Jiyanov",
        "position": "MF",
        "club": "Navbahor"
      },
      {
        "name": "Sardorbek Bakhromov",
        "position": "MF",
        "club": "Nasaf"
      },
      {
        "name": "Eldor Shomurodov",
        "position": "FW",
        "club": "Istanbul Basaksehir) (captain"
      },
      {
        "name": "Igor Sergeev",
        "position": "FW",
        "club": "Pakhtakor"
      },
      {
        "name": "Khusayin Norchaev",
        "position": "FW",
        "club": "Nasaf"
      }
    ]
  },
  "BIH": {
    "teamCode": "BIH",
    "status": "Final selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo Bosnia and Herzegovina squad",
    "sourceUrl": "https://www.fourfourtwo.com/team/bosnia-world-cup-2026-squad",
    "players": [
      {
        "name": "Nikola Vasilj",
        "position": "GK",
        "club": "FC St. Pauli"
      },
      {
        "name": "Martin Zlomislic",
        "position": "GK",
        "club": "Rijeka"
      },
      {
        "name": "Osman Hadzikic",
        "position": "GK",
        "club": "Slaven Belupo"
      },
      {
        "name": "Sead Kolasinac",
        "position": "DF",
        "club": "Atalanta"
      },
      {
        "name": "Dennis Hadzikadunic",
        "position": "DF",
        "club": "Sampdoria"
      },
      {
        "name": "Amar Dedic",
        "position": "DF",
        "club": "Benfica"
      },
      {
        "name": "Nikola Katic",
        "position": "DF",
        "club": "Schalke 04"
      },
      {
        "name": "Tarik Muharemovic",
        "position": "DF",
        "club": "Sassuolo"
      },
      {
        "name": "Nihad Mujakic",
        "position": "DF",
        "club": "Gaziantep"
      },
      {
        "name": "Stjepan Radeljic",
        "position": "DF",
        "club": "Rijeka"
      },
      {
        "name": "Nidal Celik",
        "position": "DF",
        "club": "Lens"
      },
      {
        "name": "Amir Hadziahmetovic",
        "position": "MF",
        "club": "Hull City"
      },
      {
        "name": "Benjamin Tahirovic",
        "position": "MF",
        "club": "Brondby"
      },
      {
        "name": "Dzenis Burnic",
        "position": "MF",
        "club": "Karlsruher SC"
      },
      {
        "name": "Armin Gigovic",
        "position": "MF",
        "club": "Young Boys"
      },
      {
        "name": "Ivan Basic",
        "position": "MF",
        "club": "Astana"
      },
      {
        "name": "Esmir Bajraktarevic",
        "position": "MF",
        "club": "PSV"
      },
      {
        "name": "Amar Memic",
        "position": "MF",
        "club": "Viktoria Plzen"
      },
      {
        "name": "Ivan Sunjic",
        "position": "MF",
        "club": "Pafos"
      },
      {
        "name": "Kerim Alajbegovic",
        "position": "MF",
        "club": "Red Bull Salzburg"
      },
      {
        "name": "Ermin Mahmic",
        "position": "MF",
        "club": "Slovan Liberec"
      },
      {
        "name": "Edin Dzeko",
        "position": "FW",
        "club": "Schalke 04"
      },
      {
        "name": "Ermedin Demirovic",
        "position": "FW",
        "club": "VfB Stuttgart"
      },
      {
        "name": "Samed Bazdar",
        "position": "FW",
        "club": "Jagiellonia Bialystok"
      },
      {
        "name": "Haris Tabakovic",
        "position": "FW",
        "club": "Borussia Monchengladbach"
      },
      {
        "name": "Jovo Lukic",
        "position": "FW",
        "club": "Universitatea Cluj"
      }
    ]
  },
  "CZE": {
    "teamCode": "CZE",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo Czech Republic squad",
    "sourceUrl": "https://www.fourfourtwo.com/team/czech-republic-world-cup-2026-squad",
    "players": [
      {
        "name": "Matej Kovar",
        "position": "GK",
        "club": "PSV"
      },
      {
        "name": "Jindrich Stanek",
        "position": "GK",
        "club": "Slavia Prague"
      },
      {
        "name": "Martin Jedlicka",
        "position": "GK",
        "club": "Banik Ostrava"
      },
      {
        "name": "Lukas Hornicek",
        "position": "GK",
        "club": "Braga"
      },
      {
        "name": "Antonin Kinsky",
        "position": "GK",
        "club": "Tottenham Hotspur"
      },
      {
        "name": "Jan Koutny",
        "position": "GK",
        "club": "Sigma Olomouc"
      },
      {
        "name": "Jakub Markovic",
        "position": "GK",
        "club": "Slavia Prague"
      },
      {
        "name": "Vladimir Coufal",
        "position": "DF",
        "club": "TSG Hoffenheim"
      },
      {
        "name": "Tomas Holes",
        "position": "DF",
        "club": "Slavia Prague"
      },
      {
        "name": "Ladislav Krejci",
        "position": "DF",
        "club": "Wolverhampton Wanderers"
      },
      {
        "name": "David Zima",
        "position": "DF",
        "club": "Slavia Prague"
      },
      {
        "name": "Jaroslav Zeleny",
        "position": "DF",
        "club": "Sparta Prague"
      },
      {
        "name": "David Jurasek",
        "position": "DF",
        "club": "Slavia Prague"
      },
      {
        "name": "David Doudera",
        "position": "DF",
        "club": "Slavia Prague"
      },
      {
        "name": "Robin Hranac",
        "position": "DF",
        "club": "TSG Hoffenheim"
      },
      {
        "name": "Vaclav Jemelka",
        "position": "DF",
        "club": "Viktoria Plzen"
      },
      {
        "name": "Martin Vitik",
        "position": "DF",
        "club": "Bologna"
      },
      {
        "name": "Stepan Chaloupek",
        "position": "DF",
        "club": "Slavia Prague"
      },
      {
        "name": "Tomas Vlcek",
        "position": "DF",
        "club": "Slavia Prague"
      },
      {
        "name": "Matej Hadas",
        "position": "DF",
        "club": "Sigma Olomouc"
      },
      {
        "name": "Adam Sevinsky",
        "position": "DF",
        "club": "Sparta Prague"
      },
      {
        "name": "Karel Spacil",
        "position": "DF",
        "club": "Viktoria Plzen"
      },
      {
        "name": "Tomas Soucek",
        "position": "MF",
        "club": "West Ham United"
      },
      {
        "name": "Vladimir Darida",
        "position": "MF",
        "club": "Hradec Kralove"
      },
      {
        "name": "Lukas Provod",
        "position": "MF",
        "club": "Slavia Prague"
      },
      {
        "name": "Michal Sadilek",
        "position": "MF",
        "club": "Slavia Prague"
      },
      {
        "name": "Pavel Sulc",
        "position": "MF",
        "club": "Lyon"
      },
      {
        "name": "Lukas Cerv",
        "position": "MF",
        "club": "Viktoria Plzen"
      },
      {
        "name": "Adam Karabec",
        "position": "MF",
        "club": "Lyon"
      },
      {
        "name": "Michal Beran",
        "position": "MF",
        "club": "Sigma Olomouc"
      },
      {
        "name": "Lukas Sadilek",
        "position": "MF",
        "club": "Gornik Zabrze"
      },
      {
        "name": "Krystof Danek",
        "position": "MF",
        "club": "LASK"
      },
      {
        "name": "Matej Rynes",
        "position": "MF",
        "club": "Sparta Prague"
      },
      {
        "name": "Patrik Hellebrand",
        "position": "MF",
        "club": "Gornik Zabrze"
      },
      {
        "name": "Tomas Ladra",
        "position": "MF",
        "club": "Viktoria Plzen"
      },
      {
        "name": "Lukas Ambros",
        "position": "MF",
        "club": "Gornik Zabrze"
      },
      {
        "name": "Pavel Bucha",
        "position": "MF",
        "club": "FC Cincinnati"
      },
      {
        "name": "Ondrej Kricfalusi",
        "position": "MF",
        "club": "Banik Ostrava"
      },
      {
        "name": "David Planka",
        "position": "MF",
        "club": "Banik Ostrava"
      },
      {
        "name": "Hugo Sochurek",
        "position": "MF",
        "club": "Sparta Prague"
      },
      {
        "name": "Alexandr Sojka",
        "position": "MF",
        "club": "Viktoria Plzen"
      },
      {
        "name": "Denis Visinsky",
        "position": "MF",
        "club": "Viktoria Plzen"
      },
      {
        "name": "Patrik Schick",
        "position": "FW",
        "club": "Bayer Leverkusen"
      },
      {
        "name": "Matej Vydra",
        "position": "FW",
        "club": "Viktoria Plzen"
      },
      {
        "name": "Adam Hlozek",
        "position": "FW",
        "club": "TSG Hoffenheim"
      },
      {
        "name": "Jan Kuchta",
        "position": "FW",
        "club": "Sparta Prague"
      },
      {
        "name": "Tomas Chory",
        "position": "FW",
        "club": "Slavia Prague"
      },
      {
        "name": "Mojmir Chytil",
        "position": "FW",
        "club": "Slavia Prague"
      },
      {
        "name": "Jan Kliment",
        "position": "FW",
        "club": "Sigma Olomouc"
      },
      {
        "name": "Vasil Kusej",
        "position": "FW",
        "club": "Slavia Prague"
      },
      {
        "name": "Vaclav Sejk",
        "position": "FW",
        "club": "Sigma Olomouc"
      },
      {
        "name": "Christophe Kabongo",
        "position": "FW",
        "club": "Mlada Boleslav"
      },
      {
        "name": "Ondrej Mihalik",
        "position": "FW",
        "club": "Hradec Kralove"
      },
      {
        "name": "Vojtech Patrak",
        "position": "FW",
        "club": "Pardubice"
      }
    ]
  },
  "TUR": {
    "teamCode": "TUR",
    "status": "Final selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo Turkiye squad",
    "sourceUrl": "https://www.fourfourtwo.com/team/turkiye-world-cup-2026-squad",
    "players": [
      {
        "name": "Mert Gunok",
        "position": "GK",
        "club": "Fenerbahce"
      },
      {
        "name": "Ugurcan Cakir",
        "position": "GK",
        "club": "Galatasaray"
      },
      {
        "name": "Altay Bayindir",
        "position": "GK",
        "club": "Manchester United"
      },
      {
        "name": "Muhammed Sengezer",
        "position": "GK",
        "club": "Istanbul Basaksehir"
      },
      {
        "name": "Merih Demiral",
        "position": "DF",
        "club": "Al-Ahli"
      },
      {
        "name": "Zeki Celik",
        "position": "DF",
        "club": "Roma"
      },
      {
        "name": "Mert Muldur",
        "position": "DF",
        "club": "Fenerbahce"
      },
      {
        "name": "Ferdi Kadioglu",
        "position": "DF",
        "club": "Brighton & Hove Albion"
      },
      {
        "name": "Ozan Kabak",
        "position": "DF",
        "club": "Hoffenheim"
      },
      {
        "name": "Abdulkerim Bardakci",
        "position": "DF",
        "club": "Galatasaray"
      },
      {
        "name": "Eren Elmali",
        "position": "DF",
        "club": "Galatasaray"
      },
      {
        "name": "Samet Akaydin",
        "position": "DF",
        "club": "Caykur Rizespor"
      },
      {
        "name": "Mustafa Eskihellac",
        "position": "DF",
        "club": "Trabzonspor"
      },
      {
        "name": "Ahmetcan Kaplan",
        "position": "DF",
        "club": "NEC"
      },
      {
        "name": "Hakan Calhanoglu",
        "position": "MF",
        "club": "Inter Milan"
      },
      {
        "name": "Kaan Ayhan",
        "position": "MF",
        "club": "Galatasaray"
      },
      {
        "name": "Orkun Kokcu",
        "position": "MF",
        "club": "Besiktas"
      },
      {
        "name": "Ismail Yuksek",
        "position": "MF",
        "club": "Fenerbahce"
      },
      {
        "name": "Salih Ozcan",
        "position": "MF",
        "club": "Borussia Dortmund"
      },
      {
        "name": "Atakan Karazor",
        "position": "MF",
        "club": "VfB Stuttgart"
      },
      {
        "name": "Kerem Akturkoglu",
        "position": "FW",
        "club": "Fenerbahce"
      },
      {
        "name": "Irfan Kahveci",
        "position": "FW",
        "club": "Fenerbahce"
      },
      {
        "name": "Baris Alper Yilmaz",
        "position": "FW",
        "club": "Galatasaray"
      },
      {
        "name": "Arda Guler",
        "position": "FW",
        "club": "Real Madrid"
      },
      {
        "name": "Kenan Yildiz",
        "position": "FW",
        "club": "Juventus"
      },
      {
        "name": "Yunus Akgun",
        "position": "FW",
        "club": "Galatasaray"
      },
      {
        "name": "Oguz Aydin",
        "position": "FW",
        "club": "Fenerbahce"
      },
      {
        "name": "Deniz Gul",
        "position": "FW",
        "club": "Porto"
      },
      {
        "name": "Semih Kilicsoy",
        "position": "FW",
        "club": "Cagliari"
      },
      {
        "name": "Aral Simsir",
        "position": "FW",
        "club": "Midtjylland"
      }
    ]
  },
  "SWE": {
    "teamCode": "SWE",
    "status": "Final selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo Sweden squad",
    "sourceUrl": "https://www.fourfourtwo.com/team/sweden-world-cup-2026-squad",
    "players": [
      {
        "name": "Kristoffer Nordfeldt",
        "position": "GK",
        "club": "AIK"
      },
      {
        "name": "Viktor Johansson",
        "position": "GK",
        "club": "Stoke City"
      },
      {
        "name": "Jacob Widell Zetterstrom",
        "position": "GK",
        "club": "Derby County"
      },
      {
        "name": "Victor Lindelof",
        "position": "DF",
        "club": "Aston Villa"
      },
      {
        "name": "Isak Hien",
        "position": "DF",
        "club": "Atalanta"
      },
      {
        "name": "Gabriel Gudmundsson",
        "position": "DF",
        "club": "Leeds United"
      },
      {
        "name": "Carl Starfelt",
        "position": "DF",
        "club": "Celta Vigo"
      },
      {
        "name": "Emil Holm",
        "position": "DF",
        "club": "Juventus"
      },
      {
        "name": "Hjalmar Ekdal",
        "position": "DF",
        "club": "Burnley"
      },
      {
        "name": "Daniel Svensson",
        "position": "DF",
        "club": "Borussia Dortmund"
      },
      {
        "name": "Gustaf Lagerbielke",
        "position": "DF",
        "club": "Braga"
      },
      {
        "name": "Eric Smith",
        "position": "DF",
        "club": "FC St. Pauli"
      },
      {
        "name": "Elliot Stroud",
        "position": "DF",
        "club": "Mjallby AIF"
      },
      {
        "name": "Mattias Svanberg",
        "position": "MF",
        "club": "VfL Wolfsburg"
      },
      {
        "name": "Jesper Karlstrom",
        "position": "MF",
        "club": "Udinese"
      },
      {
        "name": "Yasin Ayari",
        "position": "MF",
        "club": "Brighton & Hove Albion"
      },
      {
        "name": "Lucas Bergvall",
        "position": "MF",
        "club": "Tottenham Hotspur"
      },
      {
        "name": "Besfort Zeneli",
        "position": "MF",
        "club": "Union Saint-Gilloise"
      },
      {
        "name": "Alexander Isak",
        "position": "FW",
        "club": "Liverpool"
      },
      {
        "name": "Viktor Gyokeres",
        "position": "FW",
        "club": "Arsenal"
      },
      {
        "name": "Ken Sema",
        "position": "FW",
        "club": "Pafos"
      },
      {
        "name": "Anthony Elanga",
        "position": "FW",
        "club": "Newcastle United"
      },
      {
        "name": "Benjamin Nygren",
        "position": "FW",
        "club": "Celtic"
      },
      {
        "name": "Alexander Bernhardsson",
        "position": "FW",
        "club": "Holstein Kiel"
      },
      {
        "name": "Gustaf Nilsson",
        "position": "FW",
        "club": "Club Brugge"
      },
      {
        "name": "Taha Ali",
        "position": "FW",
        "club": "Malmo FF"
      }
    ]
  },
  "COD": {
    "teamCode": "COD",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo DR Congo squad",
    "sourceUrl": "https://www.fourfourtwo.com/team/dr-congo-world-cup-2026-squad",
    "players": [
      {
        "name": "Lionel Mpasi",
        "position": "GK",
        "club": "Le Havre"
      },
      {
        "name": "Timothy Fayulu",
        "position": "GK",
        "club": "Noah"
      },
      {
        "name": "Matthieu Epolo",
        "position": "GK",
        "club": "Standard Liege"
      },
      {
        "name": "Chancel Mbemba",
        "position": "DF",
        "club": "Lille"
      },
      {
        "name": "Arthur Masuaku",
        "position": "DF",
        "club": "Lens"
      },
      {
        "name": "Joris Kayembe",
        "position": "DF",
        "club": "Genk"
      },
      {
        "name": "Dylan Batubinsika",
        "position": "DF",
        "club": "AEL"
      },
      {
        "name": "Axel Tuanzebe",
        "position": "DF",
        "club": "Burnley"
      },
      {
        "name": "Aaron Wan-Bissaka",
        "position": "DF",
        "club": "West Ham"
      },
      {
        "name": "Rocky Bushiri",
        "position": "DF",
        "club": "Hibernian"
      },
      {
        "name": "Steve Kapuadi",
        "position": "DF",
        "club": "Widzew Lodz"
      },
      {
        "name": "Jeremy Ngakia",
        "position": "DF",
        "club": "Watford"
      },
      {
        "name": "Meschak Elia",
        "position": "MF",
        "club": "Alanyaspor"
      },
      {
        "name": "Samuel Moutoussamy",
        "position": "MF",
        "club": "Atromitos"
      },
      {
        "name": "Edo Kayembe",
        "position": "MF",
        "club": "Watford"
      },
      {
        "name": "Theo Bongonda",
        "position": "MF",
        "club": "Spartak Moscow"
      },
      {
        "name": "Charles Pickel",
        "position": "MF",
        "club": "Espanyol"
      },
      {
        "name": "Noah Sadiki",
        "position": "MF",
        "club": "Sunderland"
      },
      {
        "name": "Nathanael Mbuku",
        "position": "MF",
        "club": "Lille"
      },
      {
        "name": "Ngal'ayel Mukau",
        "position": "MF",
        "club": "Lille"
      },
      {
        "name": "Grady Diangana",
        "position": "MF",
        "club": "Elche"
      },
      {
        "name": "Brian Cipenga",
        "position": "MF",
        "club": "Castellon"
      },
      {
        "name": "Cedric Bakambu",
        "position": "FW",
        "club": "Real Betis"
      },
      {
        "name": "Fiston Mayele",
        "position": "FW",
        "club": "Pyramids"
      },
      {
        "name": "Yoane Wissa",
        "position": "FW",
        "club": "Newcastle"
      },
      {
        "name": "Simon Banza",
        "position": "FW",
        "club": "Al Jazira"
      }
    ]
  },
  "IRQ": {
    "teamCode": "IRQ",
    "status": "Latest published selection",
    "note": "Final 26-player World Cup squad is still pending.",
    "sourceLabel": "FourFourTwo Iraq squad",
    "sourceUrl": "https://www.fourfourtwo.com/team/iraq-world-cup-2026-squad",
    "players": [
      {
        "name": "Fahad Talib",
        "position": "GK",
        "club": "Al-Talaba"
      },
      {
        "name": "Ahmed Basil",
        "position": "GK",
        "club": "Al-Shorta"
      },
      {
        "name": "Kamel Al-Rekabe",
        "position": "GK",
        "club": "Erbil"
      },
      {
        "name": "Rebin Sulaka",
        "position": "DF",
        "club": "Port"
      },
      {
        "name": "Manaf Younis",
        "position": "DF",
        "club": "Al-Shorta"
      },
      {
        "name": "Merchas Doski",
        "position": "DF",
        "club": "Viktoria Plzen"
      },
      {
        "name": "Frans Putros",
        "position": "DF",
        "club": "Persib"
      },
      {
        "name": "Hussein Ali",
        "position": "DF",
        "club": "Pogon Szczecin"
      },
      {
        "name": "Zaid Tahseen",
        "position": "DF",
        "club": "Pakhtakor"
      },
      {
        "name": "Akam Hashim",
        "position": "DF",
        "club": "Al-Zawraa"
      },
      {
        "name": "Ahmed Maknzi",
        "position": "DF",
        "club": "Al-Karma"
      },
      {
        "name": "Ibraham Bayesh",
        "position": "MF",
        "club": "Al-Dhafra"
      },
      {
        "name": "Amir Al-Ammari",
        "position": "MF",
        "club": "Cracovia"
      },
      {
        "name": "Ali Jasim",
        "position": "MF",
        "club": "Al-Najma"
      },
      {
        "name": "Youssef Amyn",
        "position": "MF",
        "club": "AEK Larnaca"
      },
      {
        "name": "Zidane Iqbal",
        "position": "MF",
        "club": "Utrecht"
      },
      {
        "name": "Hasan Abdulkareem",
        "position": "MF",
        "club": "Al-Zawraa"
      },
      {
        "name": "Marko Farji",
        "position": "MF",
        "club": "Venezia"
      },
      {
        "name": "Kevin Yakob",
        "position": "MF",
        "club": "AGF"
      },
      {
        "name": "Aimar Sher",
        "position": "MF",
        "club": "Sarpsborg"
      },
      {
        "name": "Peter Gwargis",
        "position": "MF",
        "club": "Duhok"
      },
      {
        "name": "Zaid Ismail",
        "position": "MF",
        "club": "Al-Talaba"
      },
      {
        "name": "Aymen Hussein",
        "position": "FW",
        "club": "Al-Karma"
      },
      {
        "name": "Mohanad Ali",
        "position": "FW",
        "club": "Dibba"
      },
      {
        "name": "Ali Al-Hamadi",
        "position": "FW",
        "club": "Luton Town"
      },
      {
        "name": "Ali Yousif",
        "position": "FW",
        "club": "Al-Talaba"
      }
    ]
  }
};

export function getTeamSquad(teamCode: string) {
  return squads[teamCode] ?? null;
}

export function allTeamSquads() {
  return squads;
}
