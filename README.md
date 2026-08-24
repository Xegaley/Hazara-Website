# Hazara

An e-commerce storefront: product catalog, cart, checkout via Stripe (EUR/AUD), and email/password
accounts. Built with Next.js (App Router), Prisma/SQLite, NextAuth, and Stripe Checkout.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Prisma + SQLite (`dev.db`) — swap the datasource for Postgres/MySQL when you outgrow it
- NextAuth (Credentials provider, bcrypt-hashed passwords)
- Stripe Checkout (hosted payment page, currency-aware: EUR or AUD)

## Getting started

```bash
npm install
cp .env.example .env   # fill in real values, see below
npx prisma migrate dev
npm run dev
```

Visit http://localhost:3000.

## Environment variables (`.env`)

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | SQLite file path, defaults to `file:./dev.db` |
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

20 placeholder products are seeded via `prisma/seed.ts` (`npx prisma db seed`) so the site has
something to show. Each product stores a price in both EUR and AUD (`priceEURCents` /
`priceAUDCents`) — there's no live currency conversion, so update both fields when you set real
prices. Replace the placeholder entries with real product data (name, description, image URL,
prices) directly in that file, or manage them via Prisma Studio:

```bash
npx prisma studio
```

Product images currently point at https://picsum.photos placeholders — swap `imageUrl` for your
own hosted product photos (and add the image host to `remotePatterns` in `next.config.mjs`).

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

- Add real Stripe keys and set up a production webhook endpoint pointing at
  `/api/webhooks/stripe`
- Move off SQLite to a hosted database (Postgres works well with Prisma) since SQLite's file
  won't survive most serverless deployments
- This project currently pins `next@14.2.x`. A known advisory
  (GHSA-955p-x3mx-jcvp) affecting the 14.x line is only fixed in Next.js 16 — plan an upgrade
  before accepting real payments in production
