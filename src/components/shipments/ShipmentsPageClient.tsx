"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { KpiCards } from "./KpiCards";
import { ViewToggle, type ShipmentView } from "./ViewToggle";
import { shipments } from "@/data/shipments";

export function ShipmentsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view: ShipmentView = searchParams.get("view") === "grid" ? "grid" : "table";
  const setView = (next: ShipmentView) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", next);
    router.replace(`/shipments?${params}`, { scroll: false });
  };
  return (
    <div className="grid w-full min-w-0 max-w-full gap-5">
      <h1 className="sr-only">Shipments</h1>
      {view === "table" ? <KpiCards shipments={shipments} /> : null}
      <div className="flex justify-end"><ViewToggle view={view} onChange={setView} /></div>
      <p className="rounded-card bg-surface-card p-8 text-center text-text-secondary">{view === "table" ? "Table view" : "Grid view"}</p>
    </div>
  );
}
