"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Particles from "@tsparticles/react";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Engine } from "@tsparticles/engine";
import SlotLever from "./SlotLever";
import SlotBulbs from "./SlotBulbs";
import useSlotSound from "./useSlotSound";
import PrimaryCTA from "@/components/ui/PrimaryCTA";
import ContactModal from "@/components/home/ContactModal";

/* ── Symbols & Prizes ──────────────────────────────────── */
const SYMBOLS = [
  { id: "♠", color: "#C9A84C", extra: "Head Massage" },
  { id: "♥", color: "#FF1493", extra: "Reflexology" },
  { id: "♦", color: "#4ADE80", extra: "Manicure"   },
  { id: "♣", color: "#FB923C", extra: "Back Rub"    },
  { id: "★", color: "#C026FF", extra: "& More"       },
];

const VIP_DESC =
  "1 free treatment per visit when you book through us. Pick from head massage, reflexology, manicure & more.";

/* ── Reel config ────────────────────────────────────────────── */
const ROW_H = 120;
const COPIES = 10;
const REEL_COUNT = 3;

/* ── Helpers ────────────────────────────────────────────────── */
/** Build a shuffled version of SYMBOLS with the target at index 0.
 *  seed changes the surrounding order so each reel looks different, and
 *  spinKey folds in so the same reel doesn't replay an identical pattern
 *  on every pull. */
function buildReelSymbols(winningIdx: number, seed: number, spinKey: number): typeof SYMBOLS {
  const target = SYMBOLS[winningIdx];
  const others = SYMBOLS.filter((_, i) => i !== winningIdx);
  const shuffled = [...others];

  // Deterministic shuffle by seed
  let s = seed * 31 + 17 + spinKey * 101;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return [target, ...shuffled] as typeof SYMBOLS;
}

/** Build a long strip where the target symbol (at index 0 of `symbols`)
 *  is guaranteed to appear at a predictable position in copy COPIES-2. */
function buildStrip(symbols: typeof SYMBOLS): typeof SYMBOLS {
  const target = symbols[0];
  const rest = symbols.filter((s) => s.id !== target.id);
  const ordered = [target, ...rest];
  const strip: typeof SYMBOLS = [];
  for (let i = 0; i < COPIES; i++) {
    strip.push(...ordered);
  }
  return strip;
}

/* ── Symbol Cell ────────────────────────────────────────────── */
function SymbolCell({ symbol }: { symbol: typeof SYMBOLS[number] }) {
  return (
    <div
      className="flex h-[120px] shrink-0 items-center justify-center"
      style={{ background: "transparent" }}
    >
      <span
        className="select-none font-heading text-4xl sm:text-5xl md:text-6xl leading-none"
        style={{ color: symbol.color, textShadow: `0 0 20px ${symbol.color}60` }}
      >
        {symbol.id}
      </span>
    </div>
  );
}



