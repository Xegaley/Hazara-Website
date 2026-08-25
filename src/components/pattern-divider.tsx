// Repeating diamond-lattice motif, evoking the geometric borders common in
// Central Asian / Hazara textile and embroidery work. Kept small and
// low-contrast so it reads as a texture, not decoration competing with the
// content — a single `id` prop keeps multiple instances on one page from
// clashing (SVG <pattern> ids must be unique per document).
export function PatternDivider({
  id,
  className = "",
  tone = "text-brand-300",
}: {
  id: string;
  className?: string;
  tone?: string;
}) {
  return (
    <svg
      className={`h-3 w-full ${tone} ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="24" height="12" patternUnits="userSpaceOnUse">
          <path
            d="M0 6 L6 0 L12 6 L6 12 Z M12 6 L18 0 L24 6 L18 12 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill={`url(#${id})`} />
    </svg>
  );
}
