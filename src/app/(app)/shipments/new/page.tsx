import { CreateShipmentHeader } from "@/components/features/create-shipment/CreateShipmentHeader";
import { CreateShipmentForm } from "@/components/features/create-shipment/CreateShipmentForm";

export default function CreateNewShipmentPage() {
  return (
    <div className="grid w-full min-w-0 gap-5">
      <CreateShipmentHeader />
      <CreateShipmentForm />
    </div>
  );
}
