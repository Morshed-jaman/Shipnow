import { MetricCard } from "@/components/dashboard/MetricCard";
import { metrics } from "@/data/dashboard";

export default function DashboardPage() {
  return (
    <div className="grid gap-5">
      <h1 className="sr-only">Dashboard</h1>
      <section aria-label="Shipment overview" className="grid gap-5">
        {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </section>
    </div>
  );
}
