import { Coins, GraduationCap, PartyPopper, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Burst } from "@/components/ui/Decorations";
import { Reveal } from "@/components/ui/Reveal";

type Action = {
  icon: LucideIcon;
  label: string;
};

const ACTIONS: Action[] = [
  { icon: GraduationCap, label: "Soutien aux projets pédagogiques" },
  { icon: Coins, label: "Aide au financement des sorties scolaires" },
  { icon: Users, label: "Organisation d'événements conviviaux" },
  { icon: PartyPopper, label: "Partage de moments conviviaux" },
];

export function Actions() {
  return (
    <section className="relative mx-auto mt-20 mb-20 max-w-7xl px-4 sm:mt-28 sm:mb-28 sm:px-6 lg:px-8">
      <Burst className="absolute -left-2 top-2 hidden h-8 w-8 text-orange-400 sm:block" />
      <Burst className="absolute -right-2 top-2 hidden h-8 w-8 text-orange-400 sm:block" />

      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
          Nos actions
        </p>
        <h2 className="mx-auto mt-2 max-w-xl text-3xl font-extrabold text-navy-900 sm:text-4xl">
          Tout au long de l&rsquo;année, pour nos enfants
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-navy-900/10">
        {ACTIONS.map(({ icon: Icon, label }, index) => (
          <Reveal
            key={label}
            delay={index * 70}
            className="flex flex-col items-center gap-4 text-center lg:px-6"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <Icon
                className="h-7 w-7"
                strokeWidth={1.5}
                fill="currentColor"
                fillOpacity={0.35}
              />
            </span>
            <p className="max-w-[10rem] text-sm font-semibold text-navy-900">
              {label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
