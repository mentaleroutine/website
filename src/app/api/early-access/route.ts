import { Resend } from "resend";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize, validEmail, clamp } from "@/lib/validate";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = "8e40ab7a-eab7-470d-943f-03a312e98ebc";

// Assessment pricing. One product now (was Foundation/Mastery). Early-access
// discount price vs. regular price. NB: the early-access signup form is no longer
// rendered on the site; these emails only fire if the API route is triggered.
const EA_STD = 59;   // assessment early-access price
const REG_STD = 79;  // assessment regular price

type Lang = "en" | "nl" | "de" | "fr" | "es";

function confirmationEmail(name: string, lang: Lang) {
  const emails: Record<Lang, { subject: string; body: string }> = {
    en: {
      subject: "You're on the Early Access list — your discount code is coming on launch day",
      body: `Hi ${name},

Thanks for signing up! The MentalRoutine Assessment is launching soon.

On launch day you'll receive a personal discount code by email. Here's what to expect:

  The MentalRoutine Assessment: $${EA_STD} (instead of $${REG_STD}) + extra training reports
  Your complete player profile + three training reports of your choice from twelve

Your code will be valid for 7 days after launch.

In the meantime — keep enjoying the game.

The MentalRoutine Team
mentalroutine.com`,
    },
    nl: {
      subject: "Je staat op de Early Access lijst — je kortingscode komt op de lanceerdag",
      body: `Hoi ${name},

Bedankt voor je aanmelding! De MentalRoutine Assessment lanceert binnenkort.

Op de lanceerdag ontvang je een persoonlijke kortingscode per email. Dit zijn de prijzen:

  De MentalRoutine Assessment: $${EA_STD} (i.p.v. $${REG_STD}) + extra trainingsrapporten
  Je complete spelersprofiel + drie trainingsrapporten naar keuze uit twaalf

Je code is 7 dagen geldig na de lancering.

In de tussentijd — veel plezier op de baan.

Het MentalRoutine Team
mentalroutine.com`,
    },
    de: {
      subject: "Du stehst auf der Early Access Liste — dein Rabattcode kommt am Launch-Tag",
      body: `Hallo ${name},

Danke für deine Anmeldung! Die MentalRoutine Assessment startet bald.

Am Launch-Tag erhältst du einen persönlichen Rabattcode per E-Mail. Die Preise im Überblick:

  Die MentalRoutine Assessment: $${EA_STD} (statt $${REG_STD}) + zusätzliche Trainingsberichte
  Dein komplettes Spielerprofil + drei Trainingsberichte deiner Wahl aus zwölf

Dein Code ist 7 Tage nach dem Launch gültig.

In der Zwischenzeit — viel Spaß auf dem Platz.

Das MentalRoutine Team
mentalroutine.com`,
    },
    fr: {
      subject: "Vous êtes sur la liste Early Access — votre code de réduction arrive le jour du lancement",
      body: `Bonjour ${name},

Merci pour votre inscription ! La MentalRoutine Assessment sera lancée prochainement.

Le jour du lancement vous recevrez un code de réduction personnel par email. Voici les tarifs :

  La MentalRoutine Assessment : $${EA_STD} (au lieu de $${REG_STD}) + des rapports d'entraînement supplémentaires
  Votre profil de joueur complet + trois rapports d'entraînement de votre choix parmi douze

Votre code sera valable 7 jours après le lancement.

En attendant — profitez du parcours.

L'équipe MentalRoutine
mentalroutine.com`,
    },
    es: {
      subject: "¡Estás en la lista Early Access — tu código de descuento llega el día del lanzamiento!",
      body: `Hola ${name},

¡Gracias por registrarte! La MentalRoutine Assessment se lanza pronto.

El día del lanzamiento recibirás un código de descuento personal por email. Estos son los precios:

  La MentalRoutine Assessment: $${EA_STD} (en lugar de $${REG_STD}) + informes de entrenamiento adicionales
  Tu perfil de jugador completo + tres informes de entrenamiento a tu elección de doce

Tu código será válido durante 7 días tras el lanzamiento.

Mientras tanto — disfruta del campo.

El equipo MentalRoutine
mentalroutine.com`,
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

    const planLabel = `Assessment ($${EA_STD} early access)`;
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
