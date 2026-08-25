export type GalleryPhoto = {
  id: string;
  title: string;
  category: string;
  caption: string;
  // Drop a file in public/gallery and set this to swap in a real photo —
  // until then PhotoTile renders a generated placeholder instead.
  imageUrl?: string;
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "embroidery-1",
    title: "Suzani panel, in progress",
    category: "Embroidery",
    caption: "Hand-stitched rosette motifs on cotton, worked one panel at a time.",
  },
  {
    id: "weaving-1",
    title: "Loom setup",
    category: "Weaving",
    caption: "Warp threads tensioned before the first pass of the weft.",
  },
  {
    id: "metalwork-1",
    title: "Engraved plate",
    category: "Metalwork",
    caption: "Traditional hand-engraving on a copper blank.",
  },
  {
    id: "workshop-1",
    title: "The workshop",
    category: "Workshop",
    caption: "Where each piece starts, long before it reaches the shop.",
  },
  {
    id: "materials-1",
    title: "Thread and dye",
    category: "Materials",
    caption: "Natural dyes prepared for a new run of embroidery thread.",
  },
  {
    id: "finished-1",
    title: "Finished pieces",
    category: "Finished pieces",
    caption: "A completed batch, laid out for a final quality check.",
  },
  {
    id: "embroidery-2",
    title: "Detail stitching",
    category: "Embroidery",
    caption: "Close work on the border of a suzani-style panel.",
  },
  {
    id: "weaving-2",
    title: "Finished cloth",
    category: "Weaving",
    caption: "A woven length coming off the loom, still uncut.",
  },
  {
    id: "metalwork-2",
    title: "Hand tools",
    category: "Metalwork",
    caption: "The engraving tools used to trace each pattern by hand.",
  },
];
