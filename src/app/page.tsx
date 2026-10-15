"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Spotlight } from "@/components/ui/spotlight";
import { FaqsSection } from "@/components/ui/faqs";
import { HeroRadar } from "@/components/ui/hero-radar";
import { LangProvider, useLang } from "@/context/lang-context";
import { translations, type Translation } from "@/lib/translations";
import { NARRATIVE_GROUPS, DEFAULT_ROUTE, pick, resolveRoute } from "@/lib/narratives";
import { quickscanUrl } from "@/lib/quickscan";

// Lazy-load below-fold interactive components
const ContactSection = dynamic(() => import("@/components/ui/contact-section").then(m => ({ default: m.ContactSection })), { ssr: false });

// ── Plausible Analytics helper ───────────────────────────────────────────────
declare global { interface Window { plausible?: (event: string, options?: { props?: Record<string, string> }) => void } }
function track(event: string, props?: Record<string, string>) { window.plausible?.(event, props ? { props } : undefined); }

// ── Funnel (okt 2026) ────────────────────────────────────────────────────────
// The homepage sells nothing: its one job is the free QuickScan. Buying happens
// after the QuickScan (result screen + nurture emails → /assessment). Messaging
// follows the Entry Narrative Framework v1.5 (src/lib/narratives.ts): recognise,
// don't diagnose; no "strokes lost by mindset" claims; factors stay under water.

/** Split a hook into its first sentence and the rest, for the two-tone hero title. */
function splitHook(text: string): [string, string] {
  const m = /^(.+?[.?!])\s+(.+)$/.exec(text);
  return m ? [m[1], m[2]] : [text, ""];
}

const goldBtn = "inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/30 text-sm tracking-wide text-center";
const serif = { fontFamily: "var(--font-cormorant), serif" };

// ── PAGE CONTENT ───────────────────────────────────────────────────────────────

