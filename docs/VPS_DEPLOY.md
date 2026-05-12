# CupMate VPS Docker Deploy

This setup lets a VPS work similarly to Vercel for this project: the server pulls the latest code from GitHub, builds a Docker image, and restarts the app container.

## Architecture

```txt
GitHub repo
  -> VPS deploy script pulls main
  -> Docker builds Next.js standalone app
  -> docker compose runs CupMate on port 3000
  -> Nginx/Caddy/Traefik proxies domain HTTPS traffic to localhost:3000
```

## Files

- `Dockerfile` - production multi-stage Next.js build.
- `docker-compose.yml` - runs the app container.
- `.dockerignore` - keeps local build artifacts out of Docker context.
- `.env.production.example` - production environment template.
- `scripts/deploy-vps.sh` - pull from GitHub, rebuild, restart.

## First VPS Setup

Install Docker and Git on the VPS.

```bash
sudo apt update
sudo apt install -y git ca-certificates curl
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

Log out and back in so the Docker group applies.

## First Deploy

```bash
sudo mkdir -p /opt/cupmate
sudo chown -R $USER:$USER /opt/cupmate

REPO_URL=https://github.com/soldermakcUSA/CUPMATE.git \
APP_DIR=/opt/cupmate \
BRANCH=main \
bash -c "$(curl -fsSL https://raw.githubusercontent.com/soldermakcUSA/CUPMATE/main/scripts/deploy-vps.sh)"
```

On first run the script creates:

```txt
/opt/cupmate/.env.production
```

Edit it:

```bash
nano /opt/cupmate/.env.production
```

Then deploy again:

```bash
cd /opt/cupmate
bash scripts/deploy-vps.sh
```

The app will listen on:

```txt
http://YOUR_SERVER_IP:3000
```

## Update From GitHub

Whenever code changes are pushed to GitHub:

```bash
cd /opt/cupmate
bash scripts/deploy-vps.sh
```

The script runs:

```bash
git fetch
git reset --hard origin/main
docker compose up -d --build --remove-orphans
```

## Domain and HTTPS

Recommended: use Nginx or Caddy as a reverse proxy.

Example Nginx site:

```nginx
server {
  server_name your-domain.com www.your-domain.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Add HTTPS with Certbot:

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Optional GitHub Webhook

For automatic deploy after every GitHub push, add a small webhook service later. For MVP, manual `bash scripts/deploy-vps.sh` is safer and easier.

## Local Docker Test

```bash
cp .env.production.example .env.production
docker compose up -d --build
open http://localhost:3000
```
