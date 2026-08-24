"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice, priceForCurrency } from "@/lib/currency";

export function ProductPrice({
  product,
}: {
  product: { priceEURCents: number; priceAUDCents: number };
}) {
  const { currency } = useCart();
  return <p className="text-xl text-brand-700">{formatPrice(priceForCurrency(product, currency), currency)}</p>;
}
