"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms, applied via transition-delay. */
  delay?: number;
  direction?: Direction;
  /** Adds a very subtle scale-in (0.98 -> 1), e.g. for photos. */
  scale?: boolean;
  /**
   * For above-the-fold content (e.g. the Hero): plays the entrance once on
   * mount instead of waiting for the element to scroll into view.
   */
  immediate?: boolean;
  /**
   * Slightly larger displacement + duration, for pages that want a more
   * perceptible entrance. Off by default, so existing callers (the homepage)
   * are unaffected.
   */
  strong?: boolean;
};

const HIDDEN_OFFSET: Record<Direction, string> = {
  up: "translate-y-5",
  left: "-translate-x-5",
  right: "translate-x-5",
  none: "",
};

const HIDDEN_OFFSET_STRONG: Record<Direction, string> = {
  up: "translate-y-7",
  left: "-translate-x-7",
  right: "translate-x-7",
  none: "",
};

// useLayoutEffect on the client (avoids a visible flash before the hidden
// state applies), falls back to useEffect on the server to skip React's warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Fades and slightly shifts its children into place once they scroll into
 * view. Renders fully visible by default — no JS, reduced motion, or an
 * unsupported browser all simply keep the content shown, never hidden.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  scale = false,
  immediate = false,
  strong = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (immediate) {
      // Above-the-fold content: start hidden, then reveal on the next
      // couple of frames so the transition actually plays.
      setHidden(true);
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setHidden(false));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }

    if (!("IntersectionObserver" in window)) return;

    // Already in (or near) view on load: keep it visible, nothing to animate.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setHidden(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  const offsetMap = strong ? HIDDEN_OFFSET_STRONG : HIDDEN_OFFSET;
  const duration = strong ? "duration-[750ms]" : "duration-700";

  return (
    <div
      ref={ref}
      className={`${className} transition-all ${duration} ease-out ${
        hidden
          ? `opacity-0 ${offsetMap[direction]} ${scale ? "scale-[0.98]" : ""}`
          : "opacity-100 translate-x-0 translate-y-0 scale-100"
      }`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
