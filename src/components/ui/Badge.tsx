import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "success" | "warning" | "error" | "neutral" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  success: "bg-status-success/10 text-status-success",
  warning: "bg-status-warning/10 text-status-warning",
  error: "bg-status-error/10 text-status-error",
  neutral: "bg-status-neutral/10 text-status-neutral",
  info: "bg-status-info/10 text-status-info",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-small font-semibold",
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";
export const StatusPill = Badge;
