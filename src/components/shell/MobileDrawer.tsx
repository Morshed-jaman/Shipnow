"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { GoProCard } from "./GoProCard";
import { primaryNavigation, utilityNavigation } from "./navigation";
import { SidebarNavItem } from "./SidebarNavItem";
import { UserCard } from "./UserCard";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 tablet:hidden">
      <button
        type="button"
        aria-label="Close navigation menu"
        className="absolute inset-0 bg-text-primary/40"
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="relative flex h-full w-[min(86vw,320px)] flex-col overflow-y-auto bg-surface-card p-5 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <Image src="/logo-shipnow.svg" alt="ShipNow" width={132} height={37} />
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="rounded-control p-2 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-5">
          <UserCard />
        </div>
        <nav aria-label="Primary navigation" className="mt-5">
          <ul className="space-y-1">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <SidebarNavItem
                  item={item}
                  active={pathname === item.href}
                  onNavigate={onClose}
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
                  onNavigate={onClose}
                />
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-5">
          <GoProCard />
        </div>
      </div>
    </div>
  );
}
