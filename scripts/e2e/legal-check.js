// Controle van de privacyverklaring (/privacy) en de algemene voorwaarden (/terms, alias /voorwaarden) in een echte
// browser (Chromium): NL + EN, desktop + telefoon, de taalwissel, de terugval naar Engels, de links ernaartoe op de
// homepage, de teampagina en /pro-program, en de sitemap.
//   node legal-check.js [basis-url]
const { chromium } = require("playwright");

const BASE = process.argv[2] || process.env.BASE || "http://localhost:3000";
const fouten = [];
const ok = (cond, wat) => { console.log(cond ? "  ok  " : "  FOUT", wat); if (!cond) fouten.push(wat); };

const DOC = {
  privacy: {
    nl: { h1: "Privacyverklaring", titel: "Privacyverklaring | MentalRoutine", koppen: 12, ander: "Algemene voorwaarden",
          zinnen: ["Versie 15 november 2026", "Innerprompt B.V.", "Meerlosebaan 12, 5971 NW Grubbenvorst", "KvK 42076580", "support@mentalroutine.com",
                   "1. In het kort", "6. Bedrijven die voor ons gegevens verwerken", "12. Wijzigingen", "Het tweede is vrijwillig", "Autoriteit Persoonsgegevens",
                   "Bij een verschil tussen de Nederlandse en de Engelse tekst geldt de Nederlandse."] },
    en: { h1: "Privacy Statement", titel: "Privacy Statement | MentalRoutine", koppen: 12, ander: "Terms and Conditions",
          zinnen: ["Version 15 November 2026", "Innerprompt B.V.", "Meerlosebaan 12, 5971 NW Grubbenvorst", "42076580", "support@mentalroutine.com",
                   "1. In short", "6. Companies that process data for us", "12. Changes", "The second is voluntary", "team question", "annex for the pro", "team link",
                   "If the Dutch and English texts differ, the Dutch text prevails."] },
  },
  terms: {
    nl: { h1: "Algemene voorwaarden", titel: "Algemene voorwaarden | MentalRoutine", koppen: 15, ander: "Privacyverklaring",
          zinnen: ["Versie 15 november 2026", "Innerprompt B.V.", "Meerlosebaan 12, 5971 NW Grubbenvorst", "KvK 42076580", "support@mentalroutine.com",
                   "1. Wat we leveren", "5. Bedenktijd en terugbetaling", "6. Het teamaanbod", "15. Toepasselijk recht", "14 dagen bedenktijd",
                   "heeft nog geen speler van het team het assessment gestart, dan kan de betaler binnen 14 dagen het hele bedrag terugvragen",
                   "Plekken die niet worden gebruikt, betalen we niet terug.", "Voor het teamaanbod moet je 18 jaar of ouder zijn.",
                   "Bij een verschil tussen de Nederlandse en de Engelse tekst geldt de Nederlandse."] },
    en: { h1: "Terms and Conditions", titel: "Terms and Conditions | MentalRoutine", koppen: 15, ander: "Privacy Statement",
          zinnen: ["Version 15 November 2026", "Innerprompt B.V.", "Meerlosebaan 12, 5971 NW Grubbenvorst", "42076580", "support@mentalroutine.com",
                   "1. What we provide", "5. Cooling-off period and refunds", "6. The team offer", "15. Applicable law", "cooling-off period of 14 days",
                   "if no player of the team has started the assessment yet, the payer can ask for the full amount back within 14 days",
                   "We do not refund places that are not used.", "For the team offer you must be 18 or over.", "payment link", "team link", "annex for the pro",
                   "If the Dutch and English texts differ, the Dutch text prevails."] },
  },
};

