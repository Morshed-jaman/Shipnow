import Image from "next/image";
import { cn } from "@/lib/cn";

export function ShipNowLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)} aria-label="ShipNow">
      <Image src="/logo-symbol.svg" alt="" width={40} height={40} className="size-10 shrink-0" priority />
      <span className="text-xl font-extrabold tracking-tight text-action-dark">SHIPNOW</span>
    </div>
  );
}
