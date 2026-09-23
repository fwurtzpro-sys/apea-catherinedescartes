type DecoProps = {
  className?: string;
};

/** Small hand-drawn "spark burst" accent used next to headings and buttons. */
export function Burst({ className = "" }: DecoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M20 2v11M20 27v11M38 20H27M13 20H2M32.6 7.4l-7.8 7.8M15.2 24.8l-7.8 7.8M32.6 32.6l-7.8-7.8M15.2 15.2 7.4 7.4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Outlined heart accent. */
export function HeartDoodle({ className = "" }: DecoProps) {
  return (
    <svg
      viewBox="0 0 32 28"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M16 26.5C7 20.8 1.5 15.6 1.5 9.8 1.5 5.3 5 2 9.4 2c2.6 0 5 1.3 6.6 3.4C17.6 3.3 20 2 22.6 2 27 2 30.5 5.3 30.5 9.8c0 5.8-5.5 11-14.5 16.7Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small squiggly underline used beneath handwritten accents. */
export function Squiggle({ className = "" }: DecoProps) {
  return (
    <svg
      viewBox="0 0 140 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 10c10-10 20-10 30 0s20 10 30 0 20-10 30 0 20 10 30 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Facebook glyph (lucide-react dropped brand icons in recent versions). */
export function FacebookIcon({ className = "" }: DecoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.95 2 14.66 2 11.97 2 10 3.66 10 6.7v2.8H7v4h3V22h4Z" />
    </svg>
  );
}

/** Instagram glyph (lucide-react dropped brand icons in recent versions). */
export function InstagramIcon({ className = "" }: DecoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
    </svg>
  );
}

/** Full-width organic wave divider between sections. */
export function WaveDivider({
  className = "",
  color = "currentColor",
  flip = false,
}: DecoProps & { color?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`${className} ${flip ? "rotate-180" : ""}`}
    >
      <path
        d="M0 32c120 24 240 36 360 32s240-24 360-24 240 24 360 32 240 8 360-16V80H0Z"
        fill={color}
      />
    </svg>
  );
}
