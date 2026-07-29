import { Input, Select } from "@/components/ui";
import { countryCodes, type CreateShipmentValues } from "@/data/create-shipment";
import type { CreateShipmentForm } from "./form-types";
import { violetErrorClass, violetErrorContainerClass } from "./form-types";

type Prefix = "sender" | "recipient";

export function ContactFields({ form, prefix }: { form: CreateShipmentForm; prefix: Prefix }) {
  const { formState: { errors }, register } = form;
  const company = `${prefix}Company` as const;
  const email = `${prefix}Email` as const;
  const code = `${prefix}CountryCode` as const;
  const phone = `${prefix}Phone` as const;
  const address = prefix === "sender" ? "pickupAddress" : "deliveryAddress";
  const addressError = errors[address]?.message;

  return (
    <div className="grid min-w-0 gap-4">
      <Input label="Company" className="bg-surface-card" error={errors[company]?.message} {...register(company)} />
      <div className="grid min-w-0 gap-4 tablet:grid-cols-2">
        <Input label="Email" type="email" className="bg-surface-card" error={errors[email]?.message} {...register(email)} />
        <fieldset className="min-w-0">
          <legend className="mb-2 text-small font-semibold text-text-primary">Phone Number</legend>
          <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-2">
            <Select label="Country code" aria-label="Country code" className="bg-surface-card" containerClassName="[&>label]:sr-only" {...register(code)}>
              {countryCodes.map((option) => <option key={option}>{option}</option>)}
            </Select>
            <Input label="Phone number" aria-label="Phone number" containerClassName="[&>label]:sr-only" className="bg-surface-card" error={errors[phone]?.message} {...register(phone)} />
          </div>
        </fieldset>
      </div>
      <Input
        label={prefix === "sender" ? "Pickup Address" : "Delivery Address"}
        placeholder={prefix === "recipient" ? "Street address, city, state/province, ZIP code" : undefined}
        error={addressError}
        containerClassName={addressError ? violetErrorContainerClass : undefined}
        className={addressError ? `${violetErrorClass} bg-surface-card` : "bg-surface-card"}
        {...register(address as keyof CreateShipmentValues)}
      />
    </div>
  );
}
