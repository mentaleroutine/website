# Funnel-check (browsertest)

`funnel-check.js` test de hele funnel in een echte (headless) browser: homepage → 12 herkenningszinnen
(checkboxes) → QuickScan → resultaatscherm → wegen naar `/assessment`. Verzoeken naar de portal worden
**geblokkeerd**, dus er komt niets in de productie-database. Plausible-events worden onderschept en
gecontroleerd.

## Eenmalig installeren (node_modules staan in .gitignore)

```bash
cd "scripts/e2e"
npm init -y >/dev/null && npm i playwright@1
npx playwright install chromium
```

## Draaien

```bash
# lokaal (in de repo-root eerst: npx next dev -p 3123)
BASE=http://localhost:3123 node scripts/e2e/funnel-check.js
# live
BASE=https://www.mentalroutine.com node scripts/e2e/funnel-check.js
```

Uitvoer: per controle `OK`/`FAIL`, afsluitend `ALL CHECKS PASSED` (exitcode 0) of het aantal fouten.

## Wat er gecontroleerd wordt

1. Hero toont hook P1.1; startknop uit tot ≥1 vinkje; teller; `narrative_click` per vinkje; start →
   `/quickscan?start=1&lang=en&route=P1,E2`; quiz staat op hole 1; `quiz_start` draagt de route.
2. Alle CTA's (hero, navbar, `/methodology`) → `#recognise`; `?route=P4.2` wisselt de hero-hook, vinkt P4 aan
   en houdt de subroute bij de start (`P4.2,E1`).
3. `/quickscan` zonder route → 307 naar `/?lang=…#recognise` (taal blijft).
4. Taaldetectie: browser nl/de/fr/es → eigen taal, overig → EN.
5. Volledige QuickScan (NL + EN): resultaatscherm, scorebadges = portalbanden, stap 8 = Transfer, geen
   deelknoppen, geen voorbeeld-trainingsrapport, geen "oefeningen op maat van je handicap", "Al overtuigd?" →
   `/assessment?lang=…`.
6. Stille wegen naar `/assessment` (FAQ-link + footer), kop zonder overclaim, QUICKSCAN10 zichtbaar.

**Draai dit na elke wijziging aan `public/quiz.html`, `src/app/page.tsx`, de navbar of de redirects** — het
lege-QuickScan-incident van 15-10-2026 (zie `docs/SESSIE_QUICKSCAN_FUNNEL_OKT2026.md`) was zo in één run gevonden.
NB: de hero-radar geeft in dev-mode `<circle> cx/cy`-consolemeldingen; die tellen niet als fout (alleen
`pageerror`).
