export type SelectOption = {
  value: string;
  label: string;
};

/**
 * Seule source de vérité pour les événements proposés dans le formulaire
 * de bénévolat. Utilisée à la fois par le formulaire (client) et par la
 * Route Handler (serveur) pour valider la valeur reçue — ajouter un
 * événement ici suffit à le faire apparaître et à l'accepter côté API.
 * Ne jamais inventer une date ou un événement non confirmé par l'APEA.
 */
export const VOLUNTEER_EVENT_OPTIONS: SelectOption[] = [
  {
    value: "troc-et-puces-2026-11-15",
    label: "Troc et Puces d'Elven — 15 novembre 2026",
  },
  {
    value: "autre",
    label: "Autre / Je souhaite aider l'APEA de manière générale",
  },
];

/**
 * Volontairement génériques : aucun créneau horaire officiel n'a encore
 * été défini par l'APEA pour les événements à venir.
 */
export const AVAILABILITY_OPTIONS: SelectOption[] = [
  { value: "matin", label: "Matin" },
  { value: "apres-midi", label: "Après-midi" },
  { value: "journee", label: "Toute la journée" },
  { value: "a-definir", label: "À définir avec l'APEA" },
];

export const HELP_TYPE_OPTIONS: SelectOption[] = [
  { value: "installation", label: "Installation / préparation" },
  { value: "accueil", label: "Accueil" },
  { value: "buvette", label: "Buvette / restauration" },
  { value: "rangement", label: "Rangement" },
  { value: "autre", label: "Autre coup de main" },
];
