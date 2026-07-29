"use client";

import type { Key, ReactNode } from "react";
import { Table, type TableColumn, type TableSort } from "@/components/ui";
import type { Shipment, ShipmentStatus } from "@/data/shipments";
import { cn } from "@/lib/cn";
import { ShipmentsPagination } from "./ShipmentsPagination";

const statusColors: Record<ShipmentStatus, string> = {
  Delivery: "bg-brand-primary",
  Completed: "bg-status-success",
  Pending: "bg-status-warning",
};

const stacked = (top: ReactNode, bottom: ReactNode) => <div className="min-w-40"><p>{top}</p><p className="mt-1 text-xs text-text-secondary">{bottom}</p></div>;

const columns: TableColumn<Shipment>[] = [
  { key: "id", header: "Shipping ID", sortable: true, render: (row) => stacked(<strong className="text-brand-primary">{row.id}</strong>, row.freightType) },
  { key: "company", header: "Company", sortable: true, render: (row) => (
    <div className="flex min-w-40 items-center gap-3">
      <img
        src={row.logo}
        alt={`${row.company} logo`}
        width={32}
        height={32}
        className="h-8 w-8 shrink-0 object-contain"
      />
      {stacked(<strong>{row.company}</strong>, row.category)}
    </div>
  ) },
  { key: "carrier", header: "Carriers", accessor: "carrier", sortable: true },
  { key: "productCategory", header: "Product Category", accessor: "productCategory", sortable: true, cellClassName: "min-w-40" },
  { key: "weight", header: "Weight", sortable: true, render: (row) => `${row.weight.toLocaleString()} kg`, cellClassName: "whitespace-nowrap" },
  { key: "route", header: "Route", sortable: true, render: (row) => stacked(`${row.origin} (Origin)`, `${row.destination} (Destination)`) },
  { key: "date", header: "Date", sortable: true, render: (row) => stacked(`${row.atd} (ATD)`, `${row.eta} (ETA)`) },
  { key: "progress", header: "Progress", accessor: "progress", sortable: true, render: (row) => (
    <div className="flex min-w-28 items-center gap-2"><div className="h-2 flex-1 overflow-hidden rounded-full bg-border-default"><span className="block h-full rounded-full bg-brand-primary" style={{ width: `${row.progress}%` }} /></div><span className="text-xs">{row.progress}%</span></div>
  ) },
  { key: "status", header: "Status", accessor: "status", sortable: true, render: (row) => (
    <span className="inline-flex items-center gap-2 whitespace-nowrap"><i className={cn("size-2 rounded-full", statusColors[row.status])} />{row.status}</span>
  ) },
];

interface Props {
  rows: Shipment[]; sort: TableSort; onSortChange: (sort: TableSort) => void;
  selected: ReadonlySet<Key>; onSelectionChange: (ids: ReadonlySet<Key>) => void;
  page: number; pageSize: number; total: number; onPageChange: (page: number) => void; onPageSizeChange: (size: number) => void;
  emptyState: ReactNode;
}

export function ShipmentsTable(props: Props) {
  return <Table data={props.rows} columns={columns} getRowId={(row) => row.id} sort={props.sort} onSortChange={props.onSortChange}
    selectedRowIds={props.selected} onSelectionChange={props.onSelectionChange} emptyState={props.emptyState} caption="Shipments"
    className="w-full min-w-0 max-w-full shadow-none [&_thead]:bg-brand-light [&_thead]:text-text-primary"
    pagination={<ShipmentsPagination page={props.page} pageSize={props.pageSize} total={props.total} resultsLabel="of 1,240 results" onPageChange={props.onPageChange} onPageSizeChange={props.onPageSizeChange} />} />;
}
