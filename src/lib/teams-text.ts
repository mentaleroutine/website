/**
 * Teksten en feiten van /teams (teamaanbod voor competitieteams) in NL en EN — gebouwd 14-11-2026 op de besluiten
 * in de portal-repo `docs/TEAMAANBOD_NOV2026.md` (bron: besluitenregister 14-11-2026); herschreven 15-11-2026 nadat
 * vijftien proeflezers de pagina naast het echte teamrapport legden ("de website verkoopt het te mager").
 *
 * WAT DE PAGINA MAG ZEGGEN (besluiten, niet stilzwijgend wijzigen):
 * - Een team start via een PGA-pro. Geen eigen startroute voor captains; wel een contactregel voor teams zonder pro
 *   (belooft niet dát het kan).
 * - €15 per speler, maximaal €99 per team bij aanmelding van 1-12-2026 t/m 28-2-2027; daarna €49 / €299.
 *   Euro's in beide talen. De Engelse pagina heeft GEEN landbeperking (buitenlandse teams niet weren, niet werven).
 *   Het losse assessment ($79) en het pro-abonnement ($199) zijn in dollars: dat staat één keer duidelijk bij de prijs.
 * - Alleen spelers van 18 jaar en ouder.
 * - WIE ZIET WAT (klopt met het rapport, 15-11-2026): het team en de captain lezen het teamrapport; daarin staat per
 *   speler IN WOORDEN wat het hoogst ligt en waar die aan werkt, ZONDER cijfers. De pro krijgt daarnaast een bijlage
 *   met de scores per speler. Meedoen = de uitkomst binnen het team delen (voorwaarde, akkoord bij aanmelden; in de
 *   portal kan de speler het delen weer stoppen). Het VOLLEDIGE persoonlijke rapport blijft van de speler; delen met
 *   de pro is een eigen keuze. Het antwoord op de teamvraag staat bij de afspraak van het paar.
 * - De pro bepaalt zelf aantal lessen, tempo en lesgeld; geen vast of aanbevolen aantal lessen noemen (de bijlage
 *   bevat wel een lessenreeks van vier lessen: dat is materiaal, geen verplichting).
 * - Voor de pro gelden de gewone regels van het Pro-programma (eigen assessment gratis, vijf lesprogramma's gratis,
 *   daarna het abonnement).
 * - Herhaalmeting: vrijwillig, niet inbegrepen, geen korting beloven.
 * - GEEN claims over betere wedstrijdresultaten, geen verzonnen schaarste. Het rapport bepaalt niet wie er speelt en
 *   meet geen gedrag op de baan. Schrijf "paren" / "pairs"; NIET de woorden die scripts/e2e/teams-check.js afkeurt.
 * - Geen gedachtestreepjes in paginatekst; neutraal over golfer en pro (EN: "they").
 * - Wat het teamrapport bevat (lijsten in `get`) = wat de portal werkelijk levert (portal-repo
 *   docs/TEAMRAPPORT_UITVOERING.md). Verandert het rapport, dan deze lijsten en de citaten (`get.quotes`, letterlijk
 *   uit het voorbeeld public/samples/team/h18) meewijzigen.
 *
 * TEAMS_LIVE = de ene schakelaar voor de start van de werving. Zolang false: de pagina staat op het adres maar is
 * onvindbaar (noindex, niet in de sitemap), het teamblok op /pro-program is verborgen (wel te bekijken met
 * /pro-program?preview=teams) en de teamvoorbeelden op /samples ook (wel met /samples?preview=teams). Op true zetten =
 * vindbaar + in de sitemap + teamblok + teamvoorbeelden zichtbaar.
 */
import type { Lang } from "@/context/lang-context";

export const TEAMS_LIVE = false;

export type TeamLang = "nl" | "en";
export const teamLang = (lang: Lang): TeamLang => (lang === "nl" ? "nl" : "en");

export const TEAM_PRICES = { introPlayer: 15, introTeam: 99, regularPlayer: 49, regularTeam: 299, single: 79 } as const;
export const TEAM_CONTACT = "support@mentalroutine.com";
export const SITE = "https://www.mentalroutine.com";

type Card = { title: string; desc: string };
type Step = { num: string; title: string; body: string };
type Faq = { q: string; a: string };
type Group = { title: string; size: string; items: string[] };
type Quote = { text: string; from: string };

