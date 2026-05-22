import type { Producto } from "@/types";

export const productos: Producto[] = [
  {
    id: "1",
    nombre: "Mango Biche en Almíbar",
    descripcion:
      "Mango verde en almíbar con toque cítrico. Ideal para acompañar comidas o disfrutar solo.",
    precio: 12500,
    categoria: "frutas-acidas",
    stock: 45,
    imagen: "🥭",
    acidez: "alta",
    destacado: true,
  },
  {
    id: "2",
    nombre: "Limonada de Maracuyá",
    descripcion:
      "Bebida refrescante 100% natural con pulpa de maracuyá. Sin conservantes artificiales.",
    precio: 8500,
    categoria: "bebidas",
    stock: 80,
    imagen: "🍹",
    acidez: "alta",
    destacado: true,
  },
  {
    id: "3",
    nombre: "Gomitas Ácidas Mix",
    descripcion:
      "Mezcla de sabores mango, limón y tamarindo. Textura suave con explosión ácida.",
    precio: 6500,
    categoria: "dulces",
    stock: 120,
    imagen: "🍬",
    acidez: "media",
    destacado: true,
  },
  {
    id: "4",
    nombre: "Encurtido de Habanero",
    descripcion:
      "Conserva artesanal con chiles habanero y especias. Picante y ácido al mismo tiempo.",
    precio: 15000,
    categoria: "conservas",
    stock: 30,
    imagen: "🌶️",
    acidez: "alta",
  },
  {
    id: "5",
    nombre: "Chips de Limón",
    descripcion:
      "Papas fritas con sazón de limón deshidratado. Crujientes y adictivas.",
    precio: 7500,
    categoria: "snacks",
    stock: 95,
    imagen: "🥔",
    acidez: "media",
  },
  {
    id: "6",
    nombre: "Uchuva Fresca (250g)",
    descripcion:
      "Uchuvas seleccionadas, dulces por fuera y ácidas por dentro. Frescas del día.",
    precio: 9800,
    categoria: "frutas-acidas",
    stock: 25,
    imagen: "🍒",
    acidez: "media",
    destacado: true,
  },
  {
    id: "7",
    nombre: "Agua de Tamarindo",
    descripcion:
      "Refresco tradicional con notas dulces y ácidas. Botella de 500ml.",
    precio: 5500,
    categoria: "bebidas",
    stock: 60,
    imagen: "🧃",
    acidez: "media",
  },
  {
    id: "8",
    nombre: "Mermelada de Piña Ácida",
    descripcion:
      "Elaborada con piña golden y un toque de limón. Perfecta para tostadas.",
    precio: 11000,
    categoria: "conservas",
    stock: 40,
    imagen: "🍍",
    acidez: "baja",
  },
  {
    id: "9",
    nombre: "Paleta de Mango Biche",
    descripcion:
      "Paleta helada con pulpa real de mango verde. Refrescante y picante.",
    precio: 4500,
    categoria: "dulces",
    stock: 150,
    imagen: "🍦",
    acidez: "alta",
  },
  {
    id: "10",
    nombre: "Mix Frutas Ácidas",
    descripcion:
      "Combinación de maracuyá, lulo y guanábana. Bandeja de 400g lista para consumir.",
    precio: 18500,
    categoria: "frutas-acidas",
    stock: 18,
    imagen: "🥗",
    acidez: "alta",
    destacado: true,
  },
  {
    id: "11",
    nombre: "Granizado de Lulo",
    descripcion:
      "Bebida helada con lulo colombiano. Textura granizada irresistible.",
    precio: 9000,
    categoria: "bebidas",
    stock: 55,
    imagen: "🧊",
    acidez: "alta",
  },
  {
    id: "12",
    nombre: "Tostones con Limón",
    descripcion:
      "Plátano verde frito con limón en polvo. Snack tradicional reinventado.",
    precio: 8200,
    categoria: "snacks",
    stock: 70,
    imagen: "🍌",
    acidez: "baja",
  },
];

export function getProductoById(id: string): Producto | undefined {
  return productos.find((p) => p.id === id);
}

export function formatPrecio(precio: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(precio);
}
