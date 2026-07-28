import type { Metadata } from "next";
import { BrandPanel } from "@/components/login/BrandPanel";
import { LoginForm } from "@/components/login/LoginForm";

export const metadata: Metadata = {
  title: "Login | ShipNow",
  description: "Log in to manage your ShipNow logistics.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full flex-col overflow-x-hidden lg:flex-row">
      <BrandPanel />
      <LoginForm />
    </main>
  );
}
