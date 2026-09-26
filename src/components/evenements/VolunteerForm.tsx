"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  AVAILABILITY_OPTIONS,
  HELP_TYPE_OPTIONS,
  VOLUNTEER_EVENT_OPTIONS,
} from "@/lib/volunteer-form-options";
import {
  validateVolunteerForm,
  hasErrors,
  type VolunteerFormValues,
  type VolunteerFieldErrors,
} from "@/lib/volunteer-form-validation";

type Status = "idle" | "submitting" | "success" | "error";

const INITIAL_VALUES: VolunteerFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  eventId: "",
  availability: [],
  helpTypes: [],
  message: "",
  consent: false,
};

const inputClasses =
  "w-full rounded-2xl border bg-white px-4 py-3 text-navy-900 placeholder:text-navy-900/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500";

function fieldBorder(hasError: boolean): string {
  return hasError ? "border-red-400" : "border-navy-900/10";
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function VolunteerForm() {
  const [values, setValues] = useState<VolunteerFormValues>(INITIAL_VALUES);
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<VolunteerFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function toggleListValue(
    key: "availability" | "helpTypes",
    value: string
  ) {
    setValues((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  }

  function focusFirstError(errors: VolunteerFieldErrors) {
    const order: (keyof VolunteerFormValues)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "eventId",
      "availability",
      "helpTypes",
      "message",
      "consent",
    ];
    const firstKey = order.find((key) => errors[key]);
    if (!firstKey || !formRef.current) return;
    const el = formRef.current.querySelector<HTMLElement>(
      `[data-field="${firstKey}"]`
    );
    el?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const errors = validateVolunteerForm(values);
    if (hasErrors(errors)) {
      setFieldErrors(errors);
      focusFirstError(errors);
      return;
    }
    setFieldErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/inscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      const data: {
        ok: boolean;
        error?: string;
        fieldErrors?: VolunteerFieldErrors;
      } = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        setValues(INITIAL_VALUES);
        setHoneypot("");
        return;
      }

      setStatus("error");
      setFormError(
        data.error ?? "L'envoi a échoué. Merci de réessayer."
      );
      if (data.fieldErrors) setFieldErrors(data.fieldErrors);
    } catch {
      setStatus("error");
      setFormError(
        "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[2.5rem] bg-cream-100 p-8 text-center sm:p-12">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
          <CheckCircle2 className="h-7 w-7" strokeWidth={1.5} />
        </span>
        <p className="text-lg font-bold text-navy-900">
          Merci&nbsp;! Votre proposition de participation a bien été
          transmise à l&rsquo;APEA.
        </p>
        <p className="max-w-md text-navy-900/70">
          Nous revenons vers vous par e-mail si nous avons besoin de
          précisions.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[2.5rem] bg-white p-6 shadow-sm ring-1 ring-navy-900/5 sm:p-10"
    >
      {/* Honeypot: hidden from real visitors, only bots fill it in.
          display:none (rather than an off-screen absolute position) so it
          can never contribute to the page's scrollable width. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Ne pas remplir ce champ</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <h2 className="text-lg font-bold uppercase tracking-wide text-orange-500">
        Vos coordonnées
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="text-sm font-semibold text-navy-900">
            Prénom <span className="text-orange-500">*</span>
          </label>
          <input
            id="firstName"
            data-field="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.firstName}
            aria-describedby={fieldErrors.firstName ? "firstName-error" : undefined}
            value={values.firstName}
            onChange={(e) => setValues((v) => ({ ...v, firstName: e.target.value }))}
            className={`mt-1.5 ${inputClasses} ${fieldBorder(!!fieldErrors.firstName)}`}
          />
          <FieldError id="firstName-error" message={fieldErrors.firstName} />
        </div>
        <div>
          <label htmlFor="lastName" className="text-sm font-semibold text-navy-900">
            Nom <span className="text-orange-500">*</span>
          </label>
          <input
            id="lastName"
            data-field="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.lastName}
            aria-describedby={fieldErrors.lastName ? "lastName-error" : undefined}
            value={values.lastName}
            onChange={(e) => setValues((v) => ({ ...v, lastName: e.target.value }))}
            className={`mt-1.5 ${inputClasses} ${fieldBorder(!!fieldErrors.lastName)}`}
          />
          <FieldError id="lastName-error" message={fieldErrors.lastName} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-navy-900">
            Adresse e-mail <span className="text-orange-500">*</span>
          </label>
          <input
            id="email"
            data-field="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className={`mt-1.5 ${inputClasses} ${fieldBorder(!!fieldErrors.email)}`}
          />
          <FieldError id="email-error" message={fieldErrors.email} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-navy-900">
            Téléphone
          </label>
          <input
            id="phone"
            data-field="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className={`mt-1.5 ${inputClasses} ${fieldBorder(!!fieldErrors.phone)}`}
          />
          <FieldError id="phone-error" message={fieldErrors.phone} />
        </div>
      </div>

      <h2 className="mt-8 text-lg font-bold uppercase tracking-wide text-orange-500">
        Votre participation
      </h2>
      <div className="mt-4">
        <label htmlFor="eventId" className="text-sm font-semibold text-navy-900">
          Événement concerné <span className="text-orange-500">*</span>
        </label>
        <select
          id="eventId"
          data-field="eventId"
          name="eventId"
          required
          aria-required="true"
          aria-invalid={!!fieldErrors.eventId}
          aria-describedby={fieldErrors.eventId ? "eventId-error" : undefined}
          value={values.eventId}
          onChange={(e) => setValues((v) => ({ ...v, eventId: e.target.value }))}
          className={`mt-1.5 ${inputClasses} ${fieldBorder(!!fieldErrors.eventId)}`}
        >
          <option value="" disabled>
            Choisissez un événement
          </option>
          {VOLUNTEER_EVENT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError id="eventId-error" message={fieldErrors.eventId} />
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-navy-900">
          Vos disponibilités
        </legend>
        <div
          data-field="availability"
          tabIndex={-1}
          className="mt-2 flex flex-wrap gap-2 focus:outline-none"
        >
          {AVAILABILITY_OPTIONS.map((option) => {
            const checked = values.availability.includes(option.value);
            return (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked}
                  onChange={() => toggleListValue("availability", option.value)}
                />
                <span className="inline-flex items-center rounded-full border-2 border-navy-900/10 px-4 py-2 text-sm font-medium text-navy-900 transition-colors peer-checked:border-orange-500 peer-checked:bg-orange-500 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange-500">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-navy-900">
          Type d&rsquo;aide proposée
        </legend>
        <div
          data-field="helpTypes"
          tabIndex={-1}
          className="mt-2 flex flex-wrap gap-2 focus:outline-none"
        >
          {HELP_TYPE_OPTIONS.map((option) => {
            const checked = values.helpTypes.includes(option.value);
            return (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked}
                  onChange={() => toggleListValue("helpTypes", option.value)}
                />
                <span className="inline-flex items-center rounded-full border-2 border-navy-900/10 px-4 py-2 text-sm font-medium text-navy-900 transition-colors peer-checked:border-orange-500 peer-checked:bg-orange-500 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange-500">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="message" className="text-sm font-semibold text-navy-900">
          Un message ou une précision&nbsp;?
        </label>
        <textarea
          id="message"
          data-field="message"
          name="message"
          rows={4}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className={`mt-1.5 ${inputClasses} resize-y ${fieldBorder(!!fieldErrors.message)}`}
        />
        <FieldError id="message-error" message={fieldErrors.message} />
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            data-field="consent"
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.consent}
            aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
            checked={values.consent}
            onChange={(e) => setValues((v) => ({ ...v, consent: e.target.checked }))}
            className="mt-1 h-5 w-5 shrink-0 rounded border-2 border-navy-900/20 text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          />
          <span className="text-sm text-navy-900/80">
            J&rsquo;accepte que les informations renseignées soient
            utilisées par l&rsquo;APEA Catherine Descartes afin de traiter
            ma demande de participation. Voir notre{" "}
            <a
              href="/politique-de-confidentialite"
              className="font-semibold text-orange-500 underline hover:text-orange-600"
            >
              politique de confidentialité
            </a>
            .
          </span>
        </label>
        <FieldError id="consent-error" message={fieldErrors.consent} />
      </div>

      {formError && (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2 rounded-2xl border-2 border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {formError}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        icon={<ArrowRight className="h-4 w-4" />}
        className="mt-8 w-full sm:w-auto"
      >
        {status === "submitting" ? "Envoi en cours…" : "Proposer mon aide"}
      </Button>
    </form>
  );
}
