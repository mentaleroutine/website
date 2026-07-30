"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { LangProvider, useLang } from "@/context/lang-context";
import { translations, type Translation } from "@/lib/translations";

const ReportPreviewModal = dynamic(
  () => import("@/components/ui/report-preview-modal").then((m) => ({ default: m.ReportPreviewModal })),
  { ssr: false }
);

declare global { interface Window { plausible?: (event: string, options?: { props?: Record<string, string> }) => void } }
function track(event: string, props?: Record<string, string>) { window.plausible?.(event, props ? { props } : undefined); }

// Koop-CTA naar de Lemon Squeezy-checkout (live sinds 30-7-2026). Koppeling gebeurt op
// het e-mailadres dat bij de Lemon-checkout wordt ingevuld (de bezoeker is hier niet
// ingelogd op de portal). Variant wijzigen → nieuwe checkout-UUID via Lemon → Share.
const CHECKOUT_ASSESSMENT_URL = "https://mentalroutinegolf.lemonsqueezy.com/checkout/buy/91ec251f-2df6-481b-b2e1-6f9aadaaf6fc";

function AssessmentContent() {
  const { lang } = useLang();
  const T: Translation = translations[lang];
  const A = T.assessmentPage;
  const plan = T.pricing.plans[0];
  const [preview, setPreview] = useState<"standard" | "training" | null>(null);

  return (
    <main className="bg-[#faf8f3] text-[#1a1c18]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-green-950 focus:rounded-lg focus:text-sm focus:font-bold">
        {T.nav.skipToContent}
      </a>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-6 bg-[#162b1e] overflow-hidden" id="main">
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-400 border border-amber-400/30 px-4 py-1.5 rounded-full mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            {A.badge}
          </motion.span>
          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[#f6f1e7] mb-6" style={{ fontFamily: "var(--font-cormorant), serif" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {A.h1a}<br /><span className="italic text-amber-300">{A.h1b}</span>
          </motion.h1>
          <motion.p className="text-lg text-green-200/75 max-w-xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            {A.intro}
          </motion.p>
        </div>
      </section>

      {/* ── WHAT YOU GET + PRICE ── */}
      <section className="py-24 px-6 bg-[#faf8f3]">
        <div className="container mx-auto max-w-4xl grid md:grid-cols-2 gap-10 items-start">

          {/* What you get */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-4">{A.whatYouGetLabel}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-stone-700">
                  <svg viewBox="0 0 16 16" fill="none" stroke="#a17d1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 shrink-0"><polyline points="2 8 6 12 14 4" /></svg>
                  {f}
                </li>
              ))}
            </ul>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-2">{A.durationLabel}</p>
            <p className="text-sm text-stone-600 leading-relaxed mb-8">{A.duration}</p>
            <button onClick={() => { setPreview("standard"); track("report_preview", { type: "standard" }); }} className="text-sm font-medium text-amber-700 hover:text-amber-800 underline underline-offset-4">
              {T.pricing.previewBtn}
            </button>
          </div>

          {/* Price card */}
          <motion.div className="rounded-2xl p-8 bg-green-950 border border-green-900/20 shadow-xl shadow-green-900/10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-300 mb-2">{plan.plan}</p>
            <div className="text-6xl font-semibold text-[#f6f1e7] leading-none mb-1" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              <sup className="text-2xl align-super font-normal">$</sup>{plan.price}
            </div>
            <p className="text-xs text-green-200/50 mt-1 mb-6">{plan.tagline}</p>
            <a href={CHECKOUT_ASSESSMENT_URL} target="_blank" rel="noopener" onClick={() => track("checkout_click", { plan: "assessment", source: "assessment-page" })} className="block text-center py-3.5 rounded-lg text-sm font-bold transition-all hover:-translate-y-0.5 bg-amber-400 text-green-950 hover:bg-amber-300 shadow-lg shadow-amber-500/30">
              {plan.cta}
            </a>
            {/* Guarantee — right at the buy button, per brief */}
            <p className="mt-4 text-xs text-green-200/50 leading-relaxed flex items-start gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              {A.guaranteeInline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ (product-specific subset) ── */}
      <section className="py-20 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-2xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-8 text-center">{A.faqLabel}</p>
          <div className="space-y-4">
            {T.faq.items.slice(0, 5).map((item, i) => (
              <details key={i} className="group rounded-xl border border-green-900/[0.07] bg-white/60 px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-green-950 text-sm flex items-center justify-between">
                  {item.title}
                  <span className="text-amber-700 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-stone-600 leading-relaxed">{item.content}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/" className="text-sm text-stone-500 hover:text-green-950 transition-colors">{A.backHome}</a>
          </div>
        </div>
      </section>

      {preview && <ReportPreviewModal plan={preview} onClose={() => setPreview(null)} />}
    </main>
  );
}

export default function AssessmentPage() {
  return (
    <LangProvider>
      <AssessmentContent />
    </LangProvider>
  );
}
