"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

// J and Q are excluded: in the heading's serif font (Playfair Display) their
// tails hang well below the baseline, well past a normal cap-height letter.
// When one of those lands in the row right next to the settled target
// letter, that tail pokes past the row's clipped edge and shows up as a
// stray sliver above/below the real letter. Any other letter's overshoot is
// small enough for the clip-path safety margin below to hide.
const CHAR_POOL = "ABCDEFGHIKLMNOPRSTUVWXYZ";

function generateStrip(
  target: string,
  randomCount: number,
  topBuffer: number,
  bottomBuffer: number,
): string[] {
  const randoms: string[] = [];
  for (let i = 0; i < randomCount; i++) {
    randoms.push(CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)]);
  }
  return [
    ...Array<string>(topBuffer).fill(""),
    ...randoms,
    target,
    ...Array<string>(bottomBuffer).fill(""),
  ];
}

interface SlotCharProps {
  char: string;
  index: number;
  stripLength: number;
}

const TOP_BUFFER = 3;
const BOTTOM_BUFFER = 3;

function SlotChar({ char, index, stripLength }: SlotCharProps) {
  const reduce = useReducedMotion();
  const strip = React.useMemo(
    () => generateStrip(char, stripLength, TOP_BUFFER, BOTTOM_BUFFER),
    [char, stripLength],
  );

  if (char === " ") {
    return <span className="inline-block w-[0.3em]">&nbsp;</span>;
  }

  if (reduce) {
    return <span className="inline-block">{char}</span>;
  }

  /*
   * Strip layout (from top to bottom):
   *   TOP_BUFFER blanks  ->  spring undershoot lands here
   *   stripLength randoms  ->  the "spinning" part
   *   target char  ->  final resting position
   *   BOTTOM_BUFFER blanks  ->  spring overshoot lands here
   *
   * Translate up by (TOP_BUFFER + stripLength) em to land exactly on the
   * target. Both under- and overshoot hit blank slots so no random letters
   * leak into view at any point.
   */
  const targetY = -(TOP_BUFFER + stripLength);

  return (
    <span className="relative inline-block pb-[0.25em]">
      {/* Invisible char reserves exact layout space so word width never jumps */}
      <span className="invisible">{char}</span>

      {/*
        Clip vertically only (with a small safety margin) so the strip's
        other rows stay hidden, but leave horizontal room uncropped: some
        glyphs (e.g. this font's "R") draw ink slightly past their own
        advance-width box, and clipping flush to that box was slicing off
        the edge of the letter.
      */}
      <span
        className="absolute inset-0"
        style={{ clipPath: "inset(0em -0.5em 0em -0.5em)" }}
      >
        <motion.span
          className="absolute inset-x-0 top-0 flex flex-col items-center"
          initial={{ y: 0 }}
          animate={{ y: `${targetY}em` }}
          transition={{
            type: "spring",
            stiffness: 75,
            damping: 10,
            mass: 0.5,
            delay: 0.15 + index * 0.06,
          }}
        >
          {strip.map((c, j) => (
            <span
              key={j}
              className="flex w-full items-center justify-center"
              style={{ height: "1em", lineHeight: 1 }}
            >
              {c}
            </span>
          ))}
        </motion.span>
      </span>
    </span>
  );
}

interface SlotMachineTextProps {
  text: string;
  className?: string;
  stripLength?: number;
}

export default function SlotMachineText({
  text,
  className,
  stripLength = 10,
}: SlotMachineTextProps) {
  const segments = text.split(/(\s+)/);

  return (
    <span className={className}>
      {segments.map((segment, si) => {
        if (/^\s+$/.test(segment)) {
          return <span key={`s-${si}`}>{segment}</span>;
        }
        return (
          <span key={`s-${si}`} style={{ whiteSpace: "nowrap", display: "inline" }}>
            {segment.split("").map((char, i) => (
              <SlotChar
                key={i}
                char={char}
                index={i}
                stripLength={stripLength}
              />
            ))}
          </span>
        );
      })}
    </span>
  );
}
