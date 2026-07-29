import type { Shipment } from "@/data/shipments";
import { ShipmentCard } from "./ShipmentCard";
import { ShipmentsPagination } from "./ShipmentsPagination";

export function ShipmentsGrid({ rows, total, page, pageSize, onPageChange, onPageSizeChange }: {
  rows: Shipment[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}) {
  return (
    <div className="grid w-full min-w-0 max-w-full gap-5">
      <div className="grid w-full min-w-0 max-w-full grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-4">
        {rows.map((shipment) => <ShipmentCard key={shipment.id} shipment={shipment} />)}
      </div>
      <div className="w-full max-w-full rounded-card bg-surface-card p-4 shadow-card">
        <ShipmentsPagination
          page={page}
          pageSize={pageSize}
          total={total}
          resultsLabel="of 520 results"
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}
