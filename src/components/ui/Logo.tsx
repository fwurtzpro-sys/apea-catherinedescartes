import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site-config";

/** Official APEA logo, supplied by the association — used unmodified. */
const LOGO_SRC = "/logo-apea.png";

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
        className="h-11 w-11 shrink-0 sm:h-12 sm:w-12 xl:h-[3.25rem] xl:w-[3.25rem]"
        priority
      />
      <span className="flex flex-col whitespace-nowrap leading-tight">
        <span
          className={`text-sm font-extrabold tracking-tight sm:text-base ${textColor}`}
        >
          {SITE.shortName}
        </span>
        <span className={`text-[11px] font-semibold sm:text-xs ${subTextColor}`}>
          Catherine Descartes
        </span>
        <span className="font-script text-sm leading-none text-orange-400 sm:text-base">
          {SITE.city}
        </span>
      </span>
    </Link>
  );
}
