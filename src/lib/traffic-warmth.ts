// Herkomst-gevoelige funnel-sturing (Optie B — warmte-asymmetrie).
//
// De homepage vangt gemengd verkeer. "Koud" verkeer (ads/social, geen
// probleembewustzijn) is beter af met de gratis QuickScan als dominante eerste
// stap; "warm" verkeer (merk, retargeting, e-mail, pro-verwijzing, of iemand die
// net de QuickScan deed) is al overtuigd en verdient de $79-koopknop dominant —
// een omweg via de gratis quiz is dan pure frictie op je beste leads.
//
// Default = "cold" (QuickScan dominant). Dat is de veilige server-rendered stand;
// de client kan naar "warm" upgraden zodra de signalen duidelijk warm zijn. Zo
// blijft de eerste paint stabiel en flikkert de hero hooguit richting warm — nooit
// andersom, en nooit voor de grootste groep (koud verkeer ziet meteen het juiste).

export type Warmth = "cold" | "warm";

const WARM_MEDIUMS = ["email", "e-mail", "retargeting", "remarketing", "referral", "affiliate", "pro", "partner"];
const COLD_MEDIUMS = ["cpc", "ppc", "paid", "paidsocial", "paid-social", "social", "display", "banner", "cpm"];

// Referrer-hosts die op koud (ontdekkings-)verkeer wijzen: zoekmachines + sociale feeds.
const COLD_REFERRER_HINTS = [
  "google.", "bing.", "duckduckgo.", "yahoo.", "ecosia.",
  "facebook.", "fb.", "instagram.", "t.co", "twitter.", "x.com",
  "tiktok.", "youtube.", "reddit.", "pinterest.", "linkedin.",
];

/**
 * Bepaalt de warmtegraad van de huidige bezoeker uit URL-parameters en referrer.
 * Alleen client-side aan te roepen (leest window/document). Geeft "cold" terug in
 * elke twijfelgeval, zodat de veilige default (QuickScan dominant) behouden blijft.
 */
export function detectWarmth(): Warmth {
  if (typeof window === "undefined") return "cold";

  const params = new URLSearchParams(window.location.search);
  const medium = (params.get("utm_medium") || "").toLowerCase();
  const source = (params.get("utm_source") || "").toLowerCase();

  // Expliciet koud medium wint altijd: ads/social zijn koud, ook als de referrer intern lijkt.
  if (COLD_MEDIUMS.some((m) => medium.includes(m))) return "cold";

  // Expliciet warm medium of pro-bron.
  if (WARM_MEDIUMS.some((m) => medium.includes(m))) return "warm";
  if (source.includes("pro") || source.includes("newsletter") || source.includes("mail")) return "warm";

  let ref = "";
  try {
    ref = (document.referrer || "").toLowerCase();
  } catch {
    ref = "";
  }

  // Komt de bezoeker van onze eigen QuickScan / site? Dan is hij al warm.
  if (ref.includes("mentalroutine") || ref.includes("quickscan")) return "warm";

  // Zoek/social referrer zonder utm = koud ontdekkingsverkeer.
  if (ref && COLD_REFERRER_HINTS.some((h) => ref.includes(h))) return "cold";

  // Directe/onbekende referrer mét een medium- of source-tag = doorgaans een gerichte
  // campagne of merkbezoek → warm. (utm_campaign alléén is te zwak een signaal en telt
  // hier bewust niet mee.) Kale directe hit zonder enig signaal blijft koud (default).
  if (ref === "" && (medium || source)) return "warm";

  return "cold";
}
