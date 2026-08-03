# Sessieverslag — Funnel-herinrichting Optie B + QuickScan-flow + PDF-overflow (aug 2026)

> **Volledig, gedetailleerd verslag van één grote werksessie** over twee repo's (website +
> portal). Doel: niets gaat verloren bij context-compactering. Bevat alle beslissingen,
> de onderbouwing, de nuances en de eindtoestand.

## 0. Opdracht & aanleiding

Na de versimpeling van het portfolio (één product, $79) wilde de opdrachtgever de **teksten
van de website(s) verbeteren** tot een vloeiend commercieel geheel — voor golfers van alle
leeftijden, alle niveaus (hcp 0–54) en alle achtergronden. Kernvraag: **wat is vanuit de
funnel gezien (gratis QuickScan → betaald assessment, plus pro-pagina) het meest logisch
qua taalinrichting?** Aanpak: een panel van conversiespecialisten/copywriters/marketeers.

**Harde kaders van de opdrachtgever:**
- Toon = **ingetogen-premium** met onderhuidse technieken (nudges, short stories, reflectie,
  belonging/status/FOMO). Lezer moet voelen: "dit moet ik hebben."
- **Less is more.** Kort en pakkend > lang met tierelantijnen.
- Binnen **seconden begrijpelijk**: wát het is + waarom waardevol **vóór de lezer** (niet features).
- Twee eindgevoelens: **"ja, dit wil ik!"** + **"dit ga ik iedereen laten weten!"** (deelbaarheid).
- Talen: EN + NL nu (menselijk gecontroleerd), DE/FR/ES daarna.

## 1. Het conversiepanel (multi-agent workflow)

Een workflow met **19 agents** in 5 fasen: 7 experts analyseerden de funnel-route onafhankelijk
(CRO, direct-response, premium-brand, gedragspsycholoog/nudge, plain-language, growth,
word-of-mouth), 3 sceptici verifieerden adversarieel, copy per pagina, een less-is-more/deel-
redactie, en een synthese. Bron-artefacten in scratchpad: `panel_synthese.md`, `panel_copy.md`.

**Uitkomst — Optie B "Warmte-gestuurde asymmetrie" (geaccordeerd):**
De homepage vangt GEMENGD verkeer. Eén universele route straft altijd één segment. Daarom:
koud verkeer (ads/social/organisch) → **gratis QuickScan dominant**; warm verkeer
(merk/retargeting/e-mail/pro/QuickScan-terug) → **$79-assessment dominant**. De site sorteert
op herkomst (UTM/referrer), niet de bezoeker.

**Doorslaggevend inzicht van het panel:** de winst zit NIET in de routekeuze maar in drie
"plumbing"-fixes die onder elke route juist zijn: (1) deelknop vóór de e-mailmuur met
identiteit i.p.v. score-brag, (2) /assessment met code-verwijzing + prijsanker, (3)
kortingscode als "verdiend voorrecht", niet als "deal" (beschermt het $79-anker).

## 2. Website — wat er live is (9 commits)

| Commit | Wat |
|--------|-----|
| `dbae34f` | **Blok 1**: alle EN+NL copy herschreven (home/QuickScan/assessment/pro) + consistentie-veeg |
| `ebbe0cb` | **Blok 3**: DE/FR/ES doorvertaald, consistent |
| `be4cabd` | **Blok 2**: Optie-B structuur (warmte-hero + share vóór muur + code-framing) |
| `5131665` | Cleanup: dode Early Access-code (component + 2 api-routes + translations, 543 regels) |
| `d7b4036` | QuickScan opt-in aangescherpt (7 kroonjuwelen + nudges) |
| `8b2bb06` | Scherm↔PDF-flow eerlijk + printer-friendly + koop-escape |
| `065be5c` | Domeinen-intro sober (tonen ipv doceren) |
| `1d5b99f` | Dode coming-soon-code weg (fixte ReferenceError bij elke page-load) |
| `2e30c43` | Statische fallback-checklist naar 7 punten |

