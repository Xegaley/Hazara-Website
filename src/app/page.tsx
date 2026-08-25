import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import { PatternDivider } from "@/components/pattern-divider";

export default async function HomePage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <div className="mx-auto mb-12 max-w-xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-600">
          Hazara collection
        </p>
        <h1 className="mt-3 font-display text-4xl text-brand-900">Handcrafted goods</h1>
        <p className="mx-auto mt-4 max-w-sm text-brand-600">
          A small collection of pieces made with motifs and techniques rooted in Hazara
          craft traditions.
        </p>
        <PatternDivider id="hero-pattern" className="mx-auto mt-8 max-w-[8rem]" tone="text-accent-500" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
