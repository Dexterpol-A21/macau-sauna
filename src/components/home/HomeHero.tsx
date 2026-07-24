"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

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

export default function HomeHero() {
  const [slide, setSlide] = useState(0);
  const [venues, setVenues] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sky = window.setInterval(() => setSlide((s) => (s + 1) % SKYLINES.length), 6000);
    const names = window.setInterval(() => setVenues((v) => (v + 1) % VENUE_LINES.length), 4000);
    return () => {
      window.clearInterval(sky);
      window.clearInterval(names);
    };
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#0A0A0A] px-4 pb-0 pt-[var(--chrome-pad)] sm:pt-[calc(var(--chrome-top)+2.5rem)]">
        {/* Sharp skyline */}
        <div className="absolute inset-0">
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
        </div>

        {/* Progressive blur dissolve (reference-style) — image softens into black */}
        {!reduceMotion &&
          (
            [
              { blur: 3, height: "68%", mask: "linear-gradient(to bottom, transparent 0%, black 50%)" },
              { blur: 8, height: "52%", mask: "linear-gradient(to bottom, transparent 0%, black 55%)" },
              { blur: 18, height: "40%", mask: "linear-gradient(to bottom, transparent 0%, black 60%)" },
              { blur: 32, height: "28%", mask: "linear-gradient(to bottom, transparent 0%, black 70%)" },
            ] as const
          ).map((layer) => (
            <div
              key={layer.blur}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
              style={{
                height: layer.height,
                backdropFilter: `blur(${layer.blur}px)`,
                WebkitBackdropFilter: `blur(${layer.blur}px)`,
                WebkitMaskImage: layer.mask,
                maskImage: layer.mask,
              }}
            />
          ))}

        {/* Soft dark wash — keeps copy readable, lets blur show through */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.62) 0%, rgba(10,10,10,0.28) 32%, rgba(10,10,10,0.12) 48%, rgba(10,10,10,0.35) 62%, rgba(10,10,10,0.78) 82%, #0A0A0A 96%, #0A0A0A 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[68svh] w-full max-w-3xl flex-col justify-center py-10 text-center sm:min-h-[72svh] sm:py-14">
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
            className="mb-7 flex items-start justify-center gap-1 sm:mb-8 sm:gap-3 md:gap-4"
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

          <div className="mx-auto flex w-full max-w-[300px] flex-col items-center gap-3 sm:max-w-[320px]">
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
                data-open-contact
                className="flex-1 cursor-pointer rounded-full border border-[var(--color-primary)]/50 px-2 py-2.5 text-center text-xs text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/10 sm:px-3 sm:text-sm"
              >
                Request Now
              </button>
            </div>
          </div>
        </div>

        {/* Extra solid black after the image is fully gone */}
        <div
          aria-hidden="true"
          className="relative z-[1] h-40 bg-[#0A0A0A] sm:h-56 md:h-64"
        />
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
      `}      </style>
    </>
  );
}
