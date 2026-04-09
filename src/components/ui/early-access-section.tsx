"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/lang-context";
import { translations, type Translation } from "@/lib/translations";

function track(event: string, props?: Record<string, string>) { window.plausible?.(event, props ? { props } : undefined); }

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
function captureUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) { const v = params.get(key); if (v) utm[key] = v; }
  if (Object.keys(utm).length > 0) sessionStorage.setItem("utm", JSON.stringify(utm));
  return Object.keys(utm).length > 0 ? utm : JSON.parse(sessionStorage.getItem("utm") || "{}");
}

export function EarlyAccessSection({ eaPriceStd, eaPriceDlx }: { eaPriceStd: number; eaPriceDlx: number }) {
  const { lang } = useLang();
  const T: Translation = translations[lang];
  const t: Translation["earlyAccess"] = T.earlyAccess;
  const [form, setForm] = useState({ name: "", email: "", handicap: "", plan: "deluxe" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [spots, setSpots] = useState<{ spots: number; total: number } | null>(null);

  const [utm] = useState(() => captureUtmParams());
  const formStarted = useRef(false);
  const pageLoadTime = useRef(typeof performance !== "undefined" ? performance.timeOrigin : Date.now());

  useEffect(() => {
    fetch("/api/spots").then(r => r.json()).then(setSpots).catch(() => {});
    const onPlan = (e: Event) => { const plan = (e as CustomEvent).detail; if (plan === "standard" || plan === "deluxe") setForm(f => ({ ...f, plan })); };
    window.addEventListener("select-plan", onPlan);
    return () => window.removeEventListener("select-plan", onPlan);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang, ...(Object.keys(utm).length > 0 ? { utm } : {}) }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      const seconds = String(Math.round((Date.now() - pageLoadTime.current) / 1000));
      track("signup", { plan: form.plan, lang, seconds });
      fetch("/api/spots").then(r => r.json()).then(setSpots).catch(() => {});
    } catch {
      setError(true);
      track("signup_error", { type: "api" });
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
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#f6f1e7] leading-tight mb-6" style={{ fontFamily: "var(--font-cormorant), serif" }}>
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
                    <p className="text-2xl font-semibold text-[#f6f1e7]" style={{ fontFamily: "var(--font-cormorant), serif" }}><sup className="text-sm align-super font-normal">$</sup>{eaPriceStd}</p>
                    <p className="text-[11px] text-green-200/35 line-through">${T.pricing.plans[0].price}</p>
                  </div>
                  <div className="rounded-lg bg-amber-400/[0.06] border border-amber-400/20 p-3 text-center">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-amber-300/70 mb-1">{T.pricing.plans[1].plan}</p>
                    <p className="text-2xl font-semibold text-[#f6f1e7]" style={{ fontFamily: "var(--font-cormorant), serif" }}><sup className="text-sm align-super font-normal">$</sup>{eaPriceDlx}</p>
                    <p className="text-[11px] text-green-200/35 line-through">${T.pricing.plans[1].price}</p>
                  </div>
                </div>
                <p className="text-center text-xs text-amber-300/70">{t.extraReports}</p>
              </div>
            )}
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            {submitted ? (
              <div className="rounded-2xl p-10 bg-white/[0.06] border border-amber-400/20 text-center" role="status" aria-live="polite">
                <div className="w-14 h-14 rounded-full bg-amber-400/15 flex items-center justify-center mx-auto mb-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c4a043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><polyline points="4 12 9 17 20 6"/></svg>
                </div>
                <h3 className="text-xl font-semibold text-[#f6f1e7] mb-2" style={{ fontFamily: "var(--font-cormorant), serif" }}>{t.success.h3}</h3>
                <p className="text-sm text-green-200/60 mb-5">{t.success.p}</p>
                {t.success.timeline && (
                  <div className="space-y-2.5 text-left max-w-xs mx-auto">
                    {(t.success.timeline as ReadonlyArray<string>).map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex flex-col items-center shrink-0 mt-1">
                          <span className={`w-2 h-2 rounded-full ${i === 0 ? "bg-amber-400" : "bg-white/20"}`} />
                          {i < 3 && <span className="w-px h-4 bg-white/10 mt-0.5" />}
                        </div>
                        <p className={`text-xs leading-relaxed ${i === 0 ? "text-amber-300" : "text-green-200/50"}`}>{step}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} onFocus={() => { if (!formStarted.current) { formStarted.current = true; track("form_start", { plan: form.plan }); } }} className="rounded-2xl p-8 bg-white/[0.06] border border-white/10 space-y-5">
                {spots && spots.spots < spots.total && (
                  <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-400/[0.08] border border-amber-400/20" role="status" aria-live="polite">
                    <span className="text-xl font-bold text-amber-400" style={{ fontFamily: "var(--font-cormorant), serif" }}>{spots.spots}</span>
                    <span className="text-[11px] text-green-200/40">/ {spots.total}</span>
                    <span className="text-[11px] text-amber-300/70 ml-1">{t.spotsLeft}</span>
                  </div>
                )}
                <p className="text-center text-xs text-green-200/50 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                  {spots ? t.socialProof.replace("{count}", String(spots.total - spots.spots)) : t.socialProof.replace("{count}", "")}
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
                    <button type="button" onClick={() => { setForm(f => ({ ...f, plan: "standard" })); track("plan_select", { plan: "standard" }); }} className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all border ${form.plan === "standard" ? "bg-amber-400/15 border-amber-400/50 text-amber-300" : "bg-white/[0.04] border-white/10 text-green-200/60 hover:border-white/25"}`}>
                      {T.pricing.plans[0].plan} · <span className="text-amber-400">${eaPriceStd}</span>
                    </button>
                    <button type="button" onClick={() => { setForm(f => ({ ...f, plan: "deluxe" })); track("plan_select", { plan: "deluxe" }); }} className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all border ${form.plan === "deluxe" ? "bg-amber-400/15 border-amber-400/50 text-amber-300" : "bg-white/[0.04] border-white/10 text-green-200/60 hover:border-white/25"}`}>
                      {T.pricing.plans[1].plan} · <span className="text-amber-400">${eaPriceDlx}</span>
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={sending} className="w-full py-3.5 bg-amber-400 text-green-950 font-bold rounded-lg hover:bg-amber-300 transition-all hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed">
                  {sending ? t.fields.sending : t.fields.submit}
                </button>
                {error && <p className="text-center text-xs text-red-400" role="alert">{t.fields.error}</p>}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
