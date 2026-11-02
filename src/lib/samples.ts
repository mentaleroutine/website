// ─────────────────────────────────────────────────────────────────────────────
// /samples (Dutch alias /voorbeelden) — sample reports of three made-up golfers.
//
// One golfer is followed through the whole journey: free QuickScan → player
// profile (the assessment) → training report. Three golfers side by side show
// that every report is written for one person. The golfers and their scores are
// fixed across all three reports — portal scripts:
//   · backend/scripts/quickscan_check/quickscan_voorbeelden.py  (QuickScan)
//   · backend/scripts/website_voorbeelden.py                    (player profile)
//   · backend/scripts/trainingsrapport_voorbeeld.py             (training report)
// Change them together or not at all.
//
// Reports only exist in NL and EN; every other UI language shows the EN edition.
// Page images: scripts/samples/pdf_to_webp.py (1075 px wide, A4) → put the page
// count in SAMPLE_FILES. A count of 0 shows "coming soon" instead of the viewer.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lang } from "./translations";

export type GolferId = "alex" | "sam" | "chris";
export type ReportId = "quickscan" | "profile" | "training";
export type ReportLang = "nl" | "en";

export const GOLFERS: ReadonlyArray<GolferId> = ["alex", "sam", "chris"];
export const REPORTS: ReadonlyArray<ReportId> = ["quickscan", "profile", "training"];
export const GOLFER_HCP: Record<GolferId, string> = { alex: "14.2", sam: "24.0", chris: "6.3" };

export function reportLang(lang: Lang): ReportLang {
  return lang === "nl" ? "nl" : "en";
}

export type SampleFiles = {
  dir: string;        // folder with p01.webp, p02.webp, …
  pages: number;      // 0 = not online yet
  pdf: string;        // download
};

function files(golfer: GolferId, report: ReportId, lang: ReportLang, pages: number, pdf?: string): SampleFiles {
  return {
    dir: `/samples/${golfer}/${report}-${lang}`,
    pages,
    pdf: pdf ?? `/samples/${golfer}/${report}-${lang}.pdf`,
  };
}

// The EN training reports predate this page and keep their old home (/reports/training-samples).
function oldTraining(golfer: GolferId): SampleFiles {
  return { dir: `/reports/training-samples/${golfer}`, pages: 10, pdf: `/reports/training-samples/${golfer}.pdf` };
}

export const SAMPLE_FILES: Record<GolferId, Record<ReportId, Record<ReportLang, SampleFiles>>> = {
  alex: {
    quickscan: { nl: files("alex", "quickscan", "nl", 11), en: files("alex", "quickscan", "en", 11) },
    profile:   { nl: files("alex", "profile", "nl", 7),    en: files("alex", "profile", "en", 7) },
    training:  { nl: files("alex", "training", "nl", 10),   en: oldTraining("alex") },
  },
  sam: {
    quickscan: { nl: files("sam", "quickscan", "nl", 11),  en: files("sam", "quickscan", "en", 11) },
    profile:   { nl: files("sam", "profile", "nl", 7),     en: files("sam", "profile", "en", 7) },
    training:  { nl: files("sam", "training", "nl", 10),    en: oldTraining("sam") },
  },
  chris: {
    quickscan: { nl: files("chris", "quickscan", "nl", 11), en: files("chris", "quickscan", "en", 11) },
    profile:   { nl: files("chris", "profile", "nl", 7),    en: files("chris", "profile", "en", 7) },
    training:  { nl: files("chris", "training", "nl", 10),   en: oldTraining("chris") },
  },
};

/* ── Copy ──────────────────────────────────────────────────────────────────── */

