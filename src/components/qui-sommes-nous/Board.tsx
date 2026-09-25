"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BOARD_MEMBERS } from "@/lib/board-data";

/**
 * Centers a lone last card on tablet, where cards sit 2-per-row: with an
 * odd member count the final card would otherwise be stranded on the left.
 * An even count (4, 6…) already fills every row, so no offset is needed.
 */
function getTabletOffsetClass(index: number, total: number): string {
  if (total % 2 === 1 && index === total - 1) return "sm:col-start-2";
  return "";
}

/**
 * 4 members: two full rows of 2 (a 4-col/2-span grid keeps every row
 * complete). 5 members: 3 then 2 — a 6-col/2-span grid rows the first 3
 * naturally, and getDesktopOffsetClass centers the trailing pair. 6
 * members: the same 6-col/2-span grid rows exactly 3 + 3 with no offset.
 */
function getDesktopColsClass(total: number): string {
  return total === 4 ? "lg:grid-cols-4" : "lg:grid-cols-6";
}

function getDesktopOffsetClass(index: number, total: number): string {
  if (total === 5 && index === 3) return "lg:col-start-2";
  return "";
}

// Roughly matches how long the cards take to finish revealing: last card
// delay (index * 90ms) + its own transition duration, plus a small buffer.
const CARDS_SETTLE_MS = 1300;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Purely decorative hand-drawn curves scattered in the whitespace around
 * the grid (never over a card). They render fully drawn by default —
 * progressive enhancement and reduced-motion both simply skip the
 * "draw-in" animation and keep them visible.
 */
function BoardDoodles({ gridRef }: { gridRef: RefObject<HTMLDivElement | null> }) {
  const [undrawn, setUndrawn] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    setUndrawn(true);
    let settleTimeout: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          settleTimeout = setTimeout(() => setUndrawn(false), CARDS_SETTLE_MS);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(settleTimeout);
    };
  }, [gridRef]);

  const pathClass = `transition-[stroke-dashoffset] duration-[900ms] ease-out ${
    undrawn ? "[stroke-dashoffset:1]" : "[stroke-dashoffset:0]"
  }`;
  const tipClass = `transition-all duration-300 ${
    undrawn ? "scale-0 opacity-0" : "scale-100 opacity-100 delay-[900ms]"
  }`;

  // Small hand-drawn arrowhead: two short ticks meeting at the origin,
  // pointing along +x before rotation. Placed at (x, y) and rotated to
  // match the tangent of the curve it caps, so it reads as a natural
  // continuation of the stroke rather than a separate geometric shape.
  const arrowTip = (x: number, y: number, angle: number, strong = false) => (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <g className={tipClass}>
        <line x1={strong ? "-9" : "-7"} y1={strong ? "-5" : "-4"} x2="0" y2="0" stroke="currentColor" strokeWidth={strong ? "2.5" : "2"} strokeLinecap="round" />
        <line x1={strong ? "-9" : "-7"} y1={strong ? "5" : "4"} x2="0" y2="0" stroke="currentColor" strokeWidth={strong ? "2.5" : "2"} strokeLinecap="round" />
      </g>
    </g>
  );

  // Every decoration below is positioned in pixels relative to the grid
  // wrapper (1 SVG unit = 1px, via a viewBox matching its own box size),
  // measured against the actual rendered card positions so each curve sits
  // in genuine whitespace — never over, nor behind, a card.
  return (
    <>
      {/* Desktop (3+3 grid): a curve in each inter-card gap, plus a taller
          looping curve at the far left tying the two left-column members
          together, and a small flourish balancing the bottom-right. */}

      {/* Marine → Albane */}
      <svg
        viewBox="0 0 96 140"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute hidden lg:block"
        style={{ left: 352, top: 20, width: 96, height: 140 }}
      >
        <path
          d="M20 15 C 90 0, 90 60, 20 55 C 5 50, 20 100, 60 110"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          className={`${pathClass} text-orange-400/80`}
        />
        {arrowTip(60, 110, 14)}
      </svg>

      {/* Albane → Nathalie */}
      <svg
        viewBox="0 0 96 140"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute hidden lg:block"
        style={{ left: 768, top: 20, width: 96, height: 140 }}
      >
        <path
          d="M76 15 C 6 0, 6 60, 76 55 C 91 50, 76 100, 36 110"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          className={`${pathClass} text-orange-400/80`}
        />
        {arrowTip(36, 110, 166)}
      </svg>

      {/* Myriam → Margaux — the emphasised connection: bolder stroke,
          bigger loop, deeper orange. */}
      <svg
        viewBox="0 0 96 140"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute hidden lg:block"
        style={{ left: 352, top: 249, width: 96, height: 140 }}
      >
        <path
          d="M20 15 C 94 -8, 94 66, 20 58 C 2 55, 20 106, 64 116"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          className={`${pathClass} text-orange-500`}
        />
        {arrowTip(64, 116, 15, true)}
      </svg>

      {/* Margaux → Maud */}
      <svg
        viewBox="0 0 96 140"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute hidden lg:block"
        style={{ left: 768, top: 249, width: 96, height: 140 }}
      >
        <path
          d="M76 15 C 4 0, 4 60, 76 55 C 94 50, 76 100, 34 110"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          className={`${pathClass} text-orange-400/80`}
        />
        {arrowTip(34, 110, 166)}
      </svg>

      {/* Tablet (2+2+2 grid): the column gap is only 56px wide here, and
          the reflow puts Myriam/Margaux on a diagonal rather than side by
          side, so a literal per-pair mapping no longer applies. Two
          modest curves — one in the top row's gap, one in the bottom
          row's — keep the same decorative language without crowding the
          tighter layout. */}
      <svg
        viewBox="0 0 56 140"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute hidden sm:block lg:hidden"
        style={{ left: 332, top: 20, width: 56, height: 140 }}
      >
        <path
          d="M10 10 C 50 -5, 50 45, 10 40 C 0 38, 10 75, 35 82"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          className={`${pathClass} text-orange-400/80`}
        />
        {arrowTip(35, 82, 20)}
      </svg>
      <svg
        viewBox="0 0 56 140"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute hidden sm:block lg:hidden"
        style={{ left: 332, top: 482, width: 56, height: 140 }}
      >
        <path
          d="M46 10 C 6 -5, 6 45, 46 40 C 56 38, 46 75, 21 82"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          className={`${pathClass} text-orange-500`}
        />
        {arrowTip(21, 82, 160, true)}
      </svg>
    </>
  );
}

