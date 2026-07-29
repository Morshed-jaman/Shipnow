import { CheckCircle2, Clock3, Ellipsis, PackageCheck, Truck } from "lucide-react";
import { Card } from "@/components/ui";
import { cn } from "@/lib/cn";

export function KpiCards() {
  const kpis = [
    { label: "Total Shipments", value: "1,284", icon: PackageCheck, note: "Up by 4.6% this week", up: true },
    { label: "Pending", value: "285", icon: Clock3, note: "Up by 8.7% this week", up: true },
    { label: "Delivery", value: "594", icon: Truck, note: "Down 4.2% from last week", up: false },
    { label: "Completed", value: "405", icon: CheckCircle2, note: "Up by 3.9% this week", up: true },
  ];
  return (
    <section aria-label="Shipment summary" className="grid w-full min-w-0 max-w-full grid-cols-1 gap-5 tablet:grid-cols-2 lg:grid-cols-4">
      {kpis.map(({ label, value, icon: Icon, note, up }) => (
        <Card key={label} className="w-full min-w-0 max-w-full" padding="lg">
          <div className="flex items-start justify-between"><span className="rounded-control bg-brand-light p-2 text-brand-primary"><Icon className="size-5" /></span><button type="button" aria-label={`${label} menu`} className="rounded-control p-1 text-text-secondary"><Ellipsis className="size-5" /></button></div>
          <p className="mt-4 text-small text-text-secondary">{label}</p><p className="mt-1 text-3xl font-bold text-text-primary">{value}</p>
          <p className={cn("mt-2 text-xs font-semibold", up ? "text-status-success" : "text-status-error")}>{up ? "▲" : "▼"} {note}</p>
        </Card>
      ))}
    </section>
  );
}
