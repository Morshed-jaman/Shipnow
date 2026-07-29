import type { CreateShipmentForm } from "./form-types";
import { ContactFields } from "./ContactFields";

export function SenderRecipientSection({ form }: { form: CreateShipmentForm }) {
  return (
    <section className="grid gap-6 rounded-card bg-surface-input p-5 lg:grid-cols-2 lg:p-6">
      <div>
        <h3 className="mb-5 font-bold text-text-primary">Sender Info</h3>
        <ContactFields form={form} prefix="sender" />
      </div>
      <div>
        <h3 className="mb-5 font-bold text-text-primary">Recipient Info</h3>
        <ContactFields form={form} prefix="recipient" />
      </div>
    </section>
  );
}
