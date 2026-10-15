"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

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
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
