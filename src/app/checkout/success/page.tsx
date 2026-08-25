"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { FloralMotif } from "@/components/floral-motif";

export default function CheckoutSuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mb-4 flex items-center justify-center gap-3">
        <FloralMotif className="h-5 w-5 text-accent-400" />
        <h1 className="font-display text-2xl text-brand-900">Thank you for your order</h1>
        <FloralMotif className="h-5 w-5 text-accent-400" />
      </div>
      <p className="mb-8 text-brand-600">
        Your payment was successful. A confirmation will be reflected in your account once
        processed.
      </p>
      <Link
        href="/"
        className="inline-block rounded-md bg-accent-600 px-5 py-2.5 text-white transition hover:bg-accent-700"
      >
        Continue shopping
      </Link>
    </div>
  );
}
