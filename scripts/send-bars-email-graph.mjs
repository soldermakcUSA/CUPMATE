import fs from "node:fs/promises";
import path from "node:path";

const tenantId = process.env.MICROSOFT_TENANT_ID || process.env.GRAPH_TENANT_ID;
const clientId = process.env.MICROSOFT_CLIENT_ID || process.env.GRAPH_CLIENT_ID;
const to = process.env.GRAPH_TO || "soldermakcsvainova@gmail.com";
const fromName = process.env.GRAPH_FROM_NAME || "CupMate Partnerships";
const fromAddress = process.env.GRAPH_FROM_ADDRESS || "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cupmate.us";
const saveToSentItems = process.env.GRAPH_SAVE_TO_SENT_ITEMS !== "false";

const root = process.cwd();
const heroPath = path.resolve(root, process.env.GRAPH_HERO_IMAGE || "public/assets/cupmate-bars-outreach-banner.png");
const trophyPath = path.resolve(root, process.env.GRAPH_TROPHY_IMAGE || "public/assets/world-cup-gold.png");

if (!tenantId || !clientId) {
  console.error(
    [
      "Missing Microsoft Graph OAuth configuration.",
      "",
      "Set these environment variables first:",
      "  MICROSOFT_TENANT_ID=<your Entra tenant id>",
      "  MICROSOFT_CLIENT_ID=<public client app registration id>",
      "",
      "Optional:",
      "  GRAPH_TO=soldermakcsvainova@gmail.com",
      "  GRAPH_HERO_IMAGE=public/assets/cupmate-bars-outreach-banner.png",
      "  GRAPH_TROPHY_IMAGE=public/assets/world-cup-gold.png",
    ].join("\n")
  );
  process.exit(1);
}

const subject = "CupMate Bar Partnership Proposal | World Cup 2026 Watch Parties";
const preheader = "Get your bar listed where World Cup 2026 fans plan match days.";

