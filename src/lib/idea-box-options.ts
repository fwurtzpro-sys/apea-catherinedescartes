export type SelectOption = {
  value: string;
  label: string;
};

/**
 * Seule source de vérité pour les catégories de la boîte à idées.
 * Utilisée à la fois par le formulaire (client) et par la Route Handler
 * (serveur) pour valider la valeur reçue.
 */
export const IDEA_CATEGORY_OPTIONS: SelectOption[] = [
  { value: "evenement", label: "Événement" },
  { value: "activite-enfants", label: "Activité / projet pour les enfants" },
  { value: "vie-association", label: "Vie de l'association" },
  { value: "amelioration", label: "Amélioration / suggestion" },
  { value: "autre", label: "Autre" },
];
