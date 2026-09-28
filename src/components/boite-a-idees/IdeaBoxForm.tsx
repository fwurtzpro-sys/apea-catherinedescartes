"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IDEA_CATEGORY_OPTIONS } from "@/lib/idea-box-options";
import {
  validateIdeaBoxForm,
  hasErrors,
  type IdeaBoxFormValues,
  type IdeaBoxFieldErrors,
  type ContactMode,
} from "@/lib/idea-box-validation";

type Status = "idle" | "submitting" | "success" | "error";

const INITIAL_VALUES: IdeaBoxFormValues = {
  category: "",
  title: "",
  idea: "",
  contactMode: "anonymous",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
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

export function IdeaBoxForm() {
  const [values, setValues] = useState<IdeaBoxFormValues>(INITIAL_VALUES);
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<IdeaBoxFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function setContactMode(mode: ContactMode) {
    setValues((prev) => {
      if (mode === "anonymous") {
        // Real removal, not a visual toggle: switching back to anonymous
        // drops any previously typed contact details from state, so they
        // can never be included in what gets submitted.
        return {
          ...prev,
          contactMode: mode,
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          consent: false,
        };
      }
      return { ...prev, contactMode: mode };
    });
    setFieldErrors((prev) => ({
      ...prev,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      phone: undefined,
      consent: undefined,
    }));
  }

  function focusFirstError(errors: IdeaBoxFieldErrors) {
    const order: (keyof IdeaBoxFormValues)[] = [
      "category",
      "title",
      "idea",
      "firstName",
      "lastName",
      "email",
      "phone",
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
    if (status === "submitting") return;
    setFormError(null);

    const errors = validateIdeaBoxForm(values);
    if (hasErrors(errors)) {
      setFieldErrors(errors);
      focusFirstError(errors);
      return;
    }
    setFieldErrors({});
    setStatus("submitting");

    const payload =
      values.contactMode === "contact"
        ? { ...values, company: honeypot }
        : {
            category: values.category,
            title: values.title,
            idea: values.idea,
            contactMode: values.contactMode,
            company: honeypot,
          };

    try {
      const res = await fetch("/api/boite-a-idees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: {
        ok: boolean;
        error?: string;
        fieldErrors?: IdeaBoxFieldErrors;
      } = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        setValues(INITIAL_VALUES);
        setHoneypot("");
        return;
      }

      setStatus("error");
      setFormError(data.error ?? "L'envoi a échoué. Merci de réessayer.");
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
          Merci&nbsp;! Votre idée a bien été transmise à l&rsquo;APEA.
        </p>
        <p className="max-w-md text-navy-900/70">
          Merci de contribuer à faire vivre les projets de l&rsquo;association.
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
        <label htmlFor="idea-company">Ne pas remplir ce champ</label>
        <input
          id="idea-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-navy-900">
          Catégorie <span className="text-orange-500">*</span>
        </legend>
        <div
          data-field="category"
          tabIndex={-1}
          className="mt-2 flex flex-wrap gap-2 focus:outline-none"
        >
          {IDEA_CATEGORY_OPTIONS.map((option) => {
            const checked = values.category === option.value;
            return (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  className="peer sr-only"
                  checked={checked}
                  onChange={() =>
                    setValues((v) => ({ ...v, category: option.value }))
                  }
                />
                <span className="inline-flex items-center rounded-full border-2 border-navy-900/10 px-4 py-2 text-sm font-medium text-navy-900 transition-all duration-200 ease-out hover:border-orange-300 peer-checked:border-orange-a11y peer-checked:bg-orange-a11y peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange-500">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
        <FieldError id="category-error" message={fieldErrors.category} />
      </fieldset>

      <div className="mt-6">
        <label htmlFor="title" className="text-sm font-semibold text-navy-900">
          Donnez un titre à votre idée <span className="text-orange-500">*</span>
        </label>
        <input
          id="title"
          data-field="title"
          name="title"
          type="text"
          placeholder="Ex. Une nouvelle activité pour les enfants"
          required
          aria-required="true"
          aria-invalid={!!fieldErrors.title}
          aria-describedby={fieldErrors.title ? "title-error" : undefined}
          value={values.title}
          onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
          className={`mt-1.5 ${inputClasses} ${fieldBorder(!!fieldErrors.title)}`}
        />
        <FieldError id="title-error" message={fieldErrors.title} />
      </div>

      <div className="mt-6">
        <label htmlFor="idea" className="text-sm font-semibold text-navy-900">
          Décrivez votre idée <span className="text-orange-500">*</span>
        </label>
        <textarea
          id="idea"
          data-field="idea"
          name="idea"
          rows={6}
          placeholder="Expliquez-nous votre idée, même simplement…"
          required
          aria-required="true"
          aria-invalid={!!fieldErrors.idea}
          aria-describedby={fieldErrors.idea ? "idea-error" : undefined}
          value={values.idea}
          onChange={(e) => setValues((v) => ({ ...v, idea: e.target.value }))}
          className={`mt-1.5 ${inputClasses} resize-y ${fieldBorder(!!fieldErrors.idea)}`}
        />
        <FieldError id="idea-error" message={fieldErrors.idea} />
      </div>

      <fieldset className="mt-8">
        <legend className="text-sm font-semibold text-navy-900">
          Comment souhaitez-vous transmettre votre idée&nbsp;?
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          <label className="cursor-pointer">
            <input
              type="radio"
              name="contactMode"
              className="peer sr-only"
              checked={values.contactMode === "anonymous"}
              onChange={() => setContactMode("anonymous")}
            />
            <span className="inline-flex items-center rounded-full border-2 border-navy-900/10 px-4 py-2 text-sm font-medium text-navy-900 transition-all duration-200 ease-out hover:border-orange-300 peer-checked:border-orange-a11y peer-checked:bg-orange-a11y peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange-500">
              Envoyer anonymement
            </span>
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="contactMode"
              className="peer sr-only"
              checked={values.contactMode === "contact"}
              onChange={() => setContactMode("contact")}
            />
            <span className="inline-flex items-center rounded-full border-2 border-navy-900/10 px-4 py-2 text-sm font-medium text-navy-900 transition-all duration-200 ease-out hover:border-orange-300 peer-checked:border-orange-a11y peer-checked:bg-orange-a11y peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange-500">
              Je souhaite pouvoir être recontacté(e)
            </span>
          </label>
        </div>
      </fieldset>

      {values.contactMode === "contact" ? (
        <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl bg-cream-100/60 p-4 sm:grid-cols-2 sm:p-5 motion-safe:animate-[idea-fields-in_300ms_ease-out]">
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
              Téléphone <span className="text-navy-900/70">(facultatif)</span>
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

          <div className="sm:col-span-2">
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
                ma suggestion et, si nécessaire, de me recontacter. Voir notre{" "}
                <a
                  href="/politique-de-confidentialite"
                  className="font-semibold text-orange-a11y underline hover:text-orange-600"
                >
                  politique de confidentialité
                </a>
                .
              </span>
            </label>
            <FieldError id="consent-error" message={fieldErrors.consent} />
          </div>
        </div>
      ) : (
        <p className="mt-6 rounded-2xl bg-cream-100/60 p-4 text-sm text-navy-900/70">
          Votre idée sera transmise sans vos coordonnées.
        </p>
      )}

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
        icon={<Send className="h-4 w-4" />}
        className="mt-8 w-full sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Envoi en cours…" : "Envoyer mon idée"}
      </Button>
    </form>
  );
}
