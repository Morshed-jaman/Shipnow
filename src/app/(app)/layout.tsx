import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { AuthGuard } from "@/components/shell/AuthGuard";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
