/**
 * Calendrier scolaire officiel 2026-2027 — Zone B, académie de Rennes.
 *
 * Source : arrêté du 22 octobre 2025 fixant le calendrier scolaire de
 * l'année 2026-2027 (ministère de l'Éducation nationale et de la Jeunesse,
 * Journal officiel). Dates vérifiées et recoupées auprès de plusieurs
 * relais indépendants de cet arrêté (aucune date n'a été déduite ou
 * estimée) — voir le rapport de livraison pour le détail des sources
 * consultées.
 *
 * Toutes les dates sont des jours calendaires pleins au format ISO
 * (YYYY-MM-DD), sans composante horaire, afin de rester stables quel que
 * soit le fuseau horaire du serveur ou du navigateur.
 *
 * Pour réutiliser cette page une année scolaire suivante (2027-2028...),
 * il suffit de remplacer les valeurs de SCHOOL_PERIODS et les deux
 * constantes CALENDAR_START_MONTH / CALENDAR_END_MONTH ci-dessous.
 */

export type SchoolPeriodId =
  | "rentree"
  | "toussaint"
  | "noel"
  | "hiver"
  | "printemps"
  | "ascension"
  | "ete";

export type SchoolPeriodKind = "milestone" | "break";

export type SchoolPeriod = {
  id: SchoolPeriodId;
  /** Nom complet, utilisé dans les cartes et le calendrier. */
  label: string;
  /** Nom court, utilisé sur la frise. */
  shortLabel: string;
  kind: SchoolPeriodKind;
  /** Premier jour de la période (jour de rentrée pour un jalon), ISO. */
  startDate: string;
  /**
   * Dernier jour de la période. Absent pour les vacances d'été : l'arrêté
   * 2026-2027 ne fixe pas de date de reprise (celle-ci relève du
   * calendrier 2027-2028, non couvert ici).
   */
  endDate?: string;
  /** Précision officielle sur le début de la période (ex. "après la classe"). */
  startNote?: string;
  /** Précision officielle sur la reprise (ex. "au matin"). */
  endNote?: string;
};

export const SCHOOL_YEAR_LABEL = "2026-2027";
export const SCHOOL_ZONE_LABEL = "Zone B · Académie de Rennes";

/** La grille du calendrier mensuel commence et s'arrête à ces mois inclus. */
export const CALENDAR_START_MONTH = { year: 2026, month: 9 }; // septembre 2026
export const CALENDAR_END_MONTH = { year: 2027, month: 7 }; // juillet 2027

export type PublicHoliday = {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Official French name, as used in the Labor Code (art. L.3133-1). */
  name: string;
};

/**
 * French legal public holidays falling within the calendar's coverage
 * (September 2026 – July 2027). Source: the 11 national holidays fixed by
 * article L.3133-1 of the Code du travail; fixed dates (Toussaint,
 * Armistice, Noël, Jour de l'An, Fête du Travail, Victoire 1945, Fête
 * nationale) are set by law every year, and the movable ones (Lundi de
 * Pâques, Ascension, Lundi de Pentecôte) were cross-checked for 2027
 * against several independent sources citing the same Easter date
 * (Easter Sunday 28 March 2027) — see the delivery report for details.
 * A holiday can fall inside a school break (e.g. Noël, Ascension): this
 * list is independent from SCHOOL_PERIODS on purpose, so both pieces of
 * information can be shown together without one overriding the other.
 */
export const PUBLIC_HOLIDAYS: PublicHoliday[] = [
  { date: "2026-11-01", name: "Toussaint" },
  { date: "2026-11-11", name: "Armistice 1918" },
  { date: "2026-12-25", name: "Noël" },
  { date: "2027-01-01", name: "Jour de l'An" },
  { date: "2027-03-29", name: "Lundi de Pâques" },
  { date: "2027-05-01", name: "Fête du Travail" },
  { date: "2027-05-06", name: "Ascension" },
  { date: "2027-05-08", name: "Victoire 1945" },
  { date: "2027-05-17", name: "Lundi de Pentecôte" },
  { date: "2027-07-14", name: "Fête nationale" },
];

export const SCHOOL_PERIODS: SchoolPeriod[] = [
  {
    id: "rentree",
    label: "Rentrée scolaire",
    shortLabel: "Rentrée",
    kind: "milestone",
    startDate: "2026-09-01",
    endDate: "2026-09-01",
    startNote: "Reprise des cours le mardi 1er septembre 2026",
  },
  {
    id: "toussaint",
    label: "Vacances de la Toussaint",
    shortLabel: "Toussaint",
    kind: "break",
    startDate: "2026-10-17",
    endDate: "2026-11-02",
    startNote: "après la classe",
    endNote: "reprise des cours au matin",
  },
  {
    id: "noel",
    label: "Vacances de Noël",
    shortLabel: "Noël",
    kind: "break",
    startDate: "2026-12-19",
    endDate: "2027-01-04",
    startNote: "après la classe",
    endNote: "reprise des cours au matin",
  },
  {
    id: "hiver",
    label: "Vacances d'hiver",
    shortLabel: "Hiver",
    kind: "break",
    startDate: "2027-02-20",
    endDate: "2027-03-08",
    startNote: "après la classe",
    endNote: "reprise des cours au matin",
  },
  {
    id: "printemps",
    label: "Vacances de printemps",
    shortLabel: "Printemps",
    kind: "break",
    startDate: "2027-04-17",
    endDate: "2027-05-03",
    startNote: "après la classe",
    endNote: "reprise des cours au matin",
  },
  {
    id: "ascension",
    label: "Pont de l'Ascension",
    shortLabel: "Ascension",
    kind: "break",
    startDate: "2027-05-05",
    endDate: "2027-05-10",
    startNote: "après la classe du mercredi",
    endNote: "reprise des cours le lundi matin",
  },
  {
    id: "ete",
    label: "Vacances d'été",
    shortLabel: "Été",
    kind: "break",
    startDate: "2027-07-03",
    startNote: "après la classe",
  },
];
