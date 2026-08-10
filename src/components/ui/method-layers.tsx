"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Props = {
  topLabel: string;
  topCaption: string;
  topNodes: ReadonlyArray<string>;
  bottomLabel: string;
  bottomCaption: string;
  bottomNodes: ReadonlyArray<string>;
  ariaLabel: string;
};

/**
 * The two-level diagram: what you SEE (domains) sits on top of what you TRAIN
 * (underlying skills). Drawn rather than described because the whole point of
 * chapter 2 is that these are separate layers — a paragraph makes that sound
 * like a nuance, a picture makes it structural.
 *
 * Pure SVG, no chart library. Lines fan out many-to-many on purpose: a domain
 * is a SUM of underlying skills, not a rename of one.
 */
export function MethodLayers({
  topLabel, topCaption, topNodes,
  bottomLabel, bottomCaption, bottomNodes,
  ariaLabel,
}: Props) {
  const reduced = useReducedMotion();

  // Viewbox geometry — laid out for 3 top nodes and 4 bottom nodes.
  const W = 640, H = 312;
  const topY = 74, bottomY = 226;
  const topXs = topNodes.map((_, i) => (W / (topNodes.length + 1)) * (i + 1));
  const bottomXs = bottomNodes.map((_, i) => (W / (bottomNodes.length + 1)) * (i + 1));

  // Each domain draws from several underlying skills — that overlap IS the claim.
  const links: Array<[number, number]> = [];
  topNodes.forEach((_, t) => {
    bottomNodes.forEach((__, b) => {
      // Skip roughly a third of connections so the mesh reads as "a specific
      // combination per domain" rather than "everything connects to everything".
      if ((t + b) % 3 !== 2) links.push([t, b]);
    });
  });

  const topW = 132, topH = 40, botW = 118, botH = 34;

  return (
    <figure className="my-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id="ml-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4a043" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#234a32" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        {/* Band labels — left rail, quiet */}
        <text x="8" y={topY - 30} className="fill-amber-700" style={{ fontSize: 10, letterSpacing: "0.14em", fontWeight: 600 }}>
          {topLabel.toUpperCase()}
        </text>
        <text x="8" y={bottomY + 68} className="fill-green-800/70" style={{ fontSize: 10, letterSpacing: "0.14em", fontWeight: 600 }}>
          {bottomLabel.toUpperCase()}
        </text>

        {/* Divider between the two levels — the line the reader must not cross */}
        <line x1="8" y1={(topY + topH + bottomY) / 2} x2={W - 8} y2={(topY + topH + bottomY) / 2}
              stroke="#234a32" strokeOpacity="0.12" strokeDasharray="3 5" />

        {/* Connections */}
        <g>
          {links.map(([t, b], i) => {
            const x1 = topXs[t], y1 = topY + topH;
            const x2 = bottomXs[b], y2 = bottomY;
            const mid = (y1 + y2) / 2;
            const d = `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`;
            return (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="url(#ml-line)"
                strokeWidth="1"
                initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.035, ease: "easeOut" }}
              />
            );
          })}
        </g>

        {/* Top nodes — domains */}
        {topNodes.map((n, i) => (
          <motion.g
            key={n}
            initial={reduced ? undefined : { opacity: 0, y: -8 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <rect x={topXs[i] - topW / 2} y={topY} width={topW} height={topH} rx="10"
                  fill="#162b1e" stroke="#c4a043" strokeOpacity="0.35" />
            <text x={topXs[i]} y={topY + topH / 2 + 4} textAnchor="middle"
                  fill="#f6f1e7" style={{ fontSize: 14, fontWeight: 500 }}>
              {n}
            </text>
          </motion.g>
        ))}

        {/* Bottom nodes — underlying skills */}
        {bottomNodes.map((n, i) => (
          <motion.g
            key={n}
            initial={reduced ? undefined : { opacity: 0, y: 8 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.5 + i * 0.08 }}
          >
            <rect x={bottomXs[i] - botW / 2} y={bottomY} width={botW} height={botH} rx="8"
                  fill="#ffffff" stroke="#234a32" strokeOpacity="0.18" />
            <text x={bottomXs[i]} y={bottomY + botH / 2 + 4} textAnchor="middle"
                  fill="#234a32" style={{ fontSize: 12, fontWeight: 500 }}>
              {n}
            </text>
          </motion.g>
        ))}
      </svg>

      <figcaption className="mt-5 grid sm:grid-cols-2 gap-3 text-xs leading-relaxed">
        <span className="flex items-start gap-2 text-stone-600">
          <span className="mt-1 w-2.5 h-2.5 rounded-sm bg-[#162b1e] shrink-0" />
          {topCaption}
        </span>
        <span className="flex items-start gap-2 text-stone-600">
          <span className="mt-1 w-2.5 h-2.5 rounded-sm bg-white border border-green-900/25 shrink-0" />
          {bottomCaption}
        </span>
      </figcaption>
    </figure>
  );
}
