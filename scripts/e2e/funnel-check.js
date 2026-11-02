// Funnel regression check for www.mentalroutine.com (homepage → narratives → QuickScan → result →
// /assessment). Runs in a real headless browser (Playwright/Chromium). Calls to the portal are
// BLOCKED, so nothing is written to the production database. See README.md in this folder.
//
//   BASE=http://localhost:3123 node funnel-check.js        (local `npx next dev -p 3123`)
//   BASE=https://www.mentalroutine.com node funnel-check.js (live site)
const { chromium } = require("playwright");
const BASE = (process.env.BASE || "http://localhost:3123").replace(/\/$/, "");

let failures = 0;
function check(name, cond, detail = "") {
  console.log(`${cond ? "OK  " : "FAIL"} ${name}${detail ? "  — " + detail : ""}`);
  if (!cond) failures++;
}

async function newPage(browser, locale = "en-US") {
  const ctx = await browser.newContext({ locale, viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  // Block analytics + the portal; capture Plausible events in window.__ev instead.
  await page.route(/portal\.mentalroutine\.com|\/js\/script\.js|clarity\.ms|\/api\/event/, (r) => r.abort());
  await page.addInitScript(() => {
    window.__ev = [];
    window.plausible = (e, o) => window.__ev.push([e, o && o.props]);
  });
  return { ctx, page, errors };
}
const events = (page, name) => page.evaluate((n) => window.__ev.filter((e) => e[0] === n), name);
const inView = (page, sel) =>
  page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }, sel);

