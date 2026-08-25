import { FloralMotif, FloralField } from "@/components/floral-motif";
import { PhotoGallery } from "@/components/photo-gallery";
import { galleryPhotos } from "@/lib/gallery-data";

export default function GalleryPage() {
  return (
    <div>
      <div className="relative -mx-4 mb-14 overflow-hidden px-4 py-10 sm:-mx-6 sm:px-6">
        <FloralField id="gallery-hero-field" />
        <div className="relative z-10 mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-600">
            Behind the craft
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <FloralMotif className="h-10 w-10 text-accent-400" />
            <h1 className="font-display text-4xl text-brand-900">Gallery</h1>
            <FloralMotif className="h-10 w-10 text-accent-400" />
          </div>
          <p className="mx-auto mt-4 max-w-sm text-brand-600">
            A look at the techniques, materials, and workshop behind each piece —
            embroidery, weaving, and metalwork.
          </p>
        </div>
      </div>
      <PhotoGallery photos={galleryPhotos} />
    </div>
  );
}
