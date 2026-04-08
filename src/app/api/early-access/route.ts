import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = "8e40ab7a-eab7-470d-943f-03a312e98ebc";

export async function POST(req: Request) {
  try {
    const { name, email, handicap, plan } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const planLabel = plan === "standard" ? "Standard ($49)" : "Deluxe ($99)";

    // Add contact to Resend Audience
    await resend.contacts.create({
      audienceId: AUDIENCE_ID,
      email,
      firstName: name,
      unsubscribed: false,
    });

    // Send notification + confirmation emails in parallel
    await Promise.all([
      resend.emails.send({
        from: "MentalRoutine <contact@mentalroutine.com>",
        to: "support@mentalroutine.com",
        subject: `Early Access signup: ${name} — ${planLabel}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Plan preference: ${planLabel}`,
          handicap ? `Golf Handicap: ${handicap}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
      resend.emails.send({
        from: "MentalRoutine <contact@mentalroutine.com>",
        replyTo: "support@mentalroutine.com",
        to: email,
        subject: "You're on the Early Access list — your early-bird price is locked in!",
        text: `Hi ${name},

Thanks for signing up! We're currently in a closed Beta with 100+ golfers, fine-tuning everything for our international launch on May 15th.

Your exclusive Early Access pricing is locked in:

  Standard: $49 (instead of $59) + 2 extra training reports
  Deluxe:   $99 (instead of $129) + 2 extra training reports

This offer is only available until June 1st. On May 15th, we'll send you a personal link to get started.

In the meantime — keep enjoying the game.

The MentalRoutine Team
www.mentalroutine.com`,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to process signup" }, { status: 500 });
  }
}
