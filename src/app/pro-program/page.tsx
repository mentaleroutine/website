"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

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

const PGA_DIVISIONS = [
  "PGA of America", "PGA European Tour", "PGA Netherlands", "PGA UK",
  "PGA Australia", "Other",
];

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia",
  "Netherlands", "Belgium", "France", "Germany", "Spain", "Other",
];

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
export default function ProProgramPage() {
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
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      track("pro_program_submit", { country: form.country || "unknown" });
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
              PGA Professional Program
            </motion.span>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-[#f6f1e7] mb-6"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            >
              Add a New Revenue Stream<br />
              <span className="italic text-amber-300">to Your Teaching Practice</span>
            </motion.h1>

            <motion.p
              className="text-lg text-green-200/75 max-w-2xl mx-auto mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            >
              Join the Mental Routine Pro Program and earn <strong className="text-amber-300">$4,860+ per year</strong> with
              ready-made materials — no extra lesson prep required.
            </motion.p>

            <motion.p
              className="text-base text-green-200/55 max-w-xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            >
              Earn $20 per assessment sold through your personal code. Run clinics with our turnkey curriculum. Keep 100% of your lesson package revenue.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
            >
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/30 text-sm tracking-wide"
              >
                Apply for Free Access
              </button>
              <a
                href="#how-it-works"
                className="px-8 py-4 border border-green-200/25 text-green-200 rounded-lg hover:border-green-200/60 hover:bg-green-200/5 transition-all text-sm"
              >
                See How It Works
              </a>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] rounded-full px-4 py-1.5 text-xs text-green-200/65">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                Free to join · No obligations · Available worldwide
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET (FREE) ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-5xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">Free Program</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              Everything You Need<br /><em>to Start Earning Today</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Free Deluxe Assessment", desc: "Experience the full product yourself — a $129 value, completely free.", icon: "gift" },
              { title: "$20 Per Sale", desc: "Earn a flat $20 commission for every assessment sold through your personal code.", icon: "dollar" },
              { title: "Discount Codes", desc: "Give your students $15 off Standard or $30 off Deluxe — they save, you earn.", icon: "tag" },
              { title: "Affiliate Kit", desc: "Ready-made sales copy, emails, and social posts to share with your student base.", icon: "kit" },
            ].map((item, i) => (
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

          <motion.div className="text-center mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <button onClick={scrollToForm} className="px-8 py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 text-sm tracking-wide">
              Apply for Free Access
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── THE NUMBERS ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-green-950">
        <div className="container mx-auto max-w-5xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">Your Earning Potential</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#f6f1e7] leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              $4,860+ Per Year.<br /><em className="text-amber-300">Here&apos;s the Math.</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: "Assessment Commissions", calc: "50 students × $20", total: "$1,000", sub: "per year, passive income" },
              { label: "Clinic Revenue", calc: "4 clinics × 10 students × $59", total: "$2,360", sub: "per year, your own pricing" },
              { label: "Lesson Packages", calc: "Upsell 3- and 5-lesson packs", total: "$1,500+", sub: "per year, 100% yours" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 text-center"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-amber-400/80 mb-4">{item.label}</p>
                <div className="text-5xl font-semibold text-[#f6f1e7] leading-none mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  {item.total}
                </div>
                <p className="text-sm text-green-200/50 mb-1">{item.calc}</p>
                <p className="text-xs text-green-200/35">{item.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Total */}
          <motion.div
            className="mt-8 max-w-3xl mx-auto rounded-2xl border border-amber-400/30 bg-amber-500/10 px-8 py-6 text-center"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-300 mb-2">Combined Annual Potential</p>
            <div className="text-6xl font-semibold text-[#f6f1e7] leading-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              $4,860<sup className="text-2xl align-super font-normal text-amber-300">+</sup>
            </div>
            <p className="text-sm text-green-200/50 mt-2">With ready-made materials and zero lesson prep</p>
          </motion.div>

          <motion.div className="text-center mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
            <button onClick={scrollToForm} className="px-8 py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/30 text-sm tracking-wide">
              Start Earning — Apply Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 bg-[#faf8f3]">
        <div className="container mx-auto max-w-5xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">3 Simple Steps</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              Up and Running<br /><em>in Under a Week</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Apply & Get Approved", body: "Fill in the form below. We verify your PGA credentials and send you access — usually within the same day." },
              { num: "02", title: "Experience It Yourself", body: "Take the free Deluxe Assessment ($129 value). See exactly what your students will discover about their mental game." },
              { num: "03", title: "Share & Earn", body: "Share your personal discount code with your students. Every sale earns you $20 — automatically tracked and paid monthly." },
            ].map((step, i) => (
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
              <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">Ready to Go Deeper?</p>
              <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 mb-6 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                Unlock the Full<br /><em>Teaching Toolkit</em>
              </h2>
              <div className="w-12 h-0.5 bg-amber-500 mb-6" />
              <p className="text-stone-600 leading-relaxed mb-5">
                Once you&apos;re active in the free program, you can upgrade to the full Pro Toolkit — with video training, a complete clinic curriculum, and lesson programs you can sell under your own name.
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                Start free. Upgrade when you&apos;re ready. No pressure, no deadlines.
              </p>
              <button onClick={scrollToForm} className="px-6 py-3 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 text-sm tracking-wide">
                Get Started Free First
              </button>
            </motion.div>

            <motion.div className="space-y-4" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              {[
                { icon: <IconPlay />, title: "22 Training Videos", desc: "8 process videos + 14 deep-dives into every Mental Routine element (5-10 min each)" },
                { icon: <IconUsers />, title: "Complete Clinic Curriculum", desc: "Fully scripted 2.5-hour workshop with slides, handouts, and email templates" },
                { icon: <IconDollar />, title: "Lesson Programs", desc: "Ready-made 3-lesson ($199) and 5-lesson ($329) packages — 100% your revenue" },
                { icon: <IconShield />, title: "Pro Portal Access", desc: "Dedicated resources, updates, and support in your private dashboard" },
              ].map((item, i) => (
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
              <p className="text-xs text-stone-400 pl-14">Available as upgrade: $99/year or $199 lifetime</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-green-950">
        <div className="container mx-auto max-w-4xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">From Fellow Professionals</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#f6f1e7] leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              What Pro&apos;s Are<br /><em className="text-amber-300">Saying</em>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "I shared my code with 30 students in the first week. Six bought the assessment without me having to pitch anything.", name: "Teaching Pro", location: "Florida, USA" },
              { quote: "The clinic curriculum saved me hours of preparation. My students loved the interactive format and 4 signed up for follow-up lessons.", name: "Head Professional", location: "Surrey, UK" },
              { quote: "Finally a mental game tool I can recommend with confidence. The assessment gives me concrete data to work with in my lessons.", name: "PGA Coach", location: "Noord-Holland, NL" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} viewBox="0 0 20 20" fill="#c4a043" className="w-4 h-4">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-green-100/80 leading-relaxed mb-5 italic">&ldquo;{item.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-[#f6f1e7]">{item.name}</p>
                  <p className="text-xs text-green-200/40">{item.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#faf8f3]">
        <div className="container mx-auto max-w-3xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">Questions?</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              Frequently<br /><em>Asked</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6" />
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "Is it really free to join?", a: "Yes. The free program gives you a complimentary Deluxe Assessment ($129 value), personal discount codes for your students, and $20 commission per sale. No costs, no obligations." },
              { q: "How do I get paid?", a: "Commissions are paid monthly via PayPal, as long as your balance is $100 or more. Below that, it rolls over to the next month. Every sale is automatically tracked through your personal code." },
              { q: "Do I need to be a PGA member?", a: "Yes. We verify PGA credentials to ensure quality and credibility for both you and your students. All PGA divisions worldwide are welcome." },
              { q: "How much time does this take?", a: "The free program takes virtually zero time — just share your code. If you upgrade to the full toolkit, the clinic runs itself with our turnkey curriculum (2.5 hours including prep)." },
              { q: "What's the difference between free and paid?", a: "Free = affiliate (earn commissions by sharing your code). Paid ($99/year or $199 lifetime) = full teaching toolkit with 22 training videos, clinic curriculum, lesson programs, and Pro Portal access." },
              { q: "Can I set my own prices for clinics and lessons?", a: "Absolutely. We provide suggested pricing ($59 per clinic, $199/$329 for lesson packages), but you set whatever price works for your market. 100% of clinic and lesson revenue is yours." },
              { q: "How fast will I get approved?", a: "Usually within the same business day. Maximum 2-3 business days. Once approved, you receive your free assessment code and discount codes immediately." },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} index={i} />
            ))}
          </div>

          <motion.div className="text-center mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <button onClick={scrollToForm} className="px-8 py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 text-sm tracking-wide">
              Apply for Free Access
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── APPLICATION FORM ──────────────────────────────────────────────── */}
      <section id="pro-form" className="py-24 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-2xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">Apply Now</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              Join the Pro<br /><em>Program</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6 mb-4" />
            <p className="text-stone-500 text-sm">We review every application personally. You&apos;ll hear back within 1-3 business days.</p>
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
              <h3 className="text-2xl font-semibold text-green-950 mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>Application Received!</h3>
              <p className="text-stone-500 text-sm mb-1">Thank you for your interest in the Pro Program.</p>
              <p className="text-stone-500 text-sm">We&apos;ll review your application and get back to you within 1-3 business days.</p>
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
                  <label className={labelCls}>Full Name *</label>
                  <input type="text" required value={form.fullName} onChange={update("fullName")} placeholder="John Smith" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email *</label>
                  <input type="email" required value={form.email} onChange={update("email")} placeholder="john@example.com" className={inputCls} />
                </div>
              </div>

              {/* Row 2: PGA Number + Division */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>PGA Membership Number *</label>
                  <input type="text" required value={form.pgaNumber} onChange={update("pgaNumber")} placeholder="Your PGA number" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>PGA Division *</label>
                  <select required value={form.pgaDivision} onChange={update("pgaDivision")} className={selectCls}>
                    <option value="">Select division...</option>
                    {PGA_DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 3: LinkedIn + Country */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>LinkedIn Profile URL *</label>
                  <input type="url" required value={form.linkedIn} onChange={update("linkedIn")} placeholder="https://linkedin.com/in/..." className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Country *</label>
                  <select required value={form.country} onChange={update("country")} className={selectCls}>
                    <option value="">Select country...</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 4: Facility + Students */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Club / Facility *</label>
                  <input type="text" required value={form.facility} onChange={update("facility")} placeholder="Your club or facility" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Active Students (approx.) *</label>
                  <input type="number" required value={form.activeStudents} onChange={update("activeStudents")} placeholder="e.g. 40" className={inputCls} />
                </div>
              </div>

              {/* Row 5: Group lessons + Mental experience */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Do you give group lessons / clinics? *</label>
                  <select required value={form.groupLessons} onChange={update("groupLessons")} className={selectCls}>
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Experience with mental coaching? *</label>
                  <select required value={form.mentalExperience} onChange={update("mentalExperience")} className={selectCls}>
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="some">A little</option>
                  </select>
                </div>
              </div>

              {/* Row 6: How found */}
              <div>
                <label className={labelCls}>How did you find us? *</label>
                <select required value={form.howFound} onChange={update("howFound")} className={selectCls}>
                  <option value="">Select...</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="colleague">Colleague</option>
                  <option value="google">Google</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button type="submit" disabled={sending} className="w-full py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed">
                {sending ? "Sending..." : "Submit Application"}
              </button>
              {error && <p className="text-center text-xs text-red-500">Something went wrong. Please try again or email support@mentalroutine.com</p>}

              <div className="flex items-center justify-center gap-4 text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M8 1l5.5 2.5v4c0 3-2.5 5.5-5.5 6.5C5 13 2.5 10.5 2.5 7.5v-4L8 1z" /></svg>
                  100% free
                </span>
                <span>·</span>
                <span>No obligations</span>
                <span>·</span>
                <span>Response within 1-3 days</span>
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
          <p className="text-xs text-green-200/40">&copy; {new Date().getFullYear()} Mental Routine. All rights reserved.</p>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ─────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-green-950/95 backdrop-blur-lg border-t border-white/[0.08] px-4 py-3">
        <button
          onClick={scrollToForm}
          className="w-full py-3.5 bg-amber-400 text-green-950 font-bold rounded-lg text-sm tracking-wide shadow-lg shadow-amber-500/30"
        >
          Apply for Free Access
        </button>
      </div>

    </main>
  );
}

// ── FAQ ITEM COMPONENT ──────────────────────────────────────────────────────
function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-xl border border-green-900/[0.07] shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <button
        onClick={() => setOpen(o => !o)}
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
        <div className="px-6 pb-5">
          <p className="text-sm text-stone-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </motion.div>
  );
}
