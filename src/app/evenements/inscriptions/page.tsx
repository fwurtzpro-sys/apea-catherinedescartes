import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { UPCOMING_EVENTS } from "@/lib/events-data";

export const metadata: Metadata = {
  title: "Inscriptions",
  description:
    "Les modalités d'inscription aux événements de l'APEA Catherine Descartes seront publiées ici dès leur ouverture.",
};

export default function InscriptionsPage() {
  const event = UPCOMING_EVENTS[0];

  return (
    <>
      <PageHero
        eyebrow="Événements"
        title="Inscriptions"
        description="Les modalités d'inscription à chaque événement apparaîtront ici dès leur ouverture."
      />

      <Container className="py-16 sm:py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-[2.5rem] border-2 border-dashed border-orange-200 bg-cream-100/60 p-8 text-center sm:p-12">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
            <ClipboardList className="h-6 w-6" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
          </span>
          <p className="text-lg font-bold text-navy-900">
            Inscriptions bientôt ouvertes
          </p>
          <p className="text-navy-900/70">
            Cette page est prête à accueillir le formulaire d&rsquo;inscription
            {event ? (
              <>
                {" "}
                à l&rsquo;événement <strong>{event.title}</strong> (
                {event.date})
              </>
            ) : null}
            {" "}
            dès que l&rsquo;association ouvrira les inscriptions.
          </p>
        </div>
      </Container>
    </>
  );
}
