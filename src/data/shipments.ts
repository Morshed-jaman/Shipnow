export const shipmentStatuses = ["Delivery", "Completed", "Pending"] as const;
export type ShipmentStatus = (typeof shipmentStatuses)[number];
export type FreightType = "Air Freight" | "Road Freight" | "Ocean Freight" | "Rail Freight";

export interface Shipment {
  id: string;
  freightType: FreightType;
  company: string;
  category: string;
  carrier: string;
  productCategory: string;
  origin: string;
  destination: string;
  weight: number;
  items: number;
  date: string;
  atd: string;
  eta: string;
  progress: number;
  status: ShipmentStatus;
}

const seeds: Omit<Shipment, "id" | "items" | "date" | "atd" | "eta">[] = [
  { company: "TechGear Inc.", category: "Electronics", carrier: "FedEx", productCategory: "Electronics", weight: 1200, origin: "Minneapolis, MN", destination: "Kansas City, MO", progress: 60, status: "Delivery", freightType: "Air Freight" },
  { company: "StyleHub Co.", category: "Apparel", carrier: "DHL", productCategory: "Apparel", weight: 850, origin: "New York, NY", destination: "Atlanta, GA", progress: 75, status: "Delivery", freightType: "Road Freight" },
  { company: "FreshNest", category: "Home & Kitchen", carrier: "UPS", productCategory: "Kitchen Appliances", weight: 1450, origin: "Dallas, TX", destination: "Miami, FL", progress: 100, status: "Completed", freightType: "Ocean Freight" },
  { company: "FitPlus Gear", category: "Sports & Outdoors", carrier: "USPS", productCategory: "Fitness Equipment", weight: 960, origin: "Seattle, WA", destination: "Denver, CO", progress: 40, status: "Pending", freightType: "Rail Freight" },
  { company: "AutoParts Pro", category: "Automotive", carrier: "Aramex", productCategory: "Engine Components", weight: 1680, origin: "Detroit, MI", destination: "San Diego, CA", progress: 50, status: "Delivery", freightType: "Road Freight" },
  { company: "EcoLights", category: "Home Improvement", carrier: "Local Courier", productCategory: "Lighting", weight: 720, origin: "Austin, TX", destination: "Phoenix, AZ", progress: 90, status: "Delivery", freightType: "Road Freight" },
  { company: "GreenHaven", category: "Garden", carrier: "FedEx", productCategory: "Garden Tools", weight: 1250, origin: "Portland, OR", destination: "Boston, MA", progress: 30, status: "Pending", freightType: "Rail Freight" },
  { company: "ModaWear", category: "Apparel", carrier: "DHL", productCategory: "Fashion", weight: 680, origin: "Chicago, IL", destination: "Nashville, TN", progress: 100, status: "Completed", freightType: "Air Freight" },
  { company: "SunCore Panels", category: "Energy", carrier: "UPS", productCategory: "Solar Equipment", weight: 2100, origin: "San Jose, CA", destination: "Houston, TX", progress: 65, status: "Delivery", freightType: "Ocean Freight" },
  { company: "VitaFresh", category: "Food & Beverage", carrier: "USPS", productCategory: "Fresh Produce", weight: 1100, origin: "Orlando, FL", destination: "Richmond, VA", progress: 100, status: "Completed", freightType: "Road Freight" },
  { company: "StyleDepot", category: "Apparel", carrier: "Aramex", productCategory: "Clothing", weight: 780, origin: "Brooklyn, NY", destination: "New Orleans, LA", progress: 20, status: "Pending", freightType: "Air Freight" },
];

const ids = ["#SH9283746", "#SH9182635", "#SH9037821", "#SH9374652", "#SH9457830"];

export const shipments: Shipment[] = Array.from({ length: 192 }, (_, index) => {
  const seed = seeds[index % seeds.length];
  const day = (index % 27) + 1;
  const nextDay = Math.min(day + 3, 31);
  return {
    ...seed,
    id: ids[index] ?? `#SH${String(9500000 + index).padStart(7, "0")}`,
    items: 8 + (index % 36),
    date: `Mar ${day}, 2035`,
    atd: `Mar ${day}, 2035 – ${String(8 + (index % 9)).padStart(2, "0")}:30`,
    eta: `Mar ${nextDay}, 2035 – ${String(10 + (index % 8)).padStart(2, "0")}:00`,
  };
});
