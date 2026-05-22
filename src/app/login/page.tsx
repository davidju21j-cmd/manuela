import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <div className="px-4 py-12 sm:py-16">
      <AuthForm mode="login" />
    </div>
  );
}
