import type { Metadata } from "next";
import { Heart, Mail, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HeartDoodle } from "@/components/ui/Decorations";
import { VolunteerForm } from "@/components/evenements/VolunteerForm";

export const metadata: Metadata = {
  title: "Inscriptions",
  description:
    "Proposez votre aide bénévole pour les événements organisés par l'APEA Catherine Descartes à Elven.",
};

export default function InscriptionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Événements"
        title="Inscriptions bénévoles"
        description="Vous souhaitez donner un coup de main lors d’un événement de l’APEA ? Proposez votre aide en quelques minutes grâce au formulaire ci-dessous."
      />

      <Container className="py-16 sm:py-20">
        <Reveal strong className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Participer
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Inscrivez-vous comme bénévole
          </h2>
          <p className="mt-4 leading-relaxed text-navy-900/70">
            Un peu de temps, un coup de main ou simplement l&rsquo;envie de
            participer&nbsp;? Chaque aide compte pour faire vivre les
            événements de l&rsquo;APEA.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Reveal direction="right" delay={80} className="lg:order-2 lg:col-span-1">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-navy-900 p-8 text-white sm:p-10 lg:sticky lg:top-24">
              <HeartDoodle className="absolute right-6 top-6 h-7 w-7 text-orange-400/70" />
              <h3 className="text-xl font-extrabold">
                Chaque coup de main compte
              </h3>
              <p className="mt-3 text-white/70">
                L&rsquo;APEA fonctionne uniquement grâce à l&rsquo;énergie de
                parents bénévoles. Que vous ayez une heure ou toute une
                journée à donner, votre aide fait la différence.
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-white/80">
                <li className="flex items-start gap-2.5">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                  Vos disponibilités nous aident à organiser au mieux
                  l&rsquo;événement.
                </li>
                <li className="flex items-start gap-2.5">
                  <Heart className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                  Aucune obligation&nbsp;: proposez ce qui vous convient,
                  quand cela vous convient.
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                  Nous revenons vers vous directement par e-mail.
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal direction="left" className="lg:order-1 lg:col-span-2">
            <VolunteerForm />
          </Reveal>
        </div>
      </Container>
    </>
  );
}
