import type { ReactNode } from "react";
import { Burst } from "@/components/ui/Decorations";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-cream-100 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Burst className="absolute left-6 top-6 h-8 w-8 text-orange-400/70 sm:left-12" />
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold text-navy-900 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-navy-900/70">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