function PageContent() {
  const { lang } = useLang();
  const T: Translation = translations[lang];
  const H = T.home;
  const [showStickyBar, setShowStickyBar] = useState(false);

  // ?route=P4.2 (from an ad on that route) swaps the hero hook so the visitor lands
  // on the same message; the route id travels on to the QuickScan for tracking.
  // Read after mount → the server-rendered default (P1.1) never flickers for the gros.
  const [route, setRoute] = useState<string | null>(null);
  useEffect(() => {
    const r = resolveRoute(new URLSearchParams(window.location.search).get("route"));
    if (r) { setRoute(r.route); track("hero_route", { route: r.route }); }
  }, []);
  const heroHook = pick((route && resolveRoute(route)?.hook) || resolveRoute(DEFAULT_ROUTE)!.hook, lang);
  const [heroA, heroB] = splitHook(heroHook);
  const heroHref = quickscanUrl(lang, route);

  // Section view tracking via IntersectionObserver
  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (entry.isIntersecting && id && !seen.has(id)) {
          seen.add(id);
          track("section_view", { section: id });
        }
      }
    }, { threshold: 0.3 });
    for (const id of ["recognise", "how-it-works", "team", "faq", "contact"]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollMilestones = new Set<string>();
    const onScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setShowStickyBar(scrollPct > 0.2 && scrollPct < 0.92);
      for (const milestone of ["25", "50", "75", "100"] as const) {
        if (scrollPct >= Number(milestone) / 100 && !scrollMilestones.has(milestone)) {
          scrollMilestones.add(milestone);
          track("scroll_depth", { depth: milestone });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const QuickScanButton = ({ source, className = goldBtn }: { source: string; className?: string }) => (
    <a href={heroHref} onClick={() => track("quiz_click", { source, route: route ?? DEFAULT_ROUTE })} className={className}>
      {H.hero.cta} <span aria-hidden="true">→</span>
    </a>
  );

  return (
    <main className="bg-[#faf8f3] text-[#1a1c18]">

      {/* ── SKIP TO CONTENT (accessibility) ── */}
      <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-green-950 focus:rounded-lg focus:text-sm focus:font-bold">
        {T.nav.skipToContent}
      </a>

      <Navbar />

      {/* ── HERO — one hook, one button ──────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#162b1e]" style={{ paddingTop: '5rem' }}>
        <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="#c4a043" />

        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 py-20">
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-400 border border-amber-400/30 px-4 py-1.5 rounded-full mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              {H.hero.badge}
            </motion.span>

            <motion.h1 key={heroHook} className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[#f6f1e7] mb-6" style={serif} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              {heroA}
              {heroB && <><br /><span className="italic text-amber-300">{heroB}</span></>}
            </motion.h1>

            <motion.p className="text-lg text-green-200/75 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
              {H.hero.sub}
            </motion.p>

            <motion.div className="flex flex-col items-center lg:items-start gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}>
              <QuickScanButton source="hero" />
              <p className="text-xs text-green-200/50 tracking-wide">{H.hero.meta}</p>
            </motion.div>

            <motion.div className="flex justify-center lg:justify-start mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.9 }}>
              <span className="inline-flex items-center gap-2 bg-amber-400/[0.08] border border-amber-400/25 rounded-full px-4 py-1.5 text-xs text-amber-300/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                {H.hero.trust}
              </span>
            </motion.div>
          </div>

          {/* Radar chart — example profile across the routine, rotating scores */}
          <HeroRadar steps={T.routine.steps} caption={T.hero.radarCaption} radarAriaLabel={T.hero.radarAriaLabel} />
        </div>
      </section>

      {/* ── SOUND FAMILIAR? — the 12 entry narratives ────────────────────── */}
      <section id="recognise" className="py-28 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{H.recognise.label}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={serif}>
              {H.recognise.h2a} <em>{H.recognise.h2b}</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6 mb-6" />
            <p className="text-stone-600 max-w-xl mx-auto leading-relaxed">{H.recognise.intro}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {NARRATIVE_GROUPS.map((group, gi) => (
              <motion.div key={group.id} className="bg-white rounded-2xl p-6 border border-green-900/[0.07] shadow-lg shadow-green-900/5" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: gi * 0.1 }}>
                <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-1">{pick(group.name, lang)}</p>
                <h3 className="text-xl font-semibold text-green-950 mb-5 leading-tight" style={serif}>{pick(group.tagline, lang)}</h3>
                <ul className="space-y-2">
                  {group.narratives.map(n => (
                    <li key={n.id}>
                      <a
                        href={quickscanUrl(lang, n.id)}
                        onClick={() => track("narrative_click", { route: n.id })}
                        className="group flex items-start gap-3 rounded-xl px-3 py-3 -mx-3 text-sm text-stone-700 leading-snug hover:bg-amber-50 hover:text-green-950 transition-colors"
                      >
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500/60 group-hover:bg-amber-500 shrink-0" />
                        <span className="flex-1">{pick(n.statement, lang)}</span>
                        <span aria-hidden="true" className="text-amber-600 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-stone-500">{H.recognise.footnote}</p>
        </div>
      </section>

      {/* ── THE MENTALROUTINE — three moments, kept light ────────────────── */}
      <section id="how-it-works" className="py-28 px-6 bg-[#faf8f3]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{H.phases.label}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight" style={serif}>
              {H.phases.h2a} <em>{H.phases.h2b}</em>
            </h2>
            <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6 mb-6" />
            <p className="text-stone-600 max-w-xl mx-auto leading-relaxed">{H.phases.intro}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {H.phases.items.map((item, i) => (
              <motion.div key={i} className="bg-white rounded-2xl p-8 border border-green-900/[0.07] shadow-lg shadow-green-900/5 relative overflow-hidden" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <span className="absolute bottom-2 right-4 text-8xl font-bold text-green-900/[0.04] leading-none" style={serif}>{i + 1}</span>
                <h3 className="text-2xl font-semibold text-green-950 mb-3" style={serif}>{item.label}</h3>
                <p className="text-sm text-stone-600 leading-relaxed relative z-10">{item.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="/methodology" onClick={() => track("methodology_click", { source: "phases" })} className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors">
              {H.phases.link} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── WHO'S BEHIND IT ──────────────────────────────────────────────── */}
      <section id="team" className="py-24 px-6 bg-green-950">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">{H.team.label}</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#f6f1e7] leading-tight" style={serif}>
              {H.team.h2a} <em className="text-amber-300">{H.team.h2b}</em>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {H.team.members.map(m => (
              <div key={m.name} className="flex items-center gap-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
                <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/25 flex items-center justify-center shrink-0 text-amber-300 font-semibold" style={serif}>
                  {m.name.split(" ").map(w => w[0]).filter(c => c === c.toUpperCase()).join("")}
                </div>
                <div>
                  <p className="text-[#f6f1e7] font-semibold">{m.name}</p>
                  <p className="text-xs text-green-200/55 mt-0.5 leading-relaxed">{m.role}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-green-200/70 leading-relaxed text-center max-w-2xl mx-auto">{H.team.body}</p>

          <blockquote className="mt-10 text-center">
            <p className="text-2xl text-[#f6f1e7] italic leading-relaxed" style={serif}>&ldquo;{H.team.quote}&rdquo;</p>
            <cite className="mt-3 block text-xs font-semibold tracking-widest uppercase text-amber-400/80 not-italic">{H.team.quoteAuthor}</cite>
          </blockquote>
        </div>
      </section>

      {/* ── FAQ — QuickScan questions + final CTA ───────────────────────── */}
      <section id="faq" className="py-28 px-6 bg-[#faf8f3]">
        <div className="container mx-auto">
          <FaqsSection content={H.faq} />

          <div className="mt-20 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-green-950 leading-tight mb-8" style={serif}>
              {H.final.h2a}<br /><em>{H.final.h2b}</em>
            </h2>
            <QuickScanButton source="final" />
            <p className="mt-3 text-xs text-stone-500 tracking-wide">{H.hero.meta}</p>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────────────── */}
      <ContactSection />

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#0d1f15] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-green-800/10 blur-3xl pointer-events-none" />

        <div className="relative container mx-auto max-w-5xl px-6 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

            {/* Col 1 — Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <img src="/logoMRpng.png" alt="MentalRoutine logo" className="w-14 h-14 shrink-0 object-contain" />
                <span className="text-xl font-semibold text-[#f6f1e7]" style={serif}>
                  Mental<span className="text-amber-400">Routine</span>
                </span>
              </div>
              <p className="text-sm text-green-200/45 leading-relaxed">{T.footer.tagline}</p>
            </div>

            {/* Col 2 — Navigation */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-green-400/40 mb-5">{T.footer.menuLabel}</p>
              <nav className="flex flex-col gap-3">
                {[
                  { label: T.footer.quizLink,    href: heroHref,         quiz: true  },
                  { label: T.nav.howItWorks,     href: '#how-it-works',  quiz: false },
                  { label: T.footer.methodology, href: '/methodology',   quiz: false },
                  { label: T.nav.faq,            href: '#faq',           quiz: false },
                  { label: T.nav.contact,        href: '#contact',       quiz: false },
                ].map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={link.quiz ? () => track("quiz_click", { source: "footer", route: route ?? DEFAULT_ROUTE }) : undefined}
                    className="group flex items-center gap-2 text-sm text-green-200/50 hover:text-amber-300 transition-colors duration-200"
                  >
                    <span className="w-3 h-px bg-green-200/20 group-hover:bg-amber-400/60 group-hover:w-5 transition-all duration-300" />
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Col 3 — Social + the one pro link */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-green-400/40 mb-5">{T.footer.socialLabel}</p>

              <div className="flex flex-col gap-2.5 mb-8">
                {[
                  { label: "Instagram", href: "https://instagram.com/mentalroutine",        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
                  { label: "TikTok",    href: "https://tiktok.com/@mentalroutine",           icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg> },
                  { label: "YouTube",   href: "https://youtube.com/@mentalroutine",          icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.52V8.48L15.5 12l-5.75 3.52z"/></svg> },
                  { label: "X / Twitter", href: "https://x.com/mentalroutine",               icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                  { label: "LinkedIn",  href: "https://linkedin.com/company/mentalroutine", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
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

              {/* The only link to the pro programme on the homepage */}
              <a href="/pro-program" onClick={() => track("pro_program_click", { source: "footer" })} className="inline-flex items-center gap-2 text-xs text-green-200/35 hover:text-amber-300 transition-colors">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/></svg>
                <span>{T.footer.teachingPro}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.05]">
          <div className="container mx-auto max-w-5xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-green-200/30">{T.footer.copyright}</p>
            <p className="text-xs text-green-200/25">{T.footer.methodBy}</p>
          </div>
        </div>
      </footer>

      {/* ── STICKY SCROLL CTA BAR ── */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-40 bg-green-950/95 backdrop-blur-lg border-t border-white/[0.08] shadow-xl shadow-black/30"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="container mx-auto max-w-4xl px-4 py-2.5 flex items-center justify-between gap-3">
              <p className="text-xs text-green-200/60 hidden sm:block">{H.sticky}</p>
              <QuickScanButton source="sticky" className="flex-1 sm:flex-none text-center px-5 py-2 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all text-xs tracking-wide shadow-md shadow-amber-500/20" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
