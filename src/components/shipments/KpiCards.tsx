import { CheckCircle2, Clock3, PackageCheck, Truck } from "lucide-react";
import { Card } from "@/components/ui";
import type { Shipment } from "@/data/shipments";

export function KpiCards({ shipments }: { shipments: Shipment[] }) {
  const kpis = [
    { label: "Total Shipments", value: shipments.length, icon: PackageCheck, note: "+8.7% this month" },
    { label: "In Transit", value: shipments.filter((s) => s.status === "In Transit").length, icon: Truck, note: "Currently moving" },
    { label: "Delivered", value: shipments.filter((s) => s.status === "Delivered").length, icon: CheckCircle2, note: "+12.4% this month" },
    { label: "Pending or Delayed", value: shipments.filter((s) => s.status === "Pending" || s.status === "Delayed").length, icon: Clock3, note: "Needs attention" },
  ];
  return (
    <section aria-label="Shipment summary" className="grid min-w-0 gap-5 tablet:grid-cols-2 lg:grid-cols-4">
      {kpis.map(({ label, value, icon: Icon, note }) => (
        <Card key={label} className="min-w-0" padding="lg">
          <div className="flex items-start justify-between"><div><p className="text-small text-text-secondary">{label}</p><p className="mt-1 text-3xl font-bold text-text-primary">{value}</p></div><span className="rounded-control bg-brand-light p-2 text-brand-primary"><Icon className="size-5" /></span></div>
          <p className="mt-2 text-xs text-text-secondary">{note}</p>
        </Card>
      ))}
    </section>
  );
}