export type TeamText = {
  docTitle: string;
  badge: string; heroTitle: string; heroTitleEm: string; heroP1: string;
  glance: Card[];
  ctaSend: string; ctaSample: string; trust: string;
  get: {
    label: string; title: string; titleEm: string; intro: string;
    groups: Group[];
    quotesLabel: string; quotes: Quote[];
    extras: Card[];
    sampleCta: string; sampleNote: string;
  };
  whyLabel: string; whyTitle: string; whyTitleEm: string; whyIntro: string; whyCards: Card[];
  lossLabel: string; lossTitle: string; lossTitleEm: string; lossItems: string[]; lossClose: string;
  priceLabel: string; priceTitle: string; priceTitleEm: string;
  priceNow: { label: string; badge: string; player: string; playerWas: string; playerSub: string; team: string; teamWas: string; teamSub: string; note: string };
  priceLater: { label: string; line: string };
  priceFacts: string[];
  currencyNote: string;
  howLabel: string; howTitle: string; howTitleEm: string; howSteps: Step[];
  see: { label: string; title: string; titleEm: string; items: Card[]; note: string };
  sendLabel: string; sendTitle: string; sendTitleEm: string; sendBody: string;
  sendMail: string; sendCopy: string; sendCopied: string; mailSubject: string; mailBody: string;
  noPro: string; noProLink: string;
  faqLabel: string; faqTitle: string; faqTitleEm: string; faqs: Faq[];
  proLabel: string; proTitle: string; proTitleEm: string; proBody: string; proPoints: string[]; proCost: string; proCta: string; proSample: string;
  stickyCta: string; footerRights: string;
};

