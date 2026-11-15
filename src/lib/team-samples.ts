// ─────────────────────────────────────────────────────────────────────────────
// Team report samples on /samples (15-11-2026): five made-up teams ("flavours"),
// each with the team report and the annex for the pro, NL + EN.
//
// The PDFs are real, unedited portal output (portal script
// backend/scripts/teamrapport/portal_teamrapport_check.py with AI=1). Files:
//   public/samples/team/<flavour>/{report,annex}-{nl,en}.pdf
//   public/samples/team/<flavour>/{report,annex}-{nl,en}/pNN.webp
// made with scripts/samples/pdf_to_webp.py; put the page count in TEAM_FILES
// (0 = "coming soon").
//
// The whole team section hangs on the one switch TEAMS_LIVE (lib/teams-text.ts):
// while it is false the section only shows with ?preview=teams.
// Copy is NL + EN only; every other site language sees the EN edition.
// ─────────────────────────────────────────────────────────────────────────────

import type { ReportLang, SampleFiles } from "./samples";
import { TEAMS_LIVE } from "./teams-text";

export type TeamFlavour = "h18" | "h27" | "h36" | "small" | "even";
export type TeamDoc = "report" | "annex";

export const TEAM_FLAVOURS: ReadonlyArray<TeamFlavour> = ["h18", "h27", "h36", "small", "even"];
export const TEAM_DOCS: ReadonlyArray<TeamDoc> = ["report", "annex"];

function f(flavour: TeamFlavour, doc: TeamDoc, lang: ReportLang, pages: number): SampleFiles {
  return { dir: `/samples/team/${flavour}/${doc}-${lang}`, pages, pdf: `/samples/team/${flavour}/${doc}-${lang}.pdf` };
}

export const TEAM_FILES: Record<TeamFlavour, Record<TeamDoc, Record<ReportLang, SampleFiles>>> = {
  h18:   { report: { nl: f("h18", "report", "nl", 22),   en: f("h18", "report", "en", 23) },   annex: { nl: f("h18", "annex", "nl", 6),   en: f("h18", "annex", "en", 6) } },
  h27:   { report: { nl: f("h27", "report", "nl", 22),   en: f("h27", "report", "en", 22) },   annex: { nl: f("h27", "annex", "nl", 5),   en: f("h27", "annex", "en", 5) } },
  h36:   { report: { nl: f("h36", "report", "nl", 22),   en: f("h36", "report", "en", 23) },   annex: { nl: f("h36", "annex", "nl", 6),   en: f("h36", "annex", "en", 6) } },
  small: { report: { nl: f("small", "report", "nl", 22), en: f("small", "report", "en", 22) }, annex: { nl: f("small", "annex", "nl", 5), en: f("small", "annex", "en", 5) } },
  even:  { report: { nl: f("even", "report", "nl", 20),  en: f("even", "report", "en", 20) },  annex: { nl: f("even", "annex", "nl", 6),  en: f("even", "annex", "en", 6) } },
};

/** Link to the team samples; carries ?preview=teams as long as the switch is off. */
export function teamSampleHref(lang: ReportLang, doc: TeamDoc, source: string, flavour: TeamFlavour = "h18"): string {
  return `/samples?report=team&team=${flavour}&doc=${doc}&lang=${lang}&source=${source}${TEAMS_LIVE ? "" : "&preview=teams"}`;
}

type FlavourCopy = { team: string; name: string; line: string };

export type TeamSamplesCopy = {
  docTitle: string;
  tabGolfers: string; tabTeam: string; tabsLabel: string;
  badge: string; h1a: string; h1b: string; intro: string;
  pickLabel: string; docLabel: string;
  flavours: Record<TeamFlavour, FlavourCopy>;
  docs: Record<TeamDoc, { name: string; tag: string; body: string }>;
  annexNote: string;
  pages: string; pageAlt: string; download: string; comingSoon: string;
  compareHint: string; disclaimer: string;
  cta: { label: string; h2a: string; h2b: string; primary: string };
};

