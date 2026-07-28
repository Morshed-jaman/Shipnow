import { Ellipsis } from "lucide-react";

export function CardMenuButton({ label }: { label: string }) {
  return (
    <button type="button" aria-label={label} className="rounded-control p-1 text-text-secondary hover:bg-surface-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
      <Ellipsis className="size-5" aria-hidden="true" />
    </button>
  );
}
