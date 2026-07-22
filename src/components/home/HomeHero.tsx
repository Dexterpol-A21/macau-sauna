"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import ContactModal from "@/components/home/ContactModal";

const SKYLINES = [
  "/images/hero/skyline-1.jpg",
  "/images/hero/skyline-2.jpg",
  "/images/hero/skyline-3.webp",
];

const VENUE_LINES = [
  "Number Nine Spa, Empire Sauna\nManhao Spa, Shang Pin Spa\nNumber One Sauna, Oceanic Royal Spa",
  "Familia Nobre, East Castle Spa\nVictoria Sauna, Majesty Spa\nM CLUB, The Excellent Sauna",
];

const STEPS = [
  {
    title: "Request Now",
    titleSm: "Request",
    desc: "We take care of everything",
    descSm: "We handle it",
    highlight: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[var(--color-primary)]" aria-hidden="true">
        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
      </svg>
    ),
  },
  {
    title: (
      <>
        <span className="text-[var(--color-primary)]">Free</span> Pickup
      </>
    ),
    titleSm: (
      <>
        <span className="text-[var(--color-primary)]">Free</span> Pickup
      </>
    ),
    desc: "Anytime, Anywhere in Macau",
    descSm: "Anytime in Macau",
    highlight: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[var(--color-primary)]" aria-hidden="true">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    title: "You Enjoy",
    titleSm: "Enjoy",
    desc: (
      <>
        <span className="font-bold text-[var(--color-primary)]">VIP Extras</span>
        <span className="text-white">, Priority Entry</span>
      </>
    ),
    descSm: (
      <span className="font-bold text-[var(--color-primary)]">VIP Extras</span>
    ),
    highlight: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[var(--color-primary)]" aria-hidden="true">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </svg>
    ),
  },
];

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
    award: "Best overall",
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

