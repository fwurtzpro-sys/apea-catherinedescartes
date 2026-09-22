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
      { label: "Événement à venir", href: "/evenements#a-venir" },
      { label: "Tous les événements", href: "/evenements" },
    ],
  },
  { label: "Nos actions", href: "/nos-actions" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export const SITE = {
  name: "APEA Catherine Descartes",
  shortName: "APEA",
  city: "Elven",
  tagline: "Association de parents d'élèves",
  email: "apea.catherinedescartes@gmail.com",
  address: {
    line1: "École Catherine Descartes",
    line2: "56250 Elven",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
  joinHref: "/contact",
};
