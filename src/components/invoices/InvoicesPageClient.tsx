"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  CircleDashed,
  Clock3,
  FileText,
  Plus,
  Receipt,
  Search,
  Settings2,
  X,
} from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Card, Checkbox, Input } from "@/components/ui";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import {
  calculateInvoiceTotals,
  formatCurrency,
  invoiceKpis,
  invoices,
  type Invoice,
  type InvoiceStatus,
} from "@/data/invoices";
import { cn } from "@/lib/cn";

type SortKey = "id" | "company" | "shippingId" | "issued" | "amount" | "status";
type LineSortKey = "description" | "shipmentType" | "price" | "quantity" | "amount";
const desktopQuery = "(min-width: 1440px)";

function subscribeDesktop(callback: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function useDesktopLayout() {
  return useSyncExternalStore(subscribeDesktop, () => window.matchMedia(desktopQuery).matches, () => false);
}

const statusStyles: Record<InvoiceStatus, string> = {
  Paid: "bg-status-success-light text-status-success",
  Unpaid: "bg-brand-light text-brand-dark",
  Overdue: "bg-surface-page text-text-secondary",
};

function KpiIcon({ type }: { type: (typeof invoiceKpis)[number]["icon"] }) {
  if (type === "paid") return <BadgeCheck className="size-6" aria-hidden="true" />;
  if (type === "pending") return <CircleDashed className="size-6" aria-hidden="true" />;
  if (type === "overdue") return <span className="relative grid size-7 place-items-center"><CircleDashed className="absolute inset-0 size-7" aria-hidden="true" /><Clock3 className="size-4" aria-hidden="true" /></span>;
  return (
    <span className="relative">
      <Receipt className="size-6" aria-hidden="true" />
      <X className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2" strokeWidth={3} aria-hidden="true" />
    </span>
  );
}

function InvoicesHeader({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) {
  return (
    <header className="hidden items-end justify-between gap-4 tablet:flex">
      <div>
        <h1 className="text-2xl font-bold">Invoices &amp; Billing</h1>
        <nav aria-label="Breadcrumb" className="mt-2 flex gap-2 text-small text-text-secondary"><Link href="/dashboard">Dashboard</Link><span>/</span><span aria-current="page">Invoices &amp; Billing</span></nav>
      </div>
      <Input label="Search" placeholder="Search anything" value={query} onChange={(event) => onQueryChange(event.target.value)} leftAdornment={<Search className="size-4" />} containerClassName="w-64 [&>label]:sr-only desktop:w-[360px]" className="bg-surface-card" />
    </header>
  );
}

function InvoiceKpis() {
  return (
    <section aria-label="Invoice summary" className="grid grid-cols-2 gap-3 tablet:gap-5 desktop:grid-cols-4">
      {invoiceKpis.map((kpi) => {
        return (
          <Card key={kpi.label} padding="md" className="min-w-0">
            <div className="flex flex-col items-start gap-3 tablet:flex-row tablet:items-center">
              <span className="grid size-12 shrink-0 place-items-center rounded-control bg-brand-primary text-surface-card"><KpiIcon type={kpi.icon} /></span>
              <div className="min-w-0 tablet:ml-auto tablet:text-right">
                <p className="text-xs font-semibold text-text-primary tablet:text-small">{kpi.label}</p>
                <p className="mt-1 text-xl font-bold tablet:text-2xl">{formatCurrency(kpi.amount).replace(".00", "")}</p>
                <p className="mt-2 whitespace-nowrap text-xs text-text-secondary">from <strong className="rounded bg-surface-page px-1.5 py-0.5 text-text-primary">{kpi.count}</strong> Invoices</p>
              </div>
            </div>
          </Card>
        );
      })}
    </section>
  );
}

function SortIndicator({ active, direction }: { active: boolean; direction: "asc" | "desc" }) {
  if (!active) return <ChevronsUpDown className="size-3.5 text-text-secondary/60" aria-hidden="true" />;
  return direction === "asc"
    ? <ChevronUp className="size-3.5 text-brand-primary" aria-hidden="true" />
    : <ChevronDown className="size-3.5 text-brand-primary" aria-hidden="true" />;
}

function SortButton({ label, column, onSort, sort }: { label: string; column: SortKey; onSort: (key: SortKey) => void; sort: { key: SortKey; direction: "asc" | "desc" } }) {
  return <button type="button" onClick={() => onSort(column)} className="inline-flex items-center gap-1 whitespace-nowrap rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">{label}<SortIndicator active={sort.key === column} direction={sort.direction} /></button>;
}

function CompanyLogo({ invoice }: { invoice: Invoice }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span role="img" aria-label={`${invoice.company} logo fallback`} className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-page text-xs font-bold text-text-secondary">{invoice.company.charAt(0)}</span>;
  return <Image src={invoice.logo} alt={`${invoice.company} logo`} width={28} height={28} onError={() => setFailed(true)} className="size-7 shrink-0 object-contain" />;
}

interface InvoiceListProps {
  rows: Invoice[];
  activeRowId: string | null;
  checkedIds: ReadonlySet<string>;
  sort: { key: SortKey; direction: "asc" | "desc" };
  query: string;
  status: "All" | InvoiceStatus;
  showSearch: boolean;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: "All" | InvoiceStatus) => void;
  onToggleSearch: () => void;
  onSelect: (invoice: Invoice) => void;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  onSort: (key: SortKey) => void;
}

function InvoiceList(props: InvoiceListProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const allChecked = props.rows.length > 0 && props.rows.every((row) => props.checkedIds.has(row.id));
  const someChecked = !allChecked && props.rows.some((row) => props.checkedIds.has(row.id));
  return (
    <Card padding="none" className="min-w-0">
      <div className="flex items-center gap-2 p-4 tablet:p-5">
        <h2 className="mr-auto font-bold">Invoices</h2>
        <Input label="Search invoices" placeholder="Search invoices" value={props.query} onChange={(event) => props.onQueryChange(event.target.value)} leftAdornment={<Search className="size-4" />} containerClassName="hidden w-48 [&>label]:sr-only tablet:grid" />
        <button type="button" aria-label="Search invoices" onClick={props.onToggleSearch} className="grid size-9 place-items-center rounded-control border border-border-default tablet:hidden"><Search className="size-4" /></button>
        <div className="relative">
          <button type="button" aria-label="Filter" aria-expanded={filterOpen} onClick={() => setFilterOpen((value) => !value)} className="grid size-9 place-items-center rounded-control border border-border-default"><Settings2 className="size-4" /></button>
          {filterOpen ? <div className="absolute right-0 top-11 z-20 grid w-32 rounded-card border border-border-default bg-surface-card p-2 shadow-lg">{(["All", "Paid", "Unpaid", "Overdue"] as const).map((value) => <button key={value} type="button" onClick={() => { props.onStatusChange(value); setFilterOpen(false); }} className={cn("rounded px-3 py-2 text-left text-small hover:bg-surface-input", props.status === value && "bg-brand-light text-brand-dark")}>{value}</button>)}</div> : null}
        </div>
        <button type="button" aria-label="New Invoice" className="inline-flex h-9 items-center gap-2 rounded-control bg-action-dark px-3 text-small font-semibold text-surface-card"><Plus className="size-4" /><span className="hidden tablet:inline">New Invoice</span></button>
      </div>
      {props.showSearch ? <div className="px-4 pb-3 tablet:hidden"><Input label="Search invoices" placeholder="Search invoices" value={props.query} onChange={(event) => props.onQueryChange(event.target.value)} leftAdornment={<Search className="size-4" />} containerClassName="[&>label]:sr-only" /></div> : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-small tablet:min-w-[900px]">
          <caption className="sr-only">Invoices</caption>
          <thead className="bg-surface-input text-text-secondary"><tr>
            <th scope="col" className="w-12 px-4 py-3"><Checkbox label="Select all invoices" checked={allChecked} indeterminate={someChecked} onChange={props.onToggleAll} className="[&>span:last-child]:sr-only" /></th>
            <th scope="col" className="px-3 py-3 text-left"><SortButton label="Invoice ID" column="id" onSort={props.onSort} sort={props.sort} /></th>
            <th scope="col" className="px-3 py-3 text-left"><SortButton label="Company" column="company" onSort={props.onSort} sort={props.sort} /></th>
            <th scope="col" className="hidden px-3 py-3 text-left tablet:table-cell"><SortButton label="Shipping ID" column="shippingId" onSort={props.onSort} sort={props.sort} /></th>
            <th scope="col" className="px-3 py-3 text-left"><SortButton label="Date" column="issued" onSort={props.onSort} sort={props.sort} /></th>
            <th scope="col" className="hidden px-3 py-3 text-left tablet:table-cell"><SortButton label="Amount" column="amount" onSort={props.onSort} sort={props.sort} /></th>
            <th scope="col" className="hidden px-3 py-3 text-left tablet:table-cell"><SortButton label="Status" column="status" onSort={props.onSort} sort={props.sort} /></th>
          </tr></thead>
          <tbody>{props.rows.length ? props.rows.map((invoice) => (
            <tr key={invoice.id} tabIndex={0} aria-selected={props.checkedIds.has(invoice.id) || props.activeRowId === invoice.id} onClick={() => props.onSelect(invoice)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); props.onSelect(invoice); } }}
              className={cn("cursor-pointer border-t border-border-default bg-surface-card hover:bg-surface-input focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary", (props.checkedIds.has(invoice.id) || props.activeRowId === invoice.id) && "bg-brand-light/60")}>
              <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}><Checkbox label={`Select ${invoice.id}`} checked={props.checkedIds.has(invoice.id)} onChange={() => props.onToggleRow(invoice.id)} className="[&>span:last-child]:sr-only" /></td>
              <td className="whitespace-nowrap px-3 py-3 font-semibold text-brand-primary">{invoice.id} <FileText className="inline size-3.5" /></td>
              <td className="px-3 py-3"><div className="flex min-w-32 items-center gap-2"><CompanyLogo invoice={invoice} /><span><strong className="whitespace-nowrap">{invoice.company}</strong><span className="block text-xs text-text-secondary tablet:hidden">{invoice.shippingId}</span></span></div></td>
              <td className="hidden whitespace-nowrap px-3 py-3 tablet:table-cell">{invoice.shippingId}</td>
              <td className="whitespace-nowrap px-3 py-3"><span className="block">{invoice.issued} <i className="not-italic text-text-secondary">(Issued)</i></span><span className="block">{invoice.due} <i className="not-italic text-text-secondary">(Due)</i></span></td>
              <td className="hidden whitespace-nowrap px-3 py-3 font-semibold tablet:table-cell">{formatCurrency(invoice.amount)}</td>
              <td className="hidden px-3 py-3 tablet:table-cell"><span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", statusStyles[invoice.status])}>{invoice.status}</span></td>
            </tr>
          )) : <tr><td colSpan={7} className="px-4 py-12 text-center text-text-secondary">No invoices found.</td></tr>}</tbody>
        </table>
      </div>
    </Card>
  );
}

