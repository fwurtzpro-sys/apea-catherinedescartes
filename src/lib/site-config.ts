export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Qui sommes-nous ?", href: "/qui-sommes-nous" },
  {
    label: "Événements",
    href: "/evenements",
    children: [
      { label: "Tous les événements", href: "/evenements" },
      { label: "Inscriptions", href: "/evenements/inscriptions" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/**
 * Coordonnées de l'association. Certaines valeurs ci-dessous ne
 * proviennent que de la maquette fournie et n'ont pas été confirmées
 * officiellement par l'APEA — leurs indicateurs `*Confirmed` valent donc
 * `false` et les composants ne doivent PAS les afficher publiquement tant
 * qu'ils restent à `false`. Ce fichier est le seul endroit à modifier :
 * une fois une donnée validée par l'association, il suffit de renseigner
 * la valeur définitive et de passer son indicateur à `true` pour qu'elle
 * apparaisse automatiquement partout où elle est utilisée.
 */
export const SITE = {
  name: "APEA Catherine Descartes",
  shortName: "APEA",
  city: "Elven",
  tagline: "Association de parents d'élèves",

  // Adresse e-mail générale officiellement confirmée par l'APEA.
  email: "apeaelven@gmail.com",
  emailConfirmed: true,

  // Reprise de la maquette — non confirmée, ne pas afficher tant que false.
  address: {
    line1: "École Catherine Descartes",
    line2: "56250 Elven",
  },
  addressConfirmed: false,

  // Aucune URL réelle fournie à ce jour — ne pas afficher tant que false.
  social: {
    facebook: "",
    instagram: "",
  },
  socialConfirmed: false,

  joinHref: "/contact",
};
