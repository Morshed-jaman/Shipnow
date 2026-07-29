export const freightTypes = ["Road Freight", "Rail Freight", "Ocean Freight", "Air Freight"] as const;
export type FreightTypeTab = (typeof freightTypes)[number];

export const warehouseStats = [
  { label: "Total SKU", value: "285", unit: "", trend: "+2.58%" },
  { label: "Quantity on Hand", value: "12,450", unit: "units", trend: "+4.37%" },
  { label: "Capacity Usage", value: "62.5%", unit: "Full", trend: "+1.54%" },
] as const;

export const inventory = [
  { name: "Electronics", percent: 25, count: 2500, fill: "#856DF3" },
  { name: "Apparel", percent: 20, count: 2000, fill: "purple-hatch" },
  { name: "Home & Kitchen", percent: 18, count: 1800, fill: "#333333" },
  { name: "Beauty & Health", percent: 15, count: 1500, fill: "dark-hatch" },
  { name: "Automotive Parts", percent: 12, count: 1200, fill: "#9A9A9A" },
  { name: "Sports Equipment", percent: 10, count: 1000, fill: "grey-hatch" },
] as const;

export interface StorageRow {
  floor: number;
  section: string;
  category: string;
  percentage: number;
  available: number;
}

export const storageRows: StorageRow[] = [
  { floor: 1, section: "A1 – A10", category: "Electronics", percentage: 80, available: 20 },
  { floor: 2, section: "B1 – B10", category: "Apparel", percentage: 60, available: 40 },
  { floor: 1, section: "C1 – C10", category: "Home & Kitchen", percentage: 90, available: 10 },
  { floor: 3, section: "D1 – D10", category: "Automotive Parts", percentage: 50, available: 50 },
  { floor: 2, section: "E1 – E10", category: "Beauty & Health", percentage: 70, available: 30 },
];

export type PackageStatus = "Expected" | "Received" | "Sent";
export const packages = [
  { id: "PKG-HK77420", date: "March 20, 2035 – 05:30 PM", status: "Sent" as PackageStatus },
  { id: "PKG-A50812", date: "March 21, 2035 – 01:45 PM", status: "Received" as PackageStatus },
  { id: "PKG-E10293", date: "March 22, 2035 – 09:00 AM", status: "Expected" as PackageStatus },
];

export interface MapSection {
  name: string;
  shelves: Array<{ id: string; full: boolean }>;
  available: number;
  wide?: boolean;
}

const shelves = (prefix: string, count: number, fullThrough: number) =>
  Array.from({ length: count }, (_, index) => ({ id: `${prefix}${index + 1}`, full: index < fullThrough }));

export const floors: Record<"Floor 1" | "Floor 2" | "Floor 3", MapSection[]> = {
  "Floor 1": [
    { name: "Electronics", shelves: shelves("A", 3, 2), available: 20 },
    { name: "Home & Kitchen", shelves: shelves("C", 3, 3), available: 10 },
    { name: "Automotive Parts", shelves: shelves("D", 3, 2), available: 50 },
    { name: "Sports Equipment", shelves: shelves("F", 3, 1), available: 45 },
    { name: "Apparel", shelves: shelves("B", 10, 6), available: 20, wide: true },
    { name: "Beauty & Health", shelves: shelves("E", 4, 3), available: 30 },
  ],
  "Floor 2": [
    { name: "Bulk Apparel", shelves: shelves("G", 8, 4), available: 48, wide: true },
    { name: "Seasonal Goods", shelves: shelves("H", 5, 2), available: 60 },
    { name: "Returns", shelves: shelves("J", 4, 1), available: 75 },
  ],
  "Floor 3": [
    { name: "Automotive Reserve", shelves: shelves("K", 6, 4), available: 32, wide: true },
    { name: "Oversized Goods", shelves: shelves("L", 5, 3), available: 40 },
    { name: "Cold Storage", shelves: shelves("M", 4, 2), available: 50 },
  ],
};

export const activityLog = [
  { name: "Leo Fernandez", text: "confirmed receipt of 40 units of Winter Jacket Series in Section B3 (Apparel)", time: "01:45 PM" },
  { name: "Ava Martinez", text: "added 25 units of Smart Router Kit to Section A1 (Electronics)", time: "09:15 AM" },
  { name: "Oscar Liem", text: "dispatched 18 units of Stainless Steel Cookware Set from Section C5 (Home & Kitchen)", time: "05:30 PM" },
  { name: "Dina Choi", text: "created a shipment entry for Brake Pad Sets in Section D2 (Automotive Parts)", time: "04:10 PM" },
];
