import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { translations } from "@/lib/translations";
import { CookieConsent } from "@/components/cookie-consent";

// DM Sans wordt meegeleverd (src/app/fonts, OFL) in plaats van bij elke build bij Google opgehaald: Google gaf op 15-11-2026
// font-URL's met meerdere query-parameters terug, waar de Turbopack-build op Vercel op stukliep ("next/font/google queries
// have exactly one entry"). Zelfde bestand als Google levert: de variabele latin-subset, gewichten 300 t/m 600 in gebruik.
const dmSans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  weight: "300 600",
  style: "normal",
  display: "swap",
  variable: "--font-dm-sans",
});

// Cormorant Garamond wordt om dezelfde reden meegeleverd als DM Sans: geen afhankelijkheid van Google tijdens de build.
// Twee variabele bestanden (recht en cursief), latin-subset, gewichten 300 t/m 700.
const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-italic.woff2", weight: "300 700", style: "italic" },
  ],
  display: "swap",
  variable: "--font-cormorant",
});

const SITE_TITLE = "MentalRoutine for Golfers — Free QuickScan of your mental game";
const SITE_DESCRIPTION =
  "You hit plenty of good shots. So why does the scorecard still tell a different story? Take the free 8-minute QuickScan and see how you handle the moments before, during and after every shot.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://www.mentalroutine.com",
    siteName: "MentalRoutine",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.mentalroutine.com/og-image.png",
        width: 1792,
        height: 1024,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
    "A digital assessment that maps your mental golf game across the 8 routine steps and the 4 factors that influence them, delivered as a personalised PDF player profile with three training reports of your choice from twelve.",
  brand: { "@type": "Brand", name: "MentalRoutine" },
  offers: [
    {
      "@type": "Offer",
      name: "The MentalRoutine Assessment",
      price: "79.00",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      url: "https://www.mentalroutine.com/assessment",
    },
  ],
};

// Mirrors the homepage FAQ (translations.home.faq, EN): the QuickScan questions.
const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: translations.en.home.faq.items.map(item => ({
    "@type": "Question",
    name: item.title,
    acceptedAnswer: { "@type": "Answer", text: item.content },
  })),
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
        {/* Microsoft Clarity is NOT loaded here: only after consent, by components/cookie-consent.tsx */}
      </head>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
