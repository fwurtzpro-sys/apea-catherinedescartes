"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Pencil, Star } from "lucide-react";

/**
 * Purely decorative accent for the intro section — a few Lucide icons in
 * the site's existing palette, with the same self-contained scroll
 * reveal + very slow idle drift already used on the idea box and school
 * calendar pages (kept local to this component, Reveal.tsx untouched).
 */
export function ActivitiesDoodle({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [phase, setPhase] = useState(false);

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

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => !p), 3600);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={`relative ${className}`}>
      <Pencil
        className="absolute left-0 top-0 h-6 w-6 text-orange-400 transition-all duration-700 ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          transform: `rotate(-18deg) translateY(${revealed ? (phase ? -3 : 0) : 8}px)`,
          transitionDelay: revealed ? "0ms" : "0ms",
        }}
        strokeWidth={1.75}
      />
      <Star
        className="absolute left-8 top-6 h-4 w-4 text-orange-300 transition-all duration-700 ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          transform: `translateY(${revealed ? (phase ? 0 : -3) : 8}px)`,
          transitionDelay: revealed ? "140ms" : "0ms",
        }}
      />
      <BookOpen
        className="absolute left-16 top-1 h-5 w-5 text-navy-900/30 transition-all duration-700 ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          transform: `translateY(${revealed ? (phase ? -3 : 0) : 8}px)`,
          transitionDelay: revealed ? "260ms" : "0ms",
        }}
        strokeWidth={1.75}
      />
    </div>
  );
}
