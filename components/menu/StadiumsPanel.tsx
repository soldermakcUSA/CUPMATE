"use client";

import { useMemo, useState } from "react";
import {
  Accessibility,
  AlertTriangle,
  Bus,
  CircleParking,
  Clock,
  CreditCard,
  ExternalLink,
  Info,
  Luggage,
  MapPin,
  Navigation,
  ShieldCheck,
  Train,
  Utensils,
  WalletCards
} from "lucide-react";
import { translations, type Locale } from "@/lib/i18n";
import type { MatchCardData } from "@/lib/world-cup-data";

type Translation = typeof translations.en;

type StadiumsPanelProps = {
  t: Translation;
  locale: Locale;
  matches: MatchCardData[];
};

type StadiumMatch = {
  date: string;
  time: string;
  label: string;
  stage: string;
  price?: string;
  ticketUrl?: string;
};

type Stadium = {
  id: string;
  name: string;
  fifaName: string;
  city: string;
  country: "USA" | "Canada" | "Mexico";
  currency: "USD" | "CAD" | "MXN";
  capacity: string;
  matchCount: number;
  gatesOpen: string;
  coordinates: string;
  images: string[];
  parking: string;
  parkingCost: string;
  drivingTip: string;
  transit: string;
  transitCost: string;
  rideshare: string;
  seating: string[];
  seatGeekUrl?: string;
  ticketStartingAt?: string;
  ticketSourceNote?: string;
  navigationUrl: string;
  schedule: StadiumMatch[];
};

