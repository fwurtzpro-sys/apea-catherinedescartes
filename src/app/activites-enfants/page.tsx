import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ActivitiesExplorer } from "@/components/activites-enfants/ActivitiesExplorer";
import { ActivitiesDoodle } from "@/components/activites-enfants/ActivitiesDoodle";
import { OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";

const TITLE = "Activités enfants à imprimer";
const DESCRIPTION =
  "Retrouvez des coloriages et dessins gratuits à imprimer pour les enfants de la TPS au CM2, proposés par l'APEA Catherine Descartes à Elven.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    ...OG_DEFAULTS,
    url: "/activites-enfants",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ActivitesEnfantsPage() {
  return (
    <>
      <PageHero
        eyebrow="Pour les enfants"
        title="Des activités pour apprendre et s’amuser"
        description="Coloriages et dessins à imprimer gratuitement pour les enfants de la TPS au CM2."
      />

      <Container className="py-16 sm:py-20">
        <Reveal strong className="relative mx-auto max-w-2xl text-center">
          <ActivitiesDoodle className="mx-auto mb-2 h-8 w-24 sm:absolute sm:-top-6 sm:left-1/2 sm:mb-0 sm:-translate-x-1/2" />
          <p className="text-sm font-bold uppercase tracking-widest text-orange-a11y">
            À la maison
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Une petite activité pour aujourd’hui&nbsp;?
          </h2>
          <p className="mt-4 leading-relaxed text-navy-900/70">
            Choisissez le niveau de votre enfant et découvrez des activités
            simples à télécharger et à imprimer à la maison.
          </p>
          <p className="mt-2 text-sm text-navy-900/70">
            De nouvelles activités pourront être ajoutées au fil de
            l&rsquo;année.
          </p>
        </Reveal>

        {/*
          Deliberately not wrapped in <Reveal>: this is the page's critical
          content (level filters + all activity cards). It must always be
          visible immediately, with no dependency on IntersectionObserver,
          hydration timing, or any entrance animation.
        */}
        <div className="mt-12">
          <ActivitiesExplorer />
        </div>

        <Reveal className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-[2.5rem] bg-navy-900 p-8 text-center text-white sm:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-400">
            Pour les parents
          </p>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            Une idée de dessin ou d&rsquo;activité&nbsp;?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Vous connaissez un jeu, une activité ou un support qui pourrait
            plaire aux enfants&nbsp;? Partagez votre idée avec l&rsquo;APEA.
          </p>
          <Button
            href="/boite-a-idees"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
            className="mx-auto mt-6"
          >
            Proposer une idée
          </Button>
        </Reveal>
      </Container>
    </>
  );
}