(async () => {
  const browser = await chromium.launch();

  for (const [naam, viewport] of [["desktop", { width: 1366, height: 900 }], ["telefoon", { width: 390, height: 844 }]]) {
    for (const kind of ["privacy", "terms"]) {
      for (const lang of ["nl", "en"]) {
        const D = DOC[kind][lang];
        const ctx = await browser.newContext({ viewport });
        const page = await ctx.newPage();
        const consoleFouten = [];
        page.on("pageerror", (e) => consoleFouten.push(String(e)));
        console.log(`\n== /${kind} ${lang} ${naam}`);
        const resp = await page.goto(`${BASE}/${kind}?lang=${lang}`, { waitUntil: "networkidle" });
        await page.waitForTimeout(400);
        ok(resp.status() === 200, `status ${resp.status()}`);
        ok((await page.locator("h1").innerText()) === D.h1, `kop: ${D.h1}`);
        ok((await page.title()) === D.titel, `paginatitel (${await page.title()})`);
        const tekst = await page.locator("main").innerText();
        for (const z of D.zinnen) ok(tekst.includes(z), `staat erin: ${z}`);
        ok((await page.locator("article h2").count()) === D.koppen, `${D.koppen} hoofdstukken`);
        ok(!tekst.includes("**") && !tekst.includes("—"), "geen losse opmaaktekens of gedachtestreepjes");
        ok((await page.locator('article a[href="mailto:support@mentalroutine.com"]').count()) >= 1, "support@ is een mailto-link");
        if (kind === "privacy") {
          const tab = page.locator("#verwerkers");
          await tab.scrollIntoViewIfNeeded();
          const box = await tab.boundingBox();
          ok(await tab.isVisible() && (await tab.locator("tbody tr").count()) === 7 && (await page.locator("#doelen tbody tr").count()) === 8, "tabel met verwerkers zichtbaar (7 rijen) en tabel met doelen (8 rijen)");
          ok(!!box && box.x >= 0 && box.x + box.width <= viewport.width + 1, `de tabel past binnen het scherm (${box ? Math.round(box.x + box.width) : "?"} van ${viewport.width}px)`);
          const tabTekst = await tab.innerText();
          ok(["Amazon Web Services", "OpenAI", "Lemon Squeezy", "Vercel", "Resend", "Plausible Analytics", "Microsoft (Clarity)"].every((b) => tabTekst.includes(b)), "alle zeven verwerkers staan in de tabel");
        }
        const breed = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        ok(breed <= 1, `geen horizontaal scrollen (${breed}px)`);
        const robots = await page.locator('meta[name="robots"]').getAttribute("content").catch(() => null);
        ok(!/noindex/.test(robots || "") && /index/.test(robots || ""), `indexeerbaar (robots = ${robots})`);
        ok((await page.locator('meta[name="description"]').getAttribute("content") || "").length > 60, "eigen beschrijving");
        const ander = page.locator("#legal-other");
        ok((await ander.innerText()) === D.ander && (await ander.getAttribute("href")) === `/${kind === "privacy" ? "terms" : "privacy"}?lang=${lang}`, `link naar het andere document (${await ander.getAttribute("href")})`);
        ok((await page.locator("#legal-home").getAttribute("href")) === `/?lang=${lang}`, "link terug naar de homepage, met de taal");
        ok(consoleFouten.length === 0, `geen fouten in de console ${consoleFouten.slice(0, 2).join(" | ")}`);
        await ctx.close();
      }
    }
  }

  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();

  console.log("\n== taalwissel, terugval, alias");
  await page.goto(`${BASE}/privacy?lang=nl`, { waitUntil: "networkidle" });
  await page.locator("#legal-lang").getByRole("button", { name: "EN" }).click();
  await page.waitForTimeout(200);
  ok((await page.locator("h1").innerText()) === "Privacy Statement" && (await page.title()) === "Privacy Statement | MentalRoutine", "taalwissel NL → EN op de pagina");
  await page.locator("#legal-lang").getByRole("button", { name: "NL" }).click();
  await page.waitForTimeout(200);
  ok((await page.locator("h1").innerText()) === "Privacyverklaring", "taalwissel EN → NL");
  await page.goto(`${BASE}/terms?lang=de`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  ok((await page.locator("h1").innerText()) === "Terms and Conditions", "andere talen (de) zien de Engelse tekst");
  await page.goto(`${BASE}/voorwaarden?lang=nl`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  ok(/\/terms\?lang=nl$/.test(page.url()) && (await page.locator("h1").innerText()) === "Algemene voorwaarden", `alias /voorwaarden → /terms, taal blijft (${page.url()})`);
  const kaal = await page.request.get(`${BASE}/terms`);
  const html = await kaal.text();
  ok(kaal.status() === 200 && html.includes("Terms and Conditions") && html.includes("Innerprompt B.V.") && html.includes("6. The team offer"), "zonder JavaScript staat de volledige Engelse tekst in de HTML");

  console.log("\n== links naar de twee documenten");
  for (const lang of ["nl", "en"]) {
    await page.goto(`${BASE}/?lang=${lang}`, { waitUntil: "networkidle" });
    const f = page.locator("#footer-legal a");
    ok((await f.count()) === 2 && (await f.nth(0).getAttribute("href")) === `/privacy?lang=${lang}` && (await f.nth(1).getAttribute("href")) === `/terms?lang=${lang}`
       && (await f.nth(0).innerText()) === "Privacy" && (await f.nth(1).innerText()) === (lang === "nl" ? "Voorwaarden" : "Terms"), `homepage ${lang}: footer heeft Privacy en ${lang === "nl" ? "Voorwaarden" : "Terms"}`);

    await page.goto(`${BASE}/teams?lang=${lang}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    ok((await page.locator("#zie-privacy").getAttribute("href")) === `/privacy?lang=${lang}`, `teampagina ${lang}: link naar de privacyverklaring onder 'Wie ziet wat'`);
    ok((await page.locator("#prijs-voorwaarden").getAttribute("href")) === `/terms?lang=${lang}`, `teampagina ${lang}: link naar de voorwaarden bij de prijs`);
    const faqP = page.locator('#vragen a[data-legal="privacy"]'), faqT = page.locator('#vragen a[data-legal="terms"]');
    ok((await faqP.count()) === 1 && (await faqP.first().getAttribute("href")) === `/privacy?lang=${lang}`, `teampagina ${lang}: FAQ 'wie ziet mijn gegevens' linkt naar de privacyverklaring`);
    ok((await faqT.count()) === 2 && (await faqT.first().getAttribute("href")) === `/terms?lang=${lang}`, `teampagina ${lang}: FAQ over betalen en terugbetalen linkt naar de voorwaarden (2x)`);
    const tf = page.locator("#teams-footer-legal a");
    ok((await tf.count()) === 2 && (await tf.nth(0).getAttribute("href")) === `/privacy?lang=${lang}` && (await tf.nth(1).getAttribute("href")) === `/terms?lang=${lang}`, `teampagina ${lang}: beide links onderaan`);

    await page.goto(`${BASE}/pro-program?lang=${lang}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const pp = page.locator("#pro-privacy-link");
    ok((await pp.getAttribute("href")) === `/privacy?lang=${lang}` && (await pp.innerText()) === (lang === "nl" ? "Privacyverklaring" : "Privacy Statement"), `pro-program ${lang}: link naar de privacyverklaring onder het formulier`);
  }
  await page.goto(`${BASE}/?lang=nl`, { waitUntil: "networkidle" });
  await page.locator("#footer-legal a").nth(1).click();
  await page.waitForURL(/\/terms\?lang=nl/);
  ok((await page.locator("h1").innerText()) === "Algemene voorwaarden", "de footerlink opent de voorwaarden in het Nederlands");

  const sm = await (await page.request.get(`${BASE}/sitemap.xml`)).text();
  ok(sm.includes("https://www.mentalroutine.com/privacy") && sm.includes("https://www.mentalroutine.com/terms"), "sitemap bevat /privacy en /terms");

  await browser.close();
  console.log(fouten.length ? `\n${fouten.length} FOUT(EN):\n - ${fouten.join("\n - ")}` : "\nALLES OK");
  process.exit(fouten.length ? 1 : 0);
})();
