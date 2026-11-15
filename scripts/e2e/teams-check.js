// Controle van /teams in een echte browser (Chromium): NL + EN, desktop + mobiel, de doorstuurknop, de
// onvindbaarheid (noindex), het teamblok op /pro-program en de teamvoorbeelden op /samples (beide alleen met
// ?preview=teams zolang TEAMS_LIVE=false; vijf smaken x rapport/bijlage x NL/EN).
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
      await ctx.grantPermissions(["clipboard-read", "clipboard-write"]).catch(() => {});
      const page = await ctx.newPage();
      const consoleFouten = [];
      page.on("pageerror", (e) => consoleFouten.push(String(e)));
      page.on("console", (m) => { if (m.type() === "error") consoleFouten.push(m.text()); });
      console.log(`\n== /teams ${lang} ${naam}`);
      await page.goto(`${BASE}/teams?lang=${lang}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(600);

      const tekst = await page.locator("main").innerText();
      ok(tekst.includes("€15") && tekst.includes("€99"), "introductieprijzen €15 en €99");
      ok(tekst.includes("€49") && tekst.includes("€299"), "reguliere prijzen €49 en €299");
      ok(tekst.includes("support@mentalroutine.com"), "contactregel zonder pro");
      ok(lang === "nl" ? tekst.includes("18 jaar en ouder") : tekst.includes("aged 18 and over"), "18+");
      ok(lang === "nl" ? tekst.includes("Stuur dit naar je pro") : tekst.includes("Send this to your pro"), `taal = ${lang}`);
      ok(!/koppel|opstelling|pairing|line-?up/i.test(tekst), "niets over koppels of opstelling");
      ok(!tekst.includes("—"), "geen gedachtestreepjes");
      const robots = await page.locator('meta[name="robots"]').getAttribute("content").catch(() => null);
      ok(/noindex/.test(robots || ""), `onvindbaar (robots = ${robots})`);

      // Propositie in één oogopslag, "Dit krijgen jullie", wie ziet wat, voorbeeldknoppen
      ok((await page.locator("#in-een-oogopslag dt").count()) === 3, "hero: drie tegels (wat het is, wat het kost, wat je doet)");
      const oog = await page.locator("#in-een-oogopslag").innerText();
      ok(oog.includes("€15") && oog.includes("€99"), "hero noemt €15 en €99");
      ok(tekst.includes(lang === "nl" ? "Niemand zegt sorry voor een slag." : "Nobody says sorry for a shot."), "citaat uit het voorbeeldrapport");
      ok(tekst.includes(lang === "nl" ? "Dan heeft die speler gelijk. Streep door en schrijf erbij wat wel klopt." : "Then that player is right. Cross it out and write what does fit."), "tweede citaat staat in het huidige rapport");
      ok(!/wij kozen|we chose/i.test(tekst), "het oude citaat 'Wij kozen' is weg");
      ok(tekst.includes(lang === "nl" ? "geen cijfers per speler" : "no scores per player"), "per speler in woorden: geen cijfers per speler");
      ok(!(lang === "nl" ? /(zonder|geen) cijfers(?! per speler)/i : /(no|without) scores(?! per player)/i).test(tekst), "nergens kaal 'zonder cijfers' (het rapport toont teamgemiddelden)");

      // Prijs: geen doorgestreepte 'was'-prijs, de tweede prijs heet 'na 28 februari 2027', lessen niet inbegrepen
      ok((await page.locator("main .line-through").count()) === 0, "geen doorgestreepte prijs");
      const prijs = await page.locator("#prijskaart").innerText();
      ok(prijs.includes(lang === "nl" ? "Na 28 februari 2027" : "After 28 February 2027") && prijs.includes("€49") && prijs.includes("€299"), "prijskaart: 'na 28 februari 2027' €49 / €299");
      ok(!/2027\/2028|seizoen 2026|season 2026/i.test(tekst), "geen 'vanaf seizoen 2027/2028' meer");
      const feiten = await page.locator("#prijs-feiten").innerText();
      ok(feiten.includes(lang === "nl" ? "Niet inbegrepen: de lessen van de pro" : "Not included: the pro's lessons"), "lessen van de pro zitten niet in de prijs");
      ok(feiten.includes("$39") && feiten.includes(lang === "nl" ? "vrijwillig" : "voluntary"), "herhaalmeting: vrijwillig, $39, niet inbegrepen");
      ok(feiten.includes(lang === "nl" ? "Bij aanmelding hoor je hoe het afrekenen loopt" : "you hear how payment works"), "afrekenen: geen verzonnen mechaniek");
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
      ok((await page.locator("#pro-stappen > li").count()) === 8, "pro-blok: acht stappen in volgorde");
      const proBlok = await page.locator("#voor-de-pro").innerText();
      const kopStappen = lang === "nl" ? "Dit doe je, in deze volgorde, en dit kost het je" : "This is what you do, in this order, and what it costs you";
      ok(proBlok.includes(kopStappen), `pro-blok: kop '${kopStappen}'`);
      const posOplevert = proBlok.search(lang === "nl" ? /dit levert het je op/i : /what it brings you/i);
      ok(posOplevert >= 0 && posOplevert < proBlok.indexOf(kopStappen), "pro-blok: wat het oplevert staat vóór de stappen");
      ok(lang === "nl"
        ? proBlok.includes("1 tot 3 werkdagen") && proBlok.includes("Reken op een paar avonden") && proBlok.includes("Een uur tot anderhalf uur") && proBlok.includes("Anderhalf tot twee uur, plus je voorbereiding")
        : proBlok.includes("1 to 3 business days") && proBlok.includes("Allow a few evenings") && proBlok.includes("An hour to an hour and a half") && proBlok.includes("An hour and a half to two hours, plus your preparation"),
        "pro-blok: eerlijke tijden (toelating, methode leren, lezen, teamavond)");
      ok(proBlok.includes(lang === "nl" ? "Een teamrapport telt niet mee voor die vijf" : "A team report does not count towards those five"), "pro-blok: teamrapport telt niet mee voor de vijf gratis lesprogramma's");
      ok(proBlok.includes("$199") && proBlok.includes("$299"), "pro-blok: $199 / $299 zoals op /pro-program");
      ok(await page.evaluate(() => { const p = document.querySelector("#voor-de-pro"), f = document.querySelector("#vragen"); return !!(p && f && (p.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING)); }), "pro-blok staat vóór de veelgestelde vragen (niet pas onderaan)");

      // Wie ziet wat: zes kaarten, met niet meedoen / stoppen met delen / de teamvraag
      const zie = await page.locator("#wie-ziet-wat").innerText();
      ok((await page.locator("#wie-ziet-wat h3").count()) === 6, "wie ziet wat: zes kaarten");
      ok(lang === "nl"
        ? zie.includes("Niemand is verplicht") && zie.includes("vanaf vier spelers") && zie.includes("een rapport dat al gemaakt is, blijft bestaan") && zie.includes("telling voor het hele team, zonder namen") && zie.includes("De pro ziet het antwoord per speler")
        : zie.includes("Nobody has to") && zie.includes("from four players") && zie.includes("a report that has already been made stays as it is") && zie.includes("count for the whole team, without names") && zie.includes("The pro sees the answer per player"),
        "wie ziet wat: niet meedoen, stoppen met delen, wie het antwoord op de teamvraag ziet");
      ok(zie.includes("support@mentalroutine.com"), "wie ziet wat: adres buiten captain en pro om");
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
      ok(!!hp && hp.y >= 0 && hp.y + hp.height <= grens && hpTekst.includes("€15") && hpTekst.includes("€99"), `prijs op het eerste scherm (${naam}: onderkant ${hp ? Math.round(hp.y + hp.height) : "?"}px, grens ${Math.round(grens)}px)`);
      if (naam === "mobiel") await page.screenshot({ path: path.join(OUT, `teams_${lang}_mobiel_eerste_scherm.png`) });
      ok((await page.locator("#wie-ziet-wat").count()) === 1, "blok 'Wie ziet wat'");
      ok(!/deel[t]? (je|de eigen) scores|share your (own )?scores/i.test(tekst), "niet meer 'je deelt je scores binnen het team'");
      const vb = await page.locator("#voorbeeld-knop").getAttribute("href");
      ok(vb === `/samples?report=team&team=h18&doc=report&lang=${lang}&source=teams&preview=teams`, `voorbeeldknop → ${vb}`);
      const vbPro = await page.locator("#voorbeeld-bijlage").getAttribute("href");
      ok(/report=team&team=h18&doc=annex/.test(vbPro || "") && /preview=teams/.test(vbPro || ""), `voorbeeld van de bijlage in het pro-blok → ${vbPro}`);
      ok(tekst.includes("$79") && tekst.includes(lang === "nl" ? "in dollars" : "in US dollars"), "valuta: dollars één keer benoemd");

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

  // Teamblok op /pro-program: verborgen zonder preview, zichtbaar met ?preview=teams
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  console.log("\n== /pro-program teamblok");
  await page.goto(`${BASE}/pro-program?lang=nl`, { waitUntil: "networkidle" });
  ok((await page.locator("#teams").count()) === 0, "zonder preview: geen teamblok en geen link naar /teams");
  ok((await page.locator('a[href^="/teams"]').count()) === 0, "zonder preview: nergens een link naar /teams");
  await page.goto(`${BASE}/pro-program?lang=nl&preview=teams`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  ok((await page.locator("#teams").count()) === 1, "met ?preview=teams: teamblok zichtbaar");
  await page.locator("#teams").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.locator("#teams").screenshot({ path: path.join(OUT, "pro_program_teamblok_nl.png") });
  const bijlage = await page.locator("#team-annex-sample").getAttribute("href");
  ok(/\/samples\?report=team&team=h18&doc=annex&lang=nl/.test(bijlage || "") && /preview=teams/.test(bijlage || ""), `teamblok: link naar de voorbeeldbijlage → ${bijlage}`);
  const blok = await page.locator("#teams").innerText();
  ok(blok.includes("lessenreeks van vier lessen") && blok.includes("scores per speler"), "teamblok: één zin over wat de pro krijgt");
  ok(blok.includes("Reken op een paar avonden") && blok.includes("anderhalf tot twee uur, plus je voorbereiding") && blok.includes("in deze volgorde"), "teamblok: de stappen in volgorde met eerlijke tijden");
  ok(blok.includes("Een teamrapport telt niet mee voor die vijf") && blok.includes("Jouw lessen zitten daar niet in"), "teamblok: teamrapport telt niet mee; lessen niet in de teamprijs");
  ok(!/teamcode|paar minuten/i.test(blok), "teamblok: geen teamcode, geen 'een paar minuten'");
  ok(!/koppel|opstelling|pairing|line-?up/i.test(blok) && !blok.includes("—"), "teamblok: geen afgekeurde woorden of gedachtestreepjes");
  const sm = await (await page.request.get(`${BASE}/sitemap.xml`)).text();
  ok(!sm.includes("/teams"), "/teams staat niet in de sitemap");

  // Teamvoorbeelden op /samples: verborgen zonder preview, zichtbaar met ?preview=teams
  console.log("\n== /samples teamvoorbeelden");
  const fout = [];
  page.on("pageerror", (e) => fout.push(String(e)));
  const eerste = () => page.locator("#viewer img").first().getAttribute("src");
  await page.goto(`${BASE}/samples?lang=nl`, { waitUntil: "networkidle" });
  ok((await page.locator("#sample-kind").count()) === 0 && (await page.locator("#team-samples").count()) === 0, "zonder preview: geen teamsectie op /samples");
  ok(!/teamrapport/i.test(await page.locator("main").innerText()), "zonder preview: het woord teamrapport staat nergens op /samples");
  await page.goto(`${BASE}/samples?lang=nl&report=team&team=h27&doc=annex`, { waitUntil: "networkidle" });
  ok((await page.locator("#team-samples").count()) === 0 && (await eerste()) === "/samples/alex/quickscan-nl/p01.webp", "zonder preview: een teamlink toont gewoon Alex' QuickScan");
  await page.goto(`${BASE}/samples?lang=nl&preview=teams`, { waitUntil: "networkidle" });
  ok((await page.locator("#sample-kind").count()) === 1, "met ?preview=teams: keuze 'Drie golfers / Teamrapport'");
  ok((await eerste()) === "/samples/alex/quickscan-nl/p01.webp", "met preview: de bestaande voorbeelden staan nog steeds voorop");
  const titelGolfers = await page.title();
  ok(/Three Golfers/.test(titelGolfers), `documenttitel bij de golfers ongewijzigd (${titelGolfers})`);
  await page.locator("#sample-kind").getByRole("tab", { name: "Teamrapport" }).click();
  await page.waitForTimeout(200);
  ok((await page.title()).startsWith("Voorbeeld teamrapport"), `documenttitel volgt de teamvoorbeelden (${await page.title()})`);
  ok((await page.locator("#team-samples [data-team]").count()) === 5 && (await page.locator("#team-samples [data-doc]").count()) === 2, "teamsectie: vijf smaken en twee documenten");
  ok(/report=team/.test(page.url()) && /team=h18/.test(page.url()) && /preview=teams/.test(page.url()), `de keuze staat in het adres (${page.url()})`);
  await page.locator("#sample-kind").getByRole("tab", { name: "Drie golfers" }).click();
  ok((await eerste()) === "/samples/alex/quickscan-nl/p01.webp" && !/team=/.test(page.url()), "terug naar de golfers");
  await page.waitForTimeout(200);
  ok((await page.title()) === titelGolfers, `terug bij de golfers: de oude documenttitel (${await page.title()})`);

  const PAGINAS = { h18: { report: { nl: 22, en: 23 }, annex: { nl: 6, en: 6 } }, h27: { report: { nl: 22, en: 22 }, annex: { nl: 5, en: 5 } },
    h36: { report: { nl: 22, en: 23 }, annex: { nl: 6, en: 6 } }, small: { report: { nl: 22, en: 22 }, annex: { nl: 5, en: 5 } },
    even: { report: { nl: 20, en: 20 }, annex: { nl: 6, en: 6 } } };
  for (const lang of ["nl", "en"]) {
    for (const smaak of Object.keys(PAGINAS)) {
      for (const doc of ["report", "annex"]) {
        await page.goto(`${BASE}/samples?report=team&team=${smaak}&doc=${doc}&lang=${lang}&preview=teams`, { waitUntil: "domcontentloaded" });
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
  await page.goto(`${BASE}/samples?report=team&team=h18&doc=annex&lang=en&preview=teams`, { waitUntil: "networkidle" });
  const st = await page.locator("main").innerText();
  ok(st.includes("Only the pro receives this annex; the captain and the team do not."), "EN: regel bij de bijlage");
  ok((await page.title()).startsWith("Sample Team Reports"), `EN: documenttitel van de teamvoorbeelden (${await page.title()})`);
  ok(st.includes("The teams are made up, the reports are real output"), "EN: de teams zijn verzonnen, de rapporten echt");
  ok(!st.includes("—") && !/koppel|opstelling|pairing|line-?up/i.test(st), "teamsectie: geen gedachtestreepjes of afgekeurde woorden");
  await page.goto(`${BASE}/samples?report=team&team=h18&doc=annex&lang=nl&preview=teams`, { waitUntil: "networkidle" });
  ok((await page.locator("main").innerText()).includes("Alleen de pro krijgt deze bijlage; de captain en het team niet."), "NL: regel bij de bijlage");
  ok(fout.length === 0, `geen fouten op /samples ${fout.slice(0, 2).join(" | ")}`);
  await browser.close();

  console.log(fouten.length ? `\n${fouten.length} FOUT(EN):\n - ${fouten.join("\n - ")}` : "\nALLES OK");
  process.exit(fouten.length ? 1 : 0);
})();
