"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { LangProvider, useLang } from "@/context/lang-context";
import { translations, type Translation } from "@/lib/translations";
import { methodology, REFERENCES, type MethodologyCopy } from "@/lib/methodology";

const MethodLayers = dynamic(
  () => import("@/components/ui/method-layers").then((m) => ({ default: m.MethodLayers })),
  { ssr: false }
);
const QuestionFormatDemo = dynamic(
  () => import("@/components/ui/question-format-demo").then((m) => ({ default: m.QuestionFormatDemo })),
  { ssr: false }
);

declare global { interface Window { plausible?: (event: string, options?: { props?: Record<string, string> }) => void } }
function track(event: string, props?: Record<string, string>) { window.plausible?.(event, props ? { props } : undefined); }

/* ── Small building blocks ─────────────────────────────────────────────────── */

// scroll-mt clears the fixed navbar when jumping to a chapter anchor
function ChapterHeading({ label, title, id }: { label: string; title: string; id: string }) {
  return (
    <div className="mb-10 scroll-mt-32" id={id}>
      <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-3">{label}</p>
      <h2 className="text-3xl lg:text-4xl font-semibold text-green-950 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
        {title}
      </h2>
      <div className="w-12 h-0.5 bg-amber-500 mt-5" />
    </div>
  );
}

function QA({ q, a }: { q: string; a: ReadonlyArray<string> }) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-green-950 mb-3 leading-snug" style={{ fontFamily: "var(--font-cormorant), serif" }}>
        {q}
      </h3>
      {a.map((p, i) => (
        <p key={i} className="text-[15px] text-stone-600 leading-[1.75] mb-3 last:mb-0">{p}</p>
      ))}
    </div>
  );
}

