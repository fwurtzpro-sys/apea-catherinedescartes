import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ProvisionalNotice } from "@/components/ui/ProvisionalNotice";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: true },
};

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Données collectées",
    body: "Ce site ne collecte pas de données personnelles en dehors de celles que vous transmettriez volontairement à l'association (par exemple pour rejoindre l'APEA ou vous inscrire à un événement), une fois les moyens de contact officiels publiés sur ce site.",
  },
  {
    title: "Utilisation des données",
    body: "Les informations transmises serviraient uniquement à répondre à votre demande ou à organiser votre participation aux événements de l'association. Elles ne seraient ni vendues ni transmises à des tiers.",
  },
  {
    title: "Conservation des données",
    body: "Durée de conservation des données transmises : à compléter.",
  },
  {
    title: "Vos droits",
    body: SITE.emailConfirmed
      ? `Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour l'exercer, contactez l'association à l'adresse ${SITE.email}.`
      : "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Le contact à utiliser pour l'exercer sera précisé ici dès sa publication (voir la page Contact).",
  },
  {
    title: "Cookies",
    body: "Ce site n'utilise pas de cookies de suivi publicitaire. Détail des cookies techniques éventuels : à compléter.",
  },
];

export default function PolitiqueDeConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="Vos données"
        title="Politique de confidentialité"
      />
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
