"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type Scorecard = {
  href: string;
  cover: string;
  award: string;
  rank: number;
  name: string;
  zhName: string;
  district: string;
  rating: number;
  verdict: string;
  facts: { label: string; value: string }[];
};

const CARDS: Scorecard[] = [
  {
    href: "/venues/empire-sauna",
    cover: "/images/home/covers/empire-sauna.jpg",
    award: "Best of the Month",
    rank: 1,
    name: "Empire Sauna",
    zhName: "巨亨桑拿",
    district: "Peninsula",
    rating: 5,
    verdict:
      "The HK$80M new build that resets the bar for Macau saunas — and one of only two with no service charge.",
    facts: [
      { label: "Typical price", value: "2,488 – 7,388" },
      { label: "Hours", value: "24 hours" },
      { label: "Service charge", value: "None" },
    ],
  },
  {
    href: "/venues/manhao-spa",
    cover: "/images/home/covers/manhao-spa.jpg",
    award: "Best new opening",
    rank: 2,
    name: "Manhao Spa",
    zhName: "曼濠水療",
    district: "Taipa",
    rating: 5,
    verdict:
      "Taipa's May-2026 debut — the most theatrical interior in Macau, built inside the Grandview Hotel.",
    facts: [
      { label: "Typical price", value: "2,488 – 6,088" },
      { label: "Hours", value: "Daily 2 PM – 6 AM" },
      { label: "Service charge", value: "5% + 5%" },
    ],
  },
  {
    href: "/venues/number-nine-spa",
    cover: "/images/home/covers/number-nine-sauna.jpg",
    award: "Best stage show",
    rank: 3,
    name: "Number Nine Spa",
    zhName: "玖號水療",
    district: "Peninsula",
    rating: 5,
    verdict:
      "April 2026 opening in the Royal Dragon Hotel with the best stage production in the city.",
    facts: [
      { label: "Typical price", value: "2,299 – 6,999" },
      { label: "Hours", value: "24 hours" },
      { label: "Service charge", value: "10%" },
    ],
  },
];

const STAMP = "Reviewed · Jul 2026";
const ROTATE_MS = 4500;

export default function BestOfMonth() {
  const [card, setCard] = useState(0);
  const reduceMotion = useReducedMotion();
  const monthLabel = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setCard((i) => (i + 1) % CARDS.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      id="best-of-month"
      data-testid="best-of-month"
      className="relative -mt-px scroll-mt-6 bg-[#0A0A0A] px-4 pb-14 pt-2 sm:pb-20 sm:pt-4"
      aria-labelledby="bom-title"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-14">
        <div className="fade-up text-center lg:text-left">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_12px_rgba(255,45,85,0.65)]"
              aria-hidden="true"
            />
            Best Sauna of the Month
            <span className="text-[var(--color-primary)]/55">·</span>
            <span>{monthLabel}</span>
          </p>

          <h2
            id="bom-title"
            className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Empire Sauna leads this month&apos;s shortlist
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/60 sm:text-base lg:mx-0">
            Our editors&apos; pick before you browse all twelve partner venues — suites, stage, and
            value, ranked with the same scorecard.
          </p>
          <a
            href="/ranking"
            className="mt-6 inline-flex text-sm font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-light)]"
          >
            See the full ranking →
          </a>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[min(100%,400px)] origin-center sm:max-w-[440px] lg:mx-0 lg:justify-self-end"
          data-testid="bom-scorecard"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, rotate: reduceMotion ? 0 : 2.5 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="grid">
            {CARDS.map((c, i) => {
              const isActive = i === card;
              return (
                <motion.a
                  key={c.href}
                  href={c.href}
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={!isActive}
                  className="block overflow-hidden rounded-[16px] border border-[var(--color-primary)]/35 bg-[var(--color-surface)] shadow-[0_24px_50px_-18px_rgba(255,45,85,0.28)] transition-[border-color,box-shadow] hover:border-[var(--color-primary)]/70 hover:shadow-[0_30px_60px_-16px_rgba(255,45,85,0.45)] sm:rounded-[20px]"
                  style={{
                    gridArea: "1 / 1",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? "visible" : "hidden",
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeInOut" }}
                >
                  <div className="relative aspect-[16/9]">
                    <img
                      src={c.cover}
                      alt={`${c.name} (${c.zhName}) — Macau premium sauna`}
                      width={800}
                      height={450}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-2 top-2 max-w-[70%] truncate rounded-full border border-[var(--color-primary)]/60 bg-[#0a0a0a]/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--color-primary)] sm:left-3 sm:top-3 sm:max-w-none sm:px-3 sm:text-[11px] sm:tracking-[0.14em]">
                      {c.award}
                    </span>
                    <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-black text-black shadow-[0_0_16px_rgba(255,45,85,0.55)] sm:right-3 sm:top-3 sm:h-[34px] sm:w-[34px]">
                      #{c.rank}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-2 right-2 rounded-md border-2 border-[var(--color-primary)]/50 bg-black/40 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-white/90 backdrop-blur-[2px] sm:bottom-3 sm:right-3 sm:rounded-lg sm:px-2 sm:py-1 sm:text-[11px] sm:tracking-[0.18em]"
                      style={{ transform: "rotate(-9deg)" }}
                    >
                      {STAMP}
                    </span>
                  </div>

                  <div className="relative px-4 pb-4 pt-3.5 sm:px-6 sm:pb-6 sm:pt-5">
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
                      <b className="text-[17px] font-black text-[var(--color-text)] sm:text-[21px]">
                        {c.name}
                      </b>
                      <small className="text-[11px] text-[var(--color-text-muted)] sm:text-[13px]">
                        {c.zhName} · {c.district}
                      </small>
                    </div>

                    <p
                      className="my-1.5 tracking-[0.2em] text-[var(--color-primary)] sm:my-2 sm:tracking-[0.25em]"
                      aria-label={`Rated ${c.rating} out of 5`}
                    >
                      {"★".repeat(c.rating)}
                    </p>

                    <p className="mb-3 border-l-[3px] border-[var(--color-primary)]/70 pl-2.5 text-[13px] leading-relaxed text-white/65 sm:mb-4 sm:pl-3 sm:text-sm">
                      “{c.verdict}”
                    </p>

                    <div className="grid grid-cols-3 gap-1.5 border-t border-dashed border-white/15 pt-2.5 text-[10px] sm:gap-2 sm:pt-3 sm:text-[11.5px]">
                      {c.facts.map((f) => (
                        <div key={f.label} className="min-w-0 overflow-hidden">
                          <span className="mb-0.5 block leading-tight text-[var(--color-text-muted)]">
                            {f.label}
                          </span>
                          <b className="block break-words hyphens-auto text-[10px] leading-snug text-[var(--color-text)] sm:text-[13px]">
                            {f.value}
                          </b>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between sm:mt-4">
                      <span className="flex gap-1.5" aria-hidden="true">
                        {CARDS.map((_, di) => (
                          <span
                            key={di}
                            className="rounded-full"
                            style={{
                              height: 7,
                              width: di === i ? 20 : 7,
                              background:
                                di === i ? "var(--color-primary)" : "rgba(255,248,240,0.18)",
                            }}
                          />
                        ))}
                      </span>
                      <span className="text-xs font-extrabold text-[var(--color-primary)] sm:text-sm">
                        View venue →
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
