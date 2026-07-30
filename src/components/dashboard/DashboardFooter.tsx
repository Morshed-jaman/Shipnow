import Image from "next/image";

export function DashboardFooter() {
  return (
    <footer className="flex flex-col items-center justify-between gap-5 border-t border-border-default py-6 text-center tablet:flex-row tablet:flex-nowrap tablet:gap-3 tablet:text-left">
      <p className="whitespace-nowrap text-body font-bold text-text-primary tablet:text-xs desktop:text-body">Copyright © 2025 Peterdraw</p>
      <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-small text-text-secondary tablet:flex-nowrap tablet:gap-x-3 tablet:text-xs desktop:gap-x-6 desktop:text-small">
        <span>Privacy Policy</span>
        <span>Term and conditions</span>
        <span>Contact</span>
      </nav>
      <Image
        src="/social-media.png"
        alt="Facebook, X, Instagram, YouTube, and LinkedIn"
        width={148}
        height={20}
        className="h-5 w-[148px] shrink-0 object-contain"
      />
    </footer>
  );
}
