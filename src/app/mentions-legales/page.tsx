import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: true },
};

const SECTIONS: { title: string; body: ReactNode }[] = [
  {
    title: "Éditeur du site",
    body: (
      <>
        {SITE.name} — Association déclarée, loi du 1<sup>er</sup> juillet
        1901.
        <br />
        <br />
        Siège social :<br />
        7 Rue Robert de La Noé
        <br />
        56250 Elven
        <br />
        France
        <br />
        <br />
        SIREN : 777 810 540
        <br />
        SIRET (siège) : 777 810 540 00024
        <br />
        RNA : W563003742
        <br />
        <br />
        Téléphone : 02 97 53 33 19
        <br />
        <br />
        Directrice de la publication : Marine DO AMARAL COTHINHO, Présidente
        de l&rsquo;APEA Catherine Descartes.
      </>
    ),
  },
  {
    title: "Hébergement",
    body: (
      <>
        HOSTINGER INTERNATIONAL LIMITED
        <br />
        61 Lordou Vironos str.
        <br />
        6023 Larnaca
        <br />
        Chypre
        <br />
        <br />
        E-mail :{" "}
        <a
          href="mailto:compliance@hostinger.com"
          className="underline hover:text-orange-600"
        >
          compliance@hostinger.com
        </a>
        <br />
        Site :{" "}
        <a
          href="https://www.hostinger.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-orange-600"
        >
          https://www.hostinger.com/
        </a>
      </>
    ),
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
    body: `Pour toute question relative à ce site : ${SITE.email}.`,
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero eyebrow="Informations légales" title="Mentions légales" />
      <Container className="py-16 sm:py-20">
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
