"use client";

import React, { useState } from "react";

type Props = {
  question: string;
  items: ReadonlyArray<string>;
  normativeTag: string;
  normativeHint: string;
  ipsativeTag: string;
  ipsativeHint: string;
  budgetLabel: string;
  normativeVerdict: string;
  ipsativeVerdict: string;
  resetLabel: string;
};

const BUDGET = 10;

/**
 * Side-by-side demo of the two question formats described in chapter 3.
 *
 * The argument in the text is that forced-choice makes flattering yourself
 * impossible. Reading that is not the same as running into it, so the ipsative
 * column enforces the real constraint: raise one statement and the others give
 * way. The normative column has no constraint at all — which is exactly the
 * weakness the chapter describes.
 */
export function QuestionFormatDemo({
  question, items,
  normativeTag, normativeHint,
  ipsativeTag, ipsativeHint,
  budgetLabel, normativeVerdict, ipsativeVerdict, resetLabel,
}: Props) {
  const n = items.length;
  const NORM_START = Array(n).fill(8);
  // Start evenly split, remainder on the first statement so it always sums to 10.
  const IPS_START = items.map((_, i) => Math.floor(BUDGET / n) + (i < BUDGET % n ? 1 : 0));

  const [norm, setNorm] = useState<number[]>(NORM_START);
  const [ips, setIps] = useState<number[]>(IPS_START);

  const ipsSpent = ips.reduce((a, b) => a + b, 0);
  const ipsLeft = BUDGET - ipsSpent;

  /**
   * Raising one statement has to come out of the others — that constraint is
   * the whole point. Take from the largest others first so the distribution
   * stays plausible instead of draining one statement to zero.
   */
  function setIpsative(index: number, next: number) {
    const clamped = Math.max(0, Math.min(BUDGET, next));
    const updated = [...ips];
    updated[index] = clamped;

    let overflow = updated.reduce((a, b) => a + b, 0) - BUDGET;
    while (overflow > 0) {
      const others = updated
        .map((v, i) => ({ v, i }))
        .filter((o) => o.i !== index && o.v > 0)
        .sort((a, b) => b.v - a.v);
      if (!others.length) break;
      updated[others[0].i] -= 1;
      overflow -= 1;
    }
    while (overflow < 0) {
      const others = updated
        .map((v, i) => ({ v, i }))
        .filter((o) => o.i !== index && o.v < BUDGET)
        .sort((a, b) => a.v - b.v);
      if (!others.length) break;
      updated[others[0].i] += 1;
      overflow += 1;
    }
    setIps(updated);
  }

  const allNormHigh = norm.every((v) => v >= 7);
  const ipsRanked = new Set(ips).size > 1;

  return (
    <div className="rounded-2xl border border-green-900/[0.07] bg-white shadow-lg shadow-green-900/5 overflow-hidden">
      <div className="px-6 pt-6 pb-5 border-b border-green-900/[0.06]">
        <p className="text-base font-medium text-green-950 leading-snug" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.2rem" }}>
          {question}
        </p>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-green-900/[0.06]">

        {/* ── Normative: no constraint, everything can be high ── */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 border border-stone-300 rounded px-2 py-0.5">
              {normativeTag}
            </span>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed mb-6">{normativeHint}</p>

          <div className="space-y-5">
            {items.map((item, i) => (
              <div key={item}>
                <div className="flex items-baseline justify-between mb-2 gap-3">
                  <label htmlFor={`norm-${i}`} className="text-sm text-stone-700">{item}</label>
                  <span className="text-sm font-semibold text-stone-500 tabular-nums shrink-0">{norm[i]}</span>
                </div>
                <input
                  id={`norm-${i}`}
                  type="range"
                  min={0}
                  max={10}
                  value={norm[i]}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setNorm((prev) => prev.map((p, pi) => (pi === i ? v : p)));
                  }}
                  className="w-full accent-stone-400 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <p className={`mt-6 text-xs leading-relaxed transition-opacity duration-300 ${allNormHigh ? "opacity-100 text-stone-500" : "opacity-0"}`} aria-live="polite">
            {normativeVerdict}
          </p>
        </div>

        {/* ── Ipsative: fixed budget, raising one lowers another ── */}
        <div className="p-6 bg-[#faf8f3]">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700 border border-amber-600/40 rounded px-2 py-0.5">
              {ipsativeTag}
            </span>
            <span className="text-[11px] text-stone-500 tabular-nums">
              {budgetLabel}: <strong className="text-green-950 font-semibold">{ipsLeft}</strong>
            </span>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed mb-6">{ipsativeHint}</p>

          <div className="space-y-5">
            {items.map((item, i) => (
              <div key={item}>
                <div className="flex items-baseline justify-between mb-2 gap-3">
                  <label htmlFor={`ips-${i}`} className="text-sm text-stone-700">{item}</label>
                  <span className="text-sm font-semibold text-amber-700 tabular-nums shrink-0">{ips[i]}</span>
                </div>
                <input
                  id={`ips-${i}`}
                  type="range"
                  min={0}
                  max={10}
                  value={ips[i]}
                  onChange={(e) => setIpsative(i, Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className={`text-xs leading-relaxed transition-opacity duration-300 ${ipsRanked ? "opacity-100 text-amber-800" : "opacity-0"}`} aria-live="polite">
              {ipsativeVerdict}
            </p>
            <button
              type="button"
              onClick={() => { setNorm(NORM_START); setIps(IPS_START); }}
              className="text-[11px] text-stone-400 hover:text-green-950 underline underline-offset-4 shrink-0 transition-colors"
            >
              {resetLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
