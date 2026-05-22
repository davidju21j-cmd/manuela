"use client";

import { useState } from "react";
import { ShoppingCart, Package, ClipboardList } from "lucide-react";
import { productos, formatPrecio } from "@/data/products";
import { ventas } from "@/data/sales";
import { useAuth } from "@/context/AuthContext";
import { StatCard } from "./StatCard";
import { Button } from "@/components/ui/Button";

export function EmployeeDashboard() {
  const { user } = useAuth();
  const [ventaItems, setVentaItems] = useState<
    { productoId: string; nombre: string; cantidad: number; precio: number }[]
  >([]);
  const [mensaje, setMensaje] = useState("");

  const misVentas = ventas.filter((v) =>
    user?.nombre.includes(v.empleado.split(" ")[0] ?? "")
  );

  const agregarAVenta = (productoId: string) => {
    const p = productos.find((x) => x.id === productoId);
    if (!p || p.stock === 0) return;

    setVentaItems((prev) => {
      const existing = prev.find((i) => i.productoId === productoId);
      if (existing) {
        return prev.map((i) =>
          i.productoId === productoId
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      }
      return [
        ...prev,
        {
          productoId: p.id,
          nombre: p.nombre,
          cantidad: 1,
          precio: p.precio,
        },
      ];
    });
  };

  const totalVenta = ventaItems.reduce(
    (s, i) => s + i.precio * i.cantidad,
    0
  );

  const registrarVenta = () => {
    if (ventaItems.length === 0) return;
    setMensaje(
      `Venta registrada por ${formatPrecio(totalVenta)} — ${ventaItems.length} producto(s)`
    );
    setVentaItems([]);
    setTimeout(() => setMensaje(""), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Panel de empleado</h1>
        <p className="mt-1 text-stone-600">
          Hola {user?.nombre}. Registra ventas y consulta inventario.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <StatCard
          title="Productos disponibles"
          value={productos.filter((p) => p.stock > 0).length}
          icon={Package}
          color="lime"
        />
        <StatCard
          title="Ventas recientes"
          value={misVentas.length || ventas.length}
          subtitle="Registro demo"
          icon={ClipboardList}
          color="mango"
        />
        <StatCard
          title="Venta actual"
          value={formatPrecio(totalVenta)}
          subtitle={`${ventaItems.length} items`}
          icon={ShoppingCart}
          color="blue"
        />
      </div>

      {mensaje && (
        <div className="mb-6 rounded-xl bg-lime-100 border border-lime-200 px-4 py-3 text-sm font-medium text-lime-800">
          {mensaje}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-stone-900 mb-4">Registrar venta rápida</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto mb-4">
            {productos.slice(0, 9).map((p) => (
              <button
                key={p.id}
                type="button"
                disabled={p.stock === 0}
                onClick={() => agregarAVenta(p.id)}
                className="flex flex-col items-center rounded-xl border border-stone-100 p-3 hover:border-mango-300 hover:bg-mango-50 disabled:opacity-40 transition-colors text-sm"
              >
                <span className="text-2xl">{p.imagen}</span>
                <span className="mt-1 line-clamp-2 text-center text-xs font-medium">
                  {p.nombre}
                </span>
              </button>
            ))}
          </div>

          {ventaItems.length > 0 && (
            <>
              <ul className="space-y-2 mb-4 border-t border-stone-100 pt-4">
                {ventaItems.map((item) => (
                  <li
                    key={item.productoId}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.nombre} × {item.cantidad}
                    </span>
                    <span className="font-medium">
                      {formatPrecio(item.precio * item.cantidad)}
                    </span>
                  </li>
                ))}
              </ul>
              <Button fullWidth onClick={registrarVenta}>
                Registrar venta ({formatPrecio(totalVenta)})
              </Button>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-stone-900 mb-4">Consulta de inventario</h2>
          <ul className="space-y-2 max-h-80 overflow-y-auto">
            {productos.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between rounded-lg bg-stone-50 px-3 py-2 text-sm"
              >
                <span>
                  {p.imagen} {p.nombre}
                </span>
                <span
                  className={
                    p.stock < 30
                      ? "font-semibold text-orange-600"
                      : "font-medium text-lime-600"
                  }
                >
                  {p.stock}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
