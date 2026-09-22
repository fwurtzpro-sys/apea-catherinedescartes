import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
};

/** Professional "nothing here yet" state — never invents placeholder content. */
export function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-[2rem] border-2 border-dashed border-orange-200 bg-cream-100/60 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
        <Icon className="h-6 w-6" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
      </span>
      <p className="text-lg font-bold text-navy-900">{title}</p>
      <p className="text-navy-900/70">{description}</p>
      {action}
    </div>
  );
}
