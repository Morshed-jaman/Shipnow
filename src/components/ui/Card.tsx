import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  header?: ReactNode;
  footer?: ReactNode;
}

const paddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { children, className, footer, header, padding = "md", ...props },
    ref,
  ) => (
    <section
      ref={ref}
      className={cn(
        "overflow-hidden rounded-card border border-border-default bg-surface-card shadow-card",
        className,
      )}
      {...props}
    >
      {header ? (
        <header className="border-b border-border-default p-4">{header}</header>
      ) : null}
      <div className={paddings[padding]}>{children}</div>
      {footer ? (
        <footer className="border-t border-border-default p-4">{footer}</footer>
      ) : null}
    </section>
  ),
);

Card.displayName = "Card";
