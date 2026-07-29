import { Button } from "@/components/ui";

export function FormActions({ loading, onDelete }: { loading: boolean; onDelete: () => void }) {
  return (
    <div className="flex justify-end gap-3 border-t border-border-default pt-5">
      <Button type="button" variant="secondary" onClick={onDelete} className="h-10 w-[111px] border-transparent bg-surface-page">Delete Form</Button>
      <Button type="submit" loading={loading} className="h-10 w-[143px] bg-action-dark text-surface-card">Submit Shipment</Button>
    </div>
  );
}
