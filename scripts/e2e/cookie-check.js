// Controle van de cookiemelding in een echte browser (Chromium): Microsoft Clarity wordt alleen geladen na
// "Accepteren"; weigeren is even makkelijk; de keuze staat in localStorage (geen cookie); via "Cookie-instellingen"
// is ze te wijzigen; op een telefoon blijft de vaste knop op /teams te bedienen.
// Verzoeken naar clarity.ms worden onderschept (er gaat niets naar Microsoft) en geteld.
//   node cookie-check.js [basis-url]
const { chromium } = require("playwright");

const BASE = process.argv[2] || process.env.BASE || "http://localhost:3000";
const fouten = [];
const ok = (cond, wat) => { console.log(cond ? "  ok  " : "  FOUT", wat); if (!cond) fouten.push(wat); };

async function nieuw(browser, viewport = { width: 1366, height: 900 }) {
  const ctx = await browser.newContext({ viewport, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  const clarity = [];
  await page.route(/clarity\.ms/, (r) => { clarity.push(r.request().url()); r.fulfill({ status: 200, contentType: "application/javascript", body: "/* clarity onderschept */" }); });
  await page.route(/portal\.mentalroutine\.com/, (r) => r.abort());
  return { ctx, page, clarity };
}
const keuze = (page) => page.evaluate(() => { try { return JSON.parse(localStorage.getItem("mr_cookie_consent") || "null"); } catch { return "kapot"; } });
const open = async (page, url) => { await page.goto(url, { waitUntil: "networkidle" }); await page.waitForTimeout(500); };

(async () => {
  const browser = await chromium.launch();

  // ── 1. Eerste bezoek, weigeren ─────────────────────────────────────────────
  console.log("\n== eerste bezoek en weigeren (homepage, NL)");
  let { ctx, page, clarity } = await nieuw(browser);
  await open(page, `${BASE}/?lang=nl`);
  const melding = page.locator("#cookie-notice");
  ok(await melding.isVisible(), "bij een eerste bezoek staat de melding er");
  ok(clarity.length === 0, `zonder keuze is er geen verzoek naar clarity.ms (${clarity.length})`);
  ok((await keuze(page)) === null, "er is nog geen keuze bewaard");
  const tekst = await melding.innerText();
  ok(/^cookies/i.test(tekst.trim()) && tekst.includes("We gebruiken Microsoft Clarity om te zien hoe de site wordt gebruikt. Clarity plaatst daarvoor cookies. We laden Clarity alleen als jij dat goed vindt. Onze gewone statistieken werken zonder cookies."), "NL: kop en tekst van de melding");
  ok((await page.locator("#cookie-privacy").innerText()) === "Privacyverklaring" && (await page.locator("#cookie-privacy").getAttribute("href")) === "/privacy?lang=nl", "NL: link naar de privacyverklaring, met de taal");
  ok((await page.locator("#cookie-decline").innerText()) === "Weigeren" && (await page.locator("#cookie-accept").innerText()) === "Accepteren", "NL: knoppen Weigeren en Accepteren");
  const a = await page.locator("#cookie-decline").boundingBox(), b = await page.locator("#cookie-accept").boundingBox();
  const stijl = (id) => page.locator(id).evaluate((el) => { const s = getComputedStyle(el); return [s.backgroundColor, s.color, s.fontSize, s.fontWeight, s.borderColor].join("|"); });
  ok(Math.abs(a.width - b.width) <= 1 && Math.abs(a.height - b.height) <= 1 && Math.abs(a.y - b.y) <= 1, `de twee knoppen zijn even groot en staan naast elkaar (${Math.round(a.width)}x${Math.round(a.height)} en ${Math.round(b.width)}x${Math.round(b.height)})`);
  ok((await stijl("#cookie-decline")) === (await stijl("#cookie-accept")), "de twee knoppen hebben dezelfde stijl (weigeren is even goed zichtbaar)");
  const vp = page.viewportSize(), mb = await melding.boundingBox();
  ok(mb.height < vp.height * 0.45, `de melding blokkeert de pagina niet (${Math.round(mb.height)}px hoog)`);
  ok(await page.locator("#recognise input[type=checkbox]").first().isEnabled(), "de pagina erachter blijft te bedienen");

  await page.locator("#cookie-decline").click();
  await page.waitForTimeout(300);
  ok(!(await melding.isVisible()), "na Weigeren verdwijnt de melding");
  const k1 = await keuze(page);
  ok(k1 && k1.choice === "denied" && !Number.isNaN(Date.parse(k1.date)), `keuze bewaard in localStorage: ${JSON.stringify(k1)}`);
  ok(!(await page.evaluate(() => document.cookie)).includes("mr_cookie_consent") && (await ctx.cookies()).every((c) => !/consent/i.test(c.name)), "de keuze zelf staat niet in een cookie");
  await open(page, `${BASE}/?lang=nl`);
  ok(!(await melding.isVisible()) && clarity.length === 0, "na herladen: geen melding en nog steeds geen Clarity");
  await open(page, `${BASE}/teams?lang=nl`);
  ok(!(await melding.isVisible()) && clarity.length === 0, "ook op een andere pagina: geen melding, geen Clarity");

  // ── 2. Keuze wijzigen via Cookie-instellingen: accepteren ───────────────────
  console.log("\n== keuze wijzigen: accepteren, en weer intrekken");
  await open(page, `${BASE}/?lang=nl`);
  const inst = page.locator("#footer-legal [data-cookie-settings]");
  ok((await inst.innerText()) === "Cookie-instellingen", "homepage-footer: link Cookie-instellingen");
  await inst.scrollIntoViewIfNeeded();
  await inst.click();
  await page.waitForTimeout(300);
  ok(await melding.isVisible(), "Cookie-instellingen opent de melding opnieuw");
  await page.locator("#cookie-accept").click();
  await page.waitForTimeout(600);
  ok(!(await melding.isVisible()) && clarity.length === 1 && /clarity\.ms\/tag\/w8rr4hfxpz/.test(clarity[0]), `na Accepteren wordt Clarity geladen (${clarity[0] || "geen verzoek"})`);
  ok((await keuze(page)).choice === "granted", "keuze bewaard: granted");
  await open(page, `${BASE}/?lang=nl`);
  ok(!(await melding.isVisible()) && clarity.length === 2, `na herladen: geen melding en Clarity wordt weer geladen (${clarity.length} verzoeken)`);
  await open(page, `${BASE}/privacy?lang=nl`);
  ok(clarity.length === 3, "ook op een andere pagina wordt Clarity geladen");

  // intrekken: Clarity-cookies van het eigen domein weg, bij het volgende laden geen Clarity
  await page.evaluate(() => { document.cookie = "_clck=test; path=/"; document.cookie = "_clsk=test; path=/"; });
  ok((await page.evaluate(() => document.cookie)).includes("_clck"), "(proef) er staat een Clarity-cookie");
  const inst2 = page.locator("article [data-cookie-settings]");
  ok((await inst2.innerText()) === "Cookie-instellingen", "privacyverklaring: link Cookie-instellingen");
  await inst2.scrollIntoViewIfNeeded();
  await inst2.click();
  await page.locator("#cookie-decline").click();
  await page.waitForTimeout(300);
  const koek = await page.evaluate(() => document.cookie);
  ok(!koek.includes("_clck") && !koek.includes("_clsk"), `na intrekken zijn de Clarity-cookies van het eigen domein weg (${koek || "geen cookies"})`);
  ok((await keuze(page)).choice === "denied", "keuze bewaard: denied");
  const voor = clarity.length;
  await open(page, `${BASE}/privacy?lang=nl`);
  ok(clarity.length === voor && !(await melding.isVisible()), "na intrekken wordt Clarity bij het volgende laden niet meer geladen");
  await ctx.close();

  // ── 3. Engels en andere talen ────────────────────────────────────────────────
  console.log("\n== Engels, en andere talen");
  ({ ctx, page, clarity } = await nieuw(browser));
  await open(page, `${BASE}/?lang=en`);
  const en = await page.locator("#cookie-notice").innerText();
  ok(en.includes("We use Microsoft Clarity to see how the site is used. Clarity sets cookies for that. We only do so if you agree. Our regular statistics work without cookies."), "EN: tekst van de melding");
  ok((await page.locator("#cookie-decline").innerText()) === "Decline" && (await page.locator("#cookie-accept").innerText()) === "Accept" && (await page.locator("#cookie-privacy").innerText()) === "Privacy Statement" && (await page.locator("#cookie-privacy").getAttribute("href")) === "/privacy?lang=en", "EN: Decline / Accept / Privacy Statement");
  ok((await page.locator("#footer-legal [data-cookie-settings]").innerText()) === "Cookie settings", "EN: Cookie settings in de footer");
  await open(page, `${BASE}/?lang=de`);
  ok((await page.locator("#cookie-accept").innerText()) === "Accept", "andere talen (de) zien de Engelse melding");
  ok(clarity.length === 0, "nog steeds geen Clarity zonder keuze");
  await ctx.close();

  // ── 4. Telefoon: de vaste knop op /teams blijft te bedienen ─────────────────
  console.log("\n== telefoon 390x844: /teams");
  ({ ctx, page, clarity } = await nieuw(browser, { width: 390, height: 844 }));
  await open(page, `${BASE}/teams?lang=nl`);
  await page.waitForTimeout(1200);
  const m = await page.locator("#cookie-notice > div").boundingBox();
  const knop = page.locator("[data-sticky-bottom] button");
  const kb = await page.locator("[data-sticky-bottom]").boundingBox();
  ok(await page.locator("#cookie-notice").isVisible() && await knop.isVisible(), "melding en vaste knop zijn allebei zichtbaar");
  ok(m.y + m.height <= kb.y + 1, `de melding staat boven de vaste knop (onderkant melding ${Math.round(m.y + m.height)}px, bovenkant knopbalk ${Math.round(kb.y)}px)`);
  ok(m.x >= 0 && m.x + m.width <= 390 && m.height < 844 * 0.5, `de melding past op het scherm (${Math.round(m.width)}x${Math.round(m.height)}px)`);
  const ad = await page.locator("#cookie-decline").boundingBox(), ac = await page.locator("#cookie-accept").boundingBox();
  ok(Math.abs(ad.width - ac.width) <= 1 && Math.abs(ad.height - ac.height) <= 1 && ad.height >= 40, `telefoon: knoppen even groot en goed te raken (${Math.round(ad.width)}x${Math.round(ad.height)})`);
  const raak = await page.evaluate(() => { const b = document.querySelector("[data-sticky-bottom] button").getBoundingClientRect(); const el = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return !!el && !!el.closest("[data-sticky-bottom]"); });
  ok(raak, "niets ligt over de vaste knop heen");
  await knop.click();
  await page.waitForTimeout(900);
  ok((await page.evaluate(() => window.scrollY)) > 500, "de vaste knop werkt met de melding open (scrolt naar 'Stuur dit naar je pro')");
  ok(clarity.length === 0, "geen Clarity zonder keuze");
  const breed = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(breed <= 1, `geen horizontaal scrollen (${breed}px)`);
  await page.locator("#cookie-decline").click();
  await page.waitForTimeout(300);
  const ti = page.locator("#teams-footer-legal [data-cookie-settings]");
  await ti.scrollIntoViewIfNeeded();
  ok((await ti.innerText()) === "Cookie-instellingen", "teampagina: link Cookie-instellingen in de footer");
  await ti.click();
  await page.waitForTimeout(300);
  ok(await page.locator("#cookie-notice").isVisible(), "teampagina: de link opent de melding opnieuw");
  await page.locator("#cookie-decline").click();
  await open(page, `${BASE}/terms?lang=nl`);
  const vi = page.locator("article [data-cookie-settings]");
  await vi.scrollIntoViewIfNeeded();
  await vi.click();
  await page.waitForTimeout(300);
  ok(await page.locator("#cookie-notice").isVisible(), "voorwaarden: Cookie-instellingen opent de melding");
  await ctx.close();

  // ── 5. De losse QuickScan (quiz.html) volgt dezelfde keuze ──────────────────
  console.log("\n== QuickScan (quiz.html)");
  ({ ctx, page, clarity } = await nieuw(browser));
  await open(page, `${BASE}/quickscan?start=1&lang=nl&route=P1`);
  ok(clarity.length === 0, "QuickScan zonder keuze: geen Clarity");
  await page.evaluate(() => localStorage.setItem("mr_cookie_consent", JSON.stringify({ choice: "denied", date: new Date().toISOString() })));
  await open(page, `${BASE}/quickscan?start=1&lang=nl&route=P1`);
  ok(clarity.length === 0, "QuickScan na weigeren: geen Clarity");
  await page.evaluate(() => localStorage.setItem("mr_cookie_consent", JSON.stringify({ choice: "granted", date: new Date().toISOString() })));
  await open(page, `${BASE}/quickscan?start=1&lang=nl&route=P1`);
  ok(clarity.length === 1, "QuickScan na accepteren: Clarity wordt geladen");
  await ctx.close();

  // ── 6. De privacyverklaring zegt hetzelfde ─────────────────────────────────
  console.log("\n== privacyverklaring");
  ({ ctx, page, clarity } = await nieuw(browser));
  for (const [lang, zinnen] of [
    ["nl", ["Dat gebeurt alleen als je daar toestemming voor geeft in de cookiemelding. Zonder toestemming laden we Clarity niet.", "Je kunt je keuze altijd wijzigen via 'Cookie-instellingen' onderaan de pagina.", "Gerechtvaardigd belang voor statistieken zonder cookies; toestemming voor Microsoft Clarity"]],
    ["en", ["That only happens if you give consent for it in the cookie notice. Without consent we do not load Clarity.", "You can always change your choice through 'Cookie settings' at the bottom of the page.", "Legitimate interest for statistics without cookies; consent for Microsoft Clarity"]],
  ]) {
    await open(page, `${BASE}/privacy?lang=${lang}`);
    const t = await page.locator("article").innerText();
    ok(zinnen.every((z) => t.includes(z)) && !/cookies van derden blokkeren|block third-party cookies/.test(t), `privacyverklaring ${lang}: hoofdstuk 7 en de tabel volgen de cookiemelding`);
  }
  await ctx.close();

  await browser.close();
  console.log(fouten.length ? `\n${fouten.length} FOUT(EN):\n - ${fouten.join("\n - ")}` : "\nALLES OK");
  process.exit(fouten.length ? 1 : 0);
})();
