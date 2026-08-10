// ─────────────────────────────────────────────────────────────────────────────
// /methodology — the full method explainer.
//
// Kept out of translations.ts on purpose: this is one long-form document per
// language, and folding ~200 lines × 5 into the main translation object would
// bury the marketing copy that lives there. Same pattern though — `nl` is the
// canonical structure, every other language `satisfies MethodologyCopy`.
//
// Source: the two methodology .md documents, with four editorial decisions
// carried over from the site (see CLAUDE.md):
//   · Conviction sits in the SWING phase, not Pre-Shot (site + portal model)
//   · Handicap range is "0 to 36+", matching heroBadge elsewhere
//   · The question count is given as a duration, not a number we can't verify
//   · The factor keeps its long-form name ("geoefendheid" / practice experience)
// The APA reference list is intentionally NOT translated — citations stay in
// their published form in every language.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lang } from "./translations";

export type Reference = { authors: string; year: string; title: string; source: string };

/* ── The shared, language-independent reference list ───────────────────────── */
export const REFERENCES: ReadonlyArray<Reference> = [
  { authors: "Bandura, A.", year: "1977", title: "Self-efficacy: Toward a unifying theory of behavioral change.", source: "Psychological Review, 84(2), 191–215." },
  { authors: "Cleary, T. J., & Zimmerman, B. J.", year: "2001", title: "Self-regulation differences during athletic practice by experts, non-experts, and novices.", source: "Journal of Applied Sport Psychology, 13(2), 185–206." },
  { authors: "Ericsson, K. A., Krampe, R. T., & Tesch-Römer, C.", year: "1993", title: "The role of deliberate practice in the acquisition of expert performance.", source: "Psychological Review, 100(3), 363–406." },
  { authors: "Fletcher, D., & Sarkar, M.", year: "2012", title: "A grounded theory of psychological resilience in Olympic champions.", source: "Psychology of Sport and Exercise, 13(5), 669–678." },
  { authors: "Gardner, F. L., & Moore, Z. E.", year: "2004", title: "A mindfulness-acceptance-commitment-based approach to athletic performance enhancement: Theoretical considerations.", source: "Behavior Therapy, 35, 707–723." },
  { authors: "Hardy, L.", year: "1990", title: "A catastrophe model of anxiety and performance.", source: "In J. G. Jones & L. Hardy (Eds.), Stress and performance in sport (pp. 81–106). Wiley." },
  { authors: "Kahneman, D., & Tversky, A.", year: "1979", title: "Prospect theory: An analysis of decision under risk.", source: "Econometrica, 47(2), 263–291." },
  { authors: "Lazarus, R. S., & Folkman, S.", year: "1984", title: "Stress, Appraisal, and Coping.", source: "Springer." },
  { authors: "Masters, R. S. W.", year: "1992", title: "Knowledge, knerves and know-how: The role of explicit versus implicit knowledge in the breakdown of a complex motor skill under pressure.", source: "British Journal of Psychology, 83(3), 343–358." },
  { authors: "Masters, R. S. W., & Maxwell, J. P.", year: "2008", title: "The theory of reinvestment.", source: "International Review of Sport and Exercise Psychology, 1(2), 160–183." },
  { authors: "Nideffer, R. M.", year: "1976", title: "Test of attentional and interpersonal style.", source: "Journal of Personality and Social Psychology, 34(3), 394–404." },
  { authors: "Pope, D. G., & Schweitzer, M. E.", year: "2011", title: "Is Tiger Woods loss averse? Persistent bias in the face of experience, competition, and high stakes.", source: "American Economic Review, 101(1), 129–157." },
  { authors: "Seligman, M. E. P., Nolen-Hoeksema, S., Thornton, N., & Thornton, K. M.", year: "1990", title: "Explanatory style as a mechanism of disappointing athletic performance.", source: "Psychological Science, 1(2), 143–146." },
  { authors: "Toner, J., & Moran, A.", year: "2011", title: "The effects of conscious processing on golf putting proficiency and kinematics.", source: "Journal of Sports Sciences, 29(7), 673–683." },
  { authors: "Vealey, R. S.", year: "1986", title: "Conceptualization of sport-confidence and competitive orientation: Preliminary investigation and instrument development.", source: "Journal of Sport Psychology, 8(3), 221–246." },
  { authors: "Vickers, J. N.", year: "1992", title: "Gaze control in putting.", source: "Perception, 21(1), 117–132." },
  { authors: "Vickers, J. N.", year: "1996", title: "Visual control when aiming at a far target.", source: "Journal of Experimental Psychology: Human Perception and Performance, 22(2), 342–354." },
  { authors: "Vine, S. J., Moore, L. J., & Wilson, M. R.", year: "2011", title: "Quiet eye training facilitates competitive putting performance in elite golfers.", source: "Frontiers in Psychology, 2, article 8." },
  { authors: "Wegner, D. M.", year: "1994", title: "Ironic processes of mental control.", source: "Psychological Review, 101(1), 34–52." },
  { authors: "Weiner, B.", year: "1985", title: "An attributional theory of achievement motivation and emotion.", source: "Psychological Review, 92(4), 548–573." },
  { authors: "Zimmerman, B. J.", year: "2000", title: "Attaining self-regulation: A social cognitive perspective.", source: "In M. Boekaerts, P. R. Pintrich, & M. Zeidner (Eds.), Handbook of self-regulation (pp. 13–39). Academic Press." },
];

/* ── Widen literal types, same trick as translations.ts ────────────────────── */
type Widen<T> = T extends string ? string
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<Widen<U>>
  : T extends object ? { [K in keyof T]: Widen<T[K]> }
  : T;

