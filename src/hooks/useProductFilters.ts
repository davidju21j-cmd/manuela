"use client";

import { useMemo, useState } from "react";
import type { Categoria, Producto } from "@/types";

export function useProductFilters(productos: Producto[]) {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState<Categoria | "todas">("todas");
  const [acidez, setAcidez] = useState<"todas" | Producto["acidez"]>("todas");
  const [sortBy, setSortBy] = useState<"nombre" | "precio-asc" | "precio-desc">(
    "nombre"
  );

  const filtered = useMemo(() => {
    let result = [...productos];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q)
      );
    }

    if (categoria !== "todas") {
      result = result.filter((p) => p.categoria === categoria);
    }

    if (acidez !== "todas") {
      result = result.filter((p) => p.acidez === acidez);
    }

    result.sort((a, b) => {
      if (sortBy === "precio-asc") return a.precio - b.precio;
      if (sortBy === "precio-desc") return b.precio - a.precio;
      return a.nombre.localeCompare(b.nombre, "es");
    });

    return result;
  }, [productos, search, categoria, acidez, sortBy]);

  return {
    search,
    setSearch,
    categoria,
    setCategoria,
    acidez,
    setAcidez,
    sortBy,
    setSortBy,
    filtered,
  };
}
