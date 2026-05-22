import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { getProductoById } from "@/data/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const producto = getProductoById(id);
  return {
    title: producto?.nombre ?? "Producto",
  };
}

export default async function ProductoPage({ params }: PageProps) {
  const { id } = await params;
  const producto = getProductoById(id);

  if (!producto) notFound();

  return <ProductDetailClient producto={producto} />;
}
