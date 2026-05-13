#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/cupmate}"
BRANCH="${BRANCH:-main}"
REPO_URL="${REPO_URL:-https://github.com/soldermakcUSA/CUPMATE.git}"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required" >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required" >&2
  exit 1
fi

if docker compose version >/dev/null 2>&1; then
  COMPOSE=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE=(docker-compose)
else
  echo "docker compose is required" >&2
  exit 1
fi

if [ ! -d "$APP_DIR/.git" ]; then
  mkdir -p "$APP_DIR"
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

if [ ! -f .env.production ]; then
  cp .env.production.example .env.production
  echo "Created $APP_DIR/.env.production. Fill it with production values and rerun deploy." >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
source .env.production
set +a

if [ -z "${NEXT_PUBLIC_SUPABASE_URL:-}" ] || [ -z "${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}" ]; then
  echo "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in $APP_DIR/.env.production." >&2
  echo "Next.js needs these values during Docker build, otherwise the site falls back to mock data." >&2
  exit 1
fi

echo "Deploying commit $(git rev-parse --short HEAD) from origin/$BRANCH"

NEWS_ASSET_COUNT="$(find public/assets/news -maxdepth 1 -type f -name '*.webp' 2>/dev/null | wc -l | tr -d ' ')"
if [ "$NEWS_ASSET_COUNT" -lt 14 ]; then
  echo "Expected at least 14 optimized news images in public/assets/news, found $NEWS_ASSET_COUNT." >&2
  echo "The checkout is missing committed news assets; aborting deploy." >&2
  exit 1
fi

if [ "${DEPLOY_NO_CACHE:-1}" = "1" ]; then
  "${COMPOSE[@]}" build --no-cache cupmate
  "${COMPOSE[@]}" up -d --remove-orphans
else
  "${COMPOSE[@]}" up -d --build --remove-orphans
fi

"${COMPOSE[@]}" exec -T cupmate test -f /app/public/assets/news/los-angeles-world-cup-surface-final-prep.webp
"${COMPOSE[@]}" ps
