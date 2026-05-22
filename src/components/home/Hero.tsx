import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-mango-50 via-white to-lime-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-mango-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-lime-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-mango-100 px-4 py-1.5 text-sm font-medium text-mango-700 mb-6">
              <Sparkles className="h-4 w-4" />
              Productos ácidos de calidad
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              El sabor ácido que{" "}
              <span className="bg-gradient-to-r from-mango-500 to-lime-500 bg-clip-text text-transparent">
                enamora
              </span>
            </h1>
            <p className="mt-6 text-lg text-stone-600 leading-relaxed max-w-lg">
              En Maracumango encontrarás mangos biche, maracuyá, uchuvas y más.
              Compra rápido, gestiona fácil y disfruta desde cualquier dispositivo.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/catalogo">
                <Button size="lg">
                  Ver catálogo
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/productos">
                <Button variant="outline" size="lg">
                  Explorar productos
                </Button>
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { value: "50+", label: "Productos" },
                { value: "100%", label: "Frescos" },
                { value: "24h", label: "Pedidos" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <dt className="text-2xl font-bold text-mango-600">{stat.value}</dt>
                  <dd className="text-xs text-stone-500 font-medium">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-mango-400 to-lime-400 rotate-6 opacity-20" />
              <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[2rem] bg-white shadow-2xl shadow-mango-500/10 border border-orange-100 p-8">
                <div className="grid grid-cols-3 gap-4 text-6xl sm:text-7xl">
                  {["🥭", "🍋", "🍒", "🍹", "🌶️", "🍬"].map((emoji, i) => (
                    <span
                      key={i}
                      className="flex items-center justify-center rounded-2xl bg-stone-50 p-2 hover:scale-110 transition-transform"
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-center text-sm font-medium text-stone-500">
                  Frutas · Bebidas · Dulces · Snacks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
