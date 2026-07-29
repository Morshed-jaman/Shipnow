import { Badge } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { ShipmentStatus } from "@/data/shipments";

const styles: Record<ShipmentStatus, string> = {
  Completed: "bg-status-success-light text-status-success",
  Delivery: "bg-brand-light text-brand-primary",
  Pending: "bg-status-warning-light text-status-warning",
};

export function ShipmentStatusPill({ status }: { status: ShipmentStatus }) {
  return <Badge className={cn("whitespace-nowrap", styles[status])}>{status}</Badge>;
}
