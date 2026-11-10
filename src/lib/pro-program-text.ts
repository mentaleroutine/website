/**
 * Teksten van /pro-program in NL en EN (besluit 10-11-2026, portal-repo docs/PRO_PROGRAM_NL_EN_AANVRAGEN_PLAN.md).
 * Bewust NIET in translations.ts (5 talen): alles ná goedkeuring (PRO Admin, pro-mails, clinicmateriaal) bestaat
 * alleen in NL/EN, dus DE/FR/ES-bezoekers zien de Engelse pagina. De NL-tekst is toegespitst op de Nederlandse
 * clubpro (toon, voorbeelden); de FEITEN en BELOFTES zijn in beide talen identiek: eigen assessment ($79), clinic kit
 * (2 clinics), communication kit, $20-code, 5 gratis lesprogramma's, daarna $199/jaar introductietarief t/m 31-3-2027
 * (peildatum = goedkeuring, blijvend zolang je verlengt), daarna $299/jaar voor nieuwe pro's.
 *
 * Clinicmodel (10-11-2026, portal-repo docs/SESSIE_PRO_KETEN_NOV2026.md §3.5a): clinic 1 = gratis kennismaking,
 * clinic 2 = betaald vervolg (de pro bepaalt en houdt de entree). Beloof GEEN "zonder voorbereiding": de pro vult
 * dia's in, verstuurt mails en maakt voor clinic 2 een groepsprogramma. Wel waar: niets zelf ontwikkelen.
 */
import type { Lang } from "@/context/lang-context";

export type ProLang = "nl" | "en";
export const proLang = (lang: Lang): ProLang => (lang === "nl" ? "nl" : "en");

export const INTRO_UNTIL_DISPLAY = { nl: "31 maart 2027", en: "31 March 2027" } as const;
export const PRICES = { intro: 199, regular: 299, assessment: 79, discount: 20, freePrograms: 5 } as const;

// PGA-divisies en landen: per taal een andere volgorde (NL: PGA Holland, Nederland en België bovenaan).
export const PGA_DIVISIONS: Record<ProLang, string[]> = {
  nl: ["PGA Holland", "PGA Belgium", "PGA UK", "PGA of America", "PGA Australia", "Other"],
  en: ["PGA of America", "PGA UK", "PGA Holland", "PGA Belgium", "PGA Australia", "Other"],
};
export const COUNTRIES: Record<ProLang, string[]> = {
  nl: ["Netherlands", "Belgium", "Germany", "United Kingdom", "France", "Spain", "United States", "Canada", "Australia", "Other"],
  en: ["United States", "United Kingdom", "Canada", "Australia", "Netherlands", "Belgium", "France", "Germany", "Spain", "Other"],
};
export const COUNTRY_LABEL: Record<string, Record<ProLang, string>> = {
  "Netherlands": { nl: "Nederland", en: "Netherlands" }, "Belgium": { nl: "België", en: "Belgium" },
  "Germany": { nl: "Duitsland", en: "Germany" }, "United Kingdom": { nl: "Verenigd Koninkrijk", en: "United Kingdom" },
  "France": { nl: "Frankrijk", en: "France" }, "Spain": { nl: "Spanje", en: "Spain" },
  "United States": { nl: "Verenigde Staten", en: "United States" }, "Canada": { nl: "Canada", en: "Canada" },
  "Australia": { nl: "Australië", en: "Australia" }, "Other": { nl: "Anders", en: "Other" },
};

type Card = { title: string; desc: string };
type Step = { num: string; title: string; body: string };
type Faq = { q: string; a: string };