// ─────────────────────────────────────────────────────────────────────────────
// DUTCH — canonical. The source documents were written in Dutch.
// ─────────────────────────────────────────────────────────────────────────────
const nl = {
  meta: {
    title: "De MentalRoutine-methodiek — hoe de assessment werkt",
    description:
      "Hoe de MentalRoutine-assessment werkt: acht domeinen binnen drie fasen, vier beïnvloedende factoren, normatieve en ipsatieve vragen, en het onderzoek waarop het model rust.",
  },

  /* ── Hero + summary (the short document) ── */
  badge: "De methodiek",
  h1a: "Hoe werkt de",
  h1b: "MentalRoutine-assessment?",
  intro: "Voor je een rapport aanschaft, wil je weten wat je koopt. Eerst het korte antwoord — daaronder de volledige uitleg.",

  summaryLabel: "In het kort",
  summary: [
    {
      k: "Wat je invult",
      v: "Vragen over hoe jij je eigen mentale spel op de baan ervaart, verdeeld over acht domeinen binnen drie fasen: Pre-Shot, Swing en Post-Shot. Invullen kost 20 tot 25 minuten.",
    },
    {
      k: "Wat je terugkrijgt",
      v: "Elk domein krijgt een rapportcijfer van 0 tot 10. Je acht domeinscores worden samengevat in één Mental Index. Daarnaast zie je vier factoren — druk & stress, geoefendheid, risicogeneigdheid en incasseringsvermogen — die laten zien onder welke omstandigheden jouw routine standhoudt.",
    },
    {
      k: "Hoe scherp dat gemeten wordt",
      v: "De vragen zijn deels forced-choice: je verdeelt punten over stellingen, waardoor je niet overal een hoge score kunt geven. Dat maakt het lastiger om jezelf te vleien, en levert een scherper beeld op dan een gewone vragenlijst.",
    },
    {
      k: "Wat het wel is",
      v: "Een spiegel van je eigen beleving, gebaseerd op gevestigde sportpsychologische en psychologische onderzoekstradities en getest op ruim 1.000 golfers — van handicap 0 tot 36+.",
    },
    {
      k: "Wat het niet is",
      v: "Geen swing-analyse, geen externe meting, geen medische of psychologische diagnose. Een score van 8 betekent: zo ervaar jij dit zelf — niet “een expert beoordeelt je met een 8.”",
    },
  ],
  summaryCta: "Lees de volledige methodologie",
  summaryCtaNote: "Hoe scores precies worden berekend, welk onderzoek eronder ligt, en hoe de validatie werkt.",

  tocLabel: "In dit document",
  chapters: [
    { id: "wat-het-meet",    label: "Wat het meet" },
    { id: "opbouw",          label: "Hoe het is opgebouwd" },
    { id: "meting",          label: "Hoe de meting werkt" },
    { id: "onderzoek",       label: "Waar het model op rust" },
    { id: "grenzen",         label: "Grenzen en gebruik" },
  ],

  /* ── Chapter 1 ── */
  c1: {
    label: "Hoofdstuk 1",
    title: "Wat het meet",
    blocks: [
      {
        q: "Wat meet de MentalRoutine-assessment?",
        a: [
          "De assessment meet hoe jij je eigen mentale spel op de golfbaan ervaart — niet een extern gemeten prestatie zoals swingdata of trackman-cijfers. Je beantwoordt een reeks vragen, verdeeld over acht domeinen. Per domein meten we een aantal kleinere onderdelen: de bouwstenen waaruit je domeinscore is opgebouwd.",
        ],
      },
      {
        q: "Hoe wordt een score berekend?",
        a: [
          "Elke score is een rapportcijfer van 0 tot 10, gebaseerd op de maximaal haalbare score op dat specifieke onderdeel. Je acht domeinscores worden samengevat in één getal: je Mental Index. Zie een 10 als “de top van de schaal” — niet als perfectie. Er bestaat geen perfect mentaal profiel; ook de sterkste golfers hebben domeinen die aandacht vragen.",
        ],
      },
      {
        q: "Meet dit een objectieve prestatie, of mijn eigen beleving?",
        a: [
          "Je eigen beleving — maar niet losjes gemeten. Dit is geen externe, gemeten prestatie zoals een swing-analyse of trackingdata; de vragen gaan over hoe jij jezelf ervaart. Het verschil met een gewone zelfbeoordelingsvragenlijst zit in de precisie waarmee dat gebeurt: de onderliggende skills, en hoe ontwikkelbaar ze bij jou zijn, worden grotendeels ipsatief gemeten.",
          "Omdat je steeds moet kiezen wat, in verhouding tot de rest, het zwaarst weegt, kun je niet vluchten in een sociaal wenselijk “ik ben overal goed in.” Dat maakt het resultaat weliswaar nog steeds zelfbeleving, maar wel een scherp en betrouwbaar gemeten versie daarvan — geen losse indruk, maar een uitkomst die precies aangeeft waar voor jou de werkelijke verhoudingen liggen.",
          "Een score van 8 op Focus betekent dus niet “een expert heeft je met een 8 beoordeeld,” maar wel iets nauwkeurigers dan een vrije zelfinschatting: het is hoe jouw eigen antwoordpatroon, onder dwang van een echte keuze, zich verhoudt tot je andere skills.",
        ],
      },
    ],
  },

  /* ── Chapter 2 ── */
  c2: {
    label: "Hoofdstuk 2",
    title: "Hoe het model is opgebouwd",

    domainsQ: "Wat zijn de acht domeinen?",
    domainsIntro:
      "Elke slag doorloop je drie fasen: Pre-Shot (voorbereiding), Swing (uitvoering) en Post-Shot (verwerking). De acht domeinen zijn de meetbare stappen binnen die drie fasen.",
    phases: [
      { name: "Pre-Shot", note: "Voorbereiding", domains: ["Focus", "Concentratie"] },
      { name: "Swing",    note: "Uitvoering",    domains: ["Overtuiging", "Vertrouwen"] },
      { name: "Post-Shot", note: "Verwerking",   domains: ["Beoordeling", "Acceptatie", "Analyse", "Transfer"] },
    ],

    factorsQ: "Wat zijn de vier beïnvloedende factoren, en hoe verschillen ze van de domeinen?",
    factorsA: [
      "Rond de acht domeinen liggen vier factoren: druk & stress, geoefendheid, risicogeneigdheid en incasseringsvermogen. Dit zijn geen stappen in je routine — ze zijn de omstandigheden die bepalen of je routine standhoudt wanneer het spannend wordt.",
      "Ze tellen niet mee in je Mental Index, maar verklaren voor een groot deel wélke domeinen bij jou onder druk het eerst wankelen. Elke factor heeft zelf weer een aantal deelfactoren.",
    ],
    factors: ["Druk & stress", "Geoefendheid", "Risicogeneigdheid", "Incasseringsvermogen"],
    factorsCaption: "De vier factoren omringen je routine — ze zijn er onderdeel van, maar geen stap erin.",

    layersQ: "Waar bouwen de domeinen en factoren op voort?",
    layersA: [
      "De acht domeinen en vier factoren zijn geen losse uitvinding voor golf. Ze bouwen voort op een onderliggend meetmodel voor generieke soft skills — attitudes, denkwijzen, gedragswijzen en fundamentele waarden — voortgekomen uit vijftien jaar gedragsonderzoek en assessmentontwikkeling binnen organisaties en bij individuen.",
      "Dat onderliggende model is het hulpmodel dat de losse skills meet die vervolgens golf-specifiek worden samengevat: elk domein en elke factor is een optelling van een aantal van die onderliggende skills, en gebruikt daarbij hetzelfde normatieve en ipsatieve meetmechanisme dat in hoofdstuk 3 wordt beschreven.",
      "Focus bijvoorbeeld steunt op een andere combinatie van onderliggende attitudes en denkwijzen dan Vertrouwen. Je vult dus niet acht keer een losse, golf-specifieke vraag in — je beantwoordt vragen die zijn herleid tot een gevalideerde laag generieke skills, die daarna wordt vertaald naar jouw acht domeinen en vier factoren. Die extra laag is precies wat het model zijn scherpte geeft: de vragen meten iets dat al bewezen onderscheidend is, niet iets dat voor de gelegenheid is verzonnen.",
    ],

    diagramLabel: "Twee niveaus",
    diagramTitle: "Waar je het ziet, en waar je het traint",
    diagramIntro:
      "Dat onderscheid tussen twee lagen is niet alleen een meettechnisch detail — het bepaalt ook waar je daadwerkelijk kunt trainen. Een domein als Vertrouwen of een factor als Druk & stress is zelf geen trainbare eenheid; het is een verzamelnaam, een optelling van onderliggende skills. Je kunt niet rechtstreeks “aan Vertrouwen werken” zoals je aan een spier zou werken — het begrip is te abstract om ergens aan te grijpen.",
    diagramTopLabel: "Diagnostisch niveau",
    diagramTopCaption: "Acht domeinen en vier factoren. Hier zie je wáár het schuurt.",
    diagramTopNodes: ["Focus", "Vertrouwen", "Acceptatie"],
    diagramBottomLabel: "Interventieniveau",
    diagramBottomCaption: "De onderliggende skills. Hier verandert er daadwerkelijk iets.",
    diagramBottomNodes: ["Attitudes", "Denkwijzen", "Gedragswijzen", "Waarden"],
    diagramOutro:
      "Wat wél concreet en ontwikkelbaar is, zijn de onderliggende skills waaruit dat domein is opgebouwd. Elk advies en elke mentale oefening in je rapport richt zich dan ook nooit op een domein als geheel, maar altijd op een specifiek onderliggend subelement.",
    diagramAria:
      "Diagram van twee niveaus: bovenin het diagnostische niveau met domeinen als Focus, Vertrouwen en Acceptatie; daaronder het interventieniveau met de onderliggende skills — attitudes, denkwijzen, gedragswijzen en waarden. Lijnen verbinden elk domein met meerdere onderliggende skills.",

    axesQ: "De twee assen: prestatie en ontwikkeling",
    axesIntro: "Elke domeinscore is opgebouwd uit twee assen die samen bepalen hoe die score tot stand komt.",
    axes: [
      {
        name: "De prestatie-as",
        body: "meet hoe je een domein op dit moment daadwerkelijk uitvoert — hoe je nu, vandaag, omgaat met bijvoorbeeld focus, vertrouwen of acceptatie op de baan.",
      },
      {
        name: "De ontwikkelings-as",
        body: "meet iets anders: hoe ontwikkelbaar dat aspect voor jou is. Niet alleen waar je nu staat, maar hoeveel beweging daar voor jou realistisch in zit.",
      },
    ],
    axesOutro:
      "Dat is waarom een score meer is dan een foto van je huidige niveau: hij geeft ook een indicatie van hoeveel je op dat domein daadwerkelijk kunt verschuiven. Precies dat onderscheid ligt onder de keuze die je later in je Trainingsrapport tegenkomt tussen “verbeteren” en “benutten” — niet een keuze op basis van hoe laag of hoog een cijfer toevallig uitvalt, maar op basis van waar voor jou echte beweging mogelijk is.",
  },

  /* ── Chapter 3 ── */
  c3: {
    label: "Hoofdstuk 3",
    title: "Hoe de meting werkt",

    q1: "Waarom bestaat de assessment uit twee soorten vragen?",
    a1: [
      "Niet elke vraag in de assessment werkt hetzelfde. We gebruiken een combinatie van normatieve en ipsatieve vragen — een bewuste keuze die bepaalt hoe scherp je scores uiteindelijk zijn.",
      "Bij een normatieve vraag beoordeel je één stelling op zichzelf, los van de rest, op een absolute schaal — vergelijkbaar met hoe de meeste vragenlijsten werken. Dat is snel in te vullen, maar gevoelig voor wat in de psychometrie sociaal wenselijke antwoordtendentie heet: de neiging om jezelf op vrijwel elk afzonderlijk item gemiddeld tot hoog te beoordelen, omdat niets je dwingt tot een keuze tussen items onderling.",
      "Daarom werken andere vragen ipsatief, via een forced-choice-formaat: je krijgt een vast aantal punten — tien — dat je moet verdelen over meerdere stellingen tegelijk. Wil je één aspect hoger laten scoren, dan móét een ander aspect lager uitvallen.",
    ],

    demoLabel: "Probeer het verschil",
    demoIntro: "Twee keer dezelfde vraag, twee formaten. Verschuif de schuifregelaars en let op wat er gebeurt.",
    demoNormativeTag: "Normatief",
    demoNormativeHint: "Elke stelling los beoordeeld. Alles kan tegelijk hoog.",
    demoIpsativeTag: "Ipsatief",
    demoIpsativeHint: "Tien punten, te verdelen. Hoger op de één betekent lager op de ander.",
    demoQuestion: "Wat weegt het zwaarst in je beslissing bij een lastige slag?",
    demoItems: ["Risico inschatten", "Geduld bewaren", "Vertrouwen op je slag"],
    demoBudgetLabel: "Punten over",
    demoNormativeVerdict: "Alle drie hoog — en dus zegt de uitkomst weinig.",
    demoIpsativeVerdict: "Er ontstaat een rangorde. Dát is je profiel.",
    demoResetLabel: "Opnieuw",

    a1b: [
      "Waar normatieve scores relatief zijn ten opzichte van een externe norm of populatie, zijn ipsatieve scores relatief ten opzichte van elkaar, binnen het eigen antwoordpatroon van die persoon: ze zeggen niets over hoe sterk je bent vergeleken met andere golfers, maar wel welk aspect bij jóú, in verhouding tot de rest, het zwaarst weegt. Er is geen ontsnappen naar “ik scoor overal een 8” — het puntensysteem forceert een rangorde.",
      "Dat mechanisme is precies wat je nodig hebt bij vragen waarin meerdere aspecten tegelijk tegen elkaar afgewogen moeten worden — bijvoorbeeld wanneer je moet aangeven hoeveel gewicht risico, geduld en zelfvertrouwen elk in jouw beslissing hebben op een lastige slag. Een normatieve vraag zou drie losse, mogelijk alle drie hoge scores opleveren. De ipsatieve vraag dwingt een rangorde af — en juist die rangorde is wat je werkelijke profiel blootlegt.",
    ],

    q2: "Hoe is het model statistisch gevalideerd, met zoveel ipsatieve variabelen?",
    a2: [
      "Ipsatieve data heeft een bekende psychometrische uitdaging: omdat de punten binnen één vraag altijd optellen tot een vast totaal, zijn de scores binnen die vraag per definitie niet onafhankelijk van elkaar — een hogere score op het ene aspect drukt wiskundig gezien een ander aspect omlaag. Dat maakt klassieke validatiemethoden, zoals interne consistentie of directe scorevergelijking tussen personen, lastig toe te passen op zuiver ipsatieve data.",
      "Precies daarom combineert het model normatieve met ipsatieve vragen, in plaats van uitsluitend forced-choice te gebruiken. De normatieve items herstellen de vergelijkbaarheid tussen personen — op een absolute schaal kan de één wél hoger scoren dan de ander — terwijl de ipsatieve items binnen één persoon de scherpte geven die sociale wenselijkheid onmogelijk maakt.",
      "Voor puur ipsatieve data bestaan daarnaast specifieke statistische technieken, met name Thurstoniaanse IRT-modellen voor forced-choice-data. Die rekenen de gedwongen puntenverdeling om naar onderliggende scores die wél tussen personen vergelijkbaar zijn. Wegen — hoe zwaar een item meetelt voor het onderliggende kenmerk dat het moet meten — spelen daarin een grote rol: pas als die weging voor elk item zorgvuldig is vastgesteld, is de omrekening van een gedwongen keuze naar een betrouwbare onderliggende score houdbaar.",
    ],
    validationNote:
      "Het onderliggende meetmodel is op deze manier ongeveer 15.000 keer gevalideerd op organisatieniveau. Validatie op individueel niveau — het niveau waarop jouw persoonlijke rapport wordt opgebouwd — is een doorlopend onderzoekstraject, geen afgerond hoofdstuk.",
  },

  /* ── Chapter 4 ── */
  c4: {
    label: "Hoofdstuk 4",
    title: "Waar het model op rust",
    intro: [
      "Niet op één gevalideerde academische taxonomie die precies deze acht stappen en vier factoren als losse constructen onderscheidt — die indeling, met deze labels en deze grenzen, is de toegepaste synthese van MentalRoutine zelf.",
      "Wat er wél onder ligt, zijn meerdere onderzoekstradities uit de sportpsychologie en de bredere psychologie, elk met een eigen, deels golf-specifieke evidentie.",
    ],

    domainsTitle: "De acht domeinen",
    factorsTitle: "De vier beïnvloedende factoren",

    golfSpecific: "Golf-specifiek onderzoek",
    broadResearch: "Bredere basis",

    domains: [
      {
        name: "Focus",
        tradition: "Quiet Eye",
        cite: "Vickers, 1992, 1996 · Vine, Moore & Wilson, 2011",
        golf: true,
        body: "Golfers die vlak vóór de backswing hun blik langer en stabieler op de bal houden, putten aantoonbaar nauwkeuriger — een effect dat getraind kan worden en meetbaar doorwerkt in wedstrijdprestatie bij elite-golfers.",
      },
      {
        name: "Concentratie",
        tradition: "Attentional control",
        cite: "Nideffer, 1976",
        golf: false,
        body: "Aandacht varieert langs twee assen, breed-smal en extern-intern. Het vermogen bij je bal te blijven ondanks afleiding is het vasthouden van die stijl onder verstoring.",
      },
      {
        name: "Overtuiging",
        tradition: "Self-efficacy · Sport confidence",
        cite: "Bandura, 1977 · Vealey, 1986",
        golf: false,
        body: "Verwante constructen die in delen van de literatuur expliciet van elkaar worden onderscheiden.",
      },
      {
        name: "Vertrouwen",
        tradition: "Reinvestment · Ironic process",
        cite: "Masters, 1992 · Toner & Moran, 2011 · Wegner, 1994",
        golf: true,
        body: "Twee onafhankelijke tradities wijzen naar hetzelfde mechanisme. Sport-specifiek: bewust proberen een al-geautomatiseerde beweging te sturen verstoort die beweging juist — specifiek onderzocht bij golf-putten. Breder, uit de klinische psychologie: hoe meer je bewust probeert iets níet te doen, hoe groter de kans dat je het juist wél doet.",
      },
      {
        name: "Beoordeling",
        tradition: "Cognitive appraisal",
        cite: "Lazarus & Folkman, 1984",
        golf: false,
        body: "Het onderscheid tussen objectief vaststellen wat er gebeurde (primary appraisal) en pas dáárna een oordeel vellen, los van de eerste emotionele reactie.",
      },
      {
        name: "Acceptatie",
        tradition: "Mindfulness-Acceptance-Commitment",
        cite: "Gardner & Moore, 2004",
        golf: false,
        body: "Een protocol geworteld in de klinische Acceptance and Commitment Therapy, specifiek gericht op het verbeteren van sportprestaties via acceptatiegerichte technieken.",
      },
      {
        name: "Analyse",
        tradition: "Self-regulated learning · Attributietheorie",
        cite: "Zimmerman, 2000 · Cleary & Zimmerman, 2001 · Weiner, 1985",
        golf: false,
        body: "Een cyclus van vooruitdenken, uitvoeren en terugkijken, al eerder specifiek toegepast op sport bij het vergelijken van zelfregulatie tussen experts en beginners. De oorzaak duiden leunt daarbinnen op de causale attributietheorie.",
      },
      {
        name: "Transfer",
        tradition: "Explanatory style",
        cite: "Seligman, Nolen-Hoeksema, Thornton & Thornton, 1990",
        golf: false,
        body: "Of een tegenslag als tijdelijk en specifiek wordt verklaard, of als blijvend en alles-overkoepelend, voorspelt aantoonbaar hoe sporters na een misser presteren.",
      },
    ],

    factorItems: [
      {
        name: "Druk & stress",
        tradition: "Catastrophe model",
        cite: "Hardy, 1990 · Lazarus & Folkman, 1984",
        golf: false,
        body: "Prestatie neemt niet geleidelijk af naarmate spanning toeneemt, maar stort bij hoge cognitieve anxiety plotseling in — een abrupte “catastrofe” in plaats van een geleidelijke daling. Breder ligt hier ook appraisal-theorie onder: hoe iemand een drukvolle situatie inschat, bepaalt mede of hij die aankan.",
      },
      {
        name: "Geoefendheid",
        tradition: "Deliberate practice",
        cite: "Ericsson, Krampe & Tesch-Römer, 1993",
        golf: false,
        body: "Niet de hoeveelheid oefening, maar de kwaliteit — gericht, met directe feedback, net buiten de eigen comfortzone — verklaart het verschil tussen expert en amateur. Oorspronkelijk breder onderzoek (muziek, schaken), sindsdien specifiek op sport toegepast.",
      },
      {
        name: "Risicogeneigdheid",
        tradition: "Prospect theory",
        cite: "Kahneman & Tversky, 1979 · Pope & Schweitzer, 2011",
        golf: true,
        body: "Mensen wegen verlies zwaarder dan winst. Golf-specifiek toont onderzoek op 2,5 miljoen laser-gemeten putts op de PGA Tour dat zelfs de beste golfers ter wereld nauwkeuriger putten voor par dan voor birdie — omdat een bogey als verlies aanvoelt en een birdie als winst.",
      },
      {
        name: "Incasseringsvermogen",
        tradition: "Psychological resilience",
        cite: "Fletcher & Sarkar, 2012",
        golf: false,
        body: "Wat succesvolle topsporters onderscheidt is niet de afwezigheid van tegenslag, maar hoe ze protectieve factoren inzetten om na een tegenslag terug te keren naar hun basisniveau.",
      },
    ],

    outro:
      "Elk van deze tradities levert een deel van de wetenschappelijke basis onder één of meer van de acht domeinen of vier factoren. Het model zelf — de indeling in acht domeinen binnen drie fasen, plus de vier beïnvloedende factoren — is de eigen, toegepaste vertaalslag van MentalRoutine bovenop die onderzoeksbasis, getest op ruim 1.000 golfers, van handicap 0 tot 36+.",

    refsTitle: "Geraadpleegde bronnen",
    refsToggle: "Toon alle bronnen",
    refsToggleClose: "Verberg bronnen",
    refsCount: "21 publicaties",
  },

  /* ── Chapter 5 ── */
  c5: {
    label: "Hoofdstuk 5",
    title: "Grenzen en gebruik",
    blocks: [
      {
        q: "Is dit een diagnose?",
        a: ["Nee. Dit rapport helpt je jezelf beter te begrijpen; het is geen medische of psychologische diagnose. Heb je last van ernstige spanning of stress rond je spel? Praat dan met een sportpsycholoog."],
      },
      {
        q: "Bestaat er een “goed” of “fout” mentaal profiel?",
        a: ["Nee. Elk profiel is een eigen combinatie van sterktes en groeipunten."],
      },
      {
        q: "Hoe vaak kan ik de assessment opnieuw afnemen?",
        a: ["Geef jezelf 3 tot 6 maanden om met de adviezen uit je rapport te werken — reken op minstens 6 tot 10 rondes of 8 tot 12 trainingssessies. Neem daarna de assessment opnieuw af. Waar je écht iets hebt veranderd, zie je dat terug als een verschuiving in je profiel — niet in één procentje, maar in de richting waarin een heel domein meebeweegt."],
      },
    ],
    bandsLabel: "Hoe je je scores leest",
    bands: [
      { range: "7,0 – 10", name: "Sterkte",      body: "Een duidelijke sterkte. Hier kun je op bouwen." },
      { range: "4,0 – 7,0", name: "Werkgebied",  body: "Functioneel, met ruimte voor verbetering." },
      { range: "0 – 4,0",  name: "Aandachtspunt", body: "Hier valt voor jou het meeste te winnen." },
    ],
  },

  /* ── Closing CTA ── */
  cta: {
    label: "Aan de slag",
    h2a: "Nu weet je hoe het werkt.",
    h2b: "Benieuwd wat eruit komt?",
    body: "Begin gratis met de QuickScan, of neem de volledige assessment en krijg je complete spelersprofiel.",
    primary: "Doe de gratis QuickScan",
    secondary: "Bekijk de assessment",
  },
} as const;

export type MethodologyCopy = Widen<typeof nl>;

