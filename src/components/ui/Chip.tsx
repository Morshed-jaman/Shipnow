import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface ChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-pressed"> {
  selected?: boolean;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, selected = false, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-full border px-3 text-small font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        selected
          ? "border-brand-primary bg-brand-primary text-surface-card"
          : "border-border-default bg-surface-card text-text-secondary hover:bg-surface-input",
        className,
      )}
      {...props}
    />
  ),
);

Chip.displayName = "Chip";
