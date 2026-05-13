#!/usr/bin/env python3
"""Upsert Russian translations for existing CupMate Supabase content.

Requires SUPABASE_SERVICE_ROLE_KEY in the environment. Does not print secrets.
"""
from __future__ import annotations

import json
import os
import re
import sys
import urllib.parse
import urllib.request
import urllib.error
from typing import Any

BASE_URL = "https://ireifidclgtljirtnkmg.supabase.co/rest/v1"
SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SERVICE_KEY:
    raise SystemExit("SUPABASE_SERVICE_ROLE_KEY is required")

HEADERS = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
    "Accept": "application/json",
}

WRITE_HEADERS = {
    **HEADERS,
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates,return=representation",
}

TEAM_RU = {
    "Mexico": ("Мексика", "МЕК"), "South Africa": ("Южная Африка", "ЮАР"), "South Korea": ("Южная Корея", "КОР"),
    "Czechia": ("Чехия", "ЧЕХ"), "Canada": ("Канада", "КАН"), "Bosnia and Herzegovina": ("Босния и Герцеговина", "БИГ"),
    "Qatar": ("Катар", "КАТ"), "Switzerland": ("Швейцария", "ШВЕ"), "Brazil": ("Бразилия", "БРА"),
    "Morocco": ("Марокко", "МАР"), "Haiti": ("Гаити", "ГАИ"), "Scotland": ("Шотландия", "ШОТ"),
    "United States": ("США", "США"), "Paraguay": ("Парагвай", "ПАР"), "Australia": ("Австралия", "АВС"),
    "Türkiye": ("Турция", "ТУР"), "Germany": ("Германия", "ГЕР"), "Curacao": ("Кюрасао", "КЮР"),
    "Ivory Coast": ("Кот-д’Ивуар", "КИВ"), "Ecuador": ("Эквадор", "ЭКВ"), "Netherlands": ("Нидерланды", "НИД"),
    "Japan": ("Япония", "ЯПО"), "Sweden": ("Швеция", "ШВЕ"), "Tunisia": ("Тунис", "ТУН"),
    "Belgium": ("Бельгия", "БЕЛ"), "Egypt": ("Египет", "ЕГИ"), "Iran": ("Иран", "ИРА"),
    "New Zealand": ("Новая Зеландия", "НЗЛ"), "Spain": ("Испания", "ИСП"), "Cape Verde": ("Кабо-Верде", "КВР"),
    "Saudi Arabia": ("Саудовская Аравия", "САУ"), "Uruguay": ("Уругвай", "УРУ"), "France": ("Франция", "ФРА"),
    "Senegal": ("Сенегал", "СЕН"), "Iraq": ("Ирак", "ИРА"), "Norway": ("Норвегия", "НОР"),
    "Argentina": ("Аргентина", "АРГ"), "Algeria": ("Алжир", "АЛЖ"), "Austria": ("Австрия", "АВС"),
    "Jordan": ("Иордания", "ИОР"), "Portugal": ("Португалия", "ПОР"), "Congo DR": ("ДР Конго", "ДРК"),
    "Uzbekistan": ("Узбекистан", "УЗБ"), "Colombia": ("Колумбия", "КОЛ"), "England": ("Англия", "АНГ"),
    "Croatia": ("Хорватия", "ХОР"), "Ghana": ("Гана", "ГАН"), "Panama": ("Панама", "ПАН"),
}

CITY_RU = {
    "Vancouver": ("Ванкувер", "Британская Колумбия"), "Toronto": ("Торонто", "Онтарио"),
    "Mexico City": ("Мехико", None), "Monterrey": ("Монтеррей", None), "Guadalajara": ("Гвадалахара", None),
    "New York New Jersey": ("Нью-Йорк / Нью-Джерси", None), "Dallas": ("Даллас", "Техас"),
    "Kansas City": ("Канзас-Сити", "Миссури"), "Houston": ("Хьюстон", "Техас"), "Atlanta": ("Атланта", "Джорджия"),
    "Los Angeles": ("Лос-Анджелес", "Калифорния"), "Philadelphia": ("Филадельфия", "Пенсильвания"),
    "Seattle": ("Сиэтл", "Вашингтон"), "San Francisco Bay Area": ("Залив Сан-Франциско", "Калифорния"),
    "Boston": ("Бостон", "Массачусетс"), "Miami": ("Майами", "Флорида"),
}

