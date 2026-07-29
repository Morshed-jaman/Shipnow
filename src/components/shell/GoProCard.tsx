import Image from "next/image";

export function GoProCard() {
  return (
    <aside className="mx-auto w-full max-w-[191px]" aria-label="ShipNow Pro promotion">
      <Image
        src="/Promotional Banner.png"
        alt="Loving ShipNow Free? Go Pro to access priority support, real-time tracking, and full analytics. Go Pro Today."
        width={191}
        height={252}
        className="h-auto w-full rounded-card object-contain"
      />
    </aside>
  );
}
