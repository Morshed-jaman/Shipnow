export const tableShipmentStatuses = ["Delivery", "Completed", "Pending"] as const;
export type ShipmentStatus = (typeof tableShipmentStatuses)[number];

export const gridShipmentStatuses = [
  "In Transit",
  "Out for Delivery",
  "Delivered",
  "Processing",
] as const;
export type GridShipmentStatus = (typeof gridShipmentStatuses)[number];

export type FreightType = "Air Freight" | "Road Freight" | "Ocean Freight" | "Rail Freight";

export interface Shipment {
  id: string;
  freightType: FreightType;
  company: string;
  logo: string;
  category: string;
  carrier: string;
  productCategory: string;
  origin: string;
  destination: string;
  gridOrigin: string;
  gridDestination: string;
  weight: number;
  items: number;
  date: string;
  atd: string;
  eta: string;
  progress: number;
  gridProgress: number;
  status: ShipmentStatus;
  gridStatus: GridShipmentStatus;
  sequence: number;
  gridOrder: number;
}

type ShipmentSeed = Omit<Shipment, "items" | "date" | "atd" | "eta" | "logo" | "sequence">;

const companyLogos: Record<string, string> = {
  "TechGear Inc.": "/company-logos/techgear.png",
  "StyleHub Co.": "/company-logos/style.png",
  FreshNest: "/company-logos/fresh.png",
  "FitPlus Gear": "/company-logos/fitplus.png",
  EcoLights: "/company-logos/eco.png",
  "AutoParts Pro": "/company-logos/auto.png",
  GreenHaven: "/company-logos/green.png",
  ModaWear: "/company-logos/moda.png",
  "SunCore Panels": "/company-logos/sun.png",
  QuickParts: "/company-logos/quick.png",
  VitaFresh: "/company-logos/vita.png",
  StyleDepot: "/company-logos/styledepot.png",
};

const fallbackLogos = Object.values(companyLogos);

function getCompanyLogo(company: string) {
  const knownLogo = companyLogos[company];
  if (knownLogo) return knownLogo;

  const stableIndex = Array.from(company).reduce(
    (hash, character) => (hash * 31 + character.codePointAt(0)!) >>> 0,
    0,
  );
  return fallbackLogos[stableIndex % fallbackLogos.length];
}

