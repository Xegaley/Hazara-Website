// next-auth reads NEXTAUTH_URL at both build and request time and throws
// "Invalid URL" if it's unset or blank. Vercel always provides VERCEL_URL
// (the deployment's own hostname), so fall back to that instead of relying
// on NEXTAUTH_URL being configured correctly by hand.
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
