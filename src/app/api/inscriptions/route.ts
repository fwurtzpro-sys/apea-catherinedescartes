import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  AVAILABILITY_OPTIONS,
  HELP_TYPE_OPTIONS,
  VOLUNTEER_EVENT_OPTIONS,
} from "@/lib/volunteer-form-options";
import {
  validateVolunteerForm,
  hasErrors,
  type VolunteerFormValues,
} from "@/lib/volunteer-form-validation";

// --- Best-effort rate limiting -------------------------------------------
// In-memory only: it lives in this Node process's RAM and resets on every
// deploy/restart, and gives no protection at all if the app ever runs as
// multiple instances (each would have its own independent counter). This
// is NOT a real anti-abuse guarantee — it only slows down a casual retry
// loop from a single visitor. The honeypot field and the strict server-side
// validation below are the actual defenses; this is a cheap extra layer
// that costs nothing to keep, not something to rely on alone.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const submissionTimestampsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionTimestampsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionTimestampsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return "unknown";
}

// --- HTML escaping ---------------------------------------------------------
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function labelsFor(
  values: string[],
  options: { value: string; label: string }[]
): string[] {
  const byValue = new Map(options.map((o) => [o.value, o.label]));
  return values.map((v) => byValue.get(v)).filter((l): l is string => !!l);
}

// --- Request body shape (untrusted input) ----------------------------------
type RawBody = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  eventId?: unknown;
  availability?: unknown;
  helpTypes?: unknown;
  message?: unknown;
  consent?: unknown;
  // Honeypot: a real visitor never fills this (it's visually hidden).
  company?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.slice(0, 4000) : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string").slice(0, 20);
}

export async function POST(request: Request) {
  let body: RawBody;
  try {
    body = (await request.json()) as RawBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 }
    );
  }

  // Honeypot: a bot filling every field gets a fake success so it learns
  // nothing, while we simply never send the e-mail.
  if (asString(body.company).trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const values: VolunteerFormValues = {
    firstName: asString(body.firstName),
    lastName: asString(body.lastName),
    email: asString(body.email),
    phone: asString(body.phone),
    eventId: asString(body.eventId),
    availability: asStringArray(body.availability),
    helpTypes: asStringArray(body.helpTypes),
    message: asString(body.message),
    consent: body.consent === true,
  };

  const fieldErrors = validateVolunteerForm(values);
  if (hasErrors(fieldErrors)) {
    return NextResponse.json(
      { ok: false, error: "Certains champs sont invalides.", fieldErrors },
      { status: 400 }
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Trop de demandes envoyées récemment. Merci de réessayer dans quelques minutes.",
      },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.INSCRIPTIONS_RECIPIENT_EMAIL;
  if (!apiKey || !fromEmail || !toEmail) {
    // No secret/config detail is ever sent to the browser.
    console.error(
      "inscriptions: missing Resend configuration (RESEND_API_KEY / RESEND_FROM_EMAIL / INSCRIPTIONS_RECIPIENT_EMAIL)"
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "L'envoi n'est pas encore configuré. Merci de réessayer plus tard ou de nous contacter directement.",
      },
      { status: 500 }
    );
  }

  const firstName = values.firstName.replace(/\s+/g, " ").trim();
  const lastName = values.lastName.replace(/\s+/g, " ").trim();
  const email = values.email.replace(/\s+/g, " ").trim();
  const phone = values.phone.replace(/\s+/g, " ").trim();
  const message = values.message.replace(/\s+/g, " ").trim();

  const eventLabel =
    VOLUNTEER_EVENT_OPTIONS.find((o) => o.value === values.eventId)?.label ??
    "Événement non précisé";
  const availabilityLabels = labelsFor(
    values.availability,
    AVAILABILITY_OPTIONS
  );
  const helpTypeLabels = labelsFor(values.helpTypes, HELP_TYPE_OPTIONS);
  const receivedAt = new Date().toLocaleString("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  });

  const rows: { label: string; value: string }[] = [
    { label: "Prénom", value: firstName },
    { label: "Nom", value: lastName },
    { label: "E-mail", value: email },
  ];
  if (phone) rows.push({ label: "Téléphone", value: phone });
  rows.push({ label: "Événement", value: eventLabel });
  rows.push({
    label: "Disponibilités",
    value: availabilityLabels.length ? availabilityLabels.join(", ") : "—",
  });
  rows.push({
    label: "Type d'aide",
    value: helpTypeLabels.length ? helpTypeLabels.join(", ") : "—",
  });
  if (message) rows.push({ label: "Message", value: message });
  rows.push({ label: "Reçu le", value: receivedAt });

  const textBody = rows.map((r) => `${r.label} : ${r.value}`).join("\n");
  const htmlBody = `
    <div style="font-family: sans-serif; color: #0f243d;">
      <h1 style="font-size: 18px;">Nouvelle inscription bénévole</h1>
      <table style="border-collapse: collapse;">
        ${rows
          .map(
            (r) => `
          <tr>
            <td style="padding: 4px 12px 4px 0; font-weight: bold; vertical-align: top; white-space: nowrap;">${escapeHtml(r.label)}</td>
            <td style="padding: 4px 0;">${escapeHtml(r.value)}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `.trim();

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Nouvelle inscription bénévole — ${eventLabel}`,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      // Log only the error type/message from the provider — never the
      // submitted personal data (name, email, phone, message…).
      console.error("inscriptions: Resend error", error.message);
      return NextResponse.json(
        {
          ok: false,
          error:
            "L'envoi a échoué. Merci de réessayer, ou de nous contacter directement.",
        },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error(
      "inscriptions: unexpected send failure",
      err instanceof Error ? err.message : "unknown error"
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "L'envoi a échoué. Merci de réessayer, ou de nous contacter directement.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
