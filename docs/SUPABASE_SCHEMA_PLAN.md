# CupMate Supabase Schema Plan

## Цель схемы

CupMate должен хранить не только расписание матчей, а полноценный travel/fan portal:

- матчи, команды, города и стадионы;
- фан-зоны, бары, рестораны, парковки и точки просмотра;
- маршруты, itinerary, билеты и избранное;
- комьюнити, группы, чаты и meetups;
- новости, smart alerts, AI-assistant history;
- мультиязычный контент для SEO и UI.

## Принцип мультиязычности

UI-переводы коротких интерфейсных фраз можно держать в коде, как сейчас в `lib/i18n.ts`.
Контент, который будет приходить из базы и индексироваться SEO, нужно хранить в базе:
названия, описания, инструкции, правила стадионов, статьи, slug и SEO-поля.

Рекомендуемая модель:

- базовая таблица хранит неизменяемые поля: координаты, даты, статусы, вместимость, связи;
- отдельная таблица `*_translations` хранит `language_code`, `name/title`, `description`, `slug`, SEO;
- `language_code` ссылается на `languages(code)`;
- primary key переводов: `(entity_id, language_code)`;
- обязательный fallback: если перевода нет, показываем `en`.

Почему не JSONB `translations` в одной колонке:

- сложнее делать SEO slug по языкам;
- сложнее искать и фильтровать по тексту;
- сложнее админка и модерация;
- хуже типизация в TypeScript.

## Языки

`languages`

- `code` text primary key: `en`, `es`, `fr`, `de`, `pt`, `it`, `ar`, `zh`, `ja`, `ko`, `ru`
- `name` text
- `native_name` text
- `dir` text check `ltr|rtl`
- `is_enabled` boolean
- `sort_order` int

## Core Reference Data

`countries`

- `id` uuid primary key
- `fifa_code` text unique
- `iso2` text
- `emoji` text
- `created_at` timestamptz

`country_translations`

- `country_id` uuid references `countries`
- `language_code` text references `languages`
- `name` text
- primary key `(country_id, language_code)`

`teams`

- `id` uuid primary key
- `country_id` uuid references `countries`
- `fifa_code` text unique
- `flag_emoji` text
- `created_at` timestamptz

`team_translations`

- `team_id` uuid references `teams`
- `language_code` text references `languages`
- `name` text
- `short_name` text
- primary key `(team_id, language_code)`

`host_cities`

- `id` uuid primary key
- `country_id` uuid references `countries`
- `timezone` text
- `latitude` numeric
- `longitude` numeric
- `created_at` timestamptz

`host_city_translations`

- `city_id` uuid references `host_cities`
- `language_code` text references `languages`
- `name` text
- `state_region` text
- `slug` text
- `summary` text
- `seo_title` text
- `seo_description` text
- primary key `(city_id, language_code)`
- unique `(language_code, slug)`

`stadiums`

- `id` uuid primary key
- `city_id` uuid references `host_cities`
- `latitude` numeric
- `longitude` numeric
- `capacity` int
- `timezone` text
- `website_url` text
- `image_url` text
- `created_at` timestamptz

`stadium_translations`

- `stadium_id` uuid references `stadiums`
- `language_code` text references `languages`
- `name` text
- `slug` text
- `description` text
- `address` text
- `gate_info` text
- `parking_info` text
- `prohibited_items` text
- `seo_title` text
- `seo_description` text
- primary key `(stadium_id, language_code)`
- unique `(language_code, slug)`

## Matches

`tournaments`

- `id` uuid primary key
- `name` text
- `year` int
- `starts_on` date
- `ends_on` date

`matches`

- `id` uuid primary key
- `tournament_id` uuid references `tournaments`
- `stage` text
- `group_name` text
- `home_team_id` uuid references `teams`
- `away_team_id` uuid references `teams`
- `stadium_id` uuid references `stadiums`
- `kickoff_at` timestamptz
- `status` text check `scheduled|live|finished|postponed|cancelled`
- `home_score` int
- `away_score` int
- `external_id` text
- `created_at` timestamptz

`match_translations`

- `match_id` uuid references `matches`
- `language_code` text references `languages`
- `title` text
- `preview` text
- `broadcast_note` text
- primary key `(match_id, language_code)`

## Places, Fan Zones, Bars, Parking

Вместо отдельных `fan_zones`, `bars`, `restaurants`, `parking` лучше сделать единую таблицу `places`.
Это упростит карту, поиск, фильтры, избранное и AI-рекомендации.

`places`

- `id` uuid primary key
- `city_id` uuid references `host_cities`
- `stadium_id` uuid references `stadiums` nullable
- `type` text check `fan_zone|sports_bar|restaurant|parking|hotel|airport|transport_hub|attraction`
- `latitude` numeric
- `longitude` numeric
- `website_url` text
- `phone` text
- `price_level` int
- `rating` numeric
- `image_url` text
- `is_sponsored` boolean
- `is_published` boolean
- `created_at` timestamptz

