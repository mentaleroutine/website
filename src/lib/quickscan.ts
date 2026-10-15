import type { Lang } from "./translations";

/**
 * Link into the QuickScan (/quickscan = public/quiz.html).
 * - start=1 skips the QuickScan's own landing and opens hole 1: the homepage is the
 *   landing now, so a second sales page in between would only add friction.
 * - lang carries the visitor's language over (the QuickScan is NL + EN only).
 * - route carries the Entry Narrative id(s) for per-route tracking: one route from an ad
 *   ("P4.2") or every narrative ticked on the homepage, comma-separated ("P1,E2,D3").
 */
export function quickscanUrl(lang: Lang, route: string | null): string {
  const params = new URLSearchParams({ start: "1", lang: lang === "nl" ? "nl" : "en" });
  if (route) params.set("route", route);
  // Keep the comma readable in the URL (URLSearchParams would encode it as %2C).
  return `/quickscan?${params.toString().replace(/%2C/g, ",")}`;
}
