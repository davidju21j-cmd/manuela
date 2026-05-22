"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { CATEGORIAS } from "@/lib/constants";
import type { Categoria } from "@/types";

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categoria: Categoria | "todas";
  onCategoriaChange: (value: Categoria | "todas") => void;
  acidez: "todas" | "baja" | "media" | "alta";
  onAcidezChange: (value: "todas" | "baja" | "media" | "alta") => void;
  sortBy: "nombre" | "precio-asc" | "precio-desc";
  onSortChange: (value: "nombre" | "precio-asc" | "precio-desc") => void;
  resultCount: number;
}

export function ProductFilters({
  search,
  onSearchChange,
  categoria,
  onCategoriaChange,
  acidez,
  onAcidezChange,
  sortBy,
  onSortChange,
  resultCount,
}: ProductFiltersProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-stone-100 bg-white p-4 sm:p-6 shadow-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
        <input
          type="search"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm focus:border-mango-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-mango-400/20"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoriaChange("todas")}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            categoria === "todas"
              ? "bg-mango-500 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          Todas
        </button>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoriaChange(cat.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              categoria === cat.id
                ? "bg-mango-500 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal className="h-4 w-4 text-stone-400" />
          <select
            value={acidez}
            onChange={(e) =>
              onAcidezChange(e.target.value as "todas" | "baja" | "media" | "alta")
            }
            className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm focus:border-mango-400 focus:outline-none focus:ring-2 focus:ring-mango-400/20"
          >
            <option value="todas">Toda acidez</option>
            <option value="baja">Suave</option>
            <option value="media">Equilibrada</option>
            <option value="alta">Intensa</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as "nombre" | "precio-asc" | "precio-desc")
            }
            className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm focus:border-mango-400 focus:outline-none focus:ring-2 focus:ring-mango-400/20"
          >
            <option value="nombre">Nombre A-Z</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
          </select>
        </div>
        <p className="text-sm text-stone-500">
          <span className="font-semibold text-stone-700">{resultCount}</span> productos
        </p>
      </div>
    </div>
  );
}
