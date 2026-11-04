# Sessieverslag — QuickScan-funnel, Entry Narratives, QuickScan-rapport & voorbeeldrapporten (15 okt – 2 nov 2026)

> **Volledig, gedetailleerd verslag** van een reeks werksessies over twee repo's — de **website**
> (`C:/Users/beren/Documents/Claude website MR 01`, repo `mentaleroutine/website`, Vercel) en de **portal**
> (`C:/Users/beren/Documents/NewAssessmentPortal`, repo `mentaleroutine/portal`, eigen server). Doel: niets gaat
> verloren bij context-compactering. Bevat elk besluit met de reden, de eindtoestand per onderdeel, alle
> commits, incidenten + lessen, testhulpmiddelen, terugrollen en wat nog openstaat.
>
> **Status 2-11-2026 (middag): alles LIVE.** Website: laatste functionele commit `7bb2604` (voorbeeldrapporten,
> Vercel). Portal: server op `88a252a` (git pull + herstart backend/celery door de opdrachtgever; geen migratie,
> `026_quiz_entry_route_multi` = head). **Voorbeeldrapporten (`/samples`) staan in §10** — inclusief hoe je een
> voorbeeld vervangt en wat er nog moet (de 6 profielen opnieuw genereren).

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
| 28 | Voorbeeldrapporten op de website | **Drie verzonnen golfers — Alex, Sam, Chris** (dezelfde als de bestaande EN-trainingsvoorbeelden van 25-9). Elke golfer **gevolgd door de hele reis: QuickScan → spelersprofiel → trainingsrapport**. | Bezoekers zien dat elk rapport voor één persoon geschreven is; drie naast elkaar maakt het verschil zichtbaar. |
| 29 | Hoe toon je het spelersprofiel (45 p.)? | **De visuele samenvatting (7 p.) om door te bladeren + het volledige profiel als PDF-download** (+ sinds 2-11 de leeswijzer als tweede download). | 45 pagina's als plaatjes is te zwaar; de samenvatting is het "gezicht" van het profiel. |
| 30 | Talen | **Alle rapporten NL + EN.** DE/FR/ES-bezoekers zien de EN-rapporten met een korte taalnoot. | De rapporten bestaan alleen in NL/EN (portal). |
| 31 | Waar staat het? | **Eén pagina `/samples`** (alias `/voorbeelden` → redirect). Gelinkt vanaf: **homepage** (stille link onder de startknop van "Herken je dit?"), **QuickScan-opt-in** (nieuw tabblad, zodat de QuickScan niet verloren gaat) en **`/assessment`** (nieuw tabblad; koopknop ongewijzigd). | De homepage blijft QuickScan-only; wie twijfelt kan kijken zonder de flow te verlaten. |
| 32 | Oude voorbeelden | **Uitgefaseerd:** `public/reports/sample-standard.html` + `sample-training-report.html` + de iframe-modal `report-preview-modal.tsx` weg; oude URL's redirecten naar `/samples?report=profile` resp. `?report=training`. | Dummy-HTML i.p.v. echte uitvoer; één plek voor voorbeelden. |
| 33 | Profielen hebben 2 bekende inhoudsfouten (§10.6) | **Toch nu live** ("ik wil voortgang boeken"); fixes zitten in de portal (`88a252a`, gedeployd); de 6 profielen worden **later** opnieuw gegenereerd en vervangen. | Opdrachtgever. |

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
- **JS-syntaxfout in quiz.html (2-11, vóór commit gevangen)**: de NL-tekst `optin.sampleLink` bevatte "zo'n" met een
  rechte apostrof binnen een JS-string tussen enkele quotes → het hele quiz-script brak. Fix: typografische ’.
  **Les: NL-teksten in quiz.html altijd met ’ (of escapen) en daarna funnel-check draaien.**
- **Inhoudsfouten in de voorbeeldprofielen (2-11)** — gevonden bij het nalezen, zie §10.6.

