import { Resend } from "resend";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize, validEmail, clamp } from "@/lib/validate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (!rateLimit(ip, "pro-program")) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const raw = await req.json();
    const data = {
      fullName: clamp(sanitize(raw.fullName), 100),
      email: clamp(sanitize(raw.email), 254),
      pgaNumber: clamp(sanitize(raw.pgaNumber ?? ""), 50),
      pgaDivision: clamp(sanitize(raw.pgaDivision ?? ""), 100),
      linkedIn: clamp(sanitize(raw.linkedIn ?? ""), 200),
      country: clamp(sanitize(raw.country ?? ""), 100),
      facility: clamp(sanitize(raw.facility ?? ""), 200),
      activeStudents: clamp(sanitize(raw.activeStudents ?? ""), 50),
      groupLessons: clamp(sanitize(raw.groupLessons ?? ""), 50),
      mentalExperience: clamp(sanitize(raw.mentalExperience ?? ""), 500),
      howFound: clamp(sanitize(raw.howFound ?? ""), 200),
    };

    if (!data.fullName || !data.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!validEmail(data.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Support first: that mail IS the application (nothing is stored elsewhere). Only when it
    // went out do we confirm to the applicant — best effort, a failed confirmation must not make
    // the applicant retry and send support a duplicate.
    const lead = await resend.emails.send({
      from: "MentalRoutine <contact@mentalroutine.com>",
      to: "support@mentalroutine.com",
      replyTo: data.email,
      subject: `Pro Program inquiry: ${data.fullName}`,
      text: [
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
      ]
        .filter(Boolean)
        .join("\n"),
    });
    if (lead.error) {
      throw new Error(`support notification failed: ${lead.error.message}`);
    }
    try {
      await resend.emails.send({
        from: "MentalRoutine <contact@mentalroutine.com>",
        replyTo: "support@mentalroutine.com",
        to: data.email,
        subject: "Your Pro Program application has been received!",
        text: `Hi ${data.fullName},

Thanks for applying to the MentalRoutine Pro Program! We've received your application and review every one personally, usually within 1-3 business days.

Here's what happens next:

  1. Now — Create your free portal account with this email address (${data.email}):
     https://portal.mentalroutine.com/en/registreer
     That's the account we unlock for you.
  2. Within 1-3 business days — We review your application and verify your PGA details.
  3. Once approved — You get an email from the portal. PRO Admin is then open: your free
     MentalRoutine Assessment ($79 value), the clinic and communication kits, your personal
     discount code ($20 off for your students) and the lesson program generator.

Questions? Just reply to this email.

We look forward to working with you.

The MentalRoutine Team
www.mentalroutine.com`,
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
