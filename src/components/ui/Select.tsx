import {
  forwardRef,
  useId,
  type SelectHTMLAttributes,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      children,
      className,
      containerClassName,
      error,
      helperText,
      id,
      label,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const descriptionId = `${selectId}-description`;

    return (
      <div className={cn("grid gap-2", containerClassName)}>
        <label htmlFor={selectId} className="text-small font-semibold text-text-primary">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={Boolean(error)}
            aria-describedby={error || helperText ? descriptionId : undefined}
            className={cn(
              "h-10 w-full appearance-none rounded-control border border-border-default bg-surface-input px-3 pr-10 text-body text-text-primary outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-status-error focus:border-status-error focus:ring-status-error/20",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
        </div>
        {error || helperText ? (
          <p
            id={descriptionId}
            className={cn("text-small text-text-secondary", error && "text-status-error")}
          >
            {error ?? helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