// ─────────────────────────────────────────────────────────────────────────────
// ENGLISH
// ─────────────────────────────────────────────────────────────────────────────
const en = {
  meta: {
    title: "The MentalRoutine method — how the assessment works",
    description:
      "How the MentalRoutine assessment works: eight domains across three phases, four influencing factors, normative and ipsative questions, and the research the model rests on.",
  },

  badge: "The method",
  h1a: "How does the",
  h1b: "MentalRoutine assessment work?",
  intro: "Before you buy a report, you want to know what you're buying. The short answer first — the full explanation below it.",

  summaryLabel: "In short",
  summary: [
    {
      k: "What you fill in",
      v: "Questions about how you experience your own mental game on the course, spread across eight domains within three phases: Pre-Shot, Swing and Post-Shot. It takes 20 to 25 minutes.",
    },
    {
      k: "What you get back",
      v: "Every domain gets a score from 0 to 10. Your eight domain scores are summarised into a single Mental Index. You also see four factors — pressure & stress, practice experience, risk appetite and resilience — that show under which conditions your routine holds up.",
    },
    {
      k: "How sharply it's measured",
      v: "The questions are partly forced-choice: you distribute points across statements, so you can't score high on everything. That makes it harder to flatter yourself, and produces a sharper picture than an ordinary questionnaire.",
    },
    {
      k: "What it is",
      v: "A mirror of your own experience, grounded in established sport-psychology and psychology research traditions, and tested on more than 1,000 golfers — from handicap 0 to 36+.",
    },
    {
      k: "What it isn't",
      v: "Not a swing analysis, not an external measurement, not a medical or psychological diagnosis. A score of 8 means: this is how you experience it — not “an expert rated you an 8.”",
    },
  ],
  summaryCta: "Read the full methodology",
  summaryCtaNote: "How scores are calculated, what research sits underneath, and how validation works.",

  tocLabel: "In this document",
  chapters: [
    { id: "wat-het-meet",  label: "What it measures" },
    { id: "opbouw",        label: "How it's built" },
    { id: "meting",        label: "How the measurement works" },
    { id: "onderzoek",     label: "What the model rests on" },
    { id: "grenzen",       label: "Limits and use" },
  ],

  c1: {
    label: "Chapter 1",
    title: "What it measures",
    blocks: [
      {
        q: "What does the MentalRoutine assessment measure?",
        a: [
          "The assessment measures how you experience your own mental game on the golf course — not an externally measured performance such as swing data or trackman figures. You answer a series of questions across eight domains. Within each domain we measure a number of smaller components: the building blocks your domain score is made of.",
        ],
      },
      {
        q: "How is a score calculated?",
        a: [
          "Every score is a mark from 0 to 10, based on the maximum attainable score on that specific component. Your eight domain scores are summarised into a single number: your Mental Index. Read a 10 as “the top of the scale” — not as perfection. There is no perfect mental profile; even the strongest golfers have domains that need attention.",
        ],
      },
      {
        q: "Does this measure objective performance, or my own experience?",
        a: [
          "Your own experience — but not loosely measured. This is not an external, measured performance like a swing analysis or tracking data; the questions are about how you experience yourself. What separates it from an ordinary self-report questionnaire is the precision: the underlying skills, and how developable they are for you, are largely measured ipsatively.",
          "Because you constantly have to choose what weighs most heavily relative to everything else, you can't retreat into a socially desirable “I'm good at all of it.” That keeps the result self-perception, but a sharply and reliably measured version of it — not a vague impression, but an outcome that pinpoints where your real proportions lie.",
          "So a score of 8 on Focus doesn't mean “an expert rated you an 8.” It means something more precise than a free self-estimate: it's how your own answer pattern, under the pressure of a real choice, relates to your other skills.",
        ],
      },
    ],
  },

  c2: {
    label: "Chapter 2",
    title: "How the model is built",

    domainsQ: "What are the eight domains?",
    domainsIntro:
      "Every shot runs through three phases: Pre-Shot (preparation), Swing (execution) and Post-Shot (processing). The eight domains are the measurable steps within those three phases.",
    phases: [
      { name: "Pre-Shot",  note: "Preparation", domains: ["Focus", "Concentration"] },
      { name: "Swing",     note: "Execution",   domains: ["Conviction", "Trust"] },
      { name: "Post-Shot", note: "Processing",  domains: ["Evaluation", "Acceptance", "Analysis", "Transfer"] },
    ],

    factorsQ: "What are the four influencing factors, and how do they differ from the domains?",
    factorsA: [
      "Around the eight domains sit four factors: pressure & stress, practice experience, risk appetite and resilience. These are not steps in your routine — they are the conditions that determine whether your routine holds up when it matters.",
      "They don't count towards your Mental Index, but they explain much of which domains wobble first for you under pressure. Each factor has a number of sub-factors of its own.",
    ],
    factors: ["Pressure & stress", "Practice experience", "Risk appetite", "Resilience"],
    factorsCaption: "The four factors surround your routine — part of it, but never a step within it.",

    layersQ: "What do the domains and factors build on?",
    layersA: [
      "The eight domains and four factors aren't an invention made up for golf. They build on an underlying measurement model for generic soft skills — attitudes, ways of thinking, ways of behaving and fundamental values — developed over fifteen years of behavioural research and assessment development within organisations and with individuals.",
      "That underlying model measures the individual skills that are then summarised in golf-specific terms: every domain and every factor is a sum of a number of those underlying skills, using the same normative and ipsative mechanism described in chapter 3.",
      "Focus, for example, rests on a different combination of underlying attitudes and ways of thinking than Trust. So you're not answering eight separate golf-specific questions — you're answering questions traced back to a validated layer of generic skills, which is then translated into your eight domains and four factors. That extra layer is exactly what gives the model its sharpness: the questions measure something already proven to discriminate, not something invented for the occasion.",
    ],

    diagramLabel: "Two levels",
    diagramTitle: "Where you see it, and where you train it",
    diagramIntro:
      "That distinction between two layers isn't just a measurement detail — it also determines where you can actually train. A domain like Trust, or a factor like Pressure & stress, isn't a trainable unit in itself; it's a collective name, a sum of underlying skills. You can't work on Trust directly the way you'd work on a muscle — the concept is too abstract to get hold of.",
    diagramTopLabel: "Diagnostic level",
    diagramTopCaption: "Eight domains and four factors. This is where you see what's rubbing.",
    diagramTopNodes: ["Focus", "Trust", "Acceptance"],
    diagramBottomLabel: "Intervention level",
    diagramBottomCaption: "The underlying skills. This is where something actually changes.",
    diagramBottomNodes: ["Attitudes", "Thinking", "Behaviour", "Values"],
    diagramOutro:
      "What is concrete and developable are the underlying skills the domain is built from. Every piece of advice and every mental exercise in your report therefore targets a specific underlying sub-element, never a domain as a whole.",
    diagramAria:
      "Diagram of two levels: at the top the diagnostic level with domains such as Focus, Trust and Acceptance; below it the intervention level with the underlying skills — attitudes, ways of thinking, ways of behaving and values. Lines connect each domain to several underlying skills.",

    axesQ: "The two axes: performance and development",
    axesIntro: "Every domain score is built from two axes that together determine how that score comes about.",
    axes: [
      {
        name: "The performance axis",
        body: "measures how you actually execute a domain right now — how you deal today with focus, trust or acceptance out on the course.",
      },
      {
        name: "The development axis",
        body: "measures something else: how developable that aspect is for you. Not just where you stand now, but how much movement is realistically available to you there.",
      },
    ],
    axesOutro:
      "That's why a score is more than a snapshot of your current level: it also indicates how much you can actually shift on that domain. Precisely that distinction sits underneath the choice you'll meet later in your Training Report between “improve” and “leverage” — not a choice based on how high or low a number happens to fall, but on where real movement is available to you.",
  },

  c3: {
    label: "Chapter 3",
    title: "How the measurement works",

    q1: "Why does the assessment use two kinds of questions?",
    a1: [
      "Not every question in the assessment works the same way. We use a combination of normative and ipsative questions — a deliberate choice that determines how sharp your scores end up being.",
      "In a normative question you rate one statement on its own, independent of the rest, on an absolute scale — the way most questionnaires work. That's quick to complete, but vulnerable to what psychometrics calls socially desirable responding: the tendency to rate yourself average to high on almost every individual item, because nothing forces a choice between items.",
      "So other questions work ipsatively, through a forced-choice format: you get a fixed number of points — ten — to distribute across several statements at once. If you want one aspect to score higher, another has to come out lower.",
    ],

    demoLabel: "Try the difference",
    demoIntro: "The same question twice, in two formats. Move the sliders and watch what happens.",
    demoNormativeTag: "Normative",
    demoNormativeHint: "Each statement rated separately. Everything can be high at once.",
    demoIpsativeTag: "Ipsative",
    demoIpsativeHint: "Ten points to distribute. Higher on one means lower on another.",
    demoQuestion: "What weighs heaviest in your decision on a difficult shot?",
    demoItems: ["Judging the risk", "Staying patient", "Trusting your swing"],
    demoBudgetLabel: "Points left",
    demoNormativeVerdict: "All three high — so the outcome says very little.",
    demoIpsativeVerdict: "A ranking appears. That's your profile.",
    demoResetLabel: "Reset",

    a1b: [
      "Where normative scores are relative to an external norm or population, ipsative scores are relative to each other, within that person's own answer pattern: they say nothing about how strong you are compared to other golfers, but everything about which aspect weighs most heavily for you relative to the rest. There's no escape into “I score an 8 on everything” — the points system forces a ranking.",
      "That mechanism is exactly what you need for questions where several aspects have to be weighed against each other — for instance when you indicate how much weight risk, patience and self-belief each carry in your decision on a difficult shot. A normative question would produce three separate, possibly all-high scores. The ipsative question forces a ranking — and that ranking is what exposes your real profile.",
    ],

    q2: "How is the model statistically validated, with so many ipsative variables?",
    a2: [
      "Ipsative data carries a well-known psychometric challenge: because the points within one question always add up to a fixed total, the scores within that question are by definition not independent of each other — a higher score on one aspect mathematically pushes another down. That makes classical validation methods, such as internal consistency or direct score comparison between people, hard to apply to purely ipsative data.",
      "That's exactly why the model combines normative with ipsative questions instead of using forced-choice alone. The normative items restore comparability between people — on an absolute scale one person genuinely can score higher than another — while the ipsative items provide the within-person sharpness that makes social desirability impossible.",
      "For purely ipsative data there are also specific statistical techniques, notably Thurstonian IRT models for forced-choice data. These convert the forced distribution of points into underlying scores that are comparable across people. Weights — how heavily an item counts towards the underlying characteristic it's meant to measure — play a major role: only once that weighting has been carefully established for every item does converting a forced choice into a reliable underlying score hold up.",
    ],
    validationNote:
      "The underlying measurement model has been validated in this way roughly 15,000 times at organisational level. Validation at individual level — the level your personal report is built on — is an ongoing research track, not a closed chapter.",
  },

  c4: {
    label: "Chapter 4",
    title: "What the model rests on",
    intro: [
      "Not on one validated academic taxonomy that distinguishes exactly these eight steps and four factors as separate constructs — that arrangement, with these labels and these boundaries, is MentalRoutine's own applied synthesis.",
      "What does sit underneath are several research traditions from sport psychology and psychology more broadly, each with its own evidence base, partly golf-specific.",
    ],

    domainsTitle: "The eight domains",
    factorsTitle: "The four influencing factors",

    golfSpecific: "Golf-specific research",
    broadResearch: "Broader basis",

    domains: [
      {
        name: "Focus",
        tradition: "Quiet Eye",
        cite: "Vickers, 1992, 1996 · Vine, Moore & Wilson, 2011",
        golf: true,
        body: "Golfers who hold their gaze longer and more steadily on the ball just before the backswing putt measurably more accurately — an effect that can be trained and that carries through to competitive performance in elite golfers.",
      },
      {
        name: "Concentration",
        tradition: "Attentional control",
        cite: "Nideffer, 1976",
        golf: false,
        body: "Attention varies along two axes, broad-narrow and external-internal. Staying with your ball despite distraction is holding that style under disruption.",
      },
      {
        name: "Conviction",
        tradition: "Self-efficacy · Sport confidence",
        cite: "Bandura, 1977 · Vealey, 1986",
        golf: false,
        body: "Related constructs that parts of the literature explicitly distinguish from one another.",
      },
      {
        name: "Trust",
        tradition: "Reinvestment · Ironic process",
        cite: "Masters, 1992 · Toner & Moran, 2011 · Wegner, 1994",
        golf: true,
        body: "Two independent traditions point at the same mechanism. Sport-specific: consciously trying to steer an already-automated movement disrupts that movement — studied specifically in golf putting. More broadly, from clinical psychology: the harder you consciously try not to do something, the more likely you are to do it.",
      },
      {
        name: "Evaluation",
        tradition: "Cognitive appraisal",
        cite: "Lazarus & Folkman, 1984",
        golf: false,
        body: "The distinction between objectively establishing what happened (primary appraisal) and only then passing judgement, separate from the first emotional reaction.",
      },
      {
        name: "Acceptance",
        tradition: "Mindfulness-Acceptance-Commitment",
        cite: "Gardner & Moore, 2004",
        golf: false,
        body: "A protocol rooted in clinical Acceptance and Commitment Therapy, aimed specifically at improving athletic performance through acceptance-based techniques.",
      },
      {
        name: "Analysis",
        tradition: "Self-regulated learning · Attribution theory",
        cite: "Zimmerman, 2000 · Cleary & Zimmerman, 2001 · Weiner, 1985",
        golf: false,
        body: "A cycle of forethought, performance and reflection, already applied specifically to sport when comparing self-regulation between experts and novices. Identifying the cause draws on causal attribution theory.",
      },
      {
        name: "Transfer",
        tradition: "Explanatory style",
        cite: "Seligman, Nolen-Hoeksema, Thornton & Thornton, 1990",
        golf: false,
        body: "Whether a setback is explained as temporary and specific, or as permanent and all-encompassing, demonstrably predicts how athletes perform after a miss.",
      },
    ],

    factorItems: [
      {
        name: "Pressure & stress",
        tradition: "Catastrophe model",
        cite: "Hardy, 1990 · Lazarus & Folkman, 1984",
        golf: false,
        body: "Performance doesn't decline gradually as tension rises; under high cognitive anxiety it collapses suddenly — an abrupt “catastrophe” rather than a gradual slide. Appraisal theory sits underneath this too: how someone reads a high-pressure situation partly determines whether they can handle it.",
      },
      {
        name: "Practice experience",
        tradition: "Deliberate practice",
        cite: "Ericsson, Krampe & Tesch-Römer, 1993",
        golf: false,
        body: "Not the amount of practice but its quality — targeted, with immediate feedback, just outside your comfort zone — explains the difference between expert and amateur. Originally broader research (music, chess), since applied specifically to sport.",
      },
      {
        name: "Risk appetite",
        tradition: "Prospect theory",
        cite: "Kahneman & Tversky, 1979 · Pope & Schweitzer, 2011",
        golf: true,
        body: "People weigh losses more heavily than gains. Golf-specifically, research on 2.5 million laser-measured putts on the PGA Tour shows that even the best golfers in the world putt more accurately for par than for birdie — because a bogey feels like a loss and a birdie like a gain.",
      },
      {
        name: "Resilience",
        tradition: "Psychological resilience",
        cite: "Fletcher & Sarkar, 2012",
        golf: false,
        body: "What sets successful elite athletes apart isn't the absence of setbacks, but how they deploy protective factors to return to their baseline afterwards.",
      },
    ],

    outro:
      "Each of these traditions supplies part of the scientific basis under one or more of the eight domains or four factors. The model itself — eight domains within three phases, plus the four influencing factors — is MentalRoutine's own applied translation on top of that research base, tested on more than 1,000 golfers, from handicap 0 to 36+.",

    refsTitle: "References consulted",
    refsToggle: "Show all references",
    refsToggleClose: "Hide references",
    refsCount: "21 publications",
  },

  c5: {
    label: "Chapter 5",
    title: "Limits and use",
    blocks: [
      {
        q: "Is this a diagnosis?",
        a: ["No. This report helps you understand yourself better; it is not a medical or psychological diagnosis. Struggling with severe tension or stress around your game? Speak to a sport psychologist."],
      },
      {
        q: "Is there a “right” or “wrong” mental profile?",
        a: ["No. Every profile is its own combination of strengths and growth areas."],
      },
      {
        q: "How often can I retake the assessment?",
        a: ["Give yourself 3 to 6 months to work with the advice in your report — count on at least 6 to 10 rounds or 8 to 12 practice sessions. Then take the assessment again. Where you've genuinely changed something, you'll see it as a shift in your profile — not in a single percentage point, but in the direction a whole domain moves."],
      },
    ],
    bandsLabel: "How to read your scores",
    bands: [
      { range: "7.0 – 10",  name: "Strength",       body: "A clear strength. Something to build on." },
      { range: "4.0 – 7.0", name: "Working area",   body: "Functional, with room to improve." },
      { range: "0 – 4.0",   name: "Attention point", body: "This is where you have the most to gain." },
    ],
  },

  cta: {
    label: "Get started",
    h2a: "Now you know how it works.",
    h2b: "Curious what comes out?",
    body: "Start free with the QuickScan, or take the full assessment and get your complete player profile.",
    primary: "Take the free QuickScan",
    secondary: "See the assessment",
  },
} satisfies MethodologyCopy;