const nl = {
  badge: "Voorbeeldrapporten",
  h1a: "Drie golfers.",
  h1b: "Drie heel verschillende rapporten.",
  intro:
    "Alex, Sam en Chris zijn verzonnen golfers, elk met hun eigen scores. De rapporten zijn echt: ongewijzigde uitvoer van het MentalRoutine-systeem. Volg één golfer van de gratis QuickScan tot het trainingsrapport — en vergelijk dan met de andere twee.",
  pickLabel: "1 · Kies een golfer",
  reportLabel: "2 · Kies een rapport",
  hcp: "hcp",
  golfers: {
    alex:  { line: "Kiest de slag — en twijfelt boven de bal toch nog.", focus: "Grootste groeikans: Overtuiging" },
    sam:   { line: "Een slechte slag gaat mee naar de volgende tee.",    focus: "Werkgebied: Acceptatie" },
    chris: { line: "Scherpe focus, maar een misser kost nog te veel.",    focus: "Sterkte: Focus · groeikans: Acceptatie" },
  },
  reports: {
    quickscan: {
      name: "QuickScan",
      tag: "Gratis · ± 8 minuten",
      body: "De eerste momentopname: de shotroutine, de sterkste stap en de grootste groeikans — met acties voor de volgende ronde. De QuickScan kijkt minder diep dan het assessment, dus de scores kunnen iets afwijken van het spelersprofiel.",
    },
    profile: {
      name: "Spelersprofiel",
      tag: "Het volledige assessment",
      body: "Alle 8 stappen en de 4 beïnvloedende factoren, uitgewerkt per onderdeel. Hieronder de visuele samenvatting; het volledige profiel download je als PDF.",
    },
    training: {
      name: "Trainingsrapport",
      tag: "3 inbegrepen bij het assessment",
      body: "Een werkboek over één onderwerp, geschreven op de score en de handicap van de golfer.",
    },
  },
  trainingTopic: {
    alex: "Overtuiging · 3,8 · groeipunt",
    sam: "Acceptatie · 5,6 · werkgebied",
    chris: "Focus · 8,1 · sterkte",
  },
  pages: "{n} pagina's",
  pageAlt: "{golfer} — {report}, pagina {n}",
  download: "Download PDF ↓",
  downloadFull: "Download het volledige profiel (PDF) ↓",
  downloadGuide: "+ de leeswijzer die erbij hoort (PDF) ↓",
  comingSoon: "Dit voorbeeld staat binnenkort online. Bekijk intussen de andere rapporten van deze golfer.",
  compareHint: "Wissel van golfer en zie hoe anders hetzelfde rapport uitpakt.",
  langNote: "",
  disclaimer: "Verzonnen golfers met voorbeeldscores. De rapporten zelf zijn ongewijzigde uitvoer van het MentalRoutine-systeem (2026).",
  cta: {
    label: "Jouw eigen rapport",
    h2a: "Benieuwd hoe het jouwe eruitziet?",
    h2b: "Begin met de gratis QuickScan.",
    primary: "Start de gratis QuickScan",
    secondary: "Of bekijk het volledige assessment →",
  },
};

export type SamplesCopy = typeof nl;

const en: SamplesCopy = {
  badge: "Sample reports",
  h1a: "Three golfers.",
  h1b: "Three very different reports.",
  intro:
    "Alex, Sam and Chris are made-up golfers, each with their own scores. The reports are real: unedited output of the MentalRoutine system. Follow one golfer from the free QuickScan to the training report — then compare with the other two.",
  pickLabel: "1 · Pick a golfer",
  reportLabel: "2 · Pick a report",
  hcp: "hcp",
  golfers: {
    alex:  { line: "Picks the shot — and still doubts it over the ball.",  focus: "Biggest growth opportunity: Conviction" },
    sam:   { line: "A bad shot comes along to the next tee.",              focus: "Working area: Acceptance" },
    chris: { line: "Sharp focus, but a miss still costs too much.",        focus: "Strength: Focus · growth: Acceptance" },
  },
  reports: {
    quickscan: {
      name: "QuickScan",
      tag: "Free · about 8 minutes",
      body: "The first snapshot: the shot routine, the strongest step and the biggest growth opportunity — with actions for the next round. The QuickScan looks less deep than the assessment, so its scores can differ a little from the player profile.",
    },
    profile: {
      name: "Player profile",
      tag: "The full assessment",
      body: "All 8 steps and the 4 influencing factors, worked out part by part. Below is the visual summary; download the full profile as a PDF.",
    },
    training: {
      name: "Training report",
      tag: "3 included with the assessment",
      body: "A workbook on one topic, written for the golfer's own score and handicap.",
    },
  },
  trainingTopic: {
    alex: "Conviction · 3.8 · growth area",
    sam: "Acceptance · 5.6 · working area",
    chris: "Focus · 8.1 · strength",
  },
  pages: "{n} pages",
  pageAlt: "{golfer} — {report}, page {n}",
  download: "Download PDF ↓",
  downloadFull: "Download the full profile (PDF) ↓",
  downloadGuide: "+ the reader's guide that comes with it (PDF) ↓",
  comingSoon: "This sample goes online shortly. Meanwhile, have a look at this golfer's other reports.",
  compareHint: "Switch golfers and see how differently the same report turns out.",
  langNote: "",
  disclaimer: "Made-up golfers with sample scores. The reports themselves are unedited output of the MentalRoutine system (2026).",
  cta: {
    label: "Your own report",
    h2a: "Curious what yours looks like?",
    h2b: "Start with the free QuickScan.",
    primary: "Start the free QuickScan",
    secondary: "Or see the full assessment →",
  },
};