### 2.1 Copy-herschrijving (35 elementen, 1-voor-1 geaccordeerd)
Kernvoorbeelden: hero-H1 "The strokes you lose aren't in your swing"; outcome-CTA "Map My
Mental Game — $79"; pricing "You've paid for lessons. This is the part they skip."; final-CTA
"You already know the feeling. Now find out why." Alle in EN+NL, DE/FR/ES doorvertaald.

### 2.2 Consistentie-veeg (belangrijke feitelijke correcties)
- Invultijd **15→20 min** (eerlijker; onderstreept "geen oppervlakkige quiz").
- **Geen "instant/direct download"** meer → "kort daarna in je inbox" (PDF wordt async
  gegenereerd, komt per mail). Reden: nooit een belofte doen die de generatie-wachttijd breekt.
- **"any device"-belofte weg** (mobiel niet 100% geoptimaliseerd — niets beloven wat niet klopt).
- "Access within 2 minutes" → "in je inbox shortly after".

### 2.3 Optie-B structuur (be4cabd)
- **Warmte-hero** (`src/lib/traffic-warmth.ts` + `page.tsx`): `detectWarmth()` bepaalt
  koud/warm uit UTM-medium/source + referrer. Default = koud (server-rendered, flikker-vrij);
  client upgradet naar warm. Alleen knopstijl + CSS-order wisselt (geen CLS). Plausible:
  `cta_click`/`quiz_click` krijgen `warmth`-prop + `hero_warmth`-event.
