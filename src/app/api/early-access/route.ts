import { Resend } from "resend";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize, validEmail, clamp } from "@/lib/validate";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = "8e40ab7a-eab7-470d-943f-03a312e98ebc";

// Early access pricing — keep in sync with EA_PRICE_STD/DLX in page.tsx
const EA_STD = 49;
const EA_DLX = 99;
const REG_STD = 59;
const REG_DLX = 129;

type Lang = "en" | "nl" | "de" | "fr" | "es";

function confirmationEmail(name: string, lang: Lang) {
  const emails: Record<Lang, { subject: string; body: string }> = {
    en: {
      subject: "You're on the Early Access list — your early-bird price is locked in!",
      body: `Hi ${name},

Thanks for signing up! We're currently in a closed Beta with 100+ golfers, fine-tuning everything for our international pre-launch on May 15th.

Your exclusive Early Access pricing is locked in:

  Standard: $${EA_STD} (instead of $${REG_STD}) + 2 extra training reports
  Deluxe:   $${EA_DLX} (instead of $${REG_DLX}) + 2 extra training reports

This offer is only available until June 1st.

Here's what happens next:

  1. Today — You're on the early access list
  2. May 15th — You receive a personal link by email
  3. 15 minutes — Complete the assessment on any device
  4. Instantly — Download your PDF report + training reports

Official launch and regular pricing from June 1st.

In the meantime — keep enjoying the game.

The MentalRoutine Team
www.mentalroutine.com`,
    },
    nl: {
      subject: "Je staat op de Early Access lijst — je early-bird prijs is vastgelegd!",
      body: `Hoi ${name},

Bedankt voor je aanmelding! We zitten momenteel in een gesloten Beta met 100+ golfers, en finetunen alles voor onze internationale pre-launch op 15 mei.

Je exclusieve Early Access prijs is vastgelegd:

  Standaard: $${EA_STD} (i.p.v. $${REG_STD}) + 2 extra trainingsrapporten
  Deluxe:    $${EA_DLX} (i.p.v. $${REG_DLX}) + 2 extra trainingsrapporten

Dit aanbod is alleen beschikbaar tot 1 juni.

Dit is wat er nu gebeurt:

  1. Vandaag — Je staat op de early access lijst
  2. 15 mei — Je ontvangt een persoonlijke link per email
  3. 15 minuten — Vul de assessment in op elk apparaat
  4. Direct — Download je PDF-rapport + trainingsrapporten

Officiële lancering en reguliere prijzen vanaf 1 juni.

In de tussentijd — veel plezier op de baan.

Het MentalRoutine Team
www.mentalroutine.com`,
    },
    de: {
      subject: "Du stehst auf der Early Access Liste — dein Frühbucher-Preis ist gesichert!",
      body: `Hallo ${name},

Danke für deine Anmeldung! Wir befinden uns derzeit in einer geschlossenen Beta mit 100+ Golfern und optimieren alles für unseren internationalen Pre-Launch am 15. Mai.

Dein exklusiver Early Access Preis ist gesichert:

  Standard: $${EA_STD} (statt $${REG_STD}) + 2 extra Trainingsberichte
  Deluxe:   $${EA_DLX} (statt $${REG_DLX}) + 2 extra Trainingsberichte

Dieses Angebot gilt nur bis zum 1. Juni.

So geht es weiter:

  1. Heute — Du stehst auf der Early Access Liste
  2. 15. Mai — Du erhältst einen persönlichen Link per E-Mail
  3. 15 Minuten — Fülle das Assessment auf jedem Gerät aus
  4. Sofort — Lade deinen PDF-Bericht + Trainingsberichte herunter

Offizieller Launch und reguläre Preise ab 1. Juni.

In der Zwischenzeit — viel Spaß auf dem Platz.

Das MentalRoutine Team
www.mentalroutine.com`,
    },
    fr: {
      subject: "Vous êtes sur la liste Early Access — votre tarif early-bird est verrouillé !",
      body: `Bonjour ${name},

Merci pour votre inscription ! Nous sommes actuellement en Bêta fermée avec 100+ golfeurs, peaufinant tout pour notre pré-lancement international le 15 mai.

Votre tarif Early Access exclusif est verrouillé :

  Standard : $${EA_STD} (au lieu de $${REG_STD}) + 2 rapports d'entraînement supplémentaires
  Deluxe :   $${EA_DLX} (au lieu de $${REG_DLX}) + 2 rapports d'entraînement supplémentaires

Cette offre n'est disponible que jusqu'au 1er juin.

Voici la suite :

  1. Aujourd'hui — Vous êtes sur la liste Early Access
  2. 15 mai — Vous recevez un lien personnel par email
  3. 15 minutes — Complétez l'évaluation sur n'importe quel appareil
  4. Immédiatement — Téléchargez votre rapport PDF + rapports d'entraînement

Lancement officiel et tarifs réguliers à partir du 1er juin.

En attendant — profitez du parcours.

L'équipe MentalRoutine
www.mentalroutine.com`,
    },
    es: {
      subject: "¡Estás en la lista Early Access — tu precio early-bird está asegurado!",
      body: `Hola ${name},

¡Gracias por registrarte! Actualmente estamos en una Beta cerrada con 100+ golfistas, perfeccionando todo para nuestro pre-lanzamiento internacional el 15 de mayo.

Tu precio exclusivo de Early Access está asegurado:

  Estándar: $${EA_STD} (en lugar de $${REG_STD}) + 2 informes de entrenamiento adicionales
  Deluxe:   $${EA_DLX} (en lugar de $${REG_DLX}) + 2 informes de entrenamiento adicionales

Esta oferta solo está disponible hasta el 1 de junio.

Esto es lo que sigue:

  1. Hoy — Estás en la lista de Early Access
  2. 15 de mayo — Recibes un enlace personal por email
  3. 15 minutos — Completa la evaluación en cualquier dispositivo
  4. Al instante — Descarga tu informe PDF + informes de entrenamiento

Lanzamiento oficial y precios regulares a partir del 1 de junio.

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
    const plan = raw.plan === "standard" ? "standard" : "deluxe";
    const lang = raw.lang;
    const utm = typeof raw.utm === "object" && raw.utm !== null ? raw.utm : {};

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!validEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const planLabel = plan === "standard" ? `Standard ($${EA_STD})` : `Deluxe ($${EA_DLX})`;
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
