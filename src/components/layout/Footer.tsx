import Link from "next/link";
import { MapPin, Phone, Mail, AtSign } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-orange-100 bg-gradient-to-b from-stone-900 to-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-mango-400 to-lime-500 text-xl">
                🥭
              </span>
              <span className="text-xl font-bold text-white">Maracumango</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
              Tu local de confianza para productos ácidos. Frescura, sabor y
              calidad en cada bocado.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Inicio" },
                { href: "/catalogo", label: "Catálogo" },
                { href: "/productos", label: "Productos" },
                { href: "/contacto", label: "Contacto" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-mango-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Cuenta
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="hover:text-mango-400 transition-colors">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link href="/registro" className="hover:text-mango-400 transition-colors">
                  Registrarse
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="hover:text-mango-400 transition-colors">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-mango-400 mt-0.5" />
                <span>Calle 45 #12-30, Bogotá</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-mango-400" />
                <span>+57 601 234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-mango-400" />
                <span>hola@maracumango.com</span>
              </li>
              <li className="flex items-center gap-2">
                <AtSign className="h-4 w-4 shrink-0 text-mango-400" />
                <span>@maracumango</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-800 pt-8 text-center text-sm text-stone-500">
          © {new Date().getFullYear()} Maracumango. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
