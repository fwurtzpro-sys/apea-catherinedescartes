"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbulb, Sparkles, Star } from "lucide-react";

/**
 * Purely decorative: CSS + an inline SVG box + Lucide icons, no generated
 * image. Self-contained scroll-triggered entrance (independent of Reveal.tsx)
 * plus the existing gentle float, both governed by the site's global
 * prefers-reduced-motion rule (globals.css), which collapses every
 * animation/transition duration to ~0 for those users — nothing here is
 * required to understand or use the page.
 */
export function IdeaBoxIllustration({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

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

  return (
    <div ref={ref} className={`group relative ${className}`} aria-hidden="true">
      <Star
        className={`absolute -left-2 top-2 h-4 w-4 text-orange-400/70 transition-all duration-500 ease-out motion-safe:animate-pulse ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5"
        }`}
        style={{ transitionDelay: revealed ? "260ms" : "0ms" }}
      />
      <Sparkles
        className={`absolute right-4 top-0 h-5 w-5 text-orange-400/80 transition-all duration-500 ease-out ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5"
        }`}
        style={{ transitionDelay: revealed ? "380ms" : "0ms" }}
      />
      <Star
        className={`absolute bottom-6 left-6 h-3 w-3 text-orange-400/60 transition-all duration-500 ease-out ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5"
        }`}
        style={{ transitionDelay: revealed ? "500ms" : "0ms" }}
      />

      <div className="relative mx-auto flex h-40 w-40 items-end justify-center sm:h-48 sm:w-48">
        <div className="motion-safe:animate-[idea-float_3.2s_ease-in-out_infinite] absolute left-1/2 top-0 -translate-x-1/2">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 shadow-sm transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-105 ${
              revealed ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{ transitionDelay: revealed ? "150ms" : "0ms" }}
          >
            <Lightbulb className="h-6 w-6" strokeWidth={1.75} />
          </span>
        </div>

        <svg
          viewBox="0 0 160 110"
          className={`relative h-28 w-full text-navy-900 transition-all duration-700 ease-out sm:h-32 ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          fill="none"
        >
          <path
            d="M14 46 80 20 146 46 146 96a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4Z"
            fill="#fff"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M14 46 80 20 146 46 80 72Z"
            fill="#FFF4E8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M80 72V100"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
