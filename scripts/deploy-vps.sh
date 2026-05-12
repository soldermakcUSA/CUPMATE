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

"${COMPOSE[@]}" up -d --build --remove-orphans
"${COMPOSE[@]}" ps
