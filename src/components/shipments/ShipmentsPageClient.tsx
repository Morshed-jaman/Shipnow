"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type Key, useMemo, useState } from "react";
import type { TableSort } from "@/components/ui";
import { shipments, type GridShipmentStatus, type ShipmentStatus } from "@/data/shipments";
import { EmptyState } from "./EmptyState";
import { KpiCards } from "./KpiCards";
import { ShipmentsGrid } from "./ShipmentsGrid";
import { ShipmentsHeader } from "./ShipmentsHeader";
import { ShipmentsTable } from "./ShipmentsTable";
import { ShipmentsToolbar, type GridSort } from "./ShipmentsToolbar";
import { TableToolbar } from "./TableToolbar";
import type { ShipmentView } from "./ViewToggle";

export function ShipmentsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tableSort, setTableSort] = useState<TableSort>({ key: "date", direction: "desc" });
  const [gridSort, setGridSort] = useState<GridSort>("newest");
  const [selected, setSelected] = useState<ReadonlySet<Key>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [query, setQuery] = useState("");
  const [tableStatus, setTableStatus] = useState<"All" | ShipmentStatus>("All");
  const [gridStatus, setGridStatus] = useState<"All" | GridShipmentStatus>("All");
  const view: ShipmentView = searchParams.get("view") === "grid" ? "grid" : "table";

  const setView = (next: ShipmentView) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", next);
    setPage(1);
    router.replace(`/shipments?${params}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return shipments.filter((shipment) => {
      const matchesSearch = !search || shipment.id.toLowerCase().includes(search) || shipment.company.toLowerCase().includes(search);
      const matchesStatus = view === "table"
        ? tableStatus === "All" || shipment.status === tableStatus
        : gridStatus === "All" || shipment.gridStatus === gridStatus;
      return matchesSearch && matchesStatus;
    });
  }, [gridStatus, query, tableStatus, view]);

  const sorted = useMemo(() => {
    const indexed = filtered.map((shipment, index) => ({ shipment, index }));
    if (view === "grid") {
      return indexed.toSorted((a, b) => {
        if (gridSort === "company") return a.shipment.company.localeCompare(b.shipment.company);
        return gridSort === "oldest" ? b.index - a.index : a.index - b.index;
      }).map(({ shipment }) => shipment);
    }

    return indexed.toSorted((a, b) => {
      const getValue = (row: typeof a.shipment) => tableSort.key === "route"
        ? `${row.origin}${row.destination}`
        : String(row[tableSort.key as keyof typeof row] ?? "");
      const result = getValue(a.shipment).localeCompare(getValue(b.shipment), undefined, { numeric: true });
      return (tableSort.direction === "asc" ? result : -result) || a.index - b.index;
    }).map(({ shipment }) => shipment);
  }, [filtered, gridSort, tableSort, view]);

  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);
  const clearFilters = () => {
    setQuery("");
    setTableStatus("All");
    setGridStatus("All");
    setPage(1);
  };
  const emptyState = <EmptyState onClear={clearFilters} />;

  return (
    <div className="grid min-h-full w-full min-w-0 max-w-full justify-self-stretch gap-5 bg-surface-page">
      <ShipmentsHeader view={view} onViewChange={setView} />
      {view === "table" ? (
        <>
          <KpiCards />
          <section className="w-full min-w-0 max-w-full justify-self-stretch overflow-hidden rounded-card bg-surface-card p-4 shadow-card">
            <TableToolbar query={query} onQueryChange={(value) => { setQuery(value); setPage(1); }} activeStatus={tableStatus} onStatusChange={(status) => { setTableStatus(status); setPage(1); }} />
            <div className="mt-4 w-full min-w-0 max-w-full">
              <ShipmentsTable rows={visible} total={sorted.length} sort={tableSort} onSortChange={(next) => { setTableSort(next); setPage(1); }}
                selected={selected} onSelectionChange={setSelected} page={page} pageSize={pageSize} onPageChange={setPage}
                onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} emptyState={emptyState} />
            </div>
          </section>
        </>
      ) : (
        <>
          <ShipmentsToolbar query={query} onQueryChange={(value) => { setQuery(value); setPage(1); }} activeStatus={gridStatus}
            onStatusChange={(status) => { setGridStatus(status); setPage(1); }} sort={gridSort} onSortChange={(next) => { setGridSort(next); setPage(1); }} />
          {sorted.length ? (
            <ShipmentsGrid rows={visible} total={sorted.length} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(1); }} />
          ) : (
            <div className="w-full max-w-full rounded-card bg-surface-card"><EmptyState onClear={clearFilters} /></div>
          )}
        </>
      )}
    </div>
  );
}
