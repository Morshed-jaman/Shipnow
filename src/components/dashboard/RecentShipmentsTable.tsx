"use client";

import { Ellipsis, Search, SlidersHorizontal } from "lucide-react";
import { type Key, useMemo, useState } from "react";
import { Badge, Input, Table, type TableColumn, type TableSort } from "@/components/ui";
import { cn } from "@/lib/cn";
import { recentShipments, type RecentShipment, type ShipmentStatus } from "@/data/dashboard";

const statusStyles: Record<ShipmentStatus, string> = {
  Delivered: "bg-status-success-light text-status-success",
  "Out for Delivery": "bg-brand-light text-brand-primary",
  "In Transit": "bg-status-neutral/10 text-status-neutral",
  Processing: "bg-status-info-light text-status-info",
};

const columns: TableColumn<RecentShipment>[] = [
  { key: "id", header: "Shipping ID", accessor: "id", sortable: true, cellClassName: "whitespace-nowrap font-semibold" },
  { key: "company", header: "Company", sortable: true, render: (row) => <div className="min-w-36"><p className="font-semibold">{row.company}</p><p className="text-xs text-text-secondary">{row.category}</p></div> },
  { key: "carrier", header: "Carriers", accessor: "carrier", sortable: true },
  { key: "route", header: "Route", sortable: true, render: (row) => <span className="block min-w-52">{row.origin} <span className="text-brand-primary">→</span> {row.destination}</span> },
  { key: "date", header: "Shipping Date", accessor: "date", sortable: true, cellClassName: "whitespace-nowrap" },
  { key: "status", header: "Status", sortable: true, render: (row) => <Badge className={cn("whitespace-nowrap", statusStyles[row.status])}>{row.status}</Badge> },
];

function sortValue(row: RecentShipment, key: string) {
  if (key === "route") return `${row.origin}${row.destination}`;
  return String(row[key as keyof RecentShipment]);
}

export function RecentShipmentsTable() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<TableSort>({ key: "date", direction: "desc" });
  const [selected, setSelected] = useState<ReadonlySet<Key>>(new Set());

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return recentShipments
      .filter((row) => Object.values(row).some((value) => value.toLowerCase().includes(normalized)))
      .toSorted((a, b) => {
        const result = sortValue(a, sort.key).localeCompare(sortValue(b, sort.key));
        return sort.direction === "asc" ? result : -result;
      });
  }, [query, sort]);

  return (
    <section className="w-full min-w-0 max-w-full overflow-hidden rounded-card border border-border-default bg-surface-card shadow-card" aria-labelledby="recent-shipments-heading">
      <header className="flex flex-wrap items-center gap-3 p-5">
        <h2 id="recent-shipments-heading" className="mr-auto font-bold text-text-primary">Recent Shipments</h2>
        <Input label="Search shipment" aria-label="Search shipment" placeholder="Search shipment" value={query} onChange={(event) => setQuery(event.target.value)} leftAdornment={<Search className="size-4" />} containerClassName="w-full min-w-0 tablet:w-auto tablet:min-w-52" className="bg-surface-input" />
        <button type="button" aria-label="Sort shipments" className="rounded-control border border-border-default p-2 text-text-secondary"><SlidersHorizontal className="size-5" /></button>
        <button type="button" aria-label="Recent shipments menu" className="rounded-control border border-border-default p-2 text-text-secondary"><Ellipsis className="size-5" /></button>
      </header>
      <Table
        data={rows}
        columns={columns}
        getRowId={(row) => row.id}
        sort={sort}
        onSortChange={setSort}
        selectedRowIds={selected}
        onSelectionChange={setSelected}
        caption="Recent Shipments"
        className="rounded-none border-x-0 border-b-0 shadow-none [&_thead]:bg-brand-light [&_thead]:text-text-primary"
      />
    </section>
  );
}