export type ProText = {
  badge: string; heroTitle: string; heroTitleEm: string; heroP1: string; heroP1Strong: string; heroP2: string;
  ctaApply: string; ctaHow: string; ctaNow: string; trust: string;
  getLabel: string; getTitle: string; getTitleEm: string; getCards: Card[]; getNote: string; getNoteStrong1: string; getNoteStrong2: string;
  fitLabel: string; fitTitle: string; fitTitleEm: string; fitCards: { label: string; title: string; sub: string }[];
  fitIdeaLabel: string; fitIdea: string;
  howLabel: string; howTitle: string; howTitleEm: string; howSteps: Step[];
  genLabel: string; genTitle: string; genTitleEm: string; genBody: string;
  genItems: Card[];
  whyLabel: string; whyTitle: string; whyTitleEm: string; whyCards: Card[];
  faqLabel: string; faqTitle: string; faqTitleEm: string; faqs: Faq[];
  formLabel: string; formTitle: string; formTitleEm: string; formIntro: string;
  f: { fullName: string; email: string; pga: string; pgaPh: string; division: string; divisionOther: string; select: string; linkedin: string; linkedinOpt: string;
       country: string; facility: string; facilityPh: string; students: string; studentsPh: string; group: string; mental: string;
       yes: string; no: string; some: string; found: string; foundLinkedin: string; foundColleague: string; foundGoogle: string; foundOther: string;
       submit: string; sending: string; error: string; errorRate: string; errorEmail: string; privacy: string;
       namePh: string; emailPh: string; free: string; noObligation: string; response: string };
  doneTitle: string; doneP1: string; doneP2: string; doneP3: string;
  stickyCta: string; footerRights: string;
};

