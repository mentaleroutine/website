import { Resend } from "resend";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize, validEmail, clamp } from "@/lib/validate";

const resend = new Resend(process.env.RESEND_API_KEY);

// Taal end-to-end (besluit 10-11-2026, portal-repo docs/PRO_PROGRAM_NL_EN_AANVRAGEN_PLAN.md §3):
// de pagina stuurt `lang` mee → bevestiging in die taal, en het aanvraagrecord in de portal draagt hem.
type Lang = "nl" | "en";
const asLang = (v: unknown): Lang => (v === "nl" ? "nl" : "en");

const CONFIRM: Record<Lang, (name: string) => { subject: string; text: string }> = {
  en: (name) => ({
    subject: "Your Pro Program application has been received",
    text: `Hi ${name},

Thanks for applying to the MentalRoutine Pro Program. We've received your application and review every one personally, usually within 1-3 business days. You'll get an email either way.

Once you're approved, you create your free portal account with this email address (or log in if you already have one) and PRO Admin opens for you: your free MentalRoutine Assessment ($79 value), the clinic and communication kits, your personal discount code ($20 off for your students) and the lesson program generator.

Questions? Just reply to this email.

The MentalRoutine Team
www.mentalroutine.com`,
  }),
  nl: (name) => ({
    subject: "Je aanvraag voor het Pro-programma is ontvangen",
    text: `Hoi ${name},

Bedankt voor je aanvraag voor het MentalRoutine Pro-programma. We hebben hem ontvangen en bekijken elke aanvraag persoonlijk, meestal binnen 1-3 werkdagen. Je krijgt hoe dan ook een mail.

Zodra je bent toegelaten, maak je je gratis portal-account aan met dit e-mailadres (of je logt in als je er al een hebt) en gaat PRO Admin voor je open: je gratis MentalRoutine Assessment (t.w.v. $79), het clinic- en communicatiepakket, je persoonlijke kortingscode ($20 korting voor je leerlingen) en de lesprogramma-generator.

Vragen? Beantwoord gewoon deze mail.

Het MentalRoutine-team
www.mentalroutine.com`,
  }),
};

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (!rateLimit(ip, "pro-program")) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const raw = await req.json();
    const lang = asLang(raw.lang);
    const data = {
      fullName: clamp(sanitize(raw.fullName), 100),
      email: clamp(sanitize(raw.email), 254),
      pgaNumber: clamp(sanitize(raw.pgaNumber ?? ""), 50),
      pgaDivision: clamp(sanitize(raw.pgaDivision ?? ""), 100),
      linkedIn: clamp(sanitize(raw.linkedIn ?? ""), 200),          // optioneel sinds 10-11-2026
      country: clamp(sanitize(raw.country ?? ""), 100),
      facility: clamp(sanitize(raw.facility ?? ""), 200),
      activeStudents: clamp(sanitize(raw.activeStudents ?? ""), 50),
      groupLessons: clamp(sanitize(raw.groupLessons ?? ""), 50),
      mentalExperience: clamp(sanitize(raw.mentalExperience ?? ""), 500),
      howFound: clamp(sanitize(raw.howFound ?? ""), 200),
    };

    // Server-side dezelfde verplichte velden als het formulier (was: alleen naam + e-mail).
    if (!data.fullName || !data.email || !data.pgaNumber || !data.pgaDivision || !data.country || !data.facility) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!validEmail(data.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // 1. Support first: that mail is the signal (and the fallback if the portal is down).
    const lead = await resend.emails.send({
      from: "MentalRoutine <contact@mentalroutine.com>",
      to: "support@mentalroutine.com",
      replyTo: data.email,
      subject: `Pro Program inquiry (${lang.toUpperCase()}): ${data.fullName}`,
      text: [
        `Taal: ${lang.toUpperCase()}`,
        `Name: ${data.fullName}`,
        `Email: ${data.email}`,
        data.pgaNumber ? `PGA Number: ${data.pgaNumber}` : null,
        data.pgaDivision ? `PGA Division: ${data.pgaDivision}` : null,
        data.linkedIn ? `LinkedIn: ${data.linkedIn}` : null,
        data.country ? `Country: ${data.country}` : null,
        data.facility ? `Facility: ${data.facility}` : null,
        data.activeStudents ? `Active Students: ${data.activeStudents}` : null,
        data.groupLessons ? `Group Lessons: ${data.groupLessons}` : null,
        data.mentalExperience ? `Mental Training Experience: ${data.mentalExperience}` : null,
        data.howFound ? `How Found: ${data.howFound}` : null,
        "",
        "Goedkeuren/afwijzen: portal.mentalroutine.com → User Admin → Pro-aanvragen.",
      ]
        .filter((l) => l !== null)
        .join("\n"),
    });
    if (lead.error) {
      throw new Error(`support notification failed: ${lead.error.message}`);
    }

    // 2. The application record in the portal (admin approves/rejects there). Best effort:
    //    the support mail already went out, so a portal hiccup must not fail the applicant.
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
        if (!r.ok) console.error("[pro-program] Portal record failed:", r.status, await r.text().catch(() => ""));
      } catch (err) {
        console.error("[pro-program] Portal record failed (support mail was sent):", err);
      }
    } else {
      console.warn("[pro-program] PORTAL_API_URL / PRO_APPLICATION_SECRET not set — application only mailed to support");
    }

    // 3. Confirmation to the applicant, in the language of the page. Best effort.
    try {
      const m = CONFIRM[lang](data.fullName);
      await resend.emails.send({
        from: "MentalRoutine <contact@mentalroutine.com>",
        replyTo: "support@mentalroutine.com",
        to: data.email,
        subject: m.subject,
        text: m.text,
      });
    } catch (err) {
      console.error("[pro-program] Confirmation to applicant failed (application itself was sent):", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[pro-program] Failed to process inquiry:", err);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}
