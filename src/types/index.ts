export type UserRole = "cliente" | "empleado" | "admin";

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
}

export type Categoria =
  | "frutas-acidas"
  | "bebidas"
  | "dulces"
  | "conservas"
  | "snacks";

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  stock: number;
  imagen: string;
  acidez: "baja" | "media" | "alta";
  destacado?: boolean;
}

export interface Proveedor {
  id: string;
  nombre: string;
  contacto: string;
  telefono: string;
  productos: string[];
  activo: boolean;
}

export interface Venta {
  id: string;
  fecha: string;
  productos: { productoId: string; cantidad: number; precio: number }[];
  total: number;
  empleado: string;
  cliente?: string;
}

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

export interface ContactoForm {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}
