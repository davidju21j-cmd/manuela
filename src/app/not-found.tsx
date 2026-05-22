import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-6xl mb-4">🥭</p>
      <h1 className="text-2xl font-bold text-stone-900">Página no encontrada</h1>
      <p className="mt-2 text-stone-600">
        El producto o la ruta que buscas no existe.
      </p>
      <Link href="/" className="inline-block mt-6">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  );
}
