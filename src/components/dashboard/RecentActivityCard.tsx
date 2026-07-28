import { Activity } from "lucide-react";
import { Card } from "@/components/ui";
import { activities } from "@/data/dashboard";
import { CardMenuButton } from "./CardMenuButton";

function ActivityText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(@\w+)/g).map((part, index) =>
        part.startsWith("@") ? <strong key={`${part}-${index}`} className="font-semibold text-brand-primary">{part}</strong> : part,
      )}
    </>
  );
}

export function RecentActivityCard() {
  return (
    <Card padding="lg" className="h-full">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-text-primary">Recent Activity</h2>
        <CardMenuButton label="Recent activity menu" />
      </div>
      <ol className="mt-5">
        {activities.map((item, index) => (
          <li key={item.time} className="relative flex gap-3 pb-5 last:pb-0">
            {index < activities.length - 1 && <span className="absolute left-[17px] top-8 h-full w-px bg-border-default" />}
            <span className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-primary"><Activity className="size-4" /></span>
            <div className="min-w-0">
              <p className="text-small leading-relaxed text-text-primary"><ActivityText text={item.text} /></p>
              <time className="mt-1 block text-xs text-text-secondary">{item.time}</time>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
