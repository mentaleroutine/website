import type { Lang } from "./translations";

/**
 * Link into the QuickScan (/quickscan = public/quiz.html).
 * - start=1 skips the QuickScan's own landing and opens hole 1: the homepage is the
 *   landing now, so a second sales page in between would only add friction.
 * - lang carries the visitor's language over (the QuickScan is NL + EN only).
 * - route carries the Entry Narrative id (e.g. "P2", "P4.2") for per-route tracking.
 */
export function quickscanUrl(lang: Lang, route: string | null): string {
  const params = new URLSearchParams({ start: "1", lang: lang === "nl" ? "nl" : "en" });
  if (route) params.set("route", route);
  return `/quickscan?${params.toString()}`;
}
