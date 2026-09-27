import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ColoringSheetIllustration } from "@/components/home/ColoringSheetIllustration";

/**
 * Homepage discovery block for /activites-enfants. The graphic side is a
 * light, self-drawn composition (an angled "activity sheet" + a few
 * Lucide icons) rather than a stock photo — there is no real photo of
 * these activities to show yet, and this stays consistent with the
 * site's existing hand-drawn accent style (Decorations.tsx).
 */
export function ChildrenActivitiesShowcase() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal
          direction="left"
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-cream-100"
        >
          <ColoringSheetIllustration />
        </Reveal>

        <Reveal direction="right" delay={120}>
          <p className="text-sm font-bold uppercase tracking-widest text-orange-a11y">
            À la maison
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Des activités pour apprendre et s&rsquo;amuser
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-navy-900/70">
            Coloriages, jeux et petites activités à imprimer gratuitement
            pour les enfants de la TPS au CM2.
          </p>
          <Button
            href="/activites-enfants"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
            className="mt-6 w-fit"
          >
            Découvrir les activités
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
