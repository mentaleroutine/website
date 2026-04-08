import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = "8e40ab7a-eab7-470d-943f-03a312e98ebc";

export async function POST(req: Request) {
  try {
    const { name, email, handicap } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Add contact to Resend Audience
    await resend.contacts.create({
      audienceId: AUDIENCE_ID,
      email,
      firstName: name,
      unsubscribed: false,
    });

    // Notification to support
    await resend.emails.send({
      from: "MentalRoutine <contact@mentalroutine.com>",
      to: "support@mentalroutine.com",
      subject: `Early Access signup: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        handicap ? `Golf Handicap: ${handicap}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // Confirmation email to the subscriber
    await resend.emails.send({
      from: "MentalRoutine <contact@mentalroutine.com>",
      replyTo: "support@mentalroutine.com",
      to: email,
      subject: "You're on the Early Access list!",
      text: `Hi ${name},

Thanks for signing up! We're currently in a closed Beta with 100+ golfers, fine-tuning everything for our international launch on May 15th. You'll be the first to know when we go live.

In the meantime — keep enjoying the game.

The MentalRoutine Team
www.mentalroutine.com`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to process signup" }, { status: 500 });
  }
}
