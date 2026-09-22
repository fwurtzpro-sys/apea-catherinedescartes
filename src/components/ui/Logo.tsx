import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site-config";

/**
 * Swap this path for the official logo file once supplied (SVG or PNG,
 * transparent background) — nothing else in the header/footer needs to
 * change.
 */
const LOGO_SRC = "/logo-placeholder.svg";

type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
};

export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-navy-900";
  const subTextColor =
    variant === "light" ? "text-white/90" : "text-navy-900/90";

  return (
    <Link
      href="/"
      className={`flex items-center gap-3 ${className}`}
      aria-label={`${SITE.name} — retour à l'accueil`}
    >
      <Image
        src={LOGO_SRC}
        alt={`Logo ${SITE.name}`}
        width={56}
        height={56}
        className="h-12 w-12 shrink-0 sm:h-14 sm:w-14"
        priority
      />
      <span className="flex flex-col leading-tight">
        <span
          className={`text-lg font-extrabold tracking-tight sm:text-xl ${textColor}`}
        >
          {SITE.shortName}
        </span>
        <span className={`text-sm font-semibold sm:text-base ${subTextColor}`}>
          Catherine Descartes
        </span>
        <span className="font-script text-lg leading-none text-orange-400">
          {SITE.city}
        </span>
      </span>
    </Link>
  );
}
