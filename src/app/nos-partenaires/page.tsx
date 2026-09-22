import type { Metadata } from "next";
import { Handshake } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { StarDoodle } from "@/components/ui/Decorations";

export const metadata: Metadata = {
  title: "Nos partenaires",
  description:
    "L'APEA Catherine Descartes remercie les commerçants, entreprises et acteurs locaux qui soutiennent ses actions à Elven.",
};

export default function NosPartenairesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ils nous soutiennent"
        title="Nos partenaires"
        description="Merci à tous ceux qui soutiennent les actions de l'APEA au service des élèves."
      />

      <Container className="py-16 sm:py-20">
        <div className="relative mx-auto max-w-2xl text-center">
          <StarDoodle className="absolute -left-6 top-0 hidden h-9 w-9 text-orange-400 sm:-left-14 sm:block" />
          <StarDoodle className="absolute -right-6 top-0 hidden h-9 w-9 text-orange-400 sm:-right-14 sm:block" />
          <p className="leading-relaxed text-navy-900/70">
            L&rsquo;APEA remercie chaleureusement l&rsquo;ensemble de ses
            partenaires, commerçants, entreprises et acteurs locaux pour leur
            soutien et leur engagement à nos côtés. Cette page présentera
            prochainement les partenaires de l&rsquo;association.
          </p>
        </div>

        <div className="mt-10">
          <EmptyState
            icon={Handshake}
            title="Aucun partenaire officiel publié pour le moment"
            description="Dès que l'association confirmera ses partenariats, ils seront présentés ici avec leur accord."
            action={
              <Button href="/contact" variant="outline" className="mt-2">
                Devenir partenaire
              </Button>
            }
          />
        </div>
      </Container>
    </>
  );
}
