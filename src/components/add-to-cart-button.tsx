"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

export function AddToCartButton({
  product,
}: {
  product: {
    id: string;
    slug: string;
    name: string;
    imageUrl: string;
    priceEURCents: number;
    priceAUDCents: number;
  };
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
        className="w-16 rounded border border-brand-300 px-2 py-2"
      />
      <button
        onClick={() => {
          addItem(
            {
              productId: product.id,
              slug: product.slug,
              name: product.name,
              imageUrl: product.imageUrl,
              priceEURCents: product.priceEURCents,
              priceAUDCents: product.priceAUDCents,
            },
            quantity
          );
          setAdded(true);
          router.refresh();
        }}
        className="rounded bg-brand-700 px-4 py-2 text-white hover:bg-brand-800"
      >
        {added ? "Added" : "Add to cart"}
      </button>
    </div>
  );
}
