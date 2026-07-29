import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui";
import { gridShipmentStatuses, type GridShipmentStatus } from "@/data/shipments";
import { cn } from "@/lib/cn";

export type GridSort = "newest" | "oldest" | "company";

export function ShipmentsToolbar({
  query,
  onQueryChange,
  activeStatus,
  onStatusChange,
  sort,
  onSortChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  activeStatus: "All" | GridShipmentStatus;
  onStatusChange: (status: "All" | GridShipmentStatus) => void;
  sort: GridSort;
  onSortChange: (sort: GridSort) => void;
}) {
  const tabs: Array<"All" | GridShipmentStatus> = ["All", ...gridShipmentStatuses];

  return (
    <section aria-label="Shipment grid controls" className="flex w-full min-w-0 max-w-full flex-col gap-4 lg:flex-row lg:items-center">
      <div role="group" aria-label="Filter grid by status" className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onStatusChange(tab)}
            className={cn(
              "h-9 rounded-full border border-border-default bg-surface-card px-4 text-small font-semibold text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
              activeStatus === tab && "border-action-dark bg-action-dark text-surface-card",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex min-w-0 flex-col gap-2 tablet:flex-row lg:ml-auto">
        <Input
          label="Search shipments"
          placeholder="Search Shipment"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          leftAdornment={<Search className="size-4" aria-hidden="true" />}
          containerClassName="w-full min-w-0 tablet:w-56"
          className="bg-surface-card"
        />
        <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-control border border-border-default bg-surface-card px-4 text-small font-semibold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
          <SlidersHorizontal className="size-4" aria-hidden="true" /> Filter <ChevronDown className="size-4" aria-hidden="true" />
        </button>
        <label className="relative">
          <span className="sr-only">Sort shipments</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as GridSort)}
            className="h-10 appearance-none rounded-control border border-border-default bg-surface-card pl-4 pr-9 text-small font-semibold text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
            <option value="company">Sort by: Company</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4" aria-hidden="true" />
        </label>
      </div>
    </section>
  );
}
