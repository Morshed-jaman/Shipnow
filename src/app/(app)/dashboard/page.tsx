import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MapCard } from "@/components/dashboard/MapCard";
import { ProfitSummaryChart } from "@/components/dashboard/ProfitSummaryChart";
import { ProductCategoriesCard } from "@/components/dashboard/ProductCategoriesCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { RecentShipmentsTable } from "@/components/dashboard/RecentShipmentsTable";
import { ShipmentAlertsCard } from "@/components/dashboard/ShipmentAlertsCard";
import { ShipmentStatisticChart } from "@/components/dashboard/ShipmentStatisticChart";
import { ShipmentTypeDonut } from "@/components/dashboard/ShipmentTypeDonut";
import { metrics } from "@/data/dashboard";

export default function DashboardPage() {
  return (
    <div className="grid gap-5 tablet:grid-cols-2 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)]">
      <h1 className="sr-only">Dashboard</h1>
      <section aria-label="Shipment overview" className="grid gap-5 tablet:col-span-2 tablet:row-start-1 lg:col-span-1 lg:col-start-1 lg:grid-cols-3">
        {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </section>
      <section aria-label="Shipment and profit charts" className="grid gap-5 tablet:col-span-2 tablet:row-start-2 tablet:grid-cols-2 lg:col-span-1 lg:col-start-1">
        <ShipmentStatisticChart />
        <ProfitSummaryChart />
      </section>
      <section aria-label="Shipment and product distribution" className="grid gap-5 tablet:col-span-2 tablet:row-start-3 tablet:grid-cols-2 lg:col-span-1 lg:col-start-1">
        <ShipmentTypeDonut />
        <ProductCategoriesCard />
      </section>
      <section aria-label="Shipment map" className="tablet:col-span-2 tablet:row-start-4 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <MapCard />
      </section>
      <section aria-label="Shipment alerts" className="tablet:col-start-1 tablet:row-start-5 lg:col-start-2 lg:row-start-3">
        <ShipmentAlertsCard />
      </section>
      <section aria-label="Recent shipments" className="tablet:col-span-2 tablet:row-start-6 lg:col-span-1 lg:col-start-1 lg:row-start-4">
        <RecentShipmentsTable />
      </section>
      <section aria-label="Recent activity" className="tablet:col-start-2 tablet:row-start-5 lg:col-start-2 lg:row-start-4">
        <RecentActivityCard />
      </section>
      <div className="tablet:col-span-2 tablet:row-start-7 lg:col-span-2 lg:row-start-5">
        <DashboardFooter />
      </div>
    </div>
  );
}
