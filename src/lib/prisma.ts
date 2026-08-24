import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Prisma's own runtime library ships as a prebuilt node_modules package that
// Next.js externalizes rather than bundles, so it reads DATABASE_URL from
// the real process.env at request time — it can't be fixed by baking a
// value into the compiled app code (unlike NEXTAUTH_URL in next.config.mjs).
// The Vercel-Neon Storage integration names its injected vars after the
// store (e.g. HAZARA_POSTGRES_PRISMA_URL) rather than plain DATABASE_URL, so
// resolve whichever one actually exists here, in code that does run with
// real env access, and pass it explicitly instead of relying on DATABASE_URL
// being hand-configured correctly in the dashboard.
const datasourceUrl =
  process.env.DATABASE_URL ||
  process.env.HAZARA_POSTGRES_PRISMA_URL ||
  process.env.HAZARA_DATABASE_URL ||
  process.env.HAZARA_POSTGRES_URL;

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ datasourceUrl });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
