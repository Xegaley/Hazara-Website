import Image from "next/image";
import { FloralMotif } from "@/components/floral-motif";
import type { GalleryPhoto } from "@/lib/gallery-data";

// Cycled by index so neighboring tiles never share the same gradient.
const PALETTES = [
  "from-brand-300 to-accent-500",
  "from-accent-300 to-brand-500",
  "from-brand-200 to-brand-500",
  "from-accent-100 to-accent-600",
];

export function PhotoTile({
  photo,
  index,
  className = "",
}: {
  photo: GalleryPhoto;
  index: number;
  className?: string;
}) {
  if (photo.imageUrl) {
    return (
      <div className={`relative overflow-hidden rounded-md bg-brand-100 ${className}`}>
        <Image
          src={photo.imageUrl}
          alt={photo.title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }

  const palette = PALETTES[index % PALETTES.length];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-br ${palette} ${className}`}
    >
      <FloralMotif className="h-12 w-12 text-white/70" />
    </div>
  );
}
