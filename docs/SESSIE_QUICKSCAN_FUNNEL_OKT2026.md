# Sessieverslag — QuickScan-funnel, Entry Narratives & QuickScan-rapport (15 okt – 2 nov 2026)

> **Volledig, gedetailleerd verslag** van een reeks werksessies over twee repo's — de **website**
> (`C:/Users/beren/Documents/Claude website MR 01`, repo `mentaleroutine/website`, Vercel) en de **portal**
> (`C:/Users/beren/Documents/NewAssessmentPortal`, repo `mentaleroutine/portal`, eigen server). Doel: niets gaat
> verloren bij context-compactering. Bevat elk besluit met de reden, de eindtoestand per onderdeel, alle
> commits, incidenten + lessen, testhulpmiddelen, terugrollen en wat nog openstaat.
>
> **Status 2-11-2026: alles LIVE.** Website: laatste functionele commit `054b401`. Portal: `3a6cf28` gepusht —
> de deploy daarvan (git pull + herstart + frontend-build) moet de opdrachtgever nog draaien; eerdere stand
> `cf2a2b4` staat live (health `healthy`, migratie `026_quiz_entry_route_multi` = head).

---

## 0. Aanleiding en uitgangspunten

De homepage bood drie gelijkwaardige deuren (QuickScan · assessment $79 kopen · pro-programma) en geen van de
drie converteerde — "het is gewoon teveel". Doel: **de site informeert en heeft één CTA: doe de gratis
QuickScan**; opt-ins worden via de (al bestaande, AI-gegenereerde) nurture-reeks van 12 mails kopers.

Uitgangsmateriaal: **Entry Narrative Framework v1.5** (Berend & Henk, 23-9-2026; PDF, niet in een repo):
3 groepen (Performance / Emotion & Experience / Development) → 12 entry narratives → 48 sub-narratives →
48 primary hooks → 48 lead executions + C8-experimenten. Kernregels die overal zijn toegepast:
- **herkennen, niet diagnosticeren** ("marketing herkent het verschijnsel; MentalRoutine onderzoekt het patroon");
- **geen overclaiming**: geen "strokes lost by mindset"/"dit kost je slagen"-claims zonder meetdata;
- geen persona's (één golfer kan op meerdere narratives resoneren); handicap-neutraal; niet pushy;
- de 4 beïnvloedende factoren blijven **onder water** in de marketing (wel genoemd waar het betaalde product
  wordt uitgelegd).

Vaste feiten (door de opdrachtgever bevestigd): **Henk de Jong = initiatiefnemer van MentalRoutine** — niet
coach, niet (golf)psycholoog, nooit PGA-pro ("PGA-netwerk" klopt wél). **Alleen MentalRoutine-branding**
(NogBeterGolfen weg). "1.000+ golfers onderzocht sinds 2016" klopt. "4.9/5" op de QuickScan heeft een bron.

---

## 1. Alle besluiten (chronologisch, één voor één met de opdrachtgever genomen)

