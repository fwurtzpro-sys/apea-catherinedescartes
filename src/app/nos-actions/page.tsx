import type { Metadata } from "next";
import {
  Coins,
  GraduationCap,
  PartyPopper,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { JoinCta } from "@/components/ui/JoinCta";

export const metadata: Metadata = {
  title: "Nos actions",
  description:
    "Découvrez les actions de l'APEA Catherine Descartes : soutien aux projets pédagogiques, financement des sorties scolaires et événements conviviaux.",
};

type ActionDetail = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const ACTION_DETAILS: ActionDetail[] = [
  {
    icon: GraduationCap,
    title: "Soutien aux projets pédagogiques",
    description:
      "L'APEA participe au financement de projets pédagogiques proposés par l'équipe enseignante pour enrichir la scolarité des élèves.",
  },
  {
    icon: Coins,
    title: "Aide au financement des sorties scolaires",
    description:
      "Les fonds récoltés par l'association permettent de réduire le coût des sorties et voyages scolaires pour les familles.",
  },
  {
    icon: Users,
    title: "Organisation d'événements",
    description:
      "L'APEA organise des événements tout au long de l'année scolaire, préparés collectivement par les parents bénévoles.",
  },
  {
    icon: ShoppingBag,
    title: "Ventes pour récolter des fonds",
    description:
      "Des ventes de produits sont régulièrement organisées par l'association afin de financer ses actions au bénéfice des élèves.",
  },
  {
    icon: PartyPopper,
    title: "Moments conviviaux",
    description:
      "Au-delà du financement, l'APEA crée des occasions de rencontre et de partage entre les familles de l'école.",
  },
];

const ACTION_TYPES = [
  "Troc et Puces",
  "Ventes de produits",
  "Carnaval",
  "Fête de l'école",
];

export default function NosActionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Notre engagement"
        title="Nos actions"
        description="Tout au long de l'année, pour le bien-être et les projets pédagogiques de nos enfants."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACTION_DETAILS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-3xl bg-cream-100 p-7"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                <Icon className="h-6 w-6" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
              </span>
              <span className="text-lg font-bold text-navy-900">{title}</span>
              <span className="text-sm leading-relaxed text-navy-900/70">
                {description}
              </span>
            </div>
          ))}
        </div>
      </Container>

      {/* Types d'actions menées */}
      <Container className="pb-16 sm:pb-20">
        <div className="rounded-[2.5rem] bg-navy-900 p-8 text-center sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-orange-400">
            <Sparkles className="h-6 w-6" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
          </span>
          <p className="mt-4 text-sm font-bold uppercase tracking-widest text-orange-400">
            Types d&rsquo;actions organisées
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
            Des rendez-vous variés tout au long de l&rsquo;année
          </h2>
          <ul className="mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-3">
            {ACTION_TYPES.map((type) => (
              <li
                key={type}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white"
              >
                {type}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-lg text-sm text-white/60">
            Le calendrier détaillé de chaque édition est publié sur la page
            Événements dès qu&rsquo;il est confirmé.
          </p>
        </div>
      </Container>

      <JoinCta />
    </>
  );
}