`place_translations`

- `place_id` uuid references `places`
- `language_code` text references `languages`
- `name` text
- `slug` text
- `description` text
- `address` text
- `atmosphere` text
- `opening_hours_note` text
- `seo_title` text
- `seo_description` text
- primary key `(place_id, language_code)`
- unique `(language_code, slug)`

`tags`

- `id` uuid primary key
- `key` text unique
- `category` text

`tag_translations`

- `tag_id` uuid references `tags`
- `language_code` text references `languages`
- `label` text
- primary key `(tag_id, language_code)`

`place_tags`

- `place_id` uuid references `places`
- `tag_id` uuid references `tags`
- primary key `(place_id, tag_id)`

`place_match_screenings`

- `id` uuid primary key
- `place_id` uuid references `places`
- `match_id` uuid references `matches`
- `starts_at` timestamptz
- `reservation_url` text
- `is_official` boolean
- `created_at` timestamptz

## Users And Personal Data

Supabase Auth хранит аккаунты в `auth.users`. В `public` нужна только профильная таблица.

`profiles`

- `id` uuid primary key references `auth.users(id)`
- `display_name` text
- `avatar_url` text
- `language_code` text references `languages`
- `country_id` uuid references `countries`
- `favorite_team_id` uuid references `teams`
- `telegram_user_id` bigint unique
- `premium_until` timestamptz
- `created_at` timestamptz
- `updated_at` timestamptz

`user_favorites`

- `user_id` uuid references `profiles`
- `entity_type` text check `match|stadium|place|team|article|meetup`
- `entity_id` uuid
- `created_at` timestamptz
- primary key `(user_id, entity_type, entity_id)`

`itinerary_items`

- `id` uuid primary key
- `user_id` uuid references `profiles`
- `match_id` uuid references `matches` nullable
- `place_id` uuid references `places` nullable
- `stadium_id` uuid references `stadiums` nullable
- `starts_at` timestamptz
- `ends_at` timestamptz
- `note` text
- `created_at` timestamptz

`user_tickets`

- `id` uuid primary key
- `user_id` uuid references `profiles`
- `match_id` uuid references `matches`
- `provider` text
- `section` text
- `seat_label` text
- `ticket_url` text
- `created_at` timestamptz

Важно: QR-коды и реальные ticket secrets лучше не хранить в открытом `public` schema без отдельной security-модели.

## Routes And Travel

`route_templates`

- `id` uuid primary key
- `city_id` uuid references `host_cities`
- `origin_place_id` uuid references `places` nullable
- `destination_place_id` uuid references `places` nullable
- `destination_stadium_id` uuid references `stadiums` nullable
- `transport_mode` text check `public_transport|driving|walking|taxi|shuttle`
- `distance_meters` int
- `duration_seconds` int
- `provider` text
- `external_id` text
- `created_at` timestamptz

`route_template_translations`

- `route_template_id` uuid references `route_templates`
- `language_code` text references `languages`
- `title` text
- `summary` text
- `instructions` text
- primary key `(route_template_id, language_code)`

`route_alerts`

- `id` uuid primary key
- `city_id` uuid references `host_cities`
- `stadium_id` uuid references `stadiums` nullable
- `severity` text check `info|warning|critical`
- `starts_at` timestamptz
- `ends_at` timestamptz
- `is_published` boolean
- `created_at` timestamptz

`route_alert_translations`

- `alert_id` uuid references `route_alerts`
- `language_code` text references `languages`
- `title` text
- `body` text
- primary key `(alert_id, language_code)`

## Community

`community_groups`

- `id` uuid primary key
- `team_id` uuid references `teams` nullable
- `city_id` uuid references `host_cities` nullable
- `language_code` text references `languages` nullable
- `visibility` text check `public|private`
- `created_by` uuid references `profiles`
- `created_at` timestamptz

`community_group_translations`

- `group_id` uuid references `community_groups`
- `language_code` text references `languages`
- `name` text
- `description` text
- primary key `(group_id, language_code)`

`community_members`

- `group_id` uuid references `community_groups`
- `user_id` uuid references `profiles`
- `role` text check `owner|moderator|member`
- `joined_at` timestamptz
- primary key `(group_id, user_id)`

`chat_messages`

- `id` uuid primary key
- `group_id` uuid references `community_groups`
- `user_id` uuid references `profiles`
- `body` text
- `source_language_code` text references `languages`
- `created_at` timestamptz

`chat_message_translations`

- `message_id` uuid references `chat_messages`
- `language_code` text references `languages`
- `translated_body` text
- `provider` text
- `created_at` timestamptz
- primary key `(message_id, language_code)`

`meetups`

- `id` uuid primary key
- `group_id` uuid references `community_groups` nullable
- `place_id` uuid references `places` nullable
- `match_id` uuid references `matches` nullable
- `created_by` uuid references `profiles`
- `starts_at` timestamptz
- `status` text check `draft|published|cancelled`
- `created_at` timestamptz

