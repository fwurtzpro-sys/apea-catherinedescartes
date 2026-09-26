import { NextResponse } from "next/server";
import { Resend } from "resend";
import { IDEA_CATEGORY_OPTIONS } from "@/lib/idea-box-options";
import {
  validateIdeaBoxForm,
  sanitizeIdeaBoxValues,
  hasErrors,
  type IdeaBoxFormValues,
  type ContactMode,
} from "@/lib/idea-box-validation";

// --- Best-effort rate limiting -------------------------------------------
// In-memory only: it lives in this Node process's RAM and resets on every
// deploy/restart, and gives no protection at all if the app ever runs as
// multiple instances (each would have its own independent counter). This
// is NOT a real anti-abuse guarantee — it only slows down a casual retry
// loop from a single visitor. The honeypot field and the strict server-side
// validation below are the actual defenses; this is a cheap extra layer
// that costs nothing to keep, not something to rely on alone. The IP is
// only ever held in this in-memory map (never logged, never emailed, never
// persisted to disk) purely to count recent requests.
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

// --- Request body shape (untrusted input) ----------------------------------
type RawBody = {
  category?: unknown;
  title?: unknown;
  idea?: unknown;
  contactMode?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  consent?: unknown;
  // Honeypot: a real visitor never fills this (it's visually hidden).
  company?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.slice(0, 4000) : "";
}

function asContactMode(value: unknown): ContactMode {
  return value === "contact" ? "contact" : "anonymous";
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

  const rawValues: IdeaBoxFormValues = {
    category: asString(body.category),
    title: asString(body.title),
    idea: asString(body.idea),
    contactMode: asContactMode(body.contactMode),
    firstName: asString(body.firstName),
    lastName: asString(body.lastName),
    email: asString(body.email),
    phone: asString(body.phone),
    consent: body.consent === true,
  };

  // Authoritative: never trust the client's declared mode alone. Any
  // contact field sent alongside "anonymous" is dropped here, before any
  // validation or e-mail construction ever sees it.
  const values = sanitizeIdeaBoxValues(rawValues);

  const fieldErrors = validateIdeaBoxForm(values);
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
  const toEmail = process.env.IDEAS_RECIPIENT_EMAIL;
  if (!apiKey || !fromEmail || !toEmail) {
    // No secret/config detail is ever sent to the browser.
    console.error(
      "boite-a-idees: missing Resend configuration (RESEND_API_KEY / RESEND_FROM_EMAIL / IDEAS_RECIPIENT_EMAIL)"
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

  const categoryLabel =
    IDEA_CATEGORY_OPTIONS.find((o) => o.value === values.category)?.label ??
    "Catégorie non précisée";
  const title = values.title.replace(/\s+/g, " ").trim();
  const idea = values.idea.replace(/\s+/g, " ").trim();
  const receivedAt = new Date().toLocaleString("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  });

  const rows: { label: string; value: string }[] = [
    { label: "Catégorie", value: categoryLabel },
    { label: "Titre", value: title },
    { label: "Idée", value: idea },
  ];

  let replyTo: string | undefined;
  if (values.contactMode === "contact") {
    const firstName = values.firstName.replace(/\s+/g, " ").trim();
    const lastName = values.lastName.replace(/\s+/g, " ").trim();
    const email = values.email.replace(/\s+/g, " ").trim();
    const phone = values.phone.replace(/\s+/g, " ").trim();
    rows.push({ label: "Mode", value: "Avec coordonnées" });
    rows.push({ label: "Prénom", value: firstName });
    rows.push({ label: "Nom", value: lastName });
    rows.push({ label: "E-mail", value: email });
    if (phone) rows.push({ label: "Téléphone", value: phone });
    replyTo = email;
  } else {
    rows.push({ label: "Mode", value: "Anonyme" });
  }
  rows.push({ label: "Reçu le", value: receivedAt });

  const textBody = rows.map((r) => `${r.label} : ${r.value}`).join("\n");
  const htmlBody = `
    <div style="font-family: sans-serif; color: #0f243d;">
      <h1 style="font-size: 18px;">Nouvelle idée</h1>
      <table style="border-collapse: collapse;">
        ${rows
          .map(
            (r) => `
          <tr>
            <td style="padding: 4px 12px 4px 0; font-weight: bold; vertical-align: top; white-space: nowrap;">${escapeHtml(r.label)}</td>
            <td style="padding: 4px 0; white-space: pre-wrap;">${escapeHtml(r.value)}</td>
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
      ...(replyTo ? { replyTo } : {}),
      subject: `Nouvelle idée — ${categoryLabel}`,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      // Log only the error type/message from the provider — never the
      // submitted content (title, idea, contact details…).
      console.error("boite-a-idees: Resend error", error.message);
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
      "boite-a-idees: unexpected send failure",
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