export const TEAM_TEXT: Record<TeamLang, TeamText> = {
  nl: {
    docTitle: "Mentaal trainen met je competitieteam | MentalRoutine",
    badge: "Voor competitieteams · winter 2026/2027",
    heroTitle: "Wat spreekt jullie team af",
    heroTitleEm: "na een mindere slag?",
    heroP1: "Iedere speler doet thuis een assessment van 20 tot 25 minuten. Het team krijgt één teamrapport van ruim twintig pagina's, geschreven voor dit ene team. Jullie pro geeft lessen die over jullie gaan.",
    glance: [
      { title: "Wat het is", desc: "Een assessment per speler, één teamrapport voor het team, lessen van jullie eigen pro." },
      { title: "Wat het kost", desc: "€15 per speler. Nooit meer dan €99 per team." },
      { title: "Wat je doet", desc: "Stuur deze pagina naar jullie pro. De pro start het team." },
    ],
    ctaSend: "Stuur dit naar je pro", ctaSample: "Blader door een voorbeeldrapport",
    trust: "Introductieprijs bij aanmelding van 1 december t/m 28 februari",
    get: {
      label: "Dit krijgen jullie", title: "Eén rapport,", titleEm: "geschreven voor dit ene team",
      intro: "Geen algemeen verhaal over mentale training. Een rapport met jullie namen, jullie spelvorm en jullie afspraken, klaar om te gebruiken.",
      groups: [
        {
          title: "Voor het team", size: "Ruim twintig pagina's",
          items: [
            "Het teamprofiel: waar jullie als team sterk in zijn en waar jullie aan werken.",
            "Per speler in woorden wat het hoogst ligt en waar die aan werkt. Zonder cijfers.",
            "Paren om in de winter uit te proberen, met per paar wat ieder inbrengt en wat ze afspreken.",
            "Een thema voor de winter met drie oefenvormen.",
            "Een draaiboek voor een teamavond van een uur.",
            "De wedstrijddag: een afspraak per moment van de dag, vijf momenten die een partij beslissen en drie afspraken voor het hele team.",
            "Een kaartje per paar, om uit te knippen voor in de tas.",
            "Een terugblik van twee minuten na elke speeldag.",
            "De wedstrijddag op één pagina.",
          ],
        },
        {
          title: "Voor de captain", size: "Drie pagina's",
          items: [
            "Hoe je de teamavond leidt.",
            "Het seizoen in stappen, met een trainingsschema voor de winter.",
            "Wat je doet als het anders loopt.",
          ],
        },
        {
          title: "Voor de pro", size: "Een eigen bijlage, alleen voor de pro",
          items: [
            "De scores per speler.",
            "Per speler één ding om op te letten en één vraag voor achteraf.",
            "Een lessenreeks van vier lessen, met een meetpunt per les.",
            "Oefenvormen voor de teamles.",
          ],
        },
      ],
      quotesLabel: "Letterlijk uit een voorbeeldrapport (verzonnen team Heren 1)",
      quotes: [
        { text: "Niemand zegt sorry voor een slag.", from: "Een van de drie afspraken voor het hele team" },
        { text: "Wij kozen: Daan: één vaste zin. Ruben: stilte.", from: "Het kaartje van het paar Daan en Ruben, onder de regel \"Na een misser doen wij dit\"" },
      ],
      extras: [
        { title: "De teamvraag", desc: "Na het assessment beantwoordt iedere speler één vraag: wat helpt jou na een mindere slag? Stilte, één vaste zin, of even over iets anders praten. Dat antwoord staat bij de afspraak van je paar." },
        { title: "Past bij jullie team", desc: "Voor 18, 27 of 36 holes, vanaf vier spelers. Liggen de scores in jullie team dicht bij elkaar? Dan zegt het rapport dat eerlijk en kiest het team zelf het thema." },
        { title: "Eerlijk over wat het is", desc: "Het rapport bepaalt niet wie er speelt en meet geen gedrag op de baan. Het laat zien hoe ieder zichzelf ziet." },
      ],
      sampleCta: "Blader door een voorbeeldrapport",
      sampleNote: "Vijf verzonnen teams, echte rapporten. Ook de bijlage voor de pro.",
    },
    whyLabel: "Waarom nu", whyTitle: "De winter is", whyTitleEm: "het moment",
    whyIntro: "De meeste teams trainen in de winter hun swing. Bijna geen team spreekt af wat er gebeurt na een gemiste putt, op de eerste tee of in de laatste holes van een partij die gelijk staat. Dat doe je vóór de competitie, niet op de eerste speeldag.",
    whyCards: [
      { title: "Wat zegt jullie team over zichzelf?", desc: "Iedere speler vult thuis het assessment in. Samen levert dat een teamprofiel op dat jullie nog niet kennen: waar het team op leunt en waar het aan werkt." },
      { title: "Het kost weinig moeite", desc: "20 tot 25 minuten per speler, thuis. Daarna één teamavond van een uur, met het draaiboek uit het rapport. De rest bepalen jullie zelf." },
      { title: "Ook voor een sceptisch team", desc: "Er komen geen cijfers op tafel en niemand hoeft iets over zichzelf te vertellen. Het team spreekt af hoe het een wedstrijddag aanpakt." },
      { title: "Lessen die over jullie gaan", desc: "Jullie pro krijgt een eigen bijlage met een lessenreeks van vier lessen. Geen algemene clinic, maar training die past bij dit team." },
    ],
    lossLabel: "En als je het niet doet", lossTitle: "Weer een winter", lossTitleEm: "alleen techniek",
    lossItems: [
      "Het eerste gesprek over spanning en herstel voer je dan op de eerste competitiedag, als het er al toe doet.",
      "Ieder paar ontdekt pas tijdens de partij wat de ander nodig heeft na een mindere slag.",
      "De winterlessen blijven voor iedereen hetzelfde, terwijl geen twee spelers hetzelfde nodig hebben.",
      "Na 28 februari is de introductieprijs voorbij en kost meedoen €49 per speler.",
    ],
    lossClose: "Een hele winter aan voorbereiding, voor minder dan een doos ballen per speler.",
    priceLabel: "Wat het kost", priceTitle: "Een prijs waar je", priceTitleEm: "niet over hoeft te vergaderen",
    priceNow: {
      label: "Introductieprijs · seizoen 2026/2027", badge: "Introductiekorting",
      player: "€15", playerWas: "€49", playerSub: "per speler",
      team: "€99", teamWas: "€299", teamSub: "maximaal per team",
      note: "Introductiekorting bij aanmelding van 1 december 2026 t/m 28 februari 2027. Zes spelers: samen €90. Met zeven spelers of meer betaalt het team samen nooit meer dan €99.",
    },
    priceLater: { label: "Normale prijs, vanaf seizoen 2027/2028", line: "€49 per speler, maximaal €299 per team." },
    priceFacts: [
      "Het volledige assessment voor iedere speler, met een eigen persoonlijk rapport.",
      "Eén teamrapport voor het team, met een deel voor de captain en een bijlage voor de pro.",
      "Het lesgeld spreek je rechtstreeks af met je pro; dat staat hier los van.",
      "Voor teams met spelers van 18 jaar en ouder.",
    ],
    currencyNote: "Teamprijzen zijn in euro's. Het losse assessment kost $79 en het abonnement voor de pro $199 per jaar; die twee bedragen zijn in dollars.",
    howLabel: "4 stappen", howTitle: "Van idee", howTitleEm: "tot eerste teamles",
    howSteps: [
      { num: "01", title: "Spreek je pro aan", body: "Stuur deze pagina naar de pro van je club. Een team start altijd via een PGA-pro; dat kost de pro een paar minuten." },
      { num: "02", title: "De pro start het team", body: "De pro meldt zich aan bij MentalRoutine, start jullie team en geeft jullie de teamcode." },
      { num: "03", title: "Iedere speler doet het assessment", body: "Thuis, online, in 20 tot 25 minuten, in het Nederlands of Engels. Daarna nog één teamvraag. Met de teamcode betaal je het teamtarief." },
      { num: "04", title: "Rapport, teamavond, lessen", body: "Iedere speler krijgt het eigen rapport en het team het teamrapport. Daarna volgen de teamavond en de teamlessen. Hoeveel lessen en in welk tempo, spreken jullie samen af." },
    ],
    see: {
      label: "Wie ziet wat", title: "Niemand staat", titleEm: "met een cijfer te kijk",
      items: [
        { title: "Het team en de captain", desc: "Lezen het teamrapport. Daarin staat per speler in woorden wat het hoogst ligt en waar die aan werkt. Zonder cijfers." },
        { title: "De pro", desc: "Krijgt het teamrapport en daarnaast een bijlage met de scores per speler. Die bijlage is alleen voor de pro." },
        { title: "Je eigen rapport", desc: "Je volledige persoonlijke rapport blijft van jou. Of je dat ook met de pro deelt, kies je zelf." },
        { title: "De teamvraag", desc: "Je antwoord op de teamvraag staat bij de afspraak van je paar. Zo weet je teamgenoot wat jou helpt." },
      ],
      note: "Wie in een team meedoet, deelt de uitkomst binnen het team. Bij het aanmelden ga je daarmee akkoord; in de portal kun je het delen weer stoppen.",
    },
    sendLabel: "De eerste stap", sendTitle: "Stuur dit", sendTitleEm: "naar je pro",
    sendBody: "Eén bericht is genoeg. De pro leest hier wat het team krijgt en vindt onderaan hoe aanmelden werkt. Jullie hoeven zelf nog niets te regelen of te betalen.",
    sendMail: "Mail deze pagina naar je pro", sendCopy: "Kopieer de link", sendCopied: "Link gekopieerd",
    mailSubject: "Mentaal trainen met ons competitieteam deze winter?",
    mailBody: "Hoi,\n\nWe willen deze winter met ons competitieteam ook mentaal trainen, en dat kan via MentalRoutine samen met jou als pro. Elke speler doet thuis een assessment, het team krijgt een teamrapport en jij krijgt een eigen bijlage met een lessenreeks van vier lessen. Het lesgeld spreek je zelf met ons af.\n\nHier staat hoe het werkt, met een voorbeeldrapport en onderaan een stuk voor de pro:\n{url}\n\nWil je ernaar kijken?\n\nGroet,",
    noPro: "Wil je als team meedoen zonder pro? Neem contact met ons op, dan kijken we samen wat er kan: ",
    noProLink: TEAM_CONTACT,
    faqLabel: "Vragen?", faqTitle: "Veelgestelde", faqTitleEm: "vragen",
    faqs: [
      { q: "Waarom kan een team alleen via een pro starten?", a: "Omdat de meting pas iets oplevert als er daarna mee gewerkt wordt. De pro start het team, ontvangt de bijlage met de lessenreeks en geeft de teamlessen. Speel je bij een club zonder pro, of wil je pro er meer over weten? Mail " + TEAM_CONTACT + "." },
      { q: "Wat betalen we precies?", a: "Bij aanmelding van 1 december 2026 t/m 28 februari 2027: €15 per speler, met een maximum van €99 voor het hele team. Zes spelers betalen dus samen €90, zeven of meer spelers samen €99. Vanaf seizoen 2027/2028 is dat €49 per speler en maximaal €299 per team. Het lesgeld van de pro komt daar los bij en spreek je met de pro af." },
      { q: "Hoeveel tijd kost het?", a: "Het assessment kost 20 tot 25 minuten per speler: online, thuis, op een moment dat jou past, in het Nederlands of Engels. Daarna één teamavond van een uur. De rest is aan het team." },
      { q: "Wie ziet mijn gegevens?", a: "Het team en de captain lezen het teamrapport. Daarin staat per speler in woorden wat het hoogst ligt en waar die aan werkt, zonder cijfers. De pro krijgt daarnaast een bijlage met de scores per speler. Bij het aanmelden ga je daarmee akkoord; in de portal kun je het delen weer stoppen. Je volledige persoonlijke rapport blijft van jou: je kiest zelf of je dat ook met de pro deelt. Je antwoord op de teamvraag staat bij de afspraak van je paar." },
      { q: "Is dit iets voor een sceptisch team?", a: "Ja. Er komen geen cijfers op tafel en niemand hoeft iets over zichzelf te vertellen. Het rapport levert praktische afspraken op voor de wedstrijddag, zoals wie beslist over het geven van een putt. Twijfel je? Blader eerst door een voorbeeldrapport." },
      { q: "Wat als ons team weinig verschillen laat zien?", a: "Dan zegt het rapport dat eerlijk. Het wijst dan geen thema of paren aan; het team kiest zelf uit drie thema's. De wedstrijddag, de teamavond en de kaartjes blijven gewoon." },
      { q: "Hoeveel lessen horen erbij?", a: "Dat bepalen jullie samen met de pro. Er is geen vast aantal en geen vast ritme: de pro stemt het af op wat het team nodig heeft en op de tijd die er is." },
      { q: "Kan ons jeugdteam meedoen?", a: "Nee. Het teamaanbod is voor teams met spelers van 18 jaar en ouder." },
      { q: "Kunnen we na het seizoen opnieuw meten?", a: "Ja, als je dat wilt. Elke speler kan na het seizoen zelf een herhaalmeting doen tegen de prijs die dan voor de herhaalmeting geldt. Die is niet verplicht en zit niet in de teamprijs." },
      { q: "Worden we hier beter van in de competitie?", a: "Dat beloven we niet; niemand kan een uitslag garanderen. Wat je wel krijgt: een team dat weet waar het op leunt, afspraken voor de wedstrijddag en een winter waarin jullie gericht oefenen op wat er tussen de slagen gebeurt." },
    ],
    proLabel: "Ben je PGA-pro?", proTitle: "Betaalde teamlessen", proTitleEm: "in de rustige maanden",
    proBody: "Heeft een captain je deze pagina gestuurd? Dan wil dat team deze winter met jou werken. Jij start het team; het materiaal voor een teamavond en vier lessen ligt klaar.",
    proPoints: [
      "Je doet gratis je eigen assessment en krijgt je eigen dashboard.",
      "Je start het team vanuit je dashboard en geeft de spelers de teamcode.",
      "Bij het teamrapport krijg je een eigen bijlage: de scores per speler, per speler één ding om op te letten en een lessenreeks van vier lessen.",
      "Je bepaalt zelf het aantal lessen, het tempo en je lesgeld, en je factureert rechtstreeks aan het team.",
    ],
    proCost: "Aanmelden en je eigen assessment zijn gratis, net als je eerste vijf lesprogramma's. Wie daarna doorgaat, neemt het abonnement van het Pro-programma ($199 per jaar bij toelating t/m 31 maart 2027).",
    proCta: "Meld je aan als pro", proSample: "Bekijk een voorbeeld van de bijlage voor de pro",
    stickyCta: "Stuur dit naar je pro", footerRights: "Alle rechten voorbehouden.",
  },
  en: {
    docTitle: "Mental training with your competition team | MentalRoutine",
    badge: "For competition teams · winter 2026/2027",
    heroTitle: "What does your team agree",
    heroTitleEm: "after a poor shot?",
    heroP1: "Every player takes a 20 to 25 minute assessment at home. The team gets one team report of more than twenty pages, written for this one team. Your pro gives lessons that are about you.",
    glance: [
      { title: "What it is", desc: "An assessment for every player, one team report for the team, lessons from your own pro." },
      { title: "What it costs", desc: "€15 per player. Never more than €99 per team." },
      { title: "What you do", desc: "Send this page to your pro. The pro starts the team." },
    ],
    ctaSend: "Send this to your pro", ctaSample: "Browse a sample report",
    trust: "Introductory price when you sign up from 1 December to 28 February",
    get: {
      label: "This is what you get", title: "One report,", titleEm: "written for this one team",
      intro: "Not a general story about mental training. A report with your names, your match format and your agreements, ready to use.",
      groups: [
        {
          title: "For the team", size: "More than twenty pages",
          items: [
            "The team profile: where you are strong as a team and what you work on.",
            "For each player, in words, what sits highest and what they work on. No scores.",
            "Pairs to try out over the winter, with what each player brings and what the pair agrees.",
            "A theme for the winter with three practice drills.",
            "A running order for a one-hour team meeting.",
            "Match day: an agreement for each moment of the day, five moments that decide a match and three agreements for the whole team.",
            "A card per pair, to cut out and keep in the bag.",
            "A two-minute look back after every match day.",
            "Match day on one page.",
          ],
        },
        {
          title: "For the captain", size: "Three pages",
          items: [
            "How to lead the team meeting.",
            "The season step by step, with a training schedule for the winter.",
            "What to do when things turn out differently.",
          ],
        },
        {
          title: "For the pro", size: "A separate annex, for the pro only",
          items: [
            "The scores per player.",
            "One thing to watch and one question for afterwards per player.",
            "A series of four lessons, with something to measure in each lesson.",
            "Practice drills for the team lesson.",
          ],
        },
      ],
      quotesLabel: "Word for word from a sample report (made-up team Men's 1)",
      quotes: [
        { text: "Nobody says sorry for a shot.", from: "One of the three agreements for the whole team" },
        { text: "We chose: Daan: one set phrase. Ruben: silence.", from: "The card of the pair Daan and Ruben, under the line \"After a poor shot we do this\"" },
      ],
      extras: [
        { title: "The team question", desc: "After the assessment every player answers one question: what helps you after a poor shot? Silence, one set phrase, or talking about something else for a moment. That answer sits next to your pair's agreement." },
        { title: "Fits your team", desc: "For 18, 27 or 36 holes, from four players. Are the scores in your team close together? Then the report says so honestly and the team picks its own theme." },
        { title: "Honest about what it is", desc: "The report does not decide who plays and does not measure behaviour on the course. It shows how each player sees themselves." },
      ],
      sampleCta: "Browse a sample report",
      sampleNote: "Five made-up teams, real reports. The annex for the pro as well.",
    },
    whyLabel: "Why now", whyTitle: "Winter is", whyTitleEm: "the moment",
    whyIntro: "Most teams spend the winter on their swing. Hardly any team agrees what happens after a missed putt, on the first tee, or in the closing holes of a match that is all square. You do that before the season, not on the first match day.",
    whyCards: [
      { title: "What does your team say about itself?", desc: "Every player takes the assessment at home. Together that gives a team profile you have not seen before: what the team leans on and what it works on." },
      { title: "It takes little effort", desc: "20 to 25 minutes per player, at home. Then one team meeting of an hour, with the running order from the report. The rest is up to you." },
      { title: "For a sceptical team too", desc: "No scores on the table, and nobody has to say anything about themselves. The team agrees how it approaches a match day." },
      { title: "Lessons that are about you", desc: "Your pro gets a separate annex with a series of four lessons. Not a general clinic, but training that fits this team." },
    ],
    lossLabel: "And if you don't", lossTitle: "Another winter of", lossTitleEm: "technique only",
    lossItems: [
      "Your first conversation about nerves and recovery then happens on the first match day, when it already matters.",
      "Every pair only finds out during the match what the other needs after a poor shot.",
      "Winter lessons stay the same for everyone, while no two players need the same thing.",
      "After 28 February the introductory price is gone and taking part costs €49 per player.",
    ],
    lossClose: "A whole winter of preparation, for less than a box of balls per player.",
    priceLabel: "What it costs", priceTitle: "A price you don't need", priceTitleEm: "a committee meeting for",
    priceNow: {
      label: "Introductory price · season 2026/2027", badge: "Introductory discount",
      player: "€15", playerWas: "€49", playerSub: "per player",
      team: "€99", teamWas: "€299", teamSub: "maximum per team",
      note: "Introductory discount when you sign up from 1 December 2026 to 28 February 2027. Six players: €90 in total. With seven players or more, the team never pays more than €99 in total.",
    },
    priceLater: { label: "Regular price, from season 2027/2028", line: "€49 per player, €299 maximum per team." },
    priceFacts: [
      "The full assessment for every player, with a personal report of their own.",
      "One team report for the team, with a part for the captain and an annex for the pro.",
      "You agree the lesson fee directly with your pro; that is separate from this.",
      "For teams with players aged 18 and over.",
    ],
    currencyNote: "Team prices are in euros. The assessment on its own costs $79 and the subscription for the pro $199 per year; those two amounts are in US dollars.",
    howLabel: "4 steps", howTitle: "From idea", howTitleEm: "to first team lesson",
    howSteps: [
      { num: "01", title: "Talk to your pro", body: "Send this page to the pro at your club. A team always starts through a PGA professional; it takes the pro a few minutes." },
      { num: "02", title: "The pro starts the team", body: "The pro signs up with MentalRoutine, starts your team and gives you the team code." },
      { num: "03", title: "Every player takes the assessment", body: "At home, online, in 20 to 25 minutes, in English or Dutch. Then one team question. With the team code you pay the team rate." },
      { num: "04", title: "Report, team meeting, lessons", body: "Every player gets their own report and the team gets the team report. Then come the team meeting and the team lessons. How many lessons and at what pace is something you agree together." },
    ],
    see: {
      label: "Who sees what", title: "Nobody is put on the spot", titleEm: "with a score",
      items: [
        { title: "The team and the captain", desc: "Read the team report. For each player it says in words what sits highest and what they work on. No scores." },
        { title: "The pro", desc: "Gets the team report and, alongside it, an annex with the scores per player. That annex is for the pro only." },
        { title: "Your own report", desc: "Your full personal report stays yours. Whether you share that with the pro as well is your choice." },
        { title: "The team question", desc: "Your answer to the team question sits next to your pair's agreement. That way your teammate knows what helps you." },
      ],
      note: "If you take part in a team, you share the outcome within the team. You agree to this when you sign up; in the portal you can stop sharing again.",
    },
    sendLabel: "The first step", sendTitle: "Send this", sendTitleEm: "to your pro",
    sendBody: "One message is enough. Here the pro reads what the team gets and finds how signing up works at the bottom. You don't have to arrange or pay anything yourselves yet.",
    sendMail: "Email this page to your pro", sendCopy: "Copy the link", sendCopied: "Link copied",
    mailSubject: "Mental training with our competition team this winter?",
    mailBody: "Hi,\n\nThis winter we would like to work on the mental game with our competition team, and we can do that through MentalRoutine together with you as our pro. Every player takes an assessment at home, the team gets a team report and you get a separate annex with a series of four lessons. You agree your lesson fee with us yourself.\n\nThis page explains how it works, with a sample report and a section for the pro at the bottom:\n{url}\n\nWould you take a look?\n\nBest regards,",
    noPro: "Would you like to take part as a team without a pro? Get in touch and we'll look at what is possible together: ",
    noProLink: TEAM_CONTACT,
    faqLabel: "Questions?", faqTitle: "Frequently", faqTitleEm: "asked",
    faqs: [
      { q: "Why can a team only start through a pro?", a: "Because the assessment only pays off when you work with it afterwards. The pro starts the team, receives the annex with the series of lessons and gives the team lessons. Is there no pro at your club, or does your pro want to know more? Email " + TEAM_CONTACT + "." },
      { q: "What exactly do we pay?", a: "When you sign up from 1 December 2026 to 28 February 2027: €15 per player, with a maximum of €99 for the whole team. Six players pay €90 in total, seven or more pay €99 in total. From season 2027/2028 it is €49 per player and €299 maximum per team. The pro's lesson fee is separate and is agreed with the pro." },
      { q: "How much time does it take?", a: "The assessment takes 20 to 25 minutes per player: online, at home, at a time that suits you, in English or Dutch. Then one team meeting of an hour. The rest is up to the team." },
      { q: "Who sees my data?", a: "The team and the captain read the team report. For each player it says in words what sits highest and what they work on, without scores. The pro also gets an annex with the scores per player. You agree to this when you sign up; in the portal you can stop sharing again. Your full personal report stays yours: you choose whether to share that with the pro as well. Your answer to the team question sits next to your pair's agreement." },
      { q: "Is this something for a sceptical team?", a: "Yes. No scores are put on the table and nobody has to say anything about themselves. The report gives practical agreements for match day, such as who decides on conceding a putt. Not sure? Browse a sample report first." },
      { q: "What if our team shows few differences?", a: "Then the report says so honestly. It does not point to a theme or to pairs; the team picks one of three themes itself. Match day, the team meeting and the cards stay as they are." },
      { q: "How many lessons are included?", a: "You decide that together with the pro. There is no fixed number and no fixed rhythm: the pro matches it to what the team needs and the time available." },
      { q: "Can our junior team take part?", a: "No. The team offer is for teams with players aged 18 and over." },
      { q: "Can we measure again after the season?", a: "Yes, if you want to. After the season each player can take a re-assessment at the price that applies to the re-assessment at that time. It is not required and not included in the team price." },
      { q: "Will this make us better in competition?", a: "We don't promise that; nobody can guarantee a result. What you do get: a team that knows what it leans on, agreements for match day and a winter in which you practise what happens between the shots." },
    ],
    proLabel: "Are you a PGA professional?", proTitle: "Paid team lessons", proTitleEm: "in the quiet months",
    proBody: "Did a captain send you this page? Then that team wants to work with you this winter. You start the team; the material for a team meeting and four lessons is ready.",
    proPoints: [
      "You take your own assessment for free and get your own dashboard.",
      "You start the team from your dashboard and give the players the team code.",
      "With the team report you get an annex of your own: the scores per player, one thing to watch per player and a series of four lessons.",
      "You decide the number of lessons, the pace and your fee, and you invoice the team directly.",
    ],
    proCost: "Signing up and your own assessment are free, and so are your first five lesson programs. If you continue after that, you take the Pro Program subscription ($199 per year when approved by 31 March 2027).",
    proCta: "Sign up as a pro", proSample: "See a sample of the annex for the pro",
    stickyCta: "Send this to your pro", footerRights: "All rights reserved.",
  },
};

