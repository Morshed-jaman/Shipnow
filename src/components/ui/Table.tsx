"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import type { Key, ReactNode } from "react";
import { Checkbox } from "./Checkbox";
import { cn } from "@/lib/cn";

export type SortDirection = "asc" | "desc";

export interface TableSort {
  key: string;
  direction: SortDirection;
}

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  accessor?: keyof T;
  render?: (row: T, rowIndex: number) => ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  headerClassName?: string;
  cellClassName?: string;
}

export interface TableProps<T> {
  data: readonly T[];
  columns: readonly TableColumn<T>[];
  getRowId: (row: T, rowIndex: number) => Key;
  sort?: TableSort;
  onSortChange?: (sort: TableSort) => void;
  selectedRowIds?: ReadonlySet<Key>;
  onSelectionChange?: (selected: ReadonlySet<Key>) => void;
  pagination?: ReactNode;
  emptyState?: ReactNode;
  caption?: string;
  className?: string;
}

const alignments = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export function Table<T>({
  caption,
  className,
  columns,
  data,
  emptyState = "No data available.",
  getRowId,
  onSelectionChange,
  onSortChange,
  pagination,
  selectedRowIds = new Set<Key>(),
  sort,
}: TableProps<T>) {
  const selectable = Boolean(onSelectionChange);
  const rowIds = data.map(getRowId);
  const allSelected =
    rowIds.length > 0 && rowIds.every((id) => selectedRowIds.has(id));
  const someSelected =
    !allSelected && rowIds.some((id) => selectedRowIds.has(id));

  const toggleAll = () => {
    const next = new Set(selectedRowIds);
    if (allSelected) rowIds.forEach((id) => next.delete(id));
    else rowIds.forEach((id) => next.add(id));
    onSelectionChange?.(next);
  };

  const toggleRow = (id: Key) => {
    const next = new Set(selectedRowIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange?.(next);
  };

  const requestSort = (column: TableColumn<T>) => {
    if (!column.sortable || !onSortChange) return;
    onSortChange({
      key: column.key,
      direction:
        sort?.key === column.key && sort.direction === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className={cn("overflow-hidden rounded-card border border-border-default bg-surface-card", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-body text-text-primary">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead className="bg-surface-input text-small text-text-secondary">
            <tr>
              {selectable ? (
                <th scope="col" className="w-12 px-4 py-3 text-left">
                  <Checkbox
                    label="Select all rows"
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                    className="[&>span:last-child]:sr-only"
                  />
                </th>
              ) : null}
              {columns.map((column) => {
                const direction =
                  sort?.key === column.key ? sort.direction : undefined;
                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={
                      direction
                        ? direction === "asc"
                          ? "ascending"
                          : "descending"
                        : column.sortable
                          ? "none"
                          : undefined
                    }
                    className={cn(
                      "px-4 py-3 font-semibold",
                      alignments[column.align ?? "left"],
                      column.headerClassName,
                    )}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        onClick={() => requestSort(column)}
                        className="inline-flex items-center gap-1 rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                      >
                        {column.header}
                        {direction === "asc" ? (
                          <ArrowUp className="size-4" aria-hidden="true" />
                        ) : direction === "desc" ? (
                          <ArrowDown className="size-4" aria-hidden="true" />
                        ) : (
                          <ChevronsUpDown className="size-4" aria-hidden="true" />
                        )}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((row, rowIndex) => {
                const rowId = getRowId(row, rowIndex);
                return (
                  <tr key={rowId} className="border-t border-border-default hover:bg-surface-input">
                    {selectable ? (
                      <td className="px-4 py-3">
                        <Checkbox
                          label={`Select row ${rowIndex + 1}`}
                          checked={selectedRowIds.has(rowId)}
                          onChange={() => toggleRow(rowId)}
                          className="[&>span:last-child]:sr-only"
                        />
                      </td>
                    ) : null}
                    {columns.map((column) => {
                      const value = column.accessor
                        ? row[column.accessor]
                        : undefined;
                      return (
                        <td
                          key={column.key}
                          className={cn(
                            "px-4 py-3",
                            alignments[column.align ?? "left"],
                            column.cellClassName,
                          )}
                        >
                          {column.render
                            ? column.render(row, rowIndex)
                            : (value as ReactNode)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-12 text-center text-text-secondary"
                >
                  {emptyState}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination ? (
        <div className="border-t border-border-default p-4">{pagination}</div>
      ) : null}
    </div>
  );
}
