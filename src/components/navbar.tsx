"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/lib/cart-context";
import { CURRENCIES } from "@/lib/currency";

export function Navbar() {
  const { data: session, status } = useSession();
  const { items, currency, setCurrency } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b border-brand-200 bg-brand-50/95 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-brand-800">
          Hazara
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <select
            aria-label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as (typeof CURRENCIES)[number])}
            className="rounded border border-brand-300 bg-white px-2 py-1 text-brand-800"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <Link href="/cart" className="text-brand-800 hover:text-brand-600">
            Cart{itemCount > 0 ? ` (${itemCount})` : ""}
          </Link>

          {status === "authenticated" ? (
            <>
              <Link href="/account" className="text-brand-800 hover:text-brand-600">
                Account
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-brand-800 hover:text-brand-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-brand-800 hover:text-brand-600">
                Log in
              </Link>
              <Link href="/signup" className="text-brand-800 hover:text-brand-600">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
