# Hazara

An e-commerce storefront: product catalog, cart, checkout via Stripe (EUR/AUD), and email/password
accounts. Built with Next.js (App Router), Prisma/Postgres, NextAuth, and Stripe Checkout.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Prisma + Postgres
- NextAuth (Credentials provider, bcrypt-hashed passwords)
- Stripe Checkout (hosted payment page, currency-aware: EUR or AUD)

## Getting started

You need a Postgres database to point at — the easiest free option is
[neon.tech](https://neon.tech) (sign up, create a project, copy the connection string).

```bash
npm install
cp .env.example .env   # fill in real values, see below (DATABASE_URL, etc.)
npx prisma migrate dev
npm run dev
```

Visit http://localhost:3000.

## Environment variables (`.env`)

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (e.g. from Neon, Vercel Storage, or a local Postgres) |
| `NEXTAUTH_SECRET` | Random string used to sign session tokens (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Base URL of the app, e.g. `http://localhost:3000` |
| `STRIPE_SECRET_KEY` | Your Stripe secret key (test or live) |
| `STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | From `stripe listen` (CLI) locally, or your webhook endpoint's signing secret in production |

The repo ships with **placeholder** Stripe keys — checkout will fail until you drop in real test-mode
keys from https://dashboard.stripe.com/test/apikeys. To receive payment confirmations locally, run:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Products

The current seed (`prisma/seed.ts`, run via `npx prisma db seed`) is a small **test catalog**:
3 phone cases + 3 t-shirts/hoodie, so the interface can be reviewed end to end. Each product
stores a price in both EUR and AUD (`priceEURCents` / `priceAUDCents`) — there's no live currency
conversion, so update both fields when you set real prices. Replace the entries with real product
data (name, description, image, prices) directly in that file, or manage them via Prisma Studio:

```bash
npx prisma studio
```

Product images for the test catalog are simple generated placeholders in `public/products/`
(local files, so they always load regardless of network conditions). For real product photos,
put your own images in `public/products/` (or point `imageUrl` at any hosted image and add that
host to `remotePatterns` in `next.config.mjs`) — not images pulled from Pinterest or other sites,
since those are generally someone else's copyrighted photos without a license to reuse commercially.

## Deploying to Vercel

1. Push this branch, then go to [vercel.com](https://vercel.com) and sign up/log in with GitHub
   (free).
2. **Add New → Project**, import the `Hazara-Website` repo, and pick this branch. Leave build
   settings as default (Next.js is auto-detected).
3. Before the first deploy, add a database: in the project, go to **Storage → Create Database →
   Postgres** (powered by Neon). This automatically sets `DATABASE_URL` for you.
4. Add the remaining environment variables under **Settings → Environment Variables**:
   - `NEXTAUTH_SECRET` — any random string (`openssl rand -base64 32`)
   - `NEXTAUTH_URL` — your Vercel URL, e.g. `https://your-project.vercel.app`
   - `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY` — test-mode keys from
     [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys) (real
     checkout won't work until these are real)
   - `STRIPE_WEBHOOK_SECRET` — create a webhook in the Stripe dashboard pointing at
     `https://your-project.vercel.app/api/webhooks/stripe`, then copy its signing secret here
5. Deploy. Once it's live, run the schema + seed against the production database once (locally,
   with `DATABASE_URL` in your shell set to the same value Vercel is using):
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```
6. Visit your `.vercel.app` URL — the site is live and clickable.

Every push to this branch redeploys automatically once the project is linked.

## What's included

- Product grid (`/`) and product detail pages (`/product/[slug]`)
- Cart (`/cart`), persisted in the browser, with an EUR/AUD switcher
- Sign up / log in (`/signup`, `/login`) and a basic account page with order history (`/account`)
- Stripe Checkout session creation (`/api/checkout`) and webhook handling (`/api/webhooks/stripe`)
  that marks orders as paid

## Known limitations (by design, for this first version)

- No admin UI — products are managed via the seed file or Prisma Studio
- No live FX conversion — EUR/AUD prices are set per product
- No password reset flow

## Before going live

- Add real Stripe keys (live mode, not test) and confirm the production webhook is receiving events
- This project currently pins `next@14.2.x`. A known advisory
  (GHSA-955p-x3mx-jcvp) affecting the 14.x line is only fixed in Next.js 16 — plan an upgrade
  before accepting real payments in production
