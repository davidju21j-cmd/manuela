import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = {
  title: "Registro",
};

export default function RegistroPage() {
  return (
    <div className="px-4 py-12 sm:py-16">
      <AuthForm mode="register" />
    </div>
  );
}
