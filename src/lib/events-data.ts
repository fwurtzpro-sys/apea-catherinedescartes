export type ApeaEvent = {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  ctaLabel: string;
  /** Visuel réel de l'événement, s'il a été fourni par l'association. */
  photoSrc?: string;
};

/**
 * Seule source de vérité pour les événements de l'association. N'ajouter
 * un événement ici qu'une fois son contenu confirmé par l'APEA — ne
 * jamais inventer une date, un lieu ou un horaire.
 */
export const UPCOMING_EVENTS: ApeaEvent[] = [
  {
    slug: "troc-et-puces",
    title: "Troc et Puces",
    date: "Dimanche 15 novembre 2026",
    time: "De 8h30 à 17h30",
    location: "Complexe sportif Roger Michel – Elven",
    ctaLabel: "J'aide sur cet événement",
    photoSrc: "/apea-troc-et-puces-2026.png",
  },
];
