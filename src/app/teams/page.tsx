"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LangProvider, useLang } from "@/context/lang-context";
import { TEAM_TEXT, TEAM_CONTACT, SITE, teamLang, type TeamLang } from "@/lib/teams-text";

declare global { interface Window { plausible?: (event: string, options?: { props?: Record<string, string> }) => void } }
function track(event: string, props?: Record<string, string>) { window.plausible?.(event, props ? { props } : undefined); }

const serif = { fontFamily: "var(--font-cormorant), serif" } as const;
const teamUrl = (L: TeamLang) => `${SITE}/teams?lang=${L}`;

// ── TAALWISSEL NL/EN (zelfde als /pro-program: deze pagina heeft geen navbar) ──────────────
function LangSwitch() {
  const { lang, setLang } = useLang();
  const L = teamLang(lang);
  const btn = (code: TeamLang, label: string) => (
    <button
      type="button"
      onClick={() => { setLang(code); track("lang_switch", { lang: code }); }}
      aria-pressed={L === code}
      className={`px-2.5 py-1 text-xs font-semibold tracking-widest uppercase rounded-md transition-colors ${
        L === code ? "bg-amber-400 text-green-950" : "text-green-200/70 hover:text-amber-300"
      }`}
    >
      {label}
    </button>
  );
  return (
    <div className="absolute top-5 right-5 z-20 flex items-center gap-1 rounded-lg border border-white/[0.12] bg-white/[0.06] p-1 backdrop-blur-sm"
         aria-label="Taal / Language">
      {btn("nl", "NL")}
      {btn("en", "EN")}
    </div>
  );
}

