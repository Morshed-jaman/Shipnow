"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChevronDown,
  Ellipsis,
  Plane,
  Ship,
  SlidersHorizontal,
  TrainFront,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import {
  activityLog,
  floors,
  freightTypes,
  inventory,
  packages,
  storageRows,
  warehouseStats,
  type FreightTypeTab,
  type PackageStatus,
  type StorageRow,
} from "@/data/warehouse";
import { cn } from "@/lib/cn";

const freightIcons = {
  "Road Freight": Truck,
  "Rail Freight": TrainFront,
  "Ocean Freight": Ship,
  "Air Freight": Plane,
} as const;
const floorNames = ["Floor 1", "Floor 2", "Floor 3"] as const;
const statusTabs: Array<"All" | PackageStatus> = ["All", "Expected", "Received", "Sent"];

function MenuButton({ label }: { label: string }) {
  return <button type="button" aria-label={label} className="rounded-control p-1 text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"><Ellipsis className="size-5" /></button>;
}

function WarehouseHeader({ active, onChange }: { active: FreightTypeTab; onChange: (value: FreightTypeTab) => void }) {
  return (
    <header className="flex min-w-0 flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Warehouse</h1>
        <nav aria-label="Breadcrumb" className="mt-2 flex gap-2 text-small text-text-secondary">
          <Link href="/dashboard">Dashboard</Link><span>/</span><span aria-current="page">Warehouse</span>
        </nav>
      </div>
      <div role="tablist" aria-label="Freight type" className="flex gap-2">
        {freightTypes.map((type, index) => {
          const Icon = freightIcons[type];
          return (
            <button key={type} type="button" role="tab" aria-selected={active === type} aria-label={type} onClick={() => onChange(type)}
              className={cn("inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border-default bg-surface-card px-3 text-small font-semibold text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary", active === type && "border-action-dark bg-action-dark text-surface-card")}>
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              <span className={cn(index > 0 && "hidden tablet:inline")}>{type}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}

function StatCards() {
  return (
    <section aria-label="Warehouse summary" className="grid h-full grid-cols-3 gap-2 tablet:gap-4 desktop:grid-cols-1">
      {warehouseStats.map((stat) => (
        <Card key={stat.label} padding="sm" className="min-w-0 desktop:p-2">
          <p className="min-h-10 text-xs font-semibold leading-tight text-text-secondary tablet:min-h-0 tablet:text-small">{stat.label}</p>
          <p className="mt-2 text-lg font-bold text-text-primary tablet:text-2xl">{stat.value} {stat.unit ? <span className="text-xs font-normal text-text-secondary">{stat.unit}</span> : null}</p>
          <span className="mt-2 inline-flex rounded-full bg-status-success-light px-2 py-1 text-[11px] font-bold text-status-success">▲ {stat.trend}</span>
        </Card>
      ))}
    </section>
  );
}

function PatternDefs({ suffix }: { suffix: string }) {
  return (
    <defs>
      <pattern id={`purple-${suffix}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="#E3DDFF" /><line x1="0" y1="0" x2="0" y2="7" stroke="#856DF3" strokeWidth="3" /></pattern>
      <pattern id={`dark-${suffix}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="#777" /><line x1="0" y1="0" x2="0" y2="7" stroke="#333" strokeWidth="3" /></pattern>
      <pattern id={`grey-${suffix}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="#E0E0E0" /><line x1="0" y1="0" x2="0" y2="7" stroke="#9A9A9A" strokeWidth="3" /></pattern>
    </defs>
  );
}

function inventoryFill(fill: string, suffix: string) {
  if (fill === "purple-hatch") return `url(#purple-${suffix})`;
  if (fill === "dark-hatch") return `url(#dark-${suffix})`;
  if (fill === "grey-hatch") return `url(#grey-${suffix})`;
  return fill;
}

function InventoryCard() {
  return (
    <Card padding="lg" className="h-full min-w-0">
      <div className="flex items-start justify-between">
        <div><h2 className="font-bold">Warehouse Inventory</h2><p className="mt-3 text-3xl font-bold">10,000 <span className="text-small font-normal text-text-secondary">packages</span></p></div>
        <MenuButton label="Warehouse inventory menu" />
      </div>
      <div className="mt-6 hidden h-64 grid-cols-6 gap-3 tablet:grid">
        {inventory.map((item, index) => {
          const suffix = `v${index}`;
          return (
            <div key={item.name} className="grid min-w-0 grid-rows-[40px_1fr_36px] text-center">
              <p className="text-xs font-semibold leading-tight">{item.name}</p>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[item]} margin={{ top: 4, right: 6, left: 6, bottom: 0 }}>
                  <PatternDefs suffix={suffix} /><YAxis domain={[0, 30]} hide />
                  <Bar dataKey="percent" background={{ fill: "#F0F0F0", radius: 6 }} radius={[6, 6, 0, 0]}>
                    <Cell fill={inventoryFill(item.fill, suffix)} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs"><strong>{item.percent}%</strong> <span className="text-text-secondary">· {item.count.toLocaleString()}</span></p>
            </div>
          );
        })}
      </div>
      <div className="mt-5 grid gap-4 tablet:hidden">
        {inventory.map((item, index) => {
          const suffix = `h${index}`;
          return (
            <div key={item.name} className="grid grid-cols-[minmax(0,1fr)_130px] items-center gap-3">
              <div className="h-8 min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[item]} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <PatternDefs suffix={suffix} /><XAxis type="number" domain={[0, 30]} hide /><YAxis type="category" dataKey="name" hide />
                    <Bar dataKey="percent" background={{ fill: "#F0F0F0", radius: 6 }} radius={[0, 6, 6, 0]}><Cell fill={inventoryFill(item.fill, suffix)} /></Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div><p className="text-xs font-semibold">{item.name}</p><p className="text-xs"><strong>{item.percent}%</strong> <span className="text-text-secondary">· {item.count.toLocaleString()}</span></p></div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function CapacityCard() {
  const capacity = [{ name: "Loaded", value: 62.5 }, { name: "Empty", value: 37.5 }];
  return (
    <Card padding="lg" className="h-full border-action-dark bg-action-dark text-surface-card">
      <div className="flex justify-between"><h2 className="font-bold">Capacity Usage</h2><MenuButton label="Capacity usage menu" /></div>
      <div className="relative mx-auto h-56 max-w-64">
        <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={capacity} dataKey="value" innerRadius={67} outerRadius={90} startAngle={90} endAngle={-270} stroke="none"><Cell fill="#856DF3" /><Cell fill="#E0E0E0" /></Pie></PieChart></ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-content-center text-center"><span className="text-xs text-white/60">Total Usage</span><strong className="text-3xl">62.5%</strong></div>
      </div>
      <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
        <p><span className="block text-xs text-white/60">Loaded</span><strong>40 shelves</strong></p>
        <p><span className="block text-xs text-white/60">Empty</span><strong>24 shelves</strong></p>
      </div>
    </Card>
  );
}

function StorageCard() {
  const [sortKey, setSortKey] = useState<keyof StorageRow>("section");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [floorOneOnly, setFloorOneOnly] = useState(false);
  const rows = useMemo(() => storageRows.filter((row) => !floorOneOnly || row.floor === 1).toSorted((a, b) => {
    const result = String(a[sortKey]).localeCompare(String(b[sortKey]), undefined, { numeric: true });
    return direction === "asc" ? result : -result;
  }), [direction, floorOneOnly, sortKey]);
  const requestSort = (key: keyof StorageRow) => {
    if (key === sortKey) setDirection((value) => value === "asc" ? "desc" : "asc");
    else { setSortKey(key); setDirection("asc"); }
  };
  const columns: Array<{ key: keyof StorageRow; label: string }> = [
    { key: "floor", label: "Floor" }, { key: "section", label: "Section" }, { key: "category", label: "Category" },
    { key: "percentage", label: "Storage Used" }, { key: "percentage", label: "Percentage" }, { key: "available", label: "Available Space" },
  ];
  return (
    <Card padding="none" className="min-w-0">
      <div className="flex flex-col gap-3 p-5 tablet:flex-row tablet:items-center">
        <h2 className="font-bold">Warehouse Storage</h2>
        <div className="flex gap-2 tablet:ml-auto">
          <button type="button" aria-pressed={floorOneOnly} onClick={() => setFloorOneOnly((value) => !value)} className={cn("inline-flex h-9 items-center gap-2 rounded-control border border-border-default px-3 text-small font-semibold", floorOneOnly && "bg-brand-light text-brand-primary")}><SlidersHorizontal className="size-4" />Filter <ChevronDown className="size-4" /></button>
          <label className="relative"><span className="sr-only">Sort storage by</span><select value={sortKey} onChange={(event) => setSortKey(event.target.value as keyof StorageRow)} className="h-9 appearance-none rounded-control border border-border-default bg-surface-card pl-3 pr-8 text-small"><option value="section">Sort by: Section</option><option value="floor">Sort by: Floor</option><option value="category">Sort by: Category</option><option value="percentage">Sort by: Usage</option></select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 size-4" /></label>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-small">
          <thead className="bg-surface-input text-text-secondary"><tr>{columns.map((column, index) => <th key={`${column.key}-${index}`} className="px-4 py-3 text-left"><button type="button" onClick={() => requestSort(column.key)} className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">{column.label}</button></th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={`${row.floor}-${row.section}`} className="border-t border-border-default"><td className="px-4 py-3">{row.floor}</td><td className="px-4 py-3 whitespace-nowrap">{row.section}</td><td className="px-4 py-3 whitespace-nowrap">{row.category}</td><td className="px-4 py-3"><div className="h-2 w-28 overflow-hidden rounded-full bg-border-default"><span className="block h-full rounded-full bg-brand-primary" style={{ width: `${row.percentage}%` }} /></div></td><td className="px-4 py-3">{row.percentage}%</td><td className="px-4 py-3 font-bold">{row.available}<span className="font-normal text-text-secondary">/100</span></td></tr>)}</tbody>
        </table>
      </div>
    </Card>
  );
}

function PackageStatusCard() {
  const [active, setActive] = useState<"All" | PackageStatus>("All");
  const visible = packages.filter((item) => active === "All" || item.status === active);
  const styles = { Sent: "bg-surface-page text-text-secondary", Received: "bg-status-success-light text-status-success", Expected: "bg-status-warning-light text-status-warning" };
  return (
    <Card padding="lg" className="h-full">
      <div className="flex justify-between"><h2 className="font-bold">Package Status</h2><MenuButton label="Package status menu" /></div>
      <div role="tablist" aria-label="Package status" className="mt-4 flex flex-wrap gap-2">{statusTabs.map((tab) => <button key={tab} type="button" role="tab" aria-selected={active === tab} onClick={() => setActive(tab)} className={cn("rounded-full border border-border-default px-3 py-1.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary", active === tab && "border-action-dark bg-action-dark text-surface-card")}>{tab}</button>)}</div>
      <ul className="mt-4 divide-y divide-border-default">{visible.map((item) => <li key={item.id} className="flex items-center gap-3 py-4"><Image src="/warehouse-icons/pkg.png" alt={`${item.id} package`} width={38} height={38} className="size-[38px] shrink-0 object-contain" /><span className="min-w-0 flex-1"><strong className="block text-small">{item.id}</strong><span className="text-xs text-text-secondary">{item.date}</span></span><span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", styles[item.status])}>{item.status}</span></li>)}</ul>
    </Card>
  );
}

function WarehouseMapCard() {
  const [floor, setFloor] = useState<(typeof floorNames)[number]>("Floor 1");
  return (
    <Card padding="lg">
      <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center"><h2 className="font-bold">Warehouse Map</h2><div role="tablist" aria-label="Warehouse floor" className="flex gap-2 tablet:ml-auto">{floorNames.map((name) => <button key={name} type="button" role="tab" aria-selected={floor === name} onClick={() => setFloor(name)} className={cn("rounded-full border border-border-default px-3 py-1.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary", floor === name && "border-action-dark bg-action-dark text-surface-card")}>{name}</button>)}</div></div>
      <div className="mt-5 grid gap-3 tablet:grid-cols-4">{floors[floor].map((section) => <section key={section.name} className={cn("rounded-card border border-border-default p-3", section.wide && "tablet:col-span-3")}><h3 className="text-small font-bold">{section.name}</h3><div className="mt-3 flex flex-wrap gap-2">{section.shelves.map((shelf) => <span key={shelf.id} className={cn("rounded px-2 py-1 text-xs font-semibold text-brand-dark", shelf.full ? "bg-brand-primary text-white" : "bg-brand-light")}>{shelf.id}</span>)}</div><p className="mt-4 text-xs text-text-secondary">Available Space <strong className="text-text-primary">{section.available}</strong>/100</p></section>)}</div>
      <div className="mt-5 flex gap-5 text-xs text-text-secondary"><span className="flex items-center gap-2"><i className="size-3 rounded bg-brand-light" />Available</span><span className="flex items-center gap-2"><i className="size-3 rounded bg-brand-primary" />Full</span></div>
    </Card>
  );
}

function ActivityCard() {
  return (
    <Card padding="lg" className="h-full">
      <div className="flex justify-between"><h2 className="font-bold">Warehouse Activity Log</h2><MenuButton label="Warehouse activity menu" /></div>
      <ul className="mt-4 divide-y divide-border-default">{activityLog.map((entry) => <li key={entry.name} className="flex gap-3 py-4"><Image src={entry.icon} alt={`${entry.name} activity icon`} width={34} height={34} className="size-[34px] shrink-0 object-contain" /><p className="text-small leading-relaxed"><strong className="text-brand-primary">{entry.name}</strong> {entry.text}<span className="mt-1 block text-xs text-text-secondary">{entry.time}</span></p></li>)}</ul>
    </Card>
  );
}

export function WarehousePageClient() {
  const [freight, setFreight] = useState<FreightTypeTab>("Road Freight");
  return (
    <div className="grid min-w-0 gap-5">
      <WarehouseHeader active={freight} onChange={setFreight} />
      <div className="grid min-w-0 gap-5 tablet:grid-cols-2 desktop:grid-cols-12">
        <div className="min-w-0 tablet:col-span-2 desktop:col-span-3"><StatCards /></div>
        <div className="min-w-0 tablet:col-span-2 desktop:col-span-5"><InventoryCard /></div>
        <div className="min-w-0 desktop:col-span-4"><CapacityCard /></div>
        <div className="min-w-0 order-5 tablet:col-span-2 desktop:order-4 desktop:col-span-8"><StorageCard /></div>
        <div className="min-w-0 order-4 desktop:order-5 desktop:col-span-4"><PackageStatusCard /></div>
        <div className="min-w-0 order-6 tablet:col-span-2 desktop:col-span-8"><WarehouseMapCard /></div>
        <div className="min-w-0 order-7 tablet:col-span-2 desktop:col-span-4"><ActivityCard /></div>
      </div>
      <DashboardFooter />
    </div>
  );
}
