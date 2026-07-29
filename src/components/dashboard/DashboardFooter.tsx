import Image from "next/image";

export function DashboardFooter() {
  return (
    <footer className="flex flex-col items-center justify-between gap-5 border-t border-border-default py-6 text-center tablet:flex-row">
      <div>
        <p className="text-body font-bold text-text-primary">Copyright © 2025 Peterdraw</p>
        <nav aria-label="Legal" className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-small text-text-secondary">
          <span>Privacy Policy</span>
          <span>Term and conditions</span>
          <span>Contact</span>
        </nav>
      </div>
      <Image
        src="/social-media.png"
        alt="Facebook, X, Instagram, YouTube, and LinkedIn"
        width={148}
        height={20}
        className="h-5 w-[148px] object-contain"
      />
    </footer>
  );
}
