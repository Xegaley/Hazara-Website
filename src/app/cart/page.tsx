"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { CURRENCIES, formatPrice, priceForCurrency } from "@/lib/currency";

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
      <div>
        <h1 className="mb-4 text-2xl font-semibold text-brand-800">Your cart</h1>
        <p className="text-brand-600">
          Your cart is empty.{" "}
          <Link href="/" className="underline">
            Continue shopping
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-brand-800">Your cart</h1>
        <select
          aria-label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as (typeof CURRENCIES)[number])}
          className="rounded border border-brand-300 bg-white px-2 py-1"
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
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-brand-100">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <Link href={`/product/${item.slug}`} className="font-medium text-brand-800 hover:underline">
                {item.name}
              </Link>
              <p className="text-sm text-brand-600">
                {formatPrice(priceForCurrency(item, currency), currency)} each
              </p>
            </div>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => setQuantity(item.productId, Math.max(1, Number(e.target.value) || 1))}
              className="w-16 rounded border border-brand-300 px-2 py-1"
            />
            <button
              onClick={() => removeItem(item.productId)}
              className="text-sm text-brand-500 hover:text-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between border-t border-brand-200 pt-4">
        <span className="text-lg font-medium text-brand-800">Total</span>
        <span className="text-lg font-medium text-brand-800">{formatPrice(total, currency)}</span>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 w-full rounded bg-brand-700 px-4 py-3 text-white hover:bg-brand-800 disabled:opacity-60"
      >
        {loading ? "Redirecting to checkout..." : "Checkout"}
      </button>
    </div>
  );
}
