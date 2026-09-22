import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Qui sommes-nous ?",
};

export default function QuiSommesNousPage() {
  return (
    <>
      <PageHero
        eyebrow="L'association"
        title="Qui sommes-nous ?"
        description="Découvrez l'équipe de bénévoles et l'histoire de l'APEA Catherine Descartes."
      />
      <ComingSoon label="Qui sommes-nous ?" />
    </>
  );
}
