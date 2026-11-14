/**
 * Teksten en feiten van /teams (teamaanbod voor competitieteams) in NL en EN — gebouwd 14-11-2026 op de besluiten
 * in de portal-repo `docs/TEAMAANBOD_NOV2026.md` (bron: besluitenregister 14-11-2026).
 *
 * WAT DE PAGINA MAG ZEGGEN (besluiten, niet stilzwijgend wijzigen):
 * - Een team start via een PGA-pro. Geen eigen startroute voor captains; wel een contactregel voor teams zonder pro
 *   (belooft niet dát het kan).
 * - €15 per speler, maximaal €99 per team bij aanmelding van 1-12-2026 t/m 28-2-2027; daarna €49 / €299.
 *   Euro's in beide talen. De Engelse pagina heeft GEEN landbeperking (buitenlandse teams niet weren, niet werven).
 * - Alleen spelers van 18 jaar en ouder.
 * - De captain ontvangt het teamrapport en deelt het met team en pro. Wie in een team meedoet, deelt de eigen SCORES
 *   (8 stappen + 4 factoren) met pro, captain en teamgenoten: voorwaarde voor deelname, akkoord bij aanmelden
 *   (besluit 14-11-2026 's avonds, vervangt "alleen vrijwillig delen"). Het VOLLEDIGE persoonlijke rapport blijft van
 *   de speler; delen met de pro is een eigen keuze (bestaande koppeling in de portal).
 * - De pro bepaalt zelf aantal lessen, tempo en lesgeld; geen vast of aanbevolen aantal lessen noemen.
 * - Voor de pro gelden de gewone regels van het Pro-programma (eigen assessment gratis, vijf lesprogramma's gratis,
 *   daarna het abonnement).
 * - Herhaalmeting: vrijwillig, niet inbegrepen, geen korting beloven.
 * - GEEN claims over betere wedstrijdresultaten. NIETS over koppels of opstelling zolang het teamrapport niet
 *   definitief is (dat komt er later bij, samen met het voorbeeldrapport).
 *
 * TEAMS_LIVE = de ene schakelaar voor de start van de werving. Zolang false: de pagina staat op het adres maar is
 * onvindbaar (noindex, niet in de sitemap) en het teamblok op /pro-program is verborgen (wel te bekijken met
 * /pro-program?preview=teams). Op true zetten = vindbaar + in de sitemap + teamblok zichtbaar.
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

export type TeamText = {
  badge: string; heroTitle: string; heroTitleEm: string; heroP1: string; heroP2: string;
  ctaSend: string; ctaHow: string; trust: string;
  whyLabel: string; whyTitle: string; whyTitleEm: string; whyIntro: string; whyCards: Card[];
  lossLabel: string; lossTitle: string; lossTitleEm: string; lossItems: string[]; lossClose: string;
  priceLabel: string; priceTitle: string; priceTitleEm: string;
  priceNow: { label: string; badge: string; player: string; playerWas: string; playerSub: string; team: string; teamWas: string; teamSub: string; note: string };
  priceLater: { label: string; line: string };
  priceFacts: string[];
  howLabel: string; howTitle: string; howTitleEm: string; howSteps: Step[];
  getLabel: string; getTitle: string; getTitleEm: string; getItems: Card[];
  sendLabel: string; sendTitle: string; sendTitleEm: string; sendBody: string;
  sendMail: string; sendCopy: string; sendCopied: string; mailSubject: string; mailBody: string;
  noPro: string; noProLink: string;
  faqLabel: string; faqTitle: string; faqTitleEm: string; faqs: Faq[];
  proLabel: string; proTitle: string; proTitleEm: string; proBody: string; proPoints: string[]; proCost: string; proCta: string;
  stickyCta: string; footerRights: string;
};

export const TEAM_TEXT: Record<TeamLang, TeamText> = {
  nl: {
    badge: "Voor competitieteams · winter 2026/2027",
    heroTitle: "Deze winter traint je team",
    heroTitleEm: "ook het hoofd",
    heroP1: "Op een competitiedag is de techniek er al. Wat dan telt, is wat er tussen de slagen gebeurt. Met MentalRoutine werkt je team daar deze winter aan, samen met jullie eigen pro.",
    heroP2: "Elke speler krijgt een eigen mentaal profiel, het team krijgt een teamrapport en de pro geeft lessen die over jullie gaan.",
    ctaSend: "Stuur dit naar je pro", ctaHow: "Zo werkt het",
    trust: "Introductieprijs: €15 per speler · maximaal €99 per team · aanmelden van 1 december t/m 28 februari",
    whyLabel: "Waarom je dit wilt", whyTitle: "Wat je team", whyTitleEm: "eraan heeft",
    whyIntro: "De meeste teams trainen in de winter hun swing. Bijna geen team traint wat er gebeurt na een gemiste putt, op de eerste tee of in de laatste holes van een partij die gelijk staat.",
    whyCards: [
      { title: "Iedere speler kent het eigen spel onder druk", desc: "Elke speler doet het volledige MentalRoutine-assessment en krijgt een eigen profiel: de acht stappen van de mentale routine, de sterke kanten en één concreet startpunt voor de baan." },
      { title: "Het team ziet zichzelf als team", desc: "De captain ontvangt een teamrapport: één gezamenlijk beeld van waar jullie als team sterk in zijn en waar jullie deze winter samen aan werken." },
      { title: "Lessen die over jullie gaan", desc: "Jullie pro bouwt de teamlessen op wat de meting laat zien. Geen algemene clinic, maar training die past bij dit team." },
      { title: "Eén taal voor het hele team", desc: "Iedereen praat over dezelfde stappen. Dat maakt het makkelijker om elkaar in een wedstrijd te helpen, en om na afloop te bespreken wat er gebeurde." },
    ],
    lossLabel: "En als je het niet doet", lossTitle: "Weer een winter", lossTitleEm: "alleen techniek",
    lossItems: [
      "Het eerste gesprek over spanning en herstel voer je dan op de eerste competitiedag, als het er al toe doet.",
      "Iedere speler blijft op gevoel raden waar het eigen spel hapert zodra het spannend wordt.",
      "De winterlessen blijven voor iedereen hetzelfde, terwijl geen twee spelers hetzelfde nodig hebben.",
      "Na 28 februari is de introductieprijs voorbij en kost meedoen €49 per speler.",
    ],
    lossClose: "Een hele winter aan voorbereiding, voor minder dan een doos ballen per speler.",
    priceLabel: "Wat het kost", priceTitle: "Een prijs waar je", priceTitleEm: "niet over hoeft te vergaderen",
    priceNow: {
      label: "Introductieprijs · seizoen 2026/2027", badge: "Introductiekorting",
      player: "€15", playerWas: "€49", playerSub: "per speler",
      team: "€99", teamWas: "€299", teamSub: "maximaal per team",
      note: "Introductiekorting bij aanmelding van 1 december 2026 t/m 28 februari 2027. Het teambedrag is een plafond: met zeven spelers of meer betaalt het team samen nooit meer dan €99.",
    },
    priceLater: { label: "Normale prijs, vanaf seizoen 2027/2028", line: "€49 per speler, maximaal €299 per team." },
    priceFacts: [
      "Het volledige assessment, hetzelfde dat los $79 kost.",
      "Een eigen rapport voor elke speler en een teamrapport voor het team.",
      "Het lesgeld spreek je rechtstreeks af met je pro; dat staat hier los van.",
      "Voor teams met spelers van 18 jaar en ouder.",
    ],
    howLabel: "4 stappen", howTitle: "Van idee", howTitleEm: "tot eerste teamles",
    howSteps: [
      { num: "01", title: "Spreek je pro aan", body: "Stuur deze pagina naar de pro van je club. Een team start altijd via een PGA-pro; dat kost de pro een paar minuten." },
      { num: "02", title: "De pro start het team", body: "De pro meldt zich aan bij MentalRoutine, start jullie team en geeft jullie de teamcode." },
      { num: "03", title: "Iedere speler doet het assessment", body: "Online, in 20 tot 25 minuten, in het Nederlands of Engels. Met de teamcode betaal je het teamtarief." },
      { num: "04", title: "Rapporten en lessen", body: "Iedere speler krijgt het eigen rapport, de captain het teamrapport. Daarna geeft de pro de teamlessen. Hoeveel lessen en in welk tempo, spreken jullie samen af." },
    ],
    getLabel: "Wat je krijgt", getTitle: "Voor de speler, de captain", getTitleEm: "en het team",
    getItems: [
      { title: "Voor elke speler: een eigen rapport", desc: "Je volledige persoonlijke rapport is van jou. Je scores deel je binnen het team; of je ook het hele rapport met de pro deelt, beslis je zelf." },
      { title: "Voor de captain: het teamrapport", desc: "De captain ontvangt het teamrapport en deelt het met de teamleden en de pro." },
      { title: "Voor het team: lessen op maat", desc: "De pro gebruikt de lesprogramma's van MentalRoutine voor de teamlessen, en als jullie dat willen ook voor individuele lessen." },
    ],
    sendLabel: "De eerste stap", sendTitle: "Stuur dit", sendTitleEm: "naar je pro",
    sendBody: "Eén bericht is genoeg. De pro leest hier wat het team te zien krijgt en vindt onderaan hoe aanmelden werkt. Jullie hoeven zelf nog niets te regelen of te betalen.",
    sendMail: "Mail deze pagina naar je pro", sendCopy: "Kopieer de link", sendCopied: "Link gekopieerd",
    mailSubject: "Mentaal trainen met ons competitieteam deze winter?",
    mailBody: "Hoi,\n\nWe willen deze winter met ons competitieteam ook mentaal trainen, en dat kan via MentalRoutine samen met jou als pro. Elke speler doet een assessment, het team krijgt een teamrapport en jij geeft de teamlessen met kant-en-klaar lesmateriaal. Het lesgeld spreek je zelf met ons af.\n\nHier staat hoe het werkt, met onderaan een stuk voor de pro:\n{url}\n\nWil je ernaar kijken?\n\nGroet,",
    noPro: "Wil je als team meedoen zonder pro? Neem contact met ons op, dan kijken we samen wat er kan: ",
    noProLink: TEAM_CONTACT,
    faqLabel: "Vragen?", faqTitle: "Veelgestelde", faqTitleEm: "vragen",
    faqs: [
      { q: "Waarom kan een team alleen via een pro starten?", a: "Omdat de meting pas iets oplevert als er daarna mee gewerkt wordt. De pro start het team, ontvangt de lesprogramma's en geeft de teamlessen. Speel je bij een club zonder pro, of wil je pro er meer over weten? Mail " + TEAM_CONTACT + "." },
      { q: "Wat betalen we precies?", a: "Bij aanmelding van 1 december 2026 t/m 28 februari 2027: €15 per speler, met een maximum van €99 voor het hele team. Zes spelers betalen dus samen €90, zeven of meer spelers samen €99. Vanaf seizoen 2027/2028 is dat €49 per speler en maximaal €299 per team. Het lesgeld van de pro komt daar los bij en spreek je met de pro af." },
      { q: "Hoeveel lessen horen erbij?", a: "Dat bepalen jullie samen met de pro. Er is geen vast aantal en geen vast ritme: de pro stemt het af op wat het team nodig heeft en op de tijd die er is." },
      { q: "Wie ziet mijn gegevens?", a: "Wie in een team meedoet, deelt de eigen scores met de pro, de captain en de teamgenoten. Daar is het teamrapport op gebouwd, en bij het aanmelden ga je daarmee akkoord. Je volledige persoonlijke rapport blijft van jou: je kiest zelf of je dat ook met de pro deelt." },
      { q: "Hoeveel tijd kost het assessment?", a: "Ongeveer 20 tot 25 minuten, online, op een moment dat jou past. Het assessment is er in het Nederlands en het Engels." },
      { q: "Kan ons jeugdteam meedoen?", a: "Nee. Het teamaanbod is voor teams met spelers van 18 jaar en ouder." },
      { q: "Kunnen we na het seizoen opnieuw meten?", a: "Ja, als je dat wilt. Elke speler kan na het seizoen zelf een herhaalmeting doen tegen de prijs die dan voor de herhaalmeting geldt. Die is niet verplicht en zit niet in de teamprijs." },
      { q: "Worden we hier beter van in de competitie?", a: "Dat beloven we niet; niemand kan een uitslag garanderen. Wat je wel krijgt: iedere speler weet waar het eigen spel onder druk hapert en wat daaraan te doen is, en het team heeft een winter lang gericht geoefend op wat er tussen de slagen gebeurt." },
    ],
    proLabel: "Ben je PGA-pro?", proTitle: "Betaalde teamlessen", proTitleEm: "in de rustige maanden",
    proBody: "Heeft een captain je deze pagina gestuurd? Dan wil dat team deze winter met jou werken. Jij start het team; het lesmateriaal ligt klaar.",
    proPoints: [
      "Je doet gratis je eigen assessment en krijgt je eigen dashboard.",
      "Je start het team vanuit je dashboard en geeft de spelers de teamcode.",
      "Lesprogramma's op maat van het team, voor teamlessen en individuele lessen.",
      "Je bepaalt zelf het aantal lessen, het tempo en je lesgeld, en je factureert rechtstreeks aan het team.",
    ],
    proCost: "Aanmelden en je eigen assessment zijn gratis, net als je eerste vijf lesprogramma's. Wie daarna doorgaat, neemt het abonnement van het Pro-programma ($199 per jaar bij toelating t/m 31 maart 2027).",
    proCta: "Meld je aan als pro",
    stickyCta: "Stuur dit naar je pro", footerRights: "Alle rechten voorbehouden.",
  },
  en: {
    badge: "For competition teams · winter 2026/2027",
    heroTitle: "This winter your team trains",
    heroTitleEm: "the mental game too",
    heroP1: "On match day the technique is already there. What counts then is what happens between the shots. With MentalRoutine your team works on exactly that this winter, together with your own pro.",
    heroP2: "Every player gets a personal mental profile, the team gets a team report and the pro gives lessons that are about you.",
    ctaSend: "Send this to your pro", ctaHow: "See how it works",
    trust: "Introductory price: €15 per player · €99 maximum per team · sign up from 1 December to 28 February",
    whyLabel: "Why you want this", whyTitle: "What your team", whyTitleEm: "gets out of it",
    whyIntro: "Most teams spend the winter on their swing. Hardly any team trains what happens after a missed putt, on the first tee, or in the closing holes of a match that is all square.",
    whyCards: [
      { title: "Every player knows their own game under pressure", desc: "Each player takes the full MentalRoutine assessment and gets a personal profile: the eight steps of the mental routine, their strengths and one concrete starting point for the course." },
      { title: "The team sees itself as a team", desc: "The captain receives a team report: one shared picture of where you are strong as a team and what you work on together this winter." },
      { title: "Lessons that are about you", desc: "Your pro builds the team lessons on what the assessment shows. Not a general clinic, but training that fits this team." },
      { title: "One language for the whole team", desc: "Everyone talks about the same steps. That makes it easier to help each other during a match, and to discuss afterwards what happened." },
    ],
    lossLabel: "And if you don't", lossTitle: "Another winter of", lossTitleEm: "technique only",
    lossItems: [
      "Your first conversation about nerves and recovery then happens on the first match day, when it already matters.",
      "Every player keeps guessing where their own game slips once it gets tense.",
      "Winter lessons stay the same for everyone, while no two players need the same thing.",
      "After 28 February the introductory price is gone and taking part costs €49 per player.",
    ],
    lossClose: "A whole winter of preparation, for less than a box of balls per player.",
    priceLabel: "What it costs", priceTitle: "A price you don't need", priceTitleEm: "a committee meeting for",
    priceNow: {
      label: "Introductory price · season 2026/2027", badge: "Introductory discount",
      player: "€15", playerWas: "€49", playerSub: "per player",
      team: "€99", teamWas: "€299", teamSub: "maximum per team",
      note: "Introductory discount when you sign up from 1 December 2026 to 28 February 2027. The team amount is a ceiling: with seven players or more, the team never pays more than €99 in total.",
    },
    priceLater: { label: "Regular price, from season 2027/2028", line: "€49 per player, €299 maximum per team." },
    priceFacts: [
      "The full assessment, the same one that costs $79 on its own.",
      "A personal report for every player and a team report for the team.",
      "You agree the lesson fee directly with your pro; that is separate from this.",
      "For teams with players aged 18 and over.",
    ],
    howLabel: "4 steps", howTitle: "From idea", howTitleEm: "to first team lesson",
    howSteps: [
      { num: "01", title: "Talk to your pro", body: "Send this page to the pro at your club. A team always starts through a PGA professional; it takes the pro a few minutes." },
      { num: "02", title: "The pro starts the team", body: "The pro signs up with MentalRoutine, starts your team and gives you the team code." },
      { num: "03", title: "Every player takes the assessment", body: "Online, in 20 to 25 minutes, in English or Dutch. With the team code you pay the team rate." },
      { num: "04", title: "Reports and lessons", body: "Every player gets their own report, the captain gets the team report. Then the pro gives the team lessons. How many lessons and at what pace is something you agree together." },
    ],
    getLabel: "What you get", getTitle: "For the player, the captain", getTitleEm: "and the team",
    getItems: [
      { title: "For every player: a personal report", desc: "Your full personal report is yours. You share your scores within the team; whether you also share the whole report with the pro is up to you." },
      { title: "For the captain: the team report", desc: "The captain receives the team report and shares it with the team members and the pro." },
      { title: "For the team: lessons that fit", desc: "The pro uses MentalRoutine's lesson programs for the team lessons and, if you want, for individual lessons too." },
    ],
    sendLabel: "The first step", sendTitle: "Send this", sendTitleEm: "to your pro",
    sendBody: "One message is enough. Here the pro reads what the team gets to see and finds how signing up works at the bottom. You don't have to arrange or pay anything yourselves yet.",
    sendMail: "Email this page to your pro", sendCopy: "Copy the link", sendCopied: "Link copied",
    mailSubject: "Mental training with our competition team this winter?",
    mailBody: "Hi,\n\nThis winter we would like to work on the mental game with our competition team, and we can do that through MentalRoutine together with you as our pro. Every player takes an assessment, the team gets a team report and you give the team lessons with ready-made lesson material. You agree your lesson fee with us yourself.\n\nThis page explains how it works, with a section for the pro at the bottom:\n{url}\n\nWould you take a look?\n\nBest regards,",
    noPro: "Would you like to take part as a team without a pro? Get in touch and we'll look at what is possible together: ",
    noProLink: TEAM_CONTACT,
    faqLabel: "Questions?", faqTitle: "Frequently", faqTitleEm: "asked",
    faqs: [
      { q: "Why can a team only start through a pro?", a: "Because the assessment only pays off when you work with it afterwards. The pro starts the team, receives the lesson programs and gives the team lessons. Is there no pro at your club, or does your pro want to know more? Email " + TEAM_CONTACT + "." },
      { q: "What exactly do we pay?", a: "When you sign up from 1 December 2026 to 28 February 2027: €15 per player, with a maximum of €99 for the whole team. Six players pay €90 in total, seven or more pay €99 in total. From season 2027/2028 it is €49 per player and €299 maximum per team. The pro's lesson fee is separate and is agreed with the pro." },
      { q: "How many lessons are included?", a: "You decide that together with the pro. There is no fixed number and no fixed rhythm: the pro matches it to what the team needs and the time available." },
      { q: "Who sees my data?", a: "If you take part in a team, you share your own scores with the pro, the captain and your teammates. The team report is built on them, and you agree to this when you sign up. Your full personal report stays yours: you choose whether to share that with the pro as well." },
      { q: "How long does the assessment take?", a: "About 20 to 25 minutes, online, at a time that suits you. The assessment is available in English and Dutch." },
      { q: "Can our junior team take part?", a: "No. The team offer is for teams with players aged 18 and over." },
      { q: "Can we measure again after the season?", a: "Yes, if you want to. After the season each player can take a re-assessment at the price that applies to the re-assessment at that time. It is not required and not included in the team price." },
      { q: "Will this make us better in competition?", a: "We don't promise that; nobody can guarantee a result. What you do get: every player knows where their own game slips under pressure and what to do about it, and the team has spent a winter practising what happens between the shots." },
    ],
    proLabel: "Are you a PGA professional?", proTitle: "Paid team lessons", proTitleEm: "in the quiet months",
    proBody: "Did a captain send you this page? Then that team wants to work with you this winter. You start the team; the lesson material is ready.",
    proPoints: [
      "You take your own assessment for free and get your own dashboard.",
      "You start the team from your dashboard and give the players the team code.",
      "Lesson programs that fit the team, for team lessons and individual lessons.",
      "You decide the number of lessons, the pace and your fee, and you invoice the team directly.",
    ],
    proCost: "Signing up and your own assessment are free, and so are your first five lesson programs. If you continue after that, you take the Pro Program subscription ($199 per year when approved by 31 March 2027).",
    proCta: "Sign up as a pro",
    stickyCta: "Send this to your pro", footerRights: "All rights reserved.",
  },
};

/** Teamblok op /pro-program (zelfde feiten als hierboven; één bron). */
export const PRO_TEAM_BLOCK: Record<TeamLang, { label: string; title: string; titleEm: string; body: string; points: string[]; cost: string; link: string }> = {
  nl: {
    label: "Competitieteams", title: "Begeleid deze winter", titleEm: "de competitieteams van je club",
    body: "Competitieteams trainen in de winter vooral techniek, terwijl op een competitiedag vaak het hoofd het verschil maakt. Met het teamaanbod geef je ze betaalde teamlessen, met het lesmateriaal klaar.",
    points: TEAM_TEXT.nl.proPoints,
    cost: "Spelers betalen bij aanmelding van 1 december 2026 t/m 28 februari 2027 €15 per persoon, met een maximum van €99 per team. Voor jou gelden de gewone regels van het Pro-programma: je eerste vijf lesprogramma's zijn gratis, daarna het abonnement.",
    link: "Bekijk wat je team te zien krijgt",
  },
  en: {
    label: "Competition teams", title: "Coach your club's", titleEm: "competition teams this winter",
    body: "Competition teams mostly train technique in winter, while on match day it is often the mental game that makes the difference. With the team offer you give them paid team lessons, with the lesson material ready.",
    points: TEAM_TEXT.en.proPoints,
    cost: "Players pay €15 each when they sign up from 1 December 2026 to 28 February 2027, with a maximum of €99 per team. For you the normal Pro Program rules apply: your first five lesson programs are free, then the subscription.",
    link: "See what your team gets to see",
  },
};
