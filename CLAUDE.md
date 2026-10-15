# Project: The Mental Routine for Golfers — Landing Page

## ⚠️ ACTUEEL — HOMEPAGE = QUICKSCAN-FUNNEL (okt 2026, LIVE op `main`)

> Wint van alles hieronder waar het botst. Terugrollen: tag `homepage-pre-funnel-2026-10`.
> Wat er van de oude homepage af ging + hergebruik: `docs/ARCHIEF_HOMEPAGE_OKT2026.md`.
> **Volledig sessieverslag (besluiten + redenen, commits, openstaand): `docs/SESSIE_QUICKSCAN_FUNNEL_OKT2026.md`.**

- **De homepage verkoopt niets.** Eén doel: de gratis QuickScan. Kopen gebeurt pas ná de QuickScan
  (resultaatscherm + nurture-mails → `/assessment` of Lemon-checkout). Geen koopknop, pricing,
  trainingsrapporten-sectie of "warmte"-logica meer op `/` (`traffic-warmth.ts` verwijderd).
- **Messaging = Entry Narrative Framework v1.5** (Berend & Henk, 23-9-2026, bevroren). Data in
  `src/lib/narratives.ts` (3 groepen · 12 narratives · 48 sub-narratives · 48 hooks + NL-vertaling).
  Groepsregels, narratives en sub-narratives = **Henks golfer-voice-keuzes (okt 2026)**; hooks = v1.5.
  Regels: herkennen, niet diagnosticeren; **geen "strokes lost by mindset"-claims**; de 4 factoren
  blijven **onder water** (niet als navigatie); geen persona's.
- **Secties `/`:** hero (hook P1.1) · `#recognise` "Herken je dit?" (12 narratives als **checkboxes** +
  één startknop → QuickScan met alle aangevinkte routes `?route=P1,E2,D3`) · `#how-it-works` 3 momenten (pre-shot/swing/post-shot, géén stappen/factoren/aantallen)
  · `#team` Henk + Berend · `#faq` QuickScan-vragen (`home.faq`, ook JSON-LD) · contact · footer.
- **`?route=P4.2`** (of `P4`) op `/` toont de hook van die route in de hero (advertenties). De route
  gaat mee naar de QuickScan → Plausible-props `route` op `quiz_click`/`narrative_click`/`quiz_start`/
  `quiz_complete`/`quiz_optin`.
- **Alle CTA's → `#recognise`** (hero, slot, sticky, footer, navbar `/#recognise` op elke pagina, `/methodology`):
  de QuickScan start ALLEEN vanuit de 12 checkboxes (anders geen narratives). Advertentie-`?route=P4.2` vinkt P4
  alvast aan en stuurt bij start de exacte subroute mee (`P4.2,E1`). CTA's vuren `cta_click{source}`.
- **QuickScan-links** via `src/lib/quickscan.ts` → `/quickscan?start=1&lang=nl|en[&route=]`.
  `start=1` slaat de eigen landing van quiz.html over (de homepage ís de landing); de landing op
  `/quickscan` blijft voor direct verkeer. `/quickscan` = `public/quiz.html` (rewrite).
- **`/assessment`** blijft als verkooppagina voor warme leads (niet in menu/home).
  **Pro-programma:** alleen één footer-link.
- **Henk de Jong = initiatiefnemer van MentalRoutine** — niet coach, niet (golf)psycholoog, nooit
  PGA-pro (wel "PGA-netwerk": klopt). **Alleen MentalRoutine-branding** (NogBeterGolfen weg).
  Fictieve testimonials + pricing-quotes **verwijderd**. "1.000+ golfers sinds 2016" en "4.9/5" kloppen.
- **Talen:** `home.*` + narratives in alle 5 talen (NL **goedgekeurd door Henk** okt 2026, lijst
  `docs/NL_TEKSTEN_HOMEPAGE_HENK.md`; DE/FR/ES AI-vertaald, du/vous/tú). De QuickScan zelf blijft NL/EN.
- **Route → portal:** quiz.html stuurt `entry_route` mee naar `POST /api/quiz/results` → portal
  `QuizSession.entry_route` (migratie 025) → nurture-prompt + admin-funnel per narrative.
- Lokale typecheck: de geneste kopie `Claude website MR 01/Claude website MR 01/` (untracked) geeft
  tsc-fouten — negeren; alleen fouten in `src/` tellen.

## ⚠️ ACTUELE STAAT — VERSIMPELD MODEL (juli 2026, LIVE op www.mentalroutine.com)

> **Grote herziening uitgevoerd + live.** De secties verderop in dit bestand beschrijven
> deels het OUDE model (Foundation/Mastery/credits/6 dimensies/2 producten). Dat is HISTORIE.
> Hieronder staat wat er NU op de site staat. Bij tegenspraak wint deze sectie.

**Het model (8 stappen in 3 fases die golfers kennen):**
- **Pre-shot:** Focus · Concentration
- **Swing:** Conviction · **Trust** (was "Performance"; NL "Vertrouwen")
- **Post-shot:** Evaluation · Acceptance · Analysis · **Transfer** (was "Learning Transfer")
- **4 beïnvloedende factoren** (apart blok, GEEN stappen, eromheen), sinds 23-9-2026 volgens het
  **4×4-lenzenmodel** van de portal (portal-repo `docs/FACTOREN_4X4_LENZEN.md`), in de volgorde van de
  slag: **Risk appetite** (Risicobereidheid, pre-shot) · **Pressure** (Druk, swing) · **Resilience**
  (Veerkracht, post-shot) · **Readiness** (Paraatheid, hele routine). Elke factor × de lenzen
  Kennis · Context · Dialoog · Zelf = 16 deelfactoren. Was: Pressure & stress · Practice quality ·
  Risk appetite · Resilience. DE/FR/ES: Risikobereitschaft · Druck · Resilienz · Spielbereitschaft /
  Appétence au risque · Pression · Résilience · Disponibilité / Apetito de riesgo · Presión ·
  Resiliencia · Disponibilidad (gelijk aan de portal).
