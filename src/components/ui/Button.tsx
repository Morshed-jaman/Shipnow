import { LoaderCircle, type LucideIcon } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-surface-card hover:opacity-90 disabled:hover:opacity-100",
  secondary:
    "border border-border-default bg-surface-card text-text-primary hover:bg-surface-input",
  ghost: "bg-transparent text-text-primary hover:bg-surface-input",
  destructive:
    "bg-status-error text-surface-card hover:opacity-90 disabled:hover:opacity-100",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 gap-1 px-3 text-small",
  md: "h-10 gap-2 px-4 text-body",
  lg: "h-12 gap-2 px-6 text-large",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      leftIcon: LeftIcon,
      loading = false,
      rightIcon: RightIcon,
      size = "md",
      type = "button",
      variant = "primary",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-control font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
      ) : LeftIcon ? (
        <LeftIcon className="size-4 shrink-0" aria-hidden="true" />
      ) : null}
      <span>{children}</span>
      {!loading && RightIcon ? (
        <RightIcon className="size-4 shrink-0" aria-hidden="true" />
      ) : null}
    </button>
  ),
);

Button.displayName = "Button";
