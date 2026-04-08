"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/lang-context';
import { translations, type Translation } from '@/lib/translations';

const MOBILE_INITIAL_COUNT = 4;

export function FaqsSection() {
  const { lang } = useLang();
  const t: Translation["faq"] = translations[lang].faq;
  const [openId, setOpenId] = React.useState<string>('item-0');
  const [showAll, setShowAll] = React.useState(false);

  const renderItem = (item: { title: string; content: string }, i: number) => {
    const id = `item-${i}`;
    const isOpen = openId === id;

    return (
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: i * 0.06 }}
        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
          isOpen
            ? 'border-amber-400/40 bg-green-950 shadow-xl shadow-green-950/20'
            : 'border-green-900/10 bg-white hover:border-green-900/20 hover:shadow-md hover:shadow-green-900/5'
        }`}
      >
        <button
          className="flex w-full items-start gap-5 px-6 py-5 text-left"
          id={`${id}-trigger`}
          onClick={() => setOpenId(isOpen ? '' : id)}
          aria-expanded={isOpen}
          aria-controls={`${id}-content`}
        >
          {/* Number */}
          <span
            className={`mt-0.5 shrink-0 text-sm font-bold tabular-nums transition-colors duration-300 ${
              isOpen ? 'text-amber-400/60' : 'text-green-900/20'
            }`}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>

          {/* Title */}
          <span
            className={`flex-1 text-sm font-semibold leading-snug transition-colors duration-300 ${
              isOpen ? 'text-[#f6f1e7]' : 'text-green-950'
            }`}
          >
            {item.title}
          </span>

          {/* Toggle icon */}
          <span className={`shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? 'border-amber-400/40 bg-amber-400/10 text-amber-400'
              : 'border-green-900/15 bg-green-50 text-green-600'
          }`}>
            <motion.svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="w-3 h-3"
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <line x1="6" y1="1" x2="6" y2="11" />
              <line x1="1" y1="6" x2="11" y2="6" />
            </motion.svg>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`${id}-content`}
              role="region"
              aria-labelledby={`${id}-trigger`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="pl-16 pr-14 pb-6 text-sm text-green-200/65 leading-relaxed">
                {item.content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4">

      {/* ── Header ── */}
      <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-700 mb-4">{t.label}</p>
          <h2
            className="text-4xl lg:text-5xl font-semibold text-green-950 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t.h2}
          </h2>
          <div className="w-12 h-0.5 bg-amber-500 mt-6" />
        </div>
        <p className="text-stone-500 leading-relaxed text-sm lg:pb-1">
          {t.contactText}{' '}
          <a href="#contact" className="text-green-800 font-medium hover:text-amber-700 underline underline-offset-2 transition-colors">
            {t.contactLink}
          </a>
          .
        </p>
      </div>

      {/* ── Items — desktop: all visible ── */}
      <div className="hidden sm:block space-y-3">
        {t.items.map((item, i) => renderItem(item, i))}
      </div>

      {/* ── Items — mobile: first 4 + show more ── */}
      <div className="sm:hidden space-y-3">
        {t.items.slice(0, showAll ? t.items.length : MOBILE_INITIAL_COUNT).map((item, i) => renderItem(item, i))}

        {!showAll && t.items.length > MOBILE_INITIAL_COUNT && (
          <motion.button
            onClick={() => setShowAll(true)}
            className="w-full py-3 rounded-2xl border border-green-900/10 bg-white text-sm font-semibold text-green-950 hover:border-green-900/20 hover:shadow-md transition-all flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span>+{t.items.length - MOBILE_INITIAL_COUNT} {t.showMore}</span>
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3 h-3">
              <path d="M2 4l4 4 4-4" />
            </svg>
          </motion.button>
        )}
      </div>
    </div>
  );
}
