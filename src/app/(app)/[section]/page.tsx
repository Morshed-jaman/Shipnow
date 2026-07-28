import { notFound } from "next/navigation";

const sections: Record<string, string> = {
  analytics: "Analytics",
  calendar: "Calendar",
  shipments: "Shipments",
  tracking: "Tracking",
  warehouse: "Warehouse",
  fleets: "Fleets",
  drivers: "Drivers",
  invoices: "Invoices & Billing",
  messages: "Message",
  notifications: "Notifications",
  settings: "Settings",
};

export default async function SectionPage({
  params,
}: PageProps<"/[section]">) {
  const { section } = await params;
  const title = sections[section];

  if (!title) notFound();

  return (
    <section aria-labelledby="section-heading">
      <h2 id="section-heading" className="text-2xl font-bold text-text-primary">
        {title}
      </h2>
      <p className="mt-2 text-text-secondary">Coming soon.</p>
    </section>
  );
}