- **Deelknop vóór de e-mailmuur** (`quiz.html`): `buildShareSection` parametriseerbaar;
  share-blok op het resultaatscherm (euforie-piek) mét identiteit-deelbericht ("Blijkt dat ik
  de meeste slagen verlies op {zwakstePunt} — niet aan mijn swing...").
- **/assessment-brug**: "vul code QUICKSCAN10 in bij het afrekenen" (geen codeveld op de
  pagina; koopknop → Lemon-checkout). Prijsanker $150–300 pal bij de $79.

### 2.4 Opt-in aangescherpt (d7b4036, 2e30c43) — e-mail = het hoofddoel
De opdrachtgever: een afhaker zónder e-mail is waardeloos (lead voor de latere nurture-
campagne → koper). Balans: **scherm blijft waardevol, PDF = duidelijke upgrade, geen
wantrouwen, maar wel prikkelen naar opt-in.**
- **7 kroonjuwelen** in de checklist (was 4 abstracte): sterkste + 2 grootste groeikansen
  (elk 3 tips), oefeningen op maat van je handicap, fase-profiel, persoonlijk mantra,
  AI-coachingprompts, actieplan voor/tijdens/na, kortingscode. (Ook de statische fallback.)
- **Nudges verweven** (geen extra tekst): gepersonaliseerde kop "Je {domein}-plan ligt klaar"
  (JS-koppeling naar zwakste domein + fallback), open loop, wederkerigheid ("je deed 8 min het
  werk — het rapport is ons bedankje"), ownership ("Stuur mijn rapport").
- **Velden**: voornaam + e-mail in het formulier; **handicap wordt al uit de intake
  meegestuurd** (geen extra veld nodig). Rechtvaardiging: "oefeningen op maat van je handicap".

### 2.5 Koop-escape (warme koper mag direct)
Advies: koop tonen als **secundaire** deur onder de opt-in (warmte-asymmetrie), niet
gelijkwaardig. Link → `shop.mentalroutine.com/discount/QUICKSCAN10`. Op de PDF-CTA-pagina is de
koop juist de hoofdactie (lezer heeft e-mail al gegeven).

### 2.6 Printer-friendly resultaatscherm
`@media print` verbergt opt-in-muur/preview/knoppen/share en toont alleen het waardevolle
resultaat (hero + fases + domeinen) inkt-vriendelijk. + "Print of bewaar"-knop.

## 3. De waardetrap (scherm → PDF → assessment) — kloppend & eerlijk gemaakt

Cruciaal principe van de opdrachtgever: **geen valse/loze beloftes**, en de preview moet de
échte PDF weerspiegelen (geen gefantaseerde mockups).

| | Scherm (gratis, direct, ~2-3 pag) | PDF (na opt-in, ~8-10 pag) | Assessment ($79) |
|---|---|---|---|
| Domeinen zichtbaar | **2** (hoogste + laagste) | **3** (hoogste + 2 laagste) | alle 8 + 4 factoren |
| Waarde | momentopname/diagnose | volledige duiding + mantra + AI-prompts + actieplan | compleet traject + maatwerk |

**Gefixte valse beloftes:** "Bekijk je volledige profiel — gratis" → "Ontvang je uitgewerkte
plan"; radar-footnote "volledige uitsplitsing/8 domeinen in PDF" → eerlijk (sterkste + 2
groeikansen). **PDF-preview-mockup** toonde vals "5 scores + 3 meer" → nu exact: 3 domeinen
open (dynamisch gevuld: sterkste + 2 laagste) + 5 op slot + inhouds-chips (mantra/actieplan/
AI-prompts).

## 4. Het complete concept (leidend voor alle copy)

- **Shot routine = 3 fases** (pre/swing/post) — de fysieke boog die golfers al kennen.
- **Mental routine = 8 domeinen** — mentale interventie-ingangen, GEKOPPELD aan de 3 fases
  (2 pre / 2 swing / 4 post). Boodschap: golf verbeter je niet met techniek alléén, maar met
  mindset + gedrag.
- **4 beïnvloedende factoren** OMRINGEN de routine (druk/praktijk/risico/veerkracht) en kunnen
  die +/- beïnvloeden. Zitten NIET in de QuickScan (= premium, assessment-only).
- **Interne motor (NIET in copy noemen — te complex):** 8 domeinen × 5 ingangen (40) + 4
  factoren × 4 deelfactoren (16) = 56. 1 óf meerdere ingangen → maatwerk.
- **Wél de marketingboodschap:** "universele logica → uniek maatwerk. Geen twee rapporten zijn
  hetzelfde." Twee golfers met dezelfde Focus-score (68) krijgen tóch een ander plan, omdat (1)
  hun handicap verschilt en (2) hun onderliggende scores verschillen.
- **Website-principe:** de homepage LEGT het concept uit ("Just as every golfer has a physical
  pre-shot routine, there is a mental routine..."); de RESULTATEN (scherm + PDF) hoeven het niet
  uit te kauwen — tonen, niet doceren.

## 5. Portal — QuickScan-PDF (4 commits)

| Commit | Wat |
|--------|-----|
| `12936e3` | 8e stap "Leren"/"Learning" → "Transfer"; EN 5e domein "Assessment" → "Evaluation" |
| `f50499e` | **2e groeidomein** in de PDF (hoogste + 2 laagste i.p.v. 1) + assessment-upsell |
| `3f64149` | Assessment-upsell: "onderliggende factoren" + "geen twee rapporten hetzelfde" (geen getallen) |
| `4bb6921` | **Overflow structureel voorkomen** (karakterlimieten + prompt-split + compacte CTA) |

### 5.1 2e groeidomein (f50499e)
Backend bepaalt de **2 laagste** domeinen uit de 8 scores (1 bron van waarheid). Het 2e
groeidomein krijgt een volwaardige eigen pagina (tagline/scoreduiding/waarom/herkenbaar/3 tips/
mantra) + eigen AI-teksten (`groei2_*` sleutels) + AI-coachingprompts. Alles gegate op
`heeft_groei2` (backward-compat). "6 op slot" → "5 op slot".

### 5.2 Assessment-upsell (3f64149) — de belangrijkste PDF-pagina
8 emotionele statements (FOMO/pijn/status), **zonder complexe getallen** (8×5/56/40 eruit): alle
8 domeinen, 5 nog op slot, 4 factoren die routine versterken/ondermijnen, **onderliggende
factoren achter je scores**, **elke oefening/tekst uniek — geen twee rapporten hetzelfde**,
**afgestemd op scores én handicap**, 3 trainingsrapporten, stop met gissen. Upgrade via
QUICKSCAN10 ($79→$69). De 12 trainingsrapporten zijn opgebouwd op de onderliggende factoren.

### 5.3 Overflow-preventie (4bb6921) — PREVENTIEF, GEMETEN
De template gebruikt vaste A4-hoogte + `overflow:hidden` (elke sectie = 1 pagina). Bij te lange
AI-tekst werd tekst AFGEKAPT (halve zinnen). Eisen opdrachtgever: **geen halve zinnen én geen
half-lege pagina's**. Oplossing:
- **Karakterlimieten** (niet woorden — te variabel) in alle AI-tekstvelden, gekalibreerd op de
  max-die-past **MIN ~12% marge** ("als je het maximum weet, blijf je er altijd binnen").
- **AI-prompt-pagina gesplitst**: bij 2 groeidomeinen 2 VOLLE vellen (kracht+groei1 | groei2)
  i.p.v. 9 blokken op 1 pagina. Geen halve zin, geen half-lege pagina.
- **CTA-pagina compacter** (marges/line-heights) + disclaimer ingekort (727→~450 tekens).
- **Paginanummers** conditioneel (10 pag met groei2, 8 zonder).
- **MEETINSTRUMENT:** `scratchpad/stress_chars.py` rendert de template lokaal met WeasyPrint met
  ELK veld op max → moet 0 overflow geven (page-divs == PDF-pagina's). Bewijs: 10=10, 0 overflow.
  Visueel gecontroleerd (CTA + reflectie): past, hele zinnen, premium witruimte.
  **Bij toekomstige PDF-tekstwijzigingen: draai deze stress-test opnieuw vóór commit.**

## 6. Deploy-status

- **Website**: alle commits op `origin/main` → Vercel auto-deploy. LIVE.
- **Portal**: `4bb6921` GEDEPLOYED (3 aug). Deploy = server `ubuntu@ip-10-0-6-89`, pad
  `/var/www/mentalroutine/backend`, `git pull origin main` +
  `sudo systemctl restart mentalroutine.service mentalroutine-celery.service` (beide `active`).
  Services: `mentalroutine.service`=FastAPI, `-celery.service`=worker (async PDF-generatie —
  moet mee herstarten), `-celery-beat`=scheduler, `-frontend`=Next.js.

## 7. Openstaand / vervolg

- **Eindtest**: één echte QuickScan doen + de live-gegenereerde PDF bekijken (Transfer, $79/$69,
  3 domeinen, 2e groeikans-pagina, geen overflow bij echte AI-tekst).
- **Nurture-campagne** (8–12 e-mails): NOG NIET GEBOUWD. De grootste openstaande kans — de leads
  komen nu binnen, maar de opvolging naar kopers ontbreekt. Kan de QuickScan-data gebruiken
  (zwakste domein, handicap) + de kortingscode QUICKSCAN10.
- **Losse observatie** (buiten scope, portal): `fase_swing_interpretatie` beschrijft de Swing-fase
  met Evaluatie-taal ("objectief waarnemen richting/vlucht") — bestaande prompt-onnauwkeurigheid.

## 8. Belangrijke principes/valkuilen voor de toekomst

- **quiz.html i18n**: elke tekst staat op 2-3 plekken — statische HTML-default + NL-object +
  EN-object. Bij wijziging ALLE bijwerken (anders flikkert de fallback). `buildOptinChecklist`
  vervangt de checklist via innerHTML (niet via applyI18n) → de statische fallback moet apart mee.
- **Portal deployt NIET automatisch** (los van Vercel) — SSH pull + service restart, celery-worker mee.
- **Getallen in copy vermijden** (8×5/56 etc.) — verkoop de uitkomst (maatwerk), niet het mechanisme.
- **Nooit beloven wat het product niet levert** (instant download, any device, "volledige profiel gratis").
- **PDF-overflow**: altijd de stress-test draaien; karakterlimieten met marge, geen woordlimieten.