`meetup_translations`

- `meetup_id` uuid references `meetups`
- `language_code` text references `languages`
- `title` text
- `description` text
- primary key `(meetup_id, language_code)`

## News, SEO, AI

`articles`

- `id` uuid primary key
- `type` text check `news|guide|city_page|stadium_page|watch_page`
- `city_id` uuid references `host_cities` nullable
- `stadium_id` uuid references `stadiums` nullable
- `match_id` uuid references `matches` nullable
- `author_id` uuid references `profiles` nullable
- `status` text check `draft|published|archived`
- `published_at` timestamptz
- `created_at` timestamptz

`article_translations`

- `article_id` uuid references `articles`
- `language_code` text references `languages`
- `slug` text
- `title` text
- `excerpt` text
- `body` text
- `seo_title` text
- `seo_description` text
- primary key `(article_id, language_code)`
- unique `(language_code, slug)`

`assistant_threads`

- `id` uuid primary key
- `user_id` uuid references `profiles`
- `language_code` text references `languages`
- `created_at` timestamptz

`assistant_messages`

- `id` uuid primary key
- `thread_id` uuid references `assistant_threads`
- `role` text check `user|assistant|system`
- `content` text
- `created_at` timestamptz

`push_subscriptions`

- `id` uuid primary key
- `user_id` uuid references `profiles`
- `endpoint` text
- `p256dh` text
- `auth` text
- `created_at` timestamptz

## Admin And Monetization

`sponsors`

- `id` uuid primary key
- `name` text
- `website_url` text
- `created_at` timestamptz

`sponsored_placements`

- `id` uuid primary key
- `sponsor_id` uuid references `sponsors`
- `place_id` uuid references `places` nullable
- `city_id` uuid references `host_cities` nullable
- `placement_type` text
- `starts_at` timestamptz
- `ends_at` timestamptz
- `created_at` timestamptz

## MVP Порядок Внедрения

### Phase 1: Foundation

1. `languages`
2. `countries`, `country_translations`
3. `teams`, `team_translations`
4. `host_cities`, `host_city_translations`
5. `stadiums`, `stadium_translations`
6. `tournaments`
7. `matches`, `match_translations`

### Phase 2: Map And Watch

1. `places`, `place_translations`
2. `tags`, `tag_translations`, `place_tags`
3. `place_match_screenings`
4. `route_templates`, `route_template_translations`
5. `route_alerts`, `route_alert_translations`

### Phase 3: Users

1. `profiles`
2. `user_favorites`
3. `itinerary_items`
4. `user_tickets`

### Phase 4: Community And AI

1. `community_groups`, `community_group_translations`
2. `community_members`
3. `chat_messages`, `chat_message_translations`
4. `meetups`, `meetup_translations`
5. `articles`, `article_translations`
6. `assistant_threads`, `assistant_messages`
7. `push_subscriptions`

## Security / RLS

Все таблицы в `public` должны иметь RLS.

Правила по умолчанию:

- published reference content: public read;
- profiles: public read только безопасных полей, update только owner;
- itinerary, tickets, favorites: read/write только owner;
- community messages: read для members или public groups, write только authenticated members;
- admin/content writes: только admin role через `app_metadata`, не через user-editable metadata;
- service role key не использовать во frontend.

## Что создать первым в Supabase

Для текущего MVP я бы начал не со всех таблиц, а с Phase 1 + минимальная часть Phase 2:

- `languages`
- `countries`
- `country_translations`
- `teams`
- `team_translations`
- `host_cities`
- `host_city_translations`
- `stadiums`
- `stadium_translations`
- `tournaments`
- `matches`
- `match_translations`
- `places`
- `place_translations`
- `tags`
- `tag_translations`
- `place_tags`
- `place_match_screenings`

Этого хватит, чтобы заменить текущие mock-данные реальной базой: расписание, города, стадионы, фан-зоны, бары и места просмотра.

## Applied In Supabase

Project: `cupmate` / `ireifidclgtljirtnkmg`

Applied migrations:

- `20260512203542_initial_cupmate_schema`
- `20260512203615_harden_schema_advisor_fixes`

Created:

- MVP reference/content schema: languages, countries, teams, host cities, stadiums, tournaments, matches, places, tags, screenings, route templates and route alerts.
- User-owned schema: profiles, favorites, itinerary items and user tickets.
- Translation tables for every multilingual content table.
- RLS on every `public` table.
- Public read policies for reference/published content.
- Owner-only policies for profile, favorites, itinerary and ticket data.
- Grants for Supabase Data API access with `anon`/`authenticated` roles where appropriate.

Verified:

- Supabase SQL execution works through MCP.
- Security advisor returns no lints.
- Data API can read `languages` with the publishable key.
- Remaining performance advisor entries are only `unused_index` notices on a new empty database.
