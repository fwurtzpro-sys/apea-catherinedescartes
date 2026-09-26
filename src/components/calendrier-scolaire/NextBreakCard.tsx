"use client";

import type { ReactNode } from "react";
import { PartyPopper, Sun } from "lucide-react";
import { SCHOOL_PERIODS, type SchoolPeriodId } from "@/lib/school-calendar-data";
import {
  formatDateLong,
  getNextBreakInfo,
} from "@/lib/school-calendar-logic";
import { useTodayISO } from "@/lib/use-today-iso";
import { SeasonalIllustration } from "@/components/calendrier-scolaire/SeasonalIllustration";

/**
 * The page's centerpiece: detects, purely from today's date, which break
 * is next (or in progress) and shows a live countdown. `today` is `null`
 * until the client-only effect in `useTodayISO` resolves — the server
 * and the client's first paint both render this same neutral shell, so
 * there is nothing for React to complain about at hydration time.
 */
export function NextBreakCard() {
  const today = useTodayISO();

  return (
    <div className="rounded-[2.5rem] bg-navy-900 p-8 text-white shadow-lg shadow-navy-900/20 sm:p-12">
      <p className="text-sm font-bold uppercase tracking-widest text-orange-400">
        Prochaine pause
      </p>

      {today === null ? (
        <div className="mt-4 min-h-[180px]">
          <p className="text-white/50">Chargement du calendrier…</p>
        </div>
      ) : (
        <NextBreakContent today={today} />
      )}
    </div>
  );
}

function IllustratedRow({
  periodId,
  children,
}: {
  periodId: SchoolPeriodId;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:gap-10">
      <div className="min-w-0 sm:flex-1">{children}</div>
      <SeasonalIllustration
        periodId={periodId}
        className="mx-auto h-36 w-36 shrink-0 sm:mx-0 sm:h-48 sm:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64"
      />
    </div>
  );
}

function NextBreakContent({ today }: { today: string }) {
  const info = getNextBreakInfo(SCHOOL_PERIODS, today);

  if (info.status === "year-over") {
    return (
      <div className="mt-4 flex items-center gap-3 text-white/70">
        <PartyPopper className="h-6 w-6 shrink-0 text-orange-400" />
        <p>
          Le calendrier {`2026-2027`} est arrivé à son terme. Il sera mis à
          jour pour l&rsquo;année scolaire suivante.
        </p>
      </div>
    );
  }

  if (info.status === "summer-ongoing") {
    return (
      <IllustratedRow periodId={info.period.id}>
        <div className="animate-[idea-fields-in_500ms_ease-out]">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Les vacances d&rsquo;été ont commencé
          </h2>
          <p className="mt-3 flex items-center gap-2 text-white/70">
            <Sun className="h-5 w-5 shrink-0 text-orange-400" />
            Depuis le {formatDateLong(info.period.startDate)}
          </p>
          <p className="mt-4 text-white/60">
            Bonnes vacances à toutes les familles&nbsp;! Le calendrier de la
            rentrée 2027-2028 n&rsquo;est pas encore publié.
          </p>
        </div>
      </IllustratedRow>
    );
  }

  if (info.status === "ongoing") {
    return (
      <IllustratedRow periodId={info.period.id}>
        <div className="animate-[idea-fields-in_500ms_ease-out]">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            {info.period.label}
          </h2>
          <p className="mt-2 text-white/70">
            Les vacances sont en cours, depuis le{" "}
            {formatDateLong(info.period.startDate)}.
          </p>
          {info.resumesOn && (
            <p className="mt-1 text-white/70">
              Reprise des cours le {formatDateLong(info.resumesOn)}.
            </p>
          )}
        </div>
      </IllustratedRow>
    );
  }

  // status === "before"
  return (
    <IllustratedRow periodId={info.period.id}>
      <div className="animate-[idea-fields-in_500ms_ease-out]">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          {info.period.label}
        </h2>
        <p className="mt-2 text-white/70">
          Du {formatDateLong(info.period.startDate)} au{" "}
          {formatDateLong(info.period.endDate ?? info.period.startDate)}
        </p>

        <div className="mt-8 flex flex-col items-start gap-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Plus que
          </p>
          <p className="text-6xl font-extrabold leading-none text-orange-400 sm:text-7xl">
            {info.daysUntil}
          </p>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            {info.daysUntil > 1 ? "jours avant les vacances" : "jour avant les vacances"}
          </p>
        </div>
      </div>
    </IllustratedRow>
  );
}
