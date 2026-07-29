import { Suspense } from "react";
import { ShipmentsPageClient } from "@/components/shipments/ShipmentsPageClient";

export default function ShipmentsPage() {
  return <Suspense fallback={<div className="h-40 w-full max-w-full animate-pulse rounded-card bg-surface-card" />}><ShipmentsPageClient /></Suspense>;
}