/** Teamblok op /pro-program (zelfde feiten als hierboven; één bron). */
export const PRO_TEAM_BLOCK: Record<TeamLang, { label: string; title: string; titleEm: string; body: string; points: string[]; gets: string; cost: string; link: string; annexLink: string }> = {
  nl: {
    label: "Competitieteams", title: "Begeleid deze winter", titleEm: "de competitieteams van je club",
    body: "Competitieteams trainen in de winter vooral techniek, terwijl op een competitiedag vaak het hoofd het verschil maakt. Met het teamaanbod geef je ze betaalde teamlessen, met het lesmateriaal klaar.",
    points: TEAM_TEXT.nl.proPoints,
    gets: "Bij elk teamrapport krijg je een bijlage die alleen jij leest: de scores per speler, een kijkwijzer met per speler één ding om op te letten, en een lessenreeks van vier lessen.",
    cost: "Spelers betalen bij aanmelding van 1 december 2026 t/m 28 februari 2027 €15 per persoon, met een maximum van €99 per team. Voor jou gelden de gewone regels van het Pro-programma: je eerste vijf lesprogramma's zijn gratis, daarna het abonnement.",
    link: "Bekijk wat je team krijgt",
    annexLink: "Bekijk een voorbeeld van de bijlage voor de pro",
  },
  en: {
    label: "Competition teams", title: "Coach your club's", titleEm: "competition teams this winter",
    body: "Competition teams mostly train technique in winter, while on match day it is often the mental game that makes the difference. With the team offer you give them paid team lessons, with the lesson material ready.",
    points: TEAM_TEXT.en.proPoints,
    gets: "With every team report you get an annex that only you read: the scores per player, an observation guide with one thing to watch per player, and a series of four lessons.",
    cost: "Players pay €15 each when they sign up from 1 December 2026 to 28 February 2027, with a maximum of €99 per team. For you the normal Pro Program rules apply: your first five lesson programs are free, then the subscription.",
    link: "See what your team gets",
    annexLink: "See a sample of the annex for the pro",
  },
};
