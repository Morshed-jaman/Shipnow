"use client";

import Image from "next/image";
import { Menu, Plus, Search } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button, Input } from "@/components/ui";
import { MobileDrawer } from "./MobileDrawer";

export interface PrimaryAction {
  label: string;
  shortLabel?: string;
  onClick: () => void;
}

interface TopBarProps {
  pageTitle: string;
  primaryAction: PrimaryAction;
  children?: ReactNode;
}

export function TopBar({
  pageTitle,
  primaryAction,
  children,
}: TopBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="border-b border-border-default bg-surface-page">
        <div className="flex h-16 items-center gap-3 border-b border-border-default bg-surface-card px-4 tablet:hidden">
          <Image
            src="/logo-symbol.svg"
            alt="ShipNow"
            width={36}
            height={36}
            className="size-9"
            priority
          />
          <h1 className="min-w-0 flex-1 truncate text-lg font-bold text-text-primary">
            {pageTitle}
          </h1>
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
        </div>

        <div className="flex items-center gap-3 px-4 py-4 tablet:px-6 lg:px-8">
          <div className="hidden min-w-0 flex-1 tablet:block">{children}</div>
          <Input
            label="Search"
            aria-label="Search"
            placeholder="Search anything"
            leftAdornment={<Search className="size-4" aria-hidden="true" />}
            containerClassName="min-w-0 flex-1 tablet:max-w-[360px]"
            className="border-transparent bg-surface-card"
          />
          <Button
            type="button"
            aria-label={primaryAction.label}
            onClick={primaryAction.onClick}
            className="size-10 shrink-0 bg-action-dark px-0 text-surface-card tablet:h-10 tablet:w-auto tablet:px-4"
          >
            <Plus className="size-5 tablet:hidden" aria-hidden="true" />
            <span className="hidden tablet:inline lg:hidden">
              {primaryAction.shortLabel ?? primaryAction.label}
            </span>
            <span className="hidden lg:inline">{primaryAction.label}</span>
          </Button>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
