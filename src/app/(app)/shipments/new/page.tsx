import { CreateShipmentHeader } from "@/components/features/create-shipment/CreateShipmentHeader";

export default function CreateNewShipmentPage() {
  return (
    <div className="grid w-full min-w-0 gap-5">
      <CreateShipmentHeader />
      <div className="h-96 rounded-card bg-surface-card p-5">
        <h2 className="font-bold text-text-primary">Shipment Form</h2>
      </div>
    </div>
  );
}