| # | Vraag | Besluit | Reden |
|---|---|---|---|
| 1 | Assessment nog direct kopen op de site? | **Nee — de site verkoopt niets.** | Scherp kiezen; elke koper eerst in de lijst; funnel meetbaar. Wie al overtuigd is kan ná de QuickScan door (zie 24). |
| 2 | Pro-programma op de homepage? | **Alleen één footer-link**; `/pro-program` blijft bestaan. | Stoort de golfer niet; een pro die zoekt vindt het. |
| 3 | Lengte homepage | **Kort** (hero · herkenning · 3 momenten · team · FAQ · contact). | De site hoeft alleen een gratis scan te "verdienen"; overtuigen gebeurt in resultaat + mails; diepgang op `/methodology`. |
| 4 | Doelgroep | Geen persona's — **de 12 entry narratives**. | Framework. |
| 5 | Narratives op de homepage | Sectie **"Herken je dit?"** + `?route=` in de URL wisselt de hero-hook (advertenties). | Spiegel i.p.v. keuzemenu; meetbaar per route; ads landen op dezelfde boodschap zonder aparte pagina's. |
| 6 | Talen | Eerst EN + NL, daarna DE/FR/ES. | NL door Henk goed te keuren. (Beide gedaan.) |
| 7 | `/assessment` | **Blijft** als verkooppagina voor warme leads (niet in menu). | Twijfelaar heeft een plek om overtuigd te raken. (Pas op 2-11 echt aangesloten, zie 24.) |
| 8 | Hero zonder `?route=` | **Hook P1.1**: "You hit plenty of good shots. So why does the scorecard still tell a different story?" | Breedste herkenning, spiegel, geen claim; exacte (bevroren) frameworktekst. |
| 9 | 9 testimonials + pricing-quotes ("Robert M."/"Willem B."), randomuser.me-foto's | **Fictief → verwijderd** (homepage én `/assessment`). | Misleidende reclame (EU/FTC); botst met framework. |
| 10 | Foto/feiten Henk; NogBeterGolfen | Geen foto. NogBeterGolfen overal weg (footer, FAQ, link). Henk overal "initiatiefnemer". | Eén merk; feitelijk. |
| 11 | Dubbeling homepage ↔ eigen landing van `/quickscan` | **De homepage is de landing**; de QuickScan start direct bij hole 1 (`?start=1`). | Anders twee verkooppagina's na elkaar. |
| 12–15 | Claims op de QuickScan-pagina ("Niet je swing", "wat je écht slagen kost", "welk domein kost je de meeste slagen", "je laat slagen liggen") | **Herschreven** naar herkenning ("Een ronde is meer dan je swings", "je sterkste punt + grootste groeikans"). "4.9/5" en "PGA-netwerk" blijven (kloppen). | Overclaim; de QuickScan meet geen slagen. |
| 16 | Henks golfer-voice-review (PDF "Golfer-voice alternatives") | **Overgenomen**: groepsregels, 12 narratives, 48 sub-narratives in golferstaal; hooks bleven v1.5. | P2 = "It's not my swing that costs me shots." (golfer zegt het zelf → herkenning). |
| 17 | NL-vertalingen | **Goedgekeurd door Henk.** | Lijst: `docs/NL_TEKSTEN_HOMEPAGE_HENK.md`. |
| 18 | Route-ID naar portal + nurture | **Gebouwd** (portal migratie 025). | Conversie per narrative meetbaar; mails sluiten aan bij wat de golfer herkende. |
| 19 | Eén narrative aanklikken of meerdere aanvinken? | **Checkboxes + één startknop**; alle vinkjes gaan mee (`?route=P1,E2,D3`), opgeslagen (migratie 026). | Rijkere info; mensen herkennen zich vaak in meerdere narratives. |
| 20 | Waar gaan de overige CTA's heen? | **Allemaal naar "Herken je dit?"** (`#recognise`); de QuickScan start alleen na ≥1 vinkje. Advertentie-route vinkt de zin alvast aan; de subroute (`P4.2`) blijft behouden. | Anders start de QuickScan zonder narratives. |
| 21 | `/quickscan` direct (oude links, bio, deellinks) | **307-redirect naar `/#recognise`** (taal mee via `?lang=`); oude landing vervalt; uit de sitemap. | Elke QuickScan heeft narratives. |
| 22 | Site begon altijd in het Engels | **Taaldetectie**: `?lang=` → eerder zelf gekozen taal (onthouden) → browsertaal → EN. | NL/DE/FR/ES-bezoekers zagen eerst Engels. |
| — | Groepsregel Prestatie (NL) | "Ik wil lager scoren" → **"Ik wil minder slagen maken."** (FR "Je veux jouer moins de coups."; EN/DE/ES zeiden al "minder slagen"). | Opdrachtgever. |
| 23 | QuickScan-resultaatscherm beloofde dingen van het betaalde product | **Gecorrigeerd** na audit scherm ↔ gratis PDF (details §3.3). | Scherm, mail en PDF zeggen nu hetzelfde. |
| 23b | Benchmark "Gemiddelde golfer 5.2 · Top 25% 6.8+" | **Blijft staan** (besluit opdrachtgever). | Let op: volgens `README_QUIZ_FUNNEL.md` een **fictieve** benchmark; ook in de nurture-prompt. |
| 23c | Deelknoppen in de QuickScan (bedankscherm én resultaatscherm) | **Weg.** | Opdrachtgever. |
| 23d | QUICKSCAN10 verliep 31-10 | **Geldig t/m 31-12-2026** (PDF-tekst + door de opdrachtgever in Lemon Squeezy aangepast). | |
| 24 | Hoe komen mensen bij `/assessment`? | Besluit 7 alsnog uitgevoerd: QuickScan "Al overtuigd?" → `/assessment?lang=`; nurture- en QuickScan-PDF-mail → `/assessment?lang=` (was de Lemon-checkout); **één stille link onder de homepage-FAQ** + (24b) **footer-menuregel "Het volledige assessment"**. | Twijfelaars zien eerst voorbeelden, garantie, QUICKSCAN10; overtuigde kopers 1 klik extra. |
| 25 | Kop `/assessment` "Elke slag die je hoofd je kost" | **"Eén assessment. Je hele mentale spel, stap voor stap."** + intro, feature en brug zonder slagen-claims (5 talen). | Twijfelaars landen nu hier; framework. |
| 26 | QuickScan-rapport te klinisch | **Rijker, 11 pagina's** (details §4.2): welkom + aangevinkte zinnen als rode draad, "wat zit erin / wat niet", scenario's in jij-vorm, 1 zachte teaser per inhoudspagina, energiekere toon; lengtebewaking + worst-case-test. | Het rapport is DE leadgenerator. |
| 27 | Hetzelfde e-mailadres twee keer de QuickScan | **Nieuwe scan vervangt de lopende nurture-reeks** (nooit twee tegelijk); geen reeks bij uitgeschreven/onderdrukt of al klant. | PDF en mails moeten over dezelfde scores gaan. |
| — | Profielrapport (betaald) noemde een echte tourspeler | Verhaal over een **naamloze clubgolfer**; EN-kop "From the game". | Verzonnen details over echte mensen kloppen vaak niet. |

