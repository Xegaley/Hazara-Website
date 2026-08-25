import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductPrice } from "@/components/product-price";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) notFound();

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-brand-100">
        <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="md:pt-4">
        <h1 className="font-display text-3xl text-brand-900">{product.name}</h1>
        <div className="mt-3">
          <ProductPrice product={product} />
        </div>
        <p className="mt-5 max-w-md leading-relaxed text-brand-600">{product.description}</p>
        <div className="mt-8">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
