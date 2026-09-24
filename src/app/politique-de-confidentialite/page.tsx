import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: true },
};

const SECTIONS: { title: string; body: ReactNode }[] = [
  {
    title: "Responsable du traitement",
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
        E-mail : {SITE.email}
        <br />
        <br />
        Pour plus d&rsquo;informations sur l&rsquo;association et
        l&rsquo;éditeur du site, consultez les{" "}
        <Link
          href="/mentions-legales"
          className="underline hover:text-orange-600"
        >
          mentions légales
        </Link>
        .
      </>
    ),
  },
  {
    title: "Données personnelles collectées",
    body: "Ce site ne dispose actuellement d'aucun formulaire de contact ou d'inscription permettant de collecter automatiquement des données personnelles. Certains boutons du site sont des liens de type « mailto », qui ouvrent simplement votre logiciel ou service de messagerie habituel. Si vous choisissez ensuite d'envoyer un e-mail à l'APEA, vous lui transmettez volontairement votre adresse e-mail ainsi que les informations que vous décidez d'inclure dans votre message. Cet envoi n'est traité par aucun formulaire ni aucune base de données du site.",
  },
  {
    title: "Utilisation des données",
    body: "Les informations que vous transmettez volontairement par e-mail sont utilisées uniquement pour vous répondre, échanger avec vous et, lorsque cela correspond à votre demande, organiser votre participation à une activité ou à un événement de l'association. Elles ne sont ni vendues ni transmises à des tiers.",
  },
  {
    title: "Conservation des données",
    body: "Les données transmises volontairement par e-mail sont conservées uniquement pendant la durée nécessaire au traitement de votre demande et, le cas échéant, au suivi de l'activité concernée.",
  },
  {
    title: "Vos droits",
    body: (
      <>
        Conformément au RGPD, vous disposez d&rsquo;un droit d&rsquo;accès,
        de rectification, d&rsquo;effacement, de limitation et
        d&rsquo;opposition concernant les données vous concernant, ainsi que
        d&rsquo;un droit à la portabilité lorsque celui-ci est applicable.
        Lorsque le traitement repose sur votre consentement, vous pouvez
        également le retirer à tout moment.
        <br />
        <br />
        Pour exercer ces droits, contactez l&rsquo;APEA à l&rsquo;adresse{" "}
        {SITE.email}.
        <br />
        <br />
        Vous disposez également du droit d&rsquo;introduire une réclamation
        auprès de la{" "}
        <a
          href="https://www.cnil.fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-orange-600"
        >
          CNIL
        </a>
        .
      </>
    ),
  },
  {
    title: "Cookies",
    body: "Dans sa configuration actuelle, ce site ne dépose aucun cookie sur votre appareil et n'utilise aucun cookie publicitaire ou de mesure d'audience. Aucun outil d'analyse de fréquentation ni de suivi publicitaire n'est utilisé à ce jour.",
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
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          {SECTIONS.map((section, index) => (
            <Reveal key={section.title} delay={index * 50}>
              <section>
                <h2 className="text-lg font-bold text-navy-900">
                  {section.title}
                </h2>
                <p className="mt-2 leading-relaxed text-navy-900/70">
                  {section.body}
                </p>
              </section>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
