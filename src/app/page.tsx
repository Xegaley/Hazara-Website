import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import { FloralMotif, FloralField } from "@/components/floral-motif";

export default async function HomePage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <div className="relative -mx-4 mb-14 overflow-hidden px-4 py-10 sm:-mx-6 sm:px-6">
        <FloralField id="hero-field" />
        <div className="relative z-10 mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-600">
            Hazara collection
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <FloralMotif className="h-6 w-6 text-accent-400" />
            <h1 className="font-display text-4xl text-brand-900">Handcrafted goods</h1>
            <FloralMotif className="h-6 w-6 text-accent-400" />
          </div>
          <p className="mx-auto mt-4 max-w-sm text-brand-600">
            A small collection of pieces made with motifs and techniques rooted in Hazara
            craft traditions.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
