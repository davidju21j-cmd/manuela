"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

type Mode = "login" | "register";

interface AuthFormProps {
  mode: Mode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let ok = false;
    if (mode === "login") {
      ok = await login(form.email, form.password);
    } else {
      ok = await register(form.nombre, form.email, form.password);
    }

    setLoading(false);

    if (!ok) {
      setError(
        mode === "login"
          ? "Credenciales incorrectas"
          : "El email ya está registrado"
      );
      return;
    }

    const email = form.email.toLowerCase();
    if (email.includes("admin")) router.push("/admin");
    else if (email.includes("empleado")) router.push("/empleado");
    else router.push("/productos");
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="text-center mb-8">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-mango-400 to-lime-500 text-2xl mb-4">
          🥭
        </span>
        <h1 className="text-2xl font-bold text-stone-900">
          {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          {mode === "login"
            ? "Accede a tu cuenta de Maracumango"
            : "Regístrate como cliente"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-stone-100 bg-white p-6 sm:p-8 shadow-sm space-y-5"
      >
        {mode === "register" && (
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-stone-700 mb-1.5">
              Nombre completo
            </label>
            <input
              id="nombre"
              required
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-mango-400 focus:outline-none focus:ring-2 focus:ring-mango-400/20"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-mango-400 focus:outline-none focus:ring-2 focus:ring-mango-400/20"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1.5">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-mango-400 focus:outline-none focus:ring-2 focus:ring-mango-400/20"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        )}

        <Button type="submit" fullWidth size="lg" disabled={loading}>
          {loading
            ? "Procesando..."
            : mode === "login"
              ? "Entrar"
              : "Registrarse"}
        </Button>

        {mode === "login" && (
          <div className="rounded-xl bg-stone-50 p-4 text-xs text-stone-600 space-y-1">
            <p className="font-semibold text-stone-700">Cuentas demo:</p>
            <p>Admin: admin@maracumango.com / admin123</p>
            <p>Empleado: empleado@maracumango.com / empleado123</p>
            <p>Cliente: cliente@demo.com / cliente123</p>
          </div>
        )}

        <p className="text-center text-sm text-stone-600">
          {mode === "login" ? (
            <>
              ¿No tienes cuenta?{" "}
              <Link href="/registro" className="font-semibold text-mango-600 hover:underline">
                Regístrate
              </Link>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="font-semibold text-mango-600 hover:underline">
                Inicia sesión
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
