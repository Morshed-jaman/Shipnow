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
import { ShipmentsHeader } from "./ShipmentsHeader";
import { TableToolbar } from "./TableToolbar";

export function ShipmentsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<TableSort>({ key: "date", direction: "desc" });
  const [selected, setSelected] = useState<ReadonlySet<Key>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
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
      (!search || Object.values(shipment).some((value) => String(value).toLowerCase().includes(search))) &&
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
    <div className="grid min-h-full w-full min-w-0 max-w-full justify-self-stretch bg-surface-page gap-5">
      <ShipmentsHeader view={view} onViewChange={setView} />
      {view === "table" ? <KpiCards /> : null}
      {view === "table" ? (
        <section className="w-full min-w-0 max-w-full justify-self-stretch overflow-hidden rounded-card bg-surface-card p-4 shadow-card">
          <TableToolbar query={query} onQueryChange={(value) => { setQuery(value); setPage(1); }}
            activeStatus={statuses.values().next().value ?? "All"}
            onStatusChange={(status) => { setStatuses(status === "All" ? new Set() : new Set([status])); setPage(1); }} />
          <div className="mt-4 w-full min-w-0 max-w-full">
            <ShipmentsTable rows={visible} total={sorted.length} sort={sort} onSortChange={(next) => { setSort(next); setPage(1); }}
              selected={selected} onSelectionChange={setSelected} page={page} pageSize={pageSize} onPageChange={setPage}
              onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} emptyState={emptyState} />
          </div>
        </section>
      ) : (
        <>
          <ShipmentsToolbar query={query} onQueryChange={(value) => { setQuery(value); setPage(1); }} statuses={statuses}
            onStatusToggle={(status) => { setStatuses((current) => { const next = new Set(current); if (next.has(status)) next.delete(status); else next.add(status); return next; }); setPage(1); }} />
          {sorted.length ? <ShipmentsGrid rows={visible} total={sorted.length} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} />
            : <div className="w-full max-w-full rounded-card bg-surface-card"><EmptyState onClear={clearFilters} /></div>}
        </>
      )}
    </div>
  );
}