export const teamSamples: Record<ReportLang, TeamSamplesCopy> = {
  nl: {
    docTitle: "Voorbeeld teamrapport: vijf teams, vijf verschillende rapporten | MentalRoutine",
    tabGolfers: "Drie golfers", tabTeam: "Teamrapport", tabsLabel: "Soort voorbeeld",
    badge: "Voorbeeld teamrapport",
    h1a: "Vijf teams.",
    h1b: "Vijf heel verschillende teamrapporten.",
    intro: "De teams zijn verzonnen, de rapporten zijn echte uitvoer van het MentalRoutine-systeem. Blader door het teamrapport en door de bijlage die alleen de pro krijgt.",
    pickLabel: "1 · Kies een team",
    docLabel: "2 · Kies een document",
    flavours: {
      h18:   { team: "Heren 1",   name: "18 holes · acht spelers",  line: "Negen holes singles, daarna negen holes greensome." },
      h27:   { team: "Heren 2",   name: "27 holes · zes spelers",   line: "Negen holes greensome, daarna achttien holes singles." },
      h36:   { team: "Heren 1",   name: "36 holes · acht spelers",  line: "Achttien holes foursome, daarna achttien holes singles." },
      small: { team: "Heren 3",   name: "Klein team · vier spelers", line: "Het kleinste team waarvoor een teamrapport kan (18 holes)." },
      even:  { team: "Gemengd 1", name: "Scores dicht bij elkaar",   line: "Het rapport zegt dat eerlijk; het team kiest zelf het thema (36 holes)." },
    },
    docs: {
      report: { name: "Teamrapport", tag: "Voor het team en de captain", body: "Het teamprofiel, de spelers in woorden, paren om uit te proberen, het thema voor de winter, de teamavond, de wedstrijddag, een kaartje per paar en het deel voor de captain. Geen cijfers per speler." },
      annex:  { name: "Bijlage voor de pro", tag: "Alleen voor de pro", body: "De scores per speler, per speler één ding om op te letten en één vraag voor achteraf, een lessenreeks van vier lessen en oefenvormen." },
    },
    annexNote: "Alleen de pro krijgt deze bijlage; de captain en het team niet.",
    pages: "{n} pagina's",
    pageAlt: "{team}: {doc}, pagina {n}",
    download: "Download PDF ↓",
    comingSoon: "Dit voorbeeld staat binnenkort online. Bekijk intussen een van de andere teams.",
    compareHint: "Wissel van team en zie hoe anders hetzelfde rapport uitpakt.",
    disclaimer: "Verzonnen teams met voorbeeldscores. De rapporten zelf zijn ongewijzigde uitvoer van het MentalRoutine-systeem (november 2026).",
    cta: { label: "Jullie eigen teamrapport", h2a: "Benieuwd wat jullie team", h2b: "over zichzelf zegt?", primary: "Bekijk het teamaanbod" },
  },
  en: {
    docTitle: "Sample Team Reports: Five Teams, Five Different Reports | MentalRoutine",
    tabGolfers: "Three golfers", tabTeam: "Team report", tabsLabel: "Kind of sample",
    badge: "Sample team report",
    h1a: "Five teams.",
    h1b: "Five very different team reports.",
    intro: "The teams are made up, the reports are real output of the MentalRoutine system. Browse the team report and the annex that only the pro receives.",
    pickLabel: "1 · Pick a team",
    docLabel: "2 · Pick a document",
    flavours: {
      h18:   { team: "Men's 1", name: "18 holes · eight players", line: "Nine holes of singles, then nine holes of greensomes." },
      h27:   { team: "Men's 2", name: "27 holes · six players",   line: "Nine holes of greensomes, then eighteen holes of singles." },
      h36:   { team: "Men's 1", name: "36 holes · eight players", line: "Eighteen holes of foursomes, then eighteen holes of singles." },
      small: { team: "Men's 3", name: "Small team · four players", line: "The smallest team a team report can be made for (18 holes)." },
      even:  { team: "Mixed 1", name: "Scores close together",     line: "The report says so honestly; the team picks its own theme (36 holes)." },
    },
    docs: {
      report: { name: "Team report", tag: "For the team and the captain", body: "The team profile, the players in words, pairs to try out, the theme for the winter, the team meeting, match day, a card per pair and the part for the captain. No scores per player." },
      annex:  { name: "Annex for the pro", tag: "For the pro only", body: "The scores per player, one thing to watch and one question for afterwards per player, a series of four lessons and practice formats." },
    },
    annexNote: "Only the pro receives this annex; the captain and the team do not.",
    pages: "{n} pages",
    pageAlt: "{team}: {doc}, page {n}",
    download: "Download PDF ↓",
    comingSoon: "This sample goes online shortly. Meanwhile, have a look at one of the other teams.",
    compareHint: "Switch teams and see how differently the same report turns out.",
    disclaimer: "Made-up teams with sample scores. The reports themselves are unedited output of the MentalRoutine system (November 2026).",
    cta: { label: "Your own team report", h2a: "Curious what your team", h2b: "says about itself?", primary: "See the team offer" },
  },
};