const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#07122f;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6fb;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #dce3ef;box-shadow:0 18px 48px rgba(7,18,47,0.12);">
        <tr><td style="background:#06142f;padding:0;"><img src="cid:hero" alt="CupMate for Bars World Cup 2026 Watch Parties" width="720" style="display:block;width:100%;max-width:720px;height:auto;border:0;"></td></tr>
        <tr><td style="padding:34px 36px 18px;background:linear-gradient(180deg,#ffffff 0%,#f8fbff 100%);">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
            <td style="vertical-align:middle;">
              <div style="font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#1b57f0;">CupMate Partner Opportunity</div>
              <h1 style="margin:10px 0 12px;font-size:34px;line-height:1.05;color:#06142f;letter-spacing:0;">Bring World Cup fans to your bar.</h1>
              <p style="margin:0;font-size:17px;line-height:1.65;color:#39465f;">CupMate helps supporters discover where to watch matches, meet other fans, and turn ordinary match nights into unforgettable World Cup 2026 gatherings.</p>
            </td>
            <td width="110" align="right" style="vertical-align:top;padding-left:18px;"><img src="cid:trophy" alt="Gold football trophy" width="86" style="display:block;width:86px;height:auto;border:0;"></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:8px 36px 22px;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#26334d;">Hello,</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#26334d;">World Cup 2026 will create a rare opportunity for bars: supporters will be looking for more than a screen. They will be searching for atmosphere, community, team colors, reservations, special offers, and places where they can cheer for their national team with other fans.</p>
          <p style="margin:0;font-size:16px;line-height:1.7;color:#26334d;">CupMate is an independent fan-planning portal for World Cup 2026. We are building practical guides for matches, host cities, stadium visits, fan zones, travel routes, tickets, and places to watch football.</p>
        </td></tr>
        <tr><td style="padding:0 36px 26px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#06142f;border-radius:14px;overflow:hidden;"><tr><td style="padding:24px 26px;">
          <div style="font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#8ee8c8;">The offer</div>
          <h2 style="margin:8px 0 10px;font-size:24px;line-height:1.18;color:#ffffff;">Become a CupMate fan-zone partner.</h2>
          <p style="margin:0;font-size:15px;line-height:1.7;color:#d8e2f2;">We can feature your bar as a recommended World Cup watch spot and help position it as a local fan-zone destination for selected matches, teams, and city guides.</p>
        </td></tr></table></td></tr>
        <tr><td style="padding:0 36px 8px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding:18px;border:1px solid #e1e7f0;border-radius:12px;background:#ffffff;vertical-align:top;"><h3 style="margin:0 0 8px;font-size:18px;color:#06142f;">Your bar profile</h3><p style="margin:0;font-size:14px;line-height:1.65;color:#536079;">A dedicated listing with address, website, booking details, screens, food, atmosphere, accessibility notes, and match-night information.</p></td>
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
        <tr><td style="padding:22px 36px 8px;"><h2 style="margin:0 0 12px;font-size:24px;color:#06142f;">Why this matters</h2><ul style="margin:0;padding:0 0 0 20px;color:#26334d;font-size:15px;line-height:1.75;"><li>World Cup fans plan ahead, especially for big national-team matches.</li><li>Bars with clear match-night details are easier to discover and book.</li><li>A good fan-zone experience can turn one game into repeat visits throughout the tournament.</li><li>CupMate reaches people who are already planning matches, cities, travel, and viewing options.</li></ul></td></tr>
        <tr><td style="padding:22px 36px 28px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f8fc;border:1px solid #e2e8f2;border-radius:14px;"><tr><td style="padding:22px 24px;"><h2 style="margin:0 0 10px;font-size:22px;color:#06142f;">Suggested partnership formats</h2><p style="margin:0 0 12px;font-size:15px;line-height:1.65;color:#536079;"><strong>Featured Listing:</strong> your bar profile on CupMate with match-night details and booking links.</p><p style="margin:0 0 12px;font-size:15px;line-height:1.65;color:#536079;"><strong>City Watch Guide:</strong> inclusion in a city-level “where to watch” guide for World Cup 2026.</p><p style="margin:0;font-size:15px;line-height:1.65;color:#536079;"><strong>Fan-Zone Package:</strong> a promoted concept around selected teams, fixtures, themed offers, and supporter nights.</p></td></tr></table></td></tr>
        <tr><td style="padding:0 36px 34px;"><h2 style="margin:0 0 10px;font-size:24px;color:#06142f;">Next step</h2><p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#26334d;">If this sounds relevant, reply to this email and we will send a short media kit, sample bar profile, and pricing options for World Cup 2026 placements.</p><a href="${siteUrl}" style="display:inline-block;background:#5b35f5;color:#ffffff;text-decoration:none;font-weight:800;padding:14px 20px;border-radius:9px;box-shadow:0 12px 24px rgba(91,53,245,.26);">Visit CupMate</a></td></tr>
        <tr><td style="padding:24px 36px;background:#06142f;color:#d8e2f2;"><p style="margin:0 0 8px;font-size:14px;line-height:1.6;"><strong style="color:#ffffff;">CupMate</strong><br>Independent World Cup 2026 fan-planning portal<br><a href="${siteUrl}" style="color:#8ee8c8;text-decoration:none;">cupmate.us</a></p><p style="margin:14px 0 0;font-size:12px;line-height:1.55;color:#9fb0ca;">CupMate is not affiliated with FIFA, host cities, teams, venues, broadcasters, or ticket marketplaces. Sponsored placements and commercial partnerships should be clearly disclosed where applicable.</p></td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

const text = `CupMate Bar Partnership Proposal | World Cup 2026 Watch Parties

Hello,

World Cup 2026 will create a rare opportunity for bars: supporters will be looking for more than a screen. They will be searching for atmosphere, community, team colors, reservations, special offers, and places where they can cheer for their national team with other fans.

CupMate is an independent fan-planning portal for World Cup 2026. We help supporters plan matches, host cities, stadium visits, fan zones, travel routes, tickets, and places to watch football.

The offer: become a CupMate fan-zone partner. We can feature your bar as a recommended World Cup watch spot and help position it as a local fan-zone destination for selected matches, teams, and city guides.

What can be included:
- Dedicated bar profile
- Where-to-watch guide placement
- Fan-zone activation around selected fixtures or teams
- Booking, website, and call-to-action visibility
- Match-night details, screens, food, accessibility, and atmosphere notes

If this sounds relevant, reply to this email and we will send a short media kit, sample bar profile, and pricing options for World Cup 2026 placements.

CupMate
${siteUrl}

CupMate is not affiliated with FIFA, host cities, teams, venues, broadcasters, or ticket marketplaces.`;

