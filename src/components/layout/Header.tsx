"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Users, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/site-config";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [barHeight, setBarHeight] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Measure the header bar so the full-screen mobile overlay starts
  // exactly below it, whatever the logo/nav sizing at the current width.
  useLayoutEffect(() => {
    function measure() {
      if (barRef.current) setBarHeight(barRef.current.offsetHeight);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Close the desktop dropdown on Escape, or when focus/click leaves it.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Lock body scroll while the mobile menu is open (menu links already
  // close it themselves via onClick on navigation).
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-navy-900/5 bg-white/95 backdrop-blur">
        <div
          ref={barRef}
          className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 xl:px-8"
        >
        <Logo />

        <nav
          className="hidden items-center xl:flex"
          aria-label="Navigation principale"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            if (link.children) {
              const isOpen = openDropdown === link.label;
              return (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className={`flex items-center gap-0.5 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-semibold transition-colors ${FOCUS_RING} ${
                      isActive
                        ? "text-orange-500"
                        : "text-navy-900 hover:text-orange-500"
                    }`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      strokeWidth={2.5}
                    />
                  </button>
                  {isOpen && (
                    <div className="menu-pop-in absolute left-0 top-full w-56 rounded-2xl border border-navy-900/10 bg-white p-2 shadow-lg shadow-navy-900/10">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block rounded-xl px-3 py-2 text-sm font-medium text-navy-900 hover:bg-orange-50 hover:text-orange-600 ${FOCUS_RING}`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-semibold transition-colors ${FOCUS_RING} ${
                  isActive
                    ? "text-orange-500"
                    : "text-navy-900 hover:text-orange-500"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <Button
            href="/contact"
            size="sm"
            icon={<Users className="h-3.5 w-3.5 shrink-0" />}
            className={`whitespace-nowrap ${FOCUS_RING}`}
          >
            Nous rejoindre
          </Button>
        </div>

        <button
          type="button"
          className={`rounded-full p-2 text-navy-900 xl:hidden ${FOCUS_RING}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </header>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="menu-pop-in fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-white xl:hidden"
          style={{ top: barHeight }}
        >
          <nav
            className="flex flex-col gap-1 px-4 pt-4"
            aria-label="Navigation mobile"
          >
            {NAV_LINKS.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-xl px-3 py-3 text-base font-semibold text-navy-900 hover:bg-orange-50 hover:text-orange-600 ${FOCUS_RING}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-3 flex flex-col border-l-2 border-orange-100 pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`rounded-lg px-2 py-2.5 text-sm font-medium text-navy-900/70 hover:text-orange-600 ${FOCUS_RING}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Button
            href="/contact"
            icon={<Users className="h-4 w-4" />}
            className="mx-4 mt-4 mb-6 w-[calc(100%-2rem)]"
            onClick={() => setMobileOpen(false)}
          >
            Nous rejoindre
          </Button>
        </div>
      )}
    </>
  );
}
