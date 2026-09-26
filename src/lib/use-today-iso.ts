"use client";

import { useEffect, useState } from "react";
import { getTodayISOParis } from "@/lib/school-calendar-logic";

/**
 * Returns today's date ("YYYY-MM-DD", Europe/Paris) — `null` on the
 * server and on the client's very first render, only resolved after
 * mount. Server and client render the exact same `null` state before
 * hydration, so there is never a mismatch between what the server sent
 * and what the client paints first; callers show a stable, date-free
 * placeholder while this is `null`.
 */
export function useTodayISO(): string | null {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setToday(getTodayISOParis()));
    return () => cancelAnimationFrame(raf);
  }, []);

  return today;
}
