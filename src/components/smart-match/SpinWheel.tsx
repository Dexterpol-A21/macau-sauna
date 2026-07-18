"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import Particles from "@tsparticles/react";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Engine } from "@tsparticles/engine";
import { FEATURED_VENUES } from "../../utils/constants";
import { buildVenueTags } from "../../utils/filterColors";
import type { Venue } from "../../types";
import SlotMachineText from "../ui/SlotMachineText";
import PrimaryCTA from "../ui/PrimaryCTA";
import SlotFrameButton from "../ui/SlotFrameButton";
import ContactModal from "../home/ContactModal";
import useWheelSound from "./useWheelSound";

const DEFAULT_ACCENT = "#DDB855";

/* ── Filmstrip geometry ─────────────────────────────────────── */
const CARD_W_DESKTOP = 260;
const CARD_H_DESKTOP = 148;
const CARD_W_MOBILE = 190;
const CARD_H_MOBILE = 108;
const CARD_GAP = 14;
const COPIES = 6;
const TARGET_COPY = COPIES - 2;

/* ── Helpers ────────────────────────────────────────────────── */
function pickRandom(arr: Venue[]): Venue {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed * 31 + 17;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function buildStrip(venues: Venue[], winnerSlug: string, seed: number): Venue[] {
  const winner = venues.find((v) => v.slug === winnerSlug) ?? venues[0];
  const others = shuffle(venues.filter((v) => v.slug !== winner.slug), seed);
  const ordered = [winner, ...others];
  const strip: Venue[] = [];
  for (let i = 0; i < COPIES; i++) strip.push(...ordered);
  return strip;
}

/* ── Center pointer line ────────────────────────────────────── */
function CenterLine() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 -translate-x-1/2">
      <svg width="16" height="10" viewBox="0 0 16 10" className="absolute -top-1 left-1/2 -translate-x-1/2">
        <polygon points="8,10 0,0 16,0" fill="#C9A84C" />
      </svg>
      <div
        className="h-full w-[2px]"
        style={{
          background: "linear-gradient(180deg, transparent, #C9A84C90 15%, #C9A84C90 85%, transparent)",
          boxShadow: "0 0 14px rgba(201,168,76,0.55)",
        }}
      />
      <svg width="16" height="10" viewBox="0 0 16 10" className="absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-180">
        <polygon points="8,10 0,0 16,0" fill="#C9A84C" />
      </svg>
    </div>
  );
}

