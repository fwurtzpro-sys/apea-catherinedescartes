import { Download, Palette } from "lucide-react";
import { ActivityPreview } from "@/components/activites-enfants/ActivityPreview";
import {
  stageOfLevel,
  type ActivityLevel,
  type ChildActivity,
} from "@/lib/children-activities-data";

function LevelBadge({ level }: { level: ActivityLevel }) {
  const isMaternelle = stageOfLevel(level) === "maternelle";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold ${
        isMaternelle
          ? "border-orange-200 bg-orange-50 text-orange-600"
          : "border-navy-900/15 bg-navy-900/5 text-navy-900"
      }`}
    >
      {!isMaternelle && (
        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" aria-hidden="true" />
      )}
      {level}
    </span>
  );
}

export function ActivityCard({ activity }: { activity: ChildActivity }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-navy-900/5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/10">
      <div className="flex h-40 items-center justify-center bg-white p-4">
        <ActivityPreview
          activityId={activity.id}
          available={activity.available}
          className="h-full w-full"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-navy-900/5 p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          {activity.levels.map((level) => (
            <LevelBadge key={level} level={level} />
          ))}
        </div>

        <div>
          <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-orange-500">
            <Palette className="h-3.5 w-3.5" aria-hidden="true" />
            Coloriage
          </p>
          <h3 className="mt-1.5 text-base font-extrabold text-navy-900">
            {activity.title}
          </h3>
        </div>

        <div className="mt-auto pt-2">
          {activity.available && activity.pdf ? (
            <a
              href={activity.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-orange-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Télécharger
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-navy-900/10 px-4 py-2 text-sm font-semibold text-navy-900/40"
            >
              Bientôt disponible
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
