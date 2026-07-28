import {
  BarChart3,
  Bell,
  CalendarDays,
  CircleGauge,
  FileText,
  MapPin,
  MessageSquare,
  PackageSearch,
  Settings,
  Truck,
  UserRound,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
  unread?: boolean;
}

export const primaryNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: CircleGauge },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Shipments", href: "/shipments", icon: PackageSearch },
  { label: "Tracking", href: "/tracking", icon: MapPin },
  { label: "Warehouse", href: "/warehouse", icon: Warehouse },
  { label: "Fleets", href: "/fleets", icon: Truck },
  { label: "Drivers", href: "/drivers", icon: UserRound },
  { label: "Invoices & Billing", href: "/invoices", icon: FileText },
];

export const utilityNavigation: NavigationItem[] = [
  { label: "Message", href: "/messages", icon: MessageSquare, unread: true },
  { label: "Notifications", href: "/notifications", icon: Bell, unread: true },
  { label: "Settings", href: "/settings", icon: Settings },
];
