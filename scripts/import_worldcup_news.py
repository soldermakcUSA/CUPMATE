#!/usr/bin/env python3
"""Import curated World Cup 2026 news into CupMate Supabase.

Uses the public anon key from .env.local. If RLS blocks inserts, the script
writes a SQL seed file that can be run in Supabase SQL Editor.
"""
from __future__ import annotations

import json
import os
import re
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import quote, urlparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ROOT = Path(__file__).resolve().parents[1]
ENV_PATH = ROOT / ".env.local"
IMAGE_DIR = ROOT / "tmp" / "news-images"
SEED_PATH = ROOT / "supabase" / "seed-news.sql"

NEWS_ITEMS = [
    {
        "category": "Teams",
        "title": "Iraq completes the 48-team World Cup lineup",
        "slug": "iraq-completes-48-team-world-cup-lineup",
        "excerpt": "Iraq's qualification closes the expanded 48-team field for the 2026 FIFA World Cup.",
        "body": "The expanded 2026 FIFA World Cup field is now complete after Iraq secured the final qualifying place. For fans, the confirmed lineup makes itinerary planning, team following and group-stage alerts much more useful inside CupMate.",
        "source_url": "https://www.thisdaylive.com/2026/04/02/iraq-completes-48-team-line-up-for-2026-world-cup/",
        "image_url": "https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/1-790.jpg",
        "published_at": "2026-04-02T04:15:00+00:00",
    },
    {
        "category": "Culture",
        "title": "Nora Fatehi linked to World Cup opening ceremony in Toronto",
        "slug": "nora-fatehi-world-cup-opening-ceremony-toronto",
        "excerpt": "Reports point to Nora Fatehi joining the entertainment lineup around the 2026 World Cup opening ceremony.",
        "body": "World Cup culture continues to build around Toronto, with entertainment reports linking Nora Fatehi to opening-ceremony activity. CupMate can use stories like this to enrich city guides, fan festival recommendations and pre-match planning.",
        "source_url": "https://www.bollywoodhungama.com/news/bollywood/nora-fatehi-to-perform-and-sing-at-fifa-world-cup-2026-opening-ceremony-in-toronto/",
        "image_url": "https://stat5.bollywoodhungama.in/wp-content/uploads/2026/05/Nora-Fatehi-FIFA-World-Cup-2026.jpeg",
        "published_at": "2026-05-09T08:30:00+00:00",
    },
    {
        "category": "Streaming",
        "title": "FIFA selects YouTube as preferred platform for World Cup 2026 coverage",
        "slug": "fifa-youtube-preferred-platform-world-cup-2026",
        "excerpt": "A streaming-platform partnership could shape how fans discover tournament clips and coverage.",
        "body": "FIFA's platform strategy is becoming part of the World Cup viewing story. A preferred YouTube relationship could make official clips, highlights and fan-facing video content easier to discover before and during the tournament.",
        "source_url": "https://www.techtimes.com/articles/315227/20260318/fifa-selects-youtube-its-preferred-platform-world-cup-2026will-it-affect-streaming.htm",
        "image_url": "https://d.techtimes.com/en/full/463397/youtube-fifa-world-cup-2026.jpg",
        "published_at": "2026-03-18T17:45:00+00:00",
    },
    {
        "category": "Travel",
        "title": "Visa and HDFC Bank launch World Cup fan access promotion",
        "slug": "visa-hdfc-world-cup-fan-access-promotion",
        "excerpt": "A new India-focused card promotion adds another route for fans planning World Cup travel.",
        "body": "Visa and HDFC Bank introduced a World Cup-linked promotion for Indian fans, showing how travel, payments and fan experiences are converging ahead of 2026. For CupMate users, these developments matter when planning cross-border trips and ticket-adjacent experiences.",
        "source_url": "https://www.deccanchronicle.com/business/in-other-news/visa-and-hdfc-bank-bring-indian-fans-closer-to-the-fifa-world-cup-2026-1950225",
        "image_url": "https://www.deccanchronicle.com/h-upload/2026/04/13/2030826-l-r-ravi-santhanam-ashish-parthasarthy-ahaan-pandey-michael-owen-danielle-jin-rishi-chhabra-rajanish-prabhu.jpg",
        "published_at": "2026-04-13T19:15:00+00:00",
    },
    {
        "category": "Commerce",
        "title": "Lay's introduces World Cup-inspired flavors in Canada",
        "slug": "lays-world-cup-inspired-flavors-canada",
        "excerpt": "Tournament marketing is accelerating in Canada with new FIFA World Cup themed snack flavors.",
        "body": "World Cup brand activations are expanding across Canada as Lay's introduces tournament-inspired flavors. These sponsorship and retail signals help show which host markets are ramping up fan engagement before kickoff.",
        "source_url": "https://www.businesswire.com/news/home/20260512823018/en/Lays-Introduces-Four-New-FIFA-World-Cup-2026-Inspired-Potato-Chip-Flavours-in-Canada",
        "image_url": None,
        "published_at": "2026-05-12T14:50:00+00:00",
    },
    {
        "category": "Fan Experience",
        "title": "Houston adds a premium fan experience for World Cup visitors",
        "slug": "houston-premium-world-cup-fan-experience",
        "excerpt": "Houston's tournament preparations include new hospitality and fan-experience offerings.",
        "body": "Houston is adding premium fan-experience inventory around the 2026 World Cup, another sign that host cities are building layered offerings for visitors beyond match tickets. CupMate can surface these updates alongside stadium routes and city recommendations.",
        "source_url": "https://www.khou.com/article/money/business/houston-business-journal/fifa-world-cup-houston-legends-loft-fan-festival/285-8c399bab-79f1-45ba-8515-6c351130cdb4",
        "image_url": "https://media.khou.com/assets/KHOU/images/b17b757d-53e4-4fcd-8b65-69ad8d492722/20260312T161923/b17b757d-53e4-4fcd-8b65-69ad8d492722_1080x1920.jpg",
        "published_at": "2026-03-12T21:00:00+00:00",
    },
]


