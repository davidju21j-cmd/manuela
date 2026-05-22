import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { productos } from "@/data/products";
import { CATEGORIAS } from "@/lib/constants";

export default function HomePage() {
  const destacados = productos.filter((p) => p.destacado).slice(0, 4);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900">Categorías</h2>
          <p className="mt-2 text-stone-600">Explora por tipo de producto</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIAS.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogo?categoria=${cat.id}`}
              className="group flex flex-col items-center rounded-2xl border border-stone-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-mango-200 transition-all"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {cat.emoji}
              </span>
              <span className="font-semibold text-stone-800 text-sm text-center">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-mango-50/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-stone-900">Destacados</h2>
              <p className="mt-2 text-stone-600">Los favoritos de nuestros clientes</p>
            </div>
            <Link href="/catalogo">
              <Button variant="outline">
                Ver todo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destacados.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-mango-500 to-lime-500 p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold">¿Listo para probar algo ácido?</h2>
          <p className="mt-3 text-mango-50 max-w-xl mx-auto">
            Regístrate gratis, arma tu carrito y recibe tus productos frescos.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/registro">
              <Button
                size="lg"
                className="!bg-white !text-mango-600 hover:!bg-mango-50"
              >
                Crear cuenta
              </Button>
            </Link>
            <Link href="/contacto">
              <Button
                variant="outline"
                size="lg"
                className="!border-white !text-white hover:!bg-white/10"
              >
                Contáctanos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