/** One research tradition behind a domain or factor. */
function ResearchCard({
  item, golfLabel,
}: {
  item: MethodologyCopy["c4"]["domains"][number];
  golfLabel: string;
}) {
  return (
    <div className="rounded-xl border border-green-900/[0.07] bg-white p-5 shadow-sm h-full flex flex-col">
      <div className="flex items-baseline gap-2 mb-1.5">
        <h4 className="text-lg font-semibold text-green-950 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
          {item.name}
        </h4>
        {/* A dot, not a banner — which traditions are golf-specific is worth
            marking, but it shouldn't outshout the domain name itself. */}
        {item.golf && (
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" title={golfLabel} aria-label={golfLabel} role="img" />
        )}
      </div>
      <p className="text-[11px] font-semibold tracking-wide uppercase text-amber-700/80 mb-3">{item.tradition}</p>
      <p className="text-sm text-stone-600 leading-relaxed mb-4">{item.body}</p>
      {/* mt-auto pins citations to the bottom so cards in a row line up */}
      <p className="text-[11px] text-stone-400 leading-relaxed border-t border-green-900/[0.06] pt-3 mt-auto">{item.cite}</p>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */

function MethodologyContent() {
  const { lang } = useLang();
  const T: Translation = translations[lang];
  const M: MethodologyCopy = methodology[lang];
  const [active, setActive] = useState<string>(M.chapters[0].id);
  const [showRefs, setShowRefs] = useState(false);

  // Scroll-spy for the sticky table of contents. -45%/-45% keeps exactly one
  // chapter active: a heading counts as current once it reaches mid-viewport.
  useEffect(() => {
    const ids = M.chapters.map((c) => c.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [M.chapters]);

  return (
    <main className="bg-[#faf8f3] text-[#1a1c18]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-green-950 focus:rounded-lg focus:text-sm focus:font-bold">
        {T.nav.skipToContent}
      </a>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 bg-[#162b1e] overflow-hidden" id="main">
        {/* Ambient glow, same treatment as the other dark sections */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-green-700/10 blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.span
            className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-400 border border-amber-400/30 px-4 py-1.5 rounded-full mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            {M.badge}
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[#f6f1e7] mb-6"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            {M.h1a}<br /><span className="italic text-amber-300">{M.h1b}</span>
          </motion.h1>
          <motion.p
            className="text-lg text-green-200/75 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          >
            {M.intro}
          </motion.p>
        </div>
      </section>

      {/* ── SUMMARY (the short document) ─────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#f6f1e7]">
        <div className="container mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-8">{M.summaryLabel}</p>

          <dl className="divide-y divide-green-900/[0.08] border-y border-green-900/[0.08]">
            {M.summary.map((row, i) => (
              <motion.div
                key={i}
                className="grid sm:grid-cols-[13rem_1fr] gap-2 sm:gap-8 py-5"
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <dt className="text-sm font-semibold text-green-950">{row.k}</dt>
                <dd className="text-[15px] text-stone-600 leading-[1.75]">{row.v}</dd>
              </motion.div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={`#${M.chapters[0].id}`}
              onClick={() => track("methodology_read_full")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-950 px-6 py-3.5 text-sm font-bold text-amber-100 shadow-lg shadow-green-900/15 hover:bg-green-900 transition-colors shrink-0"
            >
              {M.summaryCta}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M8 2v12M3 9l5 5 5-5" />
              </svg>
            </a>
            <p className="text-xs text-stone-500 leading-relaxed">{M.summaryCtaNote}</p>
          </div>
        </div>
      </section>

      {/* ── LONGREAD ─────────────────────────────────────────────────────── */}
      <div className="px-6 py-20 bg-[#faf8f3]">
        <div className="container mx-auto max-w-5xl lg:grid lg:grid-cols-[13rem_1fr] lg:gap-14">

          {/* Mobile contents — the sticky rail is desktop-only, but a document
              this long still needs a way to jump between chapters on a phone. */}
          <details className="lg:hidden mb-12 rounded-xl border border-green-900/[0.07] bg-white overflow-hidden group">
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
              <span className="text-[10px] font-bold tracking-widest uppercase text-green-900/45">{M.tocLabel}</span>
              <span className="text-amber-700 text-lg leading-none group-open:rotate-45 transition-transform">+</span>
            </summary>
            <ol className="px-5 pb-4 pt-1 border-t border-green-900/[0.06] space-y-1">
              {M.chapters.map((c, i) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} className="flex items-baseline gap-2.5 py-2 text-sm text-stone-600">
                    <span className="text-[10px] tabular-nums text-amber-600/70">{String(i + 1).padStart(2, "0")}</span>
                    <span className="leading-snug">{c.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </details>


          {/* Sticky table of contents — desktop only */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28" aria-label={M.tocLabel}>
              <p className="text-[10px] font-bold tracking-widest uppercase text-green-900/35 mb-4">{M.tocLabel}</p>
              <ol className="space-y-1">
                {M.chapters.map((c, i) => {
                  const isActive = active === c.id;
                  return (
                    <li key={c.id}>
                      <a
                        href={`#${c.id}`}
                        className={`group flex items-baseline gap-2.5 py-1.5 text-sm transition-colors duration-200 ${
                          isActive ? "text-green-950 font-semibold" : "text-stone-500 hover:text-green-950"
                        }`}
                        aria-current={isActive ? "true" : undefined}
                      >
                        <span className={`text-[10px] tabular-nums transition-colors ${isActive ? "text-amber-600" : "text-stone-300 group-hover:text-amber-600/60"}`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-snug">{c.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          <article className="max-w-2xl">

            {/* ── Chapter 1 ── */}
            <section className="mb-24">
              <ChapterHeading id={M.chapters[0].id} label={M.c1.label} title={M.c1.title} />
              {M.c1.blocks.map((b, i) => <QA key={i} q={b.q} a={b.a} />)}
            </section>

            {/* ── Chapter 2 ── */}
            <section className="mb-24">
              <ChapterHeading id={M.chapters[1].id} label={M.c2.label} title={M.c2.title} />

              <h3 className="text-xl font-semibold text-green-950 mb-3 leading-snug" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                {M.c2.domainsQ}
              </h3>
              <p className="text-[15px] text-stone-600 leading-[1.75] mb-8">{M.c2.domainsIntro}</p>

              {/* The three phases — a real sequence, so it reads left to right */}
              <div className="space-y-3 mb-12">
                {M.c2.phases.map((phase, i) => (
                  <motion.div
                    key={phase.name}
                    className="rounded-xl border border-green-900/[0.07] bg-white p-4 shadow-sm"
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                  >
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-sm font-semibold text-green-950">{phase.name}</span>
                      <span className="text-xs text-stone-400">{phase.note}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {phase.domains.map((d) => (
                        <span key={d} className="text-xs font-medium text-green-900 bg-green-50 border border-green-900/[0.08] rounded-lg px-2.5 py-1">
                          {d}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-green-950 mb-3 leading-snug" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                {M.c2.factorsQ}
              </h3>
              {M.c2.factorsA.map((p, i) => (
                <p key={i} className="text-[15px] text-stone-600 leading-[1.75] mb-3">{p}</p>
              ))}

              <div className="my-8 rounded-2xl bg-[#162b1e] p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {M.c2.factors.map((f) => (
                    <div key={f} className="rounded-lg border border-amber-400/20 bg-white/[0.04] px-3 py-3 text-center">
                      <span className="text-xs font-medium text-amber-100/90 leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-green-200/50 leading-relaxed text-center">{M.c2.factorsCaption}</p>
              </div>

              <h3 className="text-xl font-semibold text-green-950 mb-3 mt-12 leading-snug" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                {M.c2.layersQ}
              </h3>
              {M.c2.layersA.map((p, i) => (
                <p key={i} className="text-[15px] text-stone-600 leading-[1.75] mb-3">{p}</p>
              ))}

              {/* ── Signature element: the two-level diagram ── */}
              <div className="my-12 rounded-2xl border border-green-900/[0.07] bg-white p-6 sm:p-8 shadow-lg shadow-green-900/5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-amber-700 mb-2">{M.c2.diagramLabel}</p>
                <h4 className="text-2xl font-semibold text-green-950 mb-4 leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  {M.c2.diagramTitle}
                </h4>
                <p className="text-[15px] text-stone-600 leading-[1.75] mb-8">{M.c2.diagramIntro}</p>

                <MethodLayers
                  topLabel={M.c2.diagramTopLabel}
                  topCaption={M.c2.diagramTopCaption}
                  topNodes={M.c2.diagramTopNodes}
                  bottomLabel={M.c2.diagramBottomLabel}
                  bottomCaption={M.c2.diagramBottomCaption}
                  bottomNodes={M.c2.diagramBottomNodes}
                  ariaLabel={M.c2.diagramAria}
                />

                <p className="mt-8 pt-6 border-t border-green-900/[0.06] text-[15px] text-stone-600 leading-[1.75]">
                  {M.c2.diagramOutro}
                </p>
              </div>

              <h3 className="text-xl font-semibold text-green-950 mb-3 mt-12 leading-snug" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                {M.c2.axesQ}
              </h3>
              <p className="text-[15px] text-stone-600 leading-[1.75] mb-6">{M.c2.axesIntro}</p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {M.c2.axes.map((axis, i) => (
                  <div key={i} className="rounded-xl border border-green-900/[0.07] bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-green-950 mb-2">{axis.name}</p>
                    <p className="text-sm text-stone-600 leading-relaxed">{axis.body}</p>
                  </div>
                ))}
              </div>
              <p className="text-[15px] text-stone-600 leading-[1.75]">{M.c2.axesOutro}</p>
            </section>

            {/* ── Chapter 3 ── */}
            <section className="mb-24">
              <ChapterHeading id={M.chapters[2].id} label={M.c3.label} title={M.c3.title} />

              <h3 className="text-xl font-semibold text-green-950 mb-3 leading-snug" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                {M.c3.q1}
              </h3>
              {M.c3.a1.map((p, i) => (
                <p key={i} className="text-[15px] text-stone-600 leading-[1.75] mb-3">{p}</p>
              ))}

              {/* ── Interactive: feel the constraint instead of reading about it ── */}
              <div className="my-10">
                <p className="text-[10px] font-bold tracking-widest uppercase text-amber-700 mb-2">{M.c3.demoLabel}</p>
                <p className="text-sm text-stone-500 leading-relaxed mb-5">{M.c3.demoIntro}</p>
                <QuestionFormatDemo
                  question={M.c3.demoQuestion}
                  items={M.c3.demoItems}
                  normativeTag={M.c3.demoNormativeTag}
                  normativeHint={M.c3.demoNormativeHint}
                  ipsativeTag={M.c3.demoIpsativeTag}
                  ipsativeHint={M.c3.demoIpsativeHint}
                  budgetLabel={M.c3.demoBudgetLabel}
                  normativeVerdict={M.c3.demoNormativeVerdict}
                  ipsativeVerdict={M.c3.demoIpsativeVerdict}
                  resetLabel={M.c3.demoResetLabel}
                />
              </div>

              {M.c3.a1b.map((p, i) => (
                <p key={i} className="text-[15px] text-stone-600 leading-[1.75] mb-3">{p}</p>
              ))}

              <h3 className="text-xl font-semibold text-green-950 mb-3 mt-12 leading-snug" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                {M.c3.q2}
              </h3>
              {M.c3.a2.map((p, i) => (
                <p key={i} className="text-[15px] text-stone-600 leading-[1.75] mb-3">{p}</p>
              ))}

              {/* The honest caveat gets its own frame rather than being buried */}
              <div className="mt-8 rounded-xl border-l-2 border-amber-500 bg-[#f6f1e7] p-5">
                <p className="text-[15px] text-stone-700 leading-[1.75]">{M.c3.validationNote}</p>
              </div>
            </section>

            {/* ── Chapter 4 ── */}
            <section className="mb-24">
              <ChapterHeading id={M.chapters[3].id} label={M.c4.label} title={M.c4.title} />
              {M.c4.intro.map((p, i) => (
                <p key={i} className="text-[15px] text-stone-600 leading-[1.75] mb-3">{p}</p>
              ))}

              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-5 mt-10">
                <h3 className="text-xl font-semibold text-green-950 leading-snug" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  {M.c4.domainsTitle}
                </h3>
                <span className="flex items-center gap-2 text-[11px] text-stone-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  {M.c4.golfSpecific}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 items-stretch">
                {M.c4.domains.map((d, i) => (
                  <motion.div
                    key={d.name}
                    className="h-full"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
                  >
                    <ResearchCard item={d} golfLabel={M.c4.golfSpecific} />
                  </motion.div>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-green-950 mb-5 mt-12 leading-snug" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                {M.c4.factorsTitle}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 items-stretch">
                {M.c4.factorItems.map((f, i) => (
                  <motion.div
                    key={f.name}
                    className="h-full"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
                  >
                    <ResearchCard item={f} golfLabel={M.c4.golfSpecific} />
                  </motion.div>
                ))}
              </div>

              <p className="text-[15px] text-stone-600 leading-[1.75] mt-8">{M.c4.outro}</p>

              {/* References — collapsed by default; 21 citations would drown the page */}
              <div className="mt-10 rounded-xl border border-green-900/[0.07] bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => { setShowRefs((s) => !s); if (!showRefs) track("methodology_refs_open"); }}
                  aria-expanded={showRefs}
                  aria-controls="methodology-references"
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-green-50/50 transition-colors"
                >
                  <span className="text-sm font-semibold text-green-950">
                    {showRefs ? M.c4.refsToggleClose : M.c4.refsToggle}
                  </span>
                  <span className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-stone-400">{M.c4.refsCount}</span>
                    <span className={`text-amber-700 text-lg leading-none transition-transform duration-200 ${showRefs ? "rotate-45" : ""}`}>+</span>
                  </span>
                </button>

                {showRefs && (
                  <div id="methodology-references" className="px-5 pb-5 pt-1 border-t border-green-900/[0.06]">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-green-900/35 my-4">{M.c4.refsTitle}</p>
                    <ol className="space-y-3">
                      {REFERENCES.map((r, i) => (
                        <li key={i} className="text-xs text-stone-500 leading-relaxed">
                          <span className="text-stone-700">{r.authors}</span> ({r.year}).{" "}
                          {r.title} <em className="text-stone-400">{r.source}</em>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </section>

            {/* ── Chapter 5 ── */}
            <section className="mb-8">
              <ChapterHeading id={M.chapters[4].id} label={M.c5.label} title={M.c5.title} />

              {M.c5.blocks.slice(0, 2).map((b, i) => <QA key={i} q={b.q} a={b.a} />)}

              {/* Score bands — a scale, so it reads as one */}
              <div className="my-8">
                <p className="text-[10px] font-bold tracking-widest uppercase text-amber-700 mb-4">{M.c5.bandsLabel}</p>
                <div className="rounded-xl border border-green-900/[0.07] bg-white overflow-hidden divide-y divide-green-900/[0.06]">
                  {M.c5.bands.map((band, i) => (
                    <div key={i} className="flex items-start gap-4 p-4">
                      <span
                        className="shrink-0 w-1 self-stretch rounded-full"
                        style={{ background: ["#234a32", "#c4a043", "#a8a29e"][i] }}
                      />
                      <span className="text-xs font-semibold text-stone-500 tabular-nums w-20 shrink-0 pt-0.5">{band.range}</span>
                      <span>
                        <span className="block text-sm font-semibold text-green-950">{band.name}</span>
                        <span className="block text-sm text-stone-600 leading-relaxed mt-0.5">{band.body}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {M.c5.blocks.slice(2).map((b, i) => <QA key={i} q={b.q} a={b.a} />)}
            </section>
          </article>
        </div>
      </div>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-green-950">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4">{M.cta.label}</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#f6f1e7] leading-tight mb-5" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            {M.cta.h2a}<br /><span className="italic text-amber-300">{M.cta.h2b}</span>
          </h2>
          <p className="text-green-200/60 leading-relaxed mb-9 max-w-lg mx-auto">{M.cta.body}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/quickscan"
              onClick={() => track("quiz_click", { source: "methodology" })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-7 py-3.5 text-sm font-bold text-green-950 shadow-lg shadow-amber-500/25 hover:bg-amber-300 hover:-translate-y-0.5 transition-all"
            >
              {M.cta.primary}
            </a>
            <a
              href="/assessment"
              onClick={() => track("cta_click", { source: "methodology" })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-7 py-3.5 text-sm font-semibold text-green-100 hover:bg-white/5 hover:border-white/25 transition-all"
            >
              {M.cta.secondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function MethodologyPage() {
  return (
    <LangProvider>
      <MethodologyContent />
    </LangProvider>
  );
}
