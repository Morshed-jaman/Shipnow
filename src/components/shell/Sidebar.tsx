"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { GoProCard } from "./GoProCard";
import { primaryNavigation, utilityNavigation } from "./navigation";
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
        <Image
          src="/logo-symbol.svg"
          alt="ShipNow"
          width={40}
          height={40}
          className="mx-auto size-10"
          priority
        />
        <NavGroups compact />
      </aside>

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-shell-sidebar flex-col border-r border-border-default bg-surface-card p-5 lg:flex">
        <Image
          src="/logo-shipnow.svg"
          alt="ShipNow"
          width={142}
          height={39}
          className="h-auto"
          priority
        />
        <div className="mt-6">
          <UserCard />
        </div>
        <NavGroups />
        <div className="mt-auto pt-5">
          <GoProCard />
        </div>
      </aside>
    </>
  );
}
