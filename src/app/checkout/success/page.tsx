"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CheckoutSuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-md text-center">
      <h1 className="mb-4 text-2xl font-semibold text-brand-800">Thank you for your order</h1>
      <p className="mb-6 text-brand-600">
        Your payment was successful. A confirmation will be reflected in your account once
        processed.
      </p>
      <Link href="/" className="rounded bg-brand-700 px-4 py-2 text-white hover:bg-brand-800">
        Continue shopping
      </Link>
    </div>
  );
}