---

## 2. Website — eindtoestand

### 2.1 Homepage (`src/app/page.tsx`)
1. **Hero** — badge "Free MentalRoutine QuickScan", hook (P1.1, of de hook van `?route=`), knop
   "Take the free QuickScan" → `#recognise`, "9 holes · 8 minutes · free · your report by email", trust
   "Research with 1,000+ golfers since 2016", radar (voorbeeldprofiel).
2. **`#recognise` "Herken je dit?"** — 3 kolommen (groepsnaam + groepsregel) × 4 narratives als **checkboxes**;
   teller "{n} aangevinkt"; knop "Start de QuickScan" (uit tot ≥1 vinkje) → `quickscanUrl(lang, "P1,E2")`.
   Advertentie-`?route=P4.2` vinkt P4 voor en geeft bij de start `P4.2` mee.
3. **`#how-it-works`** — "Elke slag kent drie momenten" (pre-shot/swing/post-shot, géén stappen/factoren/
   aantallen) + link `/methodology`.
4. **`#team`** — Henk (initiatiefnemer, 40+ jaar golfer, PGA-netwerk) + Berend (psychometrisch expert), quote Henk.
5. **`#faq`** — 5 QuickScan-vragen (`home.faq`, ook de FAQ-JSON-LD in `layout.tsx`), daaronder de **stille link**
   naar `/assessment?lang=`, dan de slot-CTA.
6. Contact · **footer** (menu: Gratis QuickScan → `#recognise` · Hoe het werkt · De methodiek · **Het volledige
   assessment** · FAQ · Contact; pro-link; "Een initiatief van Henk de Jong") · sticky QuickScan-balk.

