import { Badge } from "@/components/ui";
import type { GridShipmentStatus } from "@/data/shipments";
import { cn } from "@/lib/cn";

const styles: Record<GridShipmentStatus, string> = {
  Delivered: "bg-status-success-light text-status-success",
  "Out for Delivery": "bg-status-warning-light text-status-warning",
  "In Transit": "bg-brand-light text-brand-dark",
  Processing: "bg-brand-light text-brand-primary",
};

export function ShipmentStatusPill({ status }: { status: GridShipmentStatus }) {
  return <Badge className={cn("whitespace-nowrap", styles[status])}>{status}</Badge>;
}