function formBody(values) {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    body.set(key, value);
  }
  return body;
}

async function postForm(url, values) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody(values),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function getAccessToken() {
  const scope = "https://graph.microsoft.com/Mail.Send https://graph.microsoft.com/User.Read offline_access openid profile";
  const base = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0`;
  const device = await postForm(`${base}/devicecode`, { client_id: clientId, scope });

  console.log("\nMicrosoft Graph sign-in required");
  console.log(`Open: ${device.verification_uri}`);
  console.log(`Code: ${device.user_code}`);
  console.log(device.message || "");
  console.log("");

  let intervalMs = Number(device.interval || 5) * 1000;
  const startedAt = Date.now();
  const expiresInMs = Number(device.expires_in || 900) * 1000;

  while (Date.now() - startedAt < expiresInMs) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    const response = await fetch(`${base}/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody({
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        client_id: clientId,
        device_code: device.device_code,
      }),
    });
    const data = await response.json().catch(() => ({}));

    if (response.ok && data.access_token) {
      return data.access_token;
    }
    if (data.error === "authorization_pending") {
      continue;
    }
    if (data.error === "slow_down") {
      intervalMs += 5000;
      continue;
    }
    if (data.error_codes?.includes(7000218)) {
      throw new Error(
        [
          "Token request failed because this app registration is not enabled as a public client.",
          "In Microsoft Entra, open the app registration, go to Authentication,",
          "and enable 'Allow public client flows'. Then run this command again.",
          `Raw response: ${JSON.stringify(data)}`,
        ].join(" ")
      );
    }
    throw new Error(`Token request failed: ${JSON.stringify(data)}`);
  }

  throw new Error("Device code expired before sign-in completed.");
}

async function graphJson(accessToken, url, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  if (response.status === 204 || response.status === 202) {
    return { status: response.status };
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function inlineImageAttachment(filePath, name, contentId) {
  const contentBytes = await fs.readFile(filePath, "base64");
  return {
    "@odata.type": "#microsoft.graph.fileAttachment",
    name,
    contentType: "image/png",
    contentBytes,
    isInline: true,
    contentId,
  };
}

const accessToken = await getAccessToken();
const me = await graphJson(accessToken, "https://graph.microsoft.com/v1.0/me?$select=displayName,mail,userPrincipalName");
const sender = me.mail || me.userPrincipalName;
const messageFrom = fromAddress || sender;

const payload = {
  message: {
    subject,
    body: {
      contentType: "HTML",
      content: html,
    },
    toRecipients: [
      {
        emailAddress: {
          address: to,
        },
      },
    ],
    from: {
      emailAddress: {
        name: fromName,
        address: messageFrom,
      },
    },
    sender: {
      emailAddress: {
        name: me.displayName || fromName,
        address: sender,
      },
    },
    attachments: [
      await inlineImageAttachment(heroPath, "cupmate-bars-outreach-banner.png", "hero"),
      await inlineImageAttachment(trophyPath, "world-cup-gold.png", "trophy"),
    ],
  },
  saveToSentItems,
};

await graphJson(accessToken, "https://graph.microsoft.com/v1.0/me/sendMail", {
  method: "POST",
  body: JSON.stringify(payload),
});

console.log(
  JSON.stringify(
    {
      ok: true,
      sentVia: "Microsoft Graph /me/sendMail",
      signedInAs: sender,
      from: messageFrom,
      to,
      subject,
      heroImage: heroPath,
      savedToSentItems: saveToSentItems,
    },
    null,
    2
  )
);
