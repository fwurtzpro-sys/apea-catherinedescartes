import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Actions } from "@/components/home/Actions";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Nos actions",
};

export default function NosActionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Notre engagement"
        title="Nos actions"
        description="Tout au long de l'année, pour le bien-être et les projets de nos enfants."
      />
      <Actions />
      <ComingSoon label="Détail de nos actions" />
    </>
  );
}
