import type { Metadata } from "next";

// Route-level metadata (the page itself is a client component). Without this the page inherited the
// homepage's title, description and canonical ("/"), so search engines treated it as a duplicate.
export const metadata: Metadata = {
  title: "MentalRoutine Pro Program — For Teaching Professionals | MentalRoutine",
  description:
    "For PGA professionals: take the MentalRoutine assessment yourself, run two ready-made clinics, and build individual and group lesson programs from your students' mental profiles.",
  alternates: { canonical: "/pro-program" },
  openGraph: {
    title: "MentalRoutine Pro Program — For Teaching Professionals",
    description:
      "Ready-made clinics, a communication kit and a lesson program generator built on your students' mental profiles.",
    url: "https://www.mentalroutine.com/pro-program",
    siteName: "MentalRoutine",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.mentalroutine.com/og-image.png", width: 1792, height: 1024, alt: "MentalRoutine Pro Program" }],
  },
  robots: { index: true, follow: true },
};

export default function ProProgramLayout({ children }: { children: React.ReactNode }) {
  return children;
}
