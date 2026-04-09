"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Array<{ text: string; image: string; name: string; role: string; quote?: string }>;
  duration?: number;
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className={props.className}>
      <motion.div
        animate={reducedMotion ? {} : { translateY: "-50%" }}
        transition={reducedMotion ? {} : {
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role, quote }, i) => (
              <div
                className="p-8 rounded-2xl border border-green-900/20 shadow-lg shadow-green-900/10 max-w-xs w-full bg-white"
                key={i}
              >
                {quote && (
                  <p className="text-sm font-semibold text-green-900 leading-snug mb-3">
                    "{quote}"
                  </p>
                )}
                <div className="text-sm text-stone-500 leading-relaxed italic">"{text}"</div>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="font-semibold text-sm text-green-900 leading-5">{name}</div>
                    <div className="leading-5 text-xs text-stone-500">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
