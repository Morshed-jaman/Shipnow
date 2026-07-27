"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ModalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  closeLabel?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  closeOnOverlayClick?: boolean;
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      className,
      closeLabel = "Close dialog",
      closeOnOverlayClick = true,
      description,
      footer,
      initialFocusRef,
      onClose,
      open,
      title,
      ...props
    },
    forwardedRef,
  ) => {
    const titleId = useId();
    const descriptionId = useId();
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (!open) return;
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const frame = requestAnimationFrame(() => {
        const target =
          initialFocusRef?.current ??
          dialogRef.current?.querySelector<HTMLElement>(focusableSelector) ??
          dialogRef.current;
        target?.focus();
      });

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
          return;
        }
        if (event.key !== "Tab" || !dialogRef.current) return;
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
        );
        if (!focusable.length) {
          event.preventDefault();
          dialogRef.current.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        cancelAnimationFrame(frame);
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
        previouslyFocused.current?.focus();
      };
    }, [initialFocusRef, onClose, open]);

    if (!open) return null;

    const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-action-dark/50 p-4"
        onMouseDown={handleOverlayClick}
      >
        <div
          ref={(node) => {
            dialogRef.current = node;
            if (typeof forwardedRef === "function") forwardedRef(node);
            else if (forwardedRef) forwardedRef.current = node;
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
          tabIndex={-1}
          className={cn(
            "w-full max-w-lg rounded-card border border-border-default bg-surface-card shadow-card outline-none",
            className,
          )}
          {...props}
        >
          <header className="flex items-start justify-between gap-4 border-b border-border-default p-4">
            <div className="grid gap-1">
              <h2 id={titleId} className="text-large font-bold text-text-primary">
                {title}
              </h2>
              {description ? (
                <div id={descriptionId} className="text-small text-text-secondary">
                  {description}
                </div>
              ) : null}
            </div>
            <button
              type="button"
              aria-label={closeLabel}
              onClick={onClose}
              className="rounded-control p-2 text-text-secondary hover:bg-surface-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </header>
          <div className="p-4">{children}</div>
          {footer ? (
            <footer className="border-t border-border-default p-4">{footer}</footer>
          ) : null}
        </div>
      </div>
    );
  },
);

Modal.displayName = "Modal";
