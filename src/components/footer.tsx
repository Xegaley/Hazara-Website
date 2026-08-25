import { PatternDivider } from "@/components/pattern-divider";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-200">
      <PatternDivider id="footer-pattern" tone="text-accent-300" />
      <div className="mx-auto max-w-6xl px-4 py-10 text-center">
        <p className="font-display text-lg text-brand-800">Hazara</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-brand-600">
          Handcrafted pieces made with techniques and motifs drawn from Hazara textile
          traditions — embroidery, weaving, and metalwork passed down through generations.
        </p>
      </div>
    </footer>
  );
}