def load_env() -> None:
    if ENV_PATH.exists():
        for line in ENV_PATH.read_text().splitlines():
            if not line or line.strip().startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())


def supabase_request(path: str, method: str = "GET", payload: Any | None = None, prefer: str | None = None):
    base = os.environ["NEXT_PUBLIC_SUPABASE_URL"].rstrip("/")
    key = os.environ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
    if prefer:
        headers["Prefer"] = prefer
    data = json.dumps(payload).encode() if payload is not None else None
    req = Request(f"{base}/rest/v1/{path}", data=data, headers=headers, method=method)
    with urlopen(req, timeout=30) as response:
        raw = response.read().decode()
        return json.loads(raw) if raw else None


def source_exists(source_url: str) -> bool:
    path = f"articles?source_url=eq.{quote(source_url, safe='')}&select=id&limit=1"
    rows = supabase_request(path)
    return bool(rows)


def download_image(item: dict[str, Any]) -> str | None:
    image_url = item.get("image_url")
    if not image_url:
        return None
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    ext = Path(urlparse(image_url).path).suffix.lower()
    if ext not in {".jpg", ".jpeg", ".png", ".webp"}:
        ext = ".jpg"
    target = IMAGE_DIR / f"{item['slug']}{ext}"
    if target.exists() and target.stat().st_size > 0:
        return str(target)
    try:
        req = Request(image_url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(req, timeout=30) as response:
            target.write_bytes(response.read())
        return str(target)
    except (HTTPError, URLError, TimeoutError) as exc:
        print(f"WARN image download failed for {item['slug']}: {exc}")
        return None


def sql_quote(value: str | None) -> str:
    if value is None:
        return "null"
    return "'" + value.replace("'", "''") + "'"


def write_seed(rows: list[dict[str, Any]]) -> None:
    SEED_PATH.parent.mkdir(parents=True, exist_ok=True)
    lines = ["-- Generated CupMate news seed. Run in Supabase SQL Editor if anon inserts are blocked.", ""]
    for row in rows:
        article_id = row["id"]
        item = row["item"]
        lines.append(
            "insert into public.articles (id, type, status, category, image_url, source_url, published_at) values "
            f"({sql_quote(article_id)}, 'news', 'published', {sql_quote(item['category'])}, {sql_quote(item.get('image_url'))}, {sql_quote(item['source_url'])}, {sql_quote(item['published_at'])}) "
            "on conflict (id) do nothing;"
        )
        lines.append(
            "insert into public.article_translations (article_id, language_code, slug, title, excerpt, body, seo_title, seo_description) values "
            f"({sql_quote(article_id)}, 'en', {sql_quote(item['slug'])}, {sql_quote(item['title'])}, {sql_quote(item['excerpt'])}, {sql_quote(item['body'])}, {sql_quote(item['title'])}, {sql_quote(item['excerpt'])}) "
            "on conflict (article_id, language_code) do nothing;"
        )
        lines.append("")
    SEED_PATH.write_text("\n".join(lines))


def main() -> int:
    load_env()
    if not os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or not os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY"):
        raise SystemExit("Missing Supabase env vars")

    prepared = []
    inserted = []
    skipped = []
    downloaded = []

    for item in NEWS_ITEMS:
        local_image = download_image(item)
        if local_image:
            downloaded.append(local_image)

        if source_exists(item["source_url"]):
            skipped.append(item["slug"])
            continue

        article_id = str(uuid.uuid4())
        prepared.append({"id": article_id, "item": item})
        try:
            supabase_request(
                "articles",
                method="POST",
                payload={
                    "id": article_id,
                    "type": "news",
                    "status": "published",
                    "category": item["category"],
                    "image_url": item.get("image_url"),
                    "source_url": item["source_url"],
                    "published_at": item["published_at"],
                },
                prefer="return=representation",
            )
            supabase_request(
                "article_translations",
                method="POST",
                payload={
                    "article_id": article_id,
                    "language_code": "en",
                    "slug": item["slug"],
                    "title": item["title"],
                    "excerpt": item["excerpt"],
                    "body": item["body"],
                    "seo_title": item["title"],
                    "seo_description": item["excerpt"],
                },
                prefer="return=representation",
            )
            inserted.append(item["slug"])
        except HTTPError as exc:
            body = exc.read().decode(errors="ignore")
            print(f"INSERT_BLOCKED {exc.code}: {body}")
            write_seed(prepared)
            print(json.dumps({"inserted": inserted, "skipped": skipped, "downloaded": downloaded, "seed": str(SEED_PATH)}, ensure_ascii=False, indent=2))
            return 2

    write_seed(prepared)
    print(json.dumps({"inserted": inserted, "skipped": skipped, "downloaded": downloaded, "seed": str(SEED_PATH)}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
