import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui";
import { countryCodes, type CreateShipmentValues } from "@/data/create-shipment";
import type { CreateShipmentForm } from "./form-types";
import { violetErrorClass, violetErrorContainerClass } from "./form-types";

type Prefix = "sender" | "recipient";

export function ContactFields({ form, prefix }: { form: CreateShipmentForm; prefix: Prefix }) {
  const { formState: { errors }, register } = form;
  const company = `${prefix}Company` as const;
  const email = `${prefix}Email` as const;
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
          <div className="flex h-10 overflow-hidden rounded-control border border-border-default bg-surface-card focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20">
            <div className="flex shrink-0 items-center gap-1.5 border-r border-border-default px-3 text-body text-text-primary">
              <Image src="/flags/us.svg" alt="United States" width={24} height={16} className="h-4 w-6 rounded-sm object-cover" />
              <span>{countryCodes[0]}</span>
              <ChevronDown className="size-4 text-text-secondary" aria-hidden="true" />
            </div>
            <input type="hidden" {...register(`${prefix}CountryCode` as const)} />
            <input
              aria-label="Phone number"
              aria-invalid={Boolean(errors[phone])}
              className="min-w-0 flex-1 bg-transparent px-3 text-body text-text-primary outline-none"
              {...register(phone)}
            />
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
