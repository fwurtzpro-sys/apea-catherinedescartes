import type { Metadata } from "next";
import { ArrowRight, CalendarCheck, HandHeart, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EventCard } from "@/components/ui/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { JoinCta } from "@/components/ui/JoinCta";
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
        <p className="mx-auto max-w-2xl text-center leading-relaxed text-navy-900/70">
          Chaque événement de l&rsquo;APEA est préparé collectivement par les
          parents bénévoles et sert à financer les projets pédagogiques des
          élèves. Retrouvez ci-dessous l&rsquo;événement à venir et les
          moyens d&rsquo;y participer.
        </p>
      </Container>

      <Container className="pb-16 sm:pb-20">
        <h2 className="sr-only">Événement à venir</h2>
        {UPCOMING_EVENTS.length > 0 ? (
          <div className="flex flex-col gap-8">
            {UPCOMING_EVENTS.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={CalendarCheck}
            title="Aucun événement programmé pour le moment"
            description="Restez connectés, le calendrier de l'année sera bientôt annoncé."
          />
        )}
      </Container>

      {/* Fonctionnement des réunions */}
      <Container className="pb-16 sm:pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-3xl bg-cream-100 p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <Users className="h-5 w-5" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-navy-900">
              Réunions de préparation
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-900/70">
              Chaque événement est préparé lors de réunions ouvertes à tous
              les parents adhérents, où chacun peut proposer des idées et se
              positionner sur les tâches à réaliser.
            </p>
          </div>
          <div className="rounded-3xl bg-cream-100 p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <HandHeart className="h-5 w-5" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-navy-900">
              Participation et bénévolat
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-900/70">
              Pas besoin d&rsquo;être disponible toute la journée&nbsp;: un
              coup de main sur un créneau, avant ou pendant l&rsquo;événement,
              est toujours précieux pour l&rsquo;association.
            </p>
          </div>
        </div>
      </Container>

      {/* Inscriptions */}
      <Container className="pb-16 sm:pb-20">
        <div className="flex flex-col items-center gap-4 rounded-[2.5rem] border-2 border-dashed border-orange-200 bg-white p-8 text-center sm:p-12">
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
        </div>
      </Container>

      <JoinCta
        title="Envie de proposer un coup de main ?"
        description="Contactez-nous : nous vous mettrons en lien avec les bénévoles qui préparent le prochain événement."
      />
    </>
  );
}
