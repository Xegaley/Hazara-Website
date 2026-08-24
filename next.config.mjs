// next-auth reads NEXTAUTH_URL and throws "Invalid URL" if it's unset or
// blank. Vercel deploys each route as its own serverless function that
// doesn't re-run this file per request, so mutating process.env here has
// no effect at runtime — it only affected local `next start` (a real
// persistent server process) and the build step itself. The fix has to
// use Next's `env` config key instead, which bakes the computed value
// into the compiled bundle at build time (webpack DefinePlugin literally
// substitutes every `process.env.NEXTAUTH_URL` reference), so the
// deployed function never needs to read the env var at request time at
// all. VERCEL_PROJECT_PRODUCTION_URL/VERCEL_URL are always set during
// Vercel builds, so this works even if NEXTAUTH_URL is never configured
// in the dashboard.
const resolvedNextAuthUrl =
  process.env.NEXTAUTH_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: resolvedNextAuthUrl,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
