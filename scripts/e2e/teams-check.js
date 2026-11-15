// Controle van /teams in een echte browser (Chromium): NL + EN, desktop + mobiel, de doorstuurknop, de
// vindbaarheid (index, sitemap, footerlink), het teamblok op /pro-program en de teamvoorbeelden op /samples
// (vijf smaken x rapport/bijlage x NL/EN). Stand: TEAMS_LIVE = true (sinds 15-11-2026), dus alles werkt ZONDER
// ?preview=teams. Zet je de schakelaar weer uit, dan kloppen de controles op vindbaarheid en links niet meer.
//   node teams-check.js [basis-url] [map voor schermafbeeldingen]
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = process.argv[3] || path.join(__dirname, "out");
fs.mkdirSync(OUT, { recursive: true });

const fouten = [];
const ok = (cond, wat) => { console.log(cond ? "  ok  " : "  FOUT", wat); if (!cond) fouten.push(wat); };

(async () => {
  const browser = await chromium.launch();
  for (const [naam, viewport] of [["desktop", { width: 1366, height: 900 }], ["mobiel", { width: 390, height: 844 }]]) {
    for (const lang of ["nl", "en"]) {
      const ctx = await browser.newContext({ viewport, reducedMotion: "reduce" });
      // The cookie notice has its own test (cookie-check.js): here the choice is already made, so it stays closed.
      await ctx.addInitScript(() => { try { localStorage.setItem("mr_cookie_consent", JSON.stringify({ choice: "denied", date: "2026-11-15T00:00:00.000Z" })); } catch {} });
      await ctx.grantPermissions(["clipboard-read", "clipboard-write"]).catch(() => {});
      const page = await ctx.newPage();
      const consoleFouten = [];
      page.on("pageerror", (e) => consoleFouten.push(String(e)));
      page.on("console", (m) => { if (m.type() === "error") consoleFouten.push(m.text()); });
      console.log(`\n== /teams ${lang} ${naam}`);
      await page.goto(`${BASE}/teams?lang=${lang}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(600);

      const tekst = await page.locator("main").innerText();
      ok(tekst.includes("$15") && tekst.includes("$99"), "introductieprijzen $15 en $99");
      ok(tekst.includes("$49") && tekst.includes("$299"), "reguliere prijzen $49 en $299");
      ok(!(await page.locator("main").textContent()).includes("€") && !/\bEUR\b/.test(tekst), "geen euroteken meer: de teamprijs is in dollars");
      ok(tekst.includes(lang === "nl" ? "Vier spelers: samen $60. Zes spelers: samen $90. Zeven spelers of meer: samen $99." : "Four players: $60 in total. Six players: $90 in total. Seven players or more: $99 in total."), "rekenvoorbeelden $60 / $90 / $99");
      ok(tekst.includes(lang === "nl" ? "Eén persoon rekent af voor het hele team: de pro of de captain." : "One person pays for the whole team: the pro or the captain."), "één betaler: de pro of de captain");
      ok(/betaallink|payment link/i.test(await page.locator("main").textContent()), "de betaallink staat op de pagina (route getest met een echte betaling)");
      ok(tekst.includes("support@mentalroutine.com"), "contactregel zonder pro");
      ok(lang === "nl" ? tekst.includes("18 jaar en ouder") : tekst.includes("aged 18 and over"), "18+");
      ok(lang === "nl" ? tekst.includes("Stuur dit naar je pro") : tekst.includes("Send this to your pro"), `taal = ${lang}`);
      ok(!/koppel|opstelling|pairing|line-?up/i.test(tekst), "niets over koppels of opstelling");
      ok(!tekst.includes("—"), "geen gedachtestreepjes");
      const robots = await page.locator('meta[name="robots"]').getAttribute("content").catch(() => null);
      ok(!/noindex/.test(robots || "") && /index/.test(robots || "") && /follow/.test(robots || ""), `vindbaar (robots = ${robots})`);

      // Propositie in één oogopslag, "Dit krijgen jullie", wie ziet wat, voorbeeldknoppen
      ok((await page.locator("#in-een-oogopslag dt").count()) === 3, "hero: drie tegels (wat het is, wat het kost, wat je doet)");
      const oog = await page.locator("#in-een-oogopslag").innerText();
      ok(oog.includes("$15") && oog.includes("$99"), "hero noemt $15 en $99");
      ok(tekst.includes(lang === "nl" ? "Niemand zegt sorry voor een slag." : "Nobody says sorry for a shot."), "citaat uit het voorbeeldrapport");
      ok(tekst.includes(lang === "nl" ? "Dan heeft die speler gelijk. Streep door en schrijf erbij wat wel klopt." : "Then that player is right. Cross it out and write what does fit."), "tweede citaat staat in het huidige rapport");
      ok(!/wij kozen|we chose/i.test(tekst), "het oude citaat 'Wij kozen' is weg");
      ok(tekst.includes(lang === "nl" ? "geen cijfers per speler" : "no scores per player"), "per speler in woorden: geen cijfers per speler");
      ok(!(lang === "nl" ? /(zonder|geen) cijfers(?! per speler)/i : /(no|without) scores(?! per player)/i).test(tekst), "nergens kaal 'zonder cijfers' (het rapport toont teamgemiddelden)");

      // Prijs: geen doorgestreepte 'was'-prijs, de tweede prijs heet 'na 15 maart 2027', lessen niet inbegrepen
      ok((await page.locator("main .line-through").count()) === 0, "geen doorgestreepte prijs");
      const prijs = await page.locator("#prijskaart").innerText();
      ok(prijs.includes(lang === "nl" ? "Na 15 maart 2027" : "After 15 March 2027") && prijs.includes("$49") && prijs.includes("$299"), "prijskaart: 'na 15 maart 2027' $49 / $299");
      ok(!/2027\/2028|seizoen 2026|season 2026/i.test(tekst), "geen 'vanaf seizoen 2027/2028' meer");
      const feiten = await page.locator("#prijs-feiten").innerText();
      ok(feiten.includes(lang === "nl" ? "Niet inbegrepen: de lessen van de pro" : "Not included: the pro's lessons"), "lessen van de pro zitten niet in de prijs");
      ok(feiten.includes("$39") && feiten.includes(lang === "nl" ? "vrijwillig" : "voluntary"), "herhaalmeting: vrijwillig, $39, niet inbegrepen");
      ok(feiten.includes(lang === "nl" ? "krijgt één betaallink voor het hele team. De spelers rekenen zelf niets af." : "gets one payment link for the whole team. The players do not pay anything themselves."), "prijsfeiten: één betaallink voor het hele team, spelers rekenen niets af");
      ok(!/teamcode|team code/i.test(tekst), "geen teamcode (niet gebouwd)");

      // Eerlijke tijd voor het team
      const tijd = await page.locator("#tijd").innerText();
      ok(lang === "nl"
        ? tijd.includes("20 tot 25 minuten") && tijd.includes("anderhalf tot twee uur") && tijd.includes("vier trainingen") && tijd.includes("kaartje") && tijd.includes("twee minuten")
        : tijd.includes("20 to 25 minutes") && tijd.includes("an hour and a half to two hours") && /four winter sessions/i.test(tijd) && tijd.includes("pair card") && tijd.includes("two-minute"),
        "blok 'Eerlijk over de tijd': assessment, teamavond, vier trainingen, kaartje, terugblik");
      ok(!/teamavond van een uur|team meeting of an hour[,.]|one-hour team meeting|De rest bepalen jullie zelf|The rest is up to you/i.test(tekst), "niet meer 'een teamavond van een uur, de rest bepalen jullie zelf'");
      ok(!/kost de pro een paar minuten|takes the pro a few minutes/i.test(tekst), "niet meer 'dat kost de pro een paar minuten'");

      // Het blok voor de pro: eerst wat het oplevert, dan de stappen met de tijd, dan de kosten
      ok((await page.locator("#pro-oplevert li").count()) === 3, "pro-blok: drie regels 'dit levert het je op'");
      const proBlokVroeg = await page.locator("#voor-de-pro").innerText();
      ok((await page.locator("#pro-stappen > li").count()) === 9, "pro-blok: negen stappen in volgorde");
      ok(lang === "nl"
        ? proBlokVroeg.includes("Maak het team aan in PRO Admin en regel de betaling") && proBlokVroeg.includes("Je bent dus geen kassier.") && proBlokVroeg.includes("Stuur de teamlink naar de spelers") && proBlokVroeg.includes("4 tot en met 12")
        : proBlokVroeg.includes("Set the team up in PRO Admin and arrange the payment") && proBlokVroeg.includes("So you do not have to collect money.") && proBlokVroeg.includes("Send the team link to the players") && proBlokVroeg.includes("4 to 12"),
        "pro-blok: team aanmaken in PRO Admin en betaling regelen, daarna de teamlink naar de spelers");
      const proBlok = await page.locator("#voor-de-pro").innerText();
      const kopStappen = lang === "nl" ? "Dit doe je, in deze volgorde, en dit kost het je" : "This is what you do, in this order, and what it costs you";
      ok(proBlok.includes(kopStappen), `pro-blok: kop '${kopStappen}'`);
      const posOplevert = proBlok.search(lang === "nl" ? /dit levert het je op/i : /what.s in it for you/i);
      ok(posOplevert >= 0 && posOplevert < proBlok.indexOf(kopStappen), "pro-blok: wat het oplevert staat vóór de stappen");
      ok(lang === "nl"
        ? proBlok.includes("1 tot 3 werkdagen") && proBlok.includes("Reken op een paar avonden") && proBlok.includes("Een uur tot anderhalf uur") && proBlok.includes("Anderhalf tot twee uur, plus je voorbereiding")
        : proBlok.includes("one to three working days") && proBlok.includes("Allow a few evenings") && proBlok.includes("An hour to an hour and a half") && proBlok.includes("An hour and a half to two hours, plus your preparation"),
        "pro-blok: eerlijke tijden (toelating, methode leren, lezen, teamavond)");
      ok(proBlok.includes(lang === "nl" ? "Een teamrapport telt niet mee voor die vijf" : "A team report does not count towards those five"), "pro-blok: teamrapport telt niet mee voor de vijf gratis lesprogramma's");
      ok(proBlok.includes("$199") && proBlok.includes("$299"), "pro-blok: $199 / $299 zoals op /pro-program");
      const totaal = await page.locator("#pro-totaal").innerText();
      ok(totaal.includes(lang === "nl" ? "ruwweg tien uur" : "roughly ten hours"), "pro-blok: bij elkaar ruwweg tien uur voor het eerste team");
      ok(lang === "nl"
        ? proBlok.includes("drie lessen van een uur en één van twee uur") && proBlok.includes("een half uur tot een uur voorbereiding") && proBlok.includes("De teamavond kan ook zonder jou")
        : proBlok.includes("three lessons of an hour and one of two hours") && proBlok.includes("half an hour to an hour of preparation") && proBlok.includes("can also go ahead without you"),
        "pro-blok: lessenreeks 3 x 1 uur + 1 x 2 uur, voorbereiding per les, teamavond kan zonder de pro");
      ok(!/Reken per les op een uur|Allow an hour per lesson/.test(proBlok), "pro-blok: niet meer 'reken per les op een uur'");
      ok(await page.evaluate(() => { const p = document.querySelector("#voor-de-pro"), f = document.querySelector("#vragen"); return !!(p && f && (p.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING)); }), "pro-blok staat vóór de veelgestelde vragen (niet pas onderaan)");

      // Wie ziet wat: zes kaarten, met niet meedoen / stoppen met delen / de teamvraag
      const zie = await page.locator("#wie-ziet-wat").innerText();
      ok((await page.locator("#wie-ziet-wat h3").count()) === 6, "wie ziet wat: zes kaarten");
      ok(lang === "nl"
        ? zie.includes("Niemand is verplicht") && zie.includes("vanaf vier spelers") && zie.includes("Een rapport dat al gemaakt is, blijft bestaan, ook de bijlage voor de pro waarin je scores staan") && zie.includes("telling voor het hele team, zonder namen") && zie.includes("De pro ziet het antwoord per speler")
        : zie.includes("Nobody has to") && zie.includes("at least four players") && zie.includes("A report that has already been made stays as it is, including the annex for the pro that contains your scores") && zie.includes("count for the whole team, without names") && zie.includes("The pro sees the answer per player"),
        "wie ziet wat: niet meedoen, stoppen met delen, wie het antwoord op de teamvraag ziet");
      ok(zie.includes("support@mentalroutine.com"), "wie ziet wat: adres buiten captain en pro om");

      // Toestemming zoals het vinkje bij de teamlink: het persoonlijke rapport is ook voor de pro te openen
      ok(!/kies je zelf|je kiest zelf of je dat|blijft van jou|stays yours|is your choice|you choose whether to share/i.test(tekst), "niet meer 'delen met de pro kies je zelf' (klopt niet met het vinkje bij de teamlink)");
      ok(lang === "nl"
        ? zie.includes("Het team en de captain zien je persoonlijke rapport nooit") && zie.includes("jij kiest zelf of de pro dat mag openen") && zie.includes("Dat vink je apart aan bij de teamlink") && zie.includes("later in de portal aan- of uitzetten")
        : zie.includes("The team and the captain never see your personal report") && zie.includes("you decide yourself whether the pro may open it") && zie.includes("You tick that separately at the team link") && zie.includes("switch it on or off later in the portal"),
        "wie ziet wat: twee vinkjes; het volledige persoonlijke rapport deel je apart met de pro, aan- en uitzetten in de portal");
      ok(!/resultaten en je rapport met de pro deelt|share your results and your report with the pro|zolang je deelt|for as long as you share|het persoonlijke rapport met de pro\. Dat vink|and your personal report with the pro\. You tick/i.test(await page.locator("main").textContent()), "de oude formulering van één vinkje (resultaten en rapport met de pro) is weg");
      ok(lang === "nl"
        ? zie.includes("Bij de teamlink staan twee vinkjes") && zie.includes("Het tweede is niet verplicht") && zie.includes("De pro ziet je scores en je rapport daar dan niet meer") && zie.includes("alleen openen als jij dat apart aanvinkt")
        : zie.includes("The team link has two tick boxes") && zie.includes("The second is optional") && zie.includes("The pro then no longer sees your scores or your report") && zie.includes("only open your full personal report if you tick that separately"),
        "wie ziet wat: voetregel met de twee vinkjes; stoppen met delen = pro ziet scores en rapport niet meer");
      ok(proBlok.includes(lang === "nl" ? "alleen openen als die speler dat apart met je deelt" : "if that player shares it with you separately"), "pro-blok: het volledige rapport alleen van spelers die dat apart delen");
      ok(lang === "nl"
        ? zie.includes("of dat je die hebt overgeslagen") && zie.includes("je handicap kan in een voorbeeldindeling van de paren staan") && zie.includes("De beheerder van MentalRoutine kan hem ook openen")
        : zie.includes("or the fact that you skipped it") && zie.includes("your handicap may appear in a sample arrangement of the pairs") && zie.includes("The MentalRoutine administrator can open it as well"),
        "wie ziet wat: overgeslagen teamvraag, handicap als enige getal per speler, beheerder kan de bijlage openen");
      ok(tekst.includes(lang === "nl" ? "niemand hoeft iets over zichzelf te vertellen" : "nobody has to say anything about themselves"), "blijft staan: niemand hoeft iets over zichzelf te vertellen");
      ok(tekst.includes(lang === "nl" ? "spelersprofiel: een samenvatting en het volledige rapport" : "player profile: a summary and the full report") && !/trainingsrapport|training report/i.test(tekst), "persoonlijk rapport = het spelersprofiel (samenvatting en volledig rapport); geen trainingsrapporten beloofd");
      ok(tekst.includes(lang === "nl" ? "Twintig tot vijfentwintig pagina's" : "Twenty to twenty-five pages") && !/ongeveer twintig|about twenty/i.test(tekst), "aantal pagina's: twintig tot vijfentwintig");
      ok(lang === "nl"
        ? tekst.includes("per speler geen hoogste of laagste onderdeel") && tekst.includes("elk met een oefenvorm en een voorbeeldafspraak") && tekst.includes("per thema een teamles in plaats van de lessenreeks")
        : tekst.includes("no highest or lowest part per player") && tekst.includes("each with a practice format and a sample agreement") && tekst.includes("a team lesson for each theme instead of the series of lessons"),
        "team dat zelf het thema kiest: de uitzonderingen staan erbij");
      ok(lang === "nl"
        ? tijd.includes("De captain kan ze leiden met het rapport") && tijd.includes("op de teamavond kruisen jullie aan") && tekst.includes("Daarna kan jullie pro lessen geven rond jullie thema; dat spreek je met de pro af.")
        : tijd.includes("The captain can lead them with the report") && tijd.includes("at the team meeting you tick") && tekst.includes("After that your pro can give lessons around your theme; you agree that with the pro."),
        "tijd: wie de trainingen leidt, wanneer het kaartje wordt aangekruist; niets beloofd namens de pro");
      if (lang === "en") {
        ok(!/look back|sits highest|business days|a \$79 value|reader.s guide|lesson programs?\b|yearly|further down/i.test(tekst), "EN: verbeteringen van de Engelstalige lezer (review, comes out highest, working days, worth $79, reading guide, programme)");
        ok(tekst.includes("What has your team agreed to do") && tekst.includes("It needs at least four players") && (await page.locator("main").textContent()).includes("The pages on the order of the pairs and on match points follow the NGF rules"), "EN: titel, 'at least four players', NGF-regels buiten Nederland");
      }
      ok(!/zo weet je teamgenoot wat jou helpt|your teammate knows what helps you|nog niet kennen|have not seen before|geen twee spelers|no two players/i.test(tekst), "geen beweringen die een vragenlijst niet draagt");
      ok(!/alleen techniek|technique only|ruim twintig|more than twenty/i.test(tekst), "toon: niet 'weer een winter alleen techniek', niet 'ruim twintig pagina's'");
      if (lang === "en") {
        ok(!/competition team/i.test(tekst), "EN: niet 'competition team'");
        ok(tekst.includes("Dutch NGF league"), "EN: of het buiten Nederland werkt (spelvormen van de NGF-competitie)");
        ok(tekst.includes("set phrase") && tekst.includes("poor shot") && tekst.includes("team meeting") && tekst.includes("pair card") && tekst.includes("annex for the pro") && tekst.includes("practice formats") && /match day/i.test(tekst), "EN: termen gelijk aan het rapport");
        ok(!/drills|running order/i.test(tekst), "EN: niet 'drills' of 'running order'");
      }

      // De prijs staat op het eerste scherm (ook op een telefoon van 390 x 844, boven de vaste knop onderaan)
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      const hp = await page.locator("#hero-prijs").boundingBox();
      const balk = naam === "mobiel" ? await page.locator("div.fixed.bottom-0").boundingBox() : null;
      const grens = balk ? balk.y : viewport.height;
      const hpTekst = await page.locator("#hero-prijs").innerText();
      ok(!!hp && hp.y >= 0 && hp.y + hp.height <= grens && hpTekst.includes("$15") && hpTekst.includes("$99"), `prijs op het eerste scherm (${naam}: onderkant ${hp ? Math.round(hp.y + hp.height) : "?"}px, grens ${Math.round(grens)}px)`);
      if (naam === "mobiel") await page.screenshot({ path: path.join(OUT, `teams_${lang}_mobiel_eerste_scherm.png`) });
      ok((await page.locator("#wie-ziet-wat").count()) === 1, "blok 'Wie ziet wat'");
      ok(!/deel[t]? (je|de eigen) scores|share your (own )?scores/i.test(tekst), "niet meer 'je deelt je scores binnen het team'");
      const vb = await page.locator("#voorbeeld-knop").getAttribute("href");
      ok(vb === `/samples?report=team&team=h18&doc=report&lang=${lang}&source=teams`, `voorbeeldknop zonder preview → ${vb}`);
      const vbPro = await page.locator("#voorbeeld-bijlage").getAttribute("href");
      ok(/report=team&team=h18&doc=annex/.test(vbPro || "") && !/preview=/.test(vbPro || ""), `voorbeeld van de bijlage in het pro-blok, zonder preview → ${vbPro}`);
      ok((await page.locator('main a[href*="preview=teams"]').count()) === 0, "nergens meer een link met ?preview=teams");

      // De route zoals hij nu echt is (getest met een echte betaling): toegang aanvragen -> team aanmaken in PRO Admin -> betaallink -> teamlink
      const hele = await page.locator("main").textContent();
      ok(lang === "nl"
        ? hele.includes("Aanmelden kan nu. De introductieprijs geldt bij aanmelding t/m 15 maart 2027.") && hele.includes("maakt daarna jullie team aan in PRO Admin. De portal maakt één betaallink voor het hele team: de pro betaalt zelf of stuurt de betaallink door naar de captain.") && hele.includes("Betalen gaat via onze betaalprovider Lemon Squeezy, in dollars.") && hele.includes("de betaler heeft geen account nodig")
        : hele.includes("You can sign up now. The introductory price applies when you sign up by 15 March 2027.") && hele.includes("then sets your team up in PRO Admin. The portal creates one payment link for the whole team: the pro pays, or passes the payment link on to the captain.") && hele.includes("Payment goes through our payment provider Lemon Squeezy, in US dollars.") && hele.includes("the payer does not need an account"),
        "route: aanmelden kan nu; team aanmaken in PRO Admin, één betaallink (pro of captain), Lemon Squeezy in dollars");
        ok(!/1 december|1 December|per mail bij ons aan|with us by email|hoe het afrekenen loopt|how payment works|paar berichten|a few messages/i.test(hele), "de oude route is weg (per mail aanmelden, 1 december als startmoment, 'je hoort hoe het afrekenen loopt')");
        ok(lang === "nl"
          ? hele.includes("Dan betaalt het team alleen het verschil, en nooit meer dan het maximum ($99 bij de introductieprijs).") && hele.includes("is er voor vijf spelers betaald ($75) en worden het er zeven, dan komt er $24 bij") && hele.includes("Onbenutte plekken worden niet terugbetaald.") && hele.includes("met zoveel plekken als er betaald zijn")
          : hele.includes("Then the team only pays the difference, and never more than the maximum ($99 at the introductory price).") && hele.includes("if five players have been paid for ($75) and the team grows to seven, $24 is added") && hele.includes("Unused places are not refunded.") && hele.includes("with as many places as have been paid for"),
          "speler erbij = alleen het verschil ($75 naar zeven spelers = $24 bij); onbenutte plekken niet terugbetaald");
        ok(hele.includes(lang === "nl" ? "Hoe werkt het betalen?" : "How does payment work?") && hele.includes(lang === "nl" ? "Wat als er later een speler bij komt?" : "What if a player joins later?"), "nieuwe vragen: hoe werkt het betalen, speler erbij");
      ok(hele.includes(lang === "nl" ? "Wanneer kunnen we beginnen?" : "When can we start?"), "vraag: wanneer kunnen we beginnen");
      ok(hele.includes(lang === "nl" ? "Iedere speler bevestigt dat bij het aanmelden" : "Every player confirms that when signing up"), "18+: de speler bevestigt het bij het aanmelden");
      // Privacyverklaring en algemene voorwaarden bestaan sinds 15-11-2026: de teampagina linkt ernaar en spreekt ze niet tegen
      ok((await page.locator("#zie-privacy").getAttribute("href")) === `/privacy?lang=${lang}` && (await page.locator("#prijs-voorwaarden").getAttribute("href")) === `/terms?lang=${lang}`, "links naar de privacyverklaring (wie ziet wat) en de voorwaarden (prijs)");
      ok((await page.locator('#vragen a[data-legal="privacy"]').count()) === 1 && (await page.locator('#vragen a[data-legal="terms"]').count()) === 2 && (await page.locator("#teams-footer-legal a").count()) === 2, "links in de FAQ (1x privacy, 2x voorwaarden) en beide onderaan de pagina");
      ok(hele.includes(lang === "nl" ? "Heeft nog geen speler het assessment gestart, dan kan de betaler binnen 14 dagen het hele bedrag terugvragen; daarna niet meer." : "If no player has started the assessment yet, the payer can ask for the full amount back within 14 days; after that, no longer."), "terugvragen: binnen 14 dagen zolang nog geen speler is gestart (gelijk aan de voorwaarden)");
      ok(hele.includes(lang === "nl" ? "t/m 15 maart 2027" : "by 15 March 2027") && !/28 februari|28 February/.test(hele), "introductieprijs bij aanmelding t/m 15 maart 2027");
      const valuta = await page.locator("#valuta").innerText();
      ok(valuta.includes(lang === "nl" ? "Alle prijzen op deze pagina zijn in Amerikaanse dollars" : "All prices on this page are in US dollars") && tekst.includes("$79"), "valuta: één regel, alle prijzen in dollars");

      // Veelgestelde vragen: nieuwe vragen, en de antwoorden staan in de HTML ook als ze dichtgeklapt zijn
      const vragen = lang === "nl"
        ? ["Wie ziet mijn gegevens?", "Wat als ons team weinig verschillen laat zien?", "Hoeveel tijd kost het?", "Is dit iets voor een sceptisch team?",
           "Zitten de lessen van de pro in de prijs?", "Wie ziet mijn antwoord op de teamvraag?", "Wat als een speler niet wil meedoen of niet wil delen?", "Wat gebeurt er als ik stop met delen?"]
        : ["Who sees my data?", "What if our team shows few differences?", "How much time does it take?", "Is this something for a sceptical team?",
           "Are the pro's lessons included in the price?", "Who sees my answer to the team question?", "What if a player does not want to take part or share?", "What happens if I stop sharing?",
           "Does this work outside the Netherlands?"];
      for (const v of vragen) ok(tekst.includes(v), `vraag: ${v}`);
      const panelen = page.locator('[id^="team-faq-panel-"]');
      const n = await panelen.count();
      const dicht = await panelen.evaluateAll((els) => els.filter((e) => e.hidden && e.textContent.trim().length > 40).length);
      ok(n >= 10 && dicht === n, `alle ${n} antwoorden staan in de HTML, dichtgeklapt (${dicht})`);
      await page.locator("#team-faq-trigger-0").click();
      ok(await page.locator("#team-faq-panel-0").isVisible(), "een klik klapt het antwoord open");
      await page.locator("#team-faq-trigger-0").click();

      // Paginatitel per taal (de statische metadata blijft Nederlands)
      const titel = await page.title();
      ok(lang === "nl" ? titel.startsWith("Mentaal trainen") : titel.startsWith("Mental training with your club team"), `paginatitel (${titel})`);

      const mail = await page.locator('a[href^="mailto:?subject="]').getAttribute("href");
      ok(decodeURIComponent(mail).includes(`/teams?lang=${lang}`), "mailknop bevat de link naar /teams in deze taal");
      const pro = await page.locator("#voor-de-pro a").first().getAttribute("href");
      ok(pro === `/pro-program?lang=${lang}`, `pro-knop → ${pro}`);

      const breed = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      ok(breed <= 1, `geen horizontaal scrollen (${breed}px)`);

      // whileInView-animaties: de hele pagina langs scrollen zodat alles zichtbaar is op de schermafbeelding
      const hoogte = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < hoogte; y += 600) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(120); }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(OUT, `teams_${lang}_${naam}.png`), fullPage: true });

      if (naam === "desktop") {
        await page.getByRole("button", { name: lang === "nl" ? "Kopieer de link" : "Copy the link" }).click();
        await page.waitForTimeout(300);
        const klembord = await page.evaluate(() => navigator.clipboard.readText()).catch(() => "");
        ok(klembord.endsWith(`/teams?lang=${lang}`), `kopieerknop zet de link op het klembord (${klembord})`);
      }
      ok(consoleFouten.length === 0, `geen fouten in de console ${consoleFouten.slice(0, 2).join(" | ")}`);
      await ctx.close();
    }
  }

  // Teamblok op /pro-program: zichtbaar zonder ?preview=teams (TEAMS_LIVE = true)
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, reducedMotion: "reduce" });
  // The cookie notice has its own test (cookie-check.js): here the choice is already made, so it stays closed.
  await ctx.addInitScript(() => { try { localStorage.setItem("mr_cookie_consent", JSON.stringify({ choice: "denied", date: "2026-11-15T00:00:00.000Z" })); } catch {} });
  const page = await ctx.newPage();
  console.log("\n== /pro-program teamblok");
  await page.goto(`${BASE}/pro-program?lang=nl`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  ok((await page.locator("#teams").count()) === 1, "zonder preview: teamblok zichtbaar op /pro-program");
  ok((await page.locator('#teams a[href="/teams?lang=nl"]').count()) === 1, "teamblok: link naar /teams?lang=nl");
  await page.locator("#teams").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.locator("#teams").screenshot({ path: path.join(OUT, "pro_program_teamblok_nl.png") });
  const bijlage = await page.locator("#team-annex-sample").getAttribute("href");
  ok(/\/samples\?report=team&team=h18&doc=annex&lang=nl/.test(bijlage || "") && !/preview=/.test(bijlage || ""), `teamblok: link naar de voorbeeldbijlage, zonder preview → ${bijlage}`);
  const blok = await page.locator("#teams").innerText();
  ok(blok.includes("Je maakt het team aan in PRO Admin: teamnaam en aantal spelers (4 tot en met 12). De portal maakt één betaallink voor het hele team") && !/per mail bij ons aan|1 december/i.test(blok), "teamblok: team aanmaken in PRO Admin, één betaallink; oude route weg");
  ok(blok.includes("lessenreeks van vier lessen") && blok.includes("scores per speler"), "teamblok: één zin over wat de pro krijgt");
  ok(blok.includes("Reken op een paar avonden") && blok.includes("anderhalf tot twee uur, plus je voorbereiding") && blok.includes("in deze volgorde"), "teamblok: de stappen in volgorde met eerlijke tijden");
  ok(!blok.includes("€") && blok.includes("$15 per speler") && blok.includes("$99 per team") && blok.includes("Eén persoon rekent af voor het hele team: jij of de captain."), "teamblok: prijs in dollars, één betaler, geen euroteken");
  ok(blok.includes("Een teamrapport telt niet mee voor die vijf") && blok.includes("Jouw lessen zitten daar niet in"), "teamblok: teamrapport telt niet mee; lessen niet in de teamprijs");
  ok(!/teamcode|paar minuten/i.test(blok), "teamblok: geen teamcode, geen 'een paar minuten'");
  ok(blok.includes("alleen openen als die speler dat apart met je deelt"), "teamblok: het volledige rapport alleen van spelers die dat apart delen");
  ok(blok.includes("ruwweg tien uur") && blok.includes("drie lessen van een uur en één van twee uur") && blok.includes("per thema een teamles in plaats van de lessenreeks"), "teamblok: tien uur, lessenreeks 3 + 1, uitzondering eigen thema");
  ok(!/koppel|opstelling|pairing|line-?up/i.test(blok) && !blok.includes("—"), "teamblok: geen afgekeurde woorden of gedachtestreepjes");
  const sm = await (await page.request.get(`${BASE}/sitemap.xml`)).text();
  ok(sm.includes("https://www.mentalroutine.com/teams"), "/teams staat in de sitemap");

  // Link naar /teams in het footermenu van de homepage (NL + EN); de QuickScan-funnel zelf is niet veranderd
  console.log("\n== homepage: footerlink Teams");
  for (const lang of ["nl", "en"]) {
    await page.goto(`${BASE}/?lang=${lang}`, { waitUntil: "networkidle" });
    const link = page.locator("footer nav a", { hasText: /^Teams$/ });
    ok((await link.count()) === 1 && (await link.getAttribute("href")) === `/teams?lang=${lang}`, `homepage ${lang}: footermenu heeft 'Teams' → /teams?lang=${lang}`);
    ok((await page.locator('a[href^="/teams"]').count()) === 1, `homepage ${lang}: precies één link naar /teams (alleen de footer; hero en navigatie ongewijzigd)`);
  }
  await page.goto(`${BASE}/?lang=nl`, { waitUntil: "networkidle" });
  await page.locator("footer nav a", { hasText: /^Teams$/ }).click();
  await page.waitForURL(/\/teams\?lang=nl/);
  await page.waitForLoadState("networkidle");   // the server renders English; the page switches to Dutch right after loading
  await page.waitForTimeout(500);
  ok((await page.locator("h1").innerText()).includes("Wat spreekt jullie team af"), "de footerlink opent de teampagina in het Nederlands");

  // Teamvoorbeelden op /samples: zichtbaar zonder ?preview=teams (TEAMS_LIVE = true)
  console.log("\n== /samples teamvoorbeelden");
  const fout = [];
  page.on("pageerror", (e) => fout.push(String(e)));
  const eerste = () => page.locator("#viewer img").first().getAttribute("src");
  await page.goto(`${BASE}/samples?lang=nl`, { waitUntil: "networkidle" });
  ok((await page.locator("#sample-kind").count()) === 1, "zonder preview: keuze 'Drie golfers / Teamrapport' op /samples");
  ok((await eerste()) === "/samples/alex/quickscan-nl/p01.webp" && (await page.locator("#team-samples").count()) === 0, "de bestaande voorbeelden staan nog steeds voorop (Alex' QuickScan)");
  await page.goto(`${BASE}/samples?lang=nl&report=team&team=h27&doc=annex`, { waitUntil: "networkidle" });
  await page.waitForSelector('#viewer img[src="/samples/team/h27/annex-nl/p01.webp"]');
  ok((await page.locator("#team-samples").count()) === 1, "zonder preview: een teamlink opent het teamvoorbeeld (h27, bijlage)");
  await page.goto(`${BASE}/samples?lang=nl`, { waitUntil: "networkidle" });
  const titelGolfers = await page.title();
  ok(/Three Golfers/.test(titelGolfers), `documenttitel bij de golfers ongewijzigd (${titelGolfers})`);
  await page.locator("#sample-kind").getByRole("tab", { name: "Teamrapport" }).click();
  await page.waitForTimeout(200);
  ok((await page.title()).startsWith("Voorbeeld teamrapport"), `documenttitel volgt de teamvoorbeelden (${await page.title()})`);
  ok((await page.locator("#team-samples [data-team]").count()) === 5 && (await page.locator("#team-samples [data-doc]").count()) === 2, "teamsectie: vijf smaken en twee documenten");
  ok(/report=team/.test(page.url()) && /team=h18/.test(page.url()) && !/preview=/.test(page.url()), `de keuze staat in het adres, zonder preview (${page.url()})`);
  await page.locator("#sample-kind").getByRole("tab", { name: "Drie golfers" }).click();
  ok((await eerste()) === "/samples/alex/quickscan-nl/p01.webp" && !/team=/.test(page.url()), "terug naar de golfers");
  await page.waitForTimeout(200);
  ok((await page.title()) === titelGolfers, `terug bij de golfers: de oude documenttitel (${await page.title()})`);

  const PAGINAS = { h18: { report: { nl: 23, en: 23 }, annex: { nl: 6, en: 6 } }, h27: { report: { nl: 22, en: 22 }, annex: { nl: 6, en: 6 } },
    h36: { report: { nl: 23, en: 23 }, annex: { nl: 6, en: 6 } }, small: { report: { nl: 22, en: 22 }, annex: { nl: 6, en: 6 } },
    even: { report: { nl: 20, en: 20 }, annex: { nl: 6, en: 6 } } };
  for (const lang of ["nl", "en"]) {
    for (const smaak of Object.keys(PAGINAS)) {
      for (const doc of ["report", "annex"]) {
        await page.goto(`${BASE}/samples?report=team&team=${smaak}&doc=${doc}&lang=${lang}`, { waitUntil: "domcontentloaded" });
        const map = `/samples/team/${smaak}/${doc}-${lang}`;
        await page.waitForSelector(`#viewer img[src="${map}/p01.webp"]`);   // de deep link schakelt na het laden naar het team
        const srcs = await page.locator("#viewer img").evaluateAll((els) => els.map((e) => e.getAttribute("src")));
        const geladen = await page.locator("#viewer img").first().evaluate((img) => (img.complete ? Promise.resolve() : new Promise((r) => { img.onload = r; img.onerror = r; })).then(() => img.naturalWidth));
        const pdf = await page.locator("#viewer a[download]").getAttribute("href");
        const pdfStatus = (await page.request.get(BASE + pdf)).status();
        const laatste = (await page.request.get(`${BASE}${map}/p${String(PAGINAS[smaak][doc][lang]).padStart(2, "0")}.webp`)).status();
        const noot = await page.locator("#annex-note").count();
        ok(srcs.length === PAGINAS[smaak][doc][lang] && srcs[0] === `${map}/p01.webp` && geladen === 1075 && pdf === `${map}.pdf` && pdfStatus === 200 && laatste === 200 && noot === (doc === "annex" ? 1 : 0),
           `${smaak} ${doc} ${lang}: ${srcs.length} pagina's, pagina 1 geladen (${geladen}px), PDF ${pdfStatus}, laatste pagina ${laatste}${doc === "annex" ? ", regel 'alleen de pro'" : ""}`);
      }
    }
  }
  await page.goto(`${BASE}/samples?report=team&team=h18&doc=annex&lang=en`, { waitUntil: "networkidle" });
  const st = await page.locator("main").innerText();
  ok(st.includes("Only the pro receives this annex; the captain and the team do not."), "EN: regel bij de bijlage");
  ok((await page.title()).startsWith("Sample Team Reports"), `EN: documenttitel van de teamvoorbeelden (${await page.title()})`);
  ok(st.includes("The teams are made up, the reports are real output"), "EN: de teams zijn verzonnen, de rapporten echt");
  ok(!st.includes("—") && !/koppel|opstelling|pairing|line-?up/i.test(st), "teamsectie: geen gedachtestreepjes of afgekeurde woorden");
  await page.goto(`${BASE}/samples?report=team&team=h18&doc=annex&lang=nl`, { waitUntil: "networkidle" });
  ok((await page.locator("main").innerText()).includes("Alleen de pro krijgt deze bijlage; de captain en het team niet."), "NL: regel bij de bijlage");
  ok(fout.length === 0, `geen fouten op /samples ${fout.slice(0, 2).join(" | ")}`);
  await browser.close();

  console.log(fouten.length ? `\n${fouten.length} FOUT(EN):\n - ${fouten.join("\n - ")}` : "\nALLES OK");
  process.exit(fouten.length ? 1 : 0);
})();
