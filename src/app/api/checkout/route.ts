import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { priceForCurrency, Currency } from "@/lib/currency";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const currency: Currency = body?.currency === "AUD" ? "AUD" : "EUR";
  const requestedItems: { productId: string; quantity: number }[] = Array.isArray(body?.items)
    ? body.items
    : [];

  if (requestedItems.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const productIds = requestedItems.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const productMap = new Map(products.map((p) => [p.id, p]));

  const lineItems = [];
  const orderItemsData = [];
  let totalCents = 0;

  for (const requested of requestedItems) {
    const product = productMap.get(requested.productId);
    const quantity = Math.max(1, Math.floor(requested.quantity) || 1);
    if (!product) continue;

    const unitPrice = priceForCurrency(product, currency);
    totalCents += unitPrice * quantity;

    lineItems.push({
      quantity,
      price_data: {
        currency: currency.toLowerCase(),
        unit_amount: unitPrice,
        product_data: {
          name: product.name,
          images: [product.imageUrl],
        },
      },
    });

    orderItemsData.push({
      productId: product.id,
      quantity,
      unitPriceCents: unitPrice,
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "No valid items in cart." }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user ? (session.user as { id?: string }).id : undefined;

  const order = await prisma.order.create({
    data: {
      userId,
      currency,
      totalCents,
      status: "pending",
      items: { create: orderItemsData },
    },
  });

  const origin = request.headers.get("origin") ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  try {
    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/checkout/success?order=${order.id}`,
      cancel_url: `${origin}/checkout/cancel?order=${order.id}`,
      metadata: { orderId: order.id },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeCheckoutSessionId: checkoutSession.id },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    await prisma.order.update({ where: { id: order.id }, data: { status: "failed" } });
    const message = err instanceof Error ? err.message : "Unable to start checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
