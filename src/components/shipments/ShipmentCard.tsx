import { ArrowRight, Ellipsis, MapPin, Truck } from "lucide-react";
import { Card } from "@/components/ui";
import type { Shipment } from "@/data/shipments";
import { ShipmentStatusPill } from "./ShipmentStatusPill";

export function ShipmentCard({ shipment }: { shipment: Shipment }) {
  return (
    <Card padding="none" className="w-full min-w-0 max-w-full">
      <div className="relative m-3 h-28 overflow-hidden rounded-control bg-surface-input">
        <svg viewBox="0 0 260 112" className="size-full" role="img" aria-label={`Route preview for ${shipment.id}`}>
          <path d="M18 88 C75 18 150 102 242 24" fill="none" stroke="#E0E0E0" strokeWidth="18" />
          <path d="M20 88 C76 22 150 98 240 24" fill="none" stroke="#856DF3" strokeWidth="3" strokeDasharray="7 5" />
          <circle cx="20" cy="88" r="6" fill="#856DF3" /><circle cx="240" cy="24" r="6" fill="#FEFEFE" stroke="#333333" strokeWidth="3" />
        </svg>
        <Truck className="absolute left-1/2 top-1/2 size-6 -translate-y-1/2 text-brand-primary" />
      </div>
      <div className="p-4 pt-1">
        <div className="flex items-start justify-between gap-2"><strong className="text-lg text-brand-primary">{shipment.id}</strong><ShipmentStatusPill status={shipment.status} /></div>
        <p className="mt-3 font-semibold text-text-primary">{shipment.company}</p>
        <p className="text-xs text-text-secondary">{shipment.category}</p>
        <p className="mt-3 flex items-center gap-2 text-small text-text-secondary"><MapPin className="size-4 shrink-0" /><span className="min-w-0 break-words">{shipment.origin} → {shipment.destination}</span></p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-text-secondary">
          <span>Carrier <strong className="block text-small text-text-primary">{shipment.carrier}</strong></span>
          <span>Date <strong className="block text-small text-text-primary">{shipment.date}</strong></span>
          <span>Weight <strong className="block text-small text-text-primary">{shipment.weight} kg</strong></span>
          <span>Items <strong className="block text-small text-text-primary">{shipment.items}</strong></span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border-default pt-3">
          <button type="button" className="inline-flex items-center gap-1 text-small font-semibold text-brand-primary">View details <ArrowRight className="size-4" /></button>
          <button type="button" aria-label={`Actions for ${shipment.id}`} className="rounded-control p-1 text-text-secondary"><Ellipsis className="size-5" /></button>
        </div>
      </div>
    </Card>
  );
}
