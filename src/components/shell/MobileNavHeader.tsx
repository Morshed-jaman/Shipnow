"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileDrawer } from "./MobileDrawer";
import { ShipNowLogo } from "./ShipNowLogo";

export function MobileNavHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  const isWarehouse = pathname === "/warehouse";

  const menuButton = (
    <button
      type="button"
      aria-label="Open navigation menu"
      aria-controls="mobile-navigation"
      aria-expanded={drawerOpen}
      onClick={() => setDrawerOpen(true)}
      className="rounded-control p-2 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
    >
      <Menu className="size-6" aria-hidden="true" />
    </button>
  );

  return (
    <>
      <header className="flex h-16 items-center border-b border-border-default bg-surface-card px-4 tablet:hidden">
        {isDashboard ? (
          <>
            {menuButton}
            <span className="ml-3 text-lg font-bold text-text-primary">Dashboard</span>
          </>
        ) : (
          <>
            <ShipNowLogo className={isWarehouse ? "origin-left scale-90" : "mr-auto origin-left scale-90"} />
            {isWarehouse ? <span className="mr-auto text-lg font-bold text-text-primary">Warehouse</span> : null}
            {menuButton}
          </>
        )}
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
