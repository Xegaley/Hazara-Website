import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedProduct = {
  name: string;
  description: string;
  priceEURCents: number;
  priceAUDCents: number;
  imageUrl?: string;
};

// Test catalog — phone cases + clothing, with locally generated placeholder
// images (see /public/products). Swap for real product photos + copy later.
const products: SeedProduct[] = [
  { name: "Slim Phone Case — Navy", description: "Slim-fit protective case with a soft-touch matte finish.", priceEURCents: 1900, priceAUDCents: 3100, imageUrl: "/products/phone-case-1.png" },
  { name: "Slim Phone Case — Terracotta", description: "Slim-fit protective case with a soft-touch matte finish.", priceEURCents: 1900, priceAUDCents: 3100, imageUrl: "/products/phone-case-2.png" },
  { name: "Slim Phone Case — Olive", description: "Slim-fit protective case with a soft-touch matte finish.", priceEURCents: 1900, priceAUDCents: 3100, imageUrl: "/products/phone-case-3.png" },
  { name: "Classic T-Shirt — Sand", description: "Everyday cotton t-shirt with a relaxed fit.", priceEURCents: 2500, priceAUDCents: 4100, imageUrl: "/products/tshirt-1.png" },
  { name: "Classic T-Shirt — Espresso", description: "Everyday cotton t-shirt with a relaxed fit.", priceEURCents: 2500, priceAUDCents: 4100, imageUrl: "/products/tshirt-2.png" },
  { name: "Pullover Hoodie — Brown", description: "Heavyweight fleece hoodie with a kangaroo pocket.", priceEURCents: 5500, priceAUDCents: 9000, imageUrl: "/products/hoodie-1.png" },
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  for (const [index, product] of products.entries()) {
    const slug = slugify(product.name);
    await prisma.product.create({
      data: {
        slug,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl ?? `https://picsum.photos/seed/hazara-${index + 1}/600/600`,
        priceEURCents: product.priceEURCents,
        priceAUDCents: product.priceAUDCents,
      },
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
