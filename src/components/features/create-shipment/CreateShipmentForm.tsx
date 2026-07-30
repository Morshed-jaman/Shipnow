"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createShipmentDefaults,
  createShipmentSchema,
  type CreateShipmentValues,
} from "@/data/create-shipment";
import { AdditionalServices } from "./AdditionalServices";
import { FormActions } from "./FormActions";
import { PackageDetailsSection } from "./PackageDetailsSection";
import { SenderRecipientSection } from "./SenderRecipientSection";
import { ShippingDetailsSection } from "./ShippingDetailsSection";
import { TrackingPreferences } from "./TrackingPreferences";

export function CreateShipmentForm() {
  const router = useRouter();
  const form = useForm<CreateShipmentValues>({
    resolver: zodResolver(createShipmentSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: createShipmentDefaults,
  });
  const { formState: { isSubmitting }, handleSubmit, reset } = form;

  useEffect(() => {
    void form.trigger(["deliveryAddress", "shippingMethod"]);
  }, [form]);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async () => {
        await new Promise((resolve) => setTimeout(resolve, 450));
        router.push("/shipments");
      })}
      className="grid gap-6 rounded-card bg-surface-card p-4 shadow-card tablet:p-5"
    >
      <h2 className="font-bold text-text-primary">Shipment Form</h2>
      <SenderRecipientSection form={form} />
      <div className="grid min-w-0 gap-8 lg:grid-cols-2">
        <PackageDetailsSection form={form} />
        <ShippingDetailsSection form={form} />
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <AdditionalServices form={form} />
        <TrackingPreferences form={form} />
      </div>
      <FormActions
        loading={isSubmitting}
        onDelete={() => reset(createShipmentDefaults)}
      />
    </form>
  );
}
