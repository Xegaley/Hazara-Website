import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-md text-center">
      <h1 className="mb-4 font-display text-2xl text-brand-900">Checkout canceled</h1>
      <p className="mb-8 text-brand-600">Your payment was not completed. Your cart is still saved.</p>
      <Link
        href="/cart"
        className="inline-block rounded-md bg-accent-600 px-5 py-2.5 text-white transition hover:bg-accent-700"
      >
        Back to cart
      </Link>
    </div>
  );
}
