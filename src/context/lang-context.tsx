"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { applyPageMeta } from "@/lib/page-meta-nl";

export type Lang = "en" | "nl" | "de" | "fr" | "es";
type LangCtx = { lang: Lang; setLang: (l: Lang) => void };

const LangContext = createContext<LangCtx>({ lang: "en", setLang: () => {} });

const LANGS: readonly Lang[] = ["en", "nl", "de", "fr", "es"];
const STORAGE_KEY = "mr_lang";
const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as readonly string[]).includes(v);

/**
 * Starting language, in order: ?lang= in the URL (links/redirects, e.g. from /quickscan) →
 * the visitor's own earlier choice (remembered) → the browser language → English.
 */
function detectLang(): Lang {
  const q = new URLSearchParams(window.location.search).get("lang");
  if (isLang(q)) return q;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {}
  for (const l of navigator.languages ?? [navigator.language]) {
    const base = (l || "").slice(0, 2).toLowerCase();
    if (isLang(base)) return base;
  }
  return "en";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Server render + first client render stay "en" (no hydration mismatch); the
  // detected language is applied right after mount.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  // An explicit choice (language switcher) is remembered for the next visit.
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    // Nederlandse tekst mag Chrome niet "vertalen": de server levert eerst Engels, dus Chrome hield de pagina voor Engels en
    // maakte van "Swing" "schommel" (23-11-2026). Zie ook het script in de <head> van src/app/layout.tsx.
    if (lang === "nl") html.setAttribute("translate", "no");
    else html.removeAttribute("translate");
    // Next zet de <title> uit de metadata soms pas na de eerste render in de head: daarom ook bewaken (zoals /teams).
    applyPageMeta(lang);
    const obs = new MutationObserver(() => applyPageMeta(lang));
    obs.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => obs.disconnect();
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
