import type { Venta } from "@/types";

export const ventas: Venta[] = [
  {
    id: "v1",
    fecha: "2026-05-20",
    productos: [
      { productoId: "1", cantidad: 2, precio: 12500 },
      { productoId: "3", cantidad: 1, precio: 6500 },
    ],
    total: 31500,
    empleado: "Juan Torres",
    cliente: "Cliente walk-in",
  },
  {
    id: "v2",
    fecha: "2026-05-20",
    productos: [{ productoId: "2", cantidad: 3, precio: 8500 }],
    total: 25500,
    empleado: "Laura Vega",
  },
  {
    id: "v3",
    fecha: "2026-05-19",
    productos: [
      { productoId: "6", cantidad: 1, precio: 9800 },
      { productoId: "10", cantidad: 1, precio: 18500 },
    ],
    total: 28300,
    empleado: "Juan Torres",
    cliente: "María López",
  },
  {
    id: "v4",
    fecha: "2026-05-19",
    productos: [{ productoId: "5", cantidad: 4, precio: 7500 }],
    total: 30000,
    empleado: "Laura Vega",
  },
  {
    id: "v5",
    fecha: "2026-05-18",
    productos: [
      { productoId: "9", cantidad: 6, precio: 4500 },
      { productoId: "4", cantidad: 1, precio: 15000 },
    ],
    total: 42000,
    empleado: "Juan Torres",
  },
];
