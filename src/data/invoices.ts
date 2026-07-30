export type InvoiceStatus = "Paid" | "Unpaid" | "Overdue";

export interface InvoiceLineItem {
  description: string;
  shipmentType: string;
  serviceTier: "Express" | "Standard";
  price: number;
  quantity: number;
}

export interface Invoice {
  id: string;
  company: string;
  logo: string;
  shippingId: string;
  issued: string;
  due: string;
  amount: number;
  status: InvoiceStatus;
  email: string;
  address: string;
  phone: string;
  lineItems: InvoiceLineItem[];
}

export const invoiceKpis = [
  { label: "Paid Invoices", amount: 28890, count: 350, icon: "paid" },
  { label: "Unpaid Invoices", amount: 16700, count: 120, icon: "unpaid" },
  { label: "Pending Invoices", amount: 8050, count: 80, icon: "pending" },
  { label: "Overdue Invoices", amount: 22110, count: 245, icon: "overdue" },
] as const;

const standardItems = (name: string, base: number): InvoiceLineItem[] => [
  { description: `${name} Cargo Pack`, shipmentType: "Road Freight", serviceTier: "Express", price: base, quantity: 2 },
  { description: `${name} Standard Lot`, shipmentType: "Road Freight", serviceTier: "Standard", price: base * 0.75, quantity: 3 },
];

export const invoices: Invoice[] = [
  { id: "INV-1001", company: "TechGear Inc.", logo: "/company-logos/techgear.png", shippingId: "#SH9283746", issued: "Mar 15, 2035", due: "Mar 22, 2035", amount: 1250, status: "Paid", email: "billing@techgear.com", address: "410 Market St, San Francisco, CA 94105, USA", phone: "+1 415-555-1180", lineItems: standardItems("Electronics", 250) },
  { id: "INV-1002", company: "StyleHub Co.", logo: "/company-logos/style.png", shippingId: "#SH9182635", issued: "Mar 16, 2035", due: "Mar 23, 2035", amount: 980, status: "Unpaid", email: "billing@stylehub.com", address: "155 Fashion Ave, New York, NY 10001, USA", phone: "+1 212-555-3310", lineItems: standardItems("Apparel", 196) },
  { id: "INV-1003", company: "FreshNest", logo: "/company-logos/fresh.png", shippingId: "#SH9037821", issued: "Mar 14, 2035", due: "Mar 21, 2035", amount: 1320, status: "Paid", email: "billing@freshnest.com", address: "220 Harvest Rd, Dallas, TX 75201, USA", phone: "+1 214-555-6240", lineItems: standardItems("Kitchen", 264) },
  { id: "INV-1004", company: "FitPlus Gear", logo: "/company-logos/fitplus.png", shippingId: "#SH9374652", issued: "Mar 17, 2035", due: "Mar 24, 2035", amount: 1150, status: "Unpaid", email: "billing@fitplus.com", address: "61 Summit Way, Seattle, WA 98101, USA", phone: "+1 206-555-8450", lineItems: standardItems("Fitness", 230) },
  { id: "INV-1005", company: "AutoParts Pro", logo: "/company-logos/eco.png", shippingId: "#SH9457830", issued: "Mar 15, 2035", due: "Mar 22, 2035", amount: 1480, status: "Overdue", email: "billing@autopartspro.com", address: "900 Motor Dr, Detroit, MI 48201, USA", phone: "+1 313-555-2250", lineItems: standardItems("Engine Parts", 296) },
  { id: "INV-1006", company: "EcoLights", logo: "/company-logos/auto.png", shippingId: "#SH8821349", issued: "Mar 13, 2035", due: "Mar 20, 2035", amount: 790, status: "Paid", email: "billing@ecolights.com", address: "18 Greenway Blvd, Austin, TX 78701, USA", phone: "+1 512-555-4090", lineItems: standardItems("Lighting", 158) },
  { id: "INV-1007", company: "GreenHaven", logo: "/company-logos/green.png", shippingId: "#SH8967432", issued: "Mar 14, 2035", due: "Mar 21, 2035", amount: 875, status: "Paid", email: "billing@greenhaven.com", address: "1120 Birch Street, Portland, OR 97205, USA", phone: "+1 408-555-7210", lineItems: standardItems("Garden Tools", 175) },
  { id: "INV-1008", company: "ModaWear", logo: "/company-logos/moda.png", shippingId: "#SH8893247", issued: "Mar 16, 2035", due: "Mar 23, 2035", amount: 910, status: "Unpaid", email: "billing@modawear.com", address: "89 Franklin St, Boston, MA 02110, USA", phone: "+1 617-555-2290", lineItems: [
    { description: "Lightweight Hoodie Pack", shipmentType: "Road Freight", serviceTier: "Express", price: 120, quantity: 3 },
    { description: "Autumn Jacket Set", shipmentType: "Road Freight", serviceTier: "Standard", price: 180, quantity: 2 },
    { description: "Lightweight Hoodie Pack", shipmentType: "Road Freight", serviceTier: "Express", price: 95, quantity: 2 },
  ] },
  { id: "INV-1009", company: "SunCore Panels", logo: "/company-logos/sun.png", shippingId: "#SH9018723", issued: "Mar 17, 2035", due: "Mar 24, 2035", amount: 1600, status: "Unpaid", email: "billing@suncore.com", address: "720 Solar Way, San Diego, CA 92101, USA", phone: "+1 619-555-8840", lineItems: standardItems("Solar Panels", 320) },
  { id: "INV-1010", company: "VitaFresh", logo: "/company-logos/vita.png", shippingId: "#SH8881190", issued: "Mar 15, 2035", due: "Mar 22, 2035", amount: 1120, status: "Overdue", email: "billing@vitafresh.com", address: "320 Market Row, Nashville, TN 37201, USA", phone: "+1 615-555-7400", lineItems: standardItems("Fresh Produce", 224) },
  { id: "INV-1011", company: "SmartAppliance", logo: "/company-logos/techgear.png", shippingId: "#SH8923752", issued: "Mar 18, 2035", due: "Mar 25, 2035", amount: 1050, status: "Paid", email: "billing@smartappliance.com", address: "85 Innovation Pkwy, Chicago, IL 60601, USA", phone: "+1 312-555-6100", lineItems: standardItems("Appliances", 210) },
];

export const fee = 10;
export const taxRate = 0.08;

export function calculateInvoiceTotals(items: InvoiceLineItem[]) {
  const subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subTotal * taxRate * 100) / 100;
  return { subTotal, tax, fee, total: subTotal + tax + fee };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}
