import {
  AVAILABILITY_OPTIONS,
  HELP_TYPE_OPTIONS,
  VOLUNTEER_EVENT_OPTIONS,
} from "@/lib/volunteer-form-options";

// Deliberately simple (not RFC-5322-exhaustive): good enough to catch
// obvious mistakes without rejecting real addresses.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MAX_LENGTHS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  phone: 30,
  message: 2000,
} as const;

export type VolunteerFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventId: string;
  availability: string[];
  helpTypes: string[];
  message: string;
  consent: boolean;
};

export type VolunteerFieldErrors = Partial<
  Record<keyof VolunteerFormValues, string>
>;

/** Collapses internal whitespace and trims — never alters user intent. */
function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

const EVENT_VALUES = new Set(VOLUNTEER_EVENT_OPTIONS.map((o) => o.value));
const AVAILABILITY_VALUES = new Set(AVAILABILITY_OPTIONS.map((o) => o.value));
const HELP_TYPE_VALUES = new Set(HELP_TYPE_OPTIONS.map((o) => o.value));

/**
 * Shared client/server validation for the volunteer sign-up form. The
 * server calls this as the authoritative check; the client calls it for
 * immediate inline feedback. Keeping one implementation avoids the two
 * ever silently drifting apart.
 */
export function validateVolunteerForm(
  values: VolunteerFormValues
): VolunteerFieldErrors {
  const errors: VolunteerFieldErrors = {};

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

  if (!values.eventId || !EVENT_VALUES.has(values.eventId))
    errors.eventId = "Merci de choisir un événement.";

  if (values.availability.some((v) => !AVAILABILITY_VALUES.has(v)))
    errors.availability = "Disponibilité invalide.";

  if (values.helpTypes.some((v) => !HELP_TYPE_VALUES.has(v)))
    errors.helpTypes = "Type d'aide invalide.";

  const message = normalize(values.message);
  if (message.length > MAX_LENGTHS.message)
    errors.message = "Votre message est trop long.";

  if (!values.consent)
    errors.consent = "Merci d'accepter l'utilisation de vos informations.";

  return errors;
}

export function hasErrors(errors: VolunteerFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
