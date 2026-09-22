"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Users, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/site-config";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-900/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            if (link.children) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-orange-500"
                        : "text-navy-900 hover:text-orange-500"
                    }`}
                    aria-expanded={openDropdown === link.label}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute left-0 top-full w-56 rounded-2xl border border-navy-900/10 bg-white p-2 shadow-lg shadow-navy-900/10">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-navy-900 hover:bg-orange-50 hover:text-orange-600"
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
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
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

        <div className="hidden lg:block">
          <Button href="/contact" icon={<Users className="h-4 w-4" />}>
            Nous rejoindre
          </Button>
        </div>

        <button
          className="rounded-full p-2 text-navy-900 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-navy-900/5 bg-white px-4 pb-6 lg:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-3 py-2.5 text-base font-semibold text-navy-900 hover:bg-orange-50 hover:text-orange-600"
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
                        className="rounded-lg px-2 py-2 text-sm font-medium text-navy-900/70 hover:text-orange-600"
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
            className="mt-4 w-full"
          >
            Nous rejoindre
          </Button>
        </div>
      )}
    </header>
  );
}
