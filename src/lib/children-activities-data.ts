/**
 * Data for the "Activités enfants" page — a small library of printable
 * coloring pages organized by school level, kept entirely separate from
 * the rendering so a new one can be added later just by appending an
 * entry below, without touching any component.
 *
 * All 9 levels (TPS through CM2) now point at real PDFs under
 * /public/DESSIN/<NIVEAU>/, each with a real preview image rendered
 * from that PDF's first page (see /public/DESSIN/previews/<NIVEAU>/,
 * generated with pdftoppm + sharp — never hand-drawn). To add a new
 * activity later:
 *   1. Add the file under /public/DESSIN/<NIVEAU>/.
 *   2. Render its preview under /public/DESSIN/previews/<NIVEAU>/.
 *   3. Set `pdf` and `thumbnail` to those paths.
 *   4. Set `available: true`.
 * The card then automatically shows the real preview and a real
 * "Télécharger" button instead of "Bientôt disponible" — nothing else
 * needs to change.
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
  /** Path to a real preview image rendered from the PDF's first page —
   * absent while `available` is false (no fake thumbnails). */
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
 * 6 real, downloadable coloring pages per level, TPS through CM2 (see
 * /public/DESSIN/<NIVEAU>/), each pointing straight at its PDF and at a
 * real preview image rendered from that same PDF — no bespoke SVG or
 * invented artwork, the printable sheet is the definitive source.
 */
