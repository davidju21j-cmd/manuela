"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import type { Producto } from "@/types";
import { formatPrecio } from "@/data/products";
import { ACIDEZ_LABELS, CATEGORIAS } from "@/lib/constants";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";

interface ProductDetailClientProps {
  producto: Producto;
}

export function ProductDetailClient({ producto }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const categoriaLabel = CATEGORIAS.find((c) => c.id === producto.categoria)?.label;
  const acidez = ACIDEZ_LABELS[producto.acidez];

  const handleAdd = () => {
    addItem(producto, cantidad);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/catalogo"
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-mango-600 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al catálogo
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex aspect-square max-h-[480px] items-center justify-center rounded-3xl bg-gradient-to-br from-mango-50 to-lime-50 text-[8rem] sm:text-[10rem] shadow-inner border border-orange-100">
          <span role="img" aria-label={producto.nombre}>
            {producto.imagen}
          </span>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="rounded-lg bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700">
              {categoriaLabel}
            </span>
            <span className={`rounded-lg px-3 py-1 text-sm font-medium ${acidez.color}`}>
              Acidez {acidez.label}
            </span>
            {producto.destacado && (
              <span className="rounded-lg bg-mango-500 px-3 py-1 text-sm font-bold text-white">
                Destacado
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
            {producto.nombre}
          </h1>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            {producto.descripcion}
          </p>

          <p className="mt-6 text-3xl font-bold text-mango-600">
            {formatPrecio(producto.precio)}
          </p>

          <p className="mt-2 text-sm text-stone-500">
            {producto.stock > 0
              ? `${producto.stock} unidades disponibles`
              : "Producto agotado"}
          </p>

          {producto.stock > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-xl border border-stone-200 bg-white">
                <button
                  type="button"
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  className="flex h-12 w-12 items-center justify-center text-stone-600 hover:bg-stone-50 rounded-l-xl"
                  aria-label="Disminuir"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-semibold">{cantidad}</span>
                <button
                  type="button"
                  onClick={() =>
                    setCantidad((c) => Math.min(producto.stock, c + 1))
                  }
                  className="flex h-12 w-12 items-center justify-center text-stone-600 hover:bg-stone-50 rounded-r-xl"
                  aria-label="Aumentar"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button size="lg" onClick={handleAdd}>
                <ShoppingCart className="h-5 w-5" />
                Agregar al carrito
              </Button>
            </div>
          )}

          <div className="mt-10 rounded-2xl bg-stone-50 p-6 border border-stone-100">
            <h2 className="font-semibold text-stone-900 mb-2">Información</h2>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>• Producto 100% seleccionado para Maracumango</li>
              <li>• Ideal para quienes disfrutan sabores ácidos y frescos</li>
              <li>• Retiro en tienda o entrega según disponibilidad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
