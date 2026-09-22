import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import {
  FacebookIcon,
  HeartDoodle,
  InstagramIcon,
  Squiggle,
  WaveDivider,
} from "@/components/ui/Decorations";
import { NAV_LINKS, SITE } from "@/lib/site-config";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative bg-navy-900 text-cream-50">
      <WaveDivider
        color="var(--color-navy-900)"
        className="absolute -top-[1px] left-0 h-10 w-full -translate-y-full sm:h-14"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <HeartDoodle className="absolute right-6 top-10 hidden h-7 w-7 text-orange-400/70 sm:block" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="light" />
            <p className="font-script mt-4 text-2xl text-orange-400">
              Ensemble
              <br />
              pour leurs sourires !
            </p>
            <Squiggle className="mt-1 h-3 w-28 text-orange-400" />
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Navigation
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-50/80 transition-colors hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Nous contacter
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-cream-50/80 transition-colors hover:text-orange-400"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                <span className="text-sm text-cream-50/80">
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Liens utiles
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-sm text-cream-50/80 transition-colors hover:text-orange-400"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="text-sm text-cream-50/80 transition-colors hover:text-orange-400"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de l'APEA Catherine Descartes"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-50/30 text-cream-50 transition-colors hover:border-orange-400 hover:text-orange-400"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de l'APEA Catherine Descartes"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-50/30 text-cream-50 transition-colors hover:border-orange-400 hover:text-orange-400"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-cream-50/10 pt-6 text-right text-xs text-cream-50/50">
          © {currentYear} {SITE.name} – {SITE.city}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
