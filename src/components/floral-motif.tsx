// Stylized 8-petal rosette, the kind of geometric floral motif common in
// Central Asian suzani embroidery (a tradition shared across the wider
// region including Hazara craftwork) — reduced to simple strokes so it
// stays legible at small sizes rather than reading as a photo-real flower.
function Rosette({ scale = 1 }: { scale?: number }) {
  return (
    <g>
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          rx={1.7 * scale}
          ry={4.2 * scale}
          transform={`rotate(${i * 45})`}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.8 * scale}
        />
      ))}
      <circle r={1 * scale} fill="currentColor" />
    </g>
  );
}

export function FloralMotif({
  className = "",
  tone = "text-accent-500",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <svg viewBox="-12 -12 24 24" className={`${tone} ${className}`} aria-hidden="true">
      <Rosette scale={1.6} />
    </svg>
  );
}

// A repeating floral vine border: a gentle wave with a small rosette at each
// crest, the kind of banding used to frame suzani embroidery panels. Height
// is taller than a plain rule so it reads as an intentional motif, not a
// hairline. `id` must be unique per instance on the page (SVG <pattern> ids
// are document-scoped).
export function FloralDivider({
  id,
  className = "",
  tone = "text-accent-400",
}: {
  id: string;
  className?: string;
  tone?: string;
}) {
  return (
    <svg className={`h-7 w-full ${tone} ${className}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={id} width="48" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M-4 14 Q8 3 20 14 Q32 25 44 14 Q56 3 68 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.55"
          />
          <g transform="translate(8 8)">
            <Rosette scale={0.85} />
          </g>
          <g transform="translate(32 20)">
            <Rosette scale={0.85} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="28" fill={`url(#${id})`} />
    </svg>
  );
}

// A very low-contrast field of rosettes meant as a background texture
// behind a hero/section — large scale, low opacity, non-repeating visual
// noise avoided by keeping the tile simple. Renders absolutely positioned;
// the parent needs `relative` and content needs `relative z-10`.
export function FloralField({
  id,
  className = "",
  tone = "text-accent-500",
}: {
  id: string;
  className?: string;
  tone?: string;
}) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-[0.07] ${tone} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="72" height="72" patternUnits="userSpaceOnUse">
          <g transform="translate(36 36)">
            <Rosette scale={2.2} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