STADIUM_RU = {
    "BC Place": "BC Place", "BMO Field": "BMO Field", "Estadio Azteca": "Эстадио Ацтека", "Estadio BBVA": "Эстадио BBVA",
    "Estadio Akron": "Эстадио Акрон", "MetLife Stadium": "MetLife Stadium", "AT&T Stadium": "AT&T Stadium",
    "Arrowhead Stadium": "Arrowhead Stadium", "NRG Stadium": "NRG Stadium", "Mercedes-Benz Stadium": "Mercedes-Benz Stadium",
    "SoFi Stadium": "SoFi Stadium", "Lincoln Financial Field": "Lincoln Financial Field", "Lumen Field": "Lumen Field",
    "Levi's Stadium": "Levi’s Stadium", "Gillette Stadium": "Gillette Stadium", "Hard Rock Stadium": "Hard Rock Stadium",
}

TAG_RU = {
    "Live Screen": "Большой экран", "Food": "Еда", "Music": "Музыка", "Beach": "Пляж", "Games": "Игры", "Family": "Семейный формат",
    "Craft beer": "Крафтовое пиво", "Outdoor screen": "Экран на улице", "Reservations": "Бронирование", "Latin atmosphere": "Латиноамериканская атмосфера",
    "Live DJ": "Живой DJ", "Local beer": "Местное пиво", "Food trucks": "Фудтраки", "Premium": "Премиум", "Transit friendly": "Удобно на транспорте",
    "Official": "Официально", "Fan zone": "Фан-зона", "Sports bar": "Спорт-бар",
}

PLACE_TYPE_RU = {"sports_bar": "Спорт-бар", "restaurant": "Ресторан", "fan_zone": "Фан-зона"}

