import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedProduct = {
  name: string;
  description: string;
  priceEURCents: number;
  priceAUDCents: number;
};

// Placeholder catalog — swap these out for real product data whenever it's ready.
const products: SeedProduct[] = [
  { name: "Embroidered Wall Hanging", description: "Handmade decorative textile with traditional embroidery patterns.", priceEURCents: 4500, priceAUDCents: 7300 },
  { name: "Woven Wool Scarf", description: "Soft, warm scarf woven from natural wool.", priceEURCents: 2800, priceAUDCents: 4600 },
  { name: "Hand-Painted Ceramic Bowl", description: "Ceramic bowl finished with hand-painted detailing.", priceEURCents: 3200, priceAUDCents: 5200 },
  { name: "Silver Filigree Earrings", description: "Delicate earrings crafted with traditional silver filigree work.", priceEURCents: 5400, priceAUDCents: 8800 },
  { name: "Embroidered Cap", description: "Classic embroidered cap made with fine detailing.", priceEURCents: 1900, priceAUDCents: 3100 },
  { name: "Handwoven Rug (Small)", description: "Small handwoven rug featuring traditional geometric patterns.", priceEURCents: 12000, priceAUDCents: 19500 },
  { name: "Copper Tea Pot", description: "Hand-hammered copper tea pot, functional and decorative.", priceEURCents: 6800, priceAUDCents: 11100 },
  { name: "Beaded Necklace", description: "Necklace featuring handmade beadwork.", priceEURCents: 3600, priceAUDCents: 5900 },
  { name: "Leather Pouch", description: "Small handcrafted leather pouch with stitched trim.", priceEURCents: 2400, priceAUDCents: 3900 },
  { name: "Embroidered Cushion Cover", description: "Cushion cover with dense traditional embroidery.", priceEURCents: 3100, priceAUDCents: 5000 },
  { name: "Wooden Carved Box", description: "Small keepsake box with hand-carved detailing.", priceEURCents: 4100, priceAUDCents: 6700 },
  { name: "Silk Shawl", description: "Lightweight silk shawl with woven border pattern.", priceEURCents: 5900, priceAUDCents: 9600 },
  { name: "Handmade Sandals", description: "Comfortable handmade leather sandals.", priceEURCents: 3900, priceAUDCents: 6400 },
  { name: "Brass Incense Holder", description: "Decorative brass holder for incense sticks.", priceEURCents: 1700, priceAUDCents: 2800 },
  { name: "Patterned Table Runner", description: "Woven table runner with traditional motifs.", priceEURCents: 2600, priceAUDCents: 4300 },
  { name: "Wool Felt Slippers", description: "Warm handmade felt slippers.", priceEURCents: 2200, priceAUDCents: 3600 },
  { name: "Hand-Stitched Tote Bag", description: "Durable tote bag with hand-stitched embroidery panel.", priceEURCents: 3400, priceAUDCents: 5600 },
  { name: "Ceramic Tea Cup Set", description: "Set of two hand-painted ceramic tea cups.", priceEURCents: 2900, priceAUDCents: 4700 },
  { name: "Embroidered Vest", description: "Traditional vest with detailed embroidered panels.", priceEURCents: 7200, priceAUDCents: 11800 },
  { name: "Turquoise Ring", description: "Handcrafted ring set with a turquoise stone.", priceEURCents: 4800, priceAUDCents: 7900 },
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  for (const [index, product] of products.entries()) {
    const slug = slugify(product.name);
    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name: product.name,
        description: product.description,
        imageUrl: `https://picsum.photos/seed/hazara-${index + 1}/600/600`,
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
