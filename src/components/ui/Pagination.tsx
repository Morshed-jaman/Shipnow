"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: readonly number[];
  className?: string;
}

export function Pagination({
  className,
  onPageChange,
  onPageSizeChange,
  page,
  pageSize,
  pageSizeOptions = [10, 25, 50],
  total,
}: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, total);

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 text-small text-text-secondary",
        className,
      )}
    >
      <span>
        {start}–{end} of {total}
      </span>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <span>Rows per page</span>
          <select
            aria-label="Rows per page"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="h-8 rounded-control border border-border-default bg-surface-card px-2 text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <span>
          Page {safePage} of {pageCount}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Previous page"
            disabled={safePage <= 1}
            onClick={() => onPageChange(safePage - 1)}
            className="rounded-control border border-border-default p-2 text-text-primary hover:bg-surface-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next page"
            disabled={safePage >= pageCount}
            onClick={() => onPageChange(safePage + 1)}
            className="rounded-control border border-border-default p-2 text-text-primary hover:bg-surface-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  );
}
