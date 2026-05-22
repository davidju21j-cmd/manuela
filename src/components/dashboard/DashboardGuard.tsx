"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types";
import { Button } from "@/components/ui/Button";

interface DashboardGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function DashboardGuard({ children, allowedRoles }: DashboardGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user && !allowedRoles.includes(user.rol)) {
      router.push("/login");
    }
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-stone-500">
        Cargando...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-lg font-medium text-stone-700 mb-4">
          Debes iniciar sesión para acceder
        </p>
        <Link href="/login">
          <Button>Ir a login</Button>
        </Link>
      </div>
    );
  }

  if (!allowedRoles.includes(user.rol)) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-lg font-medium text-stone-700 mb-4">
          No tienes permiso para esta sección
        </p>
        <Link href="/">
          <Button variant="outline">Volver al inicio</Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
