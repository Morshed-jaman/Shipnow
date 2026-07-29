export const shipmentStatuses = ["Delivered", "In Transit", "Out for Delivery", "Processing", "Pending", "Delayed"] as const;
export type ShipmentStatus = (typeof shipmentStatuses)[number];

export interface Shipment {
  id: string; company: string; category: string; carrier: string;
  origin: string; destination: string; weight: number; items: number;
  date: string; status: ShipmentStatus;
}

export const shipments: Shipment[] = [
  ["#SH9283746","TechGear Inc.","Electronics","FedEx","Los Angeles, CA","Chicago, IL",184,12,"Mar 20, 2035","In Transit"],
  ["#SH9182635","StyleHub Co.","Apparel","DHL","New York, NY","Atlanta, GA",92,28,"Mar 19, 2035","Out for Delivery"],
  ["#SH9037821","FreshNest","Home & Kitchen","UPS","Dallas, TX","Miami, FL",215,16,"Mar 18, 2035","Delivered"],
  ["#SH9374652","FitPlus Gear","Sports & Outdoors","USPS","Seattle, WA","Denver, CO",128,22,"Mar 21, 2035","Processing"],
  ["#SH9457830","AutoParts Pro","Automotive","Aramex","Detroit, MI","San Diego, CA",460,9,"Mar 20, 2035","In Transit"],
  ["#SH9562184","GlowWell Labs","Beauty & Health","DHL","Boston, MA","Austin, TX",74,36,"Mar 22, 2035","Pending"],
  ["#SH9614073","HomeCraft Living","Home & Kitchen","FedEx","Portland, OR","Phoenix, AZ",248,18,"Mar 23, 2035","Delayed"],
  ["#SH9728351","Circuit Works","Electronics","UPS","San Jose, CA","Houston, TX",165,14,"Mar 24, 2035","Delivered"],
  ["#SH9841267","Urban Thread","Apparel","USPS","Philadelphia, PA","Nashville, TN",68,42,"Mar 25, 2035","Processing"],
  ["#SH9903472","Peak Athletics","Sports & Outdoors","Aramex","Denver, CO","Charlotte, NC",132,20,"Mar 26, 2035","Out for Delivery"],
  ["#SH9015846","MotorLine Supply","Automotive","FedEx","Cleveland, OH","Las Vegas, NV",510,7,"Mar 27, 2035","Pending"],
  ["#SH9127604","PureCare Co.","Beauty & Health","DHL","Orlando, FL","Richmond, VA",58,30,"Mar 28, 2035","Delivered"],
  ["#SH9234185","Nexa Devices","Electronics","UPS","Raleigh, NC","Minneapolis, MN",143,11,"Mar 29, 2035","In Transit"],
  ["#SH9345028","Kitchen Story","Home & Kitchen","USPS","Memphis, TN","Sacramento, CA",276,19,"Mar 30, 2035","Delayed"],
  ["#SH9472160","Mode & Co.","Apparel","Aramex","Brooklyn, NY","New Orleans, LA",81,34,"Mar 31, 2035","Pending"],
].map(([id,company,category,carrier,origin,destination,weight,items,date,status]) => ({
  id, company, category, carrier, origin, destination, weight, items, date, status,
})) as Shipment[];
