import { Sparkles } from "lucide-react";

/**
 * Previews for the coloring-page cards. Every activity across all 9
 * levels (TPS through CM2) now points at a real PDF, and shows the
 * same plain, generic printable-sheet icon (`PdfReadyPreview`) rather
 * than bespoke art per subject — the real printable sheet is the
 * definitive artwork. `ComingSoonPreview` is kept only as a defensive
 * fallback for any future activity added with `available: false`.
 */

type PreviewProps = { className?: string };

const STROKE = "stroke-navy-900/60";
const STROKE_SOFT = "stroke-navy-900/40";

function ComingSoonPreview({ className }: PreviewProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-navy-900/10 ${className}`}
      aria-hidden="true"
    >
      <Sparkles className="h-6 w-6 text-navy-900/15" strokeWidth={1.5} />
    </div>
  );
}

function PdfReadyPreview({ className }: PreviewProps) {
  // A plain, generic printable-sheet icon — used for every activity that
  // has a real PDF, instead of bespoke art per subject.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <path
        d="M34 14h38l14 14v78a4 4 0 0 1-4 4H34a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4Z"
        className={STROKE}
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path d="M72 14v14h14" className={STROKE} strokeWidth="2.25" strokeLinejoin="round" />
      <path d="M42 56h36M42 68h36M42 80h24" className={STROKE_SOFT} strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="40" r="3" className={STROKE} strokeWidth="2" />
    </svg>
  );
}

export function ActivityPreview({
  available = false,
  className = "h-full w-full",
}: {
  activityId: string;
  available?: boolean;
  className?: string;
}) {
  if (available) return <PdfReadyPreview className={className} />;
  return <ComingSoonPreview className={className} />;
}
