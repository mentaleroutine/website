import type { Metadata } from "next";
import { TEAMS_LIVE } from "@/lib/teams-text";

// Route-level metadata (de pagina zelf is een client component). Eén schakelaar: TEAMS_LIVE in lib/teams-text.ts.
// Sinds 15-11-2026 aan: vindbaar (index, follow), in de sitemap en gelinkt in het footermenu van de homepage.
// Uit = noindex, niet in de sitemap, nergens gelinkt.
export const metadata: Metadata = {
  title: "Mentaal trainen met je competitieteam | MentalRoutine",
  description:
    "Deze winter traint je competitieteam ook het hoofd: een assessment voor elke speler en één teamrapport, $15 per speler en maximaal $99 per team bij aanmelding t/m 28 februari 2027. De lessen spreek je af met je eigen pro.",
  alternates: { canonical: "/teams", languages: { nl: "/teams?lang=nl", en: "/teams?lang=en" } },
  openGraph: {
    title: "Mentaal trainen met je competitieteam",
    description: "Een assessment voor elke speler en één teamrapport voor het team. De lessen spreek je af met je eigen pro.",
    url: "https://www.mentalroutine.com/teams",
    siteName: "MentalRoutine",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "https://www.mentalroutine.com/og-image.png", width: 1792, height: 1024, alt: "MentalRoutine voor competitieteams" }],
  },
  robots: TEAMS_LIVE ? { index: true, follow: true } : { index: false, follow: false },
};

export default function TeamsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
