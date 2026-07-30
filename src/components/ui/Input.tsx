import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  helperText?: string;
  error?: string;
  leftAdornment?: ReactNode;
  rightAdornment?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      error,
      helperText,
      id,
      label,
      leftAdornment,
      rightAdornment,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = error ? `${inputId}-error` : `${inputId}-description`;

    return (
      <div className={cn("grid gap-2", containerClassName)}>
        <label htmlFor={inputId} className="text-small font-semibold text-text-primary">
          {label}
        </label>
        <div className="relative">
          {leftAdornment ? (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-secondary">
              {leftAdornment}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error || helperText ? descriptionId : undefined}
            className={cn(
              "h-10 w-full rounded-control border border-border-default bg-surface-input px-3 text-body text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
              leftAdornment && "pl-10",
              rightAdornment && "pr-10",
              error && "border-brand-primary ring-1 ring-brand-primary focus:border-brand-primary focus:ring-brand-primary",
              className,
            )}
            {...props}
          />
          {rightAdornment ? (
            <span className="absolute inset-y-0 right-3 flex items-center text-text-secondary">
              {rightAdornment}
            </span>
          ) : null}
        </div>
        {error || helperText ? (
          <p
            id={descriptionId}
            className={cn("text-small text-text-secondary", error && "text-brand-primary")}
          >
            {error ?? helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
