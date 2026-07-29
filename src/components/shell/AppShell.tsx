import type { ReactNode } from "react";
import { MobileNavHeader } from "./MobileNavHeader";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-dvw min-w-full max-w-none self-stretch flex-row bg-surface-page">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col bg-surface-page tablet:pl-shell-rail lg:pl-shell-sidebar">
        <MobileNavHeader />
        <main className="w-full min-w-0 max-w-full flex-1 bg-surface-page p-4 tablet:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
