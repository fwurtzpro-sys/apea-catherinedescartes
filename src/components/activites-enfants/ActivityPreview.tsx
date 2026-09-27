import type { ReactElement } from "react";
import { Sparkles } from "lucide-react";

/**
 * Line-art previews for the coloring pages — deliberately left mostly
 * uncolored (navy/gray strokes on white), like a real printable sheet
 * waiting for a child's crayons. Line thickness and amount of detail
 * scale with age: thick and minimal for CP, progressively finer and
 * busier towards CM2 (see the `HERO_PREVIEWS` map below).
 *
 * TPS/PS/MS/GS now point at real PDFs (see children-activities-data.ts)
 * and show `PdfReadyPreview` — a plain, generic printable-sheet icon —
 * rather than bespoke art per subject. CP through CM2 are still
 * placeholders: a handful have a bespoke drawing below, the rest fall
 * back to `ComingSoonPreview`.
 */

type PreviewProps = { className?: string };

const STROKE = "stroke-navy-900/60";
const STROKE_SOFT = "stroke-navy-900/40";

function BackpackPreview({ className }: PreviewProps) {
  // CP: more constructed — straps, pocket, buckle, small stitch details.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g className={STROKE} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M36 46c0-10 11-18 24-18s24 8 24 18v6" />
        <rect x="26" y="50" width="68" height="48" rx="14" />
        <rect x="42" y="66" width="36" height="26" rx="8" />
        <path d="M60 70v6M56 79h8" />
        <path d="M40 50v-4a4 4 0 0 1 4-4M80 50v-4a4 4 0 0 0-4-4" />
      </g>
      <g className={STROKE_SOFT} strokeWidth="1.75" strokeLinecap="round">
        <path d="M50 58h20M48 62h24" />
      </g>
    </svg>
  );
}

function SeaWorldPreview({ className }: PreviewProps) {
  // CE1: a small scene with several elements (fish, bubbles, waves, weed).
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g className={STROKE} strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round">
        <path d="M28 58c14-10 34-10 44 2-10 12-30 12-44 2Z" />
        <path d="M72 60l14-8-2 8 2 8Z" />
        <circle cx="38" cy="57" r="2" fill="currentColor" />
      </g>
      <g className={STROKE_SOFT} strokeWidth="2" strokeLinecap="round">
        <path d="M18 30c6-6 12-6 18 0M46 30c6-6 12-6 18 0M74 30c6-6 12-6 18 0" />
        <circle cx="88" cy="80" r="3" />
        <circle cx="96" cy="70" r="2" />
        <path d="M22 96c2-12 2-20 0-30M30 98c3-14 1-22-2-30" />
      </g>
    </svg>
  );
}

function DinosaurPreview({ className }: PreviewProps) {
  // CE2: the same classic long-neck silhouette as GS, but busier —
  // back plates along the spine, four legs, a plant, ground texture.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g className={STROKE} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="66" cy="72" rx="30" ry="20" />
        <path d="M42 56Q20 48 16 30" />
        <circle cx="16" cy="28" r="7" />
        <path d="M9 28l-6 1" />
        <circle cx="14" cy="25" r="1.6" fill="currentColor" />
        <path d="M94 62Q114 64 120 82" />
        <path d="M27 39l6 3-2 6M40 45l6 3-2 6M53 51l6 3-2 6" />
      </g>
      <path d="M50 90v12h6M82 90v12h6" className={STROKE} strokeWidth="2.25" strokeLinecap="round" />
      <path d="M55 92v12h6M87 92v12h6" className={STROKE_SOFT} strokeWidth="2" strokeLinecap="round" />
      <g className={STROKE_SOFT} strokeWidth="1.75" strokeLinecap="round">
        <path d="M100 92c6-3 12-2 14 3-6 3-12 1-14-3Z" />
        <path d="M8 108c14-4 26-4 36 0M76 110c10-3 20-3 30 0" />
      </g>
    </svg>
  );
}

