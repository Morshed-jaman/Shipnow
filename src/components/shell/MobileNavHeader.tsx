"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileDrawer } from "./MobileDrawer";
import { ShipNowLogo } from "./ShipNowLogo";

export function MobileNavHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 items-center border-b border-border-default bg-surface-card px-4 tablet:hidden">
        <ShipNowLogo className="mr-auto origin-left scale-90" />
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
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
