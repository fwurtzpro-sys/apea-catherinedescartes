import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Users2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { JoinCta } from "@/components/ui/JoinCta";
import { HeartDoodle } from "@/components/ui/Decorations";

export const metadata: Metadata = {
  title: "Qui sommes-nous ?",
  description:
    "Présentation de l'APEA Catherine Descartes, l'association de parents d'élèves et amis de l'école élémentaire publique Catherine Descartes à Elven.",
};

export default function QuiSommesNousPage() {
  return (
    <>
      <PageHero
        eyebrow="L'association"
        title="Qui sommes-nous ?"
        description="Une association de parents bénévoles, au service des élèves de l'école Catherine Descartes."
      />

      {/* Présentation */}
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <HeartDoodle className="absolute -top-2 right-0 h-7 w-7 text-orange-400" />
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
              Présentation
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-900 sm:text-4xl">
              L&rsquo;APEA en quelques mots
            </h2>
            <p className="mt-4 leading-relaxed text-navy-900/70">
              L&rsquo;APEA Catherine Descartes est l&rsquo;association des
              parents d&rsquo;élèves et amis de l&rsquo;école élémentaire
              publique Catherine Descartes, à Elven. C&rsquo;est une
              association dynamique, régie par la loi 1901, composée de
              parents bénévoles.
            </p>
          </div>
          <div className="relative order-1 aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] lg:order-2">
            <Image
              src="/apea-ecole-catherine-descartes.png"
              alt="École Catherine Descartes — Groupe Scolaire Catherine Descartes"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>

      {/* Mission */}
      <Container className="pb-16 sm:pb-20">
        <div className="rounded-[2.5rem] bg-cream-100 p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <Heart className="h-6 w-6" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
            </span>
            <p className="mt-4 text-sm font-bold uppercase tracking-widest text-orange-500">
              Notre mission
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy-900 sm:text-3xl">
              Soutenir les projets pédagogiques de l&rsquo;école
            </h2>
            <p className="mt-4 leading-relaxed text-navy-900/70">
              Soutenir financièrement les sorties et projets pédagogiques
              organisés par l&rsquo;école.
            </p>
          </div>
        </div>
      </Container>

      {/* Équipe — aucune donnée inventée, structure prête pour les vraies fiches */}
      <Container className="pb-16 sm:pb-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-[2.5rem] border-2 border-dashed border-orange-200 bg-cream-100/60 px-6 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
            <Users2 className="h-6 w-6" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
          </span>
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            L&rsquo;équipe
          </p>
          <p className="text-lg font-bold text-navy-900">
            La présentation des membres du bureau arrivera prochainement
          </p>
          <p className="max-w-md text-navy-900/70">
            Photo, prénom et fonction de chaque membre seront ajoutés ici
            dès que l&rsquo;association nous les aura transmis.
          </p>
        </div>
      </Container>

      <JoinCta />
    </>
  );
}
