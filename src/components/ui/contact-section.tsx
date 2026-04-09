"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/lang-context";
import { translations, type Translation } from "@/lib/translations";

function track(event: string, props?: Record<string, string>) { window.plausible?.(event, props ? { props } : undefined); }

export function ContactSection() {
  const { lang } = useLang();
  const t: Translation["contact"] = translations[lang].contact;
  const [form, setForm] = useState({ name: "", email: "", handicap: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

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
      track("contact_submit", { lang });
    } catch {
      setError(true);
      track("contact_error", { type: "api" });
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
