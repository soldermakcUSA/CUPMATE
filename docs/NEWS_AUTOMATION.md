# CupMate News Automation

The `Auto World Cup News` GitHub Action runs three times per day and can also be started manually from the Actions tab.

Required GitHub Secrets:

- `OPENAI_API_KEY` - generates rewritten articles and cover images.
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - public Supabase client key.
- `SUPABASE_SERVICE_ROLE_KEY` - writes generated articles into `articles` and `article_translations`.

Optional GitHub Variables:

- `OPENAI_TEXT_MODEL` - defaults to `gpt-5.4-mini`.
- `OPENAI_IMAGE_MODEL` - defaults to `gpt-image-1`.

What each run does:

1. Searches World Cup 2026 news through RSS search feeds.
2. Skips articles already present by `sourceUrl` or slug.
3. Rewrites new source material into a full CupMate article with fan-planning context.
4. Generates a news cover image and saves it under `public/assets/news`.
5. Inserts English and Russian versions into Supabase.
6. Updates static SEO news files, builds the app, commits changes and pushes to `main`.

Local dry run:

```bash
npm run auto-news -- --dry-run --skip-images --skip-supabase
```

Manual publish run:

```bash
npm run auto-news
```