export const PRO_TEXT: Record<ProLang, ProText> = {
  en: {
    badge: "PGA Professional Program",
    heroTitle: "A Second Revenue Stream",
    heroTitleEm: "from the Students You Already Teach",
    heroP1: "Turn the mental game into a ",
    heroP1Strong: "natural extension of your teaching practice",
    heroP2: "Give your students a clear picture of their mental game, then build individual and group lesson programs around it — with ready-made materials: nothing to develop yourself.",
    ctaApply: "Apply for Access", ctaHow: "See How It Works", ctaNow: "Apply Now",
    trust: "Free for approved pros · By application · Available worldwide",
    getLabel: "Free for Approved Pros", getTitle: "Everything You Need", getTitleEm: "to Add the Mental Game",
    getCards: [
      { title: "Do It Yourself First", desc: "Take the full assessment yourself — free ($79 value). You'll teach it far better once you've felt it." },
      { title: "Clinic Kit", desc: "Two clinics, worked out for you: a free introduction before the assessment and a paid follow-up after it, for which you set and keep the entry fee. With a start-here guide, run sheets, slides, a take-home handout, a route sheet for attendees and two posters." },
      { title: "Communication Kit", desc: "Invitation, confirmation, reminder and follow-up emails, a club newsletter piece and social posts — written for you to send in your own name." },
      { title: "Personal Discount Code", desc: "A code that gives your students $20 off the assessment — a natural reason to reach out." },
    ],
    getNote: "You also get ", getNoteStrong1: "access to PRO Admin", getNoteStrong2: "your first five programs are free",
    fitLabel: "Why It Fits Your Practice", fitTitle: "Your Students Are", fitTitleEm: "Already Here.",
    fitCards: [
      { label: "One Assessment", title: "A Clear Starting Point", sub: "Every golfer you coach gets a clear picture of their mental game — and a reason to work on it with you." },
      { label: "Two Lesson Formats", title: "Individual & Group", sub: "Build private lesson programs or run a clinic. The material is ready; you bring the coaching." },
      { label: "One Student Base", title: "No New Audience Needed", sub: "You already have the relationships. This simply gives you a second, natural thing to teach." },
    ],
    fitIdeaLabel: "The Idea in One Line",
    fitIdea: "A second lesson offer, built on the students you already have — with the materials ready, so you develop nothing yourself.",
    howLabel: "3 Simple Steps", howTitle: "Apply, Get Approved,", howTitleEm: "Then Get Started",
    howSteps: [
      { num: "01", title: "Apply", body: "Fill in the form below. It only takes a few minutes and tells us about your teaching practice." },
      { num: "02", title: "We Screen Your Application", body: "We review every application by hand and verify your PGA credentials. It's a deliberate quality gate — so the program stays credible for you and your students." },
      { num: "03", title: "Get Access", body: "Once you're approved you get an email. Create your free portal account with the email address of your application (or log in if you already have one), confirm your email address and PRO Admin opens. There you start your free assessment and you find the clinic and communication kits, your personal discount code and the lesson program generator." },
    ],
    genLabel: "When You're Ready to Scale", genTitle: "The Lesson Program", genTitleEm: "Generator",
    genBody: "Build individual and group lesson programs directly from your students' assessments — the structure and materials are generated for you. Your first five are free to try on real students. After that: $199 per year if you're approved by 31 March 2027, and you keep that rate for as long as you renew. From 1 April 2027 new pros pay $299 per year. You set your own lesson price.",
    genItems: [
      { title: "Individual & Group Programs", desc: "Generate structured lesson programs for private students and groups, built on the profile of every student who shares it with you" },
      { title: "First Five Programs Free", desc: "Try the generator on real students at no cost" },
      { title: "$199 Per Year Until 31 March 2027", desc: "Introductory rate for pros approved by then — yours for as long as you renew. From 1 April 2027: $299 per year for new pros" },
      { title: "PRO Admin", desc: "Your assessment, clinic kit, communication kit and lesson programs, all in one place" },
    ],
    whyLabel: "Why Pros Add It", whyTitle: "What It Does", whyTitleEm: "for Your Practice",
    whyCards: [
      { title: "A reason to reach out", desc: "It gives you a natural opening to talk mental game with students you've only ever coached on technique." },
      { title: "Nothing to develop yourself", desc: "The run sheets, slides and printable materials are ready — you fill in your own details and bring the coaching." },
      { title: "Data to build on", desc: "Every assessment gives you a clear picture of a student's mental game to design a lesson program around — once they share their profile with you." },
    ],
    faqLabel: "Questions?", faqTitle: "Frequently", faqTitleEm: "Asked",
    faqs: [
      { q: "What do I get once I'm approved?", a: "Everything in the free program: your own MentalRoutine Assessment (a $79 value), a clinic kit for two clinics (a start-here guide, run sheets, slides, a take-home handout, a route sheet for attendees and two posters), a communication kit, a personal discount code that gives your students $20 off the assessment, and access to PRO Admin. You can also build individual and group lesson programs — your first five are free." },
      { q: "Do I have to apply first, or can I start straight away?", a: "You apply first. We review every application by hand and verify your PGA credentials before granting access — including access to the free assessment. It's a deliberate quality gate, so the program stays credible for you and your students." },
      { q: "Do I need to be a PGA member?", a: "Yes. We verify PGA credentials to ensure quality and credibility for both you and your students. All PGA divisions worldwide are welcome." },
      { q: "What's free, what's paid, and what does the subscription cost?", a: "Once you're approved, the assessment, clinic kit, communication kit, discount code, portal access and your first five lesson programs are all free. After those five, the lesson program generator continues on a yearly subscription: $199 per year if you're approved by 31 March 2027 (an introductory rate you keep for as long as you renew), or $299 per year for pros approved from 1 April 2027. The date of approval counts, not the date you apply — apply by 24 March 2027 to be on the safe side. The group lesson you build for the second clinic is one of those five. You can cancel any time, and you set your own lesson prices." },
      { q: "Can I set my own prices for clinics and lessons?", a: "Absolutely. You teach your students and set whatever price works for your market — that arrangement is entirely between you and them. The first clinic is a free introduction; for the second clinic you charge your own entry fee and keep it. The Pro Program simply gives you the assessment, materials and lesson programs to build on." },
      { q: "How fast will I get approved?", a: "We aim to review applications within 1-3 business days. You'll get an email either way. Once approved, you create your free portal account with the email address of your application (or log in if you already have one), confirm your email address and PRO Admin is open." },
      { q: "Do I earn commission on the assessment?", a: "No. Your students buy the assessment themselves from MentalRoutine ($79, or $59 with your code). Your earnings are in the second clinic, for which you charge your own entry fee, and in the lessons that follow." },
      { q: "How much time does it take?", a: "Your own assessment takes 20 to 25 minutes. The first clinic is just over an hour, the second about two and a half hours. You fill in your own details on the slides, send the ready-made emails and build the group lesson in PRO Admin the day before the second clinic. The kit has a timeline for all of it." },
      { q: "What do I see of my students?", a: "Only what they share. A student decides whether you see the scores and the report, and can stop sharing at any time. Without sharing there is no lesson program for that student." },
      { q: "In which languages is the material available?", a: "In Dutch and English: the clinic kit, PRO Admin and the emails. Lesson programs are written in the language of your account." },
    ],
    formLabel: "Apply Now", formTitle: "Join the Pro", formTitleEm: "Program",
    formIntro: "We review every application personally. You'll usually hear back within 1-3 business days.",
    f: { fullName: "Full Name *", email: "Email *", pga: "PGA Membership Number *", pgaPh: "Your PGA number", division: "PGA Division *", divisionOther: "Which PGA? *", select: "Select...",
         linkedin: "LinkedIn Profile URL", linkedinOpt: "optional", country: "Country *", facility: "Club / Facility *", facilityPh: "Your club or facility",
         students: "Active Students (approx.) *", studentsPh: "e.g. 40", group: "Do you give group lessons / clinics? *", mental: "Experience with mental coaching? *",
         yes: "Yes", no: "No", some: "A little", found: "How did you find us? *", foundLinkedin: "LinkedIn", foundColleague: "Colleague", foundGoogle: "Google", foundOther: "Other",
         submit: "Submit Application", sending: "Sending...", error: "Something went wrong. Please try again or email support@mentalroutine.com",
         errorRate: "That was a few attempts in a row. Please wait a minute and try again.",
         errorEmail: "Please check your email address and the required fields, then try again.",
         privacy: "We use these details only to review your application and to set up your pro account. We don't share them with anyone.",
         namePh: "Your name", emailPh: "you@yourclub.com",
         free: "Free to apply", noObligation: "No obligations", response: "Usually a reply within 1-3 business days" },
    doneTitle: "Application Received!",
    doneP1: "Thank you for your interest in the Pro Program.",
    doneP2: "We'll review your application and usually get back to you within 1-3 business days — you'll get an email either way.",
    doneP3: "Once approved, you create your free portal account with this email address (or log in if you already have one) and PRO Admin opens for you.",
    stickyCta: "Apply for Access", footerRights: "All rights reserved.",
  },
  nl: {
    badge: "Programma voor PGA-professionals",
    heroTitle: "Een tweede lesaanbod,",
    heroTitleEm: "voor de leerlingen die je al hebt",
    heroP1: "Maak van het mentale spel ",
    heroP1Strong: "een vanzelfsprekend onderdeel van je lespraktijk",
    heroP2: "Geef je leerlingen een helder beeld van hun mentale spel en bouw daar individuele lessen en groepslessen op — met kant-en-klaar materiaal: je hoeft niets zelf te ontwikkelen.",
    ctaApply: "Toegang aanvragen", ctaHow: "Zo werkt het", ctaNow: "Nu aanvragen",
    trust: "Gratis voor toegelaten pro's · Op aanvraag · Wereldwijd beschikbaar",
    getLabel: "Gratis voor toegelaten pro's", getTitle: "Alles wat je nodig hebt", getTitleEm: "om het mentale spel erbij te nemen",
    getCards: [
      { title: "Doe het eerst zelf", desc: "Doe het volledige assessment zelf — gratis (t.w.v. $79). Je legt het model overtuigender uit als je je eigen rapport kent." },
      { title: "Clinicpakket", desc: "Twee uitgewerkte clinics: een gratis kennismaking vóór het assessment en een betaald vervolg erna, waarvoor jij de entree bepaalt en houdt. Met “Lees dit eerst”, draaiboeken, presentaties, een hand-out, een routeblad voor deelnemers en twee posters." },
      { title: "Communicatiepakket", desc: "Uitnodigings-, bevestigings-, herinnerings- en opvolgmails, een stuk voor de clubnieuwsbrief en social posts — geschreven om in je eigen naam te versturen." },
      { title: "Persoonlijke kortingscode", desc: "Een code die je leerlingen $20 korting geeft op het assessment — een natuurlijke reden om ze aan te spreken." },
    ],
    getNote: "Je krijgt ook ", getNoteStrong1: "toegang tot PRO Admin", getNoteStrong2: "je eerste vijf programma's zijn gratis",
    fitLabel: "Waarom het bij je praktijk past", fitTitle: "Je leerlingen", fitTitleEm: "heb je al.",
    fitCards: [
      { label: "Eén assessment", title: "Een helder startpunt", sub: "Elke golfer aan wie je lesgeeft krijgt een duidelijk beeld van het eigen mentale spel — en een reden om er met jou aan te werken." },
      { label: "Twee lesvormen", title: "Individueel en in de groep", sub: "Bouw een persoonlijk lesprogramma of draai een clinic. Het materiaal ligt klaar; jij geeft de les." },
      { label: "Eén leerlingenbestand", title: "Geen nieuw publiek nodig", sub: "De relaties heb je al. Dit geeft je gewoon een tweede, logisch onderwerp om les in te geven." },
    ],
    fitIdeaLabel: "In één zin",
    fitIdea: "Een tweede lesaanbod, gebouwd op de leerlingen die je al hebt — met het materiaal klaar, zodat je niets zelf hoeft te ontwikkelen.",
    howLabel: "3 eenvoudige stappen", howTitle: "Aanvragen, toelating,", howTitleEm: "en dan aan de slag",
    howSteps: [
      { num: "01", title: "Aanvragen", body: "Vul het formulier hieronder in. Het kost een paar minuten en vertelt ons iets over je lespraktijk." },
      { num: "02", title: "Wij beoordelen je aanvraag", body: "We bekijken elke aanvraag persoonlijk en controleren je PGA-gegevens. Dat is een bewuste kwaliteitsdrempel — zo blijft het programma geloofwaardig voor jou en je leerlingen." },
      { num: "03", title: "Toegang", body: "Zodra je bent toegelaten krijg je een mail. Je maakt je gratis portal-account aan met het e-mailadres van je aanvraag (of logt in als je er al een hebt), bevestigt je e-mailadres en PRO Admin gaat open. Daar start je je gratis assessment en vind je het clinic- en communicatiepakket, je persoonlijke kortingscode en de lesprogramma-generator." },
    ],
    genLabel: "Als je verder wilt", genTitle: "De lesprogramma-", genTitleEm: "generator",
    genBody: "Bouw individuele en groepslesprogramma's rechtstreeks op de assessments van je leerlingen — de opzet en het materiaal worden voor je gemaakt. Je eerste vijf zijn gratis, om uit te proberen met echte leerlingen. Daarna: $199 per jaar als je vóór 1 april 2027 bent toegelaten, en dat tarief houd je zolang je verlengt. Vanaf 1 april 2027 betalen nieuwe pro's $299 per jaar. Je lesprijs bepaal je zelf.",
    genItems: [
      { title: "Individuele en groepsprogramma's", desc: "Genereer gestructureerde lesprogramma's voor privéleerlingen en groepen, gebouwd op het profiel van elke leerling die het met je deelt" },
      { title: "Eerste vijf programma's gratis", desc: "Probeer de generator kosteloos uit met echte leerlingen" },
      { title: "$199 per jaar tot en met 31 maart 2027", desc: "Introductietarief voor pro's die uiterlijk op die datum zijn toegelaten — en dat blijft zo zolang je verlengt. Vanaf 1 april 2027: $299 per jaar voor nieuwe pro's" },
      { title: "Toegang tot PRO Admin", desc: "Je assessment, clinicpakket, communicatiepakket en lesprogramma's op één plek" },
    ],
    whyLabel: "Waarom pro's het erbij nemen", whyTitle: "Wat het doet", whyTitleEm: "voor je praktijk",
    whyCards: [
      { title: "Een reden om contact te zoeken", desc: "Het geeft je een natuurlijke opening om over het mentale spel te praten met leerlingen aan wie je tot nu toe alleen techniekles gaf." },
      { title: "Niets zelf ontwikkelen", desc: "De draaiboeken, presentaties en het printmateriaal liggen klaar — jij vult je eigen gegevens in en geeft de les." },
      { title: "Iets om op te bouwen", desc: "Elk assessment geeft je een helder beeld van het mentale spel van een leerling om een lesprogramma op te ontwerpen — zodra de leerling het profiel met je deelt." },
    ],
    faqLabel: "Vragen?", faqTitle: "Veelgestelde", faqTitleEm: "vragen",
    faqs: [
      { q: "Wat krijg ik zodra ik ben toegelaten?", a: "Alles uit het gratis programma: je eigen MentalRoutine Assessment (t.w.v. $79), een clinicpakket voor twee clinics (“Lees dit eerst”, draaiboeken, presentaties, hand-out, routeblad voor deelnemers en twee posters), een communicatiepakket, een persoonlijke kortingscode waarmee je leerlingen $20 korting krijgen op het assessment, en toegang tot PRO Admin. Je kunt ook individuele en groepslesprogramma's bouwen — je eerste vijf zijn gratis." },
      { q: "Moet ik eerst aanvragen, of kan ik meteen beginnen?", a: "Je vraagt eerst aan. We bekijken elke aanvraag persoonlijk en controleren je PGA-gegevens voordat we toegang geven — ook tot het gratis assessment. Dat is een bewuste kwaliteitsdrempel, zodat het programma geloofwaardig blijft voor jou en je leerlingen." },
      { q: "Moet ik PGA-lid zijn?", a: "Ja. We controleren PGA-gegevens om de kwaliteit en geloofwaardigheid voor jou en je leerlingen te borgen. Alle PGA-afdelingen wereldwijd zijn welkom." },
      { q: "Wat is gratis, wat is betaald, en wat kost het abonnement?", a: "Zodra je bent toegelaten zijn het assessment, het clinicpakket, het communicatiepakket, de kortingscode, de portal en je eerste vijf lesprogramma's allemaal gratis. Na die vijf loopt de lesprogramma-generator door op een jaarabonnement: $199 per jaar als je vóór 1 april 2027 bent toegelaten (een introductietarief dat je houdt zolang je verlengt), of $299 per jaar voor pro's die vanaf 1 april 2027 worden toegelaten. De datum van toelating telt, niet de datum van je aanvraag: vraag uiterlijk 24 maart 2027 aan om zeker te zijn. De groepsles die je voor de tweede clinic maakt, is één van die vijf. Opzeggen kan altijd, en je lesprijzen bepaal je zelf. Alle bedragen op deze pagina zijn in Amerikaanse dollars; zo wordt er ook afgerekend." },
      { q: "Mag ik zelf mijn prijzen voor clinics en lessen bepalen?", a: "Zeker. Jij geeft les aan je leerlingen en vraagt wat bij jouw markt past — dat regel je volledig met hen. De eerste clinic is een gratis kennismaking; voor de tweede clinic vraag je je eigen entree, en die houd je zelf. Het Pro-programma geeft je alleen het assessment, het materiaal en de lesprogramma's om op te bouwen." },
      { q: "Hoe snel word ik toegelaten?", a: "We streven ernaar aanvragen binnen 1-3 werkdagen te beoordelen. Je krijgt hoe dan ook een mail. Na toelating maak je je gratis portal-account aan met het e-mailadres van je aanvraag (of je logt in als je er al een hebt), bevestig je je e-mailadres en staat PRO Admin voor je open." },
      { q: "Verdien ik commissie op het assessment?", a: "Nee. Je leerlingen kopen het assessment zelf bij MentalRoutine ($79, met jouw code $59). Jouw verdienste zit in de tweede clinic, waarvoor je je eigen entree vraagt, en in de lessen daarna." },
      { q: "Hoeveel tijd kost het?", a: "Je eigen assessment kost 20 tot 25 minuten. De eerste clinic duurt ruim een uur, de tweede ongeveer tweeënhalf uur. Je vult je eigen gegevens in op de dia's, verstuurt de kant-en-klare mails en maakt een dag voor de tweede clinic de groepsles in PRO Admin. In het pakket zit een tijdpad voor het geheel." },
      { q: "Wat zie ik van mijn leerlingen?", a: "Alleen wat ze delen. Een leerling bepaalt of je de scores en het rapport ziet, en kan het delen altijd weer stoppen. Zonder delen is er voor die leerling geen lesprogramma." },
      { q: "In welke talen is het materiaal er?", a: "In het Nederlands en het Engels: het clinicpakket, PRO Admin en de mails. Lesprogramma's worden geschreven in de taal van je account." },
    ],
    formLabel: "Nu aanvragen", formTitle: "Doe mee met het", formTitleEm: "Pro-programma",
    formIntro: "We bekijken elke aanvraag persoonlijk. Je hoort meestal binnen 1-3 werkdagen van ons.",
    f: { fullName: "Volledige naam *", email: "E-mail *", pga: "PGA-lidmaatschapsnummer *", pgaPh: "Je PGA-nummer", division: "PGA-afdeling *", divisionOther: "Welke PGA? *", select: "Kies...",
         linkedin: "LinkedIn-profiel (URL)", linkedinOpt: "optioneel", country: "Land *", facility: "Club / baan *", facilityPh: "Je club of baan",
         students: "Actieve leerlingen (ongeveer) *", studentsPh: "bv. 40", group: "Geef je groepslessen of clinics? *", mental: "Ervaring met mentale coaching? *",
         yes: "Ja", no: "Nee", some: "Een beetje", found: "Hoe heb je ons gevonden? *", foundLinkedin: "LinkedIn", foundColleague: "Collega", foundGoogle: "Google", foundOther: "Anders",
         submit: "Aanvraag versturen", sending: "Versturen...", error: "Er ging iets mis. Probeer het opnieuw of mail support@mentalroutine.com",
         errorRate: "Dat waren een paar pogingen achter elkaar. Wacht een minuut en probeer het dan opnieuw.",
         errorEmail: "Controleer je e-mailadres en de verplichte velden, en probeer het dan opnieuw.",
         privacy: "We gebruiken deze gegevens alleen om je aanvraag te beoordelen en je pro-account in te richten. We delen ze met niemand.",
         namePh: "Je naam", emailPh: "jij@jouwclub.nl",
         free: "Aanvragen is gratis", noObligation: "Geen verplichtingen", response: "Meestal antwoord binnen 1-3 werkdagen" },
    doneTitle: "Aanvraag ontvangen!",
    doneP1: "Bedankt voor je interesse in het Pro-programma.",
    doneP2: "We bekijken je aanvraag en laten meestal binnen 1-3 werkdagen van ons horen — je krijgt hoe dan ook een mail.",
    doneP3: "Na toelating maak je je gratis portal-account aan met dit e-mailadres (of je logt in als je er al een hebt) en gaat PRO Admin voor je open.",
    stickyCta: "Toegang aanvragen", footerRights: "Alle rechten voorbehouden.",
  },
};