// ─────────────────────────────────────────────────────────────────────────────
// GERMAN
// ─────────────────────────────────────────────────────────────────────────────
const de = {
  meta: {
    title: "Die MentalRoutine-Methodik — wie das Assessment funktioniert",
    description:
      "Wie das MentalRoutine-Assessment funktioniert: acht Domänen in drei Phasen, vier beeinflussende Faktoren, normative und ipsative Fragen und die Forschung, auf der das Modell ruht.",
  },

  badge: "Die Methodik",
  h1a: "Wie funktioniert das",
  h1b: "MentalRoutine-Assessment?",
  intro: "Bevor du einen Report kaufst, willst du wissen, was du kaufst. Zuerst die kurze Antwort — darunter die vollständige Erklärung.",

  summaryLabel: "Kurz gefasst",
  summary: [
    {
      k: "Was du ausfüllst",
      v: "Fragen dazu, wie du dein eigenes mentales Spiel auf dem Platz erlebst, verteilt auf acht Domänen in drei Phasen: Pre-Shot, Swing und Post-Shot. Das Ausfüllen dauert 20 bis 25 Minuten.",
    },
    {
      k: "Was du zurückbekommst",
      v: "Jede Domäne erhält eine Note von 0 bis 10. Deine acht Domänenwerte werden zu einem einzigen Mental Index zusammengefasst. Dazu siehst du vier Faktoren — Druck & Stress, Übungserfahrung, Risikobereitschaft und Resilienz —, die zeigen, unter welchen Bedingungen deine Routine standhält.",
    },
    {
      k: "Wie scharf das gemessen wird",
      v: "Die Fragen sind teilweise Forced-Choice: Du verteilst Punkte auf Aussagen und kannst deshalb nicht überall hoch werten. Das macht es schwerer, sich selbst zu schmeicheln, und ergibt ein schärferes Bild als ein gewöhnlicher Fragebogen.",
    },
    {
      k: "Was es ist",
      v: "Ein Spiegel deines eigenen Erlebens, gestützt auf etablierte sportpsychologische und psychologische Forschungstraditionen und getestet an über 1.000 Golfern — von Handicap 0 bis 36+.",
    },
    {
      k: "Was es nicht ist",
      v: "Keine Schwunganalyse, keine externe Messung, keine medizinische oder psychologische Diagnose. Ein Wert von 8 bedeutet: So erlebst du es selbst — nicht „ein Experte bewertet dich mit einer 8.“",
    },
  ],
  summaryCta: "Die vollständige Methodik lesen",
  summaryCtaNote: "Wie die Werte genau berechnet werden, welche Forschung darunterliegt und wie die Validierung funktioniert.",

  tocLabel: "In diesem Dokument",
  chapters: [
    { id: "wat-het-meet",  label: "Was es misst" },
    { id: "opbouw",        label: "Wie es aufgebaut ist" },
    { id: "meting",        label: "Wie die Messung funktioniert" },
    { id: "onderzoek",     label: "Worauf das Modell ruht" },
    { id: "grenzen",       label: "Grenzen und Anwendung" },
  ],

  c1: {
    label: "Kapitel 1",
    title: "Was es misst",
    blocks: [
      {
        q: "Was misst das MentalRoutine-Assessment?",
        a: [
          "Das Assessment misst, wie du dein eigenes mentales Spiel auf dem Golfplatz erlebst — keine extern gemessene Leistung wie Schwungdaten oder Trackman-Werte. Du beantwortest eine Reihe von Fragen, verteilt auf acht Domänen. Innerhalb jeder Domäne messen wir mehrere kleinere Bestandteile: die Bausteine, aus denen dein Domänenwert besteht.",
        ],
      },
      {
        q: "Wie wird ein Wert berechnet?",
        a: [
          "Jeder Wert ist eine Note von 0 bis 10, bezogen auf den maximal erreichbaren Wert für genau diesen Bestandteil. Deine acht Domänenwerte werden zu einer einzigen Zahl zusammengefasst: deinem Mental Index. Lies eine 10 als „das obere Ende der Skala“ — nicht als Perfektion. Ein perfektes mentales Profil gibt es nicht; auch die stärksten Golfer haben Domänen, die Aufmerksamkeit brauchen.",
        ],
      },
      {
        q: "Misst das eine objektive Leistung oder mein eigenes Erleben?",
        a: [
          "Dein eigenes Erleben — aber nicht lose gemessen. Das ist keine externe, gemessene Leistung wie eine Schwunganalyse oder Trackingdaten; die Fragen drehen sich darum, wie du dich selbst erlebst. Der Unterschied zu einem gewöhnlichen Selbsteinschätzungsfragebogen liegt in der Präzision: Die zugrunde liegenden Skills — und wie entwickelbar sie bei dir sind — werden größtenteils ipsativ gemessen.",
          "Weil du immer wieder wählen musst, was im Verhältnis zum Rest am schwersten wiegt, kannst du dich nicht in ein sozial erwünschtes „ich bin überall gut“ flüchten. Das Ergebnis bleibt damit Selbstwahrnehmung, aber eine scharf und zuverlässig gemessene Version davon — kein vager Eindruck, sondern ein Ergebnis, das genau zeigt, wo bei dir die tatsächlichen Verhältnisse liegen.",
          "Ein Wert von 8 bei Fokus bedeutet also nicht „ein Experte hat dich mit einer 8 bewertet.“ Er bedeutet etwas Genaueres als eine freie Selbsteinschätzung: Er zeigt, wie sich dein eigenes Antwortmuster — unter dem Zwang einer echten Entscheidung — zu deinen anderen Skills verhält.",
        ],
      },
    ],
  },

  c2: {
    label: "Kapitel 2",
    title: "Wie das Modell aufgebaut ist",

    domainsQ: "Was sind die acht Domänen?",
    domainsIntro:
      "Jeder Schlag durchläuft drei Phasen: Pre-Shot (Vorbereitung), Swing (Ausführung) und Post-Shot (Verarbeitung). Die acht Domänen sind die messbaren Schritte innerhalb dieser drei Phasen.",
    phases: [
      { name: "Pre-Shot",  note: "Vorbereitung", domains: ["Fokus", "Konzentration"] },
      { name: "Swing",     note: "Ausführung",   domains: ["Überzeugung", "Vertrauen"] },
      { name: "Post-Shot", note: "Verarbeitung", domains: ["Bewertung", "Akzeptanz", "Analyse", "Transfer"] },
    ],

    factorsQ: "Was sind die vier beeinflussenden Faktoren, und wie unterscheiden sie sich von den Domänen?",
    factorsA: [
      "Rund um die acht Domänen liegen vier Faktoren: Druck & Stress, Übungserfahrung, Risikobereitschaft und Resilienz. Das sind keine Schritte in deiner Routine — es sind die Bedingungen, die darüber entscheiden, ob deine Routine standhält, wenn es darauf ankommt.",
      "Sie zählen nicht in deinen Mental Index hinein, erklären aber zu einem großen Teil, welche Domänen bei dir unter Druck zuerst ins Wanken geraten. Jeder Faktor hat seinerseits mehrere Teilfaktoren.",
    ],
    factors: ["Druck & Stress", "Übungserfahrung", "Risikobereitschaft", "Resilienz"],
    factorsCaption: "Die vier Faktoren umgeben deine Routine — sie gehören dazu, sind aber nie ein Schritt darin.",

    layersQ: "Worauf bauen die Domänen und Faktoren auf?",
    layersA: [
      "Die acht Domänen und vier Faktoren sind keine eigens für Golf erfundene Konstruktion. Sie bauen auf einem zugrunde liegenden Messmodell für generische Soft Skills auf — Einstellungen, Denkweisen, Verhaltensweisen und grundlegende Werte —, entstanden aus fünfzehn Jahren Verhaltensforschung und Assessment-Entwicklung in Organisationen und mit Einzelpersonen.",
      "Dieses zugrunde liegende Modell misst die einzelnen Skills, die anschließend golfspezifisch zusammengefasst werden: Jede Domäne und jeder Faktor ist eine Summe aus mehreren dieser zugrunde liegenden Skills und nutzt dabei genau denselben normativen und ipsativen Messmechanismus, der in Kapitel 3 beschrieben wird.",
      "Fokus etwa stützt sich auf eine andere Kombination zugrunde liegender Einstellungen und Denkweisen als Vertrauen. Du beantwortest also nicht acht einzelne, golfspezifische Fragen — du beantwortest Fragen, die auf eine validierte Ebene generischer Skills zurückgeführt sind, die danach in deine acht Domänen und vier Faktoren übersetzt wird. Genau diese zusätzliche Ebene gibt dem Modell seine Schärfe: Die Fragen messen etwas, das sich bereits als trennscharf erwiesen hat, nicht etwas, das für den Anlass erfunden wurde.",
    ],

    diagramLabel: "Zwei Ebenen",
    diagramTitle: "Wo du es siehst, und wo du es trainierst",
    diagramIntro:
      "Dieser Unterschied zwischen zwei Ebenen ist nicht nur ein messtechnisches Detail — er bestimmt auch, wo du tatsächlich trainieren kannst. Eine Domäne wie Vertrauen oder ein Faktor wie Druck & Stress ist selbst keine trainierbare Einheit; es ist ein Sammelbegriff, eine Summe zugrunde liegender Skills. Du kannst nicht direkt „an Vertrauen arbeiten“, so wie du an einem Muskel arbeiten würdest — der Begriff ist zu abstrakt, um daran anzusetzen.",
    diagramTopLabel: "Diagnostische Ebene",
    diagramTopCaption: "Acht Domänen und vier Faktoren. Hier siehst du, wo es hakt.",
    diagramTopNodes: ["Fokus", "Vertrauen", "Akzeptanz"],
    diagramBottomLabel: "Interventionsebene",
    diagramBottomCaption: "Die zugrunde liegenden Skills. Hier verändert sich tatsächlich etwas.",
    diagramBottomNodes: ["Einstellungen", "Denkweisen", "Verhaltensweisen", "Werte"],
    diagramOutro:
      "Konkret und entwickelbar sind die zugrunde liegenden Skills, aus denen eine Domäne aufgebaut ist. Jeder Rat und jede mentale Übung in deinem Report richtet sich deshalb immer auf ein bestimmtes zugrunde liegendes Teilelement, nie auf eine Domäne als Ganzes.",
    diagramAria:
      "Diagramm mit zwei Ebenen: oben die diagnostische Ebene mit Domänen wie Fokus, Vertrauen und Akzeptanz; darunter die Interventionsebene mit den zugrunde liegenden Skills — Einstellungen, Denkweisen, Verhaltensweisen und Werte. Linien verbinden jede Domäne mit mehreren zugrunde liegenden Skills.",

    axesQ: "Die zwei Achsen: Leistung und Entwicklung",
    axesIntro: "Jeder Domänenwert ist aus zwei Achsen aufgebaut, die zusammen bestimmen, wie dieser Wert zustande kommt.",
    axes: [
      {
        name: "Die Leistungsachse",
        body: "misst, wie du eine Domäne im Moment tatsächlich ausführst — wie du heute, hier und jetzt, auf dem Platz mit Fokus, Vertrauen oder Akzeptanz umgehst.",
      },
      {
        name: "Die Entwicklungsachse",
        body: "misst etwas anderes: wie entwickelbar dieser Aspekt für dich ist. Nicht nur, wo du gerade stehst, sondern wie viel Bewegung dort für dich realistisch drin ist.",
      },
    ],
    axesOutro:
      "Deshalb ist ein Wert mehr als eine Momentaufnahme deines aktuellen Niveaus: Er zeigt auch, wie viel du in dieser Domäne tatsächlich verschieben kannst. Genau dieser Unterschied liegt der Wahl zugrunde, die dir später in deinem Trainingsreport zwischen „verbessern“ und „nutzen“ begegnet — keine Wahl danach, wie hoch oder niedrig eine Zahl zufällig ausfällt, sondern danach, wo für dich echte Bewegung möglich ist.",
  },

  c3: {
    label: "Kapitel 3",
    title: "Wie die Messung funktioniert",

    q1: "Warum besteht das Assessment aus zwei Arten von Fragen?",
    a1: [
      "Nicht jede Frage im Assessment funktioniert gleich. Wir nutzen eine Kombination aus normativen und ipsativen Fragen — eine bewusste Entscheidung, die bestimmt, wie scharf deine Werte am Ende sind.",
      "Bei einer normativen Frage bewertest du eine einzelne Aussage für sich, losgelöst vom Rest, auf einer absoluten Skala — so, wie die meisten Fragebögen arbeiten. Das ist schnell ausgefüllt, aber anfällig für das, was die Psychometrie sozial erwünschtes Antwortverhalten nennt: die Neigung, sich bei nahezu jedem einzelnen Item mittel bis hoch zu bewerten, weil nichts dich zu einer Entscheidung zwischen den Items zwingt.",
      "Deshalb funktionieren andere Fragen ipsativ, über ein Forced-Choice-Format: Du bekommst eine feste Anzahl Punkte — zehn —, die du auf mehrere Aussagen gleichzeitig verteilen musst. Soll ein Aspekt höher ausfallen, muss ein anderer zwangsläufig niedriger werden.",
    ],

    demoLabel: "Probier den Unterschied aus",
    demoIntro: "Zweimal dieselbe Frage, in zwei Formaten. Verschiebe die Regler und achte darauf, was passiert.",
    demoNormativeTag: "Normativ",
    demoNormativeHint: "Jede Aussage einzeln bewertet. Alles kann gleichzeitig hoch sein.",
    demoIpsativeTag: "Ipsativ",
    demoIpsativeHint: "Zehn Punkte zum Verteilen. Höher beim einen heißt niedriger beim anderen.",
    demoQuestion: "Was wiegt bei einem schwierigen Schlag in deiner Entscheidung am schwersten?",
    demoItems: ["Das Risiko einschätzen", "Geduldig bleiben", "Auf deinen Schwung vertrauen"],
    demoBudgetLabel: "Punkte übrig",
    demoNormativeVerdict: "Alle drei hoch — und damit sagt das Ergebnis wenig aus.",
    demoIpsativeVerdict: "Es entsteht eine Rangfolge. Genau das ist dein Profil.",
    demoResetLabel: "Zurücksetzen",

    a1b: [
      "Während normative Werte relativ zu einer externen Norm oder Population sind, sind ipsative Werte relativ zueinander, innerhalb des eigenen Antwortmusters dieser Person: Sie sagen nichts darüber, wie stark du im Vergleich zu anderen Golfern bist, aber alles darüber, welcher Aspekt bei dir — im Verhältnis zum Rest — am schwersten wiegt. Es gibt kein Entkommen in ein „ich habe überall eine 8“ — das Punktesystem erzwingt eine Rangfolge.",
      "Genau dieser Mechanismus ist das, was du bei Fragen brauchst, in denen mehrere Aspekte gegeneinander abgewogen werden müssen — etwa wenn du angeben sollst, wie viel Gewicht Risiko, Geduld und Selbstvertrauen jeweils in deiner Entscheidung bei einem schwierigen Schlag haben. Eine normative Frage würde drei einzelne, womöglich durchweg hohe Werte liefern. Die ipsative Frage erzwingt eine Rangfolge — und genau diese Rangfolge legt dein tatsächliches Profil offen.",
    ],

    q2: "Wie ist das Modell statistisch validiert, bei so vielen ipsativen Variablen?",
    a2: [
      "Ipsative Daten bringen eine bekannte psychometrische Herausforderung mit sich: Weil die Punkte innerhalb einer Frage immer zu einer festen Summe addieren, sind die Werte innerhalb dieser Frage per Definition nicht unabhängig voneinander — ein höherer Wert bei einem Aspekt drückt rechnerisch einen anderen nach unten. Das macht klassische Validierungsmethoden wie interne Konsistenz oder den direkten Wertvergleich zwischen Personen bei rein ipsativen Daten schwer anwendbar.",
      "Genau deshalb kombiniert das Modell normative mit ipsativen Fragen, statt ausschließlich Forced-Choice zu verwenden. Die normativen Items stellen die Vergleichbarkeit zwischen Personen wieder her — auf einer absoluten Skala kann eine Person tatsächlich höher liegen als eine andere —, während die ipsativen Items innerhalb einer Person die Schärfe liefern, die soziale Erwünschtheit unmöglich macht.",
      "Für rein ipsative Daten gibt es außerdem spezifische statistische Verfahren, allen voran Thurstonsche IRT-Modelle für Forced-Choice-Daten. Sie rechnen die erzwungene Punkteverteilung in zugrunde liegende Werte um, die sehr wohl zwischen Personen vergleichbar sind. Gewichtungen — wie stark ein Item auf das zugrunde liegende Merkmal einzahlt, das es messen soll — spielen dabei eine große Rolle: Erst wenn diese Gewichtung für jedes Item sorgfältig bestimmt ist, hält die Umrechnung einer erzwungenen Wahl in einen zuverlässigen zugrunde liegenden Wert stand.",
    ],
    validationNote:
      "Das zugrunde liegende Messmodell wurde auf diese Weise rund 15.000 Mal auf Organisationsebene validiert. Die Validierung auf individueller Ebene — der Ebene, auf der dein persönlicher Report aufgebaut wird — ist ein laufendes Forschungsvorhaben, kein abgeschlossenes Kapitel.",
  },

  c4: {
    label: "Kapitel 4",
    title: "Worauf das Modell ruht",
    intro: [
      "Nicht auf einer einzigen validierten akademischen Taxonomie, die genau diese acht Schritte und vier Faktoren als eigenständige Konstrukte unterscheidet — diese Einteilung, mit diesen Bezeichnungen und diesen Grenzen, ist die angewandte Synthese von MentalRoutine selbst.",
      "Was tatsächlich darunterliegt, sind mehrere Forschungstraditionen aus der Sportpsychologie und der Psychologie im weiteren Sinne, jede mit einer eigenen, teils golfspezifischen Evidenzbasis.",
    ],

    domainsTitle: "Die acht Domänen",
    factorsTitle: "Die vier beeinflussenden Faktoren",

    golfSpecific: "Golfspezifische Forschung",
    broadResearch: "Breitere Basis",

    domains: [
      {
        name: "Fokus",
        tradition: "Quiet Eye",
        cite: "Vickers, 1992, 1996 · Vine, Moore & Wilson, 2011",
        golf: true,
        body: "Golfer, die ihren Blick kurz vor dem Rückschwung länger und ruhiger auf dem Ball halten, putten nachweislich genauer — ein Effekt, der trainierbar ist und sich bei Elite-Golfern messbar bis in die Wettkampfleistung fortsetzt.",
      },
      {
        name: "Konzentration",
        tradition: "Attentional control",
        cite: "Nideffer, 1976",
        golf: false,
        body: "Aufmerksamkeit variiert entlang zweier Achsen: weit-eng und außen-innen. Trotz Ablenkung beim eigenen Ball zu bleiben heißt, diesen Stil unter Störung zu halten.",
      },
      {
        name: "Überzeugung",
        tradition: "Self-efficacy · Sport confidence",
        cite: "Bandura, 1977 · Vealey, 1986",
        golf: false,
        body: "Verwandte Konstrukte, die in Teilen der Literatur ausdrücklich voneinander unterschieden werden.",
      },
      {
        name: "Vertrauen",
        tradition: "Reinvestment · Ironic process",
        cite: "Masters, 1992 · Toner & Moran, 2011 · Wegner, 1994",
        golf: true,
        body: "Zwei unabhängige Traditionen zeigen auf denselben Mechanismus. Sportspezifisch: Der bewusste Versuch, eine bereits automatisierte Bewegung zu steuern, stört genau diese Bewegung — speziell beim Golf-Putten untersucht. Breiter, aus der klinischen Psychologie: Je stärker du bewusst versuchst, etwas nicht zu tun, desto größer ist die Wahrscheinlichkeit, dass du es gerade tust.",
      },
      {
        name: "Bewertung",
        tradition: "Cognitive appraisal",
        cite: "Lazarus & Folkman, 1984",
        golf: false,
        body: "Der Unterschied zwischen dem objektiven Feststellen dessen, was passiert ist (primary appraisal), und dem erst danach folgenden Urteil, losgelöst von der ersten emotionalen Reaktion.",
      },
      {
        name: "Akzeptanz",
        tradition: "Mindfulness-Acceptance-Commitment",
        cite: "Gardner & Moore, 2004",
        golf: false,
        body: "Ein Protokoll, das in der klinischen Acceptance and Commitment Therapy wurzelt und gezielt darauf ausgerichtet ist, sportliche Leistung über akzeptanzbasierte Techniken zu verbessern.",
      },
      {
        name: "Analyse",
        tradition: "Self-regulated learning · Attributionstheorie",
        cite: "Zimmerman, 2000 · Cleary & Zimmerman, 2001 · Weiner, 1985",
        golf: false,
        body: "Ein Zyklus aus Vorausdenken, Ausführen und Zurückblicken, bereits speziell auf den Sport angewandt beim Vergleich der Selbstregulation von Experten und Anfängern. Das Deuten der Ursache stützt sich dabei auf die kausale Attributionstheorie.",
      },
      {
        name: "Transfer",
        tradition: "Explanatory style",
        cite: "Seligman, Nolen-Hoeksema, Thornton & Thornton, 1990",
        golf: false,
        body: "Ob ein Rückschlag als vorübergehend und speziell erklärt wird oder als dauerhaft und alles überspannend, sagt nachweislich voraus, wie Sportler nach einem Fehlschlag weiterspielen.",
      },
    ],

    factorItems: [
      {
        name: "Druck & Stress",
        tradition: "Catastrophe model",
        cite: "Hardy, 1990 · Lazarus & Folkman, 1984",
        golf: false,
        body: "Die Leistung nimmt mit steigender Anspannung nicht allmählich ab; bei hoher kognitiver Angst bricht sie plötzlich ein — eine abrupte „Katastrophe“ statt eines langsamen Abfalls. Darunter liegt auch die Appraisal-Theorie: Wie jemand eine Drucksituation einschätzt, bestimmt mit, ob er ihr gewachsen ist.",
      },
      {
        name: "Übungserfahrung",
        tradition: "Deliberate practice",
        cite: "Ericsson, Krampe & Tesch-Römer, 1993",
        golf: false,
        body: "Nicht die Menge des Übens, sondern dessen Qualität — gezielt, mit unmittelbarem Feedback, knapp außerhalb der eigenen Komfortzone — erklärt den Unterschied zwischen Experte und Amateur. Ursprünglich breitere Forschung (Musik, Schach), seither speziell auf den Sport angewandt.",
      },
      {
        name: "Risikobereitschaft",
        tradition: "Prospect theory",
        cite: "Kahneman & Tversky, 1979 · Pope & Schweitzer, 2011",
        golf: true,
        body: "Menschen gewichten Verluste stärker als Gewinne. Golfspezifisch zeigt eine Untersuchung von 2,5 Millionen lasergemessenen Putts auf der PGA Tour, dass selbst die besten Golfer der Welt für Par genauer putten als für Birdie — weil sich ein Bogey wie ein Verlust anfühlt und ein Birdie wie ein Gewinn.",
      },
      {
        name: "Resilienz",
        tradition: "Psychological resilience",
        cite: "Fletcher & Sarkar, 2012",
        golf: false,
        body: "Was erfolgreiche Spitzensportler auszeichnet, ist nicht das Ausbleiben von Rückschlägen, sondern wie sie schützende Faktoren einsetzen, um danach auf ihr Ausgangsniveau zurückzukehren.",
      },
    ],

    outro:
      "Jede dieser Traditionen liefert einen Teil der wissenschaftlichen Basis unter einer oder mehreren der acht Domänen oder vier Faktoren. Das Modell selbst — acht Domänen in drei Phasen, dazu die vier beeinflussenden Faktoren — ist die eigene, angewandte Übersetzungsleistung von MentalRoutine auf dieser Forschungsbasis, getestet an über 1.000 Golfern, von Handicap 0 bis 36+.",

    refsTitle: "Herangezogene Quellen",
    refsToggle: "Alle Quellen anzeigen",
    refsToggleClose: "Quellen ausblenden",
    refsCount: "21 Publikationen",
  },

  c5: {
    label: "Kapitel 5",
    title: "Grenzen und Anwendung",
    blocks: [
      {
        q: "Ist das eine Diagnose?",
        a: ["Nein. Dieser Report hilft dir, dich selbst besser zu verstehen; er ist keine medizinische oder psychologische Diagnose. Leidest du unter starker Anspannung oder Stress rund um dein Spiel? Dann sprich mit einem Sportpsychologen."],
      },
      {
        q: "Gibt es ein „richtiges“ oder „falsches“ mentales Profil?",
        a: ["Nein. Jedes Profil ist eine eigene Kombination aus Stärken und Wachstumsfeldern."],
      },
      {
        q: "Wie oft kann ich das Assessment wiederholen?",
        a: ["Gib dir 3 bis 6 Monate Zeit, um mit den Empfehlungen aus deinem Report zu arbeiten — rechne mit mindestens 6 bis 10 Runden oder 8 bis 12 Trainingseinheiten. Nimm das Assessment danach erneut ab. Wo du wirklich etwas verändert hast, siehst du das als Verschiebung in deinem Profil — nicht in einem einzelnen Prozentpunkt, sondern in der Richtung, in die sich eine ganze Domäne mitbewegt."],
      },
    ],
    bandsLabel: "Wie du deine Werte liest",
    bands: [
      { range: "7,0 – 10",  name: "Stärke",         body: "Eine klare Stärke. Darauf kannst du aufbauen." },
      { range: "4,0 – 7,0", name: "Arbeitsfeld",    body: "Funktioniert, mit Raum nach oben." },
      { range: "0 – 4,0",   name: "Aufmerksamkeitspunkt", body: "Hier ist für dich am meisten zu gewinnen." },
    ],
  },

  cta: {
    label: "Loslegen",
    h2a: "Jetzt weißt du, wie es funktioniert.",
    h2b: "Neugierig, was dabei herauskommt?",
    body: "Starte kostenlos mit dem QuickScan, oder mach das vollständige Assessment und erhalte dein komplettes Spielerprofil.",
    primary: "Kostenlosen QuickScan machen",
    secondary: "Assessment ansehen",
  },
} satisfies MethodologyCopy;

