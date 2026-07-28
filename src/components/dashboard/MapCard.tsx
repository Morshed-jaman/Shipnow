import { Minus, Navigation, Plus, Search, Truck } from "lucide-react";
import { Badge, Card, Input } from "@/components/ui";

export function MapCard() {
  return (
    <Card padding="none" className="h-full">
      <div className="relative h-72 overflow-hidden bg-[#ECEBE7]">
        <svg viewBox="0 0 600 300" className="absolute inset-0 size-full" role="img" aria-label="Illustrated route from San Francisco to New York">
          <path d="M0 245 C125 210 180 285 300 205 S450 95 600 55" fill="none" stroke="#D5D3CE" strokeWidth="52" />
          <path d="M55 245 C170 230 210 255 305 195 S445 110 545 65" fill="none" stroke="#856DF3" strokeWidth="4" strokeDasharray="9 7" />
          <circle cx="55" cy="245" r="9" fill="#856DF3" />
          <circle cx="545" cy="65" r="9" fill="#FEFEFE" stroke="#333333" strokeWidth="4" />
        </svg>
        <Navigation className="absolute left-[54%] top-[48%] size-8 rotate-45 fill-brand-primary text-brand-primary" aria-hidden="true" />
        <div className="absolute left-4 right-4 top-4 flex gap-2">
          <Input label="Search shipment on map" aria-label="Search shipment on map" placeholder="Search by Shipping ID..." leftAdornment={<Search className="size-4" />} containerClassName="min-w-0 flex-1" className="border-transparent bg-surface-card" />
          <div className="overflow-hidden rounded-control bg-surface-card shadow-card">
            <button type="button" aria-label="Zoom in" className="block border-b border-border-default p-2"><Plus className="size-4" /></button>
            <button type="button" aria-label="Zoom out" className="block p-2"><Minus className="size-4" /></button>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <strong className="text-text-primary">#SH8743921</strong>
            <Badge className="bg-status-info-light text-status-info">In Transit</Badge>
            <Badge className="bg-status-success-light text-status-success">On Schedule</Badge>
          </div>
          <p className="text-small text-text-secondary">Courier: <strong className="text-text-primary">Daniel Cooper</strong> / SkyLogix Express</p>
        </div>
        <div className="relative my-6 flex items-center justify-between px-2">
          <span className="size-4 rounded-full bg-brand-primary ring-4 ring-brand-light" />
          <span className="absolute left-4 right-4 h-1 bg-border-default"><i className="block h-full w-1/2 bg-brand-primary" /></span>
          <span className="z-10 flex size-8 items-center justify-center rounded-full bg-brand-primary text-surface-card"><Truck className="size-4" /></span>
          <span className="z-10 size-4 rounded-full border-2 border-text-secondary bg-surface-card" />
        </div>
        <div className="grid gap-3 text-xs text-text-secondary tablet:grid-cols-2">
          <p><strong className="block text-small text-text-primary">San Francisco, CA, USA</strong>Mar 19, 2035, 10:30 AM</p>
          <p className="tablet:text-right"><strong className="block text-small text-text-primary">New York, NY, USA</strong>Mar 23, 2035, 03:00 PM (estimated)</p>
        </div>
      </div>
    </Card>
  );
}
