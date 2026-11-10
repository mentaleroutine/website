"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { LangProvider, useLang } from "@/context/lang-context";
import { PRO_TEXT, PGA_DIVISIONS, COUNTRIES, COUNTRY_LABEL, proLang } from "@/lib/pro-program-text";

declare global { interface Window { plausible?: (event: string, options?: { props?: Record<string, string> }) => void } }
function track(event: string, props?: Record<string, string>) { window.plausible?.(event, props ? { props } : undefined); }

// ── FORM STATE ───────────────────────────────────────────────────────────────
type FormData = {
  fullName: string;
  email: string;
  pgaNumber: string;
  pgaDivision: string;
  linkedIn: string;
  country: string;
  facility: string;
  activeStudents: string;
  groupLessons: string;
  mentalExperience: string;
  howFound: string;
};

const INITIAL_FORM: FormData = {
  fullName: "", email: "", pgaNumber: "", pgaDivision: "", linkedIn: "",
  country: "", facility: "", activeStudents: "", groupLessons: "",
  mentalExperience: "", howFound: "",
};

// ── ICONS (inline SVG) ──────────────────────────────────────────────────────
function IconCheck() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="#c4a043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
      <polyline points="2 8 6 12 14 4" />
    </svg>
  );
}

function IconDollar() {
  return (
    <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    </div>
  );
}

function IconUsers() {
  return (
    <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </div>
  );
}

function IconPlay() {
  return (
    <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </div>
  );
}

function IconShield() {
  return (
    <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    </div>
  );
}

