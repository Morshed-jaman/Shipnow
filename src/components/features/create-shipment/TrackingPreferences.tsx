import { Controller } from "react-hook-form";
import { cn } from "@/lib/cn";
import type { CreateShipmentForm } from "./form-types";

export function TrackingPreferences({ form }: { form: CreateShipmentForm }) {
  return (
    <fieldset>
      <legend className="mb-4 font-bold text-text-primary">Tracking &amp; Status Updates</legend>
      <Controller control={form.control} name="notifyRecipient" render={({ field }) => (
        <label className="flex cursor-pointer items-center gap-3">
          <button type="button" role="switch" aria-checked={field.value} onClick={() => field.onChange(!field.value)}
            className={cn("relative h-6 w-11 rounded-full bg-border-default transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary", field.value && "bg-brand-primary")}>
            <span className={cn("absolute left-1 top-1 size-4 rounded-full bg-surface-card transition", field.value && "translate-x-5")} />
          </button>
          <span className="text-small font-semibold text-text-primary">Notify Recipient via Email/SMS</span>
        </label>
      )} />
    </fieldset>
  );
}
