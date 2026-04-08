"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ChevronDown } from "lucide-react"
import { useLang, Lang } from "@/context/lang-context"
import { translations } from "@/lib/translations"

const LANG_OPTIONS: { code: Lang; name: string }[] = [
  { code: "en", name: "English"   },
  { code: "nl", name: "Nederlands"},
  { code: "de", name: "Deutsch"   },
  { code: "fr", name: "Français"  },
  { code: "es", name: "Español"   },
]

// ── Language dropdown ────────────────────────────────────────────────────────
function LangDropdown({ onSelect }: { onSelect?: () => void }) {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = LANG_OPTIONS.find(l => l.code === lang) ?? LANG_OPTIONS[0]

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [open])

  function select(code: Lang) {
    setLang(code)
    setOpen(false)
    onSelect?.()
  }

  return (
    <div ref={ref} className="relative">

      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="Select language"
        className={`group flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
          open
            ? "bg-white/10 text-amber-300"
            : "text-green-300/60 hover:text-green-200 hover:bg-white/5"
        }`}
      >
        {/* Globe icon */}
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-70">
          <circle cx="10" cy="10" r="8"/>
          <path d="M2 10h16M10 2c-2.5 3-4 5.4-4 8s1.5 5 4 8M10 2c2.5 3 4 5.4 4 8s-1.5 5-4 8"/>
        </svg>
        <span>{current.code}</span>
        <ChevronDown className={`w-3 h-3 opacity-50 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.13, ease: "easeOut" }}
            className="absolute left-0 top-full mt-2 w-40 rounded-2xl border border-white/[0.08] bg-[#0d2016]/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden z-50 py-1.5"
          >
            {LANG_OPTIONS.map(option => (
              <li key={option.code} role="option" aria-selected={lang === option.code}>
                <button
                  onClick={() => select(option.code)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-150 ${
                    lang === option.code
                      ? "text-amber-400"
                      : "text-green-100/55 hover:text-green-100 hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Code badge */}
                  <span className={`inline-flex items-center justify-center w-7 h-4 rounded text-[10px] font-bold tracking-wide shrink-0 ${
                    lang === option.code ? "bg-amber-400/20 text-amber-400" : "bg-white/[0.08] text-green-300/60"
                  }`}>
                    {option.code.toUpperCase()}
                  </span>
                  <span className="font-medium">{option.name}</span>
                  {lang === option.code && (
                    <svg viewBox="0 0 12 12" fill="none" stroke="#c4a043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 ml-auto shrink-0">
                      <polyline points="1 6 4.5 9.5 11 2.5"/>
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang } = useLang()
  const t = translations[lang].nav

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { label: t.howItWorks,   href: "#how-it-works" },
    { label: t.pricing,      href: "#pricing"       },
    { label: t.testimonials, href: "#testimonials"  },
    { label: t.faq,          href: "#faq"           },
    { label: t.contact,      href: "#contact"       },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5">
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={`flex w-full max-w-3xl items-center justify-between gap-4 rounded-2xl px-5 py-3 transition-all duration-300 ${
          scrolled
            ? "bg-green-950/96 shadow-xl shadow-black/30 backdrop-blur-lg border border-white/[0.06]"
            : "bg-green-950/75 backdrop-blur-md border border-white/[0.04]"
        }`}
      >
        {/* ── Logo (left column) ── */}
        <a href="#hero" className="flex items-center gap-2.5 shrink-0 w-[180px]">
          <img src="/logoMRpng.png" alt="MentalRoutine logo" className="w-8 h-8 shrink-0 object-contain" />
          <span className="font-semibold text-amber-100/90 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
            Mental<span className="text-amber-400">Routine</span>
          </span>
        </a>

        {/* ── Desktop nav links (center column, truly centered) ── */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
          {navLinks.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 text-xs font-medium text-green-300/60 hover:text-green-100 transition-colors duration-200 rounded-lg hover:bg-white/5 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ── Right: lang + CTA ── */}
        <div className="hidden md:flex items-center justify-end gap-2 shrink-0">
          <LangDropdown />
          <div className="w-px h-4 bg-white/10" />
          <a
            href="#early-access"
            className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-green-950 tracking-wide shadow-md shadow-amber-500/20 transition-all duration-200 hover:bg-amber-300 hover:-translate-y-px hover:shadow-lg hover:shadow-amber-500/30 whitespace-nowrap"
          >
            {translations[lang].earlyAccess.navCta}
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-green-200/70 hover:text-green-100 hover:bg-white/5 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </motion.header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-green-950 z-50 flex flex-col pt-24 px-8 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
          >
            {/* close */}
            <button
              className="absolute top-6 right-6 p-2 text-green-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>

            {/* mobile lang */}
            <div className="absolute top-5 left-6">
              <LangDropdown onSelect={() => setIsOpen(false)} />
            </div>

            <nav className="flex flex-col gap-5">
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-xl text-green-100 font-medium hover:text-amber-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#early-access"
                className="inline-flex items-center justify-center w-full rounded-xl bg-amber-400 px-5 py-3.5 text-base font-bold text-green-950 mt-4 shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition-colors"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                {translations[lang].earlyAccess.navCta}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Navbar }
