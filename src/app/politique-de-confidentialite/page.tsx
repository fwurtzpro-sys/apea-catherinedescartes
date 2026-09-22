import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PolitiqueDeConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="Vos données"
        title="Politique de confidentialité"
      />
      <ComingSoon label="Politique de confidentialité" />
    </>
  );
}
