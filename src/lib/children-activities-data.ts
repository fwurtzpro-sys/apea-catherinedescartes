/**
 * Data for the "Activités enfants" page — a small library of printable
 * coloring pages organized by school level, kept entirely separate from
 * the rendering so a new one can be added later just by appending an
 * entry below, without touching any component.
 *
 * TPS/PS/MS/GS now point at real PDFs under /public/DESSIN. CP through
 * CM2 are still placeholders (`available: false`, no `pdf` set) until
 * their own real files are added the same way:
 *   1. Add the file under /public/DESSIN/<NIVEAU>/.
 *   2. Set `pdf` to that path.
 *   3. Set `available: true`.
 * The card then automatically shows a real "Télécharger" button instead
 * of "Bientôt disponible" — nothing else needs to change.
 */

export type ActivityLevel =
  | "TPS"
  | "PS"
  | "MS"
  | "GS"
  | "CP"
  | "CE1"
  | "CE2"
  | "CM1"
  | "CM2";

export type ActivityStage = "maternelle" | "elementaire";

/** Only "coloriage" for now — kept as its own type so other kinds of
 * printable activities (jeux, labyrinthes...) can be reintroduced later
 * without changing the shape of existing entries. */
export type ActivityType = "coloriage";

export type ChildActivity = {
  id: string;
  title: string;
  levels: ActivityLevel[];
  type: ActivityType;
  /** Path to a real preview image — absent for now (no fake thumbnails). */
  thumbnail?: string;
  /** Path to the real downloadable PDF — absent while `available` is false. */
  pdf?: string;
  /** Whether a real, working download exists yet. */
  available: boolean;
};

export const LEVELS: { id: ActivityLevel; stage: ActivityStage }[] = [
  { id: "TPS", stage: "maternelle" },
  { id: "PS", stage: "maternelle" },
  { id: "MS", stage: "maternelle" },
  { id: "GS", stage: "maternelle" },
  { id: "CP", stage: "elementaire" },
  { id: "CE1", stage: "elementaire" },
  { id: "CE2", stage: "elementaire" },
  { id: "CM1", stage: "elementaire" },
  { id: "CM2", stage: "elementaire" },
];

export function stageOfLevel(level: ActivityLevel): ActivityStage {
  return LEVELS.find((l) => l.id === level)?.stage ?? "elementaire";
}

/**
 * TPS, PS, MS and GS: 6 real, downloadable coloring pages per level
 * (see /public/DESSIN/<NIVEAU>/), each pointing straight at its PDF —
 * no bespoke SVG preview is drawn for these anymore since the real
 * printable sheet is now the definitive artwork.
 *
 * CP through CM2 keep 3 placeholder entries each (`available: false`)
 * until their own real PDFs are added the same way.
 */
