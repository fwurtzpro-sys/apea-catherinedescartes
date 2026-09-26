import { IDEA_CATEGORY_OPTIONS } from "@/lib/idea-box-options";

// Deliberately simple (not RFC-5322-exhaustive): good enough to catch
// obvious mistakes without rejecting real addresses.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MAX_LENGTHS = {
  title: 150,
  idea: 3000,
  firstName: 80,
  lastName: 80,
  email: 254,
  phone: 30,
} as const;

export type ContactMode = "anonymous" | "contact";

export type IdeaBoxFormValues = {
  category: string;
  title: string;
  idea: string;
  contactMode: ContactMode;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
};

export type IdeaBoxFieldErrors = Partial<
  Record<keyof IdeaBoxFormValues, string>
>;

/** Collapses internal whitespace and trims — never alters user intent. */
function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

const CATEGORY_VALUES = new Set(IDEA_CATEGORY_OPTIONS.map((o) => o.value));

/**
 * Anonymous mode is a real guarantee, not a UI preference: whatever a
 * client sends, any contact field is dropped before validation and before
 * anything is used to build the e-mail, so a tampered request can never
 * smuggle an identity into an "anonymous" submission.
 */
export function sanitizeIdeaBoxValues(
  values: IdeaBoxFormValues
): IdeaBoxFormValues {
  if (values.contactMode === "contact") return values;
  return {
    ...values,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  };
}

/**
 * Shared client/server validation for the idea box form. The server calls
 * this (after `sanitizeIdeaBoxValues`) as the authoritative check; the
 * client calls it for immediate inline feedback.
 */
export function validateIdeaBoxForm(
  values: IdeaBoxFormValues
): IdeaBoxFieldErrors {
  const errors: IdeaBoxFieldErrors = {};

  if (!values.category || !CATEGORY_VALUES.has(values.category))
    errors.category = "Merci de choisir une catégorie.";

  const title = normalize(values.title);
  if (!title) errors.title = "Merci de donner un titre à votre idée.";
  else if (title.length > MAX_LENGTHS.title)
    errors.title = "Ce titre est trop long.";

  const idea = normalize(values.idea);
  if (!idea) errors.idea = "Merci de décrire votre idée.";
  else if (idea.length > MAX_LENGTHS.idea)
    errors.idea = "Votre idée est trop longue.";

  if (values.contactMode === "contact") {
    const firstName = normalize(values.firstName);
    if (!firstName) errors.firstName = "Merci d'indiquer votre prénom.";
    else if (firstName.length > MAX_LENGTHS.firstName)
      errors.firstName = "Ce prénom est trop long.";

    const lastName = normalize(values.lastName);
    if (!lastName) errors.lastName = "Merci d'indiquer votre nom.";
    else if (lastName.length > MAX_LENGTHS.lastName)
      errors.lastName = "Ce nom est trop long.";

    const email = normalize(values.email);
    if (!email) errors.email = "Merci d'indiquer votre e-mail.";
    else if (email.length > MAX_LENGTHS.email || !EMAIL_PATTERN.test(email))
      errors.email = "Cette adresse e-mail ne semble pas valide.";

    const phone = normalize(values.phone);
    if (phone.length > MAX_LENGTHS.phone)
      errors.phone = "Ce numéro de téléphone est trop long.";

    if (!values.consent)
      errors.consent = "Merci d'accepter l'utilisation de vos informations.";
  }

  return errors;
}

export function hasErrors(errors: IdeaBoxFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
