"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type Key, useMemo, useState } from "react";
import type { TableSort } from "@/components/ui";
import { KpiCards } from "./KpiCards";
import { ShipmentsTable } from "./ShipmentsTable";
import { ViewToggle, type ShipmentView } from "./ViewToggle";
import { shipments } from "@/data/shipments";

export function ShipmentsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<TableSort>({ key: "date", direction: "desc" });
  const [selected, setSelected] = useState<ReadonlySet<Key>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const view: ShipmentView = searchParams.get("view") === "grid" ? "grid" : "table";
  const setView = (next: ShipmentView) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", next);
    router.replace(`/shipments?${params}`, { scroll: false });
  };
  const sorted = useMemo(() => shipments.map((shipment, index) => ({ shipment, index })).toSorted((a, b) => {
    const getValue = (row: typeof a.shipment) => sort.key === "route" ? `${row.origin}${row.destination}` : String(row[sort.key as keyof typeof row] ?? "");
    const result = getValue(a.shipment).localeCompare(getValue(b.shipment), undefined, { numeric: true });
    return (sort.direction === "asc" ? result : -result) || a.index - b.index;
  }).map(({ shipment }) => shipment), [sort]);
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);
  return (
    <div className="grid w-full min-w-0 max-w-full gap-5">
      <h1 className="sr-only">Shipments</h1>
      {view === "table" ? <KpiCards shipments={shipments} /> : null}
      <div className="flex justify-end"><ViewToggle view={view} onChange={setView} /></div>
      {view === "table" ? (
        <ShipmentsTable rows={visible} total={sorted.length} sort={sort} onSortChange={(next) => { setSort(next); setPage(1); }}
          selected={selected} onSelectionChange={setSelected} page={page} pageSize={pageSize} onPageChange={setPage}
          onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} emptyState="No shipments found" />
      ) : <p className="rounded-card bg-surface-card p-8 text-center text-text-secondary">Grid view</p>}
    </div>
  );
}