function DetailActions({ mobile = false }: { mobile?: boolean }) {
  return <div className={cn("items-center gap-2", mobile ? "mt-6 grid w-full grid-cols-3 border-t border-border-default pt-5 tablet:hidden" : "hidden tablet:flex")}><button type="button" className="h-9 w-full rounded-control bg-surface-page px-3 text-small font-semibold">Edit</button><button type="button" className="h-9 w-full rounded-control bg-surface-page px-3 text-small font-semibold">Hold</button><button type="button" className="h-9 w-full whitespace-nowrap rounded-control bg-action-dark px-3 text-small font-semibold text-surface-card">Send Invoice</button></div>;
}

function LineSortButton({ label, column, sort, onSort }: { label: string; column: LineSortKey; sort: { key: LineSortKey; direction: "asc" | "desc" }; onSort: (key: LineSortKey) => void }) {
  return <button type="button" onClick={() => onSort(column)} className="inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">{label}<SortIndicator active={sort.key === column} direction={sort.direction} /></button>;
}

function InvoiceDetails({ invoice, showBack, onBack }: { invoice: Invoice; showBack: boolean; onBack: () => void }) {
  const totals = calculateInvoiceTotals(invoice.lineItems);
  const [lineSort, setLineSort] = useState<{ key: LineSortKey; direction: "asc" | "desc" }>({ key: "description", direction: "asc" });
  const lineItems = useMemo(() => invoice.lineItems.toSorted((a, b) => {
    const first = lineSort.key === "amount" ? a.price * a.quantity : a[lineSort.key];
    const second = lineSort.key === "amount" ? b.price * b.quantity : b[lineSort.key];
    const result = String(first).localeCompare(String(second), undefined, { numeric: true });
    return lineSort.direction === "asc" ? result : -result;
  }), [invoice.lineItems, lineSort]);
  const sortLines = (key: LineSortKey) => setLineSort((current) => ({ key, direction: current.key === key && current.direction === "asc" ? "desc" : "asc" }));
  return (
    <Card padding="none" className="min-w-0">
      <div className="flex items-center gap-2 border-b border-border-default p-4 tablet:p-5">
        {showBack ? <button type="button" aria-label="Back to invoices" onClick={onBack} className="rounded-control p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary desktop:hidden"><ArrowLeft className="size-5" /></button> : null}
        <h2 className="mr-auto font-bold">Invoice Details</h2><DetailActions />
      </div>
      <div className="p-4 tablet:p-5">
        <div className="flex flex-col gap-4 tablet:flex-row tablet:justify-between">
          <div><p className="font-bold">Invoice <span className="text-brand-primary">#{invoice.id}</span></p><span className={cn("mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", statusStyles[invoice.status])}>{invoice.status}</span></div>
          <div className="text-small tablet:text-right"><p><span className="text-text-secondary">Issue Date</span> &nbsp; {invoice.issued}</p><p className="mt-2"><span className="text-text-secondary">Due Date</span> &nbsp; {invoice.due}</p></div>
        </div>
        <div className="mt-5 grid gap-4 rounded-card bg-surface-input p-4 tablet:grid-cols-2 tablet:gap-5">
          <address className="not-italic"><p className="text-xs text-text-secondary">Bill From</p><strong className="mt-2 block">{invoice.company}</strong><p className="text-small"><span>{invoice.email}</span><span className="tablet:hidden"> · {invoice.phone}</span></p><p className="mt-1 text-small">{invoice.address}</p><p className="mt-1 hidden text-small tablet:block">{invoice.phone}</p></address>
          <address className="border-t border-border-default pt-4 not-italic tablet:border-t-0 tablet:pt-0 tablet:text-right"><p className="text-xs text-text-secondary">Bill To</p><strong className="mt-2 block">ShipNow Logistics</strong><p className="text-small"><span>accounts@shipnow.com</span><span className="tablet:hidden"> · +1 704-555-9911</span></p><p className="mt-1 text-small">901 Distribution Ave, Charlotte, NC 28217, USA</p><p className="mt-1 hidden text-small tablet:block">+1 704-555-9911</p></address>
        </div>
        <h3 className="mt-6 font-bold">Package Summary</h3>
        <div className="mt-3 min-w-0"><table className="w-full table-fixed border-collapse text-xs tablet:text-small"><thead className="bg-surface-input text-text-secondary"><tr><th scope="col" className="w-[36%] px-2 py-2 text-left tablet:w-[28%]"><LineSortButton label="Description" column="description" sort={lineSort} onSort={sortLines} /></th><th scope="col" className="w-[34%] px-2 py-2 text-left tablet:w-[24%]"><LineSortButton label="Shipment Type" column="shipmentType" sort={lineSort} onSort={sortLines} /></th><th scope="col" className="hidden w-[14%] px-2 py-2 text-right tablet:table-cell"><LineSortButton label="Price" column="price" sort={lineSort} onSort={sortLines} /></th><th scope="col" className="hidden w-[10%] px-2 py-2 text-right tablet:table-cell"><LineSortButton label="Qty" column="quantity" sort={lineSort} onSort={sortLines} /></th><th scope="col" className="w-[30%] px-2 py-2 text-right tablet:w-[24%]"><span className="inline-flex justify-end"><LineSortButton label="Amount" column="amount" sort={lineSort} onSort={sortLines} /></span></th></tr></thead><tbody>{lineItems.map((item, index) => <tr key={`${item.description}-${index}`} className="border-t border-border-default"><td className="min-w-0 px-2 py-3 align-top"><span className="block break-words">{item.description}</span><span className="mt-1 block text-[11px] font-semibold text-brand-primary tablet:hidden">{formatCurrency(item.price)} × {item.quantity}</span></td><td className="min-w-0 break-words px-2 py-3 align-top">{item.shipmentType}<span className="block text-[11px] text-text-secondary">{item.serviceTier}</span></td><td className="hidden px-2 py-3 text-right align-top tablet:table-cell">{formatCurrency(item.price)}</td><td className="hidden px-2 py-3 text-right align-top tablet:table-cell">{item.quantity}</td><td className="whitespace-nowrap px-2 py-3 text-right align-top font-semibold">{formatCurrency(item.price * item.quantity)}</td></tr>)}</tbody></table></div>
        <dl className="ml-auto mt-4 grid w-full max-w-64 grid-cols-2 gap-y-2 text-small"><dt>Sub Total</dt><dd className="text-right font-semibold">{formatCurrency(totals.subTotal)}</dd><dt>Tax (8%)</dt><dd className="text-right font-semibold">{formatCurrency(totals.tax)}</dd><dt>Fee</dt><dd className="text-right font-semibold">{formatCurrency(totals.fee)}</dd><dt className="border-t border-border-default pt-3 font-bold">Total</dt><dd className="border-t border-border-default pt-3 text-right font-bold">{formatCurrency(totals.total)}</dd></dl>
        <div className="mt-6"><h3 className="font-bold">Note</h3><p className="mt-2 text-small leading-relaxed text-text-secondary">Please process payment by the due date to avoid delivery disruption. Late fees may apply after 3 business days past due.</p></div>
        <DetailActions mobile />
      </div>
    </Card>
  );
}

