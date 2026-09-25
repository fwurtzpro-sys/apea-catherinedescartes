export type BoardMember = {
  firstName: string;
  lastName: string;
  role: string;
  /** Path under /public, e.g. "/apea-bureau-marine-mansourati-presidente.jpg". */
  image?: string;
  /** CSS object-position value, tunable per member once a photo is in place. */
  imagePosition?: string;
  /**
   * A member renders once this is true, whether or not `image` is set —
   * a missing `image` simply shows a neutral round placeholder instead of
   * a photo. Never invent a photo, initials, or a silhouette: `visible`
   * only gates whether the person is announced at all.
   */
  visible: boolean;
};

/**
 * Seule source de vérité pour la composition du bureau. Ne rendre un
 * membre visible qu'une fois sa fonction confirmée par l'APEA. `image`
 * peut rester absent en attendant la photo réelle — jamais de données
 * ou de visuel inventés.
 */
export const BOARD_MEMBERS: BoardMember[] = [
  {
    firstName: "Marine",
    lastName: "Mansourati",
    role: "Présidente",
    image: "/apea-bureau-marine-mansourati-presidente.png",
    imagePosition: "center",
    visible: true,
  },
  {
    firstName: "Albane",
    lastName: "Vias",
    role: "Vice-présidente",
    image: "/apea-bureau-albane-vias-vice-presidente.jpg",
    imagePosition: "center",
    visible: true,
  },
  {
    firstName: "Nathalie",
    lastName: "Bigot",
    role: "Trésorière",
    // Photo pas encore fournie par l'association : `image` reste absent,
    // la carte affiche un cercle neutre "à venir". Dès réception, il
    // suffira d'ajouter image: "/apea-bureau-nathalie-bigot-tresoriere.jpg".
    imagePosition: "center",
    visible: true,
  },
  {
    firstName: "Myriam",
    lastName: "Gaule",
    role: "Vice-trésorière",
    // Photo pas encore fournie par l'association : `image` reste absent,
    // la carte affiche un cercle neutre "à venir". Dès réception, il
    // suffira d'ajouter image: "/apea-bureau-myriam-gaule-vice-tresoriere.jpg".
    imagePosition: "center",
    visible: true,
  },
  {
    firstName: "Margaux",
    lastName: "Rouxel",
    role: "Secrétaire",
    image: "/apea-bureau-margaux-rouxel-secretaire.jpg",
    // "top" keeps the crop anchored to the top of the source photo, so
    // the full head is visible instead of being cropped by object-cover's
    // default centered crop (which was cutting into the hair/forehead).
    imagePosition: "top",
    visible: true,
  },
  {
    firstName: "Maud",
    lastName: "Le Gendre",
    role: "Vice-secrétaire",
    image: "/apea-bureau-maud-le-gendre-vice-secretaire.jpg",
    imagePosition: "center",
    visible: true,
  },
];
