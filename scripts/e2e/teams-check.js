// Controle van /teams in een echte browser (Chromium): NL + EN, desktop + mobiel, de doorstuurknop, de
// onvindbaarheid (noindex) en het teamblok op /pro-program (alleen met ?preview=teams zolang TEAMS_LIVE=false).
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

      const mail = await page.locator('a[href^="mailto:?subject="]').getAttribute("href");
      ok(decodeURIComponent(mail).includes(`/teams?lang=${lang}`), "mailknop bevat de link naar /teams in deze taal");
      const pro = await page.locator("#voor-de-pro a").getAttribute("href");
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
  const sm = await (await page.request.get(`${BASE}/sitemap.xml`)).text();
  ok(!sm.includes("/teams"), "/teams staat niet in de sitemap");
  await browser.close();

  console.log(fouten.length ? `\n${fouten.length} FOUT(EN):\n - ${fouten.join("\n - ")}` : "\nALLES OK");
  process.exit(fouten.length ? 1 : 0);
})();
