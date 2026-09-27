"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays } from "lucide-react";

/**
 * Floating shortcut to /calendrier-scolaire, available site-wide. Fixed to
 * the viewport so it stays reachable while scrolling, but fades out
 * whenever the shared Footer scrolls into view (detected via
 * IntersectionObserver on the real <footer> element, without touching
 * Footer.tsx) so it can never sit on top of it.
 *
 * z-30: below the sticky Header (z-50) and the full-screen mobile nav
 * overlay (z-40), so opening the mobile menu naturally covers this bubble
 * instead of competing with it.
 */
export function SchoolCalendarBubble() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // A single, brief pulse on the icon shortly after it appears — never
  // repeats — to draw the eye once without becoming a permanent animation.
  useEffect(() => {
    const start = setTimeout(() => setPulse(true), 900);
    const end = setTimeout(() => setPulse(false), 1200);
    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: "0px", threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Not useful on the activities page itself: its filter chips sit right
  // where this bubble floats, and there's nothing calendar-related to
  // jump to from there anyway.
  if (pathname?.startsWith("/activites-enfants")) return null;

  const visible = mounted && !nearFooter;

  return (
    <Link
      href="/calendrier-scolaire"
      aria-label="Calendrier scolaire"
      className={`fixed bottom-8 right-6 z-30 inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white py-2.5 pl-3 pr-4 text-sm font-semibold text-navy-900 shadow-xl shadow-navy-900/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 sm:bottom-6 sm:right-8 sm:shadow-lg sm:shadow-navy-900/10 lg:right-10 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
        <CalendarDays
          className="h-4 w-4 transition-transform duration-300 ease-out"
          style={{ transform: pulse ? "scale(1.2)" : "scale(1)" }}
          strokeWidth={2}
        />
      </span>
      <span className="hidden sm:inline">Calendrier scolaire</span>
      <span className="sm:hidden">Calendrier</span>
    </Link>
  );
}
