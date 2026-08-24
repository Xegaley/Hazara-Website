import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Diagnostic only — reports which env vars are present without leaking
// their values (just whether set, length, and a short non-revealing
// prefix). Delete this route once the deployment is working correctly.

const CANDIDATES = [
  "DATABASE_URL",
  "HAZARA_POSTGRES_PRISMA_URL",
  "HAZARA_DATABASE_URL",
  "HAZARA_DATABASE_URL_UNPOOLED",
  "HAZARA_POSTGRES_URL",
  "HAZARA_POSTGRES_URL_NON_POOLING",
  "NEXTAUTH_URL",
  "NEXTAUTH_SECRET",
  "VERCEL_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
  "VERCEL_ENV",
];

export async function GET() {
  const report: Record<string, { set: boolean; length: number; prefix: string }> = {};

  for (const key of CANDIDATES) {
    const value = process.env[key];
    report[key] = {
      set: typeof value === "string" && value.length > 0,
      length: value?.length ?? 0,
      prefix: value ? value.slice(0, 12) : "",
    };
  }

  return NextResponse.json(report);
}
