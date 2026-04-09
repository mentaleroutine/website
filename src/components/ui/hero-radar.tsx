"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

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

export function HeroRadar({ steps, caption, radarAriaLabel }: { steps: ReadonlyArray<{ label: string }>; caption?: string; radarAriaLabel?: string }) {
  const [scores, setScores] = useState(INITIAL_SCORES);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setScores(Array.from({ length: 8 }, () => Math.floor(Math.random() * 9) + 1));
    }, 3000);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <motion.div className="flex-1 hidden md:flex flex-col items-center justify-center gap-3"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
      <svg viewBox="-15 -15 330 330" width={380} height={380} role="img" aria-label={radarAriaLabel}>

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