// ─────────────────────────────────────────────────────────────────────────────
// FRENCH
// ─────────────────────────────────────────────────────────────────────────────
const fr = {
  meta: {
    title: "La méthode MentalRoutine — comment fonctionne l'assessment",
    description:
      "Comment fonctionne l'assessment MentalRoutine : huit domaines répartis sur trois phases, quatre facteurs d'influence, questions normatives et ipsatives, et la recherche sur laquelle repose le modèle.",
  },

  badge: "La méthode",
  h1a: "Comment fonctionne",
  h1b: "l'assessment MentalRoutine ?",
  intro: "Avant d'acheter un rapport, tu veux savoir ce que tu achètes. D'abord la réponse courte — l'explication complète juste en dessous.",

  summaryLabel: "En bref",
  summary: [
    {
      k: "Ce que tu remplis",
      v: "Des questions sur la façon dont tu vis ton propre jeu mental sur le parcours, réparties sur huit domaines au sein de trois phases : Pre-Shot, Swing et Post-Shot. Compte 20 à 25 minutes.",
    },
    {
      k: "Ce que tu reçois",
      v: "Chaque domaine reçoit une note de 0 à 10. Tes huit scores de domaine sont résumés en un seul Mental Index. Tu vois aussi quatre facteurs — pression & stress, qualité d'entraînement, appétence au risque et résilience — qui montrent dans quelles conditions ta routine tient bon.",
    },
    {
      k: "Avec quelle précision c'est mesuré",
      v: "Les questions sont en partie à choix forcé (forced-choice) : tu répartis des points entre plusieurs affirmations, donc tu ne peux pas obtenir un score élevé partout. Difficile, dès lors, de te flatter toi-même — et l'image obtenue est plus nette que celle d'un questionnaire ordinaire.",
    },
    {
      k: "Ce que c'est",
      v: "Un miroir de ton propre vécu, fondé sur des traditions de recherche établies en psychologie du sport et en psychologie, et testé sur plus de 1 000 golfeurs — du handicap 0 à 36+.",
    },
    {
      k: "Ce que ce n'est pas",
      v: "Ni une analyse de swing, ni une mesure externe, ni un diagnostic médical ou psychologique. Un score de 8 signifie : c'est ainsi que tu le vis toi-même — et non « un expert t'a attribué un 8 ».",
    },
  ],
  summaryCta: "Lire la méthodologie complète",
  summaryCtaNote: "Comment les scores sont calculés précisément, quelle recherche se trouve en dessous, et comment fonctionne la validation.",

  tocLabel: "Dans ce document",
  chapters: [
    { id: "wat-het-meet",  label: "Ce que ça mesure" },
    { id: "opbouw",        label: "Comment c'est construit" },
    { id: "meting",        label: "Comment fonctionne la mesure" },
    { id: "onderzoek",     label: "Sur quoi repose le modèle" },
    { id: "grenzen",       label: "Limites et usage" },
  ],

  c1: {
    label: "Chapitre 1",
    title: "Ce que ça mesure",
    blocks: [
      {
        q: "Que mesure l'assessment MentalRoutine ?",
        a: [
          "L'assessment mesure la façon dont tu vis ton propre jeu mental sur le parcours — et non une performance mesurée de l'extérieur comme des données de swing ou des chiffres de trackman. Tu réponds à une série de questions réparties sur huit domaines. À l'intérieur de chaque domaine, nous mesurons plusieurs composantes plus petites : les briques dont ton score de domaine est constitué.",
        ],
      },
      {
        q: "Comment un score est-il calculé ?",
        a: [
          "Chaque score est une note de 0 à 10, basée sur le score maximal atteignable sur cette composante précise. Tes huit scores de domaine sont résumés en un seul chiffre : ton Mental Index. Vois un 10 comme « le haut de l'échelle » — pas comme la perfection. Il n'existe pas de profil mental parfait ; même les golfeurs les plus solides ont des domaines qui demandent de l'attention.",
        ],
      },
      {
        q: "Est-ce que cela mesure une performance objective, ou mon propre vécu ?",
        a: [
          "Ton propre vécu — mais pas mesuré à la légère. Ce n'est pas une performance externe et mesurée comme une analyse de swing ou des données de tracking ; les questions portent sur la façon dont tu te perçois toi-même. Ce qui distingue cet assessment d'un questionnaire d'auto-évaluation ordinaire, c'est la précision : les compétences sous-jacentes, et leur potentiel de développement chez toi, sont mesurées en grande partie de façon ipsative.",
          "Parce que tu dois sans cesse choisir ce qui pèse le plus lourd par rapport au reste, tu ne peux pas te réfugier dans un « je suis bon partout » socialement désirable. Le résultat reste donc une perception de soi, mais une version mesurée avec finesse et fiabilité — pas une impression vague, mais un résultat qui indique précisément où se situent tes véritables proportions.",
          "Un score de 8 en Focus ne veut donc pas dire « un expert t'a attribué un 8 ». Il dit quelque chose de plus précis qu'une auto-estimation libre : c'est la façon dont ton propre schéma de réponses, sous la contrainte d'un vrai choix, se situe par rapport à tes autres compétences.",
        ],
      },
    ],
  },

  c2: {
    label: "Chapitre 2",
    title: "Comment le modèle est construit",

    domainsQ: "Quels sont les huit domaines ?",
    domainsIntro:
      "Chaque coup traverse trois phases : Pre-Shot (préparation), Swing (exécution) et Post-Shot (traitement). Les huit domaines sont les étapes mesurables au sein de ces trois phases.",
    phases: [
      { name: "Pre-Shot",  note: "Préparation", domains: ["Focus", "Concentration"] },
      { name: "Swing",     note: "Exécution",   domains: ["Conviction", "Confiance"] },
      { name: "Post-Shot", note: "Traitement",  domains: ["Évaluation", "Acceptation", "Analyse", "Transfert"] },
    ],

    factorsQ: "Quels sont les quatre facteurs d'influence, et en quoi diffèrent-ils des domaines ?",
    factorsA: [
      "Autour des huit domaines se trouvent quatre facteurs : pression & stress, qualité d'entraînement, appétence au risque et résilience. Ce ne sont pas des étapes de ta routine — ce sont les conditions qui déterminent si ta routine tient bon quand ça compte.",
      "Ils n'entrent pas dans le calcul de ton Mental Index, mais ils expliquent en grande partie quels domaines vacillent en premier chez toi sous la pression. Chaque facteur possède lui-même plusieurs sous-facteurs.",
    ],
    factors: ["Pression & stress", "Qualité d'entraînement", "Appétence au risque", "Résilience"],
    factorsCaption: "Les quatre facteurs entourent ta routine — ils en font partie, mais ne constituent jamais une étape à l'intérieur.",

    layersQ: "Sur quoi s'appuient les domaines et les facteurs ?",
    layersA: [
      "Les huit domaines et quatre facteurs ne sont pas une invention créée pour le golf. Ils s'appuient sur un modèle de mesure sous-jacent des soft skills génériques — attitudes, façons de penser, façons d'agir et valeurs fondamentales — issu de quinze années de recherche comportementale et de développement d'assessments au sein d'organisations et auprès d'individus.",
      "Ce modèle sous-jacent mesure les compétences individuelles qui sont ensuite résumées en termes propres au golf : chaque domaine et chaque facteur est la somme d'un certain nombre de ces compétences sous-jacentes, et utilise le même mécanisme normatif et ipsatif décrit au chapitre 3.",
      "Le Focus, par exemple, repose sur une combinaison d'attitudes et de façons de penser sous-jacentes différente de celle de la Confiance. Tu ne réponds donc pas à huit questions distinctes propres au golf — tu réponds à des questions ramenées à une couche validée de compétences génériques, ensuite traduite en tes huit domaines et quatre facteurs. Cette couche supplémentaire est exactement ce qui donne au modèle sa finesse : les questions mesurent quelque chose dont le pouvoir discriminant est déjà démontré, pas quelque chose d'inventé pour l'occasion.",
    ],

    diagramLabel: "Deux niveaux",
    diagramTitle: "Là où tu le vois, et là où tu l'entraînes",
    diagramIntro:
      "Cette distinction entre deux couches n'est pas qu'un détail de mesure — elle détermine aussi où tu peux réellement t'entraîner. Un domaine comme la Confiance, ou un facteur comme Pression & stress, n'est pas en soi une unité entraînable ; c'est un nom collectif, la somme de compétences sous-jacentes. Tu ne peux pas « travailler la Confiance » directement comme tu travaillerais un muscle — la notion est trop abstraite pour offrir une prise.",
    diagramTopLabel: "Niveau diagnostique",
    diagramTopCaption: "Huit domaines et quatre facteurs. C'est là que tu vois ce qui coince.",
    diagramTopNodes: ["Focus", "Confiance", "Acceptation"],
    diagramBottomLabel: "Niveau d'intervention",
    diagramBottomCaption: "Les compétences sous-jacentes. C'est là que quelque chose change vraiment.",
    diagramBottomNodes: ["Attitudes", "Façons de penser", "Comportements", "Valeurs"],
    diagramOutro:
      "Ce qui est concret et développable, ce sont les compétences sous-jacentes dont le domaine est constitué. Chaque conseil et chaque exercice mental de ton rapport vise donc toujours un sous-élément sous-jacent précis, jamais un domaine dans son ensemble.",
    diagramAria:
      "Diagramme à deux niveaux : en haut le niveau diagnostique avec des domaines comme Focus, Confiance et Acceptation ; en dessous le niveau d'intervention avec les compétences sous-jacentes — attitudes, façons de penser, façons d'agir et valeurs. Des lignes relient chaque domaine à plusieurs compétences sous-jacentes.",

    axesQ: "Les deux axes : performance et développement",
    axesIntro: "Chaque score de domaine est constitué de deux axes qui déterminent ensemble la façon dont ce score se forme.",
    axes: [
      {
        name: "L'axe de la performance",
        body: "mesure la façon dont tu exécutes réellement un domaine en ce moment — comment tu gères aujourd'hui, sur le parcours, le focus, la confiance ou l'acceptation.",
      },
      {
        name: "L'axe du développement",
        body: "mesure autre chose : le potentiel de développement de cet aspect pour toi. Non seulement où tu en es aujourd'hui, mais quelle marge de mouvement est réellement à ta portée.",
      },
    ],
    axesOutro:
      "C'est pourquoi un score est plus qu'une photo de ton niveau actuel : il indique aussi de combien tu peux réellement bouger sur ce domaine. C'est précisément cette distinction qui se trouve sous le choix que tu rencontreras plus tard dans ton Rapport d'entraînement entre « améliorer » et « exploiter » — non pas un choix fondé sur le hasard d'un chiffre haut ou bas, mais sur les endroits où un vrai mouvement est possible pour toi.",
  },

  c3: {
    label: "Chapitre 3",
    title: "Comment fonctionne la mesure",

    q1: "Pourquoi l'assessment utilise-t-il deux types de questions ?",
    a1: [
      "Toutes les questions de l'assessment ne fonctionnent pas de la même manière. Nous combinons des questions normatives et ipsatives — un choix délibéré qui détermine la finesse de tes scores.",
      "Dans une question normative, tu évalues une affirmation isolément, indépendamment du reste, sur une échelle absolue — comme le font la plupart des questionnaires. C'est rapide à remplir, mais sensible à ce que la psychométrie appelle la désirabilité sociale : la tendance à s'attribuer une note moyenne à élevée sur presque chaque item pris séparément, parce que rien ne force un choix entre les items.",
      "C'est pourquoi d'autres questions fonctionnent de façon ipsative, via un format à choix forcé (forced-choice) : tu reçois un nombre fixe de points — dix — à répartir entre plusieurs affirmations à la fois. Si tu veux qu'un aspect obtienne un score plus élevé, un autre doit forcément descendre.",
    ],

    demoLabel: "Teste la différence",
    demoIntro: "La même question deux fois, en deux formats. Déplace les curseurs et observe ce qui se passe.",
    demoNormativeTag: "Normatif",
    demoNormativeHint: "Chaque affirmation évaluée séparément. Tout peut être élevé en même temps.",
    demoIpsativeTag: "Ipsatif",
    demoIpsativeHint: "Dix points à répartir. Plus haut sur l'un signifie plus bas sur l'autre.",
    demoQuestion: "Qu'est-ce qui pèse le plus lourd dans ta décision sur un coup difficile ?",
    demoItems: ["Évaluer le risque", "Rester patient", "Faire confiance à ton swing"],
    demoBudgetLabel: "Points restants",
    demoNormativeVerdict: "Les trois sont élevés — le résultat ne dit donc pas grand-chose.",
    demoIpsativeVerdict: "Un ordre de priorité apparaît. C'est ça, ton profil.",
    demoResetLabel: "Réinitialiser",

    a1b: [
      "Là où les scores normatifs sont relatifs à une norme ou à une population externe, les scores ipsatifs sont relatifs les uns aux autres, à l'intérieur du schéma de réponses propre à la personne : ils ne disent rien de ta force par rapport aux autres golfeurs, mais tout de l'aspect qui pèse le plus lourd chez toi par rapport au reste. Impossible de s'échapper vers un « j'ai 8 partout » — le système de points impose un ordre de priorité.",
      "Ce mécanisme est exactement ce dont tu as besoin pour des questions où plusieurs aspects doivent être mis en balance — par exemple lorsque tu dois indiquer quel poids le risque, la patience et la confiance en soi ont chacun dans ta décision sur un coup difficile. Une question normative produirait trois scores distincts, potentiellement tous élevés. La question ipsative impose un ordre de priorité — et c'est justement cet ordre qui met ton véritable profil à nu.",
    ],

    q2: "Comment le modèle est-il validé statistiquement, avec autant de variables ipsatives ?",
    a2: [
      "Les données ipsatives présentent un défi psychométrique bien connu : puisque les points d'une même question s'additionnent toujours pour donner un total fixe, les scores au sein de cette question ne sont par définition pas indépendants les uns des autres — un score plus élevé sur un aspect pousse mathématiquement un autre vers le bas. Cela rend les méthodes de validation classiques, comme la cohérence interne ou la comparaison directe des scores entre personnes, difficiles à appliquer à des données purement ipsatives.",
      "C'est précisément pour cela que le modèle combine questions normatives et ipsatives, plutôt que de recourir uniquement au choix forcé. Les items normatifs rétablissent la comparabilité entre les personnes — sur une échelle absolue, l'un peut réellement obtenir un score plus élevé que l'autre — tandis que les items ipsatifs apportent, à l'intérieur d'une même personne, la finesse qui rend la désirabilité sociale impossible.",
      "Pour les données purement ipsatives, il existe en outre des techniques statistiques spécifiques, notamment les modèles IRT thurstoniens pour les données de choix forcé. Ils convertissent la répartition forcée des points en scores sous-jacents qui, eux, sont comparables entre personnes. Les pondérations — le poids d'un item dans la caractéristique sous-jacente qu'il est censé mesurer — y jouent un rôle majeur : ce n'est qu'une fois cette pondération soigneusement établie pour chaque item que la conversion d'un choix forcé en un score sous-jacent fiable devient défendable.",
    ],
    validationNote:
      "Le modèle de mesure sous-jacent a été validé de cette manière environ 15 000 fois au niveau organisationnel. La validation au niveau individuel — celui sur lequel ton rapport personnel est construit — est un chantier de recherche en cours, pas un chapitre clos.",
  },

  c4: {
    label: "Chapitre 4",
    title: "Sur quoi repose le modèle",
    intro: [
      "Pas sur une taxonomie académique validée qui distinguerait exactement ces huit étapes et ces quatre facteurs comme des construits séparés — ce découpage, avec ces intitulés et ces frontières, est la synthèse appliquée propre à MentalRoutine.",
      "Ce qui se trouve bel et bien en dessous, ce sont plusieurs traditions de recherche issues de la psychologie du sport et de la psychologie au sens large, chacune avec ses propres données probantes, en partie propres au golf.",
    ],

    domainsTitle: "Les huit domaines",
    factorsTitle: "Les quatre facteurs d'influence",

    golfSpecific: "Recherche propre au golf",
    broadResearch: "Base plus large",

    domains: [
      {
        name: "Focus",
        tradition: "Quiet Eye",
        cite: "Vickers, 1992, 1996 · Vine, Moore & Wilson, 2011",
        golf: true,
        body: "Les golfeurs qui maintiennent leur regard plus longtemps et plus stablement sur la balle juste avant le backswing puttent de façon mesurablement plus précise — un effet qui peut s'entraîner et qui se répercute sur la performance en compétition chez les golfeurs d'élite.",
      },
      {
        name: "Concentration",
        tradition: "Attentional control",
        cite: "Nideffer, 1976",
        golf: false,
        body: "L'attention varie selon deux axes : large-étroit et externe-interne. Rester avec sa balle malgré les distractions, c'est maintenir ce style malgré les perturbations.",
      },
      {
        name: "Conviction",
        tradition: "Self-efficacy · Sport confidence",
        cite: "Bandura, 1977 · Vealey, 1986",
        golf: false,
        body: "Des construits apparentés qu'une partie de la littérature distingue explicitement l'un de l'autre.",
      },
      {
        name: "Confiance",
        tradition: "Reinvestment · Ironic process",
        cite: "Masters, 1992 · Toner & Moran, 2011 · Wegner, 1994",
        golf: true,
        body: "Deux traditions indépendantes pointent vers le même mécanisme. Côté sport : essayer consciemment de piloter un mouvement déjà automatisé perturbe justement ce mouvement — étudié spécifiquement sur le putting au golf. Plus largement, du côté de la psychologie clinique : plus tu essaies consciemment de ne pas faire quelque chose, plus tu risques de le faire.",
      },
      {
        name: "Évaluation",
        tradition: "Cognitive appraisal",
        cite: "Lazarus & Folkman, 1984",
        golf: false,
        body: "La distinction entre constater objectivement ce qui s'est passé (primary appraisal) et ne porter un jugement qu'ensuite, indépendamment de la première réaction émotionnelle.",
      },
      {
        name: "Acceptation",
        tradition: "Mindfulness-Acceptance-Commitment",
        cite: "Gardner & Moore, 2004",
        golf: false,
        body: "Un protocole enraciné dans l'Acceptance and Commitment Therapy clinique, spécifiquement destiné à améliorer la performance sportive par des techniques axées sur l'acceptation.",
      },
      {
        name: "Analyse",
        tradition: "Self-regulated learning · Attribution theory",
        cite: "Zimmerman, 2000 · Cleary & Zimmerman, 2001 · Weiner, 1985",
        golf: false,
        body: "Un cycle d'anticipation, d'exécution et de retour réflexif, déjà appliqué spécifiquement au sport lors de la comparaison de l'autorégulation entre experts et débutants. L'identification de la cause s'appuie, à l'intérieur de ce cycle, sur la théorie de l'attribution causale.",
      },
      {
        name: "Transfert",
        tradition: "Explanatory style",
        cite: "Seligman, Nolen-Hoeksema, Thornton & Thornton, 1990",
        golf: false,
        body: "Le fait qu'un revers soit expliqué comme temporaire et circonscrit, ou comme durable et englobant tout, prédit de façon démontrée la performance des sportifs après un coup manqué.",
      },
    ],

    factorItems: [
      {
        name: "Pression & stress",
        tradition: "Catastrophe model",
        cite: "Hardy, 1990 · Lazarus & Folkman, 1984",
        golf: false,
        body: "La performance ne décline pas progressivement à mesure que la tension monte ; sous une anxiété cognitive élevée, elle s'effondre brutalement — une « catastrophe » abrupte plutôt qu'une baisse graduelle. La théorie de l'appraisal se trouve également en dessous : la façon dont quelqu'un évalue une situation de forte pression détermine en partie s'il pourra y faire face.",
      },
      {
        name: "Qualité d'entraînement",
        tradition: "Deliberate practice",
        cite: "Ericsson, Krampe & Tesch-Römer, 1993",
        golf: false,
        body: "Ce n'est pas la quantité d'entraînement mais sa qualité — ciblé, avec un retour immédiat, juste en dehors de ta zone de confort — qui explique la différence entre l'expert et l'amateur. Recherche à l'origine plus large (musique, échecs), appliquée depuis spécifiquement au sport.",
      },
      {
        name: "Appétence au risque",
        tradition: "Prospect theory",
        cite: "Kahneman & Tversky, 1979 · Pope & Schweitzer, 2011",
        golf: true,
        body: "Les gens accordent plus de poids aux pertes qu'aux gains. Côté golf, une étude portant sur 2,5 millions de putts mesurés au laser sur le PGA Tour montre que même les meilleurs golfeurs du monde puttent plus précisément pour le par que pour le birdie — parce qu'un bogey est ressenti comme une perte et un birdie comme un gain.",
      },
      {
        name: "Résilience",
        tradition: "Psychological resilience",
        cite: "Fletcher & Sarkar, 2012",
        golf: false,
        body: "Ce qui distingue les sportifs de haut niveau qui réussissent n'est pas l'absence de revers, mais la façon dont ils mobilisent des facteurs protecteurs pour revenir ensuite à leur niveau de base.",
      },
    ],

    outro:
      "Chacune de ces traditions apporte une partie de la base scientifique sous un ou plusieurs des huit domaines ou quatre facteurs. Le modèle lui-même — huit domaines au sein de trois phases, plus les quatre facteurs d'influence — est la traduction appliquée propre à MentalRoutine, construite au-dessus de cette base de recherche et testée sur plus de 1 000 golfeurs, du handicap 0 à 36+.",

    refsTitle: "Sources consultées",
    refsToggle: "Afficher toutes les sources",
    refsToggleClose: "Masquer les sources",
    refsCount: "21 publications",
  },

  c5: {
    label: "Chapitre 5",
    title: "Limites et usage",
    blocks: [
      {
        q: "Est-ce un diagnostic ?",
        a: ["Non. Ce rapport t'aide à mieux te comprendre ; ce n'est pas un diagnostic médical ou psychologique. Tu souffres d'une tension ou d'un stress sévères autour de ton jeu ? Parles-en à un psychologue du sport."],
      },
      {
        q: "Existe-t-il un « bon » ou un « mauvais » profil mental ?",
        a: ["Non. Chaque profil est une combinaison unique de forces et de points de progression."],
      },
      {
        q: "À quelle fréquence puis-je repasser l'assessment ?",
        a: ["Accorde-toi 3 à 6 mois pour travailler avec les conseils de ton rapport — compte au moins 6 à 10 parcours ou 8 à 12 séances d'entraînement. Repasse ensuite l'assessment. Là où tu as vraiment changé quelque chose, tu le verras sous forme d'un glissement dans ton profil — pas dans un petit pourcentage, mais dans la direction que prend tout un domaine."],
      },
    ],
    bandsLabel: "Comment lire tes scores",
    bands: [
      { range: "7,0 – 10",  name: "Force",             body: "Une force nette. Tu peux construire là-dessus." },
      { range: "4,0 – 7,0", name: "Zone de travail",   body: "Fonctionnel, avec de la marge de progression." },
      { range: "0 – 4,0",   name: "Point d'attention", body: "C'est là que tu as le plus à gagner." },
    ],
  },

  cta: {
    label: "C'est parti",
    h2a: "Maintenant tu sais comment ça marche.",
    h2b: "Curieux de voir ce qui en sort ?",
    body: "Commence gratuitement avec le QuickScan, ou passe l'assessment complet et obtiens ton profil de joueur intégral.",
    primary: "Faire le QuickScan gratuit",
    secondary: "Voir l'assessment",
  },
} satisfies MethodologyCopy;

