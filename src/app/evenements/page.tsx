import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Événements",
};

export default function EvenementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Agenda"
        title="Nos événements"
        description="Des moments de partage tout au long de l'année scolaire."
      />
      <div id="a-venir" className="scroll-mt-24">
        <FeaturedEvent />
      </div>
      <ComingSoon label="Tous les événements" />
    </>
  );
}
