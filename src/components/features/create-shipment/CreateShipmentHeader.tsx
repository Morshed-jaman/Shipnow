import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function CreateShipmentHeader() {
  return (
    <header>
      <div className="flex items-center gap-3">
        <Link href="/shipments" aria-label="Back to shipments" className="rounded-control p-2 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Link>
        <h1 className="text-2xl font-bold text-text-primary">Create New Shipment</h1>
      </div>
      <nav aria-label="Breadcrumb" className="mt-2 flex flex-wrap gap-2 pl-12 text-small text-text-secondary">
        <Link href="/dashboard" className="hover:text-brand-primary">Dashboard</Link><span>/</span>
        <Link href="/shipments" className="hover:text-brand-primary">Shipments</Link><span>/</span>
        <span aria-current="page">Create New Shipment</span>
      </nav>
    </header>
  );
}
