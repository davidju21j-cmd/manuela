"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { useProductFilters } from "@/hooks/useProductFilters";
import { productos } from "@/data/products";
import type { Categoria } from "@/types";

export function CatalogPageClient() {
  const searchParams = useSearchParams();
  const filters = useProductFilters(productos);

  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (
      cat &&
      ["frutas-acidas", "bebidas", "dulces", "conservas", "snacks"].includes(cat)
    ) {
      filters.setCategoria(cat as Categoria);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Catálogo</h1>
        <p className="mt-2 text-stone-600">
          Todos nuestros productos ácidos en un solo lugar
        </p>
      </div>

      <div className="mb-8">
        <ProductFilters
          search={filters.search}
          onSearchChange={filters.setSearch}
          categoria={filters.categoria}
          onCategoriaChange={filters.setCategoria}
          acidez={filters.acidez}
          onAcidezChange={filters.setAcidez}
          sortBy={filters.sortBy}
          onSortChange={filters.setSortBy}
          resultCount={filters.filtered.length}
        />
      </div>

      {filters.filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 py-16 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium text-stone-700">No encontramos productos</p>
          <p className="text-sm text-stone-500 mt-1">
            Prueba con otros filtros o términos de búsqueda
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filters.filtered.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
