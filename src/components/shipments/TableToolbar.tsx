import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui";
import type { ShipmentStatus } from "@/data/shipments";
import { cn } from "@/lib/cn";

const tabs: Array<"All" | ShipmentStatus> = ["All", "Completed", "Delivery", "Pending"];

export function TableToolbar({ activeStatus, onStatusChange, query, onQueryChange }: {
  activeStatus: "All" | ShipmentStatus;
  onStatusChange: (status: "All" | ShipmentStatus) => void;
  query: string;
  onQueryChange: (query: string) => void;
}) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 lg:flex-row lg:items-center">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button key={tab} type="button" onClick={() => onStatusChange(tab)}
            className={cn("h-9 rounded-full border border-border-default bg-surface-card px-4 text-small font-semibold text-text-secondary", activeStatus === tab && "border-action-dark bg-action-dark text-surface-card")}>
            {tab}
          </button>
        ))}
      </div>
      <div className="flex min-w-0 flex-col gap-2 tablet:flex-row lg:ml-auto">
        <Input label="Search shipments" aria-label="Search shipments" placeholder="Search id, company, etc" value={query}
          onChange={(event) => onQueryChange(event.target.value)} leftAdornment={<Search className="size-4" />}
          containerClassName="w-full min-w-0 tablet:w-64" className="bg-surface-input" />
        <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-control border border-border-default bg-surface-card px-4 text-small font-semibold text-text-primary">
          <SlidersHorizontal className="size-4" /> Filter <ChevronDown className="size-4" />
        </button>
        <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-control border border-border-default bg-surface-card px-4 text-small font-semibold text-text-primary">
          This Month <ChevronDown className="size-4" />
        </button>
      </div>
    </div>
  );
}
