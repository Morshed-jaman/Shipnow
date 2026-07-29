import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui";
import { DashboardGreeting } from "./DashboardGreeting";

export function DashboardHeader() {
  return (
    <header className="flex min-w-0 flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
      <DashboardGreeting />
      <div className="flex min-w-0 items-end gap-3 tablet:w-auto">
        <Input
          label="Search"
          aria-label="Search"
          placeholder="Search anything"
          leftAdornment={<Search className="size-4" aria-hidden="true" />}
          containerClassName="min-w-0 flex-1 [&>label]:sr-only tablet:w-64 tablet:flex-none lg:w-[360px]"
          className="bg-surface-card"
        />
        <Link
          href="/shipments/new"
          aria-label="New Shipping"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-control bg-action-dark text-small font-semibold text-surface-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary tablet:h-10 tablet:w-auto tablet:gap-2 tablet:px-4"
        >
          <Plus className="size-5" aria-hidden="true" />
          <span className="hidden tablet:inline">New Shipping</span>
        </Link>
      </div>
    </header>
  );
}
