import type { Metadata } from "next";
import { TEAMS_LIVE } from "@/lib/teams-text";

// Route-level metadata (de pagina zelf is een client component). Tot de werving start (TEAMS_LIVE in
// lib/teams-text.ts) staat de pagina op het adres maar is ze onvindbaar: noindex, niet in de sitemap, nergens gelinkt.
export const metadata: Metadata = {
  title: "Mentaal trainen met je competitieteam | MentalRoutine",
  description:
    "Deze winter traint je competitieteam ook het hoofd: een mentaal profiel voor elke speler, een teamrapport en teamlessen van je eigen pro. €15 per speler, maximaal €99 per team.",
  alternates: { canonical: "/teams", languages: { nl: "/teams?lang=nl", en: "/teams?lang=en" } },
  openGraph: {
    title: "Mentaal trainen met je competitieteam",
    description: "Een mentaal profiel voor elke speler, een teamrapport en teamlessen van je eigen pro.",
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
