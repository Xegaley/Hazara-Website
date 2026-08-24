import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Must run at request time, not build time — this hits the database and
// its result must never be statically cached.
export const dynamic = "force-dynamic";

// One-time setup endpoint: creates tables (if missing) and seeds the test
// catalog. Safe to call more than once — every statement is idempotent
// (IF NOT EXISTS / ON CONFLICT DO NOTHING), and nothing here ever deletes
// data. Meant as a stopgap for environments where running `prisma migrate
// deploy` / `prisma db seed` from a shell isn't convenient (e.g. no local
// Node setup). Remove or protect this route before handling real customer
// data.

const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "priceEURCents" INTEGER NOT NULL,
    "priceAUDCents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE TABLE IF NOT EXISTS "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "currency" TEXT NOT NULL,
    "totalCents" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "stripeCheckoutSessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE TABLE IF NOT EXISTS "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPriceCents" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Product_slug_key" ON "Product"("slug")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Order_stripeCheckoutSessionId_key" ON "Order"("stripeCheckoutSessionId")`,
  `DO $$ BEGIN
    ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `DO $$ BEGIN
    ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `DO $$ BEGIN
    ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
];

const PRODUCTS = [
  { slug: "slim-phone-case-navy", name: "Slim Phone Case — Navy", description: "Slim-fit protective case with a soft-touch matte finish.", imageUrl: "/products/phone-case-1.png", priceEURCents: 1900, priceAUDCents: 3100 },
  { slug: "slim-phone-case-terracotta", name: "Slim Phone Case — Terracotta", description: "Slim-fit protective case with a soft-touch matte finish.", imageUrl: "/products/phone-case-2.png", priceEURCents: 1900, priceAUDCents: 3100 },
  { slug: "slim-phone-case-olive", name: "Slim Phone Case — Olive", description: "Slim-fit protective case with a soft-touch matte finish.", imageUrl: "/products/phone-case-3.png", priceEURCents: 1900, priceAUDCents: 3100 },
  { slug: "classic-t-shirt-sand", name: "Classic T-Shirt — Sand", description: "Everyday cotton t-shirt with a relaxed fit.", imageUrl: "/products/tshirt-1.png", priceEURCents: 2500, priceAUDCents: 4100 },
  { slug: "classic-t-shirt-espresso", name: "Classic T-Shirt — Espresso", description: "Everyday cotton t-shirt with a relaxed fit.", imageUrl: "/products/tshirt-2.png", priceEURCents: 2500, priceAUDCents: 4100 },
  { slug: "pullover-hoodie-brown", name: "Pullover Hoodie — Brown", description: "Heavyweight fleece hoodie with a kangaroo pocket.", imageUrl: "/products/hoodie-1.png", priceEURCents: 5500, priceAUDCents: 9000 },
];

export async function GET() {
  for (const statement of SCHEMA_STATEMENTS) {
    await prisma.$executeRawUnsafe(statement);
  }

  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  const count = await prisma.product.count();
  return NextResponse.json({ ok: true, productCount: count });
}
