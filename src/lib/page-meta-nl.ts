/**
 * Nederlandse paginatitel (en de beschrijving, als naslag) voor bezoekers die de site in het Nederlands zien (23-11-2026).
 *
 * De server levert de metadata in het Engels (de crawlbare standaard). Een Nederlandse bezoeker zag daardoor een Engelse
 * tabtitel, en Chrome hield de pagina voor Engels: met "Engels altijd vertalen" vertaalde Chrome de Nederlandse tekst opnieuw
 * ("Swing" werd "schommel"). `LangProvider` zet bij Nederlands deze titel, naast `lang="nl"` en
 * `translate="no"` op <html>.
 *
 * `en` = de titel zoals de layout hem zet; alleen die wordt vervangen, zodat een pagina die zelf een titel zet (het tabblad
 * Teamrapport op /samples) niet wordt overschreven. /teams zet zijn titel zelf per taal en staat hier niet in.
 */
type Meta = { title: string; description: string };

const HOME_EN = "MentalRoutine for Golfers — Free QuickScan of your mental game";
const HOME_NL: Meta = {
  title: "MentalRoutine voor golfers — gratis QuickScan van je mentale spel",
  description: "Je slaat genoeg goede slagen. Waarom vertelt de scorekaart dan toch een ander verhaal? Doe de gratis QuickScan van 8 minuten en zie hoe jij omgaat met de momenten voor, tijdens en na elke slag.",
};

export const PAGE_META_NL: Record<string, { en: string; nl: Meta }> = {
  "/": { en: HOME_EN, nl: HOME_NL },
  "/assessment": { en: HOME_EN, nl: HOME_NL },
  "/methodology": {
    en: "The MentalRoutine Method — How the Assessment Works | MentalRoutine",
    nl: {
      title: "De methode van MentalRoutine — zo werkt het assessment | MentalRoutine",
      description: "Zo werkt het assessment van MentalRoutine: acht stappen in drie fases, vier beïnvloedende factoren, normatieve en ipsatieve vragen, en het onderzoek waarop het model rust.",
    },
  },
  "/pro-program": {
    en: "MentalRoutine Pro Program — For Teaching Professionals | MentalRoutine",
    nl: {
      title: "Het Pro-programma van MentalRoutine — voor golfprofessionals | MentalRoutine",
      description: "Voor PGA-professionals: doe zelf het assessment van MentalRoutine, geef twee kant-en-klare clinics en maak lesprogramma's voor leerlingen en groepen op basis van hun mentale profiel.",
    },
  },
  "/samples": {
    en: "Sample Reports — Three Golfers, Three Different Reports | MentalRoutine",
    nl: {
      title: "Voorbeeldrapporten — drie golfers, drie verschillende rapporten | MentalRoutine",
      description: "Bekijk echte rapporten van MentalRoutine voor drie verzonnen golfers: de gratis QuickScan, het volledige spelersprofiel en een trainingsrapport. Elk rapport is geschreven voor één golfer.",
    },
  },
  "/privacy": {
    en: "Privacy Statement | MentalRoutine",
    nl: {
      title: "Privacyverklaring | MentalRoutine",
      description: "Hoe MentalRoutine (Innerprompt B.V.) met je persoonsgegevens omgaat: welke gegevens we verwerken, waarom, wie ze kan zien, welke bedrijven ze voor ons verwerken en wat je rechten zijn.",
    },
  },
  "/terms": {
    en: "Terms and Conditions | MentalRoutine",
    nl: {
      title: "Algemene voorwaarden | MentalRoutine",
      description: "De algemene voorwaarden van MentalRoutine (Innerprompt B.V.): wat we leveren, prijzen en betaling, de bedenktijd en terugbetaling, het teamaanbod en het Pro-programma.",
    },
  },
};

/** Zet de (zichtbare) titel van de huidige pagina in de gekozen taal (alleen voor de pagina's hierboven). */
export function applyPageMeta(lang: string): void {
  const pad = window.location.pathname.replace(/\/+$/, "") || "/";
  const m = PAGE_META_NL[pad];
  if (!m) return;
  const doel = lang === "nl" ? m.nl.title : m.en;
  // Alleen wijzigen als het nodig is: de aanroeper bewaakt de <head> met een MutationObserver (geen eindeloze lus).
  if ((document.title === m.en || document.title === m.nl.title) && document.title !== doel) document.title = doel;
  // De beschrijving (meta description) blijft zoals de server hem levert: bezoekers zien hem niet, zoekmachines lezen de
  // serverversie, en Next voegt een eigen exemplaar toe als je hem in de browser wijzigt (twee beschrijvingen in de head).
}
