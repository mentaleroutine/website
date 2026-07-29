import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "The Mental Routine Assessment for Golfers | MentalRoutine",
  description:
    "Map your mental game in 15 minutes. Get a personalised PDF player profile across the 8 routine steps and 4 influencing factors, three training reports of your choice, and a concrete improvement plan. $79.",
  metadataBase: new URL("https://mentalroutine.com"),
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
    url: "https://mentalroutine.com",
    siteName: "MentalRoutine",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://mentalroutine.com/og-image.png",
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
      "Map your mental game in 15 minutes. Personalised PDF player profile + three training reports. $79.",
    images: ["https://mentalroutine.com/og-image.png"],
  },
  robots: { index: true, follow: true },
};

/* ── JSON-LD Structured Data ─────────────────────────────────────────────── */
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MentalRoutine",
  url: "https://mentalroutine.com",
  logo: "https://mentalroutine.com/logoMRpng.png",
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
    "A digital assessment that maps your mental golf game across the 8 routine steps and the 4 factors that influence them, delivered as a personalised PDF player profile with three training reports of your choice from twelve.",
  brand: { "@type": "Brand", name: "MentalRoutine" },
  offers: [
    {
      "@type": "Offer",
      name: "The MentalRoutine Assessment",
      price: "79.00",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      url: "https://mentalroutine.com/assessment",
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
        text: "A structured digital questionnaire grounded in over a decade of research with 1,000+ golfers. It measures your mental game across the 8 routine steps and the 4 factors that influence them — focus, conviction, pressure, resilience and more — delivered as a personalised PDF player profile.",
      },
    },
    {
      "@type": "Question",
      name: "What do I get with the assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your complete player profile as a personalised PDF, plus three training reports of your choice from twelve — one for each of the eight steps and four factors. Your profile recommends which three to start with.",
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
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
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
        {/* Microsoft Clarity — heatmaps + session recordings */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","w8rr4hfxpz");`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
