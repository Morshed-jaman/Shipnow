import { ChevronDown, ChevronUp } from "lucide-react";
import { Controller } from "react-hook-form";
import { Input, Select } from "@/components/ui";
import { unitOptions } from "@/data/create-shipment";
import type { CreateShipmentForm } from "./form-types";

export function PackageDetailsSection({ form }: { form: CreateShipmentForm }) {
  const { formState: { errors }, register } = form;
  return (
    <section>
      <h3 className="mb-5 font-bold text-text-primary">Package Details</h3>
      <div className="grid gap-4 tablet:grid-cols-2 lg:grid-cols-4">
        <Input label="Item Description" containerClassName="tablet:col-span-2 lg:col-span-4" error={errors.itemDescription?.message} {...register("itemDescription")} />
        <Controller
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <Input
              label="Quantity"
              type="number"
              min={1}
              step="1"
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              error={errors.quantity?.message}
              value={field.value}
              onBlur={field.onBlur}
              onChange={(event) => field.onChange(event.target.valueAsNumber)}
              ref={field.ref}
              rightAdornment={
                <span className="flex flex-col">
                  <button type="button" aria-label="Increase quantity" className="leading-none text-text-secondary" onClick={() => field.onChange(Math.max(1, field.value + 1))}>
                    <ChevronUp className="size-3" />
                  </button>
                  <button type="button" aria-label="Decrease quantity" className="leading-none text-text-secondary" onClick={() => field.onChange(Math.max(1, field.value - 1))}>
                    <ChevronDown className="size-3" />
                  </button>
                </span>
              }
            />
          )}
        />
        <Controller
          control={form.control}
          name="value"
          render={({ field }) => (
            <Input
              label="Value"
              inputMode="numeric"
              error={errors.value?.message}
              value={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(field.value)}
              onBlur={field.onBlur}
              onChange={(event) => field.onChange(Number(event.target.value.replace(/[^\d]/g, "")))}
              ref={field.ref}
            />
          )}
        />
        <Input label="Weight" type="number" error={errors.weight?.message} {...register("weight", { valueAsNumber: true })} />
        <Select label="Units" error={errors.units?.message} {...register("units")}>{unitOptions.map((option) => <option key={option}>{option}</option>)}</Select>
      </div>
      <fieldset className="mt-4">
        <legend className="mb-2 text-small font-semibold text-text-primary">Dimensions</legend>
        <div className="grid gap-3 tablet:grid-cols-3">
          {(["length", "width", "height"] as const).map((field) => (
            <Input key={field} label={field[0].toUpperCase() + field.slice(1)} type="number" placeholder={field === "height" ? "ex. 20" : undefined}
              rightAdornment={<span className="text-xs">cm</span>} error={errors[field]?.message}
              {...register(field, { valueAsNumber: true })} />
          ))}
        </div>
      </fieldset>
    </section>
  );
}
