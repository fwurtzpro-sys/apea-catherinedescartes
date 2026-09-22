import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ProvisionalNotice } from "@/components/ui/ProvisionalNotice";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: true },
};

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Éditeur du site",
    body: `${SITE.name} — association loi 1901. Siège social : à compléter. Numéro RNA / SIRET : à compléter. Directeur de la publication : à compléter.`,
  },
  {
    title: "Hébergement",
    body: "Nom, adresse et contact de l'hébergeur du site : à compléter.",
  },
  {
    title: "Propriété intellectuelle",
    body: "L'ensemble des contenus de ce site (textes, logo, visuels) est la propriété de l'APEA Catherine Descartes, sauf mention contraire. Toute reproduction sans autorisation est interdite.",
  },
  {
    title: "Responsabilité",
    body: "L'APEA Catherine Descartes s'efforce d'assurer l'exactitude des informations diffusées sur ce site, sans garantie d'exhaustivité.",
  },
  {
    title: "Contact",
    body: SITE.emailConfirmed
      ? `Pour toute question relative à ce site : ${SITE.email}.`
      : "Pour toute question relative à ce site : à compléter (voir la page Contact).",
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero eyebrow="Informations légales" title="Mentions légales" />
      <Container className="py-16 sm:py-20">
        <ProvisionalNotice />
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-navy-900">
                {section.title}
              </h2>
              <p className="mt-2 leading-relaxed text-navy-900/70">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