function scrollToSend() {
  document.getElementById("stuur-je-pro")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionHead({ label, title, em, dark = false }: { label: string; title: string; em: string; dark?: boolean }) {
  return (
    <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${dark ? "text-amber-400" : "text-amber-700"}`}>{label}</p>
      <h2 className={`text-4xl lg:text-5xl font-semibold leading-tight ${dark ? "text-[#f6f1e7]" : "text-green-950"}`} style={serif}>
        {title}<br /><em className={dark ? "text-amber-300" : ""}>{em}</em>
      </h2>
      <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6" />
    </motion.div>
  );
}

const ctaCls = "px-8 py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/30 text-sm tracking-wide";

function TeamsContent() {
  const { lang } = useLang();
  const L = teamLang(lang);            // NL of EN; andere talen zien de Engelse pagina
  const T = TEAM_TEXT[L];
  const [copied, setCopied] = useState(false);

  const mailHref = `mailto:?subject=${encodeURIComponent(T.mailSubject)}&body=${encodeURIComponent(T.mailBody.replace("{url}", teamUrl(L)))}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(teamUrl(L));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      track("teams_send_pro", { via: "copy", lang: L });
    } catch { /* geen klembord: de mailknop blijft werken */ }
  }

  return (
    <main className="bg-[#faf8f3] text-[#1a1c18] pb-20 md:pb-0">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#162b1e]">
        <LangSwitch />
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
              style={serif}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            >
              {T.heroTitle}<br />
              <span className="italic text-amber-300">{T.heroTitleEm}</span>
            </motion.h1>

            <motion.p
              className="text-lg text-green-200/80 max-w-2xl mx-auto mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            >
              {T.heroP1}
            </motion.p>
            <motion.p
              className="text-base text-green-200/60 max-w-xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            >
              {T.heroP2}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
            >
              <button onClick={() => { scrollToSend(); track("teams_cta", { place: "hero", lang: L }); }} className={ctaCls}>{T.ctaSend}</button>
              <a href="#zo-werkt-het" className="px-8 py-4 border border-green-200/25 text-green-200 rounded-lg hover:border-green-200/60 hover:bg-green-200/5 transition-all text-sm">
                {T.ctaHow}
              </a>
            </motion.div>

            <motion.div className="flex justify-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
              <span className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] rounded-full px-4 py-1.5 text-xs text-green-200/75 text-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                {T.trust}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WAT HET TEAM ERAAN HEEFT ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-5xl">
          <SectionHead label={T.whyLabel} title={T.whyTitle} em={T.whyTitleEm} />
          <motion.p className="text-center text-lg text-stone-600 max-w-2xl mx-auto -mt-6 mb-12 leading-relaxed"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            {T.whyIntro}
          </motion.p>
          <div className="grid md:grid-cols-2 gap-5">
            {T.whyCards.map((c, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-8 border border-green-900/[0.07] shadow-lg shadow-green-900/5"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                  <span className="text-green-800 text-sm font-bold">{i + 1}</span>
                </div>
                <h3 className="text-2xl font-semibold text-green-950 mb-2 leading-tight" style={serif}>{c.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALS JE HET NIET DOET ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-green-950">
        <div className="container mx-auto max-w-3xl">
          <SectionHead label={T.lossLabel} title={T.lossTitle} em={T.lossTitleEm} dark />
          <ul className="space-y-4">
            {T.lossItems.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-4 bg-white/[0.04] border border-white/[0.08] rounded-xl px-6 py-5"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className="mt-1 w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span className="text-base text-green-100/85 leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
          <motion.p
            className="mt-10 rounded-2xl border border-amber-400/30 bg-amber-500/10 px-8 py-7 text-center text-xl md:text-2xl font-semibold text-[#f6f1e7] leading-snug"
            style={serif}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          >
            {T.lossClose}
          </motion.p>
        </div>
      </section>

      {/* ── PRIJS ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#faf8f3]">
        <div className="container mx-auto max-w-4xl">
          <SectionHead label={T.priceLabel} title={T.priceTitle} em={T.priceTitleEm} />
          <motion.div
            className="bg-white rounded-2xl border border-amber-500/40 shadow-xl shadow-green-900/10 overflow-hidden"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="bg-green-950 px-8 py-4 text-center">
              <p className="text-xs font-semibold tracking-widest uppercase text-amber-400">{T.priceNow.label}</p>
            </div>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-green-900/10">
              <div className="p-8 text-center">
                <div className="text-6xl font-semibold text-green-950" style={serif}>{T.priceNow.player}</div>
                <p className="text-sm text-stone-500 mt-1">{T.priceNow.playerSub}</p>
              </div>
              <div className="p-8 text-center">
                <div className="text-6xl font-semibold text-green-950" style={serif}>{T.priceNow.team}</div>
                <p className="text-sm text-stone-500 mt-1">{T.priceNow.teamSub}</p>
              </div>
            </div>
            <p className="px-8 pb-6 text-center text-sm text-stone-600 leading-relaxed">{T.priceNow.note}</p>
            <div className="border-t border-green-900/10 bg-[#f6f1e7] px-8 py-4 text-center text-sm text-stone-600">
              <span className="font-semibold text-green-950">{T.priceLater.label}:</span> {T.priceLater.line}
            </div>
          </motion.div>

          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-10 max-w-3xl mx-auto">
            {T.priceFacts.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed">
                <svg viewBox="0 0 16 16" fill="none" stroke="#c4a043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 mt-0.5"><polyline points="2 8 6 12 14 4" /></svg>
                {f}
              </li>
            ))}
          </ul>

          <div className="text-center mt-10">
            <button onClick={() => { scrollToSend(); track("teams_cta", { place: "price", lang: L }); }} className={ctaCls}>{T.ctaSend}</button>
          </div>
        </div>
      </section>

      {/* ── ZO WERKT HET ──────────────────────────────────────────────────── */}
      <section id="zo-werkt-het" className="py-24 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-5xl">
          <SectionHead label={T.howLabel} title={T.howTitle} em={T.howTitleEm} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {T.howSteps.map((step, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-7 border border-green-900/[0.07] shadow-lg shadow-green-900/5 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span className="absolute bottom-2 right-3 text-7xl font-bold text-green-900/[0.04]" style={serif}>{step.num}</span>
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-5">
                  <span className="text-sm font-bold text-green-800">{step.num}</span>
                </div>
                <h3 className="text-xl font-semibold text-green-950 mb-2 leading-tight" style={serif}>{step.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed relative z-10">{step.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-14">
            {T.getItems.map((item, i) => (
              <motion.div
                key={i}
                className="rounded-2xl p-7 border border-green-900/10 bg-[#faf8f3]"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <h3 className="text-lg font-semibold text-green-950 mb-2 leading-snug" style={serif}>{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUUR DIT NAAR JE PRO (de ene hoofdactie) ─────────────────────── */}
      <section id="stuur-je-pro" className="py-24 px-6 bg-[#162b1e] scroll-mt-4">
        <div className="container mx-auto max-w-2xl text-center">
          <SectionHead label={T.sendLabel} title={T.sendTitle} em={T.sendTitleEm} dark />
          <p className="text-base text-green-200/75 leading-relaxed -mt-4 mb-10">{T.sendBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={mailHref} onClick={() => track("teams_send_pro", { via: "mail", lang: L })} className={ctaCls}>{T.sendMail}</a>
            <button onClick={copyLink} className="px-8 py-4 border border-green-200/25 text-green-200 rounded-lg hover:border-green-200/60 hover:bg-green-200/5 transition-all text-sm" aria-live="polite">
              {copied ? T.sendCopied : T.sendCopy}
            </button>
          </div>
          <p className="mt-6 text-xs text-green-200/50 break-all">{teamUrl(L)}</p>
          <p className="mt-10 text-sm text-green-200/70 leading-relaxed">
            {T.noPro}
            <a href={`mailto:${TEAM_CONTACT}`} onClick={() => track("teams_contact", { lang: L })} className="text-amber-300 underline underline-offset-4 hover:text-amber-200">{T.noProLink}</a>
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#faf8f3]">
        <div className="container mx-auto max-w-3xl">
          <SectionHead label={T.faqLabel} title={T.faqTitle} em={T.faqTitleEm} />
          <div className="space-y-4">
            {T.faqs.map((item, i) => (
              <FaqItem key={`${L}-${i}`} question={item.q} answer={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VOOR DE PRO ───────────────────────────────────────────────────── */}
      <section id="voor-de-pro" className="py-24 px-6 bg-[#f6f1e7] scroll-mt-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="bg-white rounded-2xl p-8 md:p-10 border border-green-900/[0.07] shadow-lg shadow-green-900/5"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{T.proLabel}</p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-green-950 leading-tight mb-4" style={serif}>
              {T.proTitle} <em>{T.proTitleEm}</em>
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">{T.proBody}</p>
            <ul className="space-y-3 mb-6">
              {T.proPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed">
                  <svg viewBox="0 0 16 16" fill="none" stroke="#c4a043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 mt-0.5"><polyline points="2 8 6 12 14 4" /></svg>
                  {p}
                </li>
              ))}
            </ul>
            <p className="text-sm text-stone-500 leading-relaxed mb-8">{T.proCost}</p>
            <a href={`/pro-program?lang=${L}`} onClick={() => track("teams_pro_apply", { lang: L })}
               className="inline-block px-8 py-4 bg-green-950 text-[#f6f1e7] font-bold rounded-lg hover:bg-green-900 transition-all hover:-translate-y-0.5 text-sm tracking-wide">
              {T.proCta}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 bg-green-950 border-t border-white/[0.06]">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-amber-100/90 tracking-wide" style={{ ...serif, fontSize: "1.05rem" }}>
            Mental<span className="text-amber-400">Routine</span>
          </span>
          <p className="text-xs text-green-200/40">&copy; {new Date().getFullYear()} Mental Routine. {T.footerRights}</p>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ─────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-green-950/95 backdrop-blur-lg border-t border-white/[0.08] px-4 py-3">
        <button onClick={() => { scrollToSend(); track("teams_cta", { place: "sticky", lang: L }); }}
                className="w-full py-3.5 bg-amber-400 text-green-950 font-bold rounded-lg text-sm tracking-wide shadow-lg shadow-amber-500/30">
          {T.stickyCta}
        </button>
      </div>

    </main>
  );
}

export default function TeamsPage() {
  return (
    <LangProvider>
      <TeamsContent />
    </LangProvider>
  );
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const triggerId = `team-faq-trigger-${index}`;
  const panelId = `team-faq-panel-${index}`;
  return (
    <div className="bg-white rounded-xl border border-green-900/[0.07] shadow-sm overflow-hidden">
      <button id={triggerId} onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls={panelId}
              className="w-full flex items-center justify-between px-6 py-5 text-left">
        <span className="text-sm font-semibold text-green-950 pr-4">{question}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="#234a32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div id={panelId} role="region" aria-labelledby={triggerId} className="px-6 pb-5">
          <p className="text-sm text-stone-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
