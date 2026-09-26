"use client";

import {
  Backpack,
  Flower2,
  Gift,
  Leaf,
  Snowflake,
  Sun,
  Sunrise,
  type LucideIcon,
} from "lucide-react";
import {
  SCHOOL_PERIODS,
  type SchoolPeriodId,
} from "@/lib/school-calendar-data";
import {
  formatDateShort,
  getTimelineEntries,
  type TimelineStatus,
} from "@/lib/school-calendar-logic";
import { useTodayISO } from "@/lib/use-today-iso";

const PERIOD_ICONS: Record<SchoolPeriodId, LucideIcon> = {
  rentree: Backpack,
  toussaint: Leaf,
  noel: Gift,
  hiver: Snowflake,
  printemps: Flower2,
  ascension: Sunrise,
  ete: Sun,
};

const STATUS_STYLES: Record<
  TimelineStatus,
  { badge: string; icon: string; card: string; text: string }
> = {
  past: {
    badge: "border-navy-900/10 bg-cream-100 text-navy-900/40",
    icon: "text-navy-900/30",
    card: "opacity-60",
    text: "text-navy-900/40",
  },
  current: {
    badge: "border-navy-900 bg-navy-900 text-white",
    icon: "text-white",
    card: "ring-2 ring-navy-900",
    text: "text-navy-900",
  },
  next: {
    badge: "border-orange-500 bg-orange-500 text-white",
    icon: "text-white",
    card: "ring-2 ring-orange-400",
    text: "text-navy-900",
  },
  future: {
    badge: "border-navy-900/10 bg-white text-navy-900",
    icon: "text-navy-900/60",
    card: "",
    text: "text-navy-900/70",
  },
};

/** How far along the year the line should fill: up to the current (or, if
 * none is in progress, the next) period. All periods past → full line. */
function getProgressFraction(
  entries: ReturnType<typeof getTimelineEntries> | null
): number {
  if (!entries || entries.length < 2) return 0;
  const activeIndex = entries.findIndex(
    (e) => e.status === "current" || e.status === "next"
  );
  if (activeIndex === -1) return 1;
  return activeIndex / (entries.length - 1);
}

export function SchoolTimeline() {
  const today = useTodayISO();
  const entries =
    today !== null ? getTimelineEntries(SCHOOL_PERIODS, today) : null;
  const progress = getProgressFraction(entries);

  return (
    <div className="relative">
      {/* Desktop: horizontal line the steps sit on, filled up to where we
          are in the school year. */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-7 hidden h-1 rounded-full bg-navy-900/10 lg:block"
      >
        <div
          className="h-full origin-left rounded-full bg-gradient-to-r from-orange-300 to-orange-500 transition-transform duration-[900ms] ease-out motion-reduce:transition-none"
          style={{
            transform: entries ? `scaleX(${progress})` : "scaleX(0)",
          }}
        />
      </div>

      <ol className="relative flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-2">
        {SCHOOL_PERIODS.map((period, index) => {
          const status: TimelineStatus =
            entries?.find((e) => e.period.id === period.id)?.status ??
            "future";
          const styles = STATUS_STYLES[status];
          const Icon = PERIOD_ICONS[period.id];

          return (
            <li
              key={period.id}
              className="flex items-start gap-3 transition-all duration-500 ease-out lg:flex-1 lg:flex-col lg:items-center lg:gap-2 lg:text-center"
              style={{
                transitionDelay: entries ? `${index * 70}ms` : "0ms",
                opacity: entries ? 1 : 0,
                transform: entries ? "translateY(0)" : "translateY(6px)",
              }}
            >
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 ${styles.badge}`}
              >
                <Icon className={`h-6 w-6 ${styles.icon}`} strokeWidth={1.75} />
              </span>
              <div
                className={`rounded-2xl px-1 py-1 transition-shadow ${styles.card}`}
              >
                <p className={`text-sm font-bold ${styles.text}`}>
                  {period.shortLabel}
                </p>
                <p className="mt-0.5 text-xs text-navy-900/50">
                  {formatDateShort(period.startDate)}
                  {period.endDate && period.endDate !== period.startDate
                    ? ` – ${formatDateShort(period.endDate)}`
                    : ""}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
