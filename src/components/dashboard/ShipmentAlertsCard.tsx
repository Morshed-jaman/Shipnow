import { ArrowUpRight, CircleAlert } from "lucide-react";
import { Card } from "@/components/ui";
import { shipmentAlerts } from "@/data/dashboard";
import { CardMenuButton } from "./CardMenuButton";

export function ShipmentAlertsCard() {
  return (
    <Card padding="lg" className="h-full">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-text-primary">Shipment Alerts</h2>
        <CardMenuButton label="Shipment alerts menu" />
      </div>
      <div className="mt-5 flex items-end gap-2">
        <strong className="text-4xl text-text-primary">12</strong>
        <span className="pb-1 text-small text-text-secondary">Delays Detected</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["5 Customs Clearance Delay", "4 Incorrect Address Provided", "3 Weather-Related Hold"].map((stat) => (
          <span key={stat} className="rounded-control bg-brand-light p-2 text-center text-xs font-semibold text-brand-dark">{stat}</span>
        ))}
      </div>
      <ul className="mt-4 divide-y divide-border-default">
        {shipmentAlerts.map((alert) => (
          <li key={alert.shipmentId} className="flex items-center gap-3 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-control bg-brand-light text-brand-primary"><CircleAlert className="size-4" /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-small font-semibold text-text-primary">{alert.title}</p>
              <p className="truncate text-xs text-text-secondary">{alert.shipmentId} · {alert.freight} · {alert.date}</p>
            </div>
            <ArrowUpRight className="size-4 shrink-0 text-text-secondary" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </Card>
  );
}