export function InvoicesPageClient() {
  const isDesktop = useDesktopLayout();
  const [selected, setSelected] = useState(() => invoices.find((invoice) => invoice.id === "INV-1008") ?? invoices[0]);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [checkedIds, setCheckedIds] = useState<ReadonlySet<string>>(() => new Set());
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | InvoiceStatus>("All");
  const [sort, setSort] = useState<{ key: SortKey; direction: "asc" | "desc" }>({ key: "id", direction: "asc" });
  const [detailOpen, setDetailOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const rows = useMemo(() => invoices.filter((invoice) => {
    const needle = query.trim().toLowerCase();
    return (!needle || `${invoice.id} ${invoice.company} ${invoice.shippingId}`.toLowerCase().includes(needle)) && (status === "All" || invoice.status === status);
  }).toSorted((a, b) => {
    const result = String(a[sort.key]).localeCompare(String(b[sort.key]), undefined, { numeric: true });
    return sort.direction === "asc" ? result : -result;
  }), [query, sort, status]);
  const selectInvoice = (invoice: Invoice) => { setSelected(invoice); setActiveRowId(invoice.id); if (!isDesktop) setDetailOpen(true); };
  const requestSort = (key: SortKey) => setSort((current) => ({ key, direction: current.key === key && current.direction === "asc" ? "desc" : "asc" }));
  const toggleRow = (id: string) => setCheckedIds((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const toggleAll = () => setCheckedIds((current) => rows.every((row) => current.has(row.id)) ? new Set() : new Set(rows.map((row) => row.id)));
  return (
    <div className="grid min-w-0 gap-5">
      <InvoicesHeader query={query} onQueryChange={setQuery} />
      <InvoiceKpis />
      <div className="grid min-w-0 gap-5 desktop:grid-cols-[minmax(0,3fr)_minmax(380px,2fr)]">
        {isDesktop || !detailOpen ? <InvoiceList rows={rows} activeRowId={activeRowId} checkedIds={checkedIds} sort={sort} query={query} status={status} showSearch={showMobileSearch} onQueryChange={setQuery} onStatusChange={setStatus} onToggleSearch={() => setShowMobileSearch((value) => !value)} onSelect={selectInvoice} onToggleRow={toggleRow} onToggleAll={toggleAll} onSort={requestSort} /> : null}
        {isDesktop || detailOpen ? <InvoiceDetails invoice={selected} showBack={!isDesktop} onBack={() => setDetailOpen(false)} /> : null}
      </div>
      <DashboardFooter />
    </div>
  );
}
