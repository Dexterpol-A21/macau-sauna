"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const VIP_EXTRAS = [
  {
    emoji: "🧘‍♀️",
    name: "Back Rubbing",
    note: "Body-glide rub down the back, neck and shoulders.",
    value: "298 MOP",
  },
  {
    emoji: "🦵",
    name: "Relaxable Thigh Massage",
    note: "Deep work on quads & hamstrings — perfect after the sauna.",
    value: "288 MOP",
  },
  {
    emoji: "💆",
    name: "Head Massage",
    note: "Scalp kneading that clears mental fog and headaches.",
    value: "230 MOP",
  },
  {
    emoji: "🦶",
    name: "Reflexology",
    note: "Pressure-point work that revives tired feet.",
    value: "230 MOP",
  },
  {
    emoji: "🤚",
    name: "Manicure",
    note: "Trim, shape, cuticle care, polish.",
    value: "220 MOP",
  },
  {
    emoji: "🧴",
    name: "Pedicure",
    note: "Foot soak, nail and cuticle care, light foot rub.",
    value: "220 MOP",
  },
  {
    emoji: "🤲",
    name: "Hand Massage",
    note: "Releases wrist and forearm tension.",
    value: "200 MOP",
  },
  {
    emoji: "👂",
    name: "Ear Cleaning",
    note: "Traditional ear-cleaning ritual. Surprisingly relaxing.",
    value: "200 MOP",
  },
];

declare global {
  interface Window {
    __vipDrawerWantsOpen?: boolean;
  }
}

export default function VipExtrasDrawer() {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const openDrawer = () => setOpen(true);

    if (window.__vipDrawerWantsOpen) {
      window.__vipDrawerWantsOpen = false;
      setOpen(true);
    }

    window.addEventListener("open-vip-extras", openDrawer);
    return () => window.removeEventListener("open-vip-extras", openDrawer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const closed = isDesktop ? { x: "100%", y: 0 } : { x: 0, y: "100%" };
  const shown = { x: 0, y: 0 };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]" data-testid="vip-extras-drawer">
          <motion.button
            type="button"
            aria-label="Close VIP Extras"
            className="absolute inset-0 bg-black/70"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vip-extras-drawer-title"
            className="absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-[#0f0f0f] shadow-[0_-20px_60px_rgba(0,0,0,0.55)] sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[min(100%,440px)] sm:rounded-none sm:rounded-l-2xl sm:border-l sm:border-t-0 sm:shadow-[-20px_0_60px_rgba(0,0,0,0.45)]"
            initial={reduceMotion ? false : closed}
            animate={shown}
            exit={reduceMotion ? undefined : closed}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <h2 id="vip-extras-drawer-title" className="text-lg font-bold text-white sm:text-xl">
                  Your <span className="text-[var(--color-primary)]">VIP Extras</span>
                </h2>
                <p className="mt-1 text-sm text-white/55">
                  Pick 1 — we let the venue know you&apos;re coming.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/25 hover:text-white"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-2 sm:px-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
                    <th scope="col" className="px-3 py-3 text-left font-normal sm:px-4">
                      Service Item
                    </th>
                    <th scope="col" className="whitespace-nowrap px-2 py-3 text-right font-normal">
                      Value
                    </th>
                    <th scope="col" className="whitespace-nowrap px-3 py-3 text-right font-normal text-[var(--color-primary)] sm:px-4">
                      Our VIP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {VIP_EXTRAS.map((row) => (
                    <tr key={row.name} className="border-b border-white/5">
                      <td className="px-3 py-3.5 align-top sm:px-4 sm:py-4">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 shrink-0 select-none text-2xl leading-none" aria-hidden="true">
                            {row.emoji}
                          </span>
                          <div className="min-w-0">
                            <div className="font-semibold text-white">{row.name}</div>
                            <div className="mt-0.5 text-xs leading-relaxed text-white/55">{row.note}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-2 py-3.5 text-right align-top text-white/45 line-through sm:py-4">
                        {row.value}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-right align-top font-semibold text-[var(--color-primary)] sm:px-4 sm:py-4">
                        Free
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="border-t border-white/10 px-5 py-4 text-center text-xs leading-relaxed text-white/45 sm:px-6">
              Simply pick what you want on arrival — we already told the venue you&apos;re coming.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
