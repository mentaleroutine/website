import type { Metadata } from "next";

// Route-level metadata (the page itself is a client component with client-side language switching;
// the tab title follows the chosen language, see components/legal-page.tsx).
export const metadata: Metadata = {
  title: "Terms and Conditions | MentalRoutine",
  description:
    "The terms and conditions of MentalRoutine (Innerprompt B.V.): what we provide, prices and payment, the cooling-off period and refunds, the team offer and the Pro Program.",
  alternates: { canonical: "/terms", languages: { nl: "/terms?lang=nl", en: "/terms?lang=en" } },
  openGraph: {
    title: "Terms and Conditions | MentalRoutine",
    description: "What MentalRoutine provides, prices and payment, the cooling-off period and refunds, the team offer and the Pro Program.",
    url: "https://www.mentalroutine.com/terms",
    siteName: "MentalRoutine",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
