"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-lime-200 bg-lime-50 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-lime-600 mb-4" />
        <h3 className="text-xl font-bold text-stone-900">¡Mensaje enviado!</h3>
        <p className="mt-2 text-stone-600">
          Gracias {form.nombre}. Te responderemos pronto a {form.email}.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setSent(false);
            setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
          }}
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-stone-700 mb-1.5">
            Nombre *
          </label>
          <input
            id="nombre"
            required
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-mango-400 focus:outline-none focus:ring-2 focus:ring-mango-400/20"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-mango-400 focus:outline-none focus:ring-2 focus:ring-mango-400/20"
            placeholder="correo@ejemplo.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-stone-700 mb-1.5">
          Teléfono
        </label>
        <input
          id="telefono"
          type="tel"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:border-mango-400 focus:outline-none focus:ring-2 focus:ring-mango-400/20"
          placeholder="+57 300 000 0000"
        />
      </div>
      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-stone-700 mb-1.5">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          required
          rows={5}
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm resize-none focus:border-mango-400 focus:outline-none focus:ring-2 focus:ring-mango-400/20"
          placeholder="¿En qué podemos ayudarte?"
        />
      </div>
      <Button type="submit" size="lg" disabled={loading} fullWidth>
        <Send className="h-5 w-5" />
        {loading ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  );
}
