"use client";

import { motion } from "motion/react";

const BULB_COUNT = 14;
const COLORS = ["#C9A84C", "#FF1493", "#4ADE80", "#C9A84C", "#FB923C", "#C026FF", "#C9A84C"];

interface SlotBulbsProps {
  spinning: boolean;
  side?: "top" | "bottom";
}

export default function SlotBulbs({ spinning, side = "top" }: SlotBulbsProps) {
  const bulbs = Array.from({ length: BULB_COUNT });

  return (
    <div className="flex items-center justify-center w-full" style={{ gap: 6 }}>
      {bulbs.map((_, i) => {
        const colorIdx = i % COLORS.length;
        const baseColor = COLORS[colorIdx];

        return (
          <motion.div
            key={i}
            className="shrink-0 rounded-full"
            style={{
              width: 12,
              height: 12,
              background: baseColor,
              boxShadow: `0 0 6px ${baseColor}90`,
              border: `1px solid ${baseColor}40`,
            }}
            animate={
              spinning
                ? {
                    opacity: [0.2, 1, 0.2],
                    scale: [0.85, 1.15, 0.85],
                    boxShadow: [
                      `0 0 3px ${baseColor}30`,
                      `0 0 14px ${baseColor}CC`,
                      `0 0 3px ${baseColor}30`,
                    ],
                  }
                : { opacity: 0.5, scale: 1, boxShadow: `0 0 4px ${baseColor}50` }
            }
            transition={
              spinning
                ? {
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.07,
                    ease: "easeInOut",
                  }
                : { duration: 0.3 }
            }
          />
        );
      })}
    </div>
  );
}
