"use client";

import { useEffect, useState } from "react";
import { Circle, Star, Triangle } from "lucide-react";

/**
 * The graphic side of the homepage "Activités enfants" block: a tilted
 * coloring sheet with a simple line drawing (sun, cloud, rainbow) that's
 * partly colored in — evokes "printable coloring activities" directly,
 * rather than the more abstract ruled-lines placeholder this replaces.
 * Pure inline SVG/CSS, no new dependency, no external image.
 *
 * The only animated parts are the three pencils, which drift by a couple
 * of pixels on a slow shared cycle — self-contained here (not in
 * Reveal.tsx) and already covered by the site's global
 * prefers-reduced-motion rule (globals.css collapses every transition
 * duration for those users).
 */
function usePencilIdlePhase() {
  const [phase, setPhase] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => !p), 4200);
    return () => clearInterval(id);
  }, []);
  return phase;
}

function Pencil({
  className = "",
  color,
  rotate,
  drift,
}: {
  className?: string;
  color: string;
  rotate: number;
  drift: boolean;
}) {
  return (
    <div
      className={`absolute transition-transform duration-[1400ms] ease-in-out ${className}`}
      style={{
        transform: `rotate(${rotate}deg) translateY(${drift ? -3 : 0}px)`,
      }}
    >
      <svg width="72" height="16" viewBox="0 0 72 16" fill="none">
        <rect x="10" y="4" width="58" height="8" rx="4" className={color} />
        <path d="M10 4 L10 12 L0 8 Z" className={color} />
        <rect x="10" y="4" width="10" height="8" className="fill-cream-50/70" />
      </svg>
    </div>
  );
}

export function ColoringSheetIllustration() {
  const drift = usePencilIdlePhase();

  return (
    <>
      <Star
        className="absolute left-8 top-8 h-5 w-5 text-orange-300"
        aria-hidden="true"
      />
      <Circle
        className="absolute right-10 top-10 h-3.5 w-3.5 text-orange-300/70"
        aria-hidden="true"
      />
      <Triangle
        className="absolute bottom-10 left-10 h-6 w-6 text-navy-900/15"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 -rotate-3 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
        <svg
          viewBox="0 0 200 170"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          {/* Cloud — left uncolored, still "to do". */}
          <g className="stroke-navy-900/25" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M128 46c-3-7-10-11-18-11-9 0-16 6-18 14-7 1-12 6-12 13 0 8 6 14 14 14h34c7 0 13-6 13-13 0-7-5-12-13-13Z" />
          </g>

          {/* Sun — fully colored in, warm orange. */}
          <g>
            <circle cx="52" cy="48" r="16" className="fill-orange-400/90 stroke-orange-500" strokeWidth="2" />
            <g className="stroke-orange-300" strokeWidth="2.5" strokeLinecap="round">
              <path d="M52 22v-7M52 74v7M78 48h7M19 48h7M70.5 29.5l5-5M28.5 66.5l-5 5M70.5 66.5l5 5M28.5 29.5l-5-5" />
            </g>
          </g>

          {/* Rainbow — outer band colored, inner bands still just outlines. */}
          <g strokeLinecap="round" fill="none">
            <path d="M12 158a88 88 0 0 1 176 0" className="stroke-orange-500" strokeWidth="9" />
            <path d="M32 158a68 68 0 0 1 136 0" className="stroke-orange-200" strokeWidth="9" />
            <path d="M52 158a48 48 0 0 1 96 0" className="stroke-navy-900/15" strokeWidth="9" />
          </g>

          {/* A couple of small stars sprinkled on the sheet. */}
          <path
            d="M158 100l2.6 5.7 6.2.6-4.6 4.2 1.3 6.1-5.5-3.2-5.5 3.2 1.3-6.1-4.6-4.2 6.2-.6Z"
            className="fill-orange-300"
          />
          <path
            d="M96 128l1.9 4-.8.9-4 .4 3 2.7-.9 4.1 3.6-2.1 3.6 2.1-.9-4.1 3-2.7-4-.4Z"
            className="stroke-navy-900/25"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <Pencil
        className="bottom-[18%] right-[14%]"
        color="fill-orange-500"
        rotate={18}
        drift={drift}
      />
      <Pencil
        className="bottom-[13%] right-[20%]"
        color="fill-navy-900"
        rotate={26}
        drift={!drift}
      />
      <Pencil
        className="bottom-[9%] right-[10%]"
        color="fill-orange-200"
        rotate={10}
        drift={drift}
      />
    </>
  );
}
