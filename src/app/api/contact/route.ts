import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, handicap, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "MentalRoutine Contact <contact@mentalroutine.com>",
      to: "support@mentalroutine.com",
      replyTo: email,
      subject: `Contact form: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        handicap ? `Golf Handicap: ${handicap}` : null,
        ``,
        `Message:`,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