Alle CTA's (hero, slot, sticky, footer, navbar op elke pagina = `/#recognise`, `/methodology`) leiden naar
`#recognise`; de QuickScan start alleen daar. Weg van de homepage (teksten grotendeels nog in
`translations.ts`, hergebruik: `docs/ARCHIEF_HOMEPAGE_OKT2026.md`): pricing, trainingsrapporten, 8 stappen,
factoren, why-it-works, warmte-logica (`traffic-warmth.ts` verwijderd), testimonials (component verwijderd).

### 2.2 Bestanden
- `src/lib/narratives.ts` — 3 groepen · 12 narratives (`statement`) · 48 `subs` · 48 `hooks`, **5 talen**
  (`Text = {en,nl,de,fr,es}`); `resolveRoute("P4.2" | "P4")`, `pick()`, `DEFAULT_ROUTE = "P1.1"`.
- `src/lib/quickscan.ts` — `quickscanUrl(lang, route)` → `/quickscan?start=1&lang=nl|en[&route=P1,E2]`.
- `src/lib/translations.ts` — `home.*` (5 talen) incl. `recognise.start/selected`, `assessmentLink`;
  `footer.assessment`; `assessmentPage` (nieuwe kop/intro/brug); NL stap 6 overal "Acceptatie".
- `src/context/lang-context.tsx` — taaldetectie (`?lang` → localStorage `mr_lang` → `navigator.languages` → EN;
  SSR/eerste render EN, daarna de gedetecteerde taal — korte flits is bekend).
- `src/components/ui/navbar.tsx` — links `/#…`; knop "Gratis QuickScan" → `/#recognise` (`cta_click{source:"nav"}`).
- `src/components/ui/faqs.tsx` — optionele `content`-prop (homepage `home.faq`, `/assessment` de product-FAQ).
- `src/app/layout.tsx` — titel/omschrijving/OG = QuickScan (P1.1); FAQ-JSON-LD = `home.faq`.
- `src/app/methodology/page.tsx` — één CTA → `/#recognise`; koopdeur weg.
- `src/app/assessment/page.tsx` — fictieve quote weg; kop A (besluit 25).
- `next.config.ts` — redirects: `/quiz.html` → `/quickscan` (308); `/quickscan` **zonder `route`** → `/?lang=:lang#recognise`
  of `/#recognise` (307). `src/app/sitemap.ts` zonder `/quickscan`.

### 2.3 QuickScan-pagina (`public/quiz.html`, NL/EN)
- `?start=1` → opent hole 1 (autostart als **laatste** stap van het script, met vangnet terug naar de landing).
- `MR_ROUTE` uit `?route=` (lijst; alleen geldige `[PED][1-4](.[1-4])?`, ontdubbeld, max 12; anders `'none'`) →
  Plausible-prop `route` op `quiz_start/_complete/_optin` + `entry_route` in `POST /api/quiz/results`.
- Resultaatscherm (besluit 23): "Concrete tips die passen bij jouw spel en niveau" (niet "oefeningen op maat van je
  handicap"); "Ontvang je uitwerking van {stap}" (niet "{stap}-plan ligt klaar"); "persoonlijke rapport" (niet
  "volledige"); geen voorbeeld-trainingsrapport onder "Dit ontvang je"; scorebadges = portalbanden
  **Groeipunt (<4.0) / Werkgebied (4.0–6.9) / Sterkte (7.0+)**; "stap" i.p.v. "domein", stap 8 **Transfer**, EN
  **Evaluation**; tag "Grootste groeikans" i.p.v. "Zwakste"; PDF-mockup vertaalbaar; vergrendelde balken vaste lengte;
  **geen deelknoppen** meer; "Al overtuigd?" → `/assessment?lang=`.
- De eigen landing (hero/pijn/"dit krijg je") is herschreven maar alleen nog bereikbaar met `?route=`(zonder `start`).