function Reel({
  stripSymbols,
  spinKey,
  stiffness,
  damping,
  mass,
  delay,
  onSettled,
}: {
  stripSymbols: typeof SYMBOLS;
  spinKey: number;
  stiffness: number;
  damping: number;
  mass: number;
  delay: number;
  onSettled: () => void;
}) {
  const [settled, setSettled] = useState(true);
  const strip = useMemo(() => buildStrip(stripSymbols), [stripSymbols]);

  const baseCount = stripSymbols.length;
  // buildStrip() always places the target symbol (stripSymbols[0]) first in
  // every repeated cycle, so the target's absolute row is just
  // baseCount * targetCopy — no need to search the strip for it.
  const targetCopy = COPIES - 3;
  const targetInStrip = baseCount * targetCopy;
  const targetY = -targetInStrip * ROW_H;

  return (
    <div
      className="relative flex-1 min-w-0 overflow-hidden rounded-xl border"
      style={{
        borderColor: "#1F1F1F",
        height: ROW_H,
        background: "#060606",
        boxShadow: "inset 0 4px 20px rgba(0,0,0,0.6)",
      }}
    >
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-7 bg-gradient-to-b from-[#060606] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-7 bg-gradient-to-t from-[#060606] to-transparent" />

      {/* Strip */}
      <motion.div
        key={spinKey}
        initial={{ y: 0 }}
        animate={{ y: targetY }}
        transition={{ type: "spring", stiffness, damping, mass, delay }}
        onAnimationStart={() => setSettled(false)}
        onAnimationComplete={() => {
          setSettled(true);
          onSettled();
        }}
        style={{ filter: settled ? "blur(0px)" : "blur(2.5px)" }}
      >
        {strip.map((s, i) => (
          <SymbolCell key={`${spinKey}-${i}`} symbol={s} />
        ))}
      </motion.div>
    </div>
  );
}

/* ── Spring configs per reel (increasing drama) ─────────────── */
const REEL_SPRINGS = [
  // Reel 0 — stops first, relatively firm
  { stiffness: 50, damping: 11, mass: 1,   delay: 0 },
  // Reel 1 — stops second, a bit softer
  { stiffness: 35, damping: 9,  mass: 1.5, delay: 0.6 },
  // Reel 2 — stops last, slow & dramatic with bounce
  { stiffness: 22, damping: 7,  mass: 2.5, delay: 1.3 },
];

/* ── Main ───────────────────────────────────────────────────── */
export default function SlotMatch() {
  const { playJackpot, playLose } = useSlotSound();
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireworksPreset(engine);
  }, []);

  const [spinKey, setSpinKey] = useState(0);
  // reelTargets[i] = which SYMBOLS index reel i should stop on
  const [reelTargets, setReelTargets] = useState<number[]>([0, 0, 0]);
  const [isWinner, setIsWinner] = useState(false);
  const isWinnerRef = useRef(false); // mirrors isWinner for stable reads in callbacks
  const [winningSymbol, setWinningSymbol] = useState<typeof SYMBOLS[number] | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  // Track settled reels with a ref (avoids stale closure on counter)
  const settledRef = useRef(new Set<number>());
  // Count total spins across the session — first is always a win
  const spinCountRef = useRef(0);
  // Consecutive losses — climbs the win probability after each loss, resets on win
  const consecutiveLossesRef = useRef(0);
  // Only resolve result when a real pull was performed (not initial mount animation)
  const spinActiveRef = useRef(false);

  // Each reel gets its own target symbol with differently-shuffled strips
  const reelSymbols = useMemo(
    () => REEL_SPRINGS.map((_, i) => buildReelSymbols(reelTargets[i], i, spinKey)),
    [reelTargets, spinKey],
  );

  const handleSpin = useCallback(() => {
    if (spinning) return;

    const isFirst = spinCountRef.current === 0;
    spinCountRef.current += 1;

    // Climbing probability: 1% → 14% → 27% → 40% → 53% → 66% → 79% → 87% cap
    const baseChance = 0.01;
    const stepPerLoss = 0.13;
    const maxChance = 0.87;
    const chance = Math.min(baseChance + consecutiveLossesRef.current * stepPerLoss, maxChance);
    const won = isFirst || Math.random() < chance;

    if (won) {
      consecutiveLossesRef.current = 0;
      const idx = Math.floor(Math.random() * SYMBOLS.length);
      setReelTargets([idx, idx, idx]);
      setWinningSymbol(SYMBOLS[idx]);
      setIsWinner(true);
      isWinnerRef.current = true;
      // Generate a random coupon code
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = 'VIP-';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setCouponCode(code);
    } else {
      consecutiveLossesRef.current += 1;
      // Each reel lands on a different symbol — guaranteed mismatch
      const a = Math.floor(Math.random() * SYMBOLS.length);
      let b = Math.floor(Math.random() * SYMBOLS.length);
      while (b === a) b = Math.floor(Math.random() * SYMBOLS.length);
      let c = Math.floor(Math.random() * SYMBOLS.length);
      while (c === a || c === b) c = Math.floor(Math.random() * SYMBOLS.length);
      setReelTargets([a, b, c]);
      setWinningSymbol(null);
      setIsWinner(false);
      isWinnerRef.current = false;
    }

    setSpinning(true);
    setShowResult(false);
    setShowConfetti(false);
    settledRef.current.clear();
    spinActiveRef.current = true;
    setSpinKey((k) => k + 1);
  }, [spinning]);

  const handleReelSettled = useCallback((reelIdx: number) => {
    const settled = settledRef.current;
    settled.add(reelIdx);

    if (!spinActiveRef.current || settled.size < REEL_COUNT) return;
    spinActiveRef.current = false;
    const won = isWinnerRef.current;
    setSpinning(false);
    setTimeout(() => {
      if (won) {
        playJackpot();
      } else {
        playLose();
      }
      setShowResult(true);
      if (won) {
        setTimeout(() => setShowConfetti(true), 200);
      }
    }, 300);
  }, [playJackpot, playLose]);

  return (
    <div className="relative flex flex-col items-center">
      {showConfetti && (
        <Particles
          id="slot-confetti"
          init={particlesInit}
          options={{
            preset: "fireworks",
            fullScreen: { enable: false },
            style: { position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" },
          }}
        />
      )}

      <div className="relative z-10 w-full" style={{ maxWidth: 680 }}>
        {/* ── Machine Body ── */}
        <div
          className="mx-auto rounded-3xl border py-5 px-4 md:px-8"
          style={{
            borderColor: "#1F1F1F",
            background: "linear-gradient(180deg, #0F0F0F 0%, #0A0A0A 50%, #080808 100%)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {/* ── Top ornament ── */}
          <div className="flex items-center justify-center gap-1 mb-3">
            <span className="block h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, #C9A84C60, transparent)" }} />
            <span className="font-heading text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: "#C9A84C80" }}>VIP</span>
            <span className="block h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, #C9A84C60, transparent)" }} />
          </div>

          {/* Top bulbs */}
          <div className="mb-5 px-1">
            <SlotBulbs spinning={spinning} side="top" />
          </div>

          {/* 3 Reels + Lever */}
          <div className="flex items-stretch gap-2 md:gap-3">
            {REEL_SPRINGS.map((spring, i) => (
              <Reel
                key={`${spinKey}-${i}`}
                stripSymbols={reelSymbols[i]}
                spinKey={spinKey}
                stiffness={spring.stiffness}
                damping={spring.damping}
                mass={spring.mass}
                delay={spring.delay}
                onSettled={() => handleReelSettled(i)}
              />
            ))}

            {/* Lever */}
            <div className="flex shrink-0">
              <SlotLever spinning={spinning} onPull={handleSpin} />
            </div>
          </div>

          {/* Bottom bulbs */}
          <div className="mt-5 mb-4 px-1">
            <SlotBulbs spinning={spinning} side="bottom" />
          </div>

          {/* ── Prizes Panel (always visible) ── */}
          <div 
            className="mt-4 rounded-xl border px-4 py-4 md:px-5 md:py-5 text-center flex flex-col justify-center h-[220px] sm:h-[240px] md:h-[260px]" 
            style={{ borderColor: "#1F1F1F", background: "#0A0A0A" }}
          >
            <AnimatePresence mode="wait">
              {showResult && winningSymbol && !spinning ? (
                <motion.div
                  key="won"
                  className="flex flex-col items-center justify-center h-full w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-center gap-3 mb-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.1 + i * 0.1 }}
                        className="text-4xl md:text-5xl"
                        style={{ color: winningSymbol.color, textShadow: `0 0 20px ${winningSymbol.color}60` }}
                      >
                        {winningSymbol.id}
                      </motion.span>
                    ))}
                  </div>
                  <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: "#C9A84C" }}>
                    Jackpot
                  </span>
                  <h4 className="font-heading text-lg md:text-xl font-bold" style={{ color: "#EDEDF5" }}>
                    Pick 1 Free Treat
                  </h4>
                  <p className="mt-2 font-heading text-xs md:text-sm leading-snug max-w-sm" style={{ color: "#9E9E9E" }}>
                    {VIP_DESC}
                  </p>
                  <p className="mt-2 font-heading text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#C9A84C80" }}>
                    1 free per visit
                  </p>
                  {/* Coupon Code */}
                  {couponCode && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                      className="mt-3 rounded-lg border px-5 py-3"
                      style={{
                        borderColor: "rgba(201,168,76,0.25)",
                        background: "rgba(201,168,76,0.06)",
                      }}
                    >
                      <span className="block text-[9px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: "#C9A84C80" }}>
                        Your Coupon
                      </span>
                      <span
                        className="block font-mono text-base md:text-lg font-bold tracking-[0.15em] select-all"
                        style={{ color: "#DDB855", textShadow: "0 0 12px rgba(221,184,85,0.3)" }}
                      >
                        {couponCode}
                      </span>
                    </motion.div>
                  )}
                  <div className="mt-4">
                    <PrimaryCTA
                      text="Claim Your Prize"
                      onClick={() => setContactOpen(true)}
                    />
                  </div>
                </motion.div>
              ) : showResult && !winningSymbol && !spinning ? (
                <motion.div
                  key="lost"
                  className="flex flex-col items-center justify-center h-full w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="text-4xl mb-3 opacity-50"
                    style={{ color: "#9E9E9E" }}
                  >
                    ✕
                  </motion.span>
                  <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: "#9E9E9E" }}>
                    No Match
                  </span>
                  <h4 className="font-heading text-lg md:text-xl font-bold" style={{ color: "#EDEDF5" }}>
                    So close!
                  </h4>
                  <p className="mt-2 font-heading text-xs md:text-sm leading-snug max-w-xs" style={{ color: "#9E9E9E" }}>
                    Pull again, the next spin could be the one.
                  </p>
                </motion.div>
              ) : spinning ? (
                <motion.div
                  key="spinning"
                  className="flex flex-col items-center justify-center h-full w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mb-4"
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V6" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 18V22" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4.92896 4.92896L7.75738 7.75738" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                      <path d="M16.2426 16.2426L19.071 19.071" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                      <path d="M2 12H6" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                      <path d="M18 12H22" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4.92896 19.071L7.75738 16.2426" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                      <path d="M16.2426 7.75738L19.071 4.92896" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                  <p className="font-heading text-sm font-bold uppercase tracking-[0.2em]" style={{ color: "#C9A84C" }}>
                    Spinning...
                  </p>
                  <p className="mt-2 font-heading text-xs italic" style={{ color: "#9E9E9E" }}>
                    Good luck!
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="paytable"
                  className="flex flex-col items-center justify-center h-full w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#C9A84C" }}>
                    Your Prizes
                  </p>
                  <div className="grid grid-cols-5 gap-2 md:gap-4 w-full">
                    {SYMBOLS.map((s) => (
                      <div key={s.id} className="flex flex-col items-center gap-1">
                        <span className="text-2xl sm:text-3xl md:text-4xl" style={{ color: s.color }}>{s.id}</span>
                        <span className="text-[8px] sm:text-[9px] md:text-[10px] font-medium leading-tight text-center mt-0.5" style={{ color: "#9E9E9E" }}>
                          {s.extra}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 font-heading text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "#C9A84C80" }}>
                    Match 3 of the same &mdash; 1 free per visit
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Bottom ornament ── */}
          <div className="mt-2 mb-1">
            <span className="block h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #C9A84C60, transparent)" }} />
          </div>
        </div>
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
