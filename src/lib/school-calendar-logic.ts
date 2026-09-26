import type { SchoolPeriod } from "@/lib/school-calendar-data";

/**
 * Pure date/period logic for the school calendar page, kept independent
 * from React and from rendering. Every date is handled as a plain
 * "YYYY-MM-DD" string: comparisons use plain string ordering (which
 * matches chronological ordering for ISO dates), and the only place a
 * JS `Date` is constructed is for display formatting — always at local
 * noon, so a timezone offset can never push the value across midnight
 * into the wrong calendar day.
 */

/** Today's calendar date in France, as "YYYY-MM-DD" — stable regardless
 * of the machine's local timezone (server or browser). */
export function getTodayISOParis(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** Constructs a Date at local noon from an ISO date, safe for formatting. */
function toNoonDate(iso: string): Date {
  return new Date(`${iso}T12:00:00`);
}

export function formatDateLong(iso: string): string {
  return toNoonDate(iso).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateMedium(iso: string): string {
  return toNoonDate(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  return toNoonDate(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

/** Whole-day difference (target − from), using noon timestamps so DST
 * transitions never shift the result by one day. */
export function diffDaysISO(fromISO: string, targetISO: string): number {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.round(
    (toNoonDate(targetISO).getTime() - toNoonDate(fromISO).getTime()) /
      MS_PER_DAY
  );
}

function isWithin(todayISO: string, start: string, end?: string): boolean {
  if (todayISO < start) return false;
  if (end && todayISO > end) return false;
  return true;
}

export type TimelineStatus = "past" | "current" | "next" | "future";

export type TimelineEntry = {
  period: SchoolPeriod;
  status: TimelineStatus;
};

/** Past/current/future status per period, with the single nearest
 * future period additionally flagged "next" for the accent highlight. */
export function getTimelineEntries(
  periods: SchoolPeriod[],
  todayISO: string
): TimelineEntry[] {
  const base: TimelineEntry[] = periods.map((period) => {
    if (isWithin(todayISO, period.startDate, period.endDate)) {
      return { period, status: "current" };
    }
    if (todayISO < period.startDate) {
      return { period, status: "future" };
    }
    return { period, status: "past" };
  });

  const firstFutureIndex = base.findIndex((entry) => entry.status === "future");
  if (firstFutureIndex !== -1) {
    base[firstFutureIndex] = { ...base[firstFutureIndex], status: "next" };
  }
  return base;
}

export type NextBreakInfo =
  | { status: "before"; period: SchoolPeriod; daysUntil: number }
  | { status: "ongoing"; period: SchoolPeriod; resumesOn?: string }
  | { status: "summer-ongoing"; period: SchoolPeriod }
  | { status: "year-over" };

/**
 * Finds the break that matters right now: the one in progress, or the
 * next upcoming one. Summer is deliberately treated apart, since it has
 * no resumption date in this school year's official calendar and the
 * message must not claim a "next break" that doesn't exist.
 */
export function getNextBreakInfo(
  periods: SchoolPeriod[],
  todayISO: string
): NextBreakInfo {
  const breaks = periods.filter((p) => p.kind === "break");

  for (const period of breaks) {
    if (isWithin(todayISO, period.startDate, period.endDate)) {
      if (period.id === "ete") {
        return { status: "summer-ongoing", period };
      }
      return { status: "ongoing", period, resumesOn: period.endDate };
    }
  }

  const upcoming = breaks.find((p) => p.startDate > todayISO);
  if (upcoming) {
    return {
      status: "before",
      period: upcoming,
      daysUntil: diffDaysISO(todayISO, upcoming.startDate),
    };
  }

  return { status: "year-over" };
}

/** True if `iso` falls within any break period (inclusive), used to
 * shade "vacances" days in the monthly calendar. */
export function isDateInAnyBreak(iso: string, periods: SchoolPeriod[]): boolean {
  return periods.some(
    (p) => p.kind === "break" && isWithin(iso, p.startDate, p.endDate)
  );
}
