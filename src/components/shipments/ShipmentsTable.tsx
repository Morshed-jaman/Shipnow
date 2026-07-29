"use client";

import { Ellipsis } from "lucide-react";
import type { Key } from "react";
import { Pagination, Table, type TableColumn, type TableSort } from "@/components/ui";
import type { Shipment } from "@/data/shipments";
import { ShipmentStatusPill } from "./ShipmentStatusPill";

const columns: TableColumn<Shipment>[] = [
  { key: "id", header: "Shipping ID", accessor: "id", sortable: true, cellClassName: "whitespace-nowrap font-semibold text-brand-primary" },
  { key: "company", header: "Company", sortable: true, render: (row) => <div className="min-w-36"><p className="font-semibold">{row.company}</p><p className="text-xs text-text-secondary">{row.category}</p></div> },
  { key: "carrier", header: "Carrier", accessor: "carrier", sortable: true },
  { key: "route", header: "Route", sortable: true, render: (row) => <span className="block min-w-56">{row.origin} <span className="text-brand-primary">→</span> {row.destination}</span> },
  { key: "weight", header: "Weight", sortable: true, render: (row) => `${row.weight} kg`, cellClassName: "whitespace-nowrap" },
  { key: "items", header: "Items", accessor: "items", sortable: true },
  { key: "date", header: "Shipping Date", accessor: "date", sortable: true, cellClassName: "whitespace-nowrap" },
  { key: "status", header: "Status", sortable: true, render: (row) => <ShipmentStatusPill status={row.status} /> },
  { key: "actions", header: <span className="sr-only">Actions</span>, render: (row) => <button type="button" aria-label={`Actions for ${row.id}`} className="rounded-control p-2 text-text-secondary"><Ellipsis className="size-4" /></button> },
];

interface Props {
  rows: Shipment[]; total: number; sort: TableSort; onSortChange: (sort: TableSort) => void;
  selected: ReadonlySet<Key>; onSelectionChange: (ids: ReadonlySet<Key>) => void;
  page: number; pageSize: number; onPageChange: (page: number) => void; onPageSizeChange: (size: number) => void;
  emptyState: React.ReactNode;
}

export function ShipmentsTable(props: Props) {
  return (
    <Table data={props.rows} columns={columns} getRowId={(row) => row.id} sort={props.sort} onSortChange={props.onSortChange}
      selectedRowIds={props.selected} onSelectionChange={props.onSelectionChange} emptyState={props.emptyState} caption="Shipments"
      className="w-full min-w-0 max-w-full shadow-none [&_thead]:bg-brand-light [&_thead]:text-text-primary"
      pagination={<Pagination page={props.page} pageSize={props.pageSize} total={props.total} onPageChange={props.onPageChange} onPageSizeChange={props.onPageSizeChange} pageSizeOptions={[8, 12, 16]} />}
    />
  );
}
