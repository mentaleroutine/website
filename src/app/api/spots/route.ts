import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

const TOTAL_SPOTS = 500;
const FAKE_OFFSET = 338;  // pretend 338 spots are already taken at launch
const AUDIENCE_ID = "8e40ab7a-eab7-470d-943f-03a312e98ebc";

export async function GET(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (!rateLimit(ip, "spots")) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Fetch contacts from Resend audience to get the real count
    const res = await fetch(
      `https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`,
      { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` }, next: { revalidate: 30 } }
    );

    if (!res.ok) {
      console.error("[spots] Resend API error:", res.status, res.statusText);
      // Fallback: return a reasonable default if API fails
      return NextResponse.json({ spots: TOTAL_SPOTS, total: TOTAL_SPOTS });
    }

    const data = await res.json();
    const contactCount = Array.isArray(data?.data) ? data.data.length : 0;
    const spotsLeft = Math.max(0, TOTAL_SPOTS - FAKE_OFFSET - contactCount);

    return NextResponse.json({ spots: spotsLeft, total: TOTAL_SPOTS });
  } catch (err) {
    console.error("[spots] Failed to fetch spots:", err);
    return NextResponse.json({ spots: TOTAL_SPOTS, total: TOTAL_SPOTS });
  }
}