### 2.4 Analytics (Plausible, site mentalroutine.com)
Events: `narrative_click{route}` (per vinkje) · `hero_route{route}` · `cta_click{source}` (hero/final/sticky/footer/
nav/methodology → `#recognise`) · `quiz_click{source:"recognise",route,count}` (echte start) · `quiz_start/
_complete/_optin{route}` · `assessment_click{source: home-faq|footer|quiz-optin-escape}` · `checkout_click`
(alleen nog op `/assessment`) · `section_view` (recognise, how-it-works, team, faq, contact) · `scroll_depth` ·
`faq_open` · `methodology_click`. Vervallen: `hero_warmth`, homepage-`checkout_click`, oude secties.
**Dashboard nog handmatig in te richten (opdrachtgever, stap voor stap):** (1) custom property `route`;
(2) goals `narrative_click`, `hero_route`, `assessment_click` erbij, `hero_warmth` weg; (3) funnel
"Herkenning" `narrative_click → quiz_start → quiz_complete → quiz_optin`; (4) "Assessment Checkout" → pageview
`/assessment` → `checkout_click`. **Stand 2-11: stap 1 nog niet gedaan.**

---

## 3. Portal — eindtoestand

### 3.1 Entry route (migraties 025 + 026)
- `quiz_sessions.entry_route` String(64), nullable, index — komma-lijst (`P1,E2,D3`) of één advertentie-route.
- `services/entry_narratives.py` — 12 statements NL/EN (kopie van website-`narratives.ts`: **bij wijziging daar
  ook hier bijwerken**), `normalize_route` (per code valideren, ontdubbelen, max 12), `narrative_ids`,
  `statements`, `statement`.
- `routers/quiz.py` — `/quiz/results` slaat de route op (vóór opt-in, dus ook anonieme invullingen); de opt-in
  geeft `entry_route` via `quiz_task.genereer_quiz_rapport_taak` door aan de PDF.

### 3.2 Nurture (`services/nurture_service.py`)
- Profiel: "Herkende zich bij binnenkomst in: "…" (P3); "…" (E1)"; prompt: mail 1 = rode draad, latere mails
  pakken de andere zinnen op — herkenning, geen diagnose.
- Koop-links → `assessment_url(lang)` = `https://www.mentalroutine.com/assessment?lang=nl|en` (was Lemon-checkout).
  Reeksen van vóór 2-11 houden hun Lemon-link.
- **Zelfde adres (besluit 27)**: `mag_reeks_starten` → geen reeks bij onderdrukt, uitgeschreven
  (`unsubscribed`/`stopped_unsub`) of al klant (`TrainingReportGrant.grant_source == "included"` op het account, of
  eerdere `stopped_purchase`). Anders: nieuwe reeks genereren en **pas daarna** de lopende reeks op dat adres
  `replaced` maken (pending mails `cancelled`; `stop_sequence(..., behalve_id=)`). `replaced` telt niet mee in
  `conversie_pct` en de funnel; admin toont 'm grijs.

### 3.3 Mail + PDF consistent (besluit 23)
QuickScan-mail: "sterkste stap + je twee grootste groeikansen: duiding, 3 tips en een mantra" (geen "oefening"),
"stap" i.p.v. "domein", link naar `/assessment?lang=`. PDF: `www.mentalroutine.com` i.p.v. het gesloopte
`shop.mentalroutine.com`; QUICKSCAN10 t/m 31-12-2026.

### 3.4 Admin
- `/admin/quickscans` + CSV: route per invulling ("NL · P1,E2").
- `/admin/nurture-conversie` → `per_route` (QuickScans · opt-ins · sequences · kopers per narrative; een golfer telt
  in **elke** aangevinkte rij; subroutes bij hun narrative; zonder route = `direct`) + `per_route_totaal` (uniek,
  `met_meerdere`). Admin-pagina: tabel **"Funnel per herkenningszin"** (5 talen) met totaalregel van de backend.

---

## 4. QuickScan-rapport (het gratis PDF) — de leadgenerator