ARTICLE_RU: dict[str, dict[str, str]] = {
    "world-cup-2026-referees-appointed": {
        "title": "FIFA назначила судей на Чемпионат мира 2026",
        "excerpt": "Судейский список для турнира 2026 года уже формируется, что задаёт стандарты для матчей и VAR.",
        "body": "FIFA продолжает подготовку к Чемпионату мира 2026, формируя пул арбитров для расширенного турнира. Для болельщиков это важный операционный сигнал: судейство, VAR и дисциплинарные процедуры будут влиять на темп матчей, фанатские обсуждения и контекст игровых дней внутри CupMate."
    },
    "record-fifa-payouts-world-cup-2026": {
        "title": "Клубы получат рекордные выплаты за участие игроков в ЧМ-2026",
        "excerpt": "Расширенный турнир увеличивает компенсации клубам и подчёркивает масштаб события 2026 года.",
        "body": "FIFA готовит рекордные выплаты клубам за участие футболистов в Чемпионате мира 2026. Рост компенсаций показывает, насколько расширенный формат меняет экономику турнира — от клубного планирования до интереса болельщиков к составам и восстановлению игроков."
    },
    "iran-seeks-world-cup-visa-guarantees": {
        "title": "Иран добивается визовых гарантий для Чемпионата мира 2026",
        "excerpt": "Визовые вопросы становятся важной частью планирования поездок на турнир в Северной Америке.",
        "body": "Иран добивается дополнительных визовых гарантий для участия в Чемпионате мира 2026. Для болельщиков такие новости важны не меньше расписания матчей: правила въезда, сроки оформления документов и трансграничные поездки могут напрямую влиять на маршруты и планы путешествий."
    },
    "lays-world-cup-inspired-flavors-canada": {
        "title": "Lay’s запускает вкусы, вдохновлённые ЧМ, в Канаде",
        "excerpt": "Маркетинговая активность вокруг турнира ускоряется на канадском рынке.",
        "body": "Брендовые активации вокруг Чемпионата мира набирают обороты в Канаде: Lay’s запускает лимитированные вкусы, вдохновлённые турниром. Такие сигналы показывают, какие города и рынки уже разогревают фанатскую инфраструктуру до стартового свистка."
    },
    "metlife-world-cup-train-fare-drops": {
        "title": "Стоимость поездок к MetLife Stadium на время ЧМ может снизиться",
        "excerpt": "Транспортные решения вокруг финального стадиона становятся ключевым фактором для болельщиков.",
        "body": "Для матчей в Нью-Йорке и Нью-Джерси транспорт остаётся одним из главных вопросов. Потенциальное снижение стоимости поездок к MetLife Stadium может упростить планирование игрового дня, особенно для болельщиков, которые будут добираться через пересадочные узлы и общественный транспорт."
    },
    "nora-fatehi-world-cup-opening-ceremony-toronto": {
        "title": "Нору Фатехи связывают с церемонией открытия ЧМ в Торонто",
        "excerpt": "Культурная программа вокруг открытия турнира в Торонто продолжает расширяться.",
        "body": "Культурная повестка Чемпионата мира усиливается: СМИ связывают Нору Фатехи с активностями вокруг церемонии открытия в Торонто. Для CupMate такие новости помогают дополнять городские гиды, фан-фестивали и рекомендации перед матчами."
    },
    "fanatics-fest-nyc-fifa-final-weekend": {
        "title": "Fanatics Fest в Нью-Йорке усилит финальный уикенд ЧМ",
        "excerpt": "Фанатские события вокруг Нью-Йорка и Нью-Джерси добавят активности к финалу турнира.",
        "body": "Финальный уикенд Чемпионата мира в районе Нью-Йорка и Нью-Джерси будет сопровождаться крупными фанатскими событиями. Fanatics Fest может стать частью более широкой экосистемы развлечений, торговли и встреч болельщиков вокруг главного матча турнира."
    },
    "fifa-disciplinary-rules-world-cup-2026": {
        "title": "FIFA уточняет дисциплинарные правила для ЧМ-2026",
        "excerpt": "Регламент турнира задаёт рамки для команд, игроков и болельщиков перед расширенным форматом.",
        "body": "Дисциплинарные правила FIFA для Чемпионата мира 2026 становятся важной частью подготовки команд и болельщиков. В расширенном формате любые санкции, карточки и процедурные решения могут быстрее влиять на турнирную таблицу и составы."
    },
    "los-angeles-world-cup-surface-final-prep": {
        "title": "Лос-Анджелес завершает подготовку покрытия к матчам ЧМ",
        "excerpt": "Качество поля на SoFi Stadium остаётся в центре внимания перед турниром 2026 года.",
        "body": "Лос-Анджелес продолжает финальные работы по подготовке игрового покрытия для Чемпионата мира. Для болельщиков и команд состояние поля — это не техническая деталь, а фактор качества матча, безопасности игроков и общего впечатления от стадиона."
    },
    "plan-los-angeles-world-cup-experience": {
        "title": "Как спланировать поездку на матчи ЧМ в Лос-Анджелесе",
        "excerpt": "Маршруты, транспорт и фан-зоны Лос-Анджелеса требуют раннего планирования.",
        "body": "Лос-Анджелес станет одним из самых насыщенных направлений Чемпионата мира 2026. Болельщикам стоит заранее продумать дорогу к стадиону, варианты проживания, фан-зоны и время выезда — CupMate помогает собрать эти детали в один понятный план."
    },
    "shakira-burna-boy-world-cup-song-teaser": {
        "title": "Шакира и Burna Boy подогревают ожидание музыкальной темы ЧМ",
        "excerpt": "Музыкальная программа турнира становится частью глобальной фанатской повестки.",
        "body": "Музыка снова становится важной частью ожидания Чемпионата мира. Сообщения о Шакире и Burna Boy усиливают культурный контекст турнира и помогают болельщикам следить не только за матчами, но и за глобальными событиями вокруг ЧМ."
    },
    "us-hotels-world-cup-demand-check": {
        "title": "Отели США готовятся к росту спроса во время ЧМ-2026",
        "excerpt": "Гостиничный рынок в городах-организаторах уже реагирует на будущий поток болельщиков.",
        "body": "Спрос на отели в городах США, принимающих Чемпионат мира 2026, уже становится важным индикатором подготовки. Для болельщиков раннее бронирование, близость к транспорту и гибкость маршрута могут заметно повлиять на бюджет поездки."
    },
    "visa-hdfc-world-cup-fan-access-promotion": {
        "title": "Visa и HDFC Bank запускают промо-доступ для болельщиков ЧМ",
        "excerpt": "Новая акция для индийских болельщиков добавляет ещё один путь к путешествию на турнир.",
        "body": "Visa и HDFC Bank представили промо-акцию, связанную с Чемпионатом мира, для болельщиков из Индии. Это показывает, как путешествия, платежи и фанатский опыт объединяются перед 2026 годом, а CupMate помогает учитывать такие возможности при планировании поездок."
    },
    "world-cup-2026-squad-size-26": {
        "title": "Составы команд на ЧМ-2026 останутся по 26 игроков",
        "excerpt": "Расширенные заявки дают тренерам больше гибкости в длинном турнире.",
        "body": "Составы на Чемпионате мира 2026, как ожидается, сохранят формат 26 игроков. Для болельщиков это означает больше вариантов ротации, больше историй вокруг выбора состава и дополнительные поводы следить за новостями команд до начала турнира."
    },
    "kansas-city-fan-festival-lineup": {
        "title": "Канзас-Сити представил насыщенную программу Fan Festival",
        "excerpt": "Город готовит активную фанатскую программу с музыкой, экранами и событиями вокруг матчей.",
        "body": "Канзас-Сити усиливает подготовку к Чемпионату мира 2026, представляя энергичную программу Fan Festival. Для болельщиков это означает больше вариантов провести игровой день: трансляции, городские события, музыка и удобные точки сбора до и после матчей."
    },
    "last-minute-world-cup-ticket-phase": {
        "title": "FIFA запустила финальную фазу продажи билетов",
        "excerpt": "Болельщикам стоит регулярно проверять официальную билетную платформу: часть мест может возвращаться в продажу.",
        "body": "FIFA открыла позднюю фазу продажи билетов на Чемпионат мира 2026. Инвентарь может появляться волнами, поэтому болельщикам важно следить за официальной платформой, проверять уведомления и заранее готовить маршруты на случай удачной покупки."
    },
    "miami-fan-festival-bayfront-park": {
        "title": "Фан-фестиваль Майами пройдёт в Bayfront Park",
        "excerpt": "Bayfront Park станет одной из главных точек притяжения болельщиков в Майами во время турнира.",
        "body": "Майами готовит Fan Festival в Bayfront Park — центральной городской локации для болельщиков Чемпионата мира 2026. CupMate сможет показывать такие события рядом с маршрутом, местами просмотра и рекомендациями по времени прибытия."
    },
    "iraq-completes-48-team-world-cup-lineup": {
        "title": "Ирак завершил список из 48 участников Чемпионата мира",
        "excerpt": "Квалификация Ирака закрыла расширенный состав участников ЧМ-2026.",
        "body": "Расширенный состав участников Чемпионата мира 2026 окончательно сформирован после того, как Ирак получил последнюю путёвку. Для болельщиков подтверждённый список команд делает планирование поездок, отслеживание сборных и уведомления по групповому этапу намного полезнее в CupMate."
    },
    "fifa-youtube-preferred-platform-world-cup-2026": {
        "title": "FIFA выбрала YouTube предпочтительной платформой для контента ЧМ-2026",
        "excerpt": "Партнёрство со стриминговой платформой может повлиять на доступность клипов и хайлайтов.",
        "body": "Стратегия FIFA в цифровом видео становится частью истории Чемпионата мира. Предпочтительное партнёрство с YouTube может сделать официальные клипы, хайлайты и фанатский видеоконтент заметно доступнее до и во время турнира."
    },
    "houston-premium-world-cup-fan-experience": {
        "title": "Хьюстон добавляет премиальный фанатский опыт к ЧМ",
        "excerpt": "Подготовка Хьюстона включает новые предложения гостеприимства и развлечений для болельщиков.",
        "body": "Хьюстон расширяет премиальные фанатские предложения вокруг Чемпионата мира 2026. Это ещё один сигнал, что города-организаторы готовят многослойный опыт для гостей — не только билеты на матч, но и маршруты, зоны отдыха и городские события."
    },
}

