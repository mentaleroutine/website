import type { Metadata } from "next";

// Route-level metadata (the page itself is a client component with client-side language switching;
// the tab title follows the chosen language, see components/legal-page.tsx).
export const metadata: Metadata = {
  title: "Privacy Statement | MentalRoutine",
  description:
    "How MentalRoutine (Innerprompt B.V.) handles your personal data: which data we process, why, who can see it, which companies process it for us and what your rights are.",
  alternates: { canonical: "/privacy", languages: { nl: "/privacy?lang=nl", en: "/privacy?lang=en" } },
  openGraph: {
    title: "Privacy Statement | MentalRoutine",
    description: "How MentalRoutine handles your personal data, who can see it and what your rights are.",
    url: "https://www.mentalroutine.com/privacy",
    siteName: "MentalRoutine",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
