import { Button } from "@/components/ui";

export function GoProCard() {
  return (
    <aside className="rounded-card bg-action-dark p-4 text-surface-card">
      <p className="text-small font-bold">Loving ShipNow Free?</p>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="mt-3 w-full border-transparent bg-surface-card text-text-primary"
      >
        Go Pro Today
      </Button>
    </aside>
  );
}
