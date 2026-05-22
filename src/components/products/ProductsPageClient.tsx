"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { useProductFilters } from "@/hooks/useProductFilters";
import { productos } from "@/data/products";

export function ProductsPageClient() {
  const filters = useProductFilters(productos);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-lime-500 to-mango-500 p-6 sm:p-8 text-white">
        <h1 className="text-3xl font-bold">Encuentra tu producto</h1>
        <p className="mt-2 text-lime-50 max-w-2xl">
          Vista pensada para clientes: busca, filtra por categoría y acidez, y
          agrega al carrito en segundos.
        </p>
      </div>

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

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filters.filtered.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
}
