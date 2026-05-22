import type { Categoria } from "@/types";

export const CATEGORIAS: { id: Categoria; label: string; emoji: string }[] = [
  { id: "frutas-acidas", label: "Frutas ácidas", emoji: "🍋" },
  { id: "bebidas", label: "Bebidas", emoji: "🥤" },
  { id: "dulces", label: "Dulces", emoji: "🍬" },
  { id: "conservas", label: "Conservas", emoji: "🫙" },
  { id: "snacks", label: "Snacks", emoji: "🥨" },
];

export const ACIDEZ_LABELS = {
  baja: { label: "Suave", color: "bg-lime-100 text-lime-800" },
  media: { label: "Equilibrada", color: "bg-amber-100 text-amber-800" },
  alta: { label: "Intensa", color: "bg-orange-100 text-orange-800" },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/productos", label: "Productos" },
  { href: "/contacto", label: "Contacto" },
];
