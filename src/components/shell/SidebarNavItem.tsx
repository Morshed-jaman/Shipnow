"use client";

import Link from "next/link";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { NavigationItem } from "./navigation";

interface SidebarNavItemProps {
  item: NavigationItem;
  active: boolean;
  compact?: boolean;
  onNavigate?: () => void;
}

export function SidebarNavItem({
  item,
  active,
  compact = false,
  onNavigate,
}: SidebarNavItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      aria-label={compact ? item.label : undefined}
      title={compact ? item.label : undefined}
      className={cn(
        "relative flex h-10 items-center gap-3 rounded-nav px-3 text-small font-semibold text-text-secondary transition hover:bg-surface-page hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
        active && "bg-brand-light text-text-primary",
        compact && "w-10 justify-center px-0",
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      {!compact && <span className="truncate">{item.label}</span>}
      {item.unread && (
        <Badge
          variant="error"
          className={cn(
            "ml-auto size-2 min-w-0 p-0",
            compact && "absolute right-1 top-1",
          )}
          aria-label="Unread items"
        />
      )}
    </Link>
  );
}
