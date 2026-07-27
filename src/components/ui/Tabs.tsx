"use client";

import {
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: readonly TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

export function Tabs({
  className,
  defaultValue,
  items,
  onValueChange,
  orientation = "horizontal",
  value,
  ...props
}: TabsProps) {
  const instanceId = useId();
  const firstEnabled = items.find((item) => !item.disabled)?.id ?? "";
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? firstEnabled,
  );
  const activeValue = value ?? internalValue;
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

  const selectTab = (id: string) => {
    if (value === undefined) setInternalValue(id);
    onValueChange?.(id);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    const enabledItems = items.filter((item) => !item.disabled);
    const currentId = items[currentIndex]?.id;
    const enabledIndex = enabledItems.findIndex((item) => item.id === currentId);
    const previousKeys =
      orientation === "horizontal" ? ["ArrowLeft"] : ["ArrowUp"];
    const nextKeys =
      orientation === "horizontal" ? ["ArrowRight"] : ["ArrowDown"];
    let nextIndex: number | undefined;

    if (previousKeys.includes(event.key)) {
      nextIndex = (enabledIndex - 1 + enabledItems.length) % enabledItems.length;
    } else if (nextKeys.includes(event.key)) {
      nextIndex = (enabledIndex + 1) % enabledItems.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = enabledItems.length - 1;
    }

    if (nextIndex !== undefined) {
      event.preventDefault();
      const nextId = enabledItems[nextIndex]?.id;
      if (nextId) {
        selectTab(nextId);
        tabRefs.current.get(nextId)?.focus();
      }
    }
  };

  const activeItem = items.find((item) => item.id === activeValue);

  return (
    <div
      className={cn(
        orientation === "vertical" && "flex gap-4",
        className,
      )}
      {...props}
    >
      <div
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          "flex border-border-default",
          orientation === "horizontal"
            ? "border-b"
            : "flex-col border-r",
        )}
      >
        {items.map((item, index) => {
          const selected = item.id === activeValue;
          return (
            <button
              key={item.id}
              ref={(node) => {
                if (node) tabRefs.current.set(item.id, node);
                else tabRefs.current.delete(item.id);
              }}
              id={`${instanceId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${instanceId}-panel-${item.id}`}
              disabled={item.disabled}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "px-4 py-3 text-small font-semibold text-text-secondary outline-none transition hover:text-text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50",
                selected &&
                  (orientation === "horizontal"
                    ? "border-b-2 border-brand-primary text-brand-primary"
                    : "border-r-2 border-brand-primary text-brand-primary"),
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem ? (
        <div
          id={`${instanceId}-panel-${activeItem.id}`}
          role="tabpanel"
          aria-labelledby={`${instanceId}-tab-${activeItem.id}`}
          tabIndex={0}
          className="p-4 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          {activeItem.content}
        </div>
      ) : null}
    </div>
  );
}