function commonsImage(fileName: string) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=1200`;
}

export const worldCupStadiums: Stadium[] = [
  {
    id: "bc-place",
    name: "BC Place",
    fifaName: "Vancouver Stadium",
    city: "Vancouver, Canada",
    country: "Canada",
    currency: "CAD",
    capacity: "54,400",
    matchCount: 7,
    gatesOpen: "2h before kickoff",
    coordinates: "49.2768,-123.1119",
    images: [commonsImage("BC Place, Vancouver, south view 20240901 2.jpg"), commonsImage("BC Place (22648409617).jpg"), commonsImage("BC Place Vancouver.jpg")],
    parking: "Downtown garages near BC Place and Yaletown. Reserve early; roads around Expo Blvd usually tighten on event days.",
    parkingCost: "CA$30-60 est.",
    drivingTip: "Use Cambie Bridge or Pacific Blvd before fan-zone closures begin.",
    transit: "SkyTrain to Stadium-Chinatown or Yaletown-Roundhouse, then 8-15 min walk.",
    transitCost: "CA$3.20-6.35",
    rideshare: "Plan pickup away from Pacific Blvd, closer to Yaletown or Chinatown edges.",
    seating: ["Lower bowl: closest to benches", "Club: covered premium concourse", "Upper bowl: best city-view value"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=BC+Place+Vancouver",
    schedule: [
      { date: "Jun 13", time: "TBD", label: "Match 6", stage: "Group stage" },
      { date: "Jun 18", time: "TBD", label: "Match 27", stage: "Group stage" },
      { date: "Jun 21", time: "TBD", label: "Match 40", stage: "Group stage" },
      { date: "Jul 2", time: "TBD", label: "Match 85", stage: "Round of 32" },
      { date: "Jul 7", time: "TBD", label: "Match 96", stage: "Round of 16" }
    ]
  },
  {
    id: "bmo-field",
    name: "BMO Field",
    fifaName: "Toronto Stadium",
    city: "Toronto, Canada",
    country: "Canada",
    currency: "CAD",
    capacity: "45,736",
    matchCount: 6,
    gatesOpen: "2h before kickoff",
    coordinates: "43.6332,-79.4186",
    images: [commonsImage("BMO Field (1471315882).jpg"), commonsImage("Bmo field (8820851518).jpg"), commonsImage("Toronto - ON - BMO Field.jpg")],
    parking: "Exhibition Place lots and nearby garages. Expect staged exits after matches.",
    parkingCost: "CA$35-70 est.",
    drivingTip: "Lake Shore Blvd is the main approach, but transit is usually faster on event days.",
    transit: "GO Transit or TTC to Exhibition Station, then 5-8 min walk.",
    transitCost: "CA$3.35 TTC / GO varies",
    rideshare: "Use pickup zones north of Exhibition Place to avoid Lake Shore congestion.",
    seating: ["West stand: shade first", "Supporter ends: loudest atmosphere", "Upper east: skyline views"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=BMO+Field+Toronto",
    schedule: [
      { date: "Jun 12", time: "TBD", label: "Match 2", stage: "Group stage" },
      { date: "Jun 17", time: "TBD", label: "Match 19", stage: "Group stage" },
      { date: "Jun 20", time: "TBD", label: "Match 33", stage: "Group stage" },
      { date: "Jun 23", time: "TBD", label: "Match 45", stage: "Group stage" },
      { date: "Jul 2", time: "TBD", label: "Match 83", stage: "Round of 32" }
    ]
  },
  {
    id: "azteca",
    name: "Estadio Azteca",
    fifaName: "Mexico City Stadium",
    city: "Mexico City, Mexico",
    country: "Mexico",
    currency: "MXN",
    capacity: "87,523",
    matchCount: 5,
    gatesOpen: "3h before kickoff",
    coordinates: "19.3029,-99.1505",
    images: [commonsImage("Estadio azteca.jpg"), commonsImage("Exterior del Estadio Azteca Tigres Femenil América.jpg"), commonsImage("Estadio Azteca 07a.jpg")],
    parking: "Official stadium parking is limited; prefer nearby paid lots or park-and-ride by rail.",
    parkingCost: "MX$250-600 est.",
    drivingTip: "Approach from Calzada de Tlalpan early; avoid arriving in the final hour.",
    transit: "Tren Ligero to Estadio Azteca station, then short walk.",
    transitCost: "MX$3-8",
    rideshare: "Set pickup several blocks away on Tlalpan after the match.",
    seating: ["Lower lateral: best pitch read", "Cabecera: supporter energy", "Upper ring: full tactical view"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=Estadio+Azteca+Mexico+City",
    schedule: [
      { date: "Jun 11", time: "TBD", label: "Match 1", stage: "Opening match" },
      { date: "Jun 17", time: "TBD", label: "Match 24", stage: "Group stage" },
      { date: "Jun 24", time: "TBD", label: "Match 53", stage: "Group stage" },
      { date: "Jun 30", time: "TBD", label: "Match 79", stage: "Round of 32" },
      { date: "Jul 5", time: "TBD", label: "Match 92", stage: "Round of 16" }
    ]
  },
  {
    id: "bbva",
    name: "Estadio BBVA",
    fifaName: "Monterrey Stadium",
    city: "Guadalupe, Mexico",
    country: "Mexico",
    currency: "MXN",
    capacity: "53,500",
    matchCount: 4,
    gatesOpen: "2.5h before kickoff",
    coordinates: "25.6682,-100.2441",
    images: [commonsImage("Estadio BBVA Bancomer - Diciembre 2017.jpg"), commonsImage("Estadio BBVA Bancomer.jpg"), commonsImage("Estadio BBVA Bancomer Interior.jpg")],
    parking: "On-site and private lots around Parque La Pastora; reserve when available.",
    parkingCost: "MX$200-500 est.",
    drivingTip: "Use Av. Pablo Livas or Miguel de la Madrid before closures near the stadium.",
    transit: "Metrorrey/Transmetro connections toward Exposición area, then bus or rideshare.",
    transitCost: "MX$15-25",
    rideshare: "Post-match pickup works better west of the stadium perimeter.",
    seating: ["East side: mountain backdrop", "Lower bowl: compact sightlines", "Upper corners: value seats"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=Estadio+BBVA+Guadalupe+Nuevo+Leon",
    schedule: [
      { date: "Jun 14", time: "TBD", label: "Match 12", stage: "Group stage" },
      { date: "Jun 20", time: "TBD", label: "Match 36", stage: "Group stage" },
      { date: "Jun 24", time: "TBD", label: "Match 54", stage: "Group stage" },
      { date: "Jun 29", time: "TBD", label: "Match 75", stage: "Round of 32" }
    ]
  },
  {
    id: "akron",
    name: "Estadio Akron",
    fifaName: "Guadalajara Stadium",
    city: "Zapopan, Mexico",
    country: "Mexico",
    currency: "MXN",
    capacity: "49,850",
    matchCount: 4,
    gatesOpen: "2.5h before kickoff",
    coordinates: "20.6819,-103.4622",
    images: [commonsImage("Estadio Akron 02-07-2022 cabecera sur lado derecho.jpg"), commonsImage("Estadio Akron 02-07-2022 cabecera sur lado derecho (2).jpg"), commonsImage("Estadio Akron interior 0319.jpg")],
    parking: "On-site parking exists but fills quickly; use official pre-booking if offered.",
    parkingCost: "MX$180-450 est.",
    drivingTip: "Arrive from Periferico Poniente and expect controlled access close to kickoff.",
    transit: "Mi Macro Periferico to nearby stops, then shuttle, taxi, or a longer walk.",
    transitCost: "MX$9.50-25",
    rideshare: "Use pickup away from the ring road ramps after the match.",
    seating: ["Lower sideline: best view", "Ends: supporters", "Upper tier: full bowl perspective"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=Estadio+Akron+Zapopan",
    schedule: [
      { date: "Jun 13", time: "TBD", label: "Match 8", stage: "Group stage" },
      { date: "Jun 18", time: "TBD", label: "Match 28", stage: "Group stage" },
      { date: "Jun 23", time: "TBD", label: "Match 48", stage: "Group stage" },
      { date: "Jun 26", time: "TBD", label: "Match 66", stage: "Group stage" }
    ]
  },
  {
    id: "metlife",
    name: "MetLife Stadium",
    fifaName: "New York New Jersey Stadium",
    city: "East Rutherford, NJ, USA",
    country: "USA",
    currency: "USD",
    capacity: "82,500",
    matchCount: 8,
    gatesOpen: "2h before kickoff",
    coordinates: "40.8135,-74.0745",
    images: [commonsImage("Metlife stadium (Aerial view).jpg"), commonsImage("MetLife Stadium Exterior.jpg"), commonsImage("Metlife stadium.jpg")],
    parking: "Large Meadowlands lots; buy official parking before match day where possible.",
    parkingCost: "US$40-80 est.",
    drivingTip: "Use NJ Turnpike exit 16W and follow event lot signs; leave extra time for tolls.",
    transit: "NJ Transit train from New York Penn to Secaucus, then Meadowlands event train.",
    transitCost: "US$11-18 round trip est.",
    rideshare: "Use marked rideshare zones; post-match exits are slower than train.",
    seating: ["100 level: closest to pitch", "200 club: covered concourse", "300 level: best price and full shape"],
    seatGeekUrl: "https://seatgeek.com/fifa-world-cup-tickets/nyc",
    ticketStartingAt: "$471",
    ticketSourceNote: "SeatGeek lists MetLife tickets with FIFA Category 1-4 labels, interactive seat maps, Deal Score, filters, and live lowest prices.",
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=MetLife+Stadium+East+Rutherford",
    schedule: [
      { date: "Jun 13", time: "6:00 PM", label: "Brazil vs Morocco", stage: "Group C · Match 7", price: "From $1,398", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-13-6-pm/17269669?quantity=1" },
      { date: "Jun 16", time: "3:00 PM", label: "France vs Senegal", stage: "Group I · Match 17", price: "From $729", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-16-3-pm/17269672?quantity=1" },
      { date: "Jun 22", time: "8:00 PM", label: "Norway vs Senegal", stage: "Group I · Match 41", price: "From $448", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-22-8-pm/17269673?quantity=1" },
      { date: "Jun 25", time: "4:00 PM", label: "Germany vs Ecuador", stage: "Group E · Match 56", price: "From $960", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-25-4-pm/17269674?quantity=1" },
      { date: "Jun 27", time: "5:00 PM", label: "England vs Panama", stage: "Group L · Match 67", price: "From $788", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-27-5-pm/17269675?quantity=1" },
      { date: "Jun 30", time: "5:00 PM", label: "1I vs TBD", stage: "Round of 32 · Match 77", price: "From $598", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-30-5-pm/17269676?quantity=1" },
      { date: "Jul 5", time: "4:00 PM", label: "W76 vs W78", stage: "Round of 16 · Match 91", price: "From $1,031", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-05-4-pm/17269677?quantity=1" },
      { date: "Jul 19", time: "3:00 PM", label: "Match 104", stage: "World Cup Final", price: "From $8,103", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-19-3-pm/17307574?quantity=1" }
    ]
  },
  {
    id: "att",
    name: "AT&T Stadium",
    fifaName: "Dallas Stadium",
    city: "Arlington, TX, USA",
    country: "USA",
    currency: "USD",
    capacity: "80,000",
    matchCount: 9,
    gatesOpen: "2h before kickoff",
    coordinates: "32.7473,-97.0945",
    images: [commonsImage("AT&T Stadium 2022-08-24.jpg"), commonsImage("ATT Stadium Interior.jpg"), commonsImage("AT&T Stadium Inside (Dec 2025).jpg")],
    parking: "Huge official lot network; pre-paid parking is strongly recommended.",
    parkingCost: "US$45-100 est.",
    drivingTip: "Use I-30 or SH 360 and pick a lot based on your exit direction after the match.",
    transit: "Arlington has limited rail. Use event shuttles, rideshare, or regional bus connections from Dallas/Fort Worth.",
    transitCost: "US$3-25 depending on shuttle",
    rideshare: "Walk to designated zones away from AT&T Way to reduce wait time.",
    seating: ["Lower midfield: premium view", "Party-pass areas: social standing", "Upper sideline: best value"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=AT%26T+Stadium+Arlington+TX",
    schedule: [
      { date: "Jun 14", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 17", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 22", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 29", time: "TBD", label: "Match 78", stage: "Round of 32" },
      { date: "Jul 14", time: "TBD", label: "Semi-final", stage: "Knockout" }
    ]
  },
  {
    id: "arrowhead",
    name: "Arrowhead Stadium",
    fifaName: "Kansas City Stadium",
    city: "Kansas City, MO, USA",
    country: "USA",
    currency: "USD",
    capacity: "76,416",
    matchCount: 6,
    gatesOpen: "2h before kickoff",
    coordinates: "39.0489,-94.4839",
    images: [commonsImage("Aerial view of Arrowhead Stadium 08-31-2013.jpg"), commonsImage("Arrowhead Stadium 2010.JPG"), commonsImage("ArrowheadStadiumnasa.png")],
    parking: "Truman Sports Complex lots. Tailgate-style arrivals mean early lots get crowded.",
    parkingCost: "US$35-70 est.",
    drivingTip: "Use I-70 and choose a lot by gate/exit direction before arriving.",
    transit: "RideKC event bus or shuttle from downtown fan areas when available.",
    transitCost: "US$2-15 est.",
    rideshare: "Expect long post-match queues; walk toward Blue Ridge Cutoff pickup zones.",
    seating: ["Lower bowl: intense atmosphere", "Club level: easier concessions", "Upper midfield: full field read"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=Arrowhead+Stadium+Kansas+City",
    schedule: [
      { date: "Jun 16", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 20", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 25", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jul 3", time: "TBD", label: "Round of 32", stage: "Knockout" },
      { date: "Jul 11", time: "TBD", label: "Quarter-final", stage: "Knockout" }
    ]
  },
  {
    id: "nrg",
    name: "NRG Stadium",
    fifaName: "Houston Stadium",
    city: "Houston, TX, USA",
    country: "USA",
    currency: "USD",
    capacity: "72,220",
    matchCount: 7,
    gatesOpen: "2h before kickoff",
    coordinates: "29.6847,-95.4107",
    images: [commonsImage("Nrg stadium.jpg"), commonsImage("NRG Stadium SBLI.jpg"), commonsImage("Reliantstadium.jpg")],
    parking: "Official NRG Park lots and nearby private lots; reserve ahead for lower stress.",
    parkingCost: "US$35-80 est.",
    drivingTip: "Use Kirby, Fannin, or Main routes depending on assigned lot.",
    transit: "METRORail Red Line to Stadium Park/Astrodome or Fannin South.",
    transitCost: "US$1.25 one way",
    rideshare: "Pickup can be faster from the edges of NRG Park after crowds thin.",
    seating: ["Lower sideline: closest", "Club: climate-controlled amenities", "Upper bowl: budget option"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=NRG+Stadium+Houston",
    schedule: [
      { date: "Jun 14", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 17", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 22", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 29", time: "TBD", label: "Round of 32", stage: "Knockout" },
      { date: "Jul 4", time: "TBD", label: "Round of 16", stage: "Knockout" }
    ]
  },
  {
    id: "mercedes-benz",
    name: "Mercedes-Benz Stadium",
    fifaName: "Atlanta Stadium",
    city: "Atlanta, GA, USA",
    country: "USA",
    currency: "USD",
    capacity: "71,000",
    matchCount: 8,
    gatesOpen: "2h before kickoff",
    coordinates: "33.7554,-84.4008",
    images: [commonsImage("Mercedes-Benz Stadium, July 2018.jpg"), commonsImage("Mercedes-Benz Stadium (27663349999).jpg"), commonsImage("Mercedes-Benz Stadium, Atlanta, GA (46558862285).jpg")],
    parking: "Downtown decks and official stadium lots; pre-book to avoid surge pricing.",
    parkingCost: "US$25-70 est.",
    drivingTip: "Use assigned deck routes and avoid crossing Centennial Olympic Park traffic late.",
    transit: "MARTA to GWCC/CNN Center or Vine City, then short walk.",
    transitCost: "US$2.50 one way",
    rideshare: "Pick up west or north of the venue after pedestrian zones clear.",
    seating: ["Lower sideline: premium", "Halo-board level: spectacle", "Upper midfield: best tactical view"],
    ticketStartingAt: "$415",
    ticketSourceNote: "Example SeatGeek listing: Spain vs Cape Verde at Mercedes-Benz Stadium on Jun 15, 2026.",
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=Mercedes-Benz+Stadium+Atlanta",
    schedule: [
      { date: "Jun 15", time: "12:00 PM", label: "Spain vs Cape Verde", stage: "Group H · Match 14", price: "From $415", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-15-12-pm/17174340?quantity=1" },
      { date: "Jun 18", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 21", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jul 1", time: "TBD", label: "Round of 32", stage: "Knockout" },
      { date: "Jul 15", time: "TBD", label: "Semi-final", stage: "Knockout" }
    ]
  },
  {
    id: "sofi",
    name: "SoFi Stadium",
    fifaName: "Los Angeles Stadium",
    city: "Inglewood, CA, USA",
    country: "USA",
    currency: "USD",
    capacity: "70,240",
    matchCount: 8,
    gatesOpen: "2h before kickoff",
    coordinates: "33.9535,-118.3392",
    images: [commonsImage("SoFi Stadium.jpg"), commonsImage("SoFi Stadium 2023.jpg"), commonsImage("SoFi Stadium (Los Angeles, USA).jpg")],
    parking: "SoFi lots are high-demand; reserve early or use park-and-ride shuttles.",
    parkingCost: "US$60-120 est.",
    drivingTip: "Use Century/Prairie assigned routes and avoid last-minute rides on I-405 exits.",
    transit: "Metro K Line to Downtown Inglewood plus event shuttle or rideshare/walk connection.",
    transitCost: "US$1.75 + shuttle if charged",
    rideshare: "Use designated rideshare lots; walking out of the core can save time.",
    seating: ["Lower bowl: closest", "Club: premium lounges", "Upper sideline: best value under roof"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=SoFi+Stadium+Inglewood",
    schedule: [
      { date: "Jun 12", time: "TBD", label: "United States opener", stage: "Group stage" },
      { date: "Jun 15", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 18", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 28", time: "TBD", label: "Round of 32", stage: "Knockout" },
      { date: "Jul 10", time: "TBD", label: "Quarter-final", stage: "Knockout" }
    ]
  },
  {
    id: "lincoln",
    name: "Lincoln Financial Field",
    fifaName: "Philadelphia Stadium",
    city: "Philadelphia, PA, USA",
    country: "USA",
    currency: "USD",
    capacity: "69,796",
    matchCount: 6,
    gatesOpen: "2h before kickoff",
    coordinates: "39.9008,-75.1675",
    images: [commonsImage("Lincoln Financial Field, Philadelphia, 2024.jpg"), commonsImage("Lincoln Financial Field, Philadelphia.jpg"), commonsImage("Lincoln Financial Field (Aerial view) (cropped).jpg")],
    parking: "Sports Complex lots surround the stadium; official prepaid parking is best.",
    parkingCost: "US$35-75 est.",
    drivingTip: "Use I-95/Broad Street and follow assigned lot color signs.",
    transit: "SEPTA Broad Street Line to NRG Station, then 5-8 min walk.",
    transitCost: "US$2.50 one way",
    rideshare: "Pickup is easier north of Pattison Ave after the crowd spreads out.",
    seating: ["Lower sideline: strongest view", "End zones: lively", "Upper midfield: value"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=Lincoln+Financial+Field+Philadelphia",
    schedule: [
      { date: "Jun 14", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 19", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 25", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jul 4", time: "TBD", label: "Round of 16", stage: "Knockout" }
    ]
  },
  {
    id: "lumen",
    name: "Lumen Field",
    fifaName: "Seattle Stadium",
    city: "Seattle, WA, USA",
    country: "USA",
    currency: "USD",
    capacity: "69,000",
    matchCount: 6,
    gatesOpen: "2h before kickoff",
    coordinates: "47.5952,-122.3316",
    images: [commonsImage("Lumen Field exterior, July 2023.jpg"), commonsImage("Lumen Field 2023.jpg"), commonsImage("Lumen Field aerial.jpg")],
    parking: "SODO garages and stadium lots; availability drops quickly near kickoff.",
    parkingCost: "US$30-80 est.",
    drivingTip: "Use SODO/International District routes and expect congestion around I-90 ramps.",
    transit: "Link light rail to Stadium or International District/Chinatown station.",
    transitCost: "US$2.25-3.50",
    rideshare: "Walk north toward Pioneer Square or south into SODO for cleaner pickup.",
    seating: ["Hawks Nest end: loud", "Sideline lower: best view", "Upper west: skyline angle"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=Lumen+Field+Seattle",
    schedule: [
      { date: "Jun 15", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 19", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 24", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jul 1", time: "TBD", label: "Round of 32", stage: "Knockout" }
    ]
  },
  {
    id: "levis",
    name: "Levi's Stadium",
    fifaName: "San Francisco Bay Area Stadium",
    city: "Santa Clara, CA, USA",
    country: "USA",
    currency: "USD",
    capacity: "68,500",
    matchCount: 6,
    gatesOpen: "2h before kickoff",
    coordinates: "37.4030,-121.9700",
    images: [commonsImage("Entering Levi's Stadium.JPG"), commonsImage("Levi's Stadium - panoramio.jpg"), commonsImage("Levi's Stadium interior 1.jpg")],
    parking: "Official lots around Tasman Drive; reserve and choose lot by post-match direction.",
    parkingCost: "US$40-90 est.",
    drivingTip: "Use US-101/CA-237 early and avoid Great America Parkway late.",
    transit: "VTA light rail to Great America station or ACE/Capitol Corridor to Santa Clara-Great America.",
    transitCost: "US$2.50 VTA / rail varies",
    rideshare: "Pickup is usually smoother away from Tasman Drive after the match.",
    seating: ["Lower west: shade first", "Upper east: sun exposure", "Club: best concourse access"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=Levi%27s+Stadium+Santa+Clara",
    schedule: [
      { date: "Jun 13", time: "TBD", label: "Match 8", stage: "Group stage" },
      { date: "Jun 16", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 22", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jul 1", time: "TBD", label: "Round of 32", stage: "Knockout" }
    ]
  },
  {
    id: "gillette",
    name: "Gillette Stadium",
    fifaName: "Boston Stadium",
    city: "Foxborough, MA, USA",
    country: "USA",
    currency: "USD",
    capacity: "65,878",
    matchCount: 7,
    gatesOpen: "2h before kickoff",
    coordinates: "42.0909,-71.2643",
    images: [commonsImage("Gillette Stadium02.jpg"), commonsImage("Gillette Stadium01.jpg"), commonsImage("Gillette Stadium03.jpg")],
    parking: "Patriot Place and stadium lots; pre-paid parking is the practical choice.",
    parkingCost: "US$40-80 est.",
    drivingTip: "Use I-95/Route 1 and plan for one-way traffic controls after matches.",
    transit: "MBTA special event train from Boston/Providence when scheduled, plus limited regional options.",
    transitCost: "US$10-20 est.",
    rideshare: "Post-match rideshare can be slow; wait at Patriot Place or take event rail.",
    seating: ["Lower bowl: close", "Putnam Club: premium", "Upper midfield: full view"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=Gillette+Stadium+Foxborough",
    schedule: [
      { date: "Jun 13", time: "TBD", label: "Match 5", stage: "Group stage" },
      { date: "Jun 16", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 23", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 30", time: "TBD", label: "Round of 32", stage: "Knockout" },
      { date: "Jul 9", time: "TBD", label: "Quarter-final", stage: "Knockout" }
    ]
  },
  {
    id: "hard-rock",
    name: "Hard Rock Stadium",
    fifaName: "Miami Stadium",
    city: "Miami Gardens, FL, USA",
    country: "USA",
    currency: "USD",
    capacity: "64,767",
    matchCount: 7,
    gatesOpen: "2h before kickoff",
    coordinates: "25.9580,-80.2389",
    images: [commonsImage("Hard Rock Stadium.jpg"), commonsImage("Hard Rock Stadium.png"), commonsImage("Hard Rock Stadium aerial view.jpg")],
    parking: "Official lots around the stadium; buy in advance and note lot color.",
    parkingCost: "US$40-90 est.",
    drivingTip: "Use Florida Turnpike or NW 27th Ave based on assigned lot.",
    transit: "Use Brightline/Tri-Rail to Aventura or Golden Glades plus event shuttle/rideshare if available.",
    transitCost: "US$2.25-15 est.",
    rideshare: "Use official rideshare zones; walking out of the perimeter can reduce surge waits.",
    seating: ["Lower bowl: close", "Shaded canopy: comfort priority", "Upper sideline: best value"],
    navigationUrl: "https://www.google.com/maps/dir/?api=1&destination=Hard+Rock+Stadium+Miami+Gardens",
    schedule: [
      { date: "Jun 15", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 21", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jun 27", time: "TBD", label: "Group match", stage: "Group stage" },
      { date: "Jul 3", time: "TBD", label: "Round of 32", stage: "Knockout" },
      { date: "Jul 18", time: "TBD", label: "Third-place match", stage: "Final weekend" }
    ]
  }
];

const copyByLocale: Partial<Record<Locale, Record<string, string>>> = {
  ru: {
    allVenues: "Все стадионы ЧМ-2026",
    venuesSub: "Выберите стадион, чтобы открыть галерею, транспорт, парковку, схему рассадки и матчи.",
    officialName: "Название FIFA",
    matchesHosted: "матчей",
    openDetails: "Открыть",
    gallery: "Галерея",
    seatingMap: "Схема рассадки",
    parkingAndRoute: "Парковка и проезд",
    parkingCost: "Стоимость парковки",
    publicTransit: "Общественный транспорт",
    transitCost: "Стоимость проезда",
    driving: "На машине",
    rideshare: "Такси / rideshare",
    openInMaps: "Открыть в Google Maps",
    matchesAtVenue: "Матчи на стадионе",
    fanTips: "Полезные блоки",
    security: "Безопасность",
    securityText: "Проверьте правила сумок, power bank и запрещенных предметов перед выходом.",
    payments: "Оплата",
    paymentsText: "Держите карту и телефон с NFC: большинство стадионов работают без наличных.",
    accessibility: "Доступность",
    accessibilityText: "Проверьте лифты, ADA/accessible входы и drop-off точки заранее.",
    weather: "Погода и время",
    weatherText: "Добавьте буфер на жару, дождь и досмотр. Приходите минимум за 90 минут.",
    estimates: "Цены указаны ориентировочно в национальной валюте и могут измениться ближе к матчу.",
    source: "Расписание и список городов сверены с FIFA; локальная логистика требует финальной проверки перед матчем."
    ,
    ticketMarket: "Билеты и места",
    lowestFrom: "Минимальная цена от",
    seatGeekOpen: "Открыть SeatGeek",
    seatCategoryGuide: "Категории мест SeatGeek",
    cat1: "Категория 1",
    cat1Text: "лучшие зоны ближе к полю и центральным секторам.",
    cat2: "Категория 2",
    cat2Text: "хороший баланс обзора и цены, часто боковые/угловые сектора.",
    cat3: "Категория 3",
    cat3Text: "более доступные сектора за воротами или выше по чаше.",
    cat4: "Категория 4",
    cat4Text: "самые бюджетные зоны, обычно верхний ярус или дальние сектора.",
    dealScore: "Deal Score",
    dealScoreText: "SeatGeek оценивает ценность билета по месту, цене и историческим данным."
  }
};

function localCopy(locale: Locale) {
  return { ...copyByLocale.en, ...(copyByLocale[locale] ?? {}) } as Record<string, string>;
}

copyByLocale.en = {
  allVenues: "All World Cup 2026 stadiums",
  venuesSub: "Select a venue to open gallery, transport, parking, seating zones, and match slots.",
  officialName: "FIFA name",
  matchesHosted: "matches",
  openDetails: "Open",
  gallery: "Gallery",
  seatingMap: "Seating guide",
  parkingAndRoute: "Parking & routes",
  parkingCost: "Parking cost",
  publicTransit: "Public transport",
  transitCost: "Transit fare",
  driving: "Driving",
  rideshare: "Taxi / rideshare",
  openInMaps: "Open in Google Maps",
  matchesAtVenue: "Matches at this venue",
  fanTips: "Useful blocks",
  security: "Security",
  securityText: "Check bag, power bank, and prohibited item rules before leaving.",
  payments: "Payments",
  paymentsText: "Keep a card and NFC wallet ready: most venues are cashless.",
  accessibility: "Accessibility",
  accessibilityText: "Check elevators, accessible entrances, and drop-off points in advance.",
  weather: "Weather & timing",
  weatherText: "Add buffer for heat, rain, screening, and crowds. Arrive at least 90 minutes early.",
  estimates: "Prices are estimates in national currency and can change closer to match day.",
  source: "Schedule slots and host city list are aligned with FIFA; local logistics need final match-day verification."
  ,
  ticketMarket: "Tickets & seats",
  lowestFrom: "Lowest from",
  seatGeekOpen: "Open SeatGeek",
  seatCategoryGuide: "SeatGeek seat categories",
  cat1: "Category 1",
  cat1Text: "best zones closer to the field and central sections.",
  cat2: "Category 2",
  cat2Text: "balanced view and price, often sideline or corner sections.",
  cat3: "Category 3",
  cat3Text: "more accessible sections behind goals or higher in the bowl.",
  cat4: "Category 4",
  cat4Text: "lowest-priced zones, usually upper tier or farther sections.",
  dealScore: "Deal Score",
  dealScoreText: "SeatGeek rates ticket value using seat quality, location, and historical pricing."
};

function dateTile(date: string) {
  return date.toUpperCase().replace(" ", "\n");
}

function imageFallback(event: { currentTarget: HTMLImageElement }) {
  event.currentTarget.src = "/assets/hero-stadium-bg.png";
}

function normalizeVenue(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function useVenueMatches(stadium: Stadium, matches: MatchCardData[]) {
  return useMemo(() => {
    const needles = [stadium.name, stadium.fifaName, stadium.city.split(",")[0]].map(normalizeVenue);
    return matches.filter((match) => {
      const venue = normalizeVenue(match.venue);
      return needles.some((needle) => venue.includes(needle) || needle.includes(venue));
    });
  }, [matches, stadium]);
}

type SeatGeekTicketInfo = {
  startingAt: string;
  cityUrl: string;
  sourceLabel: string;
  matches: StadiumMatch[];
};

export type TicketMarketMatch = StadiumMatch & {
  slug: string;
  stadiumId: string;
  stadiumName: string;
  city: string;
  cityUrl: string;
  sourceLabel: string;
  lowestPrice: number | null;
};

const seatGeekTicketData: Record<string, SeatGeekTicketInfo> = {
  "bc-place": {
    startingAt: "$280",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/vancouver",
    sourceLabel: "SeatGeek Vancouver",
    matches: [
      { date: "Jun 13", time: "9:00 PM", label: "Australia vs Turkey", stage: "Group D · Match 6", price: "From $280", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-13-9-pm/17249637?quantity=1" },
      { date: "Jun 18", time: "3:00 PM", label: "Canada vs Qatar", stage: "Group B · Match 27", price: "From $442", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-18-3-pm/17249638?quantity=1" },
      { date: "Jun 21", time: "6:00 PM", label: "New Zealand vs Egypt", stage: "Group G · Match 40", price: "From $217" }
    ]
  },
  "bmo-field": {
    startingAt: "$821",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/toronto",
    sourceLabel: "SeatGeek Toronto",
    matches: [
      { date: "Jun 12", time: "3:00 PM", label: "Canada vs Bosnia & Herzegovina", stage: "Group B · Match 3", price: "From $821", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-12-3-pm/17234767?quantity=1" },
      { date: "Jun 17", time: "7:00 PM", label: "Ghana vs Panama", stage: "Group L · Match 21", price: "From $448", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-17-7-pm/17234768?quantity=1" },
      { date: "Jun 20", time: "4:00 PM", label: "Germany vs Ivory Coast", stage: "Group E · Match 33", price: "From $635" }
    ]
  },
  azteca: {
    startingAt: "$1,880",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/mexico-city",
    sourceLabel: "SeatGeek Mexico City",
    matches: [
      { date: "Jun 11", time: "2:00 PM", label: "Mexico vs South Africa", stage: "Group A · Match 1", price: "From $1,880", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-11-2-pm/17650338?quantity=1" },
      { date: "Jun 17", time: "9:00 PM", label: "Colombia vs Uzbekistan", stage: "Group K · Match 24", price: "From $561" },
      { date: "Jun 30", time: "8:00 PM", label: "1A vs TBD", stage: "Round of 32", price: "From $770" }
    ]
  },
  bbva: {
    startingAt: "$287",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/monterrey",
    sourceLabel: "SeatGeek Monterrey",
    matches: [
      { date: "Jun 14", time: "9:00 PM", label: "Tunisia vs Sweden", stage: "Group F · Match 12", price: "From $287", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-14-9-pm/17650339?quantity=1" },
      { date: "Jun 20", time: "11:00 PM", label: "Japan vs Tunisia", stage: "Group F · Match 36", price: "From $338" },
      { date: "Jul 3", time: "8:00 PM", label: "2D vs 2G", stage: "Round of 32", price: "From $506" }
    ]
  },
  akron: {
    startingAt: "$354",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/guadalajara",
    sourceLabel: "SeatGeek Guadalajara",
    matches: [
      { date: "Jun 11", time: "9:00 PM", label: "South Korea vs Czechia", stage: "Group A · Match 2", price: "From $354", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-11-9-pm/17650349?quantity=1" },
      { date: "Jun 18", time: "8:00 PM", label: "Mexico vs South Korea", stage: "Group A · Match 28", price: "From $2,394" },
      { date: "Jul 3", time: "TBD", label: "1K vs TBD", stage: "Round of 32", price: "From $1,746" }
    ]
  },
  metlife: {
    startingAt: "$1,398",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/nyc",
    sourceLabel: "SeatGeek New York",
    matches: [
      { date: "Jun 13", time: "6:00 PM", label: "Brazil vs Morocco", stage: "Group C · Match 7", price: "From $1,398", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-13-6-pm/17269669?quantity=1" },
      { date: "Jun 16", time: "3:00 PM", label: "France vs Senegal", stage: "Group I · Match 17", price: "From $729", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-16-3-pm/17269672?quantity=1" },
      { date: "Jun 22", time: "8:00 PM", label: "Norway vs Senegal", stage: "Group I · Match 41", price: "From $448", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-22-8-pm/17269673?quantity=1" },
      { date: "Jun 25", time: "4:00 PM", label: "Germany vs Ecuador", stage: "Group E · Match 56", price: "From $960", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-25-4-pm/17269674?quantity=1" },
      { date: "Jun 27", time: "5:00 PM", label: "England vs Panama", stage: "Group L · Match 67", price: "From $788", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-27-5-pm/17269675?quantity=1" },
      { date: "Jun 30", time: "5:00 PM", label: "1I vs TBD", stage: "Round of 32 · Match 77", price: "From $598", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-30-5-pm/17269676?quantity=1" },
      { date: "Jul 5", time: "4:00 PM", label: "W76 vs W78", stage: "Round of 16 · Match 91", price: "From $1,031", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-05-4-pm/17269677?quantity=1" },
      { date: "Jul 19", time: "3:00 PM", label: "Match 104", stage: "World Cup Final", price: "From $8,103", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-19-3-pm/17307574?quantity=1" }
    ]
  },
  att: {
    startingAt: "$745",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/dallas",
    sourceLabel: "SeatGeek Dallas",
    matches: [
      { date: "Jun 14", time: "3:00 PM", label: "Japan vs Netherlands", stage: "Group F · Match 11", price: "From $745", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-14-3-pm/17385143?quantity=1" },
      { date: "Jun 17", time: "3:00 PM", label: "England vs Croatia", stage: "Group L · Match 22", price: "From $934", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-17-3-pm/17385142?quantity=1" },
      { date: "Jun 22", time: "12:00 PM", label: "Argentina vs Austria", stage: "Group J · Match 43", price: "From $992" },
      { date: "Jun 30", time: "12:00 PM", label: "2E vs 2I", stage: "Round of 32", price: "From $371" }
    ]
  },
  arrowhead: {
    startingAt: "$703",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/kansas-city",
    sourceLabel: "SeatGeek Kansas City",
    matches: [
      { date: "Jun 16", time: "8:00 PM", label: "Argentina vs Algeria", stage: "Group J · Match 19", price: "From $703", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-16-8-pm/17196233?quantity=1" },
      { date: "Jun 20", time: "7:00 PM", label: "Ecuador vs Curacao", stage: "Group E · Match 34", price: "From $317" },
      { date: "Jul 3", time: "8:30 PM", label: "1K vs TBD", stage: "Round of 32", price: "From $448" }
    ]
  },
  nrg: {
    startingAt: "$437",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/houston",
    sourceLabel: "SeatGeek Houston",
    matches: [
      { date: "Jun 14", time: "12:00 PM", label: "Germany vs Curacao", stage: "Group E · Match 10", price: "From $437", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-14-12-pm/17307552?quantity=1" },
      { date: "Jun 17", time: "12:00 PM", label: "Portugal vs DR Congo", stage: "Group K · Match 23", price: "From $659", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-17-12-pm/17307554?quantity=1" },
      { date: "Jun 20", time: "12:00 PM", label: "Netherlands vs Sweden", stage: "Group F · Match 35", price: "From $455" },
      { date: "Jun 29", time: "12:00 PM", label: "1C vs 2F", stage: "Round of 32", price: "From $605" }
    ]
  },
  "mercedes-benz": {
    startingAt: "$410",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/atlanta",
    sourceLabel: "SeatGeek Atlanta",
    matches: [
      { date: "Jun 15", time: "12:00 PM", label: "Spain vs Cape Verde", stage: "Group H · Match 14", price: "From $410", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-15-12-pm/17174340?quantity=1" },
      { date: "Jun 18", time: "12:00 PM", label: "South Africa vs Czechia", stage: "Group A · Match 25", price: "From $204", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-18-12-pm/17174341?quantity=1" },
      { date: "Jun 21", time: "12:00 PM", label: "Spain vs Saudi Arabia", stage: "Group H · Match 38", price: "From $529", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-21-12-pm/17174342?quantity=1" },
      { date: "Jun 24", time: "6:00 PM", label: "Morocco vs Haiti", stage: "Group C · Match 50", price: "From $244", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-24-6-pm/17174343?quantity=1" },
      { date: "Jun 27", time: "7:30 PM", label: "Uzbekistan vs DR Congo", stage: "Group K · Match 72", price: "From $187", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-27-7-30-pm/17174344?quantity=1" },
      { date: "Jul 1", time: "12:00 PM", label: "1L vs TBD", stage: "Round of 32 · Match 80", price: "From $355", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-01-12-pm/17174345?quantity=1" },
      { date: "Jul 7", time: "12:00 PM", label: "W86 vs W88", stage: "Round of 16 · Match 95", price: "From $891" }
    ]
  },
  sofi: {
    startingAt: "$270",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/la",
    sourceLabel: "SeatGeek Los Angeles",
    matches: [
      { date: "Jun 12", time: "6:00 PM", label: "USA vs Paraguay", stage: "Group D · Match 4", price: "From $992", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-12-6-pm/17176203?quantity=1" },
      { date: "Jun 15", time: "6:00 PM", label: "New Zealand vs Iran", stage: "Group G · Match 15", price: "From $270", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-15-6-pm/17176204?quantity=1" },
      { date: "Jun 18", time: "12:00 PM", label: "Switzerland vs Bosnia & Herzegovina", stage: "Group B · Match 26", price: "From $332", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-18-12-pm/17176205?quantity=1" },
      { date: "Jun 21", time: "12:00 PM", label: "Belgium vs Iran", stage: "Group G · Match 39", price: "From $327", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-21-12-pm/17176206?quantity=1" },
      { date: "Jun 25", time: "7:00 PM", label: "USA vs Turkey", stage: "Group D · Match 59", price: "From $714", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-25-7-pm/17176207?quantity=1" },
      { date: "Jul 10", time: "12:00 PM", label: "W93 vs W94", stage: "Quarterfinal · Match 98", price: "From $1,588", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-10-12-pm/17176210?quantity=1" }
    ]
  },
  lincoln: {
    startingAt: "$681",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/philadelphia",
    sourceLabel: "SeatGeek Philadelphia",
    matches: [
      { date: "Jun 14", time: "6:00 PM", label: "Ecuador vs Ivory Coast", stage: "Group E · Match 9", price: "From $681", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-14-6-pm/17213259?quantity=1" },
      { date: "Jun 19", time: "9:00 PM", label: "Brazil vs Haiti", stage: "Group C · Match 29", price: "From $898", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-19-9-pm/17213260?quantity=1" },
      { date: "Jun 22", time: "5:00 PM", label: "France vs Iraq", stage: "Group I · Match 42", price: "From $413" }
    ]
  },
  lumen: {
    startingAt: "$470",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/seattle",
    sourceLabel: "SeatGeek Seattle",
    matches: [
      { date: "Jun 15", time: "12:00 PM", label: "Belgium vs Egypt", stage: "Group G · Match 16", price: "From $470", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-15-12-pm/17248695?quantity=1" },
      { date: "Jun 19", time: "12:00 PM", label: "USA vs Australia", stage: "Group D · Match 32", price: "From $930", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-19-12-pm/17248696?quantity=1" },
      { date: "Jun 24", time: "12:00 PM", label: "Qatar vs Bosnia & Herzegovina", stage: "Group B · Match 52", price: "From $207" }
    ]
  },
  levis: {
    startingAt: "$179",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/sf",
    sourceLabel: "SeatGeek San Francisco",
    matches: [
      { date: "Jun 13", time: "12:00 PM", label: "Qatar vs Switzerland", stage: "Group B · Match 8", price: "From $230", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-13-12-pm/17171556?quantity=1" },
      { date: "Jun 16", time: "9:00 PM", label: "Austria vs Jordan", stage: "Group J · Match 20", price: "From $179", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-16-9-pm/17171557?quantity=1" },
      { date: "Jun 19", time: "9:00 PM", label: "Paraguay vs Turkey", stage: "Group D · Match 31", price: "From $266", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-19-9-pm/17171558?quantity=1" },
      { date: "Jun 22", time: "8:00 PM", label: "Jordan vs Algeria", stage: "Group J · Match 44", price: "From $186", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-22-8-pm/17171559?quantity=1" },
      { date: "Jun 25", time: "7:00 PM", label: "Paraguay vs Australia", stage: "Group D · Match 60", price: "From $248", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-25-7-pm/17171560?quantity=1" },
      { date: "Jul 1", time: "5:00 PM", label: "1D vs TBD", stage: "Round of 32 · Match 81", price: "From $570", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-07-01-5-pm/17171561?quantity=1" }
    ]
  },
  gillette: {
    startingAt: "$614",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/boston",
    sourceLabel: "SeatGeek Boston",
    matches: [
      { date: "Jun 13", time: "9:00 PM", label: "Haiti vs Scotland", stage: "Group C · Match 5", price: "From $614", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-13-9-pm/17307864?quantity=1" },
      { date: "Jun 16", time: "6:00 PM", label: "Norway vs Iraq", stage: "Group I · Match 18", price: "From $273", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-16-6-pm/17307866?quantity=1" },
      { date: "Jun 19", time: "6:00 PM", label: "Scotland vs Morocco", stage: "Group C · Match 30", price: "From $728" },
      { date: "Jun 29", time: "4:30 PM", label: "1C vs 2F", stage: "Round of 32", price: "From $488" }
    ]
  },
  "hard-rock": {
    startingAt: "$312",
    cityUrl: "https://seatgeek.com/fifa-world-cup-tickets/miami",
    sourceLabel: "SeatGeek Miami",
    matches: [
      { date: "Jun 15", time: "6:00 PM", label: "Uruguay vs Saudi Arabia", stage: "Group H · Match 13", price: "From $312", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-15-6-pm/17164014?quantity=1" },
      { date: "Jun 21", time: "6:00 PM", label: "Uruguay vs Cape Verde", stage: "Group H · Match 37", price: "From $285", ticketUrl: "https://seatgeek.com/fifa-world-cup-tickets/international-soccer/2026-06-21-6-pm/17164015?quantity=1" },
      { date: "Jun 24", time: "6:00 PM", label: "Brazil vs Scotland", stage: "Group C · Match 49", price: "From $1,497" },
      { date: "Jul 3", time: "6:00 PM", label: "1J vs 2H", stage: "Round of 32", price: "From $1,636" }
    ]
  }
};

export function getSeatGeekTicketInfo(stadiumId: string) {
  return seatGeekTicketData[stadiumId];
}

export function getAllSeatGeekTicketMatches(): TicketMarketMatch[] {
  return Object.entries(seatGeekTicketData).flatMap(([stadiumId, info]) => {
    const stadium = worldCupStadiums.find((item) => item.id === stadiumId);
    return info.matches.map((match) => ({
      ...match,
      slug: ticketSlugFromLabel(match.label),
      stadiumId,
      stadiumName: stadium?.name ?? info.sourceLabel.replace("SeatGeek ", ""),
      city: stadium?.city ?? info.sourceLabel.replace("SeatGeek ", ""),
      cityUrl: info.cityUrl,
      sourceLabel: info.sourceLabel,
      lowestPrice: ticketPriceNumber(match.price)
    }));
  });
}

export function getSeatGeekTicketForMatchSlug(slug: string) {
  return getAllSeatGeekTicketMatches().find((match) => match.slug === slug);
}

function ticketPriceNumber(price?: string) {
  const numeric = price?.replace(/[^\d]/g, "");
  return numeric ? Number(numeric) : null;
}

function ticketSlugFromLabel(label: string) {
  const [home, away] = label.split(/\s+vs\s+/i);
  return [teamSlug(home), teamSlug(away)].filter(Boolean).join("-vs-");
}

function teamSlug(value = "") {
  const alias: Record<string, string> = {
    usa: "united-states",
    "united states": "united-states",
    turkey: "turkiye",
    "dr congo": "dr-congo",
    "congo dr": "dr-congo"
  };
  const cleaned = value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .trim();
  return alias[cleaned] ?? cleaned.replace(/\s+/g, "-");
}

export function StadiumsPanel({ t, locale, matches }: StadiumsPanelProps) {
  const copy = localCopy(locale);
  const [selectedId, setSelectedId] = useState(worldCupStadiums[5].id);
  const [activeImage, setActiveImage] = useState(0);
  const selected = worldCupStadiums.find((stadium) => stadium.id === selectedId) ?? worldCupStadiums[0];
  const ticketInfo = getSeatGeekTicketInfo(selected.id);
  const liveVenueMatches = useVenueMatches(selected, matches);
  const selectedTicketStartingAt = ticketInfo?.startingAt ?? selected.ticketStartingAt;
  const selectedTicketUrl = ticketInfo?.cityUrl ?? selected.seatGeekUrl;
  const selectedTicketNote = ticketInfo
    ? `${ticketInfo.sourceLabel} live market snapshot. Prices are SeatGeek "From" listings and can change.`
    : selected.ticketSourceNote ?? "SeatGeek ticket prices vary by matchup, category, demand, and day of week.";
  const schedule = ticketInfo?.matches ?? (selected.schedule.some((match) => match.price)
    ? selected.schedule
    : liveVenueMatches.length > 0
    ? liveVenueMatches.map((match) => {
      const fallbackMatch = selected.schedule.find((item) => item.date.replace(",", "") === match.date.replace(",", "") || item.label.includes(match.home.replace(/[^\p{L}\p{N}\s]/gu, "").trim()));
      return { date: match.date, time: match.time, label: `${match.home} ${t.versus} ${match.away}`, stage: match.group, price: fallbackMatch?.price, ticketUrl: fallbackMatch?.ticketUrl };
    })
    : selected.schedule);

  function selectStadium(stadium: Stadium) {
    setSelectedId(stadium.id);
    setActiveImage(0);
  }

  return (
    <section className="section-card menu-panel stadiums-panel stadiums-guide" aria-labelledby="stadiums-panel-title">
      <div className="section-head stadiums-guide-head">
        <div>
          <p className="small muted menu-panel-kicker">{t.stadiumGuide}</p>
          <h2 id="stadiums-panel-title">{copy.allVenues}</h2>
          <p className="small muted stadiums-guide-subtitle">{copy.venuesSub}</p>
        </div>
        <a className="link-button stadiums-source-link" href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/match-schedule-fixtures-results-teams-stadiums" target="_blank" rel="noreferrer">
          FIFA schedule <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>

      <div className="stadiums-browser">
        <div className="stadium-grid" aria-label={copy.allVenues}>
          {worldCupStadiums.map((stadium) => (
            <button className={`stadium-card ${stadium.id === selected.id ? "active" : ""}`} key={stadium.id} onClick={() => selectStadium(stadium)}>
              <img src={stadium.images[0]} alt={stadium.name} onError={imageFallback} />
              <span className="stadium-card-country">{stadium.country}</span>
              <strong>{stadium.name}</strong>
              <small>{stadium.city}</small>
              <span>{stadium.matchCount} {copy.matchesHosted} · {stadium.capacity}</span>
            </button>
          ))}
        </div>

        <article className="stadium-detail" aria-label={selected.name}>
          <div className="stadium-detail-hero">
            <div className="stadium-gallery-main">
              <img src={selected.images[activeImage]} alt={`${selected.name} ${copy.gallery}`} onError={imageFallback} />
            </div>
            <div className="stadium-detail-summary">
              <span className="tag">{selected.country} · {selected.currency}</span>
              <h3>{selected.name}</h3>
              <p className="small muted"><MapPin size={14} aria-hidden="true" /> {selected.city}</p>
              <div className="stadiums-panel-stats stadium-detail-stats">
                <span><strong>{selected.capacity}</strong><small>{t.capacity}</small></span>
                <span><strong>{selected.matchCount}</strong><small>{copy.matchesHosted}</small></span>
                <span><strong>{selected.gatesOpen}</strong><small>{t.gatesOpen}</small></span>
              </div>
              <p className="small muted"><strong>{copy.officialName}:</strong> {selected.fifaName}</p>
              <div className="stadium-gallery-thumbs" aria-label={copy.gallery}>
                {selected.images.map((image, index) => (
                  <button className={index === activeImage ? "active" : ""} key={image} onClick={() => setActiveImage(index)} aria-label={`${copy.gallery} ${index + 1}`}>
                    <img src={image} alt="" onError={imageFallback} />
                  </button>
                ))}
              </div>
              <a className="primary-button stadium-map-button" href={selected.navigationUrl} target="_blank" rel="noreferrer">
                <Navigation size={16} aria-hidden="true" /> {copy.openInMaps}
              </a>
            </div>
          </div>

          <div className="stadium-detail-grid">
            <section className="stadium-info-card stadium-ticket-card" aria-labelledby="tickets-title">
              <div className="stadium-card-title"><WalletCards size={18} /><h4 id="tickets-title">{copy.ticketMarket}</h4></div>
              <div className="ticket-price-banner">
                <span>{copy.lowestFrom}</span>
                <strong>{selectedTicketStartingAt ?? "See SeatGeek"}</strong>
              </div>
              <p>{selectedTicketNote}</p>
              <div className="seat-category-list">
                {[
                  [copy.cat1, copy.cat1Text],
                  [copy.cat2, copy.cat2Text],
                  [copy.cat3, copy.cat3Text],
                  [copy.cat4, copy.cat4Text]
                ].map(([title, text]) => (
                  <span key={title as string}><strong>{title as string}</strong><small>{text as string}</small></span>
                ))}
              </div>
              <p className="small muted"><strong>{copy.dealScore}:</strong> {copy.dealScoreText}</p>
              {selectedTicketUrl && (
                <a className="link-button stadium-ticket-link" href={selectedTicketUrl} target="_blank" rel="noreferrer">
                  {copy.seatGeekOpen} <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
            </section>

            <section className="stadium-info-card" aria-labelledby="routes-title">
              <div className="stadium-card-title"><CircleParking size={18} /><h4 id="routes-title">{copy.parkingAndRoute}</h4></div>
              <div className="route-facts">
                <span><CircleParking size={16} /><strong>{copy.parkingCost}</strong><small>{selected.parkingCost}</small></span>
                <span><Train size={16} /><strong>{copy.transitCost}</strong><small>{selected.transitCost}</small></span>
              </div>
              <p><strong>{t.parking}:</strong> {selected.parking}</p>
              <p><strong>{copy.driving}:</strong> {selected.drivingTip}</p>
              <p><strong>{copy.publicTransit}:</strong> {selected.transit}</p>
              <p><strong>{copy.rideshare}:</strong> {selected.rideshare}</p>
            </section>
          </div>

          <section className="stadium-info-card stadium-schedule-card" aria-labelledby="stadium-matches-title">
            <div className="stadium-card-title"><Clock size={18} /><h4 id="stadium-matches-title">{copy.matchesAtVenue}</h4></div>
            <div className="stadium-match-list">
              {schedule.map((match) => (
                <article className="stadium-match-row" key={`${match.date}-${match.label}`}>
                  <div className="date-tile">{dateTile(match.date)}</div>
                  <div>
                    <strong>{match.label}</strong>
                    <p className="small muted">{match.stage}</p>
                  </div>
                  <div className="stadium-match-meta">
                    <span className="small muted">{match.time}</span>
                    {match.price && <strong>{match.price}</strong>}
                    {match.ticketUrl && <a className="link-button" href={match.ticketUrl} target="_blank" rel="noreferrer">SeatGeek</a>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="stadium-info-card" aria-labelledby="stadium-tips-title">
            <div className="stadium-card-title"><Info size={18} /><h4 id="stadium-tips-title">{copy.fanTips}</h4></div>
            <div className="fan-tip-grid">
              {[
                [ShieldCheck, copy.security, copy.securityText],
                [CreditCard, copy.payments, copy.paymentsText],
                [Accessibility, copy.accessibility, copy.accessibilityText],
                [AlertTriangle, copy.weather, copy.weatherText]
              ].map(([Icon, title, text]) => (
                <article key={title as string}>
                  <Icon size={18} aria-hidden="true" />
                  <strong>{title as string}</strong>
                  <p className="small muted">{text as string}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="stadium-utility-strip">
            <span><Bus size={15} /> {copy.publicTransit}</span>
            <span><WalletCards size={15} /> {t.cashlessVenue}</span>
            <span><Utensils size={15} /> Food zones</span>
            <span><Luggage size={15} /> Bag policy</span>
          </div>
          <p className="small muted stadium-disclaimer">{copy.estimates} {copy.source}</p>
        </article>
      </div>
    </section>
  );
}
