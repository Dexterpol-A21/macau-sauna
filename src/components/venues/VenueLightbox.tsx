"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryItem {
  src: string;
  title: string;
  description: string;
}

interface Props {
  items: GalleryItem[];
  open: boolean;
  initialIndex: number;
  onClose: () => void;
}

export default function VenueLightbox({ items, open, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex, open]);

  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose, goNext, goPrev]);

  const item = items[index];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center">
            {/* Card wrapper */}
            <motion.div
              key={index}
              className="w-full max-w-5xl rounded-2xl overflow-hidden border border-white/[0.08]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ background: "#111" }}
            >
              {/* Image area with arrows */}
              <div className="relative w-full bg-black">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full max-h-[62vh] object-contain"
                />

                {items.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); goPrev(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white hover:scale-105"
                      aria-label="Previous"
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); goNext(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white hover:scale-105"
                      aria-label="Next"
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Info area */}
              <div className="px-6 py-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-base font-bold mb-1"
                      style={{ color: "#FFF8F0", fontFamily: "'Noto Sans TC', system-ui, sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#807860", fontFamily: "'Noto Sans TC', system-ui, sans-serif" }}
                    >
                      {item.description}
                    </p>
                  </div>
                  {items.length > 1 && (
                    <span
                      className="text-xs font-medium flex-shrink-0 pt-0.5"
                      style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Noto Sans TC', system-ui, sans-serif" }}
                    >
                      {index + 1} / {items.length}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
