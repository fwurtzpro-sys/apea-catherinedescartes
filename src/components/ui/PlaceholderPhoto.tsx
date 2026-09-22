import type { LucideIcon } from "lucide-react";
import { ImageIcon } from "lucide-react";

type PlaceholderPhotoProps = {
  label: string;
  icon?: LucideIcon;
  className?: string;
};

/**
 * Stand-in for a real photograph. The association will supply actual
 * pictures later; this keeps layout, sizing and rounding identical to the
 * final version so swapping in <Image> is a drop-in replacement.
 */
export function PlaceholderPhoto({
  label,
  icon: Icon = ImageIcon,
  className = "",
}: PlaceholderPhotoProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-navy-900/15 bg-gradient-to-br from-cream-200 to-orange-50 text-navy-900/40 ${className}`}
    >
      <Icon className="h-8 w-8" strokeWidth={1.5} />
      <span className="px-4 text-center text-xs font-medium">{label}</span>
    </div>
  );
}
