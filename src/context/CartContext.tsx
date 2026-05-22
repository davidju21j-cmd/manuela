"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CarritoItem, Producto } from "@/types";

interface CartContextValue {
  items: CarritoItem[];
  totalItems: number;
  totalPrecio: number;
  addItem: (producto: Producto, cantidad?: number) => void;
  removeItem: (productoId: string) => void;
  updateQuantity: (productoId: string, cantidad: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "maracumango-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CarritoItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as CarritoItem[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((producto: Producto, cantidad = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.producto.id === producto.id);
      if (existing) {
        const newQty = Math.min(existing.cantidad + cantidad, producto.stock);
        return prev.map((i) =>
          i.producto.id === producto.id ? { ...i, cantidad: newQty } : i
        );
      }
      return [...prev, { producto, cantidad: Math.min(cantidad, producto.stock) }];
    });
  }, []);

  const removeItem = useCallback((productoId: string) => {
    setItems((prev) => prev.filter((i) => i.producto.id !== productoId));
  }, []);

  const updateQuantity = useCallback((productoId: string, cantidad: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.producto.id !== productoId) return i;
          if (cantidad <= 0) return null;
          return {
            ...i,
            cantidad: Math.min(cantidad, i.producto.stock),
          };
        })
        .filter(Boolean) as CarritoItem[]
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.cantidad, 0),
    [items]
  );

  const totalPrecio = useMemo(
    () => items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      totalItems,
      totalPrecio,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, totalItems, totalPrecio, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
