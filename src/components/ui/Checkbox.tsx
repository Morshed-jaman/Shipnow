"use client";

import { Check, Minus } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, className, disabled, indeterminate = false, label, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 text-body text-text-primary",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <span className="relative inline-flex size-4 shrink-0">
          <input
            ref={inputRef}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            aria-checked={indeterminate ? "mixed" : checked}
            className="peer size-4 appearance-none rounded border border-border-default bg-surface-card outline-none checked:border-brand-primary checked:bg-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            {...props}
          />
          {indeterminate ? (
            <Minus className="pointer-events-none absolute inset-0 size-4 text-surface-card" aria-hidden="true" />
          ) : (
            <Check className="pointer-events-none absolute inset-0 hidden size-4 text-surface-card peer-checked:block" aria-hidden="true" />
          )}
        </span>
        <span>{label}</span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
