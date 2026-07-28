import { BriefcaseBusiness, Camera, MessageCircle, Play, Send } from "lucide-react";

const socialLinks = [
  { label: "Facebook", icon: MessageCircle },
  { label: "X", icon: Send },
  { label: "Instagram", icon: Camera },
  { label: "YouTube", icon: Play },
  { label: "LinkedIn", icon: BriefcaseBusiness },
];

export function DashboardFooter() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-border-default py-5 text-center text-small text-text-secondary tablet:flex-row">
      <p>Copyright © 2025 Peterdraw</p>
      <nav aria-label="Legal">
        <span>Privacy Policy</span><span aria-hidden="true"> · </span>
        <span>Term and conditions</span><span aria-hidden="true"> · </span>
        <span>Contact</span>
      </nav>
      <div className="flex gap-2">
        {socialLinks.map(({ label, icon: Icon }) => (
          <button key={label} type="button" aria-label={label} className="rounded-control p-1.5 hover:bg-surface-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
            <Icon className="size-4" aria-hidden="true" />
          </button>
        ))}
      </div>
    </footer>
  );
}
