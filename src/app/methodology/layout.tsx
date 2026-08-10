import type { Metadata } from "next";

// Route-level metadata. The page itself is a client component (language
// switching happens client-side), so the SEO surface lives here.
// Copy is English — the crawlable default, same as the rest of the site.
export const metadata: Metadata = {
  title: "The MentalRoutine Method — How the Assessment Works | MentalRoutine",
  description:
    "How the MentalRoutine assessment works: eight domains across three phases, four influencing factors, normative and ipsative questions, and the research the model rests on.",
  alternates: {
    canonical: "/methodology",
    languages: {
      "en": "/methodology",
      "nl": "/methodology",
      "de": "/methodology",
      "fr": "/methodology",
      "es": "/methodology",
      "x-default": "/methodology",
    },
  },
  openGraph: {
    title: "The MentalRoutine Method — How the Assessment Works",
    description:
      "Eight domains across three phases, four influencing factors, and the research underneath. Read how your scores are built before you buy a report.",
    url: "https://www.mentalroutine.com/methodology",
    siteName: "MentalRoutine",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: "https://www.mentalroutine.com/og-image.png",
        width: 1792,
        height: 1024,
        alt: "The MentalRoutine method — how the assessment works",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The MentalRoutine Method — How the Assessment Works",
    description:
      "Eight domains across three phases, four influencing factors, and the research underneath.",
    images: ["https://www.mentalroutine.com/og-image.png"],
  },
  robots: { index: true, follow: true },
};

/* ── Structured data ──────────────────────────────────────────────────────────
 * Article + a citation list. The reference list is genuinely part of the page,
 * so exposing it as `citation` is accurate rather than decorative markup.
 * ─────────────────────────────────────────────────────────────────────────── */
const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The MentalRoutine Method — How the Assessment Works",
  description:
    "Eight domains across three phases, four influencing factors, normative and ipsative measurement, and the research traditions the model builds on.",
  author: { "@type": "Organization", name: "MentalRoutine" },
  publisher: {
    "@type": "Organization",
    name: "MentalRoutine",
    logo: { "@type": "ImageObject", url: "https://www.mentalroutine.com/logoMRpng.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.mentalroutine.com/methodology" },
  image: "https://www.mentalroutine.com/og-image.png",
  inLanguage: ["en", "nl", "de", "fr", "es"],
  citation: [
    "Vickers, J. N. (1992). Gaze control in putting. Perception, 21(1), 117–132.",
    "Vine, S. J., Moore, L. J., & Wilson, M. R. (2011). Quiet eye training facilitates competitive putting performance in elite golfers. Frontiers in Psychology, 2, article 8.",
    "Masters, R. S. W. (1992). Knowledge, knerves and know-how. British Journal of Psychology, 83(3), 343–358.",
    "Pope, D. G., & Schweitzer, M. E. (2011). Is Tiger Woods loss averse? American Economic Review, 101(1), 129–157.",
    "Fletcher, D., & Sarkar, M. (2012). A grounded theory of psychological resilience in Olympic champions. Psychology of Sport and Exercise, 13(5), 669–678.",
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does the MentalRoutine assessment measure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It measures how you experience your own mental game on the golf course — not an externally measured performance such as swing data. You answer questions across eight domains within three phases: Pre-Shot, Swing and Post-Shot. Every domain gets a score from 0 to 10, summarised into a single Mental Index.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the assessment use both normative and ipsative questions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Normative questions rate one statement on an absolute scale, which is quick but vulnerable to socially desirable responding. Ipsative questions use a forced-choice format: you distribute ten points across several statements, so raising one lowers another. Combining both restores comparability between people while keeping the within-person sharpness.",
      },
    },
    {
      "@type": "Question",
      name: "Is the MentalRoutine assessment a psychological diagnosis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The report helps you understand yourself better; it is not a medical or psychological diagnosis. If you struggle with severe tension or stress around your game, speak to a sport psychologist.",
      },
    },
    {
      "@type": "Question",
      name: "How often can I retake the assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Give yourself 3 to 6 months to work with the advice in your report — at least 6 to 10 rounds or 8 to 12 practice sessions — then take it again. Real change shows up as a shift in the direction a whole domain moves, not a single percentage point.",
      },
    },
  ],
};

export default function MethodologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      {children}
    </>
  );
}