CATEGORY_RU = {
    "Teams": "Команды", "Culture": "Культура", "Streaming": "Стриминг", "Travel": "Путешествия", "Commerce": "Коммерция",
    "Fan Experience": "Фанатский опыт", "Transport": "Транспорт", "Regulation": "Регламент", "Infrastructure": "Инфраструктура",
    "Music": "Музыка", "Hospitality": "Гостеприимство", "Tickets": "Билеты", "Analysis": "Аналитика", "News": "Новости",
}

TRANSLIT_SLUG = {
    "а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"e","ж":"zh","з":"z","и":"i","й":"y","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"ts","ч":"ch","ш":"sh","щ":"sch","ы":"y","э":"e","ю":"yu","я":"ya","ь":"","ъ":""
}

def slugify_ru(text: str, fallback: str) -> str:
    s = ''.join(TRANSLIT_SLUG.get(ch, ch) for ch in text.lower())
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s or f"{fallback}-ru"

def request_json(method: str, path: str, payload: Any | None = None) -> Any:
    data = None if payload is None else json.dumps(payload, ensure_ascii=False).encode("utf-8")
    headers = HEADERS if payload is None else WRITE_HEADERS
    req = urllib.request.Request(f"{BASE_URL}{path}", data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            text = response.read().decode("utf-8")
            return json.loads(text) if text else None
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"{method} {path} failed: HTTP {exc.code}: {body[:1000]}") from exc

