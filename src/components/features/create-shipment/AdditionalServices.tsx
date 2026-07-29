import { Checkbox } from "@/components/ui";
import type { CreateShipmentForm } from "./form-types";

export function AdditionalServices({ form }: { form: CreateShipmentForm }) {
  const { register } = form;
  return (
    <fieldset>
      <legend className="mb-4 font-bold text-text-primary">Additional Services</legend>
      <div className="grid gap-3 tablet:grid-cols-2">
        <Checkbox label="Insurance Coverage" {...register("insuranceCoverage")} />
        <Checkbox label="Signature on Delivery" {...register("signatureOnDelivery")} />
        <Checkbox label="Temperature Control" {...register("temperatureControl")} />
        <Checkbox label="Fragile Item Handling" {...register("fragileItemHandling")} />
      </div>
    </fieldset>
  );
}
