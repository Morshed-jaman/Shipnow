export type TrendDirection = "up" | "down";

export interface Metric {
  label: string;
  value: string;
  icon: "truck" | "monitor" | "dollar";
  delta: string;
  direction: TrendDirection;
  comparison: string;
}

export const metrics: Metric[] = [
  { label: "Active Shipments", value: "1,284 shipments", icon: "truck", delta: "+8.7%", direction: "up", comparison: "from last week" },
  { label: "Delivery Performance", value: "94.3% on-time", icon: "monitor", delta: "-1.2%", direction: "down", comparison: "from last week" },
  { label: "Revenue", value: "$82,450", icon: "dollar", delta: "+12.4%", direction: "up", comparison: "from last month" },
];

export const shipmentStatistics = [
  { month: "Jan", value: 1600 }, { month: "Feb", value: 2050 },
  { month: "Mar", value: 1900 }, { month: "Apr", value: 2700 },
  { month: "May", value: 3124 }, { month: "Jun", value: 2900 },
  { month: "Jul", value: 3800 }, { month: "Aug", value: 4352 },
];

export const profitSummary = [
  { month: "Jan", revenue: 58, cost: 33 }, { month: "Feb", revenue: 66, cost: 38 },
  { month: "Mar", revenue: 62, cost: 36 }, { month: "Apr", revenue: 76, cost: 42 },
  { month: "May", revenue: 87.524, cost: 45.68 }, { month: "Jun", revenue: 79, cost: 47 },
  { month: "Jul", revenue: 91, cost: 52 }, { month: "Aug", revenue: 96, cost: 55 },
];

export const shipmentTypes = [
  { name: "Road Freight", value: 1150, percent: 46, color: "#856DF3" },
  { name: "Air Freight", value: 700, percent: 28, color: "#333333" },
  { name: "Ocean Freight", value: 425, percent: 17, color: "#E0E0E0" },
  { name: "Rail Freight", value: 225, percent: 9, color: "#9A9A9A" },
];

export const productCategories = [
  { name: "Electronics", count: 240, percent: 24, color: "#856DF3" },
  { name: "Home & Kitchen", count: 200, percent: 20, color: "#A594F7" },
  { name: "Apparel", count: 180, percent: 18, color: "#C3B8FA" },
  { name: "Beauty & Health", count: 140, percent: 14, color: "#B1B1B1" },
  { name: "Sports & Outdoors", count: 120, percent: 12, color: "#777777" },
  { name: "Automotive", count: 120, percent: 12, color: "#333333" },
];

export const shipmentAlerts = [
  { title: "Customs Clearance Delay", shipmentId: "#SH8743921", freight: "Ocean Freight", date: "Mar 20" },
  { title: "Incorrect Address Provided", shipmentId: "#SH8725810", freight: "Road Freight", date: "Mar 20" },
  { title: "Weather-Related Hold", shipmentId: "#SH8790043", freight: "Air Freight", date: "Mar 19" },
  { title: "Incorrect Address Provided", shipmentId: "#SH8716654", freight: "Rail Freight", date: "Mar 18" },
];

export const activities = [
  { text: "User @TechGuru99 submitted a bulk shipment request", time: "12:00 PM" },
  { text: "Customer Support @SupportKen added a priority tag to Order ID 77889JKL", time: "11:30 AM" },
  { text: "User @SallyMae88 initiated a return process for Order ID 44556GHI", time: "11:00 AM" },
  { text: "Administrator @AdminLisa resolved a delivery issue for Order ID 12345XYZ", time: "10:15 AM" },
  { text: "User @Mickey92 updated the shipping address for Order ID 67890ABC", time: "09:45 AM" },
];

export type ShipmentStatus = "Delivered" | "Out for Delivery" | "In Transit" | "Processing";

export interface RecentShipment {
  id: string;
  company: string;
  category: string;
  carrier: string;
  origin: string;
  destination: string;
  date: string;
  status: ShipmentStatus;
}

export const recentShipments: RecentShipment[] = [
  { id: "#SH9283746", company: "TechGear Inc.", category: "Electronics", carrier: "FedEx", origin: "Los Angeles, CA", destination: "Chicago, IL", date: "Mar 20, 2035", status: "In Transit" },
  { id: "#SH9182635", company: "StyleHub Co.", category: "Apparel", carrier: "DHL", origin: "New York, NY", destination: "Atlanta, GA", date: "Mar 19, 2035", status: "Out for Delivery" },
  { id: "#SH9037821", company: "FreshNest", category: "Home & Kitchen", carrier: "UPS", origin: "Dallas, TX", destination: "Miami, FL", date: "Mar 18, 2035", status: "Delivered" },
  { id: "#SH9374652", company: "FitPlus Gear", category: "Sports & Outdoors", carrier: "USPS", origin: "Seattle, WA", destination: "Denver, CO", date: "Mar 21, 2035", status: "Processing" },
  { id: "#SH9457830", company: "AutoParts Pro", category: "Automotive", carrier: "Aramex", origin: "Detroit, MI", destination: "San Diego, CA", date: "Mar 20, 2035", status: "In Transit" },
];
