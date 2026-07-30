import { CalendarDays } from "lucide-react";
import { Controller } from "react-hook-form";
import { Input, Radio, RadioGroup, Select, Textarea } from "@/components/ui";
import { carrierOptions, freightTypeOptions, shippingMethodOptions } from "@/data/create-shipment";
import type { CreateShipmentForm } from "./form-types";
import { violetErrorClass, violetErrorContainerClass } from "./form-types";

export function ShippingDetailsSection({ form }: { form: CreateShipmentForm }) {
  const { control, formState: { errors }, register } = form;
  const methodError = errors.shippingMethod?.message;
  return (
    <section>
      <h3 className="mb-5 font-bold text-text-primary">Shipping Details</h3>
      <Controller control={control} name="freightType" render={({ field }) => (
        <RadioGroup label="Freight Type" name={field.name} orientation="horizontal" className="mb-4" onChange={(event) => field.onChange(event.target.value)}>
          <div className="grid grid-cols-2 gap-3 tablet:grid-cols-4">
            {freightTypeOptions.map((option) => <Radio key={option} value={option} label={option} checked={field.value === option} onBlur={field.onBlur} />)}
          </div>
        </RadioGroup>
      )} />
      <div className="grid gap-4 tablet:grid-cols-2">
        <Select label="Carrier" {...register("carrier")}>{carrierOptions.map((option) => <option key={option}>{option}</option>)}</Select>
        <Select label="Shipping Method" error={methodError} containerClassName={methodError ? violetErrorContainerClass : undefined}
          className={methodError ? violetErrorClass : undefined} {...register("shippingMethod")}>
          <option value="">Select Method</option>
          {shippingMethodOptions.map((option) => <option key={option}>{option}</option>)}
        </Select>
        <Input label="Shipment ID" readOnly placeholder="#SH9583742" helperText="Auto-generated" className="bg-surface-page" {...register("shipmentId")} />
        <Controller
          control={control}
          name="shipmentDate"
          render={({ field }) => (
            <Input
              label="Shipment Date"
              readOnly
              value={new Date(`${field.value}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              rightAdornment={<CalendarDays className="size-4" />}
              error={errors.shipmentDate?.message}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />
        <Textarea label="Notes" placeholder="Add special delivery notes (optional)" containerClassName="tablet:col-span-2" className="min-h-[108px]" {...register("notes")} />
      </div>
    </section>
  );
}
