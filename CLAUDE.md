# Project: The Mental Routine for Golfers — Landing Page

## Stack
- **Framework**: Next.js 16.2.0 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Animatie**: Framer Motion (`framer-motion` import in page.tsx/faqs.tsx, `motion/react` import in navbar.tsx/testimonials-columns.tsx)
- **E-mail**: Resend SDK (contactformulier + early access signup)
- **Analytics**: Plausible (privacy-friendly, cookieloos, GDPR-compliant)
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
      pro-program/route.ts      — POST → pro-program aanmelding via Resend (email naar support)
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
  og-image.png                  — OG/social sharing image (1792×1024, DALL-E radar chart + tekst overlay)
  logoMRpng.png                 — hoofdlogo (gebruikt in navbar + footer)
  logoMRjpg.jpg                 — logo jpg variant
  logoMR.svg                    — logo svg (niet gecommit)
  logo-icon.svg                 — icon-only logo
  reports/
    sample-standard.html        — dummy voorbeeldrapport Standard (12 pagina's)
    sample-deluxe.html          — dummy voorbeeldrapport Deluxe (20 pagina's)
    sample-training-report.html — sample trainingsrapport (5 pagina's, clickable preview)
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
4. **ReportPreviewModal** — iframe modal die sample reports toont (Standard, Deluxe, of Training Report)

### Secties in PageContent

| # | Sectie | ID | Achtergrond | Beschrijving |
|---|--------|----|-------------|--------------|
| 1 | **Navbar** | — | fixed, blur | Navigatie (hernoemd: "The Research") + taalwisselaar + CTA knop ("Early Access") |
| 2 | **Hero** | `#hero` | `#162b1e` (donkergroen) | Productnaam badge, H1, 2 paragrafen, heroBadge, CTA met prijs ($49), urgentie-regel (deadline + spots), howItWorksLine, quiz link, mobile mini-report mockup, desktop radar chart (met aria-label), skip-to-content link |
| 3 | **Research** | `#how-it-works` | `#f6f1e7` | Statistieken (90%, 1000+, 70+), Jack Nicklaus quote |
| 4 | **8-Step Routine** | `#mental-routine` | `#faf8f3` | 8 kaarten in 4-kolom grid, footer note |
| 5 | **Process** | `#steps` | `#f6f1e7` | 3 stappen: Assessment → Rapport → Actie, privacy note, coach sharing link → `/pro-program` |
| 6 | **Dimensions** | `#dimensions` | `#faf8f3` | 6 psychologische dimensies, Arnold Palmer quote |
| 7 | **Why It Works** | `#why-it-works` | `green-950` | 4 kolommen met iconen |
| 8 | **Pricing** | `#pricing` | `green-950` | 2 plan-kaarten, vergelijkingstabel (responsive: tabel desktop / cards mobile), report preview, guarantee, testimonial quote, credits note, quiz CTA card |
| 9 | **Training Reports** | `#training-reports` | `#f6f1e7` | (voorheen Skills Developer) chips, clickable report preview card (opent sample training report in modal), preview button, report teller |
| 10 | **Testimonials** | `#testimonials` | `#faf8f3` | 3 auto-scroll kolommen (9 testimonials), pull quotes |
| 11 | **FAQ** | `#faq` | `#faf8f3` | 9 vragen, accordion via FaqsSection component, mobile: eerste 4 + "show more" knop |
| 12 | **Early Access** | `#early-access` | `green-950` | Signup formulier, spots counter, pricing cards |
| 13 | **Contact** | `#contact` | `#f6f1e7` | Contactformulier |
| 14 | **Footer** | — | `#0d1f15` | Logo, menu (incl. quiz link), social links, teaching pro link → `/pro-program`, quiz link |

## Pricing (huidige waarden)

| Plan | Prijs | Was-prijs | Inclusief | Early Access |
|------|-------|-----------|-----------|-------------|
| Standard | $59 | $79 | 12p PDF rapport + 4–6 trainingsrapporten | $49 + 2 extra training reports |
| Deluxe | $129 | $179 | 20p PDF rapport + 9–14 trainingsrapporten | $99 + 2 extra training reports |

**Extra trainingsrapporten**: vanaf $6,99 in de shop

**Upgrade pad**: Standard → Deluxe voor $89 (gedocumenteerd in FAQ Q9, niet prominent op pricing cards om directe Deluxe-conversie niet te ondermijnen)

**Early access prijzen zijn dynamisch**: `EA_PRICE_STD` (49) en `EA_PRICE_DLX` (99) constanten in page.tsx. Bij launch: verander alleen deze 2 waarden + de constanten in `api/early-access/route.ts` (`EA_STD`, `EA_DLX`). De `heroCta` translation gebruikt `{price}` template die at render time wordt ingevuld.

**Pricing anchor**: "For comparison: a single session with a golf psychologist typically costs $150–$300." — subtiele vergelijking onder pricing note (`pricing.pricingAnchor`, alle 5 talen, € voor NL/DE/FR).

**Let op**: De termen "Skills Developer" en "bonus credits" zijn volledig verwijderd uit alle user-facing tekst (0 matches in zichtbare content). "Skills Developer" hernoemd naar "Training Reports" / "Trainingsrapporten", "bonus credits" vervangen door "extra training reports". De interne property-namen in translations.ts heten nog steeds `skillBuilder.*` — dat is de technische key, de zichtbare labels zijn hernoemd.

## Sample Report Previews

- **Locatie**: `public/reports/sample-standard.html`, `public/reports/sample-deluxe.html`, `public/reports/sample-training-report.html`
- **Type**: Volledige HTML pagina's met eigen CSS (geen Tailwind), gestyled om een PDF-rapport te simuleren
- **Assessment reports** (Standard + Deluxe): Cover page, score bars, deep dives per stap, geblurde secties (met lock icon), prioriteiten, aanbevelingen
- **Training report** (5 pagina's): Cover met score indicator (3.8/10 Conviction Under Pressure), benchmark vergelijking, fysieke + mentale oefening, expert insight + storytelling (Shane Lowry), reflectievragen + mantra, geblurde AI self-coaching prompts + extended benchmark
- **Geladen via**: `ReportPreviewModal` component in page.tsx — iframe in een modal overlay, ondersteunt 3 types: `"standard"` | `"deluxe"` | `"training"`
- **Triggers**:
  - "Preview sample report →" knop onder elke pricing card (standard/deluxe)
  - Clickable mockup card in Training Reports sectie (training)
  - "Preview sample training report →" knop in Training Reports sectie (`skillBuilder.previewBtn`)
- **Status**: Dit zijn dummy/placeholder rapporten. Wanneer echte PDF's beschikbaar zijn, vervang je deze door:
  1. PDF bestanden in `/public/reports/`
  2. Modal aanpassen om PDF te tonen (of linken naar directe download)

## Early Access Systeem

### Frontendflow
1. Bezoeker vult naam, email, handicap (optioneel), en plan-voorkeur (Standard/Deluxe) in
2. POST naar `/api/early-access` met JSON body `{ name, email, handicap, plan, lang, utm }`
3. Success: toont bevestigingsscherm met 4-stappen timeline

### Backend (`src/app/api/early-access/route.ts`)
1. Voegt contact toe aan Resend Audience (`8e40ab7a-eab7-470d-943f-03a312e98ebc`)
2. Stuurt notificatie-email naar `support@mentalroutine.com` met naam, email, plan-voorkeur, handicap, taal, UTM-data
3. Stuurt meertalige bevestiging-email naar subscriber (5 talen, bepaald door frontend `lang` parameter, inclusief timeline)
4. Emails parallel via `Promise.all` voor snelheid
- **Pricing constanten**: `EA_STD = 49`, `EA_DLX = 99`, `REG_STD = 59`, `REG_DLX = 129` — bij launch alleen deze aanpassen

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

## Pro Program Pagina

- **URL**: `https://mentalroutine.com/pro-program`
- **Bestand**: `src/app/pro-program/page.tsx`
- **API route**: `src/app/api/pro-program/route.ts` — POST → email naar support@mentalroutine.com via Resend
- **Doel**: Landing page voor PGA Teaching Professionals om het assessment aan te bieden aan hun leerlingen
- **Taal**: alleen Engels (niet meertalig, niet in translations.ts)
- **Toegang vanuit hoofdpagina**: footer link, pricing proCallout, process coachNote (alle 3 getrackt via `pro_program_click`)
- **Bevat**: aanmeldformulier met velden voor PGA-nummer, divisie, land, faciliteit, actieve leerlingen, etc.
- **Analytics**: `pro_program_submit` (succes + country) en `pro_program_error` (API fout)

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
- **Volgorde**: positie 2 bevat bewust een hoog-handicap golfer (28+) voor beginners-aanspraak
- Positie 2 per taal: EN Catherine Blake (31.4), NL Hanneke Mol (29.8), DE Petra Schmidt (32.5), FR François Bernard (30.2), ES Alejandro Díaz (30.2)

## Translations Structuur (per taal)

```typescript
{
  nav: { howItWorks, pricing, testimonials, faq, contact, cta, openMenu, closeMenu, selectLang, skipToContent },  // ← a11y labels nieuw (9 apr)
  hero: { badge, h1a, h1b, p1, p2, heroBadge, radarCaption, radarAriaLabel, cta1, cta2, howItWorksLine, quizCta },
  heroCardLabels: [{ tag, insight }],  // 8 items
  yourProfile: string,
  stepLabel: string,
  research: { label, h2a, h2b, p1, p2, stats: [{ num, label }], quote, quoteAuthor },
  routine: { label, h2a, h2b, intro, footerNote, steps: [{ num, label, body }] },  // 8 steps
  process: { label, h2a, h2b, steps: [{ num, title, body }], privacyNote, coachNote },  // 3 steps
  whyItWorks: { label, h2a, h2b, items: [{ title, body }] },  // 4 items
  guarantee: { title, body },
  dimensions: { label, h2a, h2b, p1, p2, quote, quoteAuthor, items: [{ label, desc, scenario }] },  // 6 items
  pricing: {
    label, h2a, h2b, note, badge, creditsNote, pricingAnchor,  // ← pricingAnchor nieuw (9 apr)
    reportPreview: { label, items: [] },
    previewBtn: string,
    previewModal: { standard, deluxe, training, closePreview, iframeTitle },  // ← nieuw (9 apr)
    pricingQuote: { text, name, role },
    comparisonTitle: string,                               // ← nieuw (8 apr ronde 2)
    comparisonRows: [{ label, standard, deluxe }],         // ← nieuw (6 rijen)
    plans: [{ plan, price, wasPrice, tagline, cta, features: [] }]  // 2 plans
  },
  skillBuilder: {
    label, h2a, h2b, p1, p2, p2items: [],  // 7 content types
    p3, extraCredits, cta, cardNote, previewBtn,
    reportCountStd, reportCountDlx,                        // ← nieuw (9 apr)
    mockup: { tagline, title, subtitle, priority, physical, mental, exercise, expertInsight, reflection, storytelling, mantra, aiPrompt, benchmarked, exPhysical, exMental, exExpert, exReflection, exStorytelling, exMantra, exAiPrompt, exBenchmarked }  // ← nieuw (9 apr)
  },
  testimonials: { label, h2, items: [{ quote, text, image, name, role }] },  // 9 items
  faq: { label, h2, contactText, contactLink, showMore, items: [{ title, content }] },  // 9 items
  contact: {
    label, h2a, h2b, p1, p2,
    fields: { name, namePlaceholder, handicap, handicapPlaceholder, email, emailPlaceholder, message, messagePlaceholder, submit, note, sending, error },  // ← sending/error nieuw (9 apr)
    success: { h3, p }
  },
  cta: { label, h2a, h2b, p1, p2, btn, quizLine, trust: [] },  // 4 trust items (niet gerenderd in page.tsx)
  earlyAccess: {
    badge, betaBadge, navCta, heroCta, pricingBanner, pricingCta, ctaBtn,
    sectionLabel, h2a, h2b, p1, p2, offer,
    heroUrgency: string,                                   // ← nieuw (ronde 3)
    spotsLeft: string,
    extraReports: string,                                   // ← nieuw (9 apr)
    fields: { name, namePlaceholder, handicap, handicapPlaceholder, email, emailPlaceholder, planLabel, submit, sending, error },  // ← sending/error nieuw (9 apr)
    socialProof, success: { h3, p }
  },
  footer: { tagline, copyright, teachingPro, socialLabel, quizLink, quoteText, quoteAuthor, methodBy, menuLabel }  // ← quote/method/menu nieuw (9 apr)
}
```

## FAQ Overzicht (9 vragen)

| # | Onderwerp (EN titel) | Notities |
|---|---------------------|----------|
| 1 | How long does the assessment take? | 15–25 min, elk apparaat |
| 2 | What exactly is the Mental Routine Assessment? | Methodologie, 8 factoren + 6 dimensies |
| 3 | What are the 8 steps of the Mental Routine? | Alle stappen uitgelegd |
| 4 | What does the PDF report actually show me? | 6 dimensies, scores, aanbevelingen |
| 5 | What are the Training Reports? | Voorheen "Skills Developer", met rapportaantallen |
| 6 | Is this based on real research? | 1000+ golfers, Henk de Jong |
| 7 | Is this also suitable for high-handicap golfers (28+)? | Ja, vaak meeste winst |
| 8 | What is the difference between Standard and Deluxe? | Prijzen, features, rapport lengtes |
| 9 | Can I upgrade from Standard to Deluxe later? | Ja, $89, nudge naar direct Deluxe |

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
- **`Translation` type** geëxporteerd uit `translations.ts` — widened via `Widen<T>` utility type zodat alle string literals naar `string` worden
- `Widen<T>` lost het probleem op dat `translations[lang]` een union is van 5 talen met verschillende literal strings
- Gebruik `const T: Translation = translations[lang]` in componenten — geen `as any` of `"key" in` guards meer nodig
- Getypeerde destructuring: `const t: Translation["faq"] = translations[lang].faq` etc.

### Framer Motion imports
- `page.tsx` en `faqs.tsx`: importeren uit `"framer-motion"`
- `navbar.tsx` en `testimonials-columns.tsx`: importeren uit `"motion/react"`
- **Niet mixen** binnen één bestand

### SEO & Structured Data (`layout.tsx`)
- **Metadata**: title, description, metadataBase (`https://www.mentalroutine.com`), canonical, robots
- **Open Graph**: title, description, url, siteName, locale (`en_US`), type (`website`), **image** (`/og-image.png`, 1792×1024)
- **Twitter Card**: `summary_large_image`, title, description, **image** (`/og-image.png`)
- **hreflang alternates**: `en`, `nl`, `de`, `fr`, `es`, `x-default` — allemaal naar `/` (single-page, client-side i18n)
- **JSON-LD** (3 blokken in `<head>`):
  1. `Organization` — naam, url, logo, sameAs (Instagram, TikTok, YouTube, X, LinkedIn)
  2. `Product` — 2 offers: Standard $59, Deluxe $129 (PreOrder availability)
  3. `FAQPage` — 5 meest relevante FAQ items voor Google rich snippets
- **OG image** ✅: DALL-E gegenereerde radar chart achtergrond + tekst overlay via Sharp composite

### Accessibility
- **Skip-to-content link**: `<a href="#hero" className="sr-only focus:not-sr-only ...">` vóór Navbar
- **Radar chart**: `role="img"` + `aria-label` met beschrijving
- **Spots counter**: `role="status"` + `aria-live="polite"` voor screenreader updates
- **FAQ accordion**: WAI-ARIA accordion pattern — `aria-expanded`, `aria-controls` op trigger button, `role="region"` + `aria-labelledby` op content panel
- **Navbar mobile**: close button heeft `aria-label="Close menu"`
- **Dynamic html lang**: `document.documentElement.lang` wordt gesynchroniseerd via `useEffect` in `LangProvider`

### Analytics (Plausible)
- **Provider**: Plausible Analytics — Starter plan (€9/mo), privacy-friendly, cookieloos, GDPR-compliant
- **Script**: `<script async src="/js/script.js" data-api="/api/event" data-domain="mentalroutine.com" />` in `layout.tsx`
- **Proxy**: Vercel rewrites in `next.config.ts` — `/js/script.js` → Plausible CDN, `/api/event` → Plausible API (omzeilt adblockers)
- **Extensions**: outbound-links (automatisch tracken externe links), file-downloads (automatisch tracken downloads)
- **Initialisatie**: `window.plausible` stub in `layout.tsx` (queues events vóór script geladen is)
- **Helper**: `track()` functie in `page.tsx` — wrapper rond `window.plausible()`
- **Global type**: `Window.plausible` gedeclareerd in page.tsx via `declare global` (1x, referenced in faqs.tsx)
- **Custom events** (24 events, verspreid over 3 pagina's):

| Event | Props | Trigger |
|-------|-------|---------|
| `cta_click` | `source: "hero" \| "sticky" \| "nav"` | Hero CTA + sticky bar + navbar klik (unified) |
| `quiz_click` | `source: "hero" \| "pricing" \| "footer"` | Quiz links (3 locaties) |
| `plan_select` | `plan: "standard" \| "deluxe"` | Plan selector in early access |
| `pricing_cta_click` | `plan: "standard" \| "deluxe"` | Pricing CTA knop klik |
| `report_preview` | `type: "standard" \| "deluxe" \| "training"` | Sample report preview geopend |
| `signup` | `plan, lang, seconds` | Succesvolle early access signup (incl. time-to-signup) |
| `signup_error` | `type: "api"` | Gefaalde signup |
| `lang_switch` | `lang: "en" \| "nl" \| ...` | Taalwisselaar in navbar |
| `form_start` | `plan: "standard" \| "deluxe"` | Eerste focus op early access formulier (met pre-selected plan) |
| `faq_open` | `question: "1"–"9"` | FAQ vraag geopend |
| `contact_submit` | `lang` | Contactformulier verstuurd |
| `contact_error` | `type: "api"` | Gefaald contactformulier |
| `scroll_depth` | `depth: "25" \| "50" \| "75" \| "100"` | Scroll milestones (eenmalig per sessie) |
| `section_view` | `section` | Sectie komt in beeld (11 secties, threshold 0.3) |
| `sticky_bar_impression` | — | Sticky bar verschijnt (eenmalig) |
| `pro_program_click` | `source: "process" \| "pricing" \| "footer"` | Pro-program link klik |
| `report_preview_close` | `type, seconds` | Report preview modal gesloten (dwell time) |
| `quiz_start` | — | Quiz gestart (quiz.html) |
| `quiz_hole` | `hole, seconds` | Per-hole tracking: hole nummer (1-9) + invultijd per hole |
| `quiz_complete` | `seconds, score` | Quiz afgerond (totale invultijd + totaalscore) |
| `quiz_optin` | `score` | Quiz opt-in formulier verstuurd |
| `quiz_optin_error` | — | Quiz opt-in gefaald |
| `pro_program_submit` | `country` | Pro-program aanmelding verstuurd |
| `pro_program_error` | `type: "api"` | Pro-program aanmelding gefaald |
| `checkout_click` | `plan, source, cta, seconds` | Checkout CTA klik met positie (header/hero/pricing/mobile-sticky/final-cta) + time-on-page |
| `upsell_click` | `from, to, source` | Cross-sell link klik (standaard→deluxe) |
| `bridge_cta_click` | `page` | "Klinkt dit bekend?" tussenlink klik (assessment pagina's) |
| `guarantee_view` | `page` | Garantie-blok in viewport (50% threshold) |
| `social_proof_view` | `page` | Social proof bar in viewport (50% threshold) |
| + outbound-links | automatisch | Alle externe links (social media, shop, etc.) |
| + file-downloads | automatisch | Bestandsdownloads |

- **Section view tracking**: IntersectionObserver op 11 secties (hoofdpagina): `how-it-works`, `mental-routine`, `steps`, `dimensions`, `why-it-works`, `pricing`, `training-reports`, `testimonials`, `faq`, `early-access`, `contact`
- **Assessment/upgrade page tracking**: `scroll_depth`, `section_view`, `faq_open`, `checkout_click` (met CTA-positie + time-on-page), `upsell_click`, `bridge_cta_click`, `guarantee_view`, `social_proof_view`
- **Time-to-signup**: meet vanaf `performance.timeOrigin` (echte pageload) tot signup submit
- **UTM tracking**: `captureUtmParams()` vangt 5 UTM params op, persists via `sessionStorage`
- **Quiz tracking**: Plausible script + proxy in `quiz.html` (standalone HTML, zelfde proxy als hoofdpagina)
- **Pro-program tracking**: events in `pro-program/page.tsx`, API route `api/pro-program/route.ts`

### Bestanden die NOOIT gestaged worden
- `.next/` — build output
- `.claude/` — Claude projectdata
- `.env.local` — bevat `RESEND_API_KEY` + `OPENAI_API_KEY`
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

### Gratis Quiz (launch 20 april 2026)
- URL: `https://mentalroutine.com/quiz.html`
- Bestand: `public/quiz.html` (standalone HTML, eigen CSS, geen Tailwind/Next.js)
- Taal: alleen Nederlands (niet meertalig)
- **Links op hoofdpagina** (alvast actief, alsof quiz beschikbaar is):
  - Hero: "Of probeer eerst de gratis quiz →" (`hero.quizCta`, 5 talen)
  - Footer navigatie: "Free Quiz" / "Gratis Quiz" link (`footer.quizLink`, 5 talen)
  - Footer rechterkolom: quiz-link met vraagteken-icoon
- **Coming soon banner**: bovenaan quiz.html, meldt dat quiz pas op 20 april beschikbaar is + link terug naar assessment
- **Quiz geblokkeerd**: `QUIZ_LOCKED = true` flag in JS — alle "Start de quiz" knoppen scrollen naar coming soon banner met pulse-animatie i.p.v. quiz te starten
- **Op 20 april**: (1) zet `QUIZ_LOCKED = false`, (2) verwijder `<div id="coming-soon-banner">` blok

### OG Image ✅ (afgerond)
- Gegenereerd via DALL-E 3 API (gouden radar chart op donkergroen) + Sharp SVG tekst overlay
- Bestand: `public/og-image.png` (1792×1024)
- Meta tags: `og:image` + `twitter:image` in layout.tsx
- Design: premium, minimalistisch, past bij site branding (donkergroen + goud)

### Retargeting Pixels (wacht op account IDs)
- Meta Pixel + Google Ads tag toevoegen aan `layout.tsx` `<head>`
- Wanneer: zodra gebruiker pixel/tag IDs aanlevert
- Patroon: zelfde als Plausible (async script + inline init)

### Pricing Anker ✅ (afgerond)
- Geïmplementeerd als subtiele italic tekst onder pricing note
- "For comparison: a single session with a golf psychologist typically costs $150–$300." (5 talen, € voor NL/DE/FR)
- Key: `pricing.pricingAnchor` in translations

### Upgrade Pad Standard → Deluxe
- Prijs: $89 (verschil $129 - $59 + $19 marge)
- Gedocumenteerd in FAQ Q9, niet op pricing cards
- Bij implementatie in shop: upgrade-flow bouwen die bestaande assessment-resultaten hergebruikt

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

### Expert Panel Ronde 2 (8 april 2026)

**Terminologie-opschoning (alle 5 talen):**
- Alle resterende "Skills Developer" referenties verwijderd uit zichtbare tekst (0 matches)
- `pricing.note`: "Skills Developer credits" → "personal training reports"
- `process` stap 3: herschreven van credits naar rapporten met aantallen (4–6 / 9–14)
- `whyItWorks` item 3: "Skills Developer programs" → "training reports"
- 10 testimonials (items 3 en 6 per taal): "Skills Developer" → "training reports"

**FAQ updates (alle 5 talen):**
- Q5 titel: "What is the Skills Developer?" → "What are the Training Reports?"
- Q5 content: volledig herschreven zonder credits, met rapportaantallen
- Q8 content: "60/140 Skills Developer credits" → "4-6/9-14 personal training reports"
- Q9 (nieuw): "Can I upgrade from Standard to Deluxe later?" — ja voor $89, met subtiele nudge naar directe Deluxe ("$40 less than upgrading separately")

**Early Access copy herschreven (alle 5 talen):**
- h2a/h2b: van "We're almost ready. / Lock in your early-bird price." naar "Your mental game report / at the lowest price — ever."
- p1: van beta-proces beschrijving naar wat de koper krijgt (15 min → rapport → training reports)
- p2: urgentie-gericht ("spots are limited and this price won't return after June 1st")

**Jargon-reductie (alle 5 talen):**
- `dimensions.p1`: "6 psychological dimensions" → natuurlijke taal ("Your body, your mind, your routine, your decisions, your response to pressure, and how you practise")
- `dimensions.p2`: academische toon → directe golftaal
- `process` stap 1: "6 psychological dimensions: physical readiness, mental condition..." → "6 key areas: your body, your mind, your routine..."

**Beginners beter aangesproken:**
- Testimonial reorder: hoog-handicap golfer verplaatst naar positie 2 (zichtbaar in mobile kolom 1)
  - EN: Catherine Blake (hcp 31.4), NL: Hanneke Mol (hcp 29.8), DE: Petra Schmidt (hcp 32.5), FR: François Bernard (hcp 30.2), ES: Alejandro Díaz (hcp 30.2)
- heroBadge uitgebreid: "1,000+ golfers studied · handicap 0 to 36+ · 100+ in the current Beta"

**Vergelijkingstabel (nieuw, alle 5 talen):**
- Altijd zichtbare tabel onder pricing cards (geen toggle)
- 6 rijen: Mental Routine, Additional areas, Mental factors, PDF report, Training reports, Money-back guarantee
- Gestyled in green-950 thema (witte/amber tekst, subtiele borders)
- `comparisonTitle` + `comparisonRows` toegevoegd aan `pricing` object in translations

**Mobile hero i18n fix:**
- Hardcoded Engelse labels ("Focus", "Concentration", etc.) → `T.routine.steps[n].label`
- "Your Mental Performance Report" → `T.yourProfile`

**Bewust uitgesteld:**
- Pricing anker (extern vergelijkingspunt) → pas na launch evalueren
- Video/animatie → binnenkort, niet nu
- Sticky navigation bar → gebruiker wil dit niet

### Expert Panel Review — 5 Fixes (8 april 2026)

**1. "20 bonus credits" → "2 extra training reports" (alle 5 talen + API):**
- `earlyAccess.pricingBanner`: "20 bonus credits" → "2 extra training reports" (EN, NL, DE, FR, ES)
- `earlyAccess.offer`: zelfde wijziging in alle 5 talen
- Early Access pricing cards in page.tsx: hardcoded "20 bonus credits" → dynamisch uit translations
- Bevestiging-email in `api/early-access/route.ts`: "20 bonus credits" → "2 extra training reports"
- Alle varianten verwijderd: "bonus credits", "crédits bonus", "Bonus-Credits", "créditos bonus"

**2+4. Sample Training Report preview (nieuw bestand + clickable mockup):**
- Nieuw bestand: `public/reports/sample-training-report.html` (5 pagina's, premium styling)
- `ReportPreviewModal` uitgebreid: `plan` prop accepteert nu `"standard" | "deluxe" | "training"`
- State type in page.tsx: `useState<"standard" | "deluxe" | "training" | null>(null)`
- Training Reports mockup card: van statische tekst naar clickable card met `onClick={() => setPreviewPlan("training")}`
- Hardcoded labels vervangen: "Skills Developer · Extended Report" → "Training Report · 5 pages", "15 credits" → "Personalised for your profile"
- Preview button toegevoegd: `skillBuilder.previewBtn` (alle 5 talen)

**3. Quiz prominenter (CTA card na pricing):**
- Nieuwe quiz CTA card toegevoegd onderaan pricing sectie (na pricingQuote, vóór Training Reports)
- Gestyled met vraagteken-icoon, amber accenten, groene achtergrond
- Gebruikt `cta.quizLine` tekst uit translations (alle 5 talen)
- Link naar `/quiz.html`

**5. Vergelijkingstabel responsive:**
- Desktop: bestaande `<table>` layout behouden (`hidden sm:block`)
- Mobile: nieuwe card-based layout toegevoegd (`sm:hidden`)
- Elke rij wordt een kaart met label + Standard/Deluxe waarden naast elkaar
- Amber accenten voor Deluxe waarden, consistent met desktop styling

### Quiz integratie + Teaching Pro link fix (8 april 2026)
- Quiz-links toegevoegd op hoofdpagina: hero (`quizCta`), footer nav (`quizLink`), footer col 3
- Alle links wijzen naar `/quiz.html` (5 talen)
- `quiz.html`: coming soon banner + `QUIZ_LOCKED = true` blokkeren quiz tot 20 april
- Footer "Teaching Professional?" link gefixt: `#contact` → `/pro-program`

### Expert Panel Review — Ronde 3: Zelf-audit + fixes (8 april 2026)

**Navigatie hernoemen (alle 5 talen):**
- `nav.howItWorks`: "How It Works" → "The Research" (EN), "Het Onderzoek" (NL), "Die Forschung" (DE), "La Recherche" (FR), "La Investigación" (ES)
- Reden: sectie heet "Research" en toont statistieken/quotes, niet een how-it-works flow

**Guarantee tekst versterkt (alle 5 talen):**
- `guarantee.title`: "30-Day Money-Back Guarantee" → "Your Guarantee"
- `guarantee.body`: zakelijke toon → emotioneel ("If you don't find at least one insight that makes you think differently about your game, we'll refund every cent.")

**CTA-tekst gedifferentieerd (alle 5 talen):**
- 4 varianten per context i.p.v. overal dezelfde tekst:
  - `earlyAccess.heroCta`: "See My Mental Profile — from $49" (hero knop, met prijs)
  - `earlyAccess.navCta`: "Early Access" (navbar, kort)
  - `earlyAccess.pricingCta`: "Lock In Early Access →" (pricing sectie)
  - `earlyAccess.ctaBtn`: "Start in 15 Minutes →" (training reports, footer)

**Accessibility (page.tsx):**
- Skip-to-content link toegevoegd vóór Navbar (`sr-only focus:not-sr-only`)
- Radar SVG: `role="img"` + `aria-label` toegevoegd
- Spots counter: `role="status"` + `aria-live="polite"` toegevoegd

**Hero urgentie-regel (alle 5 talen + page.tsx):**
- Nieuwe `earlyAccess.heroUrgency` key: "Early access pricing ends June 1st · limited spots available"
- Getoond als subtiele amber tekst onder howItWorksLine in hero
- Prijs ($49) bewust alleen in CTA-knop (niet in urgentieregel, voorkomt duplicatie)

**Hero badge → productnaam (alle 5 talen):**
- `hero.badge`: "Launching soon" → "The Mental Routine Assessment" (EN), "De Mental Routine Assessment" (NL), etc.
- Maakt productnaam direct zichtbaar boven de fold

**Coach sharing note (alle 5 talen + page.tsx):**
- Nieuwe `process.coachNote` key: "Working with a coach? Share your report — it gives them an objective starting point."
- Getoond als link naar `/pro-program` onder privacy note in Process sectie

**SEO & Structured Data (layout.tsx — volledig herschreven):**
- Van 19 regels naar 149 regels
- Extended Metadata: title, description, metadataBase, canonical, OG, Twitter Card, robots
- 3 JSON-LD blokken: Organization (met sameAs social links), Product (2 offers), FAQPage (5 Q&As)

**Type safety verbeterd (translations.ts + page.tsx + faqs.tsx):**
- `Widen<T>` utility type toegevoegd — widened recursief alle literal strings naar `string`
- `Translation` type geëxporteerd: `export type Translation = Widen<(typeof translations)["en"]>`
- Alle `as any` assertions verwijderd (was 15+, nu 0)
- Alle `"key" in T.xxx` guards verwijderd — directe property access
- Componenten getypeerd: `const T: Translation`, `const t: Translation["faq"]`

**FAQ mobile show-more (faqs.tsx, alle 5 talen):**
- Desktop: alle 9 vragen zichtbaar (`hidden sm:block`)
- Mobile: eerste 4 + "+5 more questions" knop (`sm:hidden`)
- Nieuwe `faq.showMore` key per taal: "more questions" (EN), "meer vragen" (NL), etc.
- `MOBILE_INITIAL_COUNT = 4` constante
- `renderItem` functie geëxtraheerd om duplicatie tussen desktop/mobile te voorkomen

**Bug fixes (zelf-audit):**
- FAQ "show more" knop had hardcoded Engelse tekst → vertaald via `faq.showMore`
- Hero toonde "$49" dubbel (in CTA + urgentieregel) → prijs verwijderd uit urgentieregel
- `heroCta` prijs: "$49" toegevoegd als "from $49" — onderscheidt betaalde assessment van gratis quiz

### i18n Completering + Accessibility Fixes (9 april 2026)

**Hardcoded strings vertaald (alle 5 talen):**
- `contact.fields.sending` + `contact.fields.error`: "Sending..." / "Something went wrong..." → vertaald
- `earlyAccess.fields.sending` + `earlyAccess.fields.error`: zelfde patroon
- `earlyAccess.extraReports`: "2 extra training reports" → vertaald per taal
- `footer.quoteText` + `footer.quoteAuthor` + `footer.methodBy`: footer quote en method credit → vertaald
- `skillBuilder.reportCountStd` + `reportCountDlx`: "4–6 reports" / "9–14 reports" → vertaald
- `skillBuilder.mockup`: 20 keys voor training report mockup card → vertaald (was hardcoded Engels)
- `pricing.previewModal`: modal titels per plan type → vertaald (standard/deluxe/training)
- Comparison table headers: hardcoded "Standard"/"Deluxe" → `T.pricing.plans[n].plan`
- Mobile hero badge: hardcoded "Mental Routine Assessment" → `T.hero.badge`

**ReportPreviewModal vertaald (page.tsx):**
- Component gebruikt nu `useLang()` + `translations[lang]` voor modal titel
- Hardcoded ternary (`plan === "training" ? "Training Report — Sample" : ...`) → `T.pricing.previewModal[plan]`

**Dynamic html lang (lang-context.tsx):**
- `useEffect` toegevoegd in `LangProvider` die `document.documentElement.lang = lang` synchroniseert
- Zorgt dat screenreaders en SEO tools de juiste taal detecteren bij wisselen

**Tailwind v4 fix (navbar.tsx):**
- `bg-white/8` → `bg-white/[0.08]` (bracket notation verplicht in Tailwind v4)

**FAQ accessibility (faqs.tsx):**
- WAI-ARIA accordion pattern geïmplementeerd:
  - Trigger button: `id`, `aria-expanded`, `aria-controls`
  - Content panel: `id`, `role="region"`, `aria-labelledby`

**Navbar accessibility (navbar.tsx):**
- Mobile close button: `aria-label="Close menu"` toegevoegd

### Final Polish (9 april 2026)

**Laatste hardcoded strings vertaald (alle 5 talen):**
- `footer.menuLabel`: "Menu" → vertaald (EN/NL/FR: "Menu", DE/ES: "Menü"/"Menú")
- `pricing.previewModal.closePreview`: modal close button aria-label → vertaald
- `pricing.previewModal.iframeTitle`: iframe title → vertaald

**Accessibility aria-labels vertaald (alle 5 talen):**
- `nav.openMenu`, `nav.closeMenu`, `nav.selectLang`: navbar aria-labels → vertaald
- `hero.radarAriaLabel`: radar chart aria-label → vertaald, doorgegeven als prop aan HeroRadar
- ReportPreviewModal close button: `aria-label` toegevoegd via `T.pricing.previewModal.closePreview`

**Performance (early-access API):**
- Notificatie + bevestiging emails nu parallel via `Promise.all` (scheelt ~200-400ms per signup)

### Technische Reviews + Conversie-optimalisatie (9 april 2026)

**Dynamic pricing (page.tsx + api/early-access/route.ts):**
- Early access prijzen via constanten: `EA_PRICE_STD = 49`, `EA_PRICE_DLX = 99` in page.tsx
- API route: `EA_STD = 49`, `EA_DLX = 99`, `REG_STD = 59`, `REG_DLX = 129`
- `earlyAccess.heroCta` gebruikt `{price}` template → `.replace("{price}", ...)` at render time
- Was-prijzen in EA cards halen reguliere prijs uit `T.pricing.plans[n].price`

**Pricing anchor geïmplementeerd (alle 5 talen):**
- Nieuwe key `pricing.pricingAnchor`: extern vergelijkingspunt (golfpsycholoog $150-$300 / €150-€300)
- Subtiele italic tekst onder pricing note in pricing sectie

**Dynamic social proof (alle 5 talen):**
- `earlyAccess.socialProof` gebruikt `{count}` template → vervangen door `total - spots` (= aantal signups)
- Consistent met spots counter — toont hoeveel golfers al aangemeld zijn

**Meertalige bevestiging-emails (api/early-access/route.ts):**
- `confirmationEmail(name, lang)` functie met volledige email-tekst in 5 talen
- Frontend stuurt `lang` mee in POST body → API stuurt email in juiste taal
- Notificatie-email toont ook de taal van de subscriber

**Plausible Analytics integratie (layout.tsx + page.tsx + navbar.tsx):**
- Privacy-friendly, cookieloos, GDPR-compliant analytics
- Script + stub in layout.tsx, `track()` helper + `declare global` in page.tsx
- 7 custom events: hero_cta_click, quiz_click, plan_select, pricing_cta_click, report_preview, signup, lang_switch
- Navbar: `lang_switch` event bij taalwisseling

### Conversie + Tracking + Positionering (9 april 2026)

**UTM parameter tracking (page.tsx + api/early-access/route.ts):**
- `captureUtmParams()` functie vangt `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` op
- Persistentie via `sessionStorage` — overleeft in-page navigatie (hash links)
- Meegestuurd in early access POST body → notificatie-email toont traffic source
- Voorbereiding voor paid ads / retargeting campagnes

**Sticky scroll CTA bar (page.tsx, alle 5 talen):**
- Verschijnt na 25% scroll, verdwijnt bij early-access sectie + onderaan pagina
- Amber achtergrond, tekst uit `earlyAccess.stickyBar` ("Early access from $49 — ends June 1st")
- Eigen tracking event: `sticky_bar_click`
- Link naar `#early-access`

**Pricing plan passthrough (page.tsx):**
- Pricing CTA knoppen dispatchen `CustomEvent("select-plan")` met plan type
- `EarlyAccessSection` luistert en pre-selecteert plan in formulier
- Elke pricing card heeft nu eigen CTA-tekst uit `T.pricing.plans[i].cta`

**Post-signup timeline (page.tsx + translations.ts):**
- Na succesvolle early access signup: visuele 4-stappen timeline
- `earlyAccess.success.timeline` array in alle 5 talen
- Dots + verbindingslijnen, consistent met bevestiging-email

**Positionering: aanvullend t.o.v. professionals (translations.ts):**
- `whyItWorks` item "On your terms": herschreven naar "doe het meeste zelf, neem rapport mee naar professional bij blokkades"
- `process.coachNote`: noemt nu coaches, teaching pro's én sportpsychologen + "saves valuable session time"
- `pricing.proCallout`: nieuwe link naar `/pro-program` onder quiz CTA in pricing sectie
- Consistent boodschap: assessment is aanvullend, niet vervangend

**hreflang SEO tags (layout.tsx):**
- `metadata.alternates.languages`: en, nl, de, fr, es, x-default → allemaal naar `/`
- Helpt zoekmachines de meertalige content correct te indexeren

**OG image (layout.tsx + public/og-image.png):**
- DALL-E 3 API → radar chart achtergrond op donkergroen (#162b1e)
- Sharp composite → SVG tekst overlay (titel, subtitel, URL, gouden divider)
- `og:image` + `twitter:image` meta tags toegevoegd aan layout.tsx

### Analytics Uitbreiding (9 april 2026)

**Ronde 1 — Funnel tracking (page.tsx + faqs.tsx):**
- `form_start`: eerste focus op early access formulier (via `onFocus` + ref)
- `signup_error`: API failures getrackt (was stil)
- `faq_open`: welke FAQ vraag geopend (question nummer als prop)
- `contact_submit`: contactformulier success tracking met taal
- `scroll_depth`: 25/50/75/100% milestones (eenmalig per sessie, via bestaande scroll handler)
- `section_view`: IntersectionObserver (threshold 0.3) op 8 secties
- `sticky_bar_impression`: eenmalig bij eerste verschijning
- `pro_program_click`: 3 locaties (process/pricing/footer) met source prop
- `cta_click`: unified `hero_cta_click` + `sticky_bar_click` met `source` prop
- `signup` uitgebreid met `seconds` prop (time-to-signup)

**Ronde 2 — Verfijningen (layout.tsx + page.tsx + faqs.tsx):**
- Plausible script upgraded: `script.outbound-links.file-downloads.js` → automatisch outbound link + download tracking
- `id` toegevoegd aan 3 ontbrekende secties: `dimensions`, `why-it-works`, `training-reports`
- IntersectionObserver uitgebreid naar 11 secties (was 8)
- `quiz_click` uitgebreid: nu 3 sources (`hero`, `pricing`, `footer`)
- `contact_error` toegevoegd (consistent met `signup_error`)
- `time_to_signup` meet nu vanaf `performance.timeOrigin` (echte pageload, was component mount)
- Dubbele `declare global` opgeruimd (alleen in page.tsx, comment in faqs.tsx)
- **Let op**: Plausible script URL gewijzigd van custom proxy naar standaard CDN met extensions

**Ronde 3 — Proxy + verfijningen (next.config.ts + layout.tsx + page.tsx + navbar.tsx):**
- Plausible proxy via Vercel rewrites: `/js/script.js` → CDN, `/api/event` → API (omzeilt adblockers, ~15-30% meer data)
- `form_start` stuurt nu `plan` prop mee (welk plan pre-selected bij eerste interactie)
- `report_preview_close` nieuw event: dwell time in seconden + report type bij sluiten modal
- `cta_click` uitgebreid: navbar CTA nu ook getrackt met `source: "nav"` (desktop + mobile)
- Totaal: 18 custom events + 2 automatische Plausible extensions

### Analytics Uitbreiding — Gehele dienstverlening (9 april 2026)

**Quiz tracking (quiz.html):**
- Plausible script + proxy toegevoegd aan standalone HTML pagina
- `quiz_start`: quiz begonnen (na klik op start knop)
- `quiz_hole`: per-hole tracking met `hole` (1-9) + `seconds` (invultijd per hole) — toont waar gebruikers afhaken en welke holes lang duren
- `quiz_complete`: quiz afgerond met `seconds` (totale invultijd) + `score` (totaalscore 0-100)
- `quiz_optin`: opt-in formulier verstuurd met `score`
- `quiz_optin_error`: opt-in API call gefaald
- Quiz was volledig ongetrackt — nu volledige funnel: pageview → start → hole-by-hole → complete → optin

**Pro-program API route + tracking (pro-program/page.tsx + api/pro-program/route.ts):**
- Nieuw API endpoint: `POST /api/pro-program` — stuurt email naar support@mentalroutine.com via Resend
- Formulier was display-only (deed niets bij submit) — nu werkend met API call
- `pro_program_submit`: succesvolle aanmelding met `country`
- `pro_program_error`: API fout
- Submit button toont "Sending..." state + error message bij fout
- Totaal: 24 custom events + 2 automatische Plausible extensions over 3 pagina's

### Volledige Analytics Assessment + Upgrade Pagina's (9 april 2026)

**Assessment Standaard + Deluxe + Upgrade pagina's — van 1 event naar 5 events per pagina:**
- `checkout_click`: uitgebreid met `seconds` prop (time-on-page bij klik — purchase intent signal)
- `scroll_depth`: 25/50/75/100% milestones met `page` prop (waar haken bezoekers af?)
- `section_view`: IntersectionObserver (threshold 0.3) op alle secties met `page` prop
  - Standaard: 13 secties (hero, social-proof, pain, how-it-works, what-you-get, for-who, mockup, breakdown, testimonials, team, pricing, faq, final-cta)
  - Deluxe: 13 secties (hero, social-proof, pain, how-it-works, compare, features, breakdown, for-who, testimonials, team, pricing, faq, final-cta)
  - Upgrade: 8 secties (hero, unlock, value-comparison, testimonials, team, pricing, faq, final-cta)
- `faq_open`: welke FAQ vraag geopend met `question` nummer + `page` prop
- `upsell_click`: cross-sell link standaard→deluxe met `from`, `to`, `source` props
- Totaal: 35 custom events + 2 automatische Plausible extensions over 6 pagina's
