# Project: The Mental Routine for Golfers — Landing Page

## Stack
- **Framework**: Next.js 16.2.0 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Animatie**: Framer Motion (`framer-motion` import in page.tsx/faqs.tsx, `motion/react` import in navbar.tsx/testimonials-columns.tsx)
- **E-mail**: Resend SDK (contactformulier + early access signup)
- **Fonts**: Google Fonts — Cormorant Garamond (headings, serif), Inter (body, sans-serif)
- **Runtime**: Node.js (lokaal in `C:\Program Files\nodejs\`, niet in standaard PATH)

## Projectstructuur

```
src/
  app/
    layout.tsx                  — root layout (metadata, html/body)
    page.tsx                    — hoofdpagina (alle secties + componenten)
    favicon.ico
    globals.css                 — Tailwind imports + globale stijlen
    pro-program/
      page.tsx                  — PGA Pro Program landing page
    api/
      contact/route.ts          — POST → contactformulier e-mail via Resend
      early-access/route.ts     — POST → early access signup via Resend (audience + emails)
      spots/route.ts            — GET → live spots counter via Resend Audience API
  lib/
    translations.ts             — alle tekst + vertalingen, 5 talen (as const)
    utils.ts                    — utility functies (cn helper)
  context/
    lang-context.tsx            — taalwisselaar (LangProvider + useLang hook)
  components/ui/
    navbar.tsx                  — navigatie + LangDropdown (mobile + desktop)
    faqs.tsx                    — FAQ accordion (FaqsSection)
    testimonials-columns.tsx    — testimonial kaarten in auto-scroll kolommen
    spotlight.tsx               — achtergrond spotlight effect (hero)
    button.tsx                  — generieke button component
    evervault-card.tsx          — decoratief card component
    splite.tsx                  — decoratief component

public/
  logoMRpng.png                 — hoofdlogo (gebruikt in navbar + footer)
  logoMRjpg.jpg                 — logo jpg variant
  logoMR.svg                    — logo svg (niet gecommit)
  logo-icon.svg                 — icon-only logo
  reports/
    sample-standard.html        — dummy voorbeeldrapport Standard (12 pagina's)
    sample-deluxe.html          — dummy voorbeeldrapport Deluxe (20 pagina's)
  assessment-standaard.html     — assessment landingspagina (standaard)
  assessment-deluxe.html        — assessment landingspagina (deluxe)
  upgrade-standaard-deluxe.html — upgrade landingspagina
  quiz.html                     — quiz funnel pagina
  *.svg                         — Next.js default icons
```

## Domeinen & Hosting

| Domein | Doel |
|--------|------|
| `www.mentalroutine.com` | Productie (primair) |
| `mentalroutine.com` | 307 redirect → `www.mentalroutine.com` |
| `mentaleroutine.com` | 301 redirect → `www.mentalroutine.com` (oud domein) |
| `shop.mentalroutine.com` | Externe webshop (alle CTA-links wijzen hiernaar) |

- **Domeinregistrar**: TransIP
- **Hosting**: Vercel — auto-deploy op elke push naar `main`
- **Vercel URL**: `website-nu-woad-66.vercel.app`
- **GitHub**: `https://github.com/mentaleroutine/website.git`

## Meertaligheid

5 talen: `en` / `nl` / `de` / `fr` / `es`

- Alle tekst in `src/lib/translations.ts` — bij elke tekstwijziging **alle 5 talen** bijwerken
- TypeScript `as const` → arrays zijn `readonly` → componentprops gebruiken `ReadonlyArray<>`
- Taalwisselaar in navbar via `LangDropdown` component → `useLang()` hook → `lang-context.tsx`
- Default taal: `en` (hardcoded in LangProvider useState)

## Secties (volgorde in page.tsx)

### Componenten bovenin page.tsx (vóór PageContent)

1. **HeroRadar** — SVG radar chart met 8 assen, roteert random scores elke 3s
2. **ContactSection** — werkend contactformulier (POST naar `/api/contact`)
3. **EarlyAccessSection** — signup formulier met plan-voorkeur (POST naar `/api/early-access`)
4. **ReportPreviewModal** — iframe modal die sample reports toont (Standard of Deluxe)

### Secties in PageContent

| # | Sectie | ID | Achtergrond | Beschrijving |
|---|--------|----|-------------|--------------|
| 1 | **Navbar** | — | fixed, blur | Navigatie + taalwisselaar + CTA knop |
| 2 | **Hero** | `#hero` | `#162b1e` (donkergroen) | H1, 2 paragrafen, heroBadge, CTA's, howItWorksLine, mobile mini-report mockup, desktop radar chart |
| 3 | **Research** | `#how-it-works` | `#f6f1e7` | Statistieken (90%, 1000+, 70+), Jack Nicklaus quote |
| 4 | **8-Step Routine** | `#mental-routine` | `#faf8f3` | 8 kaarten in 4-kolom grid, footer note |
| 5 | **Process** | `#steps` | `#f6f1e7` | 3 stappen: Assessment → Rapport → Actie, privacy note |
| 6 | **Dimensions** | — | `#faf8f3` | 6 psychologische dimensies, Arnold Palmer quote |
| 7 | **Why It Works** | — | `green-950` | 4 kolommen met iconen |
| 8 | **Pricing** | `#pricing` | `green-950` | 2 plan-kaarten, report preview, guarantee, testimonial quote, credits note |
| 9 | **Training Reports** | — | `#f6f1e7` | (voorheen Skills Developer) chips, mockup report card, report teller |
| 10 | **Testimonials** | `#testimonials` | `#faf8f3` | 3 auto-scroll kolommen (9 testimonials), pull quotes |
| 11 | **FAQ** | `#faq` | `#faf8f3` | Accordion via FaqsSection component |
| 12 | **Early Access** | `#early-access` | `green-950` | Signup formulier, spots counter, pricing cards |
| 13 | **Contact** | `#contact` | `#f6f1e7` | Contactformulier |
| 14 | **Footer** | — | `#0d1f15` | Logo, menu, social links, teaching pro link |

## Pricing (huidige waarden)

| Plan | Prijs | Was-prijs | Inclusief | Early Access |
|------|-------|-----------|-----------|-------------|
| Standard | $59 | $79 | 12p PDF rapport + 4–6 trainingsrapporten | $49 + 20 bonus credits |
| Deluxe | $129 | $179 | 20p PDF rapport + 9–14 trainingsrapporten | $99 + 20 bonus credits |

**Extra trainingsrapporten**: vanaf $6,99 in de shop

**Let op**: De term "Skills Developer" is in alle user-facing tekst hernoemd naar "Training Reports" / "Trainingsrapporten" etc. De interne property-namen in translations.ts heten nog steeds `skillBuilder.*` — dat is de technische key, de zichtbare labels zijn hernoemd.

## Sample Report Previews

- **Locatie**: `public/reports/sample-standard.html` en `public/reports/sample-deluxe.html`
- **Type**: Volledige HTML pagina's met eigen CSS (geen Tailwind), gestyled om een PDF-rapport te simuleren
- **Bevat**: Cover page, score bars, deep dives per stap, geblurde secties (met lock icon), prioriteiten, aanbevelingen
- **Geladen via**: `ReportPreviewModal` component in page.tsx — iframe in een modal overlay
- **Trigger**: "Preview sample report →" knop onder elke pricing card
- **Status**: Dit zijn dummy/placeholder rapporten. Wanneer echte PDF's beschikbaar zijn, vervang je deze door:
  1. PDF bestanden in `/public/reports/`
  2. Modal aanpassen om PDF te tonen (of linken naar directe download)

## Early Access Systeem

### Frontendflow
1. Bezoeker vult naam, email, handicap (optioneel), en plan-voorkeur (Standard/Deluxe) in
2. POST naar `/api/early-access` met JSON body `{ name, email, handicap, plan }`
3. Success: toont bevestigingsscherm

### Backend (`src/app/api/early-access/route.ts`)
1. Voegt contact toe aan Resend Audience (`8e40ab7a-eab7-470d-943f-03a312e98ebc`)
2. Stuurt notificatie-email naar `support@mentalroutine.com` met naam, email, plan-voorkeur, handicap
3. Stuurt bevestiging-email naar subscriber met early access pricing info

### Live Spots Counter
- **API endpoint**: `GET /api/spots` → `src/app/api/spots/route.ts`
- **Bron**: Telt contacten in Resend Audience (`8e40ab7a-eab7-470d-943f-03a312e98ebc`)
- **Berekening**: `spotsLeft = TOTAL_SPOTS (500) - FAKE_OFFSET (338) - contactCount`
- **Startwaarde**: 162 / 500 (bij 0 echte signups)
- **Revalidatie**: `next: { revalidate: 30 }` — cache 30 seconden
- **Fallback bij fout**: Toont `500 / 500` (geen urgentie)
- **Frontend**: `EarlyAccessSection` fetcht `/api/spots` bij mount + na elke succesvolle signup
- **Weergave**: `{spots} / {total}` met `spotsLeft` label uit translations

### Urgentie-elementen
- **Spots counter**: Live via `/api/spots` (zie hierboven)
- **Deadline**: "Available only until June 1st" — in translations
- **Pre-launch datum**: May 15th, 2026
- **Officiële launch datum**: June 1st, 2026

## Contactformulier

- **API route**: `src/app/api/contact/route.ts`
- **E-mail provider**: Resend (domein `mentalroutine.com` geverifieerd via DKIM + SPF)
- **From**: `MentalRoutine Contact <contact@mentalroutine.com>`
- **To**: `support@mentalroutine.com`
- **Reply-to**: het e-mailadres dat de bezoeker invult
- **Velden**: naam (required), email (required), handicap (optioneel), bericht (required)
- **Env variable**: `RESEND_API_KEY` (in `.env.local` lokaal + Vercel Environment Variables)

## Testimonials

- 9 testimonials per taal (EN, NL, DE, FR, ES = 45 totaal)
- Elk heeft: `text`, `image` (randomuser.me URL), `name`, `role`, `quote` (pull quote)
- `quote` field wordt als vetgedrukte tekst boven de testimonial getoond in `TestimonialsColumn`
- Weergave: 3 kolommen met auto-scroll animatie, masker gradient top/bottom
- Kolom 2 verborgen op mobile, kolom 3 verborgen onder lg

## Translations Structuur (per taal)

```typescript
{
  nav: { howItWorks, pricing, testimonials, faq, contact, cta },
  hero: { badge, h1a, h1b, p1, p2, heroBadge, radarCaption, cta1, cta2, howItWorksLine },
  heroCardLabels: [{ tag, insight }],  // 8 items
  yourProfile: string,
  stepLabel: string,
  research: { label, h2a, h2b, p1, p2, stats: [{ num, label }], quote, quoteAuthor },
  routine: { label, h2a, h2b, intro, footerNote, steps: [{ num, label, body }] },  // 8 steps
  process: { label, h2a, h2b, steps: [{ num, title, body }], privacyNote },  // 3 steps
  whyItWorks: { label, h2a, h2b, items: [{ title, body }] },  // 4 items
  guarantee: { title, body },
  dimensions: { label, h2a, h2b, p1, p2, quote, quoteAuthor, items: [{ label, desc, scenario }] },  // 6 items
  pricing: {
    label, h2a, h2b, note, badge, creditsNote,
    reportPreview: { label, items: [] },
    previewBtn: string,                                    // ← nieuw
    pricingQuote: { text, name, role },                    // ← nieuw
    plans: [{ plan, price, wasPrice, tagline, cta, features: [] }]  // 2 plans
  },
  skillBuilder: {
    label, h2a, h2b, p1, p2, p2items: [],  // 7 content types
    p3, extraCredits, cta, cardNote
  },
  testimonials: { label, h2, items: [{ quote, text, image, name, role }] },  // 9 items
  faq: { label, h2, contactText, contactLink, items: [{ title, content }] },  // 8 items
  contact: {
    label, h2a, h2b, p1, p2,
    fields: { name, namePlaceholder, handicap, handicapPlaceholder, email, emailPlaceholder, message, messagePlaceholder, submit, note },
    success: { h3, p }
  },
  cta: { label, h2a, h2b, p1, p2, btn, trust: [] },  // 4 trust items
  earlyAccess: {
    badge, betaBadge, navCta, heroCta, pricingBanner, pricingCta, ctaBtn,
    sectionLabel, h2a, h2b, p1, p2, offer,
    spotsLeft: string,                                     // ← nieuw
    fields: { name, namePlaceholder, handicap, handicapPlaceholder, email, emailPlaceholder, planLabel, submit },
    socialProof, success: { h3, p }
  },
  footer: { tagline, copyright, teachingPro, socialLabel }
}
```

## Kleurpalet

| Naam | Waarde | Gebruik |
|------|--------|---------|
| Achtergrond warm licht | `#faf8f3` | Primaire lichte secties |
| Achtergrond warm medium | `#f6f1e7` | Afwisselende lichte secties |
| Donkergroen | `green-950` / `#162b1e` | Hero, pricing, why it works, early access |
| Diep donkergroen | `#0d1f15` | Footer |
| Accent goud | `amber-400` / `#fbbf24` | CTA buttons, badges, highlights |
| Goud tekst | `amber-300` | Italic hero tekst, actieve states |
| Goud donker | `amber-700` | Labels op lichte achtergrond |
| Tekst body | `stone-600` | Paragraaftekst op lichte achtergrond |
| Tekst licht | `green-200/70` – `green-200/50` | Paragraaftekst op donkere achtergrond |

## Design Systeem

### Typografie
- **H1**: Cormorant Garamond, `text-5xl md:text-6xl lg:text-7xl`, font-semibold
- **H2**: Cormorant Garamond, `text-4xl lg:text-5xl`, font-semibold
- **H3**: Cormorant Garamond, `text-2xl`, font-semibold
- **Body**: Inter (default), `text-sm` of `text-base`
- **Labels**: `text-xs`, tracking-widest, uppercase, font-semibold

### Card stijl
- `rounded-2xl` border radius
- `border border-green-900/[0.07]` op lichte achtergrond
- `border border-white/10` of `border-white/[0.08]` op donkere achtergrond
- `shadow-lg shadow-green-900/5` op lichte achtergrond
- `hover:-translate-y-1.5 transition-transform duration-300`

### Animaties
- Alle secties gebruiken `motion.div` met `whileInView` trigger
- `viewport={{ once: true }}` — animatie speelt maar 1x
- Staggered delays: `delay: i * 0.07` tot `i * 0.15`
- Radar chart: `setInterval` elke 3s met random scores 1-9

## Deployment

### Builden (lokaal)
```bash
export PATH="/c/Program Files/nodejs:$PATH" && npx next build
```

### Committen + pushen
```bash
git add src/... public/...
git commit -m "beschrijving"
git push origin main
```
Gebruiker zegt "push" → commit + push → Vercel deployt automatisch.

### Git conventies
- Branch: alleen `main` (directe push)
- Commit messages: Engelstalig, beschrijvend
- Co-author: `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`

## Aandachtspunten

### Tailwind v4
- **Geen** `bg-white/8` — gebruik `bg-white/[0.08]` (bracket notation verplicht voor decimale opacity)
- Geldt voor alle opacity waarden < 1 met percentages: `/[0.04]`, `/[0.06]`, `/[0.08]` etc.

### TypeScript
- `as const` in translations maakt arrays readonly → gebruik `ReadonlyArray<>` in props
- Bij nieuw toegevoegde optionele velden (zoals `previewBtn`, `pricingQuote`, `spotsLeft`): gebruik `"key" in T.object` guard + type assertion

### Framer Motion imports
- `page.tsx` en `faqs.tsx`: importeren uit `"framer-motion"`
- `navbar.tsx` en `testimonials-columns.tsx`: importeren uit `"motion/react"`
- **Niet mixen** binnen één bestand

### Bestanden die NOOIT gestaged worden
- `.next/` — build output
- `.claude/` — Claude projectdata
- `.env.local` — bevat `RESEND_API_KEY`
- Alle staan in `.gitignore`

## Lopende / Geplande Zaken

### Echte PDF-rapporten (wacht op bestanden)
- Wanneer echte PDF's beschikbaar zijn:
  1. Plaats ze in `/public/reports/` (bijv. `standard-sample.pdf`, `deluxe-sample.pdf`)
  2. Update `ReportPreviewModal` in page.tsx om PDF te tonen i.p.v. HTML
  3. Optioneel: voeg download-knop toe aan modal header
- Huidige dummy HTML previews kunnen dan verwijderd of als fallback behouden worden

### Spots Counter ✅ (afgerond)
- Live via `/api/spots` — haalt Resend Audience contacten op
- FAKE_OFFSET = 338, TOTAL_SPOTS = 500 → start bij 162/500
- Loopt automatisch af bij elke nieuwe signup

### Shop Integratie
- Alle koop-CTA's linken nu naar `#early-access` (pre-launch)
- Na launch: wijzig naar `https://shop.mentalroutine.com` links
- CTA tekst in `earlyAccess.pricingCta` en `earlyAccess.heroCta` aanpassen

## Recent Uitgevoerde Wijzigingen (8 april 2026)

### Expert Panel Feedback (4 panels, meerdere rondes)

**Panel 1 — Conversie Specialisten:**
- Early access signup met plan-voorkeur (Standard/Deluxe)
- Plan preference meegestuurd in notificatie-email
- Guarantee banner onder pricing
- Social proof bij formulier

**Panel 2 — UX Design:**
- Hero vereenvoudigd van ~9 naar ~6 elementen
- Pricing Beta banner vereenvoudigd
- Early Access offer als twee-kolom pricing cards
- Mobile hero visual toegevoegd (compact score bars)

**Panel 3 — Copywriting:**
- H1 hernoemd: "Find Out What's Really Costing You Strokes" (specifieker, onderscheidender)
- Research tekst ingekort van 3 naar 2 paragrafen
- "Beta" terminologie vervangen door "Early Access"
- Credits → rapporten in communicatie (4–6 / 9–14 i.p.v. credit-aantallen)

**Panel 4 — Golfers:**
- howItWorksLine toegevoegd: "15-min questionnaire → PDF report → improvement plan"
- Pull quotes (`quote` field) aan alle 45 testimonials (9 per taal)
- Expliciete credit pricing in Skills Developer sectie
- Skills Developer hernoemd naar "Training Reports" in alle talen

**Gezamenlijke feedback verwerkt:**
- Sample report previews (Standard 12p + Deluxe 20p) met modal viewer
- "Preview sample report" knop op elke pricing card
- Mini-testimonial quote in pricing sectie
- CTA-tekst geconsolideerd naar max 2 varianten per taal

### Live Spots Counter (8 april 2026)
- Nieuw API endpoint: `src/app/api/spots/route.ts`
- Hardcoded "47 spots" vervangen door live `{spots} / {total}` teller
- Telt echte Resend Audience contacten + FAKE_OFFSET (338)
- Begint bij 162/500, loopt af bij elke signup
- Frontend refresht na succesvolle inschrijving

### Pre-launch Terminologie (8 april 2026)
- "Launching May 15th" → "Pre-Launch May 15th" (alle 5 talen)
- "international launch" → "international pre-launch" (alle 5 talen)
- Toegevoegd: "Official launch and regular pricing from June 1st" (alle 5 talen)
- `earlyAccess.spotsLeft` key toegevoegd aan alle 5 talen
- May 15 = pre-launch, June 1 = officiële launch
