import { Resend } from "resend";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize, validEmail, clamp } from "@/lib/validate";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = "8e40ab7a-eab7-470d-943f-03a312e98ebc";

// Early access pricing — keep in sync with EA_PRICE_STD/MST in page.tsx
const EA_STD = 49;   // Foundation early access
const EA_MST = 69;   // Mastery upgrade early access
const REG_STD = 59;  // Foundation regular
const REG_MST = 89;  // Mastery upgrade regular

type Lang = "en" | "nl" | "de" | "fr" | "es";

function confirmationEmail(name: string, lang: Lang) {
  const emails: Record<Lang, { subject: string; body: string }> = {
    en: {
      subject: "You're on the Early Access list — your discount code is coming on July 1st",
      body: `Hi ${name},

Thanks for signing up! MentalRoutine Foundation launches on July 1st.

On July 1st you'll receive a personal discount code by email. Here's what to expect:

  MentalRoutine Foundation: $${EA_STD} (instead of $${REG_STD}) + 2 extra training reports
  MentalRoutine Mastery upgrade: $${EA_MST} (instead of $${REG_MST}) — only available after completing Foundation

Your code will be valid for 7 days after launch.

In the meantime — keep enjoying the game.

The MentalRoutine Team
www.mentalroutine.com`,
    },
    nl: {
      subject: "Je staat op de Early Access lijst — je kortingscode komt op 1 juli",
      body: `Hoi ${name},

Bedankt voor je aanmelding! MentalRoutine Foundation lanceert op 1 juli.

Op 1 juli ontvang je een persoonlijke kortingscode per email. Dit zijn de prijzen:

  MentalRoutine Foundation: $${EA_STD} (i.p.v. $${REG_STD}) + 2 extra trainingsrapporten
  MentalRoutine Mastery upgrade: $${EA_MST} (i.p.v. $${REG_MST}) — alleen beschikbaar na Foundation

Je code is 7 dagen geldig na de lancering.

In de tussentijd — veel plezier op de baan.

Het MentalRoutine Team
www.mentalroutine.com`,
    },
    de: {
      subject: "Du stehst auf der Early Access Liste — dein Rabattcode kommt am 1. Juli",
      body: `Hallo ${name},

Danke für deine Anmeldung! MentalRoutine Foundation startet am 1. Juli.

Am 1. Juli erhältst du einen persönlichen Rabattcode per E-Mail. Die Preise im Überblick:

  MentalRoutine Foundation: $${EA_STD} (statt $${REG_STD}) + 2 extra Trainingsberichte
  MentalRoutine Mastery Upgrade: $${EA_MST} (statt $${REG_MST}) — nur nach Foundation verfügbar

Dein Code ist 7 Tage nach dem Launch gültig.

In der Zwischenzeit — viel Spaß auf dem Platz.

Das MentalRoutine Team
www.mentalroutine.com`,
    },
    fr: {
      subject: "Vous êtes sur la liste Early Access — votre code de réduction arrive le 1er juillet",
      body: `Bonjour ${name},

Merci pour votre inscription ! MentalRoutine Foundation sera lancé le 1er juillet.

Le 1er juillet vous recevrez un code de réduction personnel par email. Voici les tarifs :

  MentalRoutine Foundation : $${EA_STD} (au lieu de $${REG_STD}) + 2 rapports d'entraînement supplémentaires
  Upgrade MentalRoutine Mastery : $${EA_MST} (au lieu de $${REG_MST}) — uniquement disponible après Foundation

Votre code sera valable 7 jours après le lancement.

En attendant — profitez du parcours.

L'équipe MentalRoutine
www.mentalroutine.com`,
    },
    es: {
      subject: "¡Estás en la lista Early Access — tu código de descuento llega el 1 de julio!",
      body: `Hola ${name},

¡Gracias por registrarte! MentalRoutine Foundation se lanza el 1 de julio.

El 1 de julio recibirás un código de descuento personal por email. Estos son los precios:

  MentalRoutine Foundation: $${EA_STD} (en lugar de $${REG_STD}) + 2 informes de entrenamiento adicionales
  Upgrade MentalRoutine Mastery: $${EA_MST} (en lugar de $${REG_MST}) — solo disponible después de Foundation

Tu código será válido durante 7 días tras el lanzamiento.

Mientras tanto — disfruta del campo.

El equipo MentalRoutine
www.mentalroutine.com`,
    },
  };

  return emails[lang] ?? emails.en;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (!rateLimit(ip, "early-access")) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const raw = await req.json();
    const name = clamp(sanitize(raw.name), 100);
    const email = clamp(sanitize(raw.email), 254);
    const handicap = clamp(sanitize(raw.handicap ?? ""), 20);
    const plan = raw.plan === "foundation" ? "foundation" : "mastery";
    const lang = raw.lang;
    const utm = typeof raw.utm === "object" && raw.utm !== null ? raw.utm : {};

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!validEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const planLabel = plan === "foundation" ? `Foundation ($${EA_STD})` : `Mastery upgrade ($${EA_MST})`;
    const emailLang: Lang = ["en", "nl", "de", "fr", "es"].includes(lang) ? lang : "en";
    const confirmation = confirmationEmail(name, emailLang);

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
          `Language: ${emailLang}`,
          handicap ? `Golf Handicap: ${handicap}` : null,
          utm && Object.keys(utm).length > 0 ? `\nTraffic source:\n${Object.entries(utm).map(([k, v]) => `  ${k}: ${v}`).join("\n")}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
      resend.emails.send({
        from: "MentalRoutine <contact@mentalroutine.com>",
        replyTo: "support@mentalroutine.com",
        to: email,
        subject: confirmation.subject,
        text: confirmation.body,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[early-access] Failed to process signup:", err);
    return NextResponse.json({ error: "Failed to process signup" }, { status: 500 });
  }
}
