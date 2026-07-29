import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface ShipmentsPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function ShipmentsPagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: ShipmentsPaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const pages =
    pageCount <= 4
      ? Array.from({ length: pageCount }, (_, index) => index + 1)
      : [1, 2, 3, pageCount];

  return (
    <div className="flex flex-col gap-4 text-small text-text-secondary tablet:flex-row tablet:items-center tablet:justify-between">
      <label className="flex items-center gap-2">
        Show
        <select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="h-9 rounded-control border border-border-default bg-surface-card px-2 text-text-primary"
        >
          {[12, 24, 48].map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
        of 1,240 results
      </label>

      <nav aria-label="Shipment pages" className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-control p-2 disabled:opacity-40"
        >
          <ChevronLeft className="size-4" />
        </button>
        {pages.map((number, index) => (
          <span key={number} className="contents">
            {index === 3 && <span className="px-1">…</span>}
            <button
              type="button"
              onClick={() => onPageChange(number)}
              className={cn(
                "size-8 rounded-control",
                page === number && "bg-action-dark text-surface-card",
              )}
            >
              {number}
            </button>
          </span>
        ))}
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="rounded-control p-2 disabled:opacity-40"
        >
          <ChevronRight className="size-4" />
        </button>
      </nav>
    </div>
  );
}
