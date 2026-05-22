"use client";

import { useState } from "react";
import {
  Package,
  DollarSign,
  Truck,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { productos, formatPrecio } from "@/data/products";
import { proveedores } from "@/data/suppliers";
import { ventas } from "@/data/sales";
import { useAuth } from "@/context/AuthContext";
import { StatCard } from "./StatCard";
import { CATEGORIAS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Tab = "resumen" | "inventario" | "ventas" | "proveedores";

export function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("resumen");
  const [inventario, setInventario] = useState(productos);

  const totalVentas = ventas.reduce((s, v) => s + v.total, 0);
  const stockBajo = inventario.filter((p) => p.stock < 30);
  const proveedoresActivos = proveedores.filter((p) => p.activo).length;

  const tabs: { id: Tab; label: string }[] = [
    { id: "resumen", label: "Resumen" },
    { id: "inventario", label: "Inventario" },
    { id: "ventas", label: "Ventas" },
    { id: "proveedores", label: "Proveedores" },
  ];

  const updateStock = (id: string, delta: number) => {
    setInventario((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, stock: Math.max(0, p.stock + delta) }
          : p
      )
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Panel de administración</h1>
        <p className="mt-1 text-stone-600">
          Bienvenido, {user?.nombre}. Gestiona inventario, ventas y proveedores.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 border-b border-stone-100 pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              tab === t.id
                ? "bg-mango-500 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "resumen" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Productos"
              value={inventario.length}
              subtitle="En catálogo"
              icon={Package}
              color="mango"
            />
            <StatCard
              title="Ventas (demo)"
              value={formatPrecio(totalVentas)}
              subtitle={`${ventas.length} transacciones`}
              icon={DollarSign}
              color="lime"
            />
            <StatCard
              title="Proveedores activos"
              value={proveedoresActivos}
              icon={Truck}
              color="blue"
            />
            <StatCard
              title="Stock bajo"
              value={stockBajo.length}
              subtitle="Menos de 30 uds."
              icon={AlertTriangle}
              color="red"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
              <h2 className="font-semibold text-stone-900 flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-mango-500" />
                Últimas ventas
              </h2>
              <ul className="space-y-3">
                {ventas.slice(0, 5).map((v) => (
                  <li
                    key={v.id}
                    className="flex justify-between text-sm border-b border-stone-50 pb-2 last:border-0"
                  >
                    <span className="text-stone-600">{v.fecha} · {v.empleado}</span>
                    <span className="font-semibold text-mango-600">
                      {formatPrecio(v.total)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
              <h2 className="font-semibold text-stone-900 mb-4">Alertas de inventario</h2>
              {stockBajo.length === 0 ? (
                <p className="text-sm text-stone-500">Todo el stock está en niveles normales.</p>
              ) : (
                <ul className="space-y-2">
                  {stockBajo.map((p) => (
                    <li
                      key={p.id}
                      className="flex justify-between text-sm rounded-lg bg-orange-50 px-3 py-2"
                    >
                      <span>{p.imagen} {p.nombre}</span>
                      <span className="font-medium text-orange-700">{p.stock} uds.</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}

      {tab === "inventario" && (
        <div className="rounded-2xl border border-stone-100 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-stone-700">Producto</th>
                  <th className="px-4 py-3 font-semibold text-stone-700">Categoría</th>
                  <th className="px-4 py-3 font-semibold text-stone-700">Precio</th>
                  <th className="px-4 py-3 font-semibold text-stone-700">Stock</th>
                  <th className="px-4 py-3 font-semibold text-stone-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {inventario.map((p) => {
                  const cat = CATEGORIAS.find((c) => c.id === p.categoria)?.label;
                  return (
                    <tr key={p.id} className="border-t border-stone-50 hover:bg-stone-50/50">
                      <td className="px-4 py-3">
                        <span className="mr-2">{p.imagen}</span>
                        {p.nombre}
                      </td>
                      <td className="px-4 py-3 text-stone-600">{cat}</td>
                      <td className="px-4 py-3 font-medium">{formatPrecio(p.precio)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "font-semibold",
                            p.stock < 30 ? "text-orange-600" : "text-lime-600"
                          )}
                        >
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => updateStock(p.id, -1)}
                            className="h-8 w-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-sm font-bold"
                          >
                            −
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStock(p.id, 1)}
                            className="h-8 w-8 rounded-lg bg-mango-100 hover:bg-mango-200 text-sm font-bold text-mango-700"
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "ventas" && (
        <div className="rounded-2xl border border-stone-100 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Fecha</th>
                  <th className="px-4 py-3 font-semibold">Empleado</th>
                  <th className="px-4 py-3 font-semibold">Cliente</th>
                  <th className="px-4 py-3 font-semibold">Items</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((v) => (
                  <tr key={v.id} className="border-t border-stone-50">
                    <td className="px-4 py-3 font-mono text-xs">{v.id}</td>
                    <td className="px-4 py-3">{v.fecha}</td>
                    <td className="px-4 py-3">{v.empleado}</td>
                    <td className="px-4 py-3 text-stone-500">{v.cliente ?? "—"}</td>
                    <td className="px-4 py-3">{v.productos.length}</td>
                    <td className="px-4 py-3 font-bold text-mango-600">
                      {formatPrecio(v.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="p-4 text-xs text-stone-500 border-t border-stone-50">
            Registro de ventas en modo demo. Conectar API para persistencia real.
          </p>
        </div>
      )}

      {tab === "proveedores" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {proveedores.map((prov) => (
            <div
              key={prov.id}
              className={cn(
                "rounded-2xl border p-5 shadow-sm",
                prov.activo
                  ? "border-stone-100 bg-white"
                  : "border-stone-200 bg-stone-50 opacity-75"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-stone-900">{prov.nombre}</h3>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    prov.activo
                      ? "bg-lime-100 text-lime-700"
                      : "bg-stone-200 text-stone-600"
                  )}
                >
                  {prov.activo ? "Activo" : "Inactivo"}
                </span>
              </div>
              <p className="text-sm text-stone-600">{prov.contacto}</p>
              <p className="text-sm text-stone-500">{prov.telefono}</p>
              <p className="mt-3 text-xs text-stone-500">
                Productos: {prov.productos.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
