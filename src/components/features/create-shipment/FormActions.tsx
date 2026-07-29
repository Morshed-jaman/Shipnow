import { Button } from "@/components/ui";

export function FormActions({ loading, onDelete }: { loading: boolean; onDelete: () => void }) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-border-default pt-5 tablet:flex-row tablet:justify-end">
      <Button type="button" variant="secondary" onClick={onDelete} className="w-full border-transparent bg-surface-page tablet:w-[111px]">Delete Form</Button>
      <Button type="submit" loading={loading} className="w-full bg-action-dark text-surface-card tablet:w-[143px]">Submit Shipment</Button>
    </div>
  );
}
