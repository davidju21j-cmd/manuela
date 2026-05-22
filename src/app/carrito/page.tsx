"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrecio } from "@/data/products";
import { Button } from "@/components/ui/Button";

export default function CarritoPage() {
  const { items, totalPrecio, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mango-100 text-4xl mb-6">
          🛒
        </div>
        <h1 className="text-2xl font-bold text-stone-900">Tu carrito está vacío</h1>
        <p className="mt-2 text-stone-600">
          Explora nuestro catálogo y agrega productos ácidos
        </p>
        <Link href="/catalogo" className="inline-block mt-6">
          <Button>Ir al catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">Carrito de compras</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.producto.id}
              className="flex gap-4 rounded-2xl border border-stone-100 bg-white p-4 shadow-sm"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-mango-50 to-lime-50 text-3xl">
                {item.producto.imagen}
              </div>
              <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/producto/${item.producto.id}`}
                    className="font-semibold text-stone-900 hover:text-mango-600 line-clamp-1"
                  >
                    {item.producto.nombre}
                  </Link>
                  <p className="text-sm text-mango-600 font-medium">
                    {formatPrecio(item.producto.precio)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-lg border border-stone-200">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.producto.id, item.cantidad - 1)
                      }
                      className="flex h-9 w-9 items-center justify-center hover:bg-stone-50"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.cantidad}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.producto.id, item.cantidad + 1)
                      }
                      className="flex h-9 w-9 items-center justify-center hover:bg-stone-50"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.producto.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="font-bold text-stone-900 sm:w-28 sm:text-right">
                  {formatPrecio(item.producto.precio * item.cantidad)}
                </p>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-stone-500 hover:text-red-600"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm h-fit sticky top-24">
          <h2 className="font-semibold text-stone-900 mb-4">Resumen</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span>{formatPrecio(totalPrecio)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Envío</span>
              <span className="text-lime-600 font-medium">Por calcular</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between">
            <span className="font-bold text-stone-900">Total</span>
            <span className="font-bold text-xl text-mango-600">
              {formatPrecio(totalPrecio)}
            </span>
          </div>
          <Button fullWidth size="lg" className="mt-6">
            <ShoppingBag className="h-5 w-5" />
            Finalizar compra
          </Button>
          <p className="mt-3 text-xs text-center text-stone-500">
            Demo: el pago no está conectado a pasarela real
          </p>
        </div>
      </div>
    </div>
  );
}
