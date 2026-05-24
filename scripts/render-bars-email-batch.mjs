import fs from "node:fs/promises";
import path from "node:path";

const sourcePath = process.env.LEADS_CSV || "/Users/maksim/Downloads/nyc_football_bar_leads_for_outreach.csv";
const outputDir = path.resolve(process.cwd(), "tmp/mail-template/outreach");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cupmate.us";
const heroUrl = process.env.HERO_URL || "https://cupmate.us/assets/cupmate-bars-outreach-banner.png";
const trophyUrl = process.env.TROPHY_URL || "https://cupmate.us/assets/world-cup-gold.png";

function parseCsv(input) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell.replace(/\r$/, ""));
    rows.push(row);
  }

  return rows;
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function htmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[-\s]+/g, "-")
    .slice(0, 80);
}

function firstEmail(value) {
  return String(value || "")
    .split(/[;,]/)
    .map((email) => email.trim())
    .filter(Boolean)[0] || "";
}

function renderHtml({ barName, borough }) {
  const v = {
    barName: htmlEscape(barName),
    borough: htmlEscape(borough || "New York City"),
    siteUrl: htmlEscape(siteUrl),
    heroUrl: htmlEscape(heroUrl),
    trophyUrl: htmlEscape(trophyUrl),
  };

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>CupMate x ${v.barName}: World Cup 2026 Watch Parties</title></head>
<body style="margin:0;padding:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#07122f;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6fb;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #dce3ef;">
        <tr><td style="background:#06142f;padding:0;"><img src="${v.heroUrl}" alt="CupMate for Bars World Cup 2026 Watch Parties" width="720" style="display:block;width:100%;max-width:720px;height:auto;border:0;"></td></tr>
        <tr><td style="padding:34px 36px 18px;background:#ffffff;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
            <td style="vertical-align:middle;">
              <div style="font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#1b57f0;">CupMate Partner Opportunity</div>
              <h1 style="margin:10px 0 12px;font-size:34px;line-height:1.05;color:#06142f;letter-spacing:0;">Bring World Cup fans to ${v.barName}.</h1>
              <p style="margin:0;font-size:17px;line-height:1.65;color:#39465f;">CupMate helps supporters discover where to watch matches, meet other fans, and turn ordinary match nights into unforgettable World Cup 2026 gatherings.</p>
            </td>
            <td width="110" align="right" style="vertical-align:top;padding-left:18px;"><img src="${v.trophyUrl}" alt="Gold football trophy" width="86" style="display:block;width:86px;height:auto;border:0;"></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:8px 36px 22px;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#26334d;">Hello,</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#26334d;">World Cup 2026 will create a rare opportunity for bars in ${v.borough}: supporters will be looking for more than a screen. They will be searching for atmosphere, community, reservations, specials, and a place where they can cheer for their national team with other fans.</p>
          <p style="margin:0;font-size:16px;line-height:1.7;color:#26334d;">CupMate is an independent fan-planning portal for World Cup 2026. We are building practical guides for matches, host cities, stadium visits, fan zones, travel routes, tickets, and places to watch football.</p>
        </td></tr>
        <tr><td style="padding:0 36px 26px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#06142f;border-radius:14px;overflow:hidden;"><tr><td style="padding:24px 26px;">
          <div style="font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#8ee8c8;">The offer</div>
          <h2 style="margin:8px 0 10px;font-size:24px;line-height:1.18;color:#ffffff;">Make ${v.barName} a CupMate fan-zone partner.</h2>
          <p style="margin:0;font-size:15px;line-height:1.7;color:#d8e2f2;">We can feature your venue as a recommended World Cup watch spot and help position it as a local fan-zone destination for selected matches, teams, and city guides.</p>
        </td></tr></table></td></tr>
        <tr><td style="padding:0 36px 8px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding:18px;border:1px solid #e1e7f0;border-radius:12px;background:#ffffff;vertical-align:top;"><h3 style="margin:0 0 8px;font-size:18px;color:#06142f;">Venue profile</h3><p style="margin:0;font-size:14px;line-height:1.65;color:#536079;">A dedicated listing with address, website, booking details, screens, food, atmosphere, accessibility notes, and match-night information.</p></td>
            <td width="14"></td>
            <td style="padding:18px;border:1px solid #e1e7f0;border-radius:12px;background:#ffffff;vertical-align:top;"><h3 style="margin:0 0 8px;font-size:18px;color:#06142f;">Where-to-watch placement</h3><p style="margin:0;font-size:14px;line-height:1.65;color:#536079;">Promotion inside CupMate city and match planning content for fans actively looking for a place to watch football.</p></td>
          </tr>
          <tr><td height="14" colspan="3"></td></tr>
          <tr>
            <td style="padding:18px;border:1px solid #e1e7f0;border-radius:12px;background:#ffffff;vertical-align:top;"><h3 style="margin:0 0 8px;font-size:18px;color:#06142f;">Fan-zone activation</h3><p style="margin:0;font-size:14px;line-height:1.65;color:#536079;">A match-night concept around specific teams, kickoff times, reservations, themed menus, giveaways, and supporter meetups.</p></td>
            <td width="14"></td>
            <td style="padding:18px;border:1px solid #e1e7f0;border-radius:12px;background:#ffffff;vertical-align:top;"><h3 style="margin:0 0 8px;font-size:18px;color:#06142f;">Commercial visibility</h3><p style="margin:0;font-size:14px;line-height:1.65;color:#536079;">A clear path for fans to call, reserve, visit your website, or plan a match night at your venue.</p></td>
          </tr>
        </table></td></tr>
        <tr><td style="padding:22px 36px 28px;">
          <h2 style="margin:0 0 12px;font-size:24px;color:#06142f;">Next step</h2>
          <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#26334d;">If this sounds relevant, reply to this email and I will send a short media kit, sample bar profile, and partnership options for World Cup 2026 placements.</p>
          <a href="${v.siteUrl}" style="display:inline-block;background:#5b35f5;color:#ffffff;text-decoration:none;font-weight:800;padding:14px 20px;border-radius:9px;">Visit CupMate</a>
        </td></tr>
        <tr><td style="padding:24px 36px;background:#06142f;color:#d8e2f2;"><p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong style="color:#ffffff;">CupMate</strong><br>Independent World Cup 2026 fan-planning portal<br><a href="${v.siteUrl}" style="color:#8ee8c8;text-decoration:none;">cupmate.us</a></p><p style="margin:14px 0 0;font-size:12px;line-height:1.55;color:#9fb0ca;">CupMate is not affiliated with FIFA, host cities, teams, venues, broadcasters, or ticket marketplaces. Sponsored placements and commercial partnerships should be clearly disclosed where applicable.</p></td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function renderText({ barName, borough }) {
  return `Hello,

World Cup 2026 will create a rare opportunity for bars in ${borough || "New York City"}: supporters will be looking for more than a screen. They will be searching for atmosphere, community, reservations, specials, and a place where they can cheer for their national team with other fans.

CupMate is an independent fan-planning portal for World Cup 2026. We can feature ${barName} as a recommended World Cup watch spot and help position it as a local fan-zone destination for selected matches, teams, and city guides.

If this sounds relevant, reply to this email and I will send a short media kit, sample bar profile, and partnership options.

CupMate
${siteUrl}`;
}

const text = await fs.readFile(sourcePath, "utf8");
const rows = parseCsv(text);
const headers = rows[0];
const index = Object.fromEntries(headers.map((header, i) => [header, i]));
const leads = rows
  .slice(1)
  .map((row) => ({
    borough: row[index.borough] || "",
    barName: row[index.name] || "",
    email: firstEmail(row[index.email]),
    allEmails: row[index.email] || "",
  }))
  .filter((lead) => lead.barName && lead.email);

await fs.rm(outputDir, { force: true, recursive: true });
await fs.mkdir(outputDir, { recursive: true });

const manifest = [];
for (const [leadIndex, lead] of leads.entries()) {
  const sequence = String(leadIndex + 1).padStart(2, "0");
  const slug = slugify(lead.barName);
  const htmlFile = `${sequence}-${slug}.html`;
  const textFile = `${sequence}-${slug}.txt`;
  const subject = `CupMate x ${lead.barName}: World Cup 2026 Watch Parties`;
  await fs.writeFile(path.join(outputDir, htmlFile), renderHtml(lead));
  await fs.writeFile(path.join(outputDir, textFile), renderText(lead));
  manifest.push({ ...lead, subject, htmlFile, textFile });
}

const manifestCsv = [
  ["bar_name", "email", "all_emails", "borough", "subject", "html_file", "text_file"].join(","),
  ...manifest.map((lead) =>
    [lead.barName, lead.email, lead.allEmails, lead.borough, lead.subject, lead.htmlFile, lead.textFile]
      .map(csvEscape)
      .join(",")
  ),
].join("\n");

await fs.writeFile(path.join(outputDir, "manifest.csv"), manifestCsv);

console.log(JSON.stringify({ sourcePath, outputDir, count: manifest.length, manifest: path.join(outputDir, "manifest.csv") }, null, 2));
