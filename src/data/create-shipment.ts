import { z } from "zod";
import type { DefaultValues } from "react-hook-form";

const positiveNumber = (message: string) =>
  z.number().positive(message);

export const createShipmentSchema = z.object({
  senderCompany: z.string().min(1, "Company is required."),
  senderEmail: z.string().email("Enter a valid email address."),
  senderCountryCode: z.string(),
  senderPhone: z.string().min(1, "Phone number is required."),
  pickupAddress: z.string().min(1, "Pickup address is required."),
  recipientCompany: z.string().min(1, "Company is required."),
  recipientEmail: z.string().email("Enter a valid email address."),
  recipientCountryCode: z.string(),
  recipientPhone: z.string().min(1, "Phone number is required."),
  deliveryAddress: z.string().min(1, "Address is required."),
  itemDescription: z.string().min(1, "Item description is required."),
  quantity: positiveNumber("Quantity must be greater than 0."),
  value: positiveNumber("Value must be greater than 0."),
  weight: positiveNumber("Weight must be greater than 0."),
  units: z.string().min(1),
  length: positiveNumber("Length must be greater than 0."),
  width: positiveNumber("Width must be greater than 0."),
  height: positiveNumber("Height must be greater than 0."),
  freightType: z.string().min(1),
  carrier: z.string().min(1),
  shippingMethod: z.string().min(1, "Shipping method is required."),
  shipmentId: z.string(),
  shipmentDate: z.string().min(1, "Shipment date is required."),
  notes: z.string(),
  insuranceCoverage: z.boolean(),
  signatureOnDelivery: z.boolean(),
  temperatureControl: z.boolean(),
  fragileItemHandling: z.boolean(),
  notifyRecipient: z.boolean(),
});

export type CreateShipmentValues = z.infer<typeof createShipmentSchema>;

export const createShipmentDefaults = {
  senderCompany: "GreenHaven",
  senderEmail: "logistics@greenhaven.com",
  senderCountryCode: "+1",
  senderPhone: "408-555-7210",
  pickupAddress: "1120 Birch Street, Portland, OR 97205, USA",
  recipientCompany: "FreshNest",
  recipientEmail: "warehouse@freshnest.com",
  recipientCountryCode: "+1",
  recipientPhone: "786-555-4432",
  deliveryAddress: "",
  itemDescription: "Premium Garden Tool Set",
  quantity: 40,
  value: 3200,
  weight: 125,
  units: "Kg",
  length: 80,
  width: 60,
  height: undefined,
  freightType: "Road Freight",
  carrier: "FedEx",
  shippingMethod: "",
  shipmentId: "",
  shipmentDate: "2035-03-21",
  notes: "",
  insuranceCoverage: true,
  signatureOnDelivery: true,
  temperatureControl: true,
  fragileItemHandling: false,
  notifyRecipient: true,
} satisfies DefaultValues<CreateShipmentValues>;

export const countryCodes = ["+1"] as const;
export const unitOptions = ["Kg"] as const;
export const carrierOptions = ["FedEx"] as const;
export const shippingMethodOptions = ["Standard", "Express", "Priority"] as const;
export const freightTypeOptions = [
  "Road Freight",
  "Rail Freight",
  "Ocean Freight",
  "Air Freight",
] as const;
