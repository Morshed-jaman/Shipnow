import Image from "next/image";

export function UserCard() {
  return (
    <div className="flex items-center gap-3 rounded-control bg-surface-page p-3">
      <Image
        src="/avatar-john.png"
        alt="John Doe"
        width={32}
        height={32}
        className="size-8 shrink-0 rounded-full object-cover"
        priority
      />
      <div className="min-w-0">
        <p className="truncate text-small font-bold text-text-primary">John Doe</p>
        <p className="text-xs text-text-secondary">Admin</p>
      </div>
    </div>
  );
}
