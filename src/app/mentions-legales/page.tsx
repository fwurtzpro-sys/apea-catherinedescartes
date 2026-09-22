import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero eyebrow="Informations légales" title="Mentions légales" />
      <ComingSoon label="Mentions légales" />
    </>
  );
}
