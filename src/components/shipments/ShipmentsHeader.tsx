import { Plus } from "lucide-react";
import Link from "next/link";
import { ViewToggle, type ShipmentView } from "./ViewToggle";

export function ShipmentsHeader({ view, onViewChange }: { view: ShipmentView; onViewChange: (view: ShipmentView) => void }) {
  return (
    <header className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold text-text-primary">Shipments</h1>
        <div className="mt-2 flex items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex min-w-0 gap-2 text-small text-text-secondary">
            <Link href="/dashboard" className="hover:text-brand-primary">Dashboard</Link><span>/</span><span aria-current="page">Shipments</span>
          </nav>
          <ViewToggle view={view} onChange={onViewChange} />
        </div>
      </div>
      <Link href="/shipments/new" className="inline-flex h-10 items-center justify-center gap-2 rounded-control bg-action-dark px-4 text-small font-semibold text-surface-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
        <Plus className="size-4" aria-hidden="true" /> New Shipment
      </Link>
    </header>
  );
}
