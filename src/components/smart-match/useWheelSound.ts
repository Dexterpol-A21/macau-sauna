"use client";

import { useCallback } from "react";

let sharedCtx: AudioContext | null = null;
function getCtx(): AudioContext {
  if (!sharedCtx) sharedCtx = new AudioContext();
  if (sharedCtx.state === "suspended") sharedCtx.resume();
  return sharedCtx;
}

function tick(ctx: AudioContext, freq: number, isLast = false) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  const vol = isLast ? 0.14 : 0.07;
  const dur = isLast ? 0.12 : 0.06;

  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.2, now + dur);

  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

  // Add a subtle noise "thunk" layer for the final tick
  if (isLast) {
    const noise = ctx.createOscillator();
    const noiseGain = ctx.createGain();
    noise.type = "square";
    noise.frequency.setValueAtTime(120, now);
    noise.frequency.exponentialRampToValueAtTime(40, now + 0.08);
    noiseGain.gain.setValueAtTime(0.06, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    noise.connect(noiseGain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.08);
  }

  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + dur);
}

function ding(ctx: AudioContext) {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  osc1.type = "sine"; osc1.frequency.setValueAtTime(880, ctx.currentTime);
  osc2.type = "sine"; osc2.frequency.setValueAtTime(1100, ctx.currentTime);
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
  osc1.connect(gain); osc2.connect(gain);
  gain.connect(ctx.destination);
  osc1.start(); osc2.start();
  osc1.stop(ctx.currentTime + 1); osc2.stop(ctx.currentTime + 1);
}

export default function useWheelSound() {
  const playTick = useCallback((isLast = false) => {
    try { tick(getCtx(), isLast ? 400 : 800, isLast); } catch { /* mute */ }
  }, []);

  const playDing = useCallback(() => {
    try { ding(getCtx()); } catch { /* mute */ }
  }, []);

  return { playTick, playDing };
}
