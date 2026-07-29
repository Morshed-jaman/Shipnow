import { Search, SlidersHorizontal } from "lucide-react";
import { Checkbox, Input } from "@/components/ui";
import { shipmentStatuses, type ShipmentStatus } from "@/data/shipments";
import { ViewToggle, type ShipmentView } from "./ViewToggle";

export function ShipmentsToolbar({ query, onQueryChange, statuses, onStatusToggle, view, onViewChange }: {
  query: string; onQueryChange: (value: string) => void; statuses: ReadonlySet<ShipmentStatus>;
  onStatusToggle: (status: ShipmentStatus) => void; view: ShipmentView; onViewChange: (view: ShipmentView) => void;
}) {
  return (
    <div className="flex w-full min-w-0 max-w-full flex-col gap-3 tablet:flex-row tablet:items-center">
      <Input label="Search shipments" aria-label="Search shipments" placeholder="Search shipment" value={query} onChange={(event) => onQueryChange(event.target.value)}
        leftAdornment={<Search className="size-4" />} containerClassName="w-full min-w-0 tablet:max-w-[431px]" className="bg-surface-input" />
      <div className="flex items-center gap-3 tablet:ml-auto">
        <details className="relative">
          <summary className="flex h-10 min-w-0 cursor-pointer list-none items-center gap-2 rounded-control border border-border-default bg-surface-card px-3 text-small font-semibold text-text-primary tablet:min-w-52">
            <SlidersHorizontal className="size-4" /> Status filter {statuses.size ? `(${statuses.size})` : ""}
          </summary>
          <div className="absolute right-0 z-20 mt-2 grid w-56 gap-2 rounded-card border border-border-default bg-surface-card p-3 shadow-card">
            {shipmentStatuses.map((status) => <Checkbox key={status} label={status} checked={statuses.has(status)} onChange={() => onStatusToggle(status)} />)}
          </div>
        </details>
        <ViewToggle view={view} onChange={onViewChange} />
      </div>
    </div>
  );
}