/* ── Filmstrip card ─────────────────────────────────────────── */
function FilmCard({ venue, dimmed, cardW, cardH }: { venue: Venue; dimmed: boolean; cardW: number; cardH: number }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-xl"
      style={{
        width: cardW,
        height: cardH,
        border: `1px solid ${dimmed ? "#1F1F1F" : "#2A2A2A"}`,
        opacity: dimmed ? 0.25 : 1,
        filter: dimmed ? "blur(1.5px) saturate(0.3)" : "none",
        transition: "opacity 0.5s ease, filter 0.5s ease, border-color 0.5s ease",
      }}
    >
      <img
        src={venue.image}
        alt={venue.name}
        className="block h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

/* ── Result card — slides up BELOW the frozen filmstrip ────────── */
function ResultCard({ venue, onSpinAgain }: { venue: Venue; onSpinAgain: () => void }) {
  const tags = buildVenueTags(venue);
  const accent = tags[0]?.color ?? DEFAULT_ACCENT;
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="mt-6 overflow-hidden rounded-[0.375rem] border"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "#111111" }}
    >
      {/* Hero image with gradient overlay */}
      <div className="relative h-44 w-full overflow-hidden md:h-52">
        <img src={venue.image} alt={venue.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #111111 0%, transparent 100%)" }} />
      </div>

      <div className="p-5 md:p-6">
        {/* Category tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((t) => (
            <span
              key={t.key}
              className="inline-block rounded-[0.2rem] px-[0.65rem] py-[0.2rem] text-[0.55rem] font-bold uppercase tracking-[0.12em]"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: t.primary ? t.color : "transparent",
                color: t.primary ? "#0A0A0A" : t.color,
                border: t.primary ? "none" : `1px solid ${t.color}33`,
              }}
            >
              {t.label}
            </span>
          ))}
        </div>

        <h3
          className="text-xl font-bold leading-tight md:text-2xl"
          style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8F0", letterSpacing: "-0.01em" }}
        >
          {venue.name}
        </h3>
        <p
          className="mt-0.5 text-sm font-semibold leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif", color: accent }}
        >
          {venue.subtitle}
        </p>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif", color: "#A0A0A0", lineHeight: 1.5 }}
        >
          {venue.description}
        </p>

        <div
          className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs"
          style={{ fontFamily: "'Inter', sans-serif", color: "#9E9E9E" }}
        >
          <span>{venue.location}</span>
          <span>{venue.hours}</span>
          <span>{venue.priceRange}</span>
        </div>

        {/* Feature pills — matching AllSaunas secondary tag style */}
        <div className="mt-3 flex flex-wrap gap-2">
          {venue.features.map((f) => (
            <span
              key={f}
              className="inline-block rounded-[0.2rem] border px-[0.65rem] py-[0.2rem] text-[0.55rem] font-bold uppercase tracking-[0.12em]"
              style={{
                fontFamily: "'Inter', sans-serif",
                borderColor: `${accent}33`,
                color: "#9E9E9E",
              }}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="sw-btn-row mt-5 flex flex-wrap items-center gap-3">
          <PrimaryCTA
            text="Contact Us"
            onClick={() => setContactOpen(true)}
          />
          <SlotFrameButton
            text="View Rankings"
            href="/venues"
            accent={accent}
          />
          <button
            onClick={onSpinAgain}
            className="inline-flex items-center justify-center rounded-[0.5em] border text-xs font-semibold uppercase tracking-[0.1em] no-underline whitespace-nowrap cursor-pointer transition-all hover:-translate-y-0.5"
            style={{
              color: "#C9A84C",
              background: "transparent",
              borderColor: "rgba(201,168,76,0.25)",
              fontFamily: "'Inter', sans-serif",
              minWidth: 120,
              padding: "0 1.6rem",
              height: 50,
              boxSizing: "border-box",
              fontSize: "0.88rem",
              lineHeight: 1.25,
            }}
          >
            Spin Again
          </button>
        </div>

      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <style>{`
        @media (max-width: 639px) {
          .sw-btn-row {
            flex-direction: column;
            align-items: stretch;
          }
          .sw-btn-row > * {
            width: 100% !important;
            min-width: 0 !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

/* ── CS:GO roulette deceleration ────────────────────────────── */
const SPIN_DURATION = 6.5; // total seconds
// cubic-bezier: fast launch → looong gentle crawl at the end
// ~70% of distance in first 20% of time, last 5% of distance takes ~40% of time
const SPIN_EASE: [number, number, number, number] = [0, 0.9, 0.15, 1];

/* ── Main ───────────────────────────────────────────────────── */
export default function SpinWheel() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-120px" });

  const venues = useMemo(() => FEATURED_VENUES, []);
  const { playTick, playDing } = useWheelSound();
  const particlesInit = useCallback(async (engine: Engine) => { await loadFireworksPreset(engine); }, []);

  const frameRef = useRef<HTMLDivElement>(null);
  const [frameW, setFrameW] = useState(560);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setFrameW(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Dynamic card sizing based on frame width
  const isNarrow = frameW < 420;
  const cardW = isNarrow ? CARD_W_MOBILE : CARD_W_DESKTOP;
  const cardH = isNarrow ? CARD_H_MOBILE : CARD_H_DESKTOP;
  const cardStep = cardW + CARD_GAP;

  const [spinKey, setSpinKey] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [settled, setSettled] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<Venue | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const mountedRef = useRef(false);
  const lastTickCardRef = useRef(-1);
  const landingOffsetRef = useRef(0); // random offset so it never lands dead-center

  const strip = useMemo(
    () => (result ? buildStrip(venues, result.slug, spinKey) : venues),
    [venues, result, spinKey],
  );

  const targetIndex = venues.length * TARGET_COPY;
  // Random landing position within the winner card (15%–85% of card width)
  // so it never falls dead-center — looks like a real roulette
  const targetX = frameW / 2 - cardW / 2 - targetIndex * cardStep - 4 + landingOffsetRef.current;

  const handleSpin = useCallback(() => {
    if (spinning) return;
    const picked = pickRandom(venues);
    // Random offset within ±35% of card width from center — pointer always on the winner card but never dead-center
    landingOffsetRef.current = (Math.random() - 0.5) * cardW * 0.7;
    setResult(picked);
    setRevealed(false);
    setShowConfetti(false);
    setSettled(false);
    setSpinning(true);
    mountedRef.current = true;
    lastTickCardRef.current = -1;
    setSpinKey((k) => k + 1);
  }, [spinning, venues]);

  /* Tick sound on each card crossing — frequency naturally slows with the animation */
  const handleUpdate = useCallback(
    (latest: number) => {
      if (!strip.length) return;
      // Calculate which card index is currently under the center line
      const centerX = frameW / 2;
      const cardIndex = Math.floor((centerX - latest - 4) / cardStep);
      if (cardIndex !== lastTickCardRef.current && cardIndex >= 0 && cardIndex < strip.length) {
        lastTickCardRef.current = cardIndex;
        playTick(false);
      }
    },
    [strip.length, frameW, playTick, cardStep],
  );

  const handleStripSettled = useCallback(() => {
    if (!mountedRef.current) return;
    mountedRef.current = false;
    setSettled(true);
    setSpinning(false);
    playTick(true); // final "clunk" tick
    playDing();
    setTimeout(() => {
      setRevealed(true);
      setTimeout(() => setShowConfetti(true), 250);
    }, 500);
  }, [playTick, playDing]);

  return (
    <section className="relative flex flex-col items-center px-3 py-14 md:py-28" style={{ background: "#0A0A0A", borderTop: "2px solid rgba(201,168,76,0.12)" }}>
      {showConfetti && (
        <Particles id="wheel-confetti" init={particlesInit}
          options={{ preset: "fireworks", fullScreen: { enable: false }, style: { position: "absolute", inset: 0, zIndex: 30, pointerEvents: "none" } }}
        />
      )}

      <div className="relative z-10 w-full" style={{ maxWidth: 640 }}>
        {/* Header */}
        <div ref={headingRef} className="mb-8 md:mb-10 text-center">
          {headingInView ? (
            <SlotMachineText
              text="FIND YOUR VENUE"
              className="font-heading text-3xl sm:text-4xl font-bold tracking-wide md:text-5xl lg:text-6xl"
              stripLength={8}
            />
          ) : (
            <span
              className="font-heading text-3xl sm:text-4xl font-bold tracking-wide md:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8F0", visibility: "hidden" }}
            >
              FIND YOUR VENUE
            </span>
          )}
          <p className="mt-3 md:mt-4 text-xs md:text-base px-2" style={{ color: "#9E9E9E" }}>
            Spin the reel and let fortune pick one of our 12 hand-curated venues for you.
          </p>
        </div>

        {/* Frame — filmstrip always visible, freezes when settled */}
        <div
          ref={frameRef}
          className="relative mx-auto overflow-hidden rounded-3xl border"
          style={{
            borderColor: "#1F1F1F",
            background: "linear-gradient(180deg, #0F0F0F 0%, #0A0A0A 50%, #080808 100%)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          <div className="relative py-6">
            <CenterLine />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#0A0A0A] to-transparent" />

            <motion.div
              key={spinKey}
              className="flex items-center"
              style={{ gap: CARD_GAP, paddingLeft: 4 }}
              initial={{ x: 0 }}
              animate={result ? { x: targetX } : { x: 0 }}
              transition={
                spinning
                  ? { type: "tween", duration: SPIN_DURATION, ease: SPIN_EASE }
                  : { duration: 0 }
              }
              onUpdate={handleUpdate}
              onAnimationComplete={handleStripSettled}
            >
              {strip.map((v, i) =>
                i === targetIndex ? (
                  <FilmCard key={i} venue={v} dimmed={false} cardW={cardW} cardH={cardH} />
                ) : (
                  <FilmCard key={i} venue={v} dimmed={settled && !spinning} cardW={cardW} cardH={cardH} />
                ),
              )}
            </motion.div>
          </div>
        </div>

        {/* Result — slides up below the frozen filmstrip */}
        <motion.div
          initial={false}
          animate={revealed && result ? { opacity: 1, y: 0, height: "auto" } : { opacity: 0, y: 30, height: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
          style={{ overflow: "hidden" }}
        >
          {revealed && result && <ResultCard venue={result} onSpinAgain={handleSpin} />}
        </motion.div>

        {/* SPIN button — hero CTA style, hidden when result is revealed */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={false}
          animate={!revealed ? { opacity: 1, height: "auto", marginTop: 32 } : { opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="relative min-w-[120px] cursor-pointer rounded-[0.5em] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] transition-[background-position,opacity] duration-[0.8s] disabled:cursor-not-allowed"
            style={{
              border: "none",
              background: spinning
                ? "#1F1F1F"
                : "linear-gradient(325deg, #8A6E2E 0%, #DFC878 55%, #8A6E2E 90%)",
              backgroundSize: "280% auto",
              backgroundPosition: "left top",
              color: spinning ? "#9E9E9E" : "#FFF8F0",
              boxShadow: spinning
                ? "none"
                : "0 0 20px rgba(201,168,76,0.5), 0 5px 5px -1px rgba(201,168,76,0.25), inset 4px 4px 8px rgba(223,200,120,0.5), inset -4px -4px 8px rgba(138,110,46,0.35)",
            }}
            onMouseEnter={(e) => {
              if (!spinning) e.currentTarget.style.backgroundPosition = "right top";
            }}
            onMouseLeave={(e) => {
              if (!spinning) e.currentTarget.style.backgroundPosition = "left top";
            }}
          >
            {spinning ? "Spinning..." : "Find Your Venue"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