function ForestAnimalsPreview({ className }: PreviewProps) {
  // CP: a real little scene — a rabbit beside a simple tree.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g className={STROKE_SOFT} strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round">
        {/* Tree: a round three-lobe canopy over a trunk. */}
        <path d="M24 98V70" />
        <circle cx="15" cy="58" r="11" />
        <circle cx="26" cy="49" r="13" />
        <circle cx="36" cy="58" r="10" />
      </g>
      <g className={STROKE} strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round">
        {/* Ears. */}
        <path d="M76 60c-2-14 2-26 6-26s6 12 4 24M88 60c2-14-2-26-6-26" />
        {/* Head + body. */}
        <circle cx="82" cy="68" r="12" />
        <path d="M70 76c-6 4-8 12-8 18 0 4 4 4 4 4h32s4 0 4-4c0-6-2-14-8-18" />
        <circle cx="78" cy="66" r="1.8" fill="currentColor" />
        <circle cx="86" cy="66" r="1.8" fill="currentColor" />
        <circle cx="82" cy="71" r="1.4" fill="currentColor" />
        <circle cx="70" cy="96" r="4" />
      </g>
      <path d="M10 98h100" className={STROKE_SOFT} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function SpaceSimplePreview({ className }: PreviewProps) {
  // CP: a small, clear scene — one planet, a ring, a moon, a few stars.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g className={STROKE} strokeWidth="2.5" strokeLinecap="round">
        <circle cx="52" cy="60" r="22" />
        <ellipse cx="52" cy="60" rx="34" ry="9" />
      </g>
      <path d="M92 32a10 10 0 1 0 6 12 8 8 0 0 1-6-12Z" className={STROKE_SOFT} strokeWidth="2" />
      <g className={STROKE_SOFT} strokeWidth="2" strokeLinecap="round">
        <path d="M18 30l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1Z" />
        <circle cx="24" cy="86" r="2" fill="currentColor" stroke="none" />
        <circle cx="96" cy="88" r="2.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

function NatureScenePreview({ className }: PreviewProps) {
  // CE1: a fuller little scene — sun, hill, tree, bird, grass.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g className={STROKE_SOFT} strokeWidth="2" strokeLinecap="round">
        <circle cx="92" cy="26" r="10" />
        <path d="M92 10v-4M92 46v-4M76 26h-4M112 26h-4" />
      </g>
      <path d="M6 92c20-14 40-14 60 0s34 14 54 0" className={STROKE} strokeWidth="2" />
      <g className={STROKE} strokeWidth="2.25" strokeLinecap="round">
        <path d="M30 92V64" />
        <path d="M30 76c-9-3-11-13-6-19 5 6 9 8 6 19ZM30 70c9-3 11-13 6-19-5 6-9 8-6 19Z" />
      </g>
      <path d="M64 46c6-4 12-2 12 4s-8 8-16 4c2-4 2-6 4-8Z" className={STROKE_SOFT} strokeWidth="1.75" />
      <path d="M10 96c3-2 6-2 8 0M100 96c3-2 6-2 8 0" className={STROKE_SOFT} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function AnimalsScenePreview({ className }: PreviewProps) {
  // CE1: two clearly different animals — a cat and a turtle.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g className={STROKE} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
        {/* Cat: pointed ears, round head, sitting body, tail. */}
        <path d="M22 62l-6-12 12 6ZM50 62l6-12-12 6Z" />
        <circle cx="36" cy="66" r="14" />
        <path d="M22 78c0 12 6 20 14 20s14-8 14-20" />
        <path d="M50 88c6 2 8 8 4 12" />
        <path d="M30 66h1M42 66h1" />
        <path d="M32 72c2 2 6 2 8 0" />
      </g>
      <g className={STROKE_SOFT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Turtle: a proper domed shell on a flat base, with scute lines,
            a small head and legs peeking out from underneath. */}
        <path d="M64 94A26 20 0 0 1 116 94Z" />
        <path d="M90 94V76M77 94Q80 82 90 76M103 94Q100 82 90 76" />
        <circle cx="58" cy="90" r="7" />
        <circle cx="55" cy="88" r="1.4" fill="currentColor" />
        <path d="M72 94l-3 8M86 94l1 8M98 94l-1 8M110 94l3 8" />
      </g>
      <path d="M10 102h100" className={STROKE_SOFT} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function LandscapeCE2Preview({ className }: PreviewProps) {
  // CE2: a fuller scene than CE1 — cabin, hills, trees, sun.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g className={STROKE_SOFT} strokeWidth="1.5" strokeLinecap="round">
        <path d="M4 84c14-8 26-8 38 0s26 8 38 0 24-6 36 2" />
      </g>
      <circle cx="96" cy="24" r="9" className={STROKE_SOFT} strokeWidth="1.5" />
      <g className={STROKE} strokeWidth="1.75" strokeLinejoin="round">
        <rect x="34" y="70" width="30" height="22" />
        <path d="M30 70 49 54l19 16" />
        <rect x="46" y="80" width="8" height="12" />
        <path d="M49 54v-10" />
      </g>
      <g className={STROKE_SOFT} strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 92V72" />
        <path d="M14 80c-7-3-9-11-5-16 4 5 7 7 5 16ZM14 76c7-3 9-11 5-16-4 5-7 7-5 16Z" />
      </g>
      <path d="M6 96h108" className={STROKE_SOFT} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SpacePlanetsPreview({ className }: PreviewProps) {
  // CE2: busier than the CP version — several planets, more stars, a rocket.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g className={STROKE} strokeWidth="1.75">
        <circle cx="40" cy="46" r="18" />
        <path d="M24 46c4-3 8-4 16-4s12 1 16 4" strokeLinecap="round" />
        <ellipse cx="86" cy="80" rx="20" ry="7" />
        <circle cx="86" cy="80" r="12" />
      </g>
      <g className={STROKE_SOFT} strokeWidth="1.5" strokeLinecap="round">
        <circle cx="14" cy="90" r="7" />
        <path d="M92 30l14 10-10 2 6 8-12-6Z" />
        <path d="M18 20l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1Z" />
        <circle cx="100" cy="16" r="2" fill="currentColor" stroke="none" />
        <circle cx="58" cy="96" r="2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

function NatureDetailedPreview({ className }: PreviewProps) {
  // CM1: a proper tree silhouette (not floating circles), with visible
  // branch lines through the canopy, a bird, and small flowers at the base.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <path d="M60 100V62" className={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      {/* Canopy: a "cloud" outline (same proven bumpy-blob formula used
          elsewhere on the site), scaled up as a tree top. */}
      <path
        d="M82 44c-3-8-11-13-21-13-11 0-19 7-21 16-9 1-15 8-15 16 0 9 7 16 16 16h40c8 0 15-7 15-15 0-8-6-15-14-16Z"
        className={STROKE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <g className={STROKE_SOFT} strokeWidth="1" strokeLinecap="round">
        <path d="M60 62V34M60 48l-13-8M60 42l13-8M60 56l-11-5M60 52l13-6" />
      </g>
      <path d="M104 22l6-4-1 5 4 3-6 1-1 6-3-5-6 1 3-4Z" className={STROKE_SOFT} strokeWidth="1" />
      <g className={STROKE} strokeWidth="1.25" strokeLinecap="round">
        {/* Small flowers at the base, built from overlapping petal
            circles (the same reliable technique as the MS flower). */}
        <circle cx="21" cy="94" r="4" />
        <circle cx="31" cy="94" r="4" />
        <circle cx="26" cy="89" r="4" />
        <circle cx="26" cy="99" r="4" />
        <circle cx="26" cy="94" r="2.5" fill="white" />
        <circle cx="91" cy="94" r="4" />
        <circle cx="101" cy="94" r="4" />
        <circle cx="96" cy="89" r="4" />
        <circle cx="96" cy="99" r="4" />
        <circle cx="96" cy="94" r="2.5" fill="white" />
      </g>
      <path d="M4 104h112" className={STROKE_SOFT} strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function AnimalsElaboratePreview({ className }: PreviewProps) {
  // CM1: an owl with visible feather texture, perched on a branch — noticeably busier.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g className={STROKE} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        {/* Body, with the head as its rounded top third (no separate head shape). */}
        <path d="M60 16c-10 0-16 8-16 16 0 3 1 6 2 8-10 6-16 18-16 32 0 22 13 36 30 36s30-14 30-36c0-14-6-26-16-32 1-2 2-5 2-8 0-8-6-16-16-16Z" />
        {/* Ear tufts, small and close to the head. */}
        <path d="M46 22l-4-10 8 6M74 22l4-10-8 6" />
        {/* Eyes. */}
        <circle cx="50" cy="34" r="7" />
        <circle cx="70" cy="34" r="7" />
        <circle cx="50" cy="34" r="2.5" fill="currentColor" />
        <circle cx="70" cy="34" r="2.5" fill="currentColor" />
        <path d="M57 41l3 4 3-4" />
      </g>
      <g className={STROKE} strokeWidth="1.25" strokeLinecap="round">
        {/* Feather chevrons on the belly — bold enough to actually show. */}
        <path d="M42 64q18 6 36 0M40 74q20 7 40 0M42 84q18 6 36 0M46 92q14 5 28 0" />
      </g>
      <g className={STROKE_SOFT} strokeWidth="1.25" strokeLinecap="round">
        {/* Folded wings, low on the body rather than up by the head. */}
        <path d="M28 58c-6 6-8 18-2 30 6-4 8-18 2-30ZM92 58c6 6 8 18 2 30-6-4-8-18-2-30Z" />
      </g>
      <path d="M52 100v8h-6M68 100v8h6" className={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 108h80" className={STROKE_SOFT} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CreativeComplexPreview({ className }: PreviewProps) {
  // CM2: the most intricate composition — a decorative feather motif.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <path d="M60 10c18 10 22 40 22 56 0 22-10 40-22 46-12-6-22-24-22-46 0-16 4-46 22-56Z" className={STROKE} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M60 24v76" className={STROKE} strokeWidth="1.25" strokeLinecap="round" />
      <g className={STROKE_SOFT} strokeWidth="1" strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => {
          const y = 30 + i * 8;
          const w = 16 - Math.abs(i - 3.5) * 2;
          return <path key={`l-${i}`} d={`M60 ${y}q-${w} 4 -${w * 1.6} ${w}`} />;
        })}
        {Array.from({ length: 8 }, (_, i) => {
          const y = 30 + i * 8;
          const w = 16 - Math.abs(i - 3.5) * 2;
          return <path key={`r-${i}`} d={`M60 ${y}q${w} 4 ${w * 1.6} ${w}`} />;
        })}
      </g>
      <circle cx="60" cy="56" r="10" className={STROKE_SOFT} strokeWidth="1" />
      <circle cx="60" cy="56" r="4" className={STROKE} strokeWidth="1.25" />
    </svg>
  );
}

function mandalaPetal(
  cx: number,
  cy: number,
  angleDeg: number,
  len: number,
  width: number
): string {
  const rad = (angleDeg * Math.PI) / 180;
  const perp = rad + Math.PI / 2;
  const tipX = cx + len * Math.cos(rad);
  const tipY = cy + len * Math.sin(rad);
  const midX = cx + len * 0.6 * Math.cos(rad);
  const midY = cy + len * 0.6 * Math.sin(rad);
  const b1x = cx + width * Math.cos(perp);
  const b1y = cy + width * Math.sin(perp);
  const b2x = cx - width * Math.cos(perp);
  const b2y = cy - width * Math.sin(perp);
  const c1x = midX + width * 0.7 * Math.cos(perp);
  const c1y = midY + width * 0.7 * Math.sin(perp);
  const c2x = midX - width * 0.7 * Math.cos(perp);
  const c2y = midY - width * 0.7 * Math.sin(perp);
  return `M ${b1x} ${b1y} Q ${c1x} ${c1y} ${tipX} ${tipY} Q ${c2x} ${c2y} ${b2x} ${b2y} Z`;
}

function MandalaPreview({
  className,
  detailed,
}: PreviewProps & { detailed: boolean }) {
  const cx = 60;
  const cy = 60;
  const strokeWidth = detailed ? "1.1" : "2";
  const stroke = detailed ? STROKE_SOFT : STROKE;

  const innerCount = 8;
  const innerPetals = Array.from({ length: innerCount }, (_, i) => (
    <path
      key={`inner-${i}`}
      d={mandalaPetal(cx, cy, (360 / innerCount) * i, detailed ? 22 : 32, detailed ? 6 : 9)}
      className={stroke}
      strokeWidth={strokeWidth}
    />
  ));

  const outerCount = detailed ? 16 : 0;
  const outerPetals = Array.from({ length: outerCount }, (_, i) => (
    <path
      key={`outer-${i}`}
      d={mandalaPetal(cx, cy, (360 / outerCount) * i, 40, 5)}
      className={STROKE_SOFT}
      strokeWidth="1"
    />
  ));

  const dotCount = detailed ? 16 : 0;
  const dots = Array.from({ length: dotCount }, (_, i) => {
    const angle = ((360 / dotCount) * i * Math.PI) / 180;
    return (
      <circle
        key={`dot-${i}`}
        cx={cx + 48 * Math.cos(angle)}
        cy={cy + 48 * Math.sin(angle)}
        r="1.4"
        className={STROKE_SOFT}
        fill="currentColor"
      />
    );
  });

  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <circle cx={cx} cy={cy} r="4" className={STROKE} strokeWidth={strokeWidth} />
      {innerPetals}
      {outerPetals}
      {dots}
      <circle
        cx={cx}
        cy={cy}
        r={detailed ? 50 : 42}
        className={STROKE_SOFT}
        strokeWidth="1"
      />
    </svg>
  );
}

function LandscapePreview({ className }: PreviewProps) {
  // CM2: a fuller, more detailed scene (several layers + fine texture).
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g className={STROKE_SOFT} strokeWidth="1.25" strokeLinecap="round">
        <path d="M10 78c10-10 20-8 30 0s22 8 32-2 24-6 36 4" />
        <path d="M14 92c12-8 22-6 32 2s24 6 34-4 20-6 30 2" />
      </g>
      <g className={STROKE} strokeWidth="1.75" strokeLinejoin="round">
        <path d="M28 92 44 60l16 32Z" />
        <path d="M56 92 76 48l20 44Z" />
      </g>
      <circle cx="92" cy="30" r="10" className={STROKE_SOFT} strokeWidth="1.25" />
      <path d="M8 96h104" className={STROKE_SOFT} strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

const HERO_PREVIEWS: Record<string, (props: PreviewProps) => ReactElement> = {
  // CP
  "cp-cartable": BackpackPreview,
  "cp-animaux-foret": ForestAnimalsPreview,
  "cp-espace": SpaceSimplePreview,
  // CE1
  "ce1-monde-marin": SeaWorldPreview,
  "ce1-nature": NatureScenePreview,
  "ce1-animaux": AnimalsScenePreview,
  // CE2
  "ce2-dinosaure-detaille": DinosaurPreview,
  "ce2-paysage": LandscapeCE2Preview,
  "ce2-espace-planetes": SpacePlanetsPreview,
  // CM1
  "cm1-mandala-simple": (props) => <MandalaPreview {...props} detailed={false} />,
  "cm1-nature-detaillee": NatureDetailedPreview,
  "cm1-animaux-travailles": AnimalsElaboratePreview,
  // CM2
  "cm2-mandala": (props) => <MandalaPreview {...props} detailed />,
  "cm2-paysage-detaille": LandscapePreview,
  "cm2-illustration-creative": CreativeComplexPreview,
};

function ComingSoonPreview({ className }: PreviewProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-navy-900/10 ${className}`}
      aria-hidden="true"
    >
      <Sparkles className="h-6 w-6 text-navy-900/15" strokeWidth={1.5} />
    </div>
  );
}

function PdfReadyPreview({ className }: PreviewProps) {
  // A plain, generic printable-sheet icon — used for every activity that
  // now has a real PDF (TPS/PS/MS/GS), instead of bespoke art per subject.
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <path
        d="M34 14h38l14 14v78a4 4 0 0 1-4 4H34a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4Z"
        className={STROKE}
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path d="M72 14v14h14" className={STROKE} strokeWidth="2.25" strokeLinejoin="round" />
      <path d="M42 56h36M42 68h36M42 80h24" className={STROKE_SOFT} strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="40" r="3" className={STROKE} strokeWidth="2" />
    </svg>
  );
}

export function ActivityPreview({
  activityId,
  available = false,
  className = "h-full w-full",
}: {
  activityId: string;
  available?: boolean;
  className?: string;
}) {
  const Preview = HERO_PREVIEWS[activityId];
  if (Preview) return <Preview className={className} />;
  if (available) return <PdfReadyPreview className={className} />;
  return <ComingSoonPreview className={className} />;
}
