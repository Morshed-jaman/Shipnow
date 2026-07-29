"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type Key, useMemo, useState } from "react";
import type { TableSort } from "@/components/ui";
import { KpiCards } from "./KpiCards";
import { ShipmentsTable } from "./ShipmentsTable";
import { ShipmentsGrid } from "./ShipmentsGrid";
import { ShipmentsToolbar } from "./ShipmentsToolbar";
import { EmptyState } from "./EmptyState";
import type { ShipmentView } from "./ViewToggle";
import { shipments, type ShipmentStatus } from "@/data/shipments";

export function ShipmentsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<TableSort>({ key: "date", direction: "desc" });
  const [selected, setSelected] = useState<ReadonlySet<Key>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState<ReadonlySet<ShipmentStatus>>(new Set());
  const view: ShipmentView = searchParams.get("view") === "grid" ? "grid" : "table";
  const setView = (next: ShipmentView) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", next);
    router.replace(`/shipments?${params}`, { scroll: false });
  };
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return shipments.filter((shipment) =>
      (!search || shipment.id.toLowerCase().includes(search) || shipment.company.toLowerCase().includes(search)) &&
      (!statuses.size || statuses.has(shipment.status)),
    );
  }, [query, statuses]);
  const sorted = useMemo(() => filtered.map((shipment, index) => ({ shipment, index })).toSorted((a, b) => {
    const getValue = (row: typeof a.shipment) => sort.key === "route" ? `${row.origin}${row.destination}` : String(row[sort.key as keyof typeof row] ?? "");
    const result = getValue(a.shipment).localeCompare(getValue(b.shipment), undefined, { numeric: true });
    return (sort.direction === "asc" ? result : -result) || a.index - b.index;
  }).map(({ shipment }) => shipment), [filtered, sort]);
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);
  const clearFilters = () => { setQuery(""); setStatuses(new Set()); setPage(1); };
  const emptyState = <EmptyState onClear={clearFilters} />;
  return (
    <div className="grid w-full min-w-0 max-w-full gap-5">
      <h1 className="sr-only">Shipments</h1>
      {view === "table" ? <KpiCards shipments={shipments} /> : null}
      {view === "table" ? (
        <section className="min-w-0 overflow-hidden rounded-card bg-surface-card p-4 shadow-card">
          <ShipmentsToolbar query={query} onQueryChange={(value) => { setQuery(value); setPage(1); }} statuses={statuses}
            onStatusToggle={(status) => { setStatuses((current) => { const next = new Set(current); if (next.has(status)) next.delete(status); else next.add(status); return next; }); setPage(1); }}
            view={view} onViewChange={setView} />
          <div className="mt-4 min-w-0">
            <ShipmentsTable rows={visible} total={sorted.length} sort={sort} onSortChange={(next) => { setSort(next); setPage(1); }}
              selected={selected} onSelectionChange={setSelected} page={page} pageSize={pageSize} onPageChange={setPage}
              onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} emptyState={emptyState} />
          </div>
        </section>
      ) : (
        <>
          <ShipmentsToolbar query={query} onQueryChange={(value) => { setQuery(value); setPage(1); }} statuses={statuses}
            onStatusToggle={(status) => { setStatuses((current) => { const next = new Set(current); if (next.has(status)) next.delete(status); else next.add(status); return next; }); setPage(1); }}
            view={view} onViewChange={setView} />
          {sorted.length ? <ShipmentsGrid rows={visible} total={sorted.length} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} />
            : <div className="rounded-card bg-surface-card"><EmptyState onClear={clearFilters} /></div>}
        </>
      )}
    </div>
  );
}
