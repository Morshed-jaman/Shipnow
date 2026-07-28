export function UserCard() {
  return (
    <div className="flex items-center gap-3 rounded-control bg-surface-page p-3">
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-primary font-bold text-surface-card"
        aria-hidden="true"
      >
        JD
      </div>
      <div className="min-w-0">
        <p className="truncate text-small font-bold text-text-primary">John Doe</p>
        <p className="text-xs text-text-secondary">Admin</p>
      </div>
    </div>
  );
}
