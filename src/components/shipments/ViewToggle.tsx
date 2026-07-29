import { Grid2X2, List } from "lucide-react";
import { cn } from "@/lib/cn";

export type ShipmentView = "table" | "grid";

export function ViewToggle({ view, onChange }: { view: ShipmentView; onChange: (view: ShipmentView) => void }) {
  return (
    <div className="flex rounded-control border border-border-default bg-surface-card p-1" aria-label="Shipment view">
      {([{ value: "table", label: "Table view", icon: List }, { value: "grid", label: "Grid view", icon: Grid2X2 }] as const).map(({ value, label, icon: Icon }) => (
        <button key={value} type="button" aria-label={label} aria-pressed={view === value} onClick={() => onChange(value)} className={cn("rounded-nav p-2 text-text-secondary", view === value && "bg-brand-light text-brand-primary")}>
          <Icon className="size-4" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
