"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/lib/cart-context";
import { CURRENCIES } from "@/lib/currency";
import { PatternDivider } from "@/components/pattern-divider";

export function Navbar() {
  const { data: session, status } = useSession();
  const { items, currency, setCurrency } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-10 bg-brand-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link
          href="/"
          className="font-display text-2xl tracking-wide text-brand-900 transition hover:text-accent-600"
        >
          Hazara
        </Link>

        <nav className="flex items-center gap-6 text-sm text-brand-700">
          <select
            aria-label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as (typeof CURRENCIES)[number])}
            className="rounded-full border border-brand-200 bg-transparent px-3 py-1 text-brand-700"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <Link href="/cart" className="flex items-center gap-1.5 hover:text-accent-600">
            Cart
            {itemCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-xs font-medium text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {status === "authenticated" ? (
            <>
              <Link href="/account" className="hover:text-accent-600">
                Account
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="hover:text-accent-600">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-accent-600">
                Log in
              </Link>
              <Link href="/signup" className="hover:text-accent-600">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
      <PatternDivider id="navbar-pattern" />
    </header>
  );
}