export function Board() {
  const gridRef = useRef<HTMLDivElement>(null);
  const members = BOARD_MEMBERS.filter((member) => member.visible);
  if (members.length === 0) return null;

  return (
    <Container className="pb-16 sm:pb-20">
      <Reveal strong className="mx-auto max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
          L&rsquo;équipe
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-navy-900 sm:text-4xl">
          Le bureau
        </h2>
        <p className="mt-3 leading-relaxed text-navy-900/70">
          Les parents bénévoles qui coordonnent les projets de
          l&rsquo;association.
        </p>
      </Reveal>

      <div className="relative">
        <BoardDoodles gridRef={gridRef} />

        <div
          ref={gridRef}
          className={`mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-4 sm:gap-y-14 ${getDesktopColsClass(members.length)}`}
        >
          {members.map((member, index) => (
            <Reveal
              key={`${member.firstName}-${member.lastName}`}
              strong
              delay={index * 90}
              className={`sm:col-span-2 lg:col-span-2 ${getTabletOffsetClass(index, members.length)} ${getDesktopOffsetClass(index, members.length)}`}
            >
              <div className="group relative mx-auto flex max-w-xs flex-col items-center rounded-[2rem] bg-white px-6 pb-8 pt-14 text-center shadow-sm ring-1 ring-navy-900/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="absolute -top-12 h-24 w-24 overflow-hidden rounded-full ring-4 ring-cream-50 sm:-top-14 sm:h-28 sm:w-28">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={`${member.firstName} ${member.lastName}`}
                      fill
                      sizes="112px"
                      className="object-cover"
                      style={
                        member.imagePosition
                          ? { objectPosition: member.imagePosition }
                          : undefined
                      }
                    />
                  ) : (
                    <div
                      className="h-full w-full rounded-full border-2 border-dashed border-orange-200 bg-gradient-to-br from-cream-200 to-orange-50"
                      aria-label="Photo à venir"
                      role="img"
                    />
                  )}
                </div>

                <p className="mt-2 text-lg font-semibold text-navy-900">
                  {member.firstName}
                </p>
                <p className="text-sm font-bold uppercase tracking-wide text-navy-900">
                  {member.lastName}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-orange-500">
                  {member.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