export default function HomeHero() {
  const [slide, setSlide] = useState(0);
  const [venues, setVenues] = useState(0);
  const [card, setCard] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sky = window.setInterval(() => setSlide((s) => (s + 1) % SKYLINES.length), 6000);
    const names = window.setInterval(() => setVenues((v) => (v + 1) % VENUE_LINES.length), 4000);
    return () => {
      window.clearInterval(sky);
      window.clearInterval(names);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setCard((i) => (i + 1) % CARDS.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-12 pt-[var(--chrome-pad)] sm:flex sm:min-h-[90svh] sm:items-center sm:pb-16 sm:pt-[calc(var(--chrome-top)+2.5rem)]">
        {SKYLINES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
            style={{ opacity: slide === i ? 1 : 0 }}
            aria-hidden={slide !== i}
          >
            <img
              src={src}
              alt=""
              width={1920}
              height={1080}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full scale-105 object-cover object-center animate-[hero-ken_18s_ease-in-out_infinite_alternate]"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-[#0a0a0a]" />

        {/* Reference pattern: stack on mobile, 2-col from lg */}
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <h1 className="mb-3 text-[26px] font-bold leading-tight tracking-wider text-white min-[400px]:text-[28px] sm:text-4xl md:text-5xl">
              Macau Sauna Booking — Your VIP Experience
            </h1>

            <motion.p
              className="mb-4 text-sm font-medium text-[var(--color-primary)] sm:text-lg md:text-xl"
              initial={{ opacity: 1 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 0.7, 1, 0.7, 1] }}
              transition={{ duration: 10, ease: "easeInOut" }}
            >
              Complimentary 24/7 Private Shuttle Pickup &amp; Return
            </motion.p>

            <p className="relative mb-6 grid min-h-[4.25rem] whitespace-pre-line text-[15px] leading-snug text-white/70 min-[430px]:min-h-[4.5rem] min-[430px]:text-base sm:text-lg">
              {VENUE_LINES.map((line, i) => (
                <span
                  key={i}
                  className="col-start-1 row-start-1 transition-opacity duration-700"
                  style={{ opacity: venues === i ? 1 : 0 }}
                  aria-hidden={venues !== i}
                >
                  {line}
                </span>
              ))}
            </p>

            <div
              className="mb-7 flex items-start justify-center gap-1 sm:mb-8 sm:gap-3 md:gap-4 lg:justify-start"
              data-testid="hero-icon-row"
            >
              {STEPS.map((step, i) => {
                const stepDelay = i === 0 ? 0.1 : i * 0.35 + 0.15;
                const arrowDelay = stepDelay - 0.15;
                const pulse = reduceMotion
                  ? { opacity: 1 }
                  : { opacity: [1, 0.7, 1, 0.7, 1] as number[] };

                return (
                  <div key={i} className="contents">
                    {i > 0 && (
                      <motion.span
                        data-testid="hero-arrow"
                        className="mt-1.5 text-sm font-black text-[var(--color-primary)] sm:mt-3 sm:text-xl"
                        aria-hidden="true"
                        initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: arrowDelay }}
                      >
                        →
                      </motion.span>
                    )}
                    <motion.div
                      data-testid={`hero-step-${i + 1}`}
                      className="flex min-w-0 flex-1 flex-col items-center gap-0.5 sm:flex-none sm:gap-1"
                      initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: stepDelay }}
                    >
                      <motion.div
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-primary)]/50 bg-[var(--color-primary)]/50 sm:h-11 sm:w-11 md:h-12 md:w-12"
                        initial={{ opacity: 1 }}
                        animate={pulse}
                        transition={{ duration: 10, ease: "easeInOut", delay: stepDelay + 0.5 }}
                      >
                        {step.icon}
                      </motion.div>
                      <span className="text-center text-[11px] font-semibold leading-tight text-white min-[400px]:text-sm sm:text-base md:text-lg">
                        <span className="sm:hidden">{step.titleSm}</span>
                        <span className="hidden sm:inline">{step.title}</span>
                      </span>
                      <motion.span
                        className="max-w-[6.5rem] text-center text-[10px] leading-snug min-[400px]:max-w-[7.5rem] min-[430px]:text-xs sm:max-w-none sm:text-base"
                        initial={{ opacity: 1 }}
                        animate={pulse}
                        transition={{ duration: 10, ease: "easeInOut", delay: stepDelay + 0.5 }}
                      >
                        <span className="sm:hidden">
                          {typeof step.descSm === "string" ? (
                            step.highlight ? (
                              <span className="font-bold text-[var(--color-primary)]">{step.descSm}</span>
                            ) : (
                              <span className="text-white">{step.descSm}</span>
                            )
                          ) : (
                            step.descSm
                          )}
                        </span>
                        <span className="hidden sm:inline">
                          {typeof step.desc === "string" ? (
                            step.highlight ? (
                              <span className="font-bold text-[var(--color-primary)]">{step.desc}</span>
                            ) : (
                              <span className="text-white">{step.desc}</span>
                            )
                          ) : (
                            step.desc
                          )}
                        </span>
                      </motion.span>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            <div className="mx-auto flex w-full max-w-[300px] flex-col items-center gap-3 sm:max-w-[320px] lg:mx-0 lg:items-start">
              <a
                href="#spas"
                className="hh-cta-primary relative w-full overflow-hidden rounded-full px-6 py-2.5 text-center font-semibold tracking-wider text-black transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 motion-reduce:hidden"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    animation: "hh-shimmer 3.5s linear infinite",
                  }}
                />
                <span className="relative">↓ Explore Saunas</span>
              </a>
              <div className="flex w-full gap-2.5 sm:gap-3">
                <a
                  href="/how-it-works"
                  className="flex-1 rounded-full border border-[var(--color-primary)]/50 px-2 py-2.5 text-center text-xs text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/10 sm:px-3 sm:text-sm"
                >
                  How It Works
                </a>
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="flex-1 rounded-full border border-[var(--color-primary)]/50 px-2 py-2.5 text-center text-xs text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/10 sm:px-3 sm:text-sm"
                >
                  Request Now
                </button>
              </div>
            </div>
          </div>

          {/* Scorecard — reference: max-w 440, slight tilt, centered on mobile */}
          <motion.div
            className="relative mx-auto w-full max-w-[min(100%,400px)] origin-center sm:max-w-[440px] lg:mx-0 lg:justify-self-end"
            data-testid="hero-scorecard"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, rotate: reduceMotion ? 0 : 2.5 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
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
                    animate={{ opacity: isActive ? 1 : 0 }}
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
                        <b className="text-[17px] font-black text-[var(--color-text)] sm:text-[21px]">{c.name}</b>
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
                          <div key={f.label} className="min-w-0">
                            <span className="mb-0.5 block leading-tight text-[var(--color-text-muted)]">{f.label}</span>
                            <b className="block break-words text-[11px] leading-snug text-[var(--color-text)] sm:text-[13px]">
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
                                  di === i
                                    ? "var(--color-primary)"
                                    : "rgba(255,248,240,0.18)",
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

      <style>{`
        @keyframes hh-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes hero-ken {
          from { transform: scale(1.05); }
          to { transform: scale(1.12); }
        }
        .hh-cta-primary {
          background: var(--color-primary);
          animation: hh-glow 2.5s ease-in-out infinite;
        }
        .hh-cta-primary:hover {
          filter: brightness(1.08);
        }
        @keyframes hh-glow {
          0%, 100% { box-shadow: 0 0 12px color-mix(in srgb, var(--color-primary) 35%, transparent); }
          50% { box-shadow: 0 0 28px color-mix(in srgb, var(--color-primary) 55%, transparent); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hh-cta-primary { animation: none; }
        }
      `}</style>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