- Structuur-som: 8 stappen × 5 + 4 factoren × 4 = **56** interventiepunten (afgeleid presenteren).

**Product & prijs (ÉÉN product, geen tiers):**
- De **MentalRoutine Assessment** = **$79** (USD wereldwijd, GEEN was-prijs, GEEN €).
  Code-prijs $59 via pro/affiliate — NIET publiek noemen. Geen Foundation/Mastery/credits meer.
- Inbegrepen: het complete **player profile** (PDF) + **3 training reports naar keuze uit 12**
  (= 8 stappen + 4 factoren; presenteer als "8+4"). Extra reports $19 · 3 reports $49 ·
  repeat $39 · course booklet $9.
- Terminologie: eerste rapport = **profile** (NL spelersprofiel), vervolg = **training reports**.
  Scoreschaal overal **0–10, 1 decimaal**.

**Pagina's/URLs:**
- ~~`/` homepage — 3 gelijkwaardige deuren~~ **VEROUDERD (okt 2026): homepage = QuickScan-funnel, zie bovenaan.** Oud: `/` homepage — LEGT UIT, verkoopt niet. Hero: geen prijs/koopknop, **3 gelijkwaardige deuren**
  (QuickScan `/quickscan` · assessment `/assessment` · pro `/pro-program`).
- `/assessment` = NIEUWE Next.js-pagina (`src/app/assessment/page.tsx`) — het betaalde product,
  koopknop → **Lemon Squeezy-checkout** (live). Meertalig via `translations.assessmentPage`.
- `/quickscan` = de standalone quiz (rewrite → `public/quiz.html` in next.config; was `/quiz.html`).
- **Redirects (next.config.ts):** `/quiz.html`→`/quickscan`, `/assessment-mastery.html`→`/assessment`,
  `/assessment-foundation.html`→`/assessment` (die 2 HTML-bestanden zijn VERWIJDERD).
- **Canonieke host: www.mentalroutine.com** (Vercel serveert www; canonicals/metadata op www).

**Meertaligheid NU:** **alle 5 talen (EN·NL·DE·FR·ES) LIVE + volledig vertaald** en zichtbaar in de
taalwisselaar (navbar.tsx `LANG_OPTIONS` = alle 5 actief, niets uitgecommend). translations.ts heeft
ECHTE `de`/`fr`/`es`-objecten (geen `de: en`-placeholders meer). `en` is een losse `const ... as const`;
`Translation = Widen<typeof en>`; elk taalobject `satisfies Translation`. **Nieuwe key = in ALLE 5 talen
toevoegen.** ⚠️ Uitzondering: de losse **quiz.html** is nog steeds alleen NL + EN (eigen in-page
`TRANSLATIONS`; DE/FR/ES = toekomstig). NB: de comment bovenaan navbar.tsx (~regel 10-12) over
"DE/FR/ES verborgen/placeholder" is zelf verouderd t.o.v. de code eronder — negeren/opruimen.