### 4.1 Wat het wel/niet bevat
Wel: 3 fases, 8 stappen (sterkste + 2 grootste groeikansen uitgewerkt, 5 op slot), actieplan, AI-prompts.
**Niet**: de 4 beïnvloedende factoren, de 5 onderdelen per stap, trainingsrapporten — die zitten in het betaalde
assessment. Dat staat nu expliciet in het rapport, met de nuance dat het volledige assessment dieper kijkt en
**andere scores kan geven**.

### 4.2 Opbouw (11 pagina's)
1. Cover (AI-titel + intro; handicap als "18").
2. **Welkom** (nieuw): AI-welkomstbrief; "Dit herkende je zelf" (max 4 aangevinkte zinnen + "en nog N andere") met
   AI-duiding (herkenning, geen oorzaak); leeswijzer (5 punten); blok **"Wat zit er in deze QuickScan — en wat
   niet"** + nuance-zin; "Over de MentalRoutine" alleen zonder aangevinkte zinnen (ruimte).
3. Shotroutine (3 fases) + **"Wat valt op?"** + teaser (factoren).
4. De 8 stappen.
5. Kracht — scoreduiding, **scenario in jij-vorm** op een baanmoment (op maat van score + handicap), tips, teaser.
6. Grootste groeikans — duiding, "wat levert het op" (rust, keuzes, plezier, mogelijk enkele slagen — nooit
   "kost slagen"), scenario, tips, mantra, teaser.
7. Tweede groeikans — idem.
8–9. Reflectie + AI-prompts. 10. Actieplan. 11. Slotpagina (QuickScan vs volledig assessment, QUICKSCAN10,
   disclaimer zonder "gevalideerde").

### 4.3 Lengtebewaking (belangrijk)
Elke pagina is vast A4; **te lange tekst valt niet weg maar levert een extra, halflege pagina op** (les uit de
worst-case-test). Daarom:
- elke AI-veldregel in de prompt heeft `(max N tekens)`;
- `limieten_uit_prompt(prompt)` leest die limieten; `begrens_teksten`/`kort_in` kappen het AI-antwoord netjes af
  (op een zinseinde, anders woord + "…") — één bron van waarheid;
- `tests/test_quickscan_rapport_layout.py` + `backend/scripts/quickscan_check/quickscan_worstcase.py`: elk veld tot
  de limiet → exact **11 pagina's** (NL/EN × 0/4/12 zinnen). **Nieuw/langer veld = limiet in de prompt + test.**

---

## 5. Incidenten en lessen
- **Lege QuickScan-pagina (15-10, fix `396fe8a`)**: de `?start=1`-autostart draaide vóór het "INITIAL DISPLAY"-
  blok aan het eind van het quiz-script, dat `#phase-quiz` weer verborg → elke klik vanaf de homepage gaf een
  lege pagina tot de opdrachtgever het meldde. Fix: autostart als laatste stap + vangnet. Plausible telt voor
  15-10 te veel `quiz_start`. **Les: wijzigingen aan quiz.html/de funnel eerst in een echte browser testen** →
  `scripts/e2e/funnel-check.js`.
- **Worst-case-criterium**: de eerste versie vergeleek twee paginatellingen die allebei te hoog waren; nu een
  vaste verwachting (11).
- **Scratchpad-map is tijdelijk** (werd tussendoor leeggemaakt): testhulpmiddelen staan nu in de repo's (§6).

