import { Suspense } from "react";
import { CatalogPageClient } from "@/components/catalog/CatalogPageClient";

export const metadata = {
  title: "Catálogo",
};

export default function CatalogoPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-stone-500">
          Cargando catálogo...
        </div>
      }
    >
      <CatalogPageClient />
    </Suspense>
  );
}
