import { Input, Select } from "@/components/ui";
import { unitOptions } from "@/data/create-shipment";
import type { CreateShipmentForm } from "./form-types";

export function PackageDetailsSection({ form }: { form: CreateShipmentForm }) {
  const { formState: { errors }, register } = form;
  return (
    <section>
      <h3 className="mb-5 font-bold text-text-primary">Package Details</h3>
      <div className="grid gap-4 tablet:grid-cols-2">
        <Input label="Item Description" containerClassName="tablet:col-span-2" error={errors.itemDescription?.message} {...register("itemDescription")} />
        <Input label="Quantity" type="number" step="1" error={errors.quantity?.message} {...register("quantity", { valueAsNumber: true })} />
        <Input label="Value" type="number" leftAdornment={<span>$</span>} error={errors.value?.message} {...register("value", { valueAsNumber: true })} />
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