// ─────────────────────────────────────────────────────────────────────────────
// SPANISH
// ─────────────────────────────────────────────────────────────────────────────
const es = {
  meta: {
    title: "El método MentalRoutine — cómo funciona la evaluación",
    description:
      "Cómo funciona la evaluación MentalRoutine: ocho dominios en tres fases, cuatro factores de influencia, preguntas normativas e ipsativas, y la investigación sobre la que se apoya el modelo.",
  },

  badge: "El método",
  h1a: "¿Cómo funciona la",
  h1b: "evaluación MentalRoutine?",
  intro: "Antes de comprar un informe, quieres saber qué estás comprando. Primero la respuesta corta — debajo, la explicación completa.",

  summaryLabel: "En resumen",
  summary: [
    {
      k: "Qué rellenas",
      v: "Preguntas sobre cómo vives tu propio juego mental en el campo, repartidas en ocho dominios dentro de tres fases: Pre-Shot, Swing y Post-Shot. Se tarda entre 20 y 25 minutos.",
    },
    {
      k: "Qué recibes",
      v: "Cada dominio recibe una puntuación de 0 a 10. Tus ocho puntuaciones de dominio se resumen en un único Mental Index. Además ves cuatro factores — presión y estrés, calidad de entrenamiento, apetito de riesgo y resiliencia — que muestran en qué condiciones tu rutina aguanta.",
    },
    {
      k: "Con qué precisión se mide",
      v: "Las preguntas son en parte de elección forzada (forced-choice): repartes puntos entre afirmaciones, de modo que no puedes puntuar alto en todo. Eso hace más difícil halagarte a ti mismo y produce una imagen más nítida que un cuestionario corriente.",
    },
    {
      k: "Qué es",
      v: "Un espejo de tu propia vivencia, apoyado en tradiciones de investigación consolidadas de la psicología del deporte y de la psicología, y probado con más de 1.000 golfistas — de handicap 0 a 36+.",
    },
    {
      k: "Qué no es",
      v: "No es un análisis del swing, ni una medición externa, ni un diagnóstico médico o psicológico. Una puntuación de 8 significa: así lo vives tú — no «un experto te ha puesto un 8».",
    },
  ],
  summaryCta: "Lee la metodología completa",
  summaryCtaNote: "Cómo se calculan las puntuaciones, qué investigación hay debajo y cómo funciona la validación.",

  tocLabel: "En este documento",
  chapters: [
    { id: "wat-het-meet",  label: "Qué mide" },
    { id: "opbouw",        label: "Cómo está construido" },
    { id: "meting",        label: "Cómo funciona la medición" },
    { id: "onderzoek",     label: "Sobre qué se apoya el modelo" },
    { id: "grenzen",       label: "Límites y uso" },
  ],

  c1: {
    label: "Capítulo 1",
    title: "Qué mide",
    blocks: [
      {
        q: "¿Qué mide la evaluación MentalRoutine?",
        a: [
          "La evaluación mide cómo vives tú tu propio juego mental en el campo de golf — no un rendimiento medido externamente, como los datos del swing o las cifras del trackman. Respondes a una serie de preguntas repartidas en ocho dominios. Dentro de cada dominio medimos una serie de componentes más pequeños: los bloques con los que se construye la puntuación de ese dominio.",
        ],
      },
      {
        q: "¿Cómo se calcula una puntuación?",
        a: [
          "Cada puntuación es una nota de 0 a 10, basada en la puntuación máxima alcanzable en ese componente concreto. Tus ocho puntuaciones de dominio se resumen en un único número: tu Mental Index. Interpreta el 10 como «el tope de la escala», no como la perfección. No existe un perfil mental perfecto; incluso los golfistas más fuertes tienen dominios que requieren atención.",
        ],
      },
      {
        q: "¿Esto mide un rendimiento objetivo o mi propia vivencia?",
        a: [
          "Tu propia vivencia — pero no medida a la ligera. No se trata de un rendimiento externo y medido, como un análisis del swing o datos de seguimiento; las preguntas van sobre cómo te vives a ti mismo. Lo que lo separa de un cuestionario de autoevaluación corriente es la precisión: las habilidades subyacentes, y hasta qué punto son desarrollables en ti, se miden en gran medida de forma ipsativa.",
          "Como tienes que elegir constantemente qué pesa más en relación con todo lo demás, no puedes refugiarte en un socialmente deseable «soy bueno en todo». Eso hace que el resultado siga siendo tu percepción de ti mismo, pero una versión medida de forma nítida y fiable — no una impresión vaga, sino un resultado que señala con exactitud dónde están tus proporciones reales.",
          "Así que una puntuación de 8 en Enfoque no significa «un experto te ha puesto un 8». Significa algo más preciso que una autoestimación libre: es cómo se relaciona tu propio patrón de respuesta, bajo la presión de una elección real, con tus demás habilidades.",
        ],
      },
    ],
  },

  c2: {
    label: "Capítulo 2",
    title: "Cómo está construido el modelo",

    domainsQ: "¿Cuáles son los ocho dominios?",
    domainsIntro:
      "Cada golpe recorre tres fases: Pre-Shot (preparación), Swing (ejecución) y Post-Shot (procesamiento). Los ocho dominios son los pasos medibles dentro de esas tres fases.",
    phases: [
      { name: "Pre-Shot",  note: "Preparación", domains: ["Enfoque", "Concentración"] },
      { name: "Swing",     note: "Ejecución",   domains: ["Convicción", "Confianza"] },
      { name: "Post-Shot", note: "Procesamiento",  domains: ["Evaluación", "Aceptación", "Análisis", "Transferencia"] },
    ],

    factorsQ: "¿Cuáles son los cuatro factores de influencia y en qué se diferencian de los dominios?",
    factorsA: [
      "Alrededor de los ocho dominios se sitúan cuatro factores: presión y estrés, calidad de entrenamiento, apetito de riesgo y resiliencia. No son pasos de tu rutina — son las condiciones que determinan si tu rutina aguanta cuando la cosa se pone seria.",
      "No cuentan para tu Mental Index, pero explican en buena medida qué dominios se tambalean primero en ti bajo presión. Cada factor tiene a su vez una serie de subfactores.",
    ],
    factors: ["Presión y estrés", "Calidad de entrenamiento", "Apetito de riesgo", "Resiliencia"],
    factorsCaption: "Los cuatro factores rodean tu rutina — forman parte de ella, pero nunca son un paso dentro de ella.",

    layersQ: "¿Sobre qué se construyen los dominios y los factores?",
    layersA: [
      "Los ocho dominios y los cuatro factores no son un invento hecho a medida para el golf. Se apoyan en un modelo de medición subyacente para soft skills genéricas — actitudes, formas de pensar, formas de comportarse y valores fundamentales — desarrollado a lo largo de quince años de investigación del comportamiento y desarrollo de evaluaciones dentro de organizaciones y con personas individuales.",
      "Ese modelo subyacente mide las habilidades sueltas que después se resumen en términos específicos del golf: cada dominio y cada factor es la suma de una serie de esas habilidades subyacentes, y utiliza el mismo mecanismo normativo e ipsativo que se describe en el capítulo 3.",
      "Enfoque, por ejemplo, se apoya en una combinación distinta de actitudes y formas de pensar subyacentes que Confianza. Así que no respondes a ocho preguntas sueltas específicas de golf — respondes a preguntas que se remiten a una capa validada de habilidades genéricas, que después se traduce a tus ocho dominios y cuatro factores. Esa capa adicional es justamente lo que da al modelo su nitidez: las preguntas miden algo que ya ha demostrado discriminar, no algo inventado para la ocasión.",
    ],

    diagramLabel: "Dos niveles",
    diagramTitle: "Dónde lo ves y dónde lo entrenas",
    diagramIntro:
      "Esa distinción entre dos capas no es solo un detalle técnico de medición — también determina dónde puedes entrenar de verdad. Un dominio como Confianza, o un factor como Presión y estrés, no es en sí mismo una unidad entrenable; es un nombre colectivo, la suma de habilidades subyacentes. No puedes «trabajar la Confianza» directamente como trabajarías un músculo — el concepto es demasiado abstracto para agarrarse a algo.",
    diagramTopLabel: "Nivel diagnóstico",
    diagramTopCaption: "Ocho dominios y cuatro factores. Aquí ves dónde roza.",
    diagramTopNodes: ["Enfoque", "Confianza", "Aceptación"],
    diagramBottomLabel: "Nivel de intervención",
    diagramBottomCaption: "Las habilidades subyacentes. Aquí es donde algo cambia de verdad.",
    diagramBottomNodes: ["Actitudes", "Formas de pensar", "Comportamiento", "Valores"],
    diagramOutro:
      "Lo que sí es concreto y desarrollable son las habilidades subyacentes con las que está construido ese dominio. Por eso cada consejo y cada ejercicio mental de tu informe se dirige siempre a un subelemento subyacente concreto, nunca a un dominio en su conjunto.",
    diagramAria:
      "Diagrama de dos niveles: arriba el nivel diagnóstico con dominios como Enfoque, Confianza y Aceptación; debajo el nivel de intervención con las habilidades subyacentes — actitudes, formas de pensar, formas de comportarse y valores. Unas líneas conectan cada dominio con varias habilidades subyacentes.",

    axesQ: "Los dos ejes: rendimiento y desarrollo",
    axesIntro: "Cada puntuación de dominio se construye a partir de dos ejes que juntos determinan cómo surge esa puntuación.",
    axes: [
      {
        name: "El eje de rendimiento",
        body: "mide cómo ejecutas realmente un dominio en este momento — cómo manejas hoy, por ejemplo, el enfoque, la confianza o la aceptación en el campo.",
      },
      {
        name: "El eje de desarrollo",
        body: "mide otra cosa: hasta qué punto ese aspecto es desarrollable en ti. No solo dónde estás ahora, sino cuánto movimiento es realista para ti en ese terreno.",
      },
    ],
    axesOutro:
      "Por eso una puntuación es más que una foto de tu nivel actual: también indica cuánto puedes desplazarte realmente en ese dominio. Precisamente esa distinción está detrás de la elección que encontrarás más adelante en tu Informe de entrenamiento entre «mejorar» y «aprovechar» — no una elección basada en lo alto o lo bajo que resulte ser un número, sino en dónde hay para ti movimiento real.",
  },

  c3: {
    label: "Capítulo 3",
    title: "Cómo funciona la medición",

    q1: "¿Por qué la evaluación utiliza dos tipos de preguntas?",
    a1: [
      "No todas las preguntas de la evaluación funcionan igual. Usamos una combinación de preguntas normativas e ipsativas — una elección deliberada que determina cuán nítidas acaban siendo tus puntuaciones.",
      "En una pregunta normativa valoras una afirmación por sí sola, con independencia del resto, en una escala absoluta — tal como funcionan la mayoría de los cuestionarios. Eso se rellena rápido, pero es vulnerable a lo que en psicometría se llama deseabilidad social: la tendencia a valorarte entre medio y alto en casi todos los ítems por separado, porque nada te obliga a elegir entre ítems.",
      "Por eso otras preguntas funcionan de forma ipsativa, mediante un formato de elección forzada (forced-choice): recibes un número fijo de puntos — diez — que debes repartir entre varias afirmaciones a la vez. Si quieres que un aspecto puntúe más alto, otro tiene que salir más bajo.",
    ],

    demoLabel: "Prueba la diferencia",
    demoIntro: "La misma pregunta dos veces, en dos formatos. Mueve los deslizadores y observa qué ocurre.",
    demoNormativeTag: "Normativo",
    demoNormativeHint: "Cada afirmación valorada por separado. Todo puede ser alto a la vez.",
    demoIpsativeTag: "Ipsativo",
    demoIpsativeHint: "Diez puntos para repartir. Más en uno significa menos en otro.",
    demoQuestion: "¿Qué pesa más en tu decisión ante un golpe difícil?",
    demoItems: ["Calcular el riesgo", "Mantener la paciencia", "Confiar en tu swing"],
    demoBudgetLabel: "Puntos restantes",
    demoNormativeVerdict: "Los tres altos — y por eso el resultado dice muy poco.",
    demoIpsativeVerdict: "Aparece un orden de prioridad. Eso es tu perfil.",
    demoResetLabel: "Reiniciar",

    a1b: [
      "Mientras que las puntuaciones normativas son relativas a una norma o población externa, las puntuaciones ipsativas son relativas entre sí, dentro del propio patrón de respuesta de esa persona: no dicen nada sobre lo fuerte que eres en comparación con otros golfistas, pero sí todo sobre qué aspecto pesa más en ti en relación con el resto. No hay escapatoria hacia un «saco un 8 en todo» — el sistema de puntos fuerza un orden de prioridad.",
      "Ese mecanismo es exactamente lo que necesitas en preguntas donde varios aspectos deben sopesarse unos frente a otros — por ejemplo, cuando tienes que indicar cuánto peso tienen el riesgo, la paciencia y la autoconfianza en tu decisión ante un golpe difícil. Una pregunta normativa produciría tres puntuaciones sueltas, posiblemente las tres altas. La pregunta ipsativa fuerza un orden de prioridad — y es justamente ese orden el que deja al descubierto tu perfil real.",
    ],

    q2: "¿Cómo se ha validado estadísticamente el modelo, con tantas variables ipsativas?",
    a2: [
      "Los datos ipsativos plantean un reto psicométrico bien conocido: como los puntos dentro de una misma pregunta siempre suman un total fijo, las puntuaciones dentro de esa pregunta no son, por definición, independientes entre sí — una puntuación más alta en un aspecto empuja matemáticamente otro hacia abajo. Eso hace que los métodos clásicos de validación, como la consistencia interna o la comparación directa de puntuaciones entre personas, sean difíciles de aplicar a datos puramente ipsativos.",
      "Precisamente por eso el modelo combina preguntas normativas con ipsativas, en lugar de usar únicamente elección forzada. Los ítems normativos restablecen la comparabilidad entre personas — en una escala absoluta una persona sí puede puntuar más alto que otra — mientras que los ítems ipsativos aportan, dentro de una misma persona, la nitidez que hace imposible la deseabilidad social.",
      "Para los datos puramente ipsativos existen además técnicas estadísticas específicas, en particular los modelos IRT thurstonianos para datos de elección forzada. Estos convierten el reparto forzado de puntos en puntuaciones subyacentes que sí son comparables entre personas. Los pesos — cuánto cuenta un ítem para la característica subyacente que debe medir — desempeñan aquí un papel importante: solo cuando esa ponderación se ha establecido con cuidado para cada ítem se sostiene la conversión de una elección forzada en una puntuación subyacente fiable.",
    ],
    validationNote:
      "El modelo de medición subyacente se ha validado de esta manera unas 15.000 veces a nivel organizativo. La validación a nivel individual — el nivel sobre el que se construye tu informe personal — es una línea de investigación en curso, no un capítulo cerrado.",
  },

  c4: {
    label: "Capítulo 4",
    title: "Sobre qué se apoya el modelo",
    intro: [
      "No sobre una única taxonomía académica validada que distinga exactamente estos ocho pasos y estos cuatro factores como constructos separados — esa ordenación, con estas etiquetas y estos límites, es la síntesis aplicada propia de MentalRoutine.",
      "Lo que sí hay debajo son varias tradiciones de investigación de la psicología del deporte y de la psicología en un sentido más amplio, cada una con su propia base de evidencia, en parte específica del golf.",
    ],

    domainsTitle: "Los ocho dominios",
    factorsTitle: "Los cuatro factores de influencia",

    golfSpecific: "Investigación específica de golf",
    broadResearch: "Base más amplia",

    domains: [
      {
        name: "Enfoque",
        tradition: "Quiet Eye",
        cite: "Vickers, 1992, 1996 · Vine, Moore & Wilson, 2011",
        golf: true,
        body: "Los golfistas que mantienen la mirada más tiempo y de forma más estable sobre la bola justo antes del backswing puttean de manera demostrablemente más precisa — un efecto que se puede entrenar y que se traslada al rendimiento en competición en golfistas de élite.",
      },
      {
        name: "Concentración",
        tradition: "Attentional control",
        cite: "Nideffer, 1976",
        golf: false,
        body: "La atención varía a lo largo de dos ejes: amplia-estrecha y externa-interna. Ser capaz de quedarte con tu bola pese a las distracciones es sostener ese estilo bajo perturbación.",
      },
      {
        name: "Convicción",
        tradition: "Self-efficacy · Sport confidence",
        cite: "Bandura, 1977 · Vealey, 1986",
        golf: false,
        body: "Constructos emparentados que parte de la literatura distingue explícitamente entre sí.",
      },
      {
        name: "Confianza",
        tradition: "Reinvestment · Ironic process",
        cite: "Masters, 1992 · Toner & Moran, 2011 · Wegner, 1994",
        golf: true,
        body: "Dos tradiciones independientes apuntan al mismo mecanismo. Específico del deporte: intentar dirigir conscientemente un movimiento ya automatizado precisamente lo perturba — estudiado en concreto en el putt de golf. En un sentido más amplio, desde la psicología clínica: cuanto más intentas conscientemente no hacer algo, mayor es la probabilidad de que acabes haciéndolo.",
      },
      {
        name: "Evaluación",
        tradition: "Cognitive appraisal",
        cite: "Lazarus & Folkman, 1984",
        golf: false,
        body: "La distinción entre constatar objetivamente qué ocurrió (primary appraisal) y solo después emitir un juicio, al margen de la primera reacción emocional.",
      },
      {
        name: "Aceptación",
        tradition: "Mindfulness-Acceptance-Commitment",
        cite: "Gardner & Moore, 2004",
        golf: false,
        body: "Un protocolo arraigado en la Acceptance and Commitment Therapy clínica, dirigido específicamente a mejorar el rendimiento deportivo mediante técnicas basadas en la aceptación.",
      },
      {
        name: "Análisis",
        tradition: "Self-regulated learning · Attribution theory",
        cite: "Zimmerman, 2000 · Cleary & Zimmerman, 2001 · Weiner, 1985",
        golf: false,
        body: "Un ciclo de anticipación, ejecución y reflexión, ya aplicado específicamente al deporte al comparar la autorregulación entre expertos y principiantes. Señalar la causa se apoya dentro de ese marco en la teoría de la atribución causal.",
      },
      {
        name: "Transferencia",
        tradition: "Explanatory style",
        cite: "Seligman, Nolen-Hoeksema, Thornton & Thornton, 1990",
        golf: false,
        body: "Que un contratiempo se explique como algo temporal y concreto, o como algo permanente y que lo abarca todo, predice de forma demostrable cómo rinden los deportistas después de un fallo.",
      },
    ],

    factorItems: [
      {
        name: "Presión y estrés",
        tradition: "Catastrophe model",
        cite: "Hardy, 1990 · Lazarus & Folkman, 1984",
        golf: false,
        body: "El rendimiento no baja de forma gradual a medida que aumenta la tensión; con una ansiedad cognitiva alta se desploma de golpe — una «catástrofe» abrupta en lugar de una caída progresiva. Debajo también está la teoría del appraisal: cómo interpreta alguien una situación de mucha presión determina en parte si es capaz de manejarla.",
      },
      {
        name: "Calidad de entrenamiento",
        tradition: "Deliberate practice",
        cite: "Ericsson, Krampe & Tesch-Römer, 1993",
        golf: false,
        body: "No es la cantidad de práctica sino su calidad — dirigida, con feedback inmediato, justo fuera de la propia zona de confort — lo que explica la diferencia entre experto y aficionado. Originalmente investigación más amplia (música, ajedrez), desde entonces aplicada específicamente al deporte.",
      },
      {
        name: "Apetito de riesgo",
        tradition: "Prospect theory",
        cite: "Kahneman & Tversky, 1979 · Pope & Schweitzer, 2011",
        golf: true,
        body: "Las personas pesan más las pérdidas que las ganancias. En concreto en golf, un estudio sobre 2,5 millones de putts medidos con láser en el PGA Tour muestra que incluso los mejores golfistas del mundo puttean con más precisión para par que para birdie — porque un bogey se siente como una pérdida y un birdie como una ganancia.",
      },
      {
        name: "Resiliencia",
        tradition: "Psychological resilience",
        cite: "Fletcher & Sarkar, 2012",
        golf: false,
        body: "Lo que distingue a los deportistas de élite exitosos no es la ausencia de contratiempos, sino cómo despliegan factores protectores para volver después a su nivel de base.",
      },
    ],

    outro:
      "Cada una de estas tradiciones aporta una parte de la base científica que sostiene uno o varios de los ocho dominios o de los cuatro factores. El modelo en sí — ocho dominios dentro de tres fases, más los cuatro factores de influencia — es la traducción aplicada propia de MentalRoutine sobre esa base de investigación, probada con más de 1.000 golfistas, de handicap 0 a 36+.",

    refsTitle: "Fuentes consultadas",
    refsToggle: "Mostrar todas las fuentes",
    refsToggleClose: "Ocultar fuentes",
    refsCount: "21 publicaciones",
  },

  c5: {
    label: "Capítulo 5",
    title: "Límites y uso",
    blocks: [
      {
        q: "¿Es esto un diagnóstico?",
        a: ["No. Este informe te ayuda a entenderte mejor; no es un diagnóstico médico ni psicológico. ¿Sufres una tensión o un estrés serios en torno a tu juego? Habla con un psicólogo del deporte."],
      },
      {
        q: "¿Existe un perfil mental «correcto» o «incorrecto»?",
        a: ["No. Cada perfil es su propia combinación de fortalezas y puntos de crecimiento."],
      },
      {
        q: "¿Con qué frecuencia puedo repetir la evaluación?",
        a: ["Date de 3 a 6 meses para trabajar con los consejos de tu informe — cuenta con al menos 6 a 10 vueltas u 8 a 12 sesiones de entrenamiento. Después vuelve a hacer la evaluación. Allí donde hayas cambiado algo de verdad, lo verás como un desplazamiento en tu perfil — no en un solo punto porcentual, sino en la dirección en la que se mueve todo un dominio."],
      },
    ],
    bandsLabel: "Cómo leer tus puntuaciones",
    bands: [
      { range: "7,0 – 10",  name: "Fortaleza",         body: "Una fortaleza clara. Algo sobre lo que construir." },
      { range: "4,0 – 7,0", name: "Área de trabajo",   body: "Funcional, con margen de mejora." },
      { range: "0 – 4,0",   name: "Punto de atención", body: "Aquí es donde más tienes que ganar." },
    ],
  },

  cta: {
    label: "Manos a la obra",
    h2a: "Ya sabes cómo funciona.",
    h2b: "¿Con ganas de ver qué sale?",
    body: "Empieza gratis con el QuickScan, o haz la evaluación completa y consigue tu perfil de jugador al completo.",
    primary: "Haz el QuickScan gratuito",
    secondary: "Ver la evaluación",
  },
} satisfies MethodologyCopy;

export const methodology: Record<Lang, MethodologyCopy> = { en, nl, de, fr, es };
