"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Producto } from "@/types";
import { formatPrecio } from "@/data/products";
import { ACIDEZ_LABELS, CATEGORIAS } from "@/lib/constants";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  producto: Producto;
  compact?: boolean;
}

export function ProductCard({ producto, compact }: ProductCardProps) {
  const { addItem } = useCart();
  const categoriaLabel = CATEGORIAS.find((c) => c.id === producto.categoria)?.label;
  const acidez = ACIDEZ_LABELS[producto.acidez];

  return (
    <article
      className={cn(
        "group flex flex-col rounded-2xl border border-stone-100 bg-white shadow-sm hover:shadow-lg hover:border-mango-200 transition-all duration-300 overflow-hidden",
        compact && "text-sm"
      )}
    >
      <Link href={`/producto/${producto.id}`} className="block">
        <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-mango-50 to-lime-50 text-6xl group-hover:scale-[1.02] transition-transform">
          {producto.destacado && (
            <span className="absolute top-3 left-3 rounded-full bg-mango-500 px-2.5 py-0.5 text-xs font-bold text-white">
              Destacado
            </span>
          )}
          <span role="img" aria-label={producto.nombre}>
            {producto.imagen}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
            {categoriaLabel}
          </span>
          <span className={cn("rounded-md px-2 py-0.5 text-xs font-medium", acidez.color)}>
            {acidez.label}
          </span>
        </div>

        <Link href={`/producto/${producto.id}`}>
          <h3 className="font-semibold text-stone-900 group-hover:text-mango-600 transition-colors line-clamp-2">
            {producto.nombre}
          </h3>
        </Link>

        {!compact && (
          <p className="mt-1 text-sm text-stone-500 line-clamp-2 flex-1">
            {producto.descripcion}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-mango-600">
            {formatPrecio(producto.precio)}
          </span>
          <span
            className={cn(
              "text-xs font-medium",
              producto.stock > 10 ? "text-lime-600" : "text-orange-600"
            )}
          >
            {producto.stock > 0 ? `${producto.stock} disp.` : "Agotado"}
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            fullWidth
            disabled={producto.stock === 0}
            onClick={() => addItem(producto)}
          >
            <ShoppingCart className="h-4 w-4" />
            Agregar
          </Button>
        </div>
      </div>
    </article>
  );
}
