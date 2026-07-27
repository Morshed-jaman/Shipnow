"use client";

import {
  createContext,
  forwardRef,
  useContext,
  type FieldsetHTMLAttributes,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

interface RadioContextValue {
  name: string;
  disabled?: boolean;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
}

const RadioContext = createContext<RadioContextValue | null>(null);

export interface RadioGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  label: string;
  name: string;
  orientation?: "horizontal" | "vertical";
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
}

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      children,
      className,
      disabled,
      label,
      name,
      onChange,
      orientation = "vertical",
      ...props
    },
    ref,
  ) => (
    <RadioContext.Provider value={{ name, disabled, onChange }}>
      <fieldset
        ref={ref}
        disabled={disabled}
        className={cn("grid gap-2", disabled && "opacity-50", className)}
        {...props}
      >
        <legend className="mb-2 text-small font-semibold text-text-primary">
          {label}
        </legend>
        <div className={cn("flex gap-4", orientation === "vertical" && "flex-col")}>
          {children}
        </div>
      </fieldset>
    </RadioContext.Provider>
  ),
);

RadioGroup.displayName = "RadioGroup";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type"> {
  label: string;
  name?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, disabled, label, name, onChange, ...props }, ref) => {
    const group = useContext(RadioContext);
    const resolvedName = name ?? group?.name;

    if (!resolvedName) {
      throw new Error("Radio must have a name or be rendered inside RadioGroup.");
    }

    return (
      <label
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 text-body text-text-primary",
          (disabled || group?.disabled) && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <input
          ref={ref}
          type="radio"
          name={resolvedName}
          disabled={disabled || group?.disabled}
          onChange={(event) => {
            onChange?.(event);
            group?.onChange?.(event);
          }}
          className="size-4 appearance-none rounded-full border border-border-default bg-surface-card outline-none checked:border-4 checked:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          {...props}
        />
        <span>{label}</span>
      </label>
    );
  },
);

Radio.displayName = "Radio";
