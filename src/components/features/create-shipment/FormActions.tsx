import { Button } from "@/components/ui";

export function FormActions({ loading, onDelete }: { loading: boolean; onDelete: () => void }) {
  return (
    <div className="flex justify-end gap-3 border-t border-border-default pt-5">
      <Button type="button" variant="secondary" onClick={onDelete} className="h-10 w-[111px] shrink-0 whitespace-nowrap border-transparent bg-surface-page px-3 text-small">Delete Form</Button>
      <Button type="submit" loading={loading} className="h-10 w-[143px] shrink-0 whitespace-nowrap bg-action-dark px-3 text-small text-surface-card">Submit Shipment</Button>
    </div>
  );
}