const de: SamplesCopy = {
  badge: "Beispielberichte",
  h1a: "Drei Golfer.",
  h1b: "Drei ganz verschiedene Berichte.",
  intro:
    "Alex, Sam und Chris sind erfundene Golfer, jeder mit eigenen Scores. Die Berichte sind echt: unveränderte Ausgabe des MentalRoutine-Systems. Begleite einen Golfer vom kostenlosen QuickScan bis zum Trainingsreport — und vergleiche dann mit den anderen beiden.",
  pickLabel: "1 · Wähle einen Golfer",
  reportLabel: "2 · Wähle einen Bericht",
  hcp: "Hcp",
  golfers: {
    alex:  { line: "Wählt den Schlag — und zweifelt über dem Ball trotzdem.", focus: "Größte Wachstumschance: Überzeugung" },
    sam:   { line: "Ein schlechter Schlag geht mit zum nächsten Abschlag.",   focus: "Arbeitsfeld: Akzeptanz" },
    chris: { line: "Scharfer Fokus, aber ein Fehlschlag kostet noch zu viel.", focus: "Stärke: Fokus · Wachstum: Akzeptanz" },
  },
  reports: {
    quickscan: {
      name: "QuickScan",
      tag: "Kostenlos · ca. 8 Minuten",
      body: "Die erste Momentaufnahme: die Schlagroutine, der stärkste Schritt und die größte Wachstumschance — mit Aktionen für die nächste Runde. Der QuickScan schaut weniger tief als das Assessment, daher können die Scores etwas vom Spielerprofil abweichen.",
    },
    profile: {
      name: "Spielerprofil",
      tag: "Das vollständige Assessment",
      body: "Alle 8 Schritte und die 4 Einflussfaktoren, Teil für Teil ausgearbeitet. Unten die visuelle Zusammenfassung; das vollständige Profil lädst du als PDF herunter.",
    },
    training: {
      name: "Trainingsreport",
      tag: "3 im Assessment enthalten",
      body: "Ein Arbeitsbuch zu einem Thema, geschrieben für den Score und das Handicap des Golfers.",
    },
  },
  trainingTopic: {
    alex: "Conviction · 3.8 · growth area",
    sam: "Acceptance · 5.6 · working area",
    chris: "Focus · 8.1 · strength",
  },
  pages: "{n} Seiten",
  pageAlt: "{golfer} — {report}, Seite {n}",
  download: "PDF herunterladen ↓",
  downloadFull: "Vollständiges Profil herunterladen (PDF) ↓",
  downloadGuide: "+ der Leseleitfaden dazu (PDF, Englisch) ↓",
  comingSoon: "Dieses Beispiel ist bald online. Sieh dir inzwischen die anderen Berichte dieses Golfers an.",
  compareHint: "Wechsle den Golfer und sieh, wie unterschiedlich derselbe Bericht ausfällt.",
  langNote: "Die Beispielberichte sind auf Englisch. Deinen eigenen Bericht bekommst du auf Englisch oder Niederländisch.",
  disclaimer: "Erfundene Golfer mit Beispielscores. Die Berichte selbst sind unveränderte Ausgabe des MentalRoutine-Systems (2026).",
  cta: {
    label: "Dein eigener Bericht",
    h2a: "Neugierig, wie deiner aussieht?",
    h2b: "Beginne mit dem kostenlosen QuickScan.",
    primary: "Kostenlosen QuickScan starten",
    secondary: "Oder sieh dir das vollständige Assessment an →",
  },
};

const fr: SamplesCopy = {
  badge: "Exemples de rapports",
  h1a: "Trois golfeurs.",
  h1b: "Trois rapports très différents.",
  intro:
    "Alex, Sam et Chris sont des golfeurs fictifs, chacun avec ses propres scores. Les rapports, eux, sont réels : la sortie non retouchée du système MentalRoutine. Suivez un golfeur du QuickScan gratuit jusqu'au rapport d'entraînement — puis comparez avec les deux autres.",
  pickLabel: "1 · Choisissez un golfeur",
  reportLabel: "2 · Choisissez un rapport",
  hcp: "hcp",
  golfers: {
    alex:  { line: "Choisit son coup — et doute encore au-dessus de la balle.", focus: "Plus grande marge de progression : Conviction" },
    sam:   { line: "Un mauvais coup le suit jusqu'au départ suivant.",          focus: "Zone de travail : Acceptation" },
    chris: { line: "Un focus aiguisé, mais un raté coûte encore trop cher.",    focus: "Force : Focus · progression : Acceptation" },
  },
  reports: {
    quickscan: {
      name: "QuickScan",
      tag: "Gratuit · environ 8 minutes",
      body: "Le premier instantané : la routine de coup, l'étape la plus forte et la plus grande marge de progression — avec des actions pour la prochaine partie. Le QuickScan va moins en profondeur que l'assessment ; ses scores peuvent donc différer un peu du profil de joueur.",
    },
    profile: {
      name: "Profil de joueur",
      tag: "L'assessment complet",
      body: "Les 8 étapes et les 4 facteurs d'influence, détaillés élément par élément. Ci-dessous le résumé visuel ; le profil complet se télécharge en PDF.",
    },
    training: {
      name: "Rapport d'entraînement",
      tag: "3 inclus avec l'assessment",
      body: "Un cahier de travail sur un seul thème, écrit pour le score et le handicap du golfeur.",
    },
  },
  trainingTopic: {
    alex: "Conviction · 3.8 · growth area",
    sam: "Acceptance · 5.6 · working area",
    chris: "Focus · 8.1 · strength",
  },
  pages: "{n} pages",
  pageAlt: "{golfer} — {report}, page {n}",
  download: "Télécharger le PDF ↓",
  downloadFull: "Télécharger le profil complet (PDF) ↓",
  downloadGuide: "+ le guide de lecture qui l'accompagne (PDF, en anglais) ↓",
  comingSoon: "Cet exemple sera bientôt en ligne. En attendant, consultez les autres rapports de ce golfeur.",
  compareHint: "Changez de golfeur et voyez à quel point le même rapport diffère.",
  langNote: "Les exemples sont en anglais. Votre propre rapport est disponible en anglais ou en néerlandais.",
  disclaimer: "Golfeurs fictifs avec des scores d'exemple. Les rapports eux-mêmes sont la sortie non retouchée du système MentalRoutine (2026).",
  cta: {
    label: "Votre propre rapport",
    h2a: "Curieux de voir le vôtre ?",
    h2b: "Commencez par le QuickScan gratuit.",
    primary: "Lancer le QuickScan gratuit",
    secondary: "Ou découvrez l'assessment complet →",
  },
};

