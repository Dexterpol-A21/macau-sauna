"use client";

import { useEffect, useRef, useState } from "react";
import ContactModal from "@/components/home/ContactModal";

export default function PromoTopBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [month, setMonth] = useState("");
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    setMonth(new Date().toLocaleString("en-US", { month: "long" }));
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const fadeEnd = 80;

    const update = () => {
      const y = window.scrollY || 0;
      const t = Math.min(1, Math.max(0, y / fadeEnd));
      bar.style.opacity = String(1 - t);
      bar.style.transform = `translateY(${-t * 110}%)`;
      bar.style.pointerEvents = t > 0.95 ? "none" : "";
    };

    update();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        ref={barRef}
        id="promo-top-bar"
        className="fixed left-0 right-0 z-40 w-full overflow-hidden border-b-2 top-[4rem] sm:top-[5rem]"
        style={{
          borderColor: "rgba(212,175,55,0.65)",
          background: "linear-gradient(90deg, #1a1505 0%, #3d2e0a 35%, #5c4510 50%, #3d2e0a 65%, #1a1505 100%)",
          boxShadow: "0 0 24px rgba(212,175,55,0.45)",
          animation: "promo-gold-glow 2.5s ease-in-out infinite",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, transparent 0%, transparent 40%, rgba(232,212,139,0.45) 50%, transparent 60%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "promo-gold-shimmer 3.5s linear infinite",
          }}
        />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-4 py-2.5 sm:gap-x-4 sm:py-3">
          <span
            className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-wider sm:text-base"
            style={{ color: "#E8D48B" }}
          >
            <span className="sm:hidden">New Sauna Opening</span>
            <span className="hidden sm:inline">Celebrate New Sauna Opening</span>
          </span>
          <span className="hidden text-white/30 sm:inline" aria-hidden="true">
            ·
          </span>
          <span className="whitespace-nowrap text-[13px] font-bold text-white sm:text-base">
            <span
              className="inline-block font-extrabold"
              style={{
                color: "#F5E6A0",
                textShadow: "0 0 12px rgba(212,175,55,0.8)",
                animation: "promo-gold-pulse 1.8s ease-in-out infinite",
              }}
            >
              {month || "\u00A0"}
            </span>
            <span className="text-white/85"> Free service add-on</span>
          </span>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="ml-1 hidden items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold text-black transition-colors sm:ml-2 sm:inline-flex sm:px-4 sm:text-sm"
            style={{
              background: "#D4AF37",
              boxShadow: "0 0 16px rgba(212,175,55,0.55)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#E8D48B";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#D4AF37";
            }}
          >
            Claim Now →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes promo-gold-glow {
          0%, 100% { box-shadow: 0 0 12px rgba(212,175,55,0.35); }
          50% { box-shadow: 0 0 28px rgba(212,175,55,0.7); }
        }
        @keyframes promo-gold-shimmer {
          0% { background-position: -150% 0; }
          100% { background-position: 250% 0; }
        }
        @keyframes promo-gold-pulse {
          0%, 100% { text-shadow: 0 0 8px rgba(212,175,55,0.55); transform: scale(1); }
          50% { text-shadow: 0 0 20px rgba(245,230,160,0.95); transform: scale(1.05); }
        }
      `}</style>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
