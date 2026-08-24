import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-md text-center">
      <h1 className="mb-4 text-2xl font-semibold text-brand-800">Checkout canceled</h1>
      <p className="mb-6 text-brand-600">Your payment was not completed. Your cart is still saved.</p>
      <Link href="/cart" className="rounded bg-brand-700 px-4 py-2 text-white hover:bg-brand-800">
        Back to cart
      </Link>
    </div>
  );
}
