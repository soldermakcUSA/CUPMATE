import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputDir = path.resolve(root, "tmp/mail-template");
const htmlPath = path.join(outputDir, "cupmate-bars-template.html");
const textPath = path.join(outputDir, "cupmate-bars-template.txt");

const values = {
  contactName: process.env.CONTACT_NAME || "there",
  barName: process.env.BAR_NAME || "your bar",
  city: process.env.CITY || "your city",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://cupmate.us",
  heroUrl: process.env.HERO_URL || "https://cupmate.us/assets/cupmate-bars-outreach-banner.png",
  trophyUrl: process.env.TROPHY_URL || "https://cupmate.us/assets/world-cup-gold.png",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const v = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, escapeHtml(value)]));

const subject = `CupMate x ${values.barName}: World Cup 2026 Watch Parties`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#07122f;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6fb;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #dce3ef;">
          <tr>
            <td style="background:#06142f;padding:0;">
              <img src="${v.heroUrl}" alt="CupMate for Bars World Cup 2026 Watch Parties" width="720" style="display:block;width:100%;max-width:720px;height:auto;border:0;">
            </td>
          </tr>
          <tr>
            <td style="padding:34px 36px 18px;background:#ffffff;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <div style="font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#1b57f0;">CupMate Partner Opportunity</div>
                    <h1 style="margin:10px 0 12px;font-size:34px;line-height:1.05;color:#06142f;letter-spacing:0;">Bring World Cup fans to ${v.barName}.</h1>
                    <p style="margin:0;font-size:17px;line-height:1.65;color:#39465f;">CupMate helps supporters discover where to watch matches, meet other fans, and turn ordinary match nights into unforgettable World Cup 2026 gatherings.</p>
                  </td>
                  <td width="110" align="right" style="vertical-align:top;padding-left:18px;">
                    <img src="${v.trophyUrl}" alt="Gold football trophy" width="86" style="display:block;width:86px;height:auto;border:0;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 22px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#26334d;">Hi ${v.contactName},</p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#26334d;">World Cup 2026 will create a rare opportunity for bars in ${v.city}: supporters will be looking for more than a screen. They will be searching for atmosphere, community, reservations, specials, and a place where they can cheer for their national team with other fans.</p>
              <p style="margin:0;font-size:16px;line-height:1.7;color:#26334d;">CupMate is an independent fan-planning portal for World Cup 2026. We are building practical guides for matches, host cities, stadium visits, fan zones, travel routes, tickets, and places to watch football.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 26px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#06142f;border-radius:14px;overflow:hidden;">
                <tr>
                  <td style="padding:24px 26px;">
                    <div style="font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#8ee8c8;">The offer</div>
                    <h2 style="margin:8px 0 10px;font-size:24px;line-height:1.18;color:#ffffff;">Make ${v.barName} a CupMate fan-zone partner.</h2>
                    <p style="margin:0;font-size:15px;line-height:1.7;color:#d8e2f2;">We can feature your venue as a recommended World Cup watch spot and help position it as a local fan-zone destination for selected matches, teams, and city guides.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 8px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:18px;border:1px solid #e1e7f0;border-radius:12px;background:#ffffff;vertical-align:top;">
                    <h3 style="margin:0 0 8px;font-size:18px;color:#06142f;">Venue profile</h3>
                    <p style="margin:0;font-size:14px;line-height:1.65;color:#536079;">A dedicated listing with address, website, booking details, screens, food, atmosphere, accessibility notes, and match-night information.</p>
                  </td>
                  <td width="14"></td>
                  <td style="padding:18px;border:1px solid #e1e7f0;border-radius:12px;background:#ffffff;vertical-align:top;">
                    <h3 style="margin:0 0 8px;font-size:18px;color:#06142f;">Where-to-watch placement</h3>
                    <p style="margin:0;font-size:14px;line-height:1.65;color:#536079;">Promotion inside CupMate city and match planning content for fans actively looking for a place to watch football.</p>
                  </td>
                </tr>
                <tr><td height="14" colspan="3"></td></tr>
                <tr>
                  <td style="padding:18px;border:1px solid #e1e7f0;border-radius:12px;background:#ffffff;vertical-align:top;">
                    <h3 style="margin:0 0 8px;font-size:18px;color:#06142f;">Fan-zone activation</h3>
                    <p style="margin:0;font-size:14px;line-height:1.65;color:#536079;">A match-night concept around specific teams, kickoff times, reservations, themed menus, giveaways, and supporter meetups.</p>
                  </td>
                  <td width="14"></td>
                  <td style="padding:18px;border:1px solid #e1e7f0;border-radius:12px;background:#ffffff;vertical-align:top;">
                    <h3 style="margin:0 0 8px;font-size:18px;color:#06142f;">Commercial visibility</h3>
                    <p style="margin:0;font-size:14px;line-height:1.65;color:#536079;">A clear path for fans to call, reserve, visit your website, or plan a match night at your venue.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 36px 28px;">
              <h2 style="margin:0 0 12px;font-size:24px;color:#06142f;">Next step</h2>
              <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#26334d;">If this sounds relevant, reply to this email and I will send a short media kit, sample bar profile, and partnership options for World Cup 2026 placements.</p>
              <a href="${v.siteUrl}" style="display:inline-block;background:#5b35f5;color:#ffffff;text-decoration:none;font-weight:800;padding:14px 20px;border-radius:9px;">Visit CupMate</a>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 36px;background:#06142f;color:#d8e2f2;">
              <p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong style="color:#ffffff;">CupMate</strong><br>Independent World Cup 2026 fan-planning portal<br><a href="${v.siteUrl}" style="color:#8ee8c8;text-decoration:none;">cupmate.us</a></p>
              <p style="margin:14px 0 0;font-size:12px;line-height:1.55;color:#9fb0ca;">CupMate is not affiliated with FIFA, host cities, teams, venues, broadcasters, or ticket marketplaces. Sponsored placements and commercial partnerships should be clearly disclosed where applicable.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const text = `Subject: ${subject}

Hi ${values.contactName},

World Cup 2026 will create a rare opportunity for bars in ${values.city}: supporters will be looking for more than a screen. They will be searching for atmosphere, community, reservations, specials, and a place where they can cheer for their national team with other fans.

CupMate is an independent fan-planning portal for World Cup 2026. We can feature ${values.barName} as a recommended World Cup watch spot and help position it as a local fan-zone destination for selected matches, teams, and city guides.

What can be included:
- Venue profile
- Where-to-watch guide placement
- Fan-zone activation
- Booking and website visibility
- Match-night details, screens, food, accessibility, and atmosphere notes

If this sounds relevant, reply to this email and I will send a short media kit, sample bar profile, and partnership options.

CupMate
${values.siteUrl}`;

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(htmlPath, html);
await fs.writeFile(textPath, text);

console.log(JSON.stringify({ htmlPath, textPath, subject, values }, null, 2));
