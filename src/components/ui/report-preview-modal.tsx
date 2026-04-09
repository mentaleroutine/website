"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/lang-context";
import { translations, type Translation } from "@/lib/translations";

function track(event: string, props?: Record<string, string>) { window.plausible?.(event, props ? { props } : undefined); }

export function ReportPreviewModal({ plan, onClose }: { plan: "standard" | "deluxe" | "training"; onClose: () => void }) {
  const { lang } = useLang();
  const T: Translation = translations[lang];
  const openedAt = useRef(Date.now());
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    const seconds = String(Math.round((Date.now() - openedAt.current) / 1000));
    track("report_preview_close", { type: plan, seconds });
    onClose();
  }, [plan, onClose]);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    // Focus the close button on mount
    const closeBtn = dialogRef.current?.querySelector<HTMLElement>("[data-close]");
    closeBtn?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { handleClose(); return; }
      // Focus trap: cycle Tab within modal
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button, [href], iframe, [tabindex]:not([tabindex='-1'])");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previousFocus.current?.focus();
    };
  }, [handleClose]);

  const src = plan === "training" ? "/reports/sample-training-report.html" : plan === "deluxe" ? "/reports/sample-deluxe.html" : "/reports/sample-standard.html";
  const label = T.pricing.previewModal[plan];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <motion.div
        ref={dialogRef}
        className="relative w-full max-w-3xl h-[85vh] bg-[#faf8f3] rounded-2xl overflow-hidden shadow-2xl border border-green-900/10"
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 bg-green-950 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
              {label}
            </span>
          </div>
          <button data-close onClick={handleClose} aria-label={T.pricing.previewModal.closePreview} className="w-8 h-8 rounded-lg flex items-center justify-center text-green-200/60 hover:text-white hover:bg-white/10 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <iframe src={src} className="w-full h-[calc(85vh-48px)]" title={T.pricing.previewModal.iframeTitle} />
      </motion.div>
    </motion.div>
  );
}
