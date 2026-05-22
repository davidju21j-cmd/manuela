import { MapPin, Clock, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contacto",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-stone-900">Contacto</h1>
        <p className="mt-2 text-stone-600">
          ¿Dudas, pedidos especiales o sugerencias? Escríbenos.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-2xl border border-stone-100 bg-white p-6 sm:p-8 shadow-sm">
          <ContactForm />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-gradient-to-br from-mango-500 to-lime-500 p-6 text-white">
            <h2 className="font-bold text-lg mb-4">Maracumango</h2>
            <ul className="space-y-4 text-sm text-mango-50">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-white" />
                <span>Calle 45 #12-30, Local 8, Bogotá</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-white" />
                <span>+57 601 234 5678</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 shrink-0 text-white" />
                <span>
                  Lun – Vie: 8:00 – 19:00
                  <br />
                  Sáb: 9:00 – 17:00
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-stone-100 bg-stone-50 p-6">
            <h3 className="font-semibold text-stone-900 mb-2">Preguntas frecuentes</h3>
            <ul className="space-y-3 text-sm text-stone-600">
              <li>¿Hacen domicilios? Sí, en zona norte de Bogotá.</li>
              <li>¿Aceptan pedidos al por mayor? Contáctanos por formulario.</li>
              <li>¿Los productos son frescos? Sí, rotación diaria.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
