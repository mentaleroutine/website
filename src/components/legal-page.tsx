"use client";

// Privacy Statement (/privacy) and Terms and Conditions (/terms): one calm reading page for both.
// Text and structure come from lib/legal-text.ts (NL leading, EN faithful translation; other languages see EN).
// No entrance animations: nothing on these pages may ever be hidden from a reader or a crawler.
import React, { useEffect } from "react";
import { LangProvider, useLang } from "@/context/lang-context";
import { LEGAL_TEXT, legalHref, legalLang, type LegalBlock, type LegalKind, type LegalLang } from "@/lib/legal-text";

const serif = { fontFamily: "var(--font-cormorant), serif" } as const;
const MAIL = "support@mentalroutine.com";

/** **bold** and the support address are the only inline markup in the legal texts. */
function Inline({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  text.split("**").forEach((part, i) => {
    const bits = part.split(MAIL);
    const nodes = bits.flatMap((b, j) =>
      j < bits.length - 1
        ? [b, <a key={`m${i}-${j}`} href={`mailto:${MAIL}`} className="text-amber-800 underline underline-offset-2 hover:text-amber-900 break-words">{MAIL}</a>]
        : [b],
    );
    out.push(i % 2 === 1 ? <strong key={i} className="font-semibold text-green-950">{nodes}</strong> : <React.Fragment key={i}>{nodes}</React.Fragment>);
  });
  return <>{out}</>;
}

function Block({ b }: { b: LegalBlock }) {
  if (b.t === "p") return <p className="text-[15px] text-stone-700 leading-relaxed mb-4"><Inline text={b.x} /></p>;
  if (b.t === "sub") return <h3 className="text-[15px] font-semibold text-green-950 mt-6 mb-2">{b.x}</h3>;
  if (b.t === "ul") {
    return (
      <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-amber-600">
        {b.items.map((it, i) => <li key={i} className="text-[15px] text-stone-700 leading-relaxed pl-1"><Inline text={it} /></li>)}
      </ul>
    );
  }
  // Table: fixed layout and wrapping text, so it never runs off a phone screen.
  return (
    <div className="mb-5 rounded-xl border border-green-900/10 bg-white overflow-hidden">
      <table id={b.id} className="w-full table-fixed border-collapse text-[13px] sm:text-sm">
        <thead>
          <tr className="bg-green-950 text-left">
            {b.head.map((h, i) => <th key={i} scope="col" className="px-3 py-2.5 font-semibold text-[#f6f1e7] align-top break-words">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {b.rows.map((r, i) => (
            <tr key={i} className="border-t border-green-900/10">
              {r.map((c, j) => (
                <td key={j} className={`px-3 py-2.5 align-top leading-snug break-words [overflow-wrap:anywhere] ${j === 0 ? "text-green-950 font-medium" : "text-stone-700"}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LangSwitch() {
  const { lang, setLang } = useLang();
  const L = legalLang(lang);
  const btn = (code: LegalLang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={L === code}
      className={`px-2.5 py-1 text-xs font-semibold tracking-widest uppercase rounded-md transition-colors ${
        L === code ? "bg-amber-400 text-green-950" : "text-green-200/70 hover:text-amber-300"
      }`}
    >
      {label}
    </button>
  );
  return (
    <div id="legal-lang" className="flex items-center gap-1 rounded-lg border border-white/[0.12] bg-white/[0.06] p-1" aria-label="Taal / Language">
      {btn("nl", "NL")}
      {btn("en", "EN")}
    </div>
  );
}

function LegalContent({ kind }: { kind: LegalKind }) {
  const { lang } = useLang();
  const L = legalLang(lang);
  const D = LEGAL_TEXT[kind][L];
  const otherKind: LegalKind = kind === "privacy" ? "terms" : "privacy";

  // The static metadata (layout.tsx) is English; the tab title follows the chosen language.
  useEffect(() => {
    const set = () => { if (document.title !== D.docTitle) document.title = D.docTitle; };
    set();
    const obs = new MutationObserver(set);
    obs.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => obs.disconnect();
  }, [D.docTitle]);

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#1a1c18]">
      <header className="bg-[#162b1e]">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a id="legal-home" href={`/?lang=${lang}`} className="font-semibold text-amber-100/90 tracking-wide hover:text-amber-200 transition-colors" style={{ ...serif, fontSize: "1.15rem" }} aria-label={D.home}>
            Mental<span className="text-amber-400">Routine</span>
          </a>
          <LangSwitch />
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 sm:px-6 pt-10 pb-16">
        <p className="mb-6">
          <a href={`/?lang=${lang}`} className="text-sm text-amber-800 underline underline-offset-4 hover:text-amber-900">← {D.home}</a>
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-green-950 leading-tight mb-2" style={serif}>{D.title}</h1>
        <p id="legal-version" className="text-sm text-stone-500 mb-8">{D.version}</p>

        {D.intro.map((b, i) => <Block key={i} b={b} />)}

        {D.sections.map((s, i) => (
          <section key={i} className="mt-10">
            <h2 className="text-2xl sm:text-[1.7rem] font-semibold text-green-950 leading-snug mb-4" style={serif}>{s.h}</h2>
            {s.blocks.map((b, j) => <Block key={j} b={b} />)}
          </section>
        ))}

        <p id="legal-closing" className="mt-10 pt-6 border-t border-green-900/10 text-sm text-stone-600 leading-relaxed">{D.closing}</p>

        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a id="legal-other" href={legalHref(otherKind, lang)} className="text-amber-800 underline underline-offset-4 hover:text-amber-900">{D.other}</a>
          <a href={`/?lang=${lang}`} className="text-amber-800 underline underline-offset-4 hover:text-amber-900">{D.home}</a>
        </nav>
      </article>

      <footer className="py-8 px-6 bg-green-950">
        <p className="text-center text-xs text-green-200/40">&copy; {new Date().getFullYear()} MentalRoutine</p>
      </footer>
    </main>
  );
}

export function LegalPage({ kind }: { kind: LegalKind }) {
  return (
    <LangProvider>
      <LegalContent kind={kind} />
    </LangProvider>
  );
}
