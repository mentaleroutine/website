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
  // De echte accounts (bron: SocialScraper, OWN_ACCOUNTS; 23-11-2026). Verandert er een account, dan ook de footer in src/app/page.tsx.
  sameAs: [
    "https://www.instagram.com/mentalroutine.golf/",
    "https://www.tiktok.com/@mentalroutine.golf",
    "https://www.youtube.com/@MentalRoutineforGolfers",
    "https://x.com/_MentalRoutine_",
    "https://www.facebook.com/581594451713285",
    "https://www.linkedin.com/company/129693942",
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
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        {/* Taal vóór de eerste weergave (zelfde volgorde als src/context/lang-context.tsx). Bij Nederlands: lang="nl" en geen
            automatische vertaling. Anders hield Chrome de pagina voor Engels en "vertaalde" de Nederlandse tekst
            ("Swing" werd "schommel"; melding opdrachtgever 23-11-2026). */}
        <script dangerouslySetInnerHTML={{ __html: '(function(){try{var L=["en","nl","de","fr","es"],l=null,q=new URLSearchParams(location.search).get("lang");if(L.indexOf(q)>=0)l=q;if(!l){try{var s=localStorage.getItem("mr_lang");if(L.indexOf(s)>=0)l=s}catch(e){}}if(!l){var n=navigator.languages||[navigator.language];for(var i=0;i<n.length;i++){var b=(n[i]||"").slice(0,2).toLowerCase();if(L.indexOf(b)>=0){l=b;break}}}l=l||"en";var h=document.documentElement;h.lang=l;if(l==="nl"){h.setAttribute("translate","no");var m=document.createElement("meta");m.name="google";m.content="notranslate";document.head.appendChild(m)}}catch(e){}})();' }} />
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
