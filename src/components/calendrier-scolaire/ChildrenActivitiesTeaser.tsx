import { Sparkles } from "lucide-react";

/**
 * Teaser for a future "activités des enfants" page (coloriages, jeux,
 * activités imprimables de la TPS au CM2) — not built yet, so the button
 * is a genuinely disabled control rather than a dead link to a 404.
 */
export function ChildrenActivitiesTeaser() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-3xl bg-cream-100/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
          <Sparkles className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
            Pour les enfants
          </p>
          <h3 className="mt-1 text-lg font-extrabold text-navy-900">
            Une petite activité&nbsp;?
          </h3>
          <p className="mt-1 max-w-md text-sm text-navy-900/60">
            Coloriages, jeux et activités à imprimer pour les enfants de la
            TPS au CM2 arrivent bientôt.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="inline-flex cursor-not-allowed items-center justify-center gap-2 whitespace-nowrap rounded-full bg-navy-900/10 px-5 py-2.5 text-sm font-semibold text-navy-900/40"
        >
          Découvrir les activités
        </button>
        <span className="text-xs font-medium text-navy-900/40">
          Bientôt disponible
        </span>
      </div>
    </div>
  );
}
