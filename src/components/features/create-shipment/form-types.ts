import type { UseFormReturn } from "react-hook-form";
import type { CreateShipmentValues } from "@/data/create-shipment";

export type CreateShipmentForm = UseFormReturn<CreateShipmentValues>;

export const violetErrorClass =
  "border-brand-primary focus:border-brand-primary focus:ring-brand-primary/20";
export const violetErrorContainerClass = "[&>p]:!text-brand-primary";
