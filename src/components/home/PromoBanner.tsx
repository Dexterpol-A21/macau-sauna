"use client";

import { useEffect, useRef } from "react";

interface PromoBannerProps {
  onClaim?: () => void;
}

export default function PromoBanner({ onClaim }: PromoBannerProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const monthNodes = document.querySelectorAll("[data-promo-month]");
    if (monthNodes.length) {
      const label = new Date().toLocaleString("en-US", { month: "long" });
      monthNodes.forEach((n) => {
        n.textContent = label;
      });
    }

    const bar = barRef.current;
    if (!bar) return;
    if (getComputedStyle(bar).position !== "fixed") return;

    const fadeEnd = 80;
    const update = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const t = Math.min(1, Math.max(0, y / fadeEnd));
      bar.style.opacity = String(1 - t);
      bar.style.transform = `translateY(${-t * 110}%)`;
      bar.style.pointerEvents = t >= 1 ? "none" : "";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      id="promo-top-bar"
      className="promo-banner w-full overflow-hidden border-b-2"
      role="banner"
      aria-label="New sauna opening promotion"
    >
      <div className="promo-banner__shimmer pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex h-11 max-w-7xl items-center justify-center gap-x-1.5 overflow-hidden px-3 sm:h-12 sm:gap-x-4 sm:px-4">
        <span className="promo-banner__label truncate text-[11px] font-semibold uppercase tracking-wider sm:text-base">
          <span className="sm:hidden">New Opening</span>
          <span className="hidden sm:inline">Celebrate New Sauna Opening</span>
        </span>
        <span className="text-white/30" aria-hidden="true">
          ·
        </span>
        <span className="truncate text-[11px] font-bold text-white sm:text-base">
          <span className="promo-banner__month inline-block font-extrabold" data-promo-month>
            July
          </span>
          <span className="text-white/85"> Free add-on</span>
          <span className="hidden text-white/85 sm:inline"> service</span>
        </span>
        {onClaim ? (
          <button
            type="button"
            onClick={onClaim}
            className="promo-banner__cta ml-1 hidden shrink-0 items-center rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap transition-colors sm:ml-2 sm:inline-flex sm:px-4 sm:text-sm"
          >
            Claim Now →
          </button>
        ) : (
          <a
            href="/contact"
            className="promo-banner__cta ml-1 hidden shrink-0 items-center rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap transition-colors sm:ml-2 sm:inline-flex sm:px-4 sm:text-sm"
          >
            Claim Now →
          </a>
        )}
      </div>
    </div>
  );
}
