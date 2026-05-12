import { mkdirSync, readFileSync } from "node:fs";
import { chromium } from "playwright";

const outputDir = "public/assets/news";
const logoDataUri = `data:image/png;base64,${readFileSync("public/assets/cupmate-trophy-white.png").toString("base64")}`;

const articles = [
  { slug: "los-angeles-world-cup-surface-final-prep", category: "Stadiums", city: "Los Angeles", title: "World Cup readiness", theme: "pitch conversion", palette: ["#08254f", "#f35b2f", "#f7c948"], icon: "stadium" },
  { slug: "us-hotels-world-cup-demand-check", category: "Travel", city: "United States", title: "Hotel demand check", theme: "host city rooms", palette: ["#06345b", "#12b76a", "#dff8ff"], icon: "hotel" },
  { slug: "lays-world-cup-inspired-flavors-canada", category: "Commerce", city: "Canada", title: "Tournament flavors", theme: "fan snacks", palette: ["#083a2f", "#f5c400", "#ef3f35"], icon: "chips" },
  { slug: "iran-seeks-world-cup-visa-guarantees", category: "Teams", city: "Iran", title: "Visa assurances", theme: "team travel", palette: ["#072747", "#c92a2a", "#2f9e44"], icon: "passport" },
  { slug: "nora-fatehi-world-cup-opening-ceremony-toronto", category: "Culture", city: "Toronto", title: "Opening ceremony buzz", theme: "music stage", palette: ["#30115e", "#e0448d", "#f6c445"], icon: "stage" },
  { slug: "fifa-disciplinary-rules-world-cup-2026", category: "Rules", city: "FIFA", title: "Suspension clarity", theme: "match regulations", palette: ["#071331", "#ffcc00", "#f04438"], icon: "cards" },
  { slug: "shakira-burna-boy-world-cup-song-teaser", category: "Culture", city: "Global", title: "World Cup track", theme: "music release", palette: ["#081b33", "#f05a7e", "#2dd4bf"], icon: "music" },
  { slug: "metlife-world-cup-train-fare-drops", category: "Transit", city: "New York New Jersey", title: "Matchday rail fare", theme: "stadium train", palette: ["#06294b", "#2f80ed", "#12b76a"], icon: "train" },
  { slug: "world-cup-2026-squad-size-26", category: "Teams", city: "Global", title: "26-player squads", theme: "team selection", palette: ["#102a43", "#245bff", "#f8d24a"], icon: "lineup" },
  { slug: "record-fifa-payouts-world-cup-2026", category: "Business", city: "FIFA", title: "Record payouts", theme: "team revenue", palette: ["#06283d", "#21a67a", "#f5c84b"], icon: "finance" },
  { slug: "fanatics-fest-nyc-fifa-final-weekend", category: "Fan Events", city: "New York", title: "Final-weekend festival", theme: "fan culture", palette: ["#0b1f45", "#f04e30", "#42c2ff"], icon: "festival" },
  { slug: "visa-hdfc-world-cup-fan-access-promotion", category: "Travel", city: "India", title: "Fan access promotion", theme: "global travel", palette: ["#071a52", "#f7b731", "#00a6a6"], icon: "ticket" },
  { slug: "plan-los-angeles-world-cup-experience", category: "Host Cities", city: "Los Angeles", title: "Fan experience guide", theme: "city planning", palette: ["#10234d", "#f76f3d", "#67d391"], icon: "city" },
  { slug: "world-cup-2026-referees-appointed", category: "Referees", city: "Global", title: "Referee team named", theme: "match officials", palette: ["#071331", "#8fd14f", "#f8f9fa"], icon: "whistle" }
];

