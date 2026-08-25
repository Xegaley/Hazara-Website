import { FloralDivider, FloralMotif } from "@/components/floral-motif";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-200">
      <FloralDivider id="footer-pattern-top" tone="text-accent-400" />
      <div className="mx-auto max-w-6xl px-4 py-10 text-center">
        <div className="flex items-center justify-center gap-3">
          <FloralMotif className="h-4 w-4 text-accent-400" />
          <p className="font-display text-lg text-brand-800">Hazara</p>
          <FloralMotif className="h-4 w-4 text-accent-400" />
        </div>
        <p className="mx-auto mt-3 max-w-md text-sm text-brand-600">
          Handcrafted pieces made with techniques and motifs drawn from Hazara textile
          traditions — embroidery, weaving, and metalwork passed down through generations.
        </p>
      </div>
      <FloralDivider id="footer-pattern-bottom" tone="text-accent-300" />
    </footer>
  );
}