export const CHILDREN_ACTIVITIES: ChildActivity[] = [
  // TPS
  { id: "tps-soleil", title: "Soleil", levels: ["TPS"], type: "coloriage", available: true, pdf: "/DESSIN/TPS/01_TPS_Soleil.pdf", thumbnail: "/DESSIN/previews/TPS/01_TPS_Soleil.webp" },
  { id: "tps-ballon", title: "Ballon", levels: ["TPS"], type: "coloriage", available: true, pdf: "/DESSIN/TPS/02_TPS_Ballon.pdf", thumbnail: "/DESSIN/previews/TPS/02_TPS_Ballon.webp" },
  { id: "tps-pomme", title: "Pomme", levels: ["TPS"], type: "coloriage", available: true, pdf: "/DESSIN/TPS/03_TPS_Pomme.pdf", thumbnail: "/DESSIN/previews/TPS/03_TPS_Pomme.webp" },
  { id: "tps-fleur", title: "Fleur", levels: ["TPS"], type: "coloriage", available: true, pdf: "/DESSIN/TPS/04_TPS_Fleur.pdf", thumbnail: "/DESSIN/previews/TPS/04_TPS_Fleur.webp" },
  { id: "tps-papillon", title: "Papillon", levels: ["TPS"], type: "coloriage", available: true, pdf: "/DESSIN/TPS/05_TPS_Papillon.pdf", thumbnail: "/DESSIN/previews/TPS/05_TPS_Papillon.webp" },
  { id: "tps-poisson", title: "Poisson", levels: ["TPS"], type: "coloriage", available: true, pdf: "/DESSIN/TPS/06_TPS_Poisson.pdf", thumbnail: "/DESSIN/previews/TPS/06_TPS_Poisson.webp" },

  // PS
  { id: "ps-chat", title: "Chat", levels: ["PS"], type: "coloriage", available: true, pdf: "/DESSIN/PS/01_PS_Chat.pdf", thumbnail: "/DESSIN/previews/PS/01_PS_Chat.webp" },
  { id: "ps-maison", title: "Maison", levels: ["PS"], type: "coloriage", available: true, pdf: "/DESSIN/PS/02_PS_Maison.pdf", thumbnail: "/DESSIN/previews/PS/02_PS_Maison.webp" },
  { id: "ps-arbre", title: "Arbre", levels: ["PS"], type: "coloriage", available: true, pdf: "/DESSIN/PS/03_PS_Arbre.pdf", thumbnail: "/DESSIN/previews/PS/03_PS_Arbre.webp" },
  { id: "ps-voiture", title: "Voiture", levels: ["PS"], type: "coloriage", available: true, pdf: "/DESSIN/PS/04_PS_La_voiture.pdf", thumbnail: "/DESSIN/previews/PS/04_PS_La_voiture.webp" },
  { id: "ps-papillon", title: "Papillon", levels: ["PS"], type: "coloriage", available: true, pdf: "/DESSIN/PS/05_PS_Le_papillon_A4.pdf", thumbnail: "/DESSIN/previews/PS/05_PS_Le_papillon_A4.webp" },
  { id: "ps-chien", title: "Chien", levels: ["PS"], type: "coloriage", available: true, pdf: "/DESSIN/PS/06_PS_Chien.pdf", thumbnail: "/DESSIN/previews/PS/06_PS_Chien.webp" },

  // MS
  { id: "ms-escargot", title: "Escargot", levels: ["MS"], type: "coloriage", available: true, pdf: "/DESSIN/MS/01_MS_Escargot.pdf", thumbnail: "/DESSIN/previews/MS/01_MS_Escargot.webp" },
  { id: "ms-poisson", title: "Poisson", levels: ["MS"], type: "coloriage", available: true, pdf: "/DESSIN/MS/02_MS_Le_poisson_A4.pdf", thumbnail: "/DESSIN/previews/MS/02_MS_Le_poisson_A4.webp" },
  { id: "ms-fleur", title: "Fleur", levels: ["MS"], type: "coloriage", available: true, pdf: "/DESSIN/MS/03_MS_La_fleur_A4.pdf", thumbnail: "/DESSIN/previews/MS/03_MS_La_fleur_A4.webp" },
  { id: "ms-fusee", title: "Fusée", levels: ["MS"], type: "coloriage", available: true, pdf: "/DESSIN/MS/04_MS_La_fusee_A4.pdf", thumbnail: "/DESSIN/previews/MS/04_MS_La_fusee_A4.webp" },
  { id: "ms-dinosaure", title: "Dinosaure", levels: ["MS"], type: "coloriage", available: true, pdf: "/DESSIN/MS/05_MS_Le_dinosaure_A4.pdf", thumbnail: "/DESSIN/previews/MS/05_MS_Le_dinosaure_A4.webp" },
  { id: "ms-chateau", title: "Château", levels: ["MS"], type: "coloriage", available: true, pdf: "/DESSIN/MS/06_MS_Le_chateau_A4.pdf", thumbnail: "/DESSIN/previews/MS/06_MS_Le_chateau_A4.webp" },

  // GS
  { id: "gs-licorne", title: "Licorne", levels: ["GS"], type: "coloriage", available: true, pdf: "/DESSIN/GS/01_GS_La_licorne_A4.pdf", thumbnail: "/DESSIN/previews/GS/01_GS_La_licorne_A4.webp" },
  { id: "gs-robot", title: "Robot", levels: ["GS"], type: "coloriage", available: true, pdf: "/DESSIN/GS/02_GS_Le_robot_A4.pdf", thumbnail: "/DESSIN/previews/GS/02_GS_Le_robot_A4.webp" },
  { id: "gs-bateau-pirate", title: "Bateau pirate", levels: ["GS"], type: "coloriage", available: true, pdf: "/DESSIN/GS/03_GS_Le_bateau_pirate_A4.pdf", thumbnail: "/DESSIN/previews/GS/03_GS_Le_bateau_pirate_A4.webp" },
  { id: "gs-dragon", title: "Dragon", levels: ["GS"], type: "coloriage", available: true, pdf: "/DESSIN/GS/04_GS_Le_dragon_A4.pdf", thumbnail: "/DESSIN/previews/GS/04_GS_Le_dragon_A4.webp" },
  { id: "gs-montgolfiere", title: "Montgolfière", levels: ["GS"], type: "coloriage", available: true, pdf: "/DESSIN/GS/05_GS_La_montgolfiere_A4.pdf", thumbnail: "/DESSIN/previews/GS/05_GS_La_montgolfiere_A4.webp" },
  { id: "gs-train", title: "Train", levels: ["GS"], type: "coloriage", available: true, pdf: "/DESSIN/GS/06_GS_Le_train_A4.pdf", thumbnail: "/DESSIN/previews/GS/06_GS_Le_train_A4.webp" },

  // CP
  { id: "cp-cartable", title: "Le cartable et les fournitures", levels: ["CP"], type: "coloriage", available: true, pdf: "/DESSIN/CP/01_CP_Le_cartable_et_les_fournitures_A4.pdf", thumbnail: "/DESSIN/previews/CP/01_CP_Le_cartable_et_les_fournitures_A4.webp" },
  { id: "cp-renard-foret", title: "Le renard dans la forêt", levels: ["CP"], type: "coloriage", available: true, pdf: "/DESSIN/CP/02_CP_Le_renard_dans_la_foret_A4.pdf", thumbnail: "/DESSIN/previews/CP/02_CP_Le_renard_dans_la_foret_A4.webp" },
  { id: "cp-astronaute", title: "L’astronaute dans l’espace", levels: ["CP"], type: "coloriage", available: true, pdf: "/DESSIN/CP/03_CP_L_astronaute_dans_l_espace_A4.pdf", thumbnail: "/DESSIN/previews/CP/03_CP_L_astronaute_dans_l_espace_A4.webp" },
  { id: "cp-tortue-mer", title: "La tortue sous la mer", levels: ["CP"], type: "coloriage", available: true, pdf: "/DESSIN/CP/04_CP_La_tortue_sous_la_mer_A4.pdf", thumbnail: "/DESSIN/previews/CP/04_CP_La_tortue_sous_la_mer_A4.webp" },
  { id: "cp-chateau-enchante", title: "Le château enchanté", levels: ["CP"], type: "coloriage", available: true, pdf: "/DESSIN/CP/05_CP_Le_chateau_enchante_A4.pdf", thumbnail: "/DESSIN/previews/CP/05_CP_Le_chateau_enchante_A4.webp" },
  { id: "cp-lion-savane", title: "Le lion dans la savane", levels: ["CP"], type: "coloriage", available: true, pdf: "/DESSIN/CP/06_CP_Le_lion_dans_la_savane_A4.pdf", thumbnail: "/DESSIN/previews/CP/06_CP_Le_lion_dans_la_savane_A4.webp" },

  // CE1
  { id: "ce1-dauphin-fonds-marins", title: "Le dauphin et les fonds marins", levels: ["CE1"], type: "coloriage", available: true, pdf: "/DESSIN/CE1/01_CE1_Le_dauphin_et_les_fonds_marins_A4.pdf", thumbnail: "/DESSIN/previews/CE1/01_CE1_Le_dauphin_et_les_fonds_marins_A4.webp" },
  { id: "ce1-chouette-foret", title: "La chouette dans la forêt", levels: ["CE1"], type: "coloriage", available: true, pdf: "/DESSIN/CE1/02_CE1_La_chouette_dans_la_foret_A4.pdf", thumbnail: "/DESSIN/previews/CE1/02_CE1_La_chouette_dans_la_foret_A4.webp" },
  { id: "ce1-bateau-mer", title: "Le bateau en mer", levels: ["CE1"], type: "coloriage", available: true, pdf: "/DESSIN/CE1/03_CE1_Le_bateau_en_mer_A4.pdf", thumbnail: "/DESSIN/previews/CE1/03_CE1_Le_bateau_en_mer_A4.webp" },
  { id: "ce1-dragon-chateau", title: "Le dragon et son château", levels: ["CE1"], type: "coloriage", available: true, pdf: "/DESSIN/CE1/04_CE1_Le_dragon_et_son_chateau_A4.pdf", thumbnail: "/DESSIN/previews/CE1/04_CE1_Le_dragon_et_son_chateau_A4.webp" },
  { id: "ce1-cabane-arbre", title: "La cabane dans l’arbre", levels: ["CE1"], type: "coloriage", available: true, pdf: "/DESSIN/CE1/05_CE1_La_cabane_dans_l_arbre_A4.pdf", thumbnail: "/DESSIN/previews/CE1/05_CE1_La_cabane_dans_l_arbre_A4.webp" },
  { id: "ce1-cheval-campagne", title: "Le cheval à la campagne", levels: ["CE1"], type: "coloriage", available: true, pdf: "/DESSIN/CE1/06_CE1_Le_cheval_a_la_campagne_A4.pdf", thumbnail: "/DESSIN/previews/CE1/06_CE1_Le_cheval_a_la_campagne_A4.webp" },

  // CE2
  { id: "ce2-dinosaure-jungle", title: "Le dinosaure dans la jungle", levels: ["CE2"], type: "coloriage", available: true, pdf: "/DESSIN/CE2/01_CE2_Le_dinosaure_dans_la_jungle_A4.pdf", thumbnail: "/DESSIN/previews/CE2/01_CE2_Le_dinosaure_dans_la_jungle_A4.webp" },
  { id: "ce2-loup-montagne", title: "Le loup dans la montagne", levels: ["CE2"], type: "coloriage", available: true, pdf: "/DESSIN/CE2/02_CE2_Le_loup_dans_la_montagne_A4.pdf", thumbnail: "/DESSIN/previews/CE2/02_CE2_Le_loup_dans_la_montagne_A4.webp" },
  { id: "ce2-temple-perdu", title: "Le temple perdu dans la jungle", levels: ["CE2"], type: "coloriage", available: true, pdf: "/DESSIN/CE2/03_CE2_Le_temple_perdu_dans_la_jungle_A4_une_page.pdf", thumbnail: "/DESSIN/previews/CE2/03_CE2_Le_temple_perdu_dans_la_jungle_A4_une_page.webp" },
  { id: "ce2-baleine-tresor", title: "La baleine et le trésor sous-marin", levels: ["CE2"], type: "coloriage", available: true, pdf: "/DESSIN/CE2/04_CE2_La_baleine_et_le_tresor_sous_marin_A4.pdf", thumbnail: "/DESSIN/previews/CE2/04_CE2_La_baleine_et_le_tresor_sous_marin_A4.webp" },
  { id: "ce2-monde-magicien", title: "Le monde du magicien", levels: ["CE2"], type: "coloriage", available: true, pdf: "/DESSIN/CE2/05_CE2_Le_monde_du_magicien_A4.pdf", thumbnail: "/DESSIN/previews/CE2/05_CE2_Le_monde_du_magicien_A4.webp" },
  { id: "ce2-aigle-montagnes", title: "L’aigle dans les montagnes", levels: ["CE2"], type: "coloriage", available: true, pdf: "/DESSIN/CE2/06_CE2_L_aigle_dans_les_montagnes_A4.pdf", thumbnail: "/DESSIN/previews/CE2/06_CE2_L_aigle_dans_les_montagnes_A4.webp" },

  // CM1
  { id: "cm1-mandala-floral", title: "Mandala floral", levels: ["CM1"], type: "coloriage", available: true, pdf: "/DESSIN/CM1/01_CM1_Mandala_floral_A4.pdf", thumbnail: "/DESSIN/previews/CM1/01_CM1_Mandala_floral_A4-v2.webp" },
  { id: "cm1-mandala-papillon", title: "Mandala papillon", levels: ["CM1"], type: "coloriage", available: true, pdf: "/DESSIN/CM1/02_CM1_Mandala_papillon_A4.pdf", thumbnail: "/DESSIN/previews/CM1/02_CM1_Mandala_papillon_A4-v2.webp" },
  { id: "cm1-licorne-fleurie", title: "Licorne fleurie", levels: ["CM1"], type: "coloriage", available: true, pdf: "/DESSIN/CM1/03_CM1_Licorne_fleurie_A4.pdf", thumbnail: "/DESSIN/previews/CM1/03_CM1_Licorne_fleurie_A4-v2.webp" },
  { id: "cm1-fee-jardin", title: "La fée dans son jardin enchanté", levels: ["CM1"], type: "coloriage", available: true, pdf: "/DESSIN/CM1/04_CM1_La_fee_dans_son_jardin_enchante_A4_UNE_PAGE.pdf", thumbnail: "/DESSIN/previews/CM1/04_CM1_La_fee_dans_son_jardin_enchante_A4_UNE_PAGE.webp" },
  { id: "cm1-tigre-jungle", title: "Le tigre dans la jungle", levels: ["CM1"], type: "coloriage", available: true, pdf: "/DESSIN/CM1/05_CM1_Le_tigre_dans_la_jungle_A4.pdf", thumbnail: "/DESSIN/previews/CM1/05_CM1_Le_tigre_dans_la_jungle_A4.webp" },
  { id: "cm1-mandala-lune-etoiles", title: "Mandala lune, étoiles et fleurs", levels: ["CM1"], type: "coloriage", available: true, pdf: "/DESSIN/CM1/06_CM1_Mandala_lune_etoiles_et_fleurs_A4.pdf", thumbnail: "/DESSIN/previews/CM1/06_CM1_Mandala_lune_etoiles_et_fleurs_A4.webp" },

  // CM2
  { id: "cm2-mandala-lion", title: "Mandala lion", levels: ["CM2"], type: "coloriage", available: true, pdf: "/DESSIN/CM2/01_CM2_Mandala_lion_A4.pdf", thumbnail: "/DESSIN/previews/CM2/01_CM2_Mandala_lion_A4.webp" },
  { id: "cm2-mandala-floral-complexe", title: "Mandala floral complexe", levels: ["CM2"], type: "coloriage", available: true, pdf: "/DESSIN/CM2/02_CM2_Mandala_floral_complexe_A4.pdf", thumbnail: "/DESSIN/previews/CM2/02_CM2_Mandala_floral_complexe_A4.webp" },
  { id: "cm2-loup-lune", title: "Le loup et la lune", levels: ["CM2"], type: "coloriage", available: true, pdf: "/DESSIN/CM2/03_CM2_Le_loup_et_la_lune_A4.pdf", thumbnail: "/DESSIN/previews/CM2/03_CM2_Le_loup_et_la_lune_A4.webp" },
  { id: "cm2-chateau-fantastique", title: "Le château fantastique", levels: ["CM2"], type: "coloriage", available: true, pdf: "/DESSIN/CM2/04_CM2_Le_chateau_fantastique_A4.pdf", thumbnail: "/DESSIN/previews/CM2/04_CM2_Le_chateau_fantastique_A4.webp" },
  { id: "cm2-papillon-floral", title: "Papillon floral détaillé", levels: ["CM2"], type: "coloriage", available: true, pdf: "/DESSIN/CM2/05_CM2_Papillon_floral_detaille_A4.pdf", thumbnail: "/DESSIN/previews/CM2/05_CM2_Papillon_floral_detaille_A4.webp" },
  { id: "cm2-mandala-soleil-lune-etoiles", title: "Mandala soleil, lune et étoiles", levels: ["CM2"], type: "coloriage", available: true, pdf: "/DESSIN/CM2/06_CM2_Mandala_soleil_lune_et_etoiles_A4.pdf", thumbnail: "/DESSIN/previews/CM2/06_CM2_Mandala_soleil_lune_et_etoiles_A4.webp" },
];