function iconMarkup(icon) {
  const common = `stroke="white" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
  switch (icon) {
    case "hotel":
      return `<rect x="170" y="130" width="220" height="250" rx="18" ${common}/><path d="M220 380v-85h120v85M215 185h30M285 185h30M215 245h30M285 245h30" ${common}/>`;
    case "chips":
      return `<path d="M205 145h170l-24 250H229z" fill="rgba(255,255,255,.18)" stroke="white" stroke-width="9"/><circle cx="290" cy="265" r="58" fill="rgba(255,255,255,.28)"/><path d="M238 196h104M252 327h76" ${common}/>`;
    case "passport":
      return `<rect x="190" y="120" width="180" height="280" rx="18" fill="rgba(255,255,255,.18)" stroke="white" stroke-width="9"/><circle cx="280" cy="245" r="54" ${common}/><path d="M226 338h108M248 245h64M280 191c24 31 24 77 0 108M280 191c-24 31-24 77 0 108" ${common}/>`;
    case "stage":
      return `<path d="M160 340h250M190 340l35-150h120l35 150M235 190v150M335 190v150" ${common}/><circle cx="285" cy="145" r="42" fill="rgba(255,255,255,.24)" stroke="white" stroke-width="9"/>`;
    case "cards":
      return `<rect x="175" y="165" width="120" height="170" rx="14" fill="#f8d24a" stroke="white" stroke-width="8"/><rect x="285" y="135" width="120" height="170" rx="14" fill="#f04438" stroke="white" stroke-width="8"/>`;
    case "music":
      return `<path d="M330 135v175a48 48 0 1 1-30-45V168l100-24v142a48 48 0 1 1-30-45V126z" fill="rgba(255,255,255,.2)" stroke="white" stroke-width="9"/>`;
    case "train":
      return `<rect x="170" y="125" width="240" height="230" rx="34" fill="rgba(255,255,255,.18)" stroke="white" stroke-width="9"/><path d="M220 180h140M212 280h156M230 390l35-35M350 390l-35-35" ${common}/><circle cx="235" cy="320" r="16" fill="white"/><circle cx="345" cy="320" r="16" fill="white"/>`;
    case "lineup":
      return `<circle cx="205" cy="170" r="34" fill="rgba(255,255,255,.28)"/><circle cx="290" cy="170" r="34" fill="rgba(255,255,255,.28)"/><circle cx="375" cy="170" r="34" fill="rgba(255,255,255,.28)"/><path d="M175 270h230M205 215v120M290 215v120M375 215v120" ${common}/>`;
    case "finance":
      return `<path d="M175 340h250M210 340V220M290 340V150M370 340V260" ${common}/><path d="M185 230c62 20 130-86 220-42" ${common}/>`;
    case "festival":
      return `<path d="M165 350c55-80 110-80 165 0s110 80 165 0M210 230h220M250 180h140" ${common}/><circle cx="235" cy="285" r="20" fill="white"/><circle cx="355" cy="285" r="20" fill="white"/>`;
    case "ticket":
      return `<path d="M165 205c25 0 45-20 45-45h250c0 25 20 45 45 45v130c-25 0-45 20-45 45H210c0-25-20-45-45-45z" fill="rgba(255,255,255,.18)" stroke="white" stroke-width="9"/><path d="M285 178v204M335 232h78M335 296h78" ${common}/>`;
    case "city":
      return `<path d="M170 360V210h80v150M250 360V145h90v215M340 360V235h80v125M145 360h300" ${common}/><path d="M200 250h20M200 295h20M285 190h25M285 245h25M370 275h20" ${common}/>`;
    case "whistle":
      return `<path d="M210 260a75 75 0 1 0 145 28h60v-58H320a75 75 0 0 0-110 30z" fill="rgba(255,255,255,.18)" stroke="white" stroke-width="9"/><circle cx="260" cy="286" r="25" fill="white"/><path d="M405 230l42-38" ${common}/>`;
    default:
      return `<path d="M165 340h250M190 340V220l100-70 100 70v120M230 340v-75h120v75" ${common}/><path d="M190 220h200" ${common}/>`;
  }
}

function html(article) {
  const [base, accent, highlight] = article.palette;
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  .cover {
    width: 1200px;
    height: 675px;
    position: relative;
    overflow: hidden;
    color: white;
    background:
      radial-gradient(circle at 20% 20%, ${accent} 0 12%, transparent 35%),
      radial-gradient(circle at 82% 72%, ${highlight} 0 10%, transparent 34%),
      linear-gradient(135deg, ${base}, #071331 70%);
  }
  .cover::before {
    content: "";
    position: absolute;
    inset: 34px;
    border: 1px solid rgba(255,255,255,.22);
    border-radius: 32px;
  }
  .brand {
    position: absolute;
    top: 58px;
    left: 66px;
    display: flex;
    align-items: center;
    gap: 22px;
  }
  .brand img { width: 82px; height: 82px; object-fit: contain; filter: drop-shadow(0 12px 22px rgba(0,0,0,.32)); }
  .brand strong { display: block; font-size: 42px; letter-spacing: .03em; }
  .brand span { display: block; margin-top: 3px; color: rgba(255,255,255,.78); font-size: 22px; font-weight: 650; }
  .visual {
    position: absolute;
    right: 72px;
    bottom: 82px;
    width: 440px;
    height: 360px;
    opacity: .92;
  }
  .copy {
    position: absolute;
    left: 72px;
    right: 530px;
    bottom: 74px;
  }
  .tag { display: inline-flex; padding: 12px 16px; border-radius: 999px; background: rgba(255,255,255,.16); font-size: 22px; font-weight: 800; }
  h1 { margin: 24px 0 18px; font-size: 68px; line-height: .95; letter-spacing: 0; }
  p { margin: 0; color: rgba(255,255,255,.82); font-size: 25px; font-weight: 650; }
  .stripes { position: absolute; inset: auto -120px -160px auto; width: 620px; height: 620px; border-radius: 50%; border: 46px solid rgba(255,255,255,.08); }
</style>
</head>
<body>
  <div class="cover">
    <div class="stripes"></div>
    <div class="brand">
      <img src="${logoDataUri}" />
      <div><strong>CUPMATE</strong><span>Your World Cup Companion</span></div>
    </div>
    <svg class="visual" viewBox="0 0 560 460" aria-hidden="true">${iconMarkup(article.icon)}</svg>
    <div class="copy">
      <span class="tag">${article.category} · ${article.city}</span>
      <h1>${article.title}</h1>
      <p>${article.theme}</p>
    </div>
  </div>
</body>
</html>`;
}

mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 1 });

for (const article of articles) {
  const pngPath = `${outputDir}/${article.slug}.png`;
  await page.setContent(html(article), { waitUntil: "load" });
  await page.locator(".cover").screenshot({ path: pngPath });
}

await browser.close();
console.log(`Generated ${articles.length} CupMate news covers in ${outputDir}`);
