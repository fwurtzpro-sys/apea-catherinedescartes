import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Toutes les actualités de l'APEA Catherine Descartes, l'association de parents d'élèves de l'école d'Elven.",
};

export default function ActualitesPage() {
  return (
    <>
      <PageHero
        eyebrow="La vie de l'association"
        title="Actualités"
        description="Toutes les nouvelles de l'APEA Catherine Descartes."
      />

      <Container className="py-16 sm:py-20">
        <EmptyState
          icon={Newspaper}
          title="Aucune actualité pour le moment"
          description="Restez connectés, de belles choses arrivent !"
        />
      </Container>
    </>
  );
}
