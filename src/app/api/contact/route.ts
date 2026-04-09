import { Resend } from "resend";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (!rateLimit(ip, "contact")) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

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
  } catch (err) {
    console.error("[contact] Failed to send message:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
