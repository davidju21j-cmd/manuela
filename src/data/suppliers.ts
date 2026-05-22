import type { Proveedor } from "@/types";

export const proveedores: Proveedor[] = [
  {
    id: "p1",
    nombre: "Frutas del Valle S.A.S",
    contacto: "Carlos Méndez",
    telefono: "+57 300 123 4567",
    productos: ["Mango Biche", "Uchuva", "Mix Frutas"],
    activo: true,
  },
  {
    id: "p2",
    nombre: "Bebidas Tropicales",
    contacto: "Ana Rodríguez",
    telefono: "+57 310 987 6543",
    productos: ["Limonada Maracuyá", "Agua Tamarindo", "Granizado Lulo"],
    activo: true,
  },
  {
    id: "p3",
    nombre: "Dulces Ácidos Colombia",
    contacto: "Luis Pérez",
    telefono: "+57 320 555 1234",
    productos: ["Gomitas Mix", "Paleta Mango"],
    activo: true,
  },
  {
    id: "p4",
    nombre: "Conservas La Abuela",
    contacto: "María Gómez",
    telefono: "+57 315 444 7890",
    productos: ["Encurtido Habanero", "Mermelada Piña"],
    activo: false,
  },
];
