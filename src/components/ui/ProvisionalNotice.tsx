import { AlertTriangle } from "lucide-react";

/** Flags legal/administrative content that still awaits official validation. */
export function ProvisionalNotice() {
  return (
    <div className="mx-auto mb-10 flex max-w-2xl items-start gap-3 rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50 p-4 text-left">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
      <p className="text-sm text-navy-900/80">
        Cette page présente une structure provisoire. Les informations
        marquées <span className="font-semibold">« à compléter »</span>{" "}
        seront mises à jour dès que l&rsquo;association aura validé leur
        contenu définitif.
      </p>
    </div>
  );
}