**Koopknoppen → Lemon Squeezy (LIVE sinds 30-7-2026).** Constante `CHECKOUT_ASSESSMENT_URL`
(= `mentalroutinegolf.lemonsqueezy.com/checkout/buy/91ec251f-2df6-481b-b2e1-6f9aadaaf6fc`) in
`page.tsx` (3 CTA's: pricing/training-reports/sticky) + `assessment/page.tsx` (1 CTA), alle 4 met
`target="_blank"` + `checkout_click`-event. Bezoeker is NIET ingelogd op de portal → koppeling gebeurt
op het e-mailadres dat bij de Lemon-checkout wordt ingevuld (webhook koppelt daarop). De portal-2C-
integratie is live + bewezen (echte order+refund); zie portal-repo `docs/LEMON_2C_INTEGRATIE.md`.
Variant wijzigen = nieuwe checkout-UUID via Lemon → Store → Products → Share.

**GEDAAN (juli 2026):** ✅ **DE/FR/ES volledig vertaald + LIVE** (translations.ts heeft nu echte
`de`/`fr`/`es`-objecten i.p.v. `de: en`; alle 3 zichtbaar in de taalwisselaar; navbar.tsx
LANG_OPTIONS niet meer uitgecommend). ✅ **`sample-mastery.html` VERWIJDERD** + het dode
`mastery`-preview-pad uit report-preview-modal/page.tsx/previewModal-keys (product bestaat niet
meer). ✅ privacyNote "nooit gedeeld zonder jouw toestemming".

**Openstaand (niet gedaan):** ~~testimonials-foto's/authenticiteit~~ (okt 2026: fictief → verwijderd) ·
UTM-meetbaarheid PGA-mailing · DE/FR/ES-vertaling is AI-gegenereerd (idiomatisch, tsc+build schoon)
maar niet menselijk gereviewd op toon/nuance · tekstuele finetuning · `assessment/page.tsx`-copy is
grotendeels mijn formulering (mag bijgestuurd).

## ⚠️ DRIFT-CORRECTIE (aug 2026) — deze secties hieronder liepen achter op de code
> De secties verderop (Projectstructuur, Pricing, Secties-tabel, FAQ-overzicht, Early Access Systeem,
> SEO — HTML Subsites, Domeinen-tabel) bevatten OUDE info. Waar dit blok en een lagere sectie
> botsen, wint dit blok. Geverifieerd tegen de code (aug 2026):

- **Bestanden VERWIJDERD** (staan nog fout in Projectstructuur/SEO/Sample-Previews): `early-access-
  section.tsx`, `api/early-access/route.ts`, `api/spots/route.ts`, `reports/sample-mastery.html`,
  `assessment-foundation.html`, `assessment-mastery.html`, `upgrade-standaard-deluxe.html`,
  `sample-deluxe.html`. **NIEUW/ongedocumenteerd**: `src/lib/traffic-warmth.ts` (Optie-B warmte-hero-
  logica), `src/app/sitemap.ts`, `public/robots.txt`, `public/social/` (3 PNG's), `public/logoMR.svg`.
- **Early Access Systeem + Live Spots Counter = VOLLEDIG DOOD.** `EarlyAccessSection` wordt niet
  gerenderd, geen api-early-access/spots-route, geen Resend-audience-flow, geen `EA_PRICE_*`/`REG_*`-
  constanten. De nav-CTA is nu **"Free QuickScan"** (→ `/quickscan`), niet "Early Access".
- **Pricing = ÉÉN product $79** (translations `plans[0]`: `price:"79"`, geen was-prijs, geen tiers,
  geen credits). GEEN Foundation/Mastery, GEEN vergelijkingstabel (`comparisonRows: []` leeg), GEEN
  2 plan-kaarten. De "Pricing (huidige waarden)"-tabel + "Upgrade pad" verderop zijn HISTORIE.
- **Sample-preview modal** accepteert alleen **`"standard" | "training"`** (geen `"mastery"`).
- **Secties in page.tsx** (13 incl. navbar/footer, GEEN `#early-access`): hero = **3 deuren, geen
  prijs/koopknop**; Research-stats = **90% / 1000+ / 56** (niet 70+); `#dimensions` toont nu de
  **4 beïnvloedende factoren** (niet "6 dimensies"); pricing = 1 kaart.
- **FAQ = 7 vragen** (geen 9; de 2 Mastery-vragen zijn weg). JSON-LD (layout.tsx) = **1 offer $79
  PreOrder** + **4** FAQPage-items (niet "2 offers Foundation/Mastery" + 5).
- **Koop-CTA's → Lemon Squeezy** (`CHECKOUT_ASSESSMENT_URL`), NIET Shopify. De Domeinen-tabel-rij
  "shop.mentalroutine.com … koop-CTA's wijzen hiernaar" + het "Betaal-integratie (Shopify)"-blok zijn
  achterhaald. quiz.html-escape-link → Lemon (aug 2026 gefixt). Geen `shop.`-verwijzing meer in src.
- **quiz.html**: `QUIZ_LOCKED`/coming-soon-banner = WEG (quiz is niet meer gelockt); linkt naar
  Lemon-checkout met code QUICKSCAN10.
- **Rate-limiting / input-validatie**: nog **2** POST-routes (contact 3/min, pro-program 3/min) —
  early-access (5) + spots (30) bestaan niet meer.
- **Meertaligheid**: alle 5 talen LIVE (zie de bijgewerkte "Meertaligheid NU"-alinea hierboven).

## Stack
- **Framework**: Next.js 16.2.0 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Animatie**: Framer Motion (`framer-motion` import in page.tsx/faqs.tsx, `motion/react` import in navbar.tsx/testimonials-columns.tsx)
- **E-mail**: Resend SDK (contactformulier + pro-program-aanmelding; de early-access-flow is verwijderd)
- **Analytics**: Plausible (privacy-friendly, cookieloos, GDPR-compliant) + Microsoft Clarity (heatmaps, session recordings)
- **Fonts**: `next/font` (self-hosted) — Cormorant Garamond (headings, serif), DM Sans (body, sans-serif)
- **Runtime**: Node.js (lokaal in `C:\Program Files\nodejs\`, niet in standaard PATH)

## Projectstructuur

```
src/
  app/
    layout.tsx                  — root layout (metadata, JSON-LD, Plausible+Clarity, html/body)
    page.tsx                    — hoofdpagina (secties + imports)
    sitemap.ts                  — dynamische sitemap
    favicon.ico
    globals.css                 — Tailwind imports + globale stijlen + prefers-reduced-motion
    assessment/page.tsx         — /assessment (betaald product, Lemon-checkout-CTA)
    pro-program/page.tsx        — PGA Pro Program landing page
    api/
      contact/route.ts          — POST → contactformulier e-mail via Resend (rate-limited)
      pro-program/route.ts      — POST → pro-program aanmelding via Resend (rate-limited)
      (early-access/ + spots/ zijn VERWIJDERD — early-access-flow bestaat niet meer)
  lib/
    translations.ts             — alle tekst + vertalingen, 5 talen (as const)
    traffic-warmth.ts           — Optie-B: herkomst-warmte-detectie (drijft de warme hero)
    utils.ts                    — utility functies (cn helper)
    validate.ts                 — server-side input validatie (sanitize, validEmail, clamp)
    rate-limit.ts               — in-memory rate limiter per IP (contact + pro-program)
    use-reduced-motion.ts       — React hook voor prefers-reduced-motion detectie
  context/
    lang-context.tsx            — taalwisselaar (LangProvider + useLang hook)
  components/ui/
    navbar.tsx                  — navigatie + LangDropdown (5 talen, mobile + desktop)
    faqs.tsx                    — FAQ accordion (FaqsSection)
    testimonials-columns.tsx    — testimonial kaarten in auto-scroll kolommen (reduced-motion aware)
    hero-radar.tsx              — SVG radar chart, roteert random scores (reduced-motion aware)
    contact-section.tsx         — contactformulier (POST naar /api/contact), lazy-loaded
    report-preview-modal.tsx    — iframe modal voor sample reports (types: standard|training), lazy-loaded
    spotlight.tsx               — achtergrond spotlight effect (hero)
    button.tsx                  — generieke button component
    evervault-card.tsx          — decoratief card component
    splite.tsx                  — decoratief component
    (early-access-section.tsx is VERWIJDERD)

public/
  og-image.png                  — OG/social sharing image (1792×1024)
  robots.txt                    — crawler-regels
  logoMRpng.png / logoMRjpg.jpg / logoMR.svg / logo-icon.svg — logo-varianten
  social/                       — 3 social-PNG's
  reports/
    sample-standard.html        — dummy voorbeeldrapport (clickable preview)
    sample-training-report.html — sample trainingsrapport (clickable preview)
  quiz.html                     — de QuickScan (rewrite van /quickscan)
  *.svg                         — Next.js default icons
  (VERWIJDERD: reports/sample-mastery.html, assessment-foundation.html, assessment-mastery.html,
   upgrade-standaard-deluxe.html — oude URLs → 301 naar /assessment via next.config.ts)
```

## Domeinen & Hosting

| Domein | Doel |
|--------|------|
| `www.mentalroutine.com` | Productie (primair) |
| `mentalroutine.com` | 307 redirect → `www.mentalroutine.com` |
| `mentaleroutine.com` | 301 redirect → `www.mentalroutine.com` (oud domein) |
| `portal.mentalroutine.com` | De PORTAL (betaald assessment + golfer-omgeving, aparte repo) |
| ~~`shop.mentalroutine.com`~~ | ⚠️ ACHTERHAALD: koop-CTA's wijzen NIET meer hiernaar. Alle checkout-CTA's → **Lemon Squeezy** (`CHECKOUT_ASSESSMENT_URL`). De Shopify-shop is verlaten als koopkanaal. |

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

### Geëxtraheerde componenten (lazy-loaded via `next/dynamic`)

1. **HeroRadar** (`hero-radar.tsx`) — SVG radar chart met 8 assen, roteert random scores elke 3s, stopt bij `prefers-reduced-motion`
2. **ContactSection** (`contact-section.tsx`) — werkend contactformulier (POST naar `/api/contact`), lazy-loaded `ssr: false`
3. **EarlyAccessSection** (`early-access-section.tsx`) — signup formulier met plan-voorkeur, spots counter, UTM capture, lazy-loaded `ssr: false`. Ontvangt `eaPriceStd` en `eaPriceDlx` als props
4. **ReportPreviewModal** (`report-preview-modal.tsx`) — iframe modal die sample reports toont, lazy-loaded `ssr: false`

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

**Let op — verkoopmodel gewijzigd (juli 2026):** de shop verkoopt alleen nog **Foundation**
(voorheen "Standard") + credit-bundels. **"Mastery"** (voorheen "Deluxe") is geen los
shop-product meer, maar een **in-portal credit-upgrade** (180 credits, beschikbaar vanaf
1 aug 2026). Zie de portal-repo `docs/MASTERY_UPGRADE.md`. De $89 hieronder is de
dollar-equivalente waarde die de website communiceert; de portal int in credits.

| Plan | Prijs | Was-prijs | Inclusief | Early Access |
|------|-------|-----------|-----------|-------------|
| Foundation | $59 | $79 | 20p PDF rapport + 60 credits (2–6 trainingsrapporten) | $49 + 2 extra training reports |
| Mastery (upgrade) | +$89 (180 credits) | $129 | +24p rapport (44 totaal) + 35 extra factoren + 90 credits (150 totaal) | $69 upgrade |

**Extra trainingsrapporten**: credit-bundels vanaf $6,99 (10 credits) in de shop

**Upgrade pad**: Foundation → Mastery met 180 credits in de portal (niet los te kopen; Foundation komt eerst). Bestandsnamen op de website: `assessment-mastery.html` (uitleg), de losse upgrade-pagina is verwijderd.

**Early access prijzen zijn dynamisch**: `EA_PRICE_STD` (49) en `EA_PRICE_DLX` (99) constanten in page.tsx. Bij launch: verander alleen deze 2 waarden + de constanten in `api/early-access/route.ts` (`EA_STD`, `EA_DLX`). De `heroCta` translation gebruikt `{price}` template die at render time wordt ingevuld.

**Pricing anchor**: "For comparison: a single session with a golf psychologist typically costs $150–$300." — subtiele vergelijking onder pricing note (`pricing.pricingAnchor`, alle 5 talen, € voor NL/DE/FR).

**Let op**: De termen "Skills Developer" en "bonus credits" zijn volledig verwijderd uit alle user-facing tekst (0 matches in zichtbare content). "Skills Developer" hernoemd naar "Training Reports" / "Trainingsrapporten", "bonus credits" vervangen door "extra training reports". De interne property-namen in translations.ts heten nog steeds `skillBuilder.*` — dat is de technische key, de zichtbare labels zijn hernoemd.

## Sample Report Previews

- **Locatie**: `public/reports/sample-standard.html`, `public/reports/sample-mastery.html`, `public/reports/sample-training-report.html`
- **Type**: Volledige HTML pagina's met eigen CSS (geen Tailwind), gestyled om een PDF-rapport te simuleren
- **Assessment reports** (Foundation + Mastery): Cover page, score bars, deep dives per stap, geblurde secties (met lock icon), prioriteiten, aanbevelingen
- **Training report** (5 pagina's): Cover met score indicator (3.8/10 Conviction Under Pressure), benchmark vergelijking, fysieke + mentale oefening, expert insight + storytelling (Shane Lowry), reflectievragen + mantra, geblurde AI self-coaching prompts + extended benchmark
- **Geladen via**: `ReportPreviewModal` component in `report-preview-modal.tsx` (lazy-loaded) — iframe in een modal overlay, ondersteunt 3 types: `"standard"` | `"mastery"` | `"training"` (plan `"mastery"` → `sample-mastery.html`)
- **Triggers**:
  - "Preview sample report →" knop onder elke pricing card (Foundation/Mastery)
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
- **Deadline**: "Available only until July 1st" — in translations
- **Pre-launch datum**: June 22nd, 2026
- **Officiële launch datum**: July 1st, 2026

## Pro Program Pagina

- **URL**: `https://mentalroutine.com/pro-program`
- **Bestand**: `src/app/pro-program/page.tsx`
- **API route**: `src/app/api/pro-program/route.ts` — POST → 2 emails via Resend (parallel via `Promise.all`)
- **Doel**: Landing page voor PGA Teaching Professionals om het assessment aan te bieden aan hun leerlingen
- **Taal**: alleen Engels (niet meertalig, niet in translations.ts)
- **Toegang vanuit hoofdpagina**: footer link, pricing proCallout, process coachNote (alle 3 getrackt via `pro_program_click`)
- **Bevat**: aanmeldformulier met velden voor PGA-nummer, divisie, land, faciliteit, actieve leerlingen, etc.
- **Emails bij aanmelding**:
  1. **Notificatie** naar `support@mentalroutine.com` — naam, email, PGA-nummer, land, etc.
  2. **Bevestiging** naar aanmelder — bedankt, next-steps timeline (review → activatie → free Deluxe Assessment + affiliate code)
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
| 8 | What is MentalRoutine Mastery? | Upgrade voor Foundation-eigenaren: +35 factoren, +24 pag., +90 credits |
| 9 | How does the upgrade to Mastery work? | In-portal credit-upgrade (~$89 / 180 credits), Foundation-resultaten hergebruikt |

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
- **Body**: DM Sans (default), `text-sm` of `text-base`
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
- Radar chart: `setInterval` elke 3s met random scores 1-9 (stopt bij `prefers-reduced-motion`)
- Testimonials: infinite auto-scroll (stopt bij `prefers-reduced-motion`)
- **Reduced motion**: globale CSS rule + component-level checks via `useReducedMotion()` hook

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

### Fonts (`next/font`)
- **Self-hosted** via `next/font` — geen externe Google Fonts CSS import, elimineert render-blocking request + DNS lookup
- **Config in `layout.tsx`**: `DM_Sans` + `Cormorant_Garamond` met `subsets: ["latin"]`, `display: "swap"`, CSS variables
- **CSS variables**: `--font-dm-sans` (body) en `--font-cormorant` (headings)
- **Toepassing**: `<html className={`${dmSans.variable} ${cormorant.variable}`}>` in layout.tsx
- **globals.css**: `body { font-family: var(--font-dm-sans), sans-serif; }`
- **Inline styles**: alle `fontFamily` referenties in componenten gebruiken `"var(--font-cormorant), serif"` (niet hardcoded font naam)
- **Bestanden met `fontFamily` verwijzingen**: page.tsx, pro-program/page.tsx, navbar.tsx, faqs.tsx, early-access-section.tsx

### Framer Motion imports
- `page.tsx`, `faqs.tsx`, `hero-radar.tsx`, `contact-section.tsx`, `early-access-section.tsx`, `report-preview-modal.tsx`: importeren uit `"framer-motion"`
- `navbar.tsx` en `testimonials-columns.tsx`: importeren uit `"motion/react"`
- **Niet mixen** binnen één bestand

### SEO & Structured Data (`layout.tsx`)
- **Metadata**: title, description, metadataBase (`https://www.mentalroutine.com`), canonical, robots
- **Open Graph**: title, description, url, siteName, locale (`en_US`), type (`website`), **image** (`/og-image.png`, 1792×1024)
- **Twitter Card**: `summary_large_image`, title, description, **image** (`/og-image.png`)
- **hreflang alternates**: `en`, `nl`, `de`, `fr`, `es`, `x-default` — allemaal naar `/` (single-page, client-side i18n)
- **JSON-LD** (3 blokken in `<head>`):
  1. `Organization` — naam, url, logo, sameAs (Instagram, TikTok, YouTube, X, LinkedIn)
  2. `Product` — 2 offers: Foundation $59, Mastery $89 (upgrade, PreOrder availability)
  3. `FAQPage` — 5 meest relevante FAQ items voor Google rich snippets
- **OG image** ✅: DALL-E gegenereerde radar chart achtergrond + tekst overlay via Sharp composite

### SEO — HTML Subsites
- **Assessment Foundation** (`assessment-foundation.html`): `<link rel="canonical">` + JSON-LD Product schema ($59, PreOrder). [Voorheen `assessment-standaard.html`]
- **Mastery-uitlegpagina** (`assessment-mastery.html`): `<link rel="canonical">` + JSON-LD Product schema ($89 upgrade, PreOrder). [Voorheen `assessment-deluxe.html`]
- **Quiz** (`quiz.html`): `<meta name="robots" content="noindex, nofollow">` + canonical (coming-soon, niet indexeren)
- **Verwijderd**: `upgrade-standaard-deluxe.html` (was dubbelop met de Mastery-uitlegpagina). Oude URLs (assessment-deluxe/standaard/upgrade + sample-deluxe) geven nu 404 (harde cut, geen redirects — pre-launch).

### Accessibility
- **Skip-to-content link**: `<a href="#hero" className="sr-only focus:not-sr-only ...">` vóór Navbar
- **Radar chart**: `role="img"` + `aria-label` met beschrijving
- **Spots counter**: `role="status"` + `aria-live="polite"` voor screenreader updates
- **FAQ accordion** (hoofdpagina): WAI-ARIA accordion pattern — `aria-expanded`, `aria-controls` op trigger button, `role="region"` + `aria-labelledby` op content panel
- **Pro Program FAQ accordion**: zelfde WAI-ARIA pattern — `id={triggerId}`, `aria-expanded`, `aria-controls` op button, `id={panelId}`, `role="region"`, `aria-labelledby` op panel
- **Navbar mobile**: close button heeft `aria-label="Close menu"`
- **Dynamic html lang**: `document.documentElement.lang` wordt gesynchroniseerd via `useEffect` in `LangProvider`
- **Report preview modal** (`report-preview-modal.tsx`):
  - `role="dialog"` + `aria-modal="true"` + `aria-label` op modal container
  - **Focus trap**: Tab cycled door focusbare elementen (knoppen, iframe), Shift+Tab gaat achteruit
  - **Focus restore**: vorige focus-element wordt opgeslagen en hersteld bij sluiten
  - Close button krijgt auto-focus bij openen (`data-close` attribuut)
- **Formulier feedback**: `role="status"` + `aria-live="polite"` op succes-berichten, `role="alert"` op foutmeldingen (contact-section + early-access-section)
- **Training Reports mockup card**: `role="button"` + `tabIndex={0}` + `onKeyDown` handler (Enter/Space) + `aria-label` voor keyboard navigatie
- **HTML subsites** (assessment-foundation, assessment-mastery, quiz):
  - Skip-to-content links (inline styled, zichtbaar bij focus)
  - `<main id="main-content">` landmarks
  - `role="banner"` op headers, `role="contentinfo"` op footers
  - Quiz: `role="main"` op phase-landing div
- **prefers-reduced-motion** (WCAG 2.1 AA):
  - `useReducedMotion()` hook in `src/lib/use-reduced-motion.ts` — detecteert OS-instelling, luistert naar wijzigingen
  - **Radar chart** (`hero-radar.tsx`): stopt `setInterval` rotatie bij reduced-motion
  - **Testimonials** (`testimonials-columns.tsx`): stopt auto-scroll animatie bij reduced-motion (gebruikt shared hook)
  - **Globale CSS** (`globals.css`): `@media (prefers-reduced-motion: reduce)` zet `animation-duration`, `transition-duration` en `scroll-behavior` op minimaal voor alle elementen

### Analytics (Plausible) — bijgewerkt aug 2026
> ⚠️ De vorige eventtabel was zwaar verouderd (Early-Access- + HTML-subsite-events die niet meer
> bestaan). Hieronder de GEVERIFIEERDE, actuele set. De code is opgeschoond; alleen dit doc liep achter.

- **Provider**: Plausible (Business plan), cookieloos/GDPR. + **Microsoft Clarity** (`w8rr4hfxpz`) voor
  heatmaps/sessie-opnames.
- **Script**: `<script async src="/js/script.js" data-api="/api/event" data-domain="mentalroutine.com" />`
  in `layout.tsx`, geproxied via Vercel-rewrites (`/js/script.js`→CDN, `/api/event`→API, omzeilt adblockers)
  + extensies outbound-links/file-downloads. `window.plausible`-stub in layout.
- **Helper**: `track()` — 4× gedupliceerd (page.tsx, assessment/page.tsx, pro-program/page.tsx,
  contact-section.tsx, report-preview-modal.tsx), `Window.plausible` 3× `declare global`. navbar.tsx +
  faqs.tsx + quiz.html gebruiken directe `window.plausible(...)`-calls.
- **4 pagina's met tracking**: `/` (page.tsx), `/assessment`, `/pro-program`, `quiz.html`. (De oude
  assessment-standaard/deluxe/upgrade-HTML-subsites bestaan NIET meer.)

**Custom events die ECHT vuren** (bijgewerkt 15-10-2026, QuickScan-funnel):

| Event | Props | Waar / trigger |
|-------|-------|----------------|
| `narrative_click` | `route: "P1"…"D4"` | **NIEUW** — vinkje aan bij een van de 12 herkenningszinnen (per vinkje 1 event → telling per zin) |
| `hero_route` | `route: "P4.2"` e.d. | **NIEUW** — bezoeker kwam binnen met `?route=` (advertentie) → hero toont die hook |
| `quiz_click` | `source: "hero"\|"recognise"\|"final"\|"sticky"\|"footer"\|"nav"\|"methodology"`, `route` (home; bij `recognise` de lijst `"P1,E2"` + `count`) | QuickScan-knoppen |
| `methodology_click` | `source: "phases"\|"assessment"` | Link naar `/methodology` |
| `pro_program_click` | `source: "footer"` | Enige pro-link op de homepage |
| `checkout_click` | `plan`, `source: "assessment-page"\|"quiz-optin-escape"` | Lemon-checkout (homepage heeft GEEN koopknop meer) |
| `report_preview` / `report_preview_close` | `type` / `type, seconds` | Voorbeeldrapporten (`/assessment`, quiz.html) |
| `section_view` | `section` | homepage: **`recognise, how-it-works, team, faq, contact`** |
| `scroll_depth` | `depth` | homepage |
| `faq_open` | `question` | FAQ-vraag geopend |
| `contact_submit` / `contact_error` · `pro_program_submit` / `pro_program_error` · `lang_switch` | | ongewijzigd |
| `methodology_read_full` / `methodology_refs_open` | | `/methodology` |
| **quiz.html:** `quiz_start` (`route`) · `quiz_hole` · `quiz_complete` (`seconds,score,lang,route`) · `quiz_optin` (`score,route`) · `quiz_optin_error` · `quiz_lang_switch` | `route` = `P2`/`P4.2`/`none` | Quiz-funnel; met `?start=1` vuurt `quiz_start` direct bij laden |
| + outbound-links · file-downloads | automatisch | Plausible-extensies |

- **VERVALLEN** (vuren niet meer): `hero_warmth` (warmte-hero weg), `cta_click` (hero + methodology; de
  koopdeur op `/methodology` is weg, die CTA start nu direct de QuickScan),
  `checkout_click` vanaf de homepage (`pricing`/`training-reports`/`sticky`), `section_view` voor
  `mental-routine/steps/dimensions/why-it-works/pricing/training-reports/testimonials`.
- **Custom property `route`** moet in Plausible (Site settings → Custom properties) zijn toegevoegd om
  te kunnen filteren/uitsplitsen. Kopers per route: niet in Plausible (koop gebeurt vaak later via de
  nurture-mail) → portal-admin "Funnel per herkenningszin".

### Plausible Goals & Funnels (9 april 2026 — deels ACHTERHAALD, zie noot)
> ⚠️ **Actueel (aug 2026):** de dode "Early Access Signup"-funnel is verwijderd; de goals zijn
> opgeschoond naar de werkelijke event-set (zie de Analytics-sectie). De 2 actieve funnels nu:
> **Quiz Funnel** (5-step) `quiz_click → quiz_start → quiz_complete → quiz_optin → checkout_click`
> en **Assessment Checkout** (2-step) `section_view → checkout_click`. De onderstaande april-entry
> is historie. **Okt 2026:** "Assessment Checkout" werkt niet meer (homepage verkoopt niet, `/assessment`
> vuurt geen `section_view`) → vervangen door pageview `/assessment` → `checkout_click`; nieuwe funnel
> **Herkenning** `narrative_click → quiz_start → quiz_complete → quiz_optin`; goals `narrative_click` +
> `hero_route` erbij, `hero_warmth` weg; custom property `route`. (Handmatig in het Plausible-dashboard.)

**(historie, apr 2026)** 35 custom event goals geregistreerd (Settings → Goals). 3 funnels:
1. **Early Access Signup**: `cta_click` → `form_start` → `plan_select` → `signup` (VERWIJDERD — dode events)
2. **Quiz Funnel**: `quiz_click` → `quiz_start` → `quiz_complete` → `quiz_optin`
3. **Assessment Checkout**: `section_view` → `faq_open` → `checkout_click`

### Microsoft Clarity (9 april 2026)

- **Provider**: Microsoft Clarity — gratis, onbeperkt, GDPR-compliant
- **Project ID**: `w8rr4hfxpz`
- **Doel**: Heatmaps, session recordings, dead click detection — kwalitatief inzicht naast Plausible's kwantitatieve data
- **Script**: `(function(c,l,a,r,i,t,y){...})(window,document,"clarity","script","w8rr4hfxpz")`
- **Geïnstalleerd op alle 6 pagina's**:
  - `layout.tsx` (hoofdpagina + pro-program)
  - `quiz.html`
  - `assessment-standaard.html`
  - `assessment-deluxe.html`
  - `upgrade-standaard-deluxe.html`
- **Dashboard**: clarity.microsoft.com

### Expert Panel Review Ronde 2 + Fixes (9 april 2026)

**Expert panel review uitgevoerd** (5 deskundigen: Conversie Specialist, UX Designer, Frontend Engineer, SEO Specialist, Copywriter):
- Totaalscore: **7.7 / 10** (stijging van 6.8 → 7.7 na vorige ronde fixes)
- Top scores: Analytics (9.0), SEO (8.5), Meertaligheid (8.5), Visual Design (8.5)
- Verbeterpunten: Performance (7.0), Assessment subsites (7.0), Quiz (6.5)

**6 kritieke issues gefixt:**

1. **Terminologie opgeschoond op assessment/upgrade HTML pagina's:**
   - Alle "Skills Developer" → "trainingsrapporten" op `assessment-standaard.html`, `assessment-deluxe.html`, `upgrade-standaard-deluxe.html`
   - Alle "credits" → rapportaantallen (4–6 / 9–14)
   - FAQ's herschreven zonder credits-terminologie

2. **Upgrade prijs gecorrigeerd:**
   - $79 → $89 op `upgrade-standaard-deluxe.html` (8 locaties: meta, titel, header CTA, hero, pricing card, guarantee, FAQ, testimonial)

3. **Domein gecorrigeerd op alle HTML pagina's:**
   - `https://mentaleroutine.com` → `https://www.mentalroutine.com` op assessment-standaard (6 URLs), assessment-deluxe (6 URLs), upgrade (6 URLs)
   - `support@mentaleroutine.com` → `support@mentalroutine.com` op alle 3 pagina's
   - `portal.mentaleroutine.com` (quiz API endpoint) bewust ongemoeid gelaten

4. **Quiz social proof gecorrigeerd:**
   - "1.247 golfers deden de quiz al" → "1.000+ golfers onderzocht" (claim was misleidend want quiz is nog niet live)
   - "1.247 golfers ontdekten al..." → "Gebaseerd op onderzoek met 1.000+ golfers..."

5. **Rate limiting toegevoegd:**
   - Nieuw bestand: `src/lib/rate-limit.ts` — in-memory sliding window per IP
   - Alle 4 API routes voorzien van rate limiting (contact: 3/min, early-access: 5/min, pro-program: 3/min, spots: 30/min)

6. **Error logging toegevoegd:**
   - Alle API routes loggen fouten via `console.error("[route] message:", err)` met route-prefix
   - Voorheen: stille catch met generieke error response

### Performance Optimalisatie (9 april 2026)

**page.tsx gesplitst van 1223 → 814 regels:**
- 4 componenten geëxtraheerd naar eigen bestanden:
  - `src/components/ui/hero-radar.tsx` — SVG radar chart (82 regels)
  - `src/components/ui/contact-section.tsx` — contactformulier (94 regels)
  - `src/components/ui/early-access-section.tsx` — early access signup (165 regels)
  - `src/components/ui/report-preview-modal.tsx` — report preview modal (58 regels)
- Shared utility: `src/lib/use-reduced-motion.ts` — React hook (13 regels)
- Below-fold componenten lazy-loaded via `next/dynamic` met `ssr: false`:
  ```tsx
  const ContactSection = dynamic(() => import("@/components/ui/contact-section").then(m => ({ default: m.ContactSection })), { ssr: false });
  const EarlyAccessSection = dynamic(() => import("@/components/ui/early-access-section").then(m => ({ default: m.EarlyAccessSection })), { ssr: false });
  const ReportPreviewModal = dynamic(() => import("@/components/ui/report-preview-modal").then(m => ({ default: m.ReportPreviewModal })), { ssr: false });
  ```
- `EarlyAccessSection` ontvangt prijzen als props: `<EarlyAccessSection eaPriceStd={EA_PRICE_STD} eaPriceDlx={EA_PRICE_DLX} />`
- UTM capture logic verplaatst van page.tsx naar early-access-section.tsx (enige consumer)

### Accessibility: prefers-reduced-motion (9 april 2026)

- **Hook**: `useReducedMotion()` in `src/lib/use-reduced-motion.ts`
  - Detecteert `(prefers-reduced-motion: reduce)` media query
  - Luistert naar wijzigingen (bijv. gebruiker verandert OS-instelling)
  - Retourneert `boolean` — `true` als gebruiker minder beweging wil
- **Radar chart** (`hero-radar.tsx`): `setInterval` wordt niet gestart bij `reducedMotion === true`
- **Testimonials** (`testimonials-columns.tsx`): `animate` en `transition` worden lege objecten bij reduced-motion → geen scrollende kolommen
- **Globale CSS** (`globals.css`): fallback voor alle andere animaties
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

### Quiz Taaldetectie (9 april 2026)

- **Probleem**: quiz is alleen Nederlands, maar hoofdsite is 5-talig → internationale bezoekers kwamen op NL-only quiz terecht
- **Oplossing**: browser-taaldetectie via `navigator.language`
- **Implementatie**: `<div id="lang-notice">` banner direct na coming-soon-banner in `quiz.html`
  - Alleen zichtbaar voor niet-NL browsers
  - Tekst: "This quiz is currently only available in Dutch."
  - Link: "Take the full assessment in English →" naar `/#early-access`
  - Dismissible met × knop
- **Toekomstig project**: volledige 5-talige quiz na launch op 22 juni

### Pro Program Bevestigings-email (9 april 2026)

- **Route**: `src/app/api/pro-program/route.ts`
- **Wijziging**: enkele notificatie-email → 2 emails parallel via `Promise.all`
- **Nieuwe bevestiging-email naar aanmelder**:
  - From: `MentalRoutine <contact@mentalroutine.com>`
  - Reply-to: `support@mentalroutine.com`
  - Subject: "Your Pro Program application has been received!"
  - Content: bedankt, 3-stappen timeline (application in queue → review within 24h → approved: free Deluxe + affiliate code)
  - Taal: Engels (consistent met de Engelstalige Pro Program pagina)

### Expert Panel Review Ronde 3 + Fixes (9 april 2026, avond)

**Expert panel review uitgevoerd** (7 deskundigen: Conversie Specialist, UX Designer, Frontend Engineer, SEO Specialist, Copywriter, Security Engineer, Accessibility Expert):
- Totaalscore: **8.2 / 10** → **8.4 / 10** (na fixes) → **8.5 / 10** (na laatste fixes)
- Beoordeeld op 51 criteria verspreid over 7 categorieën
- Top scores: Analytics (9.5), SEO (9.0), Meertaligheid (9.0)
- Verbeterpunten na fixes: Assessment subsites migratie naar Next.js (gepland), quiz 5-talig (gepland)

**5 issues geïdentificeerd en gefixt:**

**1. Input Validation + Security Headers (nieuw bestand + 4 routes + config):**
- Nieuw: `src/lib/validate.ts` — `sanitize()`, `validEmail()`, `clamp()` utilities
- Alle 3 POST API routes (contact, early-access, pro-program) voorzien van server-side validatie
- 4 security headers toegevoegd aan `next.config.ts` via `async headers()`
- Voorkomt XSS, MIME-sniffing, clickjacking

**2. Font Optimalisatie (Google Fonts CSS → `next/font`):**
- Google Fonts CSS `@import` verwijderd uit `globals.css` — elimineerde render-blocking request
- `next/font` self-hosted: `DM_Sans` + `Cormorant_Garamond` in `layout.tsx`
- CSS variables (`--font-dm-sans`, `--font-cormorant`) i.p.v. hardcoded font names
- Alle `fontFamily` referenties in 6 bestanden bijgewerkt naar `var(--font-cormorant)`

**3. Modal Focus Trap (`report-preview-modal.tsx`):**
- Volledige herschrijving met `role="dialog"`, `aria-modal="true"`, `aria-label`
- Focus trap: Tab cycled binnen modal, Shift+Tab gaat achteruit
- Focus restore: vorige focus-element opgeslagen via `previousFocus` ref, hersteld bij sluiten
- Close button auto-focused bij openen via `data-close` attribuut

**4. Form Feedback Accessibility (contact-section + early-access-section):**
- Succes-berichten: `role="status"` + `aria-live="polite"` voor screenreader announcements
- Foutmeldingen: `role="alert"` voor directe screenreader notificatie

**5. HTML Subsite SEO + Accessibility (4 HTML bestanden):**
- SEO: canonical URLs, JSON-LD Product schema (assessment-standaard $59, assessment-deluxe $129, upgrade $89)
- Quiz: `noindex`/`nofollow` (coming-soon pagina niet indexeren)
- Accessibility: skip-to-content links, `<main>` landmarks, `role="banner"`/`role="contentinfo"` op headers/footers
- Alle 4 bestanden: assessment-standaard, assessment-deluxe, upgrade, quiz

**Aanvullende fixes (ronde 2 + 3):**
- CLAUDE.md font documentatie: "Inter" → "DM Sans" (was verouderd na font wijziging)
- Training Reports mockup card: `role="button"` + `tabIndex={0}` + `onKeyDown` voor keyboard navigatie
- `testimonials-columns.tsx`: duplicate `useState/useEffect/matchMedia` code (7 regels) → shared `useReducedMotion()` hook (1 import)
- Pro Program FAQ: WAI-ARIA accordion pattern toegevoegd (`aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`)
