/**
 * Privacyverklaring (/privacy) en algemene voorwaarden (/terms, alias /voorwaarden) in NL en EN (15-11-2026).
 *
 * DE NEDERLANDSE TEKST IS LEIDEND en is aangeleverd door de opdrachtgever: inhoudelijk niet wijzigen zonder opdracht.
 * De Engelse tekst is een getrouwe, volledige vertaling (Brits Engels): zelfde structuur, niets erbij, niets eraf.
 * Wijzigt het Nederlands, dan het Engels in dezelfde commit meewijzigen (en de versiedatum in beide).
 * Termen in het Engels gelijk aan de teampagina: team link, payment link, annex for the pro, team question.
 *
 * Vorm: gestructureerde blokken (geen markdown-parser, geen extra dependency). In een tekst mag alleen **vet** staan;
 * de pagina (components/legal-page.tsx) zet dat om en maakt van support@mentalroutine.com een mailto-link.
 * Andere sitetalen (de/fr/es) zien de Engelse tekst.
 */
import type { Lang } from "@/context/lang-context";

export type LegalLang = "nl" | "en";
export type LegalKind = "privacy" | "terms";
export const legalLang = (lang: Lang): LegalLang => (lang === "nl" ? "nl" : "en");

/** Interne link naar een van de twee documenten; de taal gaat mee, zoals bij de andere interne links. */
export const legalHref = (kind: LegalKind, lang: Lang | LegalLang): string => `/${kind}?lang=${lang}`;

/** Korte labels voor links elders op de site (footer, teampagina, pro-program). */
export const LEGAL_LABELS: Record<LegalLang, { privacy: string; terms: string; privacyShort: string; termsShort: string; readPrivacy: string; readTerms: string }> = {
  nl: {
    privacy: "Privacyverklaring", terms: "Algemene voorwaarden", privacyShort: "Privacy", termsShort: "Voorwaarden",
    readPrivacy: "Lees de privacyverklaring", readTerms: "Lees de algemene voorwaarden",
  },
  en: {
    privacy: "Privacy Statement", terms: "Terms and Conditions", privacyShort: "Privacy", termsShort: "Terms",
    readPrivacy: "Read the Privacy Statement", readTerms: "Read the Terms and Conditions",
  },
};

export type LegalBlock =
  | { t: "p"; x: string }
  | { t: "sub"; x: string }                                   // vetgedrukte tussenkop binnen een hoofdstuk
  | { t: "ul"; items: string[] }
  | { t: "table"; id?: string; head: string[]; rows: string[][] };

export type LegalSection = { h: string; blocks: LegalBlock[] };

export type LegalDoc = {
  docTitle: string;            // <title>
  title: string;               // h1
  version: string;
  intro: LegalBlock[];
  sections: LegalSection[];
  closing: string;             // welke taal geldt
  other: string;               // link naar het andere document
  home: string;                // link terug naar de homepage
};

const p = (x: string): LegalBlock => ({ t: "p", x });
const sub = (x: string): LegalBlock => ({ t: "sub", x });
const ul = (...items: string[]): LegalBlock => ({ t: "ul", items });