const es: SamplesCopy = {
  badge: "Informes de muestra",
  h1a: "Tres golfistas.",
  h1b: "Tres informes muy distintos.",
  intro:
    "Alex, Sam y Chris son golfistas inventados, cada uno con sus propias puntuaciones. Los informes son reales: la salida sin editar del sistema MentalRoutine. Sigue a un golfista desde el QuickScan gratuito hasta el training report — y compáralo después con los otros dos.",
  pickLabel: "1 · Elige un golfista",
  reportLabel: "2 · Elige un informe",
  hcp: "hcp",
  golfers: {
    alex:  { line: "Elige el golpe — y aun así duda sobre la bola.",            focus: "Mayor oportunidad de crecimiento: Convicción" },
    sam:   { line: "Un mal golpe le acompaña hasta el siguiente tee.",          focus: "Área de trabajo: Aceptación" },
    chris: { line: "Concentración afilada, pero un fallo aún cuesta demasiado.", focus: "Fortaleza: Enfoque · crecimiento: Aceptación" },
  },
  reports: {
    quickscan: {
      name: "QuickScan",
      tag: "Gratis · unos 8 minutos",
      body: "La primera instantánea: la rutina de golpe, el paso más fuerte y la mayor oportunidad de crecimiento — con acciones para la próxima ronda. El QuickScan mira menos a fondo que el assessment, así que sus puntuaciones pueden diferir un poco del perfil de jugador.",
    },
    profile: {
      name: "Perfil de jugador",
      tag: "El assessment completo",
      body: "Los 8 pasos y los 4 factores de influencia, desarrollados parte por parte. Abajo, el resumen visual; el perfil completo se descarga en PDF.",
    },
    training: {
      name: "Training report",
      tag: "3 incluidos con el assessment",
      body: "Un cuaderno de trabajo sobre un solo tema, escrito para la puntuación y el hándicap del golfista.",
    },
  },
  trainingTopic: {
    alex: "Conviction · 3.8 · growth area",
    sam: "Acceptance · 5.6 · working area",
    chris: "Focus · 8.1 · strength",
  },
  pages: "{n} páginas",
  pageAlt: "{golfer} — {report}, página {n}",
  download: "Descargar PDF ↓",
  downloadFull: "Descargar el perfil completo (PDF) ↓",
  downloadGuide: "+ la guía de lectura que lo acompaña (PDF, en inglés) ↓",
  comingSoon: "Este ejemplo estará en línea pronto. Mientras tanto, mira los otros informes de este golfista.",
  compareHint: "Cambia de golfista y mira lo distinto que resulta el mismo informe.",
  langNote: "Los informes de muestra están en inglés. Tu propio informe lo recibes en inglés o en neerlandés.",
  disclaimer: "Golfistas inventados con puntuaciones de ejemplo. Los informes en sí son la salida sin editar del sistema MentalRoutine (2026).",
  cta: {
    label: "Tu propio informe",
    h2a: "¿Curiosidad por ver el tuyo?",
    h2b: "Empieza con el QuickScan gratuito.",
    primary: "Empezar el QuickScan gratuito",
    secondary: "O mira el assessment completo →",
  },
};

export const samples: Record<Lang, SamplesCopy> = { nl, en, de, fr, es };
