import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const sourceDir = process.env.NEWS_PHOTO_SOURCE_DIR ?? "/tmp/cupmate-news-photo-sources";
const outputDir = "public/assets/news";
const logoDataUri = `data:image/png;base64,${readFileSync("public/assets/cupmate-trophy-white.png").toString("base64")}`;

const covers = [
  ["los-angeles-world-cup-surface-final-prep", "Stadiums"],
  ["us-hotels-world-cup-demand-check", "Travel"],
  ["lays-world-cup-inspired-flavors-canada", "Commerce"],
  ["iran-seeks-world-cup-visa-guarantees", "Teams"],
  ["nora-fatehi-world-cup-opening-ceremony-toronto", "Culture"],
  ["fifa-disciplinary-rules-world-cup-2026", "Rules"],
  ["shakira-burna-boy-world-cup-song-teaser", "Culture"],
  ["metlife-world-cup-train-fare-drops", "Transit"],
  ["world-cup-2026-squad-size-26", "Teams"],
  ["record-fifa-payouts-world-cup-2026", "Business"],
  ["fanatics-fest-nyc-fifa-final-weekend", "Fan Events"],
  ["visa-hdfc-world-cup-fan-access-promotion", "Travel"],
  ["plan-los-angeles-world-cup-experience", "Host Cities"],
  ["world-cup-2026-referees-appointed", "Referees"]
];

function coverHtml(slug, category) {
  const sourcePath = path.resolve(sourceDir, `${slug}.png`);
  const sourceUrl = `data:image/png;base64,${readFileSync(sourcePath).toString("base64")}`;

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  .cover {
    position: relative;
    width: 1200px;
    height: 675px;
    overflow: hidden;
    background: #071331;
  }
  .photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.04) contrast(1.03);
  }
  .shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(7, 19, 49, 0.55), transparent 34%),
      linear-gradient(180deg, rgba(7, 19, 49, 0.22), transparent 28%, rgba(7, 19, 49, 0.16));
  }
  .brand {
    position: absolute;
    top: 34px;
    left: 34px;
    display: inline-flex;
    align-items: center;
    gap: 14px;
    max-width: 360px;
    padding: 12px 16px 12px 12px;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.34);
    border-radius: 18px;
    background: rgba(7, 19, 49, 0.58);
    box-shadow: 0 16px 42px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(10px);
  }
  .brand img {
    width: 48px;
    height: 48px;
    object-fit: contain;
    filter: drop-shadow(0 5px 10px rgba(0,0,0,.24));
  }
  .brand strong {
    display: block;
    font-size: 25px;
    line-height: 1;
    letter-spacing: .04em;
  }
  .brand span {
    display: block;
    margin-top: 4px;
    color: rgba(255,255,255,.82);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .04em;
    text-transform: uppercase;
  }
  .category {
    position: absolute;
    right: 32px;
    bottom: 28px;
    padding: 10px 14px;
    color: white;
    border-radius: 999px;
    background: rgba(7, 19, 49, 0.62);
    font-size: 14px;
    font-weight: 850;
    backdrop-filter: blur(8px);
  }
</style>
</head>
<body>
  <div class="cover">
    <img class="photo" src="${sourceUrl}" alt="" />
    <div class="shade"></div>
    <div class="brand">
      <img src="${logoDataUri}" alt="" />
      <div><strong>CUPMATE</strong><span>Your World Cup Companion</span></div>
    </div>
    <div class="category">${category}</div>
  </div>
</body>
</html>`;
}

mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 1 });

for (const [slug, category] of covers) {
  await page.setContent(coverHtml(slug, category), { waitUntil: "load" });
  await page.waitForFunction(() => {
    const image = document.querySelector("img.photo");
    return image && image.complete && image.naturalWidth > 0;
  });
  await page.locator(".cover").screenshot({ path: `${outputDir}/${slug}.png` });
}

await browser.close();
console.log(`Generated ${covers.length} photo-based CupMate news covers in ${outputDir}`);
