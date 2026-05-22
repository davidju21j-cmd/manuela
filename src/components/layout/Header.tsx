"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const dashboardHref =
    user?.rol === "admin"
      ? "/admin"
      : user?.rol === "empleado"
        ? "/empleado"
        : null;

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-mango-400 to-lime-500 text-xl shadow-md">
            🥭
          </span>
          <div className="hidden sm:block">
            <span className="block text-lg font-bold text-stone-900 leading-tight">
              Maracumango
            </span>
            <span className="block text-xs text-mango-600 font-medium">
              Sabores ácidos
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-mango-100 text-mango-700"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {dashboardHref && (
            <Link
              href={dashboardHref}
              className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50"
            >
              <LayoutDashboard className="h-4 w-4" />
              Panel
            </Link>
          )}

          <Link
            href="/carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-mango-50 text-mango-600 hover:bg-mango-100 transition-colors"
            aria-label="Carrito"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-lime-500 text-[10px] font-bold text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-stone-600 max-w-[120px] truncate">
                {user.nombre.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-stone-500 hover:bg-stone-100"
                aria-label="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
              aria-label="Iniciar sesión"
            >
              <User className="h-5 w-5" />
            </Link>
          )}

          <button
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl bg-stone-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-stone-100 bg-white px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "block rounded-lg px-4 py-3 text-sm font-medium",
                pathname === link.href
                  ? "bg-mango-100 text-mango-700"
                  : "text-stone-700 hover:bg-stone-50"
              )}
            >
              {link.label}
            </Link>
          ))}
          {dashboardHref && (
            <Link
              href={dashboardHref}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              Panel de control
            </Link>
          )}
          <Link
            href={user ? "/productos" : "/login"}
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            {user ? "Mi cuenta" : "Iniciar sesión"}
          </Link>
        </nav>
      )}
    </header>
  );
}
