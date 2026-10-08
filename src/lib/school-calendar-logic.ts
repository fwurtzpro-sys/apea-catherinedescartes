import type {
  ApeaCalendarEvent,
  PublicHoliday,
  SchoolPeriod,
} from "@/lib/school-calendar-data";

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

/** The public holiday landing on `iso`, if any — independent from the
 * school breaks, so a date can be both a break day and a public holiday
 * (e.g. Noël) without one hiding the other. */
export function findPublicHoliday(
  iso: string,
  holidays: PublicHoliday[]
): PublicHoliday | undefined {
  return holidays.find((h) => h.date === iso);
}

/** "11 novembre" — day + month name, no year (used alongside a month/year
 * heading that already gives the year). */
export function formatDateDayMonth(iso: string): string {
  return toNoonDate(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
}

/** The APEA events covering `iso` (inclusive) — a day can carry more than
 * one (e.g. the Carnaval falls inside the whole-May saucisson sale). */
export function findApeaEvents(
  iso: string,
  events: ApeaCalendarEvent[]
): ApeaCalendarEvent[] {
  // `isWithin`'s missing-end means "open-ended" (used for the summer
  // break, which has no resumption date) — a one-day event instead means
  // "ends the same day it starts", so the fallback must be explicit here.
  return events.filter((e) => isWithin(iso, e.startDate, e.endDate ?? e.startDate));
}

/** "1 – 31 décembre" for a range, or "29 janvier" for a single day — used
 * in the event list below the monthly grid. */
export function formatEventDateRange(event: ApeaCalendarEvent): string {
  if (!event.endDate || event.endDate === event.startDate) {
    return formatDateDayMonth(event.startDate);
  }
  const startDay = toNoonDate(event.startDate).toLocaleDateString("fr-FR", {
    day: "numeric",
  });
  const startMonth = event.startDate.slice(0, 7);
  const endMonth = event.endDate.slice(0, 7);
  if (startMonth === endMonth) {
    return `${startDay} – ${formatDateDayMonth(event.endDate)}`;
  }
  return `${formatDateDayMonth(event.startDate)} – ${formatDateDayMonth(event.endDate)}`;
}
