import type { Metadata } from "next";

// Route-level metadata; the page itself is a client component (client-side language switching).
export const metadata: Metadata = {
  title: "Sample Reports — Three Golfers, Three Different Reports | MentalRoutine",
  description:
    "See real MentalRoutine reports for three sample golfers: the free QuickScan, the full player profile and a training report. Every report is written for one golfer.",
  alternates: { canonical: "/samples" },
  openGraph: {
    title: "Sample Reports — Three Golfers, Three Different Reports",
    description:
      "The free QuickScan, the player profile and a training report for three sample golfers. Same system, never the same report.",
    url: "https://www.mentalroutine.com/samples",
    siteName: "MentalRoutine",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.mentalroutine.com/og-image.png", width: 1792, height: 1024, alt: "MentalRoutine sample reports" }],
  },
  robots: { index: true, follow: true },
};

export default function SamplesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