// ── SCROLL TO FORM ──────────────────────────────────────────────────────────
function scrollToForm() {
  document.getElementById("pro-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── MAIN PAGE ───────────────────────────────────────────────────────────────
function ProProgramContent() {
  const { lang } = useLang();
  const L = proLang(lang);            // NL of EN; andere talen zien de Engelse pagina (besluit 10-11-2026)
  const T = PRO_TEXT[L];
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function update(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/pro-program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang: L }),   // taal end-to-end: bevestiging + aanvraagrecord in de portal
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      track("pro_program_submit", { country: form.country || "unknown", lang: L });
    } catch {
      setError(true);
      track("pro_program_error", { type: "api" });
    } finally {
      setSending(false);
    }
  }

  const inputCls = "w-full px-4 py-3 rounded-lg border border-green-900/15 bg-[#faf8f3] text-sm text-green-950 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 transition-colors";
  const labelCls = "block text-xs font-semibold text-green-950 mb-1.5 tracking-wide";
  const selectCls = "w-full px-4 py-3 rounded-lg border border-green-900/15 bg-[#faf8f3] text-sm text-green-950 focus:outline-none focus:border-amber-500 transition-colors appearance-none";

  return (
    <main className="bg-[#faf8f3] text-[#1a1c18]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#162b1e]">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-green-700/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-amber-600/[0.07] blur-3xl" />
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-400 border border-amber-400/30 px-4 py-1.5 rounded-full mb-8"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              {T.badge}
            </motion.span>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-[#f6f1e7] mb-6"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            >
              {T.heroTitle}<br />
              <span className="italic text-amber-300">{T.heroTitleEm}</span>
            </motion.h1>

            <motion.p
              className="text-lg text-green-200/75 max-w-2xl mx-auto mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            >
              {T.heroP1}<strong className="text-amber-300">{T.heroP1Strong}</strong>.
            </motion.p>

            <motion.p
              className="text-base text-green-200/55 max-w-xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            >
              {T.heroP2}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
            >
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/30 text-sm tracking-wide"
              >
                {T.ctaApply}
              </button>
              <a
                href="#how-it-works"
                className="px-8 py-4 border border-green-200/25 text-green-200 rounded-lg hover:border-green-200/60 hover:bg-green-200/5 transition-all text-sm"
              >
                {T.ctaHow}
              </a>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] rounded-full px-4 py-1.5 text-xs text-green-200/65">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                {T.trust}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET (FREE) ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-5xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{T.getLabel}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              {T.getTitle}<br /><em>{T.getTitleEm}</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {T.getCards.map((c, i) => ({ ...c, icon: ["gift", "kit", "tag", "dollar"][i] })).map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-7 border border-green-900/[0.07] shadow-lg shadow-green-900/5 hover:-translate-y-1.5 transition-transform duration-300"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-5">
                  {item.icon === "gift" && <svg viewBox="0 0 24 24" fill="none" stroke="#234a32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>}
                  {item.icon === "dollar" && <svg viewBox="0 0 24 24" fill="none" stroke="#234a32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>}
                  {item.icon === "tag" && <svg viewBox="0 0 24 24" fill="none" stroke="#234a32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>}
                  {item.icon === "kit" && <svg viewBox="0 0 24 24" fill="none" stroke="#234a32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>}
                </div>
                <h3 className="text-lg font-semibold text-green-950 mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-sm text-stone-500 max-w-2xl mx-auto mt-10 leading-relaxed"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            {T.getNote}<strong className="text-green-900">{T.getNoteStrong1}</strong>{L === "nl" ? " en bouwt je eigen individuele en groepslesprogramma's op elk assessment — " : " and can build your own individual and group lesson programs around each assessment — "}<strong className="text-green-900">{T.getNoteStrong2}</strong>.
          </motion.p>

          <motion.div className="text-center mt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <button onClick={scrollToForm} className="px-8 py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 text-sm tracking-wide">
              {T.ctaApply}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── WHY IT FITS YOUR PRACTICE ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-green-950">
        <div className="container mx-auto max-w-5xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">{T.fitLabel}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#f6f1e7] leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              {T.fitTitle}<br /><em className="text-amber-300">{T.fitTitleEm}</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {T.fitCards.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 text-center"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-amber-400/80 mb-4">{item.label}</p>
                <div className="text-2xl font-semibold text-[#f6f1e7] leading-tight mb-3" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  {item.title}
                </div>
                <p className="text-sm text-green-200/50">{item.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Highlight */}
          <motion.div
            className="mt-8 max-w-3xl mx-auto rounded-2xl border border-amber-400/30 bg-amber-500/10 px-8 py-7 text-center"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-300 mb-3">{T.fitIdeaLabel}</p>
            <p className="text-xl md:text-2xl font-semibold text-[#f6f1e7] leading-snug" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              {T.fitIdea}
            </p>
          </motion.div>

          <motion.div className="text-center mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
            <button onClick={scrollToForm} className="px-8 py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/30 text-sm tracking-wide">
              {T.ctaNow}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 bg-[#faf8f3]">
        <div className="container mx-auto max-w-5xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{T.howLabel}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              {T.howTitle}<br /><em>{T.howTitleEm}</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {T.howSteps.map((step, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-8 border border-green-900/[0.07] shadow-lg shadow-green-900/5 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <span className="absolute bottom-3 right-4 text-8xl font-bold text-green-900/[0.04]" style={{ fontFamily: "var(--font-cormorant), serif" }}>{step.num}</span>
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-sm font-bold text-green-800">{step.num}</span>
                </div>
                <h3 className="text-2xl font-semibold text-green-950 mb-3 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>{step.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed relative z-10">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNLOCK MORE (PAID TEASER) ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{T.genLabel}</p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 mb-6 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                {T.genTitle}<br /><em>{T.genTitleEm}</em>
              </h2>
              <div className="w-12 h-0.5 bg-amber-500 mb-6" />
              <p className="text-stone-600 leading-relaxed mb-6">
                {T.genBody}
              </p>
              <button onClick={scrollToForm} className="px-6 py-3 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 text-sm tracking-wide">
                {T.ctaApply}
              </button>
            </motion.div>

            <motion.div className="space-y-4" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              {T.genItems.map((c, i) => ({ ...c, icon: [<IconUsers key="u" />, <IconPlay key="p" />, <IconDollar key="d" />, <IconShield key="s" />][i] })).map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 bg-white rounded-xl p-5 border border-green-900/[0.07] shadow-sm"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  {item.icon}
                  <div>
                    <p className="text-sm font-semibold text-green-950">{item.title}</p>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WAT HET JE OPLEVERT (eerlijke waarde-statements, geen fictieve reviews) ── */}
      <section className="py-20 px-6 bg-green-950">
        <div className="container mx-auto max-w-4xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">{T.whyLabel}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#f6f1e7] leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              {T.whyTitle}<br /><em className="text-amber-300">{T.whyTitleEm}</em>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {T.whyCards.map((c) => ({ title: c.title, body: c.desc })).map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-9 h-9 rounded-lg bg-amber-400/15 flex items-center justify-center mb-4">
                  <span className="text-amber-300 text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-base font-semibold text-[#f6f1e7] mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>{item.title}</p>
                <p className="text-sm text-green-100/70 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#faf8f3]">
        <div className="container mx-auto max-w-3xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{T.faqLabel}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              {T.faqTitle}<br /><em>{T.faqTitleEm}</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6" />
          </motion.div>

          <div className="space-y-4">
            {T.faqs.map((item, i) => (
              <FaqItem key={`${L}-${i}`} question={item.q} answer={item.a} index={i} />
            ))}
          </div>

          <motion.div className="text-center mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <button onClick={scrollToForm} className="px-8 py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 text-sm tracking-wide">
              {T.ctaApply}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── APPLICATION FORM ──────────────────────────────────────────────── */}
      <section id="pro-form" className="py-24 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-2xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{T.formLabel}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              {T.formTitle}<br /><em>{T.formTitleEm}</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6 mb-4" />
            <p className="text-stone-500 text-sm">{T.formIntro}</p>
          </motion.div>

          {submitted ? (
            <motion.div
              className="bg-white rounded-2xl p-10 border border-green-900/[0.07] shadow-lg shadow-green-900/5 text-center"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            >
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#234a32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-green-950 mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>{T.doneTitle}</h3>
              <p className="text-stone-500 text-sm mb-1">{T.doneP1}</p>
              <p className="text-stone-500 text-sm mb-4">{T.doneP2}</p>
              <p className="text-stone-600 text-sm">{T.doneP3}</p>
            </motion.div>
          ) : (
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 md:p-10 border border-green-900/[0.07] shadow-lg shadow-green-900/5 space-y-5"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              {/* Row 1: Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>{T.f.fullName}</label>
                  <input type="text" required value={form.fullName} onChange={update("fullName")} placeholder="John Smith" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{T.f.email}</label>
                  <input type="email" required value={form.email} onChange={update("email")} placeholder="john@example.com" className={inputCls} />
                </div>
              </div>

              {/* Row 2: PGA Number + Division */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>{T.f.pga}</label>
                  <input type="text" required value={form.pgaNumber} onChange={update("pgaNumber")} placeholder={T.f.pgaPh} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{T.f.division}</label>
                  <select required value={form.pgaDivision} onChange={update("pgaDivision")} className={selectCls}>
                    <option value="">{T.f.select}</option>
                    {PGA_DIVISIONS[L].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 3: LinkedIn + Country */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>{T.f.linkedin} <span className="font-normal text-stone-400">({T.f.linkedinOpt})</span></label>
                  <input type="url" value={form.linkedIn} onChange={update("linkedIn")} placeholder="https://linkedin.com/in/..." className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{T.f.country}</label>
                  <select required value={form.country} onChange={update("country")} className={selectCls}>
                    <option value="">{T.f.select}</option>
                    {COUNTRIES[L].map(c => <option key={c} value={c}>{COUNTRY_LABEL[c]?.[L] ?? c}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 4: Facility + Students */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>{T.f.facility}</label>
                  <input type="text" required value={form.facility} onChange={update("facility")} placeholder={T.f.facilityPh} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{T.f.students}</label>
                  <input type="number" required value={form.activeStudents} onChange={update("activeStudents")} placeholder={T.f.studentsPh} className={inputCls} />
                </div>
              </div>

              {/* Row 5: Group lessons + Mental experience */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>{T.f.group}</label>
                  <select required value={form.groupLessons} onChange={update("groupLessons")} className={selectCls}>
                    <option value="">{T.f.select}</option>
                    <option value="yes">{T.f.yes}</option>
                    <option value="no">{T.f.no}</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>{T.f.mental}</label>
                  <select required value={form.mentalExperience} onChange={update("mentalExperience")} className={selectCls}>
                    <option value="">{T.f.select}</option>
                    <option value="yes">{T.f.yes}</option>
                    <option value="no">{T.f.no}</option>
                    <option value="some">{T.f.some}</option>
                  </select>
                </div>
              </div>

              {/* Row 6: How found */}
              <div>
                <label className={labelCls}>{T.f.found}</label>
                <select required value={form.howFound} onChange={update("howFound")} className={selectCls}>
                  <option value="">{T.f.select}</option>
                  <option value="linkedin">{T.f.foundLinkedin}</option>
                  <option value="colleague">{T.f.foundColleague}</option>
                  <option value="google">{T.f.foundGoogle}</option>
                  <option value="other">{T.f.foundOther}</option>
                </select>
              </div>

              <button type="submit" disabled={sending} className="w-full py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed">
                {sending ? T.f.sending : T.f.submit}
              </button>
              {error && <p className="text-center text-xs text-red-500">{T.f.error}</p>}

              <div className="flex items-center justify-center gap-4 text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M8 1l5.5 2.5v4c0 3-2.5 5.5-5.5 6.5C5 13 2.5 10.5 2.5 7.5v-4L8 1z" /></svg>
                  {T.f.free}
                </span>
                <span>·</span>
                <span>{T.f.noObligation}</span>
                <span>·</span>
                <span>{T.f.response}</span>
              </div>
            </motion.form>
          )}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 bg-green-950 border-t border-white/[0.06]">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-amber-100/90 tracking-wide" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.05rem" }}>
              Mental<span className="text-amber-400">Routine</span>
            </span>
          </div>
          <p className="text-xs text-green-200/40">&copy; {new Date().getFullYear()} Mental Routine. {T.footerRights}</p>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ─────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-green-950/95 backdrop-blur-lg border-t border-white/[0.08] px-4 py-3">
        <button
          onClick={scrollToForm}
          className="w-full py-3.5 bg-amber-400 text-green-950 font-bold rounded-lg text-sm tracking-wide shadow-lg shadow-amber-500/30"
        >
          {T.stickyCta}
        </button>
      </div>

    </main>
  );
}

export default function ProProgramPage() {
  return (
    <LangProvider>
      <ProProgramContent />
    </LangProvider>
  );
}

// ── FAQ ITEM COMPONENT ──────────────────────────────────────────────────────
function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const triggerId = `pro-faq-trigger-${index}`;
  const panelId = `pro-faq-panel-${index}`;

  return (
    <motion.div
      className="bg-white rounded-xl border border-green-900/[0.07] shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <button
        id={triggerId}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-sm font-semibold text-green-950 pr-4">{question}</span>
        <svg
          viewBox="0 0 24 24" fill="none" stroke="#234a32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div id={panelId} role="region" aria-labelledby={triggerId} className="px-6 pb-5">
          <p className="text-sm text-stone-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </motion.div>
  );
}
