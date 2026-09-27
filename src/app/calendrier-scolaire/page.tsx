import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { NextBreakCard } from "@/components/calendrier-scolaire/NextBreakCard";
import { SchoolTimeline } from "@/components/calendrier-scolaire/SchoolTimeline";
import { MonthlyCalendar } from "@/components/calendrier-scolaire/MonthlyCalendar";
import { SCHOOL_YEAR_LABEL, SCHOOL_ZONE_LABEL } from "@/lib/school-calendar-data";

export const metadata: Metadata = {
  title: "Calendrier scolaire",
  description:
    "Les principales dates de l'année scolaire 2026-2027 (zone B, académie de Rennes) pour organiser le quotidien de votre famille.",
};

export default function CalendrierScolairePage() {
  return (
    <>
      <PageHero
        eyebrow="Vie scolaire"
        title="Calendrier scolaire"
        description={`Retrouvez les principales dates de l'année scolaire ${SCHOOL_YEAR_LABEL} pour organiser plus facilement le quotidien de votre famille.`}
      />

      <Container className="pb-16 pt-8 sm:pb-20">
        <Reveal strong className="mx-auto flex max-w-2xl justify-center">
          <span className="inline-flex items-center rounded-full border-2 border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-600">
            {SCHOOL_ZONE_LABEL}
          </span>
        </Reveal>

        <Reveal strong delay={80} className="mx-auto mt-8 max-w-3xl">
          <NextBreakCard />
        </Reveal>

        <div className="mx-auto mt-16 max-w-5xl">
          <Reveal className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
              Vue d&rsquo;ensemble
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy-900 sm:text-3xl">
              L&rsquo;année en un coup d&rsquo;œil
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <SchoolTimeline />
          </Reveal>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <Reveal className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
              Mois par mois
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy-900 sm:text-3xl">
              Calendrier {SCHOOL_YEAR_LABEL}
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-8">
            <MonthlyCalendar />
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-10 max-w-2xl text-center text-xs text-navy-900/40">
          <p>
            Dates établies à partir du calendrier scolaire officiel de
            l&rsquo;Éducation nationale — Zone B, académie de Rennes.{" "}
            <a
              href="https://www.education.gouv.fr/calendrier-scolaire-toutes-les-dates-des-cours-et-des-vacances-100148"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-navy-900/60 underline hover:text-orange-500"
            >
              Voir la source officielle
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </>
  );
}