(async () => {
  const browser = await chromium.launch();

  // 1. Homepage: default hero hook, checkboxes, start button, route list → QuickScan at hole 1
  {
    const { ctx, page, errors } = await newPage(browser);
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const h1 = (await page.locator("h1").first().innerText()).replace(/\s+/g, " ");
    check("hero shows P1.1 hook", h1.includes("scorecard still tell a different story"), h1);
    const start = page.locator("#recognise").getByText("Start the QuickScan");
    check("start button disabled before ticking", (await start.getAttribute("aria-disabled")) === "true");
    await page.getByText("I'm a better golfer than my scores show.").click();
    await page.getByText("I can go from confident to clueless in three holes.").click();
    check("counter shows 2 selected", (await page.locator("#recognise p[aria-live]").innerText()) === "2 selected");
    check("narrative_click per tick", (await events(page, "narrative_click")).length === 2);
    await page.locator("#recognise a", { hasText: "Start the QuickScan" }).click();
    await page.waitForURL(/\/quickscan/);
    await page.waitForTimeout(800);
    check("QuickScan url carries both routes", page.url().endsWith("/quickscan?start=1&lang=en&route=P1,E2"), page.url());
    check("quiz visible at hole 1", (await page.locator("#phase-quiz").isVisible()) && /1/.test(await page.locator("#quiz-progress-label").innerText()));
    const qs = await events(page, "quiz_start");
    check("quiz_start has route P1,E2", qs[0] && qs[0][1] && qs[0][1].route === "P1,E2", JSON.stringify(qs));
    check("no page errors (homepage flow)", errors.length === 0, errors.join(" | "));
    await ctx.close();
  }

  // 2. Every CTA goes to #recognise; an ad route pre-ticks its narrative and keeps the sub-route
  {
    const { ctx, page } = await newPage(browser);
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.locator("#hero a", { hasText: "Take the free QuickScan" }).click();
    await page.waitForTimeout(1000);
    check("hero CTA → #recognise", page.url().endsWith("/#recognise") && (await inView(page, "#recognise")), page.url());
    check("navbar CTA → /#recognise", (await page.locator("header a", { hasText: "Free QuickScan" }).first().getAttribute("href")) === "/#recognise");
    await page.goto(BASE + "/?route=P4.2", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const h1 = (await page.locator("h1").first().innerText()).replace(/\s+/g, " ");
    check("ad route swaps hero hook", h1.includes("You can hit the shot in practice"), h1);
    check("ad route pre-ticks P4", await page.getByRole("checkbox", { name: "I can't reproduce my best golf consistently." }).isChecked());
    await page.getByText("I can't shake off a bad shot.").click();
    await page.locator("#recognise a", { hasText: "Start the QuickScan" }).click();
    await page.waitForURL(/\/quickscan/);
    check("ad sub-route kept on start", page.url().includes("route=P4.2,E1"), page.url());
    await page.goto(BASE + "/methodology", { waitUntil: "networkidle" });
    check("methodology CTA → /#recognise", (await page.locator("a", { hasText: "Take the free QuickScan" }).last().getAttribute("href")) === "/#recognise");
    await ctx.close();
  }

  // 3. /quickscan without a route redirects to the narratives (language kept)
  {
    const { ctx, page } = await newPage(browser, "en-US");
    await page.goto(BASE + "/quickscan?lang=nl", { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    check("/quickscan?lang=nl → /?lang=nl#recognise", page.url().includes("/?lang=nl") && page.url().endsWith("#recognise"), page.url());
    check("…and the homepage is Dutch", (await page.locator("#recognise h2").innerText()).includes("herken jij"));
    await ctx.close();
  }

  // 4. Language detection: ?lang > remembered choice > browser language > EN
  for (const [loc, expect] of [["nl-NL", "herken jij"], ["de-DE", "klingen nach dir"], ["fr-FR", "vous ressemblent"], ["es-ES", "van contigo"], ["it-IT", "sound like you"]]) {
    const { ctx, page } = await newPage(browser, loc);
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    check(`browser ${loc} → right language`, (await page.locator("#recognise h2").innerText()).includes(expect));
    await ctx.close();
  }

  // 5. Full QuickScan play-through (NL + EN): result screen promises + bands + no share buttons
  for (const lang of ["nl", "en"]) {
    const { ctx, page, errors } = await newPage(browser, lang === "nl" ? "nl-NL" : "en-US");
    await page.goto(`${BASE}/quickscan?start=1&lang=${lang}&route=P1,E2`, { waitUntil: "networkidle" });
    for (let i = 0; i < 15; i++) {
      if (await page.locator("#phase-results").isVisible()) break;
      const radio = page.locator('input[name="intake-geslacht"]').first();
      if (await radio.count()) await radio.check();
      if (await page.locator("#intake-jaar").count()) await page.selectOption("#intake-jaar", { index: 30 });
      const hcp = page.locator("#intake-hcp");
      if (await hcp.count()) { await hcp.fill("18"); await hcp.dispatchEvent("input"); await hcp.dispatchEvent("change"); }
      for (const item of await page.locator(".quiz-q-item").all()) {
        const btns = item.locator(".scale-btn");
        const n = await btns.count();
        if (n) await btns.nth(Math.floor(Math.random() * n)).click();
      }
      const next = page.locator("#quiz-next-btn");
      if (await next.isEnabled()) await next.click(); else break;
      await page.waitForTimeout(350);
    }
    await page.waitForTimeout(2500);
    check(`[${lang}] result screen reached`, await page.locator("#phase-results").isVisible());
    const bands = await page.locator(".donut-niveau").allInnerTexts();
    const okBands = lang === "nl" ? /^(GROEIPUNT|WERKGEBIED|STERKTE)$/i : /^(GROWTH AREA|WORKING AREA|STRENGTH)$/i;
    check(`[${lang}] phase badges use portal bands`, bands.length === 3 && bands.every((b) => okBands.test(b.trim())), bands.join(","));
    const steps = await page.locator(".domain-bar-name").allInnerTexts();
    check(`[${lang}] step 8 is Transfer`, steps[7] === "Transfer", steps.join(","));
    check(`[${lang}] no share buttons`, (await page.locator(".share-buttons, .thanks-share").count()) === 0);
    check(`[${lang}] no sample training report in "what you get"`, (await page.locator('a[href*="sample-training-report"]').count()) === 0);
    const checklist = (await page.locator("#optin-checklist").innerText()).toLowerCase();
    check(`[${lang}] no "exercises tailored to your handicap" promise`, !/oefeningen op maat|exercises tailored/.test(checklist));
    check(`[${lang}] "already convinced" → /assessment?lang=${lang}`, (await page.locator("#optin-buy-escape").getAttribute("href")) === `/assessment?lang=${lang}`);
    check(`[${lang}] sample link → /samples (QuickScan, new tab)`, (await page.locator("#optin-sample-link").getAttribute("href")) === `/samples?report=quickscan&source=quiz&lang=${lang}` && (await page.locator("#optin-sample-link").getAttribute("target")) === "_blank");
    check(`[${lang}] no page errors (QuickScan)`, errors.length === 0, errors.join(" | "));
    await ctx.close();
  }

  // 6. Quiet ways into /assessment: link below the FAQ + footer menu; page shows QUICKSCAN10
  {
    const { ctx, page } = await newPage(browser, "nl-NL");
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    check("FAQ link → /assessment?lang=nl", (await page.locator("#faq a", { hasText: "MentalRoutine Assessment" }).getAttribute("href")) === "/assessment?lang=nl");
    check("footer link → /assessment?lang=nl", (await page.locator("footer nav a", { hasText: "Het volledige assessment" }).getAttribute("href")) === "/assessment?lang=nl");
    await page.goto(BASE + "/assessment?lang=nl", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const h1 = (await page.locator("h1").first().innerText()).replace(/\s+/g, " ");
    check("/assessment headline (no overclaim)", h1.includes("Je hele mentale spel, stap voor stap"), h1);
    check("/assessment mentions QUICKSCAN10", (await page.content()).includes("QUICKSCAN10"));
    await ctx.close();
  }

  // 7. Sample reports: three golfers × QuickScan / profile / training, NL or EN reports, old URLs redirect
  {
    const { ctx, page, errors } = await newPage(browser, "nl-NL");
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    check("homepage sample link → /samples", (await page.locator("#recognise a", { hasText: "voorbeeldrapporten" }).getAttribute("href")) === "/samples?lang=nl&source=home");
    await page.goto(BASE + "/assessment?lang=nl", { waitUntil: "networkidle" });
    const prev = page.locator("a", { hasText: "Bekijk voorbeeldrapporten" });
    check("/assessment preview → /samples in a new tab", (await prev.getAttribute("href")) === "/samples?report=profile&source=assessment" && (await prev.getAttribute("target")) === "_blank");
    await page.goto(BASE + "/voorbeelden?lang=nl&golfer=sam&report=quickscan", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    check("/voorbeelden → /samples (query kept)", page.url().includes("/samples?") && page.url().includes("golfer=sam"), page.url());
    const imgs = () => page.locator("#viewer img").evaluateAll((els) => els.map((e) => e.getAttribute("src")));
    let src = await imgs();
    check("deep link shows Sam's NL QuickScan (11 pages)", src.length === 11 && src[0] === "/samples/sam/quickscan-nl/p01.webp", src[0]);
    const first = await page.evaluate(() => fetch("/samples/sam/quickscan-nl/p01.webp").then((r) => r.status + " " + r.headers.get("content-type")));
    check("page image is served", first === "200 image/webp", first);
    await page.getByRole("tab", { name: /Chris/ }).click();
    src = await imgs();
    check("switching golfer keeps the report", src[0] === "/samples/chris/quickscan-nl/p01.webp", src[0]);
    check("…and updates the url", page.url().includes("golfer=chris") && page.url().includes("report=quickscan"));
    const views = await events(page, "sample_view");
    check("sample_view events (deep link + pick)", views.length === 2 && views[1][1].golfer === "chris", JSON.stringify(views));
    await page.getByRole("tab", { name: /Trainingsrapport/ }).click();
    const viewer = await page.locator("#viewer").innerText();
    check("missing sample shows 'coming soon', no broken images", (await imgs()).length > 0 || viewer.includes("binnenkort"), viewer.slice(0, 80));
    await page.goto(BASE + "/samples?lang=de&golfer=alex&report=training", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    src = await imgs();
    check("DE visitor gets the EN reports", src[0] === "/reports/training-samples/alex/p01.webp", src[0]);
    check("…with a language note", (await page.content()).includes("auf Englisch"));
    await page.goto(BASE + "/reports/sample-standard.html", { waitUntil: "networkidle" });
    check("old sample profile URL → /samples", page.url().includes("/samples?report=profile"), page.url());
    check("no page errors (samples)", errors.length === 0, errors.join(" | "));
    await ctx.close();
  }

  await browser.close();
  console.log(failures ? `\n${failures} CHECK(S) FAILED` : "\nALL CHECKS PASSED");
  process.exit(failures ? 1 : 0);
})();