## 6. Testhulpmiddelen
- **Website** `scripts/e2e/funnel-check.js` (+ README): sinds 2-11 **56 controles** (was 41; +`/samples`: kiezers, deep links,
  DE→EN-rapporten + taalnoot, redirects van de oude voorbeeld-URL's, opt-in-link, geen paginafouten). Oorspronkelijk 41 controles in Chromium (homepage, vinkjes, routes,
  CTA's, redirects, taaldetectie, volledige QuickScan NL/EN tot het resultaatscherm, wegen naar `/assessment`);
  portal-verzoeken geblokkeerd. Laatste run 2-11 (lokaal, na `7bb2604`): **ALL CHECKS PASSED**.
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
`/assessment` · `054b401` footer-link · **`5eb5e65` pagina `/samples` + QuickScan-voorbeelden** · **`7bb2604` profielen, NL-trainingsrapporten,
leeswijzer** · plus docs-commits.

**Portal** (`main`): `26d0e6b` entry_route (025) + nurture + admin · `f0e68f6` profielverhaal zonder echte speler ·
`589ce92` admin-funnel-tabel · `e7589a2` meerdere routes (026) · `629e2c4` mail + PDF kloppen · `a601d64`
links naar `/assessment` · `cf2a2b4` rijker QuickScan-rapport · `3a6cf28` één reeks per adres · **`a2e0232` script
voorbeeldprofielen** · **`15cf73f` script QuickScan-voorbeelden** · **`88a252a` profielrapport: twee zwakste stappen bij
naam, EN-blinde-vlek, neutrale voornaamwoorden, lege taalcontrole geen waarschuwing** · plus docs-commits.

## 8. Deploy en terugrollen
- **Website**: push naar `main` → Vercel. Terugrollen: tag **`homepage-pre-funnel-2026-10`** (= `323678b`, ook op
  GitHub) — `git revert` van de commits, of in overleg `main` terugzetten.
- **Portal**: `cd /var/www/mentalroutine && git pull && source venv/bin/activate && cd backend && alembic upgrade
  head && cd .. && sudo systemctl restart mentalroutine mentalroutine-celery mentalroutine-celery-beat && cd frontend
  && npm run build && sudo systemctl restart mentalroutine-frontend`; check `curl -s http://127.0.0.1:8000/api/health`.
  Terug: `alembic downgrade 024_report_summary_key` (026 kort meervoudige routes in tot de eerste) + revert.

## 9. Openstaand
1. ~~Portal-deploy van `3a6cf28`~~ — **gedaan 2-11-2026** (server op `9c1a18e`, frontend-build ok).
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
11. Untracked geneste map `Claude website MR 01/Claude website MR 01/` (1,3 GB, niet in git) geeft lokale tsc-fouten
    én laat een lokale `npx next build` falen op de type-check — opruimen of buiten de repo zetten (aangeboden, nog geen
    antwoord). Tot dan: `npx tsc --noEmit -p .` en alleen regels die met `src/` beginnen tellen; Vercel bouwt wel goed.
12. **De 6 voorbeeldprofielen opnieuw genereren** (§10.6/§10.7) — bevatten nog 2 bekende fouten; de portal-fix staat
    sinds 2-11 op de server. Kost 6 betaalde AI-runs (Anthropic).
13. **De EN-trainingsvoorbeelden** zijn die van 25-9-2026 (`public/reports/training-samples/`), gemaakt vóór de
    rapport-review-rondes; eventueel later opnieuw genereren voor gelijke kwaliteit met de NL-versies (3 AI-runs).

---

## 10. Voorbeeldrapporten op de website — `/samples` (2 nov 2026, LIVE)

Besluiten 28–33 in §1. Commits website `5eb5e65` (pagina + QuickScan-voorbeelden) en `7bb2604` (profielen,
NL-trainingsrapporten, leeswijzer); portal `a2e0232` + `15cf73f` (generatiescripts) en `88a252a` (rapportfixes).

### 10.1 Wat de bezoeker ziet
- **Hero** "Drie golfers. Drie heel verschillende rapporten." + uitleg (verzonnen golfers, echte ongewijzigde uitvoer).
- **1 · Kies een golfer** — drie kaarten (naam, hcp, één herkenbare regel, focus):

  | Golfer | Hcp | Regel (NL) | Focus | Kernscores profiel (0–10) |
  |---|---|---|---|---|
  | **Alex** | 14.2 | "Kiest de slag — en twijfelt boven de bal toch nog." | Grootste groeikans: **Overtuiging 3.8** (groeipunt) | sterkst Focus 7.2; op-een-na-laagst Transfer 5.0 |
  | **Sam** | 24.0 | "Een slechte slag gaat mee naar de volgende tee." | Werkgebied: **Acceptatie 5.6** | sterkst Vertrouwen 7.8; op-een-na-laagst Analyse 6.0 |
  | **Chris** | 6.3 | "Scherpe focus, maar een misser kost nog te veel." | Sterkte: **Focus 8.1** · groeikans Acceptatie 4.4 | op-een-na-laagst Transfer 5.2 |

- **2 · Kies een rapport** — QuickScan (gratis, ± 8 min) · Spelersprofiel (het volledige assessment) ·
  Trainingsrapport (3 inbegrepen). Op mobiel compacte rijen van één regel (de tag staat dan in de lopende tekst).
- **Viewer**: de pagina's als afbeeldingen (`<img>`, 1075×1521, eerste 2 eager, rest lazy) + download-link(s):
  QuickScan/trainingsrapport "Download PDF"; profiel "Download het volledige profiel (PDF)" **+ "de leeswijzer die erbij
  hoort (PDF)"**. Daaronder vergelijk-hint + disclaimer, daarna CTA → `/#recognise` (primair) en `/assessment` (secundair).
- **Deep links**: `/samples?golfer=sam&report=profile&lang=nl&source=…`; een keuze zet `golfer`/`report` in de URL
  via `replaceState` (deelbaar, geen extra history-stappen).
- **Talen**: UI in 5 talen; rapporten NL voor `nl`, **EN voor en/de/fr/es** (+ taalnoot `langNote` bij de/fr/es;
  de leeswijzerlink zegt daar "(PDF, Englisch / en anglais / en inglés)").

### 10.2 Welke rapporten (alles NL + EN, 3 golfers)

| Rapport | Pagina's | Bron | Map op de website |
|---|---|---|---|
| QuickScan | 11 | portal `scripts/quickscan_check/quickscan_voorbeelden.py` (OpenAI, gpt-5.6-luna) | `public/samples/{g}/quickscan-{nl,en}/` + `.pdf` |
| Spelersprofiel — samenvatting | 7 (bladerbaar) | portal `scripts/website_voorbeelden.py` (Anthropic) → mailbijlage `samenvatting_{g}.pdf` | `public/samples/{g}/profile-{nl,en}/` |
| Spelersprofiel — volledig | 45 (alleen PDF, ~1,2 MB) | idem → `testrapport_{g}.pdf` | `public/samples/{g}/profile-{nl,en}.pdf` |
| Leeswijzer | 5 (alleen PDF) | idem → `leeswijzer.pdf` — **voor iedereen gelijk**, dus één per taal | `public/samples/guide-{nl,en}.pdf` |
| Trainingsrapport NL | 10 | portal `scripts/trainingsrapport_voorbeeld.py --taal nl` (Anthropic), 2-11-2026 | `public/samples/{g}/training-nl/` + `.pdf` |
| Trainingsrapport EN | 10 | hetzelfde script, **25-9-2026** (commit `323678b`) | `public/reports/training-samples/{g}/` + `{g}.pdf` (oude plek, bewust niet verplaatst) |

Onderwerpen trainingsrapport: Alex **Overtuiging 3.8**, Sam **Acceptatie 5.6**, Chris **Focus 8.1**.
De QuickScan-scores wijken bewust iets af van het profiel (de QuickScan kijkt minder diep — het rapport zegt dat zelf).
`public/samples` is in totaal ~18 MB.

### 10.3 Code
- `src/lib/samples.ts` — types `GolferId`/`ReportId`, `GOLFERS`, `REPORTS`, `GOLFER_HCP`, `reportLang()` (nl→nl, rest→en),
  **`SAMPLE_FILES`-manifest** (per golfer × rapport × taal: `dir`, `pages`, `pdf`; `pages: 0` = "binnenkort online"),
  helper `files()` → `/samples/{g}/{report}-{lang}`, `oldTraining()` → `/reports/training-samples/{g}` (10 p.).
  Alle paginatekst (`SamplesCopy`, type = `typeof nl`) in 5 talen, o.a. `downloadFull`, `downloadGuide`, `langNote`.
- `src/app/samples/page.tsx` (client, `LangProvider`) + `layout.tsx` (metadata/OG/canonical, EN).
- `next.config.ts` — redirects `/voorbeelden` → `/samples` (permanent, query gaat mee); `/reports/sample-standard.html`
  → `/samples?report=profile`; `/reports/sample-training-report.html` → `/samples?report=training`.
- `src/app/sitemap.ts` — `/samples` (priority 0.8).
- Ingangen: `src/app/page.tsx` (stille link onder de startknop van `#recognise`, `home.samplesLink`, 5 talen);
  `public/quiz.html` (`#optin-sample-link` direct na de opt-in-checklist, nieuw tabblad, i18n `optin.sampleLink`; de href
  krijgt in `applyI18n` `&lang=`); `src/app/assessment/page.tsx` (de oude preview-knop is nu een link naar
  `/samples?report=profile&source=assessment`, nieuw tabblad; `previewBtn` 5 talen; de modal + `previewModal`-keys zijn weg).
- Verwijderd: `src/components/ui/report-preview-modal.tsx`, `public/reports/sample-standard.html`,
  `public/reports/sample-training-report.html`.
- Omzetscript: `scripts/samples/pdf_to_webp.py` (PyMuPDF + Pillow, 1075 px breed, WebP kwaliteit 82).

### 10.4 Analytics (Plausible)
- `sample_view{golfer,report,lang,source}` — bij laden (`source` = `home`/`quiz`/`assessment`/`direct`) en bij elke keuze (`picker`).
- `sample_download{golfer,report,lang}` — `report` = `quickscan`/`profile`/`training`/**`guide`** (leeswijzer).
- `samples_click{source: home-recognise | quiz-optin}` — de links ernaartoe; op `/assessment` `report_preview{type:"samples"}`.
- Nog niet als goal in het dashboard (zie §2.4 — de dashboard-stappen staan nog open).

### 10.5 Een voorbeeld vervangen (stappenplan)
1. **Genereren** — op de server (vanuit `backend/`, venv actief):
   - profiel: `python scripts/website_voorbeelden.py` (alle 6) of `--golfer alex --taal nl` → mailt per golfer×taal
     profiel + samenvatting + leeswijzer naar `jansen.berend@gmail.com` (`--email` om te wijzigen). Kost per profiel
     één volledige Anthropic-generatie;
   - trainingsrapport: `python scripts/trainingsrapport_voorbeeld.py --naam Alex --onderwerp overtuiging --score 3.8
     --hcp 14.2 --taal nl` (Sam: `acceptatie 5.6 24.0`; Chris: `focus 8.1 6.3`) → print S3-links (PDF + JSON), **1 uur geldig**;
   - QuickScan: lokaal `OPENAI_API_KEY=… python scripts/quickscan_check/quickscan_voorbeelden.py` (sleutel uit de
     website-`.env.local` als env-var meegeven, nooit kopiëren) → `scripts/quickscan_check/out/voorbeelden/`.
2. **Downloaden** — de opdrachtgever zet ze in `C:/Users/beren/Downloads`. Downloads met dezelfde naam krijgen `(1)`,
   `(2)` → **op inhoud herkennen** (pagina 1: naam, onderwerp, taal), niet op bestandsnaam.
3. **Omzetten** (website-repo): `python scripts/samples/pdf_to_webp.py <pdf> public/samples/<g>/<report>-<lang> --pdf-as <report>-<lang>.pdf`.
   Voor het profiel: de **samenvatting** omzetten (map `profile-<lang>/`) en het **testrapport** kopiëren als
   `public/samples/<g>/profile-<lang>.pdf`. Het script print het aantal pagina's → in `SAMPLE_FILES` zetten als het
   afwijkt (profiel 7, QuickScan 11, training 10).
4. **Testen**: `npx next dev -p 3123` + `BASE=http://localhost:3123 node scripts/e2e/funnel-check.js` (Node uit
   `/c/Program Files/nodejs` op het PATH) en `npx tsc --noEmit -p .` (alleen `src/`-regels tellen). Dev-server stoppen:
   PowerShell `Get-NetTCPConnection -LocalPort 3123 -State Listen | % { Stop-Process -Id $_.OwningProcess }`.
5. **Committen** — alleen `src/…` + `public/samples` stagen (de repo-map bevat veel untracked werkbestanden) — en
   pushen → Vercel deployt. Controle: Vercel-deploy "Ready" + `www.mentalroutine.com/samples` doorklikken.
- Golfers/scores/onderwerpen **nooit los** wijzigen: ze staan gelijk in de 3 portal-scripts en in `samples.ts` (kaartteksten).

### 10.6 Bekende fouten in de huidige profielen (live gezet op verzoek, besluit 33)
Gevonden bij het nalezen van de 6 profielen op 2-11:
- **A — tweede groeikans beschrijft de verkeerde stap.** Samenvatting pagina 5 ("Wat je eraan doet") toont de kop van de
  op-een-na-zwakste stap, maar de tekst (en oefening 2) gaat over prioriteit 2. Gezien: Alex EN (kop Transfer, tekst over
  Trust), Chris NL (Transfer ↔ Vertrouwen/putten), Sam NL + EN (Analyse ↔ Beoordeling). Oorzaak: de AI-opdracht
  (`subelement_actie_2`, `sv_oefening_2`) noemde de stap niet bij naam.
- **B — Nederlandse zin in het Engelse profiel.** Chris EN, blinde-vlek-blok bij een hoge score: "Een score dit hoog is een
  kracht…" stond hard-coded NL in `rapport_v4.html`.
- **C — "he/his", "dezelfde man"** bij genderneutrale namen (coach-briefing + baanscènes): het profiel kent het geslacht niet.
- **Fix** (portal `88a252a`, op de server sinds 2-11): de opdracht noemt beide zwakste stappen + hun laagste onderdeel
  (zelfde sortering als de samenvatting), blinde-vlek-tekst per taal (`rapport_labels.blinde_vlek_hoog`), regel "geslacht
  onbekend → naam / 'de speler' / they". Pytest 571 passed. A en C zijn **niet met de echte AI hertest** — nalezen
  bij het opnieuw genereren.

- **Opgelost (4-11-2026)**: de 6 profielen zijn opnieuw gegenereerd met gpt-6.1-sol (portal `57e4103`: toon-blok, één
  startpunt per rapport, geen slagen-claims) en vervangen, inclusief beide leeswijzers. Nagelezen: A (tweede groeikans =
  juiste stap: Alex/Chris Transfer, Sam Analyse), B (geen NL in EN) en C (geen he/his) zijn weg; het startpunt is per golfer
  overal gelijk (Alex Overtuiging, Sam en Chris Acceptatie). Kleine restpunten: Chris EN zegt één keer "strongest domain",
  Alex EN factorpagina's beginnen veel zinnen met "You can".

### 10.7 Nog te doen
- **De 6 profielen lopen achter op de portal (sinds 4-11-2026).** In de portal is de samenvatting omgebouwd: "Begin hier"
  en de kaart staan op p. 3, het slot "Na je eerste ronde" op p. 7, en p. 2 heet "De kern". Er is ook een **baankaart als
  telefoon-PNG** (1080×1920) en de NL-archetype "De Committer" heet nu "De Doorpakker" (Sam). Zie de portal-repo
  `docs/RAPPORT_REVIEW_SEP2026.md` rondes 15–16b. De voorbeelden op `/samples` tonen nog de oude opzet. Vervangen kan met
  §10.5 (6 betaalde runs; de testmail stuurt nu ook `baankaart_<naam>.png` mee). De baankaart zou als extra voorbeeld op
  `/samples` kunnen; dat is nog niet gebouwd.
- Optioneel: de EN-trainingsrapporten opnieuw (van 25-9, vóór de rapport-review) zodat NL en EN even vers zijn.
- Plausible: `sample_view`/`sample_download`/`samples_click` als goals toevoegen.

---

## 11. Pro Program-pagina (3 nov 2026, LIVE, commit `42bb70b`)

Onderdeel van een portal-sessie over de hele PRO-keten; volledig verslag in de **portal-repo
`docs/SESSIE_PRO_KETEN_NOV2026.md`** (§1.1 audit, §3.6 wijzigingen).
- `/pro-program` belooft nu precies wat PRO Admin levert: eigen assessment ($79), **Clinic Kit** (2 clinics: draaiboeken,
  slides, handout, poster), **Communication Kit**, $20-code voor leerlingen, 5 gratis lesprogramma's, daarna $199/jaar
  (opzegbaar). Weg: "six printable A4 pages", "marketing toolkit", "objective picture", verdienclaim.
- Aanvrager wordt (mail, succes-scherm, FAQ, How it works) gevraagd **meteen een gratis portal-account** te maken met
  hetzelfde e-mailadres (`portal.mentalroutine.com/en/registreer`) — dat account activeert de admin.
- Bevestigingsmail zonder "Foundation $59" / "24 uur"; eerst de supportmail (= de aanvraag), daarna best effort de
  bevestiging (geen dubbele aanvragen meer).
- Eigen `layout.tsx` (title/OG/canonical `/pro-program`); PGA-divisies zonder "PGA European Tour".
- Website-CLAUDE.md "Pro Program Pagina" herschreven. Funnel-check ALL PASSED; formulier bewust niet live getest.
- Open (website): alleen Engels; server-side validatie alleen naam+e-mail; geen privacytekst bij PGA-nummer/LinkedIn.

