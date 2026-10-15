# Archief — homepage vóór de QuickScan-funnel (okt 2026)

In oktober 2026 is de homepage omgebouwd van "drie deuren" (QuickScan / assessment kopen / pro) naar
**één doel: de gratis QuickScan**. Messaging volgt het *Entry Narrative Framework v1.5* (Berend & Henk,
23-9-2026; `src/lib/narratives.ts`). Dit document legt vast wat er van de homepage is verdwenen, waar
het nog staat en waar het hergebruikt kan worden.

## Terugrollen

- **Git-tag `homepage-pre-funnel-2026-10`** = de live versie vóór de ombouw (commit `323678b`).
- Oude homepage bekijken: `git show homepage-pre-funnel-2026-10:src/app/page.tsx`
- Volledig terug: `git revert` van de funnel-commit(s), of `main` terugzetten naar de tag.

## Wat er van de homepage af is — en waar het nog staat

De teksten staan nog **gewoon in `src/lib/translations.ts`** (alle 5 talen), behalve waar anders vermeld.
Ze worden alleen niet meer op de homepage getoond.

| Blok (oude homepage) | Translation-key | Status | Hergebruik-idee |
|---|---|---|---|
| Hero "The strokes you lose aren't in your swing" + 3 deuren | `hero.*` | in translations; **niet meer gebruiken** (overclaim volgens framework) | — |
| Onderzoek: "You can't train what you're not aware of" + 3 stats (90% / 1000+ / 56) + Nicklaus-quote | `research.*` | in translations | `/methodology`, nurture-mail over de onderbouwing, pro-pagina |
| De 8 stappen met uitleg per stap | `routine.*` | in translations (radar gebruikt `routine.steps`) | `/methodology`, nurture-mails per groeikans, social-serie "1 stap per week" |
| 3-stappenproces (Assessment → Profiel → Actie) | `process.*` | in translations | `/assessment` (verkooppagina warme leads) |
| De 4 beïnvloedende factoren met scenario's | `dimensions.*` | in translations | **onder water houden** (framework); hooguit in rapport/portal of `/methodology` |
| "Why it works" (4 kaarten) | `whyItWorks.*` | in translations | `/assessment` |
| Pricing-kaart $79 + garantie + vergelijking met psycholoog | `pricing.*`, `guarantee.*` | in translations; `/assessment` gebruikt `pricing.plans` | `/assessment` |
| Trainingsrapporten + mockup + voorbeeldrapporten-modal | `skillBuilder.*` | in translations; voorbeelden in `public/reports/` | `/assessment`, nurture-mail "wat zit er in een trainingsrapport" |
| Slot-CTA "You already know the feeling. Now find out why." | `cta.*` | in translations | `/assessment` |
| Productgerichte FAQ (7 vragen) | `faq.*` | in translations; `/assessment` toont er 5 | `/assessment` (de homepage heeft nu QuickScan-vragen: `home.faq`) |
| Herkomst-warmte-logica (Optie B) | `src/lib/traffic-warmth.ts` | **verwijderd** (zit in de tag) | vervalt: de site verkoopt niet meer direct |
| Koopbalk onderaan | — | vervangen door een QuickScan-balk | — |

## Echt verwijderd (niet hergebruiken)

- **De 9 testimonials** (`testimonials.*`, `components/ui/testimonials-columns.tsx`) en de
  **pricing-quotes** ("Robert M." / "Willem B.") waren **fictief**, met stockfoto's van randomuser.me.
  Verzonnen klantervaringen als echt presenteren is misleidende reclame (EU/FTC) en botst met het
  framework. Vervangen door échte ervaringen zodra die er zijn (bv. goedgekeurde feedback uit de portal).
- **NogBeterGolfen** (footer, FAQ, link naar nogbetergolfen.nl): alleen nog MentalRoutine-branding.
- **"golfpsycholoog en coach"** bij Henk: Henk is **initiatiefnemer van MentalRoutine** (geen coach,
  psycholoog of PGA-pro).
