import { Suspense } from "react";
import { ShipmentsPageClient } from "@/components/shipments/ShipmentsPageClient";

export default function ShipmentsPage() {
  return <Suspense fallback={<div className="h-40 animate-pulse rounded-card bg-surface-card" />}><ShipmentsPageClient /></Suspense>;
}