def get_all(table: str, query: str) -> list[dict[str, Any]]:
    return request_json("GET", f"/{table}?{query}")

def upsert(table: str, rows: list[dict[str, Any]], conflict: str) -> int:
    if not rows:
        return 0
    total = 0
    for i in range(0, len(rows), 100):
        chunk = rows[i:i+100]
        path = f"/{table}?on_conflict={urllib.parse.quote(conflict)}"
        result = request_json("POST", path, chunk)
        total += len(result or chunk)
    return total

def en_rows(table: str, select: str) -> list[dict[str, Any]]:
    return get_all(table, f"select={urllib.parse.quote(select, safe='*,()')}&language_code=eq.en&limit=1000")

def build_team_rows():
    rows = []
    for row in en_rows("team_translations", "team_id,language_code,name,short_name"):
        name, short = TEAM_RU.get(row["name"], (row["name"], row.get("short_name")))
        rows.append({**row, "language_code": "ru", "name": name, "short_name": short})
    return rows

def build_city_rows():
    rows = []
    for row in en_rows("host_city_translations", "city_id,language_code,name,state_region,slug,summary,seo_title,seo_description"):
        name, state = CITY_RU.get(row["name"], (row["name"], row.get("state_region")))
        summary = f"{name} — город-организатор Чемпионата мира 2026 с маршрутами, фан-зонами и подсказками для болельщиков."
        rows.append({
            **row, "language_code": "ru", "name": name, "state_region": state, "slug": slugify_ru(name, row.get("slug") or name),
            "summary": summary, "seo_title": f"{name}: гид CupMate к Чемпионату мира 2026", "seo_description": summary,
        })
    return rows

def build_stadium_rows():
    rows = []
    for row in en_rows("stadium_translations", "stadium_id,language_code,name,slug,description,address,gate_info,parking_info,prohibited_items,seo_title,seo_description"):
        name = STADIUM_RU.get(row["name"], row["name"])
        description = f"{name} примет матчи Чемпионата мира 2026. CupMate помогает с маршрутом, временем прибытия и полезной информацией для болельщиков."
        rows.append({
            **row, "language_code": "ru", "name": name, "slug": slugify_ru(name, row.get("slug") or name),
            "description": description,
            "gate_info": row.get("gate_info") or "Ворота открываются заранее — проверьте билет и маршрут перед выездом.",
            "parking_info": row.get("parking_info") or "Парковку лучше бронировать заранее; в дни матчей ожидается высокий спрос.",
            "prohibited_items": row.get("prohibited_items") or "Проверьте список запрещённых предметов перед посещением стадиона.",
            "seo_title": f"{name}: стадион Чемпионата мира 2026", "seo_description": description,
        })
    return rows

