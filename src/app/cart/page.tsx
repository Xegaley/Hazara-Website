"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { CURRENCIES, formatPrice, priceForCurrency } from "@/lib/currency";
import { FloralMotif } from "@/components/floral-motif";

export default function CartPage() {
  const { items, currency, setCurrency, setQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce(
    (sum, item) => sum + priceForCurrency(item, currency) * item.quantity,
    0
  );

  async function handleCheckout() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currency,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Checkout failed.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Checkout failed. Please try again.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3">
          <FloralMotif className="h-8 w-8 text-accent-400" />
          <h1 className="font-display text-2xl text-brand-900">Your cart</h1>
          <FloralMotif className="h-8 w-8 text-accent-400" />
        </div>
        <p className="mt-3 text-brand-600">
          Your cart is empty.{" "}
          <Link href="/" className="text-accent-600 underline underline-offset-2">
            Continue shopping
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="flex items-center gap-2.5 font-display text-2xl text-brand-900">
          <FloralMotif className="h-8 w-8 text-accent-400" />
          Your cart
        </h1>
        <select
          aria-label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as (typeof CURRENCIES)[number])}
          className="rounded-full border border-brand-200 bg-transparent px-3 py-1 text-sm text-brand-700"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <ul className="divide-y divide-brand-200">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center gap-4 py-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-brand-100">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <Link href={`/product/${item.slug}`} className="text-brand-800 hover:text-accent-600">
                {item.name}
              </Link>
              <p className="text-sm text-brand-500">
                {formatPrice(priceForCurrency(item, currency), currency)} each
              </p>
            </div>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => setQuantity(item.productId, Math.max(1, Number(e.target.value) || 1))}
              className="w-16 rounded-md border border-brand-200 px-2 py-1.5 text-center"
            />
            <button
              onClick={() => removeItem(item.productId)}
              className="text-sm text-brand-400 hover:text-accent-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between border-t border-brand-200 pt-5">
        <span className="text-brand-800">Total</span>
        <span className="text-lg text-brand-900">{formatPrice(total, currency)}</span>
      </div>

      {error && <p className="mt-3 text-sm text-accent-600">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 w-full rounded-md bg-accent-600 px-4 py-3 text-white transition hover:bg-accent-700 disabled:opacity-60"
      >
        {loading ? "Redirecting to checkout..." : "Checkout"}
      </button>
    </div>
  );
}
