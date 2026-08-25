"use client";

import { useState } from "react";
import { PhotoTile } from "@/components/photo-tile";
import type { GalleryPhoto } from "@/lib/gallery-data";

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openPhoto = openIndex !== null ? photos[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group text-left"
          >
            <PhotoTile
              photo={photo}
              index={index}
              className="aspect-square w-full transition duration-300 group-hover:scale-[1.02]"
            />
            <div className="pt-3">
              <p className="text-xs font-medium uppercase tracking-wide text-accent-600">
                {photo.category}
              </p>
              <h3 className="text-sm text-brand-800">{photo.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {openPhoto && openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/80 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <div className="relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute -top-10 right-0 text-sm text-brand-50 hover:text-accent-300"
            >
              Close ✕
            </button>

            <PhotoTile photo={openPhoto} index={openIndex} className="aspect-[4/3] w-full" />

            <div className="mt-4 text-center text-brand-50">
              <p className="text-xs font-medium uppercase tracking-wide text-accent-300">
                {openPhoto.category}
              </p>
              <h3 className="font-display text-xl">{openPhoto.title}</h3>
              <p className="mx-auto mt-1 max-w-md text-sm text-brand-200">{openPhoto.caption}</p>
            </div>

            <div className="mt-4 flex justify-center gap-6 text-sm text-brand-100">
              <button
                type="button"
                onClick={() => setOpenIndex((openIndex - 1 + photos.length) % photos.length)}
                className="hover:text-accent-300"
              >
                ← Previous
              </button>
              <button
                type="button"
                onClick={() => setOpenIndex((openIndex + 1) % photos.length)}
                className="hover:text-accent-300"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
