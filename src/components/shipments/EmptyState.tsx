import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui";

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <span className="rounded-full bg-brand-light p-3 text-brand-primary"><PackageSearch className="size-6" /></span>
      <p className="mt-3 font-bold text-text-primary">No shipments found</p>
      <p className="mt-1 text-small text-text-secondary">Try another search or clear your filters.</p>
      <Button variant="secondary" size="sm" className="mt-4" onClick={onClear}>Clear filters</Button>
    </div>
  );
}
