import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.fullName || !data.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
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

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}
