"use client";

// Cookie notice (in the root layout, so on every page). Microsoft Clarity is only loaded after "Accept".
// Declining is exactly as easy as accepting: two buttons of the same size and the same style.
// The notice sits at the bottom without blocking the page; if a page has a fixed bar at the bottom
// (marked with data-sticky-bottom, e.g. the mobile button on /teams) the notice moves up above it.
import React, { useCallback, useEffect, useState } from "react";
import { OPEN_EVENT, loadClarity, readConsent, removeClarity, writeConsent, type ConsentChoice } from "@/lib/cookie-consent";

type CLang = "nl" | "en";
const TEXT: Record<CLang, { title: string; body: string; privacy: string; decline: string; accept: string; settings: string }> = {
  nl: {
    title: "Cookies",
    body: "We gebruiken Microsoft Clarity om te zien hoe de site wordt gebruikt. Clarity plaatst daarvoor cookies. We laden Clarity alleen als jij dat goed vindt. Onze gewone statistieken werken zonder cookies.",
    privacy: "Privacyverklaring", decline: "Weigeren", accept: "Accepteren", settings: "Cookie-instellingen",
  },
  en: {
    title: "Cookies",
    body: "We use Microsoft Clarity to see how the site is used. Clarity sets cookies for that. We only do so if you agree. Our regular statistics work without cookies.",
    privacy: "Privacy Statement", decline: "Decline", accept: "Accept", settings: "Cookie settings",
  },
};

/** The site language as the pages set it on <html lang> (LangProvider); anything but Dutch gets English. */
function useSiteLang(): CLang {
  const [lang, setLang] = useState<CLang>("en");
  useEffect(() => {
    const read = () => setLang(document.documentElement.lang === "nl" ? "nl" : "en");
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => obs.disconnect();
  }, []);
  return lang;
}

/** Height of a fixed bar at the bottom of the page, so the notice can sit above it. */
function useStickyOffset(active: boolean): number {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (!active) return;
    const measure = () => {
      let h = 0;
      document.querySelectorAll<HTMLElement>("[data-sticky-bottom]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.height > 0 && getComputedStyle(el).display !== "none" && r.bottom >= window.innerHeight - 1) h = Math.max(h, r.height);
      });
      setOffset(h);
    };
    measure();
    const later = () => { measure(); window.setTimeout(measure, 450); };
    window.addEventListener("scroll", later, { passive: true });
    window.addEventListener("resize", measure);
    const t = window.setInterval(measure, 1000);
    return () => { window.removeEventListener("scroll", later); window.removeEventListener("resize", measure); window.clearInterval(t); };
  }, [active]);
  return offset;
}

export function CookieConsent() {
  const lang = useSiteLang();
  const T = TEXT[lang];
  const [open, setOpen] = useState(false);
  const offset = useStickyOffset(open);

  useEffect(() => {
    const choice = readConsent();
    if (choice === "granted") loadClarity();
    if (choice === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = useCallback((choice: ConsentChoice) => {
    writeConsent(choice);
    if (choice === "granted") loadClarity(); else removeClarity();
    setOpen(false);
  }, []);

  if (!open) return null;
  const btn = "w-full rounded-lg border border-amber-400 bg-amber-400 px-4 py-3 text-sm font-bold text-green-950 hover:bg-amber-300 transition-colors";
  return (
    <div
      id="cookie-notice" role="dialog" aria-modal="false" aria-labelledby="cookie-notice-title"
      className="fixed left-0 right-0 z-[70] px-3 sm:px-4 pointer-events-none"
      style={{ bottom: offset + 12 }}
    >
      <div className="pointer-events-auto mx-auto max-w-xl rounded-2xl border border-white/[0.12] bg-[#162b1e] px-5 py-4 shadow-2xl shadow-black/40">
        <p id="cookie-notice-title" className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-1.5">{T.title}</p>
        <p className="text-sm text-green-100/90 leading-relaxed">
          {T.body}{" "}
          <a id="cookie-privacy" href={`/privacy?lang=${lang}`} className="text-amber-300 underline underline-offset-2 hover:text-amber-200">{T.privacy}</a>
        </p>
        <div className="mt-3.5 grid grid-cols-2 gap-3">
          <button id="cookie-decline" type="button" onClick={() => choose("denied")} className={btn}>{T.decline}</button>
          <button id="cookie-accept" type="button" onClick={() => choose("granted")} className={btn}>{T.accept}</button>
        </div>
      </div>
    </div>
  );
}

/** "Cookie settings" link for footers: reopens the notice so the choice can be changed. */
export function CookieSettingsLink({ className }: { className?: string }) {
  const lang = useSiteLang();
  return (
    <button type="button" data-cookie-settings onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      {TEXT[lang].settings}
    </button>
  );
}
