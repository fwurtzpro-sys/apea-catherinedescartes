import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IdeaBoxIllustration } from "@/components/boite-a-idees/IdeaBoxIllustration";
import { IdeaBoxForm } from "@/components/boite-a-idees/IdeaBoxForm";
import { OG_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/seo";

const TITLE = "La boîte à idées";
const DESCRIPTION =
  "Partagez une idée, une suggestion ou une envie pour faire vivre l'école et les projets de l'APEA Catherine Descartes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    ...OG_DEFAULTS,
    url: "/boite-a-idees",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function BoiteAIdeesPage() {
  return (
    <>
      <PageHero
        eyebrow="Participer"
        title="La boîte à idées"
        description="Une idée, une suggestion ou une envie pour faire vivre l’école et les projets de l’APEA ? Partagez-la avec nous."
      />

      <Container className="py-16 sm:py-20">
        <Reveal strong className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-a11y">
            Vos idées comptent
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Et si votre idée devenait le prochain projet&nbsp;?
          </h2>
          <p className="mt-4 leading-relaxed text-navy-900/70">
            Événement, activité, projet pour les enfants ou simple
            suggestion&nbsp;: toutes les idées peuvent être partagées avec
            l&rsquo;APEA.
          </p>
          <p className="mt-2 text-sm text-navy-900/70">
            Vous pouvez tout à fait rester anonyme.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Reveal direction="right" delay={80} className="lg:order-2 lg:col-span-1">
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-dashed border-orange-200 bg-cream-100 p-8 text-center sm:p-10 lg:sticky lg:top-24">
              <IdeaBoxIllustration className="mb-2" />
              <h3 className="mt-4 text-xl font-extrabold text-navy-900">
                Chaque idée compte
              </h3>
              <p className="mt-3 text-navy-900/70">
                Petite ou grande, précise ou encore floue&nbsp;: votre idée
                nous intéresse. Elle est lue avec attention par l&rsquo;APEA.
              </p>
              <p className="mt-4 text-sm text-navy-900/70">
                Nous ne pouvons pas promettre que chaque idée sera réalisée,
                mais aucune n&rsquo;est ignorée.
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" className="lg:order-1 lg:col-span-2">
            <IdeaBoxForm />
          </Reveal>
        </div>
      </Container>
    </>
  );
}