export const LEGAL_TEXT: Record<LegalKind, Record<LegalLang, LegalDoc>> = {
  // ─────────────────────────────────────────────────────────────────────────────────────────────
  privacy: {
    nl: {
      docTitle: "Privacyverklaring | MentalRoutine",
      title: "Privacyverklaring",
      version: "Versie 15 november 2026",
      intro: [
        p("MentalRoutine is een dienst van **Innerprompt B.V.**, Meerlosebaan 12, 5971 NW Grubbenvorst, Nederland (KvK 42076580). Innerprompt B.V. is verantwoordelijk voor de verwerking van je persoonsgegevens zoals hieronder beschreven. Vragen of verzoeken: **support@mentalroutine.com**."),
        p("Deze verklaring geldt voor de website mentalroutine.com en de portal portal.mentalroutine.com."),
      ],
      sections: [
        { h: "1. In het kort", blocks: [
          ul(
            "We gebruiken je gegevens om het assessment af te nemen, je rapporten te maken en je account te beheren.",
            "Je scores en rapporten zijn van jou. Een golfpro, captain of teamgenoot ziet alleen iets als jij dat zelf aanzet, en je kunt dat weer stoppen.",
            "We verkopen je gegevens niet en gebruiken ze niet voor advertenties.",
            "Je kunt je gegevens inzien, laten verbeteren of laten verwijderen door te mailen naar support@mentalroutine.com.",
          ),
        ] },
        { h: "2. Welke gegevens we verwerken", blocks: [
          sub("Als je een account hebt"),
          ul(
            "Naam, e-mailadres, taal en een versleuteld wachtwoord.",
            "Je geboortedatum, als je die invult.",
            "Je handicap en je antwoorden op de vragenlijst van het assessment, en de scores die daaruit volgen.",
            "De rapporten die voor jou zijn gemaakt (profiel, samenvatting, trainingsrapporten, baanboekje, verschillenrapport, rondeanalyses).",
            "Rondes die je invoert: de baan, je scores per hole en je antwoorden op de vragen bij een ronde.",
            "Punten, tegoeden en wat je in de portal doet (bijvoorbeeld inloggen, een rapport downloaden), met datum, tijd en IP-adres.",
          ),
          sub("Als je iets koopt"),
          ul("De betaling verloopt via Lemon Squeezy, die als verkoper optreedt. Wij ontvangen van Lemon Squeezy je e-mailadres, je naam, wat je hebt gekocht en het bedrag. Je betaalgegevens (zoals je kaartnummer) krijgen wij niet te zien."),
          sub("Als je de gratis QuickScan doet"),
          ul(
            "Je antwoorden en scores, je handicap en de taal. Zonder e-mailadres is dit niet tot jou te herleiden.",
            "Vraag je het QuickScan-rapport aan, dan ook je naam en e-mailadres. Je krijgt daarna een reeks e-mails; onder elke e-mail staat een link om je uit te schrijven.",
          ),
          sub("Als je een formulier op de website invult"),
          ul("De gegevens die je invult, bijvoorbeeld bij een aanvraag voor het Pro-programma: naam, e-mailadres, club en je gegevens als golfprofessional."),
          sub("Als je de website of portal bezoekt"),
          ul("Technische gegevens zoals je IP-adres, browser en de pagina's die je bezoekt (zie hoofdstuk 7 over statistieken en cookies)."),
        ] },
        { h: "3. Waarvoor we je gegevens gebruiken en op welke grond", blocks: [
          { t: "table", id: "doelen", head: ["Doel", "Grond"], rows: [
            ["Het assessment afnemen, je scores berekenen en je rapporten maken", "Uitvoering van de overeenkomst"],
            ["Je account, aankopen, tegoeden en lidmaatschap beheren", "Uitvoering van de overeenkomst"],
            ["E-mails over je account en je aankopen (bevestiging, rapport klaar, wachtwoord)", "Uitvoering van de overeenkomst"],
            ["De e-mailreeks na een QuickScan-rapport", "Jouw toestemming; uitschrijven kan altijd"],
            ["Je scores of rapport delen met een pro, een team of via een deel-link", "Jouw toestemming; intrekken kan altijd"],
            ["Beveiliging, misbruik voorkomen en storingen oplossen (logboeken)", "Gerechtvaardigd belang"],
            ["Statistieken over het gebruik van website en portal", "Gerechtvaardigd belang voor statistieken zonder cookies; toestemming voor Microsoft Clarity"],
            ["Administratie en belastingplicht", "Wettelijke verplichting"],
          ] },
        ] },
        { h: "4. Rapporten en kunstmatige intelligentie", blocks: [
          p("De cijfers in je rapport worden door onze eigen software berekend. De teksten worden geschreven met hulp van een taalmodel van OpenAI. Daarvoor sturen we naar OpenAI: je voornaam, je handicap, je leeftijd als die bekend is, en je scores en antwoorden. Je e-mailadres en achternaam sturen we niet mee. Volgens de voorwaarden van OpenAI voor zakelijke klanten worden deze gegevens niet gebruikt om modellen te trainen."),
          p("Er wordt geen besluit over jou genomen dat rechtsgevolgen heeft of je op een vergelijkbare manier treft. Een rapport is een beschrijving van hoe je jezelf ziet, op basis van je eigen antwoorden. Het is geen medisch of psychologisch onderzoek."),
        ] },
        { h: "5. Wie je gegevens kan zien", blocks: [
          p("**Jij bepaalt wat je deelt.** Standaard ziet niemand anders je scores of rapporten."),
          ul(
            "**Een golfpro** ziet je scores en kan een lesprogramma voor je maken als je je rapport met die pro deelt. Je kunt het delen stoppen en de koppeling verbreken in de portal.",
            "**Een deel-link** die je zelf aanzet, toont je voornaam, handicap en scores aan iedereen die de link heeft. Je kunt de link weer uitzetten.",
          ),
          sub("Als je via een teamlink meedoet met een team"),
          ul(
            "Bij het aanmelden zet je twee vinkjes. Het eerste is nodig om mee te doen: je uitkomst mag in het teamrapport staan en de pro van het team ziet je scores. Het tweede is vrijwillig: of de pro ook je volledige persoonlijke rapport mag openen. Dat kun je later in de portal aan- of uitzetten.",
            "**Het team en de captain** lezen het teamrapport. Daarin staan gemiddelden van het team, en per speler in woorden wat het hoogst ligt en waar die aan werkt. Er staan geen scores per speler in. Je handicap kan in een voorbeeld van de opstelling staan.",
            "**De pro** krijgt daarnaast een bijlage met de scores per speler en ieders antwoord op de teamvraag, of dat je die hebt overgeslagen.",
            "**Je volledige persoonlijke rapport** zien het team en de captain nooit.",
            "Stop je met delen, dan ziet de pro je scores en je rapport niet meer en sta je niet meer in een nieuw teamrapport. Een teamrapport dat al gemaakt is, blijft bestaan bij de pro en de captain.",
            "De persoon die voor het team betaalt, hoeft geen account te hebben. Van die persoon ontvangen we alleen de gegevens van de betaling.",
          ),
          p("**Medewerkers van MentalRoutine** met beheerrechten kunnen je gegevens inzien als dat nodig is voor ondersteuning, beheer of het oplossen van storingen."),
        ] },
        { h: "6. Bedrijven die voor ons gegevens verwerken", blocks: [
          { t: "table", id: "verwerkers", head: ["Bedrijf", "Waarvoor", "Waar"], rows: [
            ["Amazon Web Services", "Opslag van de portal, database, rapporten en het versturen van e-mail", "Europese Unie (Zweden)"],
            ["OpenAI", "Het schrijven van de teksten in rapporten en e-mails", "Verenigde Staten"],
            ["Lemon Squeezy", "Betalingen, facturen en btw; treedt op als verkoper", "Verenigde Staten"],
            ["Vercel", "Hosting van de website", "Verenigde Staten en Europese Unie"],
            ["Resend", "E-mail vanaf formulieren op de website", "Verenigde Staten"],
            ["Plausible Analytics", "Statistieken zonder cookies", "Europese Unie"],
            ["Microsoft (Clarity)", "Inzicht in het gebruik van website en portal", "Verenigde Staten en Europese Unie"],
          ] },
          p("Voor doorgifte naar landen buiten de Europese Economische Ruimte gebruiken we de waarborgen die de wet daarvoor geeft, zoals de modelcontracten van de Europese Commissie of een adequaatheidsbesluit."),
        ] },
        { h: "7. Statistieken en cookies", blocks: [
          ul(
            "**Noodzakelijk.** Als je inlogt in de portal, plaatsen we een cookie om je ingelogd te houden. De website onthoudt je taalkeuze in je browser.",
            "**Plausible Analytics** telt bezoeken en handelingen zonder cookies en zonder je over websites heen te volgen.",
            "**Microsoft Clarity** laat ons zien hoe pagina's worden gebruikt, met onder meer klikkaarten en opnames van hoe een bezoeker door een pagina beweegt. Clarity plaatst daarvoor cookies. Dat gebeurt alleen als je daar toestemming voor geeft in de cookiemelding. Zonder toestemming laden we Clarity niet.",
          ),
          p("Je kunt je keuze altijd wijzigen via 'Cookie-instellingen' onderaan de pagina. Je kunt ons ook vragen opnames van jouw bezoek te verwijderen."),
        ] },
        { h: "8. Hoe lang we gegevens bewaren", blocks: [
          ul(
            "**Account, antwoorden, scores en rapporten:** zolang je account bestaat. Vraag je om verwijdering, dan verwijderen we ze binnen 30 dagen.",
            "**Logboeken** van handelingen in de portal: 24 maanden.",
            "**QuickScan-gegevens met e-mailadres:** tot je vraagt ze te verwijderen. De e-mailreeks stopt als je je uitschrijft of iets koopt.",
            "**Gegevens over betalingen:** zeven jaar, omdat de belastingwet dat vraagt.",
            "**Teamrapporten:** zolang het account van de pro bestaat, of tot de pro of jij om verwijdering vraagt.",
          ),
        ] },
        { h: "9. Beveiliging", blocks: [
          p("Wachtwoorden worden versleuteld opgeslagen. Verbindingen met de website en de portal zijn versleuteld. Rapporten staan in afgeschermde opslag en zijn alleen op te halen door wie daar recht op heeft. Toegang tot het beheer is beperkt tot wie dat voor het werk nodig heeft."),
        ] },
        { h: "10. Jouw rechten", blocks: [
          p("Je hebt het recht om:"),
          ul(
            "je gegevens in te zien en een kopie te krijgen;",
            "onjuiste gegevens te laten verbeteren;",
            "je gegevens te laten verwijderen;",
            "de verwerking te laten beperken of er bezwaar tegen te maken;",
            "je gegevens in een gangbaar formaat mee te krijgen;",
            "een gegeven toestemming in te trekken. Dat werkt voor de toekomst.",
          ),
          p("Stuur je verzoek naar support@mentalroutine.com. We reageren binnen een maand. Een account verwijderen kan op dit moment alleen via dit adres."),
          p("Ben je het niet eens met hoe we met je gegevens omgaan, dan horen we dat graag eerst zelf. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl)."),
        ] },
        { h: "11. Leeftijd", blocks: [
          p("De portal is bedoeld voor wie 16 jaar of ouder is. Het teamaanbod is voor spelers van 18 jaar en ouder; iedere speler bevestigt dat bij het aanmelden."),
        ] },
        { h: "12. Wijzigingen", blocks: [
          p("Als we deze verklaring wijzigen, zetten we de nieuwe versie op deze pagina met de datum erbij. Bij een wezenlijke wijziging laten we dat weten aan wie een account heeft."),
        ] },
      ],
      closing: "Bij een verschil tussen de Nederlandse en de Engelse tekst geldt de Nederlandse.",
      other: "Algemene voorwaarden",
      home: "Naar de homepage",
    },
    en: {
      docTitle: "Privacy Statement | MentalRoutine",
      title: "Privacy Statement",
      version: "Version 15 November 2026",
      intro: [
        p("MentalRoutine is a service of **Innerprompt B.V.**, Meerlosebaan 12, 5971 NW Grubbenvorst, the Netherlands (Chamber of Commerce no. 42076580). Innerprompt B.V. is responsible for the processing of your personal data as described below. Questions or requests: **support@mentalroutine.com**."),
        p("This statement applies to the website mentalroutine.com and the portal portal.mentalroutine.com."),
      ],
      sections: [
        { h: "1. In short", blocks: [
          ul(
            "We use your data to run the assessment, to create your reports and to manage your account.",
            "Your scores and reports are yours. A golf pro, captain or teammate only sees something if you switch that on yourself, and you can stop it again.",
            "We do not sell your data and do not use it for advertising.",
            "You can see your data, have it corrected or have it deleted by emailing support@mentalroutine.com.",
          ),
        ] },
        { h: "2. Which data we process", blocks: [
          sub("If you have an account"),
          ul(
            "Name, email address, language and an encrypted password.",
            "Your date of birth, if you enter it.",
            "Your handicap and your answers to the assessment questionnaire, and the scores that follow from them.",
            "The reports made for you (profile, summary, training reports, course booklet, comparison report, round analyses).",
            "Rounds you enter: the course, your scores per hole and your answers to the questions about a round.",
            "Points, credits and what you do in the portal (for example logging in, downloading a report), with date, time and IP address.",
          ),
          sub("If you buy something"),
          ul("Payment goes through Lemon Squeezy, which acts as the seller. From Lemon Squeezy we receive your email address, your name, what you bought and the amount. We do not get to see your payment details (such as your card number)."),
          sub("If you take the free QuickScan"),
          ul(
            "Your answers and scores, your handicap and the language. Without an email address this cannot be traced back to you.",
            "If you request the QuickScan report, also your name and email address. After that you receive a series of emails; below every email there is a link to unsubscribe.",
          ),
          sub("If you fill in a form on the website"),
          ul("The details you enter, for example in an application for the Pro Program: name, email address, club and your details as a golf professional."),
          sub("If you visit the website or the portal"),
          ul("Technical data such as your IP address, browser and the pages you visit (see section 7 on statistics and cookies)."),
        ] },
        { h: "3. What we use your data for and on what basis", blocks: [
          { t: "table", id: "doelen", head: ["Purpose", "Basis"], rows: [
            ["Running the assessment, calculating your scores and creating your reports", "Performance of the contract"],
            ["Managing your account, purchases, credits and membership", "Performance of the contract"],
            ["Emails about your account and your purchases (confirmation, report ready, password)", "Performance of the contract"],
            ["The series of emails after a QuickScan report", "Your consent; you can unsubscribe at any time"],
            ["Sharing your scores or report with a pro, a team or through a share link", "Your consent; you can withdraw it at any time"],
            ["Security, preventing abuse and resolving faults (logs)", "Legitimate interest"],
            ["Statistics on the use of the website and the portal", "Legitimate interest for statistics without cookies; consent for Microsoft Clarity"],
            ["Administration and tax obligations", "Legal obligation"],
          ] },
        ] },
        { h: "4. Reports and artificial intelligence", blocks: [
          p("The figures in your report are calculated by our own software. The texts are written with the help of a language model from OpenAI. For that we send to OpenAI: your first name, your handicap, your age if it is known, and your scores and answers. We do not send your email address or surname. Under OpenAI's terms for business customers this data is not used to train models."),
          p("No decision is taken about you that has legal effects or affects you in a similar way. A report is a description of how you see yourself, based on your own answers. It is not a medical or psychological examination."),
        ] },
        { h: "5. Who can see your data", blocks: [
          p("**You decide what you share.** By default nobody else sees your scores or reports."),
          ul(
            "**A golf pro** sees your scores and can make a lesson programme for you if you share your report with that pro. You can stop sharing and remove the link with the pro in the portal.",
            "**A share link** that you switch on yourself shows your first name, handicap and scores to anyone who has the link. You can switch the link off again.",
          ),
          sub("If you take part in a team through a team link"),
          ul(
            "When you sign up you tick two boxes. The first is needed to take part: your outcome may appear in the team report and the team's pro sees your scores. The second is voluntary: whether the pro may also open your full personal report. You can switch that on or off later in the portal.",
            "**The team and the captain** read the team report. It contains averages for the team and, for each player, in words what comes out highest and what they work on. It contains no scores per player. Your handicap may appear in an example of the line-up.",
            "**The pro** also receives an annex for the pro with the scores per player and each player's answer to the team question, or the fact that you skipped it.",
            "**Your full personal report** is never seen by the team or the captain.",
            "If you stop sharing, the pro no longer sees your scores or your report and you no longer appear in a new team report. A team report that has already been made remains with the pro and the captain.",
            "The person who pays for the team does not need an account. From that person we only receive the details of the payment.",
          ),
          p("**MentalRoutine staff** with administrator rights can view your data if that is necessary for support, administration or resolving faults."),
        ] },
        { h: "6. Companies that process data for us", blocks: [
          { t: "table", id: "verwerkers", head: ["Company", "What for", "Where"], rows: [
            ["Amazon Web Services", "Storage of the portal, database and reports, and sending email", "European Union (Sweden)"],
            ["OpenAI", "Writing the texts in reports and emails", "United States"],
            ["Lemon Squeezy", "Payments, invoices and VAT; acts as the seller", "United States"],
            ["Vercel", "Hosting of the website", "United States and European Union"],
            ["Resend", "Email from forms on the website", "United States"],
            ["Plausible Analytics", "Statistics without cookies", "European Union"],
            ["Microsoft (Clarity)", "Insight into the use of the website and the portal", "United States and European Union"],
          ] },
          p("For transfers to countries outside the European Economic Area we use the safeguards the law provides, such as the European Commission's standard contractual clauses or an adequacy decision."),
        ] },
        { h: "7. Statistics and cookies", blocks: [
          ul(
            "**Necessary.** When you log in to the portal, we place a cookie to keep you logged in. The website remembers your language choice in your browser.",
            "**Plausible Analytics** counts visits and actions without cookies and without following you across websites.",
            "**Microsoft Clarity** shows us how pages are used, including click maps and recordings of how a visitor moves through a page. Clarity places cookies for that. That only happens if you give consent for it in the cookie notice. Without consent we do not load Clarity.",
          ),
          p("You can always change your choice through 'Cookie settings' at the bottom of the page. You can also ask us to delete recordings of your visit."),
        ] },
        { h: "8. How long we keep data", blocks: [
          ul(
            "**Account, answers, scores and reports:** for as long as your account exists. If you ask for deletion, we delete them within 30 days.",
            "**Logs** of actions in the portal: 24 months.",
            "**QuickScan data with an email address:** until you ask us to delete it. The series of emails stops when you unsubscribe or buy something.",
            "**Data about payments:** seven years, because tax law requires it.",
            "**Team reports:** for as long as the pro's account exists, or until the pro or you ask for deletion.",
          ),
        ] },
        { h: "9. Security", blocks: [
          p("Passwords are stored encrypted. Connections to the website and the portal are encrypted. Reports are kept in protected storage and can only be retrieved by those who are entitled to them. Access to administration is limited to those who need it for their work."),
        ] },
        { h: "10. Your rights", blocks: [
          p("You have the right to:"),
          ul(
            "see your data and receive a copy;",
            "have incorrect data corrected;",
            "have your data deleted;",
            "have the processing restricted or object to it;",
            "receive your data in a commonly used format;",
            "withdraw consent you have given. That applies to the future.",
          ),
          p("Send your request to support@mentalroutine.com. We respond within a month. At present an account can only be deleted through this address."),
          p("If you disagree with how we handle your data, we would like to hear it from you first. You can also lodge a complaint with the Dutch Data Protection Authority, the Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl)."),
        ] },
        { h: "11. Age", blocks: [
          p("The portal is intended for those aged 16 or over. The team offer is for players aged 18 and over; every player confirms that when signing up."),
        ] },
        { h: "12. Changes", blocks: [
          p("If we change this statement, we put the new version on this page with the date. In the case of a material change we let those who have an account know."),
        ] },
      ],
      closing: "If the Dutch and English texts differ, the Dutch text prevails.",
      other: "Terms and Conditions",
      home: "To the homepage",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────────
  terms: {
    nl: {
      docTitle: "Algemene voorwaarden | MentalRoutine",
      title: "Algemene voorwaarden",
      version: "Versie 15 november 2026",
      intro: [
        p("Deze voorwaarden gelden voor alles wat je afneemt van MentalRoutine, een dienst van **Innerprompt B.V.**, Meerlosebaan 12, 5971 NW Grubbenvorst, Nederland (KvK 42076580), e-mail support@mentalroutine.com. Hierna: \"wij\"."),
      ],
      sections: [
        { h: "1. Wat we leveren", blocks: [
          p("MentalRoutine is een online dienst voor golfers en golfprofessionals. Via de portal (portal.mentalroutine.com) kun je onder meer:"),
          ul(
            "het assessment doen en je spelersprofiel ontvangen;",
            "trainingsrapporten, een baanboekje, een verschillenrapport na een herhaalmeting en rondeanalyses laten maken;",
            "een lidmaatschap afsluiten;",
            "als golfprofessional meedoen aan het Pro-programma en lesprogramma's en teamrapporten maken;",
            "met een team meedoen aan het teamaanbod.",
          ),
          p("Wat een product precies inhoudt en kost, staat op de website of in de portal op het moment dat je het koopt."),
        ] },
        { h: "2. Je account", blocks: [
          ul(
            "Voor de portal heb je een account nodig. Je vult juiste gegevens in en houdt je wachtwoord voor jezelf.",
            "Een account is persoonlijk. Het assessment vul je zelf in.",
            "De portal is bedoeld voor wie 16 jaar of ouder is. Voor het teamaanbod moet je 18 jaar of ouder zijn.",
            "We mogen een account blokkeren bij misbruik, fraude of gedrag dat anderen schaadt.",
          ),
        ] },
        { h: "3. Prijzen en betalen", blocks: [
          ul(
            "Prijzen staan in Amerikaanse dollars. Betaal je in een andere valuta, dan rekent je bank of kaartuitgever om.",
            "Betalingen lopen via **Lemon Squeezy**, die als verkoper (\"merchant of record\") optreedt. Lemon Squeezy rekent af, berekent de btw en stuurt je de betaalbon. Op de betaling zijn ook de voorwaarden van Lemon Squeezy van toepassing.",
            "Een lidmaatschap of abonnement loopt een jaar en wordt daarna steeds met een jaar verlengd, tot je opzegt. Opzeggen kan op elk moment; je houdt toegang tot het einde van de betaalde periode.",
            "We mogen prijzen wijzigen. Een wijziging geldt niet voor wat je al hebt gekocht. Voor een lopend abonnement geldt een nieuwe prijs pas vanaf de volgende verlenging, en we laten dat vooraf weten.",
          ),
        ] },
        { h: "4. Levering", blocks: [
          ul(
            "Na je betaling krijg je toegang in de portal. Heb je nog geen account, dan maken we er een aan op het e-mailadres van je bestelling en sturen we je een e-mail om je wachtwoord in te stellen.",
            "Rapporten worden op jouw verzoek gemaakt en staan daarna in de portal. Dat duurt meestal enkele minuten. Lukt het maken niet, dan proberen we het opnieuw en lossen we het op.",
          ),
        ] },
        { h: "5. Bedenktijd en terugbetaling", blocks: [
          p("Koop je als consument, dan heb je 14 dagen bedenktijd vanaf de dag van aankoop."),
          ul(
            "**Nog niet begonnen:** heb je het assessment nog niet gestart en het gekochte rapport nog niet laten maken, dan kun je binnen 14 dagen je geld terugvragen via support@mentalroutine.com.",
            "**Wel begonnen:** onze producten zijn digitale inhoud die op jouw verzoek direct wordt geleverd. Zodra je het assessment start of een rapport laat maken, vraag je ons om direct te leveren en vervalt je recht om de aankoop te herroepen.",
            "**Abonnementen:** binnen 14 dagen na het afsluiten kun je herroepen, tenzij je in die tijd al gebruik hebt gemaakt van wat het abonnement geeft. Daarna kun je opzeggen tegen het einde van de lopende periode.",
            "Werkt iets niet zoals het hoort, meld het dan. We herstellen het of betalen terug.",
          ),
          p("Na een terugbetaling vervalt het tegoed dat bij de aankoop hoorde. Wat al geleverd is, blijft in je account staan."),
        ] },
        { h: "6. Het teamaanbod", blocks: [
          ul(
            "Een team wordt aangemaakt door een golfprofessional die is toegelaten tot het Pro-programma. De professional vult de teamnaam en het aantal spelers in (4 tot en met 12).",
            "**Eén persoon betaalt voor het hele team:** de professional, of de captain via de betaallink. De spelers rekenen zelf niets af.",
            "De teamlink werkt na de betaling en heeft zoveel plekken als er betaald zijn. Komt er later een speler bij, dan betaalt het team het verschil, en in totaal nooit meer dan het maximum per team dat gold toen het team werd aangemaakt.",
            "In de teamprijs zitten: het assessment met het eigen spelersprofiel voor iedere speler, en het teamrapport met een bijlage voor de professional. **Niet** in de prijs zitten: lessen van de professional (daarover maak je rechtstreeks afspraken met de professional) en een herhaalmeting.",
            "Een teamrapport kan worden gemaakt vanaf vier spelers die het assessment hebben afgerond en hun uitkomst delen.",
            "**Terugbetaling:** heeft nog geen speler van het team het assessment gestart, dan kan de betaler binnen 14 dagen het hele bedrag terugvragen. Daarna niet meer. Plekken die niet worden gebruikt, betalen we niet terug.",
            "Iedere speler beslist zelf over meedoen en delen. Wat een speler deelt en met wie, staat in de privacyverklaring.",
            "De professional is geen medewerker of vertegenwoordiger van MentalRoutine. Voor de lessen en afspraken van de professional zijn wij niet verantwoordelijk.",
          ),
        ] },
        { h: "7. Het Pro-programma", blocks: [
          ul(
            "Deelname staat open voor golfprofessionals van wie de aanvraag is goedgekeurd. We mogen een aanvraag afwijzen en een toelating intrekken.",
            "De professional gebruikt gegevens van leerlingen en spelers alleen voor het lesgeven, en alleen zolang de leerling of speler die deelt.",
            "De professional vraagt geen vergoeding namens MentalRoutine en doet geen toezeggingen namens MentalRoutine.",
            "Materiaal uit het Pro-programma mag de professional gebruiken voor de eigen lessen en clinics, niet doorverkopen.",
          ),
        ] },
        { h: "8. Wat een rapport wel en niet is", blocks: [
          ul(
            "Een rapport beschrijft hoe je jezelf ziet, op basis van je eigen antwoorden op één moment. Het is geen meting van je gedrag op de baan.",
            "Het is geen medisch of psychologisch onderzoek en geen vervanging van hulp door een arts, psycholoog of andere zorgverlener.",
            "We beloven geen resultaat: geen lagere handicap, geen betere scores en geen gewonnen wedstrijden.",
            "De teksten in rapporten worden geschreven met hulp van kunstmatige intelligentie en gecontroleerd door onze software. Zie je iets dat niet klopt, laat het weten; dan kijken we ernaar.",
          ),
        ] },
        { h: "9. Gebruik en eigendom", blocks: [
          ul(
            "De methode, de vragenlijsten, de teksten, de rapporten en de software zijn van ons of van onze licentiegevers.",
            "Je mag je eigen rapporten voor jezelf gebruiken en delen met wie je wilt. Een teamrapport is voor het team, de captain en de professional.",
            "Je mag de inhoud niet doorverkopen, niet op grote schaal kopiëren en niet gebruiken om een vergelijkbare dienst te bouwen.",
            "Je gebruikt de portal niet om anderen te schaden, om in te breken of om de dienst te verstoren.",
          ),
        ] },
        { h: "10. Beschikbaarheid", blocks: [
          p("We doen ons best om de portal beschikbaar te houden, maar kunnen niet beloven dat hij altijd en zonder storingen werkt. We mogen de dienst aanpassen en verbeteren. Stoppen we met een onderdeel waarvoor je hebt betaald, dan lossen we dat redelijk op, bijvoorbeeld met een terugbetaling naar rato."),
        ] },
        { h: "11. Aansprakelijkheid", blocks: [
          ul(
            "We zijn aansprakelijk voor schade die het directe gevolg is van een tekortkoming die aan ons is toe te rekenen.",
            "Onze aansprakelijkheid is beperkt tot het bedrag dat je in de twaalf maanden voor de schade aan ons hebt betaald.",
            "We zijn niet aansprakelijk voor indirecte schade, zoals gemiste inkomsten, of voor beslissingen die je neemt op basis van een rapport.",
            "Deze beperkingen gelden niet bij opzet of bewuste roekeloosheid van onze kant, en doen niets af aan rechten die je als consument volgens de wet hebt.",
          ),
        ] },
        { h: "12. Privacy", blocks: [
          p("Hoe we met je gegevens omgaan, staat in de privacyverklaring op mentalroutine.com/privacy."),
        ] },
        { h: "13. Klachten", blocks: [
          p("Heb je een klacht, mail dan naar support@mentalroutine.com. We reageren binnen vijf werkdagen. Komen we er samen niet uit, dan kun je het geschil voorleggen aan de bevoegde rechter."),
        ] },
        { h: "14. Wijzigingen", blocks: [
          p("We mogen deze voorwaarden wijzigen. De nieuwe versie staat op deze pagina met de datum erbij. Voor wat je al hebt gekocht, blijven de voorwaarden gelden zoals ze waren op het moment van aankoop, tenzij een wijziging in jouw voordeel is of de wet haar voorschrijft."),
        ] },
        { h: "15. Toepasselijk recht", blocks: [
          p("Op deze voorwaarden is Nederlands recht van toepassing. Geschillen leggen we voor aan de bevoegde rechter in Nederland. Woon je als consument in een ander land, dan houd je de bescherming van de dwingende regels van je eigen land."),
        ] },
      ],
      closing: "Bij een verschil tussen de Nederlandse en de Engelse tekst geldt de Nederlandse.",
      other: "Privacyverklaring",
      home: "Naar de homepage",
    },
    en: {
      docTitle: "Terms and Conditions | MentalRoutine",
      title: "Terms and Conditions",
      version: "Version 15 November 2026",
      intro: [
        p("These terms apply to everything you purchase from MentalRoutine, a service of **Innerprompt B.V.**, Meerlosebaan 12, 5971 NW Grubbenvorst, the Netherlands (Chamber of Commerce no. 42076580), email support@mentalroutine.com. Hereafter: \"we\"."),
      ],
      sections: [
        { h: "1. What we provide", blocks: [
          p("MentalRoutine is an online service for golfers and golf professionals. Through the portal (portal.mentalroutine.com) you can, among other things:"),
          ul(
            "take the assessment and receive your player profile;",
            "have training reports, a course booklet, a comparison report after a re-assessment and round analyses made;",
            "take out a membership;",
            "as a golf professional, take part in the Pro Program and make lesson programmes and team reports;",
            "take part in the team offer with a team.",
          ),
          p("What exactly a product includes and costs is stated on the website or in the portal at the moment you buy it."),
        ] },
        { h: "2. Your account", blocks: [
          ul(
            "You need an account for the portal. You enter correct details and keep your password to yourself.",
            "An account is personal. You complete the assessment yourself.",
            "The portal is intended for those aged 16 or over. For the team offer you must be 18 or over.",
            "We may block an account in the event of abuse, fraud or behaviour that harms others.",
          ),
        ] },
        { h: "3. Prices and payment", blocks: [
          ul(
            "Prices are in US dollars. If you pay in another currency, your bank or card issuer converts the amount.",
            "Payments go through **Lemon Squeezy**, which acts as the seller (\"merchant of record\"). Lemon Squeezy takes the payment, calculates the VAT and sends you the receipt. Lemon Squeezy's terms also apply to the payment.",
            "A membership or subscription runs for a year and is then renewed for a year each time, until you cancel. You can cancel at any time; you keep access until the end of the period you have paid for.",
            "We may change prices. A change does not apply to what you have already bought. For a current subscription a new price only applies from the next renewal, and we let you know in advance.",
          ),
        ] },
        { h: "4. Delivery", blocks: [
          ul(
            "After your payment you get access in the portal. If you do not have an account yet, we create one for the email address of your order and send you an email to set your password.",
            "Reports are made at your request and are then available in the portal. That usually takes a few minutes. If making a report fails, we try again and resolve it.",
          ),
        ] },
        { h: "5. Cooling-off period and refunds", blocks: [
          p("If you buy as a consumer, you have a cooling-off period of 14 days from the day of purchase."),
          ul(
            "**Not started yet:** if you have not started the assessment and have not had the report you bought made, you can ask for your money back within 14 days through support@mentalroutine.com.",
            "**Already started:** our products are digital content that is delivered immediately at your request. As soon as you start the assessment or have a report made, you ask us to deliver immediately and your right to withdraw from the purchase lapses.",
            "**Subscriptions:** you can withdraw within 14 days of taking out the subscription, unless in that time you have already used what the subscription gives. After that you can cancel as of the end of the current period.",
            "If something does not work as it should, let us know. We put it right or refund you.",
          ),
          p("After a refund, the credit that came with the purchase lapses. What has already been delivered stays in your account."),
        ] },
        { h: "6. The team offer", blocks: [
          ul(
            "A team is set up by a golf professional who has been admitted to the Pro Program. The professional enters the team name and the number of players (4 to 12).",
            "**One person pays for the whole team:** the professional, or the captain through the payment link. The players do not pay anything themselves.",
            "The team link works after payment and has as many places as have been paid for. If a player joins later, the team pays the difference, and in total never more than the maximum per team that applied when the team was set up.",
            "The team price includes: the assessment with their own player profile for every player, and the team report with an annex for the pro. **Not** included in the price: lessons from the professional (you make arrangements for those directly with the professional) and a re-assessment.",
            "A team report can be made from four players who have completed the assessment and share their outcome.",
            "**Refund:** if no player of the team has started the assessment yet, the payer can ask for the full amount back within 14 days. After that, no longer. We do not refund places that are not used.",
            "Every player decides for themselves about taking part and sharing. What a player shares and with whom is set out in the Privacy Statement.",
            "The professional is not an employee or representative of MentalRoutine. We are not responsible for the professional's lessons and arrangements.",
          ),
        ] },
        { h: "7. The Pro Program", blocks: [
          ul(
            "Participation is open to golf professionals whose application has been approved. We may reject an application and withdraw an admission.",
            "The professional uses data of students and players only for teaching, and only for as long as the student or player shares it.",
            "The professional does not charge a fee on behalf of MentalRoutine and does not make commitments on behalf of MentalRoutine.",
            "The professional may use material from the Pro Program for their own lessons and clinics, not resell it.",
          ),
        ] },
        { h: "8. What a report is and is not", blocks: [
          ul(
            "A report describes how you see yourself, based on your own answers at one moment. It is not a measurement of your behaviour on the course.",
            "It is not a medical or psychological examination and not a substitute for help from a doctor, psychologist or other care provider.",
            "We do not promise a result: no lower handicap, no better scores and no matches won.",
            "The texts in reports are written with the help of artificial intelligence and checked by our software. If you see something that is not right, let us know; we will look into it.",
          ),
        ] },
        { h: "9. Use and ownership", blocks: [
          ul(
            "The method, the questionnaires, the texts, the reports and the software belong to us or to our licensors.",
            "You may use your own reports for yourself and share them with whoever you like. A team report is for the team, the captain and the professional.",
            "You may not resell the content, copy it on a large scale or use it to build a comparable service.",
            "You do not use the portal to harm others, to break in or to disrupt the service.",
          ),
        ] },
        { h: "10. Availability", blocks: [
          p("We do our best to keep the portal available, but cannot promise that it always works and without faults. We may adapt and improve the service. If we stop a part you have paid for, we resolve that reasonably, for example with a pro rata refund."),
        ] },
        { h: "11. Liability", blocks: [
          ul(
            "We are liable for damage that is the direct result of a failure attributable to us.",
            "Our liability is limited to the amount you paid us in the twelve months before the damage.",
            "We are not liable for indirect damage, such as lost income, or for decisions you take on the basis of a report.",
            "These limitations do not apply in the event of intent or deliberate recklessness on our part, and do not affect rights you have as a consumer under the law.",
          ),
        ] },
        { h: "12. Privacy", blocks: [
          p("How we handle your data is set out in the Privacy Statement at mentalroutine.com/privacy."),
        ] },
        { h: "13. Complaints", blocks: [
          p("If you have a complaint, email support@mentalroutine.com. We respond within five working days. If we cannot resolve it together, you can bring the dispute before the competent court."),
        ] },
        { h: "14. Changes", blocks: [
          p("We may change these terms. The new version is on this page with the date. For what you have already bought, the terms continue to apply as they were at the moment of purchase, unless a change is to your advantage or is required by law."),
        ] },
        { h: "15. Applicable law", blocks: [
          p("Dutch law applies to these terms. We submit disputes to the competent court in the Netherlands. If you live in another country as a consumer, you keep the protection of the mandatory rules of your own country."),
        ] },
      ],
      closing: "If the Dutch and English texts differ, the Dutch text prevails.",
      other: "Privacy Statement",
      home: "To the homepage",
    },
  },
};
