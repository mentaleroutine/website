# Sessieverslag — Homepage als QuickScan-funnel + Entry Narratives (15 okt 2026)

> Volledig verslag van één werksessie over twee repo's (website + portal), zodat niets verloren gaat
> bij context-compactering. Bevat de besluiten (met de reden erachter), de eindtoestand, de commits,
> hoe je terugrolt en wat nog openstaat. **Status: alles LIVE** (website via Vercel, portal gedeployed
> + migratie 025 gedraaid, health `healthy`).

## 0. Aanleiding

De website (www.mentalroutine.com) stond "te weinig in het teken van de funnel": de hero bood drie
gelijkwaardige deuren (QuickScan · assessment $79 kopen · pro-programma) en geen van de drie converteerde
goed — "het is gewoon teveel". Doel van de opdrachtgever: **informeren over de dienstverlening met als
enige CTA "doe de gratis QuickScan"**; opt-ins converteren via de (al bestaande) e-mailreeks naar kopers.

Uitgangsmateriaal: het **Entry Narrative Framework v1.5** (Berend & Henk, 23-9-2026; PDF, niet in een
repo): 3 groepen (Performance / Emotion & Experience / Development) → 12 entry narratives → 48
sub-narratives → 48 primary hooks → 48 lead executions + C8-experimenten. Kernregels: herkennen, niet
diagnosticeren; geen persona's; de 4 beïnvloedende factoren blijven **onder water**; **geen
overclaiming** (geen "strokes lost by mindset"-claims zonder meetdata); handicap-neutraal; niet pushy.

## 1. Besluiten (één voor één met de opdrachtgever genomen)

