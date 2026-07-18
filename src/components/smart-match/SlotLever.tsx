"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

interface SlotLeverProps {
  spinning: boolean;
  onPull: () => void;
}

const HEIGHT = 120;     // matches reel height
const KNOB_REST = 20;   // knob starts near the top
const KNOB_MAX = 110;   // farthest the knob can be pulled down
const PULL_THRESHOLD = 0.5; // fraction of travel from rest to max

export default function SlotLever({ spinning, onPull }: SlotLeverProps) {
  const y = useMotionValue(KNOB_REST);
  const knobGlow = useTransform(y, [KNOB_REST, KNOB_MAX], [0.25, 1]);
  const rodOpacity = useTransform(y, [KNOB_REST, KNOB_REST + 10], [0.25, 1]);
  const wasSpinning = useRef(spinning);

  // Return knob to rest when spin finishes
  useEffect(() => {
    if (wasSpinning.current && !spinning) {
      animate(y, KNOB_REST, { type: "spring", stiffness: 120, damping: 14 });
    }
    wasSpinning.current = spinning;
  }, [spinning, y]);

  function handleDragEnd() {
    if (spinning) return;
    const currentY = y.get();
    const travel = KNOB_MAX - KNOB_REST;
    if (currentY >= KNOB_REST + travel * PULL_THRESHOLD) {
      y.set(KNOB_MAX);
      onPull();
    } else {
      animate(y, KNOB_REST, { type: "spring", stiffness: 300, damping: 20 });
    }
  }

  return (
    <div
      className="relative flex flex-col items-center select-none touch-none overflow-visible"
      style={{ width: 64, height: HEIGHT }}
    >
      {/* Rail groove — full height of the reel area */}
      <div
        className="absolute left-1/2 w-2.5 rounded-full pointer-events-none"
        style={{
          top: 0,
          bottom: 0,
          transform: "translateX(-50%)",
          background: "rgba(18,18,24,0.85)",
          border: "1px solid rgba(201,168,76,0.12)",
          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
        }}
      />

      {/* Rod — from top of container down to the knob */}
      <motion.div
        className="absolute left-1/2 w-1.5 rounded-full pointer-events-none"
        style={{
          top: 0,
          transform: "translateX(-50%)",
          height: useTransform(y, [KNOB_REST, KNOB_MAX], [KNOB_REST, KNOB_MAX]),
          background: "linear-gradient(180deg, #8A6E2E, #C9A84C, #DFC878)",
          opacity: rodOpacity,
        }}
      />

      {/* Glow behind knob */}
      <motion.div
        className="absolute left-1/2 rounded-full blur-md pointer-events-none"
        style={{
          width: 34,
          height: 34,
          transform: "translateX(-50%)",
          y,
          marginTop: -17,
          background: "#C9A84C",
          opacity: useTransform(y, [KNOB_REST, KNOB_MAX], [0.08, 0.4]),
        }}
      />

      {/* Knob */}
      <motion.div
        drag={spinning ? false : "y"}
        dragConstraints={{ top: KNOB_REST, bottom: KNOB_MAX }}
        dragElastic={0.06}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        whileHover={spinning ? undefined : { scale: 1.12 }}
        whileTap={spinning ? undefined : { scale: 0.95 }}
        role="button"
        tabIndex={spinning ? -1 : 0}
        aria-label="Pull the lever to spin"
        aria-disabled={spinning}
        onKeyDown={(e) => {
          if (spinning) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            animate(y, KNOB_MAX, { type: "spring", stiffness: 260, damping: 22 });
            onPull();
          }
        }}
        onClick={() => {
          if (spinning || y.get() !== KNOB_REST) return;
          animate(y, KNOB_MAX, { type: "spring", stiffness: 260, damping: 22 });
          onPull();
        }}
        className="absolute left-1/2 z-10 outline-none"
        style={{
          y,
          x: "-50%",
          cursor: spinning ? "default" : "grab",
          opacity: spinning ? 0.75 : 1,
        }}
      >
        <motion.div
          className="rounded-full"
          style={{
            width: 40,
            height: 40,
            marginTop: -20,
            background:
              "radial-gradient(circle at 35% 30%, #F5E6A0 0%, #DFC878 20%, #C9A84C 50%, #8A6E2E 90%, #6B4E1A 100%)",
            boxShadow: useTransform(
              knobGlow,
              (v) =>
                `0 0 ${20 * v}px rgba(201,168,76,${0.55 * v}), inset 0 1px 0 rgba(255,255,255,0.3)`,
            ),
          }}
        />
      </motion.div>

      {/* PULL label */}
      <div
        className="absolute left-1/2 pointer-events-none text-[8px] font-bold uppercase tracking-[0.2em]"
        style={{
          top: -18,
          transform: "translateX(-50%)",
          color: "#9E9E9E80"
        }}
      >
        PULL
      </div>
    </div>
  );
}
