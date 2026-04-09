import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Mental Routine Assessment for Golfers | MentalRoutine",
  description:
    "Map your mental game in 15 minutes. Get a personalised PDF report with scores on 70+ mental factors, targeted training reports, and a concrete improvement plan. From $59.",
  metadataBase: new URL("https://www.mentalroutine.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "nl": "/",
      "de": "/",
      "fr": "/",
      "es": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "The Mental Routine Assessment for Golfers",
    description:
      "Inconsistent scores? Frustration after a bad hole? The missing piece is almost never technical — it's mental. Map your mental game in 15 minutes and get a concrete plan.",
    url: "https://www.mentalroutine.com",
    siteName: "MentalRoutine",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.mentalroutine.com/og-image.png",
        width: 1792,
        height: 1024,
        alt: "The Mental Routine Assessment for Golfers — Map your mental game in 15 minutes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mental Routine Assessment for Golfers",
    description:
      "Map your mental game in 15 minutes. Personalised PDF report + training reports. From $59.",
    images: ["https://www.mentalroutine.com/og-image.png"],
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD Structured Data ─────────────────────────────────────────────── */
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MentalRoutine",
  url: "https://www.mentalroutine.com",
  logo: "https://www.mentalroutine.com/logoMRpng.png",
  sameAs: [
    "https://instagram.com/mentalroutine",
    "https://tiktok.com/@mentalroutine",
    "https://youtube.com/@mentalroutine",
    "https://x.com/mentalroutine",
    "https://linkedin.com/company/mentalroutine",
  ],
};

const jsonLdProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Mental Routine Assessment",
  description:
    "A digital assessment that maps your mental golf game across 8 routine steps and 6 psychological dimensions, delivered as a personalised PDF report with targeted training reports.",
  brand: { "@type": "Brand", name: "MentalRoutine" },
  offers: [
    {
      "@type": "Offer",
      name: "Standard",
      price: "59.00",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      url: "https://www.mentalroutine.com/#pricing",
    },
    {
      "@type": "Offer",
      name: "Deluxe",
      price: "129.00",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      url: "https://www.mentalroutine.com/#pricing",
    },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does the assessment take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The assessment takes 15–25 minutes. You can complete it on any device. Once submitted, your personalised PDF report is available for download immediately.",
      },
    },
    {
      "@type": "Question",
      name: "What exactly is the Mental Routine Assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A structured digital questionnaire grounded in over a decade of research with 1,000+ golfers. It measures your mental performance across 8 routine factors and 6 psychological dimensions.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Standard and Deluxe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard ($59): 8 Mental Routine steps, 40+ factors, 12-page PDF report, 4–6 training reports. Deluxe ($129): all 8 steps + 5 additional areas, 70+ factors, 20-page PDF report, 9–14 training reports. Both include a 30-day money-back guarantee.",
      },
    },
    {
      "@type": "Question",
      name: "Is this suitable for high-handicap golfers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Golfers with higher handicaps often gain the most — because frustration, inconsistency, and lost enjoyment are almost always mental rather than technical at that stage.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upgrade from Standard to Deluxe later?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can upgrade to Deluxe for $89 — no need to retake the assessment. Your original results carry over.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdProduct),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdFaq),
          }}
        />
        {/* Plausible Analytics — proxied via Vercel rewrite to bypass adblockers */}
        <script async src="/js/script.js" data-api="/api/event" data-domain="mentalroutine.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
