import { MetricCard } from "@/components/dashboard/MetricCard";
import { MapCard } from "@/components/dashboard/MapCard";
import { ProfitSummaryChart } from "@/components/dashboard/ProfitSummaryChart";
import { ProductCategoriesCard } from "@/components/dashboard/ProductCategoriesCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { ShipmentAlertsCard } from "@/components/dashboard/ShipmentAlertsCard";
import { ShipmentStatisticChart } from "@/components/dashboard/ShipmentStatisticChart";
import { ShipmentTypeDonut } from "@/components/dashboard/ShipmentTypeDonut";
import { metrics } from "@/data/dashboard";

export default function DashboardPage() {
  return (
    <div className="grid gap-5">
      <h1 className="sr-only">Dashboard</h1>
      <section aria-label="Shipment overview" className="grid gap-5">
        {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </section>
      <section aria-label="Shipment and profit charts" className="grid gap-5 tablet:grid-cols-2">
        <ShipmentStatisticChart />
        <ProfitSummaryChart />
      </section>
      <section aria-label="Shipment and product distribution" className="grid gap-5 tablet:grid-cols-2">
        <ShipmentTypeDonut />
        <ProductCategoriesCard />
      </section>
      <section aria-label="Shipment map">
        <MapCard />
      </section>
      <section aria-label="Alerts and activity" className="grid gap-5 tablet:grid-cols-2">
        <ShipmentAlertsCard />
        <RecentActivityCard />
      </section>
    </div>
  );
}