export const CHILDREN_ACTIVITIES: ChildActivity[] = [
  // TPS
  { id: "tps-soleil", title: "Soleil", levels: ["TPS"], type: "coloriage", available: true, pdf: "/DESSIN/TPS/01_TPS_Soleil.pdf" },
  { id: "tps-ballon", title: "Ballon", levels: ["TPS"], type: "coloriage", available: true, pdf: "/DESSIN/TPS/02_TPS_Ballon.pdf" },
  { id: "tps-pomme", title: "Pomme", levels: ["TPS"], type: "coloriage", available: true, pdf: "/DESSIN/TPS/03_TPS_Pomme.pdf" },
  { id: "tps-fleur", title: "Fleur", levels: ["TPS"], type: "coloriage", available: true, pdf: "/DESSIN/TPS/04_TPS_Fleur.pdf" },
  { id: "tps-papillon", title: "Papillon", levels: ["TPS"], type: "coloriage", available: true, pdf: "/DESSIN/TPS/05_TPS_Papillon.pdf" },
  { id: "tps-poisson", title: "Poisson", levels: ["TPS"], type: "coloriage", available: true, pdf: "/DESSIN/TPS/06_TPS_Poisson.pdf" },

  // PS
  { id: "ps-chat", title: "Chat", levels: ["PS"], type: "coloriage", available: true, pdf: "/DESSIN/PS/01_PS_Chat.pdf" },
  { id: "ps-maison", title: "Maison", levels: ["PS"], type: "coloriage", available: true, pdf: "/DESSIN/PS/02_PS_Maison.pdf" },
  { id: "ps-arbre", title: "Arbre", levels: ["PS"], type: "coloriage", available: true, pdf: "/DESSIN/PS/03_PS_Arbre.pdf" },
  { id: "ps-voiture", title: "Voiture", levels: ["PS"], type: "coloriage", available: true, pdf: "/DESSIN/PS/04_PS_La_voiture.pdf" },
  { id: "ps-papillon", title: "Papillon", levels: ["PS"], type: "coloriage", available: true, pdf: "/DESSIN/PS/05_PS_Le_papillon_A4.pdf" },
  { id: "ps-chien", title: "Chien", levels: ["PS"], type: "coloriage", available: true, pdf: "/DESSIN/PS/06_PS_Chien.pdf" },

  // MS
  { id: "ms-escargot", title: "Escargot", levels: ["MS"], type: "coloriage", available: true, pdf: "/DESSIN/MS/01_MS_Escargot.pdf" },
  { id: "ms-poisson", title: "Poisson", levels: ["MS"], type: "coloriage", available: true, pdf: "/DESSIN/MS/02_MS_Le_poisson_A4.pdf" },
  { id: "ms-fleur", title: "Fleur", levels: ["MS"], type: "coloriage", available: true, pdf: "/DESSIN/MS/03_MS_La_fleur_A4.pdf" },
  { id: "ms-fusee", title: "Fusée", levels: ["MS"], type: "coloriage", available: true, pdf: "/DESSIN/MS/04_MS_La_fusee_A4.pdf" },
  { id: "ms-dinosaure", title: "Dinosaure", levels: ["MS"], type: "coloriage", available: true, pdf: "/DESSIN/MS/05_MS_Le_dinosaure_A4.pdf" },
  { id: "ms-chateau", title: "Château", levels: ["MS"], type: "coloriage", available: true, pdf: "/DESSIN/MS/06_MS_Le_chateau_A4.pdf" },

  // GS
  { id: "gs-licorne", title: "Licorne", levels: ["GS"], type: "coloriage", available: true, pdf: "/DESSIN/GS/01_GS_La_licorne_A4.pdf" },
  { id: "gs-robot", title: "Robot", levels: ["GS"], type: "coloriage", available: true, pdf: "/DESSIN/GS/02_GS_Le_robot_A4.pdf" },
  { id: "gs-bateau-pirate", title: "Bateau pirate", levels: ["GS"], type: "coloriage", available: true, pdf: "/DESSIN/GS/03_GS_Le_bateau_pirate_A4.pdf" },
  { id: "gs-dragon", title: "Dragon", levels: ["GS"], type: "coloriage", available: true, pdf: "/DESSIN/GS/04_GS_Le_dragon_A4.pdf" },
  { id: "gs-montgolfiere", title: "Montgolfière", levels: ["GS"], type: "coloriage", available: true, pdf: "/DESSIN/GS/05_GS_La_montgolfiere_A4.pdf" },
  { id: "gs-train", title: "Train", levels: ["GS"], type: "coloriage", available: true, pdf: "/DESSIN/GS/06_GS_Le_train_A4.pdf" },

  // CP
  { id: "cp-cartable", title: "Rentrée / cartable", levels: ["CP"], type: "coloriage", available: false },
  { id: "cp-animaux-foret", title: "Animaux de la forêt", levels: ["CP"], type: "coloriage", available: false },
  { id: "cp-espace", title: "Espace", levels: ["CP"], type: "coloriage", available: false },

  // CE1
  { id: "ce1-monde-marin", title: "Monde marin", levels: ["CE1"], type: "coloriage", available: false },
  { id: "ce1-nature", title: "Nature", levels: ["CE1"], type: "coloriage", available: false },
  { id: "ce1-animaux", title: "Animaux", levels: ["CE1"], type: "coloriage", available: false },

  // CE2
  { id: "ce2-dinosaure-detaille", title: "Dinosaure plus détaillé", levels: ["CE2"], type: "coloriage", available: false },
  { id: "ce2-paysage", title: "Paysage", levels: ["CE2"], type: "coloriage", available: false },
  { id: "ce2-espace-planetes", title: "Espace / planètes", levels: ["CE2"], type: "coloriage", available: false },

  // CM1
  { id: "cm1-mandala-simple", title: "Mandala simple", levels: ["CM1"], type: "coloriage", available: false },
  { id: "cm1-nature-detaillee", title: "Nature détaillée", levels: ["CM1"], type: "coloriage", available: false },
  { id: "cm1-animaux-travailles", title: "Animaux plus travaillés", levels: ["CM1"], type: "coloriage", available: false },

  // CM2
  { id: "cm2-mandala", title: "Mandala", levels: ["CM2"], type: "coloriage", available: false },
  { id: "cm2-paysage-detaille", title: "Paysage détaillé", levels: ["CM2"], type: "coloriage", available: false },
  { id: "cm2-illustration-creative", title: "Illustration créative plus complexe", levels: ["CM2"], type: "coloriage", available: false },
];
