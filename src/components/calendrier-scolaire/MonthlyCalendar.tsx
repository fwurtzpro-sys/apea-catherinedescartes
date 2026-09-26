"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  CALENDAR_END_MONTH,
  CALENDAR_START_MONTH,
  PUBLIC_HOLIDAYS,
  SCHOOL_PERIODS,
} from "@/lib/school-calendar-data";
import {
  findPublicHoliday,
  formatDateDayMonth,
  isDateInAnyBreak,
} from "@/lib/school-calendar-logic";
import { useTodayISO } from "@/lib/use-today-iso";

const WEEKDAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];
const MONTH_LABELS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/** Absolute month index, so the whole school year is a single 0..N range
 * with no special-casing for the year rollover. */
function ymToIndex(year: number, month: number): number {
  return year * 12 + (month - 1);
}
function indexToYM(index: number): { year: number; month: number } {
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

const START_INDEX = ymToIndex(CALENDAR_START_MONTH.year, CALENDAR_START_MONTH.month);
const END_INDEX = ymToIndex(CALENDAR_END_MONTH.year, CALENDAR_END_MONTH.month);

function buildMonthCells(year: number, month: number) {
  const daysInMonth = new Date(year, month, 0).getDate();
  // getDay(): 0=Sunday..6=Saturday. Convert to a Monday-first offset.
  const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7;

  const cells: Array<{ day: number; iso: string } | null> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, iso: `${year}-${pad(month)}-${pad(day)}` });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function MonthlyCalendar() {
  const [monthIndex, setMonthIndex] = useState(START_INDEX);
  const hasAutoJumped = useRef(false);
  const hasUserNavigated = useRef(false);
  const today = useTodayISO();

  // Once we know today's real date, jump to it once — but only if the
  // visitor hasn't already started navigating manually.
  useEffect(() => {
    if (!today || hasAutoJumped.current || hasUserNavigated.current) return;
    hasAutoJumped.current = true;
    const [y, m] = today.split("-").map(Number);
    const idx = ymToIndex(y, m);
    if (idx < START_INDEX || idx > END_INDEX) return;
    const raf = requestAnimationFrame(() => setMonthIndex(idx));
    return () => cancelAnimationFrame(raf);
  }, [today]);

  const { year, month } = indexToYM(monthIndex);
  const cells = buildMonthCells(year, month);
  const monthPrefix = `${year}-${pad(month)}`;
  const monthHolidays = PUBLIC_HOLIDAYS.filter((h) =>
    h.date.startsWith(monthPrefix)
  );

  function goTo(delta: number) {
    hasUserNavigated.current = true;
    setMonthIndex((i) => Math.min(END_INDEX, Math.max(START_INDEX, i + delta)));
  }

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-navy-900/5 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goTo(-1)}
          disabled={monthIndex <= START_INDEX}
          aria-label="Mois précédent"
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-navy-900/10 text-navy-900 transition-all duration-200 hover:-translate-x-0.5 hover:border-orange-300 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:border-navy-900/10 disabled:hover:text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <p
          key={monthIndex}
          className="animate-[idea-fields-in_250ms_ease-out] text-lg font-extrabold text-navy-900 sm:text-xl"
          aria-live="polite"
        >
          {MONTH_LABELS[month - 1]} {year}
        </p>

        <button
          type="button"
          onClick={() => goTo(1)}
          disabled={monthIndex >= END_INDEX}
          aria-label="Mois suivant"
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-navy-900/10 text-navy-900 transition-all duration-200 hover:translate-x-0.5 hover:border-orange-300 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:border-navy-900/10 disabled:hover:text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        key={`grid-${monthIndex}`}
        className="animate-[idea-fields-in_250ms_ease-out] mt-6"
      >
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-navy-900/40">
          {WEEKDAY_LABELS.map((label, i) => (
            <div key={i}>{label}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((cell, i) => {
            if (!cell) return <div key={i} />;
            const isToday = today === cell.iso;
            const isBreak = isDateInAnyBreak(cell.iso, SCHOOL_PERIODS);
            const holiday = findPublicHoliday(cell.iso, PUBLIC_HOLIDAYS);
            return (
              <div
                key={i}
                className={`relative flex aspect-square items-center justify-center rounded-lg text-sm transition-colors duration-150 ${
                  isBreak
                    ? "bg-orange-50 text-navy-900/70 hover:bg-orange-100"
                    : "text-navy-900 hover:bg-cream-100"
                } ${
                  isToday
                    ? "ring-2 ring-navy-900 font-bold"
                    : ""
                }`}
              >
                {cell.day}
                {holiday && (
                  <>
                    {/* Color is never the only signal: the name is real
                        text for screen readers, and repeated visibly in
                        the list below the grid for sighted users. */}
                    <span className="sr-only"> — jour férié : {holiday.name}</span>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-orange-500"
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {monthHolidays.length > 0 && (
        <div className="mt-4 flex flex-col gap-1 text-sm text-navy-900/70">
          {monthHolidays.map((holiday) => (
            <p key={holiday.date} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"
              />
              {formatDateDayMonth(holiday.date)} — {holiday.name}
            </p>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-navy-900/5 pt-5 text-xs text-navy-900/60">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-navy-900/15" aria-hidden="true" />
          Période scolaire
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-orange-50" aria-hidden="true" />
          Vacances scolaires
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded ring-2 ring-navy-900" aria-hidden="true" />
          Aujourd&rsquo;hui
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" aria-hidden="true" />
          Jour férié
        </span>
      </div>
    </div>
  );
}
