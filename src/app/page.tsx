"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Spotlight } from "@/components/ui/spotlight";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { FaqsSection } from "@/components/ui/faqs";
import { LangProvider, useLang } from "@/context/lang-context";
import { translations, type Translation } from "@/lib/translations";

// ── Report Preview Modal ──────────────────────────────────────────────────────
function ReportPreviewModal({ plan, onClose }: { plan: "standard" | "deluxe" | "training"; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const src = plan === "training" ? "/reports/sample-training-report.html" : plan === "deluxe" ? "/reports/sample-deluxe.html" : "/reports/sample-standard.html";
  const label = plan === "training" ? "Training Report — Sample" : plan === "deluxe" ? "Deluxe — Sample Report" : "Standard — Sample Report";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-3xl h-[85vh] bg-[#faf8f3] rounded-2xl overflow-hidden shadow-2xl border border-green-900/10"
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 bg-green-950 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
              {label}
            </span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-green-200/60 hover:text-white hover:bg-white/10 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <iframe src={src} className="w-full h-[calc(85vh-48px)]" title="Sample Report Preview" />
      </motion.div>
    </motion.div>
  );
}

// ── Radar chart with rotating random scores ───────────────────────────────────
const INITIAL_SCORES = [8, 6, 4, 7, 5, 3, 5, 2];
const CX = 150, CY = 150, MAX_R = 108;

function radarPt(i: number, r: number) {
  const a = (i * 45 - 90) * Math.PI / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}
function makePath(sc: number[]) {
  const pts = sc.map((s, i) => { const { x, y } = radarPt(i, (s / 10) * MAX_R); return `${x.toFixed(1)},${y.toFixed(1)}`; });
  return `M ${pts[0]} ${pts.slice(1).map(p => `L ${p}`).join(' ')} Z`;
}
function gridPath(lvl: number) {
  const pts = Array.from({ length: 8 }, (_, i) => { const { x, y } = radarPt(i, (lvl / 10) * MAX_R); return `${x.toFixed(1)},${y.toFixed(1)}`; });
  return `M ${pts[0]} ${pts.slice(1).map(p => `L ${p}`).join(' ')} Z`;
}
const scoreColor = (s: number) => s >= 7 ? '#34d399' : s >= 4 ? '#fbbf24' : '#f87171';

function HeroRadar({ steps, caption }: { steps: ReadonlyArray<{ label: string }>; caption?: string }) {
  const [scores, setScores] = useState(INITIAL_SCORES);

  useEffect(() => {
    const id = setInterval(() => {
      setScores(Array.from({ length: 8 }, () => Math.floor(Math.random() * 9) + 1));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div className="flex-1 hidden md:flex flex-col items-center justify-center gap-3"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
      <svg viewBox="-15 -15 330 330" width={380} height={380} role="img" aria-label="Radar chart showing example mental performance scores across 8 factors">

        {/* Grid webs */}
        {[2, 4, 6, 8, 10].map(lvl => (
          <path key={lvl} d={gridPath(lvl)} fill="none"
            stroke="rgba(255,255,255,0.06)" strokeWidth={lvl === 10 ? 1 : 0.7} />
        ))}

        {/* Axis lines */}
        {Array.from({ length: 8 }, (_, i) => {
          const end = radarPt(i, MAX_R);
          return <line key={i} x1={CX} y1={CY} x2={end.x} y2={end.y}
            stroke="rgba(255,255,255,0.07)" strokeWidth={0.8} />;
        })}

        {/* Score polygon */}
        <motion.path
          fill="rgba(196,160,67,0.10)"
          stroke="rgba(196,160,67,0.55)"
          strokeWidth={1.5}
          strokeLinejoin="round"
          initial={{ opacity: 0, d: makePath(INITIAL_SCORES) }}
          animate={{ opacity: 1, d: makePath(scores) }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* Score dots */}
        {scores.map((s, i) => {
          const { x, y } = radarPt(i, (s / 10) * MAX_R);
          return (
            <motion.circle key={i} r={3.5} fill={scoreColor(s)}
              animate={{ cx: x, cy: y, fill: scoreColor(s) }}
              transition={{ duration: 1.2, ease: "easeInOut" }} />
          );
        })}

        {/* Axis tip labels: name + animated score */}
        {steps.map((step, i) => {
          const { x, y } = radarPt(i, MAX_R + 22);
          const angle = i * 45;
          const anchor = angle === 0 ? 'middle' : angle < 180 ? 'start' : angle === 180 ? 'middle' : 'end';
          const nameY = angle === 0 ? y - 5 : angle === 180 ? y + 11 : y + 4;
          const scoreY = angle === 0 ? y + 7 : angle === 180 ? y + 23 : y + 14;
          return (
            <g key={i}>
              <text x={x} y={nameY} textAnchor={anchor} fontSize="7.5"
                fill="rgba(255,255,255,0.38)" fontFamily="sans-serif">
                {step.label}
              </text>
              <motion.text x={x} y={scoreY} textAnchor={anchor} fontSize="8.5"
                fontWeight="700" fontFamily="sans-serif"
                animate={{ fill: scoreColor(scores[i]) }}
                transition={{ duration: 0.8 }}>
                {scores[i]}/10
              </motion.text>
            </g>
          );
        })}

        {/* Centre */}
        <circle cx={CX} cy={CY} r={2} fill="rgba(196,160,67,0.5)" />
      </svg>

      {/* Caption */}
      <p className="text-xs text-green-300/35 tracking-wide text-center">
        {caption ?? "Example profile — your scores will differ"}
      </p>
    </motion.div>
  );
}

// ── CONTACT FORM ───────────────────────────────────────────────────────────────
function ContactSection() {
  const { lang } = useLang();
  const t = translations[lang].contact;
  const [form, setForm] = React.useState({ name: "", email: "", handicap: "", message: "" });
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="py-16 px-6 bg-[#f6f1e7]">
      <div className="container mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{t.label}</p>
          <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {t.h2a}<br /><em>{t.h2b}</em>
          </h2>
          <div className="w-12 h-0.5 bg-amber-500 mb-6" />
          <p className="text-stone-600 leading-relaxed mb-5">{t.p1}</p>
          <p className="text-stone-600 leading-relaxed">{t.p2}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {submitted ? (
            <div className="bg-white rounded-2xl p-10 border border-green-900/[0.07] shadow-lg shadow-green-900/5 text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#234a32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-green-950 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{t.success.h3}</h3>
              <p className="text-stone-500 text-sm">{t.success.p}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-green-900/[0.07] shadow-lg shadow-green-900/5 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-green-950 mb-1.5 tracking-wide">{t.fields.name}</label>
                  <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder={t.fields.namePlaceholder} className="w-full px-4 py-3 rounded-lg border border-green-900/15 bg-[#faf8f3] text-sm text-green-950 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-green-950 mb-1.5 tracking-wide">{t.fields.handicap}</label>
                  <input type="text" value={form.handicap} onChange={e => setForm(f => ({ ...f, handicap: e.target.value }))} placeholder={t.fields.handicapPlaceholder} className="w-full px-4 py-3 rounded-lg border border-green-900/15 bg-[#faf8f3] text-sm text-green-950 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-green-950 mb-1.5 tracking-wide">{t.fields.email}</label>
                <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder={t.fields.emailPlaceholder} className="w-full px-4 py-3 rounded-lg border border-green-900/15 bg-[#faf8f3] text-sm text-green-950 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-green-950 mb-1.5 tracking-wide">{t.fields.message}</label>
                <textarea required rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder={t.fields.messagePlaceholder} className="w-full px-4 py-3 rounded-lg border border-green-900/15 bg-[#faf8f3] text-sm text-green-950 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 transition-colors resize-none" />
              </div>
              <button type="submit" disabled={sending} className="w-full py-3.5 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed">
                {sending ? t.fields.sending : t.fields.submit}
              </button>
              {error && <p className="text-center text-xs text-red-600">{t.fields.error}</p>}
              <p className="text-center text-xs text-stone-400">{t.fields.note}</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ── EARLY ACCESS SIGNUP ────────────────────────────────────────────────────────
function EarlyAccessSection() {
  const { lang } = useLang();
  const T: Translation = translations[lang];
  const t: Translation["earlyAccess"] = T.earlyAccess;
  const [form, setForm] = React.useState({ name: "", email: "", handicap: "", plan: "deluxe" });
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [spots, setSpots] = React.useState<{ spots: number; total: number } | null>(null);

  // Fetch live spots count on mount
  useEffect(() => {
    fetch("/api/spots").then(r => r.json()).then(setSpots).catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      // Refresh spots count after successful signup
      fetch("/api/spots").then(r => r.json()).then(setSpots).catch(() => {});
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="early-access" className="py-28 px-6 bg-green-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-green-700/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-amber-600/[0.07] blur-3xl" />
      </div>
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">{t.sectionLabel}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#f6f1e7] leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {t.h2a}<br /><em className="text-amber-300">{t.h2b}</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mb-6" />
            <p className="text-green-200/70 leading-relaxed mb-4">{t.p1}</p>
            <p className="text-green-200/50 text-sm leading-relaxed mb-6">{t.p2}</p>
            {t.offer && (
              <div className="rounded-xl bg-amber-400/[0.08] border border-amber-400/25 p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-white/[0.05] border border-white/[0.08] p-3 text-center">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-green-200/50 mb-1">{T.pricing.plans[0].plan}</p>
                    <p className="text-2xl font-semibold text-[#f6f1e7]" style={{ fontFamily: "'Cormorant Garamond', serif" }}><sup className="text-sm align-super font-normal">$</sup>49</p>
                    <p className="text-[11px] text-green-200/35 line-through">$59</p>
                  </div>
                  <div className="rounded-lg bg-amber-400/[0.06] border border-amber-400/20 p-3 text-center">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-amber-300/70 mb-1">{T.pricing.plans[1].plan}</p>
                    <p className="text-2xl font-semibold text-[#f6f1e7]" style={{ fontFamily: "'Cormorant Garamond', serif" }}><sup className="text-sm align-super font-normal">$</sup>99</p>
                    <p className="text-[11px] text-green-200/35 line-through">$129</p>
                  </div>
                </div>
                <p className="text-center text-xs text-amber-300/70">{t.extraReports}</p>
              </div>
            )}
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            {submitted ? (
              <div className="rounded-2xl p-10 bg-white/[0.06] border border-amber-400/20 text-center">
                <div className="w-14 h-14 rounded-full bg-amber-400/15 flex items-center justify-center mx-auto mb-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><polyline points="4 12 9 17 20 6"/></svg>
                </div>
                <h3 className="text-xl font-semibold text-[#f6f1e7] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{t.success.h3}</h3>
                <p className="text-sm text-green-200/60">{t.success.p}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl p-8 bg-white/[0.06] border border-white/10 space-y-5">
                {spots && spots.spots < spots.total && (
                  <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-400/[0.08] border border-amber-400/20" role="status" aria-live="polite">
                    <span className="text-xl font-bold text-amber-400" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{spots.spots}</span>
                    <span className="text-[11px] text-green-200/40">/ {spots.total}</span>
                    <span className="text-[11px] text-amber-300/70 ml-1">{t.spotsLeft}</span>
                  </div>
                )}
                <p className="text-center text-xs text-green-200/50 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                  {t.socialProof}
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-green-100/80 mb-1.5 tracking-wide">{t.fields.name}</label>
                    <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder={t.fields.namePlaceholder} className="w-full px-4 py-3 rounded-lg border border-white/15 bg-white/[0.06] text-sm text-[#f6f1e7] placeholder:text-green-200/30 focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-green-100/80 mb-1.5 tracking-wide">{t.fields.handicap}</label>
                    <input type="text" value={form.handicap} onChange={e => setForm(f => ({ ...f, handicap: e.target.value }))} placeholder={t.fields.handicapPlaceholder} className="w-full px-4 py-3 rounded-lg border border-white/15 bg-white/[0.06] text-sm text-[#f6f1e7] placeholder:text-green-200/30 focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-green-100/80 mb-1.5 tracking-wide">{t.fields.email}</label>
                  <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder={t.fields.emailPlaceholder} className="w-full px-4 py-3 rounded-lg border border-white/15 bg-white/[0.06] text-sm text-[#f6f1e7] placeholder:text-green-200/30 focus:outline-none focus:border-amber-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-green-100/80 mb-2.5 tracking-wide">{t.fields.planLabel}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setForm(f => ({ ...f, plan: "standard" }))} className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all border ${form.plan === "standard" ? "bg-amber-400/15 border-amber-400/50 text-amber-300" : "bg-white/[0.04] border-white/10 text-green-200/60 hover:border-white/25"}`}>
                      {T.pricing.plans[0].plan} · <span className="text-amber-400">$49</span>
                    </button>
                    <button type="button" onClick={() => setForm(f => ({ ...f, plan: "deluxe" }))} className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all border ${form.plan === "deluxe" ? "bg-amber-400/15 border-amber-400/50 text-amber-300" : "bg-white/[0.04] border-white/10 text-green-200/60 hover:border-white/25"}`}>
                      {T.pricing.plans[1].plan} · <span className="text-amber-400">$99</span>
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={sending} className="w-full py-3.5 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed">
                  {sending ? t.fields.sending : t.fields.submit}
                </button>
                {error && <p className="text-center text-xs text-red-400">{t.fields.error}</p>}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── PAGE CONTENT ───────────────────────────────────────────────────────────────
function PageContent() {
  const { lang } = useLang();
  const T: Translation = translations[lang];
  const [previewPlan, setPreviewPlan] = useState<"standard" | "deluxe" | "training" | null>(null);

  const firstColumn  = T.testimonials.items.slice(0, 3);
  const secondColumn = T.testimonials.items.slice(3, 6);
  const thirdColumn  = T.testimonials.items.slice(6, 9);

  return (
    <main className="bg-[#faf8f3] text-[#1a1c18]">

      {/* ── SKIP TO CONTENT (accessibility) ── */}
      <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-green-950 focus:rounded-lg focus:text-sm focus:font-bold">
        Skip to content
      </a>

      {/* ── NAVBAR ───────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#162b1e]" style={{ paddingTop: '5rem' }}>
        <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="#c4a043" />

        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 py-20">
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-400 border border-amber-400/30 px-4 py-1.5 rounded-full mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              {T.hero.badge}
            </motion.span>

            <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-[#f6f1e7] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              {T.hero.h1a}<br />
              <span className="italic text-amber-300">{T.hero.h1b}</span>
            </motion.h1>

            <motion.p className="text-lg text-green-200/75 max-w-lg mx-auto lg:mx-0 mb-4 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
              {T.hero.p1}
            </motion.p>

            <motion.p className="text-base text-green-200/60 max-w-lg mx-auto lg:mx-0 mb-4 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}>
              {T.hero.p2}
            </motion.p>

            {/* Combined Beta + trust badge */}
            <motion.div className="flex justify-center lg:justify-start mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.72 }}>
              <span className="inline-flex items-center gap-2 bg-amber-400/[0.08] border border-amber-400/25 rounded-full px-4 py-1.5 text-xs text-amber-300/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                {T.hero.heroBadge}
              </span>
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}>
              <a href="#early-access" className="px-8 py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/30 text-sm tracking-wide">
                {T.earlyAccess.heroCta}
              </a>
              <a href="#mental-routine" className="px-8 py-4 border border-green-200/25 text-green-200 rounded-lg hover:border-green-200/60 hover:bg-green-200/5 transition-all text-sm">
                {T.hero.cta2}
              </a>
            </motion.div>

            <motion.p className="text-xs text-green-200/40 max-w-md mx-auto lg:mx-0 mt-5 tracking-wide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.9 }}>
              {T.hero.howItWorksLine}
            </motion.p>

            <motion.p className="text-xs text-amber-300/60 max-w-md mx-auto lg:mx-0 mt-2 tracking-wide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.95 }}>
              {T.earlyAccess.heroUrgency}
            </motion.p>

            <motion.a href="/quiz.html" className="inline-flex items-center gap-1.5 text-xs text-amber-300/70 hover:text-amber-300 transition-colors mt-3 mx-auto lg:mx-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.0 }}>
              {T.hero.quizCta}
            </motion.a>
          </div>

          {/* Mobile-only mini report mockup */}
          <motion.div className="md:hidden w-full max-w-sm mx-auto mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.95 }}>
            <div className="bg-green-900/50 px-4 py-3 border-b border-white/[0.06]">
              <p className="text-[9px] font-bold tracking-widest uppercase text-amber-400/60">{T.hero.badge}</p>
              <p className="text-sm font-semibold text-[#f6f1e7]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{T.yourProfile}</p>
            </div>
            <div className="bg-green-950/80 p-4 space-y-2">
              {[
                { label: T.routine.steps[0].label, score: 7.8, color: "bg-green-400" },
                { label: T.routine.steps[1].label, score: 7.2, color: "bg-green-400" },
                { label: T.routine.steps[2].label, score: 3.8, color: "bg-red-400" },
                { label: T.routine.steps[5].label, score: 3.2, color: "bg-red-400" },
              ].map((item, k) => (
                <div key={k} className="flex items-center gap-2">
                  <span className="text-[10px] text-green-200/50 w-20 shrink-0">{item.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score * 10}%` }}
                      transition={{ duration: 1, delay: 1 + k * 0.15 }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-green-200/60 w-8 text-right">{item.score}</span>
                </div>
              ))}
              <p className="text-[9px] text-green-200/30 text-center pt-1">{T.hero.radarCaption}</p>
            </div>
          </motion.div>

          {/* Radar chart — 8 Mental Routine steps, rotating scores every 3s */}
          <HeroRadar steps={T.routine.steps} caption={T.hero.radarCaption} />
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-28 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-5xl">
          <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{T.research.label}</p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {T.research.h2a}<br /><em>{T.research.h2b}</em>
              </h2>
              <div className="w-12 h-0.5 bg-amber-500 mb-6" />
              <p className="text-stone-600 leading-relaxed mb-5">{T.research.p1}</p>
              <p className="text-stone-600 leading-relaxed">{T.research.p2}</p>
            </div>

            <div className="bg-green-950 rounded-2xl p-10 text-[#f6f1e7] shadow-2xl shadow-green-950/30">
              {T.research.stats.map((stat, i) => (
                <div key={i} className={`${i < T.research.stats.length - 1 ? 'mb-8 pb-8 border-b border-green-200/10' : ''}`}>
                  <div className={`${stat.num.length > 5 ? 'text-4xl' : 'text-5xl'} font-semibold text-amber-400 mb-1`} style={{ fontFamily: "'Cormorant Garamond', serif" }}>{stat.num}</div>
                  <div className="text-sm text-green-200/70 leading-relaxed">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.blockquote className="mt-16 border-l-2 border-amber-500 pl-6 max-w-2xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xl text-green-950 italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{T.research.quote}</p>
            <cite className="mt-3 block text-xs font-semibold tracking-widest uppercase text-amber-700 not-italic">{T.research.quoteAuthor}</cite>
          </motion.blockquote>
        </div>
      </section>

      {/* ── 8-STEP MENTAL ROUTINE ────────────────────────────────────────── */}
      <section id="mental-routine" className="py-28 px-6 bg-[#faf8f3]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{T.routine.label}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {T.routine.h2a}<br /><em>{T.routine.h2b}</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6 mb-6" />
            <p className="text-stone-600 text-sm max-w-xl mx-auto leading-relaxed">{T.routine.intro}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {T.routine.steps.map((step, i) => (
              <motion.div key={i} className="bg-white rounded-2xl p-6 border border-green-900/[0.07] shadow-lg shadow-green-900/5 hover:-translate-y-1.5 transition-transform duration-300 relative overflow-hidden" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
                <span className="absolute -bottom-2 -right-1 text-7xl font-bold text-green-900/[0.04] leading-none pointer-events-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.num}</span>
                <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-2">{step.num}</p>
                <h3 className="text-xl font-semibold text-green-950 mb-3 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.label}</h3>
                <p className="text-sm text-stone-600 leading-relaxed relative z-10">{step.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.p className="mt-10 text-center text-sm text-stone-500 max-w-2xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            {T.routine.footerNote}
          </motion.p>
        </div>
      </section>

      {/* ── 3 STEPS PROCESS ──────────────────────────────────────────────── */}
      <section id="steps" className="py-28 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{T.process.label}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {T.process.h2a}<br /><em>{T.process.h2b}</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-6" id="steps-grid">
            {T.process.steps.map((step, i) => (
              <motion.div key={i} className="bg-white rounded-2xl p-8 border border-green-900/[0.07] shadow-lg shadow-green-900/5 hover:-translate-y-1.5 transition-transform duration-300 relative overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
                <span className="absolute bottom-3 right-4 text-8xl font-bold text-green-900/[0.04]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.num}</span>
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                  {i === 0 && <svg viewBox="0 0 24 24" fill="none" stroke="#234a32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>}
                  {i === 1 && <svg viewBox="0 0 24 24" fill="none" stroke="#234a32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="12" y2="17"/></svg>}
                  {i === 2 && <svg viewBox="0 0 24 24" fill="none" stroke="#234a32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>}
                </div>
                <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-2">{T.stepLabel} {step.num}</p>
                <h3 className="text-2xl font-semibold text-green-950 mb-3 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.p className="mt-6 text-center text-xs text-stone-400 flex items-center justify-center gap-1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0"><path d="M8 1l5.5 2.5v4c0 3-2.5 5.5-5.5 6.5C5 13 2.5 10.5 2.5 7.5v-4L8 1z"/></svg>
            {T.process.privacyNote}
          </motion.p>
          <motion.a href="/pro-program" className="mt-3 text-center text-xs text-amber-700/70 hover:text-amber-700 transition-colors flex items-center justify-center gap-1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/></svg>
            {T.process.coachNote}
          </motion.a>
        </div>
      </section>

      {/* ── 6 TALENT DIMENSIONS ──────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#faf8f3]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{T.dimensions.label}</p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {T.dimensions.h2a}<br /><em>{T.dimensions.h2b}</em>
              </h2>
              <div className="w-12 h-0.5 bg-amber-500 mb-6" />
              <p className="text-stone-600 leading-relaxed mb-5">{T.dimensions.p1}</p>
              <p className="text-stone-600 leading-relaxed">{T.dimensions.p2}</p>
              <motion.blockquote className="mt-8 border-l-2 border-amber-500 pl-5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                <p className="text-base text-green-950 italic leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{T.dimensions.quote}</p>
                <cite className="mt-2 block text-xs font-semibold tracking-widest uppercase text-amber-700 not-italic">{T.dimensions.quoteAuthor}</cite>
              </motion.blockquote>
            </motion.div>

            <motion.div className="space-y-3" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              {T.dimensions.items.map((dim, i) => (
                <motion.div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-green-900/[0.07] shadow-sm" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-800">0{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-950">{dim.label}</p>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{dim.desc}</p>
                    {"scenario" in dim && dim.scenario && (
                      <p className="text-xs text-amber-700/70 mt-1.5 italic leading-relaxed">{dim.scenario}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-green-950">
        <div className="container mx-auto max-w-5xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">{T.whyItWorks.label}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#f6f1e7] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {T.whyItWorks.h2a}<br /><em className="text-amber-300">{T.whyItWorks.h2b}</em>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {T.whyItWorks.items.map((item, i) => (
              <motion.div key={i} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-5">
                  {i === 0 && <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>}
                  {i === 1 && <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                  {i === 2 && <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>}
                  {i === 3 && <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                </div>
                <h3 className="text-lg font-semibold text-[#f6f1e7] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.title}</h3>
                <p className="text-sm text-green-200/60 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 px-6 bg-green-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-green-700/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-amber-600/[0.07] blur-3xl" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">{T.pricing.label}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#f6f1e7] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {T.pricing.h2a}<br /><em>{T.pricing.h2b}</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6 mb-4" />
            <p className="text-green-200/60 text-sm">{T.pricing.note}</p>
            <p className="mt-3 text-xs text-amber-300/70">{T.earlyAccess.pricingBanner}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {T.pricing.plans.map((card, i) => (
              <motion.div key={i} className={`rounded-2xl p-8 relative ${i === 1 ? "bg-amber-500/10 border border-amber-400/50" : "bg-white/5 border border-white/10"} hover:-translate-y-1 transition-transform duration-300`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}>
                {i === 1 && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-green-950 text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full">
                    {T.pricing.badge}
                  </div>
                )}
                <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${i === 1 ? "text-amber-300" : "text-amber-400/80"}`}>{card.plan}</p>
                {"wasPrice" in card && card.wasPrice && (
                  <p className="text-sm text-green-200/35 line-through mb-0.5 tracking-wide">
                    <span className="text-green-200/25 text-xs mr-0.5">$</span>{card.wasPrice}
                  </p>
                )}
                <div className="text-6xl font-semibold text-[#f6f1e7] leading-none mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  <sup className="text-2xl align-super font-normal">$</sup>{card.price}
                </div>
                <p className="text-xs text-green-200/50 mb-6 pb-6 border-b border-white/10">{card.tagline}</p>
                <ul className="space-y-3 mb-6">
                  {card.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-green-100/80">
                      <svg viewBox="0 0 16 16" fill="none" stroke="#c4a043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 shrink-0"><polyline points="2 8 6 12 14 4"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {T.pricing.reportPreview && (
                  <div className="mb-6 rounded-xl bg-white/[0.05] border border-white/[0.08] p-4">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-amber-400/70 mb-2.5">{T.pricing.reportPreview.label}</p>
                    <ul className="space-y-1.5">
                      {T.pricing.reportPreview.items.map((item, k) => (
                        <li key={k} className="flex items-center gap-2 text-xs text-green-100/60">
                          <span className="w-1 h-1 rounded-full bg-amber-400/50 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {T.pricing.previewBtn && (
                  <button onClick={() => setPreviewPlan(i === 0 ? "standard" : "deluxe")} className="w-full text-center py-2 mb-3 rounded-lg text-xs font-medium text-amber-300/70 hover:text-amber-300 border border-amber-400/20 hover:border-amber-400/40 bg-amber-400/[0.04] hover:bg-amber-400/[0.08] transition-all">
                    {T.pricing.previewBtn}
                  </button>
                )}
                <a href="#early-access" className={`block text-center py-3 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5 ${i === 1 ? "bg-amber-400 text-green-950 hover:bg-amber-300 shadow-lg shadow-amber-500/30" : "border border-white/25 text-[#f6f1e7] hover:border-white/60 hover:bg-white/5"}`}>
                  {T.earlyAccess.pricingCta}
                </a>
              </motion.div>
            ))}
          </div>

          {/* ── CREDITS NOTE ── */}
          {T.pricing.creditsNote && (
            <p className="mt-5 text-center text-xs text-green-200/40">
              {T.pricing.creditsNote}
            </p>
          )}

          {/* ── COMPARISON TABLE ── */}
          {T.pricing.comparisonRows && (
            <motion.div className="mt-12 max-w-2xl mx-auto" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
              <h3 className="text-center font-serif text-2xl font-semibold text-white mb-6">{T.pricing.comparisonTitle}</h3>

              {/* Desktop table */}
              <div className="hidden sm:block rounded-2xl border border-white/[0.08] bg-white/[0.04] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="text-left py-3 px-4 text-green-200/50 font-normal"></th>
                      <th className="py-3 px-4 text-amber-400 font-semibold text-center">{T.pricing.plans[0].plan}</th>
                      <th className="py-3 px-4 text-amber-400 font-semibold text-center">{T.pricing.plans[1].plan}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {T.pricing.comparisonRows.map((row, i) => (
                      <tr key={i} className={i < T.pricing.comparisonRows.length - 1 ? "border-b border-white/[0.06]" : ""}>
                        <td className="py-3 px-4 text-green-200/70">{row.label}</td>
                        <td className="py-3 px-4 text-center text-white/80">{row.standard}</td>
                        <td className="py-3 px-4 text-center text-white/80">{row.deluxe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-3">
                {T.pricing.comparisonRows.map((row, i) => (
                  <div key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                    <p className="text-xs text-green-200/70 mb-2">{row.label}</p>
                    <div className="flex gap-3">
                      <div className="flex-1 text-center rounded-lg bg-white/[0.04] py-1.5">
                        <p className="text-[10px] text-green-200/40 mb-0.5">{T.pricing.plans[0].plan}</p>
                        <p className="text-sm text-white/80 font-medium">{row.standard}</p>
                      </div>
                      <div className="flex-1 text-center rounded-lg bg-amber-400/[0.06] border border-amber-400/15 py-1.5">
                        <p className="text-[10px] text-amber-300/50 mb-0.5">{T.pricing.plans[1].plan}</p>
                        <p className="text-sm text-white/80 font-medium">{row.deluxe}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── GUARANTEE BANNER — inside pricing, below cards ── */}
          <motion.div className="mt-10 max-w-2xl mx-auto rounded-2xl border border-amber-400/20 bg-white/[0.04] px-7 py-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}>
            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/25 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-amber-300 text-sm">{T.guarantee.title}</p>
              <p className="text-xs text-green-200/50 mt-0.5 max-w-lg leading-relaxed">{T.guarantee.body}</p>
            </div>
          </motion.div>

          {/* Pricing testimonial */}
          <motion.div className="mt-6 max-w-md mx-auto text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
            <p className="text-sm italic text-green-200/50 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              &ldquo;{T.pricing.pricingQuote.text}&rdquo;
            </p>
            <p className="text-xs text-amber-400/60 mt-2">
              — {T.pricing.pricingQuote.name}, {T.pricing.pricingQuote.role}
            </p>
          </motion.div>

          {/* ── QUIZ CTA — softer alternative after pricing ── */}
          <motion.div className="mt-10 text-center" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-6 py-4">
              <svg viewBox="0 0 20 20" fill="none" stroke="#c4a043" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0"><path d="M10 18.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z"/><path d="M7.2 7.2a2.8 2.8 0 0 1 5.1 1.4c0 1.9-2.8 2.5-2.8 2.5"/><circle cx="10" cy="14.5" r="0.5" fill="#c4a043"/></svg>
              <div className="text-left">
                <p className="text-sm text-green-200/70">{T.cta.quizLine}</p>
                <a href="/quiz.html" className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors">{T.hero.quizCta}</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRAINING REPORTS (formerly Skills Developer) ─────────────────── */}
      <section className="py-28 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{T.skillBuilder.label}</p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {T.skillBuilder.h2a}<br /><em>{T.skillBuilder.h2b}</em>
              </h2>
              <div className="w-12 h-0.5 bg-amber-500 mb-6" />
              <p className="text-stone-600 leading-relaxed mb-5">{T.skillBuilder.p1}</p>
              <p className="text-stone-600 leading-relaxed mb-3">{T.skillBuilder.p2}</p>
              {T.skillBuilder.p2items && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {(T.skillBuilder.p2items as ReadonlyArray<string>).map((item, k) => {
                    const chipColors = [
                      "bg-amber-100 text-amber-800 border-amber-200",
                      "bg-sky-100 text-sky-800 border-sky-200",
                      "bg-green-100 text-green-800 border-green-200",
                      "bg-rose-100 text-rose-800 border-rose-200",
                      "bg-violet-100 text-violet-800 border-violet-200",
                      "bg-purple-100 text-purple-800 border-purple-200",
                      "bg-blue-100 text-blue-800 border-blue-200",
                    ];
                    return (
                      <span key={k} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${chipColors[k % chipColors.length]}`}>
                        <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                        {item}
                      </span>
                    );
                  })}
                </div>
              )}
              <div className="flex items-center gap-3 mb-8 p-3.5 rounded-xl bg-green-950/[0.05] border border-green-900/10">
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-green-900/10 text-xs font-semibold text-green-900 shadow-sm">{T.pricing.plans[0].plan} · {T.skillBuilder.reportCountStd}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-green-950 text-xs font-semibold text-amber-300 shadow-sm">{T.pricing.plans[1].plan} · {T.skillBuilder.reportCountDlx}</span>
                </div>
                <span className="text-xs text-stone-400">{T.skillBuilder.extraCredits}</span>
              </div>
              <a href="#early-access" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-green-950 rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/25 text-sm font-bold tracking-wide">
                {T.earlyAccess.ctaBtn}
              </a>
            </motion.div>

            {/* Training Report preview card */}
            <motion.div className="rounded-3xl overflow-hidden border border-green-900/15 shadow-xl shadow-green-900/10 cursor-pointer group" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} onClick={() => setPreviewPlan("training")}>
              {/* Report header */}
              <div className="bg-green-950 px-6 pt-6 pb-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-[9px] font-bold tracking-widest uppercase text-amber-400/60 mb-1">{T.skillBuilder.mockup.tagline}</p>
                    <p className="text-lg font-semibold text-[#f6f1e7] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{T.skillBuilder.mockup.title}</p>
                    <p className="text-xs text-green-200/40 mt-0.5">{T.skillBuilder.mockup.subtitle}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[38%] bg-amber-400 rounded-full" />
                  </div>
                  <span className="text-xs text-amber-400 font-semibold shrink-0">3.8 / 10</span>
                  <span className="text-[10px] text-green-200/30 shrink-0">· {T.skillBuilder.mockup.priority}</span>
                </div>
              </div>
              {/* Report content preview */}
              <div className="bg-[#faf8f3] p-3.5 space-y-2">
                {([
                  { dot: "bg-amber-500",     tag: T.skillBuilder.mockup.physical, tagColor: "bg-amber-100 text-amber-700", label: T.skillBuilder.mockup.exercise, body: T.skillBuilder.mockup.exPhysical },
                  { dot: "bg-sky-500",       tag: T.skillBuilder.mockup.mental,   tagColor: "bg-sky-100 text-sky-700",     label: T.skillBuilder.mockup.exercise, body: T.skillBuilder.mockup.exMental },
                  { dot: "bg-green-600",     label: T.skillBuilder.mockup.expertInsight,  body: T.skillBuilder.mockup.exExpert },
                  { dot: "bg-rose-400",      label: T.skillBuilder.mockup.reflection,     body: T.skillBuilder.mockup.exReflection },
                  { dot: "bg-violet-500",    label: T.skillBuilder.mockup.storytelling,   body: T.skillBuilder.mockup.exStorytelling },
                  { dot: "bg-purple-400",    label: T.skillBuilder.mockup.mantra,         body: T.skillBuilder.mockup.exMantra },
                  { dot: "bg-blue-500/70",   label: T.skillBuilder.mockup.aiPrompt,       body: T.skillBuilder.mockup.exAiPrompt },
                  { dot: "bg-stone-400",     label: T.skillBuilder.mockup.benchmarked,    body: T.skillBuilder.mockup.exBenchmarked },
                ] as Array<{ dot: string; tag?: string; tagColor?: string; label: string; body: string }>).map((row, k) => (
                  <div key={k} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 border border-green-900/[0.06] shadow-sm">
                    <span className={`w-1.5 h-1.5 rounded-full ${row.dot} shrink-0`} />
                    <div className="min-w-0 flex items-baseline gap-1.5 flex-wrap">
                      <p className="text-[9px] font-bold tracking-widest uppercase text-stone-400 shrink-0">{row.label}</p>
                      {row.tag && (
                        <span className={`text-[8px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded-full shrink-0 ${row.tagColor}`}>{row.tag}</span>
                      )}
                      <p className="text-[10px] text-stone-500 truncate">{row.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Preview button */}
              <div className="bg-[#faf8f3] px-3.5 pb-3.5">
                {T.skillBuilder.previewBtn && (
                  <button className="w-full text-center py-2.5 rounded-lg text-xs font-medium text-amber-700 hover:text-amber-900 border border-amber-500/20 hover:border-amber-500/40 bg-amber-400/[0.06] hover:bg-amber-400/[0.12] transition-all group-hover:border-amber-500/40 group-hover:bg-amber-400/[0.12]">
                    {T.skillBuilder.previewBtn}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-28 px-6 bg-[#faf8f3] relative overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{T.testimonials.label}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <em>{T.testimonials.h2}</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6" />
          </motion.div>

          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[700px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn}  duration={30} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={38} />
            <TestimonialsColumn testimonials={thirdColumn}  className="hidden lg:block" duration={34} />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-28 px-6 bg-[#faf8f3]">
        <div className="container mx-auto">
          <FaqsSection />
        </div>
      </section>

      {/* ── EARLY ACCESS SIGNUP ──────────────────────────────────────────── */}
      <EarlyAccessSection />

      {/* ── CONTACT FORM ─────────────────────────────────────────────────── */}
      <ContactSection />

      {/* ── REPORT PREVIEW MODAL ────────────────────────────────────────── */}
      <AnimatePresence>
        {previewPlan && <ReportPreviewModal plan={previewPlan} onClose={() => setPreviewPlan(null)} />}
      </AnimatePresence>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#0d1f15] relative overflow-hidden">

        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-green-800/10 blur-3xl pointer-events-none" />

        {/* ── Main grid ── */}
        <div className="relative container mx-auto max-w-5xl px-6 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

            {/* Col 1 — Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <img src="/logoMRpng.png" alt="MentalRoutine logo" className="w-14 h-14 shrink-0 object-contain" />
                <span className="text-xl font-semibold text-[#f6f1e7]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Mental<span className="text-amber-400">Routine</span>
                </span>
              </div>

              <p className="text-sm text-green-200/45 leading-relaxed mb-6">{T.footer.tagline}</p>

              {/* Quote */}
              <blockquote className="border-l-2 border-amber-500/40 pl-4">
                <p className="text-base italic text-green-200/60 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  &ldquo;{T.footer.quoteText}&rdquo;
                </p>
                <cite className="mt-2 block text-xs text-amber-600/70 not-italic tracking-widest uppercase">{T.footer.quoteAuthor}</cite>
              </blockquote>
            </div>

            {/* Col 2 — Navigation */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-green-400/40 mb-5">Menu</p>
              <nav className="flex flex-col gap-3">
                {[
                  { label: T.nav.howItWorks,   href: '#how-it-works' },
                  { label: T.nav.pricing,      href: '#pricing'       },
                  { label: T.nav.testimonials, href: '#testimonials'  },
                  { label: T.nav.faq,          href: '#faq'           },
                  { label: T.nav.contact,      href: '#contact'       },
                  { label: T.footer.quizLink, href: '/quiz.html' },
                ].map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-green-200/50 hover:text-amber-300 transition-colors duration-200"
                  >
                    <span className="w-3 h-px bg-green-200/20 group-hover:bg-amber-400/60 group-hover:w-5 transition-all duration-300" />
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Col 3 — Social & Links */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-green-400/40 mb-5">{T.footer.socialLabel}</p>

              <div className="flex flex-col gap-2.5 mb-8">
                {[
                  { label: "Instagram", handle: "@mentalroutine", href: "https://instagram.com/mentalroutine",        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
                  { label: "TikTok",    handle: "@mentalroutine", href: "https://tiktok.com/@mentalroutine",           icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg> },
                  { label: "YouTube",   handle: "@mentalroutine", href: "https://youtube.com/@mentalroutine",          icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.52V8.48L15.5 12l-5.75 3.52z"/></svg> },
                  { label: "X / Twitter", handle: "@mentalroutine", href: "https://x.com/mentalroutine",              icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                  { label: "LinkedIn",  handle: "MentalRoutine",   href: "https://linkedin.com/company/mentalroutine", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                ].map(s => (
                  <a key={s.label} href={s.href} aria-label={s.label}
                    className="group flex items-center gap-3 text-sm text-green-200/40 hover:text-green-100 transition-colors duration-200"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-green-300/50 group-hover:text-amber-400 group-hover:border-amber-400/30 group-hover:bg-amber-400/5 transition-all duration-200">
                      {s.icon}
                    </span>
                    <span className="text-xs">{s.label}</span>
                  </a>
                ))}
              </div>

              <a href="#early-access"
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors group"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
                  <path d="M8 1v14M1 8l7-7 7 7"/>
                </svg>
                <span>{T.earlyAccess.ctaBtn}</span>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform">
                  <path d="M1 6h10M6 1l5 5-5 5"/>
                </svg>
              </a>

              {T.footer.teachingPro && (
                <a href="/pro-program" className="inline-flex items-center gap-2 text-xs text-green-200/35 hover:text-amber-300 transition-colors mt-4 group">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/></svg>
                  <span>{T.footer.teachingPro}</span>
                </a>
              )}

              {T.footer.quizLink && (
                <a href="/quiz.html" className="inline-flex items-center gap-2 text-xs text-green-200/35 hover:text-amber-300 transition-colors mt-3 group">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0"><path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14z"/><path d="M5.8 5.8a2.2 2.2 0 0 1 4.1 1.1c0 1.5-2.2 2-2.2 2"/><circle cx="8" cy="12" r="0.5" fill="currentColor"/></svg>
                  <span>{T.footer.quizLink}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.05]">
          <div className="container mx-auto max-w-5xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-green-200/30">{T.footer.copyright}</p>
            <div className="flex items-center gap-4 text-xs text-green-200/25">
              <a href="https://nogbetergolfen.nl" className="hover:text-green-200/60 transition-colors">nogbetergolfen.nl</a>
              <span>·</span>
              <span>{T.footer.methodBy}</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ── ROOT EXPORT — wraps everything in the language provider ───────────────────
export default function Home() {
  return (
    <LangProvider>
      <PageContent />
    </LangProvider>
  );
}
