import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";

export default async function HomePage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-brand-800">Handcrafted goods</h1>
        <p className="mt-2 text-brand-600">
          A small collection of handmade pieces, shipped worldwide.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
