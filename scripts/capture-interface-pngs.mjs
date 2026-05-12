import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import playwright from "playwright";

const baseUrl = "http://localhost:3001";
const outDir = join(process.cwd(), "designs", "interface-png");
const desktopDir = join(outDir, "desktop");
const mobileDir = join(outDir, "mobile");

mkdirSync(desktopDir, { recursive: true });
mkdirSync(mobileDir, { recursive: true });

const desktopPages = [
  ["01-dashboard", "Dashboard"],
  ["02-matches", "Matches"],
  ["03-fan-zones", "Fan Zones"],
  ["04-stadiums", "Stadiums"],
  ["05-travel-routes", "Travel & Routes"],
  ["06-where-to-watch", "Where to Watch"],
  ["07-community", "Community"],
  ["08-tickets", "Tickets"],
  ["09-news", "News"],
  ["10-ai-assistant", "AI Assistant"]
];

const mobilePages = [
  ["01-home", "Home"],
  ["02-matches", "Matches"],
  ["03-map-fan-zones", "Map"],
  ["04-community", "Community"],
  ["05-ai-assistant", "AI Assistant"]
];

const browser = await playwright.chromium.launch({ headless: true });

const desktop = await browser.newPage({
  viewport: { width: 1536, height: 1024 },
  deviceScaleFactor: 1
});
await desktop.goto(baseUrl, { waitUntil: "networkidle" });
await desktop.evaluate(() => {
  localStorage.setItem("cupmate-locale", "en");
});
await desktop.reload({ waitUntil: "networkidle" });

for (const [fileName, menuLabel] of desktopPages) {
  await desktop.getByRole("button", { name: menuLabel }).first().click();
  await desktop.waitForTimeout(250);
  await desktop.screenshot({
    path: join(desktopDir, `${fileName}.png`),
    fullPage: true
  });
}

const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  deviceScaleFactor: 2
});
await mobile.goto(baseUrl, { waitUntil: "networkidle" });
await mobile.evaluate(() => {
  localStorage.setItem("cupmate-locale", "en");
});
await mobile.reload({ waitUntil: "networkidle" });

for (const [fileName, menuLabel] of mobilePages) {
  await mobile.getByRole("button", { name: new RegExp(menuLabel) }).first().click();
  await mobile.waitForTimeout(250);
  await mobile.screenshot({
    path: join(mobileDir, `${fileName}.png`),
    fullPage: true
  });
}

await mobile.getByRole("button", { name: /^Map/ }).click();
await mobile.waitForTimeout(200);
await mobile.getByRole("button", { name: /Travel & Routes|Travel/ }).first().click();
await mobile.waitForTimeout(250);
await mobile.screenshot({
  path: join(mobileDir, "06-route-to-stadium.png"),
  fullPage: true
});

await browser.close();

const readme = `# CupMate PNG Interface Designs

These are separate raster PNG interface files captured from the current CupMate UI. They are not SVG files and are not slices from one image.

## Desktop

${desktopPages.map(([fileName, label]) => `- ${label}: [desktop/${fileName}.png](./desktop/${fileName}.png)`).join("\n")}

## Mobile

${mobilePages.map(([fileName, label]) => `- ${label}: [mobile/${fileName}.png](./mobile/${fileName}.png)`).join("\n")}
- Route to Stadium: [mobile/06-route-to-stadium.png](./mobile/06-route-to-stadium.png)
`;

writeFileSync(join(outDir, "README.md"), readme);

console.log("Captured PNG interfaces in designs/interface-png");
