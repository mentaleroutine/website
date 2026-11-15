/**
 * Teksten en feiten van /teams (teamaanbod voor competitieteams) in NL en EN — gebouwd 14-11-2026 op de besluiten
 * in de portal-repo `docs/TEAMAANBOD_NOV2026.md` (bron: besluitenregister 14-11-2026); herschreven 15-11-2026 nadat
 * vijftien proeflezers de pagina naast het echte teamrapport legden, en opnieuw na leesronde 15 (portal-repo
 * `docs/MENUKAART_TEAMRAPPORT_PANEL.md` §18, "Wat niet goed is: de teampagina").
 *
 * WAT DE PAGINA MAG ZEGGEN (besluiten, niet stilzwijgend wijzigen):
 * - Een team start via een PGA-pro. Geen eigen startroute voor captains; wel een contactregel voor teams zonder pro
 *   (belooft niet dát het kan).
 * - €15 per speler, maximaal €99 per team bij aanmelding van 1-12-2026 t/m 28-2-2027; daarna €49 / €299.
 *   De €49 is GEEN "was"-prijs (heeft nooit gegolden): niet doorstrepen, schrijf "na 28 februari 2027".
 *   HOE het plafond wordt afgerekend is nog niet gebouwd: geen mechaniek beschrijven (geen teamcode, geen kassa);
 *   alleen "de pro meldt het team aan; bij aanmelding hoor je hoe het afrekenen loopt".
 *   Euro's in beide talen. De Engelse pagina weert buitenlandse teams niet en werft ze niet; ze zegt wel eerlijk dat
 *   het rapport de spelvormen van de Nederlandse NGF-competitie volgt.
 *   Het losse assessment ($79), de herhaalmeting ($39) en het pro-abonnement ($199) zijn in dollars: dat staat één
 *   keer duidelijk bij de prijs.
 * - Alleen spelers van 18 jaar en ouder.
 * - WIE ZIET WAT (klopt met het rapport, 15-11-2026): het team en de captain lezen het teamrapport; daarin staan
 *   teamgemiddelden en per speler IN WOORDEN wat het hoogst ligt en waar die aan werkt. Schrijf dus altijd
 *   "geen cijfers PER SPELER", nooit kaal "zonder cijfers" (de test keurt dat af). Enige getal per speler dat in het
 *   teamrapport kan staan: de handicap, in de voorbeeldindeling van de paren. De pro krijgt daarnaast een bijlage
 *   met de scores per speler en ieders antwoord op de teamvraag (of dat die is overgeslagen); de beheerder van
 *   MentalRoutine kan de bijlage ook openen. Van de teamvraag staat in het rapport alleen een telling voor het hele
 *   team; het paar kruist samen op het kaartje aan wat het doet.
 *   TOESTEMMING (besluit opdrachtgever 15-11-2026, zo gebouwd in de portal): TWEE vinkjes bij de teamlink.
 *   1 (verplicht om mee te doen): "Ik doe mee met het team. Mijn uitkomst mag in het teamrapport staan, dat de captain
 *     en het team lezen (in woorden, zonder scores), en {pro} ziet mijn scores. Ik kan het delen altijd weer stoppen in
 *     de portal."
 *   2 (niet verplicht, nooit voorgevinkt): "{pro} mag ook mijn volledige persoonlijke rapport openen. Dat kan ik later
 *     in de portal aan- of uitzetten."
 *   Dus: de pro ziet ALTIJD de scores per speler en het antwoord op de teamvraag (of dat die is overgeslagen); het
 *   volledige persoonlijke rapport (het spelersprofiel) ALLEEN als de speler dat apart aanvinkt. Het team en de
 *   captain zien het persoonlijke rapport nooit. Niemand is verplicht mee te doen. Stoppen met delen = de pro ziet
 *   scores en rapport niet meer, een nieuw teamrapport is zonder die speler, een bestaand rapport blijft.
 *   Beloof de pro dus niet dat alle persoonlijke rapporten te lezen zijn.
 * - TEAM DAT ZELF HET THEMA KIEST (scores dicht bij elkaar): geen thema of paren uit de cijfers, per speler geen hoogste
 *   of laagste onderdeel, drie thema's om uit te kiezen (elk met een oefenvorm en een voorbeeldafspraak), en de pro
 *   krijgt per thema een teamles in plaats van de lessenreeks. Noem die uitzondering waar de lijsten iets anders zeggen.
 * - De speler krijgt het eigen SPELERSPROFIEL (samenvatting en volledig rapport). Beloof bij het teamaanbod geen
 *   trainingsrapporten.
 * - TIJD: eerlijk, niet optimistisch (aanwijzing opdrachtgever 15-11-2026). Team: assessment 20–25 min per speler,
 *   teamavond anderhalf tot twee uur, vier wintertrainingen met de paren, een kaartje per paar, terugblik van twee
 *   minuten na elke speeldag. Pro: zie `pro.steps` (leercurve, een paar avonden, voorbereiding per les).
 * - De pro bepaalt zelf aantal lessen, tempo en lesgeld; lessen zitten NIET in de teamprijs. De bijlage bevat een
 *   lessenreeks van vier lessen als kapstok: materiaal, geen verplichting.
 * - Voor de pro gelden de gewone regels van het Pro-programma; bedragen en termijnen LETTERLIJK uit
 *   `pro-program-text.ts` (aanvraag, toelating 1–3 werkdagen, eigen assessment gratis, vijf lesprogramma's gratis,
 *   daarna $199/jaar bij toelating vóór 1-4-2027, anders $299). Een teamrapport telt niet mee voor die vijf.
 * - Herhaalmeting: vrijwillig, $39, niet inbegrepen, geen korting beloven.
 * - GEEN claims over betere wedstrijdresultaten, geen verzonnen schaarste, geen beweringen die een vragenlijst niet
 *   draagt ("wat een speler nodig heeft", "een profiel dat jullie nog niet kennen"). Het rapport bepaalt niet wie er
 *   speelt en meet geen gedrag op de baan. Schrijf "paren" / "pairs"; NIET de woorden die scripts/e2e/teams-check.js afkeurt.
 * - Geen gedachtestreepjes in paginatekst; neutraal over golfer en pro (EN: "they").
 * - EN-termen gelijk aan het rapport: set phrase, poor shot, team meeting, pair card, annex for the pro, practice
 *   formats, match day, run sheet, review (niet "look back"), reading guide, lesson programme. "Club team" / "league",
 *   niet "competition team".
 * - Wat het teamrapport bevat (lijsten in `get`) = wat de portal werkelijk levert (portal-repo
 *   docs/TEAMRAPPORT_UITVOERING.md). Verandert het rapport, dan deze lijsten en de citaten (`get.quotes`, letterlijk
 *   uit het voorbeeld public/samples/team/h18) meewijzigen.
 * - Er is op de site GEEN privacyverklaring of voorwaardenpagina: er wordt dus nergens naar gelinkt.
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

export const TEAM_PRICES = { introPlayer: 15, introTeam: 99, regularPlayer: 49, regularTeam: 299, single: 79, remeasure: 39 } as const;
export const TEAM_CONTACT = "support@mentalroutine.com";
export const SITE = "https://www.mentalroutine.com";

type Card = { title: string; desc: string };
type Step = { num: string; title: string; body: string };
type Faq = { q: string; a: string };
type Group = { title: string; size: string; items: string[] };
type Quote = { text: string; from: string };
type ProStep = { title: string; body: string; time: string };

export type TeamText = {
  docTitle: string;
  badge: string; heroTitle: string; heroTitleEm: string; heroPrice: string; heroPriceSub: string; heroP1: string;
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
  priceNow: { label: string; badge: string; player: string; playerSub: string; team: string; teamSub: string; note: string };
  priceLater: { label: string; line: string };
  priceFacts: string[];
  currencyNote: string;
  howLabel: string; howTitle: string; howTitleEm: string; howSteps: Step[];
  time: { label: string; title: string; items: string[]; note: string };
  see: { label: string; title: string; titleEm: string; items: Card[]; note: string };
  sendLabel: string; sendTitle: string; sendTitleEm: string; sendBody: string;
  sendMail: string; sendCopy: string; sendCopied: string; mailSubject: string; mailBody: string;
  noPro: string; noProLink: string;
  faqLabel: string; faqTitle: string; faqTitleEm: string; faqs: Faq[];
  pro: {
    label: string; title: string; titleEm: string; body: string;
    gainsLabel: string; gains: string[];
    stepsLabel: string; stepsIntro: string; timeLabel: string; steps: ProStep[];
    total: string; cost: string; cta: string; sample: string;
  };
  stickyCta: string; footerRights: string;
};

export const TEAM_TEXT: Record<TeamLang, TeamText> = {
  nl: {
    docTitle: "Mentaal trainen met je competitieteam | MentalRoutine",
    badge: "Voor competitieteams · winter 2026/2027",
    heroTitle: "Wat spreekt jullie team af",
    heroTitleEm: "na een mindere slag?",
    heroPrice: "€15 per speler · hooguit €99 per team",
    heroPriceSub: "bij aanmelding t/m 28 februari 2027",
    heroP1: "Eén teamavond, een kaartje per paar en de wedstrijddag op één pagina. Dat staat in één teamrapport, geschreven voor dit ene team, nadat iedere speler thuis het assessment heeft gedaan. Daarna kan jullie pro lessen geven rond jullie thema; dat spreek je met de pro af.",
    glance: [
      { title: "Wat het is", desc: "Een assessment per speler en één teamrapport voor het team. De lessen geeft jullie eigen pro; het lesgeld spreek je met de pro af." },
      { title: "Wat het kost", desc: "€15 per speler, hooguit €99 per team. De lessen van de pro zitten daar niet in." },
      { title: "Wat je doet", desc: "Stuur deze pagina naar jullie pro. De pro meldt het team aan." },
    ],
    ctaSend: "Stuur dit naar je pro", ctaSample: "Blader door een voorbeeldrapport",
    trust: "Introductieprijs bij aanmelding van 1 december 2026 t/m 28 februari 2027",
    get: {
      label: "Dit krijgen jullie", title: "Eén rapport,", titleEm: "geschreven voor dit ene team",
      intro: "Geen algemeen verhaal over mentale training. Een rapport met jullie namen, jullie spelvorm en ruimte voor jullie eigen afspraken.",
      groups: [
        {
          title: "Voor het team", size: "Twintig tot vijfentwintig pagina's",
          items: [
            "Een draaiboek voor de teamavond: anderhalf tot twee uur, met de pro of onder leiding van de captain.",
            "De wedstrijddag op één pagina: vijf momenten, vijf regels en drie afspraken voor het hele team.",
            "Een kaartje per paar, om uit te knippen voor in de tas. Het paar kruist zelf aan wat het doet na een misser.",
            "Het teamprofiel met de teamgemiddelden: waar jullie als team op leunen en waar jullie aan werken.",
            "Per speler in woorden wat het hoogst ligt en waar die aan werkt: geen cijfers per speler.",
            "Paren om in de winter uit te proberen, met per paar wat ieder inbrengt. Het zijn voorstellen.",
            "Een thema voor de winter met drie oefenvormen.",
            "Een terugblik van twee minuten per paar, na elke speeldag.",
            "Liggen de scores dicht bij elkaar en wijst het profiel niets aan? Dan kiest het team zelf uit drie thema's, elk met een oefenvorm en een voorbeeldafspraak, en staat er per speler geen hoogste of laagste onderdeel.",
          ],
        },
        {
          title: "Voor de captain", size: "Drie pagina's",
          items: [
            "Hoe je de teamavond leidt, ook als het stroef loopt.",
            "Het seizoen in stappen, met een schema voor vier trainingen in de winter.",
            "Wat je doet als het anders loopt.",
          ],
        },
        {
          title: "Voor de pro", size: "Een eigen bijlage, alleen voor de pro",
          items: [
            "De scores per speler.",
            "Per speler één ding om op te letten en één vraag voor achteraf.",
            "Een lessenreeks van vier lessen als kapstok, met een kijkpunt per les.",
            "Oefenvormen voor de teamles.",
            "Een overzicht van de tijd die het de pro kost.",
            "Kiest het team zelf het thema, dan krijgt de pro per thema een teamles in plaats van de lessenreeks.",
          ],
        },
      ],
      quotesLabel: "Letterlijk uit een voorbeeldrapport (verzonnen team Heren 1)",
      quotes: [
        { text: "Niemand zegt sorry voor een slag.", from: "Een van de drie afspraken voor het hele team" },
        { text: "Dan heeft die speler gelijk. Streep door en schrijf erbij wat wel klopt.", from: "Uit \"De teamavond leiden\", voor als een speler zich niet herkent in de eigen regel" },
      ],
      extras: [
        { title: "De teamvraag", desc: "Na het assessment kiest iedere speler bij één vraag: wat helpt jou na een mindere slag? Stilte, één vaste zin, of even over iets anders praten. Overslaan mag. Op de teamavond kruist ieder paar samen op het kaartje aan wat het doet." },
        { title: "Past bij jullie team", desc: "Het rapport volgt de spelvormen van de NGF-competitie: 18, 27 of 36 holes, vanaf vier spelers. Liggen de scores in jullie team dicht bij elkaar? Dan zegt het rapport dat eerlijk, noemt het per speler geen hoogste of laagste onderdeel en kiest het team zelf uit drie thema's." },
        { title: "Eerlijk over wat het is", desc: "Het rapport laat zien hoe ieder zichzelf ziet, op één moment. Het bepaalt niet wie er speelt en meet geen gedrag op de baan." },
      ],
      sampleCta: "Blader door een voorbeeldrapport",
      sampleNote: "Vijf verzonnen teams, echte rapporten. Ook de bijlage voor de pro.",
    },
    whyLabel: "Waarom nu", whyTitle: "De winter is", whyTitleEm: "het moment",
    whyIntro: "In de winter gaat de meeste trainingstijd naar de swing. Wat jullie doen na een gemiste putt, op de eerste tee of in de laatste holes van een partij die gelijk staat, wordt zelden vooraf afgesproken. Dat doe je vóór de competitie, niet op de eerste speeldag.",
    whyCards: [
      { title: "Wat zegt jullie team over zichzelf?", desc: "Iedere speler vult thuis het assessment in. Samen geeft dat een teamprofiel: hoe jullie jezelf zien, waar het team op leunt en waar het aan werkt." },
      { title: "Het past in jullie winter", desc: "Eén teamavond en vier trainingen met de paren, binnen jullie gewone trainingen. Het vraagt tijd en aandacht; verderop staat eerlijk hoeveel." },
      { title: "Ook voor een sceptisch team", desc: "Er komen geen cijfers per speler op tafel en niemand hoeft iets over zichzelf te vertellen. Het team spreekt af hoe het een wedstrijddag aanpakt." },
      { title: "Lessen rond jullie thema", desc: "Jullie pro krijgt een eigen bijlage met de scores per speler en een lessenreeks van vier lessen als kapstok. Kiest het team zelf het thema, dan is dat een teamles per thema. Of er lessen komen, hoeveel en wat ze kosten, spreken jullie met de pro af." },
    ],
    lossLabel: "Waarom vóór de competitie", lossTitle: "Afspreken doe je", lossTitleEm: "niet op de eerste speeldag",
    lossItems: [
      "Het eerste gesprek over spanning en herstel voer je anders op de eerste competitiedag, als het er al toe doet.",
      "Een paar dat in de winter afspreekt wat het doet na een mindere slag, hoeft dat niet tijdens de partij uit te vinden.",
      "De techniektraining blijft gewoon staan. Dit komt ernaast, in dezelfde trainingen.",
      "Aanmelden kan t/m 28 februari 2027 voor €15 per speler. Daarna is het €49 per speler.",
    ],
    lossClose: "Het assessment en het teamrapport kosten per speler minder dan een doos ballen.",
    priceLabel: "Wat het kost", priceTitle: "Een prijs waar je", priceTitleEm: "niet over hoeft te vergaderen",
    priceNow: {
      label: "Introductieprijs", badge: "Aanmelden van 1 december 2026 t/m 28 februari 2027",
      player: "€15", playerSub: "per speler",
      team: "€99", teamSub: "maximaal per team",
      note: "Zes spelers: samen €90. Zeven spelers of meer: samen €99.",
    },
    priceLater: { label: "Na 28 februari 2027", line: "€49 per speler, maximaal €299 per team." },
    priceFacts: [
      "Inbegrepen: het volledige assessment voor iedere speler. Iedere speler krijgt het eigen spelersprofiel: een samenvatting en het volledige rapport.",
      "Inbegrepen: één teamrapport voor het team, met een deel voor de captain en een bijlage voor de pro.",
      "Niet inbegrepen: de lessen van de pro. Het lesgeld bepaalt de pro zelf; dat spreek je rechtstreeks met de pro af.",
      "Niet inbegrepen: een herhaalmeting na het seizoen. Die is vrijwillig en kost $39 per speler.",
      "De pro meldt het team aan. Bij aanmelding hoor je hoe het afrekenen loopt.",
      "Voor teams met spelers van 18 jaar en ouder.",
    ],
    currencyNote: "Teamprijzen zijn in euro's. Het losse assessment ($79), de herhaalmeting ($39) en het abonnement voor de pro ($199 per jaar) zijn in dollars.",
    howLabel: "4 stappen", howTitle: "Van idee", howTitleEm: "tot eerste teamles",
    howSteps: [
      { num: "01", title: "Spreek je pro aan", body: "Stuur deze pagina naar de pro van je club. Een team start altijd via een PGA-pro. Voor de pro is het meer dan een handtekening; onderaan staat eerlijk wat het de pro vraagt en oplevert." },
      { num: "02", title: "De pro meldt het team aan", body: "De pro vraagt toegang aan tot het Pro-programma, meldt jullie team aan en stuurt de spelers een teamlink. Dan hoor je ook hoe het afrekenen loopt." },
      { num: "03", title: "Iedere speler doet het assessment", body: "Thuis, online, in 20 tot 25 minuten, in het Nederlands of Engels. Daarna nog één teamvraag. Iedere speler krijgt het eigen spelersprofiel: een samenvatting en het volledige rapport." },
      { num: "04", title: "Rapport, teamavond, lessen", body: "Als de spelers klaar zijn, maakt de pro het teamrapport en wijst de captain aan. Daarna volgen de teamavond en de trainingen met de paren. Of de pro daarna lessen geeft, hoeveel en in welk tempo, spreken jullie met de pro af." },
    ],
    time: {
      label: "Wat het jullie aan tijd kost", title: "Eerlijk over de tijd",
      items: [
        "Het assessment: 20 tot 25 minuten per speler, thuis. Reken daarnaast tijd om je eigen rapport te lezen.",
        "Eén teamavond van anderhalf tot twee uur, met het draaiboek uit het rapport.",
        "In de winter vier trainingen met de paren, binnen jullie gewone trainingen. De captain kan ze leiden met het rapport; of de pro erbij is en wat dat kost, spreek je met de pro af.",
        "Per paar één kaartje: op de teamavond kruisen jullie aan wat jullie na een mindere slag doen, de rest vul je in na de eerste training samen.",
        "Na elke speeldag een terugblik van twee minuten per paar.",
        "Lessen van de pro komen daar bij. Of die er komen, hoeveel en wanneer, spreken jullie met de pro af.",
      ],
      note: "De methode vraagt gewenning, van het team en van de pro. Reken er niet op dat het na één avond vanzelf gaat.",
    },
    see: {
      label: "Wie ziet wat", title: "Niemand staat", titleEm: "met een cijfer te kijk",
      items: [
        { title: "Het team en de captain", desc: "Lezen het teamrapport. Daarin staan teamgemiddelden, en per speler in woorden wat het hoogst ligt en waar die aan werkt. Er staan geen cijfers per speler in, op één ding na: je handicap kan in een voorbeeldindeling van de paren staan. Je persoonlijke rapport zien het team en de captain niet." },
        { title: "De pro", desc: "Krijgt het teamrapport en daarnaast een bijlage met de scores per speler en ieders antwoord op de teamvraag, of dat je die hebt overgeslagen. Die bijlage is voor de pro; het team en de captain krijgen hem niet. De beheerder van MentalRoutine kan hem ook openen. Je volledige persoonlijke rapport kan de pro alleen openen als jij dat apart aanvinkt." },
        { title: "Je eigen rapport", desc: "Het team en de captain zien je persoonlijke rapport nooit. De pro ziet je scores, niet je volledige rapport: jij kiest zelf of de pro dat mag openen. Dat vink je apart aan bij de teamlink (het staat nooit vooraf aangevinkt) en je kunt het later in de portal aan- of uitzetten." },
        { title: "De teamvraag", desc: "In het teamrapport staat van de teamvraag alleen een telling voor het hele team, zonder namen. De pro ziet het antwoord per speler, of dat je de vraag hebt overgeslagen. Wat jullie als paar doen na een mindere slag, kruisen jullie samen aan op het kaartje." },
        { title: "Wie niet wil meedoen", desc: "Niemand is verplicht. Het rapport gaat over de spelers die meedoen en hun uitkomst delen. Dat kan vanaf vier spelers." },
        { title: "Stoppen met delen", desc: "Dat kan altijd, in de portal. De pro ziet je scores en je rapport dan niet meer. Een nieuw teamrapport is zonder jouw gegevens; een rapport dat al gemaakt is, blijft bestaan." },
      ],
      note: "Bij de teamlink staan twee vinkjes. Het eerste is nodig om mee te doen: je uitkomst mag in het teamrapport staan, in woorden, en de pro ziet je scores. Het tweede is niet verplicht: of de pro ook je volledige persoonlijke rapport mag openen, bepaal jij apart. Een vraag of bezwaar buiten de captain en de pro om? Mail " + TEAM_CONTACT + ".",
    },
    sendLabel: "De eerste stap", sendTitle: "Stuur dit", sendTitleEm: "naar je pro",
    sendBody: "Eén bericht is genoeg. De pro vindt hieronder een eigen blok: wat het oplevert, wat de pro doet en wat het aan tijd kost. Jullie hoeven zelf nog niets te regelen of te betalen.",
    sendMail: "Mail deze pagina naar je pro", sendCopy: "Kopieer de link", sendCopied: "Link gekopieerd",
    mailSubject: "Mentaal trainen met ons competitieteam deze winter?",
    mailBody: "Hoi,\n\nWe willen deze winter met ons competitieteam ook mentaal trainen, en dat kan via MentalRoutine samen met jou als pro. Elke speler doet thuis een assessment, het team krijgt een teamrapport en jij krijgt een eigen bijlage met de scores per speler en een lessenreeks van vier lessen als kapstok. Het aantal lessen en het lesgeld bepaal je zelf met ons.\n\nHier staat hoe het werkt, met een voorbeeldrapport en een blok voor de pro: wat het oplevert, wat je doet en wat het je aan tijd kost.\n{url}\n\nWil je ernaar kijken?\n\nGroet,",
    noPro: "Wil je als team meedoen zonder pro? Neem contact met ons op, dan kijken we samen wat er kan: ",
    noProLink: TEAM_CONTACT,
    faqLabel: "Vragen?", faqTitle: "Veelgestelde", faqTitleEm: "vragen",
    faqs: [
      { q: "Waarom kan een team alleen via een pro starten?", a: "Omdat de meting pas iets oplevert als er daarna mee gewerkt wordt. De pro meldt het team aan, maakt het teamrapport, ontvangt de bijlage met de lessenreeks en geeft de lessen. Speel je bij een club zonder pro, of wil je pro er meer over weten? Mail " + TEAM_CONTACT + "." },
      { q: "Wat betalen we precies?", a: "Bij aanmelding van 1 december 2026 t/m 28 februari 2027: €15 per speler, met een maximum van €99 voor het hele team. Zes spelers betalen dus samen €90, zeven of meer spelers samen €99. Na 28 februari 2027 is dat €49 per speler en maximaal €299 per team. De pro meldt het team aan; bij aanmelding hoor je hoe het afrekenen loopt." },
      { q: "Zitten de lessen van de pro in de prijs?", a: "Nee. De teamprijs is voor het assessment van iedere speler en het teamrapport. De lessen geeft jullie eigen pro. De pro bepaalt zelf het lesgeld; dat spreek je rechtstreeks met de pro af." },
      { q: "Hoeveel tijd kost het?", a: "Het assessment kost 20 tot 25 minuten per speler: online, thuis, in het Nederlands of Engels. Daarna één teamavond van anderhalf tot twee uur. In de winter vier trainingen met de paren, binnen jullie gewone trainingen; de captain kan ze leiden met het rapport. Per paar één kaartje: aankruisen op de teamavond, de rest na de eerste training samen. Tijdens de competitie na elke speeldag een terugblik van twee minuten per paar. Lessen van de pro komen daar bij, als jullie die met de pro afspreken." },
      { q: "Wie ziet mijn gegevens?", a: "Het team en de captain lezen het teamrapport. Daarin staan teamgemiddelden, en per speler in woorden wat het hoogst ligt en waar die aan werkt. Er staan geen cijfers per speler in, op één ding na: je handicap kan in een voorbeeldindeling van de paren staan. Je persoonlijke rapport zien het team en de captain niet. De pro krijgt een bijlage met de scores per speler en ziet je antwoord op de teamvraag, of dat je die hebt overgeslagen. De beheerder van MentalRoutine kan de bijlage ook openen. Bij het aanmelden via de teamlink vink je aan dat je hiermee akkoord gaat. Je volledige persoonlijke rapport kan de pro alleen openen als jij dat apart aanvinkt; dat is niet verplicht en je kunt het later in de portal aan- of uitzetten. Stoppen met delen kan altijd in de portal." },
      { q: "Wie ziet mijn antwoord op de teamvraag?", a: "In het teamrapport staat alleen een telling voor het hele team, zonder namen: bijvoorbeeld drie keer stilte en twee keer één vaste zin. De pro ziet in de bijlage het antwoord per speler, of dat je de vraag hebt overgeslagen. Overslaan mag. Wat jullie als paar doen na een mindere slag, kruisen jullie samen aan op het kaartje." },
      { q: "Wat als een speler niet wil meedoen of niet wil delen?", a: "Dan doet die speler niet mee; niemand is verplicht. Het teamrapport gaat over de spelers die het assessment hebben gedaan en hun uitkomst binnen het team delen. Een teamrapport kan vanaf vier spelers. Wie niet meedoet, kan later met een leeg kaartje gewoon met een paar meedoen." },
      { q: "Wat gebeurt er als ik stop met delen?", a: "Stoppen kan altijd, in de portal. De pro ziet je scores en je rapport dan niet meer en een nieuw teamrapport is zonder jouw gegevens. Een rapport dat al gemaakt is, blijft bestaan. Heb je een vraag of bezwaar die je niet via de captain of de pro wilt stellen? Mail " + TEAM_CONTACT + "." },
      { q: "Is dit iets voor een sceptisch team?", a: "Ja. Er komen geen cijfers per speler op tafel en niemand hoeft iets over zichzelf te vertellen. Het rapport levert praktische afspraken op voor de wedstrijddag, zoals wie beslist over het geven van een putt. Twijfel je? Blader eerst door een voorbeeldrapport." },
      { q: "Wat als ons team weinig verschillen laat zien?", a: "Dan zegt het rapport dat eerlijk. Het wijst dan geen thema of paren aan en noemt per speler geen hoogste of laagste onderdeel. Het team kiest zelf uit drie thema's, elk met een oefenvorm en een voorbeeldafspraak. De pro krijgt dan per thema een teamles in plaats van de lessenreeks. De wedstrijddag, de teamavond en de kaartjes blijven gewoon." },
      { q: "Hoeveel lessen horen erbij?", a: "Dat bepalen jullie samen met de pro. Er is geen vast aantal en geen vast ritme. In de bijlage voor de pro staat een lessenreeks van vier lessen; dat is een kapstok, geen verplichting. Kiest het team zelf het thema, dan staat er per thema een teamles in plaats van de lessenreeks." },
      { q: "Kan ons jeugdteam meedoen?", a: "Nee. Het teamaanbod is voor teams met spelers van 18 jaar en ouder." },
      { q: "Kunnen we na het seizoen opnieuw meten?", a: "Ja, als je dat wilt. Elke speler kan na het seizoen zelf een herhaalmeting doen. Die is vrijwillig, kost $39 per speler en zit niet in de teamprijs." },
      { q: "Worden we hier beter van in de competitie?", a: "Dat beloven we niet; niemand kan een uitslag garanderen. Wat je wel krijgt: een beeld van hoe het team zichzelf ziet, afspraken voor de wedstrijddag en een winter waarin jullie gericht oefenen op wat er tussen de slagen gebeurt." },
    ],
    pro: {
      label: "Ben je PGA-pro?", title: "Een team als lesklant", titleEm: "voor de winter",
      body: "Heeft een captain je deze pagina gestuurd? Dan wil dat team deze winter met jou werken. Hieronder staat eerst wat het je oplevert en daarna, zonder het mooier te maken, wat je ervoor doet.",
      gainsLabel: "Dit levert het je op",
      gains: [
        "Een team als lesklant voor de wintermaanden.",
        "Een concreet thema om les over te geven, met de scores per speler in een bijlage die alleen jij krijgt.",
        "Je eigen tarief: aantal lessen, tempo en lesgeld bepaal je zelf, en je rekent rechtstreeks af met het team.",
      ],
      stepsLabel: "Dit doe je, in deze volgorde, en dit kost het je",
      stepsIntro: "Er zit een leercurve aan de methode, ook voor een ervaren pro. Reken daar vooraf op.",
      timeLabel: "Jouw tijd",
      steps: [
        { title: "Vraag toegang aan tot het Pro-programma", body: "Met het formulier op de pagina van het Pro-programma. We bekijken elke aanvraag persoonlijk en controleren je PGA-gegevens.", time: "Een paar minuten. Toelating meestal binnen 1 tot 3 werkdagen." },
        { title: "Doe je eigen assessment en lees je eigen rapport", body: "Gratis voor toegelaten pro's. Je begeleidt een team beter als je je eigen rapport kent.", time: "20 tot 25 minuten, plus het lezen." },
        { title: "Leer de methode kennen", body: "Je eigen rapport, de leeswijzer en het materiaal in PRO Admin. Zo weet je waar de acht stappen en de vier factoren over gaan voordat je een team begeleidt.", time: "Reken op een paar avonden." },
        { title: "Meld het team aan en stuur de teamlink door", body: "Je meldt het team bij ons aan en krijgt een teamlink. Die stuur je naar de spelers; zij doen thuis het assessment.", time: "Een paar berichten. Daarna wacht je tot de spelers klaar zijn." },
        { title: "Maak het teamrapport en wijs de captain aan", body: "In PRO Admin, zodra minstens vier spelers klaar zijn en hun uitkomst delen. Je kiest de spelvorm en bevestigt dat de spelers weten dat hun uitkomst in het teamrapport staat. De captain krijgt het rapport; de bijlage is alleen voor jou.", time: "Een paar minuten." },
        { title: "Lees het teamrapport en je bijlage", body: "Twintig tot vijfentwintig pagina's rapport en een bijlage met de scores per speler, per speler één ding om op te letten en een lessenreeks. Het volledige persoonlijke rapport van een speler kun je alleen openen als die speler dat apart met je deelt.", time: "Een uur tot anderhalf uur. De eerste keer langer." },
        { title: "De teamavond", body: "Met het draaiboek uit het rapport. Jij leidt de avond, of de captain doet dat en jij bent erbij. De teamavond kan ook zonder jou: dan leidt de captain hem met het draaiboek.", time: "Anderhalf tot twee uur, plus je voorbereiding." },
        { title: "Lessen rond het thema", body: "Aantal, tempo en lesgeld bepaal je zelf met het team. De lessenreeks van vier lessen in de bijlage is een kapstok, geen kant-en-klare les. Kiest het team zelf het thema, dan staat er per thema een teamles in plaats van de lessenreeks. Een lesprogramma op maat maak je in PRO Admin.", time: "De lessenreeks is drie lessen van een uur en één van twee uur. Reken per les op een half uur tot een uur voorbereiding, zeker de eerste keren." },
      ],
      total: "Bij elkaar voor je eerste team: reken, zonder de lessen en de trainingen zelf, op ruwweg tien uur (de methode leren kennen, lezen, de teamavond en de voorbereiding). Bij een volgend team is dat minder.",
      cost: "Wat het je aan geld kost: aanvragen, je eigen assessment (t.w.v. $79) en je eerste vijf lesprogramma's zijn gratis. Een teamrapport telt niet mee voor die vijf. Wie daarna lesprogramma's blijft maken, neemt het jaarabonnement van het Pro-programma: $199 per jaar als je vóór 1 april 2027 bent toegelaten (dat tarief houd je zolang je verlengt), daarna $299 per jaar voor nieuwe pro's. Opzeggen kan altijd.",
      cta: "Vraag toegang aan als pro", sample: "Bekijk een voorbeeld van de bijlage voor de pro",
    },
    stickyCta: "Stuur dit naar je pro", footerRights: "Alle rechten voorbehouden.",
  },
  en: {
    docTitle: "Mental training with your club team | MentalRoutine",
    badge: "For club teams in league play · winter 2026/2027",
    heroTitle: "What has your team agreed to do",
    heroTitleEm: "after a poor shot?",
    heroPrice: "€15 per player · €99 at most per team",
    heroPriceSub: "when you sign up by 28 February 2027",
    heroP1: "One team meeting, a card for every pair and match day on one page. It all comes from one team report, written for this one team, after every player has taken the assessment at home. After that your pro can give lessons around your theme; you agree that with the pro.",
    glance: [
      { title: "What it is", desc: "An assessment for every player and one team report for the team. Your own pro gives the lessons; you agree the lesson fee with the pro." },
      { title: "What it costs", desc: "€15 per player, €99 at most per team. The pro's lessons are not included." },
      { title: "What you do", desc: "Send this page to your pro. The pro signs the team up." },
    ],
    ctaSend: "Send this to your pro", ctaSample: "Browse a sample report",
    trust: "Introductory price when you sign up from 1 December 2026 to 28 February 2027",
    get: {
      label: "This is what you get", title: "One report,", titleEm: "written for this one team",
      intro: "Not a general story about mental training. A report with your names, your match format and room for your own agreements.",
      groups: [
        {
          title: "For the team", size: "Twenty to twenty-five pages",
          items: [
            "A run sheet for the team meeting: an hour and a half to two hours, with the pro or led by the captain.",
            "Match day on one page: five moments, five rules and three agreements for the whole team.",
            "A pair card for every pair, to cut out and keep in the bag. The pair ticks what it does after a poor shot.",
            "The team profile with the team averages: what you lean on as a team and what you work on.",
            "For each player, in words, what comes out highest and what they work on: no scores per player.",
            "Pairs to try out over the winter, with what each player brings. They are suggestions.",
            "A theme for the winter with three practice formats.",
            "A two-minute review per pair, after every match day.",
            "Are the scores close together, so the profile does not point to anything? Then the team picks one of three themes itself, each with a practice format and a sample agreement, and the report names no highest or lowest part per player.",
          ],
        },
        {
          title: "For the captain", size: "Three pages",
          items: [
            "How to lead the team meeting, also when it gets awkward.",
            "The season step by step, with a schedule for four winter sessions.",
            "What to do when things turn out differently.",
          ],
        },
        {
          title: "For the pro", size: "A separate annex, for the pro only",
          items: [
            "The scores per player.",
            "One thing to watch and one question for afterwards per player.",
            "A series of four lessons as a framework, with something to look for in each lesson.",
            "Practice formats for the team lesson.",
            "An overview of the time it takes the pro.",
            "If the team picks its own theme, the pro gets a team lesson for each theme instead of the series of lessons.",
          ],
        },
      ],
      quotesLabel: "Word for word from a sample report (made-up team Men's 1)",
      quotes: [
        { text: "Nobody says sorry for a shot.", from: "One of the three agreements for the whole team" },
        { text: "Then that player is right. Cross it out and write what does fit.", from: "From \"Leading the team meeting\", for when a player does not recognise their own line" },
      ],
      extras: [
        { title: "The team question", desc: "After the assessment every player picks an answer to one question: what helps you after a poor shot? Silence, one set phrase, or talking about something else for a moment. Skipping it is fine. At the team meeting each pair ticks on its pair card what it will do." },
        { title: "Does it fit your team?", desc: "The report follows the match formats of the Dutch NGF league: 18, 27 or 36 holes with singles and greensomes or foursomes, for teams of at least four players. The assessment itself is in English and Dutch. Do you play outside the Netherlands? Email us first. Are the scores in your team close together? Then the report says so honestly, names no highest or lowest part per player and the team picks one of three themes itself." },
        { title: "Honest about what it is", desc: "The report shows how each player sees themselves, at one moment. It does not decide who plays and does not measure behaviour on the course." },
      ],
      sampleCta: "Browse a sample report",
      sampleNote: "Five made-up teams, real reports. The annex for the pro as well.",
    },
    whyLabel: "Why now", whyTitle: "Winter is", whyTitleEm: "the moment",
    whyIntro: "In winter most practice time goes to the swing. What you do after a missed putt, on the first tee or in the closing holes of a match that is all square is rarely agreed in advance. You do that before the season, not on the first match day.",
    whyCards: [
      { title: "What does your team say about itself?", desc: "Every player takes the assessment at home. Together that gives a team profile: how you see yourselves, what the team leans on and what it works on." },
      { title: "It fits into your winter", desc: "One team meeting and four sessions with the pairs, within your normal practice. It takes time and attention; we set out below how much." },
      { title: "For a sceptical team too", desc: "There are no scores per player on the table, and nobody has to say anything about themselves. The team agrees how it approaches a match day." },
      { title: "Lessons around your theme", desc: "Your pro gets a separate annex with the scores per player and a series of four lessons as a framework. If the team picks its own theme, that is a team lesson for each theme. Whether there are lessons, how many and what they cost is for you to agree with the pro." },
    ],
    lossLabel: "Why before the season", lossTitle: "You don't make agreements", lossTitleEm: "on the first match day",
    lossItems: [
      "Otherwise your first conversation about nerves and recovery happens on the first match day, when it already matters.",
      "A pair that agrees in winter what it does after a poor shot does not have to work that out during the match.",
      "Technique practice stays as it is. This comes alongside it, in the same sessions.",
      "You can sign up for €15 per player until 28 February 2027. After that it is €49 per player.",
    ],
    lossClose: "The assessment and the team report cost less per player than a box of balls.",
    priceLabel: "What it costs", priceTitle: "A price you don't need", priceTitleEm: "a committee meeting for",
    priceNow: {
      label: "Introductory price", badge: "Sign up from 1 December 2026 to 28 February 2027",
      player: "€15", playerSub: "per player",
      team: "€99", teamSub: "maximum per team",
      note: "Six players: €90 in total. Seven players or more: €99 in total.",
    },
    priceLater: { label: "After 28 February 2027", line: "€49 per player, €299 maximum per team." },
    priceFacts: [
      "Included: the full assessment for every player. Every player gets their own player profile: a summary and the full report.",
      "Included: one team report for the team, with a part for the captain and an annex for the pro.",
      "Not included: the pro's lessons. The pro sets the lesson fee; you agree it directly with the pro.",
      "Not included: a re-assessment after the season. It is voluntary and costs $39 per player.",
      "The pro signs the team up. When the team is signed up you hear how payment works.",
      "For teams with players aged 18 and over.",
    ],
    currencyNote: "Team prices are in euros. The assessment on its own ($79), the re-assessment ($39) and the subscription for the pro ($199 per year) are in US dollars.",
    howLabel: "4 steps", howTitle: "From idea", howTitleEm: "to first team lesson",
    howSteps: [
      { num: "01", title: "Talk to your pro", body: "Send this page to the pro at your club. A team always starts through a PGA professional. For the pro it is more than a signature; we set out below what it asks of the pro and what's in it for them." },
      { num: "02", title: "The pro signs the team up", body: "The pro applies for the Pro Program, signs your team up and sends the players a team link. That is also when you hear how payment works." },
      { num: "03", title: "Every player takes the assessment", body: "At home, online, in 20 to 25 minutes, in English or Dutch. Then one team question. Every player gets their own player profile: a summary and the full report." },
      { num: "04", title: "Report, team meeting, lessons", body: "Once the players are done, the pro creates the team report and names the captain. Then come the team meeting and the sessions with the pairs. Whether the pro gives lessons after that, how many and at what pace, is for you to agree with the pro." },
    ],
    time: {
      label: "The time it takes you", title: "Honest about the time",
      items: [
        "The assessment: 20 to 25 minutes per player, at home. Allow time to read your own report as well.",
        "One team meeting of an hour and a half to two hours, with the run sheet from the report.",
        "Four winter sessions with the pairs, within your normal practice. The captain can lead them with the report; whether the pro is there and what that costs is for you to agree with the pro.",
        "One pair card per pair: at the team meeting you tick what you do after a poor shot, and you fill in the rest after your first session together.",
        "A two-minute review per pair after every match day.",
        "Lessons from the pro come on top of that. Whether there are any, how many and when is for you to agree with the pro.",
      ],
      note: "The method takes getting used to, for the team and for the pro. Don't expect it to run by itself after one evening.",
    },
    see: {
      label: "Who sees what", title: "Nobody is put on the spot", titleEm: "with a score",
      items: [
        { title: "The team and the captain", desc: "Read the team report. It shows team averages and, for each player, in words what comes out highest and what they work on. There are no scores per player in it, with one exception: your handicap may appear in a sample arrangement of the pairs. The team and the captain do not see your personal report." },
        { title: "The pro", desc: "Gets the team report and, alongside it, an annex with the scores per player and each player's answer to the team question, or the fact that you skipped it. That annex is for the pro; the team and the captain do not get it. The MentalRoutine administrator can open it as well. The pro can only open your full personal report if you tick that separately." },
        { title: "Your own report", desc: "The team and the captain never see your personal report. The pro sees your scores, not your full report: you decide yourself whether the pro may open it. You tick that separately at the team link (it is never ticked in advance) and you can switch it on or off later in the portal." },
        { title: "The team question", desc: "The team report only shows a count for the whole team, without names. The pro sees the answer per player, or the fact that you skipped the question. What you do as a pair after a poor shot is something you tick together on the pair card." },
        { title: "If someone does not want to take part", desc: "Nobody has to. The report covers the players who take part and share their outcome. It needs at least four players." },
        { title: "Stopping sharing", desc: "You can do that in the portal at any time. The pro then no longer sees your scores or your report. A new team report leaves your data out; a report that has already been made stays as it is." },
      ],
      note: "The team link has two tick boxes. The first is needed to take part: your outcome may appear in the team report, in words, and the pro sees your scores. The second is optional: whether the pro may also open your full personal report is something you decide separately. A question or an objection you would rather not raise with the captain or the pro? Email " + TEAM_CONTACT + ".",
    },
    sendLabel: "The first step", sendTitle: "Send this", sendTitleEm: "to your pro",
    sendBody: "One message is enough. Below, the pro finds a section of their own: what it brings, what the pro does and how much time it takes. You don't have to arrange or pay anything yourselves yet.",
    sendMail: "Email this page to your pro", sendCopy: "Copy the link", sendCopied: "Link copied",
    mailSubject: "Mental training with our team this winter?",
    mailBody: "Hi,\n\nThis winter we would like to work on the mental game with our team, and we can do that through MentalRoutine together with you as our pro. Every player takes an assessment at home, the team gets a team report and you get a separate annex with the scores per player and a series of four lessons as a framework. You decide the number of lessons and your lesson fee with us.\n\nThis page explains how it works, with a sample report and a section for the pro: what it brings, what you do and how much time it takes.\n{url}\n\nWould you take a look?\n\nBest regards,",
    noPro: "Would you like to take part as a team without a pro? Get in touch and we'll look at what is possible together: ",
    noProLink: TEAM_CONTACT,
    faqLabel: "Questions?", faqTitle: "Frequently", faqTitleEm: "asked",
    faqs: [
      { q: "Why can a team only start through a pro?", a: "Because the assessment only pays off when you work with it afterwards. The pro signs the team up, creates the team report, receives the annex with the series of lessons and gives the lessons. Is there no pro at your club, or does your pro want to know more? Email " + TEAM_CONTACT + "." },
      { q: "What exactly do we pay?", a: "When you sign up from 1 December 2026 to 28 February 2027: €15 per player, with a maximum of €99 for the whole team. Six players pay €90 in total, seven or more pay €99 in total. After 28 February 2027 it is €49 per player and €299 maximum per team. The pro signs the team up; when the team is signed up you hear how payment works." },
      { q: "Are the pro's lessons included in the price?", a: "No. The team price covers the assessment for every player and the team report. Your own pro gives the lessons. The pro sets the lesson fee; you agree it directly with the pro." },
      { q: "How much time does it take?", a: "The assessment takes 20 to 25 minutes per player: online, at home, in English or Dutch. Then one team meeting of an hour and a half to two hours. In winter, four sessions with the pairs within your normal practice; the captain can lead them with the report. One pair card per pair: ticked at the team meeting, the rest after your first session together. During the season, a two-minute review per pair after every match day. Lessons from the pro come on top of that, if you agree them with the pro." },
      { q: "Who sees my data?", a: "The team and the captain read the team report. It shows team averages and, for each player, in words what comes out highest and what they work on. There are no scores per player in it, with one exception: your handicap may appear in a sample arrangement of the pairs. The team and the captain do not see your personal report. The pro gets an annex with the scores per player and sees your answer to the team question, or the fact that you skipped it. The MentalRoutine administrator can open the annex as well. When you sign up through the team link you tick that you agree to this. The pro can only open your full personal report if you tick that separately; it is optional and you can switch it on or off later in the portal. You can stop sharing in the portal at any time." },
      { q: "Who sees my answer to the team question?", a: "The team report only shows a count for the whole team, without names: for example three times silence and twice one set phrase. In the annex the pro sees the answer per player, or the fact that you skipped the question. Skipping it is fine. What you do as a pair after a poor shot is something you tick together on the pair card." },
      { q: "What if a player does not want to take part or share?", a: "Then that player does not take part; nobody has to. The team report covers the players who have taken the assessment and share their outcome within the team. A team report needs at least four players. A player who does not take part can still join a pair later with a blank pair card." },
      { q: "What happens if I stop sharing?", a: "You can stop in the portal at any time. The pro then no longer sees your scores or your report and a new team report leaves your data out. A report that has already been made stays as it is. A question or an objection you would rather not raise with the captain or the pro? Email " + TEAM_CONTACT + "." },
      { q: "Does this work outside the Netherlands?", a: "The assessment and the report are available in English and Dutch. The team report follows the match formats of the Dutch NGF league: 18, 27 or 36 holes with singles and greensomes or foursomes. The pages on the order of the pairs and on match points follow the NGF rules. If you play outside the Netherlands, email " + TEAM_CONTACT + " first; we would rather say no than send a report that does not fit your match day." },
      { q: "Is this something for a sceptical team?", a: "Yes. There are no scores per player on the table and nobody has to say anything about themselves. The report gives practical agreements for match day, such as who decides on conceding a putt. Not sure? Browse a sample report first." },
      { q: "What if our team shows few differences?", a: "Then the report says so honestly. It does not point to a theme or to pairs and names no highest or lowest part per player. The team picks one of three themes itself, each with a practice format and a sample agreement. The pro then gets a team lesson for each theme instead of the series of lessons. Match day, the team meeting and the pair cards stay as they are." },
      { q: "How many lessons are included?", a: "You decide that together with the pro. There is no fixed number and no fixed rhythm. The annex for the pro contains a series of four lessons; that is a framework, not an obligation. If the team picks its own theme, it has a team lesson for each theme instead of the series of lessons." },
      { q: "Can our junior team take part?", a: "No. The team offer is for teams with players aged 18 and over." },
      { q: "Can we measure again after the season?", a: "Yes, if you want to. After the season each player can take a re-assessment. It is voluntary, costs $39 per player and is not included in the team price." },
      { q: "Will this make us win more matches?", a: "We don't promise that; nobody can guarantee a result. What you do get: a picture of how the team sees itself, agreements for match day and a winter in which you practise what happens between the shots." },
    ],
    pro: {
      label: "Are you a PGA professional?", title: "A team as a lesson client", titleEm: "for the winter",
      body: "Did a captain send you this page? Then that team wants to work with you this winter. Below you first read what's in it for you and then, without dressing it up, what you do for it.",
      gainsLabel: "What's in it for you",
      gains: [
        "A team as a lesson client for the winter months.",
        "A concrete theme to teach, with the scores per player in an annex that only you receive.",
        "Your own rate: you decide the number of lessons, the pace and your fee, and you settle directly with the team.",
      ],
      stepsLabel: "This is what you do, in this order, and what it costs you",
      stepsIntro: "The method has a learning curve, also for an experienced pro. Allow for that in advance.",
      timeLabel: "Your time",
      steps: [
        { title: "Apply for the Pro Program", body: "With the form on the Pro Program page. We review every application by hand and verify your PGA credentials.", time: "A few minutes. Approval usually within one to three working days." },
        { title: "Take your own assessment and read your own report", body: "Free for approved pros. You guide a team better once you know your own report.", time: "20 to 25 minutes, plus the reading." },
        { title: "Get to know the method", body: "Your own report, the reading guide and the material in PRO Admin. That way you know what the eight steps and the four factors are about before you work with a team.", time: "Allow a few evenings." },
        { title: "Sign the team up and pass on the team link", body: "You sign the team up with us and receive a team link. You send it to the players; they take the assessment at home.", time: "A few messages. Then you wait until the players are done." },
        { title: "Create the team report and name the captain", body: "In PRO Admin, once at least four players are done and share their outcome. You choose the match format and confirm that the players know their outcome is in the team report. The captain receives the report; the annex is for you only.", time: "A few minutes." },
        { title: "Read the team report and your annex", body: "Twenty to twenty-five pages of report and an annex with the scores per player, one thing to watch per player and a series of lessons. You can only open a player's full personal report if that player shares it with you separately.", time: "An hour to an hour and a half. Longer the first time." },
        { title: "The team meeting", body: "With the run sheet from the report. You lead the meeting, or the captain does and you are there. The team meeting can also go ahead without you: the captain then leads it with the run sheet.", time: "An hour and a half to two hours, plus your preparation." },
        { title: "Lessons around the theme", body: "You decide the number, the pace and your fee with the team. The series of four lessons in the annex is a framework, not a ready-made lesson. If the team picks its own theme, there is a team lesson for each theme instead of the series of lessons. You build a tailored lesson programme in PRO Admin.", time: "The series is three lessons of an hour and one of two hours. Allow half an hour to an hour of preparation per lesson, certainly the first few times." },
      ],
      total: "All in all for your first team: allow, not counting the lessons and the sessions themselves, roughly ten hours (getting to know the method, reading, the team meeting and the preparation). With a next team it is less.",
      cost: "What it costs you in money: applying, your own assessment (worth $79) and your first five lesson programmes are free. A team report does not count towards those five. If you keep building lesson programmes after that, you take out the annual Pro Program subscription: $199 per year if you are approved by 31 March 2027 (a rate you keep for as long as you renew), then $299 per year for new pros. You can cancel any time.",
      cta: "Apply as a pro", sample: "See a sample of the annex for the pro",
    },
    stickyCta: "Send this to your pro", footerRights: "All rights reserved.",
  },
};

/** Teamblok op /pro-program (zelfde feiten als hierboven; één bron). */
export const PRO_TEAM_BLOCK: Record<TeamLang, { label: string; title: string; titleEm: string; body: string; points: string[]; gets: string; cost: string; link: string; annexLink: string }> = {
  nl: {
    label: "Competitieteams", title: "Een competitieteam als lesklant", titleEm: "voor de winter",
    body: "Een competitieteam van je club dat deze winter met jou wil werken: een lesklant voor de rustige maanden, met een concreet thema en je eigen tarief. Het vraagt wel tijd van je. Dit doe je, in deze volgorde:",
    points: [
      "Je doet je eigen assessment (20 tot 25 minuten), leest je eigen rapport en leert de methode kennen. Reken op een paar avonden.",
      "Je meldt het team aan en stuurt de spelers de teamlink. Zij doen thuis het assessment.",
      "Zijn minstens vier spelers klaar, dan maak je in PRO Admin het teamrapport en wijs je de captain aan.",
      "Je leest het rapport en je bijlage: een uur tot anderhalf uur, de eerste keer langer.",
      "De teamavond: anderhalf tot twee uur, plus je voorbereiding.",
      "Lessen rond het thema. Aantal, tempo en lesgeld bepaal je zelf met het team. De lessenreeks is drie lessen van een uur en één van twee uur; reken per les op een half uur tot een uur voorbereiding.",
      "Bij elkaar voor je eerste team: reken, zonder de lessen en de trainingen zelf, op ruwweg tien uur. Bij een volgend team is dat minder.",
    ],
    gets: "Bij elk teamrapport krijg je een bijlage die alleen jij leest: de scores per speler, per speler één ding om op te letten, en een lessenreeks van vier lessen als kapstok. Kiest het team zelf het thema, dan staat er per thema een teamles in plaats van de lessenreeks. Het volledige persoonlijke rapport van een speler kun je alleen openen als die speler dat apart met je deelt.",
    cost: "Spelers betalen bij aanmelding van 1 december 2026 t/m 28 februari 2027 €15 per persoon, met een maximum van €99 per team; daarna €49 en €299. Jouw lessen zitten daar niet in. Voor jou gelden de gewone regels van het Pro-programma: je eerste vijf lesprogramma's zijn gratis, daarna het abonnement. Een teamrapport telt niet mee voor die vijf.",
    link: "Bekijk wat je team krijgt en wat het jou vraagt",
    annexLink: "Bekijk een voorbeeld van de bijlage voor de pro",
  },
  en: {
    label: "Club teams", title: "A club team as a lesson client", titleEm: "for the winter",
    body: "A team from your club that wants to work with you this winter: a lesson client for the quiet months, with a concrete theme and your own rate. It does take time. This is what you do, in this order:",
    points: [
      "You take your own assessment (20 to 25 minutes), read your own report and get to know the method. Allow a few evenings.",
      "You sign the team up and send the players the team link. They take the assessment at home.",
      "Once at least four players are done, you create the team report in PRO Admin and name the captain.",
      "You read the report and your annex: an hour to an hour and a half, longer the first time.",
      "The team meeting: an hour and a half to two hours, plus your preparation.",
      "Lessons around the theme. You decide the number, the pace and your fee with the team. The series is three lessons of an hour and one of two hours; allow half an hour to an hour of preparation per lesson.",
      "All in all for your first team: allow, not counting the lessons and the sessions themselves, roughly ten hours. With a next team it is less.",
    ],
    gets: "With every team report you get an annex that only you read: the scores per player, one thing to watch per player, and a series of four lessons as a framework. If the team picks its own theme, there is a team lesson for each theme instead of the series of lessons. You can only open a player's full personal report if that player shares it with you separately.",
    cost: "Players pay €15 each when they sign up from 1 December 2026 to 28 February 2027, with a maximum of €99 per team; after that €49 and €299. Your lessons are not included. For you the normal Pro Program rules apply: your first five lesson programmes are free, then the subscription. A team report does not count towards those five.",
    link: "See what your team gets and what it asks of you",
    annexLink: "See a sample of the annex for the pro",
  },
};
