import { ArrowRight, School } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeartDoodle } from "@/components/ui/Decorations";
import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";

export function About() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-[2.5rem]">
          <PlaceholderPhoto
            icon={School}
            label="Photo — école Catherine Descartes"
            className="aspect-[4/3] w-full"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-950/70 via-navy-950/20 to-transparent" />
          <p className="font-script pointer-events-none absolute bottom-6 left-6 text-2xl leading-tight text-white drop-shadow sm:text-3xl">
            Une école,
            <br />
            une belle aventure
            <br />
            ensemble&nbsp;!
          </p>
        </div>

        <div className="relative">
          <HeartDoodle className="absolute -top-2 right-0 h-7 w-7 text-orange-400" />
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            À propos
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-900 sm:text-4xl">
            L&rsquo;APEA Catherine Descartes
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-navy-900/70">
            L&rsquo;APEA est l&rsquo;association des parents d&rsquo;élèves et
            amis de l&rsquo;école élémentaire publique Catherine Descartes à
            Elven. Nous sommes un groupe de parents bénévoles, motivés par
            l&rsquo;envie de soutenir les projets pédagogiques, de partager
            des moments conviviaux tout au long de l&rsquo;année.
          </p>
          <Button
            href="/qui-sommes-nous"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
            className="mt-6 w-fit"
          >
            En savoir plus sur l&rsquo;association
          </Button>
        </div>
      </div>
    </section>
  );
}
