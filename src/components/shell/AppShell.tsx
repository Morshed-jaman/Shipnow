"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { primaryNavigation, utilityNavigation } from "./navigation";

function getPageTitle(pathname: string) {
  const item = [...primaryNavigation, ...utilityNavigation].find(
    (entry) => entry.href === pathname,
  );
  return item?.label ?? "ShipNow";
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface-page">
      <Sidebar />
      <div className="min-h-screen tablet:pl-shell-rail lg:pl-shell-sidebar">
        <TopBar
          pageTitle={getPageTitle(pathname)}
          primaryAction={{
            label: "Add New Shipping",
            shortLabel: "New Shipping",
            onClick: () => undefined,
          }}
        />
        <main className="p-4 tablet:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
