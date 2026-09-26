"use client";

import { useEffect, useRef, useState } from "react";
import {
  Cloud,
  Flower2,
  Gift,
  Leaf,
  Snowflake,
  Star,
  Sun,
  type LucideIcon,
} from "lucide-react";
import type { SchoolPeriodId } from "@/lib/school-calendar-data";

type IconSpec = {
  Icon: LucideIcon;
  top: string;
  left: string;
  size: string;
  color: string;
  rotate?: number;
  /** Idle drift distance in px and duration in ms — kept small and slow. */
  driftY?: number;
  driftDurationMs?: number;
  entranceDelayMs: number;
};

type Scene = IconSpec[];

/** "rentree" never reaches this component (it isn't a break, so the
 * countdown card never features it) — kept only so the map stays
 * exhaustive over the full SchoolPeriodId union. */
const SCENES: Record<SchoolPeriodId, Scene> = {
  rentree: [],
  toussaint: [
    { Icon: Leaf, top: "6%", left: "48%", size: "h-14 w-14", color: "text-orange-300", rotate: -12, driftY: 7, driftDurationMs: 5200, entranceDelayMs: 0 },
    { Icon: Leaf, top: "52%", left: "4%", size: "h-9 w-9", color: "text-orange-200/70", rotate: 18, driftY: 5, driftDurationMs: 4400, entranceDelayMs: 140 },
    { Icon: Leaf, top: "72%", left: "62%", size: "h-7 w-7", color: "text-white/40", rotate: -6, driftY: 4, driftDurationMs: 6000, entranceDelayMs: 260 },
  ],
  noel: [
    { Icon: Star, top: "2%", left: "20%", size: "h-6 w-6", color: "text-white/70", driftY: 3, driftDurationMs: 5000, entranceDelayMs: 0 },
    { Icon: Star, top: "10%", left: "70%", size: "h-5 w-5", color: "text-orange-200/70", driftY: 3, driftDurationMs: 4200, entranceDelayMs: 120 },
    { Icon: Snowflake, top: "48%", left: "2%", size: "h-8 w-8", color: "text-white/50", driftY: 5, driftDurationMs: 6200, entranceDelayMs: 240 },
    { Icon: Gift, top: "60%", left: "56%", size: "h-14 w-14", color: "text-orange-400", entranceDelayMs: 360 },
  ],
  hiver: [
    { Icon: Snowflake, top: "4%", left: "50%", size: "h-12 w-12", color: "text-white/70", driftY: 7, driftDurationMs: 4800, entranceDelayMs: 0 },
    { Icon: Snowflake, top: "44%", left: "4%", size: "h-8 w-8", color: "text-white/45", driftY: 5, driftDurationMs: 5600, entranceDelayMs: 140 },
    { Icon: Snowflake, top: "70%", left: "60%", size: "h-7 w-7", color: "text-orange-200/50", driftY: 4, driftDurationMs: 5000, entranceDelayMs: 280 },
  ],
  printemps: [
    { Icon: Flower2, top: "6%", left: "50%", size: "h-14 w-14", color: "text-orange-300", rotate: -8, driftY: 6, driftDurationMs: 5400, entranceDelayMs: 0 },
    { Icon: Flower2, top: "54%", left: "2%", size: "h-9 w-9", color: "text-orange-200/70", rotate: 10, driftY: 5, driftDurationMs: 4600, entranceDelayMs: 140 },
    { Icon: Leaf, top: "74%", left: "58%", size: "h-7 w-7", color: "text-white/45", rotate: 6, driftY: 4, driftDurationMs: 5000, entranceDelayMs: 260 },
  ],
  ascension: [
    { Icon: Sun, top: "4%", left: "54%", size: "h-14 w-14", color: "text-orange-400", entranceDelayMs: 0 },
    { Icon: Cloud, top: "48%", left: "2%", size: "h-10 w-10", color: "text-white/50", driftY: 3, driftDurationMs: 6400, entranceDelayMs: 140 },
    { Icon: Cloud, top: "70%", left: "48%", size: "h-9 w-9", color: "text-white/35", driftY: 3, driftDurationMs: 7200, entranceDelayMs: 260 },
  ],
  ete: [
    { Icon: Sun, top: "24%", left: "34%", size: "h-20 w-20", color: "text-orange-400", driftY: 2, driftDurationMs: 7000, entranceDelayMs: 0 },
    { Icon: Star, top: "2%", left: "4%", size: "h-6 w-6", color: "text-orange-200/60", entranceDelayMs: 160 },
    { Icon: Star, top: "10%", left: "76%", size: "h-5 w-5", color: "text-white/40", entranceDelayMs: 260 },
  ],
};

/** Alternates every few seconds — the shared "idle phase" driving the
 * whole scene's very slow, subtle drift. Respects prefers-reduced-motion
 * via the site-wide global rule that collapses all transition durations. */
function useIdlePhase() {
  const [phase, setPhase] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => !p), 3400);
    return () => clearInterval(id);
  }, []);
  return phase;
}

export function SeasonalIllustration({
  periodId,
  className = "",
}: {
  periodId: SchoolPeriodId;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const phase = useIdlePhase();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !("IntersectionObserver" in window) ||
      el.getBoundingClientRect().top < window.innerHeight * 0.92
    ) {
      const raf = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(raf);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scene = SCENES[periodId];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative ${className}`}
    >
      {scene.map(({ Icon, top, left, size, color, rotate, driftY, driftDurationMs, entranceDelayMs }, i) => (
        <div
          key={i}
          className="absolute transition-all duration-700 ease-out"
          style={{
            top,
            left,
            transitionDelay: revealed ? `${entranceDelayMs}ms` : "0ms",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "scale(1)" : "scale(0.7)",
          }}
        >
          <Icon
            className={`${size} ${color} transition-transform ease-in-out`}
            style={{
              transitionDuration: `${driftDurationMs ?? 5000}ms`,
              transform: `rotate(${rotate ?? 0}deg) translateY(${
                phase ? (driftY ?? 0) : 0
              }px)`,
            }}
            strokeWidth={1.5}
          />
        </div>
      ))}
    </div>
  );
}
