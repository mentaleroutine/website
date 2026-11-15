/**
 * Cookie consent (decision of the client, 15-11-2026): Microsoft Clarity is only loaded after the visitor has
 * chosen "Accept" in the cookie notice (components/cookie-consent.tsx). Plausible runs without cookies and needs
 * no consent.
 *
 * The choice is kept in localStorage (NOT in a cookie): key `mr_cookie_consent`, value
 * `{"choice":"granted"|"denied","date":"<ISO date>"}`. No choice = Clarity is not loaded.
 * public/quiz.html (the standalone QuickScan) reads the same key before it loads Clarity.
 */
export const CONSENT_KEY = "mr_cookie_consent";
export const OPEN_EVENT = "mr:cookie-settings";          // dispatched by the "Cookie settings" links
export const CLARITY_ID = "w8rr4hfxpz";

export type ConsentChoice = "granted" | "denied";

export function readConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as { choice?: unknown };
    return v.choice === "granted" || v.choice === "denied" ? v.choice : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, date: new Date().toISOString() }));
  } catch { /* private mode: the notice simply returns on the next visit */ }
}

type ClarityWindow = Window & { clarity?: ((...args: unknown[]) => void) & { q?: unknown[] } };

/** Adds the Clarity tag once. Only ever called after consent. */
export function loadClarity(): void {
  const w = window as ClarityWindow;
  if (document.getElementById("mr-clarity")) return;
  w.clarity = w.clarity || Object.assign(function (...args: unknown[]) { (w.clarity!.q = w.clarity!.q || []).push(args); }, {});
  const t = document.createElement("script");
  t.id = "mr-clarity";
  t.async = true;
  t.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(t);
}

const CLARITY_COOKIES = ["_clck", "_clsk", "CLID", "ANONCHK", "MR", "MUID", "SM"];

/**
 * Withdrawn consent: tell a running Clarity to stop and drop its cookies, and expire the Clarity cookies we can reach
 * (our own domain). Cookies on clarity.ms / bing.com belong to Microsoft and cannot be removed from here.
 * Clarity is not loaded again on the next page load.
 */
export function removeClarity(): void {
  try { (window as ClarityWindow).clarity?.("consent", false); } catch { /* not loaded */ }
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = new Set<string>(["", host, `.${host}`]);
  if (parts.length >= 2) domains.add(`.${parts.slice(-2).join(".")}`);
  for (const name of CLARITY_COOKIES) {
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}
