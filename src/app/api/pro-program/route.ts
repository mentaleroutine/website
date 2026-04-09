import { Resend } from "resend";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (!rateLimit(ip, "pro-program")) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const data = await req.json();

    if (!data.fullName || !data.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send notification to support + confirmation to applicant in parallel
    await Promise.all([
      resend.emails.send({
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
      }),
      resend.emails.send({
        from: "MentalRoutine <contact@mentalroutine.com>",
        replyTo: "support@mentalroutine.com",
        to: data.email,
        subject: "Your Pro Program application has been received!",
        text: `Hi ${data.fullName},

Thanks for applying to the MentalRoutine Pro Program! We've received your application and will review it shortly — usually within the same business day.

Here's what happens next:

  1. Today — Your application is in our queue
  2. Within 24 hours — We verify your details and activate your account
  3. Once approved — You receive your free Deluxe Assessment ($129 value) and personal affiliate code

In the meantime, if you have any questions, just reply to this email.

We look forward to working with you.

The MentalRoutine Team
www.mentalroutine.com`,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[pro-program] Failed to process inquiry:", err);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}