const seeds: ShipmentSeed[] = [
  { id: "#SH9283746", company: "TechGear Inc.", category: "Electronics", carrier: "FedEx", productCategory: "Electronics", weight: 1200, origin: "Minneapolis, MN", destination: "Kansas City, MO", gridOrigin: "Los Angeles, CA", gridDestination: "Chicago, IL", progress: 60, gridProgress: 60, status: "Delivery", gridStatus: "In Transit", freightType: "Air Freight", gridOrder: 0 },
  { id: "#SH9182635", company: "StyleHub Co.", category: "Apparel", carrier: "DHL", productCategory: "Apparel", weight: 850, origin: "New York, NY", destination: "Atlanta, GA", gridOrigin: "New York, NY", gridDestination: "Atlanta, GA", progress: 75, gridProgress: 75, status: "Delivery", gridStatus: "Out for Delivery", freightType: "Road Freight", gridOrder: 1 },
  { id: "#SH9037821", company: "FreshNest", category: "Home & Kitchen", carrier: "UPS", productCategory: "Kitchen Appliances", weight: 1450, origin: "Dallas, TX", destination: "Miami, FL", gridOrigin: "Dallas, TX", gridDestination: "Miami, FL", progress: 100, gridProgress: 100, status: "Completed", gridStatus: "Delivered", freightType: "Ocean Freight", gridOrder: 2 },
  { id: "#SH9374652", company: "FitPlus Gear", category: "Sports & Outdoors", carrier: "USPS", productCategory: "Fitness Equipment", weight: 960, origin: "Seattle, WA", destination: "Denver, CO", gridOrigin: "Seattle, WA", gridDestination: "Denver, CO", progress: 40, gridProgress: 40, status: "Pending", gridStatus: "Processing", freightType: "Rail Freight", gridOrder: 3 },
  { id: "#SH9457830", company: "AutoParts Pro", category: "Automotive", carrier: "Aramex", productCategory: "Engine Components", weight: 1680, origin: "Detroit, MI", destination: "San Diego, CA", gridOrigin: "Detroit, MI", gridDestination: "San Diego, CA", progress: 50, gridProgress: 100, status: "Delivery", gridStatus: "Delivered", freightType: "Road Freight", gridOrder: 5 },
  { id: "#SH8821349", company: "EcoLights", category: "Electronics", carrier: "FedEx", productCategory: "Electronics", weight: 1100, origin: "Austin, TX", destination: "Phoenix, AZ", gridOrigin: "Austin, TX", gridDestination: "Phoenix, AZ", progress: 90, gridProgress: 90, status: "Delivery", gridStatus: "Out for Delivery", freightType: "Road Freight", gridOrder: 4 },
  { id: "#SH8967432", company: "GreenHaven", category: "Home & Garden", carrier: "USPS", productCategory: "Home Tools", weight: 1250, origin: "Portland, OR", destination: "Salt Lake City, UT", gridOrigin: "Portland, OR", gridDestination: "Salt Lake City, UT", progress: 65, gridProgress: 65, status: "Delivery", gridStatus: "In Transit", freightType: "Rail Freight", gridOrder: 6 },
  { id: "#SH8893247", company: "ModaWear", category: "Apparel", carrier: "DHL", productCategory: "Apparel", weight: 920, origin: "Boston, MA", destination: "Charlotte, NC", gridOrigin: "Boston, MA", gridDestination: "Charlotte, NC", progress: 80, gridProgress: 80, status: "Delivery", gridStatus: "Out for Delivery", freightType: "Air Freight", gridOrder: 7 },
  { id: "#SH9018723", company: "SunCore Panels", category: "Electronics", carrier: "UPS", productCategory: "Solar Equipment", weight: 1375, origin: "San Diego, CA", destination: "Reno, NV", gridOrigin: "San Diego, CA", gridDestination: "Reno, NV", progress: 30, gridProgress: 30, status: "Pending", gridStatus: "Processing", freightType: "Ocean Freight", gridOrder: 8 },
  { id: "#SH8881190", company: "VitaFresh", category: "Food & Beverage", carrier: "Local Courier", productCategory: "Perishables", weight: 980, origin: "Nashville, TN", destination: "Jacksonville, FL", gridOrigin: "Nashville, TN", gridDestination: "Jacksonville, FL", progress: 85, gridProgress: 85, status: "Delivery", gridStatus: "Out for Delivery", freightType: "Road Freight", gridOrder: 10 },
  { id: "#SH8776103", company: "StyleDepot", category: "Fashion", carrier: "FedEx", productCategory: "Fashion Items", weight: 1020, origin: "Minneapolis, MN", destination: "Kansas City, MO", gridOrigin: "Minneapolis, MN", gridDestination: "Kansas City, MO", progress: 60, gridProgress: 60, status: "Delivery", gridStatus: "In Transit", freightType: "Air Freight", gridOrder: 11 },
  { id: "#SH9113471", company: "QuickParts", category: "Automotive", carrier: "Aramex", productCategory: "Auto Parts", weight: 1320, origin: "Tampa, FL", destination: "Houston, TX", gridOrigin: "Tampa, FL", gridDestination: "Houston, TX", progress: 90, gridProgress: 90, status: "Delivery", gridStatus: "In Transit", freightType: "Road Freight", gridOrder: 9 },
];

export const shipments: Shipment[] = Array.from({ length: 192 }, (_, index) => {
  const seed = seeds[index % seeds.length];
  const day = (index % 27) + 1;
  const nextDay = Math.min(day + 3, 31);
  const hour = String(8 + (index % 9)).padStart(2, "0");
  const etaHour = String(10 + (index % 8)).padStart(2, "0");

  return {
    ...seed,
    logo: getCompanyLogo(seed.company),
    sequence: index,
    gridOrder: index < seeds.length ? seed.gridOrder : index,
    id: index < seeds.length ? seed.id : `#SH${String(9500000 + index).padStart(7, "0")}`,
    items: 8 + (index % 36),
    date: `Mar ${day}, 2035`,
    atd: `Mar ${day}, 2035 – ${hour}:30`,
    eta: `Mar ${nextDay}, 2035 – ${etaHour}:00`,
  };
});