def build_tag_rows():
    rows = []
    for row in en_rows("tag_translations", "tag_id,language_code,label"):
        rows.append({**row, "language_code": "ru", "label": TAG_RU.get(row["label"], row["label"])})
    return rows

def place_type_from_text(text: str | None) -> str:
    if not text: return "место"
    low = text.lower()
    if "bar" in low: return "спорт-бар"
    if "restaurant" in low or "cafe" in low: return "ресторан"
    if "zone" in low or "festival" in low: return "фан-зона"
    return "место"

def build_place_rows():
    rows = []
    for row in en_rows("place_translations", "place_id,language_code,name,slug,description,address,atmosphere,opening_hours_note,seo_title,seo_description"):
        name = row["name"]
        kind = place_type_from_text(row.get("atmosphere"))
        rows.append({
            **row, "language_code": "ru", "name": name, "slug": slugify_ru(name, row.get("slug") or name),
            "description": f"{name} — удобное место для болельщиков Чемпионата мира 2026.",
            "atmosphere": f"{name} — удобное место для болельщиков: трансляции, еда и атмосфера игрового дня.",
            "opening_hours_note": "Проверьте часы работы и бронирование перед матчем.",
            "seo_title": f"{name}: где смотреть матчи ЧМ-2026", "seo_description": f"Информация о {name} для болельщиков Чемпионата мира 2026.",
        })
    return rows

def translate_title_fallback(title: str) -> str:
    replacements = {
        "World Cup": "Чемпионат мира", "match": "матч", "update": "обновление", "tickets": "билеты", "travel": "поездка",
    }
    out = title
    for a,b in replacements.items(): out = out.replace(a,b)
    return out

def build_article_rows():
    rows = []
    for row in en_rows("article_translations", "article_id,language_code,slug,title,excerpt,body,seo_title,seo_description"):
        tr = ARTICLE_RU.get(row.get("slug"), {})
        title = tr.get("title") or translate_title_fallback(row["title"])
        excerpt = tr.get("excerpt") or row.get("excerpt") or title
        body = tr.get("body") or row.get("body") or excerpt
        rows.append({
            **row, "language_code": "ru", "slug": slugify_ru(title, row.get("slug") or row["article_id"]),
            "title": title, "excerpt": excerpt, "body": body, "seo_title": title, "seo_description": excerpt,
        })
    return rows

def build_match_rows():
    # Need home/away ids to build robust Russian titles.
    matches = get_all("matches", "select=id,home_team_id,away_team_id,match_translations(language_code,title)&limit=200")
    teams_ru = {row["team_id"]: row for row in build_team_rows()}
    rows = []
    for match in matches:
        home = teams_ru.get(match.get("home_team_id"), {}).get("name", "Команда 1")
        away = teams_ru.get(match.get("away_team_id"), {}).get("name", "Команда 2")
        title = f"{home} против {away}"
        rows.append({"match_id": match["id"], "language_code": "ru", "title": title, "preview": f"Матч Чемпионата мира 2026: {title}.", "broadcast_note": "Проверьте доступные трансляции ближе к дате матча."})
    return rows

def main() -> None:
    builders = [
        ("team_translations", build_team_rows, "team_id,language_code"),
        ("host_city_translations", build_city_rows, "city_id,language_code"),
        ("stadium_translations", build_stadium_rows, "stadium_id,language_code"),
        ("tag_translations", build_tag_rows, "tag_id,language_code"),
        ("place_translations", build_place_rows, "place_id,language_code"),
        ("article_translations", build_article_rows, "article_id,language_code"),
        ("match_translations", build_match_rows, "match_id,language_code"),
    ]
    for table, builder, conflict in builders:
        rows = builder()
        count = upsert(table, rows, conflict)
        print(f"{table}: upserted {count} ru rows")

    for table in [name for name, _, _ in builders]:
        counts = get_all(table, "select=language_code&language_code=eq.ru&limit=1000")
        print(f"VERIFY {table}: ru={len(counts)}")

if __name__ == "__main__":
    main()
