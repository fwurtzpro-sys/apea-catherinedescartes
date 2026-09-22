import { StarDoodle } from "@/components/ui/Decorations";
import { WaveDivider } from "@/components/ui/Decorations";

export function Partners() {
  return (
    <section className="relative mt-20 sm:mt-28">
      <WaveDivider
        color="var(--color-cream-200)"
        className="absolute -top-px h-10 w-full -translate-y-full sm:h-14"
      />

      <div className="relative bg-cream-200 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="relative mx-auto max-w-2xl text-center">
          <StarDoodle className="absolute -left-6 top-2 h-9 w-9 text-orange-400 sm:-left-16 sm:h-11 sm:w-11" />
          <StarDoodle className="absolute -right-6 top-2 h-9 w-9 text-orange-400 sm:-right-16 sm:h-11 sm:w-11" />

          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Nos partenaires
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-navy-900 sm:text-3xl">
            Merci à tous ceux qui nous soutiennent&nbsp;!
          </h2>
          <p className="mt-3 leading-relaxed text-navy-900/70">
            L&rsquo;APEA remercie chaleureusement l&rsquo;ensemble de ses
            partenaires, commerçants, entreprises et acteurs locaux pour leur
            soutien et leur engagement à nos côtés.
          </p>
        </div>
      </div>
    </section>
  );
}