| # | Vraag | Besluit | Reden |
|---|---|---|---|
| 1 | Assessment nog direct kopen op de site? | **Nee — site verkoopt niets** (optie A) | Scherp kiezen; elke koper eerst in de lijst; funnel meetbaar. Voorwaarde: wie al overtuigd is kan direct ná de QuickScan kopen (koop-escape in quiz.html + kortingscode). |
| 2 | Pro-programma op de homepage? | **Alleen één footer-link** (B); `/pro-program` blijft | Stoort de golfer niet; pro die zoekt vindt het. |
| 3 | Lengte homepage | **Kort** (~6 secties) | Site hoeft alleen nog een gratis scan "te verdienen"; overtuigen gebeurt in resultaat + mails; diepgang op `/methodology`. |
| 4 | Doelgroep | Geen persona/handicapgroep — **de 12 entry narratives** | Uit het framework. |
| 5 | Narratives op de homepage | **A + C-light**: sectie "Herken je dit?" met de 12 narratives (klik → QuickScan met `?route=`) + `?route=` in de URL wisselt de hero-hook (advertenties) | Spiegel i.p.v. keuzemenu; meetbaar per route; ads landen op dezelfde boodschap zonder aparte pagina's. |
| 6 | Talen | **Eerst EN + NL, daarna DE/FR/ES** | NL door Henk goed te keuren. (Beide inmiddels gedaan.) |
| 7 | `/assessment` | **Blijft** als verkooppagina voor warme leads (niet in menu/home; wel vanuit QuickScan-resultaat + mails) | Twijfelaar heeft een plek om overtuigd te raken. |
| 8 | Hero zonder `?route=` | **P1.1-hook** "You hit plenty of good shots. So why does the scorecard still tell a different story?" | Breedste herkenning; spiegel, geen claim. Bewust de exacte (bevroren) frameworktekst. |
| 9 | Testimonials | **Fictief → verwijderd** (9 stuks + pricing-quotes "Robert M."/"Willem B.", randomuser.me-foto's) | Misleidende reclame (EU/FTC) + botst met framework. |
| 9b | "1.000+ golfers onderzocht sinds 2016" | **Klopt** — blijft | Bevestigd. |
| 10 | Foto/feiten Henk | Geen foto. **Alleen MentalRoutine-branding** — NogBeterGolfen (footer, FAQ, link) weg | Eén merk. |
| 10b | Omschrijving Henk | **Initiatiefnemer van MentalRoutine** — NIET coach, NIET (golf)psycholoog, NOOIT PGA-pro | Feitelijk. "PGA-netwerk" (bracht golfers bij het onderzoek) klopt wél. |
| 11 | Dubbeling homepage ↔ `/quickscan`-landing | **Homepage = de landing**; klik start de QuickScan direct bij hole 1 (`?start=1`) | Anders twee verkooppagina's na elkaar (dubbele frictie). De `/quickscan`-landing blijft voor direct verkeer. |
| 12 | "4.9/5" op de QuickScan-landing | **Heeft een bron** — blijft | Bron + aantal kan nog worden toegevoegd. |
| 13 | "PGA-netwerk" bij Henk | **Klopt** — blijft | |
| 14 | "Niet je swing / Het zit niet in je swing / wat je écht slagen kost" (QuickScan) | **Herschreven** volgens framework (herkennen, niet concluderen) | Overclaim. Ook in meta-titel, startknop, slot-CTA, resultaattekst, deeltekst. |
| 15 | "Welk domein kost jou de meeste slagen" / "Je laat veel slagen liggen" | **Herschreven** naar "sterkste punt + grootste groeikans" | De QuickScan meet geen slagen. |
| 16 | Henks golfer-voice-review (PDF "Golfer-voice alternatives") | **Overgenomen**: groepsregels, 12 narratives, 48 sub-narratives in golferstaal | Hooks bleven v1.5. P2 = "It's not my swing that costs me shots." (golfer zegt het zelf → herkenning, geen MR-claim; alternatief A "I throw shots away without hitting a bad one." indien voorzichtiger gewenst). |
| 17 | NL-vertalingen | **Goedgekeurd door Henk** | Lijst `docs/NL_TEKSTEN_HOMEPAGE_HENK.md`. |
| 18 | Route-ID naar portal + nurture | **Gebouwd** (portal migratie 025) | Conversie per narrative meetbaar; mail 1 sluit aan bij wat de golfer herkende. |
| 20 | Waar gaan de overige CTA's heen? | **Allemaal naar "Herken je dit?"** (`#recognise`); de QuickScan start alleen na ≥1 vinkje. Advertentie-route vinkt de zin alvast aan, subroute blijft behouden | Anders start de QuickScan zonder narratives en werkt de meting/nurture-aansluiting niet. |
| 21 | `/quickscan` direct bezocht (zonder vinkjes) | **Doorsturen naar "Herken je dit?"** (307, taal mee via `?lang=`); oude landing vervalt, `/quickscan` uit de sitemap | Elke QuickScan heeft narratives; oude links/bio/deellinks blijven werken. |
| 22 | Site begon altijd in het Engels | **Taaldetectie**: `?lang=` → eerder gekozen taal (onthouden) → browsertaal → EN | NL/DE/FR/ES-bezoekers zagen eerst Engels. |
| 23 | QuickScan-resultaatscherm beloofde dingen van het betaalde product | **Gecorrigeerd** (audit scherm ↔ gratis PDF): geen "oefeningen op maat van je handicap" maar tips; geen "{stap}-plan ligt klaar" maar "Ontvang je uitwerking van {stap}"; voorbeeld-trainingsrapport weg uit "Dit ontvang je"; "volledige rapport" → "persoonlijke rapport"; scorebadges = portalbanden (Groeipunt/Werkgebied/Sterkte, <4/4–6.9/7+); stap i.p.v. domein, Transfer, Evaluation (EN), "Grootste groeikans" i.p.v. "Zwakste"; PDF-mockup vertaalbaar; vergrendelde balken vaste lengte. Portal: QuickScan-mail (geen "oefening", 2 groeikansen, stap) + PDF `shop.mentalroutine.com` → `www.mentalroutine.com`. Website NL "Aanvaarding" → "Acceptatie". | Scherm, mail en PDF zeggen nu hetzelfde. |
| 23c | Delen + link kopiëren op het bedankscherm (na opt-in) | **Weg** (alleen nog op het resultaatscherm) | Opdrachtgever. |
| 23d | Kortingscode QUICKSCAN10 verliep 31-10 | **Geldig t/m 31 december 2026** in de QuickScan-PDF | Controleer dat de code in Lemon Squeezy zelf ook niet eerder verloopt. |
| 23b | Benchmark "Gemiddelde golfer 5.2 · Top 25% 6.8+" | **Blijft staan** (besluit opdrachtgever) | Let op: volgens `README_QUIZ_FUNNEL.md` een fictieve benchmark; ook gebruikt in de nurture-prompt. |
| 19 | Eén narrative aanklikken of meerdere aanvinken? | **Checkboxes + één startknop**; alle aangevinkte narratives gaan mee (`?route=P1,E2,D3`) en worden opgeslagen (portal migratie 026, kolom 64 tekens) | Rijkere info over de golfer; mensen herkennen zich vaak in meerdere narratives (framework: "één golfer kan op meerdere narratives resoneren"). |

## 2. Eindtoestand website (`src/app/page.tsx`)

Secties: **hero** (badge "Free MentalRoutine QuickScan", hook, 1 knop, "9 holes · 8 minutes · free ·
your report by email", trust "Research with 1,000+ golfers since 2016", radar) · **`#recognise`**
"Sound familiar? / Which of these sounds like you?" (3 kolommen × 4 narratives, groepsregel als kop) ·
**`#how-it-works`** "Every shot has three moments" (pre-shot/swing/post-shot, géén stappen/factoren/
aantallen, link `/methodology`) · **`#team`** Henk (initiatiefnemer, 40+ jaar golfer) + Berend
(psychometrisch expert), tekst uit de QuickScan-teambalk, quote Henk · **`#faq`** 5 QuickScan-vragen
(`home.faq`; ook de FAQ-JSON-LD in `layout.tsx`) + slot-CTA · contact · footer (alleen pro-link,
"An initiative of Henk de Jong") · sticky QuickScan-balk.

Weg van de homepage (teksten staan grotendeels nog in `translations.ts`): pricing, trainingsrapporten,
8 stappen, factoren, why-it-works, oude hero, warmte-logica (`traffic-warmth.ts` verwijderd),
testimonials (`testimonials-columns.tsx` verwijderd). Zie `docs/ARCHIEF_HOMEPAGE_OKT2026.md` voor
waar elk blok staat + hergebruik-ideeën.

Bestanden:
- `src/lib/narratives.ts` — 3 groepen · 12 narratives · 48 subs · 48 hooks, **5 talen** (`Text` =
  `{en,nl,de,fr,es}`), `resolveRoute()` (`P4.2` of `P4` → hook), `pick()`, `DEFAULT_ROUTE = "P1.1"`.
- `src/lib/quickscan.ts` — `quickscanUrl(lang, route)` → `/quickscan?start=1&lang=nl|en[&route=P1,E2]` (komma leesbaar).
- `#recognise`: checkboxes (state `picked`, klikvolgorde), knop disabled tot ≥1 vinkje, teller "{n} selected";
  per vinkje `narrative_click{route}`, de startknop `quiz_click{source:"recognise",route:"P1,E2",count}`.
- `src/lib/translations.ts` — `home.*` in 5 talen; nav = How it works · FAQ · Contact (+ QuickScan-knop);
  Henk-omschrijving + NogBeterGolfen gecorrigeerd in alle 5 talen; hoog-handicap-FAQ afgezwakt.
- `src/components/ui/faqs.tsx` — optionele `content`-prop (homepage toont `home.faq`, `/assessment`
  houdt de product-FAQ).
- `src/components/ui/navbar.tsx` — links absoluut (`/#…`), QuickScan-knop start direct.
- `src/app/layout.tsx` — titel/omschrijving/OG = QuickScan (P1.1), FAQ-JSON-LD = `home.faq`.
- `src/app/assessment/page.tsx` — fictieve quote verwijderd.
- `public/quiz.html` — claims herschreven (NL+EN); `?start=1` auto-start; `MR_ROUTE` uit `?route=`
  (alleen geldige `[PED][1-4](.[1-4])?`, anders `'none'`) → Plausible-props `route` op `quiz_start`/
  `quiz_complete`/`quiz_optin` + `entry_route` in de `POST /api/quiz/results`-payload.

`/methodology`: de koopdeur naar `/assessment` onderaan is verwijderd; de CTA start de QuickScan direct
(tekst in 5 talen: alleen nog QuickScan).

Analytics (Plausible): `quiz_click{source,route}` · `narrative_click{route}` · `hero_route{route}` ·
`section_view` · `scroll_depth` · `methodology_click` · `pro_program_click`.

Talen: EN canoniek; NL goedgekeurd (Henk); DE/FR/ES door AI vertaald (du / vous / tú), **niet native
gereviewd**. De QuickScan zelf blijft NL/EN (DE/FR/ES-bezoekers krijgen `lang=en`).

## 3. Portal (repo `mentaleroutine/portal`, commit `26d0e6b`)

- **Migratie 025** `quiz_sessions.entry_route` (String(8), nullable, index). Gedraaid op de server.
- **Migratie 026** `entry_route` → String(64): meerdere aangevinkte narratives komma-gescheiden (`P1,E2,D3`).
  `normalize_route` valideert per code, ontdubbelt, max 12; `narrative_ids()`/`statements()` voor lijsten.
  Nurture-profiel noemt alle zinnen ("…" (P3); "…" (E1)); prompt: mail 1 = rode draad, latere mails pakken
  de andere zinnen op. Funnel: golfer telt in élke aangevinkte rij; `per_route_totaal` telt uniek + `met_meerdere`.
- `services/entry_narratives.py` — 12 statements NL/EN (kopie van website-`narratives.ts`; bij wijziging
  daar ook hier bijwerken), `normalize_route`, `narrative_id`, `statement`.
- `routers/quiz.py` — `QuizResultsRequest.entry_route` (gevalideerd) → opgeslagen bij `/quiz/results`
  (vóór opt-in, dus ook anonieme invullingen per route).
- `services/nurture_service.py` — profiel krijgt "Herkende zich bij binnenkomst in: "…" (entry narrative
  P3)"; prompt: mail 1 sluit daar warm op aan, **herkenning, geen diagnose**. Zonder route ongewijzigd.
- `routers/admin.py` — route in `/admin/quickscans` + CSV; `/admin/nurture-conversie` → `per_route`
  (QuickScans → opt-ins → sequences → kopers per narrative, subs tellen bij hun narrative, zonder route =
  `direct`, met `optin_pct`/`koop_pct`). Admin-UI toont de route naast de taal ("NL · P2") en de
  tabel "Funnel per herkenningszin" (QuickScans · opt-ins · opt-in % · kopers · koop % + totaal).
- Tests `tests/test_entry_route.py` (6); suite **553 passed, 7 skipped**.
- Docs: portal `CLAUDE.md` (nurture-sectie + blokkentabel), `docs/NURTURE_CAMPAGNE_UITVOERING.md`,
  `docs/TESTS.md`, `TIJDREGISTRATIE.md`.

## 3b. Incident: lege QuickScan-pagina (15-10-2026, opgelost in `396fe8a`)

Vanaf `c167d73` gaf elke QuickScan-link vanaf de homepage (`?start=1`) een **lege pagina**: de autostart
draaide vóór het "INITIAL DISPLAY"-blok aan het eind van het quiz-script, dat `#phase-quiz` weer verborg
(landing al verborgen door `showPhase`). Fix: autostart als allerlaatste stap in de IIFE + vangnet (bij
een fout terug naar de landing). Getest in jsdom (EN/NL hole 1, zonder params = landing).
**Gevolg voor de data van die dag:** `quiz_start` vuurde wél (vóór het verbergen) → Plausible telt voor
15-10 te veel QuickScan-starts; `quiz_complete`/`quiz_optin` zijn wel betrouwbaar. Les: wijzigingen in
quiz.html altijd eerst in jsdom draaien.

## 4. Commits & terugrollen

> Latere commits (zelfde dag): `396fe8a` (fix lege QuickScan), checkbox-multi-select (website + portal
> migratie 026) — zie `git log`.


| Repo | Commit | Wat |
|---|---|---|
| website | `c167d73` | Homepage als QuickScan-funnel (framework), opschoning, quiz.html-claims |
| website | `bb2f02a` | Narratives in golfer voice (Henks review) |
| website | `f1f4b56` | DE/FR/ES + quiz.html stuurt `entry_route` |
| portal | `26d0e6b` | entry_route opslaan + nurture + admin |

- **Tag `homepage-pre-funnel-2026-10`** (ook op GitHub) = live website vóór deze sessie (`323678b`).
  Oude homepage bekijken: `git show homepage-pre-funnel-2026-10:src/app/page.tsx`.
  Terug: `git revert` van de website-commits hierboven (of `main` resetten naar de tag + force-push —
  alleen in overleg).
- Portal terug: `alembic downgrade 024_report_summary_key` + revert `26d0e6b` (kolom is nullable; de
  website-payload met `entry_route` wordt dan door Pydantic genegeerd).

## 5. Openstaand

1. **DE/FR/ES native review** — twijfelpunten van de vertaling: FR "partie" (narratives) vs "parcours"
   (rest site) voor *round*; FR "Progression" voor Development; ES "resultado" vs "score" in de
   golferzinnen; DE tagline "Ich will weniger Schläge spielen."; groepsnamen DE "Emotion & Erleben" /
   FR "Émotion & vécu" / ES "Emoción y vivencia"; DE/ES "Initiator"/"Iniciador"; DE E2.4 "neu ansetzen".
2. **"4.9/5"** op de QuickScan-landing: bron + aantal beoordelingen erbij zetten (opdrachtgever levert aan).
3. ~~Admin-UI voor `per_route`~~ — **gedaan**: tabel "Funnel per herkenningszin" op de portal-admin-pagina.
4. **De 48 sub-narratives** staan in `narratives.ts` maar worden nog nergens getoond (bedoeld voor
   advertenties/mails; C8-experimenten uit het framework zitten nog niet in de data).
5. **QuickScan-resultaat → `/assessment`**: de koop-escape in quiz.html linkt nog rechtstreeks naar de
   Lemon-checkout (met QUICKSCAN10); `/assessment` wordt vooral via de nurture bereikt.
6. **Ongebruikte translation-keys** (`hero`, `research`, `routine`-tekst, `process`, `dimensions`,
   `whyItWorks`, `skillBuilder`, `cta`, `heroCardLabels`, `nav`-restanten) — bewust laten staan
   (`/assessment` gebruikt een deel; hergebruik zie archiefdoc); opruimen kan later.
7. **Server**: bij inloggen meldde Ubuntu "System restart required" (OS-updates, los van deze deploy) —
   `sudo reboot` op een rustig moment, daarna `/api/health` checken.
9. **Franse aanspreekvorm inconsistent**: homepage FR = "vous" (bestaande site-objecten), `/methodology`
   FR = "tu". Kiezen en gelijktrekken (native reviewer).
10. **Plausible-dashboard** (handmatig): property `route` toevoegen; goals `narrative_click` + `hero_route`
   erbij, `hero_warmth` weg; funnel "Herkenning" (`narrative_click → quiz_start → quiz_complete → quiz_optin`);
   "Assessment Checkout" → pageview `/assessment` → `checkout_click`.
8. De untracked geneste map `Claude website MR 01/Claude website MR 01/` geeft lokale tsc-fouten
   (niet in git, niet op Vercel) — opruimen of in `tsconfig` excluden.
