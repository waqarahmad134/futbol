# Futbol11 — Soccer site

Daily football trivia games, puzzles, and word-style challenges.

## Development

```bash
npm install
npm run dev
```

If you use Bun instead of npm, run `bun install` once to generate a local lockfile.

## Build

```bash
npm run build
```

## Tests

```bash
npm test
npx playwright test
```

## Backend

Anonymous streaks and leaderboard backed by MySQL through Prisma.
No accounts, no login, no personal data: each browser gets a random
device id in localStorage (`futbol11-device-id`) and game results are
stored against it. Streaks are derived from distinct play dates.

Endpoints (all answer `{ "backend": "unavailable" }` with 503 when
`DATABASE_URL` is not set, and the site keeps working fully on
localStorage):

- `POST /api/results/` - body `{ deviceId, game, won, score? }`, records
  a result and returns the updated `{ currentStreak, bestStreak }`.
- `GET /api/streak/?deviceId=...` - current and best cross-game streak.
- `GET /api/leaderboard/` - top 20 players by wins, then best streak,
  device ids truncated to 8 characters.

(The trailing slash is the canonical URL: the site uses
`trailingSlash`, so the unslashed URL 308-redirects to it.)

### Activating the backend

The live site is Hostinger static hosting, which cannot run API routes.
Moving to the backend needs Node.js hosting (Hostinger Node.js hosting
or Vercel):

```bash
cp .env.example .env   # fill in the real MySQL DATABASE_URL
npm install            # postinstall runs `prisma generate`
npx prisma migrate deploy
npm run build
npm start
```

Without `DATABASE_URL` the build still succeeds and every game works
exactly as before on localStorage; results are queued locally and sent
when the backend comes back.

