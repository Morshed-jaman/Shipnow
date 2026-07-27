import {
  forwardRef,
  useId,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
  leftAdornment?: ReactNode;
  rightAdornment?: ReactNode;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
    const textareaId = id ?? generatedId;
    const descriptionId = `${textareaId}-description`;

    return (
      <div className={cn("grid gap-2", containerClassName)}>
        <label
          htmlFor={textareaId}
          className="text-small font-semibold text-text-primary"
        >
          {label}
        </label>
        <div className="relative">
          {leftAdornment ? (
            <span className="pointer-events-none absolute left-3 top-3 text-text-secondary">
              {leftAdornment}
            </span>
          ) : null}
          <textarea
            ref={ref}
            id={textareaId}
            aria-invalid={Boolean(error)}
            aria-describedby={error || helperText ? descriptionId : undefined}
            className={cn(
              "min-h-24 w-full resize-y rounded-control border border-border-default bg-surface-input px-3 py-2 text-body text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
              leftAdornment && "pl-10",
              rightAdornment && "pr-10",
              error && "border-status-error focus:border-status-error focus:ring-status-error/20",
              className,
            )}
            {...props}
          />
          {rightAdornment ? (
            <span className="absolute right-3 top-3 text-text-secondary">
              {rightAdornment}
            </span>
          ) : null}
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

Textarea.displayName = "Textarea";
