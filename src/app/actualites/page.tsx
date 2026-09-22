import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Actualités",
};

export default function ActualitesPage() {
  return (
    <>
      <PageHero
        eyebrow="La vie de l'association"
        title="Actualités"
        description="Toutes les nouvelles de l'APEA Catherine Descartes."
      />
      <ComingSoon label="Actualités" />
    </>
  );
}