## 6. Testhulpmiddelen
- **Website** `scripts/e2e/funnel-check.js` (+ README): 41 controles in Chromium (homepage, vinkjes, routes,
  CTA's, redirects, taaldetectie, volledige QuickScan NL/EN tot het resultaatscherm, wegen naar `/assessment`);
  portal-verzoeken geblokkeerd. Laatste run live 2-11: **ALL CHECKS PASSED**.
- **Portal** `backend/scripts/quickscan_check/` (+ README): `quickscan_worstcase.py` (geen AI-kosten) en
  `quickscan_sample.py` (één echt rapport; OpenAI-sleutel uit de website-`.env.local` als env-var meegeven;
  `REUSE=1` hergebruikt de AI-teksten).
- **Portal pytest**: **571 passed, 7 skipped** (o.a. `test_entry_route.py`, `test_quickscan_rapport_layout.py`,
  `test_nurture_zelfde_adres.py`).

## 7. Commits

**Website** (`main`): `c167d73` funnel-homepage · `bb2f02a` golfer voice · `f1f4b56` DE/FR/ES + route naar portal ·
`217aa19` methodology zonder koopdeur · `396fe8a` fix lege QuickScan · `9259d3d` checkboxes · `6f9f523` alle CTA's
→ narratives · `8f6a111` `/quickscan`-redirect + taaldetectie · `e4a5f43` "minder slagen" · `742369b`
resultaatscherm-audit · `ae4dce2` geen deelknoppen · `dac445e` wegen naar `/assessment` · `17d5889` kop
`/assessment` · `054b401` footer-link · plus docs-commits.

**Portal** (`main`): `26d0e6b` entry_route (025) + nurture + admin · `f0e68f6` profielverhaal zonder echte speler ·
`589ce92` admin-funnel-tabel · `e7589a2` meerdere routes (026) · `629e2c4` mail + PDF kloppen · `a601d64`
links naar `/assessment` · `cf2a2b4` rijker QuickScan-rapport · `3a6cf28` één reeks per adres · plus docs-commits.

## 8. Deploy en terugrollen
- **Website**: push naar `main` → Vercel. Terugrollen: tag **`homepage-pre-funnel-2026-10`** (= `323678b`, ook op
  GitHub) — `git revert` van de commits, of in overleg `main` terugzetten.
- **Portal**: `cd /var/www/mentalroutine && git pull && source venv/bin/activate && cd backend && alembic upgrade
  head && cd .. && sudo systemctl restart mentalroutine mentalroutine-celery mentalroutine-celery-beat && cd frontend
  && npm run build && sudo systemctl restart mentalroutine-frontend`; check `curl -s http://127.0.0.1:8000/api/health`.
  Terug: `alembic downgrade 024_report_summary_key` (026 kort meervoudige routes in tot de eerste) + revert.

## 9. Openstaand
1. **Portal-deploy van `3a6cf28`** (één reeks per adres + grijze admin-badge): git pull, herstart, frontend-build.
2. **Plausible-dashboard** (§2.4) — stap 1 (property `route`) nog niet gedaan.
3. **Server-reboot** (Ubuntu "System restart required" + beveiligingsupdates) op een rustig moment; daarna `/api/health`.
4. **Echte test** van het nieuwe QuickScan-rapport (eigen adres, een paar vinkjes): let op "QuickScan" i.p.v.
   "Snapshot", jij-vorm in de brief, geen "committen" (laatste prompt-aanpassingen zijn niet met de AI hertest).
5. **DE/FR/ES native review** — twijfels: FR "partie" vs "parcours"; FR "Progression"; ES "resultado" vs "score";
   DE "Ich will weniger Schläge spielen."; groepsnamen; DE/ES "Initiator/Iniciador"; DE E2.4 "neu ansetzen";
   **FR-aanspreekvorm**: homepage "vous", `/methodology` "tu" — gelijktrekken.
6. **"4.9/5"** op de QuickScan-landing: bron + aantal beoordelingen erbij (opdrachtgever levert aan).
7. **Benchmark "5.2 / top 25% 6.8+"** is fictief maar blijft op verzoek staan (ook in de nurture-prompt).
8. **De 48 sub-narratives** worden nog nergens getoond (bedoeld voor ads/mails); C8-experimenten niet in de data.
9. **Ongebruikte translation-keys** (oude homepage-blokken) — bewust laten staan; opruimen kan later.
10. Hero-radar geeft in de browser `<circle> cx/cy undefined`-consolemeldingen (cosmetisch, bestond al).
11. Untracked geneste map `Claude website MR 01/Claude website MR 01/` geeft lokale tsc-fouten (niet in git) —
    opruimen of excluden.
