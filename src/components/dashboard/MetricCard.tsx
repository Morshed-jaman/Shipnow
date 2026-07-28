import { ArrowDown, ArrowUp, DollarSign, Monitor, Truck } from "lucide-react";
import { Card } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Metric } from "@/data/dashboard";

const icons = { truck: Truck, monitor: Monitor, dollar: DollarSign };

export function MetricCard({ metric }: { metric: Metric }) {
  const Icon = icons[metric.icon];
  const TrendIcon = metric.direction === "up" ? ArrowUp : ArrowDown;

  return (
    <Card className="min-h-40" padding="lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-small font-semibold text-text-secondary">{metric.label}</p>
          <p className="mt-2 text-2xl font-bold text-text-primary">{metric.value}</p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-brand-light text-brand-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-5 flex items-center gap-1 text-small text-text-secondary">
        <TrendIcon
          className={cn("size-4", metric.direction === "up" ? "text-status-success" : "text-status-error")}
          aria-hidden="true"
        />
        <span className={metric.direction === "up" ? "font-bold text-status-success" : "font-bold text-status-error"}>
          {metric.delta}
        </span>
        {metric.comparison}
      </p>
    </Card>
  );
}
