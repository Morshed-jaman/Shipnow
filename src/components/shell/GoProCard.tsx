import { Button } from "@/components/ui";

export function GoProCard() {
  return (
    <aside className="rounded-card bg-action-dark p-4 text-surface-card">
      <p className="text-lg font-bold leading-tight">Loving ShipNow Free?</p>
      <p className="mt-3 text-xs leading-relaxed text-surface-card">
        Go Pro to access priority support, real-time tracking, and full analytics.
      </p>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="mt-4 w-full border-transparent bg-surface-card text-text-primary"
      >
        Go Pro Today
      </Button>
    </aside>
  );
}
