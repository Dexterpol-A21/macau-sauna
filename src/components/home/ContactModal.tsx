"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const PLATFORMS = [
  {
    name: "WhatsApp",
    handle: "Message us",
    href: "https://wa.me/",
    svg: "/whatsapp.svg",
    color: "#25D366",
  },
  {
    name: "Telegram",
    handle: "@Aomensauna",
    href: "https://t.me/Aomensauna",
    svg: "/telegram.svg",
    color: "#2AABEE",
  },
  {
    name: "WeChat",
    handle: "AN99348",
    href: "weixin://",
    svg: "/wechat.svg",
    color: "#07C160",
  },
  {
    name: "LINE",
    handle: "16880348",
    href: "https://line.me/ti/p/",
    svg: "/line.svg",
    color: "#06C755",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="relative z-10 w-full max-w-md rounded-2xl border border-white/[0.06] bg-[#121212] p-6 sm:p-8 shadow-2xl mx-2"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/70"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-8 text-center">
              <span
                className="mb-2 block text-[0.625rem] font-bold uppercase tracking-[0.34em]"
                style={{ color: "#FF2D55", fontFamily: "'Noto Sans TC', system-ui, sans-serif" }}
              >
                24/7 Support
              </span>
              <h2
                className="text-2xl font-extrabold leading-[1.05] tracking-[-0.02em]"
                style={{
                  color: "#FFF8F0",
                  fontFamily: "'Noto Sans TC', system-ui, sans-serif",
                }}
              >
                Reach Out Now
              </h2>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "#B0A890", fontFamily: "'Noto Sans TC', system-ui, sans-serif" }}
              >
                Choose your preferred platform. We reply within minutes.
              </p>
            </div>

            {/* Platforms */}
            <div className="flex flex-col gap-3">
              {PLATFORMS.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 rounded-xl border border-white/[0.05] bg-[#1A1A1A] px-5 py-4 transition-all hover:border-[rgba(255,45,85,0.35)] hover:bg-[rgba(255,45,85,0.08)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                    style={{ background: `${p.color}12` }}
                  >
                    <img src={p.svg} alt={p.name} width="22" height="22" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-base font-bold leading-tight tracking-[-0.01em]"
                      style={{
                        color: "#FFF8F0",
                        fontFamily: "'Noto Sans TC', system-ui, sans-serif",
                      }}
                    >
                      {p.name}
                    </h3>
                    <span
                      className="text-[0.78rem] font-semibold tracking-[0.05em] text-[#FF2D55] transition-colors duration-300 group-hover:text-[#FF2D55]"
                      style={{
                        fontFamily: "'Noto Sans TC', system-ui, sans-serif",
                      }}
                    >
                      {p.handle}
                    </span>
                  </div>
                  <span
                    className="flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#FF2D55]"
                    style={{ color: "rgba(255,45,85,0.3)" }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:rotate-45"
                    >
                      <line x1="5" y1="19" x2="19" y2="5" />
                      <polyline points="13,5 19,5 19,11" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
