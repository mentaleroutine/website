import { Resend } from "resend";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize, validEmail, clamp } from "@/lib/validate";

const resend = new Resend(process.env.RESEND_API_KEY);

// Taal end-to-end (besluit 10-11-2026, portal-repo docs/PRO_PROGRAM_NL_EN_AANVRAGEN_PLAN.md §3):
// de pagina stuurt `lang` mee → bevestiging in die taal, en het aanvraagrecord in de portal draagt hem.
type Lang = "nl" | "en";
const asLang = (v: unknown): Lang => (v === "nl" ? "nl" : "en");

// Eén regel, geen opmaak: de naam komt in de aanhef van een mail en in een onderwerpregel.
const oneLine = (s: string) => s.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
const firstName = (full: string) => oneLine(full).split(" ")[0] || oneLine(full);

const CONFIRM: Record<Lang, (name: string) => { subject: string; text: string }> = {
  en: (name) => ({
    subject: "Your Pro Program application has been received",
    text: `Hi ${name},

Thanks for applying to the MentalRoutine Pro Program. We've received your application and review every one personally, usually within 1-3 business days. You'll get an email either way.

Once you're approved, you create your free portal account with this email address (or log in if you already have one), confirm your email address and PRO Admin opens for you. There you start your own free MentalRoutine Assessment ($79 value) and you find the clinic and communication kits, your personal discount code ($20 off for your students) and the lesson program generator.

Questions? Just reply to this email.

The MentalRoutine Team
mentalroutine.com`,
  }),
  nl: (name) => ({
    subject: "Je aanvraag voor het Pro-programma is ontvangen",
    text: `Hoi ${name},

Bedankt voor je aanvraag voor het MentalRoutine Pro-programma. We hebben hem ontvangen en bekijken elke aanvraag persoonlijk, meestal binnen 1-3 werkdagen. Je krijgt hoe dan ook een mail.

Zodra je bent toegelaten, maak je je gratis portal-account aan met dit e-mailadres (of je logt in als je er al een hebt), bevestig je je e-mailadres en gaat PRO Admin voor je open. Daar start je je eigen gratis MentalRoutine Assessment (t.w.v. $79) en vind je het clinic- en communicatiepakket, je persoonlijke kortingscode ($20 korting voor je leerlingen) en de lesprogramma-generator.

Vragen? Beantwoord gewoon deze mail.

Het MentalRoutine-team
mentalroutine.com`,
  }),
};

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (!rateLimit(ip, "pro-program")) {
      return NextResponse.json({ error: "Too many requests", code: "rate_limit" }, { status: 429 });
    }

    const raw = await req.json();
    const lang = asLang(raw.lang);

    // Lokvak: mensen zien dit veld niet, een script vult het in. Dan doen we alsof het gelukt is.
    if (typeof raw.pp_check === "string" && raw.pp_check.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const data = {
      fullName: oneLine(clamp(sanitize(raw.fullName), 100)),
      email: clamp(sanitize(raw.email), 254).trim().toLowerCase(),
      pgaNumber: oneLine(clamp(sanitize(raw.pgaNumber ?? ""), 50)),
      pgaDivision: oneLine(clamp(sanitize(raw.pgaDivision ?? ""), 100)),
      linkedIn: oneLine(clamp(sanitize(raw.linkedIn ?? ""), 200)),          // optioneel sinds 10-11-2026
      country: oneLine(clamp(sanitize(raw.country ?? ""), 100)),
      facility: oneLine(clamp(sanitize(raw.facility ?? ""), 200)),
      activeStudents: oneLine(clamp(sanitize(raw.activeStudents ?? ""), 50)),
      groupLessons: oneLine(clamp(sanitize(raw.groupLessons ?? ""), 50)),
      mentalExperience: oneLine(clamp(sanitize(raw.mentalExperience ?? ""), 500)),
      howFound: oneLine(clamp(sanitize(raw.howFound ?? ""), 200)),
    };

    // Dezelfde verplichte velden als het formulier (LinkedIn is het enige optionele veld).
    if (!data.fullName || !data.email || !data.pgaNumber || !data.pgaDivision || !data.country || !data.facility
        || !data.activeStudents || !data.groupLessons || !data.mentalExperience || !data.howFound) {
      return NextResponse.json({ error: "Missing required fields", code: "missing_fields" }, { status: 400 });
    }
    if (!validEmail(data.email)) {
      return NextResponse.json({ error: "Invalid email", code: "invalid_email" }, { status: 400 });
    }

    // 1. Het aanvraagrecord in de portal: DAT is de aanvraag (de beheerder keurt daar goed of wijst af, en bij
    //    goedkeuren zonder account activeert de portal de pro op dit e-mailadres). Eerst dit, zodat de mail aan
    //    support kan zeggen of het record er is. (Was andersom: de mail verwees naar een record dat er bij een
    //    storing niet was, en niemand merkte het.)
    let portalOk = false;
    let portalNote = "niet geprobeerd";
    const portal = process.env.PORTAL_API_URL;
    const secret = process.env.PRO_APPLICATION_SECRET;
    if (portal && secret) {
      try {
        const r = await fetch(`${portal.replace(/\/$/, "")}/api/public/pro-aanvraag`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Pro-Application-Key": secret },
          body: JSON.stringify({
            full_name: data.fullName, email: data.email, language: lang,
            pga_number: data.pgaNumber, pga_division: data.pgaDivision, linkedin: data.linkedIn || null,
            country: data.country, facility: data.facility, active_students: data.activeStudents,
            group_lessons: data.groupLessons, mental_experience: data.mentalExperience, how_found: data.howFound,
          }),
        });
        portalOk = r.ok;
        portalNote = r.ok ? "aangemaakt" : `MISLUKT (status ${r.status})`;
        if (!r.ok) console.error("[pro-program] Portal record failed:", r.status, await r.text().catch(() => ""));
      } catch (err) {
        portalNote = "MISLUKT (portal onbereikbaar)";
        console.error("[pro-program] Portal record failed:", err);
      }
    } else {
      portalNote = "MISLUKT (PORTAL_API_URL / PRO_APPLICATION_SECRET niet ingesteld)";
      console.warn("[pro-program] PORTAL_API_URL / PRO_APPLICATION_SECRET not set");
    }

    // 2. Het seintje aan support, met de stand van het record erbij.
    let supportOk = false;
    try {
      const lead = await resend.emails.send({
        from: "MentalRoutine <contact@mentalroutine.com>",
        to: "support@mentalroutine.com",
        replyTo: data.email,
        subject: `${portalOk ? "" : "LET OP, GEEN PORTAL-RECORD — "}Pro Program inquiry (${lang.toUpperCase()}): ${data.fullName}`,
        text: [
          portalOk
            ? "Record in de portal: aangemaakt. Goedkeuren/afwijzen: portal.mentalroutine.com → User Admin → Pro-aanvragen."
            : `Record in de portal: ${portalNote}. Deze aanvraag staat NIET in User Admin. Activeer de pro handmatig (User Admin → Pro activeren) of laat de aanvraag opnieuw indienen.`,
          "",
          `Taal: ${lang.toUpperCase()}`,
          `Name: ${data.fullName}`,
          `Email: ${data.email}`,
          `PGA Number: ${data.pgaNumber}`,
          `PGA Division: ${data.pgaDivision}`,
          data.linkedIn ? `LinkedIn: ${data.linkedIn}` : null,
          `Country: ${data.country}`,
          `Facility: ${data.facility}`,
          `Active Students: ${data.activeStudents}`,
          `Group Lessons: ${data.groupLessons}`,
          `Mental Training Experience: ${data.mentalExperience}`,
          `How Found: ${data.howFound}`,
        ]
          .filter((l) => l !== null)
          .join("\n"),
      });
      supportOk = !lead.error;
      if (lead.error) console.error("[pro-program] Support notification failed:", lead.error.message);
    } catch (err) {
      console.error("[pro-program] Support notification failed:", err);
    }

    // Alleen als de aanvraag NERGENS is aangekomen krijgt de aanvrager een foutmelding. Eén van de twee is genoeg.
    if (!portalOk && !supportOk) {
      return NextResponse.json({ error: "Failed to process inquiry", code: "server" }, { status: 500 });
    }

    // 3. Bevestiging aan de aanvrager, in de taal van de pagina. Best effort, maar een weigering wordt gelogd
    //    (Resend gooit geen fout bij een geweigerde mail; het antwoord bevat dan `error`).
    try {
      const m = CONFIRM[lang](firstName(data.fullName));
      const c = await resend.emails.send({
        from: "MentalRoutine <contact@mentalroutine.com>",
        replyTo: "support@mentalroutine.com",
        to: data.email,
        subject: m.subject,
        text: m.text,
      });
      if (c.error) console.error("[pro-program] Confirmation to applicant refused:", c.error.message);
    } catch (err) {
      console.error("[pro-program] Confirmation to applicant failed (application itself was received):", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[pro-program] Failed to process inquiry:", err);
    return NextResponse.json({ error: "Failed to process inquiry", code: "server" }, { status: 500 });
  }
}
