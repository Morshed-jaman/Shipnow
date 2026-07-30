"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { GoProCard } from "./GoProCard";
import { primaryNavigation, utilityNavigation } from "./navigation";
import { ShipNowLogo } from "./ShipNowLogo";
import { SidebarNavItem } from "./SidebarNavItem";
import { UserCard } from "./UserCard";

function NavGroups({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();

  return (
    <>
      <nav aria-label="Primary navigation" className="mt-5">
        <ul className="space-y-1">
          {primaryNavigation.map((item) => (
            <li key={item.href}>
              <SidebarNavItem
                item={item}
                active={pathname === item.href}
                compact={compact}
              />
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Utility navigation" className="mt-4 border-t border-border-default pt-4">
        <ul className="space-y-1">
          {utilityNavigation.map((item) => (
            <li key={item.href}>
              <SidebarNavItem
                item={item}
                active={pathname === item.href}
                compact={compact}
              />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export function Sidebar() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-shell-rail flex-col border-r border-border-default bg-surface-card px-3 py-6 tablet:flex lg:hidden">
        <div className="border-b border-border-default pb-4">
          <Image src="/avatar-john.png" alt="John Doe" width={32} height={32} className="mx-auto size-8 rounded-full object-cover" priority />
        </div>
        <NavGroups compact />
      </aside>

      <aside className="fixed inset-y-0 left-0 z-30 hidden h-dvh w-shell-sidebar flex-col overflow-hidden border-r border-border-default bg-surface-card p-5 lg:flex">
        <ShipNowLogo className="shrink-0" />
        <div className="mt-6 shrink-0">
          <UserCard />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <NavGroups />
        </div>
        <div className="shrink-0 pt-5">
          <GoProCard />
        </div>
      </aside>
    </>
  );
}
