"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { ActivityCard } from "@/components/activites-enfants/ActivityCard";
import {
  CHILDREN_ACTIVITIES,
  LEVELS,
  type ActivityLevel,
} from "@/lib/children-activities-data";

type LevelFilter = "all" | ActivityLevel;

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
        active
          ? "border-orange-500 bg-orange-500 text-white"
          : "border-navy-900/10 bg-white text-navy-900 hover:border-orange-300"
      }`}
    >
      {label}
    </button>
  );
}

export function ActivitiesExplorer() {
  const [level, setLevel] = useState<LevelFilter>("all");

  const filtered = useMemo(
    () =>
      level === "all"
        ? CHILDREN_ACTIVITIES
        : CHILDREN_ACTIVITIES.filter((activity) => activity.levels.includes(level)),
    [level]
  );

  return (
    <div>
      <div role="group" aria-label="Filtrer par niveau" className="flex flex-wrap justify-center gap-2">
        <FilterChip label="Tous" active={level === "all"} onClick={() => setLevel("all")} />
        {LEVELS.map((l) => (
          <FilterChip
            key={l.id}
            label={l.id}
            active={level === l.id}
            onClick={() => setLevel(l.id)}
          />
        ))}
      </div>

      <div className="mt-10" aria-live="polite">
        {filtered.length === 0 ? (
          <EmptyState
            title="Aucun coloriage pour cette sélection"
            description="Essayez un autre niveau."
            action={
              <button
                type="button"
                onClick={() => setLevel("all")}
                className="text-sm font-semibold text-orange-500 underline hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                Réinitialiser
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((activity, index) => (
              <Reveal key={activity.id} immediate delay={index * 50}>
                <ActivityCard activity={activity} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
