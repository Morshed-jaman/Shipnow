import { MapPin, Package, Plane, Ship, TrainFront, Truck } from "lucide-react";
import { Card } from "@/components/ui";
import type { FreightType, Shipment } from "@/data/shipments";
import { ShipmentStatusPill } from "./ShipmentStatusPill";

const freightIcons: Record<FreightType, typeof Plane> = {
  "Air Freight": Plane,
  "Road Freight": Truck,
  "Ocean Freight": Ship,
  "Rail Freight": TrainFront,
};

function RouteRow({ label, place, date }: { label: string; place: string; date: string }) {
  return (
    <div className="flex items-start gap-3 border-t border-border-default py-3">
      <span className="mt-1 rounded-full bg-brand-light p-1.5 text-brand-primary">
        <MapPin className="size-3.5" aria-hidden="true" />
      </span>
      <span className="text-xs font-semibold text-text-secondary">{label}</span>
      <span className="ml-auto min-w-0 text-right">
        <strong className="block text-small text-text-primary">{place}</strong>
        <span className="text-xs text-text-secondary">{date}</span>
      </span>
    </div>
  );
}

export function ShipmentCard({ shipment }: { shipment: Shipment }) {
  const FreightIcon = freightIcons[shipment.freightType];
  const initials = shipment.company.split(/\s+/).map((part) => part[0]).slice(0, 2).join("");

  return (
    <Card padding="none" className="w-full min-w-0 max-w-full border border-border-default shadow-none">
      <article className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <strong className="text-lg text-text-primary">{shipment.id}</strong>
            <div className="mt-2"><ShipmentStatusPill status={shipment.gridStatus} /></div>
          </div>
          <span className="rounded-full bg-surface-input p-3 text-text-secondary">
            <FreightIcon className="size-5" aria-label={shipment.freightType} />
          </span>
        </div>

        <div className="my-4 flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-light text-small font-bold text-brand-primary" aria-hidden="true">{initials}</span>
          <span className="min-w-0">
            <strong className="block truncate text-small text-text-primary">{shipment.company}</strong>
            <span className="text-xs text-text-secondary">{shipment.category}</span>
          </span>
        </div>

        <RouteRow label="Origin" place={shipment.gridOrigin} date={shipment.atd} />
        <RouteRow label="Destination" place={shipment.gridDestination} date={shipment.eta} />

        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-t border-border-default pt-4">
          <div>
            <div className="mb-2 flex justify-between text-xs text-text-secondary">
              <span>Progres</span><strong className="text-text-primary">{shipment.progress}%</strong>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-border-default" role="progressbar" aria-label={`${shipment.id} progress`} aria-valuenow={shipment.progress} aria-valuemin={0} aria-valuemax={100}>
              <span className="block h-full rounded-full bg-brand-primary" style={{ width: `${shipment.progress}%` }} />
            </div>
          </div>
          <div className="text-right text-xs text-text-secondary">
            <span>Carriers</span>
            <strong className="mt-1 flex items-center justify-end gap-1 text-text-primary"><Package className="size-3.5" aria-hidden="true" />{shipment.carrier}</strong>
          </div>
        </div>
      </article>
    </Card>
  );
}
