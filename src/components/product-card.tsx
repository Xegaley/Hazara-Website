"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice, priceForCurrency } from "@/lib/currency";

export type ProductSummary = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  priceEURCents: number;
  priceAUDCents: number;
};

export function ProductCard({ product }: { product: ProductSummary }) {
  const { currency } = useCart();
  const price = priceForCurrency(product, currency);

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-brand-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="pt-3">
        <h3 className="text-sm text-brand-800 group-hover:text-accent-600">{product.name}</h3>
        <p className="mt-1 text-sm text-brand-500">{formatPrice(price, currency)}</p>
      </div>
    </Link>
  );
}
