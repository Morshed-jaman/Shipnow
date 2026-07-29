import { Badge } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { ShipmentStatus } from "@/data/shipments";

const styles: Record<ShipmentStatus, string> = {
  Delivered: "bg-status-success-light text-status-success",
  "In Transit": "bg-status-neutral/10 text-status-neutral",
  "Out for Delivery": "bg-brand-light text-brand-primary",
  Processing: "bg-status-info-light text-status-info",
  Pending: "bg-[#FEF1A7] text-status-warning",
  Delayed: "bg-[#FEF1A7] text-status-warning",
};

export function ShipmentStatusPill({ status }: { status: ShipmentStatus }) {
  return <Badge className={cn("whitespace-nowrap", styles[status])}>{status}</Badge>;
}
