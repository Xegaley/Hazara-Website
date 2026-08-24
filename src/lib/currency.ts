export type Currency = "EUR" | "AUD";

export const CURRENCIES: Currency[] = ["EUR", "AUD"];

export function formatPrice(cents: number, currency: Currency) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function priceForCurrency(
  product: { priceEURCents: number; priceAUDCents: number },
  currency: Currency
) {
  return currency === "EUR" ? product.priceEURCents : product.priceAUDCents;
}
