"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { LangProvider, useLang } from "@/context/lang-context";
import { translations, type Translation } from "@/lib/translations";
import {
  samples, GOLFERS, REPORTS, GOLFER_HCP, SAMPLE_FILES, reportLang,
  type GolferId, type ReportId, type SamplesCopy,
} from "@/lib/samples";

declare global { interface Window { plausible?: (event: string, options?: { props?: Record<string, string> }) => void } }
function track(event: string, props?: Record<string, string>) { window.plausible?.(event, props ? { props } : undefined); }

const NAMES: Record<GolferId, string> = { alex: "Alex", sam: "Sam", chris: "Chris" };

function isGolfer(v: string | null): v is GolferId { return !!v && (GOLFERS as ReadonlyArray<string>).includes(v); }
function isReport(v: string | null): v is ReportId { return !!v && (REPORTS as ReadonlyArray<string>).includes(v); }

/** The pages of one report, as images; the PDF is the download. */
function Viewer({ golfer, report, S, lang }: { golfer: GolferId; report: ReportId; S: SamplesCopy; lang: "nl" | "en" }) {
  const f = SAMPLE_FILES[golfer][report][lang];
  const R = S.reports[report];
  const what = report === "training" ? S.trainingTopic[golfer] : R.name;

  if (f.pages === 0) {
    return (
      <div className="max-w-[820px] mx-auto rounded-xl border border-dashed border-green-900/20 bg-white/60 p-10 text-center text-sm text-stone-600">
        {S.comingSoon}
      </div>
    );
  }

  const pages = Array.from({ length: f.pages }, (_, i) => i + 1);
  return (
    <div className="max-w-[820px] mx-auto">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3 text-xs text-stone-500">
        <span>{NAMES[golfer]} · {what} · {S.pages.replace("{n}", String(f.pages))}</span>
        <a
          href={f.pdf}
          download
          onClick={() => track("sample_download", { golfer, report, lang })}
          className="font-semibold text-amber-700 hover:text-amber-800 underline-offset-4 hover:underline"
        >
          {report === "profile" ? S.downloadFull : S.download}
        </a>
        {report === "profile" && (
          <a
            href={`/samples/guide-${lang}.pdf`}
            download
            onClick={() => track("sample_download", { golfer, report: "guide", lang })}
            className="font-semibold text-amber-700 hover:text-amber-800 underline-offset-4 hover:underline"
          >
            {S.downloadGuide}
          </a>
        )}
      </div>
      {pages.map((n) => (
        // Plain <img>: static A4 renders with fixed dimensions; next/image adds nothing here.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${f.dir}-${n}`}
          src={`${f.dir}/p${String(n).padStart(2, "0")}.webp`}
          alt={S.pageAlt.replace("{golfer}", NAMES[golfer]).replace("{report}", R.name).replace("{n}", String(n))}
          width={1075}
          height={1521}
          loading={n <= 2 ? "eager" : "lazy"}
          className="block w-full h-auto bg-white rounded mb-4 shadow-[0_4px_18px_rgba(22,43,30,0.12)]"
          style={{ aspectRatio: "1075 / 1521" }}
        />
      ))}
    </div>
  );
}

