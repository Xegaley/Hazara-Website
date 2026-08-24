"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Currency } from "@/lib/currency";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  imageUrl: string;
  priceEURCents: number;
  priceAUDCents: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "hazara-cart";
const CURRENCY_KEY = "hazara-currency";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currency, setCurrencyState] = useState<Currency>("EUR");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(CART_KEY);
      if (storedItems) setItems(JSON.parse(storedItems));
      const storedCurrency = localStorage.getItem(CURRENCY_KEY);
      if (storedCurrency === "EUR" || storedCurrency === "AUD") {
        setCurrencyState(storedCurrency);
      }
    } catch {
      // ignore corrupted local storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CURRENCY_KEY, currency);
  }, [currency, hydrated]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      currency,
      setCurrency: setCurrencyState,
      addItem: (item, quantity = 1) => {
        setItems((prev) => {
          const existing = prev.find((i) => i.productId === item.productId);
          if (existing) {
            return prev.map((i) =>
              i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i
            );
          }
          return [...prev, { ...item, quantity }];
        });
      },
      removeItem: (productId) => {
        setItems((prev) => prev.filter((i) => i.productId !== productId));
      },
      setQuantity: (productId, quantity) => {
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((i) => i.productId !== productId)
            : prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
        );
      },
      clear: () => setItems([]),
    }),
    [items, currency]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
