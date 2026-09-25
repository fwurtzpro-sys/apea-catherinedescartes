import type { Metadata } from "next";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EventCard } from "@/components/ui/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { JoinCta } from "@/components/ui/JoinCta";
import { Reveal } from "@/components/ui/Reveal";
import { UPCOMING_EVENTS } from "@/lib/events-data";

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Découvrez les événements organisés par l'APEA Catherine Descartes à Elven et venez y participer ou proposer votre aide.",
};

export default function EvenementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Agenda"
        title="Nos événements"
        description="Des moments de partage tout au long de l'année scolaire, organisés par et pour les familles de l'école."
      />

      <Container className="py-16 sm:py-20">
        <h2 className="sr-only">Événement à venir</h2>
        {UPCOMING_EVENTS.length > 0 ? (
          <div className="flex flex-col gap-8">
            {UPCOMING_EVENTS.map((event, index) =>
              event.slug === "troc-et-puces" ? (
                <Reveal key={event.slug} delay={index * 110} strong>
                  <EventCard
                    event={event}
                    ctaLabel="En savoir plus"
                    ctaHref="/evenements/troc-et-puces"
                  />
                </Reveal>
              ) : (
                <Reveal key={event.slug} delay={index * 110} strong>
                  <EventCard event={event} />
                </Reveal>
              )
            )}
          </div>
        ) : (
          <EmptyState
            icon={CalendarCheck}
            title="Aucun événement programmé pour le moment"
            description="Restez connectés, le calendrier de l'année sera bientôt annoncé."
          />
        )}
      </Container>

      {/* Inscriptions */}
      <Container className="pb-16 sm:pb-20">
        <Reveal
          strong
          className="flex flex-col items-center gap-4 rounded-[2.5rem] border-2 border-dashed border-orange-200 bg-white p-8 text-center sm:p-12"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Inscriptions
          </p>
          <h2 className="max-w-lg text-2xl font-extrabold text-navy-900 sm:text-3xl">
            Envie d&rsquo;aider sur un événement&nbsp;?
          </h2>
          <p className="max-w-lg text-navy-900/70">
            Les inscriptions aux événements se font depuis la page dédiée.
          </p>
          <Button
            href="/evenements/inscriptions"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Accéder aux inscriptions
          </Button>
        </Reveal>
      </Container>

      <JoinCta
        title="Envie de proposer un coup de main ?"
        description="Contactez-nous : nous vous mettrons en lien avec les bénévoles qui préparent le prochain événement."
      />
    </>
  );
}