function SamplesContent() {
  const { lang } = useLang();
  const T: Translation = translations[lang];
  const S = samples[lang];
  const rl = reportLang(lang);
  const [golfer, setGolfer] = useState<GolferId>("alex");
  const [report, setReport] = useState<ReportId>("quickscan");

  // Deep links: /samples?golfer=sam&report=profile (QuickScan result screen, /assessment).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const g = p.get("golfer"), r = p.get("report");
    if (isGolfer(g)) setGolfer(g);
    if (isReport(r)) setReport(r);
    track("sample_view", { golfer: isGolfer(g) ? g : "alex", report: isReport(r) ? r : "quickscan", lang: rl, source: p.get("source") ?? "direct" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pick(g: GolferId, r: ReportId) {
    setGolfer(g);
    setReport(r);
    track("sample_view", { golfer: g, report: r, lang: rl, source: "picker" });
    // Keep the choice in the URL so it can be shared, without adding history entries.
    const url = new URL(window.location.href);
    url.searchParams.set("golfer", g);
    url.searchParams.set("report", r);
    url.searchParams.delete("source");
    window.history.replaceState(null, "", url.toString());
  }

  return (
    <main className="bg-[#faf8f3] text-[#1a1c18]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-green-950 focus:rounded-lg focus:text-sm focus:font-bold">
        {T.nav.skipToContent}
      </a>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 px-6 bg-[#162b1e] overflow-hidden" id="main">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-green-700/10 blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-400 border border-amber-400/30 px-4 py-1.5 rounded-full mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            {S.badge}
          </motion.span>
          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[#f6f1e7] mb-6" style={{ fontFamily: "var(--font-cormorant), serif" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {S.h1a}<br /><span className="italic text-amber-300">{S.h1b}</span>
          </motion.h1>
          <motion.p className="text-lg text-green-200/75 max-w-xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            {S.intro}
          </motion.p>
        </div>
      </section>

      {/* ── PICKERS ── */}
      <section className="px-4 sm:px-6 pt-12 pb-6">
        <div className="container mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-4">{S.pickLabel}</p>
          <div className="grid sm:grid-cols-3 gap-3 mb-10" role="tablist" aria-label={S.pickLabel}>
            {GOLFERS.map((g) => {
              const on = g === golfer;
              return (
                <button
                  key={g}
                  role="tab"
                  aria-selected={on}
                  onClick={() => pick(g, report)}
                  className={`text-left rounded-xl border p-4 transition-all ${on ? "bg-green-950 border-green-950 text-[#f6f1e7] shadow-lg shadow-green-900/15" : "bg-white border-green-900/10 text-green-950 hover:border-green-900/30"}`}
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-xl font-semibold" style={{ fontFamily: "var(--font-cormorant), serif" }}>{NAMES[g]}</span>
                    <span className={`text-xs tabular-nums ${on ? "text-green-200/70" : "text-stone-500"}`}>{S.hcp} {GOLFER_HCP[g]}</span>
                  </span>
                  <span className={`block text-sm leading-snug mt-1.5 ${on ? "text-green-100/85" : "text-stone-600"}`}>{S.golfers[g].line}</span>
                  <span className={`block text-[11px] font-semibold tracking-wide uppercase mt-3 ${on ? "text-amber-300" : "text-amber-700/80"}`}>{S.golfers[g].focus}</span>
                </button>
              );
            })}
          </div>

          <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-4">{S.reportLabel}</p>
          <div className="grid sm:grid-cols-3 gap-2 sm:gap-3" role="tablist" aria-label={S.reportLabel}>
            {REPORTS.map((r, i) => {
              const on = r === report;
              const R = S.reports[r];
              return (
                <button
                  key={r}
                  role="tab"
                  aria-selected={on}
                  onClick={() => pick(golfer, r)}
                  className={`flex items-baseline gap-3 sm:block text-left rounded-xl border px-4 py-2.5 sm:p-4 transition-all ${on ? "bg-white border-amber-500 ring-2 ring-amber-400/40" : "bg-white/60 border-green-900/10 hover:border-green-900/30"}`}
                >
                  <span className="block text-[11px] font-semibold tracking-wide uppercase text-stone-400">{String(i + 1).padStart(2, "0")}<span className="hidden sm:inline"> · {R.tag}</span></span>
                  <span className="block text-lg leading-tight font-semibold text-green-950 sm:mt-1" style={{ fontFamily: "var(--font-cormorant), serif" }}>{R.name}</span>
                </button>
              );
            })}
          </div>

          <p className="text-sm text-stone-600 leading-relaxed mt-6 max-w-2xl"><span className="sm:hidden font-semibold">{S.reports[report].tag}. </span>{S.reports[report].body}</p>
          {S.langNote && <p className="text-xs text-stone-500 mt-2">{S.langNote}</p>}
        </div>
      </section>

      {/* ── VIEWER ── */}
      <section id="viewer" className="px-4 sm:px-6 pt-4 pb-10 scroll-mt-24">
        <Viewer golfer={golfer} report={report} S={S} lang={rl} />
        <p className="text-center text-sm text-stone-500 mt-4">{S.compareHint}</p>
        <p className="text-center text-xs text-stone-400 mt-2">{S.disclaimer}</p>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-green-950">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4">{S.cta.label}</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#f6f1e7] leading-tight mb-9" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            {S.cta.h2a}<br /><span className="italic text-amber-300">{S.cta.h2b}</span>
          </h2>
          <div className="flex flex-col items-center gap-4">
            <a
              href="/#recognise"
              onClick={() => track("cta_click", { source: "samples" })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-7 py-3.5 text-sm font-bold text-green-950 shadow-lg shadow-amber-500/25 hover:bg-amber-300 hover:-translate-y-0.5 transition-all"
            >
              {S.cta.primary}
            </a>
            <a href="/assessment" className="text-sm text-green-200/70 hover:text-[#f6f1e7] underline underline-offset-4">
              {S.cta.secondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SamplesPage() {
  return (
    <LangProvider>
      <SamplesContent />
    </LangProvider>
  );
}
