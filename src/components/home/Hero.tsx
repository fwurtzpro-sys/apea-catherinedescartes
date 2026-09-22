import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Burst, HeartDoodle } from "@/components/ui/Decorations";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-8 pt-10 sm:pb-10 sm:pt-14 lg:pt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* Text column */}
        <div className="relative">
          <Burst className="absolute -left-10 top-24 hidden h-8 w-8 text-orange-400 lg:block" />

          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Association de parents d&rsquo;élèves
          </p>

          <h1 className="mt-3">
            <span className="block font-sans text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-navy-900 sm:text-6xl">
              Convivialité
            </span>
            <span className="font-script -mt-1 flex items-center gap-2 text-4xl font-normal text-navy-900 sm:text-5xl">
              au cœur
              <HeartDoodle className="h-7 w-7 text-orange-400 sm:h-8 sm:w-8" />
            </span>
            <span className="block font-sans text-4xl font-extrabold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl">
              de l&rsquo;école&nbsp;!
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-navy-900/70">
            L&rsquo;APEA Catherine Descartes est une association dynamique,
            régie par la loi 1901, composée de parents bénévoles.
          </p>

          <h2 className="mt-5 text-lg font-bold text-orange-500">
            Notre mission&nbsp;?
          </h2>
          <p className="mt-1 max-w-lg text-base leading-relaxed text-navy-900/70">
            Soutenir financièrement les sorties et projets pédagogiques
            organisés par l&rsquo;école.
          </p>

          <div className="relative mt-8 flex flex-wrap items-center gap-4">
            <Burst className="absolute -left-6 -top-8 h-7 w-7 text-orange-400 sm:-left-8" />
            <Button href="/qui-sommes-nous" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Découvrir l&rsquo;APEA
            </Button>
            <Button href="/qui-sommes-nous" variant="outline" size="lg">
              Qui sommes-nous&nbsp;?
            </Button>
          </div>
        </div>

        {/* Photo column */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Burst className="absolute -top-4 left-8 h-8 w-8 text-orange-400 sm:left-16" />
          <Burst className="absolute right-4 top-16 h-6 w-6 text-orange-400" />

          <div className="relative aspect-[4/3.6] w-full overflow-hidden [border-radius:58%_42%_38%_62%/62%_40%_60%_38%] sm:[border-radius:60%_40%_35%_65%/65%_35%_65%_35%]">
            <Image
              src="/apea-enfants-ecole.png"
              alt="Élèves de l'école Catherine Descartes"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute -top-2 right-2 max-w-[190px] rounded-3xl rounded-bl-md bg-navy-900 px-5 py-3.5 text-white shadow-lg shadow-navy-900/30 sm:right-4 sm:top-2">
            <p className="font-script text-lg leading-tight sm:text-xl">
              Des parents engagés pour leurs enfants&nbsp;!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
